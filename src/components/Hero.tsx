import React from 'react';

interface HeroProps {
  onExploreClick: () => void;
  onHowItWorksClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onHowItWorksClick }) => {
  return (
    <section className="relative bg-[#212121] text-white min-h-[560px] sm:min-h-[640px] lg:min-h-[700px] flex items-center justify-center overflow-hidden" id="hero">
      {/* Background photograph with rider on motorcycle */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=2000&q=85"
          alt="Rental Motor Misionary Bandung"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        {/* Dark contrast overlay matching screenshot */}
        <div className="absolute inset-0 bg-black/45"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#212121] via-transparent to-black/30"></div>
      </div>

      {/* Centered Hero Content matching user's screenshot */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Bold Inter Headline in one line */}
        <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mx-auto drop-shadow-md whitespace-normal md:whitespace-nowrap">
          Motor siap pakai, kondisi terawat, Turban sekarang!
        </h1>

        {/* Clean Inter Subheadline */}
        <p className="text-base sm:text-xl lg:text-2xl text-gray-200 mt-5 max-w-2xl mx-auto font-normal leading-relaxed drop-shadow-xs">
          Armada terawat, gratis 2 helm SNI bersih, jas hujan, dan layanan antar-jemput stasiun.
        </p>

        {/* Warm Gold / Bronze Button matching screenshot */}
        <div className="mt-8 flex flex-col items-center justify-center">
          <button
            onClick={onExploreClick}
            className="bg-[#A0844B] hover:bg-[#8f743f] text-white font-bold text-[15px] sm:text-[16px] px-8 py-3.5 rounded-[4px] shadow-lg transition-all cursor-pointer"
            id="hero-primary-cta"
          >
            Pilih Motor Sekarang
          </button>

          {/* Underlined subtle question link beneath button matching screenshot */}
          <button
            onClick={onHowItWorksClick}
            className="mt-4 text-white/80 hover:text-white text-[13px] sm:text-[14px] underline underline-offset-4 decoration-white/40 hover:decoration-white transition-colors cursor-pointer"
          >
            Bagaimana cara sewa di Misionary?
          </button>
        </div>
      </div>
    </section>
  );
};



