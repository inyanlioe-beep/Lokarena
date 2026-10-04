/**
 * Lokarena Central Data Store & State Engine
 * Implements full domain models, transactions, state machines, and LocalStorage persistence.
 * Based on PRD Lokarena v1.1 and Perencanaan Lokarena v1.1.
 */

const STORAGE_KEY = 'lokarena_ticketing_data_v1';

// Initial Seed Data
const DEFAULT_EVENTS = [
  {
    id: 'evt-2026-001',
    slug: 'seminar-inovasi-bisnis-2026',
    title: 'Seminar Inovasi & Bisnis 2026',
    tagline: 'Ide besar. Langkah nyata.',
    category: 'Seminar & Workshop',
    type: 'offline', // offline | online | hybrid
    timezone: 'WIB',
    start_at: '2026-10-24T09:00:00+07:00',
    end_at: '2026-10-24T16:00:00+07:00',
    date_display: '24 Oktober 2026',
    time_display: '09.00–16.00 WIB',
    publication_status: 'published', // draft | published | cancelled | archived
    capacity: 500,
    venue: 'Lokarena Hall',
    address: 'Jl. Sudirman Kav. 28, Karet Semanggi',
    city: 'Jakarta Selatan',
    maps_url: 'https://maps.google.com',
    online_access_ref: null,
    organizer_name: 'Lokarena Management',
    description: 'Satu hari untuk mengeksplorasi ide, belajar dari praktisi, dan membangun koneksi dengan pelaku bisnis. Bawa tantanganmu, pulang dengan langkah yang bisa diterapkan.',
    speakers: [
      { name: 'Maya Putri', role: 'Business Strategy', portraitIndex: 0 },
      { name: 'Arif Pratama', role: 'Digital Innovation', portraitIndex: 1 },
      { name: 'Nadia Rahma', role: 'Entrepreneurship', portraitIndex: 2 }
    ],
    agenda: [
      { time: '09.00', title: 'Opening & keynote', note: 'Mengubah ide menjadi peluang' },
      { time: '11.00', title: 'Diskusi bersama praktisi', note: 'Strategi bisnis yang bisa dijalankan' },
      { time: '13.30', title: 'Workshop & networking', note: 'Dari insight ke rencana aksi' }
    ]
  },
  {
    id: 'evt-2026-002',
    slug: 'workshop-ai-product-engineering',
    title: 'Hands-on AI & Cloud Engineering',
    tagline: 'Build Scalable Intelligent Systems',
    category: 'Workshop',
    type: 'hybrid',
    timezone: 'WIB',
    start_at: '2026-11-14T10:00:00+07:00',
    end_at: '2026-11-14T17:00:00+07:00',
    date_display: '14 November 2026',
    time_display: '10.00–17.00 WIB',
    publication_status: 'published',
    capacity: 200,
    venue: 'Lokarena Tech Hub & Zoom Webinar',
    address: 'Jl. Rasuna Said Blok X, Kuningan',
    city: 'Jakarta Selatan',
    online_access_ref: 'https://webinar.lokarena.id/join/ai-eng-2026',
    organizer_name: 'Lokarena Tech Circle',
    description: 'Pelajari arsitektur agen AI, LLM orchestration, dan deployment cloud production-ready dengan studi kasus nyata.',
    speakers: [
      { name: 'Reza Firmansyah', role: 'Principal AI Architect', portraitIndex: 1 },
      { name: 'Citra Dewi', role: 'Cloud Platform Lead', portraitIndex: 2 }
    ],
    agenda: [
      { time: '10.00', title: 'Modern Agentic Architecture', note: 'Tools, reasoning, and context optimization' },
      { time: '13.00', title: 'Production LLM Pipelines', note: 'Caching, latency, and reliability at scale' },
      { time: '15.30', title: 'Live Deployment Hackathon', note: 'Hands-on cloud build' }
    ]
  },
  {
    id: 'evt-2026-003',
    slug: 'tech-founders-gathering-2026',
    title: 'Indonesia Tech Founders Gathering',
    tagline: 'Exclusive Networking & Insights',
    category: 'Gathering',
    type: 'offline',
    timezone: 'WIB',
    start_at: '2026-12-05T18:00:00+07:00',
    end_at: '2026-12-05T21:30:00+07:00',
    date_display: '5 Desember 2026',
    time_display: '18.00–21.30 WIB',
    publication_status: 'published',
    capacity: 120,
    venue: 'Grand Sky Lounge',
    address: 'SCBD Lot 11',
    city: 'Jakarta',
    maps_url: 'https://maps.google.com',
    online_access_ref: null,
    organizer_name: 'Lokarena Leadership Forum',
    description: 'Sesi temu eksklusif para founder, CEO, dan tech leaders untuk bertukar insight seputar scaling, hiring, dan fundraising.',
    speakers: [
      { name: 'Handoko Tan', role: 'Venture Partner', portraitIndex: 0 },
      { name: 'Gita Pramesti', role: 'Serial Tech Founder', portraitIndex: 2 }
    ],
    agenda: [
      { time: '18.00', title: 'Dinner & Casual Mingling', note: 'Exclusive welcoming dinner' },
      { time: '19.15', title: 'Fireside Chat: Sustainable Growth', note: 'Navigating unit economics in 2027' },
      { time: '20.30', title: 'Closed-door Networking', note: 'Peer connections' }
    ]
  }
];

