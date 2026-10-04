# PRD Lokarena

## Aplikasi Ticketing Event Single Organizer

**Versi:** 1.1  
**Tanggal:** 4 Oktober 2026  
**Status:** Draft perencanaan  
**Nama aplikasi:** Lokarena  
**Platform awal:** Responsive Web Application  
**Jenis acara:** Seminar, workshop, training, webinar, konferensi, gathering, dan event sejenis.

Lokarena adalah aplikasi ticketing untuk satu penyelenggara yang dapat mengelola banyak event. Dokumen ini menyajikan kembali PRD awal dengan nama produk yang dipilih pengguna. Detail baseline implementasi berada pada dokumen Perencanaan Lokarena versi 1.1; keputusan scope di sana memperjelas PRD ini. Nama produk Lokarena tidak menetapkan nama badan penyelenggara, venue, domain, atau badan hukum.

## 1 Product overview

Penyelenggara membutuhkan sistem terpusat untuk membuat dan mempublikasikan event, menjual tiket, menerima pembayaran, mengirim e-ticket, mengelola peserta, melakukan QR check-in, serta memantau penjualan dan kehadiran. Lokarena melayani satu organisasi dengan banyak event dan bukan marketplace multi-organizer.

## 2 Product goals

Alur end-to-end adalah Discover Event → Registration → Ticket Purchase → Payment → E-Ticket → Check-in → Reporting. Tujuan bisnisnya mengurangi registrasi manual, mempermudah pembelian, mengotomatisasi verifikasi dan penerbitan, mengurangi antrean, memusatkan database peserta, memantau revenue, dan mendukung event berikutnya.

KPI meliputi conversion visitor ke buyer, tiket terjual, pendapatan, payment success dan abandonment, attendance, waktu check-in, refund, penggunaan voucher, serta repeat attendee. Definisi denominator dan periode laporan mengikuti dokumen perencanaan agar angka konsisten.

## 3 Product scope

Public website menyediakan listing, detail event, pilihan tiket, registrasi, checkout, dan pembayaran. Participant area menyediakan akses tiket, download, status order, dan riwayat event. Organizer dashboard menyediakan event/ticket management, transaksi, peserta, check-in, promo, laporan, user internal, dan konfigurasi.

## 4 User roles

Visitor dapat melihat event dan memulai pembelian. Participant dapat membeli, membayar, mengakses dan mengunduh tiket. Check-in Staff dapat scan dan mencari peserta pada event ditugaskan, tanpa akses finansial. Event Manager mengelola event, tiket, promo, peserta, serta laporan pada event ditugaskan. Super Admin mengelola semua event, user/permission, settings, refund, pembatalan, dan review pembayaran.

Authorization harus diterapkan pada backend. Buyer tidak wajib menjadi user internal. Guest checkout serta akses peserta melalui magic link menjadi baseline MVP.

## 5 User journey

Landing → Event Detail → Pilih Tiket → Data Buyer dan Attendee → Voucher Opsional → Review → Create Order dan Reserve → Payment → Verifikasi Server → Issue E-Ticket → Email → Check-in. Untuk total nol, gateway dilewati. Pembayaran terlambat, stok habis, email gagal, dan scan duplikat memiliki alur terpisah dalam dokumen perencanaan.

## 6 Event discovery

Homepage menampilkan banner, upcoming event, featured event, event terbaru, kategori, dan CTA menuju daftar. Kategori awal dapat mencakup seminar, workshop, training, conference, webinar, dan gathering. Pencarian dan filter hanya mengembalikan event yang boleh dipublikasikan.

## 7 Event detail page

Detail menampilkan judul, banner, deskripsi, kategori, tanggal/jam dengan timezone, venue/alamat/maps, serta informasi penyelenggara. Online/hybrid event menampilkan platform; tautan privat hanya diberikan kepada pemilik tiket sah. Ticket information menampilkan kategori, harga, benefit, periode jual, ketersediaan, dan sold-out status. CTA utama adalah Beli Tiket atau Lanjutkan Pembelian.

## 8 Event management

