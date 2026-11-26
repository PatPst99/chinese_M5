import type { DialogueScene } from '../types';

export const LESSON1_META = {
  lessonCN: '第一课 你好！',
  lessonTH: 'บทที่ 1 สวัสดี!',
  objectives: [
    { cn: '学会问候与告别', th: 'สามารถทักทายและกล่าวคำอำลา' },
    { cn: '学会介绍自己的姓名', th: 'สามารถแนะนำชื่อและแซ่ของตนเองได้' },
  ],
  warmup: [
    {
      num: 1,
      cn: '你知道哪些国家人们打招呼的身体语言？给同学们模仿一下吧。',
      th: 'เธอรู้จักการทักทายด้วยภาษากายของประเทศใดบ้าง ลองแสดงให้เพื่อนๆ ดู (เช่น ไหว้ของไทย จับมือ โค้งคำนับ โบกมือ)',
    },
    {
      num: 2,
      cn: '看一看中国人常用的名字，你觉得哪些是女孩儿常用的，哪些是男孩儿常用的？',
      th: 'มาดูชื่อคนจีนกันเถอะ เธอคิดว่าคำใดบ้างที่คนจีนนิยมตั้งชื่อให้ผู้หญิง และคำใดที่นิยมตั้งชื่อให้ผู้ชาย (ดูหมวดเกร็ดวัฒนธรรม 14 ตัวอักษร)',
    },
  ],
};

// All dialogues from Book p.28 (foods_15), p.29 (foods_16), and slides (foods_45, 47, 48, 49)
export const LESSON1_DIALOGUES: DialogueScene[] = [
  {
    id: 'scene-feifei-1',
    title: 'บทสนทนาที่ 1: ทักทายและมุกเสียงวรรณยุกต์ “Fēifei vs fèifei”',
    subtitle: 'หนังสือหน้า 28 & สไลด์ foods_48 — ระวังการออกเสียงวรรณยุกต์ผิดทำให้ความหมายเปลี่ยน!',
    badge: 'จุดสำคัญ: เสียง 1 vs เสียง 4',
    lines: [
      {
        speaker: '王飞飞',
        speakerPinyin: 'Wáng Fēifei',
        side: 'left',
        hanzi: '你好！我是飞飞。',
        pinyin: 'Nǐ hǎo! Wǒ shì Fēifei.',
        thai: 'สวัสดี! ฉันคือเฟยเฟย',
      },
      {
        speaker: 'เพื่อนคนที่ 1 (ออกเสียงผิด)',
        side: 'right',
        hanzi: '你好，fèifei。',
        pinyin: 'Nǐ hǎo, fèifei.',
        thai: 'สวัสดี ลิงบาบูน (ออกเสียงผิดเป็นเสียง 4!)',
        alertNote: 'ออกเสียง Fēifei (เสียง 1) เพี้ยนเป็น fèifei (เสียง 4 = 狒狒 ลิงบาบูน)!',
      },
      {
        speaker: '王飞飞',
        speakerPinyin: 'Wáng Fēifei',
        side: 'left',
        hanzi: '你好！我是飞飞。',
        pinyin: 'Nǐ hǎo! Wǒ shì Fēifei.',
        thai: 'สวัสดี! ฉันคือเฟยเฟย',
      },
      {
        speaker: 'เพื่อนคนที่ 2 (ออกเสียงผิด)',
        side: 'right',
        hanzi: 'Fèifei，你好。',
        pinyin: 'Fèifei, nǐ hǎo.',
        thai: 'ลิงบาบูน สวัสดี (ยังเผลอออกเสียง 4 อีก!)',
        alertNote: 'สังเกตโครงสร้าง: วางชื่อไว้หน้า 你好 หรือหลัง 你好 ก็ได้',
      },
      {
        speaker: '王飞飞',
        speakerPinyin: 'Wáng Fēifei',
        side: 'left',
        hanzi: '你好！我是飞飞。',
        pinyin: 'Nǐ hǎo! Wǒ shì Fēifei.',
        thai: 'สวัสดี! ฉันคือเฟยเฟย',
      },
      {
        speaker: 'เพื่อนคนที่ 3 (ออกเสียงถูกแล้ว!)',
        side: 'right',
        hanzi: '飞飞，你好。',
        pinyin: 'Fēifei, nǐ hǎo.',
        thai: 'เฟยเฟย สวัสดี! (ออกเสียง 1 ถูกต้อง)',
      },
      {
        speaker: 'เพื่อน (ตอนบอกลา)',
        side: 'right',
        hanzi: '再见，fèifei。',
        pinyin: 'Zàijiàn, fèifei.',
        thai: 'ลาก่อน เฟ่ยเฟ่ย (ตอนลาแอบเผลออีกแล้ว!)',
      },
      {
        speaker: '王飞飞',
        speakerPinyin: 'Wáng Fēifei',
        side: 'left',
        hanzi: '再见！',
        pinyin: 'Zàijiàn!',
        thai: 'ลาก่อน!',
      },
    ],
  },
  {
    id: 'scene-introduce-2',
    title: 'บทสนทนาที่ 2: ถามชื่อและถามแซ่ (นามสกุล)',
    subtitle: 'หนังสือหน้า 29 (foods_16) — การใช้ 叫 (ชื่อ) และ 姓 (แซ่)',
    badge: 'ประโยคหลักออกสอบบ่อย',
    lines: [
      {
        speaker: '王飞飞',
        speakerPinyin: 'Wáng Fēifei',
        side: 'left',
        hanzi: '你好，我叫飞飞，你叫什么？',
        pinyin: 'Nǐ hǎo, wǒ jiào Fēifei, nǐ jiào shénme?',
        thai: 'สวัสดี ฉันชื่อเฟยเฟย เธอชื่ออะไร?',
      },
      {
        speaker: '李明',
        speakerPinyin: 'Lǐ Míng',
        side: 'right',
        hanzi: '我姓李，叫李明。飞飞，你姓什么？',
        pinyin: 'Wǒ xìng Lǐ, jiào Lǐ Míng. Fēifei, nǐ xìng shénme?',
        thai: 'ฉันแซ่หลี่ ชื่อหลี่หมิง เฟยเฟย เธอแซ่อะไร?',
      },
      {
        speaker: '王飞飞',
        speakerPinyin: 'Wáng Fēifei',
        side: 'left',
        hanzi: '我姓王。',
        pinyin: 'Wǒ xìng Wáng.',
        thai: 'ฉันแซ่หวัง',
      },
    ],
  },
];

