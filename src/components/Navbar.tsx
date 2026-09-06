import React, { useState } from 'react';
import { IddoLogo } from './IddoLogo';
import { ActiveModal } from '../types';
import { Menu as MenuIcon, X, Sparkles, Phone, Clock, MapPin } from 'lucide-react';

interface NavbarProps {
  onOpenModal: (modal: ActiveModal) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showQuickInfo, setShowQuickInfo] = useState(false);

  const navLinks = [
    { label: 'Menu', modal: 'menu' as ActiveModal, href: '#menu' },
    { label: 'Drinks', modal: 'drinks' as ActiveModal, href: '#drinks' },
    { label: 'Desserts', modal: 'desserts' as ActiveModal, href: '#desserts' },
    { label: 'Buffet', modal: 'buffet' as ActiveModal, href: '#buffet' },
    { label: "What's On", modal: 'whats-on' as ActiveModal, href: '#whats-on' },
    { label: 'Catering', modal: 'catering' as ActiveModal, href: '#catering' },
    { label: 'Visit', modal: 'visit' as ActiveModal, href: '#visit' },
  ];

  const handleNavClick = (link: typeof navLinks[0]) => {
    onOpenModal(link.modal);
    setMobileMenuOpen(false);
  };

  return (
    <header className="w-full bg-[#0B281B] text-white sticky top-0 z-40 border-b border-[#143B29]/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <a href="#" className="flex items-center">
          <IddoLogo size="md" />
        </a>

        {/* Center/Right: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-[15px] font-medium text-[#EBE6DF]">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link)}
              className="hover:text-[#F4B838] transition-colors duration-200 tracking-normal cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right side: Accessibility / Starburst badge & Mobile Menu trigger */}
        <div className="flex items-center gap-4">
          {/* Olive / Lime Starburst Badge seen in top right of screenshot */}
          <div className="relative">
            <button
              onClick={() => setShowQuickInfo(!showQuickInfo)}
              title="Quick Restaurant Info & Accessibility"
              className="w-9 h-9 rounded-lg bg-[#B0C32E] hover:bg-[#C2D733] text-[#0B281B] flex items-center justify-center transition-all duration-200 shadow-sm group hover:rotate-45"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="transition-transform"
              >
                {/* 8-point geometric star/asterisk as shown in screenshot */}
                <path d="M12 2L13.5 8.5L20 7L15.5 12L20 17L13.5 15.5L12 22L10.5 15.5L4 17L8.5 12L4 7L10.5 8.5L12 2Z" />
              </svg>
            </button>

            {/* Quick drop info popup */}
            {showQuickInfo && (
              <div className="absolute right-0 mt-3 w-72 bg-[#081F15] border border-[#1C4B35] rounded-2xl p-5 shadow-2xl text-left z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between mb-3 border-b border-[#1A4230] pb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#F4B838]">
                    IDDO At A Glance
                  </span>
                  <button
                    onClick={() => setShowQuickInfo(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X size={16} />
                  </button>
                </div>
                <div className="space-y-3 text-sm text-[#D7DFD8]">
                  <div className="flex items-start gap-2.5">
                    <Clock size={16} className="text-[#F4B838] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-white">Open 24 / 7</p>
                      <p className="text-xs text-gray-400">Kitchen & coffee bar never closes</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <MapPin size={16} className="text-[#F4B838] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-white">Semay Tower</p>
                      <p className="text-xs text-gray-400">Bole Wollo Sefer, Addis Ababa</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Phone size={16} className="text-[#F4B838] mt-0.5 flex-shrink-0" />
                    <div>
                      <a
                        href="tel:+251987222226"
                        className="font-semibold text-[#F4B838] hover:underline"
                      >
                        +251 98 722 2226
                      </a>
                      <p className="text-xs text-gray-400">Bookings & enquiries</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowQuickInfo(false);
                    onOpenModal('book-table');
                  }}
                  className="mt-4 w-full py-2 bg-[#F4B838] hover:bg-[#e2a82d] text-[#0B281B] font-semibold text-xs rounded-lg transition-colors uppercase tracking-wider text-center"
                >
                  Reserve Table
                </button>
              </div>
            )}
          </div>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:text-[#F4B838] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <MenuIcon size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#071E13] border-b border-[#15422D] px-6 py-6 space-y-4">
          <div className="flex flex-col gap-3 text-base">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link)}
                className="text-left py-2 px-3 rounded-lg hover:bg-[#0E3524] text-[#EBE6DF] hover:text-[#F4B838] font-medium transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
          <div className="pt-4 border-t border-[#15422D] flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenModal('book-table');
              }}
              className="w-full py-3 bg-[#F4B838] text-black font-semibold rounded-xl text-center"
            >
              BOOK A TABLE
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
