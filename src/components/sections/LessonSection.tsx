import React, { useState } from 'react';
import { Play, Square, AlertCircle, Sparkles, ArrowRight, Eye } from 'lucide-react';
import {
  LESSON1_META,
  LESSON1_DIALOGUES,
  SLIDE_GRAMMAR_TIPS,
  PRONOUN_PAIRS,
  SENTENCE_BUILDER_PATTERNS,
  BLINDFOLD_GAME,
} from '../../data/lessonData';
import { useStudy } from '../../context/StudyContext';
import { speakChinese, stopSpeaking } from '../../utils/speech';
import { SpeakButton } from '../common/SpeakButton';
import { RevealText } from '../common/RevealText';

export const LessonSection: React.FC = () => {
  const { speechRate, speak } = useStudy();
  const [playingSceneId, setPlayingSceneId] = useState<string | null>(null);
  const [activeLineIdx, setActiveLineIdx] = useState<number | null>(null);

  // Sentence Builder state
  const [patternId, setPatternId] = useState<string>(SENTENCE_BUILDER_PATTERNS[0].id);
  const activePattern = SENTENCE_BUILDER_PATTERNS.find((p) => p.id === patternId) ?? SENTENCE_BUILDER_PATTERNS[0];
  const [selectedIndices, setSelectedIndices] = useState<number[]>([0, 0, 0]);

  const handlePatternChange = (id: string) => {
    setPatternId(id);
    setSelectedIndices([0, 0, 0]);
  };

  const assembledTokens = activePattern.slots.map((slot, sIdx) => {
    const idx = selectedIndices[sIdx] ?? 0;
    return slot.options[idx] ?? slot.options[0];
  });

  const assembledHanzi = assembledTokens.map((t) => t.hanzi).join('');
  const assembledPinyin = assembledTokens.map((t) => t.pinyin).join(' ');
  const assembledThai = assembledTokens.map((t) => t.thai).join(' ');

  const playFullScene = (sceneId: string, lines: { hanzi: string }[]) => {
    if (playingSceneId === sceneId) {
      stopSpeaking();
      setPlayingSceneId(null);
      setActiveLineIdx(null);
      return;
    }
    stopSpeaking();
    setPlayingSceneId(sceneId);

    const run = (idx: number) => {
      if (idx >= lines.length) {
        setPlayingSceneId(null);
        setActiveLineIdx(null);
        return;
      }
      setActiveLineIdx(idx);
      const speakable = lines[idx].hanzi.replace(/fèifei/gi, '狒狒');
      speakChinese(speakable, speechRate, () => {
        setTimeout(() => run(idx + 1), 350);
      });
    };
    run(0);
  };

  return (
    <div className="space-y-6">
      {/* Lesson 1 Banner & Objectives (p.27) */}
      <section className="neo-card lattice-frame rounded-3xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="font-cn text-base font-bold text-[#5F8D7B]">{LESSON1_META.lessonCN}</span>
            <h1 className="text-2xl font-bold text-[#2F3640]">{LESSON1_META.lessonTH} — บทสนทนาและรูปประโยค</h1>
          </div>
          <SpeakButton text="第一课，你好！" label="ฟังชื่อบทเรียน" size="md" />
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl border border-[#88B3A2]/25 bg-[#E5F0EB]/55 p-4">
            <h3 className="text-xs font-bold text-[#3F6B5B]">学习目标 · จุดประสงค์การเรียนรู้ (p.27)</h3>
            <ul className="mt-2 space-y-1.5 text-sm">
              {LESSON1_META.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#5F8D7B]" />
                  <div>
                    <span className="font-cn font-semibold text-[#2F3640]">{obj.cn}</span>
                    <span className="block text-xs text-[#636E72]">{obj.th}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-[#F4D58D]/50 bg-[#FDF6E2]/55 p-4">
            <h3 className="text-xs font-bold text-[#9C7220]">热身 · กิจกรรมอุ่นเครื่อง (p.27)</h3>
            <ul className="mt-2 space-y-1.5 text-xs text-[#636E72]">
              {LESSON1_META.warmup.map((w) => (
                <li key={w.num}>
                  <strong className="font-cn text-[#2F3640]">
                    {w.num}. {w.cn}
                  </strong>
                  <p className="mt-0.5">{w.th}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Interactive Chat Bubble Dialogues (p.28 & p.29) */}
      <div className="space-y-5">
        {LESSON1_DIALOGUES.map((scene) => {
          const isPlaying = playingSceneId === scene.id;
          return (
            <section key={scene.id} className="neo-card rounded-3xl p-6">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-bold text-[#2F3640]">{scene.title}</h2>
                    {scene.badge && (
                      <span className="rounded-full bg-[#FDECEB] px-2.5 py-0.5 text-[11px] font-bold text-[#B8564C]">
                        {scene.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#636E72]">{scene.subtitle}</p>
                </div>

                <button
                  type="button"
                  onClick={() => playFullScene(scene.id, scene.lines)}
                  className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-xs font-semibold text-white transition cursor-pointer ${
                    isPlaying ? 'bg-[#D9776C]' : 'bg-[#88B3A2] hover:bg-[#5F8D7B]'
                  }`}
                >
                  {isPlaying ? <Square className="h-3.5 w-3.5 fill-current" /> : <Play className="h-3.5 w-3.5 fill-current" />}
                  <span>{isPlaying ? 'หยุดเล่นบทสนทนา' : 'เล่นเสียงทั้งบทสนทนา'}</span>
                </button>
              </div>

              {/* Chat Bubbles */}
              <div className="space-y-3">
                {scene.lines.map((line, idx) => {
                  const isLeft = line.side === 'left';
                  const isHighlighted = isPlaying && activeLineIdx === idx;
                  const speakable = line.hanzi.replace(/fèifei/gi, '狒狒');

                  return (
                    <div key={idx} className={`flex ${isLeft ? 'justify-start' : 'justify-end'}`}>
                      <div
                        className={`max-w-[92%] rounded-3xl border px-4 py-3.5 transition sm:max-w-[78%] ${
                          isHighlighted
                            ? 'border-[#D9776C] bg-[#FDF6E2] shadow-md ring-2 ring-[#F4D58D]'
                            : isLeft
                              ? 'rounded-tl-md border-[#88B3A2]/35 bg-[#E5F0EB]/65'
                              : 'rounded-tr-md border-[#F2B8B5]/50 bg-white/95'
                        }`}
                      >
                        <div className="mb-1 flex items-center justify-between gap-3">
                          <span className="text-xs font-bold text-[#5F8D7B]">
                            {line.speaker}{' '}
                            {line.speakerPinyin && <span className="font-pinyin font-normal text-[#636E72]">({line.speakerPinyin})</span>}
                          </span>
                          <SpeakButton text={speakable} />
                        </div>

                        <div className="font-cn text-xl font-bold text-[#2F3640]">{line.hanzi}</div>
                        <div className="font-pinyin mt-1 text-sm font-semibold text-[#5F8D7B]">
                          <RevealText type="pinyin">{line.pinyin}</RevealText>
                        </div>
                        <div className="mt-0.5 text-xs text-[#636E72]">
                          <RevealText type="thai">{line.thai}</RevealText>
                        </div>

                        {line.alertNote && (
                          <div className="mt-2 flex items-start gap-1.5 rounded-xl bg-[#FDECEB] px-2.5 py-1.5 text-[11px] font-medium text-[#B8564C]">
                            <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                            <span>{line.alertNote}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      {/* Interactive Sentence Builder (p.29 รูปประโยค 句型 + slides) */}
      <section className="neo-card rounded-3xl bg-gradient-to-br from-[#FFFDF9] to-[#E5F0EB]/55 p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#D9776C] text-white">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#2F3640]">ตัวช่วยประกอบประโยค (Sentence Builder · รูปประโยค p.29)</h2>
              <p className="text-xs text-[#636E72]">คลิกสลับคำในแต่ละช่องเพื่อสร้างประโยคใหม่ แล้วฟังเสียงภาษาจีนได้ทันที!</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {SENTENCE_BUILDER_PATTERNS.map((pat) => (
              <button
                key={pat.id}
                type="button"
                onClick={() => handlePatternChange(pat.id)}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition cursor-pointer ${
                  patternId === pat.id
                    ? 'bg-[#D9776C] text-white shadow-xs'
                    : 'border border-[#88B3A2]/30 bg-white text-[#2F3640] hover:bg-[#FDECEB]'
                }`}
              >
                {pat.labelTH}
              </button>
            ))}
          </div>
        </div>

        {/* Result Preview Box */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4 rounded-3xl border-2 border-[#88B3A2]/50 bg-white p-5 shadow-xs">
          <div>
            <span className="rounded-full bg-[#E5F0EB] px-2.5 py-0.5 text-[11px] font-semibold text-[#3F6B5B]">
              โครงสร้าง: {activePattern.formula}
            </span>
            <div className="font-cn mt-2 text-3xl font-bold text-[#2F3640] md:text-4xl">{assembledHanzi}</div>
            <div className="font-pinyin mt-1 text-base font-bold text-[#5F8D7B]">{assembledPinyin}</div>
            <div className="text-sm text-[#636E72]">ความหมาย: {assembledThai}</div>
          </div>
          <SpeakButton text={assembledHanzi} label="ฟังประโยคที่สร้าง" size="lg" />
        </div>

        {/* Token Slots */}
        <div className="grid gap-4 md:grid-cols-3">
          {activePattern.slots.map((slot, sIdx) => (
            <div key={sIdx} className="rounded-2xl border border-[#88B3A2]/25 bg-white/85 p-3.5">
              <div className="mb-2 text-xs font-bold text-[#5F8D7B]">
                ช่องที่ {sIdx + 1}: {slot.slotLabel}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {slot.options.map((opt, oIdx) => {
                  const isSelected = (selectedIndices[sIdx] ?? 0) === oIdx;
                  return (
                    <button
                      key={opt.hanzi}
                      type="button"
                      onClick={() => {
                        const next = [...selectedIndices];
                        next[sIdx] = oIdx;
                        setSelectedIndices(next);
                        speak(opt.hanzi);
                      }}
                      className={`rounded-xl border px-3 py-1.5 text-left transition cursor-pointer ${
                        isSelected
                          ? 'border-[#5F8D7B] bg-[#88B3A2] text-white'
                          : 'border-[#88B3A2]/25 bg-[#FAF6F0] text-[#2F3640] hover:border-[#88B3A2]'
                      }`}
                    >
                      <span className="font-cn block text-base font-bold">{opt.hanzi}</span>
                      <span className={`block text-[10px] ${isSelected ? 'text-white/90' : 'text-[#636E72]'}`}>
                        {opt.pinyin} · {opt.thai}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Slide Grammar Tips & Pronoun Singular -> Plural (foods_45, 46, 47, 49) */}
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-7">
          {SLIDE_GRAMMAR_TIPS.map((tip, i) => (
            <section key={i} className="neo-card rounded-3xl p-5">
              <h3 className="text-base font-bold text-[#2F3640]">{tip.title}</h3>
              <p className="mt-1 text-xs text-[#636E72]">{tip.note}</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {tip.items.map((it) => (
                  <div
                    key={it.hanzi}
                    onClick={() => speak(it.hanzi)}
                    className="flex cursor-pointer items-center justify-between rounded-2xl bg-[#FAF6F0] px-3.5 py-2.5 transition hover:bg-[#E5F0EB]/70"
                  >
                    <div>
                      <div className="font-cn text-lg font-bold text-[#2F3640]">{it.hanzi}</div>
                      <div className="font-pinyin text-xs font-semibold text-[#5F8D7B]">
                        <RevealText type="pinyin">{it.pinyin}</RevealText>
                      </div>
                      <div className="text-xs text-[#636E72]">
                        <RevealText type="thai">{it.thai}</RevealText>
                      </div>
                    </div>
                    <SpeakButton text={it.hanzi} />
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Pronouns Singular -> Plural Table (Slide foods_46) */}
        <section className="neo-card rounded-3xl p-5 lg:col-span-5">
          <h3 className="text-base font-bold text-[#2F3640]">คำสรรพนาม เอกพจน์ → พหูพจน์ (สไลด์ foods_46)</h3>
          <p className="mt-1 mb-3 text-xs text-[#636E72]">เติม 们 (men · เสียงเบา) ต่อท้ายคำสรรพนามเอกพจน์เพื่อทำเป็นพหูพจน์ (“พวก...”)</p>
          <div className="space-y-2">
            {PRONOUN_PAIRS.map((pair) => (
              <div key={pair.singular.hanzi} className="flex items-center justify-between gap-2 rounded-2xl bg-[#FAF6F0] p-2.5">
                <button
                  type="button"
                  onClick={() => speak(pair.singular.hanzi)}
                  className="flex-1 rounded-xl bg-white px-3 py-2 text-left transition hover:bg-[#E5F0EB]/60 cursor-pointer"
                >
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-cn text-2xl font-bold text-[#2F3640]">{pair.singular.hanzi}</span>
                    <span className="font-pinyin text-xs font-bold text-[#5F8D7B]">{pair.singular.pinyin}</span>
                  </div>
                  <div className="text-[11px] text-[#636E72]">{pair.singular.thai}</div>
                </button>
                <ArrowRight className="h-4 w-4 shrink-0 text-[#D9776C]" />
                <button
                  type="button"
                  onClick={() => speak(pair.plural.hanzi)}
                  className="flex-1 rounded-xl bg-white px-3 py-2 text-left transition hover:bg-[#FDECEB]/60 cursor-pointer"
                >
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-cn text-2xl font-bold text-[#D9776C]">{pair.plural.hanzi}</span>
                    <span className="font-pinyin text-xs font-bold text-[#5F8D7B]">{pair.plural.pinyin}</span>
                  </div>
                  <div className="text-[11px] text-[#636E72]">{pair.plural.thai}</div>
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Blindfold Guessing Activity Reference (Book p.31) */}
      <section className="neo-card rounded-3xl p-6">
        <div className="flex items-center gap-2.5">
          <Eye className="h-5 w-5 text-[#9BA8C7]" />
          <div>
            <div className="font-cn text-sm font-bold text-[#58678A]">{BLINDFOLD_GAME.titleCN}</div>
            <h3 className="text-base font-bold text-[#2F3640]">{BLINDFOLD_GAME.titleTH}</h3>
          </div>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {BLINDFOLD_GAME.characters.map((ch) => (
            <div key={ch.name} className="rounded-2xl border border-[#9BA8C7]/30 bg-[#EBEEF6]/45 p-3.5">
              <div className="flex items-center justify-between">
                <span className="font-pinyin text-sm font-bold text-[#465678]">{ch.name}</span>
                <SpeakButton text={ch.lineCN} />
              </div>
              <div className="font-cn mt-1 text-base font-bold text-[#2F3640]">{ch.lineCN}</div>
              <div className="font-cn text-xs text-[#5F8D7B]">ทายกลับ: {ch.guessCN}</div>
              <div className="mt-1 text-[11px] text-[#636E72]">{ch.thai}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
