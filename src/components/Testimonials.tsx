import React from 'react';
import { TESTIMONIALS } from '../data/bikes';
import { Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-16 bg-white border-b border-gray-200" id="community">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center max-w-xl mx-auto">
          <span className="text-[12px] font-bold uppercase tracking-wider text-[#A0844B] block mb-1">
            Real Riders & Owners
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#212121] tracking-tight">
            Built by Riders, for Riders
          </h2>
          <p className="text-[14px] text-[#555555] mt-1">
            Motorcycle culture grounded in mutual respect, clear expectations, and real community trust.
          </p>
        </div>

        {/* 3 Testimonial Cards meeting Brand Guideline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-[#F0F2F4] p-6 rounded-[4px] border border-gray-200 flex flex-col justify-between"
            >
              <div>
                {/* Quotation mark in Warm Gold #A0844B */}
                <div className="text-[#A0844B] mb-3">
                  <Quote className="w-7 h-7 fill-[#A0844B]/20 text-[#A0844B]" />
                </div>
                <p className="text-[14px] text-[#555555] leading-relaxed mb-6 italic">
                  "{t.quote}"
                </p>
              </div>

              {/* Author & Bike Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-300">
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
                    <span className="text-[10px] bg-white border border-gray-300 text-[#212121] font-semibold px-1.5 py-0.2 rounded">
                      {t.role}
                    </span>
                  </div>
                  <div className="text-[12px] text-[#888888]">
                    {t.motorcycle} · {t.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
