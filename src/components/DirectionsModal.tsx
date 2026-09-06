import React from 'react';
import { X, MapPin, Phone, Car, Navigation, ExternalLink } from 'lucide-react';

interface DirectionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DirectionsModal: React.FC<DirectionsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-[#0B281B] border border-[#1C4E37] rounded-3xl shadow-2xl flex flex-col overflow-hidden text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 sm:p-8 border-b border-[#16422E] flex items-center justify-between bg-[#082015]">
          <div>
            <span className="text-xs font-bold tracking-[0.24em] text-[#F4B838] uppercase block mb-1">
              LOCATION & DIRECTIONS
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-white">
              Semay Tower, Bole Wollo Sefer
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
          {/* Stylized visual map schematic */}
          <div className="relative w-full h-52 bg-[#081F15] rounded-2xl border border-[#174630] overflow-hidden flex items-center justify-center p-4">
            {/* Street grid representation */}
            <div className="absolute inset-0 opacity-20">
              <div className="w-full h-full" style={{
                backgroundImage: 'linear-gradient(#265E42 1px, transparent 1px), linear-gradient(to right, #265E42 1px, transparent 1px)',
                backgroundSize: '36px 36px'
              }} />
            </div>

            {/* Bole Road / Wollo Sefer marker */}
            <div className="relative z-10 text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-[#F4B838] text-[#0B281B] flex items-center justify-center shadow-2xl animate-bounce">
                <MapPin size={28} />
              </div>
              <div className="mt-3 bg-[#0B281B]/90 border border-[#F4B838]/40 px-4 py-2 rounded-xl backdrop-blur-md shadow-lg">
                <p className="font-bold text-white text-sm">IDDO Restaurant & Coffee Bar</p>
                <p className="text-xs text-[#F4B838]">Semay Tower, Ground Floor (Next to Garad Mall)</p>
              </div>
            </div>
          </div>

          {/* Details list */}
          <div className="space-y-3 text-sm text-[#CAD7CE]">
            <div className="flex items-start gap-3 p-3 bg-[#09261A] rounded-xl border border-[#174531]">
              <Car size={18} className="text-[#F4B838] mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-white">Parking on Site</p>
                <p className="text-xs text-gray-400">Designated valet & self-parking spaces in Semay Tower basement and forecourt.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-[#09261A] rounded-xl border border-[#174531]">
              <Navigation size={18} className="text-[#F4B838] mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-white">Landmarks & Accessibility</p>
                <p className="text-xs text-gray-400">Directly beside Garad Mall, 4 minutes from Bole Medhanialem and 7 minutes from Bole International Airport.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-[#09261A] rounded-xl border border-[#174531]">
              <Phone size={18} className="text-[#F4B838] mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-white">Need Directions on Call?</p>
                <a href="tel:+251987222226" className="text-xs text-[#F4B838] hover:underline font-mono">
                  +251 98 722 2226 / +251 98 522 2254
                </a>
              </div>
            </div>
          </div>

          {/* Direct External Map Links */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <a
              href="https://maps.google.com/?q=IDDO+Restaurant+Semay+Tower+Addis+Ababa"
              target="_blank"
              rel="noreferrer"
              className="flex-1 py-3.5 bg-[#F4B838] hover:bg-[#e4a82b] text-[#0B281B] font-bold text-xs tracking-wider uppercase rounded-full transition-all inline-flex items-center justify-center gap-2"
            >
              <span>Launch Google Maps</span>
              <ExternalLink size={15} />
            </a>

            <button
              onClick={onClose}
              className="py-3.5 px-6 border border-[#23503B] hover:bg-[#133D2B] text-white text-xs font-semibold tracking-wider uppercase rounded-full transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
