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

## 🛠️ Tech Stack & Cloud Architecture

* **Frontend Framework**: [Next.js 16](https://nextjs.org/) (App Router dengan Server & Client Components)
* **Backend & Cloud Database**: [Convex](https://www.convex.dev/) (Real-time Cloud Database, reactive subscriptions via WebSockets)
* **Hosting Platform**: [Vercel](https://vercel.com/) (Zero-config native Next.js deployment)
* **Bahasa**: [TypeScript](https://www.typescriptlang.org/) (Full-stack TypeScript *end-to-end*)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) dengan `@tailwindcss/postcss`
* **Ikonografi**: [Lucide React](https://lucide.dev/)
* **Animasi**: [Motion](https://motion.dev/)

---

## ⚡ Arsitektur Real-Time Convex (`convex/`)

Convex menggantikan REST API konvensional dengan fungsi kueri & mutasi *type-safe* yang langsung bereaksi terhadap perubahan data:

| Modul Convex | Jenis | Fungsi & Deskripsi |
| :--- | :--- | :--- |
| `convex/bikes.ts` | Query / Mutation | `getAll`, `getById`, `updateStatus`, `addBike`, `updateBike`, `deleteBike`, `seedBikes` |
| `convex/bookings.ts` | Query / Mutation | `getAll`, `create` (generate kode `MSN-XXXX`), `createManual`, `track`, `updateStatus`, `updatePayment` |
| `convex/analytics.ts` | Query | `getMetrics` (omset, okupansi, armada aktif), `getAnalyticsData` (grafik tren omset 7 hari) |
| `convex/auth.ts` | Mutation / Query | `login` (verifikasi PIN admin `misionary2026`), `validateSession`, `logout` |
| `convex/init.ts` | Mutation | `initData` (auto-seed 5 unit motor resmi dan data transaksi sampel) |

---

## 📁 Struktur Direktori

```text
missionary-rental/
├── app/
│   ├── layout.tsx                # Root layout, Google Inter Font, & ConvexClientProvider
│   ├── page.tsx                  # Landing page pelanggan publik
│   ├── admin/
│   │   └── page.tsx              # Portal admin operasional (/admin) & PIN login
│   └── globals.css               # Tailwind CSS v4 & tema custom
├── convex/
│   ├── schema.ts                 # Definisi skema tabel bikes, bookings, admin_sessions
│   ├── bikes.ts                  # Logika armada motor (katalog, status ready/disewa)
│   ├── bookings.ts               # Logika pemesanan, kode tracking, & status sewa
│   ├── analytics.ts              # Perhitungan metrik bisnis & grafik tren omset
│   ├── auth.ts                   # Autentikasi PIN admin (misionary2026)
│   └── init.ts                   # Inisialisasi otomatis data awal di cloud
├── public/
│   └── img/                      # Aset gambar resmi motor & logo transparan
├── src/
│   ├── components/
│   │   ├── ConvexClientProvider.tsx  # Client provider Convex
│   │   ├── Header.tsx           # Navigasi atas publik & tombol Cek Pesanan / Admin
│   │   ├── Hero.tsx             # Banner utama & headline single-line
│   │   ├── SearchAndBrowse.tsx  # Katalog 5 armada motor & filter tarif
│   │   ├── BikeDetailModal.tsx  # Modal detail motor & submit booking
│   │   ├── BookingTrackModal.tsx# Modal pelacakan pesanan mandiri bagi pelanggan
│   │   ├── AdminLogin.tsx       # Halaman login PIN portal admin operasional
│   │   ├── AdminDashboard.tsx   # Container utama portal admin berstandar internasional
│   │   └── admin/
│   │       ├── AdminSidebar.tsx         # Sidebar navigasi (Expanded & Compact 72px)
│   │       ├── AdminTopbar.tsx          # Topbar minimalis, toggle compact & judul bersih
│   │       ├── OverviewTab.tsx          # Tab Dashboard & KPI Cards
│   │       ├── AnalyticsTab.tsx         # Tab Analitik & Grafik Tren Omset SVG
│   │       ├── DatabaseExplorerTab.tsx  # Tab Inspeksi Data & Ekspor JSON
│   │       ├── ScheduleCalendarTab.tsx  # Tab Kalender Jadwal Alokasi 14 Hari
│   │       ├── SettingsTab.tsx          # Tab Diagnostik Sistem & Backup
│   │       ├── ManualBookingModal.tsx   # Modal Input Pemesanan Manual (Walk-in)
│   │       ├── InvoiceModal.tsx         # Modal Struk Resmi & Berita Acara Serah Terima
│   │       └── BikeModal.tsx            # Modal Tambah/Ubah Data Armada Motor
│   ├── data/
│   │   └── bikes.ts             # Data statis fallback motor & FAQ
│   └── types.ts                 # TypeScript interface (Motorbike, Review, Booking, dll.)
├── next.config.mjs               # Konfigurasi Next.js
├── postcss.config.mjs            # Konfigurasi PostCSS & Tailwind v4
├── package.json                 # Dependensi Next.js & Convex
└── tsconfig.json                # Pengaturan TypeScript App Router
```

---

## 💻 Panduan Menjalankan Proyek

### 1. Instalasi Dependensi
```bash
npm install
```

### 2. Menjalankan Server Pengembangan (Next.js)
```bash
npm run dev
```
Buka browser ke [http://localhost:3000](http://localhost:3000).
- **Portal Admin**: Buka langsung [http://localhost:3000/admin](http://localhost:3000/admin) (PIN: `misionary2026`).

### 3. Mengaktifkan Cloud Backend Convex (Opsional / Sinkronisasi Online)
Untuk menghubungkan database cloud Convex ke akun GitHub Anda:
```bash
npx convex dev
```
Perintah ini akan membuka browser untuk login akun Convex gratis, membuat project cloud, dan menghasilkan file `.env.local` berisi `NEXT_PUBLIC_CONVEX_URL`.

### 4. Build untuk Produksi
```bash
npm run build
```

---

## 🚀 Panduan Deployment ke Vercel

1. Push perubahan terbaru ke repository GitHub:
   ```bash
   git push origin feat/features
   ```
2. Buka dashboard project di [vercel.com](https://vercel.com).
3. Vercel akan secara otomatis mendeteksi proyek sebagai **Next.js** dan melakukan build serta deploy tanpa konfigurasi manual apapun!
4. *(Opsional untuk integrasi Convex di Vercel)*:
   - Tambahkan integrasi **Convex** langsung dari Vercel Marketplace (1-klik), atau
   - Masukkan `NEXT_PUBLIC_CONVEX_URL` dan `CONVEX_DEPLOYMENT` di **Settings > Environment Variables** pada Vercel.

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
