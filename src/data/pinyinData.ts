import type { ToneInfo, SimpleVowel, CompoundVowel, InitialConsonant } from '../types';

export const PINYIN_OVERVIEW = {
  titleCN: '拼音的结构',
  titleTH: 'องค์ประกอบของพินอิน',
  parts: [
    {
      num: 1,
      cn: '声母',
      pinyin: 'shēngmǔ',
      th: 'พยัญชนะ 23 เสียง',
      detail: 'แบ่งเป็นพยัญชนะแท้ 21 เสียง และพยัญชนะกึ่งสระ 2 เสียง (y, w)',
      color: 'jade',
    },
    {
      num: 2,
      cn: '韵母',
      pinyin: 'yùnmǔ',
      th: 'สระ 36 เสียง',
      detail: 'แบ่งเป็น สระเดี่ยว 6 เสียง (a o e i u ü) และ สระประสม 30 เสียง',
      color: 'indigo',
    },
    {
      num: 3,
      cn: '声调',
      pinyin: 'shēngdiào',
      th: 'วรรณยุกต์ 4 เสียง (+ เสียงเบา 1 เสียง)',
      detail: 'เสียงวรรณยุกต์ต่างกัน ความหมายของคำก็ต่างกันด้วย',
      color: 'vermilion',
    },
  ],
};

export const TONE_INTRO = {
  cn: '汉语普通话里有四个声调和一个轻声，它们能表示不同的意义，四个声调分别用四个声调符号来表示。',
  th: 'ภาษาจีนมีเสียงวรรณยุกต์ 4 เสียงและเสียงเบา 1 เสียง เมื่อเสียงวรรณยุกต์ต่างกัน ความหมายของคำก็ต่างกันด้วย เสียงวรรณยุกต์ 4 เสียงกำกับด้วยเครื่องหมายวรรณยุกต์ 4 ตัว',
};

export const TONES: ToneInfo[] = [
  {
    id: 1,
    nameCN: '第一声 (阴平)',
    nameTH: 'เสียงที่ 1',
    mark: '¯',
    pitchCode: '55',
    thaiCompare: 'เสียงสามัญ (สูงคงที่)',
    exampleSyllable: 'ā',
    exampleScene: 'คุณหมอตรวจคอ ให้อ้าปากร้อง "อาาา" ระดับเสียงสูงคงที่',
    maHanzi: '妈',
    maPinyin: 'mā',
    maThai: 'แม่',
    description: 'ลากเสียงสูงและสม่ำเสมอ ไม่ขึ้นไม่ลง (ระดับ 5→5)',
    color: '#88B3A2',
  },
  {
    id: 2,
    nameCN: '第二声 (阳平)',
    nameTH: 'เสียงที่ 2',
    mark: 'ˊ',
    pitchCode: '35',
    thaiCompare: 'เสียงจัตวา',
    exampleSyllable: 'á',
    exampleScene: 'ทำหน้าสงสัยถามว่า "อ๋า?" ระดับเสียงไล่ขึ้นสูง',
    maHanzi: '麻',
    maPinyin: 'má',
    maThai: 'เชือก (ป่าน)',
    description: 'ออกเสียงจากระดับกลางแล้วตวัดขึ้นสูงทันที (ระดับ 3→5)',
    color: '#9BA8C7',
  },
  {
    id: 3,
    nameCN: '第三声 (上声)',
    nameTH: 'เสียงที่ 3',
    mark: 'ˇ',
    pitchCode: '214',
    thaiCompare: 'เสียงเอก (กดต่ำแล้วตวัดขึ้น)',
    exampleSyllable: 'ǎ',
    exampleScene: 'ท่าทางประหลาดใจ/ครุ่นคิด "อ่าา..." เสียงกดลงต่ำแล้วโค้งขึ้น',
    maHanzi: '马',
    maPinyin: 'mǎ',
    maThai: 'ม้า',
    description: 'กดเสียงลงต่ำที่สุดแล้วค่อยตวัดขึ้นท้าย (ระดับ 2→1→4)',
    color: '#E5B25D',
  },
  {
    id: 4,
    nameCN: '第四声 (去声)',
    nameTH: 'เสียงที่ 4',
    mark: 'ˋ',
    pitchCode: '51',
    thaiCompare: 'เสียงโท (หนักและสั้น)',
    exampleSyllable: 'à',
    exampleScene: 'ตกใจเห็นฉลามร้อง "อ้า!" เสียงตกลงอย่างรวดเร็วและหนักแน่น',
    maHanzi: '骂',
    maPinyin: 'mà',
    maThai: 'ด่า',
    description: 'เริ่มจากเสียงสูงแล้วทิ้งลงต่ำสุดอย่างรวดเร็วเด็ดขาด (ระดับ 5→1)',
    color: '#D9776C',
  },
  {
    id: 5,
    nameCN: '轻声',
    nameTH: 'เสียงเบา (ไม่มีเครื่องหมาย)',
    mark: '·',
    pitchCode: 'เบา',
    thaiCompare: 'ออกเสียงสั้นและเบา',
    exampleSyllable: 'ma',
    exampleScene: 'มักอยู่พยางค์หลังของคำซ้ำหรือคำลงท้าย เช่น 妈妈 (māma), 谢谢 (xièxie)',
    maHanzi: '吗',
    maPinyin: 'ma',
    maThai: 'ไหม (คำลงท้ายคำถาม)',
    description: 'ไม่มีรูปวรรณยุกต์กำกับ ออกเสียงสั้น นุ่ม และเบากว่าปกติ',
    color: '#8E99A2',
  },
];

