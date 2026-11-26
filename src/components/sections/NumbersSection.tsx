import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PenTool, Shuffle, CheckCircle2, XCircle } from 'lucide-react';
import { NUMBERS_1_TO_10, NUMBERS_ACTIVITY_PROMPT } from '../../data/numbersData';
import { useStudy } from '../../context/StudyContext';
import { SpeakButton } from '../common/SpeakButton';
import { RevealText } from '../common/RevealText';
import { HandGestureSVG } from '../svg/HandGestureSVG';

export const NumbersSection: React.FC = () => {
  const { speak, openInStudio } = useStudy();
  const [practiceNum, setPracticeNum] = useState<number>(6);
  const [guessResult, setGuessResult] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [pickedGuess, setPickedGuess] = useState<number | null>(null);

  const rollRandom = () => {
    const next = Math.floor(Math.random() * 10) + 1;
    setPracticeNum(next === practiceNum ? ((next % 10) + 1) : next);
    setGuessResult('idle');
    setPickedGuess(null);
  };

  const handleGuess = (n: number) => {
    setPickedGuess(n);
    const target = NUMBERS_1_TO_10.find((x) => x.num === practiceNum);
    if (n === practiceNum) {
      setGuessResult('correct');
      if (target) speak(target.hanzi);
    } else {
      setGuessResult('wrong');
    }
  };

  const practiceTarget = NUMBERS_1_TO_10.find((x) => x.num === practiceNum)!;

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="neo-card lattice-frame rounded-3xl p-6">
        <span className="font-cn text-sm font-semibold text-[#5F8D7B]">学数字 · หนังสือหน้า 26 & โน้ตสรุป u16_01</span>
        <h1 className="text-2xl font-bold text-[#2F3640]">ตัวเลข ๑–๑๐ และภาษามือจีน (手势)</h1>
        <p className="mt-1 text-xs text-[#636E72]">
          คนจีนสามารถแสดงตัวเลข 1 ถึง 10 ได้ด้วยมือเพียงข้างเดียว! โดยเฉพาะเลข 6–10 ที่มีเอกลักษณ์เฉพาะตัว
        </p>
      </section>

      {/* 1-10 Grid with Custom Hand Gesture SVGs */}
      <section className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {NUMBERS_1_TO_10.map((item, idx) => (
          <motion.div
            key={item.num}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.03 }}
            className="neo-card flex flex-col items-center rounded-3xl p-4 text-center transition hover:-translate-y-1 hover:border-[#88B3A2]"
          >
            <div className="flex w-full items-center justify-between">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#E5F0EB] text-xs font-bold text-[#3F6B5B]">
                {item.num}
              </span>
              <div className="flex gap-1">
                <SpeakButton text={item.hanzi} />
                <button
                  type="button"
                  onClick={() => openInStudio(item.hanzi)}
                  title={`ฝึกเขียน ${item.hanzi}`}
                  className="rounded-full bg-[#FDECEB] p-1.5 text-[#B8564C] hover:bg-[#D9776C] hover:text-white cursor-pointer"
                >
                  <PenTool className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <div className="my-2 cursor-pointer" onClick={() => speak(item.hanzi)}>
              <HandGestureSVG num={item.num} className="h-24 w-24" />
            </div>

            <div className="font-cn text-4xl font-bold text-[#2F3640]">{item.hanzi}</div>
            <div className="font-pinyin mt-0.5 text-base font-bold text-[#5F8D7B]">
              <RevealText type="pinyin">{item.pinyin}</RevealText>
            </div>
            <div className="text-sm font-semibold text-[#D9776C]">
              <RevealText type="thai">{item.thai}</RevealText>
            </div>
            <p className="mt-2 rounded-xl bg-[#FAF6F0] px-2.5 py-1.5 text-[11px] leading-snug text-[#636E72]">
              <strong className="block text-[#2F3640]">{item.gestureTitle}</strong>
              {item.gestureDesc}
            </p>
          </motion.div>
        ))}
      </section>

      {/* Interactive Gesture Guessing Activity (p.26 两人一组) */}
      <section className="neo-card rounded-3xl bg-gradient-to-br from-[#EBEEF6]/70 to-[#FFFDF9] p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="font-cn text-sm font-bold text-[#58678A]">{NUMBERS_ACTIVITY_PROMPT.cn}</div>
            <h2 className="text-base font-bold text-[#2F3640]">มินิเกมทายตัวเลขจากภาษามือจีน</h2>
            <p className="text-xs text-[#636E72]">{NUMBERS_ACTIVITY_PROMPT.th}</p>
          </div>
          <button
            type="button"
            onClick={rollRandom}
            className="inline-flex items-center gap-2 rounded-2xl bg-[#9BA8C7] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#7A8AB0] cursor-pointer"
          >
            <Shuffle className="h-4 w-4" />
            สุ่มท่ามือใหม่
          </button>
        </div>

        <div className="mt-5 grid items-center gap-6 md:grid-cols-12">
          <div className="flex flex-col items-center rounded-3xl bg-white/90 p-6 shadow-xs md:col-span-4">
            <HandGestureSVG num={practiceNum} className="h-36 w-36" />
            <p className="mt-2 text-xs font-medium text-[#636E72]">ภาษามือนี้คือเลขใด?</p>
          </div>

          <div className="space-y-3 md:col-span-8">
            <div className="grid grid-cols-5 gap-2">
              {NUMBERS_1_TO_10.map((n) => (
                <button
                  key={n.num}
                  type="button"
                  onClick={() => handleGuess(n.num)}
                  className={`rounded-2xl border-2 py-2.5 text-center transition cursor-pointer ${
                    pickedGuess === n.num
                      ? n.num === practiceNum
                        ? 'border-[#5F8D7B] bg-[#E5F0EB]'
                        : 'border-[#D9776C] bg-[#FDECEB]'
                      : 'border-transparent bg-white hover:border-[#88B3A2]'
                  }`}
                >
                  <div className="font-cn text-2xl font-bold text-[#2F3640]">{n.hanzi}</div>
                  <div className="font-pinyin text-xs font-semibold text-[#5F8D7B]">{n.pinyin}</div>
                </button>
              ))}
            </div>

            {guessResult !== 'idle' && (
              <div
                className={`flex items-center justify-between gap-3 rounded-2xl px-4 py-3 text-sm font-medium ${
                  guessResult === 'correct' ? 'bg-[#E5F0EB] text-[#2F5949]' : 'bg-[#FDECEB] text-[#9E3D34]'
                }`}
              >
                <span className="flex items-center gap-2">
                  {guessResult === 'correct' ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                  {guessResult === 'correct'
                    ? `เก่งมาก! คือ ${practiceTarget.hanzi} (${practiceTarget.pinyin} · ${practiceTarget.thai}) — ${practiceTarget.gestureTitle}`
                    : 'ยังไม่ใช่นะ ลองสังเกตนิ้วมือแล้วทายอีกครั้ง!'}
                </span>
                {guessResult === 'correct' && (
                  <button
                    type="button"
                    onClick={rollRandom}
                    className="rounded-xl bg-[#5F8D7B] px-3 py-1 text-xs font-semibold text-white cursor-pointer"
                  >
                    ข้อถัดไป
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
