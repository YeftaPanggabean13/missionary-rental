import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SearchAndBrowse } from './components/SearchAndBrowse';
import { BikeDetailModal } from './components/BikeDetailModal';
import { HowItWorks } from './components/HowItWorks';
import { Testimonials } from './components/Testimonials';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { ListBikeModal } from './components/ListBikeModal';
import { BookingTrackModal } from './components/BookingTrackModal';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
import { MOTORBIKES } from './data/bikes';
import { Motorbike, BikeCategory } from './types';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [pathname, setPathname] = useState<string>(() => {
    // If visited with /#admin, redirect to /admin
    if (window.location.hash === '#admin') {
      window.history.replaceState({}, '', '/admin');
      return '/admin';
    }
    return window.location.pathname;
  });

  const [adminToken, setAdminToken] = useState<string | null>(() => {
    return localStorage.getItem('missionary_admin_token');
  });

  const [bikes, setBikes] = useState<Motorbike[]>(MOTORBIKES);
  const [selectedBike, setSelectedBike] = useState<Motorbike | null>(null);
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);
  const [searchCity, setSearchCity] = useState<string>('All');
  const [searchCategory, setSearchCategory] = useState<BikeCategory | 'All'>('All');
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  // HTML5 History API popstate listener (handles back/forward browser buttons)
  useEffect(() => {
    const handlePopState = () => {
      setPathname(window.location.pathname);
    };

    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        window.history.replaceState({}, '', '/admin');
        setPathname('/admin');
      } else if (window.location.hash === '#track') {
        setIsTrackModalOpen(true);
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const navigateTo = (newPath: string) => {
    window.history.pushState({}, '', newPath);
    setPathname(newPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Fetch live bike inventory from backend API
  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const res = await fetch('/api/bikes');
        if (res.ok) {
          const resJson = await res.json();
          const bikeList = Array.isArray(resJson) ? resJson : (resJson.data || []);
          if (Array.isArray(bikeList) && bikeList.length > 0) {
            setBikes((prev) =>
              prev.map((b) => {
                const found = bikeList.find((d: any) => d.id === b.id);
                if (found) {
                  return {
                    ...b,
                    available: found.status === 'available' || found.status === 'TERSEDIA',
                    dailyRate: found.dailyRate || b.dailyRate,
                  };
                }
                return b;
              })
            );
          }
        }
      } catch {
        // Fallback to static MOTORBIKES
      }
    };
    fetchBikes();
  }, [pathname]);

  const handleOpenAdmin = () => {
    navigateTo('/admin');
  };

  const handleLoginSuccess = (token: string) => {
    setAdminToken(token);
    navigateTo('/admin');
    showNotification('Login Admin berhasil! Selamat datang di Operasional Misionary.');
  };

  const handleLogout = () => {
    localStorage.removeItem('missionary_admin_token');
    setAdminToken(null);
    navigateTo('/');
    showNotification('Anda telah keluar dari Portal Admin.');
  };

  const handleHeaderSearch = (query: string) => {
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
    if (pathname !== '/') {
      navigateTo('/');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookingSubmitted = (summary: any) => {
    showNotification(
      `Pemesanan ${summary.bike.make} ${summary.bike.model} berhasil dicatat! Simpan kode pemesanan untuk melacak status.`
    );
  };

  const handleListingCreated = (listing: any) => {
    showNotification(
      `Pendaftaran unit ${listing.year} ${listing.make} ${listing.model} berhasil dikirim! Admin akan segera menghubungi via WhatsApp.`
    );
  };

  // Route: /admin
  if (pathname === '/admin') {
    if (adminToken) {
      return <AdminDashboard token={adminToken} onLogout={handleLogout} />;
    }
    return (
      <AdminLogin
        onLoginSuccess={handleLoginSuccess}
        onBack={() => navigateTo('/')}
      />
    );
  }

  // Route: / (Public Customer Facing Homepage)
  return (
    <div className="min-h-screen bg-white text-[#212121] flex flex-col font-sans">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#212121] text-white px-4 py-3 rounded-[4px] shadow-2xl border border-[#A0844B] flex items-center gap-2.5 text-sm animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 text-[#F8E01A] shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Header with Search and Navigation */}
      <Header
        onNavigate={handleNavigate}
        onOpenListModal={() => setIsListModalOpen(true)}
        onSearch={handleHeaderSearch}
        onOpenTrackModal={() => setIsTrackModalOpen(true)}
        onOpenAdmin={handleOpenAdmin}
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
          bikes={bikes}
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
        onOpenTrackModal={() => setIsTrackModalOpen(true)}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Bike Detail & Booking Request Modal */}
      <BikeDetailModal
        bike={selectedBike}
        onClose={() => setSelectedBike(null)}
        onRequestSubmitted={handleBookingSubmitted}
      />

      {/* Customer Booking Tracking Modal */}
      <BookingTrackModal
        isOpen={isTrackModalOpen}
        onClose={() => setIsTrackModalOpen(false)}
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
