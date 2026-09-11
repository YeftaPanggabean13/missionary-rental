import React, { useState, useMemo } from 'react';
import { Motorbike, BikeCategory } from '../types';
import { Star, MapPin, Gauge, ShieldCheck, Check, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

interface SearchAndBrowseProps {
  bikes: Motorbike[];
  onSelectBike: (bike: Motorbike) => void;
  initialCity?: string;
  initialCategory?: BikeCategory | 'All';
}

export const SearchAndBrowse: React.FC<SearchAndBrowseProps> = ({
  bikes,
  onSelectBike,
  initialCity = 'All',
  initialCategory = 'All'
}) => {
  const [selectedCity, setSelectedCity] = useState<string>(initialCity);
  const [selectedCategory, setSelectedCategory] = useState<BikeCategory | 'All'>(initialCategory);
  const [maxPrice, setMaxPrice] = useState<number>(250);
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'recommended' | 'price-low' | 'price-high' | 'rating'>('recommended');

  const categories: (BikeCategory | 'All')[] = [
    'All',
    'Adventure',
    'Cruiser',
    'Classic / Vintage',
    'Sport'
  ];

  const cities = ['All', 'Denver', 'Los Angeles', 'Austin', 'Phoenix', 'Nashville', 'Seattle'];

  const filteredBikes = useMemo(() => {
    return bikes.filter((bike) => {
      const matchCity = selectedCity === 'All' || bike.city.toLowerCase() === selectedCity.toLowerCase();
      const matchCategory = selectedCategory === 'All' || bike.category === selectedCategory;
      const matchPrice = bike.dailyRate <= maxPrice;
      const matchVerified = !verifiedOnly || bike.owner.verified;
      return matchCity && matchCategory && matchPrice && matchVerified;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.dailyRate - b.dailyRate;
      if (sortBy === 'price-high') return b.dailyRate - a.dailyRate;
      if (sortBy === 'rating') return b.owner.rating - a.owner.rating;
      return 0; // recommended order
    });
  }, [bikes, selectedCity, selectedCategory, maxPrice, verifiedOnly, sortBy]);

  return (
    <section className="py-14 bg-white border-b border-gray-200" id="browse">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-gray-200 gap-4">
          <div>
            <div className="text-[12px] font-bold uppercase tracking-wider text-[#A0844B] mb-1">
              PRD Screen 01 · Marketplace Directory
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#212121] tracking-tight">
              Browse Available Motorcycles
            </h2>
            <p className="text-[14px] text-[#555555] mt-1 max-w-xl">
              Locally owned and maintained. Rent direct from fellow riders with pre-authorized security deposits and verified protection.
            </p>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <span className="text-[#888888] font-medium">
              Showing <strong className="text-[#212121]">{filteredBikes.length}</strong> bikes
            </span>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="bg-[#F0F2F4] p-4 rounded-[6px] mb-8 border border-gray-200">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Category tabs */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[12px] font-semibold text-[#555555] mr-1 uppercase tracking-wider">
                Type:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-[13px] px-3 py-1.5 rounded-[4px] font-medium transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#212121] text-white'
                      : 'bg-white text-[#555555] hover:text-[#212121] hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* City pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[12px] font-semibold text-[#555555] mr-1 uppercase tracking-wider">
                City:
              </span>
              {cities.map((city) => (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className={`text-[12px] px-2.5 py-1 rounded-[3px] font-medium transition-colors cursor-pointer ${
                    selectedCity === city
                      ? 'bg-[#A0844B] text-white'
                      : 'bg-white text-[#555555] hover:text-[#212121] border border-gray-200'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {/* Secondary filter strip */}
          <div className="mt-4 pt-3 border-t border-gray-300/60 flex flex-wrap items-center justify-between gap-4 text-[13px]">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  className="rounded text-[#A0844B] focus:ring-[#A0844B] h-4 w-4"
                />
                <span className="font-medium text-[#212121] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#A0844B]" />
                  Verified Owners Only
                </span>
              </label>

              <div className="flex items-center gap-2">
                <span className="text-[#555555]">Max Daily Rate:</span>
                <input
                  type="range"
                  min="100"
                  max="250"
                  step="10"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="accent-[#A0844B] cursor-pointer w-24"
                />
                <span className="font-bold text-[#212121]">${maxPrice}/day</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#888888]" />
              <span className="text-[#555555]">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-gray-300 text-[#212121] text-[13px] rounded-[4px] px-2 py-1 font-medium focus:outline-none focus:border-[#A0844B]"
              >
                <option value="recommended">Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated Owners</option>
              </select>
            </div>
          </div>
        </div>

        {/* Motorcycle Grid: Desktop First 3-column / 2-column layout */}
        {filteredBikes.length === 0 ? (
          <div className="text-center py-16 bg-[#F0F2F4] rounded-[6px] p-8">
            <p className="text-[#555555] text-[16px] mb-3">No motorcycles match your current filter criteria.</p>
            <button
              onClick={() => {
                setSelectedCity('All');
                setSelectedCategory('All');
                setMaxPrice(250);
                setVerifiedOnly(false);
              }}
              className="bg-[#A0844B] text-white text-[13px] font-semibold px-4 py-2 rounded-[4px]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBikes.map((bike) => (
              <div
                key={bike.id}
                className="bg-white border border-gray-200 rounded-[6px] overflow-hidden hover:border-[#A0844B]/70 hover:shadow-lg transition-all duration-200 flex flex-col group"
                id={`bike-card-${bike.id}`}
              >
                {/* Photo container */}
                <div className="relative h-56 overflow-hidden bg-gray-100">
                  <img
                    src={bike.images[0]}
                    alt={`${bike.make} ${bike.model}`}
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  {/* Category chip */}
                  <div className="absolute top-3 left-3 bg-[#212121]/90 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-1 rounded-[3px] tracking-wide uppercase">
                    {bike.category}
                  </div>

                  {/* Rating badge */}
                  <div className="absolute top-3 right-3 bg-white text-[#212121] text-[12px] font-bold px-2 py-1 rounded-[3px] shadow-sm flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-[#A0844B] text-[#A0844B]" />
                    <span>{bike.owner.rating}</span>
                    <span className="text-[#888888] font-normal text-[11px]">({bike.owner.totalTrips})</span>
                  </div>

                  {/* Location badge */}
                  <div className="absolute bottom-3 left-3 bg-black/75 text-white text-[11px] font-medium px-2 py-0.5 rounded-[3px] flex items-center gap-1 backdrop-blur-xs">
                    <MapPin className="w-3 h-3 text-[#F8E01A]" />
                    <span>{bike.city}, {bike.state}</span>
                  </div>
                </div>

                {/* Bike Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Make & Model */}
                    <div className="text-[12px] font-semibold uppercase tracking-wider text-[#888888]">
                      {bike.year} {bike.make}
                    </div>
                    <h3 className="text-[18px] font-bold text-[#212121] group-hover:text-[#A0844B] transition-colors leading-tight mb-2">
                      {bike.model}
                    </h3>

                    {/* Technical micro badges */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      <span className="text-[11px] bg-[#F0F2F4] text-[#555555] font-medium px-2 py-0.5 rounded-[2px]">
                        {bike.engineDisplacement}
                      </span>
                      <span className="text-[11px] bg-[#F0F2F4] text-[#555555] font-medium px-2 py-0.5 rounded-[2px]">
                        {bike.horsepower}
                      </span>
                      <span className="text-[11px] bg-[#F0F2F4] text-[#555555] font-medium px-2 py-0.5 rounded-[2px]">
                        Seat: {bike.seatHeight}
                      </span>
                    </div>

                    {/* Owner summary with Verified badge */}
                    <div className="flex items-center gap-2.5 pt-3 border-t border-gray-100 mb-4">
                      <img
                        src={bike.owner.avatar}
                        alt={bike.owner.name}
                        className="w-7 h-7 rounded-full object-cover border border-gray-300"
                        referrerPolicy="no-referrer"
                      />
                      <div className="text-[12px] leading-tight flex-1">
                        <div className="flex items-center gap-1 font-semibold text-[#212121]">
                          <span>{bike.owner.name}</span>
                          {bike.owner.verified && (
                            <span className="inline-flex items-center gap-0.5 bg-emerald-50 text-emerald-700 text-[10px] px-1.5 py-0.2 rounded font-medium">
                              <Check className="w-2.5 h-2.5" /> Verified
                            </span>
                          )}
                        </div>
                        <span className="text-[#888888] text-[11px]">
                          Responds {bike.owner.responseTime} ({bike.owner.responseRate})
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing footer & Action Button */}
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-bold text-[#212121]">${bike.dailyRate}</span>
                        <span className="text-[12px] text-[#888888]">/ day</span>
                      </div>
                      <div className="text-[11px] text-[#555555] font-medium">
                        ${bike.securityDeposit} pre-auth deposit
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectBike(bike)}
                      className="bg-[#A0844B] hover:bg-[#8f743f] text-white text-[13px] font-semibold px-3.5 py-2 rounded-[4px] transition-colors cursor-pointer"
                    >
                      View & Book
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
