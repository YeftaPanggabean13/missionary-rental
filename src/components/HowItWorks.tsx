import React, { useState } from 'react';
import { Search, CalendarCheck, Camera, KeyRound, DollarSign, ShieldAlert, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onRentClick: () => void;
  onListClick: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onRentClick, onListClick }) => {
  const [activeAudience, setActiveAudience] = useState<'renter' | 'owner'>('renter');

  return (
    <section className="py-16 bg-white border-b border-gray-200" id="how-it-works">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-gray-200 gap-4">
          <div>
            <div className="text-[12px] font-bold uppercase tracking-wider text-[#A0844B] mb-1">
              Marketplace Mechanics
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#212121] tracking-tight">
              How Twisted Road Works
            </h2>
            <p className="text-[14px] text-[#555555] mt-1 max-w-xl">
              Straightforward peer-to-peer motorcycle rentals. No counter lines, no corporate upsells, and verified protection every mile.
            </p>
          </div>

          {/* Toggle Audience */}
          <div className="inline-flex bg-[#F0F2F4] p-1 rounded-[4px] border border-gray-200">
            <button
              onClick={() => setActiveAudience('renter')}
              className={`px-4 py-1.5 text-[13px] font-semibold rounded-[3px] transition-colors cursor-pointer ${
                activeAudience === 'renter'
                  ? 'bg-[#212121] text-white'
                  : 'text-[#555555] hover:text-[#212121]'
              }`}
            >
              For Riders (Renters)
            </button>
            <button
              onClick={() => setActiveAudience('owner')}
              className={`px-4 py-1.5 text-[13px] font-semibold rounded-[3px] transition-colors cursor-pointer ${
                activeAudience === 'owner'
                  ? 'bg-[#212121] text-white'
                  : 'text-[#555555] hover:text-[#212121]'
              }`}
            >
              For Motorcycle Owners
            </button>
          </div>
        </div>

        {/* Steps Grid */}
        {activeAudience === 'renter' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="p-6 bg-[#F0F2F4] rounded-[4px] border border-gray-200 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#A0844B] block mb-2">
                  Step 01
                </span>
                <div className="w-10 h-10 bg-white text-[#212121] rounded-[3px] flex items-center justify-center mb-4 border border-gray-200">
                  <Search className="w-5 h-5 text-[#A0844B]" />
                </div>
                <h3 className="text-[18px] font-bold text-[#212121] mb-2">
                  Browse Authentic Machines
                </h3>
                <p className="text-[14px] text-[#555555] leading-relaxed">
                  Search by city, dates, and style. Compare real motorcycle photos, technical specs, and verified owner ratings with transparent pricing.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-gray-300 text-[12px] text-[#888888]">
                Clear daily rates & pre-authorized deposit visible upfront.
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-6 bg-[#F0F2F4] rounded-[4px] border border-gray-200 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#A0844B] block mb-2">
                  Step 02
                </span>
                <div className="w-10 h-10 bg-white text-[#212121] rounded-[3px] flex items-center justify-center mb-4 border border-gray-200">
                  <CalendarCheck className="w-5 h-5 text-[#A0844B]" />
                </div>
                <h3 className="text-[18px] font-bold text-[#212121] mb-2">
                  Request to Book
                </h3>
                <p className="text-[14px] text-[#555555] leading-relaxed">
                  Submit your trip dates and motorcycle license details. The owner reviews and confirms within 24 hours. Your card is not charged until approved.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-gray-300 text-[12px] text-[#888888]">
                Select standard or premium comprehensive coverage.
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-6 bg-[#F0F2F4] rounded-[4px] border border-gray-200 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#A0844B] block mb-2">
                  Step 03
                </span>
                <div className="w-10 h-10 bg-white text-[#212121] rounded-[3px] flex items-center justify-center mb-4 border border-gray-200">
                  <Camera className="w-5 h-5 text-[#A0844B]" />
                </div>
                <h3 className="text-[18px] font-bold text-[#212121] mb-2">
                  Photo Inspection & Ride
                </h3>
                <p className="text-[14px] text-[#555555] leading-relaxed">
                  Meet the owner for a 5-minute handover inspection (photos, fuel, mileage). Confirm on your phone, grab the keys, and explore the open highway.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-gray-300 text-[12px] text-[#888888]">
                Deposit hold auto-released within 48h after return.
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="p-6 bg-[#F0F2F4] rounded-[4px] border border-gray-200 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#A0844B] block mb-2">
                  Step 01
                </span>
                <div className="w-10 h-10 bg-white text-[#212121] rounded-[3px] flex items-center justify-center mb-4 border border-gray-200">
                  <KeyRound className="w-5 h-5 text-[#A0844B]" />
                </div>
                <h3 className="text-[18px] font-bold text-[#212121] mb-2">
                  List Your Bike in ~5 Mins
                </h3>
                <p className="text-[14px] text-[#555555] leading-relaxed">
                  Upload a few clean photos, enter your bike's year and model, and set your own daily price. Set your availability calendar on your terms.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-gray-300 text-[12px] text-[#888888]">
                Free to list. No upfront subscription or listing fees.
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-6 bg-[#F0F2F4] rounded-[4px] border border-gray-200 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#A0844B] block mb-2">
                  Step 02
                </span>
                <div className="w-10 h-10 bg-white text-[#212121] rounded-[3px] flex items-center justify-center mb-4 border border-gray-200">
                  <CalendarCheck className="w-5 h-5 text-[#A0844B]" />
                </div>
                <h3 className="text-[18px] font-bold text-[#212121] mb-2">
                  Review & Approve Riders
                </h3>
                <p className="text-[14px] text-[#555555] leading-relaxed">
                  You approve every booking. Screen rider ratings, riding experience, and message them beforehand. Backed by our $1,000,000 liability policy.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-gray-300 text-[12px] text-[#888888]">
                Pre-authorized deposit locked on rider card before handover.
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-6 bg-[#F0F2F4] rounded-[4px] border border-gray-200 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#A0844B] block mb-2">
                  Step 03
                </span>
                <div className="w-10 h-10 bg-white text-[#212121] rounded-[3px] flex items-center justify-center mb-4 border border-gray-200">
                  <DollarSign className="w-5 h-5 text-[#A0844B]" />
                </div>
                <h3 className="text-[18px] font-bold text-[#212121] mb-2">
                  Direct Bank Payout (80% Net)
                </h3>
                <p className="text-[14px] text-[#555555] leading-relaxed">
                  Inspect the bike at return. Once condition is verified, payouts are triggered directly to your bank account with the transparent 20% fee deducted.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-gray-300 text-[12px] text-[#888888]">
                Payouts release within 24 hours of return sign-off.
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          {activeAudience === 'renter' ? (
            <button
              onClick={onRentClick}
              className="bg-[#A0844B] hover:bg-[#8f743f] text-white text-[14px] font-semibold px-6 py-3 rounded-[4px] inline-flex items-center gap-2 cursor-pointer"
            >
              Search Available Bikes
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onListClick}
              className="bg-[#A0844B] hover:bg-[#8f743f] text-white text-[14px] font-semibold px-6 py-3 rounded-[4px] inline-flex items-center gap-2 cursor-pointer"
            >
              List Your Motorcycle Today
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
