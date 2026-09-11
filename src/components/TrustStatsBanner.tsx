import React from 'react';
import { ShieldCheck, Camera, CreditCard, UserCheck, Wrench, Clock } from 'lucide-react';

export const TrustStatsBanner: React.FC = () => {
  return (
    <section className="bg-white border-b border-gray-200 py-10" id="safety">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Pillar 1 */}
          <div className="flex items-start gap-3.5 p-3 rounded-[4px]">
            <div className="p-2.5 bg-[#F0F2F4] text-[#A0844B] rounded-[4px] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-[15px] font-bold text-[#212121] mb-1">
                $1,000,000 Liability
              </h3>
              <p className="text-[13px] text-[#555555] leading-snug">
                Every rental includes state liability coverage plus physical collision and damage protection.
              </p>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="flex items-start gap-3.5 p-3 rounded-[4px]">
            <div className="p-2.5 bg-[#F0F2F4] text-[#A0844B] rounded-[4px] shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-[15px] font-bold text-[#212121] mb-1">
                Pre-Authorized Deposits
              </h3>
              <p className="text-[13px] text-[#555555] leading-snug">
                Security deposit is a temporary card hold, not a charge. Released within 48h of return.
              </p>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="flex items-start gap-3.5 p-3 rounded-[4px]">
            <div className="p-2.5 bg-[#F0F2F4] text-[#A0844B] rounded-[4px] shrink-0">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-[15px] font-bold text-[#212121] mb-1">
                Mandatory Photo Inspection
              </h3>
              <p className="text-[13px] text-[#555555] leading-snug">
                4-point photo check before takeoff protects both parties from pre-existing blemishes.
              </p>
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="flex items-start gap-3.5 p-3 rounded-[4px]">
            <div className="p-2.5 bg-[#F0F2F4] text-[#A0844B] rounded-[4px] shrink-0">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-[15px] font-bold text-[#212121] mb-1">
                Verified Riders & Owners
              </h3>
              <p className="text-[13px] text-[#555555] leading-snug">
                Direct peer verification, motorcycle license endorsement screening, and MVR background checks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
