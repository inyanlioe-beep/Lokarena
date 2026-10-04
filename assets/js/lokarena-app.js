/**
 * Lokarena Main Application Controller
 * Coordinates UI views, event routing, transactions, check-in scanning,
 * payment simulator, ticket rendering, and admin management.
 */

import { store } from './lokarena-store.js';
import { LokarenaQR } from './lokarena-qr.js';
import { renderIcons } from './lokarena-icons.js';

class LokarenaApp {
  constructor() {
    this.currentView = 'event';
    this.selectedEventId = 'evt-2026-001';
    this.selectedTicketTypeId = 'tt-001';
    this.ticketQty = 1;
    this.appliedVoucherCode = '';
    this.activeOrder = null;
    this.activeTicket = null;
    this.adminTab = 'Dashboard';
    this.scannerEventId = 'evt-2026-001';
    this.scannerVideoTrack = null;
    this.paymentTimerInterval = null;

    this.init();
  }

  init() {
    this.bindGlobalEvents();
    this.renderCurrentView();
    store.subscribe(() => {
      this.onStoreUpdate();
    });

    // Check URL hash if present
    const hash = window.location.hash.replace('#', '');
    if (hash && ['event', 'events', 'checkout', 'ticket', 'admin', 'scanner', 'my-tickets'].includes(hash)) {
      this.switchView(hash);
    }
  }

  onStoreUpdate() {
    // If currently on admin or scanner or ticket, refresh contents
    if (this.currentView === 'admin') {
      this.renderAdminView();
    } else if (this.currentView === 'event') {
      this.renderEventDetail();
    }
  }

  // --- Audio Feedback (Web Audio API Synthesizer) ---
  playBeep(success = true) {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (success) {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
        osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      } else {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(320, ctx.currentTime);
        osc.frequency.setValueAtTime(240, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      }
    } catch (e) {
      // AudioContext unavailable or blocked
    }
  }

