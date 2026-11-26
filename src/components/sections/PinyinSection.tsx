import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Music, Volume2, Sparkles, Star } from 'lucide-react';
import {
  PINYIN_OVERVIEW,
  TONE_INTRO,
  TONES,
  TONE_ACTIVITIES,
  SIMPLE_VOWELS,
  VOWEL_SONG,
  COMPOUND_VOWELS,
  TONE_PLACEMENT_WORKSHEET,
  INITIALS,
  INITIALS_SONG,
  SPELLING_SLIDE_CARDS,
  COMPOUND_SPELLING_GROUPS,
  BOOK_P32_SYLLABLES,
} from '../../data/pinyinData';
import { useStudy } from '../../context/StudyContext';
import { SpeakButton } from '../common/SpeakButton';
import { RevealText } from '../common/RevealText';
import { ToneContourSVG } from '../svg/ToneContourSVG';
import { MouthShapeSVG } from '../svg/MouthShapeSVG';

type PinyinTab = 'tones' | 'vowels' | 'initials' | 'spelling';

const COMPOUND_GROUPS: { key: 'a' | 'o' | 'e' | 'i' | 'u' | 'ü'; label: string }[] = [
  { key: 'a', label: 'กลุ่ม a (4)' },
  { key: 'o', label: 'กลุ่ม o (2)' },
  { key: 'e', label: 'กลุ่ม e (4 · ไฮไลต์แดง)' },
  { key: 'i', label: 'กลุ่ม i (9)' },
  { key: 'u', label: 'กลุ่ม u (8)' },
  { key: 'ü', label: 'กลุ่ม ü (3)' },
];

