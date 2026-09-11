import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, CheckCircle2, Clock, AlertCircle, Phone, User } from 'lucide-react';

interface BikeRecord {
  id: string;
  make: string;
  model: string;
  platNomor: string;
  dailyRate: number;
  status: string;
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
  status: string;
  paymentStatus: string;
}

interface ScheduleCalendarTabProps {
  bikes: BikeRecord[];
  bookings: Booking[];
}

export const ScheduleCalendarTab: React.FC<ScheduleCalendarTabProps> = ({ bikes, bookings }) => {
  const [startDateOffset, setStartDateOffset] = useState(0);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  // Generate 14 days starting from today + offset
  const today = new Date();
  const days: Date[] = [];
  for (let i = 0; i < 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + startDateOffset + i);
    days.push(d);
  }

  const formatDateKey = (date: Date) => {
    return date.toISOString().slice(0, 10);
  };

  // Find booking for a bike on a specific date
  const getBookingForBikeAndDate = (bikeId: string, dateKey: string): Booking | undefined => {
    return bookings.find((b) => {
      if (b.bikeId !== bikeId || b.status === 'CANCELLED') return false;
      const bStart = new Date(b.startDate);
      const target = new Date(dateKey);
      const diffDays = Math.floor((target.getTime() - bStart.getTime()) / (1000 * 60 * 60 * 24));
      return diffDays >= 0 && diffDays < b.rentalDays;
    });
  };

  return (
    <div className="space-y-6">
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#212121] border border-[#333333] p-5 rounded-lg">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#A0844B]" />
            Jadwal Sewa & Kalender Ketersediaan Armada
          </h2>
          <p className="text-xs text-[#888888] mt-0.5">
            Matriks ketersediaan 14 hari ke depan untuk koordinasi unit motor dan serah terima kunci.
          </p>
        </div>

        {/* Date pagination controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setStartDateOffset((prev) => prev - 7)}
            className="p-1.5 rounded bg-[#2a2a2a] hover:bg-[#333333] text-white border border-[#444444] cursor-pointer"
            title="7 Hari Sebelumnya"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setStartDateOffset(0)}
            className="text-xs font-semibold px-3 py-1.5 rounded bg-[#2a2a2a] hover:bg-[#333333] text-[#E0E0E0] border border-[#444444] cursor-pointer"
          >
            Hari Ini
          </button>
          <button
            onClick={() => setStartDateOffset((prev) => prev + 7)}
            className="p-1.5 rounded bg-[#2a2a2a] hover:bg-[#333333] text-white border border-[#444444] cursor-pointer"
            title="7 Hari Berikutnya"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-xs bg-[#1a1a1a] border border-[#2e2e2e] p-3 rounded-lg">
        <span className="text-[#888888]">Keterangan:</span>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/50" />
          <span className="text-emerald-400 font-medium">Tersedia</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#F8E01A]/20 border border-[#F8E01A]/50" />
          <span className="text-[#F8E01A] font-medium">Terjadwal Sewa</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-rose-500/20 border border-rose-500/50" />
          <span className="text-rose-400 font-medium">Servis / Nonaktif</span>
        </div>
      </div>

      {/* Schedule Matrix Table */}
      <div className="bg-[#212121] border border-[#333333] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#1c1c1c] border-b border-[#333333]">
                <th className="py-3 px-4 font-bold text-white sticky left-0 z-20 bg-[#1c1c1c] min-w-[200px] border-r border-[#333333]">
                  Unit Motor & Pelat
                </th>
                {days.map((d, idx) => {
                  const isToday = d.toDateString() === new Date().toDateString();
                  return (
                    <th
                      key={idx}
                      className={`py-2 px-2 text-center font-medium min-w-[72px] border-r border-[#2e2e2e] ${
                        isToday ? 'bg-[#A0844B]/20 text-[#F8E01A]' : 'text-[#888888]'
                      }`}
                    >
                      <div className="text-[10px] uppercase">
                        {d.toLocaleDateString('id-ID', { weekday: 'short' })}
                      </div>
                      <div className="text-xs font-bold text-white mt-0.5">
                        {d.getDate()} {d.toLocaleDateString('id-ID', { month: 'short' })}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2a2a2a]">
              {bikes.map((bike) => (
                <tr key={bike.id} className="hover:bg-[#252525]/40 transition-colors">
                  {/* Bike Info Sticky Column */}
                  <td className="py-3 px-4 sticky left-0 z-10 bg-[#212121] border-r border-[#333333]">
                    <div className="font-bold text-white">
                      {bike.make} {bike.model}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] font-mono text-[#F8E01A] bg-[#2a2a2a] px-1.5 py-0.2 rounded">
                        {bike.platNomor}
                      </span>
                      <span className="text-[10px] text-[#888888]">
                        Rp {(bike.dailyRate / 1000).toFixed(0)}k/hr
                      </span>
                    </div>
                  </td>

                  {/* Day cells */}
                  {days.map((d, dIdx) => {
                    const dateKey = formatDateKey(d);
                    const booking = getBookingForBikeAndDate(bike.id, dateKey);
                    const isServis = bike.status === 'SERVIS';

                    if (isServis) {
                      return (
                        <td
                          key={dIdx}
                          className="p-1 border-r border-[#2a2a2a] text-center bg-rose-950/20"
                          title="Motor dalam perbaikan/servis berkala"
                        >
                          <span className="text-[10px] text-rose-400 font-bold block">SERVIS</span>
                        </td>
                      );
                    }

                    if (booking) {
                      return (
                        <td
                          key={dIdx}
                          onClick={() => setSelectedBooking(booking)}
                          className="p-1 border-r border-[#2a2a2a] text-center cursor-pointer bg-[#F8E01A]/10 hover:bg-[#F8E01A]/20 transition-colors"
                          title={`Disewa oleh: ${booking.customerName} (${booking.bookingCode})`}
                        >
                          <div className="bg-[#A0844B]/30 text-[#F8E01A] rounded p-1 text-[10px] font-mono font-bold truncate">
                            {booking.bookingCode}
                          </div>
                          <div className="text-[9px] text-[#B5B5B5] truncate mt-0.5 max-w-[65px] mx-auto">
                            {booking.customerName.split(' ')[0]}
                          </div>
                        </td>
                      );
                    }

                    return (
                      <td
                        key={dIdx}
                        className="p-1 border-r border-[#2a2a2a] text-center text-emerald-500/70 hover:bg-emerald-950/20 transition-colors"
                      >
                        <span className="text-[10px] text-emerald-500/80 font-medium">Ready</span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Booking Quick Card Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#212121] border border-[#333333] rounded-lg max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#333333] pb-3">
              <div>
                <span className="text-[11px] text-[#A0844B] font-bold uppercase tracking-wider block">
                  Detail Pemesan Kalender
                </span>
                <h3 className="text-lg font-bold text-white font-mono">
                  {selectedBooking.bookingCode}
                </h3>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="text-[#888888] hover:text-white p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2.5 text-xs text-[#E0E0E0]">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-[#A0844B] shrink-0" />
                <span>Penyewa: <strong>{selectedBooking.customerName}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#A0844B] shrink-0" />
                <span>Kontak: <strong className="text-[#F8E01A]">{selectedBooking.customerPhone}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#A0844B] shrink-0" />
                <span>Mulai: {selectedBooking.startDate} ({selectedBooking.rentalDays} hari)</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#A0844B] shrink-0" />
                <span>Status Pesanan: <strong className="text-white bg-[#333333] px-1.5 py-0.5 rounded">{selectedBooking.status}</strong></span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#333333] flex justify-end gap-2">
              <a
                href={`https://wa.me/62${selectedBooking.customerPhone.replace(/^0/, '')}?text=Halo%20${encodeURIComponent(selectedBooking.customerName)},%20kami%20dari%20Misionary%20Rental%20Motor%20Bandung...`}
                target="_blank"
                rel="noreferrer"
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold px-4 py-2 rounded flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                Chat WhatsApp
              </a>
              <button
                onClick={() => setSelectedBooking(null)}
                className="bg-[#2a2a2a] hover:bg-[#333333] text-white text-xs font-semibold px-4 py-2 rounded cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
