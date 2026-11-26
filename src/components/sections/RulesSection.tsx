import React, { useState } from 'react';
import { AlertCircle, ArrowRight, Volume2 } from 'lucide-react';
import {
  TONE_MARK_PRIORITY,
  SPECIAL_I_RULE,
  UMLAUT_RULE,
  THIRD_TONE_SANDHI,
  YI_SANDHI,
  BU_SANDHI,
  NEUTRAL_TONE_WORDS,
} from '../../data/rulesData';
import { useStudy } from '../../context/StudyContext';
import { SpeakButton } from '../common/SpeakButton';
import { RevealText } from '../common/RevealText';

export const RulesSection: React.FC = () => {
  const { speak } = useStudy();
  const [yiFilter, setYiFilter] = useState<'all' | 'yì' | 'yí'>('all');
  const [buFilter, setBuFilter] = useState<'all' | 'bù' | 'bú'>('all');

  const yiList =
    yiFilter === 'all'
      ? YI_SANDHI.examples
      : yiFilter === 'yí'
        ? YI_SANDHI.examples.filter((x) => x.followingTone === 4)
        : YI_SANDHI.examples.filter((x) => x.followingTone !== 4);

  const buList =
    buFilter === 'all'
      ? BU_SANDHI.examples
      : buFilter === 'bú'
        ? BU_SANDHI.examples.filter((x) => x.followingTone === 4)
        : BU_SANDHI.examples.filter((x) => x.followingTone !== 4);

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="neo-card lattice-frame rounded-3xl p-6">
        <span className="font-cn text-sm font-semibold text-[#D9776C]">重要规则 · กฎต้องจำออกสอบ 100%</span>
        <h1 className="text-2xl font-bold text-[#2F3640]">กฎพิเศษพินอิน & การเปลี่ยนเสียงวรรณยุกต์ (ครบทั้ง 7 กฎ)</h1>
        <p className="mt-1 text-xs text-[#636E72]">
          รวบรวมครบทุกกฎและทุกคำตัวอย่างจากชีทอ่านออกเสียง (foods_08), สมุดจด (foods_21–22), สไลด์ (foods_30–31) และโน้ตสรุป (u16_01)
        </p>
      </section>

      {/* Rule 1: Tone Mark Placement Priority */}
      <section className="neo-card rounded-3xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-bold text-[#2F3640]">{TONE_MARK_PRIORITY.title}</h2>
          <span className="rounded-full bg-[#E5F0EB] px-3 py-1 text-[11px] font-semibold text-[#3F6B5B]">
            {TONE_MARK_PRIORITY.source}
          </span>
        </div>

        {/* Visual Vowel Priority Chain */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 rounded-2xl bg-[#FAF6F0] p-4">
          {TONE_MARK_PRIORITY.order.map((v, i) => (
            <React.Fragment key={v}>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#88B3A2] font-pinyin text-xl font-bold text-white shadow-xs">
                {v}
              </div>
              {i < TONE_MARK_PRIORITY.order.length - 1 && <ArrowRight className="h-4 w-4 text-[#D9776C]" />}
            </React.Fragment>
          ))}
        </div>

        <p className="mt-3 text-sm text-[#2F3640]">{TONE_MARK_PRIORITY.summaryTH}</p>
        <div className="mt-2.5 flex items-start gap-2 rounded-2xl border border-[#F2B8B5] bg-[#FDECEB]/75 p-3.5 text-xs text-[#8F3A32]">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#D9776C]" />
          <span>{TONE_MARK_PRIORITY.exceptionTH}</span>
        </div>

        <div className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {TONE_MARK_PRIORITY.examples.map((ex, i) => (
            <div key={i} className="rounded-2xl border border-[#88B3A2]/25 bg-white/90 px-4 py-3">
              <div className="flex items-center justify-between">
                <span className="font-pinyin text-xs font-medium text-[#636E72]">{ex.pair}</span>
                <span className="font-pinyin text-xl font-bold text-[#D9776C]">{ex.result}</span>
              </div>
              <p className="mt-1 text-xs text-[#636E72]">{ex.why}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Rule 2: zh ch sh r / z c s + i */}
      <section className="neo-card rounded-3xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-bold text-[#2F3640]">{SPECIAL_I_RULE.title}</h2>
          <span className="rounded-full bg-[#FDF6E2] px-3 py-1 text-[11px] font-semibold text-[#9C7220]">
            {SPECIAL_I_RULE.source}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 rounded-3xl border border-[#F4D58D] bg-gradient-to-r from-[#FDF6E2]/80 to-[#FAF6F0] p-5">
          <div className="space-y-2 text-center">
            <div className="flex justify-center gap-2">
              {SPECIAL_I_RULE.initialsRow1.map((c) => (
                <span key={c} className="rounded-xl bg-white px-3 py-1.5 font-pinyin text-lg font-bold text-[#2F3640] shadow-xs">
                  {c}
                </span>
              ))}
            </div>
            <div className="flex justify-center gap-2">
              {SPECIAL_I_RULE.initialsRow2.map((c) => (
                <span key={c} className="rounded-xl bg-white px-3 py-1.5 font-pinyin text-lg font-bold text-[#2F3640] shadow-xs">
                  {c}
                </span>
              ))}
            </div>
          </div>
          <span className="text-2xl font-bold text-[#D9776C]">+</span>
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D9776C] font-pinyin text-3xl font-bold text-white shadow-sm">
            i
          </span>
          <ArrowRight className="h-5 w-5 text-[#5F8D7B]" />
          <div className="rounded-2xl bg-white px-4 py-2.5 text-center shadow-xs">
            <div className="text-xs text-[#636E72]">เปลี่ยนเสียงจาก “อี” เป็น</div>
            <div className="text-xl font-bold text-[#D9776C]">“อือ”</div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {SPECIAL_I_RULE.examples.map((ex) => (
            <button
              key={ex.hanzi}
              type="button"
              onClick={() => speak(ex.hanzi)}
              className="flex items-center justify-between rounded-2xl border border-[#88B3A2]/25 bg-white/90 px-3.5 py-2.5 text-left transition hover:border-[#88B3A2] cursor-pointer"
            >
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="font-cn text-2xl font-bold text-[#2F3640]">{ex.hanzi}</span>
                  <span className="font-pinyin text-sm font-bold text-[#5F8D7B]">{ex.pinyin}</span>
                </div>
                <div className="text-xs text-[#D9776C]">อ่าน: {ex.readTH} · {ex.thai}</div>
              </div>
              <Volume2 className="h-3.5 w-3.5 text-[#88B3A2]" />
            </button>
          ))}
        </div>
      </section>

      {/* Rule 3: ü Umlaut Drop vs Keep Full Matrix (Slide foods_31) */}
      <section className="neo-card rounded-3xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-bold text-[#2F3640]">{UMLAUT_RULE.title}</h2>
          <span className="rounded-full bg-[#FDECEB] px-3 py-1 text-[11px] font-semibold text-[#B8564C]">
            {UMLAUT_RULE.source}
          </span>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl border border-[#F2B8B5] bg-[#FDECEB]/70 p-4">
            <div className="font-pinyin text-lg font-bold text-[#B8564C]">ü + j, q, x, y → ตัดจุด ( ·· ) ออก</div>
            <p className="mt-1 text-xs text-[#636E72]">{UMLAUT_RULE.dropRuleTH}</p>
          </div>
          <div className="rounded-2xl border border-[#9BA8C7]/60 bg-[#EBEEF6]/75 p-4">
            <div className="font-pinyin text-lg font-bold text-[#465678]">ü + n, l → ห้ามตัดจุด ( ·· )</div>
            <p className="mt-1 text-xs text-[#636E72]">{UMLAUT_RULE.keepRuleTH}</p>
          </div>
        </div>

        {/* Full Matrix Table from Slide foods_31 */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[460px] border-separate border-spacing-1.5 text-center text-sm">
            <thead>
              <tr>
                <th className="rounded-xl bg-[#88B3A2] px-3 py-2 text-xs font-bold text-white">声母 \ 韵母</th>
                {UMLAUT_RULE.headers.map((h) => (
                  <th key={h} className="rounded-xl bg-[#E5F0EB] px-3 py-2 font-pinyin font-bold text-[#2F3640]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {UMLAUT_RULE.matrix.map((row) => (
                <tr key={row.initial}>
                  <td
                    className={`rounded-xl px-3 py-2 font-pinyin text-base font-bold ${
                      row.keepDots ? 'bg-[#EBEEF6] text-[#465678]' : 'bg-[#FDECEB] text-[#B8564C]'
                    }`}
                  >
                    {row.initial}
                  </td>
                  {row.cells.map((cell, idx) => (
                    <td key={idx} className="rounded-xl bg-white/90 p-1">
                      {cell ? (
                        <button
                          type="button"
                          onClick={() => row.samples[idx] && speak(row.samples[idx]!)}
                          className={`flex w-full items-center justify-center gap-1.5 rounded-lg py-1.5 font-pinyin font-semibold transition cursor-pointer ${
                            row.keepDots
                              ? 'text-[#465678] hover:bg-[#EBEEF6]'
                              : 'text-[#B8564C] hover:bg-[#FDECEB]'
                          }`}
                        >
                          <span>{cell}</span>
                          <Volume2 className="h-3 w-3 opacity-50" />
                        </button>
                      ) : (
                        <span className="text-xs text-[#636E72]/35">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Rule 4: Third Tone Sandhi (foods_08 + u16_01) */}
      <section className="neo-card rounded-3xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-bold text-[#2F3640]">{THIRD_TONE_SANDHI.title}</h2>
          <span className="rounded-full bg-[#FDF6E2] px-3 py-1 text-xs font-bold text-[#9C7220]">
            {THIRD_TONE_SANDHI.noteTH}
          </span>
        </div>
        <p className="mt-1.5 text-sm text-[#636E72]">{THIRD_TONE_SANDHI.ruleTH}</p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {THIRD_TONE_SANDHI.examples.map((ex) => (
            <div key={ex.hanzi} className="rounded-2xl border border-[#88B3A2]/25 bg-white/95 p-4">
              <div className="flex items-start justify-between">
                <span className="font-cn text-3xl font-bold text-[#2F3640]">{ex.hanzi}</span>
                <SpeakButton text={ex.hanzi} />
              </div>
              <div className="mt-2.5 flex flex-wrap items-center gap-2 text-xs">
                <span className="rounded-lg bg-[#FAF6F0] px-2.5 py-1 font-pinyin font-medium text-[#636E72]">
                  เขียน: <RevealText type="pinyin">{ex.writtenPinyin}</RevealText>
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-[#D9776C]" />
                <span className="rounded-lg bg-[#FDECEB] px-2.5 py-1 font-pinyin font-bold text-[#D9776C]">
                  อ่าน: <RevealText type="pinyin">{ex.spokenPinyin}</RevealText>
                </span>
              </div>
              <div className="mt-2 text-sm text-[#2F3640]">
                <RevealText type="thai">{ex.thai}</RevealText>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Rule 5: 一 (yī) Tone Sandhi — All 12 words from foods_08 */}
      <section className="neo-card rounded-3xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-[#2F3640]">{YI_SANDHI.title}</h2>
            <div className="mt-1 space-y-0.5 text-xs">
              <p className="font-medium text-[#5F8D7B]">● {YI_SANDHI.ruleTo4TH}</p>
              <p className="font-medium text-[#D9776C]">● {YI_SANDHI.ruleTo2TH}</p>
            </div>
          </div>
          <div className="flex gap-1.5">
            {(
              [
                { id: 'all', label: 'ทั้งหมด (12)' },
                { id: 'yì', label: 'เปลี่ยนเป็น yì (9)' },
                { id: 'yí', label: 'เปลี่ยนเป็น yí (3)' },
              ] as const
            ).map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setYiFilter(f.id)}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold cursor-pointer ${
                  yiFilter === f.id ? 'bg-[#88B3A2] text-white' : 'bg-[#FAF6F0] text-[#636E72] hover:bg-[#E5F0EB]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 grid gap-2.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {yiList.map((ex) => {
            const isTone4After = ex.followingTone === 4;
            return (
              <div
                key={ex.hanzi}
                onClick={() => speak(ex.hanzi)}
                className={`cursor-pointer rounded-2xl border p-3.5 transition hover:-translate-y-0.5 ${
                  isTone4After ? 'border-[#F2B8B5] bg-[#FDECEB]/65' : 'border-[#88B3A2]/30 bg-[#E5F0EB]/45'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-cn text-2xl font-bold text-[#2F3640]">{ex.hanzi}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      isTone4After ? 'bg-[#D9776C] text-white' : 'bg-[#5F8D7B] text-white'
                    }`}
                  >
                    +เสียง {ex.followingTone}
                  </span>
                </div>
                <div className="mt-1 font-pinyin text-base font-bold text-[#2F3640]">
                  <RevealText type="pinyin">{ex.writtenPinyin}</RevealText>
                </div>
                <div className="text-xs text-[#636E72]">
                  <RevealText type="thai">{ex.thai}</RevealText>
                </div>
                {ex.note && <div className="mt-1 text-[10px] text-[#5F8D7B]">{ex.note}</div>}
              </div>
            );
          })}
        </div>
      </section>

      {/* Rule 6: 不 (bù) Tone Sandhi — All 12 words from foods_08 */}
      <section className="neo-card rounded-3xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-[#2F3640]">{BU_SANDHI.title}</h2>
            <div className="mt-1 space-y-0.5 text-xs">
              <p className="font-medium text-[#58678A]">● {BU_SANDHI.ruleKeep4TH}</p>
              <p className="font-medium text-[#D9776C]">● {BU_SANDHI.ruleTo2TH}</p>
            </div>
          </div>
          <div className="flex gap-1.5">
            {(
              [
                { id: 'all', label: 'ทั้งหมด (12)' },
                { id: 'bù', label: 'คงเสียง bù (9)' },
                { id: 'bú', label: 'เปลี่ยนเป็น bú (3)' },
              ] as const
            ).map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setBuFilter(f.id)}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold cursor-pointer ${
                  buFilter === f.id ? 'bg-[#D9776C] text-white' : 'bg-[#FAF6F0] text-[#636E72] hover:bg-[#FDECEB]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 grid gap-2.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {buList.map((ex) => {
            const isTone4After = ex.followingTone === 4;
            return (
              <div
                key={ex.hanzi}
                onClick={() => speak(ex.hanzi)}
                className={`cursor-pointer rounded-2xl border p-3.5 transition hover:-translate-y-0.5 ${
                  isTone4After ? 'border-[#D9776C]/50 bg-[#FDECEB]/75' : 'border-[#9BA8C7]/35 bg-[#EBEEF6]/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-cn text-2xl font-bold text-[#2F3640]">{ex.hanzi}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      isTone4After ? 'bg-[#D9776C] text-white' : 'bg-[#6F82A8] text-white'
                    }`}
                  >
                    +เสียง {ex.followingTone}
                  </span>
                </div>
                <div className="mt-1 font-pinyin text-base font-bold text-[#2F3640]">
                  <RevealText type="pinyin">{ex.writtenPinyin}</RevealText>
                </div>
                <div className="text-xs text-[#636E72]">
                  <RevealText type="thai">{ex.thai}</RevealText>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Rule 7: Neutral Tone (轻声) — All 16 words from foods_08 */}
      <section className="neo-card rounded-3xl p-6">
        <h2 className="text-lg font-bold text-[#2F3640]">กฎที่ 7: คำเสียงเบา (轻声 · ครบทั้ง 16 คำจากชีท foods_08)</h2>
        <p className="mt-1 text-xs text-[#636E72]">
          พยางค์หลังไม่มีเครื่องหมายวรรณยุกต์ ออกเสียงสั้นและเบาลง (กดที่คำเพื่อฟังเสียง)
        </p>

        <div className="mt-4 grid gap-2.5 sm:grid-cols-2 md:grid-cols-4">
          {NEUTRAL_TONE_WORDS.map((w) => (
            <div
              key={w.hanzi}
              onClick={() => speak(w.hanzi)}
              className="cursor-pointer rounded-2xl border border-[#88B3A2]/25 bg-white/90 p-3.5 transition hover:border-[#88B3A2]"
            >
              <div className="flex items-center justify-between">
                <span className="font-cn text-2xl font-bold text-[#2F3640]">{w.hanzi}</span>
                <SpeakButton text={w.hanzi} />
              </div>
              <div className="mt-1 font-pinyin text-sm font-bold text-[#5F8D7B]">
                <RevealText type="pinyin">{w.pinyin}</RevealText>
              </div>
              <div className="text-xs text-[#2F3640]">
                <RevealText type="thai">{w.thai}</RevealText>
              </div>
              {w.note && (
                <div className="mt-1.5 rounded-xl bg-[#FDECEB] px-2.5 py-1.5 text-[10px] leading-snug text-[#B8564C]">
                  {w.note}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
