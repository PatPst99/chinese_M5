import React from 'react';
import { Menu, Search, Eye, EyeOff, Gauge, Sparkles } from 'lucide-react';
import { useStudy } from '../../context/StudyContext';

export const TopBar: React.FC = () => {
  const {
    hidePinyin,
    toggleHidePinyin,
    hideThai,
    toggleHideThai,
    speechRate,
    toggleSpeechRate,
    focusMode,
    toggleFocusMode,
    setSearchOpen,
    setMobileNavOpen,
    masteryPercent,
  } = useStudy();

  return (
    <header className="sticky top-0 z-30 border-b border-[#88B3A2]/25 bg-[#FAF6F0]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-3 md:px-6">
        {/* Left: mobile menu + instant search */}
        <div className="flex flex-1 items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileNavOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#88B3A2]/30 bg-white/80 text-[#2F3640] hover:bg-[#E5F0EB] lg:hidden cursor-pointer"
            aria-label="เปิดเมนู"
          >
            <Menu className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="flex flex-1 max-w-md items-center justify-between gap-2 rounded-2xl border border-[#88B3A2]/30 bg-white/85 px-3.5 py-2 text-left text-xs text-[#636E72] shadow-xs transition hover:border-[#88B3A2] hover:bg-white md:text-sm cursor-pointer"
          >
            <span className="flex items-center gap-2 truncate">
              <Search className="h-4 w-4 shrink-0 text-[#5F8D7B]" />
              <span className="truncate">ค้นหาจีน / พินอิน / ไทย...</span>
            </span>
            <kbd className="hidden rounded-md border border-[#88B3A2]/30 bg-[#FAF6F0] px-1.5 py-0.5 text-[10px] font-semibold text-[#5F8D7B] sm:inline-block">
              Ctrl K
            </kbd>
          </button>
        </div>

        {/* Right: Active Recall + Speed + Focus Mode */}
        <div className="flex flex-wrap items-center gap-1.5 md:gap-2">
          <button
            type="button"
            onClick={toggleHidePinyin}
            title="โหมด Active Recall: ซ่อนพินอินทั้งเว็บ (วางเมาส์หรือคลิกเพื่อเฉลย)"
            className={`inline-flex items-center gap-1.5 rounded-xl border px-2.5 py-1.5 text-xs font-medium transition cursor-pointer ${
              hidePinyin
                ? 'border-[#D9776C] bg-[#D9776C] text-white shadow-xs'
                : 'border-[#88B3A2]/30 bg-white/80 text-[#2F3640] hover:bg-[#E5F0EB]'
            }`}
          >
            {hidePinyin ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5 text-[#5F8D7B]" />}
            <span>{hidePinyin ? 'ซ่อนพินอิน' : 'พินอิน'}</span>
          </button>

          <button
            type="button"
            onClick={toggleHideThai}
            title="โหมด Active Recall: ซ่อนคำแปลภาษาไทยทั้งเว็บ (วางเมาส์หรือคลิกเพื่อเฉลย)"
            className={`inline-flex items-center gap-1.5 rounded-xl border px-2.5 py-1.5 text-xs font-medium transition cursor-pointer ${
              hideThai
                ? 'border-[#D9776C] bg-[#D9776C] text-white shadow-xs'
                : 'border-[#88B3A2]/30 bg-white/80 text-[#2F3640] hover:bg-[#E5F0EB]'
            }`}
          >
            {hideThai ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5 text-[#5F8D7B]" />}
            <span>{hideThai ? 'ซ่อนคำแปล' : 'คำแปล'}</span>
          </button>

          <button
            type="button"
            onClick={toggleSpeechRate}
            title="สลับความเร็วเสียงอ่านภาษาจีน (ปกติ 1.0x / ช้าสำหรับฝึกฟัง 0.7x)"
            className={`inline-flex items-center gap-1.5 rounded-xl border px-2.5 py-1.5 text-xs font-medium transition cursor-pointer ${
              speechRate === 0.7
                ? 'border-[#9BA8C7] bg-[#9BA8C7] text-white'
                : 'border-[#88B3A2]/30 bg-white/80 text-[#2F3640] hover:bg-[#E5F0EB]'
            }`}
          >
            <Gauge className="h-3.5 w-3.5" />
            <span>{speechRate === 0.7 ? 'ช้า 0.7x' : 'ปกติ 1.0x'}</span>
          </button>

          <button
            type="button"
            onClick={toggleFocusMode}
            title="โหมดโฟกัส: หยุดแอนิเมชันกลีบดอกไม้และเมฆพื้นหลัง"
            className={`inline-flex items-center gap-1.5 rounded-xl border px-2.5 py-1.5 text-xs font-medium transition cursor-pointer ${
              focusMode
                ? 'border-[#5F8D7B] bg-[#5F8D7B] text-white'
                : 'border-[#88B3A2]/30 bg-white/80 text-[#2F3640] hover:bg-[#E5F0EB]'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{focusMode ? 'โฟกัส: เปิด' : 'โหมดโฟกัส'}</span>
          </button>

          {/* Compact mobile mastery pill */}
          <div className="flex items-center gap-1.5 rounded-xl bg-[#E5F0EB] px-2.5 py-1.5 text-xs font-semibold text-[#3F6B5B] lg:hidden">
            <span>จำได้ {masteryPercent}%</span>
          </div>
        </div>
      </div>
    </header>
  );
};
