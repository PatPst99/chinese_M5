import React, { useState, useMemo, useEffect } from 'react';
import { RotateCw, Shuffle, ChevronLeft, ChevronRight, CheckCircle2, RefreshCw, PenTool } from 'lucide-react';
import { VOCAB_CATEGORIES, VOCAB_LIST } from '../../data/vocabData';
import type { VocabCategory } from '../../types';
import { useStudy } from '../../context/StudyContext';
import { SpeakButton } from '../common/SpeakButton';

export const FlashcardSection: React.FC = () => {
  const { masteredIds, markMastered, openInStudio, speak } = useStudy();
  const [category, setCategory] = useState<VocabCategory | 'all' | 'unmastered'>('all');
  const [shuffleSeed, setShuffleSeed] = useState(0);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const deck = useMemo(() => {
    let list =
      category === 'all'
        ? [...VOCAB_LIST]
        : category === 'unmastered'
          ? VOCAB_LIST.filter((v) => !masteredIds.has(v.id))
          : VOCAB_LIST.filter((v) => v.category === category);

    if (shuffleSeed > 0) {
      // deterministic-friendly Fisher-Yates copy
      list = [...list];
      for (let i = list.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [list[i], list[j]] = [list[j], list[i]];
      }
    }
    return list;
  }, [category, shuffleSeed, masteredIds]);

  const safeIndex = deck.length > 0 ? Math.min(index, deck.length - 1) : 0;
  const current = deck[safeIndex];

  useEffect(() => {
    setIndex(0);
    setFlipped(false);
  }, [category, shuffleSeed]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.code === 'Space') {
        e.preventDefault();
        setFlipped((f) => !f);
      } else if (e.key === 'ArrowRight' && deck.length > 0) {
        setFlipped(false);
        setIndex((i) => (i + 1) % deck.length);
      } else if (e.key === 'ArrowLeft' && deck.length > 0) {
        setFlipped(false);
        setIndex((i) => (i - 1 + deck.length) % deck.length);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [deck.length]);

  const goNext = () => {
    if (!deck.length) return;
    setFlipped(false);
    setIndex((i) => (i + 1) % deck.length);
  };

  const goPrev = () => {
    if (!deck.length) return;
    setFlipped(false);
    setIndex((i) => (i - 1 + deck.length) % deck.length);
  };

  const handleMark = (known: boolean) => {
    if (!current) return;
    markMastered(current.id, known);
    goNext();
  };

  return (
    <div className="space-y-6">
      {/* Header & Deck Filter */}
      <section className="neo-card lattice-frame rounded-3xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="font-cn text-sm font-semibold text-[#5F8D7B]">3D 闪卡 · บัตรคำศัพท์อัจฉริยะ</span>
            <h1 className="text-2xl font-bold text-[#2F3640]">3D Smart Flashcards</h1>
            <p className="text-xs text-[#636E72]">
              คลิกที่การ์ดหรือกด Spacebar เพื่อพลิกดูคำแปล · กด “จำได้แล้ว” เพื่ออัปเดตแถบความคืบหน้าลง localStorage
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShuffleSeed((s) => s + 1)}
            className="inline-flex items-center gap-1.5 rounded-2xl border border-[#88B3A2]/35 bg-white px-4 py-2 text-xs font-semibold text-[#2F3640] transition hover:bg-[#E5F0EB] cursor-pointer"
          >
            <Shuffle className="h-4 w-4 text-[#5F8D7B]" />
            สลับลำดับการ์ด
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setCategory('unmastered')}
            className={`rounded-xl px-3 py-1.5 text-xs font-semibold cursor-pointer ${
              category === 'unmastered'
                ? 'bg-[#D9776C] text-white'
                : 'border border-[#F2B8B5] bg-[#FDECEB]/65 text-[#B8564C]'
            }`}
          >
            ยังจำไม่ได้ ({VOCAB_LIST.filter((v) => !masteredIds.has(v.id)).length})
          </button>
          {VOCAB_CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategory(c.id)}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold cursor-pointer ${
                category === c.id ? 'bg-[#88B3A2] text-white' : 'bg-[#FAF6F0] text-[#636E72] hover:bg-[#E5F0EB]'
              }`}
            >
              {c.labelTH}
            </button>
          ))}
        </div>
      </section>

      {/* Main 3D Card Stage */}
      {!current ? (
        <div className="neo-card rounded-3xl p-14 text-center">
          <div className="font-cn text-4xl font-bold text-[#5F8D7B]">太棒了！</div>
          <p className="mt-2 text-base font-semibold text-[#2F3640]">คุณจำคำศัพท์ในหมวดนี้ได้ครบทุกคำแล้ว!</p>
          <button
            type="button"
            onClick={() => setCategory('all')}
            className="mt-4 rounded-2xl bg-[#88B3A2] px-5 py-2.5 text-sm font-semibold text-white cursor-pointer"
          >
            ทบทวนทั้งหมดอีกครั้ง
          </button>
        </div>
      ) : (
        <div className="mx-auto max-w-xl space-y-5">
          {/* Card Progress Bar */}
          <div className="flex items-center justify-between text-xs font-semibold text-[#636E72]">
            <span>
              ใบที่ {safeIndex + 1} / {deck.length}
            </span>
            <span className={masteredIds.has(current.id) ? 'text-[#5F8D7B]' : 'text-[#D9776C]'}>
              {masteredIds.has(current.id) ? '✓ จำได้แล้ว' : '● กำลังทบทวน'}
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/80">
            <div
              className="h-full rounded-full bg-[#88B3A2] transition-all duration-300"
              style={{ width: `${((safeIndex + 1) / deck.length) * 100}%` }}
            />
          </div>

          {/* 3D Perspective Card */}
          <div className="perspective-1200">
            <div
              onClick={() => setFlipped((f) => !f)}
              className={`preserve-3d relative h-80 w-full cursor-pointer transition-transform duration-500 ${
                flipped ? 'rotate-y-180' : ''
              }`}
            >
              {/* FRONT */}
              <div
                style={{ position: 'absolute', inset: 0 }}
                className="backface-hidden neo-card lattice-frame flex flex-col items-center justify-between overflow-hidden rounded-3xl p-7 text-center"
              >
                <div className="flex w-full items-center justify-between">
                  <span className="rounded-full bg-[#E5F0EB] px-3 py-1 text-xs font-semibold text-[#3F6B5B]">
                    {VOCAB_CATEGORIES.find((c) => c.id === current.category)?.labelTH}
                  </span>
                  <SpeakButton text={current.hanzi} label="ฟังเสียง" size="md" />
                </div>

                <div>
                  <div className="font-cn text-6xl font-bold text-[#2F3640] md:text-7xl">{current.hanzi}</div>
                  {current.colorHex && (
                    <div
                      className="mx-auto mt-3 h-5 w-16 rounded-full border border-[#2F3640]/20"
                      style={{ backgroundColor: current.colorHex }}
                    />
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-[#636E72]">
                  <RotateCw className="h-3.5 w-3.5 text-[#88B3A2]" />
                  <span>คลิกการ์ด หรือกด Space เพื่อพลิกดูพินอินและคำแปล</span>
                </div>
              </div>

              {/* BACK */}
              <div
                style={{ position: 'absolute', inset: 0 }}
                className="backface-hidden rotate-y-180 neo-card lattice-frame flex flex-col items-center justify-between overflow-hidden rounded-3xl border-[#D9776C]/35 bg-gradient-to-br from-[#FFFDF9] to-[#FDF6E2]/80 p-7 text-center"
              >
                <div className="flex w-full items-center justify-between">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openInStudio(current.hanzi);
                    }}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#FDECEB] px-3 py-1 text-xs font-semibold text-[#B8564C] hover:bg-[#D9776C] hover:text-white cursor-pointer"
                  >
                    <PenTool className="h-3.5 w-3.5" />
                    ฝึกเขียน
                  </button>
                  <SpeakButton text={current.hanzi} label="ฟังเสียงซ้ำ" size="md" />
                </div>

                <div className="space-y-1.5">
                  <div className="font-cn text-4xl font-bold text-[#2F3640]">{current.hanzi}</div>
                  <div className="font-pinyin text-2xl font-bold text-[#5F8D7B]">{current.pinyin}</div>
                  <div className="text-lg font-bold text-[#D9776C]">{current.thai}</div>
                  {current.note && (
                    <p className="mx-auto max-w-md line-clamp-2 rounded-xl bg-white/85 px-3 py-1.5 text-xs text-[#636E72]">
                      {current.note}
                    </p>
                  )}
                </div>

                <div className="text-[11px] text-[#636E72]">แหล่งอ้างอิง: {current.source ?? 'บทเรียนภาษาจีน'}</div>
              </div>
            </div>
          </div>

          {/* Action Controls */}
          <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 pt-1">
            <button
              type="button"
              onClick={goPrev}
              className="inline-flex items-center gap-1 rounded-2xl border border-[#88B3A2]/35 bg-white px-4 py-2.5 text-sm font-semibold text-[#2F3640] hover:bg-[#E5F0EB] cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
              ก่อนหน้า
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleMark(false)}
                className="inline-flex items-center gap-1.5 rounded-2xl border border-[#F2B8B5] bg-[#FDECEB] px-4 py-2.5 text-sm font-semibold text-[#B8564C] transition hover:bg-[#D9776C] hover:text-white cursor-pointer"
              >
                <RefreshCw className="h-4 w-4" />
                ทบทวนอีกครั้ง
              </button>
              <button
                type="button"
                onClick={() => {
                  speak(current.hanzi);
                  handleMark(true);
                }}
                className="inline-flex items-center gap-1.5 rounded-2xl bg-[#88B3A2] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#5F8D7B] cursor-pointer"
              >
                <CheckCircle2 className="h-4 w-4" />
                จำได้แล้ว
              </button>
            </div>

            <button
              type="button"
              onClick={goNext}
              className="inline-flex items-center gap-1 rounded-2xl border border-[#88B3A2]/35 bg-white px-4 py-2.5 text-sm font-semibold text-[#2F3640] hover:bg-[#E5F0EB] cursor-pointer"
            >
              ถัดไป
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