export const TONE_ACTIVITIES = [
  {
    cn: '抽卡片，学发音',
    th: 'จับฉลากแล้วอ่านตาม (p.13)',
    detail: 'สุ่มหยิบบัตรเสียงวรรณยุกต์ทั้ง 4 (ā, á, ǎ, à) เพื่อฝึกออกเสียงและจำลำดับ 1 ¯ · 2 ˊ · 3 ˇ · 4 ˋ',
  },
  {
    cn: '玩一玩，做“传话游戏”',
    th: 'มาเล่นกันเถอะ “เกมส่งต่อคำพูด” (p.13)',
    detail: 'กระซิบคำหรือพยางค์ที่มีเสียงวรรณยุกต์ต่อกันเป็นแถว เพื่อทดสอบความแม่นยำในการฟังและออกเสียงวรรณยุกต์',
  },
];

export const SIMPLE_VOWELS: SimpleVowel[] = [
  {
    letter: 'a',
    thaiSound: 'อา',
    mnemonic: 'เด็กอ้าปากกว้างร้อง (ภาพ p.14)',
    mouthTip: 'อ้าปากให้กว้างที่สุด ลิ้นวางราบต่ำ (ภาพรูปปาก p.32)',
    speakText: '啊',
    tones: ['ā', 'á', 'ǎ', 'à'],
  },
  {
    letter: 'o',
    thaiSound: 'ออ',
    mnemonic: 'ไก่โต้งขันเสียงดัง (ภาพ p.14)',
    mouthTip: 'ห่อริมฝีปากเป็นวงกลมขนาดกลาง เสียงก้องในลำคอ',
    speakText: '喔',
    tones: ['ō', 'ó', 'ǒ', 'ò'],
  },
  {
    letter: 'e',
    thaiSound: 'เออ',
    mnemonic: 'ห่านว่ายน้ำ 鹅 é (ภาพ p.14)',
    mouthTip: 'เปิดปากเล็กน้อย ริมฝีปากแบะออกเหมือนยิ้มบางๆ โคนลิ้นยก',
    speakText: '鹅',
    tones: ['ē', 'é', 'ě', 'è'],
  },
  {
    letter: 'i',
    thaiSound: 'อี',
    mnemonic: 'เสื้อเชิ้ต 衣服 yīfu (ภาพ p.14)',
    mouthTip: 'เหยียดมุมปากออกด้านข้าง ฟันบนล่างเกือบชิดกัน',
    speakText: '衣',
    tones: ['ī', 'í', 'ǐ', 'ì'],
  },
  {
    letter: 'u',
    thaiSound: 'อู',
    mnemonic: 'บ้านหลังน้อย 屋 wū (ภาพ p.14)',
    mouthTip: 'ห่อริมฝีปากเป็นรูกลมเล็กและยื่นไปข้างหน้า',
    speakText: '乌',
    tones: ['ū', 'ú', 'ǔ', 'ù'],
  },
  {
    letter: 'ü',
    thaiSound: 'อวี',
    mnemonic: 'ปลาว่ายน้ำ 鱼 yú (ภาพ p.14)',
    mouthTip: 'ทำรูปปากห่อกลมเล็กเหมือนเป่านกหวีด (รูปปาก u) แต่เปล่งเสียง "อี"',
    speakText: '迂',
    tones: ['ǖ', 'ǘ', 'ǚ', 'ǜ'],
  },
];

