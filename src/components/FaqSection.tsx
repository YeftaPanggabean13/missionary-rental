import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/bikes';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 bg-white border-b border-gray-200" id="faq">
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wider text-[#A0844B] mb-1">
            <HelpCircle className="w-4 h-4" />
            Tanya Jawab Seputar Sewa
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#212121] tracking-tight">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-[14px] text-[#555555] mt-1 max-w-lg mx-auto">
            Penjelasan transparan seputar persyaratan e-KTP, antar-jemput stasiun & hotel di Bandung, fasilitas helm, serta bahan bakar.
          </p>
        </div>

        {/* Minimal FAQ List */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-gray-200 rounded-[4px] bg-white transition-colors"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-[15px] font-bold text-[#212121] leading-snug">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#A0844B] transition-transform duration-200 shrink-0 ${
                      isOpen ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-[14px] text-[#555555] leading-relaxed border-t border-gray-100">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support helper */}
        <div className="mt-8 bg-[#F0F2F4] p-5 rounded-[4px] border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-[#555555]">
          <div>
            <strong className="text-[#212121] block text-[14px]">Ada pertanyaan khusus yang belum terjawab?</strong>
            <span>Admin Misionary siap membantu via WhatsApp setiap hari pukul 06.30 - 22.00 WIB.</span>
          </div>
          <a
            href="https://wa.me/6281234567890?text=Halo%20Admin%20Misionary,%20saya%20ingin%20tanya%20seputar%20sewa%20motor%20di%20Bandung"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#212121] hover:bg-[#333333] text-white px-4 py-2.5 rounded-[4px] font-semibold flex items-center gap-2 shrink-0 transition-colors"
          >
            <MessageSquare className="w-4 h-4 text-[#A0844B]" />
            Tanya via WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