// Greeting & Slide Tips from foods_45, 46, 47, 49
export const SLIDE_GRAMMAR_TIPS = [
  {
    title: 'การใช้ 你好 ทักทายได้ตลอด 24 ชั่วโมง (สไลด์ foods_45)',
    note: '你好 สามารถใช้ทักทายได้ตลอดเวลา ทั้งวัน ทั้งคืน และเปลี่ยนคำหน้าเป็นบุคคลต่างๆ เพื่อทักทายได้อย่างสุภาพ',
    items: [
      { hanzi: '你好', pinyin: 'nǐ hǎo', thai: 'สวัสดี (ทั่วไป)' },
      { hanzi: '您好', pinyin: 'nín hǎo', thai: 'สวัสดีท่าน (สุภาพ/ผู้อาวุโส)' },
      { hanzi: '你们好', pinyin: 'nǐmen hǎo', thai: 'สวัสดีพวกคุณ (หลายคน)' },
      { hanzi: '老师好', pinyin: 'Lǎoshī hǎo', thai: 'สวัสดีคุณครู' },
      { hanzi: '爸爸好', pinyin: 'bàba hǎo', thai: 'สวัสดีคุณพ่อ' },
      { hanzi: '妈妈好', pinyin: 'māma hǎo', thai: 'สวัสดีคุณแม่' },
    ],
  },
  {
    title: 'การแนะนำตัวด้วย 是 และ 叫 (สไลด์ foods_47 & 49)',
    note: '我是 + (ชื่อ/สถานะ) ใช้บอกตัวตนหรืออาชีพ ส่วน 叫 + (ชื่อ) ใช้บอกชื่อเรียก',
    items: [
      { hanzi: '我是飞飞。', pinyin: 'Wǒ shì Fēifei.', thai: 'ฉันคือเฟยเฟย' },
      { hanzi: '我是学生。', pinyin: 'Wǒ shì xuésheng.', thai: 'ฉันเป็นนักเรียน' },
      { hanzi: '我是老师。', pinyin: 'Wǒ shì lǎoshī.', thai: 'ฉันเป็นคุณครู' },
      { hanzi: '她叫迪丽热巴。', pinyin: 'Tā jiào Dílìrèbā.', thai: 'เธอชื่อตี๋ลี่เร่อปา (ตัวอย่างในสไลด์)' },
    ],
  },
];

