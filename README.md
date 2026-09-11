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

## 🚀 Fitur Aplikasi

- **Header Bersih & Navigasi Cepat**: Desain *single-tier* minimalis dengan logo transparan resmi Misionary, *pill search bar* lokasi Bandung, tombol pintas WhatsApp, dan tombol CTA kuning (*"Pesan Motor"*).
- **Hero Section Elegan**: Tampilan hero berfokus pada foto kontras berkualitas tinggi dengan tipografi **Inter Bold** dan *headline* satu baris:  
  > *"Motor siap pakai, kondisi terawat, Turban sekarang!"*
- **Katalog & Filter Interaktif**: Filter motor berdasarkan kategori (`Semua`, `Matic Harian`, `Maxi Scooter`) dan filter slider tarif harian.
- **Modal Pemesanan & Kalkulator Sewa**:
  - Simulasi jumlah hari sewa dengan kalkulasi diskon otomatis.
  - Pilihan titik antar-jemput (Stasiun Bandung, Stasiun Whoosh Padalarang, Hotel, Garasi Pasirkaliki).
  - Pilihan perlengkapan tambahan (*helm ekstra*).
  - *Export message* pemesanan otomatis ke format WhatsApp Admin.
- **Form Kemitraan Titip Motor (Partner)**: Memfasilitasi pemilik motor di Bandung untuk menyewakan unit yang jarang dipakai dengan skema bagi hasil transparan (70% pemilik).
- **Panduan Sewa 3 Langkah**: Penjelasan syarat KTP, SIM C, dan jaminan tanpa ribet.
- **Testimoni & FAQ Terlokalisasi**: Ulasan asli pengguna rute Bandung (Lembang, Ciwidey, Dago) dan jawaban seputar deposit, denda telat, dan asuransi.

---

## 🎨 Desain & Palet Warna

Aplikasi ini menggunakan palet warna khusus berestetika bersih (*non-generic*):
* **Dark Charcoal / Gunmetal**: `#212121` (Latar header, footer, hero overlay) & `#181818` (Latar kontras).
* **Borders / Separators**: `#333333` & `#444444`.
* **Warm Gold / Bronze**: `#A0844B` (Tombol utama hero & aksen *badge*).
* **Vibrant Yellow**: `#F8E01A` (Tombol aksi pesanan & ikon cari).
* **Background Konten**: `#FFFFFF` & `#F0F2F4` (Card ulasan).
* **Tipografi**: `Inter` (Bold untuk judul & clean untuk teks bacaan).
* **Branding Logo**: Aset logo vektor/PNG resolusi tinggi dengan latar belakang transparan (`missionary-horizontal-white.png`, `missionary-mark-white.png`, `missionary-favicon.png`).

---

## 🛠️ Tech Stack

* **Frontend Framework**: [React 19](https://react.dev/)
* **Bahasa**: [TypeScript](https://www.typescriptlang.org/)
* **Build Tool & Dev Server**: [Vite 6](https://vitejs.dev/)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
* **Ikonografi**: [Lucide React](https://lucide.dev/)
* **Animasi**: [Motion](https://motion.dev/)

---

## 📁 Struktur Direktori

```text
missionary-rental/
├── index.html                   # HTML entry point, Google Fonts, & Favicon
├── package.json                 # Konfigurasi dependensi dan skrip npm
├── tsconfig.json                # Pengaturan TypeScript
├── vite.config.ts               # Konfigurasi Vite & Tailwind plugin
├── src/
│   ├── main.tsx                 # Titik masuk aplikasi React
│   ├── App.tsx                  # Komponen utama halaman
│   ├── index.css                # Konfigurasi Tailwind & gaya font dasar
│   ├── types.ts                 # TypeScript interface (Motorbike, Review, dll.)
│   ├── vite-env.d.ts            # Deklarasi modul gambar (*.jpg, *.png, *.webp)
│   ├── data/
│   │   └── bikes.ts             # Data motor, tarif Rupiah, FAQ, & ulasan Bandung
│   ├── img/
│   │   ├── missionary-logo.jpg              # File master logo brand
│   │   ├── missionary-horizontal-white.png  # Logo transparan putih (Header & Footer)
│   │   ├── missionary-mark-white.png        # Ikon lambang M transparan
│   │   ├── missionary-favicon.png           # Favicon tajam untuk browser tab
│   │   ├── beat.jpg                         # Foto Honda BeAT
│   │   ├── scoppy.jpg                       # Foto Honda Scoopy
│   │   ├── vari.jpg                         # Foto Honda Vario 125
│   │   ├── nmax.jpg                         # Foto Yamaha NMAX
│   │   └── aerox.jpg                        # Foto Yamaha Aerox
│   └── components/
│       ├── Header.tsx           # Navigasi atas, logo brand & search bar
│       ├── Hero.tsx             # Banner utama & headline single-line
│       ├── SearchAndBrowse.tsx  # Katalog 5 armada motor & filter tarif
│       ├── BikeDetailModal.tsx  # Modal detail motor & pemesanan WhatsApp
│       ├── HowItWorks.tsx       # Alur penyewaan 3 langkah
│       ├── Testimonials.tsx     # Ulasan wisatawan & pelanggan Bandung
│       ├── FaqSection.tsx       # Tanya jawab seputar syarat & ketentuan sewa
│       ├── ListBikeModal.tsx    # Modal pendaftaran mitra pemilik motor
│       └── Footer.tsx           # Info garasi, kontak, dan footer navigasi
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

### 3. Menjalankan Server Development
```bash
npm run dev
```
Buka browser dan akses alamat lokal: [http://localhost:3000](http://localhost:3000).

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