export const VOWEL_SONG = {
  titleCN: '唱一唱，汉语韵母歌',
  titleTH: 'ร้องเพลงสระภาษาจีนกันเถอะ (p.15)',
  lines: [
    { text: 'a o e i u ü', speak: '啊 喔 鹅 衣 乌 迂' },
    { text: 'a ā á ǎ à   o ō ó ǒ ò', speak: '啊 啊 啊 啊，喔 喔 喔 喔' },
    { text: 'e ē é ě è   i ī í ǐ ì', speak: '鹅 鹅 鹅 鹅，衣 移 椅 意' },
    { text: 'u ū ú ǔ ù   ü ǖ ǘ ǚ ǜ', speak: '乌 吴 五 物，迂 鱼 雨 玉' },
    {
      text: 'a o e i u ü   tǐ yàn hàn yǔ hǎo kuài lè',
      speak: '体验汉语好快乐',
      translation: '体验汉语好快乐 — สนุกกับการเรียนรู้ภาษาจีน!',
    },
  ],
  gameNote: {
    cn: '玩一玩，你是不是该站起来？',
    th: 'เล่นเกม “ถึงตาเธอลุกขึ้นยืนหรือยัง” (p.15) — แบ่งโต๊ะเป็นกลุ่มสระ (a o e i u ü) และวรรณยุกต์ (¯ ˊ ˇ ˋ) เมื่อครูออกเสียงเช่น “ǒ” คนที่ถือป้าย o และ ˇ ต้องลุกขึ้นยืนพร้อมกัน!',
  },
};

// All 30 compound finals exactly matching handwritten notes (foods_22) + slides (foods_32-33) + book highlight (foods_05/u16_06)
export const COMPOUND_VOWELS: CompoundVowel[] = [
  // กลุ่ม a (4)
  { final: 'ai', group: 'a', thaiSound: 'ไอ', speakSample: '爱' },
  { final: 'ao', group: 'a', thaiSound: 'เอา', speakSample: '奥' },
  { final: 'an', group: 'a', thaiSound: 'อัน', speakSample: '安' },
  { final: 'ang', group: 'a', thaiSound: 'อัง', speakSample: '昂' },
  // กลุ่ม o (2)
  { final: 'ou', group: 'o', thaiSound: 'โอว', speakSample: '欧' },
  { final: 'ong', group: 'o', thaiSound: 'อง', speakSample: '翁' },
  // กลุ่ม e (4) - red highlight in u16_06
  { final: 'er', group: 'e', thaiSound: 'เออร์', speakSample: '二', isBookRedHighlight: true, note: 'ม้วนปลายลิ้นขึ้นเล็กน้อย' },
  { final: 'ei', group: 'e', thaiSound: 'เอย', speakSample: '诶', isBookRedHighlight: true },
  { final: 'en', group: 'e', thaiSound: 'เอิน', speakSample: '恩', isBookRedHighlight: true },
  { final: 'eng', group: 'e', thaiSound: 'เอิง', speakSample: '哼', isBookRedHighlight: true },
  // กลุ่ม i (9)
  { final: 'ia', group: 'i', thaiSound: 'เอีย', speakSample: '呀' },
  { final: 'iao', group: 'i', thaiSound: 'เอียว', speakSample: '腰' },
  { final: 'ie', group: 'i', thaiSound: 'เอีย (อี+เอ)', speakSample: '耶', note: 'สมุดจดเน้น: อี + เอ' },
  { final: 'iu', group: 'i', thaiSound: 'อิว', speakSample: '优', isCircledSpecial: true, note: 'วงกลมเน้นพิเศษ! ใส่วรรณยุกต์บนตัวหลัง (u) เช่น iū' },
  { final: 'ian', group: 'i', thaiSound: 'เอียน', speakSample: '烟' },
  { final: 'in', group: 'i', thaiSound: 'อิน', speakSample: '音' },
  { final: 'iang', group: 'i', thaiSound: 'เอียง', speakSample: '央' },
  { final: 'ing', group: 'i', thaiSound: 'อิง', speakSample: '英' },
  { final: 'iong', group: 'i', thaiSound: 'อีอง', speakSample: '拥' },
  // กลุ่ม u (8)
  { final: 'ua', group: 'u', thaiSound: 'อวา', speakSample: '蛙' },
  { final: 'uo', group: 'u', thaiSound: 'อัว', speakSample: '窝' },
  { final: 'uai', group: 'u', thaiSound: 'อวาย', speakSample: '歪' },
  { final: 'ui', group: 'u', thaiSound: 'อุย', speakSample: '威', isCircledSpecial: true, note: 'วงกลมเน้นพิเศษ! ใส่วรรณยุกต์บนตัวหลัง (i) เช่น huī' },
  { final: 'uan', group: 'u', thaiSound: 'อวน', speakSample: '弯' },
  { final: 'un', group: 'u', thaiSound: 'อุน', speakSample: '温' },
  { final: 'uang', group: 'u', thaiSound: 'อวาง', speakSample: '汪' },
  { final: 'ueng', group: 'u', thaiSound: 'เวิง', speakSample: '翁' },
  // กลุ่ม ü (3)
  { final: 'üe', group: 'ü', thaiSound: 'เยว', speakSample: '约' },
  { final: 'üan', group: 'ü', thaiSound: 'เยวียน', speakSample: '冤' },
  { final: 'ün', group: 'ü', thaiSound: 'ยวิน', speakSample: '晕' },
];

