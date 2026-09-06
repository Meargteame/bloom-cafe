import React from 'react';
import { BloomLogo } from './BloomLogo';
import { CafeInfo } from '../types';
import { Phone, Mail, MapPin, Clock, QrCode, Shield, ArrowUp } from 'lucide-react';

interface FooterProps {
  cafeInfo: CafeInfo;
  onOpenQRModal: () => void;
  onSwitchToAdmin: () => void;
  onScrollToSection: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  cafeInfo,
  onOpenQRModal,
  onSwitchToAdmin,
  onScrollToSection,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#071E13] text-white border-t border-[#16422E] pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* 4 Bento Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-8 border-b border-[#16422E]">
          <div className="bg-[#0B281B] p-4 rounded-xl border border-[#16422E] flex items-center gap-3">
            <Phone className="w-4 h-4 text-[#F4B838] shrink-0" />
            <div className="truncate">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#8FA597] block">Call Us</span>
              <span className="text-xs font-mono font-bold text-white truncate">{cafeInfo.phone}</span>
            </div>
          </div>

          <div className="bg-[#0B281B] p-4 rounded-xl border border-[#16422E] flex items-center gap-3">
            <Mail className="w-4 h-4 text-[#F4B838] shrink-0" />
            <div className="truncate">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#8FA597] block">Email Inquiries</span>
              <span className="text-xs font-mono font-bold text-white truncate">hello@bloomcafe.com</span>
            </div>
          </div>

          <div className="bg-[#0B281B] p-4 rounded-xl border border-[#16422E] flex items-center gap-3">
            <MapPin className="w-4 h-4 text-[#F4B838] shrink-0" />
            <div className="truncate">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#8FA597] block">Location</span>
              <span className="text-xs font-bold text-white truncate">{cafeInfo.address}</span>
            </div>
          </div>

          <div className="bg-[#0B281B] p-4 rounded-xl border border-[#16422E] flex items-center gap-3">
            <Clock className="w-4 h-4 text-[#B0C32E] shrink-0" />
            <div className="truncate">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#8FA597] block">Open Daily</span>
              <span className="text-xs font-bold text-white truncate">{cafeInfo.hours}</span>
            </div>
          </div>
        </div>

        {/* 4 Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 pb-10 border-b border-[#16422E]">
          <div className="md:col-span-2 space-y-4">
            <BloomLogo size="lg" showSubtitle={true} />
            <p className="text-xs text-[#CAD4CD] leading-relaxed max-w-sm font-light">
              An artisan coffee sanctuary and specialty kitchen dedicated to micro-lot roasts, ceremonial grade teas, and handcrafted brioches.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#F4B838] mb-4">
              Eat & Drink
            </h4>
            <ul className="space-y-2 text-xs text-[#A8BAAE]">
              <li>
                <button type="button" onClick={() => onScrollToSection('digital-menu')} className="hover:text-white transition-colors">
                  Specialty Coffee
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onScrollToSection('digital-menu')} className="hover:text-white transition-colors">
                  Handcrafted Teas
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onScrollToSection('digital-menu')} className="hover:text-white transition-colors">
                  Artisan Bakery
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onScrollToSection('digital-menu')} className="hover:text-white transition-colors">
                  All-Day Brunch
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#F4B838] mb-4">
              Table Service
            </h4>
            <ul className="space-y-2 text-xs text-[#A8BAAE]">
              <li>
                <button type="button" onClick={onOpenQRModal} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <QrCode className="w-3.5 h-3.5 text-[#F4B838]" />
                  <span>Table QR Generator</span>
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onScrollToSection('hour-table')} className="hover:text-white transition-colors">
                  Every Hour Schedule
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onScrollToSection('find-us')} className="hover:text-white transition-colors">
                  Free Guest WiFi
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#F4B838] mb-4">
              Administration
            </h4>
            <ul className="space-y-2 text-xs text-[#A8BAAE]">
              <li>
                <button
                  type="button"
                  onClick={onSwitchToAdmin}
                  className="hover:text-[#F4B838] transition-colors flex items-center gap-1.5"
                >
                  <Shield className="w-3.5 h-3.5 text-[#F4B838]" />
                  <span>Staff Admin Portal</span>
                </button>
              </li>
              <li>
                <span className="text-[11px] text-[#6E887B]">
                  Manage menu items, toggle in-stock status, and print table QR stands.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8FA597]">
          <p>© {new Date().getFullYear()} Bloom Cafe. All rights reserved.</p>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1 hover:text-[#F4B838] transition-colors font-mono uppercase tracking-wider"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
