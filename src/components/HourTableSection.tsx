import React, { useState } from 'react';
import { TIME_SLOTS } from '../data/restaurantData';
import { TimeSlot } from '../types';
import { ArrowRight, Sparkles, CheckCircle2, Clock } from 'lucide-react';

interface HourTableSectionProps {
  onSelectSlot: (slot: TimeSlot) => void;
}

export const HourTableSection: React.FC<HourTableSectionProps> = ({ onSelectSlot }) => {
  const [selectedSlotId, setSelectedSlotId] = useState<string>('evening');

  return (
    <section className="w-full bg-[#FBF8F2] text-[#111C15] py-20 md:py-28 px-6 sm:px-8 border-b border-[#ECE6DA]">
      <div className="max-w-7xl mx-auto">
        {/* Eyebrow */}
        <div className="mb-4">
          <span className="text-[#9A6530] font-semibold text-xs sm:text-sm tracking-[0.22em] uppercase">
            OPEN 24 HOURS
          </span>
        </div>

        {/* Section Headline */}
        <h2 className="font-editorial text-5xl sm:text-6xl md:text-7xl lg:text-[76px] font-normal leading-[1.05] tracking-tight mb-6 text-[#0D2318]">
          Every hour <br />
          has a <span className="italic text-[#9A6530]">table</span>.
        </h2>

        {/* Subtitle */}
        <p className="text-[#4F5D54] text-lg sm:text-xl font-normal leading-relaxed max-w-2xl mb-14">
          Most kitchens in Addis decide when you are allowed to be hungry. We do not.
          Here is what is happening, whenever you get here.
        </p>

        {/* 5 Time Slot Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {TIME_SLOTS.map((slot) => {
            const isHighlighted = selectedSlotId === slot.id;

            if (isHighlighted) {
              return (
                <div
                  key={slot.id}
                  onClick={() => {
                    setSelectedSlotId(slot.id);
                    onSelectSlot(slot);
                  }}
                  className="relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between min-h-[340px] cursor-pointer shadow-xl transition-all duration-300 transform lg:-translate-y-2"
                  style={{
                    background: 'linear-gradient(155deg, #103B28 0%, #092318 100%)',
                    boxShadow: '0 20px 30px -10px rgba(9, 35, 24, 0.4)',
                  }}
                >
                  <div>
                    {/* Top Row: Time Range & NOW badge */}
                    <div className="flex items-center justify-between gap-2 mb-6">
                      <span className="text-xs font-mono tracking-wider text-[#A1C5B2] uppercase">
                        {slot.timeRange}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#F4B838] text-[#0B281B] font-bold text-[10px] tracking-wider uppercase rounded-full shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0B281B] animate-pulse" />
                        NOW
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-editorial text-3xl sm:text-4xl text-white font-normal mb-3">
                      {slot.name}
                    </h3>

                    {/* Description */}
                    <p className="text-[#CFDDD4] text-sm leading-relaxed mb-6 font-light">
                      {slot.description}
                    </p>
                  </div>

                  {/* Explore Action Button */}
                  <div className="pt-4 border-t border-[#1C4E37]/60">
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.18em] uppercase text-[#F4B838] group hover:text-[#ffca58] transition-colors"
                    >
                      <span>EXPLORE</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            }

            // Inactive / regular white card
            return (
              <div
                key={slot.id}
                onClick={() => {
                  setSelectedSlotId(slot.id);
                  onSelectSlot(slot);
                }}
                className="bg-white rounded-3xl p-6 sm:p-7 flex flex-col justify-between min-h-[340px] border border-[#ECE5D8] hover:border-[#D6CAB4] hover:shadow-lg transition-all duration-200 cursor-pointer group"
              >
                <div>
                  {/* Time Range */}
                  <div className="mb-6">
                    <span className="text-xs font-mono tracking-wider text-[#8A968E] uppercase">
                      {slot.timeRange}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-editorial text-3xl sm:text-4xl text-[#0E261A] font-normal mb-3 group-hover:text-[#9A6530] transition-colors">
                    {slot.name}
                  </h3>

                  {/* Description */}
                  <p className="text-[#55635B] text-sm leading-relaxed mb-6 font-normal">
                    {slot.description}
                  </p>
                </div>

                {/* Explore Link */}
                <div className="pt-4 border-t border-[#F2EDE2]">
                  <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.18em] uppercase text-[#1B3828] group-hover:text-[#9A6530] transition-colors">
                    <span>EXPLORE</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-[#9A6530]" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
