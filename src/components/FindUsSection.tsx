import React from 'react';
import { MapPin, Phone, Clock, Utensils, Music, Flame } from 'lucide-react';
import { ActiveModal } from '../types';

interface FindUsSectionProps {
  onOpenModal: (modal: ActiveModal) => void;
}

export const FindUsSection: React.FC<FindUsSectionProps> = ({ onOpenModal }) => {
  const highlights = [
    {
      label: 'HOURS',
      value: '24 / 7',
      detail: 'Every day, all day and all night',
      icon: Clock,
    },
    {
      label: 'BUFFET',
      value: 'Mon — Fri',
      detail: 'Fasting and non-fasting, lunch',
      icon: Utensils,
    },
    {
      label: 'SHAWARMA',
      value: 'From 5pm',
      detail: 'Carved to order, nightly',
      icon: Flame,
    },
    {
      label: 'JAZZ',
      value: 'Thursdays',
      detail: 'Live from 5pm, no cover',
      icon: Music,
    },
  ];

  return (
    <section id="find-us" className="w-full bg-[#0B281B] text-white py-24 md:py-32 px-6 sm:px-8 border-b border-[#143D2A]">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-16">
          {/* Eyebrow */}
          <div className="mb-4">
            <span className="text-[#F4B838] font-bold text-xs sm:text-sm tracking-[0.24em] uppercase">
              FIND US
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-editorial text-5xl sm:text-6xl md:text-7xl lg:text-[76px] font-normal leading-[1.05] tracking-tight mb-6 text-[#FAF8F5]">
            Semay Tower, <br />
            Bole <span className="italic text-[#F4B838]">Wollo Sefer</span>.
          </h2>

          {/* Description */}
          <p className="text-[#CAD4CD] text-lg sm:text-xl font-normal leading-relaxed mb-10">
            Parking on site. Open around the clock, every day of the week — there is no wrong time
            to turn up.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-5">
            <button
              onClick={() => onOpenModal('directions')}
              className="px-8 py-4 bg-[#F4B838] hover:bg-[#e4a82b] text-[#0B281B] font-bold text-sm tracking-wider uppercase rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              OPEN IN MAPS
            </button>

            <a
              href="tel:+251987222226"
              className="px-8 py-4 bg-[#0B281B] hover:bg-[#133D2B] text-white border border-[#23503B] hover:border-[#387457] font-semibold text-sm tracking-wider uppercase rounded-full transition-all duration-200 inline-flex items-center gap-2.5"
            >
              <Phone size={16} className="text-[#F4B838]" />
              <span>+251 98 722 2226</span>
            </a>
          </div>
        </div>

        {/* 4 Feature Outline Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl p-7 border border-[#194532] bg-[#0E3222]/40 backdrop-blur-xs flex flex-col justify-between min-h-[190px] transition-all hover:border-[#2C694D] hover:bg-[#0E3222]/80"
            >
              <div>
                <span className="text-xs font-bold tracking-[0.2em] text-[#F4B838] uppercase block mb-3">
                  {item.label}
                </span>
                <p className="font-editorial text-4xl sm:text-5xl text-white font-normal mb-3">
                  {item.value}
                </p>
              </div>
              <p className="text-sm text-[#A8BAAE] font-light">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
