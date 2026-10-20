import React from 'react';

interface WaxSealProps {
  onClick?: () => void;
  className?: string;
  isOpening?: boolean;
}

export const WaxSeal: React.FC<WaxSealProps> = ({
  onClick,
  className = '',
  isOpening = false,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Golden wax seal"
      className={`group relative z-30 flex items-center justify-center cursor-pointer transition-all duration-500 focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-300 rounded-full ${
        isOpening ? 'scale-125 opacity-0 pointer-events-none' : 'hover:scale-108 active:scale-95'
      } ${className}`}
    >
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 drop-shadow-[0_8px_16px_rgba(50,10,20,0.45)]">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Rich golden metallic gradient */}
            <radialGradient id="goldRim" cx="35%" cy="30%" r="65%" fx="30%" fy="25%">
              <stop offset="0%" stopColor="#fde0b2" />
              <stop offset="25%" stopColor="#e5a968" />
              <stop offset="60%" stopColor="#bd7b3e" />
              <stop offset="85%" stopColor="#8d5423" />
              <stop offset="100%" stopColor="#5f3513" />
            </radialGradient>

            <radialGradient id="goldCenter" cx="40%" cy="35%" r="55%" fx="35%" fy="30%">
              <stop offset="0%" stopColor="#ffecce" />
              <stop offset="35%" stopColor="#e2a666" />
              <stop offset="75%" stopColor="#b57338" />
              <stop offset="100%" stopColor="#7a441b" />
            </radialGradient>

            <linearGradient id="sealShine" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.65" />
              <stop offset="40%" stopColor="#ffffff" stopOpacity="0.0" />
              <stop offset="70%" stopColor="#000000" stopOpacity="0.0" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.35" />
            </linearGradient>

            <filter id="sealDepth" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#351400" floodOpacity="0.5" />
            </filter>
          </defs>

          {/* Organic wavy/melted wax border */}
          <path
            d="M50 4
               C62 3.5 73 8 82 17
               C90 25 96 37 96 50
               C95.5 63 90 74 81 83
               C72 91 60 96 48 96
               C35 95.5 24 90 16 81
               C8 72 4 61 4 48
               C4.5 35 10 24 19 16
               C28 8 39 4.5 50 4 Z"
            fill="url(#goldRim)"
            filter="url(#sealDepth)"
          />

          {/* Secondary wax ripple ridge */}
          <circle
            cx="50"
            cy="50"
            r="38"
            fill="none"
            stroke="#9b5f2a"
            strokeWidth="2.5"
            opacity="0.8"
          />

          {/* Depressed center seal face */}
          <circle
            cx="50"
            cy="50"
            r="34"
            fill="url(#goldCenter)"
          />

          {/* Specular highlight crescent */}
          <ellipse
            cx="44"
            cy="36"
            rx="18"
            ry="11"
            fill="#ffffff"
            opacity="0.32"
          />

          {/* Inner heart stamp impression */}
          <path
            d="M50 63 C49 62 34 50 34 40 C34 34.5 38.5 31 43.5 31 C46.5 31 48.5 32.5 50 34 C51.5 32.5 53.5 31 56.5 31 C61.5 31 66 34.5 66 40 C66 50 51 62 50 63 Z"
            fill="none"
            stroke="#874a1d"
            strokeWidth="2.2"
            opacity="0.65"
          />
        </svg>

        {/* Hover glint shine effect */}
        <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
          <div className="w-full h-full bg-gradient-to-tr from-transparent via-white/35 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>
      </div>
    </button>
  );
};
