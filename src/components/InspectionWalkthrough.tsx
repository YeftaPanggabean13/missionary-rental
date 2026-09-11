import React, { useState } from 'react';
import { Camera, Fuel, Gauge, CheckCircle2, ShieldCheck, FileCheck, KeyRound, ArrowRight } from 'lucide-react';

export const InspectionWalkthrough: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [inspectionMode, setInspectionMode] = useState<'handover' | 'return'>('handover');

  const inspectionSteps = [
    {
      id: 'photos',
      title: 'Cek Bodi 360° Bersama',
      icon: Camera,
      tag: 'Transparansi Kondisi Fisik',
      description: 'Sebelum kunci diserahkan, staf Misionary dan penyewa mendokumentasikan 4 sisi motor (depan, sisi kanan knalpot, sisi kiri bodi, dan belakang).',
      actionDetail: 'Kondisi fisik dicatat bersama untuk kenyamanan dan rasa tenang kedua pihak.',
      previewData: {
        status: '4/4 Sisi Diperiksa',
        items: ['Bodi & Spakbor Depan (Mulus)', 'Knalpot & Pijakan Kaki (Aman)', 'Spion & Stang Kemudi (Kokoh)', 'Lampu Utama & Rem Belakang (Menyala Normal)']
      }
    },
    {
      id: 'completeness',
      title: 'Kelengkapan Surat & Aksesori',
      icon: FileCheck,
      tag: 'Kelengkapan Berkendara',
      description: 'Pemeriksaan STNK asli resmi berpelat D Bandung, 2 buah helm SNI yang bersih dan wangi, 2 jas hujan setelan tebal, serta phone holder di stang.',
      actionDetail: 'Semua kelengkapan diserahterimakan dalam kondisi bersih dan siap pakai.',
      previewData: {
        status: 'Kelengkapan Lengkap',
        items: ['STNK Asli Resmi Berpelat D (Aktif)', '2 Helm SNI Bersih & Wangi', '2 Set Jas Hujan Anti-Bocor', 'Phone Holder Kokoh di Stang']
      }
    },
    {
      id: 'fuel',
      title: 'Pencatatan Bensin & Odometer',
      icon: Fuel,
      tag: 'Prinsip Sama Kembali Sama',
      description: 'Indikator bensin dan angka odometer difoto saat serah terima. Saat pengembalian, motor cukup dikembalikan dengan posisi bensin yang sama seperti awal.',
      actionDetail: 'Bensin awal ready-to-ride tercatat bersama.',
      previewData: {
        status: 'Indikator Bensin Tercatat',
        items: ['Bensin Awal: Siap Jalan', 'Angka Odometer Tercatat', 'Kondisi Angin Ban: Pas & Siap Nanjak']
      }
    },
    {
      id: 'signoff',
      title: 'Serah Terima Kunci & Siap Jalan',
      icon: KeyRound,
      tag: 'Kunci Diserahkan',
      description: 'Penyewa menerima kunci kontak / smart key dan tips rute wisata Bandung terfavorit dari staf Misionary. Anda siap menjelajah Bandung dengan tenang.',
      actionDetail: 'Motor resmi diserahterimakan, selamat menikmati Bandung!',
      previewData: {
        status: 'Serah Terima Selesai',
        items: ['Kunci Kontak / Remote Smart Key Diberikan', 'Kontak Darurat Staf Misionary Siaga 24 Jam', 'E-KTP Disimpan Aman Sebagai Jaminan']
      }
    }
  ];

  const current = inspectionSteps[activeStep];
  const CurrentIcon = current.icon;

  return (
    <section className="py-16 bg-white border-b border-gray-200" id="inspection">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wider text-[#A0844B] mb-2">
            <ShieldCheck className="w-4 h-4" />
            Standar Pelayanan Misionary Bandung
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#212121] tracking-tight">
            Prosedur Serah Terima Aman & Transparan
          </h2>
          <p className="text-[15px] text-[#555555] mt-2">
            Proses serah terima cepat hanya 3-5 menit. Memastikan motor yang Anda terima dalam kondisi prima, bersih, dan siap diajak keliling Bandung.
          </p>

          {/* Toggle between Handover and Return mode */}
          <div className="inline-flex bg-[#F0F2F4] p-1 rounded-[4px] mt-6 border border-gray-200">
            <button
              onClick={() => setInspectionMode('handover')}
              className={`px-4 py-1.5 text-[13px] font-semibold rounded-[3px] transition-colors cursor-pointer ${
                inspectionMode === 'handover' ? 'bg-[#212121] text-white' : 'text-[#555555] hover:text-[#212121]'
              }`}
            >
              Serah Terima (Pengambilan Motor)
            </button>
            <button
              onClick={() => setInspectionMode('return')}
              className={`px-4 py-1.5 text-[13px] font-semibold rounded-[3px] transition-colors cursor-pointer ${
                inspectionMode === 'return' ? 'bg-[#212121] text-white' : 'text-[#555555] hover:text-[#212121]'
              }`}
            >
              Pengembalian Unit (Selesai Sewa)
            </button>
          </div>
        </div>

        {/* Interactive inspection box */}
        <div className="bg-[#F0F2F4] border border-gray-300 rounded-[6px] p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Step navigation tabs (5 cols) */}
            <div className="lg:col-span-5 space-y-2.5">
              {inspectionSteps.map((step, idx) => {
                const Icon = step.icon;
                const isSelected = activeStep === idx;
                return (
                  <button
                    key={step.id}
                    onClick={() => setActiveStep(idx)}
                    className={`w-full text-left p-4 rounded-[4px] border transition-all cursor-pointer flex items-start gap-3.5 ${
                      isSelected
                        ? 'bg-white border-[#A0844B] shadow-sm'
                        : 'bg-white/50 border-gray-200 hover:bg-white text-[#555555]'
                    }`}
                  >
                    <div
                      className={`p-2 rounded-[3px] shrink-0 ${
                        isSelected ? 'bg-[#212121] text-white' : 'bg-gray-100 text-[#555555]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#A0844B]">
                          Langkah 0{idx + 1}
                        </span>
                        {isSelected && (
                          <span className="text-[10px] bg-[#A0844B]/15 text-[#886a34] font-semibold px-1.5 py-0.2 rounded">
                            Aktif
                          </span>
                        )}
                      </div>
                      <h4 className="text-[15px] font-bold text-[#212121] leading-snug">
                        {step.title}
                      </h4>
                      <p className="text-[12px] text-[#555555] line-clamp-1 mt-0.5">
                        {step.tag}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Step preview interface card (7 cols) */}
            <div className="lg:col-span-7 bg-white border border-gray-300 rounded-[4px] p-6 shadow-md">
              <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-[#A0844B] text-white rounded-[3px]">
                    <CurrentIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold uppercase text-[#A0844B] block">
                      {inspectionMode === 'handover' ? 'Checklist Serah Terima Unit' : 'Pemeriksaan Selesai Sewa'}
                    </span>
                    <h3 className="text-lg font-bold text-[#212121]">
                      {current.title}
                    </h3>
                  </div>
                </div>
                <span className="text-[12px] font-semibold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-[3px] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {current.previewData.status}
                </span>
              </div>

              <p className="text-[14px] text-[#555555] leading-relaxed mb-5">
                {current.description}
              </p>

              {/* Verification items */}
              <div className="space-y-2 bg-[#F0F2F4] p-4 rounded-[4px] mb-5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#555555] mb-1">
                  Poin Pemeriksaan Standar:
                </div>
                {current.previewData.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-[13px]">
                    <span className="text-[#212121] font-medium flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#A0844B]"></span>
                      {item}
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Sesuai Standar
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2 text-[12px] text-[#888888]">
                <span className="flex items-center gap-1 text-[#212121] font-medium">
                  <ShieldCheck className="w-4 h-4 text-[#A0844B]" />
                  {current.actionDetail}
                </span>
                <button
                  onClick={() => setActiveStep((activeStep + 1) % inspectionSteps.length)}
                  className="text-[#A0844B] hover:text-[#8b713c] font-semibold flex items-center gap-1 cursor-pointer"
                >
                  Langkah Berikutnya <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

