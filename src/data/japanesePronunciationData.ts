export type JpSoundCategory = 'vowel_tricky' | 'dakuten' | 'yoon' | 'rhythm';

export interface JpSoundExample {
  word: string;
  reading: string;
  romaji: string;
  meaningVi: string;
}

export interface JpSoundItem {
  id: string;
  symbol: string;
  romaji: string;
  category: JpSoundCategory;
  categoryVi: string;
  mouthGuideVi: string;
  vietnameseTip: string;
  examples: JpSoundExample[];
  contrastPair?: {
    wordA: string;
    meaningA: string;
    wordB: string;
    meaningB: string;
  };
}

export interface JpContrastDrill {
  id: string;
  focusLabel: string;
  targetWord: string;
  targetRomaji: string;
  meaningVi: string;
  options: { word: string; label: string }[];
  explanationVi: string;
}

export const JP_SOUND_CATEGORIES: { id: 'all' | JpSoundCategory; label: string }[] = [
  { id: 'all', label: 'Tất cả' },
  { id: 'vowel_tricky', label: 'Nguyên âm & Âm đặc biệt' },
  { id: 'dakuten', label: 'Biến âm (゛・゜)' },
  { id: 'yoon', label: 'Âm ghép Yōon (ゃゅょ)' },
  { id: 'rhythm', label: 'Trường âm & Âm ngắt (っ)' },
];