// Pronoun Singular -> Plural table from slide foods_46
export const PRONOUN_PAIRS = [
  { singular: { hanzi: '我', pinyin: 'wǒ', thai: 'ฉัน, ผม' }, plural: { hanzi: '我们', pinyin: 'wǒmen', thai: 'พวกเรา' } },
  { singular: { hanzi: '你', pinyin: 'nǐ', thai: 'คุณ, เธอ' }, plural: { hanzi: '你们', pinyin: 'nǐmen', thai: 'พวกคุณ' } },
  { singular: { hanzi: '他', pinyin: 'tā', thai: 'เขา (ผู้ชาย)' }, plural: { hanzi: '他们', pinyin: 'tāmen', thai: 'พวกเขา (ชาย/รวม)' } },
  { singular: { hanzi: '她', pinyin: 'tā', thai: 'เขา (ผู้หญิง)' }, plural: { hanzi: '她们', pinyin: 'tāmen', thai: 'พวกเขา (หญิง)' } },
  { singular: { hanzi: '它', pinyin: 'tā', thai: 'มัน (สัตว์/สิ่งของ)' }, plural: { hanzi: '它们', pinyin: 'tāmen', thai: 'พวกมัน' } },
];

// Sentence Builder Patterns (from p.29 รูปประโยค 句型 + slides)
export interface BuilderPattern {
  id: string;
  labelTH: string;
  formula: string;
  slots: {
    slotLabel: string;
    options: { hanzi: string; pinyin: string; thai: string }[];
  }[];
}

export const SENTENCE_BUILDER_PATTERNS: BuilderPattern[] = [
  {
    id: 'greet',
    labelTH: 'ทักทายบุคคลต่างๆ',
    formula: '[บุคคล] + 好！',
    slots: [
      {
        slotLabel: 'เลือกผู้ที่เราทักทาย',
        options: [
          { hanzi: '你', pinyin: 'Nǐ', thai: 'เธอ/คุณ' },
          { hanzi: '您', pinyin: 'Nín', thai: 'ท่าน' },
          { hanzi: '你们', pinyin: 'Nǐmen', thai: 'พวกคุณ' },
          { hanzi: '老师', pinyin: 'Lǎoshī', thai: 'คุณครู' },
          { hanzi: '爸爸', pinyin: 'Bàba', thai: 'คุณพ่อ' },
          { hanzi: '妈妈', pinyin: 'Māma', thai: 'คุณแม่' },
        ],
      },
      {
        slotLabel: 'คำทักทาย',
        options: [
          { hanzi: '好！', pinyin: 'hǎo!', thai: 'สวัสดี!' },
          { hanzi: '再见！', pinyin: 'zàijiàn!', thai: 'ลาก่อน!' },
        ],
      },
    ],
  },
  {
    id: 'shi',
    labelTH: 'แนะนำตัวด้วย 是 (เป็น/คือ)',
    formula: '[ประธาน] + 是 + [ชื่อ/สถานะ]',
    slots: [
      {
        slotLabel: 'ประธาน',
        options: [
          { hanzi: '我', pinyin: 'Wǒ', thai: 'ฉัน' },
          { hanzi: '他', pinyin: 'Tā', thai: 'เขา(ชาย)' },
          { hanzi: '她', pinyin: 'Tā', thai: 'เขา(หญิง)' },
          { hanzi: '我们', pinyin: 'Wǒmen', thai: 'พวกเรา' },
        ],
      },
      {
        slotLabel: 'กริยา',
        options: [
          { hanzi: '是', pinyin: 'shì', thai: 'เป็น/คือ' },
          { hanzi: '不是', pinyin: 'bú shì', thai: 'ไม่ใช่' },
        ],
      },
      {
        slotLabel: 'ชื่อ หรือ บทบาท',
        options: [
          { hanzi: '飞飞。', pinyin: 'Fēifei.', thai: 'เฟยเฟย' },
          { hanzi: '学生。', pinyin: 'xuésheng.', thai: 'นักเรียน' },
          { hanzi: '老师。', pinyin: 'lǎoshī.', thai: 'คุณครู' },
          { hanzi: '王老师。', pinyin: 'Wáng lǎoshī.', thai: 'ครูหวัง' },
          { hanzi: '李明。', pinyin: 'Lǐ Míng.', thai: 'หลี่หมิง' },
        ],
      },
    ],
  },
  {
    id: 'jiao-xing',
    labelTH: 'บอกและถาม ชื่อ (叫) / แซ่ (姓)',
    formula: '[ประธาน] + [叫/姓] + [ชื่อ/แซ่/什么？]',
    slots: [
      {
        slotLabel: 'ประธาน',
        options: [
          { hanzi: '我', pinyin: 'Wǒ', thai: 'ฉัน' },
          { hanzi: '你', pinyin: 'Nǐ', thai: 'คุณ' },
          { hanzi: '她', pinyin: 'Tā', thai: 'เธอ' },
        ],
      },
      {
        slotLabel: 'กริยา',
        options: [
          { hanzi: '叫', pinyin: 'jiào', thai: 'ชื่อ' },
          { hanzi: '姓', pinyin: 'xìng', thai: 'แซ่' },
        ],
      },
      {
        slotLabel: 'คำตอบหรือคำถาม',
        options: [
          { hanzi: '什么？', pinyin: 'shénme?', thai: 'อะไร?' },
          { hanzi: '李明。', pinyin: 'Lǐ Míng.', thai: 'หลี่หมิง' },
          { hanzi: '迪丽热巴。', pinyin: 'Dílìrèbā.', thai: 'ตี๋ลี่เร่อปา' },
          { hanzi: '王。', pinyin: 'Wáng.', thai: 'หวัง' },
          { hanzi: '李。', pinyin: 'Lǐ.', thai: 'หลี่' },
          { hanzi: '马。', pinyin: 'Mǎ.', thai: 'หม่า' },
        ],
      },
    ],
  },
];

