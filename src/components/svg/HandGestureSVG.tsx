import React from 'react';

interface HandGestureSVGProps {
  num: number;
  className?: string;
}

/**
 * Custom Pastel SVG Chinese Hand Gestures 1–10 matching Textbook p.26 (foods_13)
 */
export const HandGestureSVG: React.FC<HandGestureSVGProps> = ({ num, className = 'h-24 w-24' }) => {
  const skin = '#FDE3D2';
  const stroke = '#5A4A42';
  const fold = '#F2C7B0';

  return (
    <svg viewBox="0 0 100 100" className={className} aria-label={`ภาษามือจีนเลข ${num}`}>
      <circle cx="50" cy="50" r="45" fill="#E5F0EB" fillOpacity="0.65" stroke="#88B3A2" strokeWidth="1.5" strokeDasharray="4 3" />

      {/* 1: Index finger up */}
      {num === 1 && (
        <g stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="44" y="16" width="11" height="38" rx="5.5" fill={skin} />
          <rect x="33" y="48" width="35" height="30" rx="12" fill={skin} />
          <rect x="55" y="45" width="9" height="16" rx="4.5" fill={fold} />
          <rect x="62" y="47" width="8" height="15" rx="4" fill={fold} />
          <path d="M34 58 Q46 53 54 62" fill={skin} />
        </g>
      )}

      {/* 2: Index + Middle V sign */}
      {num === 2 && (
        <g stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="38" y="17" width="10" height="36" rx="5" fill={skin} transform="rotate(-12 43 45)" />
          <rect x="52" y="17" width="10" height="36" rx="5" fill={skin} transform="rotate(12 57 45)" />
          <rect x="34" y="48" width="34" height="30" rx="12" fill={skin} />
          <path d="M35 58 Q48 53 56 62" fill={fold} />
        </g>
      )}

      {/* 3: Middle, Ring, Pinky up; thumb touches index (as shown on p.26!) */}
      {num === 3 && (
        <g stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="38" y="18" width="9" height="34" rx="4.5" fill={skin} transform="rotate(-10 42 48)" />
          <rect x="49" y="16" width="9" height="36" rx="4.5" fill={skin} />
          <rect x="60" y="21" width="8.5" height="31" rx="4.2" fill={skin} transform="rotate(10 64 48)" />
          <rect x="33" y="48" width="36" height="30" rx="12" fill={skin} />
          <circle cx="38" cy="56" r="7" fill={fold} />
        </g>
      )}

      {/* 4: Four fingers up, thumb folded */}
      {num === 4 && (
        <g stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="31" y="20" width="8.5" height="32" rx="4.2" fill={skin} transform="rotate(-8 35 48)" />
          <rect x="41" y="16" width="8.5" height="35" rx="4.2" fill={skin} />
          <rect x="51" y="17" width="8.5" height="34" rx="4.2" fill={skin} />
          <rect x="61" y="22" width="8" height="30" rx="4" fill={skin} transform="rotate(8 65 48)" />
          <rect x="31" y="48" width="38" height="30" rx="12" fill={skin} />
          <path d="M33 61 Q50 56 60 66" fill={fold} />
        </g>
      )}

      {/* 5: All five fingers open */}
      {num === 5 && (
        <g stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="20" y="44" width="20" height="9" rx="4.5" fill={skin} transform="rotate(28 30 48)" />
          <rect x="31" y="21" width="8.5" height="31" rx="4.2" fill={skin} transform="rotate(-10 35 48)" />
          <rect x="42" y="16" width="8.5" height="35" rx="4.2" fill={skin} />
          <rect x="53" y="18" width="8.5" height="33" rx="4.2" fill={skin} transform="rotate(4 57 48)" />
          <rect x="63" y="24" width="8" height="28" rx="4" fill={skin} transform="rotate(12 67 48)" />
          <rect x="31" y="48" width="39" height="30" rx="13" fill={skin} />
        </g>
      )}

      {/* 6: Thumb + Pinky out (Chinese "liu" shaka sign) */}
      {num === 6 && (
        <g stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="17" y="40" width="24" height="10" rx="5" fill={skin} transform="rotate(20 28 45)" />
          <rect x="63" y="22" width="8.5" height="32" rx="4.2" fill={skin} transform="rotate(18 67 46)" />
          <rect x="33" y="46" width="34" height="30" rx="12" fill={skin} />
          <rect x="37" y="44" width="8" height="14" rx="4" fill={fold} />
          <rect x="46" y="44" width="8" height="14" rx="4" fill={fold} />
          <rect x="55" y="45" width="8" height="14" rx="4" fill={fold} />
        </g>
      )}

      {/* 7: Pinched fingertips pointing up */}
      {num === 7 && (
        <g stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M34 52 C32 36 42 22 50 20 C58 22 68 36 66 52 L66 72 C66 78 60 81 50 81 C40 81 34 78 34 72 Z" fill={skin} />
          <path d="M42 25 L48 45 M50 20 L52 44 M58 25 L56 46" stroke={stroke} strokeWidth="1.8" />
          <path d="M36 52 Q50 44 64 52" fill="none" />
        </g>
      )}

      {/* 8: Thumb + Index L shape */}
      {num === 8 && (
        <g stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="20" y="34" width="32" height="10" rx="5" fill={skin} transform="rotate(-12 36 39)" />
          <rect x="46" y="18" width="10" height="34" rx="5" fill={skin} transform="rotate(24 51 44)" />
          <rect x="36" y="46" width="32" height="30" rx="12" fill={skin} />
          <rect x="49" y="50" width="16" height="8" rx="4" fill={fold} />
          <rect x="50" y="59" width="15" height="8" rx="4" fill={fold} />
        </g>
      )}

      {/* 9: Hooked index finger */}
      {num === 9 && (
        <g stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path
            d="M44 48 L44 26 Q44 17 55 18 Q64 19 63 31 L56 32 Q55 25 51 25 L51 48 Z"
            fill={skin}
          />
          <rect x="34" y="46" width="34" height="31" rx="12" fill={skin} />
          <rect x="48" y="47" width="8" height="13" rx="4" fill={fold} />
          <rect x="57" y="48" width="8" height="13" rx="4" fill={fold} />
          <path d="M34 59 Q46 54 53 63" fill={skin} />
        </g>
      )}

      {/* 10: Clenched fist (matching p.26 illustration!) */}
      {num === 10 && (
        <g stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="29" y="38" width="42" height="38" rx="15" fill={skin} />
          <rect x="32" y="35" width="9" height="18" rx="4.5" fill={fold} />
          <rect x="41" y="34" width="9" height="19" rx="4.5" fill={fold} />
          <rect x="50" y="34" width="9" height="19" rx="4.5" fill={fold} />
          <rect x="59" y="36" width="9" height="17" rx="4.5" fill={fold} />
          <rect x="34" y="50" width="24" height="10" rx="5" fill={skin} />
        </g>
      )}
    </svg>
  );
};
