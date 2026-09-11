import { Motorbike, TestimonialItem, FaqItem } from '../types';
import beatImg from '../img/beat.jpg';
import scoppyImg from '../img/scoppy.jpg';
import variImg from '../img/vari.jpg';
import nmaxImg from '../img/nmax.jpg';
import aeroxImg from '../img/aerox.jpg';

export const MOTORBIKES: Motorbike[] = [
  {
    id: 'misi-beat',
    make: 'Honda',
    model: 'BeAT eSP',
    year: 2023,
    category: 'Matic Harian',
    area: 'Stasiun Bandung & Pasteur',
    dailyRate: 85000,
    depositInfo: 'Cukup e-KTP Asli (Tanpa Uang Jaminan Tunai)',
    engineDisplacement: '110 cc eSP PGM-FI',
    fuelConsumption: '60.6 km / liter (Paling Irit)',
    transmission: 'Otomatis (CVT)',
    trunkCapacity: '12 Liter',
    images: [beatImg],
    facilities: ['2 Helm SNI Bersih & Wangi', '2 Jas Hujan Setelan', 'Phone Holder Stang Kokoh', 'STNK Asli Resmi', 'Bensin Awal Ready to Ride'],
    description: 'Skutik terlaris dan paling lincah di Bandung. Sangat hemat bahan bakar, enteng dikendarai, dan lincah menembus kepadatan lalu lintas kota Bandung.',
    bestFor: 'Keliling kota Bandung, mobilitas harian hemat, & kulineran santai',
    guidelines: 'Gunakan bahan bakar minimal Pertalite / Pertamax. Selalu kunci stang saat parkir.',
    rating: 4.96,
    tripsCount: 185,
    isPopular: true,
    unitCondition: 'Prima & Bersih'
  },
  {
    id: 'misi-scoopy',
    make: 'Honda',
    model: 'Scoopy Prestige',
    year: 2024,
    category: 'Matic Harian',
    area: 'Dago & Braga Heritage',
    dailyRate: 95000,
    depositInfo: 'Cukup e-KTP Asli (Tanpa Uang Jaminan Tunai)',
    engineDisplacement: '110 cc eSP Smart Key',
    fuelConsumption: '59 km / liter',
    transmission: 'Otomatis (CVT)',
    trunkCapacity: '15.4 Liter',
    images: [scoppyImg],
    facilities: ['2 Helm Retro SNI Bersih', '2 Jas Hujan Setelan', 'Phone Holder Stang Alumunium', 'Smart Key & Alarm', 'STNK Asli Resmi'],
    description: 'Desain retro fashionable yang sangat digemari muda-mudi Bandung. Dilengkapi Smart Key System, charger HP di laci, dan pijakan kaki luas.',
    bestFor: 'Wisata santai, cafe hopping Dago & Braga, & foto estetik',
    guidelines: 'Kunci Smart Key dijaga baik-baik, jangan ditinggal di laci motor.',
    rating: 4.99,
    tripsCount: 240,
    isPopular: true,
    unitCondition: 'Favorit Wisatawan'
  },
  {
    id: 'misi-vario',
    make: 'Honda',
    model: 'Vario 125 CBS ISS',
    year: 2023,
    category: 'Matic Harian',
    area: 'Dipatiukur & Stasiun Whoosh',
    dailyRate: 110000,
    depositInfo: 'Cukup e-KTP Asli (Tanpa Uang Jaminan Tunai)',
    engineDisplacement: '125 cc Liquid-Cooled eSP',
    fuelConsumption: '51.7 km / liter',
    transmission: 'Otomatis (CVT)',
    trunkCapacity: '18 Liter (Muat Helm)',
    images: [variImg],
    facilities: ['2 Helm SNI Bersih', '2 Jas Hujan Setelan', 'Phone Holder Stang Kokoh', 'Bagasi Luas 18L', 'STNK Asli Resmi'],
    description: 'Skutik serbaguna dengan tarikan bertenaga dan pendingin radiator. Sangat stabil dan bertenaga kuat untuk nanjak ke arah Setiabudi, Lembang, dan Punclut.',
    bestFor: 'Keliling kota, tanjakan Lembang & Punclut, harian nyaman',
    guidelines: 'Periksa tekanan ban sebelum menempuh rute perbukitan Lembang.',
    rating: 4.95,
    tripsCount: 160,
    unitCondition: 'Prima & Bersih'
  },
  {
    id: 'misi-nmax',
    make: 'Yamaha',
    model: 'NMAX 155 Connected',
    year: 2024,
    category: 'Maxi Scooter',
    area: 'Stasiun Bandung & Lembang',
    dailyRate: 140000,
    depositInfo: 'Cukup e-KTP Asli (Tanpa Uang Jaminan Tunai)',
    engineDisplacement: '155 cc VVA Liquid-Cooled',
    fuelConsumption: '42 km / liter',
    transmission: 'Otomatis (CVT)',
    trunkCapacity: '24 Liter (Muat 2 Helm)',
    images: [nmaxImg],
    facilities: ['2 Helm SNI Bersih & Wangi', '2 Jas Hujan Setelan Tebal', 'Phone Holder Stang', 'Suspensi Belakang Sub-Tank', 'STNK Asli Resmi'],
    description: 'Maxi scooter paling nyaman untuk touring liburan jarak jauh di Bandung. Posisi kaki bisa selonjoran santai, suspensi tabung empuk, dan bertenaga besar di tanjakan.',
    bestFor: 'Touring ke Tangkuban Perahu, Kawah Putih Ciwidey, & Pangalengan',
    guidelines: 'Isi bahan bakar Pertamax untuk performa optimal VVA.',
    rating: 4.99,
    tripsCount: 310,
    isPopular: true,
    unitCondition: 'Favorit Wisatawan'
  },
  {
    id: 'misi-aerox',
    make: 'Yamaha',
    model: 'Aerox 155 Connected',
    year: 2024,
    category: 'Maxi Scooter',
    area: 'Cihampelas & Setiabudi',
    dailyRate: 135000,
    depositInfo: 'Cukup e-KTP Asli (Tanpa Uang Jaminan Tunai)',
    engineDisplacement: '155 cc VVA Blue Core',
    fuelConsumption: '43 km / liter',
    transmission: 'Otomatis (CVT)',
    trunkCapacity: '25 Liter',
    images: [aeroxImg],
    facilities: ['2 Helm SNI Bersih', '2 Jas Hujan Setelan', 'Phone Holder Stang Kokoh', 'Speedometer Digital Connected', 'STNK Asli Resmi'],
    description: 'Skutik Maxi bernuansa super sport dengan akselerasi responsif dan handling presisi. Tampilan agresif dan sporty, sangat digemari untuk Sunmori di Bandung.',
    bestFor: 'Sunmori Lembang - Ciater Subang & keliling kota dengan gaya sporty',
    guidelines: 'Berkendara dengan aman dan patuhi rambu lalu lintas Bandung.',
    rating: 4.97,
    tripsCount: 125,
    unitCondition: 'Unit Baru 2024'
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    quote: 'Turun di Stasiun Bandung jam 9 pagi, tim Misionary udah standby di pintu selatan nganter NMAX yang super kinclong. Helmnya beneran wangi dan dapet jas hujan bagus. Liburan 3 hari keliling Dago dan Lembang jadi anti ribet!',
    author: 'David Simbolon',
    origin: 'UNAI',
    route: 'Stasiun Bandung → Dago & Lembang',
    motorcycle: 'Yamaha NMAX 155 Connected',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    rating: 5.0
  },
  {
    id: 'test-2',
    quote: 'Sewa Aerox buat riding bareng pasangan di jalan Braga dan ngopi sore di Dago Pakar. Unitnya mulus banget kayak motor pribadi baru keluar dealer. Proses booking via WA cepat dan ramah!',
    author: 'Joe & Abigail',
    origin: 'Parongpong',
    route: 'Braga, Dago Pakar & Ciwidey',
    motorcycle: 'Yamaha Aerox 155 Connected',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    rating: 5.0
  },
  {
    id: 'test-3',
    quote: 'Pelayanan Misionary juara! Walaupun baru buka, tapi profesional banget. Unit Scoopy-nya irit banget buat keliling cafe 2 hari penuh. Bensin awal udah siap, phone holdernya juga kokoh buat Google Maps.',
    author: 'Ramos',
    origin: 'Bandung',
    route: 'Kiara Artha, Dipatiukur, Punclut',
    motorcycle: 'Honda Scoopy Prestige',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    rating: 4.9
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Apa saja syarat untuk menyewa motor di Misionary Bandung?',
    answer: 'Syaratnya sangat mudah dan cepat: (1) Memiliki e-KTP asli yang masih berlaku sebagai jaminan identitas selama masa sewa, (2) Memiliki SIM C aktif, dan (3) Menyertakan bukti tiket kedatangan (Kereta Api / Tiket Pesawat / Whoosh) ATAU bukti reservasi hotel/penginapan di Bandung. Tanpa jaminan uang tunai jutaan rupiah.',
    category: 'syarat'
  },
  {
    question: 'Apakah motor bisa diantar ke Stasiun Bandung atau Hotel tempat saya menginap?',
    answer: 'Tentu bisa! Kami menyediakan layanan antar-jemput unit ke Stasiun Bandung (Pintu Utama/Selatan & Pintu Kebon Kawung), Stasiun KCIC Whoosh (Padalarang/Tegalluar), Pool Travel Pasteur, serta hotel atau villa di area Dago, Riau, Cihampelas, dan pusat kota Bandung. Cukup infokan jam kedatangan dan lokasi Anda.',
    category: 'antar-jemput'
  },
  {
    question: 'Fasilitas apa saja yang didapatkan penyewa?',
    answer: 'Setiap sewa unit di Misionary sudah mencakup: (1) 2 buah Helm SNI yang bersih, higienis dan wangi, (2) 2 set Jas Hujan tebal anti rembes (bukan plastik kresek), (3) Phone Holder kokoh yang sudah terpasang di stang untuk navigasi Google Maps, (4) STNK asli resmi berpelat D Bandung dalam dompet pelindung, dan (5) Bensin awal sehingga Anda bisa langsung jalan.',
    category: 'fasilitas'
  },
  {
    question: 'Bagaimana sistem bahan bakar (bensin) saat pengambilan dan pengembalian?',
    answer: 'Kami menerapkan sistem adil "Sama Kembali Sama": saat serah terima, indikator bensin akan difoto bersama. Saat masa sewa selesai, Anda cukup mengembalikan motor dengan indikator bensin yang sama seperti awal pengambilan.',
    category: 'fasilitas'
  },
  {
    question: 'Bagaimana metode pembayaran di Misionary?',
    answer: 'Kami menerima pembayaran melalui QRIS (bisa dari semua e-wallet seperti GoPay, OVO, Dana, ShopeePay, dan Mobile Banking BCA, Mandiri, BRI, BNI), Transfer Bank, maupun uang tunai saat serah terima motor.',
    category: 'pembayaran'
  },
  {
    question: 'Apakah ada potongan harga untuk sewa lebih dari 3 hari atau mingguan?',
    answer: 'Ada! Kami memberikan diskon khusus untuk sewa 3 hari ke atas (diskon 5%) dan sewa mingguan 7 hari (diskon hingga 15%). Hubungi admin kami via WhatsApp untuk mendapatkan penawaran paket hemat liburan.',
    category: 'pembayaran'
  }
];

