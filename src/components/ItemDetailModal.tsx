import React, { useState } from 'react';
import { CafeMenuItem, CafeInfo } from '../types';
import { X, Clock, Flame, Sparkles, Plus, Minus, Check, Coffee } from 'lucide-react';

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

  if (!item) return null;

  const handleAdd = () => {
    onAddToTray(item, qty);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
      <div 
        className="relative w-full max-w-lg bg-[#0B281B] text-white rounded-3xl shadow-2xl border border-[#16422E] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Banner */}
        <div className="bg-[#071E13] p-6 relative border-b border-[#16422E]">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#0B281B] text-[#8FA597] hover:text-white flex items-center justify-center transition-colors border border-[#16422E]"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0B281B] text-[#F4B838] text-[10px] font-bold uppercase tracking-[0.2em] border border-[#16422E] mb-3">
            <Sparkles className="w-3 h-3" />
            <span>Bloom {item.category}</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold font-editorial text-[#FAF8F5] leading-tight">
            {item.name}
          </h3>

          <div className="flex items-center gap-3 mt-3">
            <span className="font-mono text-2xl font-bold text-[#F4B838]">
              {cafeInfo.currencySymbol}{item.price.toFixed(2)}
            </span>
            {item.isAvailable ? (
              <span className="px-2.5 py-0.5 rounded-full bg-[#123827] text-[#B0C32E] text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B0C32E] animate-ping" />
                In Stock
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded-full bg-red-950 text-red-300 text-xs font-bold uppercase tracking-wider">
                Sold Out
              </span>
            )}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <div>
            <h4 className="text-[10px] uppercase font-bold tracking-[0.24em] text-[#8FA597] mb-1">
              Description & Notes
            </h4>
            <p className="text-sm text-[#CAD4CD] leading-relaxed font-light">
              {item.description}
            </p>
          </div>

          {/* Quick Specifications Bento */}
          <div className="grid grid-cols-3 gap-3">
            {item.preparationTime && (
              <div className="bg-[#071E13] p-3 rounded-xl border border-[#16422E]">
                <span className="text-[10px] uppercase tracking-wider text-[#8FA597] block mb-1">Prep Time</span>
                <span className="text-xs font-mono font-bold text-white flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#F4B838]" />
                  {item.preparationTime}
                </span>
              </div>
            )}

            {item.temperature && (
              <div className="bg-[#071E13] p-3 rounded-xl border border-[#16422E]">
                <span className="text-[10px] uppercase tracking-wider text-[#8FA597] block mb-1">Serving</span>
                <span className="text-xs font-bold text-white capitalize flex items-center gap-1">
                  <Coffee className="w-3.5 h-3.5 text-[#F4B838]" />
                  {item.temperature === 'both' ? 'Hot or Iced' : item.temperature}
                </span>
              </div>
            )}

            {item.calories && (
              <div className="bg-[#071E13] p-3 rounded-xl border border-[#16422E]">
                <span className="text-[10px] uppercase tracking-wider text-[#8FA597] block mb-1">Energy</span>
                <span className="text-xs font-mono font-bold text-white flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-[#F4B838]" />
                  {item.calories}
                </span>
              </div>
            )}
          </div>

          {/* Dietary Tags */}
          {item.dietary && item.dietary.length > 0 && (
            <div>
              <h4 className="text-[10px] uppercase font-bold tracking-[0.24em] text-[#8FA597] mb-2">
                Dietary & Dietary Specs
              </h4>
              <div className="flex flex-wrap gap-2">
                {item.dietary.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-lg bg-[#071E13] text-[#FAF8F5] border border-[#16422E] text-xs font-medium"
                  >
                    {tag === 'vegan' && '🌱 100% Vegan Plant-Based'}
                    {tag === 'vegetarian' && '🌿 Vegetarian Friendly'}
                    {tag === 'gluten-free' && '🌾 Gluten-Free Recipe'}
                    {tag === 'popular' && '★ Guest Favorite'}
                    {tag === 'chef-choice' && '✨ Roaster Master Pick'}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Quantity and Add to Tray */}
          {item.isAvailable ? (
            <div className="pt-4 border-t border-[#16422E] flex items-center gap-4">
              <div className="flex items-center bg-[#071E13] rounded-xl border border-[#16422E] p-1">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-[#8FA597] hover:text-white hover:bg-[#16422E]"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-mono font-bold text-sm text-white">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty((q) => q + 1)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-[#8FA597] hover:text-white hover:bg-[#16422E]"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className="flex-1 py-3.5 bg-[#F4B838] hover:bg-[#E4A82B] text-black font-bold text-xs uppercase tracking-[0.2em] rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <span>Add {qty} To Table Order</span>
                <span className="font-mono">({cafeInfo.currencySymbol}{(item.price * qty).toFixed(2)})</span>
              </button>
            </div>
          ) : (
            <div className="p-3 bg-red-950/40 border border-red-900 rounded-xl text-center text-xs text-red-300">
              This offering is currently sold out for the day.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
