import express from 'express';
import cors from 'cors';
import {
  getAllBikes,
  getBikeById,
  updateBikeStatus,
  createBooking,
  getAllBookings,
  trackBooking,
  updateBookingStatus,
  updatePaymentStatus,
  getMetrics,
  generateBookingCode,
  createAdminSession,
  validateAdminSession,
  deleteAdminSession,
  addBike,
  updateBike,
  deleteBike,
  getAnalyticsData,
  getDatabaseStats,
  getTableRecords,
  executeSafeSelect,
} from './db.js';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const PORT = process.env.API_PORT ? parseInt(process.env.API_PORT) : 5001;

// Admin PIN (configurable via env, default for development)
const ADMIN_PIN = process.env.ADMIN_PIN || 'misionary2026';

app.use(cors());
app.use(express.json());

// ──────────────────────────────────────────
// Middleware: Admin auth check
// ──────────────────────────────────────────

function requireAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Akses ditolak. Token admin diperlukan.' });
  }
  const token = authHeader.split(' ')[1];
  if (!validateAdminSession(token)) {
    return res.status(401).json({ error: 'Sesi admin tidak valid atau kedaluwarsa.' });
  }
  next();
}

// ──────────────────────────────────────────
// PUBLIC ROUTES
// ──────────────────────────────────────────

// GET /api/health — API health check
app.get('/api/health', (_req, res) => {
  res.json({ success: true, status: 'online', service: 'Missionary Rental API', timestamp: new Date().toISOString() });
});

