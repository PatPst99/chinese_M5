import type { StrokeBasic, StrokeDerived, StrokeOrderRule } from '../types';

export const STROKE_INTRO = {
  cn: '看似复杂的汉字其实只有六种基本笔画，分别叫横（一）、竖（丨）、撇（丿）、捺（㇏）、点（丶）、提（㇀），其他笔画都是由这六种笔画变化得来的。',
  th: 'ตัวอักษรจีนดูเหมือนว่าจะสลับซับซ้อน แท้ที่จริงแล้วมีเส้นขีดพื้นฐานเพียง 6 ชนิด ซึ่งเรียกตามลำดับว่า เส้นขวาง เส้นตั้ง เส้นลากลงซ้าย เส้นลากลงขวา จุด และเส้นยก ส่วนเส้นขีดอื่นๆ ผันแปรจากเส้นขีด 6 ชนิดนี้',
};

export const BASIC_STROKES: StrokeBasic[] = [
  {
    id: 'heng',
    symbol: '一',
    nameCN: '横',
    pinyin: 'héng',
    nameTH: 'เส้นขวาง',
    directionTH: 'ลากจากซ้ายไปขวาตรงๆ (ปลายขวาลงน้ำหนักเล็กน้อย)',
    svgPath: 'M 14 50 L 86 48',
    exampleChar: '二',
  },
  {
    id: 'shu',
    symbol: '丨',
    nameCN: '竖',
    pinyin: 'shù',
    nameTH: 'เส้นตั้ง',
    directionTH: 'ลากตรงจากด้านบนลงด้านล่าง',
    svgPath: 'M 50 14 L 50 86',
    exampleChar: '十',
  },
  {
    id: 'pie',
    symbol: '丿',
    nameCN: '撇',
    pinyin: 'piě',
    nameTH: 'เส้นลากลงซ้าย',
    directionTH: 'เริ่มจากบนขวา ลากโค้งเฉียงลงซ้ายแล้วค่อยๆ เรียวแหลม',
    svgPath: 'M 72 16 Q 60 58 24 84',
    exampleChar: '人',
  },
  {
    id: 'na',
    symbol: '㇏',
    nameCN: '捺',
    pinyin: 'nà',
    nameTH: 'เส้นลากลงขวา',
    directionTH: 'เริ่มจากบนซ้าย ลากเฉียงลงขวาแล้วกดน้ำหนักก่อนตวัดปลายขวา',
    svgPath: 'M 24 22 Q 46 60 82 82',
    exampleChar: '八',
  },
  {
    id: 'dian',
    symbol: '丶',
    nameCN: '点',
    pinyin: 'diǎn',
    nameTH: 'จุด',
    directionTH: 'แต้มสั้นๆ จากซ้ายบนเฉียงลงขวาล่างคล้ายหยดน้ำ',
    svgPath: 'M 38 36 Q 52 46 62 62',
    exampleChar: '心',
  },
  {
    id: 'ti',
    symbol: '㇀',
    nameCN: '提',
    pinyin: 'tí',
    nameTH: 'เส้นยก',
    directionTH: 'เริ่มจากซ้ายล่าง กดแล้วตวัดยกขึ้นไปทางขวาบนอย่างรวดเร็ว',
    svgPath: 'M 24 76 L 78 30',
    exampleChar: '冰',
  },
];

// Missing stroke exercise from foods_09 ("下面的汉字缺少哪一笔？请你补上。")
export const MISSING_STROKE_EXERCISES = [
  { char: '冰', pinyin: 'bīng', thai: 'น้ำแข็ง', missingStroke: '提 (เส้นยก) / จุดซ้าย', tip: 'ด้านซ้ายคือ 冫(น้ำแข็ง) ประกอบด้วย จุด 丶 และเส้นยก ㇀' },
  { char: '日', pinyin: 'rì', thai: 'พระอาทิตย์, วัน', missingStroke: '横 (เส้นขวางตรงกลาง)', tip: 'เติมเส้นขวางกลางช่องให้ครบ 4 ขีดจึงจะเป็น 日 (ถ้าไม่มีจะกลายเป็น 口)' },
  { char: '山', pinyin: 'shān', thai: 'ภูเขา', missingStroke: '竖 (เส้นตั้งตรงกลาง)', tip: 'เขียนเส้นตั้งตรงกลางก่อน (先中间后两边) แล้วจึงเขียน 竖折 และ 竖 ด้านขวา' },
  { char: '八', pinyin: 'bā', thai: 'แปด', missingStroke: '捺 (เส้นลากลงขวา)', tip: 'เส้นลากลงซ้ายสั้นกว่า และปลายบนแยกจากกันไม่ชิดติดกัน' },
  { char: '人', pinyin: 'rén', thai: 'คน', missingStroke: '撇 (เส้นลากลงซ้าย)', tip: 'เส้น 撇 อยู่สูงกว่า และเส้น 捺 เริ่มต่อจากช่วงกลางของ 撇' },
  { char: '心', pinyin: 'xīn', thai: 'หัวใจ', missingStroke: '点 (จุด)', tip: 'ประกอบด้วยเส้นนอนโค้ง 卧钩 (㇃) และจุด 3 จุดล้อมรอบ' },
];

