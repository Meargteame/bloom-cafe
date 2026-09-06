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
        <div className="bg-[#7E5229] rounded-3xl p-8 text-white relative overflow-hidden border border-[#966332] shadow-xl flex flex-col justify-between">
          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/20 text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#F4B838]" />
              <span>Micro-Lot Feature</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-editorial font-bold leading-snug text-white">
              Ethiopian Yirgacheffe Washed Lot
            </h3>

            <p className="text-sm text-[#F5E6D8] font-light leading-relaxed max-w-md">
              Heirloom varietal roasted lightly to preserve notes of wild jasmine blossom, bergamot tea, and ripe peach nectar. Available on pour-over or whole bean bags.
            </p>
          </div>

          <div className="pt-6 relative z-10 flex items-center justify-between">
            <span className="font-mono text-lg font-bold text-[#F4B838]">$6.00 / Cup</span>
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
        <div className="bg-[#6B4522] rounded-3xl p-8 text-white relative overflow-hidden border border-[#85562B] shadow-xl flex flex-col justify-between">
          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/20 text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider">
              <Gift className="w-3.5 h-3.5 text-[#F4B838]" />
              <span>Table Hospitality</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-editorial font-bold leading-snug text-white">
              Scan & Order at Any Table
            </h3>

            <p className="text-sm text-[#F5E6D8] font-light leading-relaxed max-w-md">
              No need to wait in line. Scan the QR code on your table stand to view real-time availability, assemble your order tray, and enjoy direct table service.
            </p>
          </div>

          <div className="pt-6 relative z-10 flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-widest text-[#F5E6D8]">Tables 1 — 16 Ready</span>
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