const DEFAULT_TICKET_TYPES = [
  {
    id: 'tt-001',
    event_id: 'evt-2026-001',
    name: 'Regular Pass',
    price_idr: 250000,
    quota: 350,
    allocated: 2,
    reserved: 0,
    min_per_order: 1,
    max_per_order: 4,
    visible: true,
    description: 'Akses satu hari penuh sesi seminar & workshop',
    benefits: [
      'Seluruh sesi seminar & workshop',
      'Materi digital & kit peserta',
      'Lunch & coffee break',
      'E-Sertifikat resmi'
    ]
  },
  {
    id: 'tt-002',
    event_id: 'evt-2026-001',
    name: 'VIP Networking Pass',
    price_idr: 500000,
    quota: 50,
    allocated: 0,
    reserved: 0,
    min_per_order: 1,
    max_per_order: 2,
    visible: true,
    description: 'Akses prioritas, tempat duduk depan & VIP dinner lounge',
    benefits: [
      'Semua benefit Regular Pass',
      'Tempat duduk baris terdepan (Front Row)',
      'VIP exclusive dinner bersama pembicara',
      'Goodie bag eksklusif Lokarena'
    ]
  },
  {
    id: 'tt-003',
    event_id: 'evt-2026-001',
    name: 'Komunitas / Pelajar (Gratis)',
    price_idr: 0,
    quota: 100,
    allocated: 0,
    reserved: 0,
    min_per_order: 1,
    max_per_order: 2,
    visible: true,
    description: 'Tiket beasiswa khusus perwakilan komunitas & mahasiswa',
    benefits: [
      'Akses sesi utama seminar',
      'Materi digital',
      'E-Sertifikat kehadiran'
    ]
  },
  // Tickets for Event 2
  {
    id: 'tt-004',
    event_id: 'evt-2026-002',
    name: 'Online Stream Only',
    price_idr: 150000,
    quota: 150,
    allocated: 0,
    reserved: 0,
    min_per_order: 1,
    max_per_order: 4,
    visible: true,
    description: 'Akses siaran langsung berkualitas tinggi & rekaman',
    benefits: [
      'Akses webinar interaktif via Zoom',
      'Akses rekaman sesi 30 hari',
      'Source code & repository materi'
    ]
  },
  {
    id: 'tt-005',
    event_id: 'evt-2026-002',
    name: 'In-Person Workshop',
    price_idr: 450000,
    quota: 50,
    allocated: 0,
    reserved: 0,
    min_per_order: 1,
    max_per_order: 2,
    visible: true,
    description: 'Tatap muka langsung dengan mentor di Lokarena Tech Hub',
    benefits: [
      'Hands-on lab terbimbing langsung',
      'Mentoring arsitektur 1-on-1',
      'Lunch & merchandise'
    ]
  },
  // Tickets for Event 3
  {
    id: 'tt-006',
    event_id: 'evt-2026-003',
    name: 'Executive Invite',
    price_idr: 750000,
    quota: 120,
    allocated: 0,
    reserved: 0,
    min_per_order: 1,
    max_per_order: 2,
    visible: true,
    description: 'Akses lengkap gathering eksklusif, networking, dan gourmet dinner',
    benefits: [
      'Akses private lounge',
      'Fine dining & beverages',
      'Networking directory akses'
    ]
  }
];

const DEFAULT_VOUCHERS = [
  {
    id: 'vch-001',
    code: 'LOKA20',
    kind: 'percentage', // percentage | fixed
    value: 20, // 20%
    max_discount: 100000,
    min_spend: 100000,
    usage_limit: 100,
    used_count: 0,
    per_email_limit: 1,
    active: true,
    description: 'Diskon 20% khusus perayaan peluncuran Lokarena (Maks. Rp100.000)'
  },
  {
    id: 'vch-002',
    code: 'HEMAT50K',
    kind: 'fixed',
    value: 50000, // Rp 50.000
    max_discount: 50000,
    min_spend: 250000,
    usage_limit: 50,
    used_count: 0,
    per_email_limit: 1,
    active: true,
    description: 'Potongan langsung Rp50.000 untuk transaksi minimal Rp250.000'
  }
];

