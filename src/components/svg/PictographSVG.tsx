import React from 'react';

interface PictographSVGProps {
  char: string;
}

/** Custom Pastel Pictograph illustrations matching Slide foods_25 + Book p.33 (foods_20) */
export const PictographSVG: React.FC<PictographSVGProps> = ({ char }) => {
  return (
    <svg viewBox="0 0 80 80" className="h-16 w-16 shrink-0">
      {char === '火' && (
        <g>
          <rect width="80" height="80" rx="18" fill="#FDF6E2" />
          <path d="M40 12 C56 30 62 46 54 62 C48 68 32 68 26 62 C18 46 28 32 40 12 Z" fill="#F4D58D" />
          <path d="M40 24 C49 36 52 48 47 58 C44 63 36 63 33 58 C28 48 33 36 40 24 Z" fill="#D9776C" fillOpacity="0.85" />
        </g>
      )}
      {char === '木' && (
        <g>
          <rect width="80" height="80" rx="18" fill="#E5F0EB" />
          <circle cx="40" cy="30" r="18" fill="#88B3A2" />
          <circle cx="28" cy="35" r="10" fill="#88B3A2" />
          <circle cx="52" cy="35" r="10" fill="#88B3A2" />
          <path d="M40 34 L40 66 M40 46 L25 60 M40 46 L55 60" stroke="#5A4A42" strokeWidth="4" strokeLinecap="round" />
        </g>
      )}
      {char === '日' && (
        <g>
          <rect width="80" height="80" rx="18" fill="#EBEEF6" />
          <circle cx="40" cy="40" r="21" fill="#F4D58D" stroke="#D9776C" strokeWidth="2.5" />
          <circle cx="40" cy="40" r="6" fill="#D9776C" fillOpacity="0.5" />
        </g>
      )}
      {char === '月' && (
        <g>
          <rect width="80" height="80" rx="18" fill="#EBEEF6" />
          <path d="M48 16 C30 18 22 36 28 52 C34 65 50 67 60 57 C46 58 38 48 38 37 C38 27 42 20 48 16 Z" fill="#9BA8C7" stroke="#58678A" strokeWidth="2" />
          <circle cx="56" cy="26" r="3" fill="#F4D58D" />
        </g>
      )}
      {char === '人' && (
        <g>
          <rect width="80" height="80" rx="18" fill="#E5F0EB" />
          <circle cx="40" cy="20" r="7" fill="#D9776C" />
          <path d="M40 28 L40 44 L24 66 M40 44 L56 66" stroke="#2F3640" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>
      )}
      {char === '口' && (
        <g>
          <rect width="80" height="80" rx="18" fill="#FDECEB" />
          <rect x="20" y="24" width="40" height="32" rx="10" fill="#D9776C" stroke="#2F3640" strokeWidth="3" />
          <rect x="26" y="26" width="28" height="6" rx="2" fill="#FFFDF9" />
          <ellipse cx="40" cy="48" rx="12" ry="5" fill="#F2B8B5" />
        </g>
      )}
      {char === '门' && (
        <g>
          <rect width="80" height="80" rx="18" fill="#FDF6E2" />
          <rect x="18" y="16" width="20" height="48" rx="3" fill="#D9A773" stroke="#5A4A42" strokeWidth="2.5" />
          <rect x="42" y="16" width="20" height="48" rx="3" fill="#D9A773" stroke="#5A4A42" strokeWidth="2.5" />
          <circle cx="33" cy="42" r="2.5" fill="#FAF6F0" />
          <circle cx="47" cy="42" r="2.5" fill="#FAF6F0" />
        </g>
      )}
      {char === '山' && (
        <g>
          <rect width="80" height="80" rx="18" fill="#E5F0EB" />
          <path d="M12 62 L24 34 L34 52 L40 20 L48 52 L58 36 L68 62 Z" fill="#88B3A2" stroke="#3F6B5B" strokeWidth="2.5" strokeLinejoin="round" />
        </g>
      )}
      {char === '十' && (
        <g>
          <rect width="80" height="80" rx="18" fill="#EBEEF6" />
          <rect x="33" y="10" width="14" height="60" fill="#9BA8C7" fillOpacity="0.65" />
          <rect x="10" y="33" width="60" height="14" fill="#9BA8C7" fillOpacity="0.65" />
          <line x1="40" y1="12" x2="40" y2="68" stroke="#FAF6F0" strokeWidth="2" strokeDasharray="4 4" />
          <line x1="12" y1="40" x2="68" y2="40" stroke="#FAF6F0" strokeWidth="2" strokeDasharray="4 4" />
        </g>
      )}
      {char === '八' && (
        <g>
          <rect width="80" height="80" rx="18" fill="#FDECEB" />
          <path d="M18 46 Q40 72 62 46 Z" fill="#D9776C" fillOpacity="0.85" />
          <ellipse cx="40" cy="46" rx="22" ry="7" fill="#FAF6F0" stroke="#D9776C" strokeWidth="2" />
          <circle cx="32" cy="45" r="2.2" fill="#88B3A2" />
          <circle cx="40" cy="46" r="2.2" fill="#F4D58D" />
          <circle cx="48" cy="45" r="2.2" fill="#D9776C" />
          <circle cx="36" cy="43" r="2" fill="#9BA8C7" />
          <circle cx="44" cy="43" r="2" fill="#88B3A2" />
        </g>
      )}
    </svg>
  );
};
