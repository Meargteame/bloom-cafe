import React, { useState } from 'react';
import { CafeMenuItem, CafeInfo } from '../types';
import { X, Clock, Flame, Plus, Minus, Check, Coffee, ShieldCheck } from 'lucide-react';

interface ItemDetailModalProps {
  item: CafeMenuItem | null;
  onClose: () => void;
  cafeInfo: CafeInfo;
  onAddToTray: (item: CafeMenuItem, quantity: number) => void;
  currentQuantity: number;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  item,
  onClose,
  cafeInfo,
  onAddToTray,
  currentQuantity,
}) => {
  const [qty, setQty] = useState<number>(currentQuantity > 0 ? currentQuantity : 1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!item) return null;

  const handleAdd = () => {
    onAddToTray(item, qty);
    setAddedAnimation(true);
    setTimeout(() => {
      onClose();
    }, 400);
  };

  // Parse Amharic vs English title
  const nameMatch = item.name.match(/^(.*?)\s*\((.*?)\)$/);
  const amharicName = nameMatch ? nameMatch[1].trim() : null;
  const mainTitle = nameMatch ? nameMatch[2].trim() : item.name;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl bg-[#082015] text-white rounded-3xl shadow-2xl border border-[#1B4C36] overflow-hidden grid grid-cols-1 md:grid-cols-12 max-h-[90vh] overflow-y-auto md:overflow-y-visible"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button Floating */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#071E13]/80 hover:bg-[#0B281B] text-[#CAD4CD] hover:text-white flex items-center justify-center transition-all border border-[#16422E] backdrop-blur-md shadow-lg"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image & Showcase (5 cols) */}
        <div className="md:col-span-5 relative bg-[#071E13] flex flex-col min-h-[260px] md:min-h-[460px] border-b md:border-b-0 md:border-r border-[#16422E] overflow-hidden">
          {item.image ? (
            <div className="relative w-full h-full min-h-[260px] md:min-h-full">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071E13] via-[#071E13]/20 to-transparent" />
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-radial from-[#123827] to-[#071E13] p-8">
              <Coffee className="w-20 h-20 text-[#16422E]" />
            </div>
          )}

          {/* Floating Category Badge over Image */}
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B281B]/90 text-[#F4B838] text-[10px] font-bold uppercase tracking-[0.2em] border border-[#F4B838]/30 backdrop-blur-md shadow-md">
              Bloom {item.category.replace('-', ' ')}
            </span>
          </div>

          {/* Bottom Floating Stock & Timing Info */}
          <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between">
            {item.isAvailable ? (
              <span className="px-3 py-1 rounded-full bg-[#0B281B]/90 text-[#B0C32E] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border border-[#B0C32E]/30 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#B0C32E] animate-pulse" />
                In Stock
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full bg-red-950/90 text-red-300 text-xs font-bold uppercase tracking-wider border border-red-800/50 backdrop-blur-md">
                Sold Out
              </span>
            )}

            {item.preparationTime && (
              <span className="px-3 py-1 rounded-full bg-[#071E13]/90 text-[#CAD4CD] text-xs font-mono font-medium flex items-center gap-1.5 border border-[#16422E] backdrop-blur-md">
                <Clock className="w-3.5 h-3.5 text-[#F4B838]" />
                {item.preparationTime}
              </span>
            )}
          </div>
        </div>

        {/* Right Column: Details & Order Controls (7 cols) */}
        <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-[#082015]">
          {/* Header Title & Pricing */}
          <div>
            {amharicName && (
              <p className="text-base sm:text-lg text-[#8FA597] font-medium tracking-wide font-sans mb-1">
                {amharicName}
              </p>
            )}
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-editorial text-[#FAF8F5] leading-tight mb-4">
              {mainTitle}
            </h2>

            <div className="inline-flex items-baseline gap-2 px-4 py-2 rounded-2xl bg-[#071E13] border border-[#16422E]">
              <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#8FA597]">Price</span>
              <span className="font-mono text-2xl sm:text-3xl font-extrabold text-[#F4B838]">
                {item.price} <span className="text-sm font-sans font-normal text-[#CAD4CD]">{cafeInfo.currencySymbol}</span>
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-[10px] uppercase font-bold tracking-[0.24em] text-[#8FA597]">
              Craft & Flavor Profile
            </h4>
            <p className="text-sm sm:text-base text-[#CAD4CD] leading-relaxed font-light">
              {item.description}
            </p>
          </div>

          {/* Bento Specs Row */}
          <div className="grid grid-cols-2 gap-3">
            {item.temperature && (
              <div className="bg-[#071E13] p-3 rounded-2xl border border-[#16422E] flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#0B281B] text-[#F4B838] flex items-center justify-center border border-[#16422E]">
                  <Coffee className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#8FA597] block">Serving</span>
                  <span className="text-xs font-bold text-white capitalize">
                    {item.temperature === 'both' ? 'Hot or Iced' : item.temperature}
                  </span>
                </div>
              </div>
            )}

            {item.calories && (
              <div className="bg-[#071E13] p-3 rounded-2xl border border-[#16422E] flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#0B281B] text-[#F4B838] flex items-center justify-center border border-[#16422E]">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#8FA597] block">Energy</span>
                  <span className="text-xs font-mono font-bold text-white">
                    {item.calories}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Dietary Specifications */}
          {item.dietary && item.dietary.length > 0 && (
            <div>
              <h4 className="text-[10px] uppercase font-bold tracking-[0.24em] text-[#8FA597] mb-2">
                Dietary & Quality Standard
              </h4>
              <div className="flex flex-wrap gap-2">
                {item.dietary.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-xl bg-[#071E13] text-[#FAF8F5] border border-[#16422E] text-xs font-medium flex items-center gap-1.5"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-[#F4B838]" />
                    {tag === 'vegan' && '100% Vegan Plant-Based'}
                    {tag === 'vegetarian' && 'Vegetarian Friendly'}
                    {tag === 'gluten-free' && 'Gluten-Free Recipe'}
                    {tag === 'popular' && 'Guest Favorite'}
                    {tag === 'chef-choice' && 'Roaster Master Pick'}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Interactive Footer & Tray Action */}
          <div className="pt-4 border-t border-[#16422E]">
            {item.isAvailable ? (
              <div className="flex items-center gap-4">
                {/* Stepper */}
                <div className="flex items-center bg-[#071E13] rounded-2xl border border-[#16422E] p-1.5 shadow-inner">
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-[#8FA597] hover:text-white hover:bg-[#0B281B] transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center font-mono font-bold text-base text-[#FAF8F5]">
                    {qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQty((q) => q + 1)}
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-[#8FA597] hover:text-white hover:bg-[#0B281B] transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Primary Gold CTA */}
                <button
                  type="button"
                  onClick={handleAdd}
                  disabled={addedAnimation}
                  className={`flex-1 py-4 px-6 rounded-2xl font-bold text-xs uppercase tracking-[0.2em] transition-all shadow-xl flex items-center justify-between gap-2 ${
                    addedAnimation 
                      ? 'bg-[#B0C32E] text-[#071E13]' 
                      : 'bg-[#F4B838] hover:bg-[#E4A82B] text-[#0B281B] active:scale-[0.98]'
                  }`}
                >
                  <span>{addedAnimation ? 'Added to Order!' : `Add ${qty} to Table Order`}</span>
                  <span className="font-mono text-sm">
                    {item.price * qty} {cafeInfo.currencySymbol}
                  </span>
                </button>
              </div>
            ) : (
              <div className="p-4 bg-red-950/40 border border-red-800/60 rounded-2xl text-center text-xs text-red-300 font-medium">
                This item is currently sold out for today's service.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
