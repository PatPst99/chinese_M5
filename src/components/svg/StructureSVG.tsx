import React from 'react';

interface StructureSVGProps {
  type: 'single' | 'top-bottom' | 'left-right' | 'enclosure';
}

export const StructureSVG: React.FC<StructureSVGProps> = ({ type }) => {
  return (
    <svg viewBox="0 0 64 64" className="h-14 w-14 shrink-0">
      {type === 'single' && (
        <rect x="8" y="8" width="48" height="48" rx="10" fill="#88B3A2" fillOpacity="0.3" stroke="#5F8D7B" strokeWidth="2" />
      )}
      {type === 'top-bottom' && (
        <>
          <rect x="8" y="8" width="48" height="22" rx="6" fill="#F2B8B5" fillOpacity="0.55" stroke="#D9776C" strokeWidth="1.8" />
          <rect x="8" y="34" width="48" height="22" rx="6" fill="#88B3A2" fillOpacity="0.4" stroke="#5F8D7B" strokeWidth="1.8" />
        </>
      )}
      {type === 'left-right' && (
        <>
          <rect x="8" y="8" width="22" height="48" rx="6" fill="#F4D58D" fillOpacity="0.55" stroke="#C99B3B" strokeWidth="1.8" />
          <rect x="34" y="8" width="22" height="48" rx="6" fill="#9BA8C7" fillOpacity="0.45" stroke="#58678A" strokeWidth="1.8" />
        </>
      )}
      {type === 'enclosure' && (
        <>
          <rect x="8" y="8" width="48" height="48" rx="10" fill="#9BA8C7" fillOpacity="0.32" stroke="#58678A" strokeWidth="2" />
          <rect x="20" y="20" width="24" height="24" rx="5" fill="#F2B8B5" fillOpacity="0.65" stroke="#D9776C" strokeWidth="1.8" />
        </>
      )}
    </svg>
  );
};
