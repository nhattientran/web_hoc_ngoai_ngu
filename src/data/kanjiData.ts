import { KanjiItem, LessonPastel } from '../types';

export interface KanjiGroupMeta {
  id: string;
  title: string;
  pastel: LessonPastel;
  descriptionVi: string;
}

export const KANJI_GROUPS: KanjiGroupMeta[] = [
  { id: 'numbers', title: 'Số đếm', pastel: 'blue', descriptionVi: 'Số đếm cơ bản từ 1 đến 10.000 và đơn vị tiền Yên.' },
  { id: 'time', title: 'Ngày và giờ', pastel: 'lavender', descriptionVi: 'Ngày trong tuần, giờ phút, năm tháng.' },
  { id: 'people', title: 'Con người', pastel: 'yellow', descriptionVi: 'Gia đình, giới tính và bộ phận cơ thể.' },
  { id: 'nature', title: 'Thiên nhiên & Nơi chốn', pastel: 'green', descriptionVi: 'Núi, sông, thời tiết, nhà ga và đường phố.' },
  { id: 'direction', title: 'Vị trí & Phương hướng', pastel: 'pink', descriptionVi: 'Trên, dưới, trong, ngoài và bốn phương.' },
  { id: 'verbs1', title: 'Động từ (1)', pastel: 'blue', descriptionVi: 'Đi, đến, nhìn, nghe, ăn, uống, đọc, viết.' },
  { id: 'verbs2', title: 'Động từ (2)', pastel: 'lavender', descriptionVi: 'Nói, mua, nghỉ, ra, vào, đứng, gặp.' },
  { id: 'adjectives', title: 'Tính từ', pastel: 'yellow', descriptionVi: 'To, nhỏ, cao, rẻ, mới, cũ, dài, trắng, nhiều, ít.' },
  { id: 'school', title: 'Trường học & Câu hỏi', pastel: 'green', descriptionVi: 'Học tập, trường lớp, sách vở và từ để hỏi.' },
];