// Initial pre-confirmed tickets for demonstration
const DEFAULT_ORDERS = [
  {
    id: 'ord-seed-001',
    number: 'ORD-20261004-000123',
    event_id: 'evt-2026-001',
    buyer_name: 'Budi Santoso',
    buyer_email: 'budi@example.com',
    buyer_phone: '081234567890',
    subtotal: 250000,
    discount: 0,
    fee: 0,
    total: 250000,
    status: 'confirmed', // pending_payment | processing | confirmed | expired | cancelled | manual_review | refund_pending | refunded
    payment_status: 'succeeded',
    payment_method: 'Virtual Account BCA',
    expires_at: '2026-10-04T12:00:00Z',
    created_at: '2026-10-04T08:30:00+07:00',
    paid_at: '2026-10-04T08:35:00+07:00',
    policy_version: 'terms_v1'
  },
  {
    id: 'ord-seed-002',
    number: 'ORD-20261004-000122',
    event_id: 'evt-2026-001',
    buyer_name: 'Sari Putri',
    buyer_email: 'sari@example.com',
    buyer_phone: '081298765432',
    subtotal: 250000,
    discount: 50000,
    fee: 0,
    total: 200000,
    status: 'confirmed',
    payment_status: 'succeeded',
    payment_method: 'QRIS',
    expires_at: '2026-10-04T12:00:00Z',
    created_at: '2026-10-04T08:15:00+07:00',
    paid_at: '2026-10-04T08:18:00+07:00',
    policy_version: 'terms_v1'
  }
];

const DEFAULT_ATTENDEES = [
  {
    id: 'att-seed-001',
    order_id: 'ord-seed-001',
    slot_index: 0,
    name: 'Budi Santoso',
    email: 'budi@example.com',
    phone: '081234567890'
  },
  {
    id: 'att-seed-002',
    order_id: 'ord-seed-002',
    slot_index: 0,
    name: 'Sari Putri',
    email: 'sari@example.com',
    phone: '081298765432'
  }
];

const DEFAULT_TICKETS = [
  {
    id: 'tix-seed-001',
    order_id: 'ord-seed-001',
    attendee_id: 'att-seed-001',
    event_id: 'evt-2026-001',
    ticket_type_id: 'tt-001',
    public_code: 'TIX-DEMO-001',
    qr_token_hash: 'LK-QR-89F7A23B19E04D',
    status: 'valid', // valid | suspended | cancelled | refunded
    issued_at: '2026-10-04T08:35:00+07:00'
  },
  {
    id: 'tix-seed-002',
    order_id: 'ord-seed-002',
    attendee_id: 'att-seed-002',
    event_id: 'evt-2026-001',
    ticket_type_id: 'tt-001',
    public_code: 'TIX-DEMO-002',
    qr_token_hash: 'LK-QR-12C59D80E3FA71',
    status: 'valid',
    issued_at: '2026-10-04T08:18:00+07:00'
  }
];

const DEFAULT_CHECKINS = [
  // TIX-DEMO-002 has already checked in to demonstrate duplicate check-in detection!
  {
    id: 'chk-seed-001',
    ticket_id: 'tix-seed-002',
    event_id: 'evt-2026-001',
    staff_id: 'stf-01',
    staff_name: 'Dian Permana',
    checked_in_at: '2026-10-04T09:12:00+07:00',
    method: 'scan', // scan | manual
    reason: null
  }
];

const DEFAULT_AUDIT_LOGS = [
  {
    id: 'aud-001',
    actor: 'Super Admin',
    action: 'EVENT_PUBLISH',
    entity_type: 'event',
    entity_id: 'evt-2026-001',
    details: 'Event Seminar Inovasi & Bisnis 2026 published',
    created_at: '2026-10-01T10:00:00+07:00'
  },
  {
    id: 'aud-002',
    actor: 'Staff Dian',
    action: 'CHECK_IN_SCAN',
    entity_type: 'ticket',
    entity_id: 'tix-seed-002',
    details: 'Checked in attendee Sari Putri (TIX-DEMO-002) via QR Scanner',
    created_at: '2026-10-04T09:12:00+07:00'
  }
];

export class LokarenaStore {
  constructor() {
    this.data = this.loadData();
    this.listeners = new Set();
    this.startReservationExpiryWorker();
  }

  loadData() {
    try {
      if (typeof localStorage !== 'undefined') {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          return JSON.parse(stored);
        }
      }
    } catch (e) {
      console.warn('Could not read from localStorage, using seed defaults:', e);
    }

