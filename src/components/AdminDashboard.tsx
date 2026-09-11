import React, { useState, useEffect, useCallback } from 'react';
import {
  AdminSidebar,
  AdminNavSection
} from './admin/AdminSidebar';
import { AdminTopbar } from './admin/AdminTopbar';
import { OverviewTab } from './admin/OverviewTab';
import { AnalyticsTab } from './admin/AnalyticsTab';
import { DatabaseExplorerTab } from './admin/DatabaseExplorerTab';
import { ScheduleCalendarTab } from './admin/ScheduleCalendarTab';
import { SettingsTab } from './admin/SettingsTab';
import { ManualBookingModal } from './admin/ManualBookingModal';
import { InvoiceModal } from './admin/InvoiceModal';
import { BikeModal } from './admin/BikeModal';
import {
  Search,
  Filter,
  Download,
  Plus,
  Printer,
  Phone,
  MessageSquare,
  Bike,
  Edit2,
  Trash2,
  CheckCircle2,
  Clock,
  Truck,
  XCircle,
  X
} from 'lucide-react';

interface AdminDashboardProps {
  token: string;
  onLogout: () => void;
}

interface Booking {
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
  updatedAt?: string;
}

interface BikeRecord {
  id: string;
  make: string;
  model: string;
  year?: number;
  category?: string;
  area?: string;
  platNomor: string;
  dailyRate: number;
  status: string;
  engineDisplacement?: string;
  fuelConsumption?: string;
  transmission?: string;
  unitCondition?: string;
}

interface Metrics {
  totalRevenue: number;
  activeRentals: number;
  pendingBookings: number;
  totalBikes: number;
  bikesInUse: number;
  completedBookings: number;
  occupancyRate: number;
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  PENDING: { label: 'Menunggu', color: '#F8E01A' },
  CONFIRMED: { label: 'Dikonfirmasi', color: '#10B981' },
  DELIVERED: { label: 'Motor Diantar', color: '#3B82F6' },
  COMPLETED: { label: 'Selesai', color: '#A0844B' },
  CANCELLED: { label: 'Dibatalkan', color: '#EF4444' },
};

const PAYMENT_LABELS: Record<string, { label: string; color: string }> = {
  BELUM_BAYAR: { label: 'Belum Bayar', color: '#EF4444' },
  DP_50: { label: 'DP 50%', color: '#F59E0B' },
  LUNAS: { label: 'Lunas', color: '#10B981' },
};

const BIKE_STATUS_LABELS: Record<string, { label: string; color: string }> = {
  TERSEDIA: { label: 'Tersedia', color: '#10B981' },
  DISEWA: { label: 'Sedang Disewa', color: '#F8E01A' },
  SERVIS: { label: 'Dalam Servis', color: '#EF4444' },
};

