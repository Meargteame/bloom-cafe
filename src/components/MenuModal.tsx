import React, { useState } from 'react';
import { X, Search, Sparkles, Utensils, Coffee, Flame, Cake, Check } from 'lucide-react';
import { MENU_ITEMS } from '../data/restaurantData';
import { MenuItem } from '../types';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: string;
}

export const MenuModal: React.FC<MenuModalProps> = ({ isOpen, onClose, initialCategory = 'all' }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');

  if (!isOpen) return null;

  const categories = [
    { id: 'all', label: 'Full Menu' },
    { id: 'breakfast', label: 'Breakfast (05:00 - 11:00)' },
    { id: 'buffet', label: 'Lunch Buffet' },
    { id: 'shawarma', label: 'Shawarma Station' },
    { id: 'coffee', label: 'Coffee Bar & Syphon' },
    { id: 'drinks', label: 'Fresh Juices & Spris' },
    { id: 'desserts', label: 'Pastry & Torta Cakes' },
  ];

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      item.category === selectedCategory ||
      (selectedCategory === 'coffee' && item.category === 'coffee') ||
      (selectedCategory === 'drinks' && (item.category === 'drinks' || item.category === 'coffee'));

    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.amharicName && item.amharicName.includes(searchQuery));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#0B281B] border border-[#1B4C36] rounded-3xl shadow-2xl flex flex-col overflow-hidden text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-[#16422E] flex items-center justify-between bg-[#082015]">
          <div>
            <span className="text-xs font-bold tracking-[0.24em] text-[#F4B838] uppercase block mb-1">
              IDDO KITCHEN & COFFEE BAR
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#FAF8F5]">
              The Menu
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-[#113825] hover:bg-[#1A4E35] flex items-center justify-center text-gray-300 hover:text-white transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search & Category Tabs */}
        <div className="p-5 sm:p-6 bg-[#0B281B] border-b border-[#143B29] space-y-4">
          {/* Search bar */}
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search teff pancakes, macchiato, shawarma, torta cake..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#081F15] border border-[#194933] rounded-full pl-11 pr-4 py-2.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#F4B838]"
            />
          </div>

          {/* Categories pills */}
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#F4B838] text-[#0B281B] shadow-md'
                    : 'bg-[#0E3524] hover:bg-[#164932] text-[#D0DCD4]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items List */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-4">
          {filteredItems.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <p>No menu items found matching "{searchQuery}".</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#09261A] border border-[#17432E] hover:border-[#276449] rounded-2xl p-5 flex flex-col justify-between transition-all hover:bg-[#0C2F20]"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-1.5">
                      <div>
                        <h4 className="font-editorial text-xl sm:text-2xl text-[#FAF8F5] leading-snug">
                          {item.name}
                        </h4>
                        {item.amharicName && (
                          <span className="text-xs text-[#F4B838] font-medium block mt-0.5">
                            {item.amharicName}
                          </span>
                        )}
                      </div>
                      <span className="text-sm font-bold font-mono text-[#F4B838] whitespace-nowrap bg-[#0F3725] px-2.5 py-1 rounded-md border border-[#1A4C35]">
                        {item.price}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#AABDB2] leading-relaxed mt-2 mb-3">
                      {item.description}
                    </p>
                  </div>

                  {item.tag && (
                    <div className="pt-2 border-t border-[#133C27]">
                      <span className="inline-block text-[11px] font-semibold text-[#F4B838] tracking-wider uppercase">
                        ● {item.tag}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer info note */}
        <div className="p-4 sm:p-5 bg-[#071D13] border-t border-[#143D2A] text-center text-xs text-[#8EAAA0]">
          Prices include 15% VAT and 5% service charge · Kitchen open 24/7 at Semay Tower, Bole Wollo Sefer
        </div>
      </div>
    </div>
  );
};
