import React from 'react';
import { motion } from 'framer-motion';
import {
  AudioLines,
  Sparkles,
  Brush,
  Hash,
  BookOpen,
  MessageCircle,
  Landmark,
  Layers,
  PenTool,
  Trophy,
  ArrowRight,
  CheckCircle2,
  Volume2,
} from 'lucide-react';
import { useStudy } from '../../context/StudyContext';
import { VOCAB_LIST } from '../../data/vocabData';
import type { SectionId } from '../../types';

const ROADMAP_CARDS: {
  id: SectionId;
  step: string;
  cn: string;
  title: string;
  desc: string;
  accent: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  {
    id: 'pinyin',
    step: 'บทเรียนที่ 1',
    cn: '拼音声调',
    title: 'พินอิน พยัญชนะ 23 · สระ 36 · วรรณยุกต์',
    desc: 'กราฟเสียง 1–4 แบบเคลื่อนไหว รูปปาก สระเดี่ยว-ผสม เพลงพินอิน และตารางฝึกสะกดคำจากสไลด์ครบทุกแผ่น',
    accent: 'from-[#E5F0EB] to-[#FAF6F0]',
    icon: AudioLines,
  },
  {
    id: 'rules',
    step: 'บทเรียนที่ 2',
    cn: '变调规则',
    title: '7 กฎพิเศษ & การเปลี่ยนเสียงพินอิน',
    desc: 'เสียง 3 ชน 3, กฎ 一 และ 不 ครบ 24 คำ, ตัดจุด ü (ตารางสไลด์เต็ม), กฎ +i เป็นอือ และคำเสียงเบา 16 คำ',
    accent: 'from-[#FDECEB] to-[#FAF6F0]',
    icon: Sparkles,
  },
  {
    id: 'hanzi',
    step: 'บทเรียนที่ 3',
    cn: '笔画结构',
    title: 'เส้นขีดพื้นฐาน 6 · ผันแปร 20 · โครงสร้าง',
    desc: 'เส้นขีดครบชุด แบบฝึกเติมขีดที่หายไป กลุ่มคำเหมือน 八·人·入 โครงสร้างอักษร 4 แถว และกฎลำดับขีด 7 ข้อ',
    accent: 'from-[#FDF6E2] to-[#FAF6F0]',
    icon: Brush,
  },
  {
    id: 'numbers',
    step: 'บทเรียนที่ 4',
    cn: '学数字',
    title: 'ตัวเลข ๑–๑๐ และภาษามือจีน',
    desc: 'ภาพประกอบภาษามือจีน 1–10 ตรงตามหนังสือหน้า 26 พร้อมระบบสุ่มทายภาษามือกับเพื่อน',
    accent: 'from-[#EBEEF6] to-[#FAF6F0]',
    icon: Hash,
  },
  {
    id: 'vocab',
    step: 'บทเรียนที่ 5',
    cn: '词语总汇',
    title: `คลังคำศัพท์แยก 8 หมวด (${VOCAB_LIST.length} คำ)`,
    desc: 'บทที่ 1, สรรพนาม, ห้องเรียน, ครอบครัว, สีสัน, ชื่อมงคล 14 คำ, แซ่ยอดนิยมในไทย และคำจากแบบฝึกหัดครบ 100%',
    accent: 'from-[#E5F0EB] to-[#FAF6F0]',
    icon: BookOpen,
  },
  {
    id: 'lesson',
    step: 'บทเรียนที่ 6',
    cn: '第一课 你好',
    title: 'บทสนทนา รูปประโยค & ตัวช่วยประกอบประโยค',
    desc: 'แชตบับเบิลมุก 飞飞 vs 狒狒, ถามชื่อ–แซ่ (叫/姓), ประโยคสไลด์ ดีลี่เร่อปา และ Sentence Builder กดสร้างประโยคเอง',
    accent: 'from-[#FDECEB] to-[#FAF6F0]',
    icon: MessageCircle,
  },
  {
    id: 'culture',
    step: 'บทเรียนที่ 7',
    cn: '汉字文化',
    title: 'ตำนานชังเจี๋ย 4 ตา · ชื่อมงคล · แซ่ไทย-จีน',
    desc: 'ตำนานกำเนิดอักษรจีน 5,000 ปี อักษรภาพ 十字路口 / 八宝粥 เกมแยกเพศชื่อจีน และตารางเทียบแซ่แต้จิ๋ว',
    accent: 'from-[#FDF6E2] to-[#FAF6F0]',
    icon: Landmark,
  },
];

