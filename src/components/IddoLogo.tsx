import React from 'react';

interface IddoLogoProps {
  className?: string;
  variant?: 'light' | 'gold';
  showSubtitle?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const IddoLogo: React.FC<IddoLogoProps> = ({
  className = '',
  variant = 'gold',
  showSubtitle = true,
  size = 'md'
}) => {
  const iconSize = size === 'sm' ? 32 : size === 'lg' ? 56 : 42;
  const textSize = size === 'sm' ? 'text-xl' : size === 'lg' ? 'text-3xl' : 'text-2xl';
  const subtitleSize = size === 'sm' ? 'text-[9px]' : size === 'lg' ? 'text-xs' : 'text-[10px]';

  return (
    <div className={`flex items-center gap-3 cursor-pointer select-none ${className}`}>
      {/* Stylized IDDO emblem */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0 drop-shadow-sm transition-transform hover:scale-105 duration-200"
      >
        {/* Outer stylized embracing arms / bowl in brand gold */}
        <circle cx="50" cy="50" r="48" fill="#F4B838" />
        {/* Inner negative cutouts matching IDDO restaurant emblem */}
        <path
          d="M50 18C41 18 33 24 30 32C28 37 28 44 31 49C35 56 42 61 50 61C58 61 65 56 69 49C72 44 72 37 70 32C67 24 59 18 50 18Z"
          fill="#0B281B"
        />
        {/* Central golden core */}
        <circle cx="50" cy="38" r="10.5" fill="#F4B838" />
        {/* Lower curved silhouette */}
        <path
          d="M33 55C26 62 26 73 34 81C42 89 58 89 66 81C74 73 74 62 67 55C62 61 56 65 50 65C44 65 38 61 33 55Z"
          fill="#0B281B"
        />
      </svg>

      <div className="flex flex-col leading-none">
        <span
          className={`font-bold tracking-tight font-sans text-white ${textSize}`}
          style={{ letterSpacing: '0.04em' }}
        >
          IDDO
        </span>
        {showSubtitle && (
          <span
            className={`font-semibold tracking-widest text-[#F4B838] uppercase mt-0.5 ${subtitleSize}`}
            style={{ letterSpacing: '0.22em' }}
          >
            TASTE THE MOMENT
          </span>
        )}
      </div>
    </div>
  );
};