// Look-alike handwritten note from foods_09
export const LOOK_ALIKE_TRIO = [
  { char: '八', pinyin: 'bā', thai: 'แปด', diff: 'สองเส้นแยกออกจากกันที่ยอด (ซ้ายต่ำกว่าขวา)' },
  { char: '人', pinyin: 'rén', thai: 'คน', diff: 'เส้นซ้าย (撇) ยาวสูงกว่า แล้วเส้นขวา (捺) มาพิงตรงกลาง' },
  { char: '入', pinyin: 'rù', thai: 'เข้า', diff: 'เส้นขวา (捺) ยาวสูงกว่าเส้นซ้าย (撇) คล้ายคนเดินก้มเข้าประตู' },
];

// All 20 derived/compound strokes from foods_10 (p10zoom.jpg: 10 left + 10 right)
export const DERIVED_STROKES: StrokeDerived[] = [
  // Left column (1-10)
  { id: 'd1', col: 'left', symbol: '亅', nameCN: '竖钩', pinyin: 'shùgōu', nameTH: 'เส้นตั้งตวัดซ้าย', examples: ['小', '水', '你'], svgPath: 'M 54 14 L 54 82 L 36 70' },
  { id: 'd2', col: 'left', symbol: '乛', nameCN: '横钩', pinyin: 'hénggōu', nameTH: 'เส้นขวางตวัดลง', examples: ['你', '学', '字'], svgPath: 'M 20 36 L 80 36 L 68 54' },
  { id: 'd3', col: 'left', symbol: '∟', nameCN: '竖弯', pinyin: 'shùwān', nameTH: 'เส้นตั้งโค้งขวา', examples: ['四', '西'], svgPath: 'M 32 20 L 32 68 Q 32 76 42 76 L 76 76' },
  { id: 'd4', col: 'left', symbol: '乚', nameCN: '竖弯钩', pinyin: 'shùwāngōu', nameTH: 'เส้นตั้งโค้งตวัดขึ้น', examples: ['七', '爸', '见'], svgPath: 'M 28 18 L 28 68 Q 28 78 40 78 L 76 78 L 78 60' },
  { id: 'd5', col: 'left', symbol: '⺄', nameCN: '横折弯钩 / 横斜钩', pinyin: 'héngzhéwāngōu', nameTH: 'ขวางหักโค้งตวัดขึ้น', examples: ['九', '几', '飞'], svgPath: 'M 18 28 L 52 24 Q 48 72 68 78 L 84 78 L 86 60' },
  { id: 'd6', col: 'left', symbol: '㇁', nameCN: '弯钩', pinyin: 'wāngōu', nameTH: 'เส้นโค้งตวัดซ้าย', examples: ['狗', '家', '了'], svgPath: 'M 48 16 Q 62 46 56 84 L 40 72' },
  { id: 'd7', col: 'left', symbol: '㇂', nameCN: '斜钩', pinyin: 'xiégōu', nameTH: 'เส้นเฉียงตวัดขึ้น', examples: ['我', '钱'], svgPath: 'M 36 16 Q 48 56 76 84 L 82 64' },
  { id: 'd8', col: 'left', symbol: '㇃', nameCN: '卧钩', pinyin: 'wògōu', nameTH: 'เส้นนอนโค้งตวัดขึ้น', examples: ['心', '您'], svgPath: 'M 22 44 Q 36 78 76 74 L 70 54' },
  { id: 'd9', col: 'left', symbol: '㇇', nameCN: '横撇', pinyin: 'héngpiě', nameTH: 'เส้นขวางลากลงซ้าย', examples: ['又', '水', '多'], svgPath: 'M 22 30 L 76 30 L 34 78' },
  { id: 'd10', col: 'left', symbol: '㇙', nameCN: '竖提', pinyin: 'shùtí', nameTH: 'เส้นตั้งตวัดขึ้นขวา', examples: ['很', '民', '长'], svgPath: 'M 36 18 L 36 80 L 74 56' },

  // Right column (11-20)
  { id: 'd11', col: 'right', symbol: '∟', nameCN: '竖折', pinyin: 'shùzhé', nameTH: 'เส้นตั้งหักขวา', examples: ['山', '出', '区'], svgPath: 'M 28 18 L 28 76 L 78 76' },
  { id: 'd12', col: 'right', symbol: '㇉', nameCN: '竖折折钩', pinyin: 'shùzhézhégōu', nameTH: 'ตั้งหักขวางหักลงตวัด', examples: ['马', '鸟', '弟'], svgPath: 'M 36 18 L 30 48 L 72 44 L 64 82 L 48 72' },
  { id: 'd13', col: 'right', symbol: '𠃌', nameCN: '横折钩', pinyin: 'héngzhégōu', nameTH: 'เส้นขวางหักลงตวัดซ้าย', examples: ['月', '门', '同'], svgPath: 'M 24 24 L 74 24 L 70 82 L 54 70' },
  { id: 'd14', col: 'right', symbol: '𠃋', nameCN: '撇折', pinyin: 'piězhé', nameTH: 'ลากลงซ้ายหักขวา', examples: ['么', '红', '云'], svgPath: 'M 56 20 L 26 70 L 76 62' },
  { id: 'd15', col: 'right', symbol: '㇞', nameCN: '竖折撇', pinyin: 'shùzhépiě', nameTH: 'ตั้งหักขวางลากซ้าย', examples: ['专', '传'], svgPath: 'M 48 16 L 38 56 L 72 52 L 50 84' },
  { id: 'd16', col: 'right', symbol: '㇍', nameCN: '横折弯', pinyin: 'héngzhéwān', nameTH: 'ขวางหักโค้งขวา', examples: ['没', '朵'], svgPath: 'M 22 30 L 56 30 L 54 68 Q 54 76 64 76 L 82 76' },
  { id: 'd17', col: 'right', symbol: '㇌', nameCN: '横撇弯钩', pinyin: 'héngpiěwāngōu', nameTH: 'ขวางซ้ายโค้งตวัด', examples: ['那', '阳', '队'], svgPath: 'M 28 22 L 66 20 L 48 44 Q 72 58 58 84 L 44 74' },
  { id: 'd18', col: 'right', symbol: '㇋', nameCN: '横折折撇', pinyin: 'héngzhézhépiě', nameTH: 'ขวางหักสองครั้งลากซ้าย', examples: ['建', '及', '这'], svgPath: 'M 26 24 L 64 22 L 46 48 L 68 46 L 40 84' },
  { id: 'd19', col: 'right', symbol: '㇡', nameCN: '横折折折钩', pinyin: 'héngzhézhézhégōu', nameTH: 'ขวางหักสามครั้งตวัด', examples: ['奶', '乃'], svgPath: 'M 28 20 L 64 20 L 46 46 L 68 44 L 58 82 L 44 72' },
  { id: 'd20', col: 'right', symbol: '𠃍', nameCN: '横折 / 横折提', pinyin: 'héngzhé', nameTH: 'เส้นขวางหักลง (มุมฉาก)', examples: ['口', '日', '国', '说'], svgPath: 'M 26 26 L 72 26 L 72 78' },
];