// Exact tone-placement worksheet answers from foods_05 / u16_06
export const TONE_PLACEMENT_WORKSHEET: {
  row: number;
  items: { display: string; bigVowel: string; rest: string; bigPosition: 'first' | 'second'; speak: string }[];
}[] = [
  {
    row: 1,
    items: [
      { display: 'ài', bigVowel: 'à', rest: 'i', bigPosition: 'first', speak: '爱' },
      { display: 'áo', bigVowel: 'á', rest: 'o', bigPosition: 'first', speak: '熬' },
      { display: 'ān', bigVowel: 'ā', rest: 'n', bigPosition: 'first', speak: '安' },
      { display: 'áng', bigVowel: 'á', rest: 'ng', bigPosition: 'first', speak: '昂' },
    ],
  },
  {
    row: 2,
    items: [
      { display: 'ōu', bigVowel: 'ō', rest: 'u', bigPosition: 'first', speak: '欧' },
      { display: 'ōng', bigVowel: 'ō', rest: 'ng', bigPosition: 'first', speak: '翁' },
    ],
  },
  {
    row: 3,
    items: [
      { display: 'èi', bigVowel: 'è', rest: 'i', bigPosition: 'first', speak: '诶' },
      { display: 'én', bigVowel: 'é', rest: 'n', bigPosition: 'first', speak: '恩' },
      { display: 'ěng', bigVowel: 'ě', rest: 'ng', bigPosition: 'first', speak: '哼' },
      { display: 'èr', bigVowel: 'è', rest: 'r', bigPosition: 'first', speak: '二' },
    ],
  },
  {
    row: 4,
    items: [
      { display: 'iū', bigVowel: 'ū', rest: 'i', bigPosition: 'second', speak: '优' },
      { display: 'ié', bigVowel: 'é', rest: 'i', bigPosition: 'second', speak: '爷' },
      { display: 'iā', bigVowel: 'ā', rest: 'i', bigPosition: 'second', speak: '呀' },
      { display: 'ín', bigVowel: 'í', rest: 'n', bigPosition: 'first', speak: '银' },
      { display: 'ǐng', bigVowel: 'ǐ', rest: 'ng', bigPosition: 'first', speak: '影' },
      { display: 'uì', bigVowel: 'ì', rest: 'u', bigPosition: 'second', speak: '位' },
    ],
  },
  {
    row: 5,
    items: [
      { display: 'uó', bigVowel: 'ó', rest: 'u', bigPosition: 'second', speak: '我' },
      { display: 'uā', bigVowel: 'ā', rest: 'u', bigPosition: 'second', speak: '蛙' },
      { display: 'ūn', bigVowel: 'ū', rest: 'n', bigPosition: 'first', speak: '温' },
    ],
  },
  {
    row: 6,
    items: [
      { display: 'üè', bigVowel: 'è', rest: 'ü', bigPosition: 'second', speak: '月' },
      { display: 'ǖn', bigVowel: 'ǖ', rest: 'n', bigPosition: 'first', speak: '晕' },
    ],
  },
];

