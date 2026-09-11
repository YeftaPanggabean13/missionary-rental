import React, { useState } from 'react';
import { Menu, X, Search, Globe, ChevronDown, MessageCircle } from 'lucide-react';
import missionaryLogoWhite from '../img/missionary-horizontal-white.png';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  onOpenListModal: () => void;
  onSearch?: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, onOpenListModal, onSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
    onNavigate('browse');
    setMobileMenuOpen(false);
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('Halo Admin Misionary Rental Motor Bandung, saya ingin tanya ketersediaan unit motor...');
    window.open(`https://wa.me/6281234567890?text=${message}`, '_blank');
  };

  return (
    <header className="sticky top-0 z-50 bg-[#212121] text-white border-b border-[#333333] shadow-md">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-4">
          {/* Left: Brand logo + Search Pill */}
          <div className="flex items-center gap-6 lg:gap-8 flex-1">
            <button
              onClick={() => handleNavClick('hero')}
              className="text-left cursor-pointer flex items-center shrink-0 group py-1"
              id="header-brand-logo"
              title="Misionary Rental Motor Bandung"
            >
              <img
                src={missionaryLogoWhite}
                alt="Misionary Rental Motor Bandung"
                className="h-8 sm:h-9 w-auto object-contain transition-opacity group-hover:opacity-85"
              />
            </button>

            {/* Pill Search Bar (exactly matching screenshot) */}
            <form
              onSubmit={handleSearchSubmit}
              className="hidden md:flex items-center bg-[#2a2a2a] border border-[#444444] rounded-full pl-3.5 pr-1 py-1 focus-within:border-[#A0844B] transition-colors w-72 lg:w-96"
            >
              <Globe className="w-4 h-4 text-[#888888] shrink-0 mr-2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari lokasi atau motor di Bandung..."
                className="bg-transparent text-white text-[13px] placeholder-[#888888] focus:outline-none w-full"
              />
              <button
                type="submit"
                className="w-7 h-7 rounded-full bg-[#F8E01A] hover:bg-[#e7d117] text-[#212121] flex items-center justify-center shrink-0 cursor-pointer transition-colors"
                aria-label="Cari"
              >
                <Search className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </form>
          </div>

          {/* Right: Nav items matching screenshot */}
          <div className="hidden lg:flex items-center gap-6 text-[14px] font-semibold">
            {/* Yellow CTA Button like 'Calculate Earnings' in screenshot */}
            <button
              onClick={() => handleNavClick('browse')}
              className="bg-[#F8E01A] hover:bg-[#e7d117] text-[#212121] font-bold text-[13px] px-4 py-2 rounded-[4px] transition-colors cursor-pointer shadow-xs"
            >
              Pesan Motor
            </button>

            <button
              onClick={onOpenListModal}
              className="text-[#E0E0E0] hover:text-white transition-colors cursor-pointer"
            >
              Titip Motor
            </button>

            <button
              onClick={() => handleNavClick('browse')}
              className="text-[#E0E0E0] hover:text-white transition-colors cursor-pointer"
            >
              Pilihan Motor
            </button>

            <button
              onClick={() => handleNavClick('how-it-works')}
              className="text-[#E0E0E0] hover:text-white transition-colors cursor-pointer flex items-center gap-1"
            >
              Cara Sewa
              <ChevronDown className="w-3.5 h-3.5 text-[#888888]" />
            </button>

            <button
              onClick={handleWhatsAppClick}
              className="text-[#E0E0E0] hover:text-white transition-colors cursor-pointer"
            >
              WhatsApp
            </button>

            {/* Language/Globe icon */}
            <div className="flex items-center text-[#B5B5B5] hover:text-white cursor-pointer gap-1 text-[13px]">
              <Globe className="w-4 h-4" />
              <span>IDR</span>
            </div>
          </div>

          {/* Mobile hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => handleNavClick('browse')}
              className="bg-[#F8E01A] text-[#212121] font-bold text-[12px] px-3 py-1.5 rounded-[4px]"
            >
              Pesan Motor
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:text-[#A0844B] focus:outline-none"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#1c1c1c] border-b border-[#333333] px-4 pt-3 pb-6 space-y-3">
          {/* Mobile search */}
          <form onSubmit={handleSearchSubmit} className="flex items-center bg-[#2a2a2a] border border-[#444444] rounded-full pl-3.5 pr-1 py-1 mb-3">
            <Search className="w-4 h-4 text-[#888888] mr-2 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari lokasi atau motor..."
              className="bg-transparent text-white text-[13px] placeholder-[#888888] focus:outline-none w-full"
            />
            <button
              type="submit"
              className="w-7 h-7 rounded-full bg-[#F8E01A] text-[#212121] flex items-center justify-center shrink-0"
            >
              <Search className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </form>

          <button
            onClick={() => handleNavClick('browse')}
            className="w-full text-left px-3 py-2 text-white font-medium hover:bg-[#252525] rounded-[4px]"
          >
            Pilihan Motor & Tarif
          </button>
          <button
            onClick={() => handleNavClick('how-it-works')}
            className="w-full text-left px-3 py-2 text-[#B5B5B5] hover:text-white font-medium hover:bg-[#252525] rounded-[4px]"
          >
            Cara Sewa 3 Langkah
          </button>
          <button
            onClick={() => {
              onOpenListModal();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-[#B5B5B5] hover:text-white font-medium hover:bg-[#252525] rounded-[4px]"
          >
            Program Titip Motor Bandung
          </button>
          <button
            onClick={() => handleNavClick('faq')}
            className="w-full text-left px-3 py-2 text-[#B5B5B5] hover:text-white font-medium hover:bg-[#252525] rounded-[4px]"
          >
            Tanya Jawab (FAQ)
          </button>

          <div className="pt-2 border-t border-[#333333]">
            <button
              onClick={() => {
                handleWhatsAppClick();
                setMobileMenuOpen(false);
              }}
              className="w-full bg-[#A0844B] text-white py-2.5 rounded-[4px] text-center font-semibold text-sm flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Hubungi via WhatsApp
            </button>
          </div>
        </div>
      )}
    </header>
  );
};



