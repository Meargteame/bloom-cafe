import React from 'react';
import { ActiveModal } from '../types';

interface HeroProps {
  onOpenModal: (modal: ActiveModal) => void;
  onScrollToSection: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenModal, onScrollToSection }) => {
  return (
    <section className="relative w-full bg-[#0B281B] overflow-hidden pt-12 pb-24 md:pt-20 md:pb-36">
      {/* Abstract concentric rounded/pill shapes in background right side (matches screenshot) */}
      <div 
        className="absolute right-[-10%] top-[-10%] w-[550px] h-[550px] md:w-[780px] md:h-[780px] rounded-full pointer-events-none select-none"
        style={{
          background: 'radial-gradient(circle at 65% 45%, rgba(26, 68, 48, 0.45) 0%, rgba(19, 56, 38, 0.3) 45%, rgba(11, 40, 27, 0) 70%)',
        }}
      />
      {/* Decorative overlapping organic curved graphic matching screenshot */}
      <svg
        className="absolute right-[-5%] top-1/2 -translate-y-1/2 w-[340px] md:w-[620px] h-[620px] pointer-events-none opacity-30"
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="340" cy="250" r="220" stroke="#1D533A" strokeWidth="60" />
        <circle cx="280" cy="250" r="140" fill="#15422E" opacity="0.6" />
        <path
          d="M 280 150 C 350 150, 420 200, 420 280 C 420 360, 340 430, 260 430"
          stroke="#215D41"
          strokeWidth="48"
          strokeLinecap="round"
        />
      </svg>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 z-10">
        <div className="max-w-2xl lg:max-w-3xl">
          {/* Eyebrow Location */}
          <div className="mb-6 md:mb-8">
            <span
              className="text-[#F4B838] font-bold text-xs sm:text-sm tracking-[0.24em] uppercase"
              style={{ wordSpacing: '0.2em' }}
            >
              SEMAY TOWER · BOLE WOLLO SEFER · ADDIS ABABA
            </span>
          </div>

          {/* Signature Headline */}
          <h1 className="font-editorial text-6xl sm:text-7xl md:text-8xl lg:text-[104px] font-normal leading-[0.95] text-[#FAF8F5] tracking-tight mb-8">
            Taste <br />
            the <span className="italic font-normal text-[#F4B838]">moment</span>.
          </h1>

          {/* Subtitle / Description */}
          <p className="text-[#CFD7D0] text-lg sm:text-xl md:text-[22px] font-normal leading-relaxed max-w-2xl mb-10 text-pretty">
            A kitchen and coffee bar that never closes. Breakfast at five, buffet at noon,
            coffee all afternoon, the shawarma station from five, and a hot plate at three
            in the morning.
          </p>

          {/* Action Button Row */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-5">
            <button
              onClick={() => onOpenModal('menu')}
              className="px-8 py-4 bg-[#F4B838] hover:bg-[#e4a82b] text-[#0B281B] font-bold text-sm tracking-wider uppercase rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              SEE THE MENU
            </button>

            <button
              onClick={() => onScrollToSection('find-us')}
              className="px-8 py-4 bg-[#0B281B] hover:bg-[#133D2B] text-white border border-[#27533E] hover:border-[#387457] font-semibold text-sm tracking-wider uppercase rounded-full transition-all duration-200 cursor-pointer"
            >
              FIND US
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
