import React from 'react';
import { TimeSlot } from '../types';
import { Clock, Sparkles } from 'lucide-react';

interface HourTableSectionProps {
  timeSlots: TimeSlot[];
  onSelectSlot?: (slot: TimeSlot) => void;
  onScrollToMenu: () => void;
}

export const HourTableSection: React.FC<HourTableSectionProps> = ({
  timeSlots,
  onSelectSlot,
  onScrollToMenu,
}) => {
  return (
    <section id="hour-table" className="bg-[#FBF8F2] text-[#0B281B] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-[#7E5229] tracking-[0.24em] uppercase text-xs font-bold mb-2">
            <span className="w-2 h-2 rounded-full bg-[#7E5229]" />
            <span>AROUND THE CLOCK SERVICE</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-editorial font-bold text-[#0B281B] tracking-tight">
            Every hour has a <span className="italic font-normal text-[#7E5229]">table</span>.
          </h2>
          <p className="text-sm sm:text-base text-[#4A5850] mt-3 font-light leading-relaxed">
            From sunrise pour-overs to twilight brioches and ambient evening desserts, explore how Bloom Cafe transitions throughout the day.
          </p>
        </div>

        {/* Time Slots Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {timeSlots.map((slot) => {
            return (
              <div
                key={slot.id}
                onClick={onScrollToMenu}
                className={`group relative rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between cursor-pointer border ${
                  slot.isActiveNow
                    ? 'bg-[#071E13] text-white border-[#F4B838] shadow-xl ring-2 ring-[#F4B838]/30'
                    : 'bg-[#0B281B] text-white border-[#16422E] hover:border-[#F4B838]/60 hover:shadow-lg'
                }`}
              >
                <div>
                  {/* Time Range & Active Tag */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-xs font-bold text-[#F4B838]">
                      {slot.timeRange}
                    </span>
                    {slot.isActiveNow && (
                      <span className="px-2 py-0.5 rounded-full bg-[#B0C32E] text-[#071E13] text-[9px] font-black uppercase tracking-wider animate-pulse">
                        ● NOW
                      </span>
                    )}
                  </div>

                  {/* Name */}
                  <h3 className="text-xl font-editorial font-bold text-[#FAF8F5] group-hover:text-[#F4B838] transition-colors mb-2">
                    {slot.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-[#CAD4CD] leading-relaxed mb-4 line-clamp-3">
                    {slot.description}
                  </p>
                </div>

                {/* Highlights List */}
                <div className="pt-3 border-t border-[#16422E] space-y-1 text-[11px] text-[#A8BAAE]">
                  {slot.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-[#F4B838]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
