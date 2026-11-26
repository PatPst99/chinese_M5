import type { SandhiExample } from '../types';

export const TONE_MARK_PRIORITY = {
  title: 'กฎที่ 1: ตำแหน่งการใส่เครื่องหมายวรรณยุกต์',
  source: 'โน้ตสรุป (u16_01) & สมุดจด (foods_21, 22)',
  order: ['a', 'o', 'e', 'i', 'u', 'ü'],
  summaryTH:
    'ใส่วรรณยุกต์ไว้บนสระเดี่ยวที่มาก่อนตามลำดับ a → o → e → i → u → ü (เช่น áo ใส่บน a, ōu ใส่บน o, èi ใส่บน e)',
  exceptionTH:
    'ข้อยกเว้นสำคัญ (วงกลมเน้นในสมุดจด): เมื่อ i กับ u อยู่คู่กัน (iu และ ui) ให้ใส่วรรณยุกต์บน “ตัวหลัง” เสมอ! เช่น liù, iū, huī, uì — และเมื่อใส่วรรณยุกต์บน i ให้ตัดจุดด้านบนออก',
  examples: [
    { pair: 'a + o', result: 'áo', why: 'a มาก่อน o จึงใส่บน a' },
    { pair: 'a + i', result: 'ài', why: 'a มาก่อน i จึงใส่บน a' },
    { pair: 'o + u', result: 'ōu', why: 'o มาก่อน u จึงใส่บน o' },
    { pair: 'i + e', result: 'ié', why: 'e มาก่อน i จึงใส่บน e' },
    { pair: 'i + u', result: 'iū', why: 'ข้อยกเว้น iu → ใส่บนตัวหลัง (u)' },
    { pair: 'u + i', result: 'huī', why: 'ข้อยกเว้น ui → ใส่บนตัวหลัง (i) และตัดจุด' },
  ],
};

export const SPECIAL_I_RULE = {
  title: 'กฎที่ 2: พยัญชนะ 7 ตัว + สระ i (เปลี่ยนเสียงเป็น “อือ”)',
  source: 'สมุดจด (foods_21) & สไลด์ (foods_30)',
  initialsRow1: ['zh', 'ch', 'sh', 'r'],
  initialsRow2: ['z', 'c', 's'],
  summaryTH:
    'เมื่อพยัญชนะกลุ่มลิ้นม้วน (zh, ch, sh, r) และกลุ่มฟัน (z, c, s) ประสมกับสระ i เสียงของ i จะเปลี่ยนจาก “อี” เป็น “อือ” ทันที',
  examples: [
    { hanzi: '知', pinyin: 'zhī', readTH: 'จรือ', thai: 'รู้' },
    { hanzi: '吃', pinyin: 'chī', readTH: 'ชรือ', thai: 'กิน' },
    { hanzi: '是', pinyin: 'shì', readTH: 'ซรื่อ', thai: 'เป็น, คือ, ใช่' },
    { hanzi: '十', pinyin: 'shí', readTH: 'ซรื๋อ', thai: 'สิบ' },
    { hanzi: '日', pinyin: 'rì', readTH: 'ยรื่อ', thai: 'พระอาทิตย์, วัน' },
    { hanzi: '字', pinyin: 'zì', readTH: 'จื้อ', thai: 'ตัวอักษร' },
    { hanzi: '词', pinyin: 'cí', readTH: 'ชื๋อ', thai: 'คำศัพท์' },
    { hanzi: '四', pinyin: 'sì', readTH: 'ซื่อ', thai: 'สี่' },
  ],
};

export const UMLAUT_RULE = {
  title: 'กฎที่ 3: การตัดจุดสองจุดบนสระ ü',
  source: 'โน้ตสรุป (u16_01), สมุดจด (foods_22) & สไลด์ (foods_31)',
  dropRuleTH: 'ü + j, q, x, y → ต้องตัดจุดสองจุดที่อยู่ข้างบนออก (เขียนเป็น u แต่ออกเสียง อวี เหมือนเดิม!)',
  keepRuleTH: 'ü + n, l → ไม่สามารถละจุดสองจุดข้างบนได้ (ต้องคงรูป ü ไว้ เพื่อแยกจาก nu, lu)',
  headers: ['ü', 'üe', 'üan', 'ün'],
  // Full matrix copied 100% from slide foods_31
  matrix: [
    { initial: 'n', keepDots: true, cells: ['nü', 'nüe', null, null], samples: ['女', '虐', null, null] },
    { initial: 'l', keepDots: true, cells: ['lü', 'lüe', null, null], samples: ['绿', '略', null, null] },
    { initial: 'j', keepDots: false, cells: ['ju', 'jue', 'juan', 'jun'], samples: ['居', '觉', '娟', '军'] },
    { initial: 'q', keepDots: false, cells: ['qu', 'que', 'quan', 'qun'], samples: ['去', '缺', '全', '群'] },
    { initial: 'x', keepDots: false, cells: ['xu', 'xue', 'xuan', 'xun'], samples: ['徐', '学', '选', '寻'] },
    { initial: 'y', keepDots: false, cells: ['yu', 'yue', 'yuan', 'yun'], samples: ['鱼', '月', '元', '云'] },
  ],
};

