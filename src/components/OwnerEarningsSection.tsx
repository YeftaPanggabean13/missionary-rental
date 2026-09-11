import React, { useState } from 'react';
import { DollarSign, Shield, Clock, Sliders, CheckCircle2, ArrowRight, Wrench, HandCoins } from 'lucide-react';

interface OwnerEarningsSectionProps {
  onOpenListModal: () => void;
}

export const OwnerEarningsSection: React.FC<OwnerEarningsSectionProps> = ({ onOpenListModal }) => {
  const [dailyRate, setDailyRate] = useState<number>(100000);
  const [daysPerMonth, setDaysPerMonth] = useState<number>(12);
  const [selectedBikeType, setSelectedBikeType] = useState<string>('Matic Harian (Scoopy/Fazzio)');

  // Localized profit sharing: 70% owner net, 30% Misionary (covers maintenance, regular wash, oil change, marketing)
  const grossMonthly = dailyRate * daysPerMonth;
  const operationalFee = Math.round(grossMonthly * 0.30);
  const netMonthlyPayout = grossMonthly - operationalFee;
  const estimatedAnnualNet = netMonthlyPayout * 12;

  const handleBikePreset = (presetType: string, rate: number, days: number) => {
    setSelectedBikeType(presetType);
    setDailyRate(rate);
    setDaysPerMonth(days);
  };

  return (
    <section className="py-16 bg-[#212121] text-white border-b border-[#333333]" id="earnings">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Straightforward Brand Copy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#2d2d2d] border border-[#444444] px-3 py-1 rounded-[3px] text-[12px] uppercase tracking-wider text-[#A0844B] font-semibold">
              Kemitraan Titip Motor Misionary Bandung
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
              Punya Motor Jarang Dipakai? Dapatkan Pasif Income Tiap Bulan
            </h2>

            <p className="text-[16px] text-[#E0E0E0] leading-relaxed">
              Daripada motor menganggur di kos atau rumah dan berdebu, titipkan armada Anda di Misionary Bandung. Motor terawat, dicuci bersih, diservis berkala, dan menghasilkan uang sewa bulanan langsung ke rekening Anda.
            </p>

            {/* Direct owner guarantees */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3">
                <div className="p-1 bg-[#A0844B]/20 text-[#A0844B] rounded-[3px] mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-[#A0844B]" />
                </div>
                <div>
                  <strong className="text-white text-[14px] block font-semibold">
                    Perawatan Rutin & Servis Berkala Terjamin
                  </strong>
                  <span className="text-[13px] text-[#B5B5B5]">
                    Misionary bertanggung jawab atas cuci rutin, penggantian oli berkala, serta pengecekan kelayakan jalan setiap unit.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1 bg-[#A0844B]/20 text-[#A0844B] rounded-[3px] mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-[#A0844B]" />
                </div>
                <div>
                  <strong className="text-white text-[14px] block font-semibold">
                    Verifikasi Identitas Penyewa Ketat
                  </strong>
                  <span className="text-[13px] text-[#B5B5B5]">
                    Setiap penyewa wajib menahan e-KTP asli, SIM C aktif, dan tiket kedatangan/voucher hotel. Motor aman dan terpantau.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1 bg-[#A0844B]/20 text-[#A0844B] rounded-[3px] mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-[#A0844B]" />
                </div>
                <div>
                  <strong className="text-white text-[14px] block font-semibold">
                    Laporan Transparan & Pencairan Tepat Waktu
                  </strong>
                  <span className="text-[13px] text-[#B5B5B5]">
                    Rekapitulasi tanggal sewa tercatat rapi. Pembagian hasil bulanan ditransfer tepat waktu setiap awal bulan.
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenListModal}
                className="bg-[#A0844B] hover:bg-[#8f743f] text-white text-[14px] font-semibold px-6 py-3.5 rounded-[4px] transition-colors inline-flex items-center gap-2 cursor-pointer shadow-md"
                id="earnings-list-cta"
              >
                Daftarkan Motor Anda Sekarang
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Net Earnings Calculator */}
          <div className="lg:col-span-6 bg-white text-[#212121] rounded-[6px] p-6 sm:p-8 shadow-xl border border-gray-200">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-6">
              <div>
                <h3 className="text-[18px] font-bold text-[#212121]">
                  Simulasi Bagi Hasil Bulanan
                </h3>
                <p className="text-[13px] text-[#555555]">
                  Estimasi pendapatan bersih pemilik unit motor (70% pemilik / 30% operasional Misionary).
                </p>
              </div>
            </div>

            {/* Quick preset selector */}
            <div className="mb-6">
              <label className="block text-[12px] font-semibold text-[#555555] uppercase tracking-wider mb-2">
                Pilih Tipe Motor Anda:
              </label>
              <div className="grid grid-cols-3 gap-2 text-[12px]">
                <button
                  type="button"
                  onClick={() => handleBikePreset('Matic Harian (Scoopy/Fazzio)', 95000, 15)}
                  className={`py-2 px-2 text-center rounded-[3px] border cursor-pointer ${
                    selectedBikeType === 'Matic Harian (Scoopy/Fazzio)'
                      ? 'bg-[#212121] text-white border-[#212121]'
                      : 'bg-[#F0F2F4] text-[#555555] border-gray-300 hover:bg-gray-200'
                  }`}
                >
                  Matic Harian
                  <span className="block text-[11px] opacity-80">Rp 95.000/hari</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleBikePreset('Maxi Scooter (NMAX/PCX)', 140000, 14)}
                  className={`py-2 px-2 text-center rounded-[3px] border cursor-pointer ${
                    selectedBikeType === 'Maxi Scooter (NMAX/PCX)'
                      ? 'bg-[#212121] text-white border-[#212121]'
                      : 'bg-[#F0F2F4] text-[#555555] border-gray-300 hover:bg-gray-200'
                  }`}
                >
                  Maxi Scooter
                  <span className="block text-[11px] opacity-80">Rp 140.000/hari</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleBikePreset('Retro Vespa / Trail', 240000, 10)}
                  className={`py-2 px-2 text-center rounded-[3px] border cursor-pointer ${
                    selectedBikeType === 'Retro Vespa / Trail'
                      ? 'bg-[#212121] text-white border-[#212121]'
                      : 'bg-[#F0F2F4] text-[#555555] border-gray-300 hover:bg-gray-200'
                  }`}
                >
                  Vespa / Trail
                  <span className="block text-[11px] opacity-80">Rp 240.000/hari</span>
                </button>
              </div>
            </div>

            {/* Slider 1: Daily Rental Rate in IDR */}
            <div className="space-y-2 mb-6">
              <div className="flex justify-between items-baseline">
                <span className="text-[13px] font-semibold text-[#555555]">
                  Tarif Sewa Harian Motor:
                </span>
                <span className="text-xl font-bold text-[#212121]">
                  Rp {dailyRate.toLocaleString('id-ID')} <span className="text-sm font-normal text-[#888888]">/ hari</span>
                </span>
              </div>
              <input
                type="range"
                min="80000"
                max="260000"
                step="5000"
                value={dailyRate}
                onChange={(e) => setDailyRate(Number(e.target.value))}
                className="w-full accent-[#A0844B] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#888888]">
                <span>Rp 80.000 (Matic)</span>
                <span>Rp 140.000 (Maxi)</span>
                <span>Rp 260.000 (Vespa)</span>
              </div>
            </div>

            {/* Slider 2: Days Rented Per Month */}
            <div className="space-y-2 mb-8">
              <div className="flex justify-between items-baseline">
                <span className="text-[13px] font-semibold text-[#555555]">
                  Hari Tersewa per Bulan:
                </span>
                <span className="text-xl font-bold text-[#212121]">
                  {daysPerMonth} <span className="text-sm font-normal text-[#888888]">hari / bulan</span>
                </span>
              </div>
              <input
                type="range"
                min="4"
                max="24"
                step="1"
                value={daysPerMonth}
                onChange={(e) => setDaysPerMonth(Number(e.target.value))}
                className="w-full accent-[#A0844B] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#888888]">
                <span>4 hari (Weekend saja)</span>
                <span>12 hari (Rata-rata)</span>
                <span>20+ hari (Musim Liburan)</span>
              </div>
            </div>

            {/* Net Payout Box */}
            <div className="bg-[#F0F2F4] border border-gray-300 rounded-[4px] p-4 mb-6 space-y-2 text-[13px]">
              <div className="flex justify-between text-[#555555]">
                <span>Estimasi Omzet Kotor Bulanan:</span>
                <span className="font-semibold text-[#212121]">Rp {grossMonthly.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-[#555555]">
                <span>Biaya Operasional & Servis (30%):</span>
                <span className="text-rose-700 font-medium">-Rp {operationalFee.toLocaleString('id-ID')} (termasuk cuci & ganti oli)</span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-gray-300">
                <span className="text-[15px] font-bold text-[#212121]">
                  Penghasilan Bersih Pemilik Motor:
                </span>
                <span className="text-2xl font-bold text-[#A0844B]">
                  Rp {netMonthlyPayout.toLocaleString('id-ID')}
                </span>
              </div>
              <div className="text-[11px] text-[#888888] pt-1">
                Estimasi Pasif Income 1 Tahun: <strong className="text-[#212121]">Rp {estimatedAnnualNet.toLocaleString('id-ID')} / tahun</strong>
              </div>
            </div>

            <button
              onClick={onOpenListModal}
              className="w-full bg-[#212121] hover:bg-[#333333] text-white font-semibold text-[14px] py-3 rounded-[4px] transition-colors cursor-pointer"
            >
              Ajukan Titip Motor (Konsultasi Gratis)
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

