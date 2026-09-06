import React, { useState } from 'react';
import { CafeInfo } from '../types';
import { MapPin, Clock, Wifi, QrCode, Phone, Check, Copy } from 'lucide-react';

interface FindUsSectionProps {
  cafeInfo: CafeInfo;
  onOpenQRModal: () => void;
}

export const FindUsSection: React.FC<FindUsSectionProps> = ({
  cafeInfo,
  onOpenQRModal,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyWifi = () => {
    navigator.clipboard.writeText(cafeInfo.wifiPassword);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="find-us" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#16422E]">
      {/* Header */}
      <div className="max-w-2xl mb-12">
        <div className="flex items-center gap-2 text-[#F4B838] tracking-[0.24em] uppercase text-xs font-bold mb-2">
          <span className="w-2 h-2 rounded-full bg-[#F4B838]" />
          <span>VISIT OUR CAFE & ROASTERY</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-editorial font-bold text-[#FAF8F5] tracking-tight">
          Where to <span className="italic font-normal text-[#F4B838]">find us</span>.
        </h2>
        <p className="text-sm sm:text-base text-[#CAD4CD] mt-2 font-light leading-relaxed">
          Open daily for dine-in tables, takeaway coffees, and artisan bakery delights.
        </p>
      </div>

      {/* 4 Bento Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Address */}
        <div className="bg-[#071E13] p-6 rounded-2xl border border-[#16422E] flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#0B281B] text-[#F4B838] border border-[#16422E] flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-editorial font-bold text-[#FAF8F5]">Garden Roastery</h3>
            <p className="text-xs text-[#CAD4CD] leading-relaxed">
              {cafeInfo.address}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#16422E] text-xs font-mono text-[#F4B838]">
            Central District
          </div>
        </div>

        {/* Card 2: Hours */}
        <div className="bg-[#071E13] p-6 rounded-2xl border border-[#16422E] flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#0B281B] text-[#F4B838] border border-[#16422E] flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-editorial font-bold text-[#FAF8F5]">Operating Hours</h3>
            <p className="text-xs text-[#CAD4CD] leading-relaxed">
              {cafeInfo.hours}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#16422E] text-xs font-mono text-[#B0C32E] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B0C32E] animate-ping" />
            <span>Open Every Day</span>
          </div>
        </div>

        {/* Card 3: Free Guest WiFi */}
        <div className="bg-[#071E13] p-6 rounded-2xl border border-[#16422E] flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#0B281B] text-[#F4B838] border border-[#16422E] flex items-center justify-center">
              <Wifi className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-editorial font-bold text-[#FAF8F5]">Guest WiFi</h3>
            <p className="text-xs font-mono text-[#CAD4CD]">
              SSID: <span className="text-white font-bold">{cafeInfo.wifiName}</span>
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#16422E] flex items-center justify-between">
            <span className="text-xs font-mono text-[#8FA597]">Pass: ••••••••</span>
            <button
              type="button"
              onClick={handleCopyWifi}
              className="px-2 py-1 rounded bg-[#16422E] hover:bg-[#F4B838] text-[#F4B838] hover:text-black text-[10px] font-bold uppercase tracking-wider transition-colors flex items-center gap-1"
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Card 4: Digital QR Ordering */}
        <div className="bg-[#071E13] p-6 rounded-2xl border border-[#16422E] flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#0B281B] text-[#F4B838] border border-[#16422E] flex items-center justify-center">
              <QrCode className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-editorial font-bold text-[#FAF8F5]">Table QR Stand</h3>
            <p className="text-xs text-[#CAD4CD] leading-relaxed">
              Generate or print contactless QR codes for Tables 1 through {cafeInfo.tableCount}.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#16422E]">
            <button
              type="button"
              onClick={onOpenQRModal}
              className="w-full py-2 bg-[#F4B838] hover:bg-[#E4A82B] text-black rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
            >
              View Table QR
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