// All 6 third-tone sandhi examples from foods_08 + u16_01
export const THIRD_TONE_SANDHI: {
  title: string;
  ruleTH: string;
  noteTH: string;
  examples: SandhiExample[];
} = {
  title: 'กฎที่ 4: เสียง 3 ชนเสียง 3 (Third Tone Sandhi)',
  ruleTH: 'เสียง 3 (ˇ) ชนกัน 2 เสียงติดกัน → ตัวข้างหน้า “อ่านออกเสียงเป็นเสียง 2 (ˊ)” แต่ “รูปพินอินเขียนเหมือนเดิม”',
  noteTH: 'จำง่ายๆ: 3 + 3 → อ่าน 2 + 3 (เขียน 3 + 3)',
  examples: [
    { hanzi: '你好', writtenPinyin: 'nǐ hǎo', spokenPinyin: 'ní hǎo', thai: 'สวัสดี' },
    { hanzi: '小鸟', writtenPinyin: 'xiǎo niǎo', spokenPinyin: 'xiáo niǎo', thai: 'นกตัวเล็ก (เล็ก + นก)' },
    { hanzi: '小狗', writtenPinyin: 'xiǎo gǒu', spokenPinyin: 'xiáo gǒu', thai: 'หมาตัวเล็ก (เล็ก + หมา)' },
    { hanzi: '几点', writtenPinyin: 'jǐ diǎn', spokenPinyin: 'jí diǎn', thai: 'กี่โมง' },
    { hanzi: '很好', writtenPinyin: 'hěn hǎo', spokenPinyin: 'hén hǎo', thai: 'ดีมาก (มาก + ดี)' },
    { hanzi: '很冷', writtenPinyin: 'hěn lěng', spokenPinyin: 'hén lěng', thai: 'หนาวมาก (มาก + หนาว)' },
  ],
};

// All 12 一 (yī) tone change examples from foods_08
export const YI_SANDHI: {
  title: string;
  ruleTo4TH: string;
  ruleTo2TH: string;
  examples: SandhiExample[];
} = {
  title: 'กฎที่ 5: การเปลี่ยนเสียงของ 一 (yī = หนึ่ง)',
  ruleTo4TH: 'yī + เสียง 1 (¯) / เสียง 2 (ˊ) / เสียง 3 (ˇ) → เปลี่ยนเป็นเสียง 4 (yì)',
  ruleTo2TH: 'yī + เสียง 4 (ˋ) → เปลี่ยนเป็นเสียง 2 (yí)',
  examples: [
    { hanzi: '一天', writtenPinyin: 'yì tiān', spokenPinyin: 'yì tiān', thai: 'หนึ่งวัน', followingTone: 1 },
    { hanzi: '一边', writtenPinyin: 'yìbiān', spokenPinyin: 'yìbiān', thai: 'ด้านหนึ่ง / พลาง', followingTone: 1 },
    { hanzi: '一些', writtenPinyin: 'yìxiē', spokenPinyin: 'yìxiē', thai: 'จำนวนหนึ่ง / บ้าง', followingTone: 1, note: 'โน้ตในชีท: จำน.' },

    { hanzi: '一直', writtenPinyin: 'yìzhí', spokenPinyin: 'yìzhí', thai: 'ตลอด / ตรงไปเรื่อยๆ', followingTone: 2 },
    { hanzi: '一头', writtenPinyin: 'yì tóu', spokenPinyin: 'yì tóu', thai: 'หนึ่งตัว (สัตว์ใหญ่) / ข้างหนึ่ง', followingTone: 2 },
    { hanzi: '一名', writtenPinyin: 'yì míng', spokenPinyin: 'yì míng', thai: 'หนึ่งคน / หนึ่งตำแหน่ง', followingTone: 2 },

    { hanzi: '一起', writtenPinyin: 'yìqǐ', spokenPinyin: 'yìqǐ', thai: 'ด้วยกัน', followingTone: 3 },
    { hanzi: '一把', writtenPinyin: 'yì bǎ', spokenPinyin: 'yì bǎ', thai: 'หนึ่งด้าม / หนึ่งคัน', followingTone: 3 },
    { hanzi: '一口', writtenPinyin: 'yì kǒu', spokenPinyin: 'yì kǒu', thai: 'หนึ่งคำ / หนึ่งปาก', followingTone: 3 },

    { hanzi: '一样', writtenPinyin: 'yíyàng', spokenPinyin: 'yíyàng', thai: 'เหมือนกัน', followingTone: 4 },
    { hanzi: '一个', writtenPinyin: 'yí gè', spokenPinyin: 'yí gè', thai: 'หนึ่งอัน / หนึ่งคน', followingTone: 4 },
    { hanzi: '一下', writtenPinyin: 'yíxià', spokenPinyin: 'yíxià', thai: 'สักครู่ / สักหน่อย', followingTone: 4 },
  ],
};

