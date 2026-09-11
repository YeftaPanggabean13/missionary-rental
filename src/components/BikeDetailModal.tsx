import React, { useState } from 'react';
import { Motorbike } from '../types';
import { X, Star, ShieldCheck, MapPin, Calendar, Check, AlertCircle, CheckCircle2, ChevronRight, Upload, Info, MessageCircle, Phone } from 'lucide-react';

interface BikeDetailModalProps {
  bike: Motorbike | null;
  onClose: () => void;
  onRequestSubmitted: (bookingSummary: any) => void;
}

export const BikeDetailModal: React.FC<BikeDetailModalProps> = ({ bike, onClose, onRequestSubmitted }) => {
  if (!bike) return null;

  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [rentalDays, setRentalDays] = useState(2);
  const [pickupOption, setPickupOption] = useState<'stasiun' | 'whoosh' | 'hotel' | 'garasi'>('stasiun');
  const [extraHelm, setExtraHelm] = useState(false);
  const [riderName, setRiderName] = useState('Wisatawan Bandung');
  const [riderPhone, setRiderPhone] = useState('081234567890');
  const [startDate, setStartDate] = useState('Besok, 09.00 WIB');
  const [pickupAddress, setPickupAddress] = useState('Stasiun Bandung Pintu Selatan');
  const [ktpUploaded, setKtpUploaded] = useState(false);
  const [step, setStep] = useState<'form' | 'success'>('form');

  // Pricing calculations in IDR
  const baseRental = bike.dailyRate * rentalDays;
  const discountRate = rentalDays >= 7 ? 0.15 : rentalDays >= 3 ? 0.05 : 0;
  const discountAmount = Math.round(baseRental * discountRate);

  const deliveryFees = {
    garasi: 0,
    stasiun: 0, // Free dropoff to Stasiun Bandung
    whoosh: 35000, // Stasiun Whoosh Padalarang / Tegalluar
    hotel: 20000 // Hotel / Villa
  };
  const deliveryCost = deliveryFees[pickupOption];
  const extraHelmCost = extraHelm ? 15000 * rentalDays : 0;
  const totalChargedNow = baseRental - discountAmount + deliveryCost + extraHelmCost;

  const getPickupName = () => {
    switch (pickupOption) {
      case 'stasiun': return 'Stasiun Bandung (Pintu Utama/Selatan) - Gratis';
      case 'whoosh': return 'Stasiun KCIC Whoosh (Padalarang/Tegalluar) - Rp 35.000';
      case 'hotel': return 'Hotel / Villa di Bandung - Rp 20.000';
      case 'garasi': return 'Ambil Sendiri di Garasi Misionary - Gratis';
    }
  };

  const handleSendWhatsApp = (code?: string) => {
    const activeCode = code || bookingCode;
    const codeLine = activeCode ? `• Kode Booking: ${activeCode}\n` : '';
    const waText = encodeURIComponent(
      `Halo Admin Misionary Rental Motor Bandung,\n\n` +
      `Saya ingin konfirmasi pemesanan sewa motor:\n` +
      codeLine +
      `• Unit: ${bike.make} ${bike.model} (${bike.year})\n` +
      `• Durasi: ${rentalDays} Hari (${startDate})\n` +
      `• Titik Penyerahan: ${getPickupName()}\n` +
      `• Alamat/Lokasi: ${pickupAddress}\n` +
      `• Total Biaya: Rp ${totalChargedNow.toLocaleString('id-ID')}\n` +
      `• Nama Penyewa: ${riderName}\n` +
      `• No. Kontak: ${riderPhone}\n\n` +
      `Mohon dicek ketersediaan unitnya. Terima kasih!`
    );
    window.open(`https://wa.me/6281234567890?text=${waText}`, '_blank');
  };

  const [bookingCode, setBookingCode] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    let receivedCode = '';
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: riderName,
          customerPhone: riderPhone,
          bikeId: bike.id,
          bikeName: `${bike.make} ${bike.model}`,
          startDate: startDate,
          rentalDays,
          pickupLocation: getPickupName(),
          pickupAddress,
          extraHelm,
          dailyRate: bike.dailyRate,
          totalAmount: totalChargedNow,
          notes: '',
        }),
      });
      const data = await res.json();
      if (data.success && data.bookingCode) {
        receivedCode = data.bookingCode;
        setBookingCode(data.bookingCode);
      }
    } catch {
      // Fallback — still show success UI even if API unreachable
    }

    setStep('success');
    onRequestSubmitted({
      bike,
      rentalDays,
      totalChargedNow,
      riderName,
      riderPhone,
      pickupOption: getPickupName(),
      pickupAddress
    });
    setSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 lg:p-6 animate-in fade-in duration-200">
      <div className="relative bg-white w-full max-w-4xl rounded-[6px] shadow-2xl border border-gray-300 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-[#212121] text-white px-5 py-3.5 flex items-center justify-between border-b border-[#333333]">
          <div className="flex items-center gap-3">
            <img
              src="/img/missionary-horizontal-white.png"
              alt="Misionary"
              className="h-5 sm:h-6 w-auto object-contain"
            />
            <span className="text-[11px] uppercase tracking-wider bg-[#A0844B] text-white px-2 py-0.5 rounded-[2px] font-semibold">
              Rental Bandung
            </span>
            <span className="text-[13px] text-[#B5B5B5] hidden sm:inline">
              {bike.year} {bike.make} {bike.model}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#B5B5B5] hover:text-white transition-colors cursor-pointer rounded"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Scrollable */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-6">
          {step === 'success' ? (
            <div className="text-center py-8 max-w-lg mx-auto">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-[#212121] mb-2">
                Pemesanan Berhasil Dicatat!
              </h3>
              <p className="text-[14px] text-[#555555] mb-5 leading-relaxed">
                Unit <strong>{bike.year} {bike.make} {bike.model}</strong> telah dijadwalkan. Silakan konfirmasi cepat via WhatsApp untuk koordinasi penyerahan motor dan serah terima kunci.
              </p>

              {bookingCode && (
                <div className="bg-[#A0844B]/10 border border-[#A0844B]/30 rounded-[6px] p-4 mb-5 text-center">
                  <span className="text-[11px] text-[#8C6D37] font-bold uppercase tracking-wider block mb-1">
                    Kode Pelacakan Pesanan Anda
                  </span>
                  <div className="text-2xl font-mono font-black text-[#212121] tracking-widest selection:bg-[#A0844B] selection:text-white">
                    {bookingCode}
                  </div>
                  <p className="text-[12px] text-[#666666] mt-1.5">
                    Gunakan kode ini di menu <strong>Cek Pesanan</strong> di navigasi atas untuk memantau status pesanan dan unit motor Anda.
                  </p>
                </div>
              )}

              <div className="bg-[#F0F2F4] border border-gray-200 rounded-[4px] p-4 text-left text-[13px] space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-[#555555]">Motor:</span>
                  <strong className="text-[#212121]">{bike.year} {bike.make} {bike.model}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#555555]">Durasi Sewa:</span>
                  <span className="text-[#212121]">{rentalDays} Hari ({startDate})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#555555]">Lokasi Serah Terima:</span>
                  <span className="text-[#212121] font-medium">{pickupAddress}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#555555]">Nama Penyewa:</span>
                  <span className="text-[#212121]">{riderName} ({riderPhone})</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-300">
                  <span className="text-[#555555] font-bold">Total Biaya Sewa:</span>
                  <strong className="text-xl text-[#212121]">Rp {totalChargedNow.toLocaleString('id-ID')}</strong>
                </div>
                <div className="text-[11px] text-emerald-700">
                  {bike.depositInfo}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <button
                  onClick={() => handleSendWhatsApp()}
                  className="bg-[#25D366] hover:bg-[#20bd5a] text-white text-[14px] font-bold px-6 py-2.5 rounded-[4px] flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  Kirim Rincian ke WhatsApp Admin
                </button>
                <button
                  onClick={onClose}
                  className="bg-[#212121] text-white text-[13px] font-semibold px-5 py-2.5 rounded-[4px] hover:bg-[#333333] cursor-pointer"
                >
                  Kembali ke Katalog
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Photos & Details (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                {/* Main Photo Gallery */}
                <div className="space-y-2">
                  <div className="relative h-64 sm:h-80 rounded-[4px] overflow-hidden bg-gray-900 border border-gray-200">
                    <img
                      src={bike.images[activePhotoIndex] || bike.images[0]}
                      alt={`${bike.make} ${bike.model}`}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-3 left-3 bg-black/75 text-white text-[12px] px-2.5 py-1 rounded-[3px] flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#F8E01A]" />
                      <span>{bike.area}</span>
                    </div>
                  </div>

                  {/* Thumbnail Row */}
                  {bike.images.length > 1 && (
                    <div className="flex gap-2">
                      {bike.images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActivePhotoIndex(idx)}
                          className={`w-20 h-14 rounded-[3px] overflow-hidden border-2 cursor-pointer ${
                            activePhotoIndex === idx ? 'border-[#A0844B]' : 'border-transparent opacity-70 hover:opacity-100'
                          }`}
                        >
                          <img src={img} alt="Thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bike Description */}
                <div>
                  <h4 className="text-[15px] font-bold text-[#212121] mb-2 uppercase tracking-wide">
                    Tentang Motor Ini
                  </h4>
                  <p className="text-[14px] text-[#555555] leading-relaxed mb-4">
                    {bike.description}
                  </p>
                  <div className="bg-[#F0F2F4] p-3.5 rounded-[4px] text-[13px] text-[#555555]">
                    <strong className="text-[#212121] block mb-1">Rekomendasi Pemakaian:</strong>
                    {bike.bestFor}
                  </div>
                </div>

                {/* Technical Specifications Table */}
                <div>
                  <h4 className="text-[15px] font-bold text-[#212121] mb-3 uppercase tracking-wide">
                    Spesifikasi Motor
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-[12px]">
                    <div className="bg-gray-50 border border-gray-200 p-2.5 rounded-[3px]">
                      <span className="text-[#888888] block text-[11px]">Kapasitas Mesin</span>
                      <strong className="text-[#212121] text-[13px]">{bike.engineDisplacement}</strong>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 p-2.5 rounded-[3px]">
                      <span className="text-[#888888] block text-[11px]">Konsumsi Bensin</span>
                      <strong className="text-[#212121] text-[13px]">{bike.fuelConsumption}</strong>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 p-2.5 rounded-[3px]">
                      <span className="text-[#888888] block text-[11px]">Transmisi</span>
                      <strong className="text-[#212121] text-[13px]">{bike.transmission}</strong>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 p-2.5 rounded-[3px]">
                      <span className="text-[#888888] block text-[11px]">Kapasitas Bagasi</span>
                      <strong className="text-[#212121] text-[13px]">{bike.trunkCapacity}</strong>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 p-2.5 rounded-[3px]">
                      <span className="text-[#888888] block text-[11px]">Kondisi Unit</span>
                      <strong className="text-[#212121] text-[13px]">{bike.unitCondition}</strong>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 p-2.5 rounded-[3px]">
                      <span className="text-[#888888] block text-[11px]">Kategori</span>
                      <strong className="text-[#212121] text-[13px]">{bike.category}</strong>
                    </div>
                  </div>
                </div>

                {/* Included Facilities */}
                <div>
                  <h4 className="text-[15px] font-bold text-[#212121] mb-2 uppercase tracking-wide">
                    Fasilitas Sewa Lengkap (Sudah Termasuk)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[13px] text-[#555555]">
                    {bike.facilities.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#A0844B] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Jaminan & Panduan Sewa */}
                <div className="border border-gray-200 rounded-[4px] p-4 bg-white space-y-2 text-[13px]">
                  <div className="flex items-center gap-2 font-bold text-[#212121]">
                    <ShieldCheck className="w-4 h-4 text-[#A0844B]" />
                    <span>Ketentuan & Jaminan Sewa Misionary</span>
                  </div>
                  <p className="text-[#555555] leading-relaxed">
                    {bike.depositInfo}. Cukup tunjukkan KTP Asli dan SIM C saat serah terima unit di Bandung. Motor sudah dilengkapi STNK asli resmi berpelat D Bandung dan bensin awal.
                  </p>
                </div>
              </div>

              {/* Right Column: Pricing Breakdown & Checkout Form (5 cols) */}
              <div className="lg:col-span-5 bg-[#F0F2F4] border border-gray-200 rounded-[4px] p-5 flex flex-col justify-between">
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <div className="flex items-baseline justify-between mb-1">
                      <span className="text-2xl font-bold text-[#212121]">
                        Rp {bike.dailyRate.toLocaleString('id-ID')}
                      </span>
                      <span className="text-[13px] text-[#888888]">/ hari</span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[12px] text-emerald-800 font-medium">
                      <Check className="w-3.5 h-3.5 text-emerald-700" />
                      Free 2 Helm SNI + 2 Jas Hujan + Phone Holder
                    </span>
                  </div>

                  {/* Trip Duration Selector */}
                  <div className="border-t border-gray-300 pt-3">
                    <label className="block text-[12px] font-semibold text-[#555555] uppercase tracking-wider mb-1.5">
                      Pilih Durasi Sewa
                    </label>
                    <div className="grid grid-cols-4 gap-1.5 text-center text-[12px]">
                      {[1, 2, 3, 7].map((d) => (
                        <button
                          type="button"
                          key={d}
                          onClick={() => setRentalDays(d)}
                          className={`py-2 px-1 rounded-[3px] font-semibold border transition-colors cursor-pointer ${
                            rentalDays === d
                              ? 'bg-[#212121] text-white border-[#212121]'
                              : 'bg-white text-[#555555] border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          {d} {d === 1 ? 'Hari' : 'Hari'}
                          {d >= 7 ? ' (Diskon 15%)' : d >= 3 ? ' (Diskon 5%)' : ''}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Pickup or Delivery Option */}
                  <div>
                    <label className="block text-[12px] font-semibold text-[#555555] uppercase tracking-wider mb-1.5">
                      Lokasi Serah Terima Motor
                    </label>
                    <div className="space-y-1.5 text-[12px]">
                      <label className="flex items-center justify-between p-2 rounded-[3px] bg-white border border-gray-300 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="pickup"
                            checked={pickupOption === 'stasiun'}
                            onChange={() => {
                              setPickupOption('stasiun');
                              setPickupAddress('Stasiun Bandung (Pintu Utama/Selatan)');
                            }}
                            className="text-[#A0844B]"
                          />
                          <div>
                            <span className="font-semibold text-[#212121]">Stasiun Bandung (Hall/Selatan)</span>
                            <span className="text-[11px] text-[#888888] block">Gratis antar ke stasiun</span>
                          </div>
                        </div>
                        <span className="font-semibold text-emerald-700">Gratis</span>
                      </label>

                      <label className="flex items-center justify-between p-2 rounded-[3px] bg-white border border-gray-300 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="pickup"
                            checked={pickupOption === 'hotel'}
                            onChange={() => {
                              setPickupOption('hotel');
                              setPickupAddress('Hotel / Villa di Bandung');
                            }}
                            className="text-[#A0844B]"
                          />
                          <div>
                            <span className="font-semibold text-[#212121]">Hotel / Villa di Bandung</span>
                            <span className="text-[11px] text-[#888888] block">Diantar langsung ke lobi penginapan</span>
                          </div>
                        </div>
                        <span className="font-semibold text-[#212121]">+Rp 20.000</span>
                      </label>

                      <label className="flex items-center justify-between p-2 rounded-[3px] bg-white border border-gray-300 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="pickup"
                            checked={pickupOption === 'whoosh'}
                            onChange={() => {
                              setPickupOption('whoosh');
                              setPickupAddress('Stasiun Whoosh Padalarang / Tegalluar');
                            }}
                            className="text-[#A0844B]"
                          />
                          <div>
                            <span className="font-semibold text-[#212121]">Stasiun KCIC Whoosh</span>
                            <span className="text-[11px] text-[#888888] block">Padalarang atau Tegalluar</span>
                          </div>
                        </div>
                        <span className="font-semibold text-[#212121]">+Rp 35.000</span>
                      </label>
                    </div>
                  </div>

                  {/* Rider Contact fields */}
                  <div className="border-t border-gray-300 pt-3">
                    <label className="block text-[12px] font-semibold text-[#555555] uppercase tracking-wider mb-2">
                      Data Penyewa & Jadwal
                    </label>
                    <div className="space-y-2 text-[12px]">
                      <div>
                        <label className="block text-[11px] text-[#555555] mb-0.5">Nama Lengkap (Sesuai KTP):</label>
                        <input
                          type="text"
                          required
                          value={riderName}
                          onChange={(e) => setRiderName(e.target.value)}
                          placeholder="Nama lengkap penyewa"
                          className="w-full bg-white border border-gray-300 rounded-[3px] px-2.5 py-1.5 text-[#212121]"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[11px] text-[#555555] mb-0.5">No. WhatsApp Aktif:</label>
                          <input
                            type="text"
                            required
                            value={riderPhone}
                            onChange={(e) => setRiderPhone(e.target.value)}
                            placeholder="0812-xxxx-xxxx"
                            className="w-full bg-white border border-gray-300 rounded-[3px] px-2.5 py-1.5 text-[#212121]"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-[#555555] mb-0.5">Mulai Sewa:</label>
                          <input
                            type="text"
                            required
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            placeholder="Tgl & Jam (cth: 12 Okt, 09.00)"
                            className="w-full bg-white border border-gray-300 rounded-[3px] px-2.5 py-1.5 text-[#212121]"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[11px] text-[#555555] mb-0.5">Alamat / Lokasi Antar Spesifik:</label>
                        <input
                          type="text"
                          required
                          value={pickupAddress}
                          onChange={(e) => setPickupAddress(e.target.value)}
                          placeholder="cth: Stasiun Bandung Pintu Selatan / Hotel Savoy Homann"
                          className="w-full bg-white border border-gray-300 rounded-[3px] px-2.5 py-1.5 text-[#212121]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Pricing Breakdown in Rupiah */}
                  <div className="border-t border-gray-300 pt-3 space-y-1.5 text-[13px]">
                    <div className="flex justify-between text-[#555555]">
                      <span>Tarif Sewa: Rp {bike.dailyRate.toLocaleString('id-ID')} × {rentalDays} hari</span>
                      <span className="text-[#212121]">Rp {baseRental.toLocaleString('id-ID')}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-700">
                        <span>Diskon Sewa ({discountRate * 100}%)</span>
                        <span>-Rp {discountAmount.toLocaleString('id-ID')}</span>
                      </div>
                    )}
                    {deliveryCost > 0 && (
                      <div className="flex justify-between text-[#555555]">
                        <span>Ongkir Antar Unit</span>
                        <span className="text-[#212121]">+Rp {deliveryCost.toLocaleString('id-ID')}</span>
                      </div>
                    )}

                    <div className="flex justify-between font-bold text-[#212121] text-[15px] pt-2 border-t border-gray-300">
                      <span>Total Biaya Sewa</span>
                      <span>Rp {totalChargedNow.toLocaleString('id-ID')}</span>
                    </div>

                    {/* Deposit Info Notice */}
                    <div className="bg-[#FFFFFF] border border-amber-300 p-2.5 rounded-[4px] mt-2">
                      <div className="flex items-start gap-1.5 text-[11px] text-[#555555]">
                        <Info className="w-4 h-4 text-[#A0844B] shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-[#212121] block font-semibold">
                            Ketentuan Jaminan:
                          </strong>
                          {bike.depositInfo}. Pembayaran sewa dilakukan saat serah terima motor (QRIS, Transfer Bank, atau Tunai).
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions: WA Direct + Web submit */}
                  <div className="space-y-2 pt-1">
                    <button
                      type="button"
                      onClick={() => handleSendWhatsApp()}
                      className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-[14px] py-2.5 rounded-[4px] transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Pesan Cepat via WhatsApp
                    </button>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-[#F8E01A] hover:bg-[#e6d018] disabled:opacity-50 text-[#212121] font-bold text-[14px] py-2.5 rounded-[4px] transition-colors shadow-sm cursor-pointer"
                    >
                      {submitting ? 'Menyimpan Pemesanan...' : 'Simpan Jadwal Booking di Web'}
                    </button>
                  </div>

                  <p className="text-[11px] text-[#888888] text-center">
                    Admin Misionary akan mengonfirmasi ketersediaan motor dalam hitungan menit.
                  </p>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

