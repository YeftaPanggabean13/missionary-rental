/**
 * Misionary Rental — In-Browser Hybrid Database & Mock Backend Adapter
 * 
 * Ensures the platform works 100% reliably in static cloud hosting environments
 * like Vercel, Netlify, and GitHub Pages when no persistent Express server is available,
 * while automatically yielding to the real Express API (port 5001) whenever it is reachable.
 */

interface MockBike {
  id: string;
  make: string;
  model: string;
  year: number;
  category: string;
  area: string;
  platNomor: string;
  dailyRate: number;
  status: string;
  engineDisplacement: string;
  fuelConsumption: string;
  transmission: string;
  unitCondition: string;
}

interface MockBooking {
  id: number;
  bookingCode: string;
  customerName: string;
  customerPhone: string;
  bikeId: string;
  bikeName: string;
  startDate: string;
  rentalDays: number;
  pickupLocation: string;
  pickupAddress: string;
  extraHelm: number;
  dailyRate: number;
  totalAmount: number;
  paymentStatus: string;
  status: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEYS = {
  BIKES: 'msn_db_bikes',
  BOOKINGS: 'msn_db_bookings',
  SESSIONS: 'msn_db_sessions',
};

const DEFAULT_BIKES: MockBike[] = [
  {
    id: 'misi-beat',
    make: 'Honda',
    model: 'BeAT eSP',
    year: 2023,
    category: 'Matic Harian',
    area: 'Stasiun Bandung & Pasteur',
    platNomor: 'D 2841 MSN',
    dailyRate: 85000,
    status: 'TERSEDIA',
    engineDisplacement: '110 cc eSP',
    fuelConsumption: '60.6 km/l',
    transmission: 'Otomatis',
    unitCondition: 'Prima & Bersih',
  },
  {
    id: 'misi-scoopy',
    make: 'Honda',
    model: 'Scoopy Prestige',
    year: 2024,
    category: 'Matic Harian',
    area: 'Dago & Braga Heritage',
    platNomor: 'D 4912 MSN',
    dailyRate: 95000,
    status: 'DISEWA',
    engineDisplacement: '110 cc Smart Key',
    fuelConsumption: '59 km/l',
    transmission: 'Otomatis',
    unitCondition: 'Favorit Wisatawan',
  },
  {
    id: 'misi-vario',
    make: 'Honda',
    model: 'Vario 125 CBS ISS',
    year: 2023,
    category: 'Matic Harian',
    area: 'Stasiun Whoosh & Padalarang',
    platNomor: 'D 3381 MSN',
    dailyRate: 110000,
    status: 'TERSEDIA',
    engineDisplacement: '125 cc eSP',
    fuelConsumption: '51.7 km/l',
    transmission: 'Otomatis',
    unitCondition: 'Tanggap & Bertenaga',
  },
  {
    id: 'misi-aerox',
    make: 'Yamaha',
    model: 'Aerox 155 Connected',
    year: 2024,
    category: 'Maxi Scooter',
    area: 'Lembang & Bandung Utara',
    platNomor: 'D 5109 MSN',
    dailyRate: 135000,
    status: 'TERSEDIA',
    engineDisplacement: '155 cc VVA',
    fuelConsumption: '45 km/l',
    transmission: 'Otomatis',
    unitCondition: 'Sporty & Kencang',
  },
  {
    id: 'misi-nmax',
    make: 'Yamaha',
    model: 'NMAX 155 Connected',
    year: 2024,
    category: 'Maxi Scooter',
    area: 'Ciwidey & Garasi Pasirkaliki',
    platNomor: 'D 6042 MSN',
    dailyRate: 140000,
    status: 'TERSEDIA',
    engineDisplacement: '155 cc VVA ABS',
    fuelConsumption: '43 km/l',
    transmission: 'Otomatis',
    unitCondition: 'Mewah & Sangat Nyaman',
  },
];

const DEFAULT_BOOKINGS: MockBooking[] = [
  {
    id: 1,
    bookingCode: 'MSN-0001',
    customerName: 'Andi Pratama',
    customerPhone: '08122334455',
    bikeId: 'misi-scoopy',
    bikeName: 'Honda Scoopy Prestige',
    startDate: '2026-09-11',
    rentalDays: 3,
    pickupLocation: 'Stasiun Bandung (Pintu Utara)',
    pickupAddress: 'Jl. Kebon Kawung No. 43',
    extraHelm: 1,
    dailyRate: 95000,
    totalAmount: 285000,
    paymentStatus: 'LUNAS',
    status: 'DELIVERED',
    notes: 'Tamu dinas pemda Bandung, antar tepat waktu pukul 08:00 WIB',
    createdAt: '2026-09-10 14:20:00',
    updatedAt: '2026-09-11 08:15:00',
  },
  {
    id: 2,
    bookingCode: 'MSN-0002',
    customerName: 'Siti Nurhaliza',
    customerPhone: '08571122334',
    bikeId: 'misi-beat',
    bikeName: 'Honda BeAT eSP',
    startDate: '2026-09-12',
    rentalDays: 2,
    pickupLocation: 'Stasiun Whoosh Padalarang',
    pickupAddress: 'Drop off area Stasiun Kereta Cepat',
    extraHelm: 0,
    dailyRate: 85000,
    totalAmount: 170000,
    paymentStatus: 'DP_50',
    status: 'CONFIRMED',
    notes: 'Tiba dengan Whoosh jam 09.45 WIB',
    createdAt: '2026-09-11 09:10:00',
    updatedAt: '2026-09-11 09:30:00',
  },
  {
    id: 3,
    bookingCode: 'MSN-0003',
    customerName: 'Budi Santoso',
    customerPhone: '08139988776',
    bikeId: 'misi-nmax',
    bikeName: 'Yamaha NMAX 155 Connected',
    startDate: '2026-09-13',
    rentalDays: 4,
    pickupLocation: 'Hotel di Bandung',
    pickupAddress: 'Hotel Savoy Homann, Jl. Asia Afrika',
    extraHelm: 1,
    dailyRate: 140000,
    totalAmount: 560000,
    paymentStatus: 'BELUM_BAYAR',
    status: 'PENDING',
    notes: 'Perjalanan dinas ke Soreang',
    createdAt: '2026-09-11 11:45:00',
    updatedAt: '2026-09-11 11:45:00',
  },
  {
    id: 4,
    bookingCode: 'MSN-0004',
    customerName: 'Rian Hidayat',
    customerPhone: '08215566778',
    bikeId: 'misi-aerox',
    bikeName: 'Yamaha Aerox 155 Connected',
    startDate: '2026-09-08',
    rentalDays: 2,
    pickupLocation: 'Garasi Misionary (Pasirkaliki)',
    pickupAddress: 'Jl. Pasirkaliki No. 88',
    extraHelm: 0,
    dailyRate: 135000,
    totalAmount: 270000,
    paymentStatus: 'LUNAS',
    status: 'COMPLETED',
    notes: 'Unit kembali tepat waktu, kondisi sangat baik',
    createdAt: '2026-09-08 07:00:00',
    updatedAt: '2026-09-10 18:00:00',
  },
  {
    id: 5,
    bookingCode: 'MSN-0005',
    customerName: 'Dinda Permata',
    customerPhone: '08198877665',
    bikeId: 'misi-vario',
    bikeName: 'Honda Vario 125 CBS ISS',
    startDate: '2026-09-10',
    rentalDays: 3,
    pickupLocation: 'Stasiun Bandung (Pintu Selatan)',
    pickupAddress: 'Jl. Stasiun Barat',
    extraHelm: 1,
    dailyRate: 110000,
    totalAmount: 330000,
    paymentStatus: 'LUNAS',
    status: 'DELIVERED',
    notes: 'Wisata belanja & kuliner Riau',
    createdAt: '2026-09-09 16:30:00',
    updatedAt: '2026-09-10 10:00:00',
  },
];

function getBikes(): MockBike[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BIKES);
    if (raw) return JSON.parse(raw);
  } catch {}
  localStorage.setItem(STORAGE_KEYS.BIKES, JSON.stringify(DEFAULT_BIKES));
  return DEFAULT_BIKES;
}

