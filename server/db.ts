import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = path.join(__dirname, '..', 'data', 'misionary.db');

// Ensure data directory exists
import fs from 'fs';
const dataDir = path.dirname(DB_PATH);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new Database(DB_PATH);

// Enable WAL mode for better concurrency
db.pragma('journal_mode = WAL');

// ──────────────────────────────────────────
// Schema
// ──────────────────────────────────────────

db.exec(`
  CREATE TABLE IF NOT EXISTS bikes (
    id TEXT PRIMARY KEY,
    make TEXT NOT NULL,
    model TEXT NOT NULL,
    year INTEGER NOT NULL,
    category TEXT NOT NULL,
    area TEXT NOT NULL,
    dailyRate INTEGER NOT NULL,
    depositInfo TEXT NOT NULL,
    engineDisplacement TEXT NOT NULL,
    fuelConsumption TEXT NOT NULL,
    transmission TEXT NOT NULL,
    trunkCapacity TEXT NOT NULL,
    platNomor TEXT NOT NULL DEFAULT '',
    imagePath TEXT NOT NULL DEFAULT '',
    facilities TEXT NOT NULL DEFAULT '[]',
    description TEXT NOT NULL DEFAULT '',
    bestFor TEXT NOT NULL DEFAULT '',
    guidelines TEXT NOT NULL DEFAULT '',
    rating REAL NOT NULL DEFAULT 5.0,
    tripsCount INTEGER NOT NULL DEFAULT 0,
    isPopular INTEGER NOT NULL DEFAULT 0,
    unitCondition TEXT NOT NULL DEFAULT 'Prima & Bersih',
    status TEXT NOT NULL DEFAULT 'TERSEDIA',
    createdAt TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    bookingCode TEXT NOT NULL UNIQUE,
    customerName TEXT NOT NULL,
    customerPhone TEXT NOT NULL,
    bikeId TEXT NOT NULL,
    bikeName TEXT NOT NULL,
    startDate TEXT NOT NULL,
    rentalDays INTEGER NOT NULL,
    pickupLocation TEXT NOT NULL,
    pickupAddress TEXT NOT NULL DEFAULT '',
    extraHelm INTEGER NOT NULL DEFAULT 0,
    dailyRate INTEGER NOT NULL,
    totalAmount INTEGER NOT NULL,
    paymentStatus TEXT NOT NULL DEFAULT 'BELUM_BAYAR',
    status TEXT NOT NULL DEFAULT 'PENDING',
    notes TEXT NOT NULL DEFAULT '',
    createdAt TEXT NOT NULL DEFAULT (datetime('now')),
    updatedAt TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (bikeId) REFERENCES bikes(id)
  );

  CREATE TABLE IF NOT EXISTS admin_sessions (
    token TEXT PRIMARY KEY,
    createdAt TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

// ──────────────────────────────────────────
// Seed data (only if bikes table is empty)
// ──────────────────────────────────────────

const bikeCount = db.prepare('SELECT COUNT(*) as cnt FROM bikes').get() as { cnt: number };

if (bikeCount.cnt === 0) {
  const insertBike = db.prepare(`
    INSERT INTO bikes (id, make, model, year, category, area, dailyRate, depositInfo,
      engineDisplacement, fuelConsumption, transmission, trunkCapacity, platNomor,
      imagePath, facilities, description, bestFor, guidelines,
      rating, tripsCount, isPopular, unitCondition, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const seedBikes = [
    {
      id: 'misi-beat',
      make: 'Honda', model: 'BeAT eSP', year: 2023,
      category: 'Matic Harian', area: 'Stasiun Bandung & Pasteur',
      dailyRate: 85000, depositInfo: 'Cukup e-KTP Asli (Tanpa Uang Jaminan Tunai)',
      engineDisplacement: '110 cc eSP PGM-FI', fuelConsumption: '60.6 km / liter (Paling Irit)',
      transmission: 'Otomatis (CVT)', trunkCapacity: '12 Liter',
      platNomor: 'D 1234 MSN',
      imagePath: '/src/img/beat.jpg',
      facilities: JSON.stringify(['2 Helm SNI Bersih & Wangi', '2 Jas Hujan Setelan', 'Phone Holder Stang Kokoh', 'STNK Asli Resmi', 'Bensin Awal Ready to Ride']),
      description: 'Skutik terlaris dan paling lincah di Bandung. Sangat hemat bahan bakar.',
      bestFor: 'Keliling kota Bandung, mobilitas harian hemat, & kulineran santai',
      guidelines: 'Gunakan bahan bakar minimal Pertalite / Pertamax.',
      rating: 4.96, tripsCount: 185, isPopular: 1, unitCondition: 'Prima & Bersih', status: 'TERSEDIA',
    },
    {
      id: 'misi-scoopy',
      make: 'Honda', model: 'Scoopy Prestige', year: 2024,
      category: 'Matic Harian', area: 'Dago & Braga Heritage',
      dailyRate: 95000, depositInfo: 'Cukup e-KTP Asli (Tanpa Uang Jaminan Tunai)',
      engineDisplacement: '110 cc eSP Smart Key', fuelConsumption: '59 km / liter',
      transmission: 'Otomatis (CVT)', trunkCapacity: '15.4 Liter',
      platNomor: 'D 5678 MSN',
      imagePath: '/src/img/scoppy.jpg',
      facilities: JSON.stringify(['2 Helm Retro SNI Bersih', '2 Jas Hujan Setelan', 'Phone Holder Stang Alumunium', 'Smart Key & Alarm', 'STNK Asli Resmi']),
      description: 'Desain retro fashionable yang sangat digemari muda-mudi Bandung.',
      bestFor: 'Wisata santai, cafe hopping Dago & Braga, & foto estetik',
      guidelines: 'Kunci Smart Key dijaga baik-baik, jangan ditinggal di laci motor.',
      rating: 4.99, tripsCount: 240, isPopular: 1, unitCondition: 'Favorit Wisatawan', status: 'TERSEDIA',
    },
    {
      id: 'misi-vario',
      make: 'Honda', model: 'Vario 125 CBS ISS', year: 2023,
      category: 'Matic Harian', area: 'Dipatiukur & Stasiun Whoosh',
      dailyRate: 110000, depositInfo: 'Cukup e-KTP Asli (Tanpa Uang Jaminan Tunai)',
      engineDisplacement: '125 cc Liquid-Cooled eSP', fuelConsumption: '51.7 km / liter',
      transmission: 'Otomatis (CVT)', trunkCapacity: '18 Liter (Muat Helm)',
      platNomor: 'D 9012 MSN',
      imagePath: '/src/img/vari.jpg',
      facilities: JSON.stringify(['2 Helm SNI Bersih', '2 Jas Hujan Setelan', 'Phone Holder Stang Kokoh', 'Bagasi Luas 18L', 'STNK Asli Resmi']),
      description: 'Skutik serbaguna dengan tarikan bertenaga dan pendingin radiator.',
      bestFor: 'Keliling kota, tanjakan Lembang & Punclut, harian nyaman',
      guidelines: 'Periksa tekanan ban sebelum menempuh rute perbukitan Lembang.',
      rating: 4.95, tripsCount: 160, isPopular: 0, unitCondition: 'Prima & Bersih', status: 'TERSEDIA',
    },
    {
      id: 'misi-nmax',
      make: 'Yamaha', model: 'NMAX 155 Connected', year: 2024,
      category: 'Maxi Scooter', area: 'Stasiun Bandung & Lembang',
      dailyRate: 140000, depositInfo: 'Cukup e-KTP Asli (Tanpa Uang Jaminan Tunai)',
      engineDisplacement: '155 cc VVA Liquid-Cooled', fuelConsumption: '42 km / liter',
      transmission: 'Otomatis (CVT)', trunkCapacity: '24 Liter (Muat 2 Helm)',
      platNomor: 'D 3456 MSN',
      imagePath: '/src/img/nmax.jpg',
      facilities: JSON.stringify(['2 Helm SNI Bersih & Wangi', '2 Jas Hujan Setelan Tebal', 'Phone Holder Stang', 'Suspensi Belakang Sub-Tank', 'STNK Asli Resmi']),
      description: 'Maxi scooter paling nyaman untuk touring liburan jarak jauh di Bandung.',
      bestFor: 'Touring ke Tangkuban Perahu, Kawah Putih Ciwidey, & Pangalengan',
      guidelines: 'Isi bahan bakar Pertamax untuk performa optimal VVA.',
      rating: 4.99, tripsCount: 310, isPopular: 1, unitCondition: 'Favorit Wisatawan', status: 'TERSEDIA',
    },
    {
      id: 'misi-aerox',
      make: 'Yamaha', model: 'Aerox 155 Connected', year: 2024,
      category: 'Maxi Scooter', area: 'Cihampelas & Setiabudi',
      dailyRate: 135000, depositInfo: 'Cukup e-KTP Asli (Tanpa Uang Jaminan Tunai)',
      engineDisplacement: '155 cc VVA Blue Core', fuelConsumption: '43 km / liter',
      transmission: 'Otomatis (CVT)', trunkCapacity: '25 Liter',
      platNomor: 'D 7890 MSN',
      imagePath: '/src/img/aerox.jpg',
      facilities: JSON.stringify(['2 Helm SNI Bersih', '2 Jas Hujan Setelan', 'Phone Holder Stang Kokoh', 'Speedometer Digital Connected', 'STNK Asli Resmi']),
      description: 'Skutik Maxi bernuansa super sport dengan akselerasi responsif dan handling presisi.',
      bestFor: 'Sunmori Lembang - Ciater Subang & keliling kota dengan gaya sporty',
      guidelines: 'Berkendara dengan aman dan patuhi rambu lalu lintas Bandung.',
      rating: 4.97, tripsCount: 125, isPopular: 0, unitCondition: 'Unit Baru 2024', status: 'TERSEDIA',
    },
  ];

  const insertMany = db.transaction(() => {
    for (const bike of seedBikes) {
      insertBike.run(
        bike.id, bike.make, bike.model, bike.year, bike.category, bike.area,
        bike.dailyRate, bike.depositInfo, bike.engineDisplacement, bike.fuelConsumption,
        bike.transmission, bike.trunkCapacity, bike.platNomor, bike.imagePath,
        bike.facilities, bike.description, bike.bestFor, bike.guidelines,
        bike.rating, bike.tripsCount, bike.isPopular, bike.unitCondition, bike.status
      );
    }
  });
  insertMany();

  // Seed a few sample bookings
  const insertBooking = db.prepare(`
    INSERT INTO bookings (bookingCode, customerName, customerPhone, bikeId, bikeName,
      startDate, rentalDays, pickupLocation, pickupAddress, extraHelm,
      dailyRate, totalAmount, paymentStatus, status, notes, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now', ?), datetime('now', ?))
  `);

  const seedBookings = db.transaction(() => {
    insertBooking.run(
      'MSN-0001', 'David Simbolon', '081298765432', 'misi-nmax', 'Yamaha NMAX 155 Connected',
      '2026-09-10', 3, 'Stasiun Bandung', 'Pintu Selatan', 0,
      140000, 420000, 'LUNAS', 'COMPLETED', 'Mahasiswa UNAI, liburan ke Lembang',
      '-3 days', '-3 days'
    );
    insertBooking.run(
      'MSN-0002', 'Abigail Hutapea', '081387654321', 'misi-scoopy', 'Honda Scoopy Prestige',
      '2026-09-12', 2, 'Hotel', 'Hotel Padma Bandung, Ciumbuleuit', 1,
      95000, 190000, 'DP_50', 'CONFIRMED', 'Honeymoon trip, minta helm full-face',
      '-1 days', '-1 days'
    );
    insertBooking.run(
      'MSN-0003', 'Ramos Simanungkalit', '081576543210', 'misi-beat', 'Honda BeAT eSP',
      '2026-09-14', 7, 'Garasi Pasirkaliki', 'Jl. Pasirkaliki No. 88', 0,
      85000, 510000, 'BELUM_BAYAR', 'PENDING', 'Sewa mingguan untuk mobilitas kerja',
      '0 days', '0 days'
    );
  });
  seedBookings();

  console.log('[DB] Seeded 5 bikes and 3 sample bookings');
}

// ──────────────────────────────────────────
// Repository functions
// ──────────────────────────────────────────

// Bikes
export function getAllBikes() {
  return db.prepare('SELECT * FROM bikes ORDER BY dailyRate ASC').all();
}

export function getBikeById(id: string) {
  return db.prepare('SELECT * FROM bikes WHERE id = ?').get(id);
}

export function updateBikeStatus(id: string, status: 'TERSEDIA' | 'DISEWA' | 'SERVIS') {
  return db.prepare('UPDATE bikes SET status = ? WHERE id = ?').run(status, id);
}

// Bookings
export function createBooking(data: {
  bookingCode: string;
  customerName: string;
  customerPhone: string;
  bikeId: string;
  bikeName: string;
  startDate: string;
  rentalDays: number;
  pickupLocation: string;
  pickupAddress: string;
  extraHelm: boolean;
  dailyRate: number;
  totalAmount: number;
  notes: string;
}) {
  const stmt = db.prepare(`
    INSERT INTO bookings (bookingCode, customerName, customerPhone, bikeId, bikeName,
      startDate, rentalDays, pickupLocation, pickupAddress, extraHelm,
      dailyRate, totalAmount, paymentStatus, status, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'BELUM_BAYAR', 'PENDING', ?)
  `);
  return stmt.run(
    data.bookingCode, data.customerName, data.customerPhone,
    data.bikeId, data.bikeName, data.startDate, data.rentalDays,
    data.pickupLocation, data.pickupAddress, data.extraHelm ? 1 : 0,
    data.dailyRate, data.totalAmount, data.notes
  );
}

export function getAllBookings() {
  return db.prepare('SELECT * FROM bookings ORDER BY createdAt DESC').all();
}

export function getBookingsByStatus(status: string) {
  return db.prepare('SELECT * FROM bookings WHERE status = ? ORDER BY createdAt DESC').all(status);
}

export function trackBooking(codeOrPhone: string) {
  return db.prepare(
    'SELECT * FROM bookings WHERE bookingCode = ? OR customerPhone = ? ORDER BY createdAt DESC'
  ).all(codeOrPhone, codeOrPhone);
}

export function updateBookingStatus(id: number, status: string) {
  return db.prepare(
    "UPDATE bookings SET status = ?, updatedAt = datetime('now') WHERE id = ?"
  ).run(status, id);
}

export function updatePaymentStatus(id: number, paymentStatus: string) {
  return db.prepare(
    "UPDATE bookings SET paymentStatus = ?, updatedAt = datetime('now') WHERE id = ?"
  ).run(paymentStatus, id);
}

// Metrics
export function getMetrics() {
  const totalRevenue = db.prepare(
    "SELECT COALESCE(SUM(totalAmount), 0) as total FROM bookings WHERE status IN ('CONFIRMED', 'DELIVERED', 'COMPLETED') AND paymentStatus IN ('LUNAS', 'DP_50')"
  ).get() as { total: number };

  const activeRentals = db.prepare(
    "SELECT COUNT(*) as cnt FROM bookings WHERE status IN ('CONFIRMED', 'DELIVERED')"
  ).get() as { cnt: number };

  const pendingBookings = db.prepare(
    "SELECT COUNT(*) as cnt FROM bookings WHERE status = 'PENDING'"
  ).get() as { cnt: number };

  const totalBikes = db.prepare('SELECT COUNT(*) as cnt FROM bikes').get() as { cnt: number };

  const bikesInUse = db.prepare(
    "SELECT COUNT(*) as cnt FROM bikes WHERE status = 'DISEWA'"
  ).get() as { cnt: number };

  const completedBookings = db.prepare(
    "SELECT COUNT(*) as cnt FROM bookings WHERE status = 'COMPLETED'"
  ).get() as { cnt: number };

  const occupancyRate = totalBikes.cnt > 0
    ? Math.round((bikesInUse.cnt / totalBikes.cnt) * 100)
    : 0;

  return {
    totalRevenue: totalRevenue.total,
    activeRentals: activeRentals.cnt,
    pendingBookings: pendingBookings.cnt,
    totalBikes: totalBikes.cnt,
    bikesInUse: bikesInUse.cnt,
    completedBookings: completedBookings.cnt,
    occupancyRate,
  };
}

// Admin session
export function createAdminSession(token: string) {
  db.prepare('INSERT OR REPLACE INTO admin_sessions (token) VALUES (?)').run(token);
}

export function validateAdminSession(token: string): boolean {
  const row = db.prepare('SELECT token FROM admin_sessions WHERE token = ?').get(token);
  return !!row;
}

export function deleteAdminSession(token: string) {
  db.prepare('DELETE FROM admin_sessions WHERE token = ?').run(token);
}

// Generate booking code
let bookingCounter: number | null = null;
export function generateBookingCode(): string {
  if (bookingCounter === null) {
    const last = db.prepare(
      "SELECT bookingCode FROM bookings ORDER BY id DESC LIMIT 1"
    ).get() as { bookingCode: string } | undefined;
    if (last) {
      const num = parseInt(last.bookingCode.replace('MSN-', ''), 10);
      bookingCounter = isNaN(num) ? 3 : num;
    } else {
      bookingCounter = 0;
    }
  }
  bookingCounter++;
  return `MSN-${String(bookingCounter).padStart(4, '0')}`;
}

// ──────────────────────────────────────────
// Advanced Fleet CRUD
// ──────────────────────────────────────────

export function addBike(bike: {
  id?: string;
  make: string;
  model: string;
  year?: number;
  category?: string;
  area?: string;
  dailyRate: number;
  depositInfo?: string;
  engineDisplacement?: string;
  fuelConsumption?: string;
  transmission?: string;
  trunkCapacity?: string;
  platNomor: string;
  imagePath?: string;
  facilities?: string[];
  description?: string;
  bestFor?: string;
  guidelines?: string;
  status?: string;
}) {
  const id = bike.id || `misi-${bike.model.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Date.now().toString().slice(-4)}`;
  const stmt = db.prepare(`
    INSERT INTO bikes (
      id, make, model, year, category, area, dailyRate, depositInfo,
      engineDisplacement, fuelConsumption, transmission, trunkCapacity,
      platNomor, imagePath, facilities, description, bestFor, guidelines, status
    ) VALUES (
      @id, @make, @model, @year, @category, @area, @dailyRate, @depositInfo,
      @engineDisplacement, @fuelConsumption, @transmission, @trunkCapacity,
      @platNomor, @imagePath, @facilities, @description, @bestFor, @guidelines, @status
    )
  `);

  stmt.run({
    id,
    make: bike.make,
    model: bike.model,
    year: bike.year || 2024,
    category: bike.category || 'Matic Harian',
    area: bike.area || 'Bandung Kota',
    dailyRate: bike.dailyRate || 90000,
    depositInfo: bike.depositInfo || 'Cukup e-KTP Asli (Tanpa Uang Jaminan Tunai)',
    engineDisplacement: bike.engineDisplacement || '125 cc',
    fuelConsumption: bike.fuelConsumption || '50 km/L',
    transmission: bike.transmission || 'Otomatis (CVT)',
    trunkCapacity: bike.trunkCapacity || '15 Liter',
    platNomor: bike.platNomor || 'D 0000 MSN',
    imagePath: bike.imagePath || '/src/img/beat.jpg',
    facilities: JSON.stringify(bike.facilities || [
      '2 Helm SNI Bersih',
      '2 Jas Hujan Setelan',
      'Phone Holder Stang',
      'STNK Asli Resmi'
    ]),
    description: bike.description || '',
    bestFor: bike.bestFor || 'Wisata & harian Bandung',
    guidelines: bike.guidelines || 'Gunakan bahan bakar minimal Pertalite.',
    status: bike.status || 'TERSEDIA',
  });

  return getBikeById(id);
}

export function updateBike(id: string, updates: Partial<{
  make: string;
  model: string;
  year: number;
  category: string;
  area: string;
  dailyRate: number;
  depositInfo: string;
  engineDisplacement: string;
  fuelConsumption: string;
  transmission: string;
  trunkCapacity: string;
  platNomor: string;
  imagePath: string;
  facilities: string[];
  description: string;
  bestFor: string;
  guidelines: string;
  status: string;
  unitCondition: string;
}>) {
  const current = getBikeById(id) as any;
  if (!current) throw new Error('Motor tidak ditemukan');

  const facilitiesStr = updates.facilities
    ? JSON.stringify(updates.facilities)
    : (current && Array.isArray(current.facilities) ? JSON.stringify(current.facilities) : (current?.facilities || '[]'));

  db.prepare(`
    UPDATE bikes SET
      make = COALESCE(@make, make),
      model = COALESCE(@model, model),
      year = COALESCE(@year, year),
      category = COALESCE(@category, category),
      area = COALESCE(@area, area),
      dailyRate = COALESCE(@dailyRate, dailyRate),
      depositInfo = COALESCE(@depositInfo, depositInfo),
      engineDisplacement = COALESCE(@engineDisplacement, engineDisplacement),
      fuelConsumption = COALESCE(@fuelConsumption, fuelConsumption),
      transmission = COALESCE(@transmission, transmission),
      trunkCapacity = COALESCE(@trunkCapacity, trunkCapacity),
      platNomor = COALESCE(@platNomor, platNomor),
      imagePath = COALESCE(@imagePath, imagePath),
      facilities = @facilities,
      description = COALESCE(@description, description),
      bestFor = COALESCE(@bestFor, bestFor),
      guidelines = COALESCE(@guidelines, guidelines),
      status = COALESCE(@status, status),
      unitCondition = COALESCE(@unitCondition, unitCondition)
    WHERE id = @id
  `).run({
    id,
    make: updates.make ?? null,
    model: updates.model ?? null,
    year: updates.year ?? null,
    category: updates.category ?? null,
    area: updates.area ?? null,
    dailyRate: updates.dailyRate ?? null,
    depositInfo: updates.depositInfo ?? null,
    engineDisplacement: updates.engineDisplacement ?? null,
    fuelConsumption: updates.fuelConsumption ?? null,
    transmission: updates.transmission ?? null,
    trunkCapacity: updates.trunkCapacity ?? null,
    platNomor: updates.platNomor ?? null,
    imagePath: updates.imagePath ?? null,
    facilities: facilitiesStr,
    description: updates.description ?? null,
    bestFor: updates.bestFor ?? null,
    guidelines: updates.guidelines ?? null,
    status: updates.status ?? null,
    unitCondition: updates.unitCondition ?? null,
  });

  return getBikeById(id);
}

export function deleteBike(id: string) {
  db.prepare('DELETE FROM bikes WHERE id = ?').run(id);
}

// ──────────────────────────────────────────
// Advanced Analytics Aggregations
// ──────────────────────────────────────────

export function getAnalyticsData() {
  const revenueTrend = db.prepare(`
    SELECT
      substr(createdAt, 1, 10) as date,
      COUNT(*) as count,
      SUM(totalAmount) as totalRevenue,
      SUM(CASE WHEN paymentStatus = 'LUNAS' THEN totalAmount ELSE 0 END) as collectedRevenue
    FROM bookings
    WHERE status != 'CANCELLED'
    GROUP BY substr(createdAt, 1, 10)
    ORDER BY date ASC
    LIMIT 14
  `).all();

  const categoryStats = db.prepare(`
    SELECT
      category,
      COUNT(DISTINCT b.id) as bikeCount,
      COUNT(bk.id) as bookingCount,
      COALESCE(SUM(bk.totalAmount), 0) as totalRevenue
    FROM bikes b
    LEFT JOIN bookings bk ON b.id = bk.bikeId AND bk.status != 'CANCELLED'
    GROUP BY category
  `).all();

  const topBikes = db.prepare(`
    SELECT
      b.id,
      b.make,
      b.model,
      b.platNomor,
      b.dailyRate,
      b.status,
      COUNT(bk.id) as totalBookings,
      COALESCE(SUM(bk.totalAmount), 0) as totalRevenue
    FROM bikes b
    LEFT JOIN bookings bk ON b.id = bk.bikeId AND bk.status != 'CANCELLED'
    GROUP BY b.id
    ORDER BY totalRevenue DESC
  `).all();

  const statusStats = db.prepare(`
    SELECT status, COUNT(*) as count FROM bookings GROUP BY status
  `).all();

  const paymentStats = db.prepare(`
    SELECT paymentStatus, COUNT(*) as count, COALESCE(SUM(totalAmount), 0) as amount
    FROM bookings GROUP BY paymentStatus
  `).all();

  return {
    revenueTrend,
    categoryStats,
    topBikes,
    statusStats,
    paymentStats,
  };
}

// ──────────────────────────────────────────
// Database Explorer & Table Inspector
// ──────────────────────────────────────────

export function getDatabaseStats() {
  const stat = fs.existsSync(DB_PATH) ? fs.statSync(DB_PATH) : null;
  const tables = ['bikes', 'bookings', 'admin_sessions'];
  const tableCounts: Record<string, number> = {};

  for (const t of tables) {
    const res = db.prepare(`SELECT COUNT(*) as count FROM ${t}`).get() as { count: number };
    tableCounts[t] = res.count;
  }

  return {
    dbPath: DB_PATH,
    fileSizeBytes: stat ? stat.size : 0,
    fileSizeFormatted: stat ? `${(stat.size / 1024).toFixed(1)} KB` : '0 KB',
    journalMode: 'WAL',
    tableCounts,
    tables,
  };
}

export function getTableRecords(table: string, limit = 50, offset = 0) {
  const allowed = ['bikes', 'bookings', 'admin_sessions'];
  if (!allowed.includes(table)) throw new Error('Akses tabel tidak diizinkan');

  const total = (db.prepare(`SELECT COUNT(*) as cnt FROM ${table}`).get() as { cnt: number }).cnt;
  const rows = db.prepare(`SELECT * FROM ${table} ORDER BY rowid DESC LIMIT ? OFFSET ?`).all(limit, offset);

  return {
    table,
    total,
    limit,
    offset,
    rows,
  };
}

export function executeSafeSelect(query: string) {
  const trimmed = query.trim();
  const lower = trimmed.toLowerCase();

  if (!lower.startsWith('select')) {
    throw new Error('Hanya query SELECT yang diizinkan pada SQL runner.');
  }

  const forbidden = ['insert', 'update', 'delete', 'drop', 'alter', 'create', 'pragma', 'replace', 'vacuum', 'attach'];
  for (const word of forbidden) {
    const regex = new RegExp(`\\b${word}\\b`, 'i');
    if (regex.test(lower)) {
      throw new Error(`Kata kunci '${word}' tidak diperbolehkan dalam SQL runner.`);
    }
  }

  const rows = db.prepare(trimmed).all();
  return rows;
}

export default db;
