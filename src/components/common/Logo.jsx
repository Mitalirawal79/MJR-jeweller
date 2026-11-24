import React from 'react';

export default function Logo({ 
  variant = 'dark', // 'dark', 'light', 'gold'
  showTagline = true, 
  size = 'md', // 'sm', 'md', 'lg'
  className = '' 
}) {
  const isLight = variant === 'light';
  const isGold = variant === 'gold';

  const textColor = isLight ? 'text-white' : isGold ? 'text-champagne-gold' : 'text-charcoal';
  const subColor = isLight ? 'text-ivory-200' : isGold ? 'text-champagne-light' : 'text-mutedGrey';
  const emblemStroke = isLight ? '#FFFFFF' : isGold ? '#B99B70' : '#292929';
  const diamondFill = isLight ? '#FAF7F2' : '#B99B70';

  const textSize = size === 'sm' ? 'text-xl' : size === 'lg' ? 'text-3xl tracking-widest' : 'text-2xl tracking-widest';
  const emblemSize = size === 'sm' ? 24 : size === 'lg' ? 40 : 32;

  return (
    <div className={`inline-flex flex-col items-center justify-center select-none text-center ${className}`}>
      <div className="flex items-center space-x-2.5">
        {/* Diamond Geometric Emblem */}
        <svg 
          width={emblemSize} 
          height={emblemSize} 
          viewBox="0 0 32 32" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-500 hover:rotate-45"
        >
          {/* Outer geometric diamond contour */}
          <path 
            d="M16 2L30 16L16 30L2 16L16 2Z" 
            stroke={emblemStroke} 
            strokeWidth="1.2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          {/* Inner facet lines */}
          <path 
            d="M16 7L25 16L16 25L7 16L16 7Z" 
            stroke={emblemStroke} 
            strokeWidth="0.8" 
            strokeOpacity="0.6" 
          />
          <path 
            d="M16 2V30M2 16H30" 
            stroke={emblemStroke} 
            strokeWidth="0.6" 
            strokeOpacity="0.4" 
          />
          {/* Center brilliance spark */}
          <circle cx="16" cy="16" r="1.5" fill={diamondFill} />
        </svg>

        {/* Brand Letters */}
        <span className={`font-serif font-light tracking-[0.25em] ${textSize} ${textColor}`}>
          MJR
        </span>
      </div>

      {showTagline && (
        <span className={`text-[9px] uppercase tracking-[0.32em] font-sans mt-0.5 font-normal ${subColor}`}>
          THE ART OF BRILLIANCE
        </span>
      )}
    </div>
  );
}
