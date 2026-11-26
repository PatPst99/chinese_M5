import React, { useState, useEffect } from 'react';
import { useStudy } from '../../context/StudyContext';

interface RevealTextProps {
  type: 'pinyin' | 'thai';
  children: React.ReactNode;
  className?: string;
}

/**
 * Active Recall text wrapper: blurs content when global Hide Pinyin / Hide Thai is ON.
 * Hovering or clicking reveals that individual card/item immediately!
 */
export const RevealText: React.FC<RevealTextProps> = ({ type, children, className = '' }) => {
  const { hidePinyin, hideThai } = useStudy();
  const isHiddenGlobal = type === 'pinyin' ? hidePinyin : hideThai;
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    setRevealed(false);
  }, [isHiddenGlobal]);

  if (!isHiddenGlobal) {
    return <span className={className}>{children}</span>;
  }

  return (
    <span
      role="button"
      tabIndex={0}
      onClick={(e) => {
        e.stopPropagation();
        setRevealed((r) => !r);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setRevealed((r) => !r);
        }
      }}
      title={revealed ? 'คลิกเพื่อซ่อนอีกครั้ง' : 'คลิกหรือวางเมาส์เพื่อเฉลย'}
      className={`group relative inline-block cursor-pointer rounded-md px-1.5 py-0.5 transition-all select-none ${
        revealed
          ? 'bg-[#FDF6E2]/80 text-inherit'
          : 'bg-[#E5F0EB]/70 hover:bg-[#FDF6E2]/80'
      } ${className}`}
    >
      <span
        className={`inline-block transition-all duration-200 ${
          revealed ? 'blur-0 opacity-100' : 'blur-[6px] opacity-40 group-hover:blur-0 group-hover:opacity-100'
        }`}
      >
        {children}
      </span>
    </span>
  );
};