function saveBikes(bikes: MockBike[]): void {
  localStorage.setItem(STORAGE_KEYS.BIKES, JSON.stringify(bikes));
}

function getBookings(): MockBooking[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    if (raw) return JSON.parse(raw);
  } catch {}
  localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(DEFAULT_BOOKINGS));
  return DEFAULT_BOOKINGS;
}

function saveBookings(bookings: MockBooking[]): void {
  localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
}

function calculateMetrics() {
  const bookings = getBookings();
  const bikes = getBikes();

  const totalRevenue = bookings
    .filter((b) => b.paymentStatus === 'LUNAS' || b.paymentStatus === 'DP_50')
    .reduce((sum, b) => sum + (b.paymentStatus === 'DP_50' ? b.totalAmount * 0.5 : b.totalAmount), 0);

  const activeRentals = bookings.filter((b) => b.status === 'DELIVERED' || b.status === 'CONFIRMED').length;
  const pendingBookings = bookings.filter((b) => b.status === 'PENDING').length;
  const completedBookings = bookings.filter((b) => b.status === 'COMPLETED').length;
  const totalBikes = bikes.length;
  const bikesInUse = bikes.filter((b) => b.status === 'DISEWA').length;
  const occupancyRate = totalBikes > 0 ? Math.round((bikesInUse / totalBikes) * 100) : 0;

  return {
    totalRevenue,
    activeRentals,
    pendingBookings,
    totalBikes,
    bikesInUse,
    completedBookings,
    occupancyRate,
  };
}