// GET /api/bikes — public catalog with availability status
app.get('/api/bikes', (_req, res) => {
  try {
    const bikes = getAllBikes();
    res.json({ success: true, data: bikes });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/bikes/:id
app.get('/api/bikes/:id', (req, res) => {
  try {
    const bike = getBikeById(req.params.id);
    if (!bike) {
      return res.status(404).json({ error: 'Motor tidak ditemukan.' });
    }
    res.json({ success: true, data: bike });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/bookings — create a new booking from customer
app.post('/api/bookings', (req, res) => {
  try {
    const {
      customerName,
      customerPhone,
      bikeId,
      bikeName,
      startDate,
      rentalDays,
      pickupLocation,
      pickupAddress,
      extraHelm,
      dailyRate,
      totalAmount,
      notes,
    } = req.body;

    // Basic validation
    if (!customerName || !customerPhone || !bikeId || !startDate || !rentalDays) {
      return res.status(400).json({
        error: 'Data tidak lengkap. Pastikan nama, nomor HP, motor, tanggal, dan durasi diisi.',
      });
    }

    const bookingCode = generateBookingCode();

    createBooking({
      bookingCode,
      customerName,
      customerPhone: customerPhone.replace(/\D/g, ''),
      bikeId,
      bikeName: bikeName || '',
      startDate,
      rentalDays: parseInt(rentalDays, 10),
      pickupLocation: pickupLocation || 'Stasiun Bandung',
      pickupAddress: pickupAddress || '',
      extraHelm: !!extraHelm,
      dailyRate: parseInt(dailyRate, 10) || 0,
      totalAmount: parseInt(totalAmount, 10) || 0,
      notes: notes || '',
    });

    res.status(201).json({
      success: true,
      bookingCode,
      message: `Pesanan ${bookingCode} berhasil dibuat! Admin Misionary akan segera menghubungi Anda via WhatsApp.`,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/bookings/track/:codeOrPhone — customer tracking
app.get('/api/bookings/track/:codeOrPhone', (req, res) => {
  try {
    const query = req.params.codeOrPhone.trim();
    const bookings = trackBooking(query);
    if (!bookings || (bookings as any[]).length === 0) {
      return res.status(404).json({
        error: 'Pesanan tidak ditemukan. Pastikan kode booking atau nomor WhatsApp benar.',
      });
    }
    res.json({ success: true, data: bookings });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ──────────────────────────────────────────
// ADMIN ROUTES
// ──────────────────────────────────────────

// POST /api/admin/auth & /api/admin/login — login with PIN
app.post(['/api/admin/auth', '/api/admin/login'], (req, res) => {
  try {
    const { pin } = req.body;
    if (pin !== ADMIN_PIN) {
      return res.status(401).json({ error: 'PIN salah. Coba lagi.' });
    }
    const token = uuidv4();
    createAdminSession(token);
    res.json({ success: true, token, message: 'Login berhasil!' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/admin/logout
app.post('/api/admin/logout', requireAdmin, (req, res) => {
  try {
    const token = req.headers.authorization!.split(' ')[1];
    deleteAdminSession(token);
    res.json({ success: true, message: 'Logout berhasil.' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/admin/bookings — all bookings for dashboard
app.get('/api/admin/bookings', requireAdmin, (_req, res) => {
  try {
    const bookings = getAllBookings();
    res.json({ success: true, data: bookings });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/admin/bookings/:id/status — update booking status
app.patch('/api/admin/bookings/:id/status', requireAdmin, (req, res) => {
  try {
    const bookingId = parseInt(req.params.id, 10);
    const { status } = req.body;
    const validStatuses = ['PENDING', 'CONFIRMED', 'DELIVERED', 'COMPLETED', 'CANCELLED'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: `Status tidak valid. Pilih: ${validStatuses.join(', ')}` });
    }
    updateBookingStatus(bookingId, status);
    res.json({ success: true, message: `Status pesanan #${bookingId} diperbarui menjadi ${status}.` });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/admin/bookings/:id/payment — update payment status
app.patch('/api/admin/bookings/:id/payment', requireAdmin, (req, res) => {
  try {
    const bookingId = parseInt(req.params.id, 10);
    const { paymentStatus } = req.body;
    const validPayments = ['BELUM_BAYAR', 'DP_50', 'LUNAS'];
    if (!validPayments.includes(paymentStatus)) {
      return res.status(400).json({ error: `Status pembayaran tidak valid. Pilih: ${validPayments.join(', ')}` });
    }
    updatePaymentStatus(bookingId, paymentStatus);
    res.json({ success: true, message: `Pembayaran pesanan #${bookingId} diperbarui menjadi ${paymentStatus}.` });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/admin/bikes/:id/status — update bike fleet status
app.patch('/api/admin/bikes/:id/status', requireAdmin, (req, res) => {
  try {
    const bikeId = req.params.id;
    const { status } = req.body;
    const validStatuses = ['TERSEDIA', 'DISEWA', 'SERVIS'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: `Status motor tidak valid. Pilih: ${validStatuses.join(', ')}` });
    }
    updateBikeStatus(bikeId, status as any);
    res.json({ success: true, message: `Status motor ${bikeId} diperbarui menjadi ${status}.` });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/admin/metrics — dashboard metrics
app.get('/api/admin/metrics', requireAdmin, (_req, res) => {
  try {
    const metrics = getMetrics();
    res.json({ success: true, data: metrics });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/admin/analytics — visual analytics and aggregations
app.get('/api/admin/analytics', requireAdmin, (_req, res) => {
  try {
    const data = getAnalyticsData();
    res.json({ success: true, data });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/admin/bikes — add new motorcycle to fleet
app.post('/api/admin/bikes', requireAdmin, (req, res) => {
  try {
    const newBike = addBike(req.body);
    res.json({ success: true, data: newBike, message: 'Motor berhasil ditambahkan ke armada.' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/admin/bikes/:id — edit motorcycle details
app.put('/api/admin/bikes/:id', requireAdmin, (req, res) => {
  try {
    const updated = updateBike(req.params.id, req.body);
    res.json({ success: true, data: updated, message: 'Data motor berhasil diperbarui.' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/admin/bikes/:id — delete bike from fleet
app.delete('/api/admin/bikes/:id', requireAdmin, (req, res) => {
  try {
    deleteBike(req.params.id);
    res.json({ success: true, message: 'Motor berhasil dihapus dari armada.' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/admin/bookings/manual — create manual booking by admin
app.post('/api/admin/bookings/manual', requireAdmin, (req, res) => {
  try {
    const code = generateBookingCode();
    const {
      customerName,
      customerPhone,
      bikeId,
      bikeName,
      startDate,
      rentalDays,
      pickupLocation,
      pickupAddress,
      extraHelm,
      dailyRate,
      totalAmount,
      paymentStatus = 'BELUM_BAYAR',
      status = 'CONFIRMED',
      notes = '',
    } = req.body;

    const booking = createBooking({
      bookingCode: code,
      customerName,
      customerPhone,
      bikeId,
      bikeName,
      startDate,
      rentalDays: Number(rentalDays),
      pickupLocation: pickupLocation || 'Garasi Misionary',
      pickupAddress: pickupAddress || 'Ambil di Garasi',
      extraHelm: Boolean(extraHelm),
      dailyRate: Number(dailyRate),
      totalAmount: Number(totalAmount),
      notes,
    });

    const bookingId = Number(booking.lastInsertRowid);

    // Update statuses if specified
    if (status !== 'PENDING') {
      updateBookingStatus(bookingId, status);
    }
    if (paymentStatus !== 'BELUM_BAYAR') {
      updatePaymentStatus(bookingId, paymentStatus);
    }

    res.json({
      success: true,
      data: { ...booking, status, paymentStatus },
      bookingCode: code,
      message: `Pesanan manual #${code} berhasil dicatat.`,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/admin/database/stats — database stats & table row counts
app.get('/api/admin/database/stats', requireAdmin, (_req, res) => {
  try {
    const stats = getDatabaseStats();
    res.json({ success: true, data: stats });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/admin/database/table/:name — raw table records
app.get('/api/admin/database/table/:name', requireAdmin, (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
    const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;
    const records = getTableRecords(req.params.name, limit, offset);
    res.json({ success: true, data: records });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/admin/database/query — safe read-only SQL query runner
app.post('/api/admin/database/query', requireAdmin, (req, res) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ error: 'Query SQL harus diisi.' });
    }
    const rows = executeSafeSelect(query);
    res.json({ success: true, data: rows });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// ──────────────────────────────────────────
// Start server
// ──────────────────────────────────────────

app.listen(PORT, '127.0.0.1', () => {
  console.log(`[Misionary API] Server berjalan di http://localhost:${PORT}`);
  console.log(`[Misionary API] Admin PIN: ${ADMIN_PIN}`);
});
