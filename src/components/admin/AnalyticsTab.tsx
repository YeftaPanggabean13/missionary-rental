import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  DollarSign,
  Calendar,
  Bike,
  CheckCircle2,
  Clock,
  PieChart,
  BarChart3,
  RefreshCw,
  Award
} from 'lucide-react';

interface AnalyticsTabProps {
  token: string;
}

interface AnalyticsData {
  revenueTrend: Array<{
    date: string;
    count: number;
    totalRevenue: number;
    collectedRevenue: number;
  }>;
  categoryStats: Array<{
    category: string;
    bikeCount: number;
    bookingCount: number;
    totalRevenue: number;
  }>;
  topBikes: Array<{
    id: string;
    make: string;
    model: string;
    platNomor: string;
    dailyRate: number;
    status: string;
    totalBookings: number;
    totalRevenue: number;
  }>;
  statusStats: Array<{ status: string; count: number }>;
  paymentStats: Array<{ paymentStatus: string; count: number; amount: number }>;
}

function formatRupiah(num: number): string {
  return 'Rp ' + (num || 0).toLocaleString('id-ID');
}

export const AnalyticsTab: React.FC<AnalyticsTabProps> = ({ token }) => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/analytics', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (json.success) {
        setData(json.data);
      }
    } catch (err) {
      console.error('Error fetching analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex items-center gap-3 text-[#A0844B]">
          <RefreshCw className="w-6 h-6 animate-spin" />
          <span className="text-white text-sm font-medium">Memuat analitik bisnis...</span>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-16 text-[#888888]">
        Gagal memuat data analitik. Silakan coba lagi.
      </div>
    );
  }

  const totalAllRevenue = data.topBikes.reduce((acc, b) => acc + (b.totalRevenue || 0), 0);
  const maxRevenueTrend = Math.max(...data.revenueTrend.map((d) => d.totalRevenue || 0), 100000);

  return (
    <div className="space-y-6">
      {/* Top Banner / Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#212121] border border-[#333333] p-5 rounded-lg">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#A0844B]" />
            Analitik Performa & Pendapatan Rental
          </h2>
          <p className="text-xs text-[#888888] mt-0.5">
            Statistik agregat real-time dari database armada Misionary Rental Motor Bandung.
          </p>
        </div>
        <button
          onClick={fetchAnalytics}
          className="flex items-center gap-2 bg-[#2a2a2a] hover:bg-[#333333] text-[#E0E0E0] text-xs font-semibold px-3 py-2 rounded border border-[#444444] transition-colors cursor-pointer self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#A0844B]" />
          Segarkan Data
        </button>
      </div>

      {/* 4 Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#212121] border border-[#333333] rounded-lg p-5 relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#888888]">
              Total Omset Rental
            </span>
            <div className="w-8 h-8 rounded bg-[#A0844B]/20 text-[#A0844B] flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white">{formatRupiah(totalAllRevenue)}</div>
          <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            Akumulasi transaksi tersimpan
          </p>
        </div>

        <div className="bg-[#212121] border border-[#333333] rounded-lg p-5 relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#888888]">
              Total Armada Aktif
            </span>
            <div className="w-8 h-8 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <Bike className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white">{data.topBikes.length} Unit</div>
          <p className="text-[11px] text-[#888888] mt-1">Siap pakai di Bandung</p>
        </div>

        <div className="bg-[#212121] border border-[#333333] rounded-lg p-5 relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#888888]">
              Model Terlaris
            </span>
            <div className="w-8 h-8 rounded bg-[#F8E01A]/20 text-[#F8E01A] flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-bold text-white truncate">
            {data.topBikes[0] ? `${data.topBikes[0].make} ${data.topBikes[0].model}` : '-'}
          </div>
          <p className="text-[11px] text-[#F8E01A] mt-1">
            {data.topBikes[0] ? `${data.topBikes[0].totalBookings} kali sewa` : ''}
          </p>
        </div>

        <div className="bg-[#212121] border border-[#333333] rounded-lg p-5 relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#888888]">
              Rata-rata Tarif / Hari
            </span>
            <div className="w-8 h-8 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white">
            {formatRupiah(
              Math.round(
                data.topBikes.reduce((acc, b) => acc + b.dailyRate, 0) / (data.topBikes.length || 1)
              )
            )}
          </div>
          <p className="text-[11px] text-[#888888] mt-1">Tarif harian armada</p>
        </div>
      </div>

      {/* Revenue Trend Visual SVG Bar Chart */}
      <div className="bg-[#212121] border border-[#333333] rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#A0844B]" />
              Tren Pendapatan Harian
            </h3>
            <p className="text-xs text-[#888888] mt-0.5">
              Distribusi nominal sewa dari pemesanan yang masuk per tanggal.
            </p>
          </div>
        </div>

        {data.revenueTrend.length === 0 ? (
          <div className="text-center py-10 text-xs text-[#888888]">
            Belum ada transaksi historis yang tercatat untuk grafik tren.
          </div>
        ) : (
          <div className="space-y-3">
            <div className="h-48 flex items-end gap-3 pt-6 pb-2 border-b border-[#333333]">
              {data.revenueTrend.map((item, idx) => {
                const heightPercent = Math.max(12, Math.round((item.totalRevenue / maxRevenueTrend) * 100));
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1 group relative">
                    {/* Tooltip on hover */}
                    <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-[10px] py-1 px-2 rounded pointer-events-none whitespace-nowrap z-10 border border-[#444444]">
                      {item.date}: {formatRupiah(item.totalRevenue)} ({item.count} pesanan)
                    </div>

                    <div className="w-full max-w-[48px] bg-[#2a2a2a] rounded-t-[3px] overflow-hidden flex flex-col justify-end h-36">
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className="w-full bg-gradient-to-t from-[#A0844B] to-[#F8E01A] rounded-t-[3px] transition-all group-hover:brightness-110"
                      />
                    </div>
                    <span className="text-[10px] text-[#888888] truncate w-full text-center mt-1">
                      {item.date.slice(5)}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-between text-[11px] text-[#888888]">
              <span>* Data diupdate otomatis saat pemesanan baru masuk.</span>
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-[2px] bg-gradient-to-r from-[#A0844B] to-[#F8E01A]" />
                Volume Nilai Transaksi
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Row: Top Bikes & Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Motorbikes */}
        <div className="bg-[#212121] border border-[#333333] rounded-lg p-6">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
            <Award className="w-4 h-4 text-[#F8E01A]" />
            Peringkat Armada Terlaris
          </h3>
          <div className="space-y-3">
            {data.topBikes.map((bike, idx) => {
              const share = totalAllRevenue > 0 ? Math.round((bike.totalRevenue / totalAllRevenue) * 100) : 0;
              return (
                <div key={bike.id} className="bg-[#1c1c1c] border border-[#2e2e2e] rounded p-3 text-xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2 font-semibold text-white">
                      <span className="w-5 h-5 rounded-full bg-[#333333] text-[#F8E01A] flex items-center justify-center text-[10px]">
                        {idx + 1}
                      </span>
                      <span>
                        {bike.make} {bike.model}
                      </span>
                      <span className="text-[10px] font-mono text-[#888888] bg-[#2a2a2a] px-1.5 py-0.5 rounded">
                        {bike.platNomor}
                      </span>
                    </div>
                    <span className="font-bold text-[#A0844B]">{formatRupiah(bike.totalRevenue)}</span>
                  </div>
                  <div className="w-full bg-[#2a2a2a] rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-[#A0844B] h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(5, share)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-[#888888] mt-1">
                    <span>{bike.totalBookings} kali disewa</span>
                    <span>Tarif: {formatRupiah(bike.dailyRate)}/hari</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Category Breakdown & Payment Status */}
        <div className="space-y-6">
          {/* Category Distribution */}
          <div className="bg-[#212121] border border-[#333333] rounded-lg p-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <PieChart className="w-4 h-4 text-[#A0844B]" />
              Distribusi Kategori Motor
            </h3>
            <div className="space-y-3">
              {data.categoryStats.map((cat, idx) => (
                <div key={idx} className="bg-[#1c1c1c] border border-[#2e2e2e] rounded p-3">
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="text-white font-semibold">{cat.category}</span>
                    <span className="text-[#A0844B] font-bold">{formatRupiah(cat.totalRevenue)}</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-[#888888]">
                    <span>{cat.bikeCount} Model Motor</span>
                    <span>{cat.bookingCount} Pesanan Tercatat</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Status Ratio */}
          <div className="bg-[#212121] border border-[#333333] rounded-lg p-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Status Pembayaran
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {data.paymentStats.map((ps, idx) => {
                const labelMap: Record<string, { label: string; color: string }> = {
                  LUNAS: { label: 'Lunas', color: 'text-emerald-400 border-emerald-500/30' },
                  DP_50: { label: 'DP 50%', color: 'text-amber-400 border-amber-500/30' },
                  BELUM_BAYAR: { label: 'Belum Bayar', color: 'text-rose-400 border-rose-500/30' },
                };
                const config = labelMap[ps.paymentStatus] || { label: ps.paymentStatus, color: 'text-white border-gray-500/30' };
                return (
                  <div key={idx} className={`bg-[#1c1c1c] border rounded p-3 text-center ${config.color.split(' ')[1]}`}>
                    <span className={`text-xs font-bold block ${config.color.split(' ')[0]}`}>{config.label}</span>
                    <span className="text-lg font-black text-white block mt-1">{ps.count}</span>
                    <span className="text-[10px] text-[#888888] block">{formatRupiah(ps.amount)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