export const PinyinSection: React.FC = () => {
  const { speak } = useStudy();
  const [tab, setTab] = useState<PinyinTab>('tones');
  const [activeTone, setActiveTone] = useState<number>(1);
  const [activeFinalGroup, setActiveFinalGroup] = useState<'all' | 'a' | 'o' | 'e' | 'i' | 'u' | 'ü'>('all');

  const selectedToneObj = TONES.find((t) => t.id === activeTone) ?? TONES[0];

  const filteredCompounds =
    activeFinalGroup === 'all' ? COMPOUND_VOWELS : COMPOUND_VOWELS.filter((v) => v.group === activeFinalGroup);

  return (
    <div className="space-y-6">
      {/* Header & Pinyin 3-Part Architecture (Slide foods_24) */}
      <section className="neo-card lattice-frame rounded-3xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="font-cn text-sm font-semibold text-[#5F8D7B]">学发音 · {PINYIN_OVERVIEW.titleCN}</span>
            <h1 className="text-2xl font-bold text-[#2F3640]">{PINYIN_OVERVIEW.titleTH}และการออกเสียง</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            {(
              [
                { id: 'tones', label: '1. วรรณยุกต์ 4+1' },
                { id: 'vowels', label: '2. สระ 6+30' },
                { id: 'initials', label: '3. พยัญชนะ 23' },
                { id: 'spelling', label: '4. ฝึกสะกดคำ' },
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

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {PINYIN_OVERVIEW.parts.map((p) => (
            <div key={p.num} className="rounded-2xl border border-[#88B3A2]/25 bg-[#FAF6F0]/90 p-4">
              <div className="flex items-baseline justify-between">
                <span className="font-cn text-2xl font-bold text-[#2F3640]">
                  {p.num}. {p.cn}
                </span>
                <span className="font-pinyin text-xs font-semibold text-[#5F8D7B]">{p.pinyin}</span>
              </div>
              <div className="mt-1 text-sm font-bold text-[#D9776C]">{p.th}</div>
              <p className="mt-1 text-xs text-[#636E72]">{p.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TAB 1: TONES */}
      {tab === 'tones' && (
        <div className="space-y-6">
          <div className="neo-card rounded-3xl p-6">
            <p className="font-cn text-base text-[#2F3640]">{TONE_INTRO.cn}</p>
            <p className="mt-1.5 text-sm text-[#636E72]">{TONE_INTRO.th}</p>

            {/* Interactive SVG Contour + Tone Selector */}
            <div className="mt-6 grid items-center gap-6 lg:grid-cols-12">
              <div className="rounded-3xl border border-[#88B3A2]/30 bg-white/90 p-4 lg:col-span-6">
                <ToneContourSVG
                  activeTone={activeTone}
                  onSelectTone={(t) => {
                    setActiveTone(t);
                    const found = TONES.find((x) => x.id === t);
                    if (found) speak(found.maHanzi);
                  }}
                />
                <div className="mt-3 flex flex-wrap justify-center gap-2">
                  {TONES.map((tone) => (
                    <button
                      key={tone.id}
                      type="button"
                      onClick={() => {
                        setActiveTone(tone.id);
                        speak(tone.maHanzi);
                      }}
                      className={`rounded-xl border px-3 py-1.5 text-xs font-semibold transition cursor-pointer ${
                        activeTone === tone.id
                          ? 'border-transparent text-white shadow-sm'
                          : 'border-[#88B3A2]/30 bg-[#FAF6F0] text-[#2F3640] hover:bg-[#E5F0EB]'
                      }`}
                      style={activeTone === tone.id ? { backgroundColor: tone.color } : undefined}
                    >
                      {tone.id <= 4 ? `เสียง ${tone.id} (${tone.mark})` : 'เสียงเบา'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active tone spotlight card */}
              <motion.div
                key={selectedToneObj.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="rounded-3xl border border-[#88B3A2]/30 bg-gradient-to-br from-[#FFFDF9] to-[#FDF6E2]/55 p-6 lg:col-span-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span
                      className="inline-block rounded-full px-3 py-1 text-xs font-bold text-white"
                      style={{ backgroundColor: selectedToneObj.color }}
                    >
                      {selectedToneObj.nameTH} · {selectedToneObj.nameCN}
                    </span>
                    <div className="mt-3 flex items-baseline gap-4">
                      <span className="font-pinyin text-5xl font-bold text-[#2F3640]">
                        {selectedToneObj.exampleSyllable}
                      </span>
                      <span className="text-sm font-semibold text-[#5F8D7B]">
                        เทียบเสียงไทย: {selectedToneObj.thaiCompare}
                      </span>
                    </div>
                  </div>
                  <SpeakButton text={selectedToneObj.maHanzi} label="ฟังเสียง" size="lg" />
                </div>

                <p className="mt-4 text-sm text-[#2F3640]">{selectedToneObj.description}</p>
                <div className="mt-3 rounded-2xl bg-white/85 p-3.5 text-xs text-[#636E72]">
                  <strong className="text-[#D9776C]">ภาพช่วยจำ (p.12): </strong>
                  {selectedToneObj.exampleScene}
                </div>

                <div className="mt-4 flex items-center justify-between rounded-2xl border border-[#88B3A2]/25 bg-white/90 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="font-cn text-4xl font-bold text-[#2F3640]">{selectedToneObj.maHanzi}</span>
                    <div>
                      <RevealText type="pinyin" className="font-pinyin text-base font-bold text-[#5F8D7B]">
                        {selectedToneObj.maPinyin}
                      </RevealText>
                      <div className="text-sm text-[#636E72]">
                        <RevealText type="thai">{selectedToneObj.maThai}</RevealText>
                      </div>
                    </div>
                  </div>
                  <SpeakButton text={selectedToneObj.maHanzi} size="md" />
                </div>
              </motion.div>
            </div>

            {/* 4-Tone Comparison Row: 妈 麻 马 骂 */}
            <div className="mt-6">
              <h3 className="mb-3 text-sm font-bold text-[#2F3640]">
                เปรียบเทียบเสียงวรรณยุกต์ทั้ง 4 เสียง (听一听，写一写声调符号 p.12)
              </h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {TONES.slice(0, 4).map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => {
                      setActiveTone(t.id);
                      speak(t.maHanzi);
                    }}
                    className={`rounded-2xl border p-4 text-center transition hover:-translate-y-0.5 cursor-pointer ${
                      activeTone === t.id
                        ? 'border-[#88B3A2] bg-[#E5F0EB]/60 shadow-sm'
                        : 'border-[#88B3A2]/25 bg-white/85 hover:border-[#88B3A2]'
                    }`}
                  >
                    <div className="text-xs font-bold" style={{ color: t.color }}>
                      เสียง {t.id} ({t.mark}) · {t.thaiCompare.split(' ')[0]}
                    </div>
                    <div className="font-cn my-1.5 text-4xl font-bold text-[#2F3640]">{t.maHanzi}</div>
                    <div className="font-pinyin text-base font-semibold text-[#5F8D7B]">
                      <RevealText type="pinyin">{t.maPinyin}</RevealText>
                    </div>
                    <div className="mt-0.5 text-sm font-medium text-[#636E72]">
                      <RevealText type="thai">{t.maThai}</RevealText>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Classroom Tone Games (p.13) */}
          <div className="grid gap-4 md:grid-cols-2">
            {TONE_ACTIVITIES.map((act, idx) => (
              <div key={idx} className="neo-card rounded-2xl p-5">
                <div className="font-cn text-base font-bold text-[#5F8D7B]">{act.cn}</div>
                <div className="text-sm font-semibold text-[#2F3640]">{act.th}</div>
                <p className="mt-1.5 text-xs leading-relaxed text-[#636E72]">{act.detail}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: VOWELS (6 Simple + 30 Compound + Song + Tone Worksheet) */}
      {tab === 'vowels' && (
        <div className="space-y-6">
          {/* 6 Simple Vowels with Mouth Shapes */}
          <section className="neo-card rounded-3xl p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="text-lg font-bold text-[#2F3640]">สระเดี่ยว 6 เสียง (六个基本韵母) + รูปปาก (p.14, p.32)</h2>
                <p className="text-xs text-[#636E72]">กดปุ่มเสียงเพื่อฟัง และดูรูปปากพร้อมภาพช่วยจำจากหนังสือ</p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {SIMPLE_VOWELS.map((v) => (
                <div key={v.letter} className="rounded-2xl border border-[#88B3A2]/25 bg-white/90 p-4 transition hover:border-[#88B3A2]">
                  <div className="flex items-center gap-3.5">
                    <MouthShapeSVG vowel={v.letter} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-pinyin text-3xl font-bold text-[#2F3640]">{v.letter}</span>
                        <SpeakButton text={v.speakText} />
                      </div>
                      <div className="text-sm font-bold text-[#D9776C]">เสียงไทย: {v.thaiSound}</div>
                      <p className="mt-0.5 text-[11px] text-[#5F8D7B]">{v.mnemonic}</p>
                    </div>
                  </div>
                  <p className="mt-2.5 rounded-xl bg-[#FAF6F0] px-3 py-2 text-xs text-[#636E72]">{v.mouthTip}</p>
                  <div className="mt-2.5 flex justify-between gap-1.5">
                    {v.tones.map((tChar, i) => (
                      <button
                        key={tChar}
                        type="button"
                        onClick={() => speak(v.speakText)}
                        className="flex-1 rounded-lg bg-[#E5F0EB]/75 py-1 text-center font-pinyin text-sm font-semibold text-[#2F3640] transition hover:bg-[#88B3A2] hover:text-white cursor-pointer"
                        title={`เสียงที่ ${i + 1}`}
                      >
                        {tChar}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Vowel Song p.15 */}
          <section className="neo-card rounded-3xl bg-gradient-to-br from-[#FDF6E2]/70 to-white/90 p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#F4D58D] text-[#2F3640]">
                  <Music className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-cn text-base font-bold text-[#2F3640]">{VOWEL_SONG.titleCN}</h3>
                  <p className="text-xs text-[#636E72]">{VOWEL_SONG.titleTH}</p>
                </div>
              </div>
              <SpeakButton text="体验汉语好快乐" label="ฟังท่อนจบเพลง" size="md" />
            </div>

            <div className="mt-4 space-y-2">
              {VOWEL_SONG.lines.map((line, i) => (
                <div
                  key={i}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-white/85 px-4 py-2.5"
                >
                  <div>
                    <div className="font-pinyin text-sm font-semibold tracking-wide text-[#2F3640] md:text-base">
                      {line.text}
                    </div>
                    {line.translation && <div className="text-xs text-[#5F8D7B]">{line.translation}</div>}
                  </div>
                  <SpeakButton text={line.speak} />
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-2xl border border-[#F4D58D]/60 bg-white/75 p-3 text-xs text-[#636E72]">
              <strong className="font-cn text-[#2F3640]">{VOWEL_SONG.gameNote.cn}</strong> — {VOWEL_SONG.gameNote.th}
            </div>
          </section>

          {/* All 30 Compound Finals (foods_22 + foods_32-33) */}
          <section className="neo-card rounded-3xl p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-[#2F3640]">สระประสมครบทั้ง 30 เสียง (สมุดจด foods_22 & สไลด์)</h2>
                <p className="text-xs text-[#636E72]">
                  รวม 6 สระเดี่ยว + 30 สระประสม = 36 เสียง · ★ วงกลมพิเศษ (`iu`, `ui`) ใส่วรรณยุกต์ตัวหลัง · แดง (`ei en eng er`) ไฮไลต์ในใบงาน
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => setActiveFinalGroup('all')}
                  className={`rounded-xl px-3 py-1.5 text-xs font-semibold cursor-pointer ${
                    activeFinalGroup === 'all' ? 'bg-[#88B3A2] text-white' : 'bg-[#FAF6F0] text-[#636E72] hover:bg-[#E5F0EB]'
                  }`}
                >
                  ทั้งหมด (30)
                </button>
                {COMPOUND_GROUPS.map((g) => (
                  <button
                    key={g.key}
                    type="button"
                    onClick={() => setActiveFinalGroup(g.key)}
                    className={`rounded-xl px-3 py-1.5 text-xs font-semibold cursor-pointer ${
                      activeFinalGroup === g.key ? 'bg-[#88B3A2] text-white' : 'bg-[#FAF6F0] text-[#636E72] hover:bg-[#E5F0EB]'
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6">
              {filteredCompounds.map((cv) => (
                <button
                  key={cv.final}
                  type="button"
                  onClick={() => speak(cv.speakSample)}
                  className={`group relative rounded-2xl border p-3 text-left transition hover:-translate-y-0.5 cursor-pointer ${
                    cv.isCircledSpecial
                      ? 'border-[#D9776C] bg-[#FDECEB]/75 ring-2 ring-[#F2B8B5]/60'
                      : cv.isBookRedHighlight
                        ? 'border-[#F2B8B5] bg-[#FFF8F7]'
                        : 'border-[#88B3A2]/25 bg-white/90 hover:border-[#88B3A2]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-pinyin text-xl font-bold ${
                        cv.isBookRedHighlight ? 'text-[#D9776C]' : 'text-[#2F3640]'
                      }`}
                    >
                      {cv.final}
                    </span>
                    {cv.isCircledSpecial ? (
                      <Star className="h-3.5 w-3.5 fill-[#D9776C] text-[#D9776C]" />
                    ) : (
                      <Volume2 className="h-3.5 w-3.5 text-[#88B3A2] opacity-60 group-hover:opacity-100" />
                    )}
                  </div>
                  <div className="mt-1 text-xs font-semibold text-[#5F8D7B]">{cv.thaiSound}</div>
                  {cv.note && <div className="mt-1 text-[10px] leading-snug text-[#D9776C]">{cv.note}</div>}
                </button>
              ))}
            </div>
          </section>

          {/* Tone Placement Worksheet (foods_05 / u16_06) */}
          <section className="neo-card rounded-3xl p-6">
            <div className="mb-3">
              <span className="font-cn text-xs font-semibold text-[#D9776C]">
                听录音，在比较大的字母上边标出你听到的声调 (ใบงาน foods_05 & u16_06)
              </span>
              <h3 className="text-base font-bold text-[#2F3640]">
                เฉลยใบงาน: เขียนเครื่องหมายวรรณยุกต์บนสระอักษรตัวใหญ่ (กดเพื่อฟังเสียง)
              </h3>
            </div>
            <div className="space-y-2.5">
              {TONE_PLACEMENT_WORKSHEET.map((row) => (
                <div key={row.row} className="flex flex-wrap justify-center gap-2.5">
                  {row.items.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => speak(item.speak)}
                      className="flex min-w-[76px] items-baseline justify-center rounded-2xl border border-[#88B3A2]/30 bg-white/95 px-4 py-2.5 font-pinyin transition hover:scale-105 hover:border-[#D9776C] cursor-pointer"
                    >
                      {item.bigPosition === 'first' ? (
                        <>
                          <span className="text-2xl font-bold text-[#D9776C]">{item.bigVowel}</span>
                          <span className="text-sm font-medium text-[#636E72]">{item.rest}</span>
                        </>
                      ) : (
                        <>
                          <span className="text-sm font-medium text-[#636E72]">{item.rest}</span>
                          <span className="text-2xl font-bold text-[#D9776C]">{item.bigVowel}</span>
                        </>
                      )}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* TAB 3: INITIALS (All 23 Initials + Initials Song) */}
      {tab === 'initials' && (
        <div className="space-y-6">
          <section className="neo-card rounded-3xl p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="text-lg font-bold text-[#2F3640]">พยัญชนะ 23 เสียง (声母 shēngmǔ) พร้อมคำอ่านไทย</h2>
                <p className="text-xs text-[#636E72]">
                  ถอดเสียงอ่านตรงตามสมุดจด (foods_21) และจัดกลุ่มตามสไลด์ (foods_26–27) · คลิกที่ตัวอักษรเพื่อฟังเสียง
                </p>
              </div>
              <div className="flex flex-wrap gap-2 text-[11px]">
                <span className="rounded-full bg-[#FDF6E2] px-2.5 py-1 font-semibold text-[#9C7220]">
                  ● + i เปลี่ยนเป็น “อือ” (zh ch sh r z c s)
                </span>
                <span className="rounded-full bg-[#FDECEB] px-2.5 py-1 font-semibold text-[#B8564C]">
                  ● + ü ตัดจุด (j q x y)
                </span>
                <span className="rounded-full bg-[#EBEEF6] px-2.5 py-1 font-semibold text-[#58678A]">
                  ● + ü คงจุด (n l)
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 md:grid-cols-6">
              {INITIALS.map((init) => (
                <button
                  key={init.letter}
                  type="button"
                  onClick={() => speak(init.speakSample)}
                  className={`group rounded-2xl border p-3.5 text-center transition hover:-translate-y-0.5 cursor-pointer ${
                    init.changesItoUe
                      ? 'border-[#F4D58D] bg-[#FDF6E2]/55'
                      : init.dropsUmlaut
                        ? 'border-[#F2B8B5] bg-[#FDECEB]/55'
                        : init.keepsUmlaut
                          ? 'border-[#9BA8C7] bg-[#EBEEF6]/55'
                          : 'border-[#88B3A2]/30 bg-white/90'
                  }`}
                >
                  <div className="font-pinyin text-2xl font-bold text-[#2F3640]">{init.letter}</div>
                  <div className="mt-1 text-sm font-bold text-[#5F8D7B]">{init.thaiSound}</div>
                  <div className="mt-0.5 text-[10px] text-[#636E72]">{init.groupTH}</div>
                </button>
              ))}
            </div>
          </section>

          {/* Initials Song */}
          <section className="neo-card rounded-3xl bg-gradient-to-br from-[#E5F0EB]/70 to-white/90 p-6">
            <div className="mb-3 flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#88B3A2] text-white">
                <Music className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-cn text-base font-bold text-[#2F3640]">{INITIALS_SONG.titleCN}</h3>
                <p className="text-xs text-[#636E72]">{INITIALS_SONG.titleTH}</p>
              </div>
            </div>
            <div className="space-y-2">
              {INITIALS_SONG.lines.map((line, i) => (
                <div key={i} className="flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-white/85 px-4 py-2.5">
                  <div>
                    <div className="font-pinyin text-sm font-semibold text-[#2F3640] md:text-base">{line.text}</div>
                    {line.translation && <div className="text-xs text-[#5F8D7B]">{line.translation}</div>}
                    {line.note && <div className="text-[11px] text-[#D9776C]">{line.note}</div>}
                  </div>
                  <SpeakButton text={line.speak} />
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* TAB 4: SPELLING DRILLS (Slides foods_34-43 + Book p.32) */}
      {tab === 'spelling' && (
        <div className="space-y-6">
          {/* Slide Formula Word Cards (foods_34-40, 42-43) */}
          <section className="neo-card rounded-3xl p-6">
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-[#D9776C]" />
              <div>
                <h2 className="text-lg font-bold text-[#2F3640]">การประสมพินอินเป็นคำศัพท์ (สไลด์การสอน foods_34–43)</h2>
                <p className="text-xs text-[#636E72]">ครบทุกสไลด์ที่อาจารย์สอนในห้อง กดการ์ดเพื่อฟังเสียง</p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {SPELLING_SLIDE_CARDS.map((card, i) => (
                <div
                  key={i}
                  onClick={() => speak(card.hanzi)}
                  className="cursor-pointer rounded-2xl border border-[#88B3A2]/30 bg-white/95 p-4 transition hover:-translate-y-0.5 hover:border-[#88B3A2] hover:shadow-md"
                >
                  <div className="rounded-xl bg-[#FAF6F0] px-3 py-1.5 text-center font-pinyin text-sm font-bold text-[#D9776C]">
                    {card.formula}
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <div className="font-cn text-3xl font-bold text-[#2F3640]">{card.hanzi}</div>
                      <div className="font-pinyin text-sm font-semibold text-[#5F8D7B]">
                        <RevealText type="pinyin">{card.pinyin}</RevealText>
                      </div>
                      <div className="text-xs text-[#636E72]">
                        <RevealText type="thai">{card.thai}</RevealText>
                      </div>
                    </div>
                    <SpeakButton text={card.hanzi} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Compound Spelling Groups (Slide foods_41) */}
          <section className="neo-card rounded-3xl p-6">
            <h3 className="mb-3 text-base font-bold text-[#2F3640]">ฝึกประสมสระผสม ai / ei / ao / ou (สไลด์ foods_41)</h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {COMPOUND_SPELLING_GROUPS.map((grp) => (
                <div key={grp.final} className="rounded-2xl border border-[#88B3A2]/25 bg-[#FAF6F0]/90 p-4">
                  <div className="mb-2 text-center font-pinyin text-sm font-bold text-[#5F8D7B]">สระ -{grp.final}</div>
                  <div className="space-y-1.5">
                    {grp.items.map((it) => (
                      <button
                        key={it.eq}
                        type="button"
                        onClick={() => speak(it.speak)}
                        className="flex w-full items-center justify-between rounded-xl bg-white px-3 py-2 font-pinyin text-sm font-medium text-[#2F3640] transition hover:bg-[#E5F0EB] cursor-pointer"
                      >
                        <span>{it.eq}</span>
                        <Volume2 className="h-3.5 w-3.5 text-[#5F8D7B]" />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Book p.32 Pronunciation Drill Syllables */}
          <section className="neo-card rounded-3xl p-6">
            <h3 className="mb-1 text-base font-bold text-[#2F3640]">
              ตารางฝึกฟังและออกเสียงพยางค์ (听一听，标出听到的声调 · หนังสือ p.32)
            </h3>
            <p className="mb-4 text-xs text-[#636E72]">กดพยางค์ใดก็ได้เพื่อฝึกฟังเสียงพยัญชนะประสมสระเดี่ยวทั้ง 6 แถว</p>
            <div className="space-y-2">
              {BOOK_P32_SYLLABLES.map((row) => (
                <div key={row.vowel} className="flex flex-wrap items-center gap-2 rounded-2xl bg-[#FAF6F0]/80 p-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#88B3A2] font-pinyin text-sm font-bold text-white">
                    {row.vowel}
                  </span>
                  <div className="flex flex-1 flex-wrap gap-2">
                    {row.items.map((item) => (
                      <button
                        key={item.text}
                        type="button"
                        onClick={() => speak(item.speak)}
                        className="inline-flex items-center gap-2 rounded-xl border border-[#88B3A2]/25 bg-white px-4 py-1.5 font-pinyin text-sm font-semibold text-[#2F3640] transition hover:border-[#88B3A2] hover:bg-[#E5F0EB] cursor-pointer"
                      >
                        <span>{item.text}</span>
                        <Volume2 className="h-3 w-3 text-[#5F8D7B]" />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};
