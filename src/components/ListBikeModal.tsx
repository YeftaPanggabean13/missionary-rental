import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, DollarSign, Camera, ArrowRight, Upload } from 'lucide-react';
import { BikeCategory } from '../types';

interface ListBikeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onListingCreated?: (listingData: any) => void;
}

export const ListBikeModal: React.FC<ListBikeModalProps> = ({ isOpen, onClose, onListingCreated }) => {
  if (!isOpen) return null;

  const [year, setYear] = useState('2023');
  const [make, setMake] = useState('Harley-Davidson');
  const [model, setModel] = useState('Low Rider S');
  const [category, setCategory] = useState<BikeCategory>('Cruiser');
  const [city, setCity] = useState('Denver');
  const [state, setState] = useState('CO');
  const [dailyRate, setDailyRate] = useState(145);
  const [ownerName, setOwnerName] = useState('John Miller');
  const [ownerEmail, setOwnerEmail] = useState('john.m@example.com');
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // 80% net payout
  const netDaily = Math.round(dailyRate * 0.80);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (onListingCreated) {
      onListingCreated({
        year,
        make,
        model,
        category,
        city,
        state,
        dailyRate,
        netDaily,
        ownerName
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="relative bg-white w-full max-w-2xl rounded-[6px] shadow-2xl border border-gray-300 overflow-hidden my-auto">
        {/* Header */}
        <div className="bg-[#212121] text-white px-5 py-4 flex items-center justify-between border-b border-[#333333]">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[#A0844B] font-bold">
              Owner Onboarding · Takes ~5 Minutes
            </div>
            <h3 className="text-lg font-bold text-white">
              List Your Motorcycle & Start Earning
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#B5B5B5] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold text-[#212121] mb-2">
                Listing Submitted for Verification!
              </h4>
              <p className="text-[14px] text-[#555555] mb-6 max-w-md mx-auto leading-relaxed">
                Your <strong>{year} {make} {model}</strong> is being reviewed by our trust team. You will receive booking requests at <strong>${dailyRate}/day (${netDaily} net to your bank account)</strong>.
              </p>

              <div className="bg-[#F0F2F4] p-4 rounded-[4px] text-left text-[13px] space-y-1.5 max-w-md mx-auto mb-6">
                <div className="flex justify-between">
                  <span className="text-[#555555]">Host:</span>
                  <span className="font-semibold text-[#212121]">{ownerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#555555]">Location:</span>
                  <span className="font-semibold text-[#212121]">{city}, {state}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#555555]">Insurance:</span>
                  <span className="text-emerald-700 font-semibold">$1,000,000 Master Policy Active</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="bg-[#A0844B] text-white px-6 py-2.5 rounded-[4px] text-[13px] font-semibold hover:bg-[#8e733e]"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-[13px] text-[#555555]">
                "Listing your motorcycle is easy and only takes around 5 minutes. You choose the price."
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#555555] mb-1">
                    Year
                  </label>
                  <input
                    type="number"
                    required
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full bg-[#F0F2F4] border border-gray-300 rounded-[3px] px-3 py-2 text-[14px] text-[#212121]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#555555] mb-1">
                    Make
                  </label>
                  <input
                    type="text"
                    required
                    value={make}
                    onChange={(e) => setMake(e.target.value)}
                    className="w-full bg-[#F0F2F4] border border-gray-300 rounded-[3px] px-3 py-2 text-[14px] text-[#212121]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#555555] mb-1">
                    Model
                  </label>
                  <input
                    type="text"
                    required
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="w-full bg-[#F0F2F4] border border-gray-300 rounded-[3px] px-3 py-2 text-[14px] text-[#212121]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#555555] mb-1">
                    Motorcycle Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as BikeCategory)}
                    className="w-full bg-[#F0F2F4] border border-gray-300 rounded-[3px] px-3 py-2 text-[14px] text-[#212121]"
                  >
                    <option value="Cruiser">Cruiser</option>
                    <option value="Adventure">Adventure / Dual-Sport</option>
                    <option value="Classic / Vintage">Classic / Vintage</option>
                    <option value="Sport">Sport / Standard</option>
                    <option value="Touring">Touring</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#555555] mb-1">
                    City, State
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="City"
                      className="bg-[#F0F2F4] border border-gray-300 rounded-[3px] px-3 py-2 text-[14px] text-[#212121]"
                    />
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="State (e.g. CO)"
                      className="bg-[#F0F2F4] border border-gray-300 rounded-[3px] px-3 py-2 text-[14px] text-[#212121]"
                    />
                  </div>
                </div>
              </div>

              {/* Price & Payout Box */}
              <div className="bg-[#F0F2F4] border border-gray-300 p-4 rounded-[4px]">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[12px] font-bold text-[#212121]">
                    Daily Rental Rate: ${dailyRate} / day
                  </label>
                  <span className="text-[12px] text-emerald-800 font-bold">
                    You Earn: ${netDaily} / day net (80%)
                  </span>
                </div>
                <input
                  type="range"
                  min="80"
                  max="250"
                  step="5"
                  value={dailyRate}
                  onChange={(e) => setDailyRate(Number(e.target.value))}
                  className="w-full accent-[#A0844B] cursor-pointer"
                />
                <span className="text-[11px] text-[#888888] block mt-1">
                  Twisted Road's 20% commission covers $1M liability insurance, credit card processing, and rider screening.
                </span>
              </div>

              {/* Photo Upload Simulation */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#555555] mb-1">
                  Photos (Right side, Left side, Front)
                </label>
                <button
                  type="button"
                  onClick={() => setPhotoUploaded(true)}
                  className={`w-full py-4 border-2 border-dashed rounded-[4px] text-center cursor-pointer transition-colors ${
                    photoUploaded
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-800'
                      : 'border-gray-300 bg-gray-50 text-[#555555] hover:bg-gray-100'
                  }`}
                >
                  <Camera className="w-6 h-6 mx-auto mb-1 text-[#A0844B]" />
                  <span className="text-[13px] font-semibold block">
                    {photoUploaded ? '✓ 4 Motorcycle Photos Attached' : 'Click to Upload Motorcycle Photos'}
                  </span>
                  <span className="text-[11px] text-[#888888]">
                    Natural sunlight, clean bike, clear profile shots
                  </span>
                </button>
              </div>

              {/* Owner Info */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <input
                    type="text"
                    required
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    placeholder="Your Full Name"
                    className="w-full bg-[#F0F2F4] border border-gray-300 rounded-[3px] px-3 py-2 text-[13px] text-[#212121]"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    required
                    value={ownerEmail}
                    onChange={(e) => setOwnerEmail(e.target.value)}
                    placeholder="Your Email Address"
                    className="w-full bg-[#F0F2F4] border border-gray-300 rounded-[3px] px-3 py-2 text-[13px] text-[#212121]"
                  />
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full bg-[#A0844B] hover:bg-[#8e743e] text-white font-bold py-3 rounded-[4px] text-[14px] transition-colors cursor-pointer shadow-sm"
                >
                  Publish Free Listing
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