// Blindfold game from Book p.31 (foods_18)
export const BLINDFOLD_GAME = {
  titleCN: '蒙上眼睛，猜猜看，说话的人是谁？',
  titleTH: 'ปิดตาแล้วทายซิว่าคนที่กล่าวถึงคือคนใด (หนังสือ p.31)',
  characters: [
    { name: 'Sōng Cǎi', lineCN: '我是 Sōng Cǎi。', guessCN: '你是 Sōng Cǎi。', thai: 'ฉันคือสมชาย / เธอคือสมชาย' },
    { name: 'Wēi Luó', lineCN: '我是 Wēi Luó。', guessCN: '你是 Wēi Luó。', thai: 'ฉันคือวิโรจน์ / เธอคือวิโรจน์' },
    { name: 'Sū Gānyǎ', lineCN: '我是 Sū Gānyǎ。', guessCN: '你是 Sū Gānyǎ。', thai: 'ฉันคือสุกัญญา / เธอคือสุกัญญา' },
    { name: 'Mǎ Lì', lineCN: '我是 Mǎ Lì。', guessCN: '你是 Mǎ Lì。', thai: 'ฉันคือหม่าลี่ / เธอคือหม่าลี่' },
  ],
};

// Cultural Story of Cang Jie from Book p.33 (foods_20 / u16_02)
export const CANG_JIE_STORY = {
  titleCN: '汉字的故事',
  titleTH: 'เรื่องราวเกี่ยวกับอักษรจีน (หนังสือหน้า 33)',
  storyCN:
    '汉字是怎么产生的呢？传说距今5000年前，有一个人叫仓颉（Cāng Jié）。他有四只眼睛，从看到的世界万物中得到启发创造了文字。这只是一个传说，汉字是很多人的智慧结晶。',
  storyTH:
    'อักษรจีนกำเนิดขึ้นได้อย่างไร เล่ากันว่าเมื่อประมาณ 5,000 ปีมาแล้ว มีคนคนหนึ่งชื่อ ชัง เจี๋ย (仓颉 Cāng Jié) ซึ่งมีลูกตา 4 ตา ได้ประดิษฐ์ตัวอักษรจีนขึ้น โดยจุดประกายความคิดจากสรรพสิ่งที่เขามองเห็น แท้จริงแล้วอักษรจีนเป็นผลงานแห่งภูมิปัญญาประชาชนจีน',
  landmarks: [
    { hanzi: '仓颉庙', pinyin: 'Cāng Jié Miào', thai: 'ศาลเจ้า ชัง เจี๋ย' },
    { hanzi: '仓颉', pinyin: 'Cāng Jié', thai: 'รูปปั้น ชัง เจี๋ย' },
  ],
  highlights: [
    'ประมาณ 5,000 ปีมาแล้ว',
    'ชัง เจี๋ย (仓颉 Cāng Jié) มีลูกตา 4 ตา',
    'ได้แรงบันดาลใจจากสรรพสิ่งรอบตัว (อักษรภาพ)',
    'แท้จริงแล้วอักษรจีนเป็นผลงานแห่งภูมิปัญญาประชาชนจีนร่วมกัน',
  ],
};
