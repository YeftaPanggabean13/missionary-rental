import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare } from 'lucide-react';
import missionaryLogoWhite from '../img/missionary-horizontal-white.png';

interface FooterProps {
  onCityClick: (city: string) => void;
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onCityClick, onNavigate }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-[#212121] text-white border-t border-[#333333] pt-14 pb-10 text-[13px]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter & Script Brand banner */}
        <div className="pb-10 border-b border-[#333333] flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="mb-3.5">
              <img
                src={missionaryLogoWhite}
                alt="Misionary Rental Motor Bandung"
                className="h-9 sm:h-10 w-auto object-contain"
              />
            </div>
            <p className="text-[#B5B5B5] max-w-md text-[13px] leading-relaxed">
              Rental motor bersih, nyaman, dan terpercaya di Bandung. Layanan antar-jemput tepat waktu ke Stasiun Bandung, Whoosh, dan Hotel Anda lengkap dengan 2 helm SNI & jas hujan.
            </p>
          </div>

          {/* Newsletter Box */}
          <div className="w-full lg:w-auto">
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Ketik email untuk info promo & rute..."
                className="bg-[#181818] border border-[#444444] text-white text-[13px] rounded-[4px] px-3.5 py-2.5 focus:outline-none focus:border-[#A0844B] min-w-[240px]"
              />
              <button
                type="submit"
                className="bg-[#A0844B] hover:bg-[#8f743f] text-white font-semibold px-4 py-2.5 rounded-[4px] transition-colors cursor-pointer shrink-0"
              >
                {subscribed ? 'Terdaftar ✓' : 'Dapatkan Info Promo'}
              </button>
            </form>
            {subscribed && (
              <span className="text-[11px] text-emerald-400 block mt-1.5">
                Terima kasih! Kami akan mengirimkan panduan rute wisata kuliner & ngopi Bandung.
              </span>
            )}
          </div>
        </div>

        {/* Dense 4-column directory */}
        <div className="py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-[#B5B5B5]">
          {/* Col 1: Layanan Misionary */}
          <div>
            <h4 className="text-[13px] font-bold text-white uppercase tracking-wider mb-3">
              Layanan Sewa
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('browse')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Pilihan Motor & Tarif
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('how-it-works')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Cara Sewa 3 Langkah
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('earnings')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Program Titip Motor (70% Net)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('inspection')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Standar Cek Fisik Serah Terima
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Syarat e-KTP & Jaminan
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Area Antar-Jemput */}
          <div>
            <h4 className="text-[13px] font-bold text-white uppercase tracking-wider mb-3">
              Area Antar-Jemput
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => { onCityClick('Stasiun Bandung'); onNavigate('browse'); }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Stasiun Bandung (Hall & Kebon Kawung)
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onCityClick('Stasiun Whoosh Padalarang'); onNavigate('browse'); }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Stasiun KCIC Whoosh Padalarang
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onCityClick('Dago & Dipatiukur'); onNavigate('browse'); }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Dago & Dipatiukur
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onCityClick('Lembang'); onNavigate('browse'); }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Lembang & Setiabudi
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onCityClick('Pasteur'); onNavigate('browse'); }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Pasteur (Pool Travel & Hotel)
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onCityClick('Braga & Asia Afrika'); onNavigate('browse'); }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Braga & Pusat Kota
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Armada Favorit */}
          <div>
            <h4 className="text-[13px] font-bold text-white uppercase tracking-wider mb-3">
              Armada Favorit
            </h4>
            <ul className="space-y-2">
              <li className="hover:text-white cursor-pointer transition-colors" onClick={() => onNavigate('browse')}>
                Honda BeAT eSP (Rp 85k)
              </li>
              <li className="hover:text-white cursor-pointer transition-colors" onClick={() => onNavigate('browse')}>
                Honda Scoopy Prestige (Rp 95k)
              </li>
              <li className="hover:text-white cursor-pointer transition-colors" onClick={() => onNavigate('browse')}>
                Honda Vario 125 CBS ISS (Rp 110k)
              </li>
              <li className="hover:text-white cursor-pointer transition-colors" onClick={() => onNavigate('browse')}>
                Yamaha Aerox 155 Connected (Rp 135k)
              </li>
              <li className="hover:text-white cursor-pointer transition-colors" onClick={() => onNavigate('browse')}>
                Yamaha NMAX 155 Connected (Rp 140k)
              </li>
            </ul>
          </div>

          {/* Col 4: Kontak & Lokasi Garasi */}
          <div>
            <h4 className="text-[13px] font-bold text-white uppercase tracking-wider mb-3">
              Garasi & Kontak
            </h4>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2 text-[#B5B5B5]">
                <MapPin className="w-4 h-4 text-[#A0844B] shrink-0 mt-0.5" />
                <span>
                  Karyawangi, Parongpong, West Bandung Regency, West Java 40559
                </span>
              </div>
              <div className="flex items-center gap-2 text-white font-medium">
                <Clock className="w-3.5 h-3.5 text-[#A0844B] shrink-0" />
                <span>Buka Setiap Hari: 06.30 - 22.00 WIB</span>
              </div>
              <a
                href="https://wa.me/6281234567890?text=Halo%20Misionary,%20saya%20ingin%20tanya%20rental%20motor"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white font-medium hover:text-[#F8E01A] transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#A0844B] shrink-0" />
                <span>WhatsApp: +62 812-6274-0733</span>
              </a>
              <div className="flex items-center gap-2 text-[#888888]">
                <Mail className="w-3.5 h-3.5 text-[#A0844B] shrink-0" />
                <span>halo@misionaryrental.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-8 border-t border-[#333333] flex flex-col sm:flex-row items-center justify-between text-[12px] text-[#888888] gap-4">
          <div>
            © {new Date().getFullYear()} Misionary Bandung. Rental motor bersih, nyaman, dan terpercaya.
          </div>
          <div className="flex flex-wrap gap-4">
            <span className="hover:text-white cursor-pointer">Ketentuan Sewa</span>
            <span className="hover:text-white cursor-pointer">Kebijakan Privasi Identitas</span>
            <span className="hover:text-white cursor-pointer">Panduan Berkendara Aman di Bandung</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