  // --- View Switcher ---
  switchView(viewName, params = {}) {
    this.currentView = viewName;
    window.location.hash = viewName;

    // Update demo bar tabs
    document.querySelectorAll('.tc-tab').forEach(tab => {
      tab.setAttribute('aria-pressed', String(tab.dataset.view === viewName));
    });

    // Update nav links
    document.querySelectorAll('.tc-link[data-view]').forEach(link => {
      link.classList.toggle('tc-current', link.dataset.view === viewName);
    });

    // Show target screen, hide others
    document.querySelectorAll('[data-screen]').forEach(screen => {
      screen.hidden = (screen.dataset.screen !== viewName);
    });

    // Stop scanner camera if leaving scanner
    if (viewName !== 'scanner') {
      this.stopScannerCamera();
    }

    if (viewName === 'event') {
      this.renderEventDetail();
    } else if (viewName === 'events') {
      this.renderEventsDiscovery();
    } else if (viewName === 'checkout') {
      this.renderCheckoutView();
    } else if (viewName === 'payment') {
      this.renderPaymentView();
    } else if (viewName === 'ticket') {
      this.renderTicketView(params.ticket);
    } else if (viewName === 'my-tickets') {
      this.renderMyTicketsView();
    } else if (viewName === 'admin') {
      this.renderAdminView();
    } else if (viewName === 'scanner') {
      this.renderScannerView();
    }

    renderIcons();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  bindGlobalEvents() {
    // Top Role & View Tabs
    document.querySelectorAll('[data-view]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const view = btn.dataset.view;
        this.switchView(view);
      });
    });

    // Reset Data Action (Demo helper)
    const resetBtn = document.getElementById('tc-reset-data');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('Reset seluruh data ke kondisi awal pabrik?')) {
          store.resetToDefault();
          alert('Data telah direset.');
          this.switchView('event');
        }
      });
    }

    // Help Button
    const helpBtn = document.getElementById('tc-help');
    if (helpBtn) {
      helpBtn.addEventListener('click', () => {
        alert('Pusat Bantuan Lokarena:\n- Email: support@lokarena.id\n- WhatsApp: +62 812-3456-7890\n- Jam Operasional: 08.00–20.00 WIB');
      });
    }
  }

  // ==========================================
  // VIEW: EVENT DETAIL (C03)
  // ==========================================
  renderEventDetail() {
    const event = store.data.events.find(e => e.id === this.selectedEventId) || store.data.events[0];
    const ticketTypes = store.data.ticketTypes.filter(tt => tt.event_id === event.id && tt.visible);

    // Update Header Text & Breadcrumbs
    const crumb = document.getElementById('tc-event-crumb');
    if (crumb) crumb.textContent = `Event / ${event.category}`;

    const titleEl = document.getElementById('tc-event-title');
    if (titleEl) titleEl.textContent = event.title;

    const descEl = document.getElementById('tc-event-desc');
    if (descEl) descEl.textContent = event.description;

    const dateEl = document.getElementById('tc-event-date');
    if (dateEl) dateEl.textContent = event.date_display;

    const timeEl = document.getElementById('tc-event-time');
    if (timeEl) timeEl.textContent = event.time_display;

    const venueEl = document.getElementById('tc-event-venue');
    if (venueEl) venueEl.textContent = event.venue;

    const cityEl = document.getElementById('tc-event-city');
    if (cityEl) cityEl.textContent = event.city;

    // Speakers
    const speakersContainer = document.getElementById('tc-speakers-list');
    if (speakersContainer) {
      speakersContainer.innerHTML = (event.speakers || []).map(sp => `
        <div class="tc-speaker">
          <div class="tc-portrait ${sp.portraitIndex === 1 ? 'tc-middle' : sp.portraitIndex === 2 ? 'tc-last' : ''}" role="img" aria-label="${sp.name}"></div>
          <strong>${sp.name}</strong>
          <div class="tc-muted">${sp.role}</div>
        </div>
      `).join('');
    }

    // Agenda
    const agendaContainer = document.getElementById('tc-agenda-list');
    if (agendaContainer) {
      agendaContainer.innerHTML = (event.agenda || []).map(ag => `
        <div class="tc-agenda">
          <span class="tc-muted">${ag.time}</span>
          <div>
            <strong>${ag.title}</strong>
            <div class="tc-muted tc-small">${ag.note}</div>
          </div>
        </div>
      `).join('');
    }

    // Ticket Selector Options
    const ticketContainer = document.getElementById('tc-ticket-selector');
    if (ticketContainer) {
      ticketContainer.innerHTML = ticketTypes.map(tt => {
        const available = tt.quota - tt.allocated - (tt.reserved || 0);
        const isSoldOut = available <= 0;
        const isSelected = tt.id === this.selectedTicketTypeId;

        return `
          <div class="tc-ticket-option ${isSelected ? 'tc-selected' : ''}" data-tt-id="${tt.id}" style="border: 2px solid ${isSelected ? 'var(--tc-brand)' : 'var(--tc-line)'}; border-radius: var(--radius-md); padding: 14px; margin-bottom: 12px; cursor: ${isSoldOut ? 'not-allowed' : 'pointer'}; opacity: ${isSoldOut ? 0.6 : 1}">
            <div class="tc-row" style="margin-bottom: 4px">
              <div>
                <strong>${tt.name}</strong>
                <div class="tc-muted tc-small">${tt.description || ''}</div>
              </div>
              <span class="tc-pill ${isSoldOut ? 'tc-danger' : 'tc-ok'}">${isSoldOut ? 'Sold Out' : `Sisa ${available}`}</span>
            </div>
            <div class="tc-price" style="font-size: 20px">${tt.price_idr === 0 ? 'GRATIS' : 'Rp' + tt.price_idr.toLocaleString('id-ID')}</div>
            <ul class="tc-list" style="margin: 8px 0 0">
              ${(tt.benefits || []).map(b => `<li><i data-lucide="check"></i>${b}</li>`).join('')}
            </ul>
          </div>
        `;
      }).join('');

      ticketContainer.querySelectorAll('.tc-ticket-option').forEach(el => {
        el.addEventListener('click', () => {
          const ttId = el.dataset.ttId;
          const tt = ticketTypes.find(t => t.id === ttId);
          const available = tt.quota - tt.allocated - (tt.reserved || 0);
          if (available > 0) {
            this.selectedTicketTypeId = ttId;
            this.ticketQty = 1;
            this.renderEventDetail();
          }
        });
      });
    }

    // Quantity controls & total update
    const selectedTT = ticketTypes.find(t => t.id === this.selectedTicketTypeId) || ticketTypes[0];
    if (selectedTT) {
      const available = selectedTT.quota - selectedTT.allocated - (selectedTT.reserved || 0);
      const maxAllowed = Math.min(selectedTT.max_per_order || 4, available);

      const qtyEl = document.getElementById('tc-qty');
      if (qtyEl) qtyEl.textContent = this.ticketQty;

      const minusBtn = document.getElementById('tc-minus');
      if (minusBtn) {
        minusBtn.disabled = (this.ticketQty <= 1);
        minusBtn.onclick = () => {
          if (this.ticketQty > 1) {
            this.ticketQty--;
            this.renderEventDetail();
          }
        };
      }

      const plusBtn = document.getElementById('tc-plus');
      if (plusBtn) {
        plusBtn.disabled = (this.ticketQty >= maxAllowed);
        plusBtn.onclick = () => {
          if (this.ticketQty < maxAllowed) {
            this.ticketQty++;
            this.renderEventDetail();
          }
        };
      }

      const totalEl = document.getElementById('tc-event-total');
      if (totalEl) {
        const total = selectedTT.price_idr * this.ticketQty;
        totalEl.textContent = total === 0 ? 'GRATIS' : 'Rp' + total.toLocaleString('id-ID');
      }

      // Proceed to checkout CTA
      const proceedBtn = document.getElementById('tc-btn-to-checkout');
      if (proceedBtn) {
        proceedBtn.disabled = (available <= 0);
        proceedBtn.onclick = () => {
          this.switchView('checkout');
        };
      }
    }
  }

  // ==========================================
  // VIEW: EVENTS DISCOVERY (C01 & C02)
  // ==========================================
  renderEventsDiscovery() {
    const listContainer = document.getElementById('tc-discovery-list');
    if (!listContainer) return;

    const events = store.data.events.filter(e => e.publication_status === 'published');
    listContainer.innerHTML = events.map(evt => `
      <div class="tc-panel" style="display: flex; gap: 20px; align-items: center; margin-bottom: 16px; cursor: pointer;" data-event-id="${evt.id}">
        <div class="tc-event-thumb" style="width: 100px; height: 90px; border-radius: 10px;"></div>
        <div style="flex: 1">
          <div class="tc-row" style="margin-bottom: 4px">
            <span class="tc-pill">${evt.category}</span>
            <span class="tc-muted tc-small">${evt.city}</span>
          </div>
          <h3 style="margin: 4px 0">${evt.title}</h3>
          <p class="tc-muted tc-small" style="margin: 0">${evt.date_display} · ${evt.time_display}</p>
        </div>
        <button class="tc-secondary">Buka Detail <i data-lucide="arrow-right"></i></button>
      </div>
    `).join('');

    listContainer.querySelectorAll('[data-event-id]').forEach(card => {
      card.addEventListener('click', () => {
        this.selectedEventId = card.dataset.eventId;
        this.selectedTicketTypeId = store.data.ticketTypes.find(tt => tt.event_id === this.selectedEventId)?.id;
        this.ticketQty = 1;
        this.switchView('event');
      });
    });
  }

  // ==========================================
  // VIEW: REGISTRATION & CHECKOUT (C04 & C05)
  // ==========================================
  renderCheckoutView() {
    const event = store.data.events.find(e => e.id === this.selectedEventId);
    const ticketType = store.data.ticketTypes.find(tt => tt.id === this.selectedTicketTypeId);

    if (!event || !ticketType) {
      this.switchView('event');
      return;
    }

    // Event preview in summary
    const summaryEventTitle = document.getElementById('tc-checkout-event-title');
    if (summaryEventTitle) summaryEventTitle.textContent = event.title;

    const summaryEventMeta = document.getElementById('tc-checkout-event-meta');
    if (summaryEventMeta) summaryEventMeta.textContent = `${event.date_display} · ${event.city}`;

    // Generate Attendee inputs dynamically according to quantity
    const attendeeContainer = document.getElementById('tc-attendee-fields');
    if (attendeeContainer) {
      attendeeContainer.innerHTML = '';
      for (let i = 0; i < this.ticketQty; i++) {
        const wrap = document.createElement('div');
        wrap.className = 'tc-panel';
        wrap.style.padding = '14px';
        wrap.style.marginBottom = '12px';
        wrap.style.background = 'var(--tc-bg)';

        wrap.innerHTML = `
          <strong>Peserta ${i + 1} (${ticketType.name})</strong>
          <div class="tc-formgrid" style="margin-top: 8px">
            <div>
              <label for="tc-att-name-${i}">Nama Lengkap</label>
              <input id="tc-att-name-${i}" required placeholder="Sesuai kartu identitas">
            </div>
            <div>
              <label for="tc-att-email-${i}">Email Peserta</label>
              <input id="tc-att-email-${i}" type="email" required placeholder="Tujuan pengiriman tiket">
            </div>
          </div>
        `;
        attendeeContainer.appendChild(wrap);
      }
    }

    // Same as buyer checkbox logic
    const sameBuyerCheckbox = document.getElementById('tc-same-as-buyer');
    const buyerNameInput = document.getElementById('tc-buyer-name');
    const buyerEmailInput = document.getElementById('tc-buyer-email');

    const syncBuyerToAttendee1 = () => {
      if (sameBuyerCheckbox && sameBuyerCheckbox.checked) {
        const att1Name = document.getElementById('tc-att-name-0');
        const att1Email = document.getElementById('tc-att-email-0');
        if (att1Name && buyerNameInput) {
          att1Name.value = buyerNameInput.value;
          att1Name.readOnly = true;
        }
        if (att1Email && buyerEmailInput) {
          att1Email.value = buyerEmailInput.value;
          att1Email.readOnly = true;
        }
      } else {
        const att1Name = document.getElementById('tc-att-name-0');
        const att1Email = document.getElementById('tc-att-email-0');
        if (att1Name) att1Name.readOnly = false;
        if (att1Email) att1Email.readOnly = false;
      }
    };

    if (buyerNameInput) buyerNameInput.oninput = syncBuyerToAttendee1;
    if (buyerEmailInput) buyerEmailInput.oninput = syncBuyerToAttendee1;
    if (sameBuyerCheckbox) sameBuyerCheckbox.onchange = syncBuyerToAttendee1;

    syncBuyerToAttendee1();

    // Price recalculation
    this.updateCheckoutTotals();

    // Voucher application button
    const applyVoucherBtn = document.getElementById('tc-btn-apply-voucher');
    const voucherInput = document.getElementById('tc-voucher-code');
    const voucherMsg = document.getElementById('tc-voucher-msg');

    if (applyVoucherBtn && voucherInput) {
      applyVoucherBtn.onclick = () => {
        const code = voucherInput.value.trim().toUpperCase();
        this.appliedVoucherCode = code;
        this.updateCheckoutTotals();
      };
    }

    // Submit Checkout Form
    const checkoutForm = document.getElementById('tc-checkout-form');
    if (checkoutForm) {
      checkoutForm.onsubmit = (e) => {
        e.preventDefault();

        // Extract attendee data
        const attendees = [];
        for (let i = 0; i < this.ticketQty; i++) {
          const nameInput = document.getElementById(`tc-att-name-${i}`);
          const emailInput = document.getElementById(`tc-att-email-${i}`);
          attendees.push({
            name: nameInput ? nameInput.value.trim() : '',
            email: emailInput ? emailInput.value.trim() : ''
          });
        }

        try {
          const newOrder = store.createOrder({
            eventId: event.id,
            buyer: {
              name: buyerNameInput.value.trim(),
              email: buyerEmailInput.value.trim(),
              phone: (document.getElementById('tc-buyer-phone')?.value || '081234567890').trim()
            },
            items: [{
              ticketTypeId: ticketType.id,
              quantity: this.ticketQty,
              attendees: attendees
            }],
            voucherCode: this.appliedVoucherCode,
            termsAccepted: document.getElementById('tc-terms-check')?.checked
          });

          this.activeOrder = newOrder;

          if (newOrder.status === 'confirmed') {
            // Free order directly confirmed!
            const firstTicket = store.data.tickets.find(t => t.order_id === newOrder.id);
            alert('Pendaftaran berhasil! Tiket gratis Anda telah terkonfirmasi.');
            this.switchView('ticket', { ticket: firstTicket });
          } else {
            // Paid order -> go to payment screen
            this.switchView('payment');
          }
        } catch (err) {
          alert('Gagal membuat pesanan: ' + err.message);
        }
      };
    }
  }

  updateCheckoutTotals() {
    const ticketType = store.data.ticketTypes.find(tt => tt.id === this.selectedTicketTypeId);
    if (!ticketType) return;

    try {
      const quote = store.calculateQuote(
        this.selectedEventId,
        [{ ticketTypeId: ticketType.id, quantity: this.ticketQty }],
        this.appliedVoucherCode,
        document.getElementById('tc-buyer-email')?.value || ''
      );

      document.getElementById('tc-checkout-item-title').textContent = `${ticketType.name} × ${this.ticketQty}`;
      document.getElementById('tc-checkout-subtotal').textContent = 'Rp' + quote.subtotal.toLocaleString('id-ID');
      document.getElementById('tc-checkout-discount').textContent = quote.discount > 0 ? `−Rp${quote.discount.toLocaleString('id-ID')}` : 'Rp0';
      document.getElementById('tc-checkout-total').textContent = quote.total === 0 ? 'GRATIS (Rp0)' : 'Rp' + quote.total.toLocaleString('id-ID');

      const voucherMsg = document.getElementById('tc-voucher-msg');
      if (voucherMsg) {
        if (quote.appliedVoucher) {
          voucherMsg.textContent = `Promo berhasil digunakan (${quote.appliedVoucher.code})! Hemat Rp${quote.discount.toLocaleString('id-ID')}`;
          voucherMsg.style.color = 'var(--tc-green)';
        } else if (this.appliedVoucherCode) {
          voucherMsg.textContent = quote.voucherError || 'Kode promo tidak berlaku.';
          voucherMsg.style.color = 'var(--tc-red)';
        } else {
          voucherMsg.textContent = '';
        }
      }
    } catch (e) {
      console.warn('Quote error:', e);
    }
  }

  // ==========================================
  // VIEW: PAYMENT INSTRUCTION & SIMULATOR (C06)
  // ==========================================
  renderPaymentView() {
    if (!this.activeOrder) {
      // Find latest pending order if none
      this.activeOrder = store.data.orders.find(o => o.status === 'pending_payment');
    }

    if (!this.activeOrder) {
      alert('Tidak ada pembayaran aktif.');
      this.switchView('event');
      return;
    }

    const order = this.activeOrder;
    document.getElementById('tc-pay-ord-number').textContent = order.number;
    document.getElementById('tc-pay-amount').textContent = 'Rp' + order.total.toLocaleString('id-ID');

    // Countdown Timer logic (15 minutes)
    if (this.paymentTimerInterval) clearInterval(this.paymentTimerInterval);

    const updateTimer = () => {
      const now = Date.now();
      const expires = new Date(order.expires_at).getTime();
      const remainingSec = Math.max(0, Math.floor((expires - now) / 1000));

      const min = Math.floor(remainingSec / 60);
      const sec = remainingSec % 60;
      const timerEl = document.getElementById('tc-pay-countdown');
      if (timerEl) {
        timerEl.textContent = `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
      }

      if (remainingSec <= 0) {
        clearInterval(this.paymentTimerInterval);
        document.getElementById('tc-pay-status-note').textContent = 'Waktu pembayaran telah habis. Pesanan dibatalkan.';
        document.getElementById('tc-pay-status-note').className = 'tc-toast tc-error';
      }
    };

    updateTimer();
    this.paymentTimerInterval = setInterval(updateTimer, 1000);

    // Method Selection Switcher
    const methodSelect = document.getElementById('tc-payment-method-select');
    const methodDetails = document.getElementById('tc-payment-method-details');

    const updateMethodDetails = () => {
      const method = methodSelect ? methodSelect.value : 'qris';
      if (method === 'qris') {
        methodDetails.innerHTML = `
          <div style="text-align: center; padding: 16px; background: #fff; border-radius: var(--radius-md); margin-top: 10px; color: #000">
            <strong>QRIS Lokarena Transaksi</strong>
            <div id="tc-qris-canvas-holder" style="margin: 12px auto; width: 160px; height: 160px;"></div>
            <div class="tc-small tc-muted">Scan menggunakan GoPay, OVO, Dana, BCA, atau aplikasi perbankan</div>
          </div>
        `;
        const holder = document.getElementById('tc-qris-canvas-holder');
        if (holder) {
          const canvas = document.createElement('canvas');
          LokarenaQR.renderToCanvas(canvas, `00020101021226590014ID.LINKAJA.WWW01189360091100000000005204581253033605405${order.total}5802ID5910LOKARENA6007JAKARTA62170113${order.number}`);
          canvas.style.width = '160px';
          canvas.style.height = '160px';
          holder.appendChild(canvas);
        }
      } else if (method === 'va_bca') {
        methodDetails.innerHTML = `
          <div class="tc-panel" style="background: var(--tc-bg); padding: 14px; margin-top: 10px">
            <span class="tc-muted tc-small">Nomor Virtual Account BCA</span>
            <div class="tc-row" style="margin: 4px 0">
              <strong style="font-size: 18px; letter-spacing: 1px">88001 0812 3456 7890</strong>
              <button class="tc-secondary" style="min-height: 32px; padding: 4px 10px; font-size: 11px" onclick="alert('Nomor VA disalin!')">Salin</button>
            </div>
            <div class="tc-small tc-muted">Menerima transfer dari seluruh bank (Jaringan Prima / ATM Bersama)</div>
          </div>
        `;
      } else if (method === 'va_mandiri') {
        methodDetails.innerHTML = `
          <div class="tc-panel" style="background: var(--tc-bg); padding: 14px; margin-top: 10px">
            <span class="tc-muted tc-small">Kode Perusahaan & Nomor Mandiri VA</span>
            <div class="tc-row" style="margin: 4px 0">
              <strong style="font-size: 18px; letter-spacing: 1px">70012 9981 2345 6789</strong>
              <button class="tc-secondary" style="min-height: 32px; padding: 4px 10px; font-size: 11px" onclick="alert('Nomor VA disalin!')">Salin</button>
            </div>
          </div>
        `;
      } else {
        methodDetails.innerHTML = `
          <div class="tc-panel" style="background: var(--tc-bg); padding: 14px; margin-top: 10px">
            <span class="tc-muted tc-small">E-Wallet (GoPay / OVO / Dana / ShopeePay)</span>
            <p style="margin: 6px 0 0">Notifikasi push akan dikirim ke nomor HP pembeli <strong>${order.buyer_phone}</strong></p>
          </div>
        `;
      }
    };

    if (methodSelect) {
      methodSelect.onchange = updateMethodDetails;
      updateMethodDetails();
    }

    // Simulation Buttons
    const btnSimSuccess = document.getElementById('tc-btn-sim-pay-success');
    if (btnSimSuccess) {
      btnSimSuccess.onclick = () => {
        const method = methodSelect ? methodSelect.options[methodSelect.selectedIndex].text : 'QRIS';
        const updated = store.simulatePaymentSuccess(order.id, method);
        this.playBeep(true);
        const firstTicket = store.data.tickets.find(t => t.order_id === order.id);
        alert('Pembayaran berhasil diverifikasi oleh server! E-Ticket telah diterbitkan.');
        this.switchView('ticket', { ticket: firstTicket });
      };
    }

    const btnSimFail = document.getElementById('tc-btn-sim-pay-failed');
    if (btnSimFail) {
      btnSimFail.onclick = () => {
        store.simulatePaymentFailure(order.id, 'Simulasi pembatalan oleh pembeli');
        this.playBeep(false);
        alert('Status pesanan diubah menjadi BATAL / EXPIRED. Reservasi tiket dilepaskan.');
        this.switchView('event');
      };
    }

    const btnSimLate = document.getElementById('tc-btn-sim-pay-late');
    if (btnSimLate) {
      btnSimLate.onclick = () => {
        // Expire order first, then simulate webhook arrival
        order.status = 'expired';
        const updated = store.simulatePaymentSuccess(order.id, 'Late Payment Webhook');
        this.playBeep(false);
        alert(`Skenario Edge Case: Pembayaran diterima setelah batas waktu (Order ${order.number}). Sistem menahan status di 'MANUAL_REVIEW' untuk audit admin.`);
        this.switchView('admin');
      };
    }
  }

  // ==========================================
  // VIEW: E-TICKET (C08)
  // ==========================================
  renderTicketView(ticketObj) {
    let ticket = ticketObj;
    if (!ticket) {
      // Find latest valid ticket
      ticket = store.data.tickets[store.data.tickets.length - 1];
    }

    if (!ticket) {
      alert('Belum ada e-ticket yang terbit.');
      this.switchView('event');
      return;
    }

    this.activeTicket = ticket;

    const event = store.data.events.find(e => e.id === ticket.event_id) || store.data.events[0];
    const attendee = store.data.attendees.find(a => a.id === ticket.attendee_id) || {};
    const ticketType = store.data.ticketTypes.find(tt => tt.id === ticket.ticket_type_id) || {};
    const order = store.data.orders.find(o => o.id === ticket.order_id) || {};
    const checkIn = store.data.checkIns.find(c => c.ticket_id === ticket.id);

    // Populate Fields
    document.getElementById('tc-ticket-event-title').textContent = event.title;
    document.getElementById('tc-ticket-event-date').textContent = `${event.date_display} · ${event.time_display}`;
    document.getElementById('tc-ticket-type-name').textContent = ticketType.name || 'Pass';
    document.getElementById('tc-ticket-attendee-name').textContent = attendee.name || 'Nama Peserta';
    document.getElementById('tc-ticket-code-label').textContent = `${ticket.public_code} · Order #${order.number || ''}`;
    document.getElementById('tc-ticket-venue').textContent = event.venue;
    document.getElementById('tc-ticket-time').textContent = event.time_display;

    // Online webinar access link if hybrid/online
    const webinarWrap = document.getElementById('tc-ticket-webinar-link');
    if (webinarWrap) {
      if (event.online_access_ref && ticket.status === 'valid') {
        webinarWrap.hidden = false;
        webinarWrap.innerHTML = `<strong>Tautan Webinar:</strong> <a href="${event.online_access_ref}" target="_blank" style="color: var(--tc-brand)">${event.online_access_ref}</a>`;
      } else {
        webinarWrap.hidden = true;
      }
    }

    // Status Badge
    const statusPill = document.getElementById('tc-ticket-status-pill');
    if (statusPill) {
      if (ticket.status === 'refunded') {
        statusPill.textContent = 'Refunded';
        statusPill.className = 'tc-pill tc-danger';
      } else if (checkIn) {
        statusPill.textContent = 'Sudah Check-In';
        statusPill.className = 'tc-pill tc-ok';
      } else {
        statusPill.textContent = 'Terkonfirmasi (Valid)';
        statusPill.className = 'tc-pill tc-ok';
      }
    }

    // Render Canvas QR Code
    const qrHolder = document.getElementById('tc-ticket-qr');
    if (qrHolder) {
      qrHolder.innerHTML = '';
      const canvas = document.createElement('canvas');
      LokarenaQR.renderToCanvas(canvas, ticket.qr_token_hash, { size: 25, scale: 6 });
      canvas.style.width = '160px';
      canvas.style.height = '160px';
      canvas.style.display = 'block';
      canvas.style.margin = '0 auto';
      qrHolder.appendChild(canvas);
    }

    // Print / PDF Button
    const downloadBtn = document.getElementById('tc-download-ticket-btn');
    if (downloadBtn) {
      downloadBtn.onclick = () => {
        window.print();
      };
    }
  }

  // ==========================================
  // VIEW: PARTICIPANT MY TICKETS (C09 & C10)
  // ==========================================
  renderMyTicketsView() {
    const listContainer = document.getElementById('tc-mytickets-list');
    const form = document.getElementById('tc-magiclink-form');
    const emailInput = document.getElementById('tc-magiclink-email');
    const resultWrap = document.getElementById('tc-mytickets-result');

    if (form) {
      form.onsubmit = (e) => {
        e.preventDefault();
        const email = emailInput.value.trim();
        const items = store.getTicketsByEmail(email);

        resultWrap.hidden = false;
        if (items.length === 0) {
          listContainer.innerHTML = `
            <div class="tc-panel" style="text-align: center; padding: 24px;">
              <p class="tc-muted">Tidak ditemukan tiket yang terhubung dengan email <strong>${email}</strong>.</p>
              <button class="tc-secondary" onclick="document.getElementById('tc-magiclink-email').focus()">Coba Email Lain</button>
            </div>
          `;
        } else {
          listContainer.innerHTML = items.map(item => `
            <div class="tc-panel" style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center">
              <div>
                <span class="tc-pill ${item.checkIn ? 'tc-ok' : ''}">${item.checkIn ? 'Sudah Check-In' : 'Aktif'}</span>
                <h3 style="margin: 6px 0 2px">${item.event.title}</h3>
                <div class="tc-muted tc-small">${item.ticketType.name} · Peserta: <strong>${item.attendee.name}</strong></div>
                <div class="tc-muted tc-small">Kode: ${item.ticket.public_code} · Order #${item.order.number}</div>
              </div>
              <button class="tc-primary tc-view-single-tix" data-tix-id="${item.ticket.id}">
                Buka E-Ticket <i data-lucide="arrow-right"></i>
              </button>
            </div>
          `).join('');

          listContainer.querySelectorAll('.tc-view-single-tix').forEach(btn => {
            btn.onclick = () => {
              const tix = store.data.tickets.find(t => t.id === btn.dataset.tixId);
              this.switchView('ticket', { ticket: tix });
            };
          });
          renderIcons(listContainer);
        }
      };
    }
  }

  // ==========================================
  // VIEW: CHECK-IN STAFF SCANNER (S01, S02, S03)
  // ==========================================
  renderScannerView() {
    const eventSelect = document.getElementById('tc-scanner-event-select');
    if (eventSelect) {
      eventSelect.innerHTML = store.data.events.map(e => `
        <option value="${e.id}" ${e.id === this.scannerEventId ? 'selected' : ''}>${e.title}</option>
      `).join('');

      eventSelect.onchange = () => {
        this.scannerEventId = eventSelect.value;
        this.renderScannerView();
      };
    }

    // Toggle Camera Stream
    const toggleCamBtn = document.getElementById('tc-toggle-camera-btn');
    if (toggleCamBtn) {
      toggleCamBtn.onclick = () => {
        if (this.scannerVideoTrack) {
          this.stopScannerCamera();
          toggleCamBtn.textContent = 'Nyalakan Kamera';
        } else {
          this.startScannerCamera();
          toggleCamBtn.textContent = 'Matikan Kamera';
        }
      };
    }

    // Simulate Scan button
    const simScanBtn = document.getElementById('tc-btn-sim-scan');
    if (simScanBtn) {
      simScanBtn.onclick = () => {
        // Find tickets for this event
        const tickets = store.data.tickets.filter(t => t.event_id === this.scannerEventId);
        if (tickets.length === 0) {
          alert('Belum ada tiket terdaftar untuk event ini. Buat order terlebih dahulu!');
          return;
        }

        // Pick one (alternate between checked in and not checked in)
        const unchecked = tickets.find(t => !store.data.checkIns.some(c => c.ticket_id === t.id));
        const candidate = unchecked || tickets[0];

        this.processScanValidation(candidate.qr_token_hash);
      };
    }

    // Manual Search & Toggle
    const manualToggleBtn = document.getElementById('tc-manual-search-toggle');
    const manualBox = document.getElementById('tc-scanner-manual-box');
    if (manualToggleBtn && manualBox) {
      manualToggleBtn.onclick = () => {
        manualBox.hidden = !manualBox.hidden;
      };
    }

    const manualSearchInput = document.getElementById('tc-scanner-manual-input');
    const manualFindBtn = document.getElementById('tc-scanner-manual-find-btn');
    const manualResults = document.getElementById('tc-scanner-manual-results');

    if (manualFindBtn && manualSearchInput) {
      manualFindBtn.onclick = () => {
        const query = manualSearchInput.value.trim();
        const matches = store.searchAttendeesForStaff(this.scannerEventId, query);
        if (matches.length === 0) {
          manualResults.innerHTML = `<p class="tc-error" style="margin-top: 8px">Tidak ditemukan peserta dengan kata kunci "${query}"</p>`;
        } else {
          manualResults.innerHTML = matches.map(m => `
            <div class="tc-panel" style="padding: 10px; margin-top: 8px; display: flex; justify-content: space-between; align-items: center">
              <div>
                <strong>${m.attendee.name}</strong> (${m.ticketType.name})
                <div class="tc-muted tc-small">Kode: ${m.ticket.public_code} · ${m.attendee.email}</div>
              </div>
              <button class="tc-secondary tc-pick-manual-tix" data-tix-code="${m.ticket.public_code}" style="min-height: 32px; padding: 4px 10px">Pilih</button>
            </div>
          `).join('');

          manualResults.querySelectorAll('.tc-pick-manual-tix').forEach(b => {
            b.onclick = () => {
              this.processScanValidation(b.dataset.tixCode, 'manual');
            };
          });
        }
      };
    }
  }

  async startScannerCamera() {
    const video = document.getElementById('tc-scanner-video');
    if (!video) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      video.srcObject = stream;
      video.play();
      this.scannerVideoTrack = stream.getVideoTracks()[0];
    } catch (err) {
      console.warn('Camera access denied or unavailable:', err);
      alert('Kamera tidak dapat diakses atau izin ditolak. Anda dapat menggunakan fitur "Simulasikan Scan" atau "Cari Manual".');
    }
  }

  stopScannerCamera() {
    if (this.scannerVideoTrack) {
      this.scannerVideoTrack.stop();
      this.scannerVideoTrack = null;
    }
    const video = document.getElementById('tc-scanner-video');
    if (video) video.srcObject = null;
  }

  processScanValidation(codeOrToken, method = 'scan') {
    const res = store.validateTicketForCheckIn(this.scannerEventId, codeOrToken);
    const resultBox = document.getElementById('tc-scan-result-box');
    if (!resultBox) return;

    resultBox.hidden = false;

    if (res.status === 'valid') {
      this.playBeep(true);
      resultBox.className = 'tc-result';
      resultBox.innerHTML = `
        <h3><i data-lucide="check"></i> Tiket Sah (Belum Check-In)</h3>
        <strong>${res.attendee.name}</strong>
        <div class="tc-muted tc-small">${res.ticketType.name} · ${res.ticket.public_code}</div>
        <p class="tc-small" style="margin: 8px 0 12px">${res.message}</p>
        ${method === 'manual' ? `
          <div style="margin-bottom: 12px">
            <label for="tc-manual-reason-input">Alasan Check-In Manual (Wajib)</label>
            <input id="tc-manual-reason-input" placeholder="Contoh: KTP cocok, HP peserta lowbat" required>
          </div>
        ` : ''}
        <button class="tc-primary tc-full" id="tc-btn-confirm-admit">Konfirmasi Check-In Sekarang</button>
      `;

      document.getElementById('tc-btn-confirm-admit').onclick = () => {
        let reason = null;
        if (method === 'manual') {
          const reasonInput = document.getElementById('tc-manual-reason-input');
          if (!reasonInput || !reasonInput.value.trim()) {
            alert('Alasan check-in manual wajib diisi!');
            return;
          }
          reason = reasonInput.value.trim();
        }

        try {
          store.commitCheckIn({
            ticketId: res.ticket.id,
            eventId: this.scannerEventId,
            staffId: 'stf-01',
            staffName: 'Staff Lokarena',
            method: method,
            reason: reason
          });
          this.playBeep(true);
          resultBox.className = 'tc-result';
          resultBox.innerHTML = `
            <h3><i data-lucide="check"></i> Check-In Berhasil</h3>
            <p><strong>${res.attendee.name}</strong> telah masuk ke venue acara.</p>
            <div class="tc-small tc-muted">Waktu: ${new Date().toLocaleTimeString('id-ID')} · Metode: ${method.toUpperCase()}</div>
          `;
          renderIcons(resultBox);
        } catch (err) {
          alert('Gagal check-in: ' + err.message);
        }
      };
    } else if (res.status === 'already_checked_in') {
      this.playBeep(false);
      resultBox.className = 'tc-result tc-duplicate';
      resultBox.innerHTML = `
        <h3><i data-lucide="shield-alert"></i> Peringatan: Tiket Sudah Check-In!</h3>
        <strong>${res.attendee ? res.attendee.name : 'Peserta'}</strong> (${res.ticket.public_code})
        <p class="tc-small" style="margin: 8px 0">${res.message}</p>
      `;
    } else {
      this.playBeep(false);
      resultBox.className = 'tc-result tc-invalid';
      resultBox.innerHTML = `
        <h3><i data-lucide="shield-alert"></i> Tiket Ditolak</h3>
        <p class="tc-small" style="margin: 8px 0">${res.message}</p>
      `;
    }

    renderIcons(resultBox);
  }

  // ==========================================
  // VIEW: ORGANIZER & ADMIN WORKSPACE (A01 - A12)
  // ==========================================
  renderAdminView() {
    // Admin Subtabs: Dashboard | Events | Orders | Participants | Vouchers | Audit
    document.querySelectorAll('[data-admin-tab]').forEach(tabBtn => {
      tabBtn.classList.toggle('tc-active', tabBtn.dataset.adminTab === this.adminTab);
      tabBtn.onclick = () => {
        this.adminTab = tabBtn.dataset.adminTab;
        this.renderAdminView();
      };
    });

    const titleEl = document.getElementById('tc-admin-view-title');
    if (titleEl) titleEl.textContent = this.adminTab;

    const contentHolder = document.getElementById('tc-admin-content-holder');
    if (!contentHolder) return;

    if (this.adminTab === 'Dashboard') {
      const metrics = store.getDashboardMetrics();
      contentHolder.innerHTML = `
        <div class="tc-stats">
          <div class="tc-stat">
            <span class="tc-muted tc-small">Total Dana Terkumpul (Net)</span>
            <strong>Rp${metrics.netCollected.toLocaleString('id-ID')}</strong>
            <span class="tc-muted tc-small">Gross: Rp${metrics.grossTicketSales.toLocaleString('id-ID')}</span>
          </div>
          <div class="tc-stat">
            <span class="tc-muted tc-small">Tiket Diterbitkan</span>
            <strong>${metrics.ticketsIssued} <span class="tc-muted tc-small">tiket</span></strong>
            <span class="tc-muted tc-small">Aktif: ${metrics.activeTickets}</span>
          </div>
          <div class="tc-stat">
            <span class="tc-muted tc-small">Kehadiran (Attendance Rate)</span>
            <strong>${metrics.attendanceRate}%</strong>
            <span class="tc-muted tc-small">${metrics.checkedInCount} dari ${metrics.activeTickets} hadir</span>
          </div>
        </div>

        ${metrics.manualReviewCount > 0 ? `
          <div class="tc-toast" style="background: var(--tc-ambersoft); color: var(--tc-amber); border: 1px solid var(--tc-amber); margin-bottom: 16px;">
            <i data-lucide="shield-alert"></i>
            <div>
              <strong>Perhatian:</strong> Ada ${metrics.manualReviewCount} order late payment dalam status <em>Manual Review</em> yang membutuhkan keputusan admin!
              <button class="tc-secondary" style="margin-left: 12px; min-height: 28px; padding: 2px 8px; font-size: 11px" onclick="window.lokarenaApp.adminTab='Orders'; window.lokarenaApp.renderAdminView();">Buka Orders</button>
            </div>
          </div>
        ` : ''}

        <div class="tc-panel" style="margin-top: 18px">
          <div class="tc-row">
            <h3 style="margin: 0">Order Terbaru</h3>
            <button class="tc-secondary" id="tc-btn-export-orders-csv"><i data-lucide="download"></i> Export Orders CSV</button>
          </div>
          <div class="tc-tablewrap">
            <table>
              <thead>
                <tr>
                  <th>No Order</th>
                  <th>Pembeli</th>
                  <th>Subtotal</th>
                  <th>Diskon</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${store.data.orders.slice(0, 5).map(o => `
                  <tr>
                    <td><strong>${o.number}</strong><div class="tc-muted tc-small">${new Date(o.created_at).toLocaleDateString('id-ID')}</div></td>
                    <td><strong>${o.buyer_name}</strong><div class="tc-muted tc-small">${o.buyer_email}</div></td>
                    <td>Rp${o.subtotal.toLocaleString('id-ID')}</td>
                    <td>Rp${o.discount.toLocaleString('id-ID')}</td>
                    <td><strong>Rp${o.total.toLocaleString('id-ID')}</strong></td>
                    <td>
                      <span class="tc-pill ${o.status === 'confirmed' ? 'tc-ok' : o.status === 'manual_review' ? 'tc-warning' : o.status === 'refunded' ? 'tc-danger' : ''}">${o.status.toUpperCase()}</span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;

      const exportBtn = document.getElementById('tc-btn-export-orders-csv');
      if (exportBtn) {
        exportBtn.onclick = () => {
          this.downloadCsv(store.exportOrdersCsv(this.selectedEventId), `Lokarena-Orders-${Date.now()}.csv`);
        };
      }
    } else if (this.adminTab === 'Events') {
      contentHolder.innerHTML = `
        <div class="tc-row" style="margin-bottom: 16px">
          <p class="tc-muted">Kelola seluruh event dan status publikasi.</p>
          <button class="tc-primary" id="tc-btn-create-event-modal"><i data-lucide="plus"></i> Tambah Event Baru</button>
        </div>
        <div class="tc-tablewrap">
          <table>
            <thead>
              <tr>
                <th>Judul Event</th>
                <th>Kategori / Tipe</th>
                <th>Jadwal</th>
                <th>Kapasitas</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              ${store.data.events.map(ev => `
                <tr>
                  <td><strong>${ev.title}</strong><div class="tc-muted tc-small">${ev.venue} (${ev.city})</div></td>
                  <td>${ev.category} · <span class="tc-pill">${ev.type}</span></td>
                  <td>${ev.date_display}<div class="tc-muted tc-small">${ev.time_display}</div></td>
                  <td>${ev.capacity} peserta</td>
                  <td><span class="tc-pill ${ev.publication_status === 'published' ? 'tc-ok' : 'tc-warning'}">${ev.publication_status}</span></td>
                  <td>
                    <button class="tc-secondary tc-toggle-event-pub" data-ev-id="${ev.id}" style="min-height: 32px; padding: 4px 10px; font-size: 11px">
                      ${ev.publication_status === 'published' ? 'Tarik Draft' : 'Publikasikan'}
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;

      contentHolder.querySelectorAll('.tc-toggle-event-pub').forEach(btn => {
        btn.onclick = () => {
          const ev = store.data.events.find(e => e.id === btn.dataset.evId);
          if (ev) {
            ev.publication_status = (ev.publication_status === 'published') ? 'draft' : 'published';
            store.saveData();
            store.logAudit('Super Admin', 'EVENT_STATUS_CHANGE', 'event', ev.id, `Status event ${ev.title} diubah menjadi ${ev.publication_status}`);
            this.renderAdminView();
          }
        };
      });

      const createBtn = document.getElementById('tc-btn-create-event-modal');
      if (createBtn) {
        createBtn.onclick = () => {
          const title = prompt('Judul Event Baru:');
          if (title && title.trim()) {
            const newEvt = {
              id: 'evt-' + Date.now(),
              slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
              title: title.trim(),
              category: 'Seminar',
              type: 'offline',
              timezone: 'WIB',
              start_at: new Date(Date.now() + 86400000 * 14).toISOString(),
              end_at: new Date(Date.now() + 86400000 * 14 + 28800000).toISOString(),
              date_display: '18 November 2026',
              time_display: '09.00–17.00 WIB',
              publication_status: 'published',
              capacity: 250,
              venue: 'Lokarena Conference Center',
              city: 'Jakarta',
              organizer_name: 'Lokarena Organizer',
              description: 'Event baru diselenggarakan oleh Lokarena.'
            };
            store.data.events.push(newEvt);

            // Add default regular ticket type
            store.data.ticketTypes.push({
              id: 'tt-' + Date.now(),
              event_id: newEvt.id,
              name: 'Regular Pass',
              price_idr: 200000,
              quota: 250,
              allocated: 0,
              reserved: 0,
              min_per_order: 1,
              max_per_order: 4,
              visible: true,
              benefits: ['Akses seminar penuh', 'Digital kit']
            });

            store.saveData();
            alert('Event baru berhasil dibuat dan dipublikasikan!');
            this.renderAdminView();
          }
        };
      }
    } else if (this.adminTab === 'Orders') {
      contentHolder.innerHTML = `
        <div class="tc-tablewrap">
          <table>
            <thead>
              <tr>
                <th>No Order</th>
                <th>Pembeli</th>
                <th>Total</th>
                <th>Status</th>
                <th>Aksi Operasional</th>
              </tr>
            </thead>
            <tbody>
              ${store.data.orders.map(o => `
                <tr>
                  <td>
                    <strong>${o.number}</strong>
                    <div class="tc-muted tc-small">${new Date(o.created_at).toLocaleString('id-ID')}</div>
                  </td>
                  <td>
                    <strong>${o.buyer_name}</strong>
                    <div class="tc-muted tc-small">${o.buyer_email} · ${o.buyer_phone}</div>
                  </td>
                  <td><strong>Rp${o.total.toLocaleString('id-ID')}</strong></td>
                  <td>
                    <span class="tc-pill ${o.status === 'confirmed' ? 'tc-ok' : o.status === 'manual_review' ? 'tc-warning' : o.status === 'refunded' ? 'tc-danger' : ''}">
                      ${o.status.toUpperCase()}
                    </span>
                  </td>
                  <td>
                    ${o.status === 'manual_review' ? `
                      <button class="tc-primary tc-resolve-review-approve" data-ord-id="${o.id}" style="min-height: 28px; padding: 2px 8px; font-size: 11px">Setujui & Fulfill</button>
                      <button class="tc-secondary tc-resolve-review-refund" data-ord-id="${o.id}" style="min-height: 28px; padding: 2px 8px; font-size: 11px">Refund</button>
                    ` : o.status === 'confirmed' ? `
                      <button class="tc-secondary tc-refund-order-btn" data-ord-id="${o.id}" style="min-height: 28px; padding: 2px 8px; font-size: 11px">Proses Refund</button>
                      <button class="tc-secondary tc-resend-order-btn" data-ord-id="${o.id}" style="min-height: 28px; padding: 2px 8px; font-size: 11px">Kirim Ulang Email</button>
                    ` : '-'}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;

      contentHolder.querySelectorAll('.tc-resolve-review-approve').forEach(b => {
        b.onclick = () => {
          store.resolveManualReview(b.dataset.ordId, 'fulfill', 'Super Admin');
          alert('Late payment disetujui! Stok dialokasikan dan e-ticket diterbitkan.');
          this.renderAdminView();
        };
      });

      contentHolder.querySelectorAll('.tc-resolve-review-refund').forEach(b => {
        b.onclick = () => {
          store.resolveManualReview(b.dataset.ordId, 'refund', 'Super Admin');
          alert('Late payment ditolak dan diproses refund.');
          this.renderAdminView();
        };
      });

      contentHolder.querySelectorAll('.tc-refund-order-btn').forEach(b => {
        b.onclick = () => {
          const reason = prompt('Masukkan alasan full refund:');
          if (reason && reason.trim()) {
            store.processFullRefund(b.dataset.ordId, reason.trim(), 'Super Admin');
            alert('Full refund berhasil diproses. Tiket dinonaktifkan.');
            this.renderAdminView();
          }
        };
      });

      contentHolder.querySelectorAll('.tc-resend-order-btn').forEach(b => {
        b.onclick = () => {
          alert('Notifikasi konfirmasi dan link tiket telah dikirim ulang ke email pembeli.');
        };
      });
    } else if (this.adminTab === 'Participants') {
      contentHolder.innerHTML = `
        <div class="tc-row" style="margin-bottom: 16px">
          <p class="tc-muted">Database peserta terdaftar dan status kehadiran.</p>
          <button class="tc-secondary" id="tc-btn-export-attendees-csv"><i data-lucide="download"></i> Export Attendees CSV</button>
        </div>
        <div class="tc-tablewrap">
          <table>
            <thead>
              <tr>
                <th>Nama Peserta</th>
                <th>Kontak</th>
                <th>Kode Tiket</th>
                <th>Check-In</th>
                <th>Waktu Masuk</th>
              </tr>
            </thead>
            <tbody>
              ${store.data.tickets.map(t => {
                const att = store.data.attendees.find(a => a.id === t.attendee_id) || {};
                const tt = store.data.ticketTypes.find(type => type.id === t.ticket_type_id) || {};
                const chk = store.data.checkIns.find(c => c.ticket_id === t.id);
                return `
                  <tr>
                    <td><strong>${att.name || '-'}</strong><div class="tc-muted tc-small">${tt.name || '-'}</div></td>
                    <td>${att.email || '-'}<div class="tc-muted tc-small">${att.phone || '-'}</div></td>
                    <td><code>${t.public_code}</code></td>
                    <td>
                      <span class="tc-pill ${chk ? 'tc-ok' : ''}">${chk ? 'SUDAH' : 'BELUM'}</span>
                    </td>
                    <td>${chk ? new Date(chk.checked_in_at).toLocaleTimeString('id-ID') : '-'}</td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      `;

      const expBtn = document.getElementById('tc-btn-export-attendees-csv');
      if (expBtn) {
        expBtn.onclick = () => {
          this.downloadCsv(store.exportAttendeesCsv(this.selectedEventId), `Lokarena-Attendees-${Date.now()}.csv`);
        };
      }
    } else if (this.adminTab === 'Vouchers') {
      contentHolder.innerHTML = `
        <div class="tc-row" style="margin-bottom: 16px">
          <p class="tc-muted">Voucher dan promo penjualan tiket.</p>
          <button class="tc-primary" id="tc-btn-add-voucher"><i data-lucide="plus"></i> Buat Voucher</button>
        </div>
        <div class="tc-tablewrap">
          <table>
            <thead>
              <tr>
                <th>Kode Promo</th>
                <th>Tipe & Nilai</th>
                <th>Min. Belanja</th>
                <th>Maks. Diskon</th>
                <th>Pemakaian</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${store.data.vouchers.map(v => `
                <tr>
                  <td><strong><code>${v.code}</code></strong><div class="tc-muted tc-small">${v.description}</div></td>
                  <td>${v.kind === 'percentage' ? `${v.value}%` : 'Rp' + v.value.toLocaleString('id-ID')}</td>
                  <td>Rp${v.min_spend.toLocaleString('id-ID')}</td>
                  <td>Rp${v.max_discount.toLocaleString('id-ID')}</td>
                  <td>${v.used_count} / ${v.usage_limit}</td>
                  <td><span class="tc-pill ${v.active ? 'tc-ok' : 'tc-danger'}">${v.active ? 'Aktif' : 'Nonaktif'}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;

      const addVchBtn = document.getElementById('tc-btn-add-voucher');
      if (addVchBtn) {
        addVchBtn.onclick = () => {
          const code = prompt('Kode Voucher baru (Contoh: EARLYBIRD):');
          if (code && code.trim()) {
            store.data.vouchers.push({
              id: 'vch-' + Date.now(),
              code: code.trim().toUpperCase(),
              kind: 'percentage',
              value: 15,
              max_discount: 75000,
              min_spend: 150000,
              usage_limit: 50,
              used_count: 0,
              per_email_limit: 1,
              active: true,
              description: 'Voucher promosi'
            });
            store.saveData();
            alert('Voucher baru berhasil dibuat!');
            this.renderAdminView();
          }
        };
      }
    } else if (this.adminTab === 'Audit') {
      contentHolder.innerHTML = `
        <div class="tc-tablewrap">
          <table>
            <thead>
              <tr>
                <th>Waktu</th>
                <th>Actor</th>
                <th>Action</th>
                <th>Entity</th>
                <th>Detail</th>
              </tr>
            </thead>
            <tbody>
              ${store.data.auditLogs.map(log => `
                <tr>
                  <td class="tc-small">${new Date(log.created_at).toLocaleString('id-ID')}</td>
                  <td><strong>${log.actor}</strong></td>
                  <td><code>${log.action}</code></td>
                  <td>${log.entity_type} (#${log.entity_id.slice(-6)})</td>
                  <td class="tc-small">${log.details}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    }

    renderIcons(contentHolder);
  }

  // --- Helper to Download CSV safely ---
  downloadCsv(content, filename) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

// Instantiate and expose to window
window.addEventListener('DOMContentLoaded', () => {
  window.lokarenaApp = new LokarenaApp();
});
