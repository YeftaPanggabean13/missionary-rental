import React from 'react';
import { TESTIMONIALS } from '../data/bikes';
import { Quote, Star, MapPin } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-16 bg-white border-b border-gray-200" id="community">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center max-w-xl mx-auto">
          <span className="text-[12px] font-bold uppercase tracking-wider text-[#A0844B] block mb-1">
            Cerita Wisatawan
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#212121] tracking-tight">
            Pengalaman Nyata Bersama Misionary
          </h2>
          <p className="text-[14px] text-[#555555] mt-1">
            Dari wisatawan yang tiba dengan Whoosh Jakarta-Bandung hingga pasangan liburan santai di Dago dan Lembang.
          </p>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-[#F0F2F4] p-6 rounded-[4px] border border-gray-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[#A0844B]">
                    <Quote className="w-7 h-7 fill-[#A0844B]/20 text-[#A0844B]" />
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 fill-[#F8E01A] text-[#F8E01A]"
                      />
                    ))}
                    <span className="text-[12px] font-bold text-[#212121] ml-1">
                      {t.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
                <p className="text-[14px] text-[#555555] leading-relaxed mb-6 italic">
                  "{t.quote}"
                </p>
              </div>

              {/* Author & Route Info */}
              <div className="pt-4 border-t border-gray-300">
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className="w-10 h-10 rounded-full object-cover border border-gray-300"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <strong className="text-[14px] text-[#212121] font-bold">
                        {t.author}
                      </strong>
                      <span className="text-[11px] bg-white border border-gray-300 text-[#555555] font-medium px-1.5 py-0.2 rounded">
                        {t.origin}
                      </span>
                    </div>
                    <div className="text-[12px] text-[#A0844B] font-semibold">
                      {t.motorcycle}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-[#888888] bg-white px-2.5 py-1 rounded border border-gray-200">
                  <MapPin className="w-3 h-3 text-[#A0844B] shrink-0" />
                  <span className="truncate">Rute: {t.route}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

