import React, { useState } from 'react';
import { Camera, Fuel, Gauge, CheckCircle2, ShieldCheck, AlertTriangle, Smartphone, ArrowRight } from 'lucide-react';

export const InspectionWalkthrough: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [inspectionMode, setInspectionMode] = useState<'handover' | 'return'>('handover');

  const inspectionSteps = [
    {
      id: 'photos',
      title: '360° Photo Walkaround',
      icon: Camera,
      tag: 'Mandatory Dispute Protection',
      description: 'Before the kickstand goes up, both owner and rider snap 4 quick angles: front tire/fairing, left engine/exhaust, right saddle/controls, and rear tail.',
      actionDetail: 'High-res photos are immediately hashed with GPS and timestamp to lock in condition.',
      previewData: {
        status: '4/4 Angles Captured',
        items: ['Front Fork & Fairing (Clear)', 'Exhaust & Pegs (No Rash)', 'Tank & Handlebars (Clear)', 'Rear Tire & Plate (Logged)']
      }
    },
    {
      id: 'fuel',
      title: 'Fuel Level Confirmation',
      icon: Fuel,
      tag: 'No Fuel Dispute Policy',
      description: 'Record the exact fuel gauge reading on departure. The rider returns the machine at the identical level or pays standard local pump rate with no markup.',
      actionDetail: 'Recorded: 100% Full (91 Octane Premium)',
      previewData: {
        status: 'Fuel Confirmed Full',
        items: ['Fuel Type: 91+ Octane Premium', 'Starting Tank: Full (100%)', 'Return Tank Requirement: Full']
      }
    },
    {
      id: 'odometer',
      title: 'Odometer & Mileage Baseline',
      icon: Gauge,
      tag: 'Transparent Mileage',
      description: 'A close-up photo of the digital dashboard odometer establishes the departure mileage. Most rentals include 200 miles/day free of charge.',
      actionDetail: 'Departure Odometer: 8,420 miles',
      previewData: {
        status: 'Odometer Verified',
        items: ['Included Mileage: 600 miles (3 days)', 'Excess Rate: $0.35/mile', 'Tire Wear Check: Passed (5mm tread)']
      }
    },
    {
      id: 'signoff',
      title: 'Dual Digital Confirmation',
      icon: CheckCircle2,
      tag: 'Deposit Lock & Release',
      description: 'Both the owner and rider tap "Confirm Handover" on their phones. At return, the identical checklist unlocks the pre-authorized security deposit within 48h.',
      actionDetail: 'Signatures logged with time-stamped hash.',
      previewData: {
        status: 'Both Parties Confirmed',
        items: ['Owner Signature: Marcus T. (10:14 AM)', 'Renter Signature: Alex H. (10:15 AM)', 'Security Deposit: Pre-Auth Held Active']
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
            <Camera className="w-4 h-4" />
            PRD Screen 04 · Handover Inspection Protocol
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#212121] tracking-tight">
            Mandatory Photo Inspection At Handover & Return
          </h2>
          <p className="text-[15px] text-[#555555] mt-2">
            Dispute protection for both sides. Renters are protected from pre-existing blemishes; owners are protected against damage before security deposit release.
          </p>

          {/* Toggle between Handover and Return mode */}
          <div className="inline-flex bg-[#F0F2F4] p-1 rounded-[4px] mt-6 border border-gray-200">
            <button
              onClick={() => setInspectionMode('handover')}
              className={`px-4 py-1.5 text-[13px] font-semibold rounded-[3px] transition-colors cursor-pointer ${
                inspectionMode === 'handover' ? 'bg-[#212121] text-white' : 'text-[#555555] hover:text-[#212121]'
              }`}
            >
              Handover Inspection (Pickup)
            </button>
            <button
              onClick={() => setInspectionMode('return')}
              className={`px-4 py-1.5 text-[13px] font-semibold rounded-[3px] transition-colors cursor-pointer ${
                inspectionMode === 'return' ? 'bg-[#212121] text-white' : 'text-[#555555] hover:text-[#212121]'
              }`}
            >
              Return Inspection (Deposit Release)
            </button>
          </div>
        </div>

        {/* Interactive inspection interactive box */}
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
                          Step 0{idx + 1}
                        </span>
                        {isSelected && (
                          <span className="text-[10px] bg-[#A0844B]/15 text-[#886a34] font-semibold px-1.5 py-0.2 rounded">
                            Active Step
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
                      {inspectionMode === 'handover' ? 'Pre-Ride Checklist' : 'Post-Ride Return Verification'}
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

              {/* Checklist checklist items */}
              <div className="space-y-2 bg-[#F0F2F4] p-4 rounded-[4px] mb-5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#555555] mb-1">
                  Verification Records:
                </div>
                {current.previewData.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-[13px]">
                    <span className="text-[#212121] font-medium flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#A0844B]"></span>
                      {item}
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Verified
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
                  Next Step <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
