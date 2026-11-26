import React from 'react';
import {
  Compass,
  AudioLines,
  Sparkles,
  Brush,
  Hash,
  BookOpen,
  MessageCircle,
  Landmark,
  Layers,
  PenTool,
  Trophy,
  X,
} from 'lucide-react';
import { useStudy } from '../../context/StudyContext';
import type { SectionId } from '../../types';

export const NAV_ITEMS: { id: SectionId; label: string; cn: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'overview', label: 'ภาพรวมบทเรียน', cn: '总览', icon: Compass },
  { id: 'pinyin', label: 'พินอิน & เสียงวรรณยุกต์', cn: '拼音', icon: AudioLines },
  { id: 'rules', label: 'กฎพิเศษ & เปลี่ยนเสียง', cn: '规则', icon: Sparkles },
  { id: 'hanzi', label: 'เส้นขีด & โครงสร้างอักษร', cn: '汉字', icon: Brush },
  { id: 'numbers', label: 'ตัวเลข & ภาษามือ 1–10', cn: '数字', icon: Hash },
  { id: 'vocab', label: 'คลังคำศัพท์แยกหมวด', cn: '词语', icon: BookOpen },
  { id: 'lesson', label: 'บทที่ 1 บทสนทนา & ประโยค', cn: '会话', icon: MessageCircle },
  { id: 'culture', label: 'เกร็ดวัฒนธรรม & แซ่', cn: '文化', icon: Landmark },
  { id: 'flashcards', label: 'แฟลชการ์ด 3 มิติ', cn: '闪卡', icon: Layers },
  { id: 'studio', label: 'สนามฝึกเขียนอักษรจีน', cn: '笔顺', icon: PenTool },
  { id: 'quiz', label: 'คลังแบบฝึก & มินิเกม', cn: '测验', icon: Trophy },
];

export const Sidebar: React.FC = () => {
  const { activeSection, setActiveSection, masteryPercent, masteredCount, totalVocabCount, mobileNavOpen, setMobileNavOpen } =
    useStudy();

  const navContent = (
    <div className="flex h-full flex-col">
      {/* Brand header */}
      <div className="flex items-center justify-between border-b border-[#88B3A2]/25 px-5 py-4">
        <button
          type="button"
          onClick={() => setActiveSection('overview')}
          className="flex items-center gap-3 text-left cursor-pointer"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#88B3A2] to-[#5F8D7B] text-white shadow-md">
            <span className="font-cn text-2xl font-bold">汉</span>
          </div>
          <div>
            <div className="font-cn-display text-lg leading-tight font-bold text-[#2F3640]">汉语复习笔记</div>
            <div className="text-[11px] font-medium text-[#5F8D7B]">ห้องทบทวนภาษาจีนครบ 100%</div>
          </div>
        </button>
        <button
          type="button"
          onClick={() => setMobileNavOpen(false)}
          className="rounded-xl p-1.5 text-[#636E72] hover:bg-[#E5F0EB] lg:hidden cursor-pointer"
          aria-label="ปิดเมนู"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Mastery Progress Card */}
      <div className="mx-4 mt-4 rounded-2xl border border-[#88B3A2]/30 bg-gradient-to-br from-[#E5F0EB]/75 to-[#FDF6E2]/60 p-3.5">
        <div className="mb-1.5 flex items-center justify-between text-xs">
          <span className="font-semibold text-[#2F3640]">ความคืบหน้าการจำคำศัพท์</span>
          <span className="font-bold text-[#5F8D7B]">{masteryPercent}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-white/80">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#88B3A2] via-[#9BA8C7] to-[#D9776C] transition-all duration-500"
            style={{ width: `${masteryPercent}%` }}
          />
        </div>
        <p className="mt-1.5 text-[11px] text-[#636E72]">
          จำได้แล้ว <strong className="text-[#2F3640]">{masteredCount}</strong> / {totalVocabCount} คำ (บันทึกอัตโนมัติ)
        </p>
      </div>

      {/* Navigation items */}
      <nav className="mt-3 flex-1 space-y-1 overflow-y-auto px-3 pb-6">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveSection(item.id)}
              className={`group flex w-full items-center justify-between rounded-2xl px-3.5 py-2.5 text-left text-sm transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#88B3A2] font-semibold text-white shadow-md shadow-[#88B3A2]/25'
                  : 'text-[#2F3640] hover:bg-[#E5F0EB]/70'
              }`}
            >
              <span className="flex items-center gap-2.5 truncate">
                <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-white' : 'text-[#5F8D7B]'}`} />
                <span className="truncate">{item.label}</span>
              </span>
              <span
                className={`font-cn ml-2 shrink-0 text-xs ${
                  isActive ? 'text-white/90' : 'text-[#636E72]/70 group-hover:text-[#5F8D7B]'
                }`}
              >
                {item.cn}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="sticky top-0 hidden h-screen w-72 shrink-0 border-r border-[#88B3A2]/25 bg-[#FFFDF9]/85 backdrop-blur-md lg:block">
        {navContent}
      </aside>

      {/* Mobile Drawer */}
      {mobileNavOpen && (
        <div
          className="fixed inset-0 z-50 flex bg-[#2F3640]/35 backdrop-blur-xs lg:hidden"
          onClick={() => setMobileNavOpen(false)}
        >
          <aside
            className="h-full w-72 max-w-[85vw] border-r border-[#88B3A2]/30 bg-[#FAF6F0] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {navContent}
          </aside>
        </div>
      )}
    </>
  );
};
