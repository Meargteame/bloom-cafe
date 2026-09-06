import React, { useState, useMemo } from 'react';
import { CafeMenuItem, CategoryType, DietaryTag, CafeInfo } from '../types';
import { 
  Search, 
  Sparkles, 
  Plus, 
  Check, 
  Clock, 
  X,
  Coffee,
  CupSoda,
  Croissant,
  Utensils,
  Sandwich,
  Cake,
  AlertCircle
} from 'lucide-react';

interface DigitalMenuProps {
  menuItems: CafeMenuItem[];
  cafeInfo: CafeInfo;
  onAddItemToTray: (item: CafeMenuItem) => void;
  trayQuantities: Record<string, number>;
  onOpenItemDetail: (item: CafeMenuItem) => void;
}

export const DigitalMenu: React.FC<DigitalMenuProps> = ({
  menuItems,
  cafeInfo,
  onAddItemToTray,
  trayQuantities,
  onOpenItemDetail,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDietary, setSelectedDietary] = useState<DietaryTag | 'all'>('all');

  const categories: { id: CategoryType; label: string }[] = [
    { id: 'all', label: 'All Offerings' },
    { id: 'coffee', label: 'Specialty Coffee' },
    { id: 'tea', label: 'Teas & Coolers' },
    { id: 'bakery', label: 'Artisan Bakery' },
    { id: 'brunch', label: 'All-Day Brunch' },
    { id: 'sandwiches', label: 'Toasties & Bagels' },
    { id: 'desserts', label: 'Sweet Treats' },
  ];

  const dietaryFilters: { id: DietaryTag | 'all'; label: string }[] = [
    { id: 'all', label: 'All Diets' },
    { id: 'popular', label: 'Cafe Favorites' },
    { id: 'vegan', label: 'Vegan' },
    { id: 'vegetarian', label: 'Vegetarian' },
    { id: 'gluten-free', label: 'Gluten-Free' },
    { id: 'chef-choice', label: 'Roaster Choice' },
  ];

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      if (selectedDietary !== 'all') {
        if (!item.dietary || !item.dietary.includes(selectedDietary)) {
          return false;
        }
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesCat = item.category.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCat) {
          return false;
        }
      }
      return true;
    });
  }, [menuItems, selectedCategory, selectedDietary, searchQuery]);

  return (
    <section id="digital-menu" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="max-w-2xl mb-10">
        <div className="flex items-center gap-2 text-[#F4B838] tracking-[0.24em] uppercase text-xs font-bold mb-2">
          <span className="w-2 h-2 rounded-full bg-[#F4B838]" />
          <span>CONTACTLESS TABLE SERVICE</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-editorial font-bold text-[#FAF8F5] tracking-tight">
          Digital <span className="italic font-normal text-[#F4B838]">menu</span>.
        </h2>
        <p className="text-sm sm:text-base text-[#CAD4CD] mt-2 font-light leading-relaxed">
          Order directly from your table or counter. Single-origin roasts, organic teas, and artisan bakery items.
        </p>
      </div>

      {/* Modern Full-Width Filter Hub in Obsidian Dark #071E13 */}
      <div className="w-full bg-[#071E13] rounded-3xl border border-[#16422E] p-5 sm:p-6 mb-10 shadow-2xl space-y-4">
        {/* Search bar & offering counter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8FA597]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search woodfired pizza, burgers, macchiato, shiro, mojitos..."
              className="w-full pl-11 pr-10 py-3 bg-[#0B281B] text-sm text-[#FAF8F5] rounded-2xl border border-[#16422E] focus:outline-hidden focus:border-[#F4B838] placeholder-[#6E887B] transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8FA597] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between sm:justify-center px-4 py-3 bg-[#0B281B] border border-[#16422E] rounded-2xl text-xs font-mono font-bold text-[#F4B838] shrink-0">
            <span>{filteredItems.length} {filteredItems.length === 1 ? 'OFFERING' : 'OFFERINGS'}</span>
          </div>
        </div>

        {/* Categories Horizontal Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar pt-1">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all select-none ${
                  isSelected
                    ? 'bg-[#F4B838] text-black shadow-lg scale-[1.02]'
                    : 'bg-[#0B281B] text-[#CAD4CD] border border-[#16422E] hover:text-white hover:border-[#F4B838]/50'
                }`}
              >
                <span className={isSelected ? 'text-black' : 'text-[#F4B838]'}>
                  {cat.icon}
                </span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dietary Filters Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-[#16422E]/80 no-scrollbar text-xs">
          <span className="text-[10px] font-bold text-[#8FA597] uppercase tracking-wider mr-1 shrink-0">
            Dietary:
          </span>
          {dietaryFilters.map((df) => {
            const isSelected = selectedDietary === df.id;
            return (
              <button
                key={df.id}
                type="button"
                onClick={() => setSelectedDietary(df.id)}
                className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap text-[11px] font-semibold ${
                  isSelected
                    ? 'bg-[#B0C32E] text-[#071E13] font-bold shadow-xs'
                    : 'bg-[#0B281B] text-[#A8BAAE] border border-[#16422E] hover:bg-[#123827] hover:text-white'
                }`}
              >
                {df.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Menu Cards Grid */}
      {filteredItems.length === 0 ? (
        <div className="bg-[#071E13] rounded-3xl border border-[#16422E] p-12 text-center max-w-md mx-auto my-8">
          <div className="w-12 h-12 rounded-full bg-[#123827] text-[#F4B838] flex items-center justify-center mx-auto mb-3">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-editorial font-bold text-white">No items found</h3>
          <p className="text-xs text-[#8FA597] mt-1 mb-4">
            Try adjusting your search or clearing active dietary filters.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('all');
              setSelectedDietary('all');
              setSearchQuery('');
            }}
            className="px-5 py-2 bg-[#F4B838] text-black font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#E4A82B] transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item) => {
            const inTrayCount = trayQuantities[item.id] || 0;

            return (
              <div
                key={item.id}
                className={`group bg-[#071E13] rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-md hover:shadow-xl ${
                  !item.isAvailable 
                    ? 'border-[#16422E] opacity-60' 
                    : 'border-[#16422E] hover:border-[#F4B838]/60'
                }`}
              >
                {/* Optional Item Image Header */}
                {item.image && (
                  <div 
                    onClick={() => onOpenItemDetail(item)}
                    className="relative h-44 overflow-hidden cursor-pointer"
                  >
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071E13] via-transparent to-black/30" />
                  </div>
                )}

                {/* Body */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    {item.isAvailable ? (
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#B0C32E] animate-pulse" />
                        <span className="text-[10px] font-bold text-[#B0C32E] uppercase tracking-wider">
                          In Stock
                        </span>
                      </div>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-red-950 text-red-300 text-[10px] font-bold uppercase tracking-wider border border-red-800">
                        Sold Out
                      </span>
                    )}

                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#8FA597] bg-[#0B281B] px-2 py-0.5 rounded border border-[#16422E]">
                      {item.category}
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 
                      onClick={() => onOpenItemDetail(item)}
                      className="text-xl font-editorial font-bold text-[#FAF8F5] group-hover:text-[#F4B838] transition-colors cursor-pointer"
                    >
                      {item.name}
                    </h3>
                    <span className="font-mono text-base font-bold text-[#F4B838] shrink-0">
                      {cafeInfo.currencySymbol}{item.price.toFixed(2)}
                    </span>
                  </div>

                  <p 
                    onClick={() => onOpenItemDetail(item)}
                    className="text-xs text-[#CAD4CD] leading-relaxed mb-4 line-clamp-2 cursor-pointer font-light"
                  >
                    {item.description}
                  </p>

                  {/* Dietary Chips */}
                  <div className="mt-auto pt-3 border-t border-[#16422E] flex flex-wrap items-center gap-1.5 text-[10px]">
                    {item.dietary?.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded bg-[#0B281B] text-[#A8BAAE] border border-[#16422E] font-medium"
                      >
                        {tag === 'vegan' && 'Vegan'}
                        {tag === 'vegetarian' && 'Vegetarian'}
                        {tag === 'gluten-free' && 'Gluten-Free'}
                        {tag === 'popular' && 'Popular'}
                        {tag === 'chef-choice' && 'Chef Pick'}
                      </span>
                    ))}

                    {item.preparationTime && (
                      <span className="inline-flex items-center gap-1 text-[#8FA597] ml-auto font-mono">
                        <Clock className="w-3 h-3 text-[#F4B838]" />
                        <span>{item.preparationTime}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Bar */}
                <div className="px-6 py-3.5 bg-[#0B281B] border-t border-[#16422E] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => onOpenItemDetail(item)}
                    className="text-xs font-semibold text-[#CAD4CD] hover:text-[#F4B838] transition-colors uppercase tracking-wider"
                  >
                    Details →
                  </button>

                  {item.isAvailable ? (
                    <button
                      type="button"
                      onClick={() => onAddItemToTray(item)}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md ${
                        inTrayCount > 0
                          ? 'bg-[#B0C32E] text-[#071E13] hover:bg-[#9EAF28]'
                          : 'bg-[#F4B838] text-black hover:bg-[#E4A82B]'
                      }`}
                    >
                      {inTrayCount > 0 ? (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>{inTrayCount} in Tray</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5 stroke-[3]" />
                          <span>+ Add</span>
                        </>
                      )}
                    </button>
                  ) : (
                    <span className="text-xs text-[#6E887B] font-medium italic">
                      Unavailable Today
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
