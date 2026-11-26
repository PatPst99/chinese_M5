import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PenTool, CheckCircle2, AlertTriangle, HelpCircle } from 'lucide-react';
import {
  STROKE_INTRO,
  BASIC_STROKES,
  MISSING_STROKE_EXERCISES,
  LOOK_ALIKE_TRIO,
  DERIVED_STROKES,
  CHARACTER_STRUCTURES,
  STRUCTURE_ODD_ONE_OUT,
  STROKE_ORDER_INTRO,
  STROKE_ORDER_RULES,
  PICTOGRAPHS,
} from '../../data/hanziData';
import { useStudy } from '../../context/StudyContext';
import { SpeakButton } from '../common/SpeakButton';
import { RevealText } from '../common/RevealText';
import { StructureSVG } from '../svg/StructureSVG';
import { PictographSVG } from '../svg/PictographSVG';

type HanziTab = 'strokes' | 'structures' | 'order' | 'pictographs';

export const HanziSection: React.FC = () => {
  const { openInStudio, speak } = useStudy();
  const [tab, setTab] = useState<HanziTab>('strokes');
  const [revealedMissing, setRevealedMissing] = useState<Record<string, boolean>>({});
  const [selectedOdd, setSelectedOdd] = useState<Record<number, string>>({});

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="neo-card lattice-frame rounded-3xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="font-cn text-sm font-semibold text-[#5F8D7B]">学汉字 · เรียนรู้อักษรจีน</span>
            <h1 className="text-2xl font-bold text-[#2F3640]">เส้นขีด โครงสร้าง ลำดับขีด & อักษรภาพ</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            {(
              [
                { id: 'strokes', label: '1. เส้นขีด 6 + 20' },
                { id: 'structures', label: '2. โครงสร้างอักษร' },
                { id: 'order', label: '3. กฎลำดับขีด 7 ข้อ' },
                { id: 'pictographs', label: '4. อักษรภาพ 10 ตัว' },
              ] as const
            ).map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`rounded-2xl px-3.5 py-2 text-xs font-semibold transition cursor-pointer ${
                  tab === t.id
                    ? 'bg-[#88B3A2] text-white shadow-sm'
                    : 'border border-[#88B3A2]/30 bg-white/80 text-[#2F3640] hover:bg-[#E5F0EB]'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* TAB 1: BASIC 6 + MISSING EXERCISE + LOOK-ALIKE TRIO + DERIVED 20 */}
      {tab === 'strokes' && (
        <div className="space-y-6">
          <section className="neo-card rounded-3xl p-6">
            <p className="font-cn text-base text-[#2F3640]">{STROKE_INTRO.cn}</p>
            <p className="mt-1.5 text-sm text-[#636E72]">{STROKE_INTRO.th}</p>

            <h2 className="mt-5 mb-3 text-base font-bold text-[#2F3640]">เส้นขีดพื้นฐาน 6 ชนิด (基本笔画 · foods_09)</h2>
            <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
              {BASIC_STROKES.map((st) => (
                <div key={st.id} className="rounded-2xl border border-[#88B3A2]/30 bg-white/95 p-4">
                  <div className="flex items-center gap-3.5">
                    <div className="mizige-grid flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-[#D9776C]/30">
                      <svg viewBox="0 0 100 100" className="h-16 w-16">
                        <motion.path
                          d={st.svgPath}
                          pathLength={1}
                          fill="none"
                          stroke="#2F3640"
                          strokeWidth="7"
                          strokeDasharray="1"
                          strokeLinecap="round"
                          initial={{ strokeDashoffset: 1 }}
                          animate={{ strokeDashoffset: 0 }}
                          transition={{ duration: 1.1, repeat: Infinity, repeatDelay: 1.2 }}
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2">
                        <span className="font-cn text-2xl font-bold text-[#2F3640]">{st.nameCN}</span>
                        <span className="font-pinyin text-xs font-semibold text-[#5F8D7B]">{st.pinyin}</span>
                      </div>
                      <div className="text-sm font-bold text-[#D9776C]">{st.nameTH}</div>
                      <p className="mt-1 text-[11px] leading-snug text-[#636E72]">{st.directionTH}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-[#88B3A2]/15 pt-2.5 text-xs">
                    <span className="text-[#636E72]">
                      ตัวอย่าง: <strong className="font-cn text-base text-[#2F3640]">{st.exampleChar}</strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => openInStudio(st.exampleChar)}
                      className="inline-flex items-center gap-1 rounded-full bg-[#E5F0EB] px-2.5 py-1 font-semibold text-[#3F6B5B] hover:bg-[#88B3A2] hover:text-white cursor-pointer"
                    >
                      <PenTool className="h-3 w-3" />
                      ฝึกเขียน
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Missing stroke exercise + 八 人 入 look-alike trio (foods_09) */}
          <div className="grid gap-6 lg:grid-cols-12">
            <section className="neo-card rounded-3xl p-6 lg:col-span-8">
              <div className="mb-3">
                <span className="font-cn text-xs font-semibold text-[#D9776C]">下面的汉字缺少哪一笔？请你补上。</span>
                <h3 className="text-base font-bold text-[#2F3640]">
                  แบบฝึกหัดเติมเส้นขีดที่หายไป (foods_09) — คลิกการ์ดเพื่อเฉลย
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {MISSING_STROKE_EXERCISES.map((ex) => {
                  const open = !!revealedMissing[ex.char];
                  return (
                    <div
                      key={ex.char}
                      onClick={() => setRevealedMissing((p) => ({ ...p, [ex.char]: !p[ex.char] }))}
                      className="cursor-pointer rounded-2xl border border-[#88B3A2]/30 bg-white/95 p-3.5 text-center transition hover:border-[#D9776C]"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-pinyin text-xs font-semibold text-[#5F8D7B]">{ex.pinyin}</span>
                        <SpeakButton text={ex.char} />
                      </div>
                      <div className="font-cn my-1 text-4xl font-bold text-[#2F3640]">{ex.char}</div>
                      <div className="text-xs font-medium text-[#636E72]">{ex.thai}</div>
                      {open ? (
                        <div className="mt-2 rounded-xl bg-[#E5F0EB]/80 p-2 text-[11px] text-[#2F3640]">
                          <strong className="block text-[#D9776C]">ขีดสำคัญ: {ex.missingStroke}</strong>
                          <span className="text-[#636E72]">{ex.tip}</span>
                        </div>
                      ) : (
                        <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#FAF6F0] px-2.5 py-1 text-[11px] text-[#636E72]">
                          <HelpCircle className="h-3 w-3" /> คลิกดูเฉลย
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Look-Alike Trio 八 人 入 */}
            <section className="neo-card rounded-3xl border-[#F2B8B5] bg-[#FDECEB]/45 p-6 lg:col-span-4">
              <div className="mb-3 flex items-center gap-2 text-[#B8564C]">
                <AlertTriangle className="h-5 w-5" />
                <h3 className="text-base font-bold">โน้ตระวังสับสน! (foods_09)</h3>
              </div>
              <div className="space-y-2.5">
                {LOOK_ALIKE_TRIO.map((item) => (
                  <div key={item.char} className="rounded-2xl bg-white/95 p-3.5 shadow-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-2.5">
                        <span className="font-cn text-3xl font-bold text-[#2F3640]">{item.char}</span>
                        <span className="font-pinyin text-sm font-bold text-[#5F8D7B]">{item.pinyin}</span>
                        <span className="text-sm font-bold text-[#D9776C]">{item.thai}</span>
                      </div>
                      <SpeakButton text={item.char} />
                    </div>
                    <p className="mt-1 text-xs text-[#636E72]">{item.diff}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* All 20 Derived / Compound Strokes (foods_10) */}
          <section className="neo-card rounded-3xl p-6">
            <h2 className="text-lg font-bold text-[#2F3640]">เส้นขีดผันแปรทั้ง 20 ชนิด (汉字的其他笔画 · หน้า foods_10)</h2>
            <p className="mt-1 mb-4 text-xs text-[#636E72]">
              เรียงครบทั้ง 20 รูปแบบตามตารางฝึกคัดในหนังสือ (คอลัมน์ซ้าย 10 ขีด + คอลัมน์ขวา 10 ขีด) พร้อมตัวอย่างอักษรที่กดฝึกเขียนได้ทันที
            </p>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
              {DERIVED_STROKES.map((st, idx) => (
                <div key={st.id} className="rounded-2xl border border-[#88B3A2]/25 bg-white/95 p-3.5">
                  <div className="mb-2 flex items-center justify-between text-[11px] text-[#636E72]">
                    <span className="rounded-md bg-[#FAF6F0] px-1.5 py-0.5 font-semibold">#{idx + 1}</span>
                    <span className="font-pinyin text-[#5F8D7B]">{st.pinyin}</span>
                  </div>
                  <div className="mizige-grid mx-auto flex h-16 w-16 items-center justify-center rounded-xl border border-[#D9776C]/25">
                    <svg viewBox="0 0 100 100" className="h-14 w-14">
                      <path d={st.svgPath} fill="none" stroke="#2F3640" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="mt-2 text-center">
                    <div className="font-cn text-sm font-bold text-[#2F3640]">{st.nameCN}</div>
                    <div className="text-[11px] text-[#636E72]">{st.nameTH}</div>
                  </div>
                  <div className="mt-2 flex flex-wrap justify-center gap-1">
                    {st.examples.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => openInStudio(c)}
                        className="font-cn rounded-lg bg-[#E5F0EB]/80 px-2 py-0.5 text-sm font-semibold text-[#2F3640] hover:bg-[#88B3A2] hover:text-white cursor-pointer"
                        title={`ฝึกเขียน ${c}`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* TAB 2: STRUCTURES (foods_11 & foods_12) */}
      {tab === 'structures' && (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Single-component */}
            <section className="neo-card rounded-3xl p-6">
              <div className="flex items-center gap-4">
                <StructureSVG type="single" />
                <div>
                  <span className="font-cn text-xl font-bold text-[#5F8D7B]">{CHARACTER_STRUCTURES.single.titleCN}</span>
                  <h2 className="text-lg font-bold text-[#2F3640]">{CHARACTER_STRUCTURES.single.titleTH}</h2>
                  <p className="text-xs text-[#636E72]">{CHARACTER_STRUCTURES.single.descTH}</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2.5">
                {CHARACTER_STRUCTURES.single.examples.map((ex) => (
                  <div key={ex.char} className="rounded-2xl bg-[#FAF6F0] p-3 text-center">
                    <div className="font-cn text-3xl font-bold text-[#2F3640]">{ex.char}</div>
                    <div className="font-pinyin text-xs font-semibold text-[#5F8D7B]">
                      <RevealText type="pinyin">{ex.pinyin}</RevealText>
                    </div>
                    <div className="text-xs text-[#636E72]">
                      <RevealText type="thai">{ex.thai}</RevealText>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Compound-component */}
            <section className="neo-card rounded-3xl p-6">
              <div className="flex items-center gap-4">
                <StructureSVG type="left-right" />
                <div>
                  <span className="font-cn text-xl font-bold text-[#D9776C]">{CHARACTER_STRUCTURES.compound.titleCN}</span>
                  <h2 className="text-lg font-bold text-[#2F3640]">{CHARACTER_STRUCTURES.compound.titleTH}</h2>
                  <p className="text-xs text-[#636E72]">{CHARACTER_STRUCTURES.compound.descTH}</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2.5">
                {CHARACTER_STRUCTURES.compound.examples.map((ex) => (
                  <div key={ex.char} className="rounded-2xl bg-[#FAF6F0] p-3 text-center">
                    <div className="font-cn text-3xl font-bold text-[#2F3640]">{ex.char}</div>
                    <div className="font-pinyin text-xs font-semibold text-[#5F8D7B]">
                      <RevealText type="pinyin">{ex.pinyin}</RevealText>
                    </div>
                    <div className="text-xs text-[#636E72]">
                      <RevealText type="thai">{ex.thai}</RevealText>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* 3 Compound Types: 上下 / 左右 / 包围 */}
          <section className="neo-card rounded-3xl p-6">
            <h3 className="mb-4 text-base font-bold text-[#2F3640]">3 รูปแบบของตัวอักษรประสม (不同的合体字 · foods_11)</h3>
            <div className="grid gap-4 md:grid-cols-3">
              {CHARACTER_STRUCTURES.compoundTypes.map((ct) => (
                <div key={ct.id} className="flex items-center gap-4 rounded-2xl border border-[#88B3A2]/25 bg-white/95 p-4">
                  <StructureSVG type={ct.id} />
                  <div className="flex-1">
                    <div className="text-sm font-bold text-[#2F3640]">{ct.titleTH}</div>
                    <div className="font-cn text-xs text-[#5F8D7B]">{ct.titleCN}</div>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="font-cn text-3xl font-bold text-[#D9776C]">{ct.example.char}</span>
                      <span className="font-pinyin text-xs font-semibold text-[#5F8D7B]">{ct.example.pinyin}</span>
                      <span className="text-xs text-[#636E72]">({ct.example.thai})</span>
                    </div>
                    <div className="text-[11px] text-[#636E72]">{ct.parts}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Interactive 4-Row Odd-One-Out Exercise (foods_11 & foods_12) */}
          <section className="neo-card rounded-3xl p-6">
            <div className="mb-4">
              <span className="font-cn text-xs font-semibold text-[#D9776C]">
                下面每行字中都有一个字与其他字结构不同，试着把它圈出来。
              </span>
              <h3 className="text-base font-bold text-[#2F3640]">
                แบบฝึกหัดวงกลมตัวอักษรที่มีโครงสร้างต่างจากพวก (ครบทั้ง 4 แถวจาก foods_11–12)
              </h3>
            </div>

            <div className="space-y-4">
              {STRUCTURE_ODD_ONE_OUT.map((row) => {
                const picked = selectedOdd[row.row];
                const isCorrect = picked === row.oddChar;
                return (
                  <div key={row.row} className="rounded-2xl border border-[#88B3A2]/25 bg-[#FAF6F0]/80 p-4">
                    <div className="mb-2.5 text-xs font-bold text-[#5F8D7B]">แถวที่ {row.row} — กดเลือกตัวที่โครงสร้างไม่เหมือนเพื่อน</div>
                    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                      {row.chars.map((item) => {
                        const isPicked = picked === item.char;
                        const isAnswer = item.char === row.oddChar;
                        return (
                          <button
                            key={item.char}
                            type="button"
                            onClick={() => {
                              setSelectedOdd((p) => ({ ...p, [row.row]: item.char }));
                              speak(item.char);
                            }}
                            className={`rounded-2xl border-2 p-3 text-center transition cursor-pointer ${
                              picked
                                ? isAnswer
                                  ? 'border-[#5F8D7B] bg-[#E5F0EB]'
                                  : isPicked
                                    ? 'border-[#D9776C] bg-[#FDECEB]'
                                    : 'border-transparent bg-white/75'
                                : 'border-transparent bg-white hover:border-[#88B3A2]'
                            }`}
                          >
                            <div className="font-cn text-3xl font-bold text-[#2F3640]">{item.char}</div>
                            <div className="font-pinyin text-xs font-semibold text-[#5F8D7B]">{item.pinyin}</div>
                            <div className="text-xs text-[#636E72]">{item.thai}</div>
                            {picked && <div className="mt-1 text-[10px] font-semibold text-[#58678A]">{item.structure}</div>}
                          </button>
                        );
                      })}
                    </div>
                    {picked && (
                      <div
                        className={`mt-3 flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-medium ${
                          isCorrect ? 'bg-[#E5F0EB] text-[#2F5949]' : 'bg-[#FDECEB] text-[#9E3D34]'
                        }`}
                      >
                        <CheckCircle2 className="h-4 w-4 shrink-0" />
                        <span>
                          {isCorrect ? 'ถูกต้อง! ' : `คำตอบคือ “${row.oddChar}” — `}
                          {row.reasonTH}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      )}

      {/* TAB 3: 7 GOLDEN STROKE ORDER RULES (foods_12) */}
      {tab === 'order' && (
        <section className="neo-card rounded-3xl p-6">
          <p className="font-cn text-base text-[#2F3640]">{STROKE_ORDER_INTRO.cn}</p>
          <p className="mt-1.5 mb-5 text-sm text-[#636E72]">{STROKE_ORDER_INTRO.th}</p>

          <div className="grid gap-3.5 sm:grid-cols-2">
            {STROKE_ORDER_RULES.map((rule) => (
              <div
                key={rule.id}
                className="flex items-center justify-between gap-4 rounded-2xl border border-[#88B3A2]/30 bg-white/95 p-4"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#88B3A2] text-sm font-bold text-white">
                    {rule.id}
                  </div>
                  <div>
                    <div className="font-cn text-lg font-bold text-[#2F3640]">{rule.ruleCN}</div>
                    <div className="text-sm font-semibold text-[#D9776C]">{rule.ruleTH}</div>
                    <div className="mt-1 font-cn text-xs text-[#636E72]">ลำดับ: {rule.stepText}</div>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <span className="font-cn text-4xl font-bold text-[#2F3640]">{rule.exampleChar}</span>
                  <span className="font-pinyin text-[11px] font-semibold text-[#5F8D7B]">
                    {rule.examplePinyin} ({rule.exampleThai})
                  </span>
                  <button
                    type="button"
                    onClick={() => openInStudio(rule.exampleChar)}
                    className="inline-flex items-center gap-1 rounded-full bg-[#E5F0EB] px-2.5 py-1 text-[11px] font-semibold text-[#3F6B5B] hover:bg-[#88B3A2] hover:text-white cursor-pointer"
                  >
                    <PenTool className="h-3 w-3" /> ดูแอนิเมชัน
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TAB 4: PICTOGRAPHS (Slide foods_25 + Book p.33) */}
      {tab === 'pictographs' && (
        <section className="neo-card rounded-3xl p-6">
          <h2 className="text-lg font-bold text-[#2F3640]">อักษรภาพ (图片汉字 · สไลด์ foods_25 & หนังสือ p.33)</h2>
          <p className="mt-1 mb-5 text-xs text-[#636E72]">
            อักษรจีนโบราณวิวัฒนาการมาจากการวาดภาพสิ่งต่างๆ ในธรรมชาติ กดปุ่มพู่กันเพื่อฝึกเขียนลำดับขีดได้เลย
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {PICTOGRAPHS.map((p) => (
              <div key={p.char} className="flex items-center gap-4 rounded-2xl border border-[#88B3A2]/25 bg-white/95 p-4">
                <PictographSVG char={p.char} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-baseline gap-2">
                      <span className="font-cn text-3xl font-bold text-[#2F3640]">{p.char}</span>
                      <span className="font-pinyin text-sm font-bold text-[#5F8D7B]">
                        <RevealText type="pinyin">{p.pinyin}</RevealText>
                      </span>
                    </div>
                    <div className="flex gap-1.5">
                      <SpeakButton text={p.char} />
                      <button
                        type="button"
                        onClick={() => openInStudio(p.char)}
                        className="rounded-full bg-[#FDECEB] p-1.5 text-[#B8564C] hover:bg-[#D9776C] hover:text-white cursor-pointer"
                        title="ฝึกเขียน"
                      >
                        <PenTool className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="text-sm font-bold text-[#D9776C]">
                    <RevealText type="thai">{p.thai}</RevealText>
                  </div>
                  <p className="mt-0.5 text-xs text-[#636E72]">{p.origin}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
