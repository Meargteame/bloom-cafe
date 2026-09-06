import React from 'react';
import { Sparkles, ArrowRight, Gift, Coffee } from 'lucide-react';

interface PromoCarouselProps {
  onScrollToMenu: () => void;
  onOpenQRModal: () => void;
}

export const PromoCarousel: React.FC<PromoCarouselProps> = ({
  onScrollToMenu,
  onOpenQRModal,
}) => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-[#F4B838] tracking-[0.24em] uppercase text-xs font-bold block mb-1">
            SEASONAL & FEATURED
          </span>
          <h2 className="text-3xl font-editorial font-bold text-[#FAF8F5]">
            Handcrafted <span className="italic font-normal text-[#F4B838]">specials</span>.
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tobacco Brown Card 1 */}
        <div className="bg-[#7E5229] rounded-3xl p-8 text-white relative overflow-hidden border border-[#966332] shadow-xl flex flex-col justify-between group">
          {/* Background Image Overlay */}
          <img 
            src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80" 
            alt="Traditional Ethiopian Coffee"
            className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#7E5229] via-[#7E5229]/80 to-transparent pointer-events-none" />

          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-xs text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-[#F4B838]" />
              <span>Specialty Coffee Roast</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-editorial font-bold leading-snug text-white">
              Traditional Jebena Buna & Special Macchiato
            </h3>

            <p className="text-sm text-[#F5E6D8] font-light leading-relaxed max-w-md">
              Highland Arabica beans freshly roasted on-site and served in traditional Jebena clay pots alongside our double-espresso Special Macchiato.
            </p>
          </div>

          <div className="pt-6 relative z-10 flex items-center justify-between">
            <span className="font-mono text-lg font-bold text-[#F4B838]">45 ብር / Cup</span>
            <button
              type="button"
              onClick={onScrollToMenu}
              className="px-5 py-2.5 rounded-xl bg-[#F4B838] hover:bg-[#E4A82B] text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-md"
            >
              <span>Order on Menu</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tobacco Brown Card 2 */}
        <div className="bg-[#6B4522] rounded-3xl p-8 text-white relative overflow-hidden border border-[#85562B] shadow-xl flex flex-col justify-between group">
          {/* Background Image Overlay */}
          <img 
            src="https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80" 
            alt="Signature Special Mojito"
            className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#6B4522] via-[#6B4522]/80 to-transparent pointer-events-none" />

          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-xs text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider border border-white/10">
              <Gift className="w-3.5 h-3.5 text-[#F4B838]" />
              <span>Signature Mocktails</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-editorial font-bold leading-snug text-white">
              Special Mojito & Avatar Mocktail
            </h3>

            <p className="text-sm text-[#F5E6D8] font-light leading-relaxed max-w-md">
              Hand-muddled fresh mint, lime, crushed ice & passionfruit elixir. Scan your table QR code to order direct table delivery.
            </p>
          </div>

          <div className="pt-6 relative z-10 flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-widest text-[#F5E6D8]">Tables 1 — 20 Ready</span>
            <button
              type="button"
              onClick={onOpenQRModal}
              className="px-5 py-2.5 rounded-xl bg-[#071E13] hover:bg-[#0B281B] text-white border border-[#F4B838]/50 hover:border-[#F4B838] font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
            >
              <span>Generate Stand</span>
              <ArrowRight className="w-4 h-4 text-[#F4B838]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
