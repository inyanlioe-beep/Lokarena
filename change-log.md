# Changelog — Lokarena Ticketing Application

Semua perubahan, penambahan fitur, arsitektur, dan catatan operasional dicatat dalam file ini agar pengembang atau agen AI yang melanjutkan dapat memahami status terkini dan langkah selanjutnya.

---

## [1.0.0] — 2026-10-04 (Initial Full-Featured Release)

### 1. Inisialisasi & Perencanaan
- Membaca dan menganalisis 52 bagian PRD (`dokumen/PRD-Lokarena.md`) dan Dokumen Perencanaan v1.1 (`dokumen/Perencanaan-Lokarena.md`).
- Mempelajari prototype UI/UX pada `ui/Lokarena-UI-UX.html`, `source/lokarena-ui-fragment.html`, dan panduan `BACA-DULU.txt`.
- Membuat `implementation-plan.md` yang merinci ruang lingkup MVP, model data, arsitektur modular, state machine, dan rencana implementasi.
- Mengonfigurasi `package.json` dengan Vite dev server (`npm run dev`) dan build bundle (`npm run build`).

### 2. Arsitektur Domain Engine (`assets/js/lokarena-store.js`)
- **Penyimpanan Persisten:** Menggunakan LocalStorage berbasis reaktif dengan fallback memory untuk universal browser/Node environment.
- **State Machine Order:**
  - `pending_payment` -> `processing` -> `confirmed`
  - `expired` (auto-release stok via timer 15 menit)
  - `cancelled`
  - `manual_review` (deteksi otomatis pembayaran yang masuk setelah expired / webhook terlambat)
  - `refund_pending` -> `refunded`
- **State Machine Reservasi:**
  - `active` (menahan stok selama checkout 15 menit)
  - `consumed` (berhasil dibayar menjadi tiket)
  - `released` (dilepas kembali ke kuota publik jika pesanan batal/expired)
- **State Machine Tiket:**
  - `valid`
  - `suspended` (dalam masa investigasi/refund)
  - `refunded` / `cancelled` (otomatis ditolak di stasiun check-in)
- **Engine Perhitungan Harga:**
  - Mendukung integer Rupiah IDR tanpa pecahan.
  - Validasi voucher promo (misal: `LOKA20` diskon 20% capped Rp100.000, `HEMAT50K` potongan langsung Rp50.000).
  - Alur khusus tiket gratis (Rp0): otomatis diterbitkan langsung tanpa memanggil hosted payment gateway.

### 3. QR Engine & Keamanan (`assets/js/lokarena-qr.js`)
- Mengembangkan engine QR Code mandiri tanpa dependensi pihak ketiga.
- Merender matriks QR ke HTML5 Canvas atau SVG DOM secara deterministik berdasarkan hash token acak yang tidak mengandung PII (Personal Identifiable Information).

### 4. Sistem Ikon Mandiri (`assets/js/lokarena-icons.js`)
- Mengimplementasikan inline SVG icon engine untuk memastikan seluruh ikon (`ticket`, `calendar`, `receipt`, `users`, `scan-line`, `download`, dll.) tampil 100% sempurna baik saat online maupun offline sesuai arahan `BACA-DULU.txt`.

### 5. Desain UI & Gaya Responsif (`assets/css/lokarena.css`)
- Menerapkan desain token dari `ui/Lokarena-UI-UX.html`:
  - Brand Palette: Deep Indigo (`--tc-brand: #5146d8`), Background (`--tc-bg`), Surface (`--tc-surface`), Text (`--tc-ink`), Muted (`--tc-muted`), Line (`--tc-line`).
  - Mendukung otomatis Light & Dark mode (`color-scheme: light dark`).
  - Komponen: Banner Hero dengan gradient overlay, kartu pembicara, stepper checkout, kartu tiket dengan batas perforasi (perforated cutouts) & QR, window scanner dengan animasi pulsing scan line.
  - Responsif penuh untuk desktop, tablet, dan smartphone (`@media (max-width: 860px)` dan `600px`).
  - Gaya cetak khusus (`@media print`) untuk mengunduh e-ticket dalam format PDF bersih.