// Character Structures from foods_11 & foods_12
export const CHARACTER_STRUCTURES = {
  single: {
    titleCN: '独体字',
    titleTH: 'ตัวอักษรเดี่ยว',
    descTH: 'ตัวอักษรที่มีองค์ประกอบเดียว ไม่สามารถแยกออกเป็นส่วนประกอบย่อยได้',
    examples: [
      { char: '我', pinyin: 'wǒ', thai: 'ฉัน, ผม' },
      { char: '头', pinyin: 'tóu', thai: 'หัว' },
      { char: '天', pinyin: 'tiān', thai: 'วัน, ท้องฟ้า' },
    ],
  },
  compound: {
    titleCN: '合体字',
    titleTH: 'ตัวอักษรประสม',
    descTH: 'ตัวอักษรที่เกิดจากการนำส่วนประกอบตั้งแต่ 2 ส่วนขึ้นไปมาประกอบกัน',
    examples: [
      { char: '国', pinyin: 'guó', thai: 'ประเทศ' },
      { char: '帅', pinyin: 'shuài', thai: 'หล่อ' },
      { char: '是', pinyin: 'shì', thai: 'เป็น, คือ, ใช่' },
    ],
  },
  compoundTypes: [
    {
      id: 'top-bottom' as const,
      titleCN: '上下结构',
      titleTH: 'โครงสร้าง บน – ล่าง',
      example: { char: '爸', pinyin: 'bà', thai: 'พ่อ' },
      parts: '父 (บน) + 巴 (ล่าง)',
    },
    {
      id: 'left-right' as const,
      titleCN: '左右结构',
      titleTH: 'โครงสร้าง ซ้าย – ขวา',
      example: { char: '好', pinyin: 'hǎo', thai: 'ดี' },
      parts: '女 (ซ้าย) + 子 (ขวา)',
    },
    {
      id: 'enclosure' as const,
      titleCN: '包围结构',
      titleTH: 'โครงสร้าง นอก – ใน (ล้อมรอบ)',
      example: { char: '回', pinyin: 'huí', thai: 'กลับ' },
      parts: '囗 (นอก) + 口 (ใน)',
    },
  ],
};