    return {
      events: DEFAULT_EVENTS,
      ticketTypes: DEFAULT_TICKET_TYPES,
      orders: DEFAULT_ORDERS,
      attendees: DEFAULT_ATTENDEES,
      tickets: DEFAULT_TICKETS,
      checkIns: DEFAULT_CHECKINS,
      vouchers: DEFAULT_VOUCHERS,
      auditLogs: DEFAULT_AUDIT_LOGS
    };
  }

  saveData() {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
      }
    } catch (e) {
      console.error('Failed to write to localStorage:', e);
    }
    this.notify();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach(fn => fn(this.data));
  }

  resetToDefault() {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
    this.data = {
      events: DEFAULT_EVENTS,
      ticketTypes: DEFAULT_TICKET_TYPES,
      orders: DEFAULT_ORDERS,
      attendees: DEFAULT_ATTENDEES,
      tickets: DEFAULT_TICKETS,
      checkIns: DEFAULT_CHECKINS,
      vouchers: DEFAULT_VOUCHERS,
      auditLogs: DEFAULT_AUDIT_LOGS
    };
    this.saveData();
  }

  // --- Background Expiry Worker ---
  startReservationExpiryWorker() {
    const timer = setInterval(() => {
      this.checkAndExpireOrders();
    }, 10000); // Check every 10 seconds
    if (timer && typeof timer.unref === 'function') {
      timer.unref(); // Allow node script to exit cleanly
    }
  }

  checkAndExpireOrders() {
    const now = new Date().getTime();
    let changed = false;

    this.data.orders.forEach(order => {
      if (order.status === 'pending_payment' && order.expires_at) {
        const expiryTime = new Date(order.expires_at).getTime();
        if (now > expiryTime) {
          order.status = 'expired';
          order.payment_status = 'expired';
          changed = true;

          // Release reserved inventory
          this.releaseReservation(order.id);

          this.logAudit(
            'System Expiry Worker',
            'ORDER_EXPIRED',
            'order',
            order.id,
            `Order ${order.number} expired automatically. Inventory and voucher reservations released.`
          );
        }
      }
    });

    if (changed) {
      this.saveData();
    }
  }

  releaseReservation(orderId) {
    const order = this.data.orders.find(o => o.id === orderId);
    if (!order) return;

    if (order.items) {
      order.items.forEach(item => {
        const tt = this.data.ticketTypes.find(t => t.id === item.ticket_type_id);
        if (tt && tt.reserved >= item.quantity) {
          tt.reserved -= item.quantity;
        }
      });
    }

    if (order.voucher_code) {
      const v = this.data.vouchers.find(vch => vch.code.toUpperCase() === order.voucher_code.toUpperCase());
      if (v && v.used_count > 0) {
        v.used_count--;
      }
    }
  }

  // --- Audit Log Utility ---
  logAudit(actor, action, entity_type, entity_id, details) {
    const log = {
      id: 'aud-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
      actor: actor || 'Super Admin',
      action,
      entity_type,
      entity_id,
      details,
      created_at: new Date().toISOString()
    };
    this.data.auditLogs.unshift(log);
  }

  // --- Quote Calculation Engine ---
  calculateQuote(eventId, items, voucherCode = '', buyerEmail = '') {
    const event = this.data.events.find(e => e.id === eventId);
    if (!event) throw new Error('Event tidak ditemukan');

    let subtotal = 0;
    const itemQuotes = [];

    items.forEach(item => {
      const tt = this.data.ticketTypes.find(t => t.id === item.ticketTypeId);
      if (!tt) throw new Error(`Jenis tiket ID ${item.ticketTypeId} tidak valid`);

      const available = tt.quota - tt.allocated - (tt.reserved || 0);
      if (item.quantity > available) {
        throw new Error(`Stok ${tt.name} tidak mencukupi (tersisa ${available})`);
      }

      const itemTotal = tt.price_idr * item.quantity;
      subtotal += itemTotal;

      itemQuotes.push({
        ticketTypeId: tt.id,
        name: tt.name,
        unitPrice: tt.price_idr,
        quantity: item.quantity,
        total: itemTotal
      });
    });

    // Voucher verification
    let discount = 0;
    let voucherError = null;
    let appliedVoucher = null;

    if (voucherCode && voucherCode.trim()) {
      const cleanCode = voucherCode.trim().toUpperCase();
      const voucher = this.data.vouchers.find(v => v.code.toUpperCase() === cleanCode && v.active);

      if (!voucher) {
        voucherError = 'Kode promo tidak valid atau sudah tidak aktif';
      } else if (voucher.used_count >= voucher.usage_limit) {
        voucherError = 'Kuota penggunaan kode promo telah habis';
      } else if (subtotal < voucher.min_spend) {
        voucherError = `Minimal transaksi untuk kode ini adalah Rp${voucher.min_spend.toLocaleString('id-ID')}`;
      } else {
        if (voucher.kind === 'percentage') {
          const rawDiscount = Math.floor(subtotal * (voucher.value / 100));
          discount = Math.min(rawDiscount, voucher.max_discount || rawDiscount);
        } else {
          discount = Math.min(voucher.value, subtotal);
        }
        appliedVoucher = voucher;
      }
    }

    const fee = 0; // Biaya layanan sesuai kebijakan MVP
    const total = Math.max(0, subtotal - discount + fee);

    return {
      subtotal,
      discount,
      fee,
      total,
      itemQuotes,
      appliedVoucher,
      voucherError
    };
  }

  // --- Order Creation & Atomic Reservation ---
  createOrder({ eventId, buyer, items, voucherCode, termsAccepted }) {
    if (!termsAccepted) {
      throw new Error('Anda harus menyetujui ketentuan acara dan kebijakan refund');
    }

    if (!buyer.name || !buyer.email || !buyer.phone) {
      throw new Error('Data pembeli (nama, email, no HP) wajib diisi lengkap');
    }

    const quote = this.calculateQuote(eventId, items, voucherCode, buyer.email);
    if (quote.voucherError && voucherCode) {
      throw new Error(quote.voucherError);
    }

    const now = new Date();
    const orderId = 'ord-' + Date.now();
    const orderNumber = 'ORD-' + now.toISOString().slice(0, 10).replace(/-/g, '') + '-' + String(this.data.orders.length + 1).padStart(6, '0');

    // 15-minute reservation deadline
    const expiryTime = new Date(now.getTime() + 15 * 60 * 1000).toISOString();

    const orderItemsRecord = items.map(item => {
      const tt = this.data.ticketTypes.find(t => t.id === item.ticketTypeId);
      return {
        id: 'oit-' + Math.random().toString(36).substr(2, 9),
        ticket_type_id: tt.id,
        quantity: item.quantity,
        unit_price: tt.price_idr,
        ticket_name_snapshot: tt.name,
        attendees: item.attendees
      };
    });

    const isFreeOrder = (quote.total === 0);

    const newOrder = {
      id: orderId,
      number: orderNumber,
      event_id: eventId,
      buyer_name: buyer.name,
      buyer_email: buyer.email,
      buyer_phone: buyer.phone,
      subtotal: quote.subtotal,
      discount: quote.discount,
      fee: quote.fee,
      total: quote.total,
      status: isFreeOrder ? 'confirmed' : 'pending_payment',
      payment_status: isFreeOrder ? 'succeeded' : 'not_started',
      payment_method: isFreeOrder ? 'Free Order (Rp0)' : null,
      expires_at: isFreeOrder ? null : expiryTime,
      created_at: now.toISOString(),
      paid_at: isFreeOrder ? now.toISOString() : null,
      policy_version: 'terms_v1',
      voucher_code: quote.appliedVoucher ? quote.appliedVoucher.code : null,
      items: orderItemsRecord
    };

    // Atomic Quota Update
    items.forEach(item => {
      const tt = this.data.ticketTypes.find(t => t.id === item.ticketTypeId);
      if (isFreeOrder) {
        tt.allocated += item.quantity;
      } else {
        tt.reserved = (tt.reserved || 0) + item.quantity;
      }
    });

    if (quote.appliedVoucher) {
      quote.appliedVoucher.used_count++;
    }

    this.data.orders.unshift(newOrder);

    // If order is free, issue tickets immediately!
    if (isFreeOrder) {
      this.issueTicketsForOrder(newOrder);
      this.logAudit(
        'System Registration',
        'ORDER_CREATED_FREE',
        'order',
        orderId,
        `Free order ${orderNumber} confirmed. Issued tickets directly.`
      );
    } else {
      this.logAudit(
        buyer.name,
        'ORDER_CREATED',
        'order',
        orderId,
        `Order ${orderNumber} created. Reserved ${items.reduce((s, x) => s + x.quantity, 0)} tickets.`
      );
    }

    this.saveData();
    return newOrder;
  }

  // --- Ticket Issuance Engine ---
  issueTicketsForOrder(order) {
    if (!order.items) return [];

    const issuedTickets = [];

    order.items.forEach(item => {
      item.attendees.forEach((attData, idx) => {
        const attendeeId = 'att-' + Date.now() + '-' + Math.floor(Math.random() * 10000);
        const newAttendee = {
          id: attendeeId,
          order_id: order.id,
          slot_index: idx,
          name: attData.name || order.buyer_name,
          email: attData.email || order.buyer_email,
          phone: attData.phone || order.buyer_phone
        };
        this.data.attendees.push(newAttendee);

        // Ticket code format: TIX-YYYYMMDD-XXXX
        const randCode = Math.random().toString(36).substring(2, 6).toUpperCase();
        const ticketSeq = String(this.data.tickets.length + 1).padStart(4, '0');
        const publicCode = `TIX-${new Date().getFullYear()}-${ticketSeq}`;

        // Cryptographically random opaque token hash for QR
        const randHash = Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16).toUpperCase()).join('');
        const qrTokenHash = `LK-QR-${randHash}`;

        const newTicket = {
          id: 'tix-' + Date.now() + '-' + Math.floor(Math.random() * 10000),
          order_id: order.id,
          attendee_id: attendeeId,
          event_id: order.event_id,
          ticket_type_id: item.ticket_type_id,
          public_code: publicCode,
          qr_token_hash: qrTokenHash,
          status: 'valid',
          issued_at: new Date().toISOString()
        };

        this.data.tickets.push(newTicket);
        issuedTickets.push(newTicket);
      });
    });

    return issuedTickets;
  }

  // --- Payment Simulation ---
  simulatePaymentSuccess(orderId, paymentMethod = 'QRIS') {
    const order = this.data.orders.find(o => o.id === orderId);
    if (!order) throw new Error('Order tidak ditemukan');

    if (order.status === 'confirmed') {
      return order; // Already confirmed
    }

    if (order.status === 'expired' || order.status === 'cancelled') {
      // Payment arrived late after reservation was released!
      order.status = 'manual_review';
      order.payment_status = 'succeeded';
      order.payment_method = paymentMethod;
      order.paid_at = new Date().toISOString();

      this.logAudit(
        'Payment Gateway Webhook',
        'LATE_PAYMENT_DETECTED',
        'order',
        order.id,
        `Payment for expired order ${order.number} succeeded. Placed into manual_review.`
      );
      this.saveData();
      return order;
    }

    order.status = 'confirmed';
    order.payment_status = 'succeeded';
    order.payment_method = paymentMethod;
    order.paid_at = new Date().toISOString();

    // Move inventory from reserved to allocated
    if (order.items) {
      order.items.forEach(item => {
        const tt = this.data.ticketTypes.find(t => t.id === item.ticket_type_id);
        if (tt) {
          if (tt.reserved >= item.quantity) {
            tt.reserved -= item.quantity;
          }
          tt.allocated += item.quantity;
        }
      });
    }

    // Issue unique e-tickets for all attendees
    this.issueTicketsForOrder(order);

    this.logAudit(
      'Payment Gateway Adapter',
      'PAYMENT_CONFIRMED',
      'order',
      order.id,
      `Payment confirmed via ${paymentMethod} for ${order.number}. Issued tickets.`
    );

    this.saveData();
    return order;
  }

  simulatePaymentFailure(orderId, reason = 'Customer cancelled / timeout') {
    const order = this.data.orders.find(o => o.id === orderId);
    if (!order) throw new Error('Order tidak ditemukan');

    order.status = 'cancelled';
    order.payment_status = 'failed';
    this.releaseReservation(orderId);

    this.logAudit(
      'Payment Gateway Adapter',
      'PAYMENT_FAILED',
      'order',
      order.id,
      `Order ${order.number} marked failed/cancelled. Reason: ${reason}`
    );

    this.saveData();
    return order;
  }

  // --- Check-In Engine (Staff Station) ---
  validateTicketForCheckIn(eventId, rawInput) {
    if (!rawInput || !rawInput.trim()) {
      return { status: 'invalid', message: 'Input QR atau Kode Tiket kosong' };
    }

    const token = rawInput.trim();

    // Match by public code or QR token hash
    const ticket = this.data.tickets.find(t =>
      t.public_code.toUpperCase() === token.toUpperCase() ||
      t.qr_token_hash.toUpperCase() === token.toUpperCase()
    );

    if (!ticket) {
      return {
        status: 'not_found',
        message: 'Tiket tidak ditemukan dalam sistem. Pastikan QR atau kode tiket valid.'
      };
    }

    // Verify Event Scoping
    if (ticket.event_id !== eventId) {
      const ticketEvent = this.data.events.find(e => e.id === ticket.event_id);
      return {
        status: 'wrong_event',
        ticket,
        message: `Tiket ini terdaftar untuk acara berbeda: "${ticketEvent ? ticketEvent.title : 'Event Lain'}"`
      };
    }

    // Check status: valid, suspended, cancelled, refunded
    if (ticket.status === 'suspended') {
      return {
        status: 'suspended',
        ticket,
        message: 'Tiket sedang ditangguhkan (dalam proses investigasi/refund).'
      };
    }

    if (ticket.status === 'cancelled' || ticket.status === 'refunded') {
      return {
        status: 'refunded',
        ticket,
        message: `Tiket sudah dibatalkan / direfund (${ticket.status.toUpperCase()}). Tidak dapat digunakan.`
      };
    }

    // Check if already checked in
    const existingCheckIn = this.data.checkIns.find(c => c.ticket_id === ticket.id);
    const attendee = this.data.attendees.find(a => a.id === ticket.attendee_id);
    const ticketType = this.data.ticketTypes.find(tt => tt.id === ticket.ticket_type_id);
    const order = this.data.orders.find(o => o.id === ticket.order_id);

    if (existingCheckIn) {
      const checkInTime = new Date(existingCheckIn.checked_in_at).toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit'
      });
      return {
        status: 'already_checked_in',
        ticket,
        attendee,
        ticketType,
        order,
        checkIn: existingCheckIn,
        message: `Tiket sudah pernah check-in pada pukul ${checkInTime} WIB oleh ${existingCheckIn.staff_name || 'Staff'}. Masuk kedua ditolak!`
      };
    }

    // Ready for check-in confirmation
    return {
      status: 'valid',
      ticket,
      attendee,
      ticketType,
      order,
      message: 'Tiket sah dan belum pernah check-in. Konfirmasi data peserta sebelum admit.'
    };
  }

  commitCheckIn({ ticketId, eventId, staffId = 'stf-01', staffName = 'Staff Lokarena', method = 'scan', reason = null }) {
    const ticket = this.data.tickets.find(t => t.id === ticketId);
    if (!ticket) throw new Error('Tiket tidak ditemukan');

    // Concurrency / duplicate guard
    const already = this.data.checkIns.find(c => c.ticket_id === ticketId);
    if (already) {
      throw new Error(`Tiket ini baru saja di-check-in pada ${new Date(already.checked_in_at).toLocaleTimeString('id-ID')}`);
    }

    if (method === 'manual' && (!reason || !reason.trim())) {
      throw new Error('Alasan check-in manual wajib diisi');
    }

    const checkInRecord = {
      id: 'chk-' + Date.now(),
      ticket_id: ticketId,
      event_id: eventId || ticket.event_id,
      staff_id: staffId,
      staff_name: staffName,
      checked_in_at: new Date().toISOString(),
      method: method, // 'scan' | 'manual'
      reason: reason ? reason.trim() : null
    };

    this.data.checkIns.push(checkInRecord);

    const attendee = this.data.attendees.find(a => a.id === ticket.attendee_id);
    this.logAudit(
      staffName,
      method === 'manual' ? 'CHECK_IN_MANUAL' : 'CHECK_IN_SCAN',
      'ticket',
      ticketId,
      `Check-in attendee ${attendee ? attendee.name : 'Unknown'} (${ticket.public_code}). Method: ${method}. Reason: ${reason || '-'}`
    );

    this.saveData();
    return checkInRecord;
  }

  // --- Manual Search for Staff Station ---
  searchAttendeesForStaff(eventId, query) {
    if (!query || !query.trim()) return [];
    const q = query.trim().toLowerCase();

    return this.data.tickets
      .filter(t => t.event_id === eventId)
      .map(ticket => {
        const attendee = this.data.attendees.find(a => a.id === ticket.attendee_id);
        const ticketType = this.data.ticketTypes.find(tt => tt.id === ticket.ticket_type_id);
        const checkIn = this.data.checkIns.find(c => c.ticket_id === ticket.id);
        const order = this.data.orders.find(o => o.id === ticket.order_id);

        return {
          ticket,
          attendee,
          ticketType,
          checkIn,
          order
        };
      })
      .filter(item => {
        if (!item.attendee) return false;
        return (
          item.attendee.name.toLowerCase().includes(q) ||
          item.attendee.email.toLowerCase().includes(q) ||
          (item.attendee.phone && item.attendee.phone.includes(q)) ||
          item.ticket.public_code.toLowerCase().includes(q) ||
          (item.order && item.order.number.toLowerCase().includes(q))
        );
      });
  }

  // --- Admin Operations: Refund, Manual Review, Event Management ---
  processFullRefund(orderId, reason = 'Permintaan pembeli / kebijakan operasional', actor = 'Super Admin') {
    const order = this.data.orders.find(o => o.id === orderId);
    if (!order) throw new Error('Order tidak ditemukan');

    if (order.status !== 'confirmed' && order.status !== 'manual_review') {
      throw new Error(`Order berstatus ${order.status} tidak dapat direfund`);
    }

    order.status = 'refunded';
    order.payment_status = 'refunded';

    // Invalidate all associated tickets
    const tickets = this.data.tickets.filter(t => t.order_id === orderId);
    tickets.forEach(t => {
      t.status = 'refunded';
    });

    this.logAudit(
      actor,
      'ORDER_REFUNDED',
      'order',
      orderId,
      `Full refund processed for order ${order.number}. ${tickets.length} tickets marked as refunded. Reason: ${reason}`
    );

    this.saveData();
    return order;
  }

  resolveManualReview(orderId, action = 'fulfill', actor = 'Super Admin') {
    const order = this.data.orders.find(o => o.id === orderId);
    if (!order || order.status !== 'manual_review') {
      throw new Error('Order bukan dalam status manual_review');
    }

    if (action === 'fulfill') {
      // Admin approves late payment and allocates stock
      order.status = 'confirmed';
      this.issueTicketsForOrder(order);

      // Add to allocated count
      if (order.items) {
        order.items.forEach(item => {
          const tt = this.data.ticketTypes.find(t => t.id === item.ticket_type_id);
          if (tt) tt.allocated += item.quantity;
        });
      }

      this.logAudit(
        actor,
        'MANUAL_REVIEW_FULFILL',
        'order',
        orderId,
        `Approved late payment for ${order.number}. Stock allocated and tickets issued.`
      );
    } else {
      // Admin rejects and processes refund
      order.status = 'refunded';
      order.payment_status = 'refunded';

      this.logAudit(
        actor,
        'MANUAL_REVIEW_REFUND',
        'order',
        orderId,
        `Rejected late payment for ${order.number}. Refund approved.`
      );
    }

    this.saveData();
    return order;
  }

  // --- Participant Access (Magic Link Lookup) ---
  getTicketsByEmail(email) {
    if (!email || !email.trim()) return [];
    const normEmail = email.trim().toLowerCase();

    return this.data.tickets
      .map(ticket => {
        const attendee = this.data.attendees.find(a => a.id === ticket.attendee_id);
        const order = this.data.orders.find(o => o.id === ticket.order_id);
        const event = this.data.events.find(e => e.id === ticket.event_id);
        const ticketType = this.data.ticketTypes.find(tt => tt.id === ticket.ticket_type_id);
        const checkIn = this.data.checkIns.find(c => c.ticket_id === ticket.id);

        return {
          ticket,
          attendee,
          order,
          event,
          ticketType,
          checkIn
        };
      })
      .filter(item => {
        const attendeeMatch = item.attendee && item.attendee.email.toLowerCase() === normEmail;
        const buyerMatch = item.order && item.order.buyer_email.toLowerCase() === normEmail;
        return attendeeMatch || buyerMatch;
      });
  }

  // --- Sanitized CSV Export (Neutralizes Formula Injection) ---
  exportAttendeesCsv(eventId) {
    const sanitize = (val) => {
      if (val === null || val === undefined) return '""';
      let s = String(val).replace(/"/g, '""');
      // Escape potential spreadsheet formula triggers: =, +, -, @, \t, \r
      if (/^[=+\-@\t\r]/.test(s)) {
        s = "'" + s;
      }
      return `"${s}"`;
    };

    const tickets = this.data.tickets.filter(t => t.event_id === eventId);
    const event = this.data.events.find(e => e.id === eventId);

    const headers = [
      'No',
      'Event',
      'Kode Tiket',
      'Jenis Tiket',
      'Nama Peserta',
      'Email Peserta',
      'No HP Peserta',
      'No Order',
      'Nama Pembeli',
      'Status Tiket',
      'Status Check-In',
      'Waktu Check-In',
      'Metode Check-In',
      'Alasan Manual'
    ];

    const rows = tickets.map((ticket, index) => {
      const attendee = this.data.attendees.find(a => a.id === ticket.attendee_id) || {};
      const order = this.data.orders.find(o => o.id === ticket.order_id) || {};
      const ticketType = this.data.ticketTypes.find(tt => tt.id === ticket.ticket_type_id) || {};
      const checkIn = this.data.checkIns.find(c => c.ticket_id === ticket.id);

      return [
        index + 1,
        event ? event.title : '-',
        ticket.public_code,
        ticketType.name || '-',
        attendee.name || '-',
        attendee.email || '-',
        attendee.phone || '-',
        order.number || '-',
        order.buyer_name || '-',
        ticket.status,
        checkIn ? 'SUDAH' : 'BELUM',
        checkIn ? new Date(checkIn.checked_in_at).toLocaleString('id-ID') : '-',
        checkIn ? checkIn.method : '-',
        checkIn && checkIn.reason ? checkIn.reason : '-'
      ].map(sanitize).join(',');
    });

    return [headers.join(','), ...rows].join('\r\n');
  }

  exportOrdersCsv(eventId) {
    const sanitize = (val) => {
      if (val === null || val === undefined) return '""';
      let s = String(val).replace(/"/g, '""');
      if (/^[=+\-@\t\r]/.test(s)) {
        s = "'" + s;
      }
      return `"${s}"`;
    };

    const orders = this.data.orders.filter(o => o.event_id === eventId);
    const event = this.data.events.find(e => e.id === eventId);

    const headers = [
      'No Order',
      'Event',
      'Tanggal Order',
      'Nama Pembeli',
      'Email Pembeli',
      'No HP',
      'Subtotal',
      'Diskon',
      'Biaya Layanan',
      'Total Pembayaran',
      'Status Order',
      'Metode Pembayaran',
      'Waktu Bayar',
      'Kode Voucher'
    ];

    const rows = orders.map(order => [
      order.number,
      event ? event.title : '-',
      new Date(order.created_at).toLocaleString('id-ID'),
      order.buyer_name,
      order.buyer_email,
      order.buyer_phone,
      order.subtotal,
      order.discount,
      order.fee,
      order.total,
      order.status,
      order.payment_method || '-',
      order.paid_at ? new Date(order.paid_at).toLocaleString('id-ID') : '-',
      order.voucher_code || '-'
    ].map(sanitize).join(','));

    return [headers.join(','), ...rows].join('\r\n');
  }

  // --- Metrics & KPI Dashboard ---
  getDashboardMetrics(eventId = null) {
    let orders = this.data.orders;
    let tickets = this.data.tickets;
    let checkIns = this.data.checkIns;

    if (eventId) {
      orders = orders.filter(o => o.event_id === eventId);
      tickets = tickets.filter(t => t.event_id === eventId);
      checkIns = checkIns.filter(c => c.event_id === eventId);
    }

    const confirmedOrders = orders.filter(o => o.status === 'confirmed');
    const refundedOrders = orders.filter(o => o.status === 'refunded');
    const manualReviewOrders = orders.filter(o => o.status === 'manual_review');

    const grossTicketSales = confirmedOrders.reduce((sum, o) => sum + (o.subtotal || 0), 0);
    const totalDiscounts = confirmedOrders.reduce((sum, o) => sum + (o.discount || 0), 0);
    const collectedAmount = confirmedOrders.reduce((sum, o) => sum + (o.total || 0), 0);
    const refundAmount = refundedOrders.reduce((sum, o) => sum + (o.total || 0), 0);
    const netCollected = Math.max(0, collectedAmount - refundAmount);

    const ticketsIssued = tickets.length;
    const activeTickets = tickets.filter(t => t.status === 'valid').length;
    const checkedInCount = checkIns.length;
    const attendanceRate = activeTickets > 0 ? ((checkedInCount / activeTickets) * 100).toFixed(1) : 0;

    return {
      grossTicketSales,
      totalDiscounts,
      collectedAmount,
      refundAmount,
      netCollected,
      ticketsIssued,
      activeTickets,
      checkedInCount,
      attendanceRate,
      pendingCount: orders.filter(o => o.status === 'pending_payment').length,
      manualReviewCount: manualReviewOrders.length
    };
  }
}

// Global Singleton Instance
export const store = new LokarenaStore();
