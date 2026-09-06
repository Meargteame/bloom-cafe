import React from 'react';
import { IddoLogo } from './IddoLogo';
import { ActiveModal } from '../types';
import { Phone, Mail, MapPin, Clock, Instagram, Star, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onOpenModal: (modal: ActiveModal) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenModal }) => {
  return (
    <footer className="w-full bg-[#082418] text-white pt-20 pb-16 px-6 sm:px-8 border-t border-[#133A27]">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Top Header Block: Logo & Statement */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-12 border-b border-[#133C28]">
          <div className="flex items-center">
            <IddoLogo size="lg" />
          </div>
          <p className="text-[#B5C7BB] text-base sm:text-lg max-w-xl leading-relaxed font-light">
            A kitchen and coffee bar in Semay Tower, Bole Wollo Sefer — next to Garad Mall.
            Open twenty-four hours, every day of the week.
          </p>
        </div>

        {/* 4 Bento Contact Cards (Exactly as in screenshot 7 & 8) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Call Us */}
          <div className="rounded-2xl p-7 border border-[#164430] bg-[#0A2A1D]/60 flex flex-col justify-between min-h-[210px] hover:border-[#276449] transition-colors">
            <div>
              <span className="text-xs font-bold tracking-[0.2em] text-[#F4B838] uppercase block mb-3">
                CALL US
              </span>
              <a
                href="tel:+251987222226"
                className="font-editorial text-2xl sm:text-3xl text-white block hover:text-[#F4B838] transition-colors"
              >
                +251 98 722 2226
              </a>
              <a
                href="tel:+251985222254"
                className="font-editorial text-2xl sm:text-3xl text-white block hover:text-[#F4B838] transition-colors mt-1"
              >
                +251 98 522 2254
              </a>
            </div>
            <p className="text-xs text-[#8FA597] mt-4">
              Bookings, catering and enquiries
            </p>
          </div>

          {/* Card 2: Email Us */}
          <div className="rounded-2xl p-7 border border-[#164430] bg-[#0A2A1D]/60 flex flex-col justify-between min-h-[210px] hover:border-[#276449] transition-colors">
            <div>
              <span className="text-xs font-bold tracking-[0.2em] text-[#F4B838] uppercase block mb-3">
                EMAIL US
              </span>
              <a
                href="mailto:hello@iddorestaurant.com"
                className="text-lg sm:text-xl font-medium text-white break-all hover:text-[#F4B838] transition-colors block"
              >
                hello@iddorestaurant.com
              </a>
            </div>
            <p className="text-xs text-[#8FA597] mt-4">
              Opens our enquiry form — catering, private hire and press
            </p>
          </div>

          {/* Card 3: Find Us */}
          <div 
            onClick={() => onOpenModal('directions')}
            className="rounded-2xl p-7 border border-[#164430] bg-[#0A2A1D]/60 flex flex-col justify-between min-h-[210px] hover:border-[#276449] transition-colors cursor-pointer"
          >
            <div>
              <span className="text-xs font-bold tracking-[0.2em] text-[#F4B838] uppercase block mb-3">
                FIND US
              </span>
              <p className="text-lg sm:text-xl font-medium text-white">
                Semay Tower, Bole Wollo Sefer
              </p>
            </div>
            <p className="text-xs text-[#8FA597] mt-4">
              Next to Garad Mall · parking on site
            </p>
          </div>

          {/* Card 4: Open */}
          <div className="rounded-2xl p-7 border border-[#164430] bg-[#0A2A1D]/60 flex flex-col justify-between min-h-[210px] hover:border-[#276449] transition-colors">
            <div>
              <span className="text-xs font-bold tracking-[0.2em] text-[#F4B838] uppercase block mb-3">
                OPEN
              </span>
              <p className="font-editorial text-3xl sm:text-4xl text-white">
                24 hours
              </p>
            </div>
            <p className="text-xs text-[#8FA597] mt-4">
              There is no wrong time to turn up
            </p>
          </div>
        </div>

        {/* 4 Footer Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pt-6">
          {/* Col 1: EAT */}
          <div>
            <span className="text-xs font-bold tracking-[0.22em] text-[#F4B838] uppercase block mb-5">
              EAT
            </span>
            <ul className="space-y-3 text-sm text-[#CAD6CD]">
              <li>
                <button
                  onClick={() => onOpenModal('menu')}
                  className="hover:text-white transition-colors"
                >
                  Food menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenModal('menu')}
                  className="hover:text-white transition-colors"
                >
                  Shawarma station
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenModal('drinks')}
                  className="hover:text-white transition-colors"
                >
                  Drinks & coffee
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenModal('desserts')}
                  className="hover:text-white transition-colors"
                >
                  Desserts
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenModal('buffet')}
                  className="hover:text-white transition-colors"
                >
                  Lunch buffet
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: VISIT */}
          <div>
            <span className="text-xs font-bold tracking-[0.22em] text-[#F4B838] uppercase block mb-5">
              VISIT
            </span>
            <ul className="space-y-3 text-sm text-[#CAD6CD]">
              <li>
                <button
                  onClick={() => onOpenModal('whats-on')}
                  className="hover:text-white transition-colors"
                >
                  Jazz Night
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenModal('directions')}
                  className="hover:text-white transition-colors"
                >
                  Directions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenModal('visit')}
                  className="hover:text-white transition-colors"
                >
                  Opening hours
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenModal('book-table')}
                  className="hover:text-white transition-colors"
                >
                  Book a table
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: CATERING */}
          <div>
            <span className="text-xs font-bold tracking-[0.22em] text-[#F4B838] uppercase block mb-5">
              CATERING
            </span>
            <ul className="space-y-3 text-sm text-[#CAD6CD]">
              <li>
                <button
                  onClick={() => onOpenModal('catering')}
                  className="hover:text-white transition-colors"
                >
                  Catering packages
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenModal('catering')}
                  className="hover:text-white transition-colors"
                >
                  Custom packages
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenModal('cake-order')}
                  className="hover:text-white transition-colors"
                >
                  Custom cakes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenModal('catering')}
                  className="hover:text-white transition-colors"
                >
                  Private hire
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: FOLLOW */}
          <div>
            <span className="text-xs font-bold tracking-[0.22em] text-[#F4B838] uppercase block mb-5">
              FOLLOW
            </span>
            <ul className="space-y-3 text-sm text-[#CAD6CD] mb-6">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-2"
                >
                  <Instagram size={16} />
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-2"
                >
                  <span className="text-xs font-bold">TikTok</span>
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-2"
                >
                  <span className="text-xs font-bold">Facebook</span>
                </a>
              </li>
            </ul>

            <button
              onClick={() => onOpenModal('feedback')}
              className="px-5 py-2.5 rounded-full border border-[#26533F] hover:border-[#F4B838] text-[#E0E8E2] hover:text-white text-xs font-medium tracking-wide transition-all"
            >
              Leave us feedback
            </button>
          </div>
        </div>

        {/* Bottom Legal bar */}
        <div className="pt-12 border-t border-[#133A27] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#879C90]">
          <p>© 2026 IDDO Restaurant. All rights reserved.</p>
          <p>All prices include 15% VAT and 5% service charge</p>
          <p className="flex items-center gap-1 text-[#879C90]">
            Crafted for Bole Wollo Sefer, Addis Ababa
          </p>
        </div>
      </div>
    </footer>
  );
};