// All 23 initials with exact Thai readings from handwritten notes (foods_21) & slides (foods_26-27)
export const INITIALS: InitialConsonant[] = [
  { letter: 'b', thaiSound: 'โป', group: 'labial', groupTH: 'เสียงริมฝีปาก', speakSample: '波' },
  { letter: 'p', thaiSound: 'โพ', group: 'labial', groupTH: 'เสียงริมฝีปาก', speakSample: '坡' },
  { letter: 'm', thaiSound: 'โม', group: 'labial', groupTH: 'เสียงริมฝีปาก', speakSample: '摸' },
  { letter: 'f', thaiSound: 'โฟ', group: 'labial', groupTH: 'เสียงริมฝีปาก', speakSample: '佛' },

  { letter: 'd', thaiSound: 'เตอ', group: 'alveolar', groupTH: 'เสียงปลายลิ้นแตะปุ่มเหงือก', speakSample: '得' },
  { letter: 't', thaiSound: 'เทอ', group: 'alveolar', groupTH: 'เสียงปลายลิ้นแตะปุ่มเหงือก', speakSample: '特' },
  { letter: 'n', thaiSound: 'เนอ', group: 'alveolar', groupTH: 'เสียงปลายลิ้นแตะปุ่มเหงือก', speakSample: '讷', keepsUmlaut: true },
  { letter: 'l', thaiSound: 'เลอ', group: 'alveolar', groupTH: 'เสียงปลายลิ้นแตะปุ่มเหงือก', speakSample: '勒', keepsUmlaut: true },

  { letter: 'g', thaiSound: 'เกอ', group: 'velar', groupTH: 'เสียงโคนลิ้น', speakSample: '哥' },
  { letter: 'k', thaiSound: 'เคอ', group: 'velar', groupTH: 'เสียงโคนลิ้น', speakSample: '科' },
  { letter: 'h', thaiSound: 'เฮอ', group: 'velar', groupTH: 'เสียงโคนลิ้น', speakSample: '喝' },

  { letter: 'j', thaiSound: 'จี', group: 'palatal', groupTH: 'เสียงหน้าลิ้น', speakSample: '基', dropsUmlaut: true },
  { letter: 'q', thaiSound: 'ชี', group: 'palatal', groupTH: 'เสียงหน้าลิ้น', speakSample: '欺', dropsUmlaut: true },
  { letter: 'x', thaiSound: 'ซี', group: 'palatal', groupTH: 'เสียงหน้าลิ้น', speakSample: '希', dropsUmlaut: true },

  { letter: 'zh', thaiSound: 'จรือ', group: 'retroflex', groupTH: 'เสียงม้วนลิ้น', speakSample: '知', changesItoUe: true },
  { letter: 'ch', thaiSound: 'ชรือ', group: 'retroflex', groupTH: 'เสียงม้วนลิ้น', speakSample: '吃', changesItoUe: true },
  { letter: 'sh', thaiSound: 'ซรือ', group: 'retroflex', groupTH: 'เสียงม้วนลิ้น', speakSample: '诗', changesItoUe: true },
  { letter: 'r', thaiSound: 'ยรือ', group: 'retroflex', groupTH: 'เสียงม้วนลิ้น', speakSample: '日', changesItoUe: true },

  { letter: 'z', thaiSound: 'จือ', group: 'dental', groupTH: 'เสียงปลายลิ้นแตะไรฟัน', speakSample: '资', changesItoUe: true },
  { letter: 'c', thaiSound: 'ชือ', group: 'dental', groupTH: 'เสียงปลายลิ้นแตะไรฟัน', speakSample: '雌', changesItoUe: true },
  { letter: 's', thaiSound: 'ซือ', group: 'dental', groupTH: 'เสียงปลายลิ้นแตะไรฟัน', speakSample: '思', changesItoUe: true },

  { letter: 'y', thaiSound: 'อี๋', group: 'semivowel', groupTH: 'พยัญชนะกึ่งสระ', speakSample: '衣', isSemiVowel: true, dropsUmlaut: true },
  { letter: 'w', thaiSound: 'อู', group: 'semivowel', groupTH: 'พยัญชนะกึ่งสระ', speakSample: '乌', isSemiVowel: true },
];

export const INITIALS_SONG = {
  titleCN: '唱一唱，汉语声母歌',
  titleTH: 'ร้องเพลงพยัญชนะภาษาจีนกันเถอะ (foods_06)',
  lines: [
    { text: 'a o e i u ü', speak: '啊 喔 鹅 衣 乌 迂' },
    { text: 'b p m f   d t n l', speak: '波 坡 摸 佛，得 特 讷 勒' },
    { text: 'g k h   j q x', speak: '哥 科 喝，基 欺 希' },
    { text: 'zh ch sh r   z c s', speak: '知 吃 诗 日，资 雌 思', note: 'หมายเหตุ: ในใบงานพิมพ์ตก sh เป็น zh แต่ลำดับที่ถูกต้องคือ zh ch sh r z c s' },
    { text: 'nǐ lái chàng / wǒ lái chàng', speak: '你来唱，我来唱', translation: 'เธอมาร้อง / ฉันมาร้อง (โน้ตในชีท: ฉัน มาร้อง)' },
    { text: 'a o e de gē', speak: 'a o e 的歌', translation: 'เพลงของ a o e (โน้ตในชีท: ของ เพลง)' },
  ],
};

