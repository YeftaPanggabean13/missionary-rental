import React, { useState } from 'react';
import { Search, Calendar, MapPin, ShieldCheck, ChevronRight, CheckCircle2, ArrowRight } from 'lucide-react';
import { BikeCategory } from '../types';

interface HeroProps {
  onSearch: (city: string, category: BikeCategory | 'All', dateRange: string) => void;
  onLearnMore: () => void;
  onOpenListModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearch, onLearnMore, onOpenListModal }) => {
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<BikeCategory | 'All'>('All');
  const [dateRange, setDateRange] = useState<string>('Weekend (Fri - Sun)');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(selectedCity, selectedCategory, dateRange);
  };

  return (
    <section className="relative bg-[#212121] text-white min-h-[580px] lg:min-h-[640px] flex items-center overflow-hidden" id="hero">
      {/* Authentic motorcycle lifestyle photograph */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=2000&q=85"
          alt="Rider on open highway with adventure motorcycle"
          className="w-full h-full object-cover object-center transform scale-102"
          referrerPolicy="no-referrer"
        />
        {/* Subtle dark overlay as specified by Twisted Road brand guidelines */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#212121]/92 via-[#212121]/80 to-[#212121]/60"></div>
        <div className="absolute inset-0 bg-black/25"></div>
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
        <div className="max-w-3xl">
          {/* Authentic brand tag */}
          <div className="inline-flex items-center gap-2 bg-[#181818]/80 border border-[#444444] px-3 py-1 rounded-[3px] mb-5 text-[12px] uppercase tracking-wider text-[#B5B5B5]">
            <span className="w-2 h-2 rounded-full bg-[#A0844B]"></span>
            <span>Peer-To-Peer Motorcycle Marketplace</span>
          </div>

          {/* White headline: bold, high contrast, direct */}
          <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-white tracking-tight leading-[1.15] mb-4">
            Rent Real Motorcycles From Local Owners
          </h1>

          {/* Short functional supporting text */}
          <p className="text-[16px] sm:text-[18px] text-[#E0E0E0] leading-relaxed mb-8 max-w-2xl">
            Hit the open road on authentic machines across the country. Transparent pricing, pre-authorized security deposits, and verified photo inspection on every trip.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <a
              href="#browse"
              className="bg-[#A0844B] hover:bg-[#8f743f] text-white text-[14px] font-semibold px-6 py-3 rounded-[4px] transition-colors inline-flex items-center gap-2 shadow-sm cursor-pointer"
              id="hero-primary-cta"
            >
              Find a Motorcycle
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={onLearnMore}
              className="text-[#E0E0E0] hover:text-white text-[14px] font-medium px-4 py-3 border border-white/30 hover:border-white rounded-[4px] transition-colors inline-flex items-center gap-1.5 cursor-pointer bg-[#212121]/40"
              id="hero-how-it-works-link"
            >
              How does it work?
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenListModal}
              className="text-[14px] font-medium text-[#B5B5B5] hover:text-white underline underline-offset-4 decoration-[#A0844B] px-2 py-2 cursor-pointer transition-colors"
            >
              Own a bike? Earn up to $800/mo
            </button>
          </div>
        </div>

        {/* PRD Screen 1 Search Engine Box: Desktop First, functional, high contrast */}
        <div className="bg-white text-[#212121] rounded-[6px] p-4 sm:p-5 shadow-2xl border border-gray-200 mt-2 max-w-4xl" id="hero-search-box">
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 items-end">
            {/* Location selector */}
            <div>
              <label className="block text-[12px] font-semibold uppercase tracking-wider text-[#555555] mb-1">
                Location / City
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-[#A0844B] absolute left-3 top-3 pointer-events-none" />
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full bg-[#F0F2F4] border border-gray-300 text-[#212121] text-[14px] rounded-[4px] pl-9 pr-3 py-2.5 focus:outline-none focus:border-[#A0844B] transition-colors"
                  id="search-city-select"
                >
                  <option value="All">All US Locations</option>
                  <option value="Denver">Denver, CO (Rocky Mountains)</option>
                  <option value="Los Angeles">Los Angeles, CA (Pacific Coast)</option>
                  <option value="Austin">Austin, TX (Hill Country)</option>
                  <option value="Phoenix">Phoenix, AZ (Desert Southwest)</option>
                  <option value="Nashville">Nashville, TN (Natchez Trace)</option>
                  <option value="Seattle">Seattle, WA (Pacific Northwest)</option>
                </select>
              </div>
            </div>

            {/* Bike Type */}
            <div>
              <label className="block text-[12px] font-semibold uppercase tracking-wider text-[#555555] mb-1">
                Motorcycle Style
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as BikeCategory | 'All')}
                className="w-full bg-[#F0F2F4] border border-gray-300 text-[#212121] text-[14px] rounded-[4px] px-3 py-2.5 focus:outline-none focus:border-[#A0844B] transition-colors"
                id="search-category-select"
              >
                <option value="All">All Categories</option>
                <option value="Cruiser">Cruiser (Harley, Indian)</option>
                <option value="Adventure">Adventure / Dual-Sport (BMW, Ducati)</option>
                <option value="Classic / Vintage">Classic / Heritage (Triumph)</option>
                <option value="Sport">Sport / Standard (Yamaha)</option>
                <option value="Touring">Touring</option>
              </select>
            </div>

            {/* Dates */}
            <div>
              <label className="block text-[12px] font-semibold uppercase tracking-wider text-[#555555] mb-1">
                Rental Duration
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-[#A0844B] absolute left-3 top-3 pointer-events-none" />
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full bg-[#F0F2F4] border border-gray-300 text-[#212121] text-[14px] rounded-[4px] pl-9 pr-3 py-2.5 focus:outline-none focus:border-[#A0844B] transition-colors"
                  id="search-date-select"
                >
                  <option value="Single Day Ride (24 hrs)">Single Day Ride (24 hrs)</option>
                  <option value="Weekend (Fri - Sun)">Weekend (Fri - Sun)</option>
                  <option value="4-Day Road Trip">4-Day Road Trip</option>
                  <option value="Full Week Tour (7 days)">Full Week Tour (7 days)</option>
                </select>
              </div>
            </div>

            {/* Search Action: Bright Yellow #F8E01A for immediate-attention CTA */}
            <div>
              <button
                type="submit"
                className="w-full bg-[#F8E01A] hover:bg-[#e7d117] text-[#212121] font-bold text-[14px] py-2.5 px-4 rounded-[4px] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                id="search-submit-btn"
              >
                <Search className="w-4 h-4" />
                Search Bikes
              </button>
            </div>
          </form>

          {/* Micro trust note beneath search */}
          <div className="mt-3 pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between text-[12px] text-[#555555] gap-2">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#A0844B]" />
              <strong>Request-to-Book:</strong> Owner confirms reservation within 24h
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#A0844B]" />
              <strong>Security Deposit:</strong> Pre-auth hold only, never charged upfront
            </span>
            <span className="hidden md:inline text-[#888888]">
              No hidden cancellation fees
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
