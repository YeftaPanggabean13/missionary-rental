# Misionary — Rental Motor Bandung

Platform web penyewaan sepeda motor lokal di Bandung yang bersih, modern, dan profesional. Dirancang khusus untuk wisatawan, mahasiswa, maupun profesional yang membutuhkan kendaraan roda dua yang terawat, siap pakai, dan mudah dipesan langsung via WhatsApp.

---

## 🌟 Tentang Bisnis

**Misionary** hadir sebagai solusi rental motor terpercaya di kota Bandung dengan komitmen pelayanan ramah khas Bandung (*Sundanese hospitality*), armada terawat rutin di bengkel resmi, dan kemudahan layanan antar-jemput gratis ke titik-titik transportasi utama (Stasiun Bandung, Stasiun Kereta Cepat Whoosh Padalarang, dan hotel sekitar kota).

### Keunggulan Layanan:
* 🛵 **Unit Bersih & Terawat**: Pengecekan rutin rem, ban, oli, dan kelistrikan sebelum diserahkan ke pelanggan.
* ⛑️ **Fasilitas Lengkap Gratis**: 2 Helm SNI wangi & bersih, 2 jas hujan ponco/setelan, dan *phone holder* stang.
* ⛽ **Bensin Awal Cukup**: Siap jalan tanpa panik mencari SPBU pertama.
* 🚆 **Antar-Jemput Fleksibel**: Gratis di Stasiun Bandung (Pintu Utara & Selatan) serta pengantaran ke hotel atau stasiun Whoosh.
* 📱 **Pemesanan Cepat via WhatsApp**: Estimasi biaya otomatis dan langsung terhubung dengan admin tanpa birokrasi rumit.

---

## 🏍️ Pilihan Armada & Tarif Sewa (IDR)

Semua tarif dalam mata uang Rupiah per hari (24 jam) dengan diskon otomatis untuk sewa jangka menengah (3+ hari) dan mingguan (7+ hari):

| Motor | Kategori | CC | Kapasitas Bagasi | Tarif / Hari |
| :--- | :--- | :---: | :---: | :---: |
| **Honda BeAT** | Matic Harian | 110 cc | 11.7 Liter | Rp 85.000 |
| **Honda Scoopy** | Matic Retro | 110 cc | 15.4 Liter | Rp 95.000 |
| **Honda Vario 125** | Matic Harian | 125 cc | 18 Liter | Rp 110.000 |
| **Yamaha Aerox** | Maxi Scooter | 155 cc | 24.5 Liter | Rp 135.000 |
| **Yamaha NMAX** | Maxi Scooter | 155 cc | 24 Liter | Rp 140.000 |

---

## 🚀 Fitur Aplikasi & Platform SaaS

### 1. Sisi Pelanggan (Customer Facing)
- **Header Bersih & Navigasi Cepat**: Desain *single-tier* minimalis dengan logo transparan resmi Misionary, *pill search bar* lokasi Bandung, tombol pintas WhatsApp, dan tombol CTA kuning (*"Pesan Motor"*).
- **Hero Section Elegan**: Tampilan hero berfokus pada foto kontras berkualitas tinggi dengan tipografi **Inter Bold** dan *headline* satu baris:  
  > *"Motor siap pakai, kondisi terawat, Turban sekarang!"*
- **Katalog & Filter Interaktif**: Filter motor berdasarkan kategori (`Semua`, `Matic Harian`, `Maxi Scooter`) dan filter slider tarif harian yang tersinkronisasi langsung dengan basis data ketersediaan unit.
- **Modal Pemesanan & Kalkulator Sewa**:
  - Simulasi jumlah hari sewa dengan kalkulasi diskon otomatis.
  - Pilihan titik antar-jemput (Stasiun Bandung, Stasiun Whoosh Padalarang, Hotel, Garasi Misionary).
  - Pilihan perlengkapan tambahan (*helm ekstra*).
  - **Penyimpanan Pemesanan ke Backend Database**: Menghasilkan kode unik pelacakan otomatis (format `MSN-XXXX`).
  - *Direct WhatsApp Dispatch*: Kirim rincian pesanan dan kode booking otomatis ke WhatsApp Admin.
