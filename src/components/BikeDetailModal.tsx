import React, { useState } from 'react';
import { Motorbike } from '../types';
import { X, Star, ShieldCheck, MapPin, Calendar, Check, AlertCircle, CheckCircle2, ChevronRight, Upload, Info, Heart } from 'lucide-react';

interface BikeDetailModalProps {
  bike: Motorbike | null;
  onClose: () => void;
  onRequestSubmitted: (bookingSummary: any) => void;
}

export const BikeDetailModal: React.FC<BikeDetailModalProps> = ({ bike, onClose, onRequestSubmitted }) => {
  if (!bike) return null;

  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'details' | 'booking'>('details');
  const [rentalDays, setRentalDays] = useState(3);
  const [insuranceTier, setInsuranceTier] = useState<'minimum' | 'standard' | 'premium'>('standard');
  const [pickupType, setPickupType] = useState<'pickup' | 'delivery'>('pickup');
  const [licenseUploaded, setLicenseUploaded] = useState(false);
  const [riderName, setRiderName] = useState('Alex Henderson');
  const [riderEmail, setRiderEmail] = useState('alex.rider@example.com');
  const [riderPhone, setRiderPhone] = useState('(303) 555-0192');
  const [licenseNumber, setLicenseNumber] = useState('CO-984421-M');
  const [step, setStep] = useState<'form' | 'success'>('form');

  // Pricing calculations
  const baseRental = bike.dailyRate * rentalDays;
  const insuranceRates = {
    minimum: 0,
    standard: 24 * rentalDays,
    premium: 38 * rentalDays
  };
  const insuranceCost = insuranceRates[insuranceTier];
  const deliveryCost = pickupType === 'delivery' ? 45 : 0;
  const totalChargedNow = baseRental + insuranceCost + deliveryCost;
  const preAuthDeposit = bike.securityDeposit;

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
    onRequestSubmitted({
      bike,
      rentalDays,
      totalChargedNow,
      preAuthDeposit,
      riderName,
      insuranceTier,
      pickupType
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 lg:p-6 animate-in fade-in duration-200">
      <div className="relative bg-white w-full max-w-4xl rounded-[6px] shadow-2xl border border-gray-300 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-[#212121] text-white px-5 py-3.5 flex items-center justify-between border-b border-[#333333]">
          <div className="flex items-center gap-2">
            <span className="text-[11px] uppercase tracking-wider bg-[#A0844B] text-white px-2 py-0.5 rounded-[2px] font-semibold">
              PRD Screen 02 & 03
            </span>
            <span className="text-[13px] text-[#B5B5B5]">
              {bike.year} {bike.make} {bike.model}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#B5B5B5] hover:text-white transition-colors cursor-pointer rounded"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Scrollable */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-6">
          {step === 'success' ? (
            <div className="text-center py-10 max-w-lg mx-auto">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-[#212121] mb-2">
                Booking Request Sent to {bike.owner.name}
              </h3>
              <p className="text-[14px] text-[#555555] mb-6 leading-relaxed">
                As per peer-to-peer marketplace guidelines, the owner will review your request within 24 hours. Your card will <strong>not</strong> be charged until the owner approves.
              </p>

              <div className="bg-[#F0F2F4] border border-gray-200 rounded-[4px] p-4 text-left text-[13px] space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-[#555555]">Motorcycle:</span>
                  <strong className="text-[#212121]">{bike.year} {bike.make} {bike.model}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#555555]">Rental Period:</span>
                  <span className="text-[#212121]">{rentalDays} Days (Trip Scheduled)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#555555]">Rental Subtotal:</span>
                  <span className="text-[#212121]">${totalChargedNow} (Pending Owner Approval)</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-300">
                  <span className="text-[#555555]">Pre-Auth Security Deposit:</span>
                  <span className="text-[#212121] font-semibold">${preAuthDeposit} (Hold upon pickup)</span>
                </div>
              </div>

              <div className="flex justify-center gap-3">
                <button
                  onClick={onClose}
                  className="bg-[#212121] text-white text-[13px] font-semibold px-5 py-2.5 rounded-[4px] hover:bg-[#333333]"
                >
                  Return to Marketplace
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Photos & Details (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                {/* Main Photo Gallery */}
                <div className="space-y-2">
                  <div className="relative h-64 sm:h-80 rounded-[4px] overflow-hidden bg-gray-900 border border-gray-200">
                    <img
                      src={bike.images[activePhotoIndex] || bike.images[0]}
                      alt={`${bike.make} ${bike.model}`}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-3 left-3 bg-black/75 text-white text-[12px] px-2.5 py-1 rounded-[3px] flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#F8E01A]" />
                      <span>{bike.city}, {bike.state}</span>
                    </div>
                  </div>

                  {/* Thumbnail Row */}
                  {bike.images.length > 1 && (
                    <div className="flex gap-2">
                      {bike.images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActivePhotoIndex(idx)}
                          className={`w-20 h-14 rounded-[3px] overflow-hidden border-2 cursor-pointer ${
                            activePhotoIndex === idx ? 'border-[#A0844B]' : 'border-transparent opacity-70 hover:opacity-100'
                          }`}
                        >
                          <img src={img} alt="Thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bike Description */}
                <div>
                  <h4 className="text-[15px] font-bold text-[#212121] mb-2 uppercase tracking-wide">
                    About This Motorcycle
                  </h4>
                  <p className="text-[14px] text-[#555555] leading-relaxed mb-4">
                    {bike.description}
                  </p>
                  <div className="bg-[#F0F2F4] p-3.5 rounded-[4px] text-[13px] text-[#555555]">
                    <strong className="text-[#212121] block mb-1">Owner Guidelines:</strong>
                    {bike.guidelines}
                  </div>
                </div>

                {/* Technical Specifications Table */}
                <div>
                  <h4 className="text-[15px] font-bold text-[#212121] mb-3 uppercase tracking-wide">
                    Machine Specifications
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-[12px]">
                    <div className="bg-gray-50 border border-gray-200 p-2.5 rounded-[3px]">
                      <span className="text-[#888888] block text-[11px]">Displacement</span>
                      <strong className="text-[#212121] text-[13px]">{bike.engineDisplacement}</strong>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 p-2.5 rounded-[3px]">
                      <span className="text-[#888888] block text-[11px]">Power Output</span>
                      <strong className="text-[#212121] text-[13px]">{bike.horsepower}</strong>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 p-2.5 rounded-[3px]">
                      <span className="text-[#888888] block text-[11px]">Seat Height</span>
                      <strong className="text-[#212121] text-[13px]">{bike.seatHeight}</strong>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 p-2.5 rounded-[3px]">
                      <span className="text-[#888888] block text-[11px]">Wet Weight</span>
                      <strong className="text-[#212121] text-[13px]">{bike.weight}</strong>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 p-2.5 rounded-[3px]">
                      <span className="text-[#888888] block text-[11px]">Transmission</span>
                      <strong className="text-[#212121] text-[13px]">{bike.transmission}</strong>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 p-2.5 rounded-[3px]">
                      <span className="text-[#888888] block text-[11px]">Category</span>
                      <strong className="text-[#212121] text-[13px]">{bike.category}</strong>
                    </div>
                  </div>
                </div>

                {/* Features list */}
                <div>
                  <h4 className="text-[15px] font-bold text-[#212121] mb-2 uppercase tracking-wide">
                    Included Equipment & Extras
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[13px] text-[#555555]">
                    {bike.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#A0844B] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Owner Profile Card (PRD Screen 2 requirement) */}
                <div className="border border-gray-200 rounded-[4px] p-4 bg-white">
                  <div className="flex items-start gap-3.5">
                    <img
                      src={bike.owner.avatar}
                      alt={bike.owner.name}
                      className="w-12 h-12 rounded-full object-cover border border-gray-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-[16px] font-bold text-[#212121] flex items-center gap-1.5">
                          {bike.owner.name}
                          {bike.owner.verified && (
                            <span className="bg-emerald-100 text-emerald-800 text-[11px] font-medium px-2 py-0.5 rounded-[2px] inline-flex items-center gap-0.5">
                              <Check className="w-3 h-3" /> Verified Owner
                            </span>
                          )}
                        </h4>
                        <div className="flex items-center gap-1 text-[13px] font-bold text-[#212121]">
                          <Star className="w-3.5 h-3.5 fill-[#A0844B] text-[#A0844B]" />
                          <span>{bike.owner.rating}</span>
                        </div>
                      </div>
                      <p className="text-[12px] text-[#888888] mb-2">
                        {bike.owner.memberSince} · {bike.owner.totalTrips} completed trips
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-[12px] text-[#555555] bg-[#F0F2F4] p-2.5 rounded-[3px]">
                        <div>
                          <span className="text-[#888888] block text-[10px]">Response Rate</span>
                          <strong>{bike.owner.responseRate}</strong>
                        </div>
                        <div>
                          <span className="text-[#888888] block text-[10px]">Response Time</span>
                          <strong>{bike.owner.responseTime}</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Pricing Breakdown & Checkout Form (5 cols) */}
              <div className="lg:col-span-5 bg-[#F0F2F4] border border-gray-200 rounded-[4px] p-5 flex flex-col justify-between">
                <form onSubmit={handleRequestSubmit} className="space-y-4">
                  <div>
                    <div className="flex items-baseline justify-between mb-1">
                      <span className="text-2xl font-bold text-[#212121]">
                        ${bike.dailyRate}
                      </span>
                      <span className="text-[13px] text-[#888888]">per day</span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[12px] text-emerald-800 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                      $1,000,000 liability insurance included
                    </span>
                  </div>

                  {/* Trip Duration Selector */}
                  <div className="border-t border-gray-300 pt-3">
                    <label className="block text-[12px] font-semibold text-[#555555] uppercase tracking-wider mb-1.5">
                      Trip Duration
                    </label>
                    <div className="grid grid-cols-4 gap-1.5 text-center text-[12px]">
                      {[1, 2, 3, 5].map((d) => (
                        <button
                          type="button"
                          key={d}
                          onClick={() => setRentalDays(d)}
                          className={`py-2 px-1 rounded-[3px] font-semibold border transition-colors cursor-pointer ${
                            rentalDays === d
                              ? 'bg-[#212121] text-white border-[#212121]'
                              : 'bg-white text-[#555555] border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          {d} {d === 1 ? 'Day' : 'Days'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Pickup or Delivery */}
                  <div>
                    <label className="block text-[12px] font-semibold text-[#555555] uppercase tracking-wider mb-1.5">
                      Handover Option
                    </label>
                    <div className="grid grid-cols-2 gap-2 text-[12px]">
                      <button
                        type="button"
                        onClick={() => setPickupType('pickup')}
                        className={`p-2 rounded-[3px] border text-left cursor-pointer ${
                          pickupType === 'pickup'
                            ? 'bg-white border-[#A0844B] shadow-xs'
                            : 'bg-white/60 border-gray-300 text-[#555555]'
                        }`}
                      >
                        <div className="font-semibold text-[#212121]">Pick up at Owner's</div>
                        <div className="text-[11px] text-[#888888]">Free · {bike.city}, {bike.state}</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPickupType('delivery')}
                        className={`p-2 rounded-[3px] border text-left cursor-pointer ${
                          pickupType === 'delivery'
                            ? 'bg-white border-[#A0844B] shadow-xs'
                            : 'bg-white/60 border-gray-300 text-[#555555]'
                        }`}
                      >
                        <div className="font-semibold text-[#212121]">Airport Delivery</div>
                        <div className="text-[11px] text-[#888888]">+$45 one-time dropoff</div>
                      </button>
                    </div>
                  </div>

                  {/* Insurance tier selector */}
                  <div>
                    <label className="block text-[12px] font-semibold text-[#555555] uppercase tracking-wider mb-1.5">
                      Physical Damage Coverage Tier
                    </label>
                    <div className="space-y-1.5 text-[12px]">
                      <label className="flex items-center justify-between p-2 rounded-[3px] bg-white border border-gray-300 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="insurance"
                            checked={insuranceTier === 'minimum'}
                            onChange={() => setInsuranceTier('minimum')}
                            className="text-[#A0844B]"
                          />
                          <div>
                            <span className="font-semibold text-[#212121]">State Minimum Liability</span>
                            <span className="text-[11px] text-[#888888] block">$2,500 damage deductible</span>
                          </div>
                        </div>
                        <span className="font-semibold text-[#212121]">Included</span>
                      </label>

                      <label className="flex items-center justify-between p-2 rounded-[3px] bg-white border border-[#A0844B] shadow-xs cursor-pointer">
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="insurance"
                            checked={insuranceTier === 'standard'}
                            onChange={() => setInsuranceTier('standard')}
                            className="text-[#A0844B]"
                          />
                          <div>
                            <span className="font-semibold text-[#212121]">Standard Comprehensive</span>
                            <span className="text-[11px] text-[#888888] block">$1,000 deductible + Roadside</span>
                          </div>
                        </div>
                        <span className="font-semibold text-[#212121]">+$24/day</span>
                      </label>

                      <label className="flex items-center justify-between p-2 rounded-[3px] bg-white border border-gray-300 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="insurance"
                            checked={insuranceTier === 'premium'}
                            onChange={() => setInsuranceTier('premium')}
                            className="text-[#A0844B]"
                          />
                          <div>
                            <span className="font-semibold text-[#212121]">Peace of Mind Premium</span>
                            <span className="text-[11px] text-[#888888] block">$500 low deductible + VIP assist</span>
                          </div>
                        </div>
                        <span className="font-semibold text-[#212121]">+$38/day</span>
                      </label>
                    </div>
                  </div>

                  {/* Rider Verification fields */}
                  <div className="border-t border-gray-300 pt-3">
                    <label className="block text-[12px] font-semibold text-[#555555] uppercase tracking-wider mb-2">
                      Rider License Information
                    </label>
                    <div className="space-y-2 text-[12px]">
                      <div>
                        <input
                          type="text"
                          required
                          value={riderName}
                          onChange={(e) => setRiderName(e.target.value)}
                          placeholder="Legal Full Name on License"
                          className="w-full bg-white border border-gray-300 rounded-[3px] px-2.5 py-1.5 text-[#212121]"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          required
                          value={riderEmail}
                          onChange={(e) => setRiderEmail(e.target.value)}
                          placeholder="Email Address"
                          className="w-full bg-white border border-gray-300 rounded-[3px] px-2.5 py-1.5 text-[#212121]"
                        />
                        <input
                          type="text"
                          required
                          value={licenseNumber}
                          onChange={(e) => setLicenseNumber(e.target.value)}
                          placeholder="Motorcycle Endorsement #"
                          className="w-full bg-white border border-gray-300 rounded-[3px] px-2.5 py-1.5 text-[#212121]"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => setLicenseUploaded(true)}
                        className={`w-full py-1.5 px-2 rounded-[3px] border text-center flex items-center justify-center gap-1.5 cursor-pointer ${
                          licenseUploaded
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                            : 'bg-white border-dashed border-gray-400 text-[#555555] hover:bg-gray-50'
                        }`}
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>{licenseUploaded ? '✓ License Front/Back Verified' : 'Upload Motorcycle License Photos'}</span>
                      </button>
                    </div>
                  </div>

                  {/* PRD User Story & Transparent Total Summary */}
                  <div className="border-t border-gray-300 pt-3 space-y-1.5 text-[13px]">
                    <div className="flex justify-between text-[#555555]">
                      <span>${bike.dailyRate} × {rentalDays} days</span>
                      <span className="text-[#212121]">${baseRental}</span>
                    </div>
                    {insuranceCost > 0 && (
                      <div className="flex justify-between text-[#555555]">
                        <span>Protection Tier</span>
                        <span className="text-[#212121]">+${insuranceCost}</span>
                      </div>
                    )}
                    {deliveryCost > 0 && (
                      <div className="flex justify-between text-[#555555]">
                        <span>Airport Handover Delivery</span>
                        <span className="text-[#212121]">+${deliveryCost}</span>
                      </div>
                    )}

                    <div className="flex justify-between font-bold text-[#212121] text-[15px] pt-2 border-t border-gray-300">
                      <span>Total Rental Fee</span>
                      <span>${totalChargedNow}</span>
                    </div>

                    {/* Security Deposit Pre-Auth Notice (PRD requirement) */}
                    <div className="bg-[#FFFFFF] border border-amber-300 p-2.5 rounded-[4px] mt-2">
                      <div className="flex items-start gap-1.5 text-[11px] text-[#555555]">
                        <Info className="w-4 h-4 text-[#A0844B] shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-[#212121] block font-semibold">
                            Security Deposit: ${preAuthDeposit} (Pre-authorization Hold)
                          </strong>
                          Held on card during rental, not charged upfront. Automatically released within 48h after return inspection confirms condition.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit Request Button */}
                  <button
                    type="submit"
                    className="w-full bg-[#F8E01A] hover:bg-[#e6d018] text-[#212121] font-bold text-[14px] py-3 rounded-[4px] transition-colors shadow-sm cursor-pointer mt-2"
                  >
                    Request to Book ({bike.owner.name} Approves)
                  </button>

                  <p className="text-[11px] text-[#888888] text-center">
                    You won't be charged until {bike.owner.name} formally confirms your booking request.
                  </p>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
