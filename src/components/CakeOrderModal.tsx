import React, { useState } from 'react';
import { X, Cake, Check, Calendar, User, Phone, Sparkles } from 'lucide-react';

interface CakeOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CakeOrderModal: React.FC<CakeOrderModalProps> = ({ isOpen, onClose }) => {
  const [familyInscription, setFamilyInscription] = useState<string>('The Abebe Family');
  const [size, setSize] = useState<'standard' | 'large'>('standard');
  const [flavor, setFlavor] = useState<string>('Traditional Golden Biscuit Crumb & Chantilly');
  const [collectionDate, setCollectionDate] = useState<string>('September 11');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#0B281B] border border-[#1C4E37] rounded-3xl shadow-2xl flex flex-col overflow-hidden text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 sm:p-8 border-b border-[#16422E] flex items-center justify-between bg-[#7E5229]">
          <div>
            <span className="text-xs font-bold tracking-[0.24em] text-[#FFDF9B] uppercase block mb-1">
              ENKUTATASH NEW YEAR CELEBRATION
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-white">
              Order Your Torta Cake
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {submitted ? (
          <div className="p-10 sm:p-14 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-[#F4B838] text-[#0B281B] flex items-center justify-center mx-auto shadow-lg">
              <Check size={32} strokeWidth={2.5} />
            </div>
            <h3 className="font-editorial text-4xl text-[#FAF8F5]">
              Order Confirmed!
            </h3>
            <p className="text-[#CAD7CF] text-base max-w-md mx-auto leading-relaxed">
              Your celebration cake is scheduled with our pastry team. It will be baked fresh,
              inscribed with <strong className="text-[#F4B838]">"{familyInscription}"</strong>, and ready for collection on <strong className="text-white">{collectionDate}</strong> at Semay Tower.
            </p>
            <div className="p-4 bg-[#082015] rounded-2xl border border-[#164430] max-w-sm mx-auto text-xs text-[#A9BCB0] space-y-1">
              <p>Pickup: Semay Tower, Bole Wollo Sefer</p>
              <p>Payment on collection or CBE Birr / Telebirr</p>
              <p className="text-[#F4B838] font-semibold">Enquiries: +251 98 722 2226</p>
            </div>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-8 py-3.5 bg-[#F4B838] text-[#0B281B] font-bold text-sm tracking-wider uppercase rounded-full hover:bg-[#e6a92b] transition-all cursor-pointer"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 overflow-y-auto max-h-[75vh]">
            <div className="p-4 bg-[#082015] border border-[#164430] rounded-2xl flex items-center gap-3 text-xs text-[#CFDDD4]">
              <Cake size={24} className="text-[#F4B838] flex-shrink-0" />
              <span>
                Baked in our own pastry kitchen, finished the morning you collect it. Order 3 days ahead.
              </span>
            </div>

            {/* Cake Size Selection */}
            <div>
              <label className="text-xs font-bold tracking-wider text-[#F4B838] uppercase block mb-2">
                Choose Cake Size
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setSize('standard')}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    size === 'standard'
                      ? 'border-[#F4B838] bg-[#123D2A] text-white shadow-md'
                      : 'border-[#184531] bg-[#09261A] text-gray-300 hover:border-[#225C42]'
                  }`}
                >
                  <span className="block font-editorial text-2xl text-white">Classic Torta</span>
                  <span className="text-xs text-[#9EB2A5] block mt-1">Serves 8 — 10 guests</span>
                  <span className="text-sm font-bold font-mono text-[#F4B838] block mt-2">4,200 ETB</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSize('large')}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    size === 'large'
                      ? 'border-[#F4B838] bg-[#123D2A] text-white shadow-md'
                      : 'border-[#184531] bg-[#09261A] text-gray-300 hover:border-[#225C42]'
                  }`}
                >
                  <span className="block font-editorial text-2xl text-white">Grand Celebration</span>
                  <span className="text-xs text-[#9EB2A5] block mt-1">Serves 16 — 20 guests</span>
                  <span className="text-sm font-bold font-mono text-[#F4B838] block mt-2">6,800 ETB</span>
                </button>
              </div>
            </div>

            {/* Custom Chocolate Plaque Inscription */}
            <div>
              <label className="text-xs font-bold tracking-wider text-[#F4B838] uppercase block mb-1.5">
                Chocolate Plaque Inscription (Family Name / Greeting)
              </label>
              <input
                type="text"
                value={familyInscription}
                onChange={(e) => setFamilyInscription(e.target.value)}
                placeholder="e.g. Melkam Addis Amet - The Bekele Family"
                className="w-full bg-[#082015] border border-[#184531] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#F4B838]"
                required
              />
              <span className="text-[11px] text-gray-400 mt-1 block">
                Hand-piped in dark chocolate on a white fondant plaque.
              </span>
            </div>

            {/* Collection Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold tracking-wider text-[#F4B838] uppercase block mb-1.5">
                  Collection Date
                </label>
                <select
                  value={collectionDate}
                  onChange={(e) => setCollectionDate(e.target.value)}
                  className="w-full bg-[#082015] border border-[#184531] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F4B838]"
                >
                  <option value="September 10">Thursday, September 10 (Pagume 5)</option>
                  <option value="September 11">Friday, September 11 (Enkutatash Morning)</option>
                  <option value="September 12">Saturday, September 12</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold tracking-wider text-[#F4B838] uppercase block mb-1.5">
                  Your Phone Number
                </label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="+251 91 123 4567"
                  className="w-full bg-[#082015] border border-[#184531] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#F4B838]"
                  required
                />
              </div>
            </div>

            {/* Your Name */}
            <div>
              <label className="text-xs font-bold tracking-wider text-[#F4B838] uppercase block mb-1.5">
                Contact Name
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Full Name"
                className="w-full bg-[#082015] border border-[#184531] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#F4B838]"
                required
              />
            </div>

            {/* Submit CTA */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 bg-[#F4B838] hover:bg-[#e2a82d] text-[#0B281B] font-bold text-sm tracking-wider uppercase rounded-full transition-all cursor-pointer shadow-lg"
              >
                CONFIRM CAKE PRE-ORDER
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