export const JP_SOUND_ITEMS: JpSoundItem[] = [
  {
    id: 'jp-s-u',
    symbol: 'う / ウ',
    romaji: 'u',
    category: 'vowel_tricky',
    categoryVi: 'Nguyên âm',
    mouthGuideVi: 'Môi thả lỏng dẹt nhẹ, không chu tròn môi ra phía trước như chữ "u" tiếng Việt.',
    vietnameseTip: 'Âm nằm giữa "u" và "ư" nhẹ. Nghe tự nhiên hơn hẳn khi nói です (desu) hay すみません.',
    examples: [
      { word: 'うみ', reading: 'うみ', romaji: 'umi', meaningVi: 'biển' },
      { word: 'ありがとう', reading: 'ありがとう', romaji: 'arigatou', meaningVi: 'cảm ơn' },
    ],
  },
  {
    id: 'jp-s-tsu',
    symbol: 'つ / ツ',
    romaji: 'tsu',
    category: 'vowel_tricky',
    categoryVi: 'Âm đặc biệt',
    mouthGuideVi: 'Đầu lưỡi chạm nhẹ lợi trên như sắp đọc "t", rồi bật hơi xì ra thành "ts + u".',
    vietnameseTip: 'Không đọc thành "chư" hay "xư" rời rạc; ghép nhanh "ts" + "ư/u" trong 1 nhịp.',
    examples: [
      { word: 'つくえ', reading: 'つくえ', romaji: 'tsukue', meaningVi: 'cái bàn' },
      { word: 'あつい', reading: 'あつい', romaji: 'atsui', meaningVi: 'nóng / dày' },
    ],
  },
  {
    id: 'jp-s-fu',
    symbol: 'ふ / フ',
    romaji: 'fu',
    category: 'vowel_tricky',
    categoryVi: 'Âm đặc biệt',
    mouthGuideVi: 'Răng trên KHÔNG cắn môi dưới như chữ "ph/f" tiếng Anh; hai môi hơi khép và thổi luồng hơi nhẹ ở giữa.',
    vietnameseTip: 'Nghe như âm lai giữa "phư" và "hư" rất nhẹ.',
    examples: [
      { word: 'ふゆ', reading: 'ふゆ', romaji: 'fuyu', meaningVi: 'mùa đông' },
      { word: 'ふじさん', reading: 'ふじさん', romaji: 'Fujisan', meaningVi: 'núi Phú Sĩ' },
    ],
  },
  {
    id: 'jp-s-ra',
    symbol: 'らりるれろ',
    romaji: 'r (ra-ri-ru-re-ro)',
    category: 'vowel_tricky',
    categoryVi: 'Âm đặc biệt',
    mouthGuideVi: 'Đầu lưỡi chạm nhẹ 1 cái vào vòm lợi trên rồi bật ra ngay — không rung lưỡi như "r" Việt Nam.',
    vietnameseTip: 'Âm nghe lai giữa "r" nhẹ và "l/đ" (giống âm tt trong "better" giọng Mỹ).',
    examples: [
      { word: 'さくら', reading: 'さくら', romaji: 'sakura', meaningVi: 'hoa anh đào' },
      { word: 'りょこう', reading: 'りょこう', romaji: 'ryokou', meaningVi: 'du lịch' },
    ],
  },
  {
    id: 'jp-s-n',
    symbol: 'ん / ン',
    romaji: 'n / m / ng',
    category: 'vowel_tricky',
    categoryVi: 'Âm mũi (1 nhịp riêng)',
    mouthGuideVi: 'Được tính hẳn là 1 nhịp phách (mora). Đứng trước m/b/p đọc khép môi thành "m", trước k/g đọc thành "ng", cuối từ hơi ngậm mũi.',
    vietnameseTip: 'Chữ しんぶん (báo) đọc là "shim-bun" (4 nhịp: shi-m-bu-n).',
    examples: [
      { word: 'しんぶん', reading: 'しんぶん', romaji: 'shinbun', meaningVi: 'tờ báo' },
      { word: 'にほん', reading: 'にほん', romaji: 'Nihon', meaningVi: 'Nhật Bản' },
    ],
  },
  // Dakuten & Handakuten
  {
    id: 'jp-s-g',
    symbol: 'がぎぐげご',
    romaji: 'ga gi gu ge go',
    category: 'dakuten',
    categoryVi: 'Biến âm Dakuten (゛)',
    mouthGuideVi: 'Thêm dấu ゛ vào hàng か (k) để rung dây thanh quản thành âm "g".',
    vietnameseTip: 'Đứng giữa từ đôi khi người Nhật đọc mềm hơi hướng "ng" nhẹ (VD: にほんご).',
    examples: [
      { word: 'がっこう', reading: 'がっこう', romaji: 'gakkou', meaningVi: 'trường học' },
      { word: 'えいが', reading: 'えいが', romaji: 'eiga', meaningVi: 'phim ảnh' },
    ],
  },
  {
    id: 'jp-s-z',
    symbol: 'ざじずぜぞ',
    romaji: 'za ji zu ze zo',
    category: 'dakuten',
    categoryVi: 'Biến âm Dakuten (゛)',
    mouthGuideVi: 'Thêm dấu ゛ vào hàng さ (s). Chú ý し＋゛ đọc là じ (ji/dji).',
    vietnameseTip: 'じ phát âm tròn hơn âm "gi" miền Bắc, gần "ji" (như jeans nhẹ).',
    examples: [
      { word: 'じかん', reading: 'じかん', romaji: 'jikan', meaningVi: 'thời gian' },
      { word: 'ざっし', reading: 'ざっし', romaji: 'zasshi', meaningVi: 'tạp chí' },
    ],
  },
  {
    id: 'jp-s-d',
    symbol: 'だぢづでど',
    romaji: 'da (ji) (zu) de do',
    category: 'dakuten',
    categoryVi: 'Biến âm Dakuten (゛)',
    mouthGuideVi: 'Thêm dấu ゛ vào hàng た (t). Phổ biến nhất là だ, で, ど.',
    vietnameseTip: 'Âm "d" đọc dứt khoát như chữ "đ" Việt Nam nhưng nhẹ hơn một chút.',
    examples: [
      { word: 'ともだち', reading: 'ともだち', romaji: 'tomodachi', meaningVi: 'bạn bè' },
      { word: 'でんしゃ', reading: 'でんしゃ', romaji: 'densha', meaningVi: 'tàu điện' },
    ],
  },
  {
    id: 'jp-s-b',
    symbol: 'ばびぶべぼ',
    romaji: 'ba bi bu be bo',
    category: 'dakuten',
    categoryVi: 'Biến âm Dakuten (゛)',
    mouthGuideVi: 'Thêm dấu ゛ vào hàng は (h) biến âm hơi thành âm môi hữu thanh "b".',
    vietnameseTip: 'Mím nhẹ hai môi rồi bật ra âm "b" gọn.',
    examples: [
      { word: 'かばん', reading: 'かばん', romaji: 'kaban', meaningVi: 'cặp sách, túi' },
      { word: 'あそびます', reading: 'あそびます', romaji: 'asobimasu', meaningVi: 'chơi' },
    ],
  },
  {
    id: 'jp-s-p',
    symbol: 'ぱぴぷぺぽ',
    romaji: 'pa pi pu pe po',
    category: 'dakuten',
    categoryVi: 'Bán đục Handakuten (゜)',
    mouthGuideVi: 'Thêm vòng tròn ゜ vào hàng は (h) để bật hơi mạnh ở môi thành "p".',
    vietnameseTip: 'Khác biệt rõ với "b": "p" phải có luồng hơi bật nhẹ ra từ môi.',
    examples: [
      { word: 'えんぴつ', reading: 'えんぴつ', romaji: 'enpitsu', meaningVi: 'bút chì' },
      { word: 'パソコン', reading: 'ぱそこん', romaji: 'pasokon', meaningVi: 'máy tính cá nhân' },
    ],
  },
  // Yoon
  {
    id: 'jp-s-kya',
    symbol: 'きゃ・きゅ・きょ',
    romaji: 'kya kyu kyo',
    category: 'yoon',
    categoryVi: 'Âm ghép Yōon',
    mouthGuideVi: 'Ghép き với や・ゆ・よ viết nhỏ thành ĐÚNG 1 nhịp phách liền mạch.',
    vietnameseTip: 'Đừng tách thành 2 chữ "ki-ya"; đọc lướt liền "kya", "kyu", "kyo".',
    examples: [
      { word: 'おきゃくさん', reading: 'おきゃくさん', romaji: 'okyakusan', meaningVi: 'khách hàng' },
      { word: 'きょう', reading: 'きょう', romaji: 'kyou', meaningVi: 'hôm nay' },
    ],
  },
  {
    id: 'jp-s-sha',
    symbol: 'しゃ・しゅ・しょ',
    romaji: 'sha shu sho',
    category: 'yoon',
    categoryVi: 'Âm ghép Yōon',
    mouthGuideVi: 'Ghép し với や・ゆ・よ nhỏ, cong nhẹ đầu lưỡi tạo âm "sh" êm.',
    vietnameseTip: 'Gần như "sa/su/so" uốn lưỡi hoặc "sh" trong "shop" tiếng Anh.',
    examples: [
      { word: 'しゃしん', reading: 'しゃしん', romaji: 'shashin', meaningVi: 'bức ảnh' },
      { word: 'しゅくだい', reading: 'しゅくだい', romaji: 'shukudai', meaningVi: 'bài tập về nhà' },
    ],
  },
  {
    id: 'jp-s-cha',
    symbol: 'ちゃ・ちゅ・ちょ',
    romaji: 'cha chu cho',
    category: 'yoon',
    categoryVi: 'Âm ghép Yōon',
    mouthGuideVi: 'Ghép ち với や・ゆ・よ nhỏ tạo âm "ch" bật hơi nhẹ.',
    vietnameseTip: 'Rất quen thuộc qua từ おちゃ (trà) và ちょっと (một chút).',
    examples: [
      { word: 'おちゃ', reading: 'おちゃ', romaji: 'ocha', meaningVi: 'trà' },
      { word: 'ちょっと', reading: 'ちょっと', romaji: 'chotto', meaningVi: 'một chút' },
    ],
  },
  {
    id: 'jp-s-rya',
    symbol: 'りゃ・りゅ・りょ / にゃ・みゃ',
    romaji: 'rya ryu ryo / nya mya',
    category: 'yoon',
    categoryVi: 'Âm ghép Yōon',
    mouthGuideVi: 'Chạm nhẹ đầu lưỡi rồi lướt ngay sang ya/yu/yo trong 1 nhịp.',
    vietnameseTip: 'りょうり (ryouri - món ăn) đọc 3 nhịp: ryo-u-ri, nghe mượt không vấp.',
    examples: [
      { word: 'りょうり', reading: 'りょうり', romaji: 'ryouri', meaningVi: 'nấu ăn, món ăn' },
      { word: 'びょういん', reading: 'びょういん', romaji: 'byouin', meaningVi: 'bệnh viện' },
    ],
  },
  // Rhythm / Mora
  {
    id: 'jp-s-long-vowel',
    symbol: 'あ・い・う / ー',
    romaji: 'Trường âm (2 nhịp)',
    category: 'rhythm',
    categoryVi: 'Nhịp phách Mora',
    mouthGuideVi: 'Giữ nguyên khẩu hình và kéo dài âm gấp ĐÔI một âm thường (2 nhịp phách bằng nhau). Katakana dùng dấu gạch ー.',
    vietnameseTip: 'Sai trường âm sẽ ra nghĩa hoàn toàn khác! VD: おばさん (cô) ≠ おばあさん (bà).',
    examples: [
      { word: 'おばあさん', reading: 'おばあさん', romaji: 'obaasan', meaningVi: 'bà (4 nhịp: o-ba-a-san)' },
      { word: 'コーヒー', reading: 'こーひー', romaji: 'koohii', meaningVi: 'cà phê (4 nhịp: ko-o-hi-i)' },
    ],
    contrastPair: {
      wordA: 'おばさん',
      meaningA: 'cô / dì (ngắn)',
      wordB: 'おばあさん',
      meaningB: 'bà (kéo dài あ)',
    },
  },
  {
    id: 'jp-s-sokuon',
    symbol: 'っ / ッ',
    romaji: 'Âm ngắt Sokuon (1 nhịp ngừng)',
    category: 'rhythm',
    categoryVi: 'Nhịp phách Mora',
    mouthGuideVi: 'Chữ っ nhỏ ngắt luồng hơi trong ĐÚNG 1 nhịp trống trước khi bật phụ âm kế tiếp (k, t, p, s).',
    vietnameseTip: 'Tưởng tượng dừng 1 phách nhịp chân giữa từ: き・っ・て (ki - [ngừng] - te).',
    examples: [
      { word: 'きって', reading: 'きって', romaji: 'kitte', meaningVi: 'con tem (3 nhịp)' },
      { word: 'きっぷ', reading: 'きっぷ', romaji: 'kippu', meaningVi: 'vé tàu (3 nhịp)' },
    ],
    contrastPair: {
      wordA: 'きて',
      meaningA: 'hãy đến (2 nhịp)',
      wordB: 'きって',
      meaningB: 'con tem (3 nhịp - có っ)',
    },
  },
];

