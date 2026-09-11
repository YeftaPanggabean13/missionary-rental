import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, DollarSign, Camera, ArrowRight, Upload } from 'lucide-react';
import { BikeCategory } from '../types';

interface ListBikeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onListingCreated?: (listingData: any) => void;
}

export const ListBikeModal: React.FC<ListBikeModalProps> = ({ isOpen, onClose, onListingCreated }) => {
  if (!isOpen) return null;

  const [year, setYear] = useState('2023');
  const [make, setMake] = useState('Honda');
  const [model, setModel] = useState('Vario 160 CBS');
  const [plateNumber, setPlateNumber] = useState('D 4521 MIS');
  const [category, setCategory] = useState<BikeCategory>('Matic Harian');
  const [area, setArea] = useState('Dago & Dipatiukur');
  const [dailyRate, setDailyRate] = useState(120000);
  const [ownerName, setOwnerName] = useState('Kang Rian');
  const [ownerPhone, setOwnerPhone] = useState('0812-9876-5432');
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // 70% net payout to owner
  const netDaily = Math.round(dailyRate * 0.70);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (onListingCreated) {
      onListingCreated({
        year,
        make,
        model,
        plateNumber,
        category,
        area,
        dailyRate,
        netDaily,
        ownerName,
        ownerPhone
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="relative bg-white w-full max-w-2xl rounded-[6px] shadow-2xl border border-gray-300 overflow-hidden my-auto">
        {/* Header */}
        <div className="bg-[#212121] text-white px-5 py-4 flex items-center justify-between border-b border-[#333333]">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[#A0844B] font-bold">
              Kemitraan Titip Motor Bandung · Tanpa Biaya Pendaftaran
            </div>
            <h3 className="text-lg font-bold text-white">
              Daftarkan Motor Anda & Dapatkan Pasif Income
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#B5B5B5] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold text-[#212121] mb-2">
                Pendaftaran Kemitraan Berhasil Dikirim!
              </h4>
              <p className="text-[14px] text-[#555555] mb-6 max-w-md mx-auto leading-relaxed">
                Unit <strong>{year} {make} {model}</strong> ({plateNumber}) Anda segera kami verifikasi. Admin Misionary akan menghubungi via WhatsApp <strong>{ownerPhone}</strong> untuk jadwal inspeksi fisik unit di Bandung.
              </p>

              <div className="bg-[#F0F2F4] p-4 rounded-[4px] text-left text-[13px] space-y-1.5 max-w-md mx-auto mb-6">
                <div className="flex justify-between">
                  <span className="text-[#555555]">Nama Mitra:</span>
                  <span className="font-semibold text-[#212121]">{ownerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#555555]">Domisili Bandung:</span>
                  <span className="font-semibold text-[#212121]">{area}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#555555]">Tarif Sewa Harian:</span>
                  <span className="font-semibold text-[#212121]">Rp {dailyRate.toLocaleString('id-ID')}/hari</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#555555]">Bagi Hasil Bersih (70%):</span>
                  <span className="text-emerald-700 font-bold">Rp {netDaily.toLocaleString('id-ID')}/hari tersewa</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="bg-[#A0844B] text-white px-6 py-2.5 rounded-[4px] text-[13px] font-semibold hover:bg-[#8e733e] cursor-pointer"
              >
                Tutup & Selesai
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-[13px] text-[#555555]">
                Punya motor yang jarang terpakai di Bandung? Daripada menganggur di garasi, titipkan ke Misionary. Kami merawat, mencuci, dan menyewakan ke wisatawan terverifikasi dengan sistem bagi hasil 70:30.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#555555] mb-1">
                    Tahun Pembuatan
                  </label>
                  <input
                    type="number"
                    required
                    min="2018"
                    max="2025"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full bg-[#F0F2F4] border border-gray-300 rounded-[3px] px-3 py-2 text-[14px] text-[#212121]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#555555] mb-1">
                    Merk Motor
                  </label>
                  <select
                    value={make}
                    onChange={(e) => setMake(e.target.value)}
                    className="w-full bg-[#F0F2F4] border border-gray-300 rounded-[3px] px-3 py-2 text-[14px] text-[#212121]"
                  >
                    <option value="Honda">Honda</option>
                    <option value="Yamaha">Yamaha</option>
                    <option value="Vespa">Vespa</option>
                    <option value="Suzuki">Suzuki</option>
                    <option value="Kawasaki">Kawasaki</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#555555] mb-1">
                    Tipe / Model
                  </label>
                  <input
                    type="text"
                    required
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    placeholder="Contoh: Scoopy / NMAX"
                    className="w-full bg-[#F0F2F4] border border-gray-300 rounded-[3px] px-3 py-2 text-[14px] text-[#212121]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#555555] mb-1">
                    Kategori Armada
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as BikeCategory)}
                    className="w-full bg-[#F0F2F4] border border-gray-300 rounded-[3px] px-3 py-2 text-[14px] text-[#212121]"
                  >
                    <option value="Matic Harian">Matic Harian</option>
                    <option value="Maxi Scooter">Maxi Scooter</option>
                    <option value="Retro & Estetik">Retro & Estetik</option>
                    <option value="Adventure & Trail">Adventure & Trail</option>
                    <option value="Sport & Heritage">Sport & Heritage</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#555555] mb-1">
                    Nomor Pelat (Bandung)
                  </label>
                  <input
                    type="text"
                    required
                    value={plateNumber}
                    onChange={(e) => setPlateNumber(e.target.value)}
                    placeholder="Contoh: D 1234 ABC"
                    className="w-full bg-[#F0F2F4] border border-gray-300 rounded-[3px] px-3 py-2 text-[14px] text-[#212121]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#555555] mb-1">
                    Area Domisili Bandung
                  </label>
                  <input
                    type="text"
                    required
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="Dago / Buah Batu / Pasteur"
                    className="w-full bg-[#F0F2F4] border border-gray-300 rounded-[3px] px-3 py-2 text-[14px] text-[#212121]"
                  />
                </div>
              </div>

              {/* Price & Payout Box */}
              <div className="bg-[#F0F2F4] border border-gray-300 p-4 rounded-[4px]">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[12px] font-bold text-[#212121]">
                    Rencana Tarif Sewa: Rp {dailyRate.toLocaleString('id-ID')} / hari
                  </label>
                  <span className="text-[12px] text-emerald-800 font-bold">
                    Hak Bersih Anda (70%): Rp {netDaily.toLocaleString('id-ID')} / hari
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
                <span className="text-[11px] text-[#888888] block mt-1">
                  Alokasi 30% Misionary mencakup: ganti oli rutin, cuci steam, kampas rem, operasional antar-jemput stasiun, dan penanganan penyewa.
                </span>
              </div>

              {/* Photo Upload Simulation */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#555555] mb-1">
                  Foto Motor (Tampak Samping Kanan, Kiri & Depan)
                </label>
                <button
                  type="button"
                  onClick={() => setPhotoUploaded(true)}
                  className={`w-full py-4 border-2 border-dashed rounded-[4px] text-center cursor-pointer transition-colors ${
                    photoUploaded
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-800'
                      : 'border-gray-300 bg-gray-50 text-[#555555] hover:bg-gray-100'
                  }`}
                >
                  <Camera className="w-6 h-6 mx-auto mb-1 text-[#A0844B]" />
                  <span className="text-[13px] font-semibold block">
                    {photoUploaded ? '✓ 3 Foto Motor Terlampir' : 'Klik untuk Unggah Foto Motor Anda'}
                  </span>
                  <span className="text-[11px] text-[#888888]">
                    Pastikan kondisi motor bersih dan pelat nomor terlihat jelas
                  </span>
                </button>
              </div>

              {/* Owner Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#555555] mb-1">
                    Nama Lengkap Pemilik
                  </label>
                  <input
                    type="text"
                    required
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    placeholder="Nama Lengkap sesuai KTP"
                    className="w-full bg-[#F0F2F4] border border-gray-300 rounded-[3px] px-3 py-2 text-[13px] text-[#212121]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#555555] mb-1">
                    Nomor WhatsApp Aktif
                  </label>
                  <input
                    type="text"
                    required
                    value={ownerPhone}
                    onChange={(e) => setOwnerPhone(e.target.value)}
                    placeholder="Contoh: 0812-XXXX-XXXX"
                    className="w-full bg-[#F0F2F4] border border-gray-300 rounded-[3px] px-3 py-2 text-[13px] text-[#212121]"
                  />
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full bg-[#A0844B] hover:bg-[#8e743e] text-white font-bold py-3 rounded-[4px] text-[14px] transition-colors cursor-pointer shadow-sm"
                >
                  Kirim Pendaftaran Kemitraan
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

