import React, { useState } from 'react';
import { LayoutDashboard, CheckCircle2, XCircle, Clock, Calendar, MessageSquare, Shield, FileText, Phone, ArrowUpRight } from 'lucide-react';

export const MarketplaceDashboardsPreview: React.FC = () => {
  const [roleView, setRoleView] = useState<'renter' | 'owner'>('renter');
  const [ownerRequestStatus, setOwnerRequestStatus] = useState<'pending' | 'approved' | 'declined'>('pending');
  const [extendRequested, setExtendRequested] = useState(false);

  return (
    <section className="py-16 bg-[#F0F2F4] border-b border-gray-200" id="dashboards">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wider text-[#A0844B] mb-1">
              <LayoutDashboard className="w-4 h-4" />
              Transparansi Layanan Misionary
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#212121] tracking-tight">
              Simulasi Status Sewa & Kemitraan
            </h2>
            <p className="text-[14px] text-[#555555] mt-1 max-w-2xl">
              Lihat bagaimana kemudahan nota sewa digital untuk wisatawan serta transparansi laporan bagi hasil untuk warga Bandung mitra pemilik motor.
            </p>
          </div>

          {/* View toggle switch */}
          <div className="inline-flex bg-white p-1 rounded-[4px] border border-gray-300 shadow-xs self-start md:self-auto">
            <button
              onClick={() => setRoleView('renter')}
              className={`px-4 py-2 text-[13px] font-bold rounded-[3px] transition-colors cursor-pointer flex items-center gap-1.5 ${
                roleView === 'renter'
                  ? 'bg-[#212121] text-white shadow-xs'
                  : 'text-[#555555] hover:text-[#212121]'
              }`}
              id="tab-renter-dashboard"
            >
              Tampilan Penyewa (Wisatawan)
            </button>
            <button
              onClick={() => setRoleView('owner')}
              className={`px-4 py-2 text-[13px] font-bold rounded-[3px] transition-colors cursor-pointer flex items-center gap-1.5 ${
                roleView === 'owner'
                  ? 'bg-[#212121] text-white shadow-xs'
                  : 'text-[#555555] hover:text-[#212121]'
              }`}
              id="tab-owner-dashboard"
            >
              Tampilan Mitra Titip Motor
            </button>
          </div>
        </div>

        {/* Dashboard Mockup Display */}
        <div className="bg-white border border-gray-300 rounded-[6px] shadow-sm overflow-hidden">
          {/* Mockup Top Navigation Bar */}
          <div className="bg-[#212121] text-white px-5 py-3 flex items-center justify-between border-b border-[#333333]">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#A0844B]"></span>
              <span className="text-[13px] font-semibold tracking-wide">
                {roleView === 'renter' ? 'Rizky Ramadhan (Wisatawan Jakarta)' : 'Kang Asep Supriadi (Mitra Dago - Bandung)'}
              </span>
              <span className="bg-[#333333] text-[#B5B5B5] text-[11px] px-2 py-0.5 rounded-[2px]">
                {roleView === 'renter' ? 'Identitas Terverifikasi · e-KTP & SIM C' : 'Mitra Aktif · 2 Unit Terdaftar'}
              </span>
            </div>
            <div className="text-[12px] text-[#B5B5B5] hidden sm:block">
              {roleView === 'renter' ? 'Sistem Booking Misionary Bandung' : 'Portal Kemitraan Misionary'}
            </div>
          </div>

          {/* Role View: RENTER DASHBOARD */}
          {roleView === 'renter' && (
            <div className="p-6 space-y-6">
              {/* Active & Upcoming Rentals */}
              <div className="border border-gray-200 rounded-[4px] p-5 bg-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                    <h4 className="text-[15px] font-bold text-[#212121]">
                      Sewa Berjalan (Sedang Digunakan)
                    </h4>
                  </div>
                  <span className="text-[12px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-[2px]">
                    Unit Diserahkan di Stasiun Bandung
                  </span>
                </div>

                <div className="bg-[#F0F2F4] p-4 rounded-[4px] flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <img
                      src="https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=160&q=80"
                      alt="Yamaha NMAX"
                      className="w-20 h-14 object-cover rounded-[3px]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="text-[13px] space-y-0.5">
                      <div className="flex items-center gap-2">
                        <strong className="text-[#212121] text-[14px]">
                          Yamaha NMAX 155 Connected 2024
                        </strong>
                        <span className="text-[11px] font-mono bg-white border border-gray-300 px-1.5 py-0.2 rounded text-[#212121]">
                          D 4821 MIS
                        </span>
                      </div>
                      <span className="text-[#555555] block">
                        Pengantaran: Stasiun Bandung (Pintu Selatan / Kebon Kawung)
                      </span>
                      <span className="text-[#888888] text-[12px] block">
                        Jadwal: Jumat 09:00 WIB s/d Minggu 18:00 WIB (3 Hari Penuh)
                      </span>
                      <div className="text-[12px] text-[#A0844B] font-semibold pt-0.5">
                        Kelengkapan: 2 Helm SNI Wangi · 2 Jas Hujan Setelan Axio · Phone Holder Stang
                      </div>
                    </div>
                  </div>

                  {/* Actions: Hubungi Admin WA / Perpanjangan */}
                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href="https://wa.me/6281234567890?text=Halo%20Admin%20Misionary,%20saya%20Rizky%20sedang%20sewa%20NMAX%20D4821MIS%20ingin%20tanya%20sesuatu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 bg-white border border-gray-300 text-[#212121] hover:bg-gray-100 text-[12px] font-semibold rounded-[3px] transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-[#A0844B]" />
                      Chat WhatsApp Admin
                    </a>

                    <button
                      onClick={() => setExtendRequested(true)}
                      className={`px-3 py-2 text-[12px] font-semibold rounded-[3px] transition-colors cursor-pointer flex items-center gap-1.5 ${
                        extendRequested
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-[#212121] text-white hover:bg-[#333333]'
                      }`}
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      {extendRequested ? 'Pengajuan +1 Hari Terkirim' : 'Tambah Durasi +1 Hari'}
                    </button>
                  </div>
                </div>

                {/* Pre-auth deposit status reminder */}
                <div className="mt-3 text-[12px] text-[#555555] flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-[#A0844B]" />
                  <span>
                    Jaminan sewa berupa e-KTP fisik asli Anda tersimpan aman di loker kantor Misionary dan diserahkan kembali saat pengembalian unit.
                  </span>
                </div>
              </div>

              {/* Past Rentals History */}
              <div className="border border-gray-200 rounded-[4px] p-4 bg-white">
                <h4 className="text-[15px] font-bold text-[#212121] mb-3">
                  Riwayat Sewa Sebelumnya
                </h4>
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-[4px] text-[13px]">
                  <div>
                    <strong className="text-[#212121]">Honda Scoopy Prestige 2024 (D 3190 MIS)</strong>
                    <div className="text-[#888888] text-[12px]">
                      Area Braga & Dago · Sewa 2 Hari · Selesai 28 Agustus · Biaya Rp 190.000
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-emerald-700 font-semibold block text-[12px]">
                      ✓ e-KTP Dikembalikan Utuh
                    </span>
                    <span className="text-[11px] text-[#888888]">Rating Wisatawan: 5.0★ (Puas)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Role View: OWNER DASHBOARD */}
          {roleView === 'owner' && (
            <div className="p-6 space-y-6">
              {/* Earnings Overview Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-[#F0F2F4] p-4 rounded-[4px] border border-gray-200">
                  <div className="text-[11px] font-bold text-[#888888] uppercase tracking-wider">
                    Bagi Hasil Bersih Anda (Bulan Ini)
                  </div>
                  <div className="text-2xl font-bold text-[#212121] mt-1">
                    Rp 2.450.000
                  </div>
                  <div className="text-[11px] text-emerald-700 font-medium mt-0.5">
                    ✓ 70% bagian pemilik motor (cair tiap tanggal 1 & 15)
                  </div>
                </div>

                <div className="bg-[#F0F2F4] p-4 rounded-[4px] border border-gray-200">
                  <div className="text-[11px] font-bold text-[#888888] uppercase tracking-wider">
                    Alokasi Operasional & Servis (30%)
                  </div>
                  <div className="text-2xl font-bold text-[#555555] mt-1">
                    Rp 1.050.000
                  </div>
                  <div className="text-[11px] text-[#888888] mt-0.5">
                    Termasuk cuci steam, ganti oli rutin & kampas rem
                  </div>
                </div>

                <div className="bg-[#F0F2F4] p-4 rounded-[4px] border border-gray-200">
                  <div className="text-[11px] font-bold text-[#888888] uppercase tracking-wider">
                    Unit Motor Terdaftar
                  </div>
                  <div className="text-2xl font-bold text-[#A0844B] mt-1">
                    2 Motor Aktif
                  </div>
                  <div className="text-[11px] text-[#555555] mt-0.5">
                    Honda Vario 160 (2023) & Yamaha Fazzio (2024)
                  </div>
                </div>
              </div>

              {/* Pending Booking Requests */}
              <div className="border border-gray-200 rounded-[4px] p-5 bg-white">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#F8E01A]"></span>
                    <h4 className="text-[15px] font-bold text-[#212121]">
                      Permintaan Sewa Baru Masuk
                    </h4>
                  </div>
                  <span className="text-[12px] text-[#888888]">
                    Diterima 25 menit lalu · Wisatawan dari Surabaya
                  </span>
                </div>

                <div className="bg-[#F0F2F4] p-4 rounded-[4px] flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1 text-[13px]">
                    <div className="font-bold text-[#212121] text-[14px]">
                      Penyewa mengajukan sewa Honda Vario 160 ABS (D 5291 MIS)
                    </div>
                    <div className="text-[#555555] flex flex-wrap items-center gap-3">
                      <span><strong>Jadwal:</strong> Sabtu - Senin (3 Hari)</span>
                      <span><strong>Titik Serah:</strong> Stasiun KCIC Whoosh Padalarang</span>
                      <span><strong>Tujuan:</strong> Lembang & Perkebunan Teh Ciwidey</span>
                    </div>
                    <div className="text-[12px] text-[#212121] pt-1">
                      Total Sewa: Rp 360.000 · Operasional Misionary (30%): Rp 108.000 · <strong className="text-[#A0844B]">Hak Bersih Pemilik (70%): Rp 252.000</strong>
                    </div>
                  </div>

                  {/* Approve / Decline Controls */}
                  <div className="flex items-center gap-2 shrink-0">
                    {ownerRequestStatus === 'pending' && (
                      <>
                        <button
                          onClick={() => setOwnerRequestStatus('declined')}
                          className="px-3 py-1.5 border border-gray-300 bg-white text-[#555555] hover:text-red-700 text-[12px] font-semibold rounded-[3px] transition-colors cursor-pointer"
                        >
                          Tolak
                        </button>
                        <button
                          onClick={() => setOwnerRequestStatus('approved')}
                          className="px-4 py-1.5 bg-[#A0844B] hover:bg-[#8e743e] text-white text-[12px] font-bold rounded-[3px] transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Setujui Jadwal
                        </button>
                      </>
                    )}

                    {ownerRequestStatus === 'approved' && (
                      <div className="bg-emerald-100 text-emerald-800 text-[12px] font-bold px-3 py-1.5 rounded-[3px] flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                        Jadwal Disetujui! Tim Misionary siap ambil & antar unit.
                      </div>
                    )}

                    {ownerRequestStatus === 'declined' && (
                      <div className="bg-red-50 text-red-700 text-[12px] font-bold px-3 py-1.5 rounded-[3px] flex items-center gap-1.5">
                        <XCircle className="w-4 h-4 text-red-600" />
                        Permintaan Ditolak. Jadwal dikosongkan kembali.
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Listed Bikes Manager */}
              <div className="border border-gray-200 rounded-[4px] p-4 bg-white">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-[15px] font-bold text-[#212121]">
                    Daftar Motor Titipan Anda
                  </h4>
                  <span className="text-[12px] text-[#A0844B] font-semibold">
                    Servis & Cuci Steam Ditanggung Misionary
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-[4px]">
                    <div className="flex items-center gap-3">
                      <img
                        src="https://images.unsplash.com/photo-1558980394-4c7c9299fe96?auto=format&fit=crop&w=120&q=80"
                        alt="Honda Vario"
                        className="w-14 h-10 object-cover rounded-[2px]"
                        referrerPolicy="no-referrer"
                      />
                      <div className="text-[13px]">
                        <strong className="text-[#212121] block">Honda Vario 160 CBS (2023)</strong>
                        <span className="text-[#888888]">Tarif Rp 120.000/hari · Tersewa 14 hari bulan ini · Servis oli berikutnya: 1.200 km lagi</span>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold bg-emerald-100 text-emerald-800 px-2 py-1 rounded-[2px]">
                      Sedang Aktif Tersewa
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-[4px]">
                    <div className="flex items-center gap-3">
                      <img
                        src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=120&q=80"
                        alt="Yamaha Fazzio"
                        className="w-14 h-10 object-cover rounded-[2px]"
                        referrerPolicy="no-referrer"
                      />
                      <div className="text-[13px]">
                        <strong className="text-[#212121] block">Yamaha Fazzio Hybrid (2024)</strong>
                        <span className="text-[#888888]">Tarif Rp 100.000/hari · Siap di garasi kantor · Kondisi kinclong</span>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold bg-gray-100 text-[#555555] px-2 py-1 rounded-[2px]">
                      Standby di Garasi
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

