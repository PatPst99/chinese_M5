import React, { useState, useMemo } from 'react';
import { Check, PenTool, Search } from 'lucide-react';
import { VOCAB_CATEGORIES, VOCAB_LIST } from '../../data/vocabData';
import type { VocabCategory } from '../../types';
import { useStudy } from '../../context/StudyContext';
import { normalizePinyin } from '../../utils/speech';
import { SpeakButton } from '../common/SpeakButton';
import { RevealText } from '../common/RevealText';

export const VocabSection: React.FC = () => {
  const { masteredIds, toggleMastered, openInStudio } = useStudy();
  const [category, setCategory] = useState<VocabCategory | 'all'>('all');
  const [onlyUnmastered, setOnlyUnmastered] = useState(false);
  const [filterText, setFilterText] = useState('');

  const filtered = useMemo(() => {
    const q = filterText.trim();
    const qLower = q.toLowerCase();
    const qNorm = normalizePinyin(q);

    return VOCAB_LIST.filter((v) => {
      if (category !== 'all' && v.category !== category) return false;
      if (onlyUnmastered && masteredIds.has(v.id)) return false;
      if (!q) return true;
      return (
        v.hanzi.includes(q) ||
        v.thai.toLowerCase().includes(qLower) ||
        v.pinyin.toLowerCase().includes(qLower) ||
        (qNorm.length > 0 && normalizePinyin(v.pinyin).includes(qNorm)) ||
        (v.teochew?.toLowerCase().includes(qLower) ?? false)
      );
    });
  }, [category, onlyUnmastered, filterText, masteredIds]);

  return (
    <div className="space-y-6">
      {/* Header & Filters */}
      <section className="neo-card lattice-frame rounded-3xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="font-cn text-sm font-semibold text-[#5F8D7B]">词语总汇 · คลังคำศัพท์ครบ 100%</span>
            <h1 className="text-2xl font-bold text-[#2F3640]">คลังคำศัพท์แยกหมวด ({VOCAB_LIST.length} คำ)</h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#636E72]" />
              <input
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                placeholder="กรองคำศัพท์ในหมวด..."
                className="w-52 rounded-2xl border border-[#88B3A2]/35 bg-white/90 py-2 pr-3 pl-9 text-xs text-[#2F3640] outline-none focus:border-[#88B3A2]"
              />
            </div>

            <button
              type="button"
              onClick={() => setOnlyUnmastered((v) => !v)}
              className={`rounded-2xl border px-3 py-2 text-xs font-semibold transition cursor-pointer ${
                onlyUnmastered
                  ? 'border-[#D9776C] bg-[#D9776C] text-white'
                  : 'border-[#88B3A2]/30 bg-white/85 text-[#2F3640] hover:bg-[#E5F0EB]'
              }`}
            >
              {onlyUnmastered ? 'แสดงเฉพาะที่ยังจำไม่ได้' : 'กรองเฉพาะยังจำไม่ได้'}
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="mt-4 flex flex-wrap gap-2">
          {VOCAB_CATEGORIES.map((cat) => {
            const count =
              cat.id === 'all' ? VOCAB_LIST.length : VOCAB_LIST.filter((v) => v.category === cat.id).length;
            const active = category === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                className={`inline-flex items-center gap-1.5 rounded-2xl px-3.5 py-2 text-xs font-semibold transition cursor-pointer ${
                  active
                    ? 'bg-[#88B3A2] text-white shadow-sm'
                    : 'border border-[#88B3A2]/25 bg-white/80 text-[#2F3640] hover:bg-[#E5F0EB]'
                }`}
              >
                <span>{cat.labelTH}</span>
                <span className={`rounded-full px-1.5 py-0.5 text-[10px] ${active ? 'bg-white/25' : 'bg-[#FAF6F0] text-[#636E72]'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Cards Grid */}
      {filtered.length === 0 ? (
        <div className="neo-card rounded-3xl p-12 text-center text-sm text-[#636E72]">
          ไม่พบคำศัพท์ตามเงื่อนไขที่เลือก ลองล้างช่องค้นหาหรือเปลี่ยนหมวดดูนะ
        </div>
      ) : (
        <section className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => {
            const mastered = masteredIds.has(item.id);
            return (
              <div
                key={item.id}
                className={`neo-card flex flex-col justify-between rounded-2xl p-4 transition hover:-translate-y-0.5 ${
                  mastered ? 'border-[#88B3A2] bg-[#E5F0EB]/35' : ''
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      {item.colorHex && (
                        <span
                          className="h-6 w-6 shrink-0 rounded-full border border-[#2F3640]/20 shadow-inner"
                          style={{ backgroundColor: item.colorHex }}
                        />
                      )}
                      <span className="font-cn text-3xl font-bold text-[#2F3640]">{item.hanzi}</span>
                      {item.gender && (
                        <span
                          className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                            item.gender === 'ช.'
                              ? 'bg-[#EBEEF6] text-[#465678]'
                              : item.gender === 'ญ.'
                                ? 'bg-[#FDECEB] text-[#B8564C]'
                                : 'bg-[#FDF6E2] text-[#9C7220]'
                          }`}
                        >
                          {item.gender}
                        </span>
                      )}
                    </div>

                    <div className="flex shrink-0 items-center gap-1">
                      <SpeakButton text={item.hanzi} />
                      <button
                        type="button"
                        onClick={() => openInStudio(item.hanzi)}
                        title="ฝึกเขียนลำดับขีด"
                        className="rounded-full border border-[#F2B8B5]/60 bg-[#FDECEB]/75 p-1.5 text-[#B8564C] transition hover:bg-[#D9776C] hover:text-white cursor-pointer"
                      >
                        <PenTool className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleMastered(item.id)}
                        title={mastered ? 'จำได้แล้ว (คลิกเพื่อยกเลิก)' : 'ทำเครื่องหมายว่าจำได้แล้ว'}
                        className={`rounded-full border p-1.5 transition cursor-pointer ${
                          mastered
                            ? 'border-[#5F8D7B] bg-[#5F8D7B] text-white'
                            : 'border-[#88B3A2]/35 bg-white text-[#636E72] hover:bg-[#E5F0EB]'
                        }`}
                      >
                        <Check className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-2 font-pinyin text-base font-bold text-[#5F8D7B]">
                    <RevealText type="pinyin">{item.pinyin}</RevealText>
                  </div>
                  <div className="mt-0.5 text-sm font-medium text-[#2F3640]">
                    <RevealText type="thai">{item.thai}</RevealText>
                  </div>

                  {item.teochew && (
                    <span className="mt-2 inline-block rounded-lg bg-[#FDF6E2] px-2.5 py-0.5 text-xs font-bold text-[#9C7220]">
                      แต้จิ๋ว/ไทย: {item.teochew}
                    </span>
                  )}
                  {item.note && <p className="mt-2 rounded-xl bg-[#FAF6F0] px-2.5 py-1.5 text-[11px] text-[#636E72]">{item.note}</p>}
                </div>

                {item.source && (
                  <div className="mt-3 border-t border-[#88B3A2]/15 pt-2 text-[10px] text-[#636E72]/80">
                    แหล่งอ้างอิง: {item.source}
                  </div>
                )}
              </div>
            );
          })}
        </section>
      )}
    </div>
  );
};
