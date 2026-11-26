import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Volume2, CheckCircle2, XCircle, RotateCcw, ArrowRight, Sparkles } from 'lucide-react';
import { QUIZ_MODES, QUIZ_QUESTIONS } from '../../data/quizData';
import type { QuizQuestion } from '../../types';
import { useStudy } from '../../context/StudyContext';
import { firePastelConfetti } from '../../utils/confetti';
import { HandGestureSVG } from '../svg/HandGestureSVG';

type QuizModeId = QuizQuestion['mode'] | 'all';

export const QuizArenaSection: React.FC = () => {
  const { speak } = useStudy();
  const [selectedMode, setSelectedMode] = useState<QuizModeId | null>(null);
  const [qIndex, setQIndex] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [history, setHistory] = useState<{ q: QuizQuestion; picked: string; correct: boolean }[]>([]);

  const questions = useMemo(() => {
    if (!selectedMode) return [];
    if (selectedMode === 'all') return QUIZ_QUESTIONS;
    return QUIZ_QUESTIONS.filter((q) => q.mode === selectedMode);
  }, [selectedMode]);

  const startMode = (mode: QuizModeId) => {
    setSelectedMode(mode);
    setQIndex(0);
    setSelectedOpt(null);
    setScore(0);
    setFinished(false);
    setHistory([]);
  };

  const currentQ = questions[qIndex];

  const handleAnswer = (val: string) => {
    if (!currentQ || selectedOpt !== null) return;
    setSelectedOpt(val);
    const isCorrect = val === currentQ.correctValue;
    if (isCorrect) setScore((s) => s + 1);
    setHistory((h) => [...h, { q: currentQ, picked: val, correct: isCorrect }]);
  };

  const handleNext = () => {
    if (qIndex + 1 >= questions.length) {
      setFinished(true);
      const pct = Math.round((score / questions.length) * 100);
      if (pct >= 70) {
        firePastelConfetti();
      }
    } else {
      setQIndex((i) => i + 1);
      setSelectedOpt(null);
    }
  };

  // Mode Selection Lobby
  if (!selectedMode) {
    return (
      <div className="space-y-6">
        <section className="neo-card lattice-frame rounded-3xl p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="font-cn text-sm font-semibold text-[#D9776C]">测验竞技场 · คลังแบบฝึกหัดและมินิเกม</span>
              <h1 className="text-2xl font-bold text-[#2F3640]">Quiz Arena ({QUIZ_QUESTIONS.length} ข้อจากไฟล์จริง 100%)</h1>
              <p className="mt-1 text-xs text-[#636E72]">
                รวมแบบฝึกหัดฟัง พูด จับคู่ เติมคำในบทสนทนา กฎเปลี่ยนเสียง โครงสร้างอักษร และภาษามือตัวเลข — สอบผ่าน ≥ 70% รับพลุพาสเทลฉลอง!
              </p>
            </div>
            <button
              type="button"
              onClick={() => startMode('all')}
              className="inline-flex items-center gap-2 rounded-2xl bg-[#D9776C] px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#B8564C] cursor-pointer"
            >
              <Trophy className="h-4 w-4" />
              ทดสอบรวมทุกโหมด ({QUIZ_QUESTIONS.length} ข้อ)
            </button>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {QUIZ_MODES.map((m, idx) => (
            <motion.button
              key={m.id}
              whileHover={{ y: -3 }}
              type="button"
              onClick={() => startMode(m.id)}
              className="neo-card group flex flex-col justify-between rounded-3xl p-5 text-left transition hover:border-[#88B3A2] cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-[#E5F0EB] px-3 py-1 text-xs font-bold text-[#3F6B5B]">
                    โหมดที่ {idx + 1}
                  </span>
                  <span className="text-xs font-bold text-[#D9776C]">{m.count} ข้อ</span>
                </div>
                <h3 className="mt-3 text-base font-bold text-[#2F3640] group-hover:text-[#5F8D7B]">{m.title}</h3>
                <p className="mt-1 text-xs text-[#636E72]">{m.subtitle}</p>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-[#5F8D7B]">
                <span>เริ่มทำแบบทดสอบ</span>
                <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
              </div>
            </motion.button>
          ))}
        </section>
      </div>
    );
  }

  // Finished Summary Screen
  if (finished) {
    const pct = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;
    const passed = pct >= 70;
    return (
      <div className="mx-auto max-w-2xl space-y-5">
        <motion.section
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="neo-card lattice-frame rounded-3xl p-8 text-center"
        >
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#88B3A2] to-[#F4D58D] text-white shadow-md">
            <Trophy className="h-10 w-10" />
          </div>
          <div className="font-cn mt-3 text-3xl font-bold text-[#5F8D7B]">{passed ? '太棒了！สอบผ่านฉลุย' : '加油！สู้ต่อไปนะ'}</div>
          <p className="mt-1 text-lg font-bold text-[#2F3640]">
            ได้คะแนน {score} / {questions.length} ({pct}%)
          </p>
          <p className="mt-1 text-xs text-[#636E72]">
            {passed ? 'ยอดเยี่ยมมาก! คุณแม่นเนื้อหาหมวดนี้แล้ว' : 'ลองดูเฉลยด้านล่างแล้วทบทวนอีกครั้งนะ'}
          </p>

          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => startMode(selectedMode)}
              className="inline-flex items-center gap-2 rounded-2xl bg-[#88B3A2] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#5F8D7B] cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" />
              ทำโหมดนี้อีกครั้ง
            </button>
            <button
              type="button"
              onClick={() => setSelectedMode(null)}
              className="rounded-2xl border border-[#88B3A2]/40 bg-white px-5 py-2.5 text-sm font-semibold text-[#2F3640] hover:bg-[#E5F0EB] cursor-pointer"
            >
              กลับไปเลือกโหมดอื่น
            </button>
          </div>
        </motion.section>

        {/* Detailed Answer Review */}
        <section className="neo-card rounded-3xl p-6">
          <h3 className="mb-3 text-base font-bold text-[#2F3640]">สรุปเฉลยละเอียดทุกข้อ</h3>
          <div className="space-y-3">
            {history.map((item, idx) => (
              <div
                key={item.q.id}
                className={`rounded-2xl border p-4 text-xs ${
                  item.correct ? 'border-[#88B3A2]/40 bg-[#E5F0EB]/45' : 'border-[#F2B8B5] bg-[#FDECEB]/60'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <strong className="text-[#2F3640]">
                    ข้อ {idx + 1}. {item.q.promptTH}
                  </strong>
                  {item.correct ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#5F8D7B]" />
                  ) : (
                    <XCircle className="h-4 w-4 shrink-0 text-[#D9776C]" />
                  )}
                </div>
                <div className="mt-1.5 text-[#636E72]">
                  คำตอบที่เลือก: <strong className="text-[#2F3640]">{item.picked}</strong> · เฉลย:{' '}
                  <strong className="text-[#5F8D7B]">{item.q.correctValue}</strong>
                </div>
                <p className="mt-1 text-[#2F3640]">{item.q.explanationTH}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  // Active Question Screen
  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <div className="flex items-center justify-between text-xs font-semibold text-[#636E72]">
        <button
          type="button"
          onClick={() => setSelectedMode(null)}
          className="rounded-xl border border-[#88B3A2]/30 bg-white px-3 py-1.5 text-[#2F3640] hover:bg-[#E5F0EB] cursor-pointer"
        >
          ← เปลี่ยนโหมด
        </button>
        <span>
          ข้อ {qIndex + 1} / {questions.length} · คะแนน {score}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/80">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#88B3A2] to-[#D9776C] transition-all duration-300"
          style={{ width: `${((qIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {currentQ && (
        <motion.section
          key={currentQ.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="neo-card lattice-frame rounded-3xl p-6"
        >
          <span className="inline-block rounded-full bg-[#FDF6E2] px-3 py-1 text-[11px] font-bold text-[#9C7220]">
            {currentQ.sourceTag}
          </span>

          <h2 className="mt-3 whitespace-pre-line text-lg font-bold text-[#2F3640]">{currentQ.promptTH}</h2>

          {/* Visual / Audio Stimulus */}
          <div className="my-5 flex flex-col items-center justify-center gap-3 rounded-2xl bg-[#FAF6F0] p-5">
            {currentQ.gestureNum && <HandGestureSVG num={currentQ.gestureNum} className="h-32 w-32" />}
            {currentQ.promptCN && <div className="font-cn text-4xl font-bold text-[#2F3640]">{currentQ.promptCN}</div>}
            {currentQ.speakText && (
              <button
                type="button"
                onClick={() => speak(currentQ.speakText!)}
                className="inline-flex items-center gap-2 rounded-2xl bg-[#88B3A2] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#5F8D7B] cursor-pointer"
              >
                <Volume2 className="h-4 w-4" />
                <span>กดฟังเสียงโจทย์ภาษาจีน</span>
              </button>
            )}
          </div>

          {/* Options */}
          <div className="grid gap-3 sm:grid-cols-2">
            {currentQ.options.map((opt) => {
              const isPicked = selectedOpt === opt.value;
              const isCorrect = opt.value === currentQ.correctValue;
              let btnStyle = 'border-[#88B3A2]/30 bg-white/95 hover:border-[#88B3A2] hover:bg-[#E5F0EB]/40';
              if (selectedOpt !== null) {
                if (isCorrect) btnStyle = 'border-[#5F8D7B] bg-[#E5F0EB] ring-2 ring-[#88B3A2]/40';
                else if (isPicked) btnStyle = 'border-[#D9776C] bg-[#FDECEB]';
                else btnStyle = 'border-transparent bg-white/60 opacity-65';
              }

              return (
                <button
                  key={opt.value}
                  type="button"
                  disabled={selectedOpt !== null}
                  onClick={() => handleAnswer(opt.value)}
                  className={`rounded-2xl border-2 p-4 text-left transition cursor-pointer disabled:cursor-default ${btnStyle}`}
                >
                  <div className="font-cn text-lg font-bold text-[#2F3640]">{opt.label}</div>
                  {opt.sub && <div className="font-pinyin mt-0.5 text-xs text-[#5F8D7B]">{opt.sub}</div>}
                </button>
              );
            })}
          </div>

          {/* Immediate Explanation */}
          {selectedOpt !== null && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-5 rounded-2xl p-4 ${
                selectedOpt === currentQ.correctValue
                  ? 'bg-[#E5F0EB] text-[#2F5949]'
                  : 'bg-[#FDECEB] text-[#9E3D34]'
              }`}
            >
              <div className="flex items-start gap-2 text-sm font-bold">
                {selectedOpt === currentQ.correctValue ? (
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0" />
                ) : (
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0" />
                )}
                <span>{selectedOpt === currentQ.correctValue ? 'ถูกต้อง! เก่งมาก' : `ยังไม่ถูก เฉลยคือ “${currentQ.correctValue}”`}</span>
              </div>
              <p className="mt-1 text-xs leading-relaxed">{currentQ.explanationTH}</p>

              <div className="mt-3 flex justify-end">
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#2F3640] px-4 py-2 text-xs font-semibold text-white hover:bg-[#5F8D7B] cursor-pointer"
                >
                  <span>{qIndex + 1 >= questions.length ? 'ดูสรุปคะแนน' : 'ข้อถัดไป'}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          )}
        </motion.section>
      )}
    </div>
  );
};