// Odd-one-out exercise from foods_11 & foods_12 (all 4 rows!)
export const STRUCTURE_ODD_ONE_OUT = [
  {
    row: 1,
    chars: [
      { char: '她', pinyin: 'tā', thai: 'เขาผู้หญิง', structure: 'ซ้าย–ขวา (合体字)' },
      { char: '五', pinyin: 'wǔ', thai: 'ห้า', structure: 'ตัวอักษรเดี่ยว (独体字)' },
      { char: '也', pinyin: 'yě', thai: 'ก็, เช่นกัน', structure: 'ตัวอักษรเดี่ยว (独体字)' },
      { char: '我', pinyin: 'wǒ', thai: 'ฉัน, ผม', structure: 'ตัวอักษรเดี่ยว (独体字)' },
    ],
    oddChar: '她',
    reasonTH: '她 เป็นตัวอักษรประสมแบบซ้าย–ขวา (女+也) ส่วน 五, 也, 我 เป็นตัวอักษรเดี่ยว (独体字)',
  },
  {
    row: 2,
    chars: [
      { char: '妈', pinyin: 'mā', thai: 'แม่', structure: 'ซ้าย–ขวา' },
      { char: '爸', pinyin: 'bà', thai: 'พ่อ', structure: 'บน–ล่าง' },
      { char: '姐', pinyin: 'jiě', thai: 'พี่สาว', structure: 'ซ้าย–ขวา' },
      { char: '师', pinyin: 'shī', thai: 'ครู', structure: 'ซ้าย–ขวา' },
    ],
    oddChar: '爸',
    reasonTH: '爸 เป็นโครงสร้าง บน–ล่าง (父+巴) ส่วน 妈, 姐, 师 เป็นโครงสร้าง ซ้าย–ขวา',
  },
  {
    row: 3,
    chars: [
      { char: '高', pinyin: 'gāo', thai: 'สูง', structure: 'บน–ล่าง' },
      { char: '国', pinyin: 'guó', thai: 'ประเทศ', structure: 'นอก–ใน (ล้อมรอบ)' },
      { char: '泰', pinyin: 'tài', thai: 'ไทย', structure: 'บน–ล่าง' },
      { char: '是', pinyin: 'shì', thai: 'เป็น/คือ/ใช่', structure: 'บน–ล่าง' },
    ],
    oddChar: '国',
    reasonTH: '国 เป็นโครงสร้าง นอก–ใน (囗 ล้อม 玉) ส่วน 高, 泰, 是 เป็นโครงสร้าง บน–ล่าง',
  },
  {
    row: 4,
    chars: [
      { char: '帅', pinyin: 'shuài', thai: 'หล่อ', structure: 'ซ้าย–ขวา' },
      { char: '很', pinyin: 'hěn', thai: 'มาก', structure: 'ซ้าย–ขวา' },
      { char: '眼', pinyin: 'yǎn', thai: 'ดวงตา (เหยี่ยน)', structure: 'ซ้าย–ขวา' },
      { char: '老', pinyin: 'lǎo', thai: 'แก่', structure: 'บน–ล่าง' },
    ],
    oddChar: '老',
    reasonTH: '老 เป็นโครงสร้าง บน–ล่าง ส่วน 帅, 很, 眼 เป็นโครงสร้าง ซ้าย–ขวา',
  },
];

