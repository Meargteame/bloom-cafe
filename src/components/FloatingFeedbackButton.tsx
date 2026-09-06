import React from 'react';
import { Star } from 'lucide-react';

interface FloatingFeedbackButtonProps {
  onClick: () => void;
}

export const FloatingFeedbackButton: React.FC<FloatingFeedbackButtonProps> = ({ onClick }) => {
  return (
    <button
      id="leave-feedback-floating-btn"
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 px-5 py-3 rounded-full bg-[#092518] hover:bg-[#0E3524] text-[#F4B838] border border-[#1A4B35] shadow-2xl flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 hover:scale-105 active:scale-95 group cursor-pointer"
      style={{
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.6), 0 0 1px 1px rgba(244, 184, 56, 0.2)'
      }}
    >
      <Star size={16} className="text-[#F4B838] fill-transparent group-hover:fill-[#F4B838] transition-all" />
      <span className="text-white group-hover:text-[#F4B838] transition-colors">
        Leave feedback
      </span>
    </button>
  );
};