Field event: title, slug, description, category, banner, thumbnail, start/end date dan time, timezone, type offline/online/hybrid, venue, address, city, maps URL, dan informasi akses online. Publication status adalah draft, published, cancelled, archived; upcoming/ongoing/completed diturunkan dari jadwal.

Publish memerlukan validasi data wajib dan ticket types. Event dengan order tidak boleh dihapus. Perubahan kritis harus diaudit dan diberitahukan kepada peserta terdampak.

## 9 Ticket management

Satu event dapat memiliki Early Bird, Regular, VIP, atau jenis lain. Setiap jenis memiliki name, description, price, quota, minimum/maximum purchase, sales start/end, benefit, dan visibility. Display state adalah upcoming, available, sold out, sales ended, atau hidden. Server mencegah overselling pada kuota jenis tiket maupun kapasitas total event.

| Contoh tiket | Harga | Kuota |
|---|---:|---:|
| Early Bird | Rp150.000 | 100 |
| Regular | Rp250.000 | 300 |
| VIP | Rp500.000 | 50 |

## 10 Free ticket

Tiket berharga nol atau order yang menjadi nol karena diskon tidak perlu gateway. Server tetap memvalidasi kuota, voucher, dan attendee, lalu menerbitkan tiket secara idempotent. UI menunjukkan confirmed setelah seluruh tiket berhasil terbit.

## 11 Registration

Buyer minimum: nama lengkap, email, nomor HP. Attendee minimum baseline: nama dan email per tiket. Field tambahan seperti institusi, jabatan, kota, dan nomor HP mengikuti template required/optional yang disepakati. Form builder penuh merupakan fase lanjutan. Persetujuan transaksi terpisah dari consent marketing opsional.

## 12 Multiple ticket purchase

Buyer dapat membeli beberapa tiket untuk satu event, termasuk beberapa ticket types. Jumlah attendee harus sesuai quantity. Setiap attendee mendapatkan tiket dan QR unik. Buyer melihat seluruh order; attendee hanya melihat tiket yang dikaitkan dengan emailnya setelah verifikasi.

## 13 Order management

Order menyimpan ID/number, buyer snapshot, event, order items, quantity, unit price snapshot, subtotal, discount, fee, total, payment state, order state, serta created/expiry time. Order number contoh ORD-20261004-000123. Harga historis tidak berubah saat admin mengedit ticket type.

## 14 Order status

Baseline state: pending_payment, processing, confirmed, expired, cancelled, manual_review, refund_pending, refunded. Payment status terpisah dari fulfillment. Processing berarti pembayaran diterima dan tiket sedang diterbitkan; confirmed berarti seluruh tiket wajib sudah ada. Partial refund ditunda pada baseline MVP.

## 15 Payment gateway

Satu provider awal menyediakan hosted payment dengan metode sesuai kontrak provider, misalnya virtual account, QRIS, e-wallet, dan kartu. Adapter memisahkan create payment, query, webhook verification, expiry, dan refund result dari domain ticketing. Metode yang belum tersedia tidak ditampilkan.

## 16 Payment flow

Create Order → Atomic Reserve → Create Provider Payment → Customer Pays → Verified Webhook atau Server Reconciliation → Record Success → Consume Reserve → Issue Ticket → Send Notification. Browser redirect bukan bukti sukses. Signature, merchant/reference, currency, dan amount diverifikasi sebelum mengubah order.

## 17 Ticket reservation

Default usulan 15 menit, configurable dan selaras dengan expiry provider. Reservasi dimulai saat order dibuat. Expiry/cancel melepaskan kuota dan voucher sekali saja. Sukses setelah release masuk manual review, tanpa menerbitkan tiket otomatis atau mengambil stok pembeli lain.

## 18 E-ticket

E-ticket berisi Lokarena sebagai nama produk, event, kategori, attendee, tanggal/jam/timezone, venue, order number, ticket code, QR, dan ketentuan. QR menggunakan opaque random token tanpa PII atau ID berurutan. Tiket private tidak di-cache publik. Tiket suspended/refunded/cancelled tidak mempunyai QR aktif untuk masuk.

## 19 QR check-in

