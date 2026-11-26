import React, { useEffect, useRef, useState } from 'react';
import HanziWriter from 'hanzi-writer';
import { Play, Repeat, PenTool, RotateCcw, Eye, EyeOff, Sparkles, CheckCircle2 } from 'lucide-react';
import { HANZI_STUDIO_DECKS } from '../../data/hanziData';
import { useStudy } from '../../context/StudyContext';
import { SpeakButton } from '../common/SpeakButton';
import { firePastelConfetti } from '../../utils/confetti';

export const HanziStudioSection: React.FC = () => {
  const { studioChar, openInStudio, speak } = useStudy();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const writerRef = useRef<HanziWriter | null>(null);

  const [selectedChar, setSelectedChar] = useState<string>(studioChar || '你');
  const [activeDeckId, setActiveDeckId] = useState<string>(HANZI_STUDIO_DECKS[0].id);
  const [customInput, setCustomInput] = useState('');
  const [mode, setMode] = useState<'animate' | 'quiz'>('animate');
  const [quizKey, setQuizKey] = useState(0);
  const [showOutline, setShowOutline] = useState(true);
  const [speed, setSpeed] = useState<number>(1.0);
  const [quizStatus, setQuizStatus] = useState<{
    done: boolean;
    strokesDone: number;
    mistakes: number;
    message: string;
  }>({ done: false, strokesDone: 0, mistakes: 0, message: 'กดปุ่ม “ดูลำดับขีด” หรือสลับเป็นโหมด “ลองลากเส้นเขียนเอง”' });
  const [loadError, setLoadError] = useState<string | null>(null);

  // Sync if user jumped here via "ฝึกเขียน" button on any vocab card
  useEffect(() => {
    if (studioChar && studioChar !== selectedChar) {
      setSelectedChar(studioChar);
      const foundDeck = HANZI_STUDIO_DECKS.find((d) => d.chars.some((c) => c.char === studioChar));
      if (foundDeck) setActiveDeckId(foundDeck.id);
    }
  }, [studioChar]);

  const charMeta = HANZI_STUDIO_DECKS.flatMap((d) => d.chars).find((c) => c.char === selectedChar);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.innerHTML = '';
    setLoadError(null);
    setQuizStatus({
      done: false,
      strokesDone: 0,
      mistakes: 0,
      message: mode === 'quiz' ? 'เริ่มลากเส้นที่ 1 บนตาราง米字格ได้เลย!' : 'พร้อมแสดงแอนิเมชันลำดับขีดจริง',
    });

    try {
      const writer = HanziWriter.create(el, selectedChar, {
        width: 260,
        height: 260,
        padding: 18,
        showOutline,
        showCharacter: mode === 'animate',
        strokeColor: '#2F3640',
        radicalColor: '#5F8D7B',
        outlineColor: '#D6CFC2',
        highlightColor: '#D9776C',
        drawingColor: '#5F8D7B',
        drawingWidth: 16,
        strokeAnimationSpeed: speed,
        delayBetweenStrokes: 260,
        showHintAfterMisses: 2,
        onLoadCharDataError: () => {
          setLoadError('ไม่สามารถโหลดข้อมูลลำดับขีดของอักษรนี้ได้ กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ตหรือลองเลือกตัวอักษรอื่น');
        },
      });
      writerRef.current = writer;

      if (mode === 'animate') {
        writer.animateCharacter();
      } else {
        writer.quiz({
          onCorrectStroke: (data) => {
            setQuizStatus((prev) => ({
              ...prev,
              strokesDone: data.strokeNum + 1,
              message: `เยี่ยม! ลากขีดที่ ${data.strokeNum + 1} ถูกต้อง (เหลืออีก ${data.strokesRemaining} ขีด)`,
            }));
          },
          onMistake: (data) => {
            setQuizStatus((prev) => ({
              ...prev,
              mistakes: data.totalMistakes,
              message: `ลองใหม่นะ! ขีดที่ ${data.strokeNum + 1} ลองดูเส้นไกด์สีแดงอ่อน`,
            }));
          },
          onComplete: (summary) => {
            setQuizStatus({
              done: true,
              strokesDone: charMeta?.strokes ?? 1,
              mistakes: summary.totalMistakes,
              message: `เขียน “${selectedChar}” สำเร็จครบทุกขีด! (ผิดพลาด ${summary.totalMistakes} ครั้ง)`,
            });
            speak(selectedChar);
            firePastelConfetti();
          },
        });
      }
    } catch {
      setLoadError('เกิดข้อผิดพลาดในการสร้างกระดานฝึกเขียน');
    }

    return () => {
      if (writerRef.current) {
        writerRef.current.cancelQuiz();
      }
    };
  }, [selectedChar, mode, showOutline, speed, quizKey]);

  const handleAnimate = () => {
    setMode('animate');
    setTimeout(() => writerRef.current?.animateCharacter(), 60);
  };

  const handleLoop = () => {
    setMode('animate');
    setTimeout(() => writerRef.current?.loopCharacterAnimation(), 60);
  };

  const handleQuizReset = () => {
    setMode('quiz');
    setQuizKey((k) => k + 1);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const match = customInput.match(/[\u4e00-\u9fff]/)?.[0];
    if (match) {
      setSelectedChar(match);
      openInStudio(match);
      setCustomInput('');
    }
  };

  const activeDeck = HANZI_STUDIO_DECKS.find((d) => d.id === activeDeckId) ?? HANZI_STUDIO_DECKS[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="neo-card lattice-frame rounded-3xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="font-cn text-sm font-semibold text-[#5F8D7B]">笔顺练习室 · สนามฝึกเขียนอักษรจีน (米字格)</span>
            <h1 className="text-2xl font-bold text-[#2F3640]">Hanzi Practice Studio</h1>
            <p className="text-xs text-[#636E72]">
              ดูแอนิเมชันลำดับขีดจริงด้วย hanzi-writer และทดลองลากเส้นเขียนด้วยเมาส์หรือนิ้วมือบนตาราง米字格ได้ทุกตัวอักษรในบทเรียน
            </p>
          </div>

          <form onSubmit={handleCustomSubmit} className="flex items-center gap-2">
            <input
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="พิมพ์อักษรจีน 1 ตัว เช่น 谢"
              maxLength={4}
              className="w-44 rounded-2xl border border-[#88B3A2]/40 bg-white px-3.5 py-2 text-xs text-[#2F3640] outline-none focus:border-[#88B3A2]"
            />
            <button
              type="submit"
              className="rounded-2xl bg-[#88B3A2] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#5F8D7B] cursor-pointer"
            >
              ฝึกตัวนี้
            </button>
          </form>
        </div>
      </section>

      {/* Main Practice Stage */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left: Interactive Mi-zi-ge Board */}
        <section className="neo-card flex flex-col items-center rounded-3xl p-6 lg:col-span-5">
          <div className="mb-3 flex w-full items-center justify-between">
            <div>
              <div className="flex items-baseline gap-2.5">
                <span className="font-cn text-4xl font-bold text-[#2F3640]">{selectedChar}</span>
                {charMeta && (
                  <span className="font-pinyin text-lg font-bold text-[#5F8D7B]">{charMeta.pinyin}</span>
                )}
              </div>
              <div className="text-xs text-[#636E72]">
                {charMeta ? `${charMeta.thai} · ทั้งหมด ${charMeta.strokes} ขีด` : 'ตัวอักษรกำหนดเอง'}
              </div>
            </div>
            <SpeakButton text={selectedChar} label="ฟังเสียง" size="md" />
          </div>

          {/* Mode Tabs */}
          <div className="mb-4 grid w-full grid-cols-2 gap-2 rounded-2xl bg-[#FAF6F0] p-1.5">
            <button
              type="button"
              onClick={() => setMode('animate')}
              className={`inline-flex items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-semibold transition cursor-pointer ${
                mode === 'animate' ? 'bg-[#88B3A2] text-white shadow-xs' : 'text-[#636E72] hover:text-[#2F3640]'
              }`}
            >
              <Play className="h-3.5 w-3.5" />
              ดูแอนิเมชันขีด
            </button>
            <button
              type="button"
              onClick={() => setMode('quiz')}
              className={`inline-flex items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-semibold transition cursor-pointer ${
                mode === 'quiz' ? 'bg-[#D9776C] text-white shadow-xs' : 'text-[#636E72] hover:text-[#2F3640]'
              }`}
            >
              <PenTool className="h-3.5 w-3.5" />
              ลองลากเส้นเขียนเอง
            </button>
          </div>

          {/* Mi-zi-ge Canvas */}
          <div className="mizige-grid relative flex h-[268px] w-[268px] touch-none items-center justify-center rounded-3xl border-2 border-[#D9776C]/45 shadow-inner">
            <div ref={containerRef} className="h-[260px] w-[260px]" />
            {loadError && (
              <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-white/90 p-5 text-center text-xs text-[#B8564C]">
                {loadError}
              </div>
            )}
          </div>

          {/* Status bar */}
          <div
            className={`mt-4 flex w-full items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-medium ${
              quizStatus.done ? 'bg-[#E5F0EB] text-[#2F5949]' : 'bg-[#FAF6F0] text-[#636E72]'
            }`}
          >
            {quizStatus.done ? (
              <CheckCircle2 className="h-4 w-4 shrink-0 text-[#5F8D7B]" />
            ) : (
              <Sparkles className="h-4 w-4 shrink-0 text-[#D9776C]" />
            )}
            <span>{quizStatus.message}</span>
          </div>

          {/* Board Controls */}
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {mode === 'animate' ? (
              <>
                <button
                  type="button"
                  onClick={handleAnimate}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#88B3A2] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#5F8D7B] cursor-pointer"
                >
                  <Play className="h-3.5 w-3.5" />
                  เล่นอีกครั้ง
                </button>
                <button
                  type="button"
                  onClick={handleLoop}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-[#88B3A2]/35 bg-white px-3.5 py-2 text-xs font-semibold text-[#2F3640] hover:bg-[#E5F0EB] cursor-pointer"
                >
                  <Repeat className="h-3.5 w-3.5 text-[#5F8D7B]" />
                  เล่นวนซ้ำ
                </button>
                <button
                  type="button"
                  onClick={() => setSpeed((s) => (s === 1.0 ? 0.55 : 1.0))}
                  className="rounded-xl border border-[#88B3A2]/35 bg-white px-3 py-2 text-xs font-semibold text-[#2F3640] hover:bg-[#E5F0EB] cursor-pointer"
                >
                  ความเร็ว: {speed === 1.0 ? 'ปกติ' : 'ช้า'}
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleQuizReset}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#D9776C] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#B8564C] cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  เขียนใหม่
                </button>
                <button
                  type="button"
                  onClick={() => setShowOutline((o) => !o)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-[#88B3A2]/35 bg-white px-3.5 py-2 text-xs font-semibold text-[#2F3640] hover:bg-[#E5F0EB] cursor-pointer"
                >
                  {showOutline ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  {showOutline ? 'ซ่อนเส้นเงา (ท้าทาย)' : 'แสดงเส้นเงา'}
                </button>
              </>
            )}
          </div>
        </section>

        {/* Right: Character Deck Picker */}
        <section className="neo-card rounded-3xl p-6 lg:col-span-7">
          <h2 className="text-base font-bold text-[#2F3640]">เลือกหมวดตัวอักษรจากบทเรียน (ครบทุกตัวในสไลด์ & หนังสือ)</h2>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {HANZI_STUDIO_DECKS.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setActiveDeckId(d.id)}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition cursor-pointer ${
                  activeDeckId === d.id
                    ? 'bg-[#88B3A2] text-white'
                    : 'bg-[#FAF6F0] text-[#636E72] hover:bg-[#E5F0EB]'
                }`}
              >
                {d.label} ({d.chars.length})
              </button>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2.5 sm:grid-cols-4 md:grid-cols-5">
            {activeDeck.chars.map((item) => {
              const active = selectedChar === item.char;
              return (
                <button
                  key={item.char}
                  type="button"
                  onClick={() => {
                    setSelectedChar(item.char);
                    speak(item.char);
                  }}
                  className={`rounded-2xl border-2 p-3 text-center transition cursor-pointer ${
                    active
                      ? 'border-[#5F8D7B] bg-[#E5F0EB]/75 shadow-xs'
                      : 'border-transparent bg-white/90 hover:border-[#88B3A2]/50'
                  }`}
                >
                  <div className="font-cn text-3xl font-bold text-[#2F3640]">{item.char}</div>
                  <div className="font-pinyin mt-0.5 text-xs font-semibold text-[#5F8D7B]">{item.pinyin}</div>
                  <div className="truncate text-[10px] text-[#636E72]">{item.thai}</div>
                  <div className="mt-0.5 text-[10px] text-[#D9776C]">{item.strokes} ขีด</div>
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};