const LAB_SHORTCUTS: { id: SectionId; title: string; subtitle: string; icon: React.ComponentType<{ className?: string }>; bg: string }[] = [
  { id: 'flashcards', title: '3D แฟลชการ์ดอัจฉริยะ', subtitle: 'พลิก 3 มิติ · จำได้แล้ว/ทบทวนซ้ำ', icon: Layers, bg: 'bg-[#88B3A2]' },
  { id: 'studio', title: 'สนามฝึกเขียน 米字格', subtitle: 'แอนิเมชันขีดจริง + ลากเขียนตาม', icon: PenTool, bg: 'bg-[#D9776C]' },
  { id: 'quiz', title: 'คลังมินิเกม & แบบทดสอบ', subtitle: '6 โหมดจากแบบฝึกหัดในเล่ม', icon: Trophy, bg: 'bg-[#9BA8C7]' },
];

export const OverviewSection: React.FC = () => {
  const { setActiveSection, masteryPercent, masteredCount, totalVocabCount, speak } = useStudy();

  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <motion.section
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="neo-card lattice-frame relative overflow-hidden rounded-3xl p-6 md:p-9"
      >
        <div className="relative z-10 grid items-center gap-6 md:grid-cols-12">
          <div className="space-y-4 md:col-span-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#88B3A2]/35 bg-[#E5F0EB]/80 px-3.5 py-1 text-xs font-semibold text-[#3F6B5B]">
              <span>Chinese XP (体验汉语) · สไลด์ห้องเรียน · สมุดจดสรุป</span>
            </div>
            <h1 className="text-3xl leading-tight font-bold text-[#2F3640] md:text-4xl">
              <span className="font-cn-display block text-[#5F8D7B] md:inline">你好！欢迎复习汉语</span>{' '}
              <span className="mt-1 block text-2xl md:text-3xl">ห้องทบทวนภาษาจีนฉบับสมบูรณ์ 100%</span>
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-[#636E72] md:text-base">
              รวบรวมเนื้อหาทั้งหมดจากหนังสือเรียน สไลด์การสอน และสมุดจดลายมือครบทุกหน้า ทุกตาราง ทุกกฎเปลี่ยนเสียง
              พร้อมเสียงอ่านภาษาจีนกลาง (1.0x / 0.7x), โหมด Active Recall, แฟลชการ์ด 3 มิติ, สนามฝึกเขียนลำดับขีดจริง และแบบทดสอบ 6 โหมด
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => setActiveSection('pinyin')}
                className="inline-flex items-center gap-2 rounded-2xl bg-[#88B3A2] px-5 py-3 text-sm font-semibold text-white shadow-md shadow-[#88B3A2]/30 transition hover:bg-[#5F8D7B] cursor-pointer"
              >
                <span>เริ่มทบทวนตามลำดับ</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => speak('你好！欢迎学习汉语！')}
                className="inline-flex items-center gap-2 rounded-2xl border border-[#88B3A2]/40 bg-white/90 px-4 py-3 text-sm font-medium text-[#2F3640] transition hover:bg-[#E5F0EB] cursor-pointer"
              >
                <Volume2 className="h-4 w-4 text-[#5F8D7B]" />
                <span>ฟังเสียงทักทาย</span>
              </button>
            </div>
          </div>

          {/* Right Mastery & Stats Ornament */}
          <div className="md:col-span-4">
            <div className="rounded-3xl border border-[#88B3A2]/30 bg-gradient-to-br from-[#FFFDF9] to-[#E5F0EB]/60 p-5 text-center shadow-inner">
              <div className="mx-auto flex h-24 w-24 flex-col items-center justify-center rounded-full border-4 border-[#88B3A2]/40 bg-white shadow-sm">
                <span className="text-2xl font-bold text-[#5F8D7B]">{masteryPercent}%</span>
                <span className="text-[10px] font-medium text-[#636E72]">Mastery</span>
              </div>
              <p className="mt-3 text-sm font-semibold text-[#2F3640]">
                จำคำศัพท์ได้แล้ว {masteredCount} / {totalVocabCount} คำ
              </p>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-xl bg-white/85 px-2 py-2">
                  <div className="text-base font-bold text-[#5F8D7B]">23 / 36</div>
                  <div className="text-[10px] text-[#636E72]">พยัญชนะ/สระ</div>
                </div>
                <div className="rounded-xl bg-white/85 px-2 py-2">
                  <div className="text-base font-bold text-[#D9776C]">7 กฎ</div>
                  <div className="text-[10px] text-[#636E72]">เปลี่ยนเสียง</div>
                </div>
                <div className="rounded-xl bg-white/85 px-2 py-2">
                  <div className="text-base font-bold text-[#58678A]">6 โหมด</div>
                  <div className="text-[10px] text-[#636E72]">แบบฝึกหัด</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Interactive Pro Labs Row */}
      <section className="grid gap-4 md:grid-cols-3">
        {LAB_SHORTCUTS.map((lab) => {
          const Icon = lab.icon;
          return (
            <motion.button
              key={lab.id}
              whileHover={{ y: -3 }}
              type="button"
              onClick={() => setActiveSection(lab.id)}
              className="neo-card group flex items-center gap-4 rounded-2xl p-4 text-left transition hover:border-[#88B3A2] cursor-pointer"
            >
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white shadow-sm ${lab.bg}`}>
                <Icon className="h-6 w-6" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-[#2F3640] group-hover:text-[#5F8D7B]">{lab.title}</h3>
                <p className="text-xs text-[#636E72]">{lab.subtitle}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-[#636E72] transition group-hover:translate-x-1 group-hover:text-[#5F8D7B]" />
            </motion.button>
          );
        })}
      </section>

      {/* Learning Roadmap */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#2F3640]">เส้นทางการทบทวนตามลำดับ (Learning Path)</h2>
            <p className="text-xs text-[#636E72]">จัดเรียงจากพื้นฐานเสียงพินอิน กฎเสียง เส้นขีด ตัวเลข คำศัพท์ บทสนทนา และวัฒนธรรม</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {ROADMAP_CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.button
                key={card.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ y: -3 }}
                type="button"
                onClick={() => setActiveSection(card.id)}
                className={`neo-card group flex flex-col justify-between rounded-3xl bg-gradient-to-br p-5 text-left transition hover:border-[#88B3A2] cursor-pointer ${card.accent}`}
              >
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#5F8D7B]">
                      <Icon className="h-3.5 w-3.5" />
                      {card.step}
                    </span>
                    <span className="font-cn text-lg font-semibold text-[#88B3A2]">{card.cn}</span>
                  </div>
                  <h3 className="text-base font-bold text-[#2F3640] group-hover:text-[#5F8D7B]">{card.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#636E72]">{card.desc}</p>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-[#5F8D7B]">
                  <span>เข้าสู่บทเรียน</span>
                  <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                </div>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* Pro Study Tips Banner */}
      <section className="neo-card rounded-3xl p-5">
        <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-[#2F3640]">
          <CheckCircle2 className="h-4 w-4 text-[#5F8D7B]" />
          <span>เทคนิคใช้งานฟีเจอร์ช่วยจำให้ได้ผลสูงสุด</span>
        </h3>
        <div className="grid gap-3 text-xs text-[#636E72] sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl bg-[#FAF6F0] p-3">
            <strong className="block text-[#2F3640]">1. โหมด Active Recall</strong>
            กดปุ่ม “พินอิน” หรือ “คำแปล” บนแถบด้านบนเพื่อเบลอคำตอบทั้งเว็บ แล้วลองนึกก่อนคลิกเฉลยทีละคำ
          </div>
          <div className="rounded-2xl bg-[#FAF6F0] p-3">
            <strong className="block text-[#2F3640]">2. ฝึกฟังเสียง 0.7x / 1.0x</strong>
            ทุกคำศัพท์ พินอิน และประโยคมีปุ่มลำโพงภาษาจีนกลาง สลับความเร็วช้า 0.7x เพื่อแยกเสียงวรรณยุกต์ได้ชัดขึ้น
          </div>
          <div className="rounded-2xl bg-[#FAF6F0] p-3">
            <strong className="block text-[#2F3640]">3. ลากเขียนใน 米字格</strong>
            กดปุ่มรูปพู่กันบนคำศัพท์ใดก็ได้เพื่อกระโดดไปดูแอนิเมชันลำดับขีดและลองลากเส้นตามจริง
          </div>
          <div className="rounded-2xl bg-[#FAF6F0] p-3">
            <strong className="block text-[#2F3640]">4. ค้นหาทันใจ Ctrl + K</strong>
            พิมพ์ได้ทั้งจีน (你好) พินอินไม่ใส่วรรณยุกต์ (nihao) หรือไทย (แซ่ตั้ง) เพื่อค้นหาข้ามทั้งเว็บ
          </div>
        </div>
      </section>
    </div>
  );
};
