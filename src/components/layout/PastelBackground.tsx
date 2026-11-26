import React from 'react';
import { useStudy } from '../../context/StudyContext';

const PETALS = [
  { id: 1, left: '6%', delay: '0s', duration: '17s', size: 16, fill: '#F2B8B5' },
  { id: 2, left: '19%', delay: '-5s', duration: '21s', size: 13, fill: '#F5C9C6' },
  { id: 3, left: '34%', delay: '-11s', duration: '19s', size: 15, fill: '#F2B8B5' },
  { id: 4, left: '51%', delay: '-3s', duration: '23s', size: 12, fill: '#F4D58D' },
  { id: 5, left: '66%', delay: '-9s', duration: '18s', size: 16, fill: '#F2B8B5' },
  { id: 6, left: '81%', delay: '-14s', duration: '22s', size: 14, fill: '#E8A5A2' },
  { id: 7, left: '92%', delay: '-7s', duration: '20s', size: 13, fill: '#F2B8B5' },
  { id: 8, left: '43%', delay: '-16s', duration: '25s', size: 11, fill: '#F5C9C6' },
];

export const PastelBackground: React.FC = () => {
  const { focusMode } = useStudy();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      {/* Subtle warm radial glows */}
      <div
        className="absolute -top-32 -left-24 h-96 w-96 rounded-full opacity-35 blur-3xl"
        style={{ background: 'radial-gradient(circle, #E5F0EB 0%, transparent 72%)' }}
      />
      <div
        className="absolute top-1/3 -right-24 h-96 w-96 rounded-full opacity-35 blur-3xl"
        style={{ background: 'radial-gradient(circle, #FDECEB 0%, transparent 72%)' }}
      />
      <div
        className="absolute bottom-12 left-1/3 h-80 w-80 rounded-full opacity-25 blur-3xl"
        style={{ background: 'radial-gradient(circle, #FDF6E2 0%, transparent 72%)' }}
      />

      {/* Misty Chinese Ink-Wash Layered Mountains at bottom */}
      <svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 h-44 w-full opacity-45 md:h-56"
      >
        <path
          d="M0,256 C180,190 310,145 480,195 C640,242 790,118 980,175 C1160,228 1310,145 1440,188 L1440,320 L0,320 Z"
          fill="#9BA8C7"
          fillOpacity="0.18"
        />
        <path
          d="M0,275 C210,210 380,260 580,205 C760,155 920,235 1130,190 C1270,160 1370,215 1440,228 L1440,320 L0,320 Z"
          fill="#88B3A2"
          fillOpacity="0.22"
        />
        <path
          d="M0,296 C260,245 470,285 740,246 C990,210 1210,272 1440,245 L1440,320 L0,320 Z"
          fill="#88B3A2"
          fillOpacity="0.15"
        />
      </svg>

      {/* Auspicious Chinese Clouds (祥云) */}
      {!focusMode && (
        <>
          <svg
            viewBox="0 0 220 80"
            className="animate-cloud absolute top-20 left-[12%] w-40 opacity-30 md:w-52"
            style={{ animationDuration: '26s' }}
          >
            <path
              d="M25,58 C12,58 6,46 16,38 C24,31 36,36 39,43 C44,24 68,16 86,26 C95,12 122,12 132,28 C148,22 172,30 172,46 C186,44 198,54 188,62 L32,62 C28,62 26,60 25,58 Z"
              fill="none"
              stroke="#88B3A2"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <path
              d="M52,50 C52,43 62,40 68,46 C72,50 67,56 62,55"
              fill="none"
              stroke="#88B3A2"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M112,48 C112,40 124,38 130,45 C134,50 128,56 121,54"
              fill="none"
              stroke="#88B3A2"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>

          <svg
            viewBox="0 0 220 80"
            className="animate-cloud absolute top-44 right-[8%] w-44 opacity-25 md:w-56"
            style={{ animationDuration: '32s', animationDelay: '-10s' }}
          >
            <path
              d="M28,58 C14,58 10,45 20,38 C29,31 41,36 44,44 C51,24 76,18 93,28 C105,14 134,15 142,32 C160,26 184,35 182,50 C194,50 202,58 192,64 L34,64 Z"
              fill="none"
              stroke="#9BA8C7"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>

          {/* Gently falling plum / peach blossom petals */}
          {PETALS.map((p) => (
            <svg
              key={p.id}
              viewBox="0 0 24 24"
              width={p.size}
              height={p.size}
              className="animate-petal absolute top-0"
              style={{
                left: p.left,
                animationDelay: p.delay,
                animationDuration: p.duration,
              }}
            >
              <path
                d="M12 2 C17 6 20 12 16 18 C14 21 12 22 12 22 C12 22 10 21 8 18 C4 12 7 6 12 2 Z"
                fill={p.fill}
                fillOpacity="0.65"
              />
              <path d="M12 5 L12 19" stroke="#FAF6F0" strokeWidth="1" strokeOpacity="0.55" />
            </svg>
          ))}
        </>
      )}
    </div>
  );
};