function makeJsonResponse(data: any, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function handleMockRequest(urlStr: string, init?: RequestInit): Promise<Response> {
  const method = (init?.method || 'GET').toUpperCase();
  const parsedUrl = new URL(urlStr, window.location.origin);
  const pathname = parsedUrl.pathname;
  let body: any = {};

  if (init?.body && typeof init.body === 'string') {
    try {
      body = JSON.parse(init.body);
    } catch {}
  }

  // 1. Auth: /api/admin/auth or /api/admin/login
  if ((pathname === '/api/admin/auth' || pathname === '/api/admin/login') && method === 'POST') {
    const pin = body.pin;
    if (pin === 'misionary2026') {
      const token = 'msn_token_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
      localStorage.setItem('missionary_admin_token', token);
      return makeJsonResponse({ success: true, token, message: 'Login berhasil!' });
    }
    return makeJsonResponse({ error: 'PIN salah. Coba lagi.' }, 401);
  }

  // 2. Logout: /api/admin/logout
  if (pathname === '/api/admin/logout' && method === 'POST') {
    return makeJsonResponse({ success: true, message: 'Logout berhasil.' });
  }

  // 3. Public bikes: /api/bikes
  if (pathname === '/api/bikes' && method === 'GET') {
    return makeJsonResponse({ success: true, data: getBikes() });
  }

  // 4. Metrics: /api/admin/metrics
  if (pathname === '/api/admin/metrics' && method === 'GET') {
    return makeJsonResponse({ success: true, data: calculateMetrics() });
  }

  // 5. Bookings list: /api/admin/bookings
  if (pathname === '/api/admin/bookings' && method === 'GET') {
    return makeJsonResponse({ success: true, data: getBookings() });
  }

  // 6. Manual Booking: /api/admin/bookings/manual
  if (pathname === '/api/admin/bookings/manual' && method === 'POST') {
    const bookings = getBookings();
    const nextId = bookings.length > 0 ? Math.max(...bookings.map((b) => b.id)) + 1 : 1;
    const code = 'MSN-' + String(nextId).padStart(4, '0');
    const newBooking: MockBooking = {
      id: nextId,
      bookingCode: code,
      customerName: body.customerName || 'Tamu Manual',
      customerPhone: (body.customerPhone || '').replace(/\D/g, ''),
      bikeId: body.bikeId || 'misi-beat',
      bikeName: body.bikeName || 'Honda BeAT eSP',
      startDate: body.startDate || new Date().toISOString().split('T')[0],
      rentalDays: parseInt(body.rentalDays, 10) || 1,
      pickupLocation: body.pickupLocation || 'Garasi Misionary (Pasirkaliki)',
      pickupAddress: body.pickupAddress || '',
      extraHelm: body.extraHelm ? 1 : 0,
      dailyRate: parseInt(body.dailyRate, 10) || 85000,
      totalAmount: parseInt(body.totalAmount, 10) || 85000,
      paymentStatus: body.paymentStatus || 'BELUM_BAYAR',
      status: body.status || 'CONFIRMED',
      notes: body.notes || 'Booking manual walk-in',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
      updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
    };
    bookings.unshift(newBooking);
    saveBookings(bookings);

    // If bike status was set to in use
    if (newBooking.status === 'DELIVERED' || newBooking.status === 'CONFIRMED') {
      const bikes = getBikes();
      const targetBike = bikes.find((b) => b.id === newBooking.bikeId);
      if (targetBike) {
        targetBike.status = 'DISEWA';
        saveBikes(bikes);
      }
    }

    return makeJsonResponse({ success: true, booking: newBooking }, 201);
  }

  // 7. Customer Booking creation: /api/bookings
  if (pathname === '/api/bookings' && method === 'POST') {
    const bookings = getBookings();
    const nextId = bookings.length > 0 ? Math.max(...bookings.map((b) => b.id)) + 1 : 1;
    const code = 'MSN-' + String(nextId).padStart(4, '0');
    const newBooking: MockBooking = {
      id: nextId,
      bookingCode: code,
      customerName: body.customerName,
      customerPhone: (body.customerPhone || '').replace(/\D/g, ''),
      bikeId: body.bikeId,
      bikeName: body.bikeName || '',
      startDate: body.startDate,
      rentalDays: parseInt(body.rentalDays, 10) || 1,
      pickupLocation: body.pickupLocation || 'Stasiun Bandung',
      pickupAddress: body.pickupAddress || '',
      extraHelm: body.extraHelm ? 1 : 0,
      dailyRate: parseInt(body.dailyRate, 10) || 85000,
      totalAmount: parseInt(body.totalAmount, 10) || 85000,
      paymentStatus: 'BELUM_BAYAR',
      status: 'PENDING',
      notes: body.notes || '',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
      updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
    };
    bookings.unshift(newBooking);
    saveBookings(bookings);
    return makeJsonResponse({
      success: true,
      bookingCode: code,
      message: `Pesanan ${code} berhasil dibuat!`,
    }, 201);
  }

  // 8. Track booking: /api/bookings/track/:query
  if (pathname.startsWith('/api/bookings/track/') && method === 'GET') {
    const q = decodeURIComponent(pathname.replace('/api/bookings/track/', '')).trim().toLowerCase();
    const cleanDigits = q.replace(/\D/g, '');
    const bookings = getBookings().filter((b) => {
      const codeMatch = b.bookingCode.toLowerCase() === q;
      const phoneMatch = cleanDigits.length >= 4 && b.customerPhone.includes(cleanDigits);
      return codeMatch || phoneMatch;
    });
    if (bookings.length === 0) {
      return makeJsonResponse({ error: 'Pesanan tidak ditemukan. Periksa kode booking atau nomor WhatsApp Anda.' }, 404);
    }
    return makeJsonResponse({ success: true, data: bookings });
  }

  // 9. Update booking status: /api/admin/bookings/:id/status
  const matchBookingStatus = pathname.match(/^\/api\/admin\/bookings\/(\d+)\/status$/);
  if (matchBookingStatus && method === 'PATCH') {
    const id = parseInt(matchBookingStatus[1], 10);
    const bookings = getBookings();
    const found = bookings.find((b) => b.id === id);
    if (found) {
      found.status = body.status;
      found.updatedAt = new Date().toISOString().replace('T', ' ').substring(0, 19);
      saveBookings(bookings);
    }
    return makeJsonResponse({ success: true });
  }

  // 10. Update booking payment: /api/admin/bookings/:id/payment
  const matchBookingPayment = pathname.match(/^\/api\/admin\/bookings\/(\d+)\/payment$/);
  if (matchBookingPayment && method === 'PATCH') {
    const id = parseInt(matchBookingPayment[1], 10);
    const bookings = getBookings();
    const found = bookings.find((b) => b.id === id);
    if (found) {
      found.paymentStatus = body.paymentStatus;
      found.updatedAt = new Date().toISOString().replace('T', ' ').substring(0, 19);
      saveBookings(bookings);
    }
    return makeJsonResponse({ success: true });
  }

  // 11. Update bike status: /api/admin/bikes/:id/status
  const matchBikeStatus = pathname.match(/^\/api\/admin\/bikes\/([^/]+)\/status$/);
  if (matchBikeStatus && method === 'PATCH') {
    const id = matchBikeStatus[1];
    const bikes = getBikes();
    const found = bikes.find((b) => b.id === id);
    if (found) {
      found.status = body.status;
      saveBikes(bikes);
    }
    return makeJsonResponse({ success: true });
  }

  // 12. Add new bike: /api/admin/bikes (POST)
  if (pathname === '/api/admin/bikes' && method === 'POST') {
    const bikes = getBikes();
    const newBike: MockBike = {
      id: body.id || 'bike-' + Date.now(),
      make: body.make || 'Honda',
      model: body.model || 'Model Baru',
      year: parseInt(body.year, 10) || 2024,
      category: body.category || 'Matic Harian',
      area: body.area || 'Bandung',
      platNomor: body.platNomor || 'D 1234 MSN',
      dailyRate: parseInt(body.dailyRate, 10) || 90000,
      status: body.status || 'TERSEDIA',
      engineDisplacement: body.engineDisplacement || '125 cc',
      fuelConsumption: body.fuelConsumption || '50 km/l',
      transmission: body.transmission || 'Otomatis',
      unitCondition: body.unitCondition || 'Prima & Siap Jalan',
    };
    bikes.push(newBike);
    saveBikes(bikes);
    return makeJsonResponse({ success: true, bike: newBike }, 201);
  }

  // 13. Update bike: /api/admin/bikes/:id (PUT)
  const matchBikePut = pathname.match(/^\/api\/admin\/bikes\/([^/]+)$/);
  if (matchBikePut && method === 'PUT') {
    const id = matchBikePut[1];
    const bikes = getBikes();
    const idx = bikes.findIndex((b) => b.id === id);
    if (idx !== -1) {
      bikes[idx] = { ...bikes[idx], ...body, id };
      saveBikes(bikes);
      return makeJsonResponse({ success: true, bike: bikes[idx] });
    }
    return makeJsonResponse({ error: 'Motor tidak ditemukan.' }, 404);
  }

  // 14. Delete bike: /api/admin/bikes/:id (DELETE)
  if (matchBikePut && method === 'DELETE') {
    const id = matchBikePut[1];
    const bikes = getBikes().filter((b) => b.id !== id);
    saveBikes(bikes);
    return makeJsonResponse({ success: true });
  }

  // 15. Analytics: /api/admin/analytics
  if (pathname === '/api/admin/analytics' && method === 'GET') {
    const bookings = getBookings();
    const bikes = getBikes();

    // 7 days trend
    const days: { date: string; displayDate: string; revenue: number; bookingsCount: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const displayDate = d.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric' });
      const dayBookings = bookings.filter((b) => b.startDate === dateStr);
      const dayRev = dayBookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);
      days.push({ date: dateStr, displayDate, revenue: dayRev, bookingsCount: dayBookings.length });
    }

    const bikeUsage: Record<string, { trips: number; revenue: number }> = {};
    bikes.forEach((b) => {
      bikeUsage[b.id] = { trips: 0, revenue: 0 };
    });
    bookings.forEach((b) => {
      if (!bikeUsage[b.bikeId]) bikeUsage[b.bikeId] = { trips: 0, revenue: 0 };
      bikeUsage[b.bikeId].trips += 1;
      bikeUsage[b.bikeId].revenue += b.totalAmount || 0;
    });

    const topBikes = bikes.map((b) => ({
      id: b.id,
      name: `${b.make} ${b.model}`,
      platNomor: b.platNomor,
      category: b.category,
      trips: bikeUsage[b.id]?.trips || 0,
      revenue: bikeUsage[b.id]?.revenue || 0,
    })).sort((a, b) => b.revenue - a.revenue);

    const categoryStats: Record<string, { count: number; totalRevenue: number }> = {};
    bikes.forEach((b) => {
      const cat = b.category || 'Lainnya';
      if (!categoryStats[cat]) categoryStats[cat] = { count: 0, totalRevenue: 0 };
      categoryStats[cat].count += 1;
      categoryStats[cat].totalRevenue += bikeUsage[b.id]?.revenue || 0;
    });

    return makeJsonResponse({
      success: true,
      data: {
        revenueTrend: days,
        topBikes,
        categoryBreakdown: Object.entries(categoryStats).map(([category, stats]) => ({
          category,
          unitCount: stats.count,
          totalRevenue: stats.totalRevenue,
        })),
      },
    });
  }

  // 16. Database Stats: /api/admin/database/stats
  if (pathname === '/api/admin/database/stats' && method === 'GET') {
    const bikes = getBikes();
    const bookings = getBookings();
    return makeJsonResponse({
      success: true,
      data: {
        dbPath: 'In-Browser LocalStorage Database (Cloud Production / Demo Mode)',
        fileSizeBytes: 8192,
        fileSizeFormatted: '8.2 KB (Persisten)',
        journalMode: 'Client-Sync / LocalStorage',
        tables: ['bikes', 'bookings', 'admin_sessions'],
        tableCounts: {
          bikes: bikes.length,
          bookings: bookings.length,
          admin_sessions: 1,
        },
      },
    });
  }

  // 17. Database Table records: /api/admin/database/table/:tableName
  const matchTable = pathname.match(/^\/api\/admin\/database\/table\/([^/]+)$/);
  if (matchTable && method === 'GET') {
    const tbl = matchTable[1];
    let records: any[] = [];
    if (tbl === 'bikes') records = getBikes();
    else if (tbl === 'bookings') records = getBookings();
    else if (tbl === 'admin_sessions') {
      records = [{ token: 'msn_token_active', createdAt: new Date().toISOString(), expiresAt: '2026-12-31' }];
    }
    return makeJsonResponse({ success: true, data: records, total: records.length });
  }

  // 18. Database Query Runner: /api/admin/database/query
  if (pathname === '/api/admin/database/query' && method === 'POST') {
    const sql = (body.query || '').trim().toLowerCase();
    let records: any[] = [];
    if (sql.includes('bikes')) records = getBikes();
    else if (sql.includes('bookings')) records = getBookings();
    else records = [{ status: 'Kueri berhasil diproses di cloud storage', count: getBookings().length }];
    return makeJsonResponse({ success: true, data: records, rowsAffected: records.length });
  }

  // 19. Health: /api/health
  if (pathname === '/api/health') {
    return makeJsonResponse({ success: true, status: 'online (hybrid adapter)', timestamp: new Date().toISOString() });
  }

  return makeJsonResponse({ error: 'Endpoint tidak ditemukan di Cloud Demo Mode.' }, 404);
}

/**
 * Initializes the global fetch interceptor.
 * Attempts network fetch first. If it fails with Network Error or 404/HTML (e.g. Vercel),
 * it routes to the in-browser mock backend transparently.
 */
export function initMockBackend(): void {
  if (typeof window === 'undefined') return;

  const originalFetch = window.fetch.bind(window);

  window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const urlString = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url;

    // Only intercept /api/ requests
    if (urlString.startsWith('/api') || urlString.includes('/api/')) {
      try {
        const response = await originalFetch(input, init);
        // If response is successful or real API error JSON, use it
        const contentType = response.headers.get('content-type') || '';
        if (response.ok || (contentType.includes('application/json') && response.status !== 404)) {
          return response;
        }
        // If Vercel returned 404 or HTML (SPA rewrite), fallback to local mock engine
        return await handleMockRequest(urlString, init);
      } catch {
        // Network error (e.g. server is down or on Vercel without express daemon)
        return await handleMockRequest(urlString, init);
      }
    }

    return originalFetch(input, init);
  };
}