Staff memilih event ditugaskan, scan, melihat hasil validasi beserta identitas dan kategori, lalu menekan Konfirmasi Check-in. Scan saja belum mengubah status. Commit menyimpan ticket ID, staff, waktu, dan metode secara atomik.

## 20 Duplicate QR detection

Tiket yang sudah check-in ditolak untuk check-in kedua dan menampilkan waktu masuk pertama. Dua scanner bersamaan hanya dapat membuat satu record. Re-entry/override tidak termasuk baseline MVP.

## 21 Invalid QR

QR palsu, tidak ditemukan, event berbeda, ticket suspended/cancelled/refunded ditolak dengan alasan yang sesuai. Token tidak dicatat mentah dalam log dan tidak mengungkap data orang lain.

## 22 Manual check-in

Staff mencari nama, email, nomor HP jika tersedia, ticket code, atau order number sesuai permission. Hasil menampilkan data minimal dan identitas pembeda. Manual check-in wajib alasan, menggunakan constraint yang sama dengan QR, dan masuk audit log. Kamera ditolak atau jaringan putus menyediakan arahan yang jelas.

## 23 Voucher and promo code

Voucher memiliki code, percentage/fixed discount, value, maximum discount, minimum spend, start/end, usage limit, usage per customer/email, serta eligible event/ticket type. Satu voucher per order pada MVP. Limit menghitung reserved dan committed usage. Diskon dihitung server dan tidak melebihi eligible subtotal. Contoh brand promo adalah LOKA20.

## 24 Email notification

Email meliputi order created/payment instruction/deadline, payment success, serta e-ticket dengan detail event. Reminder H-1 termasuk roadmap, bukan baseline launch. Retry/resend tidak menerbitkan tiket ulang. Email gagal tidak membatalkan tiket atau pembayaran.

## 25 WhatsApp notification

Integrasi WhatsApp untuk konfirmasi, tiket, reminder, dan update event merupakan fase lanjutan. Provider, template, consent, biaya, dan delivery handling ditentukan ketika fitur diprioritaskan.

## 26 Participant dashboard

Tiket Saya menyediakan upcoming/past tickets, status, detail attendee, QR valid, dan download. Order history menyediakan order number, event, total, status, dan tanggal. Akses awal melalui email magic link yang sekali pakai dan kedaluwarsa; order ID saja bukan authorization.

## 27 Organizer dashboard

Dashboard menunjukkan penjualan, tickets issued/aktif, orders, remaining capacity, attendance, dan exception operasional. Role dan event assignment membatasi data. Definisi collected amount, refund, dan net collected tersedia agar pengguna tidak menyamakan revenue dengan keuntungan.

## 28 Event dashboard

Setiap event memiliki revenue/collected amount, sold/remaining, paid/pending orders, check-in count/rate, serta breakdown per ticket type. Angka gratis, diskon, refund, dan manual review dibedakan. Filter waktu menyebut timezone dan basis tanggal.

## 29 Participant management

Kolom sesuai permission: name, email, phone, event, ticket, order, payment, check-in. Filter event, jenis tiket, payment dan check-in; search nama/email/phone/ticket. Penggantian data attendee diaudit dan memperbarui akses terkait secara aman.

## 30 Export data

Participant report berisi attendee, kontak sesuai permission, ticket/order, status dan waktu check-in. Sales report berisi order/date/buyer/items/quantity/subtotal/discount/fee/total/payment/status serta refund yang relevan. CSV adalah P0; XLSX P1 berdasarkan dokumen perencanaan. Export private, scope diperiksa ulang, dan formula injection dinetralkan.

## 31 Refund management

Baseline full refund per order melalui proses operasional/provider. Refund request menyimpan amount, reason, actor, waktu, reference, dan bukti hasil. Selama proses tiket suspended; berhasil menjadi refunded dan tidak dapat check-in. Gagal dapat mengaktifkan tiket jika event tetap aktif. Refund tidak otomatis restock pada baseline; restock harus eksplisit dan diaudit.

## 32 Event cancellation

Admin dapat membatalkan event dengan alasan. Sistem menghentikan penjualan, melepas pending reservation, menangguhkan tiket, memberi tahu peserta, dan menyediakan daftar transaksi untuk refund. Status event cancelled bukan bukti dana telah dikembalikan.