### 6. Controller Aplikasi (`assets/js/lokarena-app.js`)
- **Navigasi Layar (Routing):**
  1. `Event Detail` (C03): Informasi lengkap, pembicara, agenda, pemilihan jenis tiket, kuota real-time, dan kalkulator harga.
  2. `Semua Event` (C01 & C02): Pencarian & katalog seluruh event aktif.
  3. `Checkout` (C04 & C05): Form buyer & multi-attendee dinamis, sinkronisasi otomatis "Saya juga menjadi peserta pertama", validasi voucher, dan persetujuan ketentuan.
  4. `Pembayaran` (C06): Timer hitung mundur 15 menit, opsi metode bayar (QRIS, VA BCA, VA Mandiri, E-Wallet), simulator status ("Bayar Berhasil", "Bayar Terlambat -> Manual Review", "Batal/Expired").
  5. `E-Ticket` (C08): Tampilan tiket resmi, badge status, canvas QR unik, tombol unduh/cetak.
  6. `Tiket Saya` (C09 & C10): Portal pencarian tiket berbasis email terdaftar (magic link simulator).
  7. `Organizer Dashboard` (A01 - A12):
     - Statistik KPI: Gross Sales, Net Collected, Tiket Terbit, Tiket Aktif, Tingkat Kehadiran (Attendance Rate).
     - Manajemen Event: Tambah event draft, publikasikan, atau batalkan.
     - Manajemen Orders: Tabel order, filter status, kirim ulang email, approval/refund untuk status Manual Review, full refund.
     - Manajemen Peserta: Tabel kehadiran, filter tiket, ekspor CSV aman dari formula injection.
     - Manajemen Vouchers: Buat promo baru, kuota, masa berlaku, status aktif/nonaktif.
     - Audit Log: Pencatatan append-only seluruh aktivitas admin & staff.
  8. `Check-In Staff Station` (S01, S02, S03):
     - Seleksi event yang ditugaskan.
     - Kamera langsung via WebRTC (`navigator.mediaDevices.getUserMedia`) dengan tombol aktifkan/matikan.
     - Simulator scan tiket untuk pengujian cepat.
     - Pencarian manual peserta dengan alasan wajib diisi & tercatat di audit log.
     - Validasi dua tahap dengan dialog konfirmasi atomik (mencegah double admission).
     - Deteksi duplikat: jika tiket sudah masuk, menampilkan waktu check-in pertama dan staff yang bertugas.
     - Umpan balik audio: Pleasant chime untuk sukses, warning buzzer untuk duplikat/invalid (menggunakan Web Audio API sintesis).

### 7. Pengujian & Verifikasi
- Dibuat suite pengujian otomatis `test-domain.js` mencakup 11 skenario kritis:
  1. Inisialisasi seed data
  2. Kalkulasi harga & diskon voucher LOKA20
  3. Pembuatan order & reservasi kuota atomik
  4. Pembayaran sukses & penerbitan e-ticket
  5. Check-in pertama kali
  6. Penolakan check-in duplikat (menampilkan waktu masuk pertama)
  7. Penolakan check-in event yang salah
  8. Penanganan late payment masuk ke status `manual_review`
  9. Penyelesaian manual review oleh admin (fulfill & alokasi stok baru)
  10. Proses full refund & penonaktifan tiket
  11. Ekspor CSV dengan sanitasi formula injection (`=`, `+`, `-`, `@`)
- Seluruh 11 pengujian berhasil lolos (*Passed* 100%).
- Vite build lolos tanpa error (`dist/` ter-bundle bersih).
- Server dev berjalan di `http://localhost:5173/` dengan HTTP 200.

---

## Panduan untuk Agen AI / Pengembang Selanjutnya

Jika Anda melanjutkan pengembangan proyek ini, berikut referensi dan langkah selanjutnya yang disarankan:

### A. Menjalankan Aplikasi
```bash
# Menjalankan server pengembangan lokal:
npm run dev

# Melakukan build produksi:
npm run build

# Menjalankan suite pengujian unit domain engine:
node test-domain.js
```
Aplikasi juga dapat langsung dibuka via browser pada URL `http://localhost:5173/` atau membuka langsung file `index.html`.

### B. Arsitektur File
- `index.html`: Entry point antarmuka pengguna dengan struktur semantik 8 layar aplikasi.
- `assets/css/lokarena.css`: Sistem desain master (token CSS, responsive grid, light/dark mode, print PDF styles).
- `assets/js/lokarena-store.js`: Model data, database LocalStorage, transaksi atomik, audit log, dan state machines.
- `assets/js/lokarena-app.js`: Controller utama interaksi UI, router view, video stream scanner, audio feedback, dan modul export.
- `assets/js/lokarena-qr.js`: Generator QR Code mandiri HTML5 Canvas.
- `assets/js/lokarena-icons.js`: Render inline SVG ikon mandiri tanpa dependensi internet.
- `gambar/`: Aset banner seminar (`seminar-hero.jpg`) dan foto profil pembicara (`speaker-portraits.jpg`).
- `test-domain.js`: Suite tes verifikasi otomatis logika bisnis.

### C. Roadmap & Fitur Lanjutan (Pasca MVP / P1)
Berdasarkan dokumen perencanaan, fitur-fitur berikut siap untuk dikembangkan pada fase berikutnya:
1. **Integrasi Payment Gateway Nyata:**
   - Menghubungkan adapter `lokarena-store.js` ke payment gateway webhook production (Midtrans / Xendit / Doku / Tripay) menggunakan signature verification.
2. **Export XLSX (P1):**
   - Menambahkan format unduhan Excel `.xlsx` terformat selain CSV yang sudah tersedia.
3. **Form Builder Kustom (P1):**
   - Mendukung penambahan input kustom untuk peserta (misal: ukuran kaos, preferensi makanan, institusi).
4. **Notifikasi WhatsApp:**
   - Menambahkan pengiriman tautan e-ticket dan barcode langsung ke nomor WhatsApp peserta.
