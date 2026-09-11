"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/src/components/Header";
import { Hero } from "@/src/components/Hero";
import { SearchAndBrowse } from "@/src/components/SearchAndBrowse";
import { BikeDetailModal } from "@/src/components/BikeDetailModal";
import { HowItWorks } from "@/src/components/HowItWorks";
import { Testimonials } from "@/src/components/Testimonials";
import { FaqSection } from "@/src/components/FaqSection";
import { Footer } from "@/src/components/Footer";
import { ListBikeModal } from "@/src/components/ListBikeModal";
import { BookingTrackModal } from "@/src/components/BookingTrackModal";
import { MOTORBIKES } from "@/src/data/bikes";
import { Motorbike, BikeCategory } from "@/src/types";
import { CheckCircle2 } from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const [bikes, setBikes] = useState<Motorbike[]>(MOTORBIKES);
  const [selectedBike, setSelectedBike] = useState<Motorbike | null>(null);
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);
  const [searchCity, setSearchCity] = useState<string>("All");
  const [searchCategory, setSearchCategory] = useState<BikeCategory | "All">("All");
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  // Fetch live bike inventory from API/Convex
  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const res = await fetch("/api/bikes");
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
                    available: found.status === "available" || found.status === "TERSEDIA",
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
  }, []);

  const handleOpenAdmin = () => {
    router.push("/admin");
  };

  const handleHeaderSearch = (query: string) => {
    const areas = ["Stasiun Bandung", "Dago", "Lembang", "Pasteur", "Braga", "Ciwidey", "Whoosh"];
    const matchedArea = areas.find((a) => query.toLowerCase().includes(a.toLowerCase()));
    if (matchedArea) {
      setSearchCity(matchedArea);
    } else {
      setSearchCity("All");
    }
    showNotification(`Mencari armada di Bandung: "${query}"`);
    const browseElem = document.getElementById("browse");
    if (browseElem) {
      browseElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
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

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreClick={() => handleNavigate("browse")}
          onHowItWorksClick={() => handleNavigate("how-it-works")}
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
          onRentClick={() => handleNavigate("browse")}
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
          handleNavigate("browse");
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
