# Implementation Plan — Lokarena Ticketing Application

**Versi:** 1.0  
**Tanggal:** 4 Oktober 2026  
**Target:** Aplikasi Ticketing Event Single Organizer (Web Responsif) sesuai PRD & Dokumen Perencanaan Lokarena v1.1.

---

## 1. Ringkasan & Ruang Lingkup (Scope MVP)

Aplikasi **Lokarena** adalah platform ticketing terpusat untuk satu penyelenggara (*single organizer*) yang mengelola banyak event (*multi-event*). Aplikasi mencakup tiga pilar pengguna utama:
1. **Public & Peserta (Buyer & Attendee):**
   - Penemuan event (kategori, filter, pencarian).
   - Detail event (jadwal timezone, venue/webinar, pembicara, agenda, pilihan jenis tiket & benefit).
   - Checkout multi-tiket & registrasi attendee per tiket (guest checkout tanpa wajib akun).
   - Perhitungan harga real-time (subtotal, diskon voucher seperti `LOKA20`, fee, total).
   - Reservasi stok atomik (15 menit countdown timer dengan auto-release).
   - Simulasi pembayaran hosted gateway (QRIS, Virtual Account, E-Wallet, Kartu) & tiket gratis (total Rp0 langsung confirmed).
   - E-Ticket aman dengan kode unik, QR hash opaque (tanpa PII), cetak & unduh PDF.
   - Portal "Tiket Saya" melalui verifikasi email / magic link.
2. **Staff Check-In:**
   - Pemilihan event ditugaskan.
   - Live camera QR scanner dengan fallback manual file / input token.
   - Validasi tiket dua tahap: Scan/Validasi -> Tinjau Identitas -> Konfirmasi Check-in (atomic commit).
   - Deteksi QR duplikat (menampilkan waktu check-in pertama) dan QR tidak valid/event berbeda/refunded.
   - Pencarian manual peserta dengan kewajiban mengisi alasan & audit log.
3. **Organizer / Admin Dashboard:**
   - Ringkasan KPI: Dana terkumpul, gross ticket sales, tiket terjual, kehadiran (attendance rate), antrean exception review.
   - Manajemen Event & Jenis Tiket (Draft, Publish, Cancel; kuota, harga, periode).
   - Manajemen Order (Filter status, manual review untuk late payment, full refund dengan pembatalan/penangguhan tiket).
   - Manajemen Peserta (Tabel attendee, filter tiket & check-in, sanitasi formula injection pada Export CSV).
   - Manajemen Voucher (Kode promo, persentase/nominal, kuota, limit per email).
   - Audit Log & Laporan Finansial/Kehadiran.

---

## 2. Arsitektur & Teknologi

- **Frontend & App Architecture:** Modern Modular Web Application (HTML5, Vanilla CSS Design System, Modular JavaScript ES6).
- **Styling & Design System:**
  - Token visual dan estetika mengikuti `ui/Lokarena-UI-UX.html` dan `source/lokarena-ui-fragment.html`.
  - Brand Palette: Deep Indigo (`--tc-brand: #5146d8`), Surface (`#ffffff` / `#1c2030`), Line (`#e4e8f1` / `#343a50`), Text (`#172038` / `#f0f2fb`), Status Accents (Green `#16764e`, Soft Purple `#eeecff`, Warning/Red `#b52f43`).
  - Dukungan tema otomatis `light dark` via `color-scheme` dan CSS custom properties.
  - Ikon mandiri (inline SVG + Lucide) agar tetap berfungsi penuh baik saat online maupun offline sesuai catatan `BACA-DULU.txt`.
- **State & Data Store (`lokarena-store.js`):**
  - In-memory reactive state yang dipersistensikan ke `localStorage` sehingga data transaksi, event, peserta, dan check-in tersimpan persisten lintas refresh/sesi.
  - State Machine Order: `pending_payment` -> `processing` -> `confirmed`, `expired`, `cancelled`, `manual_review`, `refund_pending`, `refunded`.
  - State Machine Reservasi: `active`, `consumed`, `released`.
  - State Machine Tiket: `valid`, `suspended`, `cancelled`, `refunded`.
- **Integrasi Perangkat & Fitur Spesifik:**
  - WebRTC `navigator.mediaDevices.getUserMedia` untuk camera scanner dengan fallback simulator.
  - HTML5 Canvas QR code rendering dinamis.
  - Safe CSV Generator (escape formula injection `=`, `+`, `-`, `@`).
  - Timer reservasi otomatis dengan listener interval real-time.

---

## 3. Rencana Tahap Implementasi

- **Tahap 1: Fondasi State Store & Mock Data**
  - Implementasi schema entitas: Events, TicketTypes, Orders, OrderItems, Attendees, Tickets, Vouchers, CheckIns, AuditLogs.
  - Inisialisasi data bawaan (Seminar Inovasi & Bisnis 2026, Workshop AI, Konferensi Tech, voucher `LOKA20`).
- **Tahap 2: Komponen Tampilan & Navigasi**
  - Header navigasi responsive dengan switcher view (Public, Checkout, Tiket, Organizer, Check-in).
  - Tampilan Beranda & Detail Event dengan banner, pembicara, agenda, dan widget pemilihan tiket.
- **Tahap 3: Alur Registrasi, Checkout & Pembayaran**
  - Form data buyer dan multi-attendee dinamis.
  - Sinkronisasi opsi "Saya juga menjadi peserta pertama".
  - Voucher discount engine & breakdown harga transparan.
  - Countdown timer reservasi 15 menit dengan auto-release.
  - Simulator payment gateway (QRIS, VA BCA/Mandiri/BNI, E-Wallet, Kartu) dengan tombol aksi sukses, gagal, atau late payment review.
- **Tahap 4: E-Ticket & Portal Peserta**
  - Tampilan e-ticket dengan cover banner, detail acara, attendee name, perforated border, dan QR canvas interaktif.
  - Fitur Unduh/Cetak E-Ticket (print-optimized CSS).
  - Portal "Tiket Saya" dengan simulasi magic link email.
- **Tahap 5: Stasiun Check-In Staff**
  - Selektor event.
  - Modul live camera QR scanner + file/simulasi scan.
  - Dialog validasi hasil scan (Status, Nama Peserta, Jenis Tiket).
  - Tombol aksi atomik "Konfirmasi Check-in" dengan deteksi check-in duplikat (menampilkan waktu masuk pertama).
  - Pencarian manual peserta dengan alasan wajib & audit log.
- **Tahap 6: Organizer & Admin Workspace**
  - Dashboard statistik & grafik progres kapasitas tiket.
  - CRUD Event & Ticket Types (harga, kuota, periode).
  - Manajemen Order (detail order, resend email, review late payment, full refund).
  - Daftar peserta & filter check-in, ekspor CSV aman.
  - Manajemen Voucher promo.
  - Audit log real-time.
- **Tahap 7: Dokumentasi & Pengujian**
  - Pembuatan `change-log.md`.
  - Verifikasi di browser dan uji skenario concurrency & edge cases sesuai PRD/Perencanaan.
