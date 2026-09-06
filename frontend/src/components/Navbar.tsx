import React, { useState } from 'react';
import { BloomLogo } from './BloomLogo';
import { CafeInfo } from '../types';
import { QrCode, ShoppingBag, Shield, Menu, X } from 'lucide-react';

interface NavbarProps {
  cafeInfo: CafeInfo;
  orderItemCount: number;
  orderTotal: number;
  onOpenOrderTray: () => void;
  onOpenQRModal: () => void;
  onSwitchToAdmin: () => void;
  onScrollToSection: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cafeInfo,
  orderItemCount,
  orderTotal,
  onOpenOrderTray,
  onOpenQRModal,
  onSwitchToAdmin,
  onScrollToSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    onScrollToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0B281B]/95 backdrop-blur-md border-b border-[#16422E] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => handleNavClick('hero')}
          className="cursor-pointer"
        >
          <BloomLogo size="md" showSubtitle={true} />
        </div>

        {/* Center Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#CAD4CD]">
          <button
            type="button"
            onClick={() => handleNavClick('digital-menu')}
            className="hover:text-[#F4B838] transition-colors"
          >
            Digital Menu
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('hour-table')}
            className="hover:text-[#F4B838] transition-colors"
          >
            Every Hour
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('find-us')}
            className="hover:text-[#F4B838] transition-colors"
          >
            Visit & Hours
          </button>
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Info Badge */}
          <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#B0C32E] text-[#071E13] text-[11px] font-bold uppercase tracking-wider shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#071E13] animate-ping" />
            <span>Open Now · {cafeInfo.hours.split(':')[0]}</span>
          </div>

          {/* Table QR Button */}
          <button
            type="button"
            onClick={onOpenQRModal}
            className="flex items-center gap-1.5 px-3 py-2 sm:px-3.5 sm:py-2 rounded-xl bg-[#071E13] hover:bg-[#123827] text-white border border-[#16422E] hover:border-[#F4B838]/50 text-xs font-semibold tracking-wider uppercase transition-all shadow-xs"
            title="Open Table QR Code"
          >
            <QrCode className="w-3.5 h-3.5 text-[#F4B838]" />
            <span className="hidden sm:inline">Table QR</span>
          </button>

          {/* Order Tray Pill */}
          <button
            type="button"
            onClick={onOpenOrderTray}
            className={`flex items-center gap-2 px-3 py-2 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-all shadow-md ${
              orderItemCount > 0
                ? 'bg-[#F4B838] text-black hover:bg-[#E4A82B] ring-2 ring-[#F4B838]/50'
                : 'bg-[#071E13] text-[#CAD4CD] border border-[#16422E] hover:text-white hover:border-[#F4B838]/50'
            }`}
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4" />
              {orderItemCount > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-black text-white text-[9px] font-black flex items-center justify-center">
                  {orderItemCount}
                </span>
              )}
            </div>
            <span className="hidden xs:inline">Order</span>
            {orderItemCount > 0 && (
              <span className="font-mono text-xs font-black">
                {orderTotal} {cafeInfo.currencySymbol}
              </span>
            )}
          </button>

          {/* Staff Switch */}
          <button
            type="button"
            onClick={onSwitchToAdmin}
            className="hidden sm:flex items-center gap-1 p-2 rounded-xl text-[#8FA597] hover:text-[#F4B838] hover:bg-[#071E13] text-xs transition-colors"
            title="Switch to Staff Admin Portal"
          >
            <Shield className="w-4 h-4" />
            <span className="hidden md:inline text-[10px] font-bold uppercase tracking-wider">Staff</span>
          </button>

          {/* Mobile Navigation Drawer Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-[#071E13] text-[#CAD4CD] hover:text-white border border-[#16422E]"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#071E13] border-b border-[#16422E] px-4 py-4 space-y-3 animate-fadeIn">
          <button
            type="button"
            onClick={() => handleNavClick('digital-menu')}
            className="w-full text-left px-4 py-3 rounded-xl bg-[#0B281B] text-[#FAF8F5] text-xs font-bold uppercase tracking-[0.2em] border border-[#16422E]"
          >
            Digital Menu
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('hour-table')}
            className="w-full text-left px-4 py-3 rounded-xl bg-[#0B281B] text-[#FAF8F5] text-xs font-bold uppercase tracking-[0.2em] border border-[#16422E]"
          >
            Every Hour Menu
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('find-us')}
            className="w-full text-left px-4 py-3 rounded-xl bg-[#0B281B] text-[#FAF8F5] text-xs font-bold uppercase tracking-[0.2em] border border-[#16422E]"
          >
            Visit & Hours
          </button>

          <div className="pt-2 flex items-center justify-between border-t border-[#16422E]">
            <button
              type="button"
              onClick={() => {
                onSwitchToAdmin();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-xs text-[#F4B838] font-bold uppercase tracking-wider"
            >
              <Shield className="w-4 h-4" />
              <span>Staff Portal</span>
            </button>
            
            <span className="text-[10px] text-[#8FA597] font-mono">
              Adebabay St, Addis Ababa
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
