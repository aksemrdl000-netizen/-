import React from 'react';

interface KwangSungLogoProps {
  className?: string;
  showText?: boolean;
  iconOnly?: boolean;
  lightMode?: boolean; // if true, text is white for dark backgrounds (like hero or footer)
  height?: number | string;
}

export default function KwangSungLogo({
  className = '',
  showText = true,
  iconOnly = false,
  lightMode = false,
  height = '100%'
}: KwangSungLogoProps) {
  // Brand colors
  const darkBlue = '#004182';
  const lightBlue = '#38bdf8'; // Sky blue
  const silverGray = '#64748b'; // Slate gray
  const white = '#ffffff';

  return (
    <svg
      viewBox={iconOnly ? "0 0 100 100" : "0 0 380 100"}
      className={`select-none ${className}`}
      style={{ height }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Gradients matching the company brand */}
        <linearGradient id="squareGradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#003366" />
          <stop offset="100%" stopColor="#0088cc" />
        </linearGradient>
        
        <linearGradient id="waveLightGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7dd3fc" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>

        <linearGradient id="waveDarkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#0369a1" />
        </linearGradient>
      </defs>

      {/* --- LOGO ICON (SQUARE FRAME + DOUBLE WAVE) --- */}
      <g id="logo-icon" transform="translate(5, 5)">
        {/* Square Outline (Left & Bottom primarily visible, Top & Right cut open) */}
        <path
          d="M 12,65 L 12,12 L 65,12 C 60,18 55,24 50,30 L 24,30 L 24,65 L 65,65 L 65,55 C 71,50 77,45 82,40 L 82,76 L 12,76 Z"
          fill="url(#squareGradient)"
        />

        {/* Outer/Back Wave - Light Blue */}
        <path
          d="M 12,76 C 25,60 35,42 55,30 C 65,24 75,20 88,18 C 82,24 76,32 72,42 C 62,54 48,68 12,76 Z"
          fill="url(#waveLightGradient)"
        />

        {/* Inner/Front Wave - Deep Blue */}
        <path
          d="M 15,76 C 28,62 42,46 64,36 C 72,32 80,30 90,30 C 84,35 78,41 74,48 C 65,58 52,70 15,76 Z"
          fill="url(#waveDarkGradient)"
        />
      </g>

      {/* --- COMPANY NAME TEXT (Right Side) --- */}
      {!iconOnly && showText && (
        <g id="logo-text" transform="translate(105, 0)">
          {/* KwangSung - Slate Gray / Light Gray */}
          <text
            x="0"
            y="42"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="500"
            fontSize="32"
            letterSpacing="-0.5"
            fill={lightMode ? '#cbd5e1' : silverGray}
          >
            KwangSung
          </text>

          {/* 광성산업 - Dark Blue / White */}
          <text
            x="0"
            y="85"
            fontFamily="Pretendard, system-ui, -apple-system, sans-serif"
            fontWeight="900"
            fontSize="44"
            letterSpacing="-1.5"
            fill={lightMode ? white : darkBlue}
          >
            광성산업
          </text>
        </g>
      )}
    </svg>
  );
}
