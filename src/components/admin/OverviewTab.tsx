import React from 'react';
import {
  TrendingUp,
  DollarSign,
  Bike,
  ClipboardList,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  Calendar,
  Database,
  Printer,
  Download,
  Phone,
  Truck
} from 'lucide-react';
import { AdminNavSection } from './AdminSidebar';

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
  platNomor: string;
  dailyRate: number;
  status: string;
  unitCondition?: string;
  area?: string;
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

interface OverviewTabProps {
  metrics: Metrics | null;
  bookings: Booking[];
  bikes: BikeRecord[];
  onNavigate: (nav: AdminNavSection) => void;
  onOpenManualBooking: () => void;
  onOpenInvoice: (booking: Booking) => void;
  onExportCSV: () => void;
}

function formatRupiah(n: number): string {
  return 'Rp ' + (n || 0).toLocaleString('id-ID');
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  metrics,
  bookings,
  bikes,
  onNavigate,
  onOpenManualBooking,
  onOpenInvoice,
  onExportCSV,
}) => {
  const readyBikes = bikes.filter((b) => b.status === 'TERSEDIA').length;
  const inUseBikes = bikes.filter((b) => b.status === 'DISEWA').length;
  const inServiceBikes = bikes.filter((b) => b.status === 'SERVIS').length;

  const recentBookings = bookings.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Official Executive Header Banner */}
      <div className="bg-[#181C26] border border-[#262C3D] p-6 rounded-lg relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="bg-[#A0844B]/20 text-[#A0844B] border border-[#A0844B]/40 px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                Dashboard Operasional
              </span>
              <span className="text-xs text-[#8E99AD]">Sistem Informasi Transportasi Lokal Bandung</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Dashboard Kesiapan Operasional & Pengawasan Sewa
            </h2>
            <p className="text-xs text-[#9DA8BC] max-w-2xl leading-relaxed">
              Memantau pergerakan 5 armada motor berpelat resmi D Bandung, alur transaksi pelanggan, tingkat utilisasi harian, serta kepatuhan standar keselamatan berkendara (2 helm SNI & jas hujan).
            </p>
          </div>

          {/* Quick Action Pills */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={onOpenManualBooking}
              className="bg-[#A0844B] hover:bg-[#8F7540] text-white text-xs font-bold px-3.5 py-2 rounded flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ClipboardList className="w-3.5 h-3.5" />
              <span>Input Sewa Baru</span>
            </button>
            <button
              onClick={onExportCSV}
              className="bg-[#202534] hover:bg-[#282F42] text-[#D3D8E2] border border-[#323B52] text-xs font-semibold px-3 py-2 rounded flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#A0844B]" />
              <span>Unduh Rekap CSV</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Primary High-Impact Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Omset */}
        <div className="bg-[#181C26] border border-[#262C3D] rounded-lg p-5">
          <div className="flex items-center justify-between text-[#8E99AD] mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Omset Masuk</span>
            <div className="w-8 h-8 rounded bg-[#A0844B]/15 text-[#A0844B] flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white">
            {formatRupiah(metrics?.totalRevenue || 0)}
          </div>
          <div className="flex items-center justify-between text-[11px] text-[#8E99AD] mt-2 pt-2 border-t border-[#222736]">
            <span className="text-emerald-400 flex items-center gap-1 font-medium">
              <CheckCircle2 className="w-3 h-3" />
              {metrics?.completedBookings || 0} sewa selesai
            </span>
            <span>Tersimpan di DB</span>
          </div>
        </div>

        {/* Armada Beroperasi */}
        <div className="bg-[#181C26] border border-[#262C3D] rounded-lg p-5">
          <div className="flex items-center justify-between text-[#8E99AD] mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Unit Beroperasi</span>
            <div className="w-8 h-8 rounded bg-blue-500/15 text-blue-400 flex items-center justify-center">
              <Truck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white">
            {metrics?.activeRentals || 0} <span className="text-sm font-normal text-[#8E99AD]">Unit</span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-[#8E99AD] mt-2 pt-2 border-t border-[#222736]">
            <span>Sedang di tangan penyewa</span>
            <span className="text-[#F8E01A] font-semibold">{inUseBikes} unit aktif</span>
          </div>
        </div>

        {/* Antrean Verifikasi */}
        <div className="bg-[#181C26] border border-[#262C3D] rounded-lg p-5">
          <div className="flex items-center justify-between text-[#8E99AD] mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Menunggu Verifikasi</span>
            <div className="w-8 h-8 rounded bg-[#F8E01A]/15 text-[#F8E01A] flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#F8E01A]">
            {metrics?.pendingBookings || 0} <span className="text-sm font-normal text-[#8E99AD]">Pesanan</span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-[#8E99AD] mt-2 pt-2 border-t border-[#222736]">
            <span>Cek KTP & lokasi antar</span>
            <button
              onClick={() => onNavigate('bookings')}
              className="text-[#A0844B] hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              Lihat tabel <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Okupansi Armada */}
        <div className="bg-[#181C26] border border-[#262C3D] rounded-lg p-5">
          <div className="flex items-center justify-between text-[#8E99AD] mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Okupansi Armada</span>
            <div className="w-8 h-8 rounded bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white">
            {metrics?.occupancyRate || 0}%
          </div>
          <div className="flex items-center justify-between text-[11px] text-[#8E99AD] mt-2 pt-2 border-t border-[#222736]">
            <span>Utilisasi kapasitas</span>
            <span className="text-emerald-400 font-medium">{readyBikes} unit ready</span>
          </div>
        </div>
      </div>

      {/* Operational Readiness Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Fleet Status Overview */}
        <div className="lg:col-span-2 bg-[#181C26] border border-[#262C3D] rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Bike className="w-4 h-4 text-[#A0844B]" />
                Kesiapan Armada Motor Bandung ({bikes.length} Unit)
              </h3>
              <p className="text-xs text-[#8E99AD] mt-0.5">
                Status ketersediaan motor operasional untuk serah terima di Stasiun Bandung, Whoosh, & Hotel.
              </p>
            </div>
            <button
              onClick={() => onNavigate('fleet')}
              className="text-xs font-semibold text-[#A0844B] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Kelola Armada</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Status Gauge Pill Matrix */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-[#1E2330] border border-emerald-500/30 rounded p-3 text-center">
              <span className="text-[10px] uppercase font-bold text-emerald-400 block">Siap Jalan</span>
              <span className="text-xl font-black text-white block mt-0.5">{readyBikes}</span>
              <span className="text-[10px] text-[#8E99AD] block">Unit Bersih & Terawat</span>
            </div>
            <div className="bg-[#1E2330] border border-[#F8E01A]/30 rounded p-3 text-center">
              <span className="text-[10px] uppercase font-bold text-[#F8E01A] block">Sedang Disewa</span>
              <span className="text-xl font-black text-white block mt-0.5">{inUseBikes}</span>
              <span className="text-[10px] text-[#8E99AD] block">Di Tangan Pelanggan</span>
            </div>
            <div className="bg-[#1E2330] border border-rose-500/30 rounded p-3 text-center">
              <span className="text-[10px] uppercase font-bold text-rose-400 block">Servis / Bengkel</span>
              <span className="text-xl font-black text-white block mt-0.5">{inServiceBikes}</span>
              <span className="text-[10px] text-[#8E99AD] block">Ganti Oli / Rem</span>
            </div>
          </div>

          {/* Mini Bike Unit List */}
          <div className="space-y-2 pt-2">
            {bikes.map((b) => (
              <div
                key={b.id}
                className="flex items-center justify-between p-2.5 rounded bg-[#13161F] border border-[#222736] text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="font-bold text-white">{b.make} {b.model}</span>
                  <span className="text-[10px] font-mono text-[#F8E01A] bg-[#1E2330] px-1.5 py-0.2 rounded">
                    {b.platNomor}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#8E99AD]">{b.area || 'Bandung'}</span>
                  <strong className="text-white">{formatRupiah(b.dailyRate)}/hari</strong>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Quick Launchpad (Action Hub) */}
        <div className="bg-[#181C26] border border-[#262C3D] rounded-lg p-6 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#F8E01A]" />
              Pintasan Operasional Cepat
            </h3>
            <p className="text-xs text-[#8E99AD] mb-4">
              Aksi langsung untuk penanganan layanan harian rental.
            </p>

            <div className="space-y-2.5">
              <button
                onClick={onOpenManualBooking}
                className="w-full text-left p-3 rounded bg-[#1F2536] hover:bg-[#272F44] border border-[#2D364D] transition-colors cursor-pointer flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <ClipboardList className="w-4 h-4 text-[#A0844B]" />
                  <div>
                    <span className="font-bold text-white block">Input Sewa Walk-In</span>
                    <span className="text-[10px] text-[#8E99AD]">Catat pesanan dari garasi/telepon</span>
                  </div>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#8E99AD]" />
              </button>

              <button
                onClick={() => onNavigate('schedule')}
                className="w-full text-left p-3 rounded bg-[#1F2536] hover:bg-[#272F44] border border-[#2D364D] transition-colors cursor-pointer flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-[#3B82F6]" />
                  <div>
                    <span className="font-bold text-white block">Cek Kalender Jadwal</span>
                    <span className="text-[10px] text-[#8E99AD]">Lihat slot motor 14 hari ke depan</span>
                  </div>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#8E99AD]" />
              </button>

              <button
                onClick={() => onNavigate('database')}
                className="w-full text-left p-3 rounded bg-[#1F2536] hover:bg-[#272F44] border border-[#2D364D] transition-colors cursor-pointer flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <Database className="w-4 h-4 text-emerald-400" />
                  <div>
                    <span className="font-bold text-white block">Buka Database Explorer</span>
                    <span className="text-[10px] text-[#8E99AD]">Inspeksi tabel SQLite lokal</span>
                  </div>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#8E99AD]" />
              </button>

              <button
                onClick={onExportCSV}
                className="w-full text-left p-3 rounded bg-[#1F2536] hover:bg-[#272F44] border border-[#2D364D] transition-colors cursor-pointer flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <Download className="w-4 h-4 text-[#F8E01A]" />
                  <div>
                    <span className="font-bold text-white block">Unduh Rekap Laporan</span>
                    <span className="text-[10px] text-[#8E99AD]">Export file CSV untuk Excel</span>
                  </div>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#8E99AD]" />
              </button>
            </div>
          </div>

          <div className="bg-[#12151E] p-3 rounded border border-[#222736] text-[11px] text-[#8E99AD]">
            🔒 Seluruh data pesanan disimpan terenkripsi di server lokal dengan pencadangan terpusat.
          </div>
        </div>
      </div>

      {/* Recent Bookings Transaction Table */}
      <div className="bg-[#181C26] border border-[#262C3D] rounded-lg overflow-hidden">
        <div className="p-5 border-b border-[#262C3D] flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <ClipboardList className="w-4 h-4 text-[#A0844B]" />
              Pemesanan Terbaru Masuk
            </h3>
            <p className="text-xs text-[#8E99AD] mt-0.5">
              5 transaksi terakhir yang tercatat dalam sistem Misionary.
            </p>
          </div>
          <button
            onClick={() => onNavigate('bookings')}
            className="text-xs font-semibold text-[#A0844B] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Semua Pesanan ({bookings.length})</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-[#13161F] text-[#8E99AD] border-b border-[#262C3D]">
              <tr>
                <th className="py-3 px-4 font-semibold uppercase text-[10px]">No. Booking</th>
                <th className="py-3 px-4 font-semibold uppercase text-[10px]">Penyewa & Kontak</th>
                <th className="py-3 px-4 font-semibold uppercase text-[10px]">Armada</th>
                <th className="py-3 px-4 font-semibold uppercase text-[10px]">Waktu Sewa</th>
                <th className="py-3 px-4 font-semibold uppercase text-[10px]">Biaya</th>
                <th className="py-3 px-4 font-semibold uppercase text-[10px]">Status</th>
                <th className="py-3 px-4 font-semibold uppercase text-[10px] text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#222736]">
              {recentBookings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-xs text-[#8E99AD]">
                    Belum ada pemesanan yang tercatat.
                  </td>
                </tr>
              ) : (
                recentBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-[#1E2330]/60 transition-colors">
                    <td className="py-3 px-4">
                      <span className="font-mono font-bold text-[#F8E01A] bg-[#141720] px-2 py-0.5 rounded">
                        {b.bookingCode}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <strong className="text-white block">{b.customerName}</strong>
                      <span className="text-[10px] text-[#8E99AD]">{b.customerPhone}</span>
                    </td>
                    <td className="py-3 px-4 text-white font-medium">{b.bikeName}</td>
                    <td className="py-3 px-4">
                      <span className="text-white block">{b.startDate}</span>
                      <span className="text-[10px] text-[#8E99AD]">{b.rentalDays} hari sewa</span>
                    </td>
                    <td className="py-3 px-4 font-bold text-white">{formatRupiah(b.totalAmount)}</td>
                    <td className="py-3 px-4">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#141720] text-emerald-400 border border-emerald-500/20">
                        {b.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onOpenInvoice(b)}
                          className="p-1.5 rounded bg-[#202534] hover:bg-[#2A3144] text-[#8E99AD] hover:text-white cursor-pointer"
                          title="Cetak Struk Resmi"
                        >
                          <Printer className="w-3.5 h-3.5 text-[#A0844B]" />
                        </button>
                        <a
                          href={`https://wa.me/62${b.customerPhone.replace(/^0/, '')}?text=Halo%20Kak%20${encodeURIComponent(b.customerName)},%20kami%20dari%20Misionary%20Rental%20Motor%20Bandung...`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded bg-[#202534] hover:bg-[#2A3144] text-[#8E99AD] hover:text-[#25D366] cursor-pointer"
                          title="WhatsApp Penyewa"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
