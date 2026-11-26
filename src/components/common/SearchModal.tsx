import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, PenTool, ArrowRight } from 'lucide-react';
import { useStudy } from '../../context/StudyContext';
import { VOCAB_LIST, VOCAB_CATEGORIES } from '../../data/vocabData';
import { NUMBERS_1_TO_10 } from '../../data/numbersData';
import { THIRD_TONE_SANDHI, YI_SANDHI, BU_SANDHI } from '../../data/rulesData';
import { normalizePinyin } from '../../utils/speech';
import { SpeakButton } from './SpeakButton';
import type { SectionId } from '../../types';

interface SearchEntry {
  id: string;
  hanzi: string;
  pinyin: string;
  thai: string;
  tag: string;
  section: SectionId;
}

const ALL_SEARCH_ENTRIES: SearchEntry[] = [
  ...VOCAB_LIST.map((v) => ({
    id: v.id,
    hanzi: v.hanzi,
    pinyin: v.pinyin,
    thai: v.thai,
    tag: VOCAB_CATEGORIES.find((c) => c.id === v.category)?.labelTH ?? 'คำศัพท์',
    section: 'vocab' as SectionId,
  })),
  ...NUMBERS_1_TO_10.map((n) => ({
    id: `num-${n.num}`,
    hanzi: n.hanzi,
    pinyin: n.pinyin,
    thai: `${n.thai} (${n.num}) · ${n.gestureTitle}`,
    tag: 'ตัวเลข',
    section: 'numbers' as SectionId,
  })),
  ...THIRD_TONE_SANDHI.examples.map((s, i) => ({
    id: `s3-${i}`,
    hanzi: s.hanzi,
    pinyin: `${s.writtenPinyin} → ${s.spokenPinyin}`,
    thai: s.thai,
    tag: 'กฎเสียง 3 ชน 3',
    section: 'rules' as SectionId,
  })),
  ...YI_SANDHI.examples.map((s, i) => ({
    id: `syi-${i}`,
    hanzi: s.hanzi,
    pinyin: s.writtenPinyin,
    thai: s.thai,
    tag: 'กฎเปลี่ยนเสียง 一',
    section: 'rules' as SectionId,
  })),
  ...BU_SANDHI.examples.map((s, i) => ({
    id: `sbu-${i}`,
    hanzi: s.hanzi,
    pinyin: s.writtenPinyin,
    thai: s.thai,
    tag: 'กฎเปลี่ยนเสียง 不',
    section: 'rules' as SectionId,
  })),
];

export const SearchModal: React.FC = () => {
  const { searchOpen, setSearchOpen, setActiveSection, openInStudio } = useStudy();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 60);
    } else {
      setQuery('');
    }
  }, [searchOpen]);

  const results = useMemo(() => {
    const q = query.trim();
    if (!q) return ALL_SEARCH_ENTRIES.slice(0, 12);
    const qLower = q.toLowerCase();
    const qNorm = normalizePinyin(q);

    return ALL_SEARCH_ENTRIES.filter((item) => {
      if (item.hanzi.includes(q)) return true;
      if (item.thai.toLowerCase().includes(qLower)) return true;
      if (item.pinyin.toLowerCase().includes(qLower)) return true;
      if (item.tag.toLowerCase().includes(qLower)) return true;
      if (qNorm && normalizePinyin(item.pinyin).includes(qNorm)) return true;
      return false;
    }).slice(0, 28);
  }, [query]);

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSearchOpen(false)}
          className="fixed inset-0 z-50 flex items-start justify-center bg-[#2F3640]/35 px-4 pt-16 backdrop-blur-sm md:pt-24"
        >
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl overflow-hidden rounded-3xl border border-[#88B3A2]/40 bg-[#FAF6F0] shadow-2xl"
          >
            {/* Input Header */}
            <div className="flex items-center gap-3 border-b border-[#88B3A2]/25 bg-white/80 px-5 py-4">
              <Search className="h-5 w-5 text-[#5F8D7B]" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ค้นหาได้ทั้งอักษรจีน (你好), พินอิน (nihao / nǐ hǎo) หรือภาษาไทย (สวัสดี, แซ่ตั้ง)..."
                className="w-full bg-transparent text-sm text-[#2F3640] placeholder-[#636E72]/70 outline-none md:text-base"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="rounded-full p-1 text-[#636E72] hover:bg-[#E5F0EB] cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="rounded-lg border border-[#88B3A2]/30 px-2 py-1 text-xs text-[#636E72] hover:bg-[#E5F0EB] cursor-pointer"
              >
                ESC
              </button>
            </div>

            {/* Results */}
            <div className="max-h-[60vh] overflow-y-auto p-3">
              <div className="mb-2 flex items-center justify-between px-2 text-xs text-[#636E72]">
                <span>{query ? `พบ ${results.length} รายการ` : 'คำศัพท์แนะนำยอดนิยม'}</span>
                <span>กดลำโพงเพื่อฟังเสียง · กดพู่กันเพื่อฝึกเขียน</span>
              </div>

              {results.length === 0 ? (
                <div className="py-12 text-center text-sm text-[#636E72]">
                  ไม่พบคำที่ค้นหา “{query}” ลองพิมพ์อักษรจีน พินอินแบบไม่ใส่วรรณยุกต์ หรือคำแปลภาษาไทยดูนะ
                </div>
              ) : (
                <div className="space-y-1.5">
                  {results.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-3 rounded-2xl border border-transparent bg-white/75 px-4 py-2.5 transition-all hover:border-[#88B3A2]/40 hover:bg-white"
                    >
                      <div className="flex min-w-0 items-center gap-3.5">
                        <span className="font-cn text-2xl font-semibold text-[#2F3640]">{item.hanzi}</span>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-pinyin text-sm font-semibold text-[#5F8D7B]">{item.pinyin}</span>
                            <span className="rounded-full bg-[#E5F0EB] px-2 py-0.5 text-[11px] font-medium text-[#3F6B5B]">
                              {item.tag}
                            </span>
                          </div>
                          <p className="truncate text-xs text-[#636E72]">{item.thai}</p>
                        </div>
                      </div>

                      <div className="flex shrink-0 items-center gap-1.5">
                        <SpeakButton text={item.hanzi} />
                        <button
                          type="button"
                          onClick={() => {
                            setSearchOpen(false);
                            openInStudio(item.hanzi);
                          }}
                          title="ฝึกเขียนในสนามฝึกเขียน"
                          className="rounded-full border border-[#F2B8B5]/60 bg-[#FDECEB]/70 p-1.5 text-[#B8564C] transition hover:bg-[#D9776C] hover:text-white cursor-pointer"
                        >
                          <PenTool className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setSearchOpen(false);
                            setActiveSection(item.section);
                          }}
                          title="ไปที่หมวดหมู่นี้"
                          className="rounded-full border border-[#9BA8C7]/40 bg-[#EBEEF6] p-1.5 text-[#58678A] transition hover:bg-[#9BA8C7] hover:text-white cursor-pointer"
                        >
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