export const KANJI_N5_ITEMS: KanjiItem[] = [
  // Số đếm
  {
    char: '一', sinoVi: 'NHẤT', meaningVi: 'Một', onyomi: 'イチ (ichi)', kunyomi: 'ひと(つ)', strokes: 1, topic: 'numbers',
    vocab: [{ word: '一つ', reading: 'ひとつ', meaningVi: 'một cái' }, { word: '一日', reading: 'ついたち', meaningVi: 'mùng 1' }],
    example: 'りんごを一つください。', exampleVi: 'Cho tôi một quả táo.'
  },
  {
    char: '二', sinoVi: 'NHỊ', meaningVi: 'Hai', onyomi: 'ニ (ni)', kunyomi: 'ふた(つ)', strokes: 2, topic: 'numbers',
    vocab: [{ word: '二つ', reading: 'ふたつ', meaningVi: 'hai cái' }, { word: '二月', reading: 'にがつ', meaningVi: 'tháng 2' }],
    example: '二時に会いましょう。', exampleVi: 'Hẹn gặp lúc 2 giờ nhé.'
  },
  {
    char: '三', sinoVi: 'TAM', meaningVi: 'Ba', onyomi: 'サン (san)', kunyomi: 'みっ(つ)', strokes: 3, topic: 'numbers',
    vocab: [{ word: '三つ', reading: 'みっつ', meaningVi: 'ba cái' }, { word: '三月', reading: 'さんがつ', meaningVi: 'tháng 3' }],
    example: '三人で旅行します。', exampleVi: 'Chúng tôi đi du lịch 3 người.'
  },
  {
    char: '四', sinoVi: 'TỨ', meaningVi: 'Bốn', onyomi: 'シ (shi)', kunyomi: 'よん / よっ(つ)', strokes: 5, topic: 'numbers',
    vocab: [{ word: '四月', reading: 'しがつ', meaningVi: 'tháng 4' }, { word: '四つ', reading: 'よっつ', meaningVi: 'bốn cái' }],
    example: '部屋が四つあります。', exampleVi: 'Có 4 căn phòng.'
  },
  {
    char: '五', sinoVi: 'NGŨ', meaningVi: 'Năm (5)', onyomi: 'ゴ (go)', kunyomi: 'いつ(つ)', strokes: 4, topic: 'numbers',
    vocab: [{ word: '五月', reading: 'ごがつ', meaningVi: 'tháng 5' }, { word: '五分', reading: 'ごふん', meaningVi: '5 phút' }],
    example: '五時に起きます。', exampleVi: 'Tôi thức dậy lúc 5 giờ.'
  },
  {
    char: '六', sinoVi: 'LỤC', meaningVi: 'Sáu', onyomi: 'ロク (roku)', kunyomi: 'むっ(つ)', strokes: 4, topic: 'numbers',
    vocab: [{ word: '六月', reading: 'ろくがつ', meaningVi: 'tháng 6' }],
    example: '六時半に出かけます。', exampleVi: 'Tôi ra ngoài lúc 6 giờ rưỡi.'
  },
  {
    char: '七', sinoVi: 'THẤT', meaningVi: 'Bảy', onyomi: 'シチ (shichi)', kunyomi: 'なな(つ)', strokes: 2, topic: 'numbers',
    vocab: [{ word: '七月', reading: 'しちがつ', meaningVi: 'tháng 7' }],
    example: '七時に晩ご飯を食べます。', exampleVi: 'Tôi ăn tối lúc 7 giờ.'
  },
  {
    char: '八', sinoVi: 'BÁT', meaningVi: 'Tám', onyomi: 'ハチ (hachi)', kunyomi: 'やっ(つ)', strokes: 2, topic: 'numbers',
    vocab: [{ word: '八月', reading: 'はちがつ', meaningVi: 'tháng 8' }],
    example: '八時間寝ました。', exampleVi: 'Tôi đã ngủ 8 tiếng.'
  },
  {
    char: '九', sinoVi: 'CỬU', meaningVi: 'Chín', onyomi: 'キュウ / ク', kunyomi: 'ここの(つ)', strokes: 2, topic: 'numbers',
    vocab: [{ word: '九月', reading: 'くがつ', meaningVi: 'tháng 9' }],
    example: '九時に会社に着きます。', exampleVi: 'Tôi đến công ty lúc 9 giờ.'
  },
  {
    char: '十', sinoVi: 'THẬP', meaningVi: 'Mười', onyomi: 'ジュウ (juu)', kunyomi: 'とお', strokes: 2, topic: 'numbers',
    vocab: [{ word: '十月', reading: 'じゅうがつ', meaningVi: 'tháng 10' }],
    example: '十分待ちました。', exampleVi: 'Tôi đã đợi 10 phút.'
  },
  {
    char: '百', sinoVi: 'BÁCH', meaningVi: 'Trăm', onyomi: 'ヒャク (hyaku)', kunyomi: '-', strokes: 6, topic: 'numbers',
    vocab: [{ word: '百円', reading: 'ひゃくえん', meaningVi: '100 yên' }, { word: '三百', reading: 'さんびゃく', meaningVi: '300' }],
    example: 'このペンは百円です。', exampleVi: 'Cây bút này giá 100 yên.'
  },
  {
    char: '千', sinoVi: 'THIÊN', meaningVi: 'Nghìn', onyomi: 'セン (sen)', kunyomi: 'ち', strokes: 3, topic: 'numbers',
    vocab: [{ word: '千円', reading: 'せんえん', meaningVi: '1.000 yên' }],
    example: '千円貸してください。', exampleVi: 'Hãy cho tôi mượn 1.000 yên.'
  },
  {
    char: '万', sinoVi: 'VẠN', meaningVi: 'Mười nghìn (1 vạn)', onyomi: 'マン (man)', kunyomi: '-', strokes: 3, topic: 'numbers',
    vocab: [{ word: '一万円', reading: 'いちまんえん', meaningVi: '10.000 yên' }],
    example: 'このカメラは二万円です。', exampleVi: 'Chiếc máy ảnh này giá 20.000 yên.'
  },
  {
    char: '円', sinoVi: 'VIÊN', meaningVi: 'Yên Nhật / Hình tròn', onyomi: 'エン (en)', kunyomi: 'まる(い)', strokes: 4, topic: 'numbers',
    vocab: [{ word: '五百円', reading: 'ごひゃくえん', meaningVi: '500 yên' }],
    example: '全部で五百円です。', exampleVi: 'Tổng cộng là 500 yên.'
  },

  // Ngày và giờ
  {
    char: '日', sinoVi: 'NHẬT', meaningVi: 'Ngày / Mặt trời', onyomi: 'ニチ / ジツ', kunyomi: 'ひ / か', strokes: 4, topic: 'time',
    vocab: [{ word: '日本', reading: 'にほん', meaningVi: 'Nhật Bản' }, { word: '今日', reading: 'きょう', meaningVi: 'hôm nay' }],
    example: '今日はいい天気ですね。', exampleVi: 'Hôm nay thời tiết đẹp nhỉ.'
  },
  {
    char: '月', sinoVi: 'NGUYỆT', meaningVi: 'Tháng / Mặt trăng', onyomi: 'ゲツ / ガツ', kunyomi: 'つき', strokes: 4, topic: 'time',
    vocab: [{ word: '月曜日', reading: 'げつようび', meaningVi: 'Thứ Hai' }, { word: '来月', reading: 'らいげつ', meaningVi: 'tháng sau' }],
    example: '来月日本へ行きます。', exampleVi: 'Tháng sau tôi sẽ đi Nhật Bản.'
  },
  {
    char: '火', sinoVi: 'HỎA', meaningVi: 'Lửa / Thứ Ba', onyomi: 'カ (ka)', kunyomi: 'ひ', strokes: 4, topic: 'time',
    vocab: [{ word: '火曜日', reading: 'かようび', meaningVi: 'Thứ Ba' }],
    example: '火曜日にテストがあります。', exampleVi: 'Thứ Ba có bài kiểm tra.'
  },
  {
    char: '水', sinoVi: 'THỦY', meaningVi: 'Nước / Thứ Tư', onyomi: 'スイ (sui)', kunyomi: 'みず', strokes: 4, topic: 'time',
    vocab: [{ word: '水曜日', reading: 'すいようび', meaningVi: 'Thứ Tư' }, { word: '水', reading: 'みず', meaningVi: 'nước' }],
    example: '冷たい水を飲みます。', exampleVi: 'Tôi uống nước lạnh.'
  },
  {
    char: '木', sinoVi: 'MỘC', meaningVi: 'Cây / Thứ Năm', onyomi: 'モク / ボク', kunyomi: 'き', strokes: 4, topic: 'time',
    vocab: [{ word: '木曜日', reading: 'もくようび', meaningVi: 'Thứ Năm' }],
    example: '公園に大きい木があります。', exampleVi: 'Ở công viên có cái cây to.'
  },
  {
    char: '金', sinoVi: 'KIM', meaningVi: 'Tiền / Vàng / Thứ Sáu', onyomi: 'キン (kin)', kunyomi: 'かね', strokes: 8, topic: 'time',
    vocab: [{ word: '金曜日', reading: 'きんようび', meaningVi: 'Thứ Sáu' }, { word: 'お金', reading: 'おかね', meaningVi: 'tiền bạc' }],
    example: '金曜日が一番好きです。', exampleVi: 'Tôi thích thứ Sáu nhất.'
  },
  {
    char: '土', sinoVi: 'THỔ', meaningVi: 'Đất / Thứ Bảy', onyomi: 'ド / ト', kunyomi: 'つち', strokes: 3, topic: 'time',
    vocab: [{ word: '土曜日', reading: 'どようび', meaningVi: 'Thứ Bảy' }],
    example: '土曜日は休みです。', exampleVi: 'Thứ Bảy là ngày nghỉ.'
  },
  {
    char: '年', sinoVi: 'NIÊN', meaningVi: 'Năm', onyomi: 'ネン (nen)', kunyomi: 'とし', strokes: 6, topic: 'time',
    vocab: [{ word: '今年', reading: 'ことし', meaningVi: 'năm nay' }, { word: '来年', reading: 'らいねん', meaningVi: 'năm sau' }],
    example: '来年大学を卒業します。', exampleVi: 'Năm sau tôi sẽ tốt nghiệp đại học.'
  },
  {
    char: '時', sinoVi: 'THỜI', meaningVi: 'Giờ / Thời gian', onyomi: 'ジ (ji)', kunyomi: 'とき', strokes: 10, topic: 'time',
    vocab: [{ word: '時間', reading: 'じかん', meaningVi: 'thời gian' }, { word: '時計', reading: 'とけい', meaningVi: 'đồng hồ' }],
    example: '今何時ですか。', exampleVi: 'Bây giờ là mấy giờ rồi?'
  },
  {
    char: '分', sinoVi: 'PHÂN', meaningVi: 'Phút / Chia / Hiểu', onyomi: 'フン / ブン', kunyomi: 'わ(かる)', strokes: 4, topic: 'time',
    vocab: [{ word: '十分', reading: 'じゅっぷん', meaningVi: '10 phút' }, { word: '分かります', reading: 'わかります', meaningVi: 'hiểu' }],
    example: '日本語が少し分かります。', exampleVi: 'Tôi hiểu một chút tiếng Nhật.'
  },
  {
    char: '今', sinoVi: 'KIM', meaningVi: 'Bây giờ', onyomi: 'コン (kon)', kunyomi: 'いま', strokes: 4, topic: 'time',
    vocab: [{ word: '今', reading: 'いま', meaningVi: 'bây giờ' }, { word: '今週', reading: 'こんしゅう', meaningVi: 'tuần này' }],
    example: '今、勉強しています。', exampleVi: 'Bây giờ tôi đang học bài.'
  },

  // Con người
  {
    char: '人', sinoVi: 'NHÂN', meaningVi: 'Người', onyomi: 'ジン / ニン', kunyomi: 'ひと', strokes: 2, topic: 'people',
    vocab: [{ word: '日本人', reading: 'にほんじん', meaningVi: 'người Nhật' }, { word: 'ベトナム人', reading: 'べとなむじん', meaningVi: 'người Việt Nam' }],
    example: 'あの人は先生です。', exampleVi: 'Người kia là giáo viên.'
  },
  {
    char: '男', sinoVi: 'NAM', meaningVi: 'Đàn ông / Con trai', onyomi: 'ダン (dan)', kunyomi: 'おとこ', strokes: 7, topic: 'people',
    vocab: [{ word: '男の人', reading: 'おとこのひと', meaningVi: 'người đàn ông' }],
    example: '男の子が走っています。', exampleVi: 'Cậu bé đang chạy.'
  },
  {
    char: '女', sinoVi: 'NỮ', meaningVi: 'Phụ nữ / Con gái', onyomi: 'ジョ (jo)', kunyomi: 'おんな', strokes: 3, topic: 'people',
    vocab: [{ word: '女の人', reading: 'おんなのひと', meaningVi: 'người phụ nữ' }],
    example: '女の人が本を読んでいます。', exampleVi: 'Người phụ nữ đang đọc sách.'
  },
  {
    char: '子', sinoVi: 'TỬ', meaningVi: 'Trẻ em / Con', onyomi: 'シ (shi)', kunyomi: 'こ', strokes: 3, topic: 'people',
    vocab: [{ word: '子ども', reading: 'こども', meaningVi: 'trẻ em' }],
    example: '子どもたちが遊んでいます。', exampleVi: 'Bọn trẻ đang chơi đùa.'
  },
  {
    char: '父', sinoVi: 'PHỤ', meaningVi: 'Bố / Cha', onyomi: 'フ (fu)', kunyomi: 'ちち', strokes: 4, topic: 'people',
    vocab: [{ word: 'お父さん', reading: 'おとうさん', meaningVi: 'bố (lịch sự)' }],
    example: '父は会社員です。', exampleVi: 'Bố tôi là nhân viên công ty.'
  },
  {
    char: '母', sinoVi: 'MẪU', meaningVi: 'Mẹ', onyomi: 'ボ (bo)', kunyomi: 'はは', strokes: 5, topic: 'people',
    vocab: [{ word: 'お母さん', reading: 'おかあさん', meaningVi: 'mẹ (lịch sự)' }],
    example: '母の料理はおいしいです。', exampleVi: 'Món ăn của mẹ tôi rất ngon.'
  },
  {
    char: '友', sinoVi: 'HỮU', meaningVi: 'Bạn bè', onyomi: 'ユウ (yuu)', kunyomi: 'とも', strokes: 4, topic: 'people',
    vocab: [{ word: '友達', reading: 'ともだち', meaningVi: 'bạn bè' }],
    example: '週末に友達と会います。', exampleVi: 'Cuối tuần tôi gặp bạn bè.'
  },
  {
    char: '名', sinoVi: 'DANH', meaningVi: 'Tên', onyomi: 'メイ (mei)', kunyomi: 'な', strokes: 6, topic: 'people',
    vocab: [{ word: '名前', reading: 'なまえ', meaningVi: 'tên' }],
    example: 'お名前は何ですか。', exampleVi: 'Tên của bạn là gì?'
  },

  // Thiên nhiên & nơi chốn
  {
    char: '山', sinoVi: 'SƠN', meaningVi: 'Núi', onyomi: 'サン (san)', kunyomi: 'やま', strokes: 3, topic: 'nature',
    vocab: [{ word: '富士山', reading: 'ふじさん', meaningVi: 'núi Phú Sĩ' }],
    example: '富士山はとてもきれいです。', exampleVi: 'Núi Phú Sĩ rất đẹp.'
  },
  {
    char: '川', sinoVi: 'XUYÊN', meaningVi: 'Sông', onyomi: 'セン (sen)', kunyomi: 'かわ', strokes: 3, topic: 'nature',
    vocab: [{ word: '川', reading: 'かわ', meaningVi: 'con sông' }],
    example: '川のそばを歩きます。', exampleVi: 'Tôi đi bộ bên bờ sông.'
  },
  {
    char: '天', sinoVi: 'THIÊN', meaningVi: 'Trời', onyomi: 'テン (ten)', kunyomi: 'あま', strokes: 4, topic: 'nature',
    vocab: [{ word: '天気', reading: 'てんき', meaningVi: 'thời tiết' }],
    example: '明日の天気は晴れです。', exampleVi: 'Thời tiết ngày mai nắng đẹp.'
  },
  {
    char: '気', sinoVi: 'KHÍ', meaningVi: 'Khí / Tinh thần', onyomi: 'キ (ki)', kunyomi: '-', strokes: 6, topic: 'nature',
    vocab: [{ word: '元気', reading: 'げんき', meaningVi: 'khỏe mạnh' }, { word: '電気', reading: 'でんき', meaningVi: 'điện' }],
    example: 'お元気ですか。', exampleVi: 'Bạn có khỏe không?'
  },
  {
    char: '駅', sinoVi: 'DỊCH', meaningVi: 'Nhà ga', onyomi: 'エキ (eki)', kunyomi: '-', strokes: 14, topic: 'nature',
    vocab: [{ word: '駅', reading: 'えき', meaningVi: 'nhà ga' }, { word: '駅前', reading: 'えきまえ', meaningVi: 'trước nhà ga' }],
    example: '駅まで歩いて十分です。', exampleVi: 'Đi bộ đến nhà ga mất 10 phút.'
  },
  {
    char: '電', sinoVi: 'ĐIỆN', meaningVi: 'Điện', onyomi: 'デン (den)', kunyomi: '-', strokes: 13, topic: 'nature',
    vocab: [{ word: '電車', reading: 'でんしゃ', meaningVi: 'tàu điện' }, { word: '電話', reading: 'でんわ', meaningVi: 'điện thoại' }],
    example: '電車で学校へ行きます。', exampleVi: 'Tôi đi học bằng tàu điện.'
  },

  // Vị trí & Phương hướng
  {
    char: '上', sinoVi: 'THƯỢNG', meaningVi: 'Trên', onyomi: 'ジョウ (jou)', kunyomi: 'うえ / あ(がる)', strokes: 3, topic: 'direction',
    vocab: [{ word: '上', reading: 'うえ', meaningVi: 'bên trên' }, { word: '上手', reading: 'じょうず', meaningVi: 'giỏi, khéo' }],
    example: '机の上に本があります。', exampleVi: 'Có quyển sách ở trên bàn.'
  },
  {
    char: '下', sinoVi: 'HẠ', meaningVi: 'Dưới', onyomi: 'カ / ゲ', kunyomi: 'した / さ(がる)', strokes: 3, topic: 'direction',
    vocab: [{ word: '下', reading: 'した', meaningVi: 'bên dưới' }, { word: '地下鉄', reading: 'ちかてつ', meaningVi: 'tàu điện ngầm' }],
    example: 'いすの下に猫がいます。', exampleVi: 'Có con mèo ở dưới ghế.'
  },
  {
    char: '中', sinoVi: 'TRUNG', meaningVi: 'Bên trong / Ở giữa', onyomi: 'チュウ (chuu)', kunyomi: 'なか', strokes: 4, topic: 'direction',
    vocab: [{ word: '中', reading: 'なか', meaningVi: 'bên trong' }],
    example: 'かばんの中に財布があります。', exampleVi: 'Trong cặp có cái ví.'
  },
  {
    char: '右', sinoVi: 'HỮU', meaningVi: 'Bên phải', onyomi: 'ウ / ユウ', kunyomi: 'みぎ', strokes: 5, topic: 'direction',
    vocab: [{ word: '右', reading: 'みぎ', meaningVi: 'bên phải' }],
    example: '次の角を右に曲がってください。', exampleVi: 'Hãy rẽ phải ở góc tiếp theo.'
  },
  {
    char: '左', sinoVi: 'TẢ', meaningVi: 'Bên trái', onyomi: 'サ (sa)', kunyomi: 'ひだり', strokes: 5, topic: 'direction',
    vocab: [{ word: '左', reading: 'ひだり', meaningVi: 'bên trái' }],
    example: '駅の左に銀行があります。', exampleVi: 'Bên trái nhà ga có ngân hàng.'
  },

  // Động từ 1 & 2
  {
    char: '行', sinoVi: 'HÀNH', meaningVi: 'Đi', onyomi: 'コウ / ギョウ', kunyomi: 'い(く)', strokes: 6, topic: 'verbs1',
    vocab: [{ word: '行く', reading: 'いく', meaningVi: 'đi' }, { word: '銀行', reading: 'ぎんこう', meaningVi: 'ngân hàng' }],
    example: '明日東京へ行きます。', exampleVi: 'Ngày mai tôi đi Tokyo.'
  },
  {
    char: '来', sinoVi: 'LAI', meaningVi: 'Đến', onyomi: 'ライ (rai)', kunyomi: 'く(る)', strokes: 7, topic: 'verbs1',
    vocab: [{ word: '来る', reading: 'くる', meaningVi: 'đến' }, { word: '来週', reading: 'らいしゅう', meaningVi: 'tuần sau' }],
    example: '友達が家に遊びに来ます。', exampleVi: 'Bạn tôi đến nhà chơi.'
  },
  {
    char: '見', sinoVi: 'KIẾN', meaningVi: 'Nhìn / Xem', onyomi: 'ケン (ken)', kunyomi: 'み(る)', strokes: 7, topic: 'verbs1',
    vocab: [{ word: '見る', reading: 'みる', meaningVi: 'nhìn, xem' }],
    example: '毎晩テレビを見ます。', exampleVi: 'Mỗi tối tôi đều xem tivi.'
  },
  {
    char: '食', sinoVi: 'THỰC', meaningVi: 'Ăn', onyomi: 'ショク (shoku)', kunyomi: 'た(べる)', strokes: 9, topic: 'verbs1',
    vocab: [{ word: '食べる', reading: 'たべる', meaningVi: 'ăn' }, { word: '食堂', reading: 'しょくどう', meaningVi: 'nhà ăn' }],
    example: '朝ご飯を食べましたか。', exampleVi: 'Bạn đã ăn sáng chưa?'
  },
  {
    char: '飲', sinoVi: 'ẨM', meaningVi: 'Uống', onyomi: 'イン (in)', kunyomi: 'の(む)', strokes: 12, topic: 'verbs1',
    vocab: [{ word: '飲む', reading: 'のむ', meaningVi: 'uống' }, { word: '飲み物', reading: 'のみもの', meaningVi: 'đồ uống' }],
    example: 'コーヒーを飲みませんか。', exampleVi: 'Bạn uống cà phê cùng tôi nhé?'
  },
  {
    char: '読', sinoVi: 'ĐỘC', meaningVi: 'Đọc', onyomi: 'ドク (doku)', kunyomi: 'よ(む)', strokes: 14, topic: 'verbs1',
    vocab: [{ word: '読む', reading: 'よむ', meaningVi: 'đọc' }],
    example: '毎日新聞を読みます。', exampleVi: 'Mỗi ngày tôi đều đọc báo.'
  },
  {
    char: '書', sinoVi: 'THƯ', meaningVi: 'Viết', onyomi: 'ショ (sho)', kunyomi: 'か(く)', strokes: 10, topic: 'verbs1',
    vocab: [{ word: '書く', reading: 'かく', meaningVi: 'viết' }, { word: '辞書', reading: 'じしょ', meaningVi: 'từ điển' }],
    example: 'ノートに漢字を書きます。', exampleVi: 'Tôi viết Kanji vào vở.'
  },
  {
    char: '話', sinoVi: 'THOẠI', meaningVi: 'Nói chuyện', onyomi: 'ワ (wa)', kunyomi: 'はな(す) / はなし', strokes: 13, topic: 'verbs2',
    vocab: [{ word: '話す', reading: 'はなす', meaningVi: 'nói' }, { word: '電話', reading: 'でんわ', meaningVi: 'điện thoại' }],
    example: 'ゆっくり話してください。', exampleVi: 'Xin hãy nói chậm một chút.'
  },
  {
    char: '買', sinoVi: 'MẠI', meaningVi: 'Mua', onyomi: 'バイ (bai)', kunyomi: 'か(う)', strokes: 12, topic: 'verbs2',
    vocab: [{ word: '買う', reading: 'かう', meaningVi: 'mua' }, { word: '買い物', reading: 'かいもの', meaningVi: 'mua sắm' }],
    example: 'スーパーで野菜を買います。', exampleVi: 'Tôi mua rau ở siêu thị.'
  },

  // Tính từ
  {
    char: '大', sinoVi: 'ĐẠI', meaningVi: 'To lớn', onyomi: 'ダイ / タイ', kunyomi: 'おお(きい)', strokes: 3, topic: 'adjectives',
    vocab: [{ word: '大きい', reading: 'おおきい', meaningVi: 'to, lớn' }, { word: '大学', reading: 'だいがく', meaningVi: 'đại học' }],
    example: 'この犬はとても大きいです。', exampleVi: 'Con chó này rất to.'
  },
  {
    char: '小', sinoVi: 'TIỂU', meaningVi: 'Nhỏ bé', onyomi: 'ショウ (shou)', kunyomi: 'ちい(さい)', strokes: 3, topic: 'adjectives',
    vocab: [{ word: '小さい', reading: 'ちいさい', meaningVi: 'nhỏ' }],
    example: '小さいかばんがほしいです。', exampleVi: 'Tôi muốn một chiếc túi nhỏ.'
  },
  {
    char: '高', sinoVi: 'CAO', meaningVi: 'Cao / Đắt', onyomi: 'コウ (kou)', kunyomi: 'たか(い)', strokes: 10, topic: 'adjectives',
    vocab: [{ word: '高い', reading: 'たかい', meaningVi: 'cao, đắt' }, { word: '高校', reading: 'こうこう', meaningVi: 'trường cấp 3' }],
    example: 'この時計は少し高いです。', exampleVi: 'Chiếc đồng hồ này hơi đắt.'
  },
  {
    char: '安', sinoVi: 'AN', meaningVi: 'Rẻ / An toàn', onyomi: 'アン (an)', kunyomi: 'やす(い)', strokes: 6, topic: 'adjectives',
    vocab: [{ word: '安い', reading: 'やすい', meaningVi: 'rẻ' }],
    example: 'あの店は安くておいしいです。', exampleVi: 'Quán kia vừa rẻ vừa ngon.'
  },
  {
    char: '新', sinoVi: 'TÂN', meaningVi: 'Mới', onyomi: 'シン (shin)', kunyomi: 'あたら(しい)', strokes: 13, topic: 'adjectives',
    vocab: [{ word: '新しい', reading: 'あたらしい', meaningVi: 'mới' }, { word: '新聞', reading: 'しんぶん', meaningVi: 'báo chí' }],
    example: '新しいパソコンを買いました。', exampleVi: 'Tôi đã mua máy tính mới.'
  },

  // Trường học & Câu hỏi
  {
    char: '学', sinoVi: 'HỌC', meaningVi: 'Học tập', onyomi: 'ガク (gaku)', kunyomi: 'まな(ぶ)', strokes: 8, topic: 'school',
    vocab: [{ word: '学生', reading: 'がくせい', meaningVi: 'học sinh, sinh viên' }, { word: '学校', reading: 'がっこう', meaningVi: 'trường học' }],
    example: '私は大学生です。', exampleVi: 'Tôi là sinh viên đại học.'
  },
  {
    char: '校', sinoVi: 'HIỆU', meaningVi: 'Trường học', onyomi: 'コウ (kou)', kunyomi: '-', strokes: 10, topic: 'school',
    vocab: [{ word: '学校', reading: 'がっこう', meaningVi: 'trường học' }],
    example: '学校は八時に始まります。', exampleVi: 'Trường học bắt đầu lúc 8 giờ.'
  },
  {
    char: '先', sinoVi: 'TIÊN', meaningVi: 'Trước', onyomi: 'セン (sen)', kunyomi: 'さき', strokes: 6, topic: 'school',
    vocab: [{ word: '先生', reading: 'せんせい', meaningVi: 'giáo viên' }, { word: '先週', reading: 'せんしゅう', meaningVi: 'tuần trước' }],
    example: '田中先生はとても親切です。', exampleVi: 'Thầy Tanaka rất tốt bụng.'
  },
  {
    char: '生', sinoVi: 'SINH', meaningVi: 'Sống / Sinh ra', onyomi: 'セイ / ショウ', kunyomi: 'い(きる) / う(まれる)', strokes: 5, topic: 'school',
    vocab: [{ word: '学生', reading: 'がくせい', meaningVi: 'sinh viên' }],
    example: '私はベトナムで生まれました。', exampleVi: 'Tôi sinh ra ở Việt Nam.'
  },
  {
    char: '本', sinoVi: 'BẢN', meaningVi: 'Sách / Gốc', onyomi: 'ホン (hon)', kunyomi: 'もと', strokes: 5, topic: 'school',
    vocab: [{ word: '本', reading: 'ほん', meaningVi: 'sách' }, { word: '日本', reading: 'にほん', meaningVi: 'Nhật Bản' }],
    example: '図書館で本を借ります。', exampleVi: 'Tôi mượn sách ở thư viện.'
  },
  {
    char: '語', sinoVi: 'NGỮ', meaningVi: 'Ngôn ngữ', onyomi: 'ゴ (go)', kunyomi: 'かた(る)', strokes: 14, topic: 'school',
    vocab: [{ word: '日本語', reading: 'にほんご', meaningVi: 'tiếng Nhật' }, { word: '英語', reading: 'えいご', meaningVi: 'tiếng Anh' }],
    example: '日本語の勉強は楽しいです。', exampleVi: 'Việc học tiếng Nhật rất thú vị.'
  },
  {
    char: '何', sinoVi: 'HÀ', meaningVi: 'Cái gì', onyomi: 'カ (ka)', kunyomi: 'なに / なん', strokes: 7, topic: 'school',
    vocab: [{ word: '何', reading: 'なに', meaningVi: 'cái gì' }, { word: '何時', reading: 'なんじ', meaningVi: 'mấy giờ' }],
    example: '趣味は何ですか。', exampleVi: 'Sở thích của bạn là gì?'
  },
  // --- Mở rộng thêm 45 Kanji JLPT N5 thiết yếu (Tổng 110 Kanji) ---
  {
    char: '週', sinoVi: 'CHU', meaningVi: 'Tuần', onyomi: 'シュウ (shū)', kunyomi: '-', strokes: 11, topic: 'time',
    vocab: [{ word: '今週', reading: 'こんしゅう', meaningVi: 'tuần này' }, { word: '週末', reading: 'しゅうまつ', meaningVi: 'cuối tuần' }],
    example: '来週、京都へ行きます。', exampleVi: 'Tuần sau tôi sẽ đi Kyoto.'
  },
  {
    char: '半', sinoVi: 'BÁN', meaningVi: 'Một nửa / Rưỡi', onyomi: 'ハン (han)', kunyomi: 'なか(ば)', strokes: 5, topic: 'time',
    vocab: [{ word: '半分', reading: 'はんぶん', meaningVi: 'một nửa' }, { word: '一時半', reading: 'いちじはん', meaningVi: '1 giờ rưỡi' }],
    example: '今、八時半です。', exampleVi: 'Bây giờ là 8 giờ rưỡi.'
  },
  {
    char: '毎', sinoVi: 'MỖI', meaningVi: 'Mỗi / Hàng', onyomi: 'マイ (mai)', kunyomi: '-', strokes: 6, topic: 'time',
    vocab: [{ word: '毎日', reading: 'まいにち', meaningVi: 'mỗi ngày' }, { word: '毎週', reading: 'まいしゅう', meaningVi: 'mỗi tuần' }],
    example: '毎日日本語を勉強しています。', exampleVi: 'Mỗi ngày tôi đều học tiếng Nhật.'
  },
  {
    char: '午', sinoVi: 'NGỌ', meaningVi: 'Buổi trưa', onyomi: 'ゴ (go)', kunyomi: '-', strokes: 4, topic: 'time',
    vocab: [{ word: '午前', reading: 'ごぜん', meaningVi: 'buổi sáng (AM)' }, { word: '午後', reading: 'ごご', meaningVi: 'buổi chiều (PM)' }],
    example: '午後は図書館で勉強します。', exampleVi: 'Buổi chiều tôi học ở thư viện.'
  },
  {
    char: '早', sinoVi: 'TẢO', meaningVi: 'Sớm / Nhanh', onyomi: 'ソウ (sō)', kunyomi: 'はや(い)', strokes: 6, topic: 'time',
    vocab: [{ word: '早い', reading: 'はやい', meaningVi: 'sớm' }, { word: '朝早く', reading: 'あさはやく', meaningVi: 'sáng sớm' }],
    example: '明日は早く起きなければなりません。', exampleVi: 'Ngày mai tôi phải dậy sớm.'
  },
  {
    char: '目', sinoVi: 'MỤC', meaningVi: 'Mắt / Thứ tự', onyomi: 'モク (moku)', kunyomi: 'め', strokes: 5, topic: 'people',
    vocab: [{ word: '目', reading: 'め', meaningVi: 'đôi mắt' }, { word: '一番目', reading: 'いちばんめ', meaningVi: 'thứ nhất' }],
    example: '目が疲れました。', exampleVi: 'Mắt tôi bị mỏi rồi.'
  },
  {
    char: '耳', sinoVi: 'NHĨ', meaningVi: 'Tai', onyomi: 'ジ (ji)', kunyomi: 'みみ', strokes: 6, topic: 'people',
    vocab: [{ word: '耳', reading: 'みみ', meaningVi: 'tai' }, { word: '耳鼻科', reading: 'じびか', meaningVi: 'khoa tai mũi họng' }],
    example: '母は耳がいいです。', exampleVi: 'Mẹ tôi thính giác rất tốt.'
  },
  {
    char: '口', sinoVi: 'KHẨU', meaningVi: 'Miệng / Lối vào ra', onyomi: 'コウ (kō)', kunyomi: 'くち / ぐち', strokes: 3, topic: 'people',
    vocab: [{ word: '口', reading: 'くち', meaningVi: 'miệng' }, { word: '入口', reading: 'いりぐち', meaningVi: 'lối vào' }],
    example: '駅の北口で会いましょう。', exampleVi: 'Hãy gặp nhau ở cửa Bắc nhà ga.'
  },
  {
    char: '手', sinoVi: 'THỦ', meaningVi: 'Tay', onyomi: 'シュ (shu)', kunyomi: 'て', strokes: 4, topic: 'people',
    vocab: [{ word: '手', reading: 'て', meaningVi: 'bàn tay' }, { word: '上手', reading: 'じょうず', meaningVi: 'giỏi, khéo' }],
    example: '食べる前に手を洗います。', exampleVi: 'Tôi rửa tay trước khi ăn.'
  },
  {
    char: '足', sinoVi: 'TÚC', meaningVi: 'Chân / Đủ', onyomi: 'ソク (soku)', kunyomi: 'あし / た(りる)', strokes: 7, topic: 'people',
    vocab: [{ word: '足', reading: 'あし', meaningVi: 'chân' }, { word: '足りる', reading: 'たりる', meaningVi: 'đủ' }],
    example: 'たくさん歩いて足が痛いです。', exampleVi: 'Đi bộ nhiều nên chân tôi đau.'
  },
  {
    char: '国', sinoVi: 'QUỐC', meaningVi: 'Đất nước', onyomi: 'コク (koku)', kunyomi: 'くに', strokes: 8, topic: 'nature',
    vocab: [{ word: '国', reading: 'くに', meaningVi: 'đất nước' }, { word: '外国', reading: 'がいこく', meaningVi: 'nước ngoài' }],
    example: 'あなたの国はどこですか。', exampleVi: 'Đất nước của bạn ở đâu?'
  },
  {
    char: '雨', sinoVi: 'VŨ', meaningVi: 'Mưa', onyomi: 'ウ (u)', kunyomi: 'あめ', strokes: 8, topic: 'nature',
    vocab: [{ word: '雨', reading: 'あめ', meaningVi: 'mưa' }, { word: '大雨', reading: 'おおあめ', meaningVi: 'mưa to' }],
    example: '外は雨が降っています。', exampleVi: 'Bên ngoài trời đang mưa.'
  },
  {
    char: '花', sinoVi: 'HOA', meaningVi: 'Hoa', onyomi: 'カ (ka)', kunyomi: 'はな', strokes: 7, topic: 'nature',
    vocab: [{ word: '花', reading: 'はな', meaningVi: 'bông hoa' }, { word: '花見', reading: 'はなみ', meaningVi: 'ngắm hoa' }],
    example: '春に桜の花が咲きます。', exampleVi: 'Hoa anh đào nở vào mùa xuân.'
  },
  {
    char: '空', sinoVi: 'KHÔNG', meaningVi: 'Bầu trời / Trống', onyomi: 'クウ (kū)', kunyomi: 'そら / あ(く)', strokes: 8, topic: 'nature',
    vocab: [{ word: '空', reading: 'そら', meaningVi: 'bầu trời' }, { word: '空港', reading: 'くうこう', meaningVi: 'sân bay' }],
    example: '今日の空はとても青いです。', exampleVi: 'Bầu trời hôm nay rất xanh.'
  },
  {
    char: '車', sinoVi: 'XA', meaningVi: 'Xe ô tô', onyomi: 'シャ (sha)', kunyomi: 'くるま', strokes: 7, topic: 'nature',
    vocab: [{ word: '車', reading: 'くるま', meaningVi: 'ô tô' }, { word: '自転車', reading: 'じてんしゃ', meaningVi: 'xe đạp' }],
    example: '父は車で会社へ行きます。', exampleVi: 'Bố tôi đi làm bằng ô tô.'
  },
  {
    char: '店', sinoVi: 'ĐIẾM', meaningVi: 'Cửa hàng', onyomi: 'テン (ten)', kunyomi: 'みせ', strokes: 8, topic: 'nature',
    vocab: [{ word: '店', reading: 'みせ', meaningVi: 'cửa hàng' }, { word: '店員', reading: 'てんいん', meaningVi: 'nhân viên bán hàng' }],
    example: '駅の近くに新しい店があります。', exampleVi: 'Gần nhà ga có một cửa hàng mới.'
  },
  {
    char: '社', sinoVi: 'XÃ', meaningVi: 'Công ty / Đền thờ', onyomi: 'シャ (sha)', kunyomi: 'やしろ', strokes: 7, topic: 'nature',
    vocab: [{ word: '会社', reading: 'かいしゃ', meaningVi: 'công ty' }, { word: '社員', reading: 'しゃいん', meaningVi: 'nhân viên công ty' }],
    example: '兄は日本の会社で働いています。', exampleVi: 'Anh trai tôi làm việc tại một công ty Nhật.'
  },
  {
    char: '道', sinoVi: 'ĐẠO', meaningVi: 'Con đường / Đạo', onyomi: 'ドウ (dō)', kunyomi: 'みち', strokes: 12, topic: 'nature',
    vocab: [{ word: '道', reading: 'みち', meaningVi: 'con đường' }, { word: '柔道', reading: 'じゅうどう', meaningVi: 'võ Judo' }],
    example: 'この道をまっすぐ行ってください。', exampleVi: 'Xin hãy đi thẳng con đường này.'
  },
  {
    char: '海', sinoVi: 'HẢI', meaningVi: 'Biển', onyomi: 'カイ (kai)', kunyomi: 'うみ', strokes: 9, topic: 'nature',
    vocab: [{ word: '海', reading: 'うみ', meaningVi: 'biển' }, { word: '海外', reading: 'かいがい', meaningVi: 'nước ngoài, hải ngoại' }],
    example: '夏休みに家族と海へ行きました。', exampleVi: 'Kỳ nghỉ hè tôi đã đi biển cùng gia đình.'
  },
  {
    char: '前', sinoVi: 'TIỀN', meaningVi: 'Phía trước / Trước', onyomi: 'ゼン (zen)', kunyomi: 'まえ', strokes: 9, topic: 'direction',
    vocab: [{ word: '前', reading: 'まえ', meaningVi: 'phía trước' }, { word: '名前', reading: 'なまえ', meaningVi: 'tên' }],
    example: '駅の前で友達を待っています。', exampleVi: 'Tôi đang đợi bạn ở trước nhà ga.'
  },
  {
    char: '後', sinoVi: 'HẬU', meaningVi: 'Phía sau / Sau đó', onyomi: 'ゴ (go)', kunyomi: 'うし(ろ) / あと', strokes: 9, topic: 'direction',
    vocab: [{ word: '後ろ', reading: 'うしろ', meaningVi: 'phía sau' }, { word: '後で', reading: 'あとで', meaningVi: 'sau đó' }],
    example: '仕事の後で食事に行きましょう。', exampleVi: 'Sau giờ làm hãy đi ăn nhé.'
  },
  {
    char: '北', sinoVi: 'BẮC', meaningVi: 'Hướng Bắc', onyomi: 'ホク (hoku)', kunyomi: 'きた', strokes: 5, topic: 'direction',
    vocab: [{ word: '北', reading: 'きた', meaningVi: 'hướng Bắc' }, { word: '北海道', reading: 'ほっかいどう', meaningVi: 'Hokkaido' }],
    example: '冬は北の地域がとても寒いです。', exampleVi: 'Mùa đông vùng phía Bắc rất lạnh.'
  },
  {
    char: '南', sinoVi: 'NAM', meaningVi: 'Hướng Nam', onyomi: 'ナン (nan)', kunyomi: 'みなみ', strokes: 9, topic: 'direction',
    vocab: [{ word: '南', reading: 'みなみ', meaningVi: 'hướng Nam' }, { word: '東南アジア', reading: 'とうなんアジア', meaningVi: 'Đông Nam Á' }],
    example: '部屋は南向きで明るいです。', exampleVi: 'Phòng hướng Nam nên rất sáng sủa.'
  },
  {
    char: '東', sinoVi: 'ĐÔNG', meaningVi: 'Hướng Đông', onyomi: 'トウ (tō)', kunyomi: 'ひがし', strokes: 8, topic: 'direction',
    vocab: [{ word: '東', reading: 'ひがし', meaningVi: 'hướng Đông' }, { word: '東京', reading: 'とうきょう', meaningVi: 'Tokyo' }],
    example: '太陽は東から昇ります。', exampleVi: 'Mặt trời mọc từ hướng Đông.'
  },
  {
    char: '西', sinoVi: 'TÂY', meaningVi: 'Hướng Tây', onyomi: 'セイ / サイ', kunyomi: 'にし', strokes: 6, topic: 'direction',
    vocab: [{ word: '西', reading: 'にし', meaningVi: 'hướng Tây' }, { word: '関西', reading: 'かんさい', meaningVi: 'vùng Kansai' }],
    example: '西の空が赤くなりました。', exampleVi: 'Bầu trời phía Tây đã chuyển đỏ.'
  },
  {
    char: '外', sinoVi: 'NGOẠI', meaningVi: 'Bên ngoài', onyomi: 'ガイ (gai)', kunyomi: 'そと / ほか', strokes: 5, topic: 'direction',
    vocab: [{ word: '外', reading: 'そと', meaningVi: 'bên ngoài' }, { word: '外国人', reading: 'がいこくじん', meaningVi: 'người nước ngoài' }],
    example: '天気がいいから外で遊びましょう。', exampleVi: 'Trời đẹp nên hãy ra ngoài chơi nào.'
  },
  {
    char: '間', sinoVi: 'GIAN', meaningVi: 'Khoảng giữa / Thời gian', onyomi: 'カン (kan)', kunyomi: 'あいだ / ま', strokes: 12, topic: 'direction',
    vocab: [{ word: '時間', reading: 'じかん', meaningVi: 'thời gian' }, { word: '間に合う', reading: 'まにあう', meaningVi: 'kịp giờ' }],
    example: '駅と学校の間は歩いて十分です。', exampleVi: 'Giữa ga và trường đi bộ mất 10 phút.'
  },
  {
    char: '近', sinoVi: 'CẬN', meaningVi: 'Gần', onyomi: 'キン (kin)', kunyomi: 'ちか(い)', strokes: 7, topic: 'direction',
    vocab: [{ word: '近い', reading: 'ちかい', meaningVi: 'gần' }, { word: '最近', reading: 'さいきん', meaningVi: 'gần đây' }],
    example: '家は駅から近いです。', exampleVi: 'Nhà ở gần nhà ga.'
  },
  {
    char: '休', sinoVi: 'HƯU', meaningVi: 'Nghỉ ngơi', onyomi: 'キュウ (kyū)', kunyomi: 'やす(む)', strokes: 6, topic: 'verbs2',
    vocab: [{ word: '休む', reading: 'やすむ', meaningVi: 'nghỉ ngơi' }, { word: '休み', reading: 'やすみ', meaningVi: 'ngày nghỉ' }],
    example: '日曜日は家でゆっくり休みます。', exampleVi: 'Chủ nhật tôi nghỉ ngơi thư giãn ở nhà.'
  },
  {
    char: '入', sinoVi: 'NHẬP', meaningVi: 'Vào / Bỏ vào', onyomi: 'ニュウ (nyū)', kunyomi: 'はい(る) / い(れる)', strokes: 2, topic: 'verbs2',
    vocab: [{ word: '入る', reading: 'はいる', meaningVi: 'đi vào' }, { word: '入れる', reading: 'いれる', meaningVi: 'bỏ vào' }],
    example: 'どうぞ部屋に入ってください。', exampleVi: 'Xin mời vào phòng ạ.'
  },
  {
    char: '出', sinoVi: 'XUẤT', meaningVi: 'Ra ngoài / Đưa ra', onyomi: 'シュツ (shutsu)', kunyomi: 'で(る) / だ(す)', strokes: 5, topic: 'verbs2',
    vocab: [{ word: '出る', reading: 'でる', meaningVi: 'đi ra' }, { word: '出口', reading: 'でぐち', meaningVi: 'lối ra' }],
    example: '毎朝七時に家を出ます。', exampleVi: 'Mỗi sáng tôi ra khỏi nhà lúc 7 giờ.'
  },
  {
    char: '立', sinoVi: 'LẬP', meaningVi: 'Đứng lên / Thành lập', onyomi: 'リツ (ritsu)', kunyomi: 'た(つ)', strokes: 5, topic: 'verbs2',
    vocab: [{ word: '立つ', reading: 'たつ', meaningVi: 'đứng' }, { word: '国立', reading: 'こくりつ', meaningVi: 'quốc lập' }],
    example: '電車の中でずっと立っていました。', exampleVi: 'Tôi đã đứng suốt trên tàu điện.'
  },
  {
    char: '会', sinoVi: 'HỘI', meaningVi: 'Gặp gỡ / Cuộc họp', onyomi: 'カイ (kai)', kunyomi: 'あ(う)', strokes: 6, topic: 'verbs2',
    vocab: [{ word: '会う', reading: 'あう', meaningVi: 'gặp gỡ' }, { word: '会話', reading: 'かいわ', meaningVi: 'hội thoại' }],
    example: '週末に高校の友達に会います。', exampleVi: 'Cuối tuần tôi sẽ gặp bạn cấp ba.'
  },
  {
    char: '言', sinoVi: 'NGÔN', meaningVi: 'Nói / Lời nói', onyomi: 'ゲン / ゴン', kunyomi: 'い(う) / こと', strokes: 7, topic: 'verbs2',
    vocab: [{ word: '言う', reading: 'いう', meaningVi: 'nói' }, { word: '言葉', reading: 'ことば', meaningVi: 'từ ngữ' }],
    example: 'もう一度ゆっくり言ってください。', exampleVi: 'Xin hãy nói chậm lại một lần nữa.'
  },
  {
    char: '思', sinoVi: 'TƯ', meaningVi: 'Nghĩ / Suy nghĩ', onyomi: 'シ (shi)', kunyomi: 'おも(う)', strokes: 9, topic: 'verbs1',
    vocab: [{ word: '思う', reading: 'おもう', meaningVi: 'nghĩ rằng' }, { word: '思い出', reading: 'おもいで', meaningVi: 'kỷ niệm' }],
    example: '日本語は面白いと思います。', exampleVi: 'Tôi nghĩ tiếng Nhật rất thú vị.'
  },
  {
    char: '知', sinoVi: 'TRI', meaningVi: 'Biết / Kiến thức', onyomi: 'チ (chi)', kunyomi: 'し(る)', strokes: 8, topic: 'verbs1',
    vocab: [{ word: '知る', reading: 'しる', meaningVi: 'biết' }, { word: '知人', reading: 'ちじん', meaningVi: 'người quen' }],
    example: 'その店の電話番号を知っていますか。', exampleVi: 'Bạn có biết số điện thoại của cửa hàng đó không?'
  },
  {
    char: '帰', sinoVi: 'QUY', meaningVi: 'Trở về', onyomi: 'キ (ki)', kunyomi: 'かえ(る)', strokes: 10, topic: 'verbs1',
    vocab: [{ word: '帰る', reading: 'かえる', meaningVi: 'về nhà, trở về' }, { word: '帰国', reading: 'きこく', meaningVi: 'về nước' }],
    example: '六時ごろ家に帰ります。', exampleVi: 'Khoảng 6 giờ tôi về nhà.'
  },
  {
    char: '起', sinoVi: 'KHỞI', meaningVi: 'Thức dậy / Bắt đầu', onyomi: 'キ (ki)', kunyomi: 'お(きる)', strokes: 10, topic: 'verbs1',
    vocab: [{ word: '起きる', reading: 'おきる', meaningVi: 'thức dậy' }, { word: '起こす', reading: 'おこす', meaningVi: 'đánh thức' }],
    example: '今日は六時に起きました。', exampleVi: 'Hôm nay tôi đã dậy lúc 6 giờ.'
  },
  {
    char: '歩', sinoVi: 'BỘ', meaningVi: 'Đi bộ / Bước', onyomi: 'ホ (ho)', kunyomi: 'ある(く)', strokes: 8, topic: 'verbs1',
    vocab: [{ word: '歩く', reading: 'あるく', meaningVi: 'đi bộ' }, { word: '散歩', reading: 'さんぽ', meaningVi: 'đi dạo' }],
    example: '駅から学校まで歩いて十分です。', exampleVi: 'Từ ga đến trường đi bộ mất 10 phút.'
  },
  {
    char: '古', sinoVi: 'CỔ', meaningVi: 'Cũ / Xưa', onyomi: 'コ (ko)', kunyomi: 'ふる(い)', strokes: 5, topic: 'adjectives',
    vocab: [{ word: '古い', reading: 'ふるい', meaningVi: 'cũ' }, { word: '中古', reading: 'ちゅうこ', meaningVi: 'đồ đã qua sử dụng' }],
    example: '京都には古いお寺が多いです。', exampleVi: 'Ở Kyoto có rất nhiều ngôi chùa cổ.'
  },
  {
    char: '長', sinoVi: 'TRƯỜNG', meaningVi: 'Dài / Trưởng', onyomi: 'チョウ (chō)', kunyomi: 'なが(い)', strokes: 8, topic: 'adjectives',
    vocab: [{ word: '長い', reading: 'ながい', meaningVi: 'dài' }, { word: '社長', reading: 'しゃちょう', meaningVi: 'giám đốc' }],
    example: 'この川はとても長いです。', exampleVi: 'Con sông này rất dài.'
  },
  {
    char: '白', sinoVi: 'BẠCH', meaningVi: 'Màu trắng', onyomi: 'ハク (haku)', kunyomi: 'しろ / しろ(い)', strokes: 5, topic: 'adjectives',
    vocab: [{ word: '白い', reading: 'しろい', meaningVi: 'trắng' }, { word: '白紙', reading: 'はくし', meaningVi: 'giấy trắng' }],
    example: '白いシャツを着ています。', exampleVi: 'Tôi đang mặc chiếc áo sơ mi trắng.'
  },
  {
    char: '黒', sinoVi: 'HẮC', meaningVi: 'Màu đen', onyomi: 'コク (koku)', kunyomi: 'くろ / くろ(い)', strokes: 11, topic: 'adjectives',
    vocab: [{ word: '黒い', reading: 'くろい', meaningVi: 'đen' }, { word: '黒板', reading: 'こくばん', meaningVi: 'bảng đen' }],
    example: '黒いかばんを買いました。', exampleVi: 'Tôi đã mua một chiếc cặp màu đen.'
  },
  {
    char: '多', sinoVi: 'ĐA', meaningVi: 'Nhiều', onyomi: 'タ (ta)', kunyomi: 'おお(い)', strokes: 6, topic: 'adjectives',
    vocab: [{ word: '多い', reading: 'おおい', meaningVi: 'nhiều' }, { word: '多分', reading: 'たぶん', meaningVi: 'có lẽ' }],
    example: '東京は人がとても多いです。', exampleVi: 'Tokyo có rất nhiều người.'
  },
  {
    char: '少', sinoVi: 'THIỂU', meaningVi: 'Ít', onyomi: 'ショウ (shō)', kunyomi: 'すく(ない) / すこ(し)', strokes: 4, topic: 'adjectives',
    vocab: [{ word: '少ない', reading: 'すくない', meaningVi: 'ít' }, { word: '少し', reading: 'すこし', meaningVi: 'một chút' }],
    example: '日本語が少し話せます。', exampleVi: 'Tôi có thể nói một chút tiếng Nhật.'
  },
];
