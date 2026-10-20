import React from 'react';

interface GlossyHeartProps {
  className?: string;
  size?: number;
  rotation?: number;
  style?: React.CSSProperties;
  onClick?: () => void;
  interactive?: boolean;
}

export const GlossyHeart: React.FC<GlossyHeartProps> = ({
  className = '',
  size = 64,
  rotation = 0,
  style = {},
  onClick,
  interactive = false,
}) => {
  return (
    <div
      onClick={onClick}
      style={{
        width: size,
        height: size,
        transform: `rotate(${rotation}deg)`,
        ...style,
      }}
      className={`inline-block select-none transition-transform duration-300 ${
        interactive ? 'cursor-pointer hover:scale-110 active:scale-95' : 'pointer-events-none'
      } ${className}`}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-[0_8px_16px_rgba(110,14,24,0.25)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient
            id="heartSheen"
            cx="35%"
            cy="35%"
            r="65%"
            fx="30%"
            fy="30%"
          >
            <stop offset="0%" stopColor="#a31924" />
            <stop offset="45%" stopColor="#8d131d" />
            <stop offset="85%" stopColor="#710f17" />
            <stop offset="100%" stopColor="#550b11" />
          </radialGradient>
          <filter id="softGaze" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="#40040a" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* Outer plump heart body */}
        <path
          d="M50 88.5 C48 86.5 12 58 12 33 C12 18.5 24 10 37 10 C44.5 10 48.5 14 50 17.5 C51.5 14 55.5 10 63 10 C76 10 88 18.5 88 33 C88 58 52 86.5 50 88.5 Z"
          fill="url(#heartSheen)"
          filter="url(#softGaze)"
        />

        {/* Distinctive white curved highlight on the top-left hump as seen in the original graphic */}
        <path
          d="M26 31 C25 25 29 17 37 15.5 C39 15.1 39.5 17.8 37.8 18.5 C32 20.8 29 25.5 30 31.5 C30.4 33 26.5 33.5 26 31 Z"
          fill="#ffffff"
          opacity="0.92"
        />

        {/* Small subtle secondary glint */}
        <ellipse
          cx="24"
          cy="37"
          rx="2.2"
          ry="3.5"
          transform="rotate(-25 24 37)"
          fill="#ffffff"
          opacity="0.75"
        />
      </svg>
    </div>
  );
};
