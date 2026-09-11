import React from 'react';
import { X, Printer, MessageSquare } from 'lucide-react';

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
}

interface InvoiceModalProps {
  booking: Booking | null;
  onClose: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ booking, onClose }) => {
  if (!booking) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleSendWA = () => {
    const text = encodeURIComponent(
      `Halo Kak ${booking.customerName},\n\n` +
      `Berikut adalah bukti pemesanan resmi Misionary Rental Motor Bandung:\n` +
      `• No. Transaksi: ${booking.bookingCode}\n` +
      `• Unit: ${booking.bikeName}\n` +
      `• Durasi: ${booking.rentalDays} Hari (Mulai: ${booking.startDate})\n` +
      `• Lokasi Antar: ${booking.pickupAddress || booking.pickupLocation}\n` +
      `• Total Tagihan: Rp ${booking.totalAmount.toLocaleString('id-ID')}\n` +
      `• Status Pembayaran: ${booking.paymentStatus}\n\n` +
      `Unit motor sudah disiapkan lengkap dengan 2 helm SNI & jas hujan. Sampai jumpa di Bandung!`
    );
    window.open(`https://wa.me/62${booking.customerPhone.replace(/^0/, '')}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 print:p-0 print:bg-white">
      <div className="bg-white text-[#212121] rounded-lg max-w-2xl w-full p-6 sm:p-8 my-auto max-h-[92vh] overflow-y-auto shadow-2xl print:shadow-none print:max-w-none print:w-full print:m-0 print:rounded-none">
        {/* Modal Controls (Hidden when printing) */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6 print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold text-[#A0844B] bg-[#A0844B]/10 px-2 py-0.5 rounded">
              Struk Resmi
            </span>
            <span className="text-xs text-[#666666]">Bukti Pemesanan & Surat Serah Terima</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="bg-[#212121] hover:bg-[#333333] text-white text-xs font-semibold px-3 py-1.5 rounded flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              Cetak Struk (PDF)
            </button>
            <button
              onClick={handleSendWA}
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-semibold px-3 py-1.5 rounded flex items-center gap-1.5 cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Kirim ke WA
            </button>
            <button
              onClick={onClose}
              className="text-[#888888] hover:text-[#212121] p-1.5 cursor-pointer rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Invoice Printable Sheet */}
        <div className="space-y-6 text-xs text-[#333333]">
          {/* Header */}
          <div className="flex justify-between items-start border-b border-gray-300 pb-4">
            <div>
              <div className="bg-[#212121] px-3 py-1 rounded inline-block mb-2">
                <img src="/img/missionary-horizontal-white.png" alt="Misionary" className="h-6 w-auto object-contain" />
              </div>
              <p className="font-bold text-[#212121] text-sm">Misionary Rental Motor Bandung</p>
              <p className="text-[#666666]">Jl. Pasirkaliki No. 88, Cicendo, Kota Bandung</p>
              <p className="text-[#666666]">WhatsApp: +62 812-3456-7890 | Garasi Operasional</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-[#888888] block">No. Transaksi</span>
              <span className="text-xl font-mono font-black text-[#212121] block mb-1">
                {booking.bookingCode}
              </span>
              <span className="text-[11px] text-[#666666] block">
                Tgl Transaksi: {new Date(booking.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
            </div>
          </div>

          {/* Customer & Unit Details */}
          <div className="grid grid-cols-2 gap-4 bg-[#F8F9FA] p-4 rounded border border-gray-200">
            <div>
              <span className="text-[10px] font-bold text-[#888888] uppercase block mb-1">
                Data Penyewa (Rider)
              </span>
              <strong className="text-sm text-[#212121] block">{booking.customerName}</strong>
              <span className="text-xs text-[#555555] block">Kontak: {booking.customerPhone}</span>
              <span className="text-xs text-[#555555] block mt-1">
                Lokasi Serah Terima: <strong>{booking.pickupAddress || booking.pickupLocation}</strong>
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#888888] uppercase block mb-1">
                Data Unit & Waktu Sewa
              </span>
              <strong className="text-sm text-[#212121] block">{booking.bikeName}</strong>
              <span className="text-xs text-[#555555] block">
                Mulai: <strong>{booking.startDate}</strong> ({booking.rentalDays} Hari Sewa)
              </span>
              <span className="text-xs text-[#555555] block mt-1">
                Fasilitas: 2 Helm SNI Bersih, 2 Jas Hujan Setelan, STNK Asli
              </span>
            </div>
          </div>

          {/* Pricing Table */}
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-300 text-[11px] text-[#555555]">
                <th className="py-2 text-left">Deskripsi Layanan</th>
                <th className="py-2 text-center">Durasi / Qty</th>
                <th className="py-2 text-right">Tarif Satuan</th>
                <th className="py-2 text-right">Jumlah</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="py-2.5">
                  <strong>Sewa {booking.bikeName}</strong>
                  <span className="text-[11px] text-[#666666] block">Layanan antar-jemput & fasilitas berkendara</span>
                </td>
                <td className="py-2.5 text-center">{booking.rentalDays} Hari</td>
                <td className="py-2.5 text-right">Rp {booking.dailyRate.toLocaleString('id-ID')}</td>
                <td className="py-2.5 text-right font-medium">
                  Rp {(booking.dailyRate * booking.rentalDays).toLocaleString('id-ID')}
                </td>
              </tr>
              {booking.extraHelm > 0 && (
                <tr>
                  <td className="py-2.5">Helm Tambahan Ekstra</td>
                  <td className="py-2.5 text-center">{booking.extraHelm} Buah</td>
                  <td className="py-2.5 text-right">Rp 15.000</td>
                  <td className="py-2.5 text-right font-medium">
                    Rp {(booking.extraHelm * 15000).toLocaleString('id-ID')}
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-gray-300">
                <td colSpan={3} className="py-2.5 text-right font-bold text-sm">Total Tagihan:</td>
                <td className="py-2.5 text-right font-black text-base text-[#212121]">
                  Rp {booking.totalAmount.toLocaleString('id-ID')}
                </td>
              </tr>
              <tr>
                <td colSpan={3} className="py-1 text-right text-xs text-[#666666]">Status Pembayaran:</td>
                <td className="py-1 text-right font-bold text-emerald-700">{booking.paymentStatus}</td>
              </tr>
            </tfoot>
          </table>

          {/* Terms & Handover Signatures */}
          <div className="pt-4 border-t border-gray-200 space-y-4">
            <p className="text-[10px] text-[#888888] leading-relaxed">
              * Motor diserahkan dalam kondisi bersih, mesin normal, dan rem berfungsi baik. Pelanggan wajib mematuhi aturan lalu lintas di wilayah Bandung & menjaga STNK asli motor. Kunci dan surat motor diserahkan saat tanda tangan di bawah ini.
            </p>

            <div className="grid grid-cols-2 gap-8 pt-6 text-center text-xs">
              <div>
                <span className="text-[#666666] block mb-12">Pihak Penyewa,</span>
                <strong className="border-t border-gray-400 pt-1 block text-[#212121]">
                  ( {booking.customerName} )
                </strong>
              </div>
              <div>
                <span className="text-[#666666] block mb-12">Petugas Misionary Bandung,</span>
                <strong className="border-t border-gray-400 pt-1 block text-[#212121]">
                  ( Petugas Serah Terima )
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
