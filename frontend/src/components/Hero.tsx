import React from 'react';
import { CafeInfo } from '../types';
import { ArrowDown, QrCode, ShoppingBag, Sparkles, Clock, Wifi, Check, Copy, Utensils } from 'lucide-react';

interface HeroProps {
  cafeInfo: CafeInfo;
  onOpenQRModal: () => void;
  onOpenOrderTray: () => void;
  orderItemCount: number;
  onScrollToSection: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  cafeInfo,
  onOpenQRModal,
  onOpenOrderTray,
  orderItemCount,
  onScrollToSection,
}) => {
  const [copiedWifi, setCopiedWifi] = React.useState<boolean>(false);

  const handleCopyWifi = () => {
    navigator.clipboard.writeText(cafeInfo.wifiPassword);
    setCopiedWifi(true);
    setTimeout(() => setCopiedWifi(false), 2000);
  };

  return (
    <section id="hero" className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Location Eyebrow */}
      <div className="flex items-center gap-2 mb-4 text-[#F4B838] tracking-[0.24em] uppercase text-xs font-bold">
        <span className="w-2 h-2 rounded-full bg-[#F4B838]" />
        <span>ADEBABAY STREET · SPECIALTY ROASTERY · GOURMET KITCHEN</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Main Headline Pairing Roman with Italic Golden Word */}
        <div className="lg:col-span-7 space-y-6">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-editorial font-bold text-[#FAF8F5] tracking-tight leading-[1.05]">
            Taste the <span className="italic font-normal text-[#F4B838]">bloom</span>.
          </h1>

          <p className="text-xl sm:text-2xl font-editorial text-[#F4B838] font-normal italic tracking-wide">
            እንኳን ወደ ብሉም ካፌ በደህና መጡ
          </p>

          <p className="text-base sm:text-lg text-[#CAD4CD] leading-relaxed max-w-2xl font-light">
            A specialty coffee roastery, gourmet kitchen, and mocktail sanctuary in Adebabay Street. Scan your table QR code or explore our digital menu to place instant table orders.
          </p>

          {/* Quick Stat Chips */}
          <div className="flex flex-wrap items-center gap-3 py-1 text-xs">
            <div className="px-3 py-1.5 rounded-xl bg-[#071E13] border border-[#16422E] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#B0C32E]" />
              <span className="font-mono text-[#FAF8F5] font-bold">160+</span>
              <span className="text-[#8FA597]">Menu Items</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-[#071E13] border border-[#16422E] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F4B838]" />
              <span className="font-mono text-[#FAF8F5] font-bold">20</span>
              <span className="text-[#8FA597]">Digital Tables</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-[#071E13] border border-[#16422E] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#B0C32E]" />
              <span className="font-mono text-[#FAF8F5] font-bold">ETB</span>
              <span className="text-[#8FA597]">Local Currency (ብር)</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {/* Primary Gold CTA */}
            <button
              type="button"
              onClick={() => onScrollToSection('digital-menu')}
              className="px-7 py-3.5 bg-[#F4B838] hover:bg-[#E4A82B] text-black font-bold text-xs uppercase tracking-[0.2em] rounded-xl shadow-lg transition-all flex items-center gap-2 group"
            >
              <span>Explore Menu</span>
              <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
            </button>

            {/* Secondary Outline Pill */}
            <button
              type="button"
              onClick={onOpenQRModal}
              className="px-6 py-3.5 bg-[#071E13] hover:bg-[#123827] text-white border border-[#16422E] hover:border-[#F4B838] font-bold text-xs uppercase tracking-[0.2em] rounded-xl transition-all flex items-center gap-2"
            >
              <QrCode className="w-4 h-4 text-[#F4B838]" />
              <span>Table QR Stand</span>
            </button>

            {/* Order Tray Pill if active */}
            {orderItemCount > 0 && (
              <button
                type="button"
                onClick={onOpenOrderTray}
                className="px-6 py-3.5 bg-[#FAF8F5] hover:bg-white text-[#0B281B] font-bold text-xs uppercase tracking-[0.2em] rounded-xl transition-all flex items-center gap-2 shadow-lg"
              >
                <ShoppingBag className="w-4 h-4 text-[#F4B838]" />
                <span>Table Order ({orderItemCount})</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Side Visual Showcase */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-3 relative">
          <div className="space-y-3">
            <div className="relative h-44 sm:h-52 rounded-2xl overflow-hidden border border-[#16422E] shadow-xl group">
              <img 
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80" 
                alt="Bloom Cafe Ambiance" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071E13] via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#F4B838]">Roastery Sanctuary</span>
              </div>
            </div>
            <div className="relative h-32 rounded-2xl overflow-hidden border border-[#16422E] shadow-xl group">
              <img 
                src="https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80" 
                alt="Signature Mojito" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071E13] via-transparent to-transparent" />
              <div className="absolute bottom-2.5 left-3">
                <span className="text-[10px] font-bold text-white">Special Mojito</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-6">
            <div className="relative h-32 rounded-2xl overflow-hidden border border-[#16422E] shadow-xl group">
              <img 
                src="https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80" 
                alt="Special Macchiato" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071E13] via-transparent to-transparent" />
              <div className="absolute bottom-2.5 left-3">
                <span className="text-[10px] font-bold text-white">Special Macchiato</span>
              </div>
            </div>
            <div className="relative h-44 sm:h-52 rounded-2xl overflow-hidden border border-[#16422E] shadow-xl group">
              <img 
                src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80" 
                alt="Woodfired Pizza" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071E13] via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#F4B838]">Bloom Special Pizza</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Guest WiFi & Hours Bento Strip */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-[#16422E] pt-8">
        <div className="bg-[#071E13] p-4 rounded-2xl border border-[#16422E] flex items-center gap-3">
          <Clock className="w-5 h-5 text-[#F4B838] shrink-0" />
          <div>
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#8FA597] block">Hours</span>
            <span className="text-sm font-semibold text-[#FAF8F5]">{cafeInfo.hours}</span>
          </div>
        </div>

        <div className="bg-[#071E13] p-4 rounded-2xl border border-[#16422E] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Wifi className="w-5 h-5 text-[#F4B838] shrink-0" />
            <div>
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#8FA597] block">Guest WiFi</span>
              <span className="text-xs font-mono text-[#FAF8F5]">{cafeInfo.wifiName}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleCopyWifi}
            className="px-2.5 py-1 rounded-lg bg-[#16422E] hover:bg-[#F4B838] text-[#F4B838] hover:text-black text-[10px] font-bold uppercase tracking-wider transition-colors flex items-center gap-1"
          >
            {copiedWifi ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            <span>{copiedWifi ? 'Copied' : 'Key'}</span>
          </button>
        </div>

        <div className="bg-[#071E13] p-4 rounded-2xl border border-[#16422E] flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-[#F4B838] shrink-0" />
          <div>
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#8FA597] block">Table Service</span>
            <span className="text-sm font-semibold text-[#FAF8F5]">Contactless Digital Menu</span>
          </div>
        </div>
      </div>
    </section>
  );
};
