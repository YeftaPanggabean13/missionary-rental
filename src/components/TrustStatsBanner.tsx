import React from 'react';
import { ShieldCheck, Sparkles, MapPin, CheckCircle2, Wrench, PackageCheck, FileText } from 'lucide-react';

export const TrustStatsBanner: React.FC = () => {
  return (
    <section className="bg-white border-b border-gray-200 py-10" id="safety">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Pillar 1 */}
          <div className="flex items-start gap-3.5 p-3 rounded-[4px]">
            <div className="p-2.5 bg-[#F0F2F4] text-[#A0844B] rounded-[4px] shrink-0">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-[15px] font-bold text-[#212121] mb-1">
                Unit Bersih & Servis Rutin
              </h3>
              <p className="text-[13px] text-[#555555] leading-snug">
                Rutin servis berkala bengkel resmi. Ban tebal, rem pakem, dan mesin bertenaga siap nanjak Lembang & Ciwidey.
              </p>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="flex items-start gap-3.5 p-3 rounded-[4px]">
            <div className="p-2.5 bg-[#F0F2F4] text-[#A0844B] rounded-[4px] shrink-0">
              <PackageCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-[15px] font-bold text-[#212121] mb-1">
                Fasilitas Lengkap & Bersih
              </h3>
              <p className="text-[13px] text-[#555555] leading-snug">
                Termasuk 2 helm SNI bersih & wangi, 2 jas hujan setelan tebal, phone holder di stang, dan bensin awal.
              </p>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="flex items-start gap-3.5 p-3 rounded-[4px]">
            <div className="p-2.5 bg-[#F0F2F4] text-[#A0844B] rounded-[4px] shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-[15px] font-bold text-[#212121] mb-1">
                Antar-Jemput Fleksibel
              </h3>
              <p className="text-[13px] text-[#555555] leading-snug">
                Unit diantar tepat waktu ke Stasiun Bandung (Pintu Utara/Selatan), Stasiun Whoosh, atau Hotel tempat Anda menginap.
              </p>
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="flex items-start gap-3.5 p-3 rounded-[4px]">
            <div className="p-2.5 bg-[#F0F2F4] text-[#A0844B] rounded-[4px] shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-[15px] font-bold text-[#212121] mb-1">
                Syarat Mudah & Transparan
              </h3>
              <p className="text-[13px] text-[#555555] leading-snug">
                Cukup e-KTP dan SIM C yang valid. Tanpa uang jaminan jutaan rupiah, surat STNK asli resmi berpelat D Bandung.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


