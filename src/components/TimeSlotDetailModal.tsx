import React from 'react';
import { X, Clock, Sparkles, Utensils, Check } from 'lucide-react';
import { TimeSlot } from '../types';

interface TimeSlotDetailModalProps {
  slot: TimeSlot | null;
  onClose: () => void;
  onOpenMenu: () => void;
  onBookTable: () => void;
}

export const TimeSlotDetailModal: React.FC<TimeSlotDetailModalProps> = ({
  slot,
  onClose,
  onOpenMenu,
  onBookTable,
}) => {
  if (!slot) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-[#0B281B] border border-[#1C4E37] rounded-3xl shadow-2xl flex flex-col overflow-hidden text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 sm:p-8 border-b border-[#16422E] flex items-center justify-between bg-[#082015]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono tracking-wider text-[#F4B838] uppercase">
                {slot.timeRange}
              </span>
              {slot.isActiveNow && (
                <span className="px-2 py-0.5 bg-[#F4B838] text-[#0B281B] font-bold text-[9px] uppercase tracking-wider rounded-full">
                  CURRENT SLOT
                </span>
              )}
            </div>
            <h2 className="font-editorial text-4xl text-[#FAF8F5]">
              {slot.name} at IDDO
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-[#113825] hover:bg-[#1A4E35] flex items-center justify-center text-gray-300 hover:text-white transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <p className="text-base sm:text-lg text-[#D2DFD6] leading-relaxed font-light">
            {slot.description}
          </p>

          <div>
            <h4 className="text-xs font-bold tracking-[0.22em] text-[#F4B838] uppercase mb-3">
              WHAT IS HAPPENING AT THIS HOUR
            </h4>
            <div className="space-y-2.5">
              {slot.highlights.map((highlight, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-[#09261A] rounded-xl border border-[#164530]">
                  <Check size={16} className="text-[#F4B838] flex-shrink-0" />
                  <span className="text-sm text-[#E1EDE5]">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                onClose();
                onOpenMenu();
              }}
              className="flex-1 py-3.5 bg-[#F4B838] hover:bg-[#e4a82b] text-[#0B281B] font-bold text-xs tracking-wider uppercase rounded-full transition-all cursor-pointer text-center"
            >
              EXPLORE {slot.name.toUpperCase()} MENU
            </button>
            <button
              onClick={() => {
                onClose();
                onBookTable();
              }}
              className="py-3.5 px-6 border border-[#23503B] hover:bg-[#133D2B] text-white text-xs font-semibold tracking-wider uppercase rounded-full transition-all cursor-pointer"
            >
              BOOK A TABLE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
