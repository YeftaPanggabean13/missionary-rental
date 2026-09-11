import React, { useState } from 'react';
import { X, PlusCircle, Calendar, User, Phone, MapPin, DollarSign, Bike } from 'lucide-react';

interface BikeOption {
  id: string;
  make: string;
  model: string;
  dailyRate: number;
  platNomor: string;
}

interface ManualBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  bikes: BikeOption[];
  token: string;
  onBookingCreated: () => void;
}

export const ManualBookingModal: React.FC<ManualBookingModalProps> = ({
  isOpen,
  onClose,
  bikes,
  token,
  onBookingCreated,
}) => {
  const [bikeId, setBikeId] = useState(bikes[0]?.id || '');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
  const [rentalDays, setRentalDays] = useState(1);
  const [pickupLocation, setPickupLocation] = useState('Stasiun Bandung Hall');
  const [pickupAddress, setPickupAddress] = useState('');
  const [extraHelm, setExtraHelm] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState('LUNAS');
  const [status, setStatus] = useState('CONFIRMED');
  const [notes, setNotes] = useState('Pemesanan manual langsung via Admin/Garasi');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const selectedBike = bikes.find((b) => b.id === bikeId) || bikes[0];
  const rate = selectedBike?.dailyRate || 85000;
  const totalAmount = rate * rentalDays + extraHelm * 15000;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) {
      setError('Nama dan nomor telepon pelanggan wajib diisi.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/bookings/manual', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerName,
          customerPhone,
          bikeId: selectedBike.id,
          bikeName: `${selectedBike.make} ${selectedBike.model}`,
          startDate,
          rentalDays,
          pickupLocation,
          pickupAddress: pickupAddress || pickupLocation,
          extraHelm,
          dailyRate: rate,
          totalAmount,
          paymentStatus,
          status,
          notes,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Gagal membuat pemesanan manual.');
        return;
      }

      onBookingCreated();
      onClose();
    } catch {
      setError('Koneksi ke server gagal.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#212121] border border-[#333333] rounded-lg max-w-lg w-full p-6 my-auto max-h-[90vh] overflow-y-auto space-y-4 shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#333333] pb-3">
          <div>
            <span className="text-[11px] font-bold text-[#A0844B] uppercase tracking-wider block">
              Operasional Admin
            </span>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-[#F8E01A]" />
              Input Pemesanan Manual / Walk-in
            </h3>
          </div>
          <button onClick={onClose} className="text-[#888888] hover:text-white p-1 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="bg-red-950/40 border border-red-800 text-red-300 text-xs p-3 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Motorbike Selection */}
          <div>
            <label className="block text-[#B5B5B5] font-semibold mb-1 flex items-center gap-1.5">
              <Bike className="w-3.5 h-3.5 text-[#A0844B]" />
              Pilih Armada Motor
            </label>
            <select
              value={bikeId}
              onChange={(e) => setBikeId(e.target.value)}
              className="w-full bg-[#181818] border border-[#333333] text-white rounded p-2.5 focus:outline-none focus:border-[#A0844B]"
            >
              {bikes.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.make} {b.model} ({b.platNomor}) — Rp {b.dailyRate.toLocaleString('id-ID')}/hari
                </option>
              ))}
            </select>
          </div>

          {/* Customer Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[#B5B5B5] font-semibold mb-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#A0844B]" />
                Nama Penyewa
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Contoh: Budi Gunawan"
                className="w-full bg-[#181818] border border-[#333333] text-white rounded p-2.5 focus:outline-none focus:border-[#A0844B]"
              />
            </div>
            <div>
              <label className="block text-[#B5B5B5] font-semibold mb-1 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#A0844B]" />
                No. WhatsApp
              </label>
              <input
                type="text"
                required
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="081234567890"
                className="w-full bg-[#181818] border border-[#333333] text-white rounded p-2.5 focus:outline-none focus:border-[#A0844B]"
              />
            </div>
          </div>

          {/* Start Date & Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[#B5B5B5] font-semibold mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#A0844B]" />
                Tanggal Mulai Sewa
              </label>
              <input
                type="date"
                required
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-[#181818] border border-[#333333] text-white rounded p-2.5 focus:outline-none focus:border-[#A0844B]"
              />
            </div>
            <div>
              <label className="block text-[#B5B5B5] font-semibold mb-1">
                Durasi Sewa (Hari)
              </label>
              <input
                type="number"
                min="1"
                max="30"
                value={rentalDays}
                onChange={(e) => setRentalDays(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full bg-[#181818] border border-[#333333] text-white rounded p-2.5 focus:outline-none focus:border-[#A0844B]"
              />
            </div>
          </div>

          {/* Pickup Location & Address */}
          <div>
            <label className="block text-[#B5B5B5] font-semibold mb-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#A0844B]" />
              Titik & Alamat Pengantaran
            </label>
            <select
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="w-full bg-[#181818] border border-[#333333] text-white rounded p-2 mb-2 focus:outline-none focus:border-[#A0844B]"
            >
              <option value="Garasi Misionary (Ambil Sendiri)">Garasi Misionary (Ambil Sendiri)</option>
              <option value="Stasiun Bandung Hall (Pintu Utara / Selatan)">Stasiun Bandung Hall</option>
              <option value="Stasiun Whoosh Padalarang">Stasiun Whoosh Padalarang</option>
              <option value="Hotel / Penginapan Area Bandung">Hotel / Penginapan Area Bandung</option>
            </select>
            <input
              type="text"
              value={pickupAddress}
              onChange={(e) => setPickupAddress(e.target.value)}
              placeholder="Detail alamat pengantaran atau nomor kamar..."
              className="w-full bg-[#181818] border border-[#333333] text-white rounded p-2 focus:outline-none focus:border-[#A0844B]"
            />
          </div>

          {/* Status & Payment Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[#B5B5B5] font-semibold mb-1">Status Pembayaran</label>
              <select
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value)}
                className="w-full bg-[#181818] border border-[#333333] text-white rounded p-2 focus:outline-none focus:border-[#A0844B]"
              >
                <option value="LUNAS">Lunas</option>
                <option value="DP_50">DP 50%</option>
                <option value="BELUM_BAYAR">Belum Bayar</option>
              </select>
            </div>
            <div>
              <label className="block text-[#B5B5B5] font-semibold mb-1">Status Pesanan</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-[#181818] border border-[#333333] text-white rounded p-2 focus:outline-none focus:border-[#A0844B]"
              >
                <option value="CONFIRMED">Dikonfirmasi (Siap Antar)</option>
                <option value="DELIVERED">Motor Sudah Diserahkan</option>
                <option value="PENDING">Menunggu</option>
              </select>
            </div>
          </div>

          {/* Total Calculation Card */}
          <div className="bg-[#181818] border border-[#333333] p-3 rounded flex items-center justify-between">
            <div>
              <span className="text-[11px] text-[#888888] block">Perhitungan Biaya Sewa:</span>
              <span className="text-white font-medium">
                {rentalDays} hari × Rp {rate.toLocaleString('id-ID')}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[11px] text-[#888888] block">Total Transaksi:</span>
              <strong className="text-base text-[#F8E01A] font-bold">
                Rp {totalAmount.toLocaleString('id-ID')}
              </strong>
            </div>
          </div>

          {/* Submit Actions */}
          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-[#2a2a2a] hover:bg-[#333333] text-[#B5B5B5] px-4 py-2 rounded font-semibold cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#A0844B] hover:bg-[#8f743f] text-white px-5 py-2 rounded font-bold cursor-pointer transition-colors shadow-xs"
            >
              {loading ? 'Menyimpan...' : 'Simpan Pemesanan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
