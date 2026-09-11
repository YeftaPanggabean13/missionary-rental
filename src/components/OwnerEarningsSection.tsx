import React, { useState } from 'react';
import { DollarSign, Shield, Clock, Sliders, CheckCircle2, ArrowRight } from 'lucide-react';

interface OwnerEarningsSectionProps {
  onOpenListModal: () => void;
}

export const OwnerEarningsSection: React.FC<OwnerEarningsSectionProps> = ({ onOpenListModal }) => {
  const [dailyRate, setDailyRate] = useState<number>(140);
  const [daysPerMonth, setDaysPerMonth] = useState<number>(6);
  const [selectedBikeType, setSelectedBikeType] = useState<string>('Cruiser / Touring');

  // PRD Commission logic: Payout = rental fee - 20% commission
  const grossMonthly = dailyRate * daysPerMonth;
  const platformFee = Math.round(grossMonthly * 0.20);
  const netMonthlyPayout = grossMonthly - platformFee;
  const estimatedAnnualNet = netMonthlyPayout * 12;

  const handleBikePreset = (presetType: string, rate: number, days: number) => {
    setSelectedBikeType(presetType);
    setDailyRate(rate);
    setDaysPerMonth(days);
  };

  return (
    <section className="py-16 bg-[#212121] text-white border-b border-[#333333]" id="earnings">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Straightforward Brand Copy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#2d2d2d] border border-[#444444] px-3 py-1 rounded-[3px] text-[12px] uppercase tracking-wider text-[#A0844B] font-semibold">
              Owner Earnings & Net Payout Calculator
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
              List Your Motorcycle For Rent & Earn Money Today
            </h2>

            <p className="text-[16px] text-[#E0E0E0] leading-relaxed">
              Listing your motorcycle is easy and only takes around 5 minutes. You choose the price. Too many rentals? Increase it. Too few? Decrease it.
            </p>

            {/* Direct owner guarantees */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3">
                <div className="p-1 bg-[#A0844B]/20 text-[#A0844B] rounded-[3px] mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-[#A0844B]" />
                </div>
                <div>
                  <strong className="text-white text-[14px] block font-semibold">
                    $1,000,000 Liability & Physical Damage Coverage
                  </strong>
                  <span className="text-[13px] text-[#B5B5B5]">
                    Your motorcycle is fully covered under our master insurance policy during every active rental.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1 bg-[#A0844B]/20 text-[#A0844B] rounded-[3px] mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-[#A0844B]" />
                </div>
                <div>
                  <strong className="text-white text-[14px] block font-semibold">
                    Renter Pre-Authorized Security Deposit
                  </strong>
                  <span className="text-[13px] text-[#B5B5B5]">
                    We hold a card pre-authorization on the rider before pickup to cover incidentals or damages.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1 bg-[#A0844B]/20 text-[#A0844B] rounded-[3px] mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-[#A0844B]" />
                </div>
                <div>
                  <strong className="text-white text-[14px] block font-semibold">
                    You Approve Every Request
                  </strong>
                  <span className="text-[13px] text-[#B5B5B5]">
                    No forced instant bookings. Review rider profiles, history, and message them before saying yes.
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenListModal}
                className="bg-[#A0844B] hover:bg-[#8f743f] text-white text-[14px] font-semibold px-6 py-3.5 rounded-[4px] transition-colors inline-flex items-center gap-2 cursor-pointer shadow-md"
                id="earnings-list-cta"
              >
                List Your Bike in ~5 Minutes
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Net Earnings Calculator (PRD Screen 6) */}
          <div className="lg:col-span-6 bg-white text-[#212121] rounded-[6px] p-6 sm:p-8 shadow-xl border border-gray-200">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-6">
              <div>
                <h3 className="text-[18px] font-bold text-[#212121]">
                  Estimate Your Net Take-Home
                </h3>
                <p className="text-[13px] text-[#555555]">
                  Calculated using transparent 80% owner payout (20% platform & insurance fee).
                </p>
              </div>
            </div>

            {/* Quick preset selector */}
            <div className="mb-6">
              <label className="block text-[12px] font-semibold text-[#555555] uppercase tracking-wider mb-2">
                Sample Motorcycle Archetypes:
              </label>
              <div className="grid grid-cols-3 gap-2 text-[12px]">
                <button
                  type="button"
                  onClick={() => handleBikePreset('Adventure / Dual', 165, 7)}
                  className={`py-2 px-2 text-center rounded-[3px] border cursor-pointer ${
                    selectedBikeType === 'Adventure / Dual'
                      ? 'bg-[#212121] text-white border-[#212121]'
                      : 'bg-[#F0F2F4] text-[#555555] border-gray-300 hover:bg-gray-200'
                  }`}
                >
                  Adventure (GS/Tiger)
                  <span className="block text-[11px] opacity-80">$165/day</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleBikePreset('Cruiser / Touring', 150, 6)}
                  className={`py-2 px-2 text-center rounded-[3px] border cursor-pointer ${
                    selectedBikeType === 'Cruiser / Touring'
                      ? 'bg-[#212121] text-white border-[#212121]'
                      : 'bg-[#F0F2F4] text-[#555555] border-gray-300 hover:bg-gray-200'
                  }`}
                >
                  Cruiser (Harley/Indian)
                  <span className="block text-[11px] opacity-80">$150/day</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleBikePreset('Classic / Sport', 125, 5)}
                  className={`py-2 px-2 text-center rounded-[3px] border cursor-pointer ${
                    selectedBikeType === 'Classic / Sport'
                      ? 'bg-[#212121] text-white border-[#212121]'
                      : 'bg-[#F0F2F4] text-[#555555] border-gray-300 hover:bg-gray-200'
                  }`}
                >
                  Classic (Bonneville)
                  <span className="block text-[11px] opacity-80">$125/day</span>
                </button>
              </div>
            </div>

            {/* Slider 1: Daily Rental Rate */}
            <div className="space-y-2 mb-6">
              <div className="flex justify-between items-baseline">
                <span className="text-[13px] font-semibold text-[#555555]">
                  Your Daily Rental Rate:
                </span>
                <span className="text-xl font-bold text-[#212121]">
                  ${dailyRate} <span className="text-sm font-normal text-[#888888]">/ day</span>
                </span>
              </div>
              <input
                type="range"
                min="75"
                max="250"
                step="5"
                value={dailyRate}
                onChange={(e) => setDailyRate(Number(e.target.value))}
                className="w-full accent-[#A0844B] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#888888]">
                <span>$75/day (Standard)</span>
                <span>$150/day (Average)</span>
                <span>$250/day (Touring)</span>
              </div>
            </div>

            {/* Slider 2: Days Rented Per Month */}
            <div className="space-y-2 mb-8">
              <div className="flex justify-between items-baseline">
                <span className="text-[13px] font-semibold text-[#555555]">
                  Days Rented Per Month:
                </span>
                <span className="text-xl font-bold text-[#212121]">
                  {daysPerMonth} <span className="text-sm font-normal text-[#888888]">days/mo</span>
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="20"
                step="1"
                value={daysPerMonth}
                onChange={(e) => setDaysPerMonth(Number(e.target.value))}
                className="w-full accent-[#A0844B] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#888888]">
                <span>2 days (1 weekend)</span>
                <span>6 days (2 weekends)</span>
                <span>15+ days</span>
              </div>
            </div>

            {/* Net Payout Box (PRD user story: see net earnings after commission upfront) */}
            <div className="bg-[#F0F2F4] border border-gray-300 rounded-[4px] p-4 mb-6 space-y-2 text-[13px]">
              <div className="flex justify-between text-[#555555]">
                <span>Gross Rental Bookings:</span>
                <span className="font-semibold text-[#212121]">${grossMonthly} / month</span>
              </div>
              <div className="flex justify-between text-[#555555]">
                <span>Twisted Road Commission (20%):</span>
                <span className="text-rose-700 font-medium">-${platformFee} (includes insurance & processing)</span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-gray-300">
                <span className="text-[15px] font-bold text-[#212121]">
                  Your Net Monthly Payout:
                </span>
                <span className="text-2xl font-bold text-[#A0844B]">
                  ${netMonthlyPayout}
                </span>
              </div>
              <div className="text-[11px] text-[#888888] pt-1">
                Estimated Annual Net Payout: <strong className="text-[#212121]">${estimatedAnnualNet.toLocaleString()} / year</strong>
              </div>
            </div>

            <button
              onClick={onOpenListModal}
              className="w-full bg-[#212121] hover:bg-[#333333] text-white font-semibold text-[14px] py-3 rounded-[4px] transition-colors cursor-pointer"
            >
              Start Your Free Listing
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
