import React from 'react';
import { motion } from 'framer-motion';

interface ToneContourSVGProps {
  activeTone: number; // 1..4 or 5 (neutral)
  onSelectTone?: (tone: number) => void;
}

const TONE_PATHS: Record<number, { d: string; color: string; label: string; code: string }> = {
  1: { d: 'M 42 30 L 238 30', color: '#88B3A2', label: 'เสียง 1 (¯)', code: '55 สูงคงที่' },
  2: { d: 'M 42 86 Q 145 78 238 30', color: '#9BA8C7', label: 'เสียง 2 (ˊ)', code: '35 ขึ้นสูง' },
  3: { d: 'M 42 114 Q 112 152 140 144 Q 190 120 238 58', color: '#E5B25D', label: 'เสียง 3 (ˇ)', code: '214 ลงต่ำแล้วขึ้น' },
  4: { d: 'M 42 30 Q 142 74 238 144', color: '#D9776C', label: 'เสียง 4 (ˋ)', code: '51 ทิ้งดิ่งลง' },
  5: { d: 'M 110 92 L 170 92', color: '#8E99A2', label: 'เสียงเบา (轻声)', code: 'สั้นและเบา' },
};

export const ToneContourSVG: React.FC<ToneContourSVGProps> = ({ activeTone, onSelectTone }) => {
  const current = TONE_PATHS[activeTone] ?? TONE_PATHS[1];

  return (
    <div className="w-full">
      <svg viewBox="0 0 280 176" className="h-auto w-full select-none">
        {/* Background 5-level pitch grid */}
        {[5, 4, 3, 2, 1].map((lvl, idx) => {
          const y = 30 + idx * 28.5;
          return (
            <g key={lvl}>
              <line
                x1="36"
                y1={y}
                x2="250"
                y2={y}
                stroke="#88B3A2"
                strokeOpacity={lvl === 5 || lvl === 1 ? 0.35 : 0.18}
                strokeDasharray={lvl === 3 ? '4 4' : undefined}
                strokeWidth="1.2"
              />
              <text x="16" y={y + 4} fontSize="11" fill="#636E72" fontWeight="600">
                {lvl}
              </text>
            </g>
          );
        })}

        {/* Ghost curves for tones 1-4 so user sees relative pitch */}
        {[1, 2, 3, 4].map((t) => {
          const tp = TONE_PATHS[t];
          const isCurrent = t === activeTone;
          return (
            <path
              key={t}
              d={tp.d}
              fill="none"
              stroke={tp.color}
              strokeWidth={isCurrent ? 0 : 2.5}
              strokeOpacity={isCurrent ? 0 : 0.22}
              strokeLinecap="round"
              className="cursor-pointer transition-opacity hover:opacity-60"
              onClick={() => onSelectTone?.(t)}
            />
          );
        })}

        {/* Active animated contour */}
        <motion.path
          key={activeTone}
          d={current.d}
          pathLength={1}
          fill="none"
          stroke={current.color}
          strokeWidth={activeTone === 5 ? 6 : 5.5}
          strokeDasharray={activeTone === 5 ? '0.12 0.12' : '1'}
          strokeLinecap="round"
          initial={{ strokeDashoffset: 1, opacity: 0.5 }}
          animate={{ strokeDashoffset: 0, opacity: 1 }}
          transition={{ duration: 0.72, ease: 'easeInOut' }}
        />

        {/* Animated bead traveling along path */}
        {activeTone !== 5 && (
          <circle r="6" fill="#FAF6F0" stroke={current.color} strokeWidth="3.5">
            <animateMotion dur="1.4s" repeatCount="indefinite" path={current.d} />
          </circle>
        )}

        {/* Pitch badge */}
        <rect x="44" y="152" width="192" height="20" rx="10" fill={current.color} fillOpacity="0.16" />
        <text x="140" y="166" textAnchor="middle" fontSize="11" fill="#2F3640" fontWeight="600">
          {current.label} · {current.code}
        </text>
      </svg>
    </div>
  );
};
