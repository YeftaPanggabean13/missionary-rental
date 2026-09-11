import React, { useState } from 'react';
import { Shield, Phone, Mail, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';

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
            <div className="flex items-baseline gap-1.5 mb-2">
              <span className="font-script text-3xl sm:text-4xl text-white tracking-wide">
                Twisted Road
              </span>
              <span className="w-1.5 h-1.5 bg-[#A0844B] rounded-full"></span>
            </div>
            <p className="text-[#B5B5B5] max-w-md text-[13px] leading-relaxed">
              The premier peer-to-peer motorcycle rental marketplace. Connecting riders and local bike owners with complete insurance and mutual respect.
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
                placeholder="Enter email for scenic route guides..."
                className="bg-[#181818] border border-[#444444] text-white text-[13px] rounded-[4px] px-3.5 py-2.5 focus:outline-none focus:border-[#A0844B] min-w-[240px]"
              />
              <button
                type="submit"
                className="bg-[#A0844B] hover:bg-[#8f743f] text-white font-semibold px-4 py-2.5 rounded-[4px] transition-colors cursor-pointer shrink-0"
              >
                {subscribed ? 'Subscribed ✓' : 'Stay in Touch'}
              </button>
            </form>
            {subscribed && (
              <span className="text-[11px] text-emerald-400 block mt-1.5">
                Thanks for joining the Twisted Road community dispatch.
              </span>
            )}
          </div>
        </div>

        {/* Dense 4-column directory from Brand Guideline */}
        <div className="py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-[#B5B5B5]">
          {/* Col 1: Learn More */}
          <div>
            <h4 className="text-[13px] font-bold text-white uppercase tracking-wider mb-3">
              Learn More
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('how-it-works')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  How Renting Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('earnings')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  List Your Motorcycle (Earn 80%)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('safety')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  $1M Insurance & Liability Protection
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('inspection')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Photo Inspection Protocol
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Security Deposit Pre-Auth Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Popular Cities */}
          <div>
            <h4 className="text-[13px] font-bold text-white uppercase tracking-wider mb-3">
              Popular Cities
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => { onCityClick('Denver'); onNavigate('browse'); }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Denver, CO (Rocky Mountain Passes)
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onCityClick('Los Angeles'); onNavigate('browse'); }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Los Angeles, CA (Pacific Coast Hwy)
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onCityClick('Austin'); onNavigate('browse'); }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Austin, TX (Texas Hill Country)
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onCityClick('Phoenix'); onNavigate('browse'); }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Phoenix, AZ (Desert Backcountry)
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onCityClick('Seattle'); onNavigate('browse'); }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Seattle, WA (North Cascades Loop)
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onCityClick('Nashville'); onNavigate('browse'); }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Nashville, TN (Natchez Trace Parkway)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Brands */}
          <div>
            <h4 className="text-[13px] font-bold text-white uppercase tracking-wider mb-3">
              Popular Brands
            </h4>
            <ul className="space-y-2">
              <li className="hover:text-white cursor-pointer transition-colors">Harley-Davidson Rentals</li>
              <li className="hover:text-white cursor-pointer transition-colors">BMW Motorrad Rentals</li>
              <li className="hover:text-white cursor-pointer transition-colors">Triumph Motorcycles</li>
              <li className="hover:text-white cursor-pointer transition-colors">Ducati Scrambler & Adventure</li>
              <li className="hover:text-white cursor-pointer transition-colors">Indian Motorcycle Rentals</li>
              <li className="hover:text-white cursor-pointer transition-colors">Yamaha Street & Naked Bikes</li>
            </ul>
          </div>

          {/* Col 4: Stay In Touch & Support */}
          <div>
            <h4 className="text-[13px] font-bold text-white uppercase tracking-wider mb-3">
              Rider Support
            </h4>
            <div className="space-y-2.5">
              <p className="text-[#B5B5B5]">
                Real riders available 7 days a week for booking assistance and roadside dispatch.
              </p>
              <div className="flex items-center gap-2 text-white font-medium">
                <Phone className="w-3.5 h-3.5 text-[#A0844B]" />
                <span>(800) 555-ROAD (7623)</span>
              </div>
              <div className="flex items-center gap-2 text-white font-medium">
                <Mail className="w-3.5 h-3.5 text-[#A0844B]" />
                <span>support@twistedroad.com</span>
              </div>
              <div className="flex items-center gap-2 text-[#888888]">
                <MapPin className="w-3.5 h-3.5 text-[#A0844B]" />
                <span>Austin, TX · Nationwide USA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-8 border-t border-[#333333] flex flex-col sm:flex-row items-center justify-between text-[12px] text-[#888888] gap-4">
          <div>
            © {new Date().getFullYear()} Twisted Road, Inc. All rights reserved. Rugged American motorcycle culture.
          </div>
          <div className="flex flex-wrap gap-4">
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Insurance Disclosures</span>
            <span className="hover:text-white cursor-pointer">Peer Safety Charter</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