export const JP_CONTRAST_DRILLS: JpContrastDrill[] = [
  {
    id: 'jp-drill-1',
    focusLabel: 'Trường âm あ vs ngắn',
    targetWord: 'おばあさん',
    targetRomaji: 'obaasan',
    meaningVi: 'Bà (kéo dài âm ba-a)',
    options: [
      { word: 'おばさん', label: 'おばさん (cô / dì)' },
      { word: 'おばあさん', label: 'おばあさん (bà)' },
    ],
    explanationVi: 'Âm "ba" được kéo dài thành 2 nhịp ("ba-a") → おばあさん (bà).',
  },
  {
    id: 'jp-drill-2',
    focusLabel: 'Âm ngắt っ nhỏ (Sokuon)',
    targetWord: 'きって',
    targetRomaji: 'kitte',
    meaningVi: 'Con tem thư',
    options: [
      { word: 'きて', label: 'きて (hãy đến)' },
      { word: 'きって', label: 'きって (con tem)' },
    ],
    explanationVi: 'Có 1 nhịp dừng rõ ở giữa sebelum âm "te" → きって (kitte).',
  },
  {
    id: 'jp-drill-3',
    focusLabel: 'Âm ghép ょ vs tách âm よ',
    targetWord: 'びょういん',
    targetRomaji: 'byouin',
    meaningVi: 'Bệnh viện',
    options: [
      { word: 'びょういん', label: 'びょういん (bệnh viện)' },
      { word: 'びよういん', label: 'びよういん (tiệm làm tóc)' },
    ],
    explanationVi: 'びょういん (byou-in) ghép びょ thành 1 nhịp = bệnh viện; còn びよういん (bi-you-in) tách âm = tiệm làm tóc.',
  },
  {
    id: 'jp-drill-4',
    focusLabel: 'Trường âm お vs ngắn',
    targetWord: 'こうこう',
    targetRomaji: 'koukou',
    meaningVi: 'Trường cấp 3 (THPT)',
    options: [
      { word: 'ここ', label: 'ここ (ở đây)' },
      { word: 'こうこう', label: 'こうこう (trường cấp 3)' },
    ],
    explanationVi: 'こうこう dài gấp đôi ここ (4 nhịp phách so với 2 nhịp).',
  },
  {
    id: 'jp-drill-5',
    focusLabel: 'Âm ngắt っ trong danh từ',
    targetWord: 'ざっし',
    targetRomaji: 'zasshi',
    meaningVi: 'Tạp chí',
    options: [
      { word: 'ざし', label: 'ざし (không có âm ngắt)' },
      { word: 'ざっし', label: 'ざっし (tạp chí)' },
    ],
    explanationVi: 'Khi gặp っ đứng trước し, ta giữ hơi xì "s" trong 1 nhịp rồi mới đọc し.',
  },
  {
    id: 'jp-drill-6',
    focusLabel: 'Phân biệt Dakuten ゛ vs Handakuten ゜',
    targetWord: 'えんぴつ',
    targetRomaji: 'enpitsu',
    meaningVi: 'Bút chì',
    options: [
      { word: 'えんぴつ', label: 'えんぴつ (bút chì - âm p)' },
      { word: 'えんびつ', label: 'えんびつ (âm b)' },
    ],
    explanationVi: 'ぴ có vòng tròn nhỏ ゜ đọc bật hơi là "pi" → えんぴつ.',
  },
];
