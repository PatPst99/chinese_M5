import React from 'react';

interface MouthShapeSVGProps {
  vowel: string;
}

/** Pastel mouth-shape diagram inspired by Book p.32 (foods_19) */
export const MouthShapeSVG: React.FC<MouthShapeSVGProps> = ({ vowel }) => {
  return (
    <svg viewBox="0 0 88 88" className="h-16 w-16 shrink-0">
      {/* Face circle */}
      <circle cx="44" cy="46" r="32" fill="#FDECEB" stroke="#E8B7B4" strokeWidth="2" />
      {/* Hair fringe */}
      <path
        d="M15 36 C18 16 32 10 44 10 C58 10 71 17 73 36 C65 27 56 24 46 25 C34 26 24 28 15 36 Z"
        fill="#4A5568"
      />
      {/* Rosy cheeks */}
      <circle cx="25" cy="52" r="5" fill="#F2B8B5" fillOpacity="0.65" />
      <circle cx="63" cy="52" r="5" fill="#F2B8B5" fillOpacity="0.65" />
      {/* Eyes */}
      <circle cx="33" cy="42" r="3" fill="#2F3640" />
      <circle cx="55" cy="42" r="3" fill="#2F3640" />
      <circle cx="34" cy="41" r="1" fill="#FFFFFF" />
      <circle cx="56" cy="41" r="1" fill="#FFFFFF" />

      {/* Mouth per vowel matching p.32 diagrams */}
      {vowel === 'a' && (
        <g>
          <ellipse cx="44" cy="60" rx="12" ry="9" fill="#D9776C" stroke="#2F3640" strokeWidth="1.6" />
          <path d="M36 64 Q44 59 52 64" fill="#F2B8B5" />
        </g>
      )}
      {vowel === 'o' && (
        <circle cx="44" cy="60" r="7" fill="#D9776C" stroke="#2F3640" strokeWidth="1.6" />
      )}
      {vowel === 'e' && (
        <rect x="31" y="57" width="26" height="5.5" rx="3" fill="#D9776C" stroke="#2F3640" strokeWidth="1.5" />
      )}
      {vowel === 'i' && (
        <g>
          <rect x="29" y="58" width="30" height="4.5" rx="2.2" fill="#FFFFFF" stroke="#2F3640" strokeWidth="1.5" />
          <line x1="29" y1="60.2" x2="59" y2="60.2" stroke="#D9776C" strokeWidth="1.2" />
        </g>
      )}
      {vowel === 'u' && (
        <circle cx="44" cy="60" r="4.2" fill="#D9776C" stroke="#2F3640" strokeWidth="1.6" />
      )}
      {vowel === 'ü' && (
        <g>
          <circle cx="44" cy="60" r="3.4" fill="#D9776C" stroke="#2F3640" strokeWidth="1.6" />
          <circle cx="44" cy="60" r="7.5" fill="none" stroke="#88B3A2" strokeWidth="1.3" strokeDasharray="2 2" />
        </g>
      )}
    </svg>
  );
};