- **Fitur Cek Pesanan (Self-Service Tracking)**: Pelanggan dapat melacak status pesanan secara *real-time* (Pesanan Diterima → Data Diverifikasi → Motor Diantar → Selesai) menggunakan Kode Booking atau Nomor WhatsApp.
- **Form Kemitraan Titip Motor (Partner)**: Memfasilitasi pemilik motor di Bandung untuk menyewakan unit yang jarang dipakai dengan skema bagi hasil transparan (70% pemilik).
- **Panduan Sewa 3 Langkah**: Penjelasan syarat KTP, SIM C, dan jaminan tanpa ribet.
- **Testimoni & FAQ Terlokalisasi**: Ulasan asli pengguna rute Bandung (Lembang, Ciwidey, Dago) dan jawaban seputar deposit, denda telat, dan asuransi.

### 2. Sisi Operasional & Admin (Government / Enterprise Portal Berstandar Internasional)
- **Akses URL Bersih**: Akses portal langsung melalui [http://localhost:3000/admin](http://localhost:3000/admin) (mendukung redirect otomatis dari `/#admin`).
- **Gate Login Terproteksi PIN**: Akses dashboard operasional diamankan dengan verifikasi PIN admin (`misionary2026`).
- **Collapsible Enterprise Sidebar (Expanded & Compact 72px)**:
  - Sidebar modular dengan 4 grup terstruktur: *Ikhtisar Utama, Logistik & Armada, Intelijen & Data, dan Sistem*.
  - Mode **Compact Sidebar (72px)** berbasis ikon dengan hover tooltip elegan untuk memaksimalkan ruang kerja operator.
  - Status tersimpan otomatis di `localStorage` (`msn_sidebar_collapsed`) agar tampilan tetap konsisten saat dimuat ulang.
- **Enterprise Topbar**:
  - Breadcrumb dinamis (`Portal Operasional > Ikhtisar Eksekutif`).
  - Indikator detak sistem langsung (`🟢 API 5001 Online • SQLite WAL Persisten`).
  - Penunjuk tanggal hari ini, tombol *Segarkan Data*, tombol *Lihat Web*, dan aksi cepat `+ Booking Manual`.
- **7 Tampilan Tab Multi-Domain**:
  1. **Ikhtisar Eksekutif (`OverviewTab`)**: 4 KPI Cards (Total Pendapatan, Unit Aktif, Pending, Okupansi), Matriks Kesiapan 5 Armada, 5 Transaksi Terakhir, dan Quick Launchpad.
  2. **Daftar Pemesanan (`Bookings`)**: Pencarian instan, filter status, update status pesanan, update pembayaran, dan tautan WhatsApp.
  3. **Manajemen Armada (`Fleet`)**: Pengawasan pelat nomor resmi D Bandung, status kesiapan, edit tarif harian, dan tambah armada baru via modal.
  4. **Kalender Jadwal Armada (`ScheduleCalendarTab`)**: Matriks alokasi unit motor 14 hari ke depan dengan navigasi tanggal untuk memantau reservasi.
  5. **Laporan & Analitik (`AnalyticsTab`)**: Grafik tren omset SVG 7 hari terakhir, performa persewaan per unit motor, dan proporsi kategori armada.
  6. **Database SQLite Explorer (`DatabaseExplorerTab`)**: Inspeksi langsung tabel fisik (`bookings`, `bikes`, `admin_sessions`), eksekusi kueri aman (`SELECT`), dan unduh data tabel ke format JSON.
  7. **Pengaturan & Backup (`SettingsTab`)**: Spesifikasi lingkungan server, penyalinan path file SQLite fisik, dan pengunduhan file backup `.db`.
- **Fitur Modal Operasional**:
  - **Modal Booking Manual (`ManualBookingModal`)**: Untuk pesanan walk-in / telepon langsung dari pelanggan.
  - **Cetak Struk Resmi & Form Serah Terima (`InvoiceModal`)**: Format siap cetak (*Print/PDF*) mencakup rincian sewa, syarat KTP/SIM C, dan kolom tanda tangan penyewa & petugas.
  - **Modal Kelola Armada (`BikeModal`)**: Formulir tambah/edit spesifikasi sepeda motor.

---

## 🛠️ Tech Stack & Backend Architecture

* **Frontend Framework**: [React 19](https://react.dev/)
* **Backend Framework**: [Express.js](https://expressjs.com/) (Node.js REST API pada port `5001`)
* **Database**: [SQLite](https://sqlite.org/) via `better-sqlite3` di [`data/misionary.db`](file:///c:/missionary-rental/data/misionary.db) (berjalan dalam mode **WAL - Write-Ahead Logging**, sangat cepat, zero-configuration)
* **Bahasa**: [TypeScript](https://www.typescriptlang.org/) (Full-stack TypeScript)
* **Runtime Runner**: `tsx` (TypeScript Execute dengan fitur *watch mode*)
* **Build Tool & Dev Server**: [Vite 6](https://vitejs.dev/) dengan API Proxy ke `http://127.0.0.1:5001`
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
* **Ikonografi**: [Lucide React](https://lucide.dev/)
* **Animasi**: [Motion](https://motion.dev/)

---

## 🔌 Dokumentasi REST API

Backend Express berjalan di port `5001` (diproxy otomatis via Vite di `/api`):

| Method | Endpoint | Akses | Deskripsi |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Publik | Cek kesehatan status API server |
| `GET` | `/api/bikes` | Publik | Mendapatkan seluruh katalog motor beserta status ketersediaan |
| `GET` | `/api/bikes/:id` | Publik | Mendapatkan detail spesifikasi motor berdasarkan ID |
| `POST` | `/api/bookings` | Publik | Menyimpan pemesanan baru dari pelanggan dan menerbitkan kode tracking |
| `GET` | `/api/bookings/track/:code` | Publik | Melacak status pesanan berdasarkan kode booking atau nomor HP |
| `POST` | `/api/admin/login` | Publik | Login admin dengan PIN untuk memperoleh Bearer session token |
| `GET` | `/api/admin/metrics` | Admin | Ringkasan metrik pendapatan, okupansi, dan pesanan |
| `GET` | `/api/admin/bookings` | Admin | Daftar seluruh riwayat dan pemesanan aktif |
| `POST` | `/api/admin/bookings/manual` | Admin | Menambahkan pemesanan manual dari walk-in/telepon |
| `PATCH` | `/api/admin/bookings/:id/status` | Admin | Memperbarui status pesanan (`PENDING`, `CONFIRMED`, dll.) |
| `PATCH` | `/api/admin/bookings/:id/payment` | Admin | Memperbarui status pembayaran (`BELUM_BAYAR`, `DP_50`, `LUNAS`) |
| `POST` | `/api/admin/bikes` | Admin | Menambah unit motor baru ke armada |
| `PUT` | `/api/admin/bikes/:id` | Admin | Memperbarui detail unit motor |
| `DELETE` | `/api/admin/bikes/:id` | Admin | Menghapus unit motor dari armada |
| `PATCH` | `/api/admin/bikes/:id/status` | Admin | Memperbarui status armada (`TERSEDIA`, `DISEWA`, `SERVIS`) |
| `GET` | `/api/admin/analytics` | Admin | Data agregat grafik omset 7 hari dan ranking utilisasi motor |
| `GET` | `/api/admin/database/stats` | Admin | Informasi lokasi fisik SQLite, ukuran file, mode WAL, dan total baris |
| `GET` | `/api/admin/database/table/:name` | Admin | Mengambil rekaman data tabel tertentu untuk Database Explorer |
| `POST` | `/api/admin/database/query` | Admin | Menjalankan kueri aman (`SELECT`) langsung dari dashboard |
| `GET` | `/api/admin/database/backup` | Admin | Mengunduh file salinan basis data `misionary.db` |
| `POST` | `/api/admin/logout` | Admin | Mengakhiri sesi admin |

---

## 📁 Struktur Direktori

```text
missionary-rental/
├── index.html                   # HTML entry point, Google Fonts, & Favicon
├── package.json                 # Konfigurasi dependensi dan skrip npm
├── tsconfig.json                # Pengaturan TypeScript
├── vite.config.ts               # Konfigurasi Vite, Tailwind, & API Proxy ke port 5001
├── data/
│   └── misionary.db             # Basis data SQLite fisik lokal (WAL mode)
├── server/
│   ├── db.ts                    # Schema SQLite, seed data, migrasi, & fungsi query
│   └── index.ts                 # Express REST API server, endpoint admin & auth
├── src/
│   ├── main.tsx                 # Titik masuk aplikasi React
│   ├── App.tsx                  # Router utama (Publik di /, Admin di /admin)
│   ├── index.css                # Konfigurasi Tailwind & tema dark palette
│   ├── types.ts                 # TypeScript interface (Motorbike, Review, Booking, dll.)
│   ├── vite-env.d.ts            # Deklarasi modul gambar (*.jpg, *.png, *.webp)
│   ├── data/
│   │   └── bikes.ts             # Data statis fallback motor & FAQ
│   ├── img/
│   │   ├── missionary-logo.jpg              # Master logo
│   │   ├── missionary-horizontal-white.png  # Logo transparan putih (Header & Admin)
│   │   ├── missionary-mark-white.png        # Lambang M transparan
│   │   ├── missionary-favicon.png           # Favicon browser
│   │   ├── beat.jpg                         # Foto Honda BeAT
│   │   ├── scoppy.jpg                       # Foto Honda Scoopy
│   │   ├── vari.jpg                         # Foto Honda Vario 125
│   │   ├── nmax.jpg                         # Foto Yamaha NMAX
│   │   └── aerox.jpg                        # Foto Yamaha Aerox
│   └── components/
│       ├── Header.tsx           # Navigasi atas publik & tombol Cek Pesanan / Admin
│       ├── Hero.tsx             # Banner utama & headline single-line
│       ├── SearchAndBrowse.tsx  # Katalog 5 armada motor & filter tarif
│       ├── BikeDetailModal.tsx  # Modal detail motor & submit booking ke backend
│       ├── BookingTrackModal.tsx# Modal pelacakan pesanan mandiri bagi pelanggan
│       ├── AdminLogin.tsx       # Halaman login PIN portal admin operasional
│       ├── AdminDashboard.tsx   # Container utama portal admin berstandar internasional
│       ├── admin/
│       │   ├── AdminSidebar.tsx         # Sidebar navigasi (Expanded & Compact 72px)
│       │   ├── AdminTopbar.tsx          # Topbar breadcrumb, status WAL, & aksi cepat
│       │   ├── OverviewTab.tsx          # Tab Ikhtisar Eksekutif & KPI Cards
│       │   ├── AnalyticsTab.tsx         # Tab Analitik & Grafik Tren Omset SVG
│       │   ├── DatabaseExplorerTab.tsx  # Tab Inspeksi Tabel SQLite & Query Runner
│       │   ├── ScheduleCalendarTab.tsx  # Tab Kalender Jadwal Alokasi 14 Hari
│       │   ├── SettingsTab.tsx          # Tab Diagnostik Sistem & Backup Database
│       │   ├── ManualBookingModal.tsx   # Modal Input Pemesanan Manual (Walk-in)
│       │   ├── InvoiceModal.tsx         # Modal Struk Resmi & Tanda Terima Kunci
│       │   └── BikeModal.tsx            # Modal Tambah/Ubah Data Armada Motor
│       ├── HowItWorks.tsx       # Alur penyewaan 3 langkah
│       ├── Testimonials.tsx     # Ulasan wisatawan & pelanggan Bandung
│       ├── FaqSection.tsx       # Tanya jawab seputar syarat & ketentuan sewa
│       ├── ListBikeModal.tsx    # Modal pendaftaran mitra pemilik motor
│       └── Footer.tsx           # Info garasi, kontak, dan tautan portal admin
```

---

## 💻 Panduan Menjalankan Proyek

### 1. Prasyarat
Pastikan sistem Anda telah terpasang:
* **Node.js** (versi 18 ke atas disarankan)
* **npm** atau **yarn** / **pnpm**

### 2. Instalasi Dependensi
```bash
npm install
```

### 3. Menjalankan Server & Client Secara Bersamaan
```bash
npm run dev
```
Perintah ini akan menjalankan backend Express API (`port 5001`) dan frontend Vite (`port 3000`) secara bersamaan menggunakan `concurrently`.

- **Aplikasi Web Pelanggan**: Buka [http://localhost:3000](http://localhost:3000)
- **Portal Admin Operasional**: Buka langsung [http://localhost:3000/admin](http://localhost:3000/admin)
  - **PIN Default**: `misionary2026`
- **Fitur Cek Pesanan**: Klik tombol **Cek Pesanan** di navigasi atau coba kode sampel `MSN-0001`

### 4. Build untuk Produksi
```bash
npm run build
```
File hasil kompilasi akan tersimpan di dalam folder `dist/` dan siap diunggah ke layanan hosting (seperti Vercel, Netlify, atau Cloudflare Pages).

### 5. Pratinjau Hasil Build
```bash
npm run preview
```

---

## 📍 Informasi Operasional

* **Nama Bisnis**: Misionary — Rental Motor Bandung
* **Lokasi Garasi**: Jl. Pasirkaliki No. 88, Cicendo, Kota Bandung (3 menit dari Stasiun Bandung Pintu Utara)
* **Jam Operasional**: Setiap hari, 06.30 – 21.30 WIB
* **Layanan Darurat / Antar**: Siaga 24 Jam dengan konfirmasi terlebih dahulu
* **WhatsApp Pemesanan**: `+62 812-3456-7890`

---

## 📄 Lisensi

Hak Cipta © 2026 Misionary Rental Motor Bandung. Seluruh hak cipta dilindungi undang-undang.