// All 12 不 (bù = ไม่) tone change examples from foods_08
export const BU_SANDHI: {
  title: string;
  ruleKeep4TH: string;
  ruleTo2TH: string;
  examples: SandhiExample[];
} = {
  title: 'กฎที่ 6: การเปลี่ยนเสียงของ 不 (bù = ไม่)',
  ruleKeep4TH: 'bù + เสียง 1 (¯) / เสียง 2 (ˊ) / เสียง 3 (ˇ) → อ่านเสียง 4 (bù) คงเดิม',
  ruleTo2TH: 'bù + เสียง 4 (ˋ) → เปลี่ยนเป็นเสียง 2 (bú)',
  examples: [
    { hanzi: '不高', writtenPinyin: 'bù gāo', spokenPinyin: 'bù gāo', thai: 'ไม่สูง', followingTone: 1 },
    { hanzi: '不吃', writtenPinyin: 'bù chī', spokenPinyin: 'bù chī', thai: 'ไม่กิน', followingTone: 1 },
    { hanzi: '不喝', writtenPinyin: 'bù hē', spokenPinyin: 'bù hē', thai: 'ไม่ดื่ม', followingTone: 1 },

    { hanzi: '不长', writtenPinyin: 'bù cháng', spokenPinyin: 'bù cháng', thai: 'ไม่ยาว', followingTone: 2 },
    { hanzi: '不忙', writtenPinyin: 'bù máng', spokenPinyin: 'bù máng', thai: 'ไม่ยุ่ง', followingTone: 2 },
    { hanzi: '不凉', writtenPinyin: 'bù liáng', spokenPinyin: 'bù liáng', thai: 'ไม่เย็น', followingTone: 2 },

    { hanzi: '不好', writtenPinyin: 'bù hǎo', spokenPinyin: 'bù hǎo', thai: 'ไม่ดี', followingTone: 3 },
    { hanzi: '不小', writtenPinyin: 'bù xiǎo', spokenPinyin: 'bù xiǎo', thai: 'ไม่เล็ก', followingTone: 3 },
    { hanzi: '不美', writtenPinyin: 'bù měi', spokenPinyin: 'bù měi', thai: 'ไม่สวย', followingTone: 3 },

    { hanzi: '不大', writtenPinyin: 'bú dà', spokenPinyin: 'bú dà', thai: 'ไม่ใหญ่', followingTone: 4 },
    { hanzi: '不是', writtenPinyin: 'bú shì', spokenPinyin: 'bú shì', thai: 'ไม่เป็น / ไม่คือ / ไม่ใช่', followingTone: 4 },
    { hanzi: '不热', writtenPinyin: 'bú rè', spokenPinyin: 'bú rè', thai: 'ไม่ร้อน', followingTone: 4 },
  ],
};

// All 16 Neutral Tone (轻声) examples from foods_08 bottom block
export const NEUTRAL_TONE_WORDS: { hanzi: string; pinyin: string; thai: string; note?: string }[] = [
  { hanzi: '妈妈', pinyin: 'māma', thai: 'แม่' },
  { hanzi: '爷爷', pinyin: 'yéye', thai: 'คุณปู่' },
  { hanzi: '奶奶', pinyin: 'nǎinai', thai: 'คุณย่า' },
  { hanzi: '谢谢', pinyin: 'xièxie', thai: 'ขอบคุณ' },
  { hanzi: '哥哥', pinyin: 'gēge', thai: 'พี่ชาย' },
  { hanzi: '头发', pinyin: 'tóufa', thai: 'เส้นผม' },
  { hanzi: '姐姐', pinyin: 'jiějie', thai: 'พี่สาว' },
  { hanzi: '爸爸', pinyin: 'bàba', thai: 'พ่อ' },
  {
    hanzi: '桌子',
    pinyin: 'zhuōzi',
    thai: 'โต๊ะ',
    note: 'ระวัง! ในชีทจดไว้ว่า “เก้าอี้” แต่ 桌子 แปลว่า “โต๊ะ” ส่วนเก้าอี้คือ 椅子 (yǐzi)',
  },
  { hanzi: '鼻子', pinyin: 'bízi', thai: 'จมูก' },
  { hanzi: '本子', pinyin: 'běnzi', thai: 'สมุด' },
  { hanzi: '弟弟', pinyin: 'dìdi', thai: 'น้องชาย' },
  { hanzi: '他们', pinyin: 'tāmen', thai: 'พวกเขา (เขา + พวก)' },
  { hanzi: '石头', pinyin: 'shítou', thai: 'ก้อนหิน' },
  { hanzi: '你们', pinyin: 'nǐmen', thai: 'พวกคุณ' },
  { hanzi: '妹妹', pinyin: 'mèimei', thai: 'น้องสาว' },
];
