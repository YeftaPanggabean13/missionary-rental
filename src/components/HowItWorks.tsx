import React, { useState } from 'react';
import { Search, CalendarCheck, CheckCircle2, KeyRound, DollarSign, ShieldCheck, ArrowRight, Shield } from 'lucide-react';

interface HowItWorksProps {
  onRentClick: () => void;
  onListClick: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onRentClick, onListClick }) => {
  const [activeAudience, setActiveAudience] = useState<'renter' | 'owner'>('renter');

  return (
    <section className="py-16 bg-white border-b border-gray-200" id="how-it-works">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-gray-200 gap-4">
          <div>
            <div className="text-[12px] font-bold uppercase tracking-wider text-[#A0844B] mb-1">
              Cara Kerja Praktis
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#212121] tracking-tight">
              3 Langkah Mudah Sewa Motor di Bandung
            </h2>
            <p className="text-[14px] text-[#555555] mt-1 max-w-xl">
              Tanpa antre di konter, tanpa syarat uang jaminan tunai jutaan rupiah. Unit motor diantar langsung ke Stasiun Bandung atau hotel Anda.
            </p>
          </div>

          {/* Toggle Audience */}
          <div className="inline-flex bg-[#F0F2F4] p-1 rounded-[4px] border border-gray-200">
            <button
              onClick={() => setActiveAudience('renter')}
              className={`px-4 py-1.5 text-[13px] font-semibold rounded-[3px] transition-colors cursor-pointer ${
                activeAudience === 'renter'
                  ? 'bg-[#212121] text-white'
                  : 'text-[#555555] hover:text-[#212121]'
              }`}
            >
              Untuk Wisatawan (Penyewa)
            </button>
            <button
              onClick={() => setActiveAudience('owner')}
              className={`px-4 py-1.5 text-[13px] font-semibold rounded-[3px] transition-colors cursor-pointer ${
                activeAudience === 'owner'
                  ? 'bg-[#212121] text-white'
                  : 'text-[#555555] hover:text-[#212121]'
              }`}
            >
              Untuk Warga Bandung (Titip Motor)
            </button>
          </div>
        </div>

        {/* Steps Grid */}
        {activeAudience === 'renter' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="p-6 bg-[#F0F2F4] rounded-[4px] border border-gray-200 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#A0844B] block mb-2">
                  Langkah 01
                </span>
                <div className="w-10 h-10 bg-white text-[#212121] rounded-[3px] flex items-center justify-center mb-4 border border-gray-200">
                  <Search className="w-5 h-5 text-[#A0844B]" />
                </div>
                <h3 className="text-[18px] font-bold text-[#212121] mb-2">
                  Pilih Motor & Tentukan Jadwal
                </h3>
                <p className="text-[14px] text-[#555555] leading-relaxed">
                  Pilih motor sesuai selera (matic lincah, maxi nyaman, atau retro Vespa). Tentukan jam tiba di Bandung dan lokasi pengantaran (Stasiun Bandung, Whoosh, atau Hotel).
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-gray-300 text-[12px] text-[#888888]">
                Tarif jelas mulai Rp 95.000/hari, gratis 2 helm & 2 jas hujan setelan.
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-6 bg-[#F0F2F4] rounded-[4px] border border-gray-200 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#A0844B] block mb-2">
                  Langkah 02
                </span>
                <div className="w-10 h-10 bg-white text-[#212121] rounded-[3px] flex items-center justify-center mb-4 border border-gray-200">
                  <CalendarCheck className="w-5 h-5 text-[#A0844B]" />
                </div>
                <h3 className="text-[18px] font-bold text-[#212121] mb-2">
                  Verifikasi Cepat via WhatsApp
                </h3>
                <p className="text-[14px] text-[#555555] leading-relaxed">
                  Kirimkan foto e-KTP, SIM C, dan bukti tiket kereta/hotel ke WhatsApp admin kami. Verifikasi ramah dan cepat selesai dalam waktu kurang dari 15 menit.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-gray-300 text-[12px] text-[#888888]">
                Tanpa deposit jutaan rupiah, cukup e-KTP fisik asli saat serah terima.
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-6 bg-[#F0F2F4] rounded-[4px] border border-gray-200 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#A0844B] block mb-2">
                  Langkah 03
                </span>
                <div className="w-10 h-10 bg-white text-[#212121] rounded-[3px] flex items-center justify-center mb-4 border border-gray-200">
                  <KeyRound className="w-5 h-5 text-[#A0844B]" />
                </div>
                <h3 className="text-[18px] font-bold text-[#212121] mb-2">
                  Serah Terima & Siap Eksplor
                </h3>
                <p className="text-[14px] text-[#555555] leading-relaxed">
                  Crew Misionary mengantarkan motor tepat waktu. Cek kondisi bodi & bensin bersama 3 menit, terima STNK resmi, dan langsung jelajahi Bandung dengan bebas!
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-gray-300 text-[12px] text-[#888888]">
                Bensin awal siap jalan, phone holder stang terpasang untuk Google Maps.
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="p-6 bg-[#F0F2F4] rounded-[4px] border border-gray-200 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#A0844B] block mb-2">
                  Langkah 01
                </span>
                <div className="w-10 h-10 bg-white text-[#212121] rounded-[3px] flex items-center justify-center mb-4 border border-gray-200">
                  <KeyRound className="w-5 h-5 text-[#A0844B]" />
                </div>
                <h3 className="text-[18px] font-bold text-[#212121] mb-2">
                  Daftarkan Motor Anda
                </h3>
                <p className="text-[14px] text-[#555555] leading-relaxed">
                  Punya motor yang jarang terpakai di garasi atau rumah Bandung? Daftarkan tipe motor, tahun pembuatan, dan pelat D Anda tanpa biaya pendaftaran apapun.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-gray-300 text-[12px] text-[#888888]">
                Khusus motor matic, retro, atau adventure tahun 2019 ke atas kondisi terawat.
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-6 bg-[#F0F2F4] rounded-[4px] border border-gray-200 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#A0844B] block mb-2">
                  Langkah 02
                </span>
                <div className="w-10 h-10 bg-white text-[#212121] rounded-[3px] flex items-center justify-center mb-4 border border-gray-200">
                  <ShieldCheck className="w-5 h-5 text-[#A0844B]" />
                </div>
                <h3 className="text-[18px] font-bold text-[#212121] mb-2">
                  Pengecekan Fisik & Standarisasi
                </h3>
                <p className="text-[14px] text-[#555555] leading-relaxed">
                  Tim Misionary mengecek kondisi mesin, rem, dan kelistrikan. Kami merawat dan memasang aksesoris standar sewa (phone holder & helm SNI Misionary).
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-gray-300 text-[12px] text-[#888888]">
                Penyewa diverifikasi ketat (e-KTP & SIM C aktif wajib diserahkan).
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-6 bg-[#F0F2F4] rounded-[4px] border border-gray-200 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#A0844B] block mb-2">
                  Langkah 03
                </span>
                <div className="w-10 h-10 bg-white text-[#212121] rounded-[3px] flex items-center justify-center mb-4 border border-gray-200">
                  <DollarSign className="w-5 h-5 text-[#A0844B]" />
                </div>
                <h3 className="text-[18px] font-bold text-[#212121] mb-2">
                  Terima Bagi Hasil (70% Bersih)
                </h3>
                <p className="text-[14px] text-[#555555] leading-relaxed">
                  Motor menghasilkan pasif income daripada menganggur. Bagi hasil 70% ditransfer langsung ke rekening bank Anda setiap tanggal 1 & 15 setiap bulannya.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-gray-300 text-[12px] text-[#888888]">
                Cuci steam & servis berkala ditangani oleh Misionary.
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          {activeAudience === 'renter' ? (
            <button
              onClick={onRentClick}
              className="bg-[#A0844B] hover:bg-[#8f743f] text-white text-[14px] font-semibold px-6 py-3 rounded-[4px] inline-flex items-center gap-2 cursor-pointer transition-colors"
            >
              Lihat Pilihan Motor Tersedia
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onListClick}
              className="bg-[#A0844B] hover:bg-[#8f743f] text-white text-[14px] font-semibold px-6 py-3 rounded-[4px] inline-flex items-center gap-2 cursor-pointer transition-colors"
            >
              Daftarkan Motor Anda Sekarang
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

