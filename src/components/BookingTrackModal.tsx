import React, { useState } from 'react';
import { X, Search, Clock, CheckCircle2, Truck, Package, AlertCircle } from 'lucide-react';

interface BookingTrackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TrackedBooking {
  id: number;
  bookingCode: string;
  customerName: string;
  customerPhone: string;
  bikeName: string;
  startDate: string;
  rentalDays: number;
  pickupLocation: string;
  pickupAddress: string;
  totalAmount: number;
  paymentStatus: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const TIMELINE_STEPS = [
  { key: 'PENDING', label: 'Pesanan Diterima', icon: Package },
  { key: 'CONFIRMED', label: 'Data Diverifikasi', icon: CheckCircle2 },
  { key: 'DELIVERED', label: 'Motor Diantar', icon: Truck },
  { key: 'COMPLETED', label: 'Sewa Selesai', icon: CheckCircle2 },
];

const STATUS_ORDER: Record<string, number> = {
  PENDING: 0, CONFIRMED: 1, DELIVERED: 2, COMPLETED: 3, CANCELLED: -1,
};

function formatRupiah(n: number): string {
  return 'Rp ' + n.toLocaleString('id-ID');
}

function formatDate(d: string): string {
  try {
    return new Date(d).toLocaleDateString('id-ID', {
      day: 'numeric', month: 'long', year: 'numeric',
    });
  } catch {
    return d;
  }
}

export const BookingTrackModal: React.FC<BookingTrackModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [bookings, setBookings] = useState<TrackedBooking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  if (!isOpen) return null;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) {
      setError('Masukkan kode booking atau nomor WhatsApp.');
      return;
    }
    setLoading(true);
    setError('');
    setSearched(true);

    try {
      const res = await fetch(`/api/bookings/track/${encodeURIComponent(q)}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Pesanan tidak ditemukan.');
        setBookings([]);
      } else {
        setBookings(data.data || []);
      }
    } catch {
      setError('Tidak dapat terhubung ke server.');
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setQuery('');
    setBookings([]);
    setError('');
    setSearched(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-white w-full max-w-lg rounded-lg shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#212121] text-white px-5 py-4 flex items-center justify-between border-b border-[#333333]">
          <div>
            <h2 className="text-base font-bold">Cek Status Pesanan</h2>
            <p className="text-[#888888] text-xs">Lacak pesanan motor Anda di Misionary</p>
          </div>
          <button
            onClick={handleClose}
            className="p-1 text-[#B5B5B5] hover:text-white transition-colors cursor-pointer rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto flex-1">
          {/* Search Form */}
          <form onSubmit={handleSearch} className="mb-5">
            <label className="text-[#212121] text-sm font-medium block mb-1.5">
              Kode Booking atau Nomor WhatsApp
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999999]" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setError(''); }}
                  placeholder="MSN-0001 atau 081234567890"
                  className="w-full border border-gray-300 text-[#212121] text-sm rounded-md pl-9 pr-3 py-2.5 focus:outline-none focus:border-[#A0844B] placeholder-[#AAAAAA]"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-[#A0844B] hover:bg-[#8f743f] disabled:opacity-50 text-white font-semibold text-sm px-4 py-2.5 rounded-md cursor-pointer transition-colors shrink-0"
              >
                {loading ? 'Mencari...' : 'Lacak'}
              </button>
            </div>
          </form>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md p-3 mb-4">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Results */}
          {bookings.length > 0 && (
            <div className="space-y-4">
              {bookings.map((b) => {
                const stepIndex = STATUS_ORDER[b.status] ?? -1;
                const isCancelled = b.status === 'CANCELLED';

                return (
                  <div key={b.id} className="border border-gray-200 rounded-lg p-4">
                    {/* Booking Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="text-[#212121] font-bold text-sm">{b.bookingCode}</span>
                        <p className="text-[#888888] text-xs">{b.customerName}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[#A0844B] font-bold text-sm">{formatRupiah(b.totalAmount)}</p>
                        <p className="text-[#888888] text-xs">{b.rentalDays} hari</p>
                      </div>
                    </div>

                    {/* Motor & Pickup */}
                    <div className="grid grid-cols-2 gap-2 text-xs text-[#666666] mb-4">
                      <div><span className="text-[#999999]">Motor:</span> {b.bikeName}</div>
                      <div><span className="text-[#999999]">Mulai:</span> {formatDate(b.startDate)}</div>
                      <div><span className="text-[#999999]">Antar ke:</span> {b.pickupLocation}</div>
                      <div>
                        <span className="text-[#999999]">Pembayaran:</span>{' '}
                        <span className={
                          b.paymentStatus === 'LUNAS' ? 'text-green-600 font-medium' :
                          b.paymentStatus === 'DP_50' ? 'text-orange-500 font-medium' :
                          'text-red-500 font-medium'
                        }>
                          {b.paymentStatus === 'LUNAS' ? 'Lunas' : b.paymentStatus === 'DP_50' ? 'DP 50%' : 'Belum Bayar'}
                        </span>
                      </div>
                    </div>

                    {/* Timeline */}
                    {isCancelled ? (
                      <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded p-3 text-center font-medium">
                        Pesanan ini telah dibatalkan.
                      </div>
                    ) : (
                      <div className="relative">
                        <div className="flex items-start justify-between">
                          {TIMELINE_STEPS.map((step, i) => {
                            const isActive = i <= stepIndex;
                            const isCurrent = i === stepIndex;
                            const StepIcon = step.icon;
                            return (
                              <div key={step.key} className="flex flex-col items-center flex-1 relative">
                                {/* Connector line */}
                                {i > 0 && (
                                  <div
                                    className="absolute top-3.5 right-1/2 h-0.5 w-full -z-10"
                                    style={{
                                      backgroundColor: i <= stepIndex ? '#A0844B' : '#E5E5E5',
                                    }}
                                  />
                                )}
                                {/* Circle */}
                                <div
                                  className={`w-7 h-7 rounded-full flex items-center justify-center z-10 ${
                                    isCurrent
                                      ? 'bg-[#A0844B] text-white ring-2 ring-[#A0844B]/30'
                                      : isActive
                                      ? 'bg-[#A0844B] text-white'
                                      : 'bg-gray-200 text-[#999999]'
                                  }`}
                                >
                                  <StepIcon className="w-3.5 h-3.5" />
                                </div>
                                <span
                                  className={`text-[10px] mt-1.5 text-center leading-tight ${
                                    isActive ? 'text-[#212121] font-medium' : 'text-[#AAAAAA]'
                                  }`}
                                >
                                  {step.label}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Empty State */}
          {searched && !loading && bookings.length === 0 && !error && (
            <div className="text-center text-[#888888] py-8">
              <Clock className="w-8 h-8 mx-auto mb-2 text-[#CCCCCC]" />
              <p className="text-sm">Tidak ada pesanan ditemukan.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
