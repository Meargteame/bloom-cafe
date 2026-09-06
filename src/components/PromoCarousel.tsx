import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Cake, MessageSquareHeart, Award, Heart, Share2, Instagram } from 'lucide-react';
import { ActiveModal } from '../types';

interface PromoCarouselProps {
  onOpenModal: (modal: ActiveModal) => void;
}

export const PromoCarousel: React.FC<PromoCarouselProps> = ({ onOpenModal }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const totalSlides = 2;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <section className="w-full bg-[#FBF8F2] pb-24 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-[28px] overflow-hidden shadow-2xl bg-[#7E5229] text-white">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-[#18181B]/70 hover:bg-[#18181B] text-white flex items-center justify-center transition-all duration-200 border border-white/20 hover:scale-105"
          >
            <ChevronLeft size={22} />
          </button>

          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-[#18181B]/70 hover:bg-[#18181B] text-white flex items-center justify-center transition-all duration-200 border border-white/20 hover:scale-105"
          >
            <ChevronRight size={22} />
          </button>

          {/* SLIDE 0: Enkutatash New Year Cake */}
          {currentSlide === 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px] transition-opacity duration-300">
              {/* Left Column: Visual Poster with Cake */}
              <div className="lg:col-span-6 relative bg-gradient-to-br from-[#0B2E1E] via-[#0E3D28] to-[#082015] p-8 sm:p-12 flex flex-col justify-between overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10">
                {/* Golden ribbons background decoration */}
                <div className="absolute inset-0 opacity-25 pointer-events-none">
                  <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
                    <path
                      d="M-20 40 Q 150 10 220 180 T 420 80"
                      stroke="#F4B838"
                      strokeWidth="30"
                      strokeLinecap="round"
                    />
                    <path
                      d="M30 380 Q 200 240 380 340"
                      stroke="#E5A828"
                      strokeWidth="22"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                {/* Poster Top: Brand & Title */}
                <div className="relative z-10 text-center">
                  <div className="inline-flex items-center gap-2 mb-3">
                    <span className="w-6 h-6 rounded-full bg-[#F4B838] flex items-center justify-center text-[#0B281B] font-bold text-xs">
                      ●
                    </span>
                    <span className="text-xs tracking-[0.25em] uppercase font-bold text-white">
                      IDDO · TASTE THE MOMENT
                    </span>
                  </div>

                  <h4 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-1">
                    WIN YOUR
                  </h4>
                  <h3 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-normal text-[#F4B838] tracking-tight mb-2">
                    NEW YEAR CAKE!
                  </h3>
                  <div className="inline-block bg-[#F4B838] text-[#0B281B] px-4 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-4">
                    2 TORTA CAKES · LUCKY WINNERS
                  </div>
                </div>

                {/* Realistic Photographic Display of the Celebration Cake */}
                <div className="relative z-10 my-4 flex flex-col items-center justify-center">
                  <div className="relative w-64 h-64 sm:w-72 sm:h-72">
                    {/* Shadow underneath pedestal */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-48 h-8 bg-black/60 blur-md rounded-full" />
                    
                    {/* Pedestal Stand */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-44 h-4 bg-[#E5E9E6] rounded-full border border-gray-300 shadow-sm" />
                    
                    {/* The Torta Cake Visual Component */}
                    <div className="absolute bottom-7 left-1/2 -translate-x-1/2 w-52 h-44 sm:w-60 sm:h-48 rounded-[36px] bg-gradient-to-b from-[#E7AC42] via-[#CF9632] to-[#A47021] shadow-2xl border-4 border-[#F7C665] flex flex-col items-center justify-between p-4 overflow-hidden">
                      {/* Crumb texture simulation */}
                      <div 
                        className="absolute inset-0 opacity-40 mix-blend-overlay"
                        style={{
                          backgroundImage: 'radial-gradient(#5C3C0C 15%, transparent 16%), radial-gradient(#FFDD85 15%, transparent 16%)',
                          backgroundSize: '10px 10px',
                          backgroundPosition: '0 0, 5px 5px'
                        }}
                      />

                      {/* Top Topping: 2 fresh glossy strawberries */}
                      <div className="relative z-10 flex gap-1 -mt-2">
                        <div className="w-8 h-9 bg-gradient-to-b from-red-500 to-red-700 rounded-b-2xl rounded-t-lg shadow-lg relative rotate-[-10deg]">
                          <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-1.5 bg-green-600 rounded-full" />
                        </div>
                        <div className="w-8 h-9 bg-gradient-to-b from-red-500 to-red-700 rounded-b-2xl rounded-t-lg shadow-lg relative rotate-[12deg]">
                          <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-1.5 bg-green-600 rounded-full" />
                        </div>
                      </div>

                      {/* White Chocolate Plaque "Happy New Year" */}
                      <div className="relative z-10 bg-[#FFFDF8] border border-[#E8DFC8] px-4 py-2 rounded-lg shadow-md rotate-[-2deg] my-auto">
                        <span className="font-editorial text-sm sm:text-base font-bold text-[#3B2810] tracking-wide">
                          Happy New Year
                        </span>
                      </div>

                      {/* Golden decorative base ribbon */}
                      <div className="relative z-10 w-full text-center text-[10px] font-semibold text-[#5A380A] uppercase tracking-widest bg-[#FFE79E]/90 py-0.5 rounded">
                        Artisan Pastry Kitchen
                      </div>
                    </div>
                  </div>
                </div>

                {/* Poster Bottom Instructions */}
                <div className="relative z-10 text-center pt-2">
                  <p className="text-[11px] font-semibold tracking-wider text-[#F4B838] uppercase mb-2">
                    HOW TO WIN
                  </p>
                  <div className="flex items-center justify-center gap-3 text-[11px] text-gray-200">
                    <span className="bg-[#071F14] px-2.5 py-1 rounded-md border border-white/10">Follow</span>
                    <span className="bg-[#071F14] px-2.5 py-1 rounded-md border border-white/10">Like</span>
                    <span className="bg-[#071F14] px-2.5 py-1 rounded-md border border-white/10">Share to story & tag us</span>
                    <span className="bg-[#071F14] px-2.5 py-1 rounded-md border border-white/10">Tag 3 friends</span>
                  </div>
                  <p className="text-[10px] text-gray-300 mt-3 uppercase tracking-widest font-mono">
                    WINNERS ANNOUNCED PAGUME 5 · SEPT 3–9
                  </p>
                </div>
              </div>

              {/* Right Column: Tobacco Brown Copy & Order CTA */}
              <div className="lg:col-span-6 p-8 sm:p-14 md:p-16 flex flex-col justify-center bg-[#7E5229]">
                <div className="max-w-md">
                  {/* Eyebrow */}
                  <div className="mb-4">
                    <span className="text-[#FFDB8F] font-semibold text-xs tracking-[0.22em] uppercase">
                      ENKUTATASH · GIVEAWAY CLOSES 9 SEPTEMBER
                    </span>
                  </div>

                  {/* Serif Heading */}
                  <h3 className="font-editorial text-4xl sm:text-5xl md:text-[54px] font-normal leading-[1.08] text-white tracking-tight mb-6">
                    Or skip the odds <br />
                    and <span className="italic text-[#F4B838]">just order one</span>.
                  </h3>

                  {/* Body Text */}
                  <p className="text-[#F1DFCD] text-base sm:text-lg leading-relaxed mb-6 font-light">
                    Two cakes go to two winners on Instagram. Everyone else can still have the same cake:
                    baked in our own pastry kitchen, written with your family name, finished the morning
                    you collect it.
                  </p>

                  {/* Badge & Timing */}
                  <div className="flex flex-col gap-3 mb-8">
                    <div>
                      <span className="inline-block px-3.5 py-1.5 bg-[#5E3917] text-[#FFDF9B] font-semibold text-xs tracking-wider uppercase rounded-full">
                        5 DAYS LEFT
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#FFDF9B]">
                      <span className="w-2 h-2 rounded-full bg-[#F4B838]" />
                      <span>Order three days ahead · collect on the 11th</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div>
                    <button
                      onClick={() => onOpenModal('cake-order')}
                      className="px-8 py-4 bg-[#F4B838] hover:bg-[#e2a82d] text-[#0B281B] font-bold text-sm tracking-wider uppercase rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                    >
                      ORDER A CAKE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 1: Customer Feedback & Free Dessert */}
          {currentSlide === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px] transition-opacity duration-300">
              {/* Left Column: Cozy Restaurant Patrons Image */}
              <div className="lg:col-span-6 relative bg-[#1A1815] overflow-hidden min-h-[380px] lg:min-h-full border-b lg:border-b-0 lg:border-r border-white/10 flex items-center justify-center">
                {/* High quality warm photography scene representation */}
                <img
                  src="https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=1200&q=80"
                  alt="Guests enjoying coffee and conversation at IDDO Restaurant"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
                <div className="absolute bottom-6 left-6 right-6 text-white text-xs tracking-wider uppercase font-medium bg-black/40 backdrop-blur-md px-4 py-2 rounded-xl inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#F4B838]" />
                  <span>Afternoon coffee & quiet hours at Semay Tower</span>
                </div>
              </div>

              {/* Right Column: Tobacco Brown Feedback Copy */}
              <div className="lg:col-span-6 p-8 sm:p-14 md:p-16 flex flex-col justify-center bg-[#7E5229]">
                <div className="max-w-md">
                  {/* Eyebrow */}
                  <div className="mb-4">
                    <span className="text-[#FFDB8F] font-semibold text-xs tracking-[0.22em] uppercase">
                      SCAN THE CARD ON YOUR TABLE
                    </span>
                  </div>

                  {/* Serif Heading */}
                  <h3 className="font-editorial text-4xl sm:text-5xl md:text-[54px] font-normal leading-[1.08] text-white tracking-tight mb-6">
                    Tell us how <br />
                    <span className="italic text-[#F4B838]">we did</span>.
                  </h3>

                  {/* Body Text */}
                  <p className="text-[#F1DFCD] text-base sm:text-lg leading-relaxed mb-6 font-light">
                    Thirty seconds, four questions, no sign-in. One table every week gets dessert on
                    the house for the trouble.
                  </p>

                  {/* Detail */}
                  <div className="flex items-center gap-2 text-sm text-[#FFDF9B] mb-8">
                    <span className="w-2 h-2 rounded-full bg-[#F4B838]" />
                    <span>Every table · every week · one dessert</span>
                  </div>

                  {/* Action Button */}
                  <div>
                    <button
                      onClick={() => onOpenModal('feedback')}
                      className="px-8 py-4 bg-[#F4B838] hover:bg-[#e2a82d] text-[#0B281B] font-bold text-sm tracking-wider uppercase rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                    >
                      SAY SOMETHING
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-30">
            {[0, 1].map((idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all duration-200 ${
                  currentSlide === idx ? 'w-6 bg-[#F4B838]' : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
