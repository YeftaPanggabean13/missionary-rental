import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SearchAndBrowse } from './components/SearchAndBrowse';
import { BikeDetailModal } from './components/BikeDetailModal';
import { HowItWorks } from './components/HowItWorks';
import { Testimonials } from './components/Testimonials';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { ListBikeModal } from './components/ListBikeModal';
import { MOTORBIKES } from './data/bikes';
import { Motorbike, BikeCategory } from './types';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [selectedBike, setSelectedBike] = useState<Motorbike | null>(null);
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [searchCity, setSearchCity] = useState<string>('All');
  const [searchCategory, setSearchCategory] = useState<BikeCategory | 'All'>('All');
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleHeaderSearch = (query: string) => {
    // If the query mentions a specific area, set it
    const areas = ['Stasiun Bandung', 'Dago', 'Lembang', 'Pasteur', 'Braga', 'Ciwidey', 'Whoosh'];
    const matchedArea = areas.find((a) => query.toLowerCase().includes(a.toLowerCase()));
    if (matchedArea) {
      setSearchCity(matchedArea);
    } else {
      setSearchCity('All');
    }
    showNotification(`Mencari armada di Bandung: "${query}"`);
    const browseElem = document.getElementById('browse');
    if (browseElem) {
      browseElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookingSubmitted = (summary: any) => {
    showNotification(`Pemesanan ${summary.bike.make} ${summary.bike.model} berhasil dikirim ke Admin WhatsApp Misionary!`);
  };

  const handleListingCreated = (listing: any) => {
    showNotification(`Pendaftaran unit ${listing.year} ${listing.make} ${listing.model} berhasil dikirim! Admin akan segera menghubungi via WhatsApp.`);
  };

  return (
    <div className="min-h-screen bg-white text-[#212121] flex flex-col font-sans">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#212121] text-white px-4 py-3 rounded-[4px] shadow-2xl border border-[#A0844B] flex items-center gap-2.5 text-sm animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 text-[#F8E01A] shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Header matching screenshot */}
      <Header
        onNavigate={handleNavigate}
        onOpenListModal={() => setIsListModalOpen(true)}
        onSearch={handleHeaderSearch}
      />

      {/* Main Content: Clean, uncluttered, focused */}
      <main className="flex-1">
        {/* Hero Section matching user screenshot: Bold Inter font, centered, no small badges */}
        <Hero
          onExploreClick={() => handleNavigate('browse')}
          onHowItWorksClick={() => handleNavigate('how-it-works')}
        />

        {/* Motorcycle Catalog & Filter */}
        <SearchAndBrowse
          bikes={MOTORBIKES}
          onSelectBike={(bike) => setSelectedBike(bike)}
          initialCity={searchCity}
          initialCategory={searchCategory}
        />

        {/* 3-Step Simple Rental Process */}
        <HowItWorks
          onRentClick={() => handleNavigate('browse')}
          onListClick={() => setIsListModalOpen(true)}
        />

        {/* Authentic Reviews */}
        <Testimonials />

        {/* FAQ */}
        <FaqSection />
      </main>

      {/* Clean Brand Footer */}
      <Footer
        onCityClick={(city) => {
          setSearchCity(city);
          handleNavigate('browse');
        }}
        onNavigate={handleNavigate}
      />

      {/* Bike Detail & Booking Request Modal */}
      <BikeDetailModal
        bike={selectedBike}
        onClose={() => setSelectedBike(null)}
        onRequestSubmitted={handleBookingSubmitted}
      />

      {/* List Your Motorcycle Modal */}
      <ListBikeModal
        isOpen={isListModalOpen}
        onClose={() => setIsListModalOpen(false)}
        onListingCreated={handleListingCreated}
      />
    </div>
  );
}