## 33 Admin user management

Super Admin mengelola nama, email, role, status, dan event assignments. RBAC membedakan Admin, Manager, Staff. Deactivation mencabut sesi aktif; admin terakhir tidak boleh dinonaktifkan tanpa pengganti. MFA internal menjadi baseline launch.

## 34 Audit log

Log mencakup event create/update/publish/cancel, harga/kuota, voucher, manual check-in, refund, late payment resolution, user/role changes. Data mencakup actor, action, entity, timestamp, alasan, dan before/after yang disamarkan. Log append-only; secret dan token QR tidak disimpan.

## 35 Search and filtering

Admin dapat memfilter event, periode, ticket, payment/order state, dan check-in state. List memakai pagination dan query yang dibatasi. Search/export tetap mengikuti event scope pengguna.

## 36 Responsive design

Public dan checkout diprioritaskan mobile. Dashboard organizer optimal desktop/tablet; scanner optimal smartphone. Input berlabel, error inline, fokus keyboard, target sentuh nyaman, dan status tidak hanya dibedakan warna. Timezone event selalu jelas.

## 37 Security requirements

HTTPS, secure authentication/session, password hashing, MFA internal, RBAC, rate limiting, input validation, injection/XSS prevention, CSRF sesuai session, verified webhook, private files, token aman, dan audit. Data kartu sensitif tidak disimpan; gunakan hosted payment/tokenization provider.

## 38 Performance requirements

Target awal: mobile page load/LCP p75 sekitar 3 detik pada profil disepakati; API umum p95 1 detik tanpa latency provider; validation/check-in p95 2 detik pada jaringan venue target. Load dan concurrency harus diuji; kapasitas final mengikuti volume event yang disepakati.

## 39 Availability and reliability

Target awal 99,5% per bulan untuk layanan inti. Automated backup, monitoring, error logging, webhook retry/reconciliation, outbox, dan idempotent workers diperlukan. Duplicate event tidak membuat ticket ganda. Restore diuji, bukan hanya keberadaan backup.

## 40 Privacy

Minimalkan penyimpanan nama, email, nomor HP, dan custom attendee data. Sediakan privacy policy, terms, consent yang sesuai, pembatasan akses, serta retensi/deletion policy yang disepakati. Marketing opt-in terpisah. Ketentuan operasional dan kebijakan privasi diselesaikan sebelum launch.

## 41 Suggested core data model

Entity inti: Users, EventAssignments, Events, TicketTypes, Orders, OrderItems, Attendees, Reservations, Tickets, Payments, WebhookEvents, CheckIns, Vouchers, VoucherTargets, VoucherUsages, Refunds, Notifications, AuditLogs, AccessTokens, ExportJobs, dan Outbox. ERD, field, indexes dan unique constraints tersedia di Perencanaan Lokarena. Nilai uang integer rupiah; waktu disimpan UTC dengan timezone event.

## 42 Suggested system architecture

Customer Web, Organizer Dashboard, dan Staff Web terhubung ke Backend API modular monolith. Relational database sebagai sumber kebenaran, queue/worker untuk fulfillment/email/export/reconciliation, object storage untuk banner/PDF/export, dan adapter payment/email. Cache tidak memutuskan stok atau pembayaran. Dev/staging/production dipisahkan.

## 43 MVP scope

P0: event listing/detail, ticket selection, registration, review/checkout, atomic reservation, payment gateway/webhook/reconciliation, e-ticket/QR, email, akses peserta, login/RBAC, event/ticket CRUD, order/participant monitoring, scanner/manual check-in, voucher, laporan CSV, audit, full refund operasional, serta cancellation dan late payment review.

P1: XLSX, reminder otomatis, dan perluasan form. Scope ini mengikuti penajaman dokumen perencanaan dan bukan penambahan marketplace atau multi-tenant.

## 44 Phase 2

WhatsApp, advanced analytics, automated/partial refund, form builder, reminder, certificate generation, waitlist, ticket transfer, referral/affiliate tracking, custom landing page, seating, invoice, dan tax configuration diprioritaskan setelah MVP stabil.