// 7 Stroke Order Rules from foods_12
export const STROKE_ORDER_INTRO = {
  cn: '中国人书写汉字笔画是有先后顺序的，按照合理的顺序书写汉字，写出来的字才又快又好看。',
  th: 'ชาวจีนเขียนตัวอักษรตามลำดับเส้นขีดก่อนและหลัง ถ้าเขียนตามลำดับที่ถูกต้องแล้วจะทำให้เขียนได้รวดเร็วและสวยงาม',
};

export const STROKE_ORDER_RULES: StrokeOrderRule[] = [
  { id: 1, ruleCN: '先上后下', ruleTH: 'เขียนจากบนลงล่าง', exampleChar: '二', examplePinyin: 'èr', exampleThai: 'สอง', stepText: '一 → 二' },
  { id: 2, ruleCN: '先左后右', ruleTH: 'เขียนจากซ้ายไปขวา', exampleChar: '好', examplePinyin: 'hǎo', exampleThai: 'ดี', stepText: '女 → 好' },
  { id: 3, ruleCN: '先撇后捺', ruleTH: 'เขียนเส้นลากลงซ้ายก่อนเส้นลากลงขวา', exampleChar: '人', examplePinyin: 'rén', exampleThai: 'คน', stepText: '丿 → 人' },
  { id: 4, ruleCN: '先横后竖', ruleTH: 'เขียนเส้นขวางก่อนเส้นตั้ง', exampleChar: '十', examplePinyin: 'shí', exampleThai: 'สิบ', stepText: '一 → 十' },
  { id: 5, ruleCN: '先外后里', ruleTH: 'เขียนจากนอกเข้าใน', exampleChar: '风', examplePinyin: 'fēng', exampleThai: 'ลม', stepText: '几 → 风' },
  { id: 6, ruleCN: '先中间后两边', ruleTH: 'เขียนตรงกลางก่อนเขียนสองข้าง', exampleChar: '小', examplePinyin: 'xiǎo', exampleThai: 'เล็ก', stepText: '亅 → 小' },
  { id: 7, ruleCN: '先填中后封口', ruleTH: 'เขียนข้างในก่อนปิดช่อง', exampleChar: '国', examplePinyin: 'guó', exampleThai: 'ประเทศ', stepText: '冂 → 玉 → 国' },
];

// Pictographs from Slide foods_25 + Book p.33 (foods_20)
export const PICTOGRAPHS = [
  { char: '火', pinyin: 'huǒ', thai: 'ไฟ', origin: 'รูปเปลวไฟที่ลุกโชนขึ้นด้านบน', source: 'สไลด์อักษรภาพ' },
  { char: '木', pinyin: 'mù', thai: 'ไม้, ต้นไม้', origin: 'รูปลำต้น กิ่งก้าน และรากของต้นไม้', source: 'สไลด์อักษรภาพ' },
  { char: '日', pinyin: 'rì', thai: 'พระอาทิตย์, วัน', origin: 'รูปดวงอาทิตย์ทรงกลมมีจุดตรงกลาง', source: 'สไลด์อักษรภาพ' },
  { char: '月', pinyin: 'yuè', thai: 'พระจันทร์, เดือน', origin: 'รูปพระจันทร์เสี้ยวบนท้องฟ้า', source: 'สไลด์อักษรภาพ' },
  { char: '人', pinyin: 'rén', thai: 'คน', origin: 'รูปคนยืนก้าวขาเดินมองจากด้านข้าง', source: 'สไลด์อักษรภาพ' },
  { char: '口', pinyin: 'kǒu', thai: 'ปาก', origin: 'รูปปากที่กำลังอ้าออก', source: 'สไลด์อักษรภาพ' },
  { char: '门', pinyin: 'mén', thai: 'ประตู (ตัวเต็ม 門)', origin: 'รูปบานประตูคู่สองบานเปิด-ปิด', source: 'สไลด์อักษรภาพ' },
  { char: '山', pinyin: 'shān', thai: 'ภูเขา', origin: 'รูปยอดเขาสามยอดเรียงต่อกัน', source: 'สไลด์อักษรภาพ' },
  { char: '十', pinyin: 'shí', thai: 'สิบ', origin: 'เส้นขวางตัดเส้นตั้งคล้ายทางสี่แยก → 十字路口 (shízì lùkǒu สี่แยก)', source: 'หนังสือ p.33' },
  { char: '八', pinyin: 'bā', thai: 'แปด', origin: 'เส้นแยกออกสองทาง ใช้ในคำว่า 八宝粥 (bābǎozhōu โจ๊กผสมแปดอย่าง)', source: 'หนังสือ p.33' },
];

