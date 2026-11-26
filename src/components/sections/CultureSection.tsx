import React, { useState } from 'react';
import { Landmark, Sparkles, PenTool } from 'lucide-react';
import { CANG_JIE_STORY } from '../../data/lessonData';
import { VOCAB_LIST } from '../../data/vocabData';
import { useStudy } from '../../context/StudyContext';
import { SpeakButton } from '../common/SpeakButton';
import { RevealText } from '../common/RevealText';
import { PictographSVG } from '../svg/PictographSVG';

export const CultureSection: React.FC = () => {
  const { speak, openInStudio } = useStudy();
  const [genderFilter, setGenderFilter] = useState<'all' | 'ช.' | 'ญ.' | 'ช./ญ.'>('all');

  const chineseNames = VOCAB_LIST.filter((v) => v.category === 'names');
  const filteredNames = genderFilter === 'all' ? chineseNames : chineseNames.filter((n) => n.gender === genderFilter);
  const thaiSurnames = VOCAB_LIST.filter((v) => v.category === 'surnames');

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="neo-card lattice-frame rounded-3xl p-6">
        <span className="font-cn text-sm font-semibold text-[#5F8D7B]">汉字的故事 & 文化 · เกร็ดวัฒนธรรมจีน</span>
        <h1 className="text-2xl font-bold text-[#2F3640]">ตำนานกำเนิดอักษรจีน ชื่อมงคล 14 คำ & แซ่ยอดนิยมในไทย</h1>
      </section>

      {/* Cang Jie 4-Eyed Legend (Book p.33 foods_20 / u16_02) */}
      <section className="neo-card rounded-3xl bg-gradient-to-br from-[#FFFDF9] to-[#FDF6E2]/65 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D9776C] text-white shadow-sm">
              <Landmark className="h-6 w-6" />
            </div>
            <div>
              <div className="font-cn text-lg font-bold text-[#D9776C]">{CANG_JIE_STORY.titleCN}</div>
              <h2 className="text-lg font-bold text-[#2F3640]">{CANG_JIE_STORY.titleTH}</h2>
            </div>
          </div>
          <SpeakButton text={CANG_JIE_STORY.storyCN} label="ฟังเรื่องเล่าภาษาจีน" size="md" />
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-8">
            <div className="rounded-2xl border border-[#F4D58D]/70 bg-white/90 p-4">
              <p className="font-cn text-base leading-relaxed text-[#2F3640]">{CANG_JIE_STORY.storyCN}</p>
            </div>
            <div className="rounded-2xl border border-[#88B3A2]/30 bg-[#FAF6F0] p-4">
              <p className="text-sm leading-relaxed text-[#2F3640]">{CANG_JIE_STORY.storyTH}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {CANG_JIE_STORY.highlights.map((h, i) => (
                <span key={i} className="rounded-full bg-[#FDECEB] px-3 py-1 text-xs font-semibold text-[#B8564C]">
                  ✦ {h}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-3 lg:col-span-4">
            {/* Cultural Landmarks from p.33 */}
            {CANG_JIE_STORY.landmarks.map((lm) => (
              <div key={lm.hanzi} className="flex items-center justify-between rounded-2xl border border-[#88B3A2]/25 bg-white/90 p-4">
                <div>
                  <div className="font-cn text-2xl font-bold text-[#2F3640]">{lm.hanzi}</div>
                  <div className="font-pinyin text-xs font-semibold text-[#5F8D7B]">{lm.pinyin}</div>
                  <div className="text-xs text-[#636E72]">{lm.thai}</div>
                </div>
                <SpeakButton text={lm.hanzi} />
              </div>
            ))}

            {/* Cultural Words from p.33: 十字路口 & 八宝粥 */}
            <div className="rounded-2xl border border-[#88B3A2]/30 bg-[#E5F0EB]/55 p-4 space-y-3">
              <div className="text-xs font-bold text-[#3F6B5B]">คำศัพท์วัฒนธรรมจากอักษรภาพ (p.33)</div>
              <div className="flex items-center gap-3 rounded-xl bg-white p-2.5">
                <PictographSVG char="十" />
                <div className="flex-1">
                  <div className="font-cn text-lg font-bold text-[#2F3640]">十字路口</div>
                  <div className="font-pinyin text-xs font-semibold text-[#5F8D7B]">shízì lùkǒu</div>
                  <div className="text-xs text-[#636E72]">สี่แยก (ทางรูปตัว 十)</div>
                </div>
                <SpeakButton text="十字路口" />
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-white p-2.5">
                <PictographSVG char="八" />
                <div className="flex-1">
                  <div className="font-cn text-lg font-bold text-[#2F3640]">八宝粥</div>
                  <div className="font-pinyin text-xs font-semibold text-[#5F8D7B]">bābǎozhōu</div>
                  <div className="text-xs text-[#636E72]">โจ๊กผสมแปดอย่าง (ธัญพืช 8 ชนิด)</div>
                </div>
                <SpeakButton text="八宝粥" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 14 Popular Chinese Given Names (Book p.27 foods_14) */}
      <section className="neo-card rounded-3xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#D9776C]">
              <Sparkles className="h-4 w-4" />
              <span>อุ่นเครื่องหน้า 27 (foods_14) · พร้อมโน้ตแยกเพศ ช. / ญ.</span>
            </div>
            <h2 className="text-lg font-bold text-[#2F3640]">14 ตัวอักษรยอดนิยมที่คนจีนใช้ตั้งชื่อ</h2>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {(
              [
                { id: 'all', label: 'ทั้งหมด (14)' },
                { id: 'ช.', label: 'ผู้ชาย (ช.)' },
                { id: 'ญ.', label: 'ผู้หญิง (ญ.)' },
                { id: 'ช./ญ.', label: 'ใช้ได้ทั้งคู่' },
              ] as const
            ).map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setGenderFilter(f.id)}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold cursor-pointer ${
                  genderFilter === f.id ? 'bg-[#88B3A2] text-white' : 'bg-[#FAF6F0] text-[#636E72] hover:bg-[#E5F0EB]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7">
          {filteredNames.map((n) => (
            <div
              key={n.id}
              onClick={() => speak(n.hanzi)}
              className="cursor-pointer rounded-2xl border border-[#88B3A2]/25 bg-white/95 p-3.5 text-center transition hover:-translate-y-0.5 hover:border-[#88B3A2]"
            >
              <span
                className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${
                  n.gender === 'ช.'
                    ? 'bg-[#EBEEF6] text-[#465678]'
                    : n.gender === 'ญ.'
                      ? 'bg-[#FDECEB] text-[#B8564C]'
                      : 'bg-[#FDF6E2] text-[#9C7220]'
                }`}
              >
                {n.gender}
              </span>
              <div className="font-cn my-1.5 text-4xl font-bold text-[#2F3640]">{n.hanzi}</div>
              <div className="font-pinyin text-sm font-bold text-[#5F8D7B]">
                <RevealText type="pinyin">{n.pinyin}</RevealText>
              </div>
              <div className="text-xs text-[#636E72]">
                <RevealText type="thai">{n.thai}</RevealText>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Top Popular Chinese Surnames in Thailand (Slide foods_44) */}
      <section className="neo-card rounded-3xl p-6">
        <div className="mb-4">
          <span className="text-xs font-bold text-[#5F8D7B]">สไลด์ห้องเรียน foods_44</span>
          <h2 className="text-lg font-bold text-[#2F3640]">แซ่ที่นิยมใช้มากสุดในประเทศไทย (จีนกลาง ↔ แต้จิ๋ว/ไทย)</h2>
          <p className="text-xs text-[#636E72]">
            กดที่การ์ดเพื่อฟังการออกเสียงแซ่ในภาษาจีนกลาง หรือกดพู่กันเพื่อฝึกเขียนแซ่ของคุณเอง
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {thaiSurnames.map((sur, idx) => (
            <div
              key={sur.id}
              className="flex items-center justify-between gap-3 rounded-2xl border border-[#88B3A2]/25 bg-white/95 p-4 transition hover:border-[#88B3A2]"
            >
              <div className="flex items-center gap-3.5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E5F0EB] font-cn text-3xl font-bold text-[#2F3640]">
                  {sur.hanzi}
                </div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs font-bold text-[#636E72]">#{idx + 1}</span>
                    <span className="font-pinyin text-base font-bold text-[#5F8D7B]">
                      <RevealText type="pinyin">{sur.pinyin}</RevealText>
                    </span>
                  </div>
                  <div className="text-sm font-bold text-[#D9776C]">
                    <RevealText type="thai">{sur.teochew}</RevealText>
                  </div>
                  <div className="text-[11px] text-[#636E72]">{sur.thai}</div>
                </div>
              </div>
              <div className="flex gap-1">
                <SpeakButton text={`我姓${sur.hanzi}`} />
                <button
                  type="button"
                  onClick={() => openInStudio(sur.hanzi)}
                  title={`ฝึกเขียนแซ่ ${sur.hanzi}`}
                  className="rounded-full bg-[#FDECEB] p-1.5 text-[#B8564C] hover:bg-[#D9776C] hover:text-white cursor-pointer"
                >
                  <PenTool className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
