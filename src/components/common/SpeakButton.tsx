import React from 'react';
import { Volume2 } from 'lucide-react';
import { useStudy } from '../../context/StudyContext';

interface SpeakButtonProps {
  text: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const SpeakButton: React.FC<SpeakButtonProps> = ({
  text,
  label,
  size = 'sm',
  className = '',
}) => {
  const { speak, speechRate } = useStudy();

  const sizeClass =
    size === 'lg'
      ? 'px-3.5 py-2 text-sm gap-2'
      : size === 'md'
        ? 'px-2.5 py-1.5 text-xs gap-1.5'
        : 'p-1.5 text-xs gap-1';

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        speak(text);
      }}
      title={`ฟังเสียงภาษาจีน (${speechRate === 0.7 ? 'ช้า 0.7x' : 'ปกติ 1.0x'})`}
      className={`inline-flex items-center justify-center rounded-full border border-[#88B3A2]/40 bg-[#E5F0EB]/80 text-[#3F6B5B] transition-all hover:scale-105 hover:bg-[#88B3A2] hover:text-white active:scale-95 cursor-pointer ${sizeClass} ${className}`}
    >
      <Volume2 className={size === 'lg' ? 'h-4 w-4' : 'h-3.5 w-3.5'} />
      {label && <span className="font-medium">{label}</span>}
    </button>
  );
};