// Curated character decks for Hanzi Practice Studio (covering every key character from the PDF)
export const HANZI_STUDIO_DECKS = [
  {
    id: 'lesson1-strokes',
    label: 'ลำดับขีดบทที่ 1 (สไลด์ & โน้ต)',
    chars: [
      { char: '你', pinyin: 'nǐ', thai: 'คุณ, เธอ', strokes: 7 },
      { char: '好', pinyin: 'hǎo', thai: 'ดี', strokes: 6 },
      { char: '我', pinyin: 'wǒ', thai: 'ฉัน, ผม', strokes: 7 },
      { char: '是', pinyin: 'shì', thai: 'เป็น, คือ, ใช่', strokes: 9 },
      { char: '姓', pinyin: 'xìng', thai: 'แซ่, นามสกุล', strokes: 8 },
      { char: '什', pinyin: 'shén', thai: '(อะไร)', strokes: 4 },
      { char: '么', pinyin: 'me', thai: '(อะไร)', strokes: 3 },
      { char: '王', pinyin: 'Wáng', thai: 'แซ่หวัง', strokes: 4 },
      { char: '飞', pinyin: 'fēi', thai: 'บิน / เฟย', strokes: 3 },
      { char: '叫', pinyin: 'jiào', thai: 'เรียก, ชื่อ', strokes: 5 },
      { char: '再', pinyin: 'zài', thai: 'อีก (ลาก่อน)', strokes: 6 },
      { char: '见', pinyin: 'jiàn', thai: 'พบ (ลาก่อน)', strokes: 4 },
    ],
  },
  {
    id: 'numbers',
    label: 'ตัวเลข ๑–๑๐',
    chars: [
      { char: '一', pinyin: 'yī', thai: 'หนึ่ง', strokes: 1 },
      { char: '二', pinyin: 'èr', thai: 'สอง', strokes: 2 },
      { char: '三', pinyin: 'sān', thai: 'สาม', strokes: 3 },
      { char: '四', pinyin: 'sì', thai: 'สี่', strokes: 5 },
      { char: '五', pinyin: 'wǔ', thai: 'ห้า', strokes: 4 },
      { char: '六', pinyin: 'liù', thai: 'หก', strokes: 4 },
      { char: '七', pinyin: 'qī', thai: 'เจ็ด', strokes: 2 },
      { char: '八', pinyin: 'bā', thai: 'แปด', strokes: 2 },
      { char: '九', pinyin: 'jiǔ', thai: 'เก้า', strokes: 2 },
      { char: '十', pinyin: 'shí', thai: 'สิบ', strokes: 2 },
    ],
  },
  {
    id: 'rules-pictographs',
    label: 'อักษรภาพ & กฎลำดับขีด',
    chars: [
      { char: '火', pinyin: 'huǒ', thai: 'ไฟ', strokes: 4 },
      { char: '木', pinyin: 'mù', thai: 'ไม้', strokes: 4 },
      { char: '日', pinyin: 'rì', thai: 'พระอาทิตย์', strokes: 4 },
      { char: '月', pinyin: 'yuè', thai: 'พระจันทร์', strokes: 4 },
      { char: '人', pinyin: 'rén', thai: 'คน', strokes: 2 },
      { char: '入', pinyin: 'rù', thai: 'เข้า', strokes: 2 },
      { char: '口', pinyin: 'kǒu', thai: 'ปาก', strokes: 3 },
      { char: '门', pinyin: 'mén', thai: 'ประตู', strokes: 3 },
      { char: '山', pinyin: 'shān', thai: 'ภูเขา', strokes: 3 },
      { char: '风', pinyin: 'fēng', thai: 'ลม', strokes: 4 },
      { char: '小', pinyin: 'xiǎo', thai: 'เล็ก', strokes: 3 },
      { char: '国', pinyin: 'guó', thai: 'ประเทศ', strokes: 8 },
      { char: '回', pinyin: 'huí', thai: 'กลับ', strokes: 6 },
      { char: '心', pinyin: 'xīn', thai: 'หัวใจ', strokes: 4 },
      { char: '冰', pinyin: 'bīng', thai: 'น้ำแข็ง', strokes: 6 },
    ],
  },
  {
    id: 'family-classroom',
    label: 'ครอบครัว สรรพนาม & ห้องเรียน',
    chars: [
      { char: '爸', pinyin: 'bà', thai: 'พ่อ', strokes: 8 },
      { char: '妈', pinyin: 'mā', thai: 'แม่', strokes: 6 },
      { char: '哥', pinyin: 'gē', thai: 'พี่ชาย', strokes: 10 },
      { char: '弟', pinyin: 'dì', thai: 'น้องชาย', strokes: 7 },
      { char: '姐', pinyin: 'jiě', thai: 'พี่สาว', strokes: 8 },
      { char: '妹', pinyin: 'mèi', thai: 'น้องสาว', strokes: 8 },
      { char: '您', pinyin: 'nín', thai: 'ท่าน', strokes: 11 },
      { char: '他', pinyin: 'tā', thai: 'เขาผู้ชาย', strokes: 5 },
      { char: '她', pinyin: 'tā', thai: 'เขาผู้หญิง', strokes: 6 },
      { char: '它', pinyin: 'tā', thai: 'มัน', strokes: 5 },
      { char: '们', pinyin: 'men', thai: 'พวก...', strokes: 5 },
      { char: '老', pinyin: 'lǎo', thai: 'แก่/ครู', strokes: 6 },
      { char: '师', pinyin: 'shī', thai: 'ครู', strokes: 6 },
      { char: '学', pinyin: 'xué', thai: 'เรียน', strokes: 8 },
      { char: '生', pinyin: 'shēng', thai: 'นักเรียน', strokes: 5 },
      { char: '谢', pinyin: 'xiè', thai: 'ขอบคุณ', strokes: 12 },
      { char: '上', pinyin: 'shàng', thai: 'ขึ้น/เข้าเรียน', strokes: 3 },
      { char: '下', pinyin: 'xià', thai: 'ลง/เลิกเรียน', strokes: 3 },
      { char: '课', pinyin: 'kè', thai: 'คาบเรียน', strokes: 10 },
      { char: '吃', pinyin: 'chī', thai: 'กิน', strokes: 6 },
      { char: '书', pinyin: 'shū', thai: 'หนังสือ', strokes: 4 },
    ],
  },
  {
    id: 'colors-surnames',
    label: 'สีสัน & แซ่ยอดนิยม',
    chars: [
      { char: '红', pinyin: 'hóng', thai: 'สีแดง', strokes: 6 },
      { char: '绿', pinyin: 'lǜ', thai: 'สีเขียว', strokes: 11 },
      { char: '白', pinyin: 'bái', thai: 'สีขาว', strokes: 5 },
      { char: '蓝', pinyin: 'lán', thai: 'สีน้ำเงิน', strokes: 13 },
      { char: '黑', pinyin: 'hēi', thai: 'สีดำ', strokes: 12 },
      { char: '灰', pinyin: 'huī', thai: 'สีเทา', strokes: 6 },
      { char: '黄', pinyin: 'huáng', thai: 'สีเหลือง/แซ่อึ๊ง', strokes: 11 },
      { char: '李', pinyin: 'Lǐ', thai: 'แซ่หลี่ (หลี)', strokes: 7 },
      { char: '明', pinyin: 'míng', thai: 'สว่าง', strokes: 8 },
      { char: '陈', pinyin: 'Chén', thai: 'แซ่เฉิน (ตั้ง)', strokes: 7 },
      { char: '林', pinyin: 'Lín', thai: 'แซ่หลิน (ลิ้ม)', strokes: 8 },
      { char: '吴', pinyin: 'Wú', thai: 'แซ่อู๋ (โง้ว)', strokes: 7 },
      { char: '徐', pinyin: 'Xú', thai: 'แซ่สวี่ (โค้ว)', strokes: 10 },
      { char: '张', pinyin: 'Zhāng', thai: 'แซ่จาง (เตีย)', strokes: 7 },
      { char: '郑', pinyin: 'Zhèng', thai: 'แซ่เจิ้ง (แต้)', strokes: 8 },
      { char: '刘', pinyin: 'Liú', thai: 'แซ่หลิว (เล่า)', strokes: 6 },
    ],
  },
];