// Spelling Formula Cards directly from slides foods_34 - foods_43
export const SPELLING_SLIDE_CARDS = [
  { formula: 'b + à = bà', hanzi: '爸爸', pinyin: 'bàba', thai: 'พ่อ', accent: 'jade' },
  { formula: 'g + ē = gē', hanzi: '哥哥', pinyin: 'gēge', thai: 'พี่ชาย', accent: 'indigo' },
  { formula: 'd + ì = dì', hanzi: '弟弟', pinyin: 'dìdi', thai: 'น้องชาย', accent: 'peach' },
  { formula: 'ch + ī = chī', hanzi: '吃', pinyin: 'chī', thai: 'กิน', accent: 'lantern' },
  { formula: 'sh + ū = shū', hanzi: '书', pinyin: 'shū', thai: 'หนังสือ', accent: 'jade' },
  { formula: 'l + ǜ = lǜ', hanzi: '绿色', pinyin: 'lǜsè', thai: 'สีเขียว', accent: 'jade' },
  { formula: 'b + ai + ˊ = bái', hanzi: '白色', pinyin: 'báisè', thai: 'สีขาว', accent: 'indigo' },
  { formula: 'h + ui + ¯ = huī', hanzi: '灰色', pinyin: 'huīsè', thai: 'สีเทา', accent: 'vermilion' },
];

// Compound spelling combinations from slide foods_41
export const COMPOUND_SPELLING_GROUPS = [
  {
    final: 'ai',
    color: 'vermilion',
    items: [
      { eq: 'b + ai = bai', result: 'bai', speak: '白' },
      { eq: 'p + ai = pai', result: 'pai', speak: '拍' },
      { eq: 'k + ai = kai', result: 'kai', speak: '开' },
    ],
  },
  {
    final: 'ei',
    color: 'jade',
    items: [
      { eq: 'b + ei = bei', result: 'bei', speak: '杯' },
      { eq: 'f + ei = fei', result: 'fei', speak: '飞' },
      { eq: 'sh + ei = shei', result: 'shei', speak: '谁' },
    ],
  },
  {
    final: 'ao',
    color: 'indigo',
    items: [
      { eq: 't + ao = tao', result: 'tao', speak: '桃' },
      { eq: 'z + ao = zao', result: 'zao', speak: '早' },
      { eq: 'ch + ao = chao', result: 'chao', speak: '吵' },
    ],
  },
  {
    final: 'ou',
    color: 'lantern',
    items: [
      { eq: 'm + ou = mou', result: 'mou', speak: '某' },
      { eq: 'g + ou = gou', result: 'gou', speak: '狗' },
      { eq: 'zh + ou = zhou', result: 'zhou', speak: '粥' },
    ],
  },
];

// Pronunciation Drill Syllables from Book p.32 (foods_19)
export const BOOK_P32_SYLLABLES = [
  { vowel: 'a', items: [{ text: 'ba', speak: '八' }, { text: 'fa', speak: '发' }, { text: 'ma', speak: '妈' }, { text: 'ta', speak: '他' }] },
  { vowel: 'o', items: [{ text: 'fo', speak: '佛' }, { text: 'po', speak: '坡' }, { text: 'bo', speak: '波' }, { text: 'mo', speak: '摸' }] },
  { vowel: 'e', items: [{ text: 'ke', speak: '科' }, { text: 'de', speak: '得' }, { text: 'ge', speak: '哥' }, { text: 'te', speak: '特' }] },
  { vowel: 'i', items: [{ text: 'li', speak: '李' }, { text: 'bi', speak: '比' }, { text: 'yi', speak: '一' }, { text: 'ni', speak: '你' }] },
  { vowel: 'u', items: [{ text: 'fu', speak: '夫' }, { text: 'pu', speak: '普' }, { text: 'mu', speak: '木' }, { text: 'bu', speak: '不' }] },
  { vowel: 'ü', items: [{ text: 'nü', speak: '女' }, { text: 'yu (yü)', speak: '鱼' }, { text: 'lü', speak: '绿' }] },
];
