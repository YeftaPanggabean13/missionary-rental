import React, { useState, useMemo } from 'react';
import { Motorbike, BikeCategory } from '../types';
import { Star, MapPin, Gauge, ShieldCheck, Check, SlidersHorizontal, ArrowUpDown, Fuel, Luggage } from 'lucide-react';

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
  const [selectedArea, setSelectedArea] = useState<string>(initialCity);
  const [selectedCategory, setSelectedCategory] = useState<BikeCategory | 'All'>(initialCategory);
  const [maxPrice, setMaxPrice] = useState<number>(150000);
  const [sortBy, setSortBy] = useState<'recommended' | 'price-low' | 'price-high' | 'rating'>('recommended');

  const categories: (BikeCategory | 'All')[] = [
    'All',
    'Matic Harian',
    'Maxi Scooter'
  ];

  const areas = ['All', 'Stasiun Bandung', 'Dago', 'Lembang', 'Pasteur', 'Braga', 'Ciwidey'];

  const filteredBikes = useMemo(() => {
    return bikes.filter((bike) => {
      const matchArea = selectedArea === 'All' || bike.area.toLowerCase().includes(selectedArea.toLowerCase());
      const matchCategory = selectedCategory === 'All' || bike.category === selectedCategory;
      const matchPrice = bike.dailyRate <= maxPrice;
      return matchArea && matchCategory && matchPrice;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.dailyRate - b.dailyRate;
      if (sortBy === 'price-high') return b.dailyRate - a.dailyRate;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // recommended order
    });
  }, [bikes, selectedArea, selectedCategory, maxPrice, sortBy]);

  return (
    <section className="py-14 bg-white border-b border-gray-200" id="browse">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-gray-200 gap-4">
          <div>
            <div className="text-[12px] font-bold uppercase tracking-wider text-[#A0844B] mb-1">
              Katalog Armada Misionary Bandung
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#212121] tracking-tight">
              Pilihan Motor Siap Pakai di Bandung
            </h2>
            <p className="text-[14px] text-[#555555] mt-1 max-w-xl">
              Unit bersih, mesin halus, servis rutin. Gratis 2 helm SNI bersih, jas hujan, phone holder, dan bensin awal.
            </p>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <span className="text-[#888888] font-medium">
              Tersedia <strong className="text-[#212121]">{filteredBikes.length}</strong> unit motor
            </span>
          </div>
        </div>

        {/* Filters and Controls with original colors */}
        <div className="bg-[#F0F2F4] p-4 rounded-[6px] mb-8 border border-gray-200">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Category tabs */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[12px] font-semibold text-[#555555] mr-1 uppercase tracking-wider">
                Jenis:
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
                  {cat === 'All' ? 'Semua Kategori' : cat}
                </button>
              ))}
            </div>

            {/* Area pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[12px] font-semibold text-[#555555] mr-1 uppercase tracking-wider">
                Area:
              </span>
              {areas.map((area) => (
                <button
                  key={area}
                  onClick={() => setSelectedArea(area)}
                  className={`text-[12px] px-2.5 py-1 rounded-[3px] font-medium transition-colors cursor-pointer ${
                    selectedArea === area
                      ? 'bg-[#A0844B] text-white'
                      : 'bg-white text-[#555555] hover:text-[#212121] border border-gray-200'
                  }`}
                >
                  {area === 'All' ? 'Semua Area' : area}
                </button>
              ))}
            </div>
          </div>

          {/* Secondary filter strip */}
          <div className="mt-4 pt-3 border-t border-gray-300/60 flex flex-wrap items-center justify-between gap-4 text-[13px]">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-[#555555]">Maks. Tarif:</span>
                <input
                  type="range"
                  min="85000"
                  max="150000"
                  step="5000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="accent-[#A0844B] cursor-pointer w-28"
                />
                <span className="font-bold text-[#212121]">Rp {maxPrice.toLocaleString('id-ID')}/hari</span>
              </div>

              <div className="hidden sm:flex items-center gap-1 text-[#555555] text-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#A0844B]" />
                <span>Termasuk STNK Resmi & Bensin Awal</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#888888]" />
              <span className="text-[#555555]">Urutkan:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-gray-300 text-[#212121] text-[13px] rounded-[4px] px-2 py-1 font-medium focus:outline-none focus:border-[#A0844B]"
              >
                <option value="recommended">Rekomendasi Misionary</option>
                <option value="price-low">Tarif: Terendah ke Tertinggi</option>
                <option value="price-high">Tarif: Tertinggi ke Terendah</option>
                <option value="rating">Rating Wisatawan Tertinggi</option>
              </select>
            </div>
          </div>
        </div>

        {/* Motorcycle Grid: Desktop First 3-column / 2-column layout */}
        {filteredBikes.length === 0 ? (
          <div className="text-center py-16 bg-[#F0F2F4] rounded-[6px] p-8">
            <p className="text-[#555555] text-[16px] mb-3">Tidak ada unit motor yang sesuai dengan filter pencarian Anda.</p>
            <button
              onClick={() => {
                setSelectedArea('All');
                setSelectedCategory('All');
                setMaxPrice(300000);
              }}
              className="bg-[#A0844B] text-white text-[13px] font-semibold px-4 py-2 rounded-[4px]"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBikes.map((bike) => (
              <div
                key={bike.id}
                className="bg-white border border-gray-200 rounded-[6px] overflow-hidden hover:border-[#A0844B] hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
                id={`bike-card-${bike.id}`}
              >
                <div>
                  {/* Photo container */}
                  <div className="relative h-56 overflow-hidden bg-gray-100">
                    <img
                      src={bike.images[0]}
                      alt={`${bike.make} ${bike.model}`}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 right-3 bg-[#212121]/85 text-white text-[12px] font-bold px-2.5 py-1 rounded-[3px] flex items-center gap-1">
                      <Star className="w-3 h-3 fill-[#F8E01A] text-[#F8E01A]" />
                      <span>{bike.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  {/* Bike Card Body */}
                  <div className="p-5">
                    <div className="flex items-center justify-between text-[12px] text-[#888888] mb-1 font-medium">
                      <span>{bike.category}</span>
                      <span>{bike.area}</span>
                    </div>

                    <h3 className="text-[18px] font-bold text-[#212121] group-hover:text-[#A0844B] transition-colors leading-tight mb-2">
                      {bike.make} {bike.model}
                    </h3>

                    {/* Clean specs line instead of micro badges */}
                    <p className="text-[13px] text-[#555555] mb-3">
                      {bike.engineDisplacement} · {bike.transmission}
                    </p>

                    <p className="text-[12px] text-[#555555] line-clamp-2 leading-relaxed mb-3">
                      {bike.description}
                    </p>

                    {/* Facilities summary */}
                    <div className="pt-3 border-t border-gray-100 text-[12px] text-[#555555]">
                      <div className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-[#A0844B] shrink-0" />
                        <span>2 Helm SNI Bersih, Jas Hujan & Phone Holder</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pricing footer & Action Button */}
                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-bold text-[#212121]">
                          Rp {bike.dailyRate.toLocaleString('id-ID')}
                        </span>
                        <span className="text-[12px] text-[#888888]">/ hari</span>
                      </div>
                      <div className="text-[11px] text-[#555555]">
                        {bike.depositInfo}
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectBike(bike)}
                      className="bg-[#A0844B] hover:bg-[#8f743f] text-white text-[13px] font-semibold px-4 py-2 rounded-[4px] transition-colors cursor-pointer"
                    >
                      Pilih & Sewa
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