## 45 Phase 3

Native check-in app, offline-first validation/synchronization, CRM, marketing automation, membership, loyalty, segmentation, recommendation, dan campaign attribution merupakan pengembangan lanjutan. Offline mode membutuhkan desain konflik dan keamanan tersendiri.

## 46 Critical business rules

1. Issue hanya setelah pembayaran verified atau jalur total nol sah.
2. Satu attendee per ticket dan satu opaque QR aktif per tiket.
3. Satu check-in per ticket; constraint database menjaganya.
4. Suspended/cancelled/refunded ticket tidak dapat masuk.
5. Allocated + active reserve tidak melampaui quota maupun event capacity.
6. Webhook diverifikasi dan diproses idempotent.
7. Expiry release tepat satu kali; late success masuk review.
8. Snapshot harga/order tidak diubah oleh konfigurasi baru.
9. Perubahan kritis dan operasi manual memiliki actor/alasan/audit.
10. Email gagal tidak membatalkan fulfillment dan order number bukan izin akses.

## 47 Key acceptance criteria

Purchase: event published dengan stock valid menghasilkan satu order dan reserve; duplicate submit key sama mengembalikan order sama. Payment: valid success menghasilkan N tiket tepat satu kali; redirect atau invalid amount tidak issue. Expiry: stock/voucher dilepas sekali. Late payment: sukses setelah release masuk review. Check-in: valid tiket belum dipakai dapat commit; concurrent scanner hanya satu berhasil. Refund: succeeded membuat tiket invalid; requested saja belum refunded. Role: pengguna tidak bisa mengakses event/data di luar scope. Acceptance per user story dan skenario rinci tersedia di dokumen perencanaan.

## 48 Recommended main screens

Customer: home, list/detail, registration, review, payment/status, order detail, e-ticket, access-by-email, My Tickets/order history. Organizer: login, dashboard, events/editor, tickets, orders/detail, participants, vouchers, reports/export, users/role, audit, settings. Staff: event selection, scanner, manual search. Dokumen perencanaan memberi 25 spesifikasi layar; UI interaktif menunjukkan subset layar utama.

## 49 MVP navigation

Public: Beranda, Event, Tiket Saya, Bantuan. Admin: Dashboard, Events, Orders, Participants, Check-in, Promotions, Reports, Users, Settings sesuai permission. Staff melihat event ditugaskan dan scan/manual search. Nama produk konsisten Lokarena pada header, e-ticket, dan pesan bantuan.

## 50 Recommended development priority

Sprint 1 foundation/role/events; Sprint 2 ticket types/public/registration; Sprint 3 pricing/orders/reservation/voucher; Sprint 4 payment/webhook/expiry/reconciliation; Sprint 5 ticket/QR/email/access; Sprint 6 scanner/manual/concurrency; Sprint 7 operations/refund/cancel/report/export; Sprint 8 security/load/UAT/monitoring/restore/pilot. Durasi dan kapasitas tim belum menjadi komitmen.

## 51 Definition of done

Peserta dapat menyelesaikan melihat event hingga pembayaran, menerima e-ticket dan check-in. Organizer dapat create/publish, monitor, manage participants, check-in dan export. Paid/free, oversell, duplicate request/webhook/scan, expiry race, late payment, refund/cancel, permission, notification recovery, mobile QA dan restore telah diuji. Ops memiliki runbook dan kebijakan bisnis siap.

## 52 Out of scope MVP

Marketplace, multi-tenant, native mobile, reserved seating, complex accounting, affiliate marketplace, loyalty, recommendation, full CRM, offline-first check-in, multi-currency, international taxation, partial refund, dan custom form builder penuh. Fokus Lokarena adalah penjualan tiket hingga check-in yang konsisten, mudah digunakan, dan dapat dioperasikan satu penyelenggara.

## Catatan versi

Versi 1.1 menetapkan nama Lokarena berdasarkan pilihan pengguna. Dokumen perencanaan dan contoh UI/UX menggunakan identitas yang sama. Nama venue, email, event dan data pada UI masih contoh, bukan identitas atau transaksi nyata.
