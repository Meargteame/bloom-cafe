import React, { useState, useEffect } from 'react';
import { Coffee, Croissant, Utensils, QrCode, Sparkles } from 'lucide-react';

export const StatusTicker: React.FC = () => {
  const [timeString, setTimeString] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#071E13] border-y border-[#16422E] py-3 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#CAD4CD]">
        {/* Live Local Clock */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#B0C32E] animate-pulse" />
          <span className="text-[#F4B838] font-bold tracking-wider uppercase text-[11px]">LIVE CAFE STATUS:</span>
          <span className="text-white font-bold">{timeString || '08:45:00'}</span>
        </div>

        {/* Ticker Badges */}
        <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5 shrink-0 text-white">
            <Coffee className="w-3.5 h-3.5 text-[#F4B838]" />
            <span>Specialty Pour-over Active</span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0 text-white">
            <Croissant className="w-3.5 h-3.5 text-[#F4B838]" />
            <span>Artisan Bakery Fresh From Oven</span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0 text-white">
            <Utensils className="w-3.5 h-3.5 text-[#F4B838]" />
            <span>All-Day Kitchen Open</span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0 text-white">
            <QrCode className="w-3.5 h-3.5 text-[#B0C32E]" />
            <span>Instant Table QR Ordering</span>
          </div>
        </div>
      </div>
    </div>
  );
};
