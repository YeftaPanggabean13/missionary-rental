import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustStatsBanner } from './components/TrustStatsBanner';
import { SearchAndBrowse } from './components/SearchAndBrowse';
import { BikeDetailModal } from './components/BikeDetailModal';
import { InspectionWalkthrough } from './components/InspectionWalkthrough';
import { OwnerEarningsSection } from './components/OwnerEarningsSection';
import { MarketplaceDashboardsPreview } from './components/MarketplaceDashboardsPreview';
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

  const handleHeroSearch = (city: string, category: BikeCategory | 'All', dateRange: string) => {
    setSearchCity(city);
    setSearchCategory(category);
    showNotification(`Filtering for ${category} motorcycles in ${city} for ${dateRange}`);
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
    showNotification(`Booking request for ${summary.bike.make} ${summary.bike.model} sent to ${summary.bike.owner.name}!`);
  };

  const handleListingCreated = (listing: any) => {
    showNotification(`Listing for ${listing.year} ${listing.make} ${listing.model} submitted for verification!`);
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

      {/* Header */}
      <Header
        onNavigate={handleNavigate}
        onOpenListModal={() => setIsListModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onSearch={handleHeroSearch}
          onLearnMore={() => handleNavigate('how-it-works')}
          onOpenListModal={() => setIsListModalOpen(true)}
        />

        {/* Brand Pillars & Trust Strip */}
        <TrustStatsBanner />

        {/* PRD Screen 01: Browse & Search Catalog */}
        <SearchAndBrowse
          bikes={MOTORBIKES}
          onSelectBike={(bike) => setSelectedBike(bike)}
          initialCity={searchCity}
          initialCategory={searchCategory}
        />

        {/* PRD Screen 04: Handover & Return Photo Inspection */}
        <InspectionWalkthrough />

        {/* PRD Screen 06 & Brand Guideline: Owner Earnings Calculator */}
        <OwnerEarningsSection
          onOpenListModal={() => setIsListModalOpen(true)}
        />

        {/* PRD Screen 05 & 06: Interactive Dashboards Preview */}
        <MarketplaceDashboardsPreview />

        {/* How It Works (Renter & Owner) */}
        <HowItWorks
          onRentClick={() => handleNavigate('browse')}
          onListClick={() => setIsListModalOpen(true)}
        />

        {/* Authentic Testimonials */}
        <Testimonials />

        {/* Straightforward Minimal FAQ */}
        <FaqSection />
      </main>

      {/* Dense Brand Footer */}
      <Footer
        onCityClick={(city) => {
          setSearchCity(city);
          handleNavigate('browse');
        }}
        onNavigate={handleNavigate}
      />

      {/* PRD Screen 02 & 03: Bike Detail & Booking Request Modal */}
      <BikeDetailModal
        bike={selectedBike}
        onClose={() => setSelectedBike(null)}
        onRequestSubmitted={handleBookingSubmitted}
      />

      {/* List Your Motorcycle (~5 Min Flow) */}
      <ListBikeModal
        isOpen={isListModalOpen}
        onClose={() => setIsListModalOpen(false)}
        onListingCreated={handleListingCreated}
      />
    </div>
  );
}
