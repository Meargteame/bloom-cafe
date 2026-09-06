import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatusTicker } from './components/StatusTicker';
import { HourTableSection } from './components/HourTableSection';
import { PromoCarousel } from './components/PromoCarousel';
import { FindUsSection } from './components/FindUsSection';
import { Footer } from './components/Footer';
import { FloatingFeedbackButton } from './components/FloatingFeedbackButton';

// Modals
import { MenuModal } from './components/MenuModal';
import { CakeOrderModal } from './components/CakeOrderModal';
import { FeedbackModal } from './components/FeedbackModal';
import { BookingModal } from './components/BookingModal';
import { DirectionsModal } from './components/DirectionsModal';
import { TimeSlotDetailModal } from './components/TimeSlotDetailModal';

import { ActiveModal, TimeSlot } from './types';

export default function App() {
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);

  const handleOpenModal = (modal: ActiveModal) => {
    setActiveModal(modal);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
    setSelectedTimeSlot(null);
  };

  const handleSelectSlot = (slot: TimeSlot) => {
    setSelectedTimeSlot(slot);
  };

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0B281B] text-white flex flex-col selection:bg-[#F4B838] selection:text-[#0B281B]">
      {/* 1. Top Navigation Bar */}
      <Navbar onOpenModal={handleOpenModal} />

      {/* 2. Main Hero Section */}
      <main className="flex-1">
        <Hero
          onOpenModal={handleOpenModal}
          onScrollToSection={handleScrollToSection}
        />

        {/* 3. Live 24-Hour Status Ticker */}
        <StatusTicker />

        {/* 4. "Every hour has a table" Time-Slot Grid (Ivory Background) */}
        <HourTableSection onSelectSlot={handleSelectSlot} />

        {/* 5. Promotional Highlights Carousel (Tobacco Brown Cards) */}
        <PromoCarousel onOpenModal={handleOpenModal} />

        {/* 6. "FIND US" Location & Schedule Grid */}
        <FindUsSection onOpenModal={handleOpenModal} />
      </main>

      {/* 7. Comprehensive Footer */}
      <Footer onOpenModal={handleOpenModal} />

      {/* 8. Floating "☆ Leave feedback" Action Button */}
      <FloatingFeedbackButton onClick={() => handleOpenModal('feedback')} />

      {/* --- Interactive Modals & Drawers --- */}

      {/* Full Menu Modal (Menu, Drinks, Desserts, Buffet) */}
      <MenuModal
        isOpen={
          activeModal === 'menu' ||
          activeModal === 'drinks' ||
          activeModal === 'desserts' ||
          activeModal === 'buffet'
        }
        onClose={handleCloseModal}
        initialCategory={
          activeModal === 'drinks'
            ? 'drinks'
            : activeModal === 'desserts'
            ? 'desserts'
            : activeModal === 'buffet'
            ? 'buffet'
            : 'all'
        }
      />

      {/* Enkutatash New Year Cake Order Modal */}
      <CakeOrderModal
        isOpen={activeModal === 'cake-order'}
        onClose={handleCloseModal}
      />

      {/* Feedback & Free Dessert Draw Modal */}
      <FeedbackModal
        isOpen={activeModal === 'feedback'}
        onClose={handleCloseModal}
      />

      {/* Table Reservation / Visit / What's On Modal */}
      <BookingModal
        isOpen={
          activeModal === 'book-table' ||
          activeModal === 'visit' ||
          activeModal === 'whats-on' ||
          activeModal === 'catering'
        }
        onClose={handleCloseModal}
      />

      {/* Directions & Maps Modal */}
      <DirectionsModal
        isOpen={activeModal === 'directions'}
        onClose={handleCloseModal}
      />

      {/* Time Slot Details Modal */}
      <TimeSlotDetailModal
        slot={selectedTimeSlot}
        onClose={() => setSelectedTimeSlot(null)}
        onOpenMenu={() => handleOpenModal('menu')}
        onBookTable={() => handleOpenModal('book-table')}
      />
    </div>
  );
}