function formatRupiah(n: number): string {
  return 'Rp ' + (n || 0).toLocaleString('id-ID');
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ token, onLogout }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bikes, setBikes] = useState<BikeRecord[]>([]);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);

  // Active navigation section
  const [activeNav, setActiveNav] = useState<AdminNavSection>('overview');

  // Collapsible sidebar state (persisted in localStorage)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(() => {
    return localStorage.getItem('msn_sidebar_collapsed') === 'true';
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Filters & Action states for bookings
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [actionLoading, setActionLoading] = useState<number | string | null>(null);

  // Modals state
  const [isManualBookingOpen, setIsManualBookingOpen] = useState(false);
  const [invoiceBooking, setInvoiceBooking] = useState<Booking | null>(null);
  const [isBikeModalOpen, setIsBikeModalOpen] = useState(false);
  const [editingBike, setEditingBike] = useState<BikeRecord | null>(null);

  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  const handleToggleCollapse = () => {
    setIsSidebarCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem('msn_sidebar_collapsed', String(next));
      return next;
    });
  };

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [bkRes, bikeRes, metricRes] = await Promise.all([
        fetch('/api/admin/bookings', { headers }),
        fetch('/api/bikes'),
        fetch('/api/admin/metrics', { headers }),
      ]);

      if (bkRes.status === 401) {
        onLogout();
        return;
      }

      const bkData = await bkRes.json();
      const bikeData = await bikeRes.json();
      const metricData = await metricRes.json();

      if (bkData.success) setBookings(bkData.data);
      if (bikeData.success) setBikes(bikeData.data);
      if (metricData.success) setMetrics(metricData.data);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const updateStatus = async (bookingId: number, status: string) => {
    setActionLoading(bookingId);
    try {
      await fetch(`/api/admin/bookings/${bookingId}/status`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ status }),
      });
      await fetchAll();
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  const updatePayment = async (bookingId: number, paymentStatus: string) => {
    setActionLoading(bookingId);
    try {
      await fetch(`/api/admin/bookings/${bookingId}/payment`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ paymentStatus }),
      });
      await fetchAll();
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  const updateBikeStatusLocal = async (bikeId: string, status: string) => {
    setActionLoading(bikeId);
    try {
      await fetch(`/api/admin/bikes/${bikeId}/status`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ status }),
      });
      await fetchAll();
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteBike = async (bikeId: string, bikeName: string) => {
    if (!window.confirm(`Apakah Anda yakin ingin menghapus unit ${bikeName} dari armada?`)) return;
    try {
      await fetch(`/api/admin/bikes/${bikeId}`, {
        method: 'DELETE',
        headers,
      });
      await fetchAll();
    } catch (err) {
      console.error(err);
    }
  };

  const handleExportCSV = () => {
    const csvHeaders = ['Kode Booking', 'Nama Penyewa', 'No Telepon', 'Motor', 'Tgl Mulai', 'Durasi (Hari)', 'Total (Rp)', 'Status Bayar', 'Status Pesanan'];
    const rows = filteredBookings.map((b) => [
      b.bookingCode,
      `"${b.customerName.replace(/"/g, '""')}"`,
      b.customerPhone,
      `"${b.bikeName.replace(/"/g, '""')}"`,
      b.startDate,
      b.rentalDays,
      b.totalAmount,
      b.paymentStatus,
      b.status,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [csvHeaders.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `pemesanan_misionary_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = filterStatus === 'ALL' || b.status === filterStatus;
    const matchesSearch =
      searchQuery === '' ||
      b.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.customerPhone.includes(searchQuery) ||
      b.bookingCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.bikeName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0E1017] text-[#D3D8E2] flex font-sans">
      {/* Desktop Collapsible Enterprise Sidebar */}
      <div className="hidden md:flex shrink-0">
        <AdminSidebar
          activeNav={activeNav}
          onNavChange={setActiveNav}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={handleToggleCollapse}
          bookingCount={bookings.length}
          bikeCount={bikes.length}
          onLogout={onLogout}
        />
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-black/80 flex animate-in fade-in duration-200">
          <div className="w-64 bg-[#12151D] h-full flex flex-col shadow-2xl">
            <AdminSidebar
              activeNav={activeNav}
              onNavChange={(nav) => {
                setActiveNav(nav);
                setMobileMenuOpen(false);
              }}
              isCollapsed={false}
              onToggleCollapse={() => setMobileMenuOpen(false)}
              bookingCount={bookings.length}
              bikeCount={bikes.length}
              onLogout={onLogout}
            />
          </div>
          <div className="flex-1 cursor-pointer" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}

      {/* Right Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Enterprise Topbar */}
        <AdminTopbar
          activeNav={activeNav}
          onOpenManualBooking={() => setIsManualBookingOpen(true)}
          onRefresh={fetchAll}
          loading={loading}
          onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
          isSidebarCollapsed={isSidebarCollapsed}
          onToggleSidebarCollapse={handleToggleCollapse}
        />

        {/* Dynamic Main View Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {/* View 1: Executive Overview */}
          {activeNav === 'overview' && (
            <OverviewTab
              metrics={metrics}
              bookings={bookings}
              bikes={bikes}
              onNavigate={setActiveNav}
              onOpenManualBooking={() => setIsManualBookingOpen(true)}
              onOpenInvoice={(b) => setInvoiceBooking(b)}
              onExportCSV={handleExportCSV}
            />
          )}

          {/* View 2: Bookings Management */}
          {activeNav === 'bookings' && (
            <div className="space-y-6">
              {/* Filter, Search & Top Action Bar */}
              <div className="bg-[#181C26] border border-[#262C3D] p-4 rounded-lg flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3 flex-1">
                  {/* Search Input */}
                  <div className="relative flex-1 min-w-[240px]">
                    <Search className="w-3.5 h-3.5 text-[#8E99AD] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Cari nama, HP, kode booking, motor..."
                      className="w-full bg-[#12151E] border border-[#262C3D] text-white text-xs pl-8 pr-3 py-2 rounded focus:outline-none focus:border-[#A0844B]"
                    />
                  </div>

                  {/* Status Filter */}
                  <div className="flex items-center gap-2">
                    <Filter className="w-3.5 h-3.5 text-[#8E99AD]" />
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="bg-[#12151E] border border-[#262C3D] text-white text-xs px-3 py-2 rounded focus:outline-none focus:border-[#A0844B]"
                    >
                      <option value="ALL">Semua Status</option>
                      <option value="PENDING">Menunggu</option>
                      <option value="CONFIRMED">Dikonfirmasi</option>
                      <option value="DELIVERED">Motor Diantar</option>
                      <option value="COMPLETED">Selesai</option>
                      <option value="CANCELLED">Dibatalkan</option>
                    </select>
                  </div>
                </div>

                {/* Action Buttons: Manual Booking & CSV */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleExportCSV}
                    className="bg-[#202534] hover:bg-[#282F42] text-[#D3D8E2] text-xs font-semibold px-3 py-2 rounded border border-[#323B52] flex items-center gap-1.5 cursor-pointer"
                    title="Unduh Data Pemesanan CSV"
                  >
                    <Download className="w-3.5 h-3.5 text-[#A0844B]" />
                    <span>Export CSV</span>
                  </button>

                  <button
                    onClick={() => setIsManualBookingOpen(true)}
                    className="bg-[#A0844B] hover:bg-[#8F7540] text-white text-xs font-bold px-4 py-2 rounded flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Buat Booking Manual</span>
                  </button>
                </div>
              </div>

              {/* Bookings Table */}
              <div className="bg-[#181C26] border border-[#262C3D] rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-[#13161F] text-[#8E99AD] border-b border-[#262C3D]">
                      <tr>
                        <th className="py-3 px-4 font-semibold uppercase text-[10px]">Kode</th>
                        <th className="py-3 px-4 font-semibold uppercase text-[10px]">Penyewa & Kontak</th>
                        <th className="py-3 px-4 font-semibold uppercase text-[10px]">Armada Motor</th>
                        <th className="py-3 px-4 font-semibold uppercase text-[10px]">Durasi & Tanggal</th>
                        <th className="py-3 px-4 font-semibold uppercase text-[10px]">Total Biaya</th>
                        <th className="py-3 px-4 font-semibold uppercase text-[10px]">Pembayaran</th>
                        <th className="py-3 px-4 font-semibold uppercase text-[10px]">Status Pesanan</th>
                        <th className="py-3 px-4 font-semibold uppercase text-[10px] text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#222736]">
                      {filteredBookings.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="py-12 text-center text-xs text-[#8E99AD]">
                            Tidak ada pemesanan yang sesuai dengan kriteria filter.
                          </td>
                        </tr>
                      ) : (
                        filteredBookings.map((b) => {
                          const statusCfg = STATUS_LABELS[b.status] || { label: b.status, color: '#8E99AD' };
                          const payCfg = PAYMENT_LABELS[b.paymentStatus] || { label: b.paymentStatus, color: '#8E99AD' };
                          const waLink = `https://wa.me/62${b.customerPhone.replace(/^0/, '')}?text=Halo%20Kak%20${encodeURIComponent(b.customerName)},%20kami%20dari%20Misionary%20Rental%20Motor%20Bandung...`;

                          return (
                            <tr key={b.id} className="hover:bg-[#1E2330]/60 transition-colors">
                              {/* Kode */}
                              <td className="py-3 px-4">
                                <span className="font-mono font-bold text-[#F8E01A] bg-[#12151E] border border-[#262C3D] px-2 py-0.5 rounded">
                                  {b.bookingCode}
                                </span>
                              </td>

                              {/* Penyewa */}
                              <td className="py-3 px-4">
                                <strong className="text-white block">{b.customerName}</strong>
                                <a
                                  href={waLink}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-[11px] text-[#A0844B] hover:underline flex items-center gap-1 mt-0.5"
                                >
                                  <Phone className="w-3 h-3" />
                                  {b.customerPhone}
                                </a>
                              </td>

                              {/* Motor */}
                              <td className="py-3 px-4">
                                <span className="text-white font-medium block">{b.bikeName}</span>
                                <span className="text-[10px] text-[#8E99AD] truncate block max-w-[160px]">
                                  Antar: {b.pickupAddress || b.pickupLocation}
                                </span>
                              </td>

                              {/* Durasi */}
                              <td className="py-3 px-4">
                                <span className="text-white font-medium block">{b.rentalDays} Hari</span>
                                <span className="text-[10px] text-[#8E99AD] block">Mulai: {b.startDate}</span>
                              </td>

                              {/* Total Biaya */}
                              <td className="py-3 px-4 font-bold text-white">
                                {formatRupiah(b.totalAmount)}
                              </td>

                              {/* Pembayaran Dropdown */}
                              <td className="py-3 px-4">
                                <select
                                  value={b.paymentStatus}
                                  onChange={(e) => updatePayment(b.id, e.target.value)}
                                  disabled={actionLoading === b.id}
                                  style={{ color: payCfg.color }}
                                  className="bg-[#12151E] border border-[#262C3D] text-xs px-2 py-1 rounded focus:outline-none font-bold cursor-pointer"
                                >
                                  <option value="BELUM_BAYAR">Belum Bayar</option>
                                  <option value="DP_50">DP 50%</option>
                                  <option value="LUNAS">Lunas</option>
                                </select>
                              </td>

                              {/* Status Dropdown */}
                              <td className="py-3 px-4">
                                <select
                                  value={b.status}
                                  onChange={(e) => updateStatus(b.id, e.target.value)}
                                  disabled={actionLoading === b.id}
                                  style={{ color: statusCfg.color }}
                                  className="bg-[#12151E] border border-[#262C3D] text-xs px-2 py-1 rounded focus:outline-none font-bold cursor-pointer"
                                >
                                  <option value="PENDING">Menunggu</option>
                                  <option value="CONFIRMED">Dikonfirmasi</option>
                                  <option value="DELIVERED">Motor Diantar</option>
                                  <option value="COMPLETED">Selesai</option>
                                  <option value="CANCELLED">Dibatalkan</option>
                                </select>
                              </td>

                              {/* Actions: Invoice print & WhatsApp */}
                              <td className="py-3 px-4 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  <button
                                    onClick={() => setInvoiceBooking(b)}
                                    className="p-1.5 rounded bg-[#202534] hover:bg-[#2A3144] text-[#8E99AD] hover:text-white transition-colors cursor-pointer"
                                    title="Cetak Struk Resmi"
                                  >
                                    <Printer className="w-3.5 h-3.5 text-[#A0844B]" />
                                  </button>
                                  <a
                                    href={waLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-1.5 rounded bg-[#202534] hover:bg-[#10B981]/20 text-[#8E99AD] hover:text-[#10B981] transition-colors cursor-pointer"
                                    title="WhatsApp Penyewa"
                                  >
                                    <MessageSquare className="w-3.5 h-3.5" />
                                  </a>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* View 3: Fleet Management */}
          {activeNav === 'fleet' && (
            <div className="space-y-6">
              <div className="bg-[#181C26] border border-[#262C3D] p-5 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <Bike className="w-5 h-5 text-[#A0844B]" />
                    Manajemen Armada Sepeda Motor ({bikes.length} Unit)
                  </h2>
                  <p className="text-xs text-[#8E99AD] mt-0.5">
                    Pengawasan pelat nomor resmi D Bandung, tarif sewa harian, dan status kesiapan unit.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingBike(null);
                    setIsBikeModalOpen(true);
                  }}
                  className="bg-[#A0844B] hover:bg-[#8F7540] text-white text-xs font-bold px-4 py-2 rounded flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Armada Baru</span>
                </button>
              </div>

              {/* Fleet Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {bikes.map((bike) => {
                  const statusCfg = BIKE_STATUS_LABELS[bike.status] || { label: bike.status, color: '#8E99AD' };
                  return (
                    <div key={bike.id} className="bg-[#181C26] border border-[#262C3D] rounded-lg p-5 space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] font-semibold text-[#8E99AD] uppercase block">
                            {bike.category || 'Matic Harian'}
                          </span>
                          <h3 className="text-base font-bold text-white">
                            {bike.make} {bike.model}
                          </h3>
                          <span className="text-xs font-mono font-bold text-[#F8E01A] bg-[#12151E] border border-[#262C3D] px-2 py-0.5 rounded mt-1 inline-block">
                            {bike.platNomor}
                          </span>
                        </div>
                        <div className="text-right">
                          <strong className="text-sm font-bold text-[#A0844B] block">
                            {formatRupiah(bike.dailyRate)}
                          </strong>
                          <span className="text-[10px] text-[#8E99AD]">/ hari</span>
                        </div>
                      </div>

                      <div className="text-xs text-[#8E99AD] space-y-1.5 bg-[#12151E] p-3 rounded border border-[#222736]">
                        <div className="flex justify-between">
                          <span>Area Pangkalan:</span>
                          <span className="text-white font-medium">{bike.area || 'Bandung'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Kondisi Unit:</span>
                          <span className="text-emerald-400 font-medium">{bike.unitCondition || 'Prima & Bersih'}</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-[#262C3D] flex items-center justify-between gap-2">
                        {/* Status Selector */}
                        <select
                          value={bike.status}
                          onChange={(e) => updateBikeStatusLocal(bike.id, e.target.value)}
                          disabled={actionLoading === bike.id}
                          style={{ color: statusCfg.color }}
                          className="bg-[#12151E] border border-[#262C3D] text-xs px-2.5 py-1.5 rounded focus:outline-none font-bold cursor-pointer flex-1"
                        >
                          <option value="TERSEDIA">TERSEDIA (Ready)</option>
                          <option value="DISEWA">DISEWA (In Use)</option>
                          <option value="SERVIS">SERVIS (Bengkel)</option>
                        </select>

                        {/* Edit & Delete Buttons */}
                        <button
                          onClick={() => {
                            setEditingBike(bike);
                            setIsBikeModalOpen(true);
                          }}
                          className="p-1.5 rounded bg-[#202534] hover:bg-[#282F42] text-[#8E99AD] hover:text-white cursor-pointer"
                          title="Edit Data Motor"
                        >
                          <Edit2 className="w-3.5 h-3.5 text-[#A0844B]" />
                        </button>
                        <button
                          onClick={() => handleDeleteBike(bike.id, `${bike.make} ${bike.model}`)}
                          className="p-1.5 rounded bg-[#202534] hover:bg-rose-950/40 text-[#8E99AD] hover:text-rose-400 cursor-pointer"
                          title="Hapus Unit"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* View 4: Schedule Calendar */}
          {activeNav === 'schedule' && (
            <ScheduleCalendarTab bikes={bikes} bookings={bookings} />
          )}

          {/* View 5: Analytics */}
          {activeNav === 'analytics' && (
            <AnalyticsTab token={token} />
          )}

          {/* View 6: Database Explorer */}
          {activeNav === 'database' && (
            <DatabaseExplorerTab token={token} />
          )}

          {/* View 7: Settings */}
          {activeNav === 'settings' && (
            <SettingsTab token={token} />
          )}
        </main>
      </div>

      {/* Manual Booking Modal */}
      <ManualBookingModal
        isOpen={isManualBookingOpen}
        onClose={() => setIsManualBookingOpen(false)}
        bikes={bikes}
        token={token}
        onBookingCreated={fetchAll}
      />

      {/* Printable Invoice & Handover Slip Modal */}
      <InvoiceModal
        booking={invoiceBooking}
        onClose={() => setInvoiceBooking(null)}
      />

      {/* Add / Edit Motorcycle Modal */}
      <BikeModal
        isOpen={isBikeModalOpen}
        onClose={() => {
          setIsBikeModalOpen(false);
          setEditingBike(null);
        }}
        bike={editingBike}
        token={token}
        onSaved={fetchAll}
      />
    </div>
  );
};
