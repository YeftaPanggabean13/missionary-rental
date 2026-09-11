import React, { useState } from 'react';
import { Menu, X, Shield, KeyRound, PlusCircle, Search } from 'lucide-react';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  onOpenListModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, onOpenListModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#212121] text-white border-b border-[#333333] shadow-md">
      {/* Top trust bar */}
      <div className="bg-[#181818] border-b border-[#2a2a2a] text-[12px] py-1.5 px-4">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between text-[#B5B5B5]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-white">
              <Shield className="w-3.5 h-3.5 text-[#A0844B]" />
              $1,000,000 Liability Coverage Included
            </span>
            <span className="hidden sm:inline-block text-[#555555]">|</span>
            <span className="hidden sm:inline-block">Pre-Authorized Security Deposits (Not Charged Upfront)</span>
          </div>
          <div className="flex items-center gap-4 text-[12px]">
            <span className="hidden md:inline text-[#B5B5B5]">Need help? (800) 555-ROAD</span>
            <button
              onClick={() => handleNavClick('safety')}
              className="text-[#B5B5B5] hover:text-white transition-colors cursor-pointer"
            >
              Trust & Safety
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand script logo */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => handleNavClick('hero')}
              className="group text-left cursor-pointer flex items-baseline gap-1"
              id="header-brand-logo"
            >
              <span className="font-script text-3xl sm:text-4xl text-white tracking-wide group-hover:text-[#A0844B] transition-colors">
                Twisted Road
              </span>
              <span className="w-1.5 h-1.5 bg-[#A0844B] rounded-full ml-0.5"></span>
            </button>
            <span className="hidden lg:inline-block text-[11px] uppercase tracking-wider text-[#888888] font-medium border-l border-[#3a3a3a] pl-4 py-1">
              Motorcycle Marketplace
            </span>
          </div>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-6 text-[14px] font-medium">
            <button
              onClick={() => handleNavClick('browse')}
              className="text-[#E0E0E0] hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 py-1"
            >
              <Search className="w-4 h-4 text-[#A0844B]" />
              Find a Motorcycle
            </button>
            <button
              onClick={() => handleNavClick('how-it-works')}
              className="text-[#B5B5B5] hover:text-white transition-colors cursor-pointer py-1"
            >
              How It Works
            </button>
            <button
              onClick={() => handleNavClick('inspection')}
              className="text-[#B5B5B5] hover:text-white transition-colors cursor-pointer py-1"
            >
              Photo Inspection
            </button>
            <button
              onClick={() => handleNavClick('earnings')}
              className="text-[#B5B5B5] hover:text-white transition-colors cursor-pointer py-1"
            >
              Owner Earnings
            </button>
            <button
              onClick={() => handleNavClick('dashboards')}
              className="text-[#B5B5B5] hover:text-white transition-colors cursor-pointer py-1"
            >
              Platform Demo
            </button>
          </nav>

          {/* Header Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('browse')}
              className="text-[13px] font-semibold text-white px-3.5 py-2 border border-white/30 rounded-[4px] hover:border-white transition-colors cursor-pointer"
              id="header-rent-btn"
            >
              Rent a Bike
            </button>
            <button
              onClick={onOpenListModal}
              className="bg-[#A0844B] hover:bg-[#8f743f] text-white text-[13px] font-semibold px-4 py-2 rounded-[4px] transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
              id="header-list-bike-btn"
            >
              <PlusCircle className="w-4 h-4" />
              List Your Motorcycle
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={onOpenListModal}
              className="bg-[#A0844B] text-white text-[12px] font-semibold px-2.5 py-1.5 rounded-[4px]"
            >
              List Bike
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
        <div className="md:hidden bg-[#1a1a1a] border-b border-[#333333] px-4 pt-3 pb-6 space-y-3">
          <button
            onClick={() => handleNavClick('browse')}
            className="w-full text-left px-3 py-2 text-white font-medium hover:bg-[#252525] rounded-[4px] flex items-center gap-2"
          >
            <Search className="w-4 h-4 text-[#A0844B]" />
            Find a Motorcycle
          </button>
          <button
            onClick={() => handleNavClick('how-it-works')}
            className="w-full text-left px-3 py-2 text-[#B5B5B5] hover:text-white font-medium hover:bg-[#252525] rounded-[4px]"
          >
            How It Works
          </button>
          <button
            onClick={() => handleNavClick('inspection')}
            className="w-full text-left px-3 py-2 text-[#B5B5B5] hover:text-white font-medium hover:bg-[#252525] rounded-[4px]"
          >
            Mandatory Photo Inspection
          </button>
          <button
            onClick={() => handleNavClick('earnings')}
            className="w-full text-left px-3 py-2 text-[#B5B5B5] hover:text-white font-medium hover:bg-[#252525] rounded-[4px]"
          >
            Owner Earnings Calculator
          </button>
          <button
            onClick={() => handleNavClick('dashboards')}
            className="w-full text-left px-3 py-2 text-[#B5B5B5] hover:text-white font-medium hover:bg-[#252525] rounded-[4px]"
          >
            Renter & Owner Dashboards
          </button>
          <button
            onClick={() => handleNavClick('safety')}
            className="w-full text-left px-3 py-2 text-[#B5B5B5] hover:text-white font-medium hover:bg-[#252525] rounded-[4px]"
          >
            Trust & Safety ($1M Liability)
          </button>

          <div className="pt-2 border-t border-[#333333] flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenListModal();
                setMobileMenuOpen(false);
              }}
              className="w-full bg-[#A0844B] text-white py-2.5 rounded-[4px] text-center font-semibold text-sm"
            >
              List Your Motorcycle (Free)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
