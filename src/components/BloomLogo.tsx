import React from 'react';

interface BloomLogoProps {
  variant?: 'gold' | 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
}

export const BloomLogo: React.FC<BloomLogoProps> = ({
  variant = 'gold',
  size = 'md',
  showSubtitle = true,
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const titleSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl sm:text-5xl',
  };

  return (
    <div className="flex items-center gap-3 select-none group">
      {/* Custom Circular Emblem */}
      <div className={`relative ${iconSizes[size]} shrink-0 transition-transform duration-300 group-hover:scale-105`}>
        <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Outer circle with gold border */}
          <circle 
            cx="22" 
            cy="22" 
            r="20.5" 
            className="stroke-[#F4B838] fill-[#0B281B]" 
            strokeWidth="2"
          />
          {/* Inner hairline */}
          <circle 
            cx="22" 
            cy="22" 
            r="17" 
            className="stroke-[#F4B838]/40" 
            strokeWidth="0.75"
            strokeDasharray="2 2"
          />
          {/* Botanical Bloom Petals in Mustard Gold */}
          <path 
            d="M22 10C22 10 26 16 26 20C26 22.2 24.2 24 22 24C19.8 24 18 22.2 18 20C18 16 22 10 22 10Z" 
            fill="#F4B838" 
          />
          <path 
            d="M14.5 15.5C14.5 15.5 20.5 17.8 21.5 21.5C22.2 23.8 21.2 25.5 19.5 26.2C17.8 26.8 15.8 25.5 15.2 23.8C14.2 20.5 14.5 15.5 14.5 15.5Z" 
            fill="#F4B838" 
            opacity="0.85"
          />
          <path 
            d="M29.5 15.5C29.5 15.5 23.5 17.8 22.5 21.5C21.8 23.8 22.8 25.5 24.5 26.2C26.2 26.8 28.2 25.5 28.8 23.8C29.8 20.5 29.5 15.5 29.5 15.5Z" 
            fill="#F4B838" 
            opacity="0.85"
          />
          {/* Stem and center point */}
          <path 
            d="M22 24V32" 
            stroke="#F4B838" 
            strokeWidth="2" 
            strokeLinecap="round" 
          />
          <circle 
            cx="22" 
            cy="23" 
            r="2" 
            fill="#FAF8F5" 
          />
        </svg>
      </div>

      {/* Wordmark */}
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1.5 leading-none">
          <span className={`font-editorial font-bold tracking-tight text-[#FAF8F5] ${titleSizes[size]}`}>
            Bloom
          </span>
          <span className="font-editorial italic font-normal text-[#F4B838] ml-0.5">
            Cafe
          </span>
        </div>
        {showSubtitle && (
          <span className="text-[9px] sm:text-[10px] tracking-[0.24em] uppercase font-bold text-[#CAD4CD] mt-1">
            Taste The Moment
          </span>
        )}
      </div>
    </div>
  );
};
