import { KanaChar } from '../types';

export const HIRAGANA_BASIC: KanaChar[] = [
  // Hàng A
  { char: 'あ', romaji: 'a', row: 'a', type: 'hiragana', group: 'basic', mnemonicVi: 'Giống chữ "a" có vòng tròn móc phía dưới.', strokeHintVi: '3 nét: ngang, dọc cong, vòng xoắn.', sampleWord: 'あさ (asa)', sampleMeaningVi: 'buổi sáng' },
  { char: 'い', romaji: 'i', row: 'a', type: 'hiragana', group: 'basic', mnemonicVi: 'Hai nét đứng song song như chữ "ii".', strokeHintVi: '2 nét: trái có móc nhẹ, phải ngắn hơn.', sampleWord: 'いぬ (inu)', sampleMeaningVi: 'con chó' },
  { char: 'う', romaji: 'u', row: 'a', type: 'hiragana', group: 'basic', mnemonicVi: 'Giống chiếc tai người nghiêng sang phải.', strokeHintVi: '2 nét: phẩy ngắn trên đầu, cong xuống.', sampleWord: 'うみ (umi)', sampleMeaningVi: 'biển cả' },
  { char: 'え', romaji: 'e', row: 'a', type: 'hiragana', group: 'basic', mnemonicVi: 'Giống chữ Z cách điệu hoặc người đang chạy.', strokeHintVi: '2 nét: phẩy trên, nét gấp chữ Z nối đuôi.', sampleWord: 'えき (eki)', sampleMeaningVi: 'nhà ga' },
  { char: 'お', romaji: 'o', row: 'a', type: 'hiragana', group: 'basic', mnemonicVi: 'Giống chữ "a" nhưng có dấu phẩy bay bên phải.', strokeHintVi: '3 nét: ngang, dọc vòng tròn, chấm phải.', sampleWord: 'おちゃ (ocha)', sampleMeaningVi: 'trà xanh' },

  // Hàng Ka
  { char: 'か', romaji: 'ka', row: 'ka', type: 'hiragana', group: 'basic', mnemonicVi: 'Giống lưỡi dao cắt (ka-t) với một dấu chấm.', strokeHintVi: '3 nét: ngang móc, phẩy chéo, chấm phải.', sampleWord: 'かさ (kasa)', sampleMeaningVi: 'cái ô (dù)' },
  { char: 'き', romaji: 'ki', row: 'ka', type: 'hiragana', group: 'basic', mnemonicVi: 'Giống chiếc chìa khóa (key) cổ điển.', strokeHintVi: '4 nét: hai nét ngang, nét chéo, nét cong đáy.', sampleWord: 'きって (kitte)', sampleMeaningVi: 'tem thư' },
  { char: 'く', romaji: 'ku', row: 'ka', type: 'hiragana', group: 'basic', mnemonicVi: 'Giống mỏ chim cúc cu (ku) há sang phải.', strokeHintVi: '1 nét gập góc nhọn sang trái.', sampleWord: 'くつ (kutsu)', sampleMeaningVi: 'đôi giày' },
  { char: 'け', romaji: 'ke', row: 'ka', type: 'hiragana', group: 'basic', mnemonicVi: 'Giống thùng rượu gỗ (keg) mở hai bên.', strokeHintVi: '3 nét: dọc trái, ngang, dọc phẩy phải.', sampleWord: 'けさ (kesa)', sampleMeaningVi: 'sáng nay' },
  { char: 'こ', romaji: 'ko', row: 'ka', type: 'hiragana', group: 'basic', mnemonicVi: 'Hai nét cong đối mặt như hai con sâu (co).', strokeHintVi: '2 nét: cong trên, cong dưới.', sampleWord: 'こども (kodomo)', sampleMeaningVi: 'trẻ em' },

  // Hàng Sa
  { char: 'さ', romaji: 'sa', row: 'sa', type: 'hiragana', group: 'basic', mnemonicVi: 'Giống chữ き nhưng chỉ có 1 nét ngang.', strokeHintVi: '3 nét: ngang, chéo, cong đáy.', sampleWord: 'さくら (sakura)', sampleMeaningVi: 'hoa anh đào' },
  { char: 'し', romaji: 'shi', row: 'sa', type: 'hiragana', group: 'basic', mnemonicVi: 'Giống lưỡi câu cá chữ J ngược (fishing).', strokeHintVi: '1 nét thẳng xuống rồi uốn cong lên phải.', sampleWord: 'しろ (shiro)', sampleMeaningVi: 'màu trắng' },
  { char: 'す', romaji: 'su', row: 'sa', type: 'hiragana', group: 'basic', mnemonicVi: 'Giống vòng xoáy nước (su) kéo thẳng xuống.', strokeHintVi: '2 nét: ngang dài, dọc xoắn vòng tròn.', sampleWord: 'すし (sushi)', sampleMeaningVi: 'món sushi' },
  { char: 'せ', romaji: 'se', row: 'sa', type: 'hiragana', group: 'basic', mnemonicVi: 'Giống khuôn mặt đang nói "Say".', strokeHintVi: '3 nét: ngang, dọc ngắn phải, dọc cong trái.', sampleWord: 'せんせい (sensei)', sampleMeaningVi: 'giáo viên' },
  { char: 'そ', romaji: 'so', row: 'sa', type: 'hiragana', group: 'basic', mnemonicVi: 'Đường may ziczac (sew = so) liền 1 nét.', strokeHintVi: '1 nét ziczac rồi uốn chữ C ở dưới.', sampleWord: 'そら (sora)', sampleMeaningVi: 'bầu trời' },

  // Hàng Ta
  { char: 'た', romaji: 'ta', row: 'ta', type: 'hiragana', group: 'basic', mnemonicVi: 'Nhìn rõ chữ "t" và "a" nhỏ bên cạnh (ta).', strokeHintVi: '4 nét: chữ thập nghiêng + chữ こ nhỏ.', sampleWord: 'たまご (tamago)', sampleMeaningVi: 'trứng' },
  { char: 'ち', romaji: 'chi', row: 'ta', type: 'hiragana', group: 'basic', mnemonicVi: 'Giống số 5 đang mỉm cười (chi-số 5).', strokeHintVi: '2 nét: ngang, dọc uốn vòng như số 5.', sampleWord: 'ちず (chizu)', sampleMeaningVi: 'bản đồ' },
  { char: 'つ', romaji: 'tsu', row: 'ta', type: 'hiragana', group: 'basic', mnemonicVi: 'Giống ngọn sóng thần (tsunami) cuộn tròn.', strokeHintVi: '1 nét cong lớn sang phải rồi cụp xuống.', sampleWord: 'つき (tsuki)', sampleMeaningVi: 'mặt trăng' },
  { char: 'て', romaji: 'te', row: 'ta', type: 'hiragana', group: 'basic', mnemonicVi: 'Giống bàn tay (te) hoặc chữ T cong.', strokeHintVi: '1 nét ngang rồi vòng chữ C.', sampleWord: 'てがみ (tegami)', sampleMeaningVi: 'bức thư' },
  { char: 'と', romaji: 'to', row: 'ta', type: 'hiragana', group: 'basic', mnemonicVi: 'Cái gai cắm vào ngón chân (toe).', strokeHintVi: '2 nét: chéo ngắn, móc vòng hình chữ C.', sampleWord: 'とけい (tokei)', sampleMeaningVi: 'đồng hồ' },

  // Hàng Na
  { char: 'な', romaji: 'na', row: 'na', type: 'hiragana', group: 'basic', mnemonicVi: 'Chữ thập bên trái, nút thắt (knot) bên dưới.', strokeHintVi: '4 nét: ngang, chéo, chấm phải, vòng thắt.', sampleWord: 'なつ (natsu)', sampleMeaningVi: 'mùa hè' },
  { char: 'に', romaji: 'ni', row: 'na', type: 'hiragana', group: 'basic', mnemonicVi: 'Đầu gối (knee) với 2 đường gân bên phải.', strokeHintVi: '3 nét: dọc móc, hai nét ngang cong.', sampleWord: 'にほん (nihon)', sampleMeaningVi: 'Nhật Bản' },
  { char: 'ぬ', romaji: 'nu', row: 'na', type: 'hiragana', group: 'basic', mnemonicVi: 'Sợi mì (noodle) cuộn vòng có đuôi tròn.', strokeHintVi: '2 nét: chéo cong, vòng lượn thắt nút.', sampleWord: 'ぬの (nuno)', sampleMeaningVi: 'vải vóc' },
  { char: 'ね', romaji: 'ne', row: 'na', type: 'hiragana', group: 'basic', mnemonicVi: 'Con mèo (neko) cuộn đuôi bên cột.', strokeHintVi: '2 nét: dọc thẳng, ziczac vòng đuôi.', sampleWord: 'ねこ (neko)', sampleMeaningVi: 'con mèo' },
  { char: 'の', romaji: 'no', row: 'na', type: 'hiragana', group: 'basic', mnemonicVi: 'Giống biển báo cấm (NO) hình tròn.', strokeHintVi: '1 nét cong tròn khép hở đáy.', sampleWord: 'のみもの (nomimono)', sampleMeaningVi: 'đồ uống' },

  // Hàng Ha
  { char: 'は', romaji: 'ha', row: 'ha', type: 'hiragana', group: 'basic', mnemonicVi: 'Chữ H và chữ a viết liền — cười ha ha.', strokeHintVi: '3 nét: dọc móc, ngang, dọc thắt nút.', sampleWord: 'はな (hana)', sampleMeaningVi: 'bông hoa' },
  { char: 'ひ', romaji: 'hi', row: 'ha', type: 'hiragana', group: 'basic', mnemonicVi: 'Miệng cười hì hì (hi) cong lên hai bên.', strokeHintVi: '1 nét ngang rồi uốn chữ U sâu và kéo lên.', sampleWord: 'ひと (hito)', sampleMeaningVi: 'con người' },
  { char: 'ふ', romaji: 'fu', row: 'ha', type: 'hiragana', group: 'basic', mnemonicVi: 'Núi Phú Sĩ (Fuji) ở giữa và mây hai bên.', strokeHintVi: '4 nét: chấm đỉnh, móc giữa, hai phẩy hai bên.', sampleWord: 'ふゆ (fuyu)', sampleMeaningVi: 'mùa đông' },
  { char: 'へ', romaji: 'he', row: 'ha', type: 'hiragana', group: 'basic', mnemonicVi: 'Ngọn đồi thoải lên rồi xuống (hình chữ V ngược).', strokeHintVi: '1 nét gập lên ngắn rồi xuôi dài.', sampleWord: 'へや (heya)', sampleMeaningVi: 'căn phòng' },
  { char: 'ほ', romaji: 'ho', row: 'ha', type: 'hiragana', group: 'basic', mnemonicVi: 'Giống は nhưng có hai nét ngang như mái nhà.', strokeHintVi: '4 nét: dọc móc, hai nét ngang, dọc thắt nút.', sampleWord: 'ほん (hon)', sampleMeaningVi: 'quyển sách' },

  // Hàng Ma
  { char: 'ま', romaji: 'ma', row: 'ma', type: 'hiragana', group: 'basic', mnemonicVi: 'Hai thanh ngang xiên qua cây cột thắt nút (ma).', strokeHintVi: '3 nét: hai nét ngang, dọc thắt nút.', sampleWord: 'まち (machi)', sampleMeaningVi: 'thành phố / thị trấn' },
  { char: 'み', romaji: 'mi', row: 'ma', type: 'hiragana', group: 'basic', mnemonicVi: 'Số 21 viết liền nét (21 tuổi — tuổi trưởng thành).', strokeHintVi: '2 nét: giống số 2 vòng xuống, phẩy cắt đuôi.', sampleWord: 'みず (mizu)', sampleMeaningVi: 'nước' },
  { char: 'む', romaji: 'mu', row: 'ma', type: 'hiragana', group: 'basic', mnemonicVi: 'Con bò đang kêu "muuu" với chiếc sừng nhỏ.', strokeHintVi: '3 nét: ngang, dọc xoắn vòng kéo dài, chấm.', sampleWord: 'むし (mushi)', sampleMeaningVi: 'côn trùng' },
  { char: 'め', romaji: 'me', row: 'ma', type: 'hiragana', group: 'basic', mnemonicVi: 'Giống ぬ nhưng không có nút thắt nhỏ ở đuôi (con mắt - me).', strokeHintVi: '2 nét: chéo cong, vòng lượn mở.', sampleWord: 'めがね (megane)', sampleMeaningVi: 'kính mắt' },
  { char: 'も', romaji: 'mo', row: 'ma', type: 'hiragana', group: 'basic', mnemonicVi: 'Lưỡi câu し có thêm hai mồi (more = mo).', strokeHintVi: '3 nét: dọc uốn, hai nét ngang cắt qua.', sampleWord: 'もり (mori)', sampleMeaningVi: 'khu rừng' },

  // Hàng Ya
  { char: 'や', romaji: 'ya', row: 'ya', type: 'hiragana', group: 'basic', mnemonicVi: 'Con bò Tây Tạng (yak) có sừng và lưng cong.', strokeHintVi: '3 nét: vòng cung, chấm ngắn, nét chéo.', sampleWord: 'やま (yama)', sampleMeaningVi: 'ngọn núi' },
  { char: 'ゆ', romaji: 'yu', row: 'ya', type: 'hiragana', group: 'basic', mnemonicVi: 'Con cá bơi tròn trong bồn tắm (yu = nước nóng).', strokeHintVi: '2 nét: dọc vòng lớn, nét dọc cắt giữa.', sampleWord: 'ゆき (yuki)', sampleMeaningVi: 'tuyết' },
  { char: 'よ', romaji: 'yo', row: 'ya', type: 'hiragana', group: 'basic', mnemonicVi: 'Con yo-yo treo lơ lửng dưới sợi dây.', strokeHintVi: '2 nét: ngang ngắn, dọc xuống thắt vòng.', sampleWord: 'よる (yoru)', sampleMeaningVi: 'buổi tối' },

  // Hàng Ra
  { char: 'ら', romaji: 'ra', row: 'ra', type: 'hiragana', group: 'basic', mnemonicVi: 'Con thỏ (rabbit) ngồi cụp tai.', strokeHintVi: '2 nét: chấm trên, dọc xuống rồi vòng tròn.', sampleWord: 'らいねん (rainen)', sampleMeaningVi: 'năm sau' },
  { char: 'り', romaji: 'ri', row: 'ra', type: 'hiragana', group: 'basic', mnemonicVi: 'Hai ngọn lau (reeds) rủ xuống bên bờ sông.', strokeHintVi: '2 nét: trái có móc, phải dài cong vào.', sampleWord: 'りんご (ringo)', sampleMeaningVi: 'quả táo' },
  { char: 'る', romaji: 'ru', row: 'ra', type: 'hiragana', group: 'basic', mnemonicVi: 'Số 3 có nút thắt tròn ở đuôi (loop = ru).', strokeHintVi: '1 nét: ngang gập chéo vòng số 3 và thắt nút.', sampleWord: 'くるま (kuruma)', sampleMeaningVi: 'ô tô' },
  { char: 'れ', romaji: 're', row: 'ra', type: 'hiragana', group: 'basic', mnemonicVi: 'Giống ね nhưng đuôi đá vút ra ngoài.', strokeHintVi: '2 nét: dọc thẳng, ziczac đá ra phải.', sampleWord: 'れきし (rekishi)', sampleMeaningVi: 'lịch sử' },
  { char: 'ろ', romaji: 'ro', row: 'ra', type: 'hiragana', group: 'basic', mnemonicVi: 'Giống る nhưng mất vòng tròn ở đuôi (số 3 trơn).', strokeHintVi: '1 nét: ngang, chéo, cong số 3.', sampleWord: 'いろ (iro)', sampleMeaningVi: 'màu sắc' },

  // Hàng Wa & N
  { char: 'わ', romaji: 'wa', row: 'wa', type: 'hiragana', group: 'basic', mnemonicVi: 'Giống ね và れ nhưng phần bụng phình to tròn.', strokeHintVi: '2 nét: dọc thẳng, ziczac vòng cung rộng.', sampleWord: 'わたし (watashi)', sampleMeaningVi: 'tôi' },
  { char: 'を', romaji: 'wo', row: 'wa', type: 'hiragana', group: 'basic', mnemonicVi: 'Người nhảy qua rào (chỉ dùng làm trợ từ "o").', strokeHintVi: '3 nét: ngang, nét gập chữ h, chữ c ôm dưới.', sampleWord: 'みずをのむ', sampleMeaningVi: 'uống nước' },
  { char: 'ん', romaji: 'n', row: 'wa', type: 'hiragana', group: 'basic', mnemonicVi: 'Giống chữ "n" viết tay nghiêng sang phải.', strokeHintVi: '1 nét: chéo xuống rồi uốn lên như chữ n.', sampleWord: 'にほん (nihon)', sampleMeaningVi: 'Nhật Bản' },
];

export const KATAKANA_BASIC: KanaChar[] = [
  { char: 'ア', romaji: 'a', row: 'a', type: 'katakana', group: 'basic', mnemonicVi: 'Lưỡi rìu (axe) sắc nhọn quay sang trái.', strokeHintVi: '2 nét: ngang gập góc nhọn, phẩy xuống.', sampleWord: 'アメリカ', sampleMeaningVi: 'Nước Mỹ' },
  { char: 'イ', romaji: 'i', row: 'a', type: 'katakana', group: 'basic', mnemonicVi: 'Con đại bàng (eagle) đậu trên cành nghiêng.', strokeHintVi: '2 nét: phẩy chéo trái, dọc thẳng.', sampleWord: 'イタリア', sampleMeaningVi: 'Nước Ý' },
  { char: 'ウ', romaji: 'u', row: 'a', type: 'katakana', group: 'basic', mnemonicVi: 'Giống う nhưng góc cạnh vuông vức hơn.', strokeHintVi: '3 nét: chấm đỉnh, dọc trái, ngang gập phẩy.', sampleWord: 'ウイルス', sampleMeaningVi: 'Vi-rút' },
  { char: 'エ', romaji: 'e', row: 'a', type: 'katakana', group: 'basic', mnemonicVi: 'Cửa thang máy (elevator) hình chữ I viết hoa.', strokeHintVi: '3 nét: ngang trên, dọc giữa, ngang dưới.', sampleWord: 'エレベーター', sampleMeaningVi: 'Thang máy' },
  { char: 'オ', romaji: 'o', row: 'a', type: 'katakana', group: 'basic', mnemonicVi: 'Ca sĩ opera giơ tay hát.', strokeHintVi: '3 nét: ngang, dọc móc, phẩy chéo trái.', sampleWord: 'オレンジ', sampleMeaningVi: 'Quả cam' },

  { char: 'カ', romaji: 'ka', row: 'ka', type: 'katakana', group: 'basic', mnemonicVi: 'Giống hệt Hiragana か nhưng không có dấu chấm.', strokeHintVi: '2 nét: ngang móc, phẩy chéo.', sampleWord: 'カメラ', sampleMeaningVi: 'Máy ảnh' },
  { char: 'キ', romaji: 'ki', row: 'ka', type: 'katakana', group: 'basic', mnemonicVi: 'Giống chiếc chìa khóa き bỏ phần đáy cong.', strokeHintVi: '3 nét: hai nét ngang nghiêng, nét dọc chéo.', sampleWord: 'キーボード', sampleMeaningVi: 'Bàn phím' },
  { char: 'ク', romaji: 'ku', row: 'ka', type: 'katakana', group: 'basic', mnemonicVi: 'Mỏ chim có thêm 1 nét vạch ngang bên trong.', strokeHintVi: '2 nét: phẩy trái, ngang gập phẩy dài.', sampleWord: 'クラス', sampleMeaningVi: 'Lớp học' },
  { char: 'ケ', romaji: 'ke', row: 'ka', type: 'katakana', group: 'basic', mnemonicVi: 'Chữ K nghiêng nhìn từ bên cạnh.', strokeHintVi: '3 nét: phẩy trái, ngang, phẩy từ giữa.', sampleWord: 'ケーキ', sampleMeaningVi: 'Bánh ngọt' },
  { char: 'コ', romaji: 'ko', row: 'ka', type: 'katakana', group: 'basic', mnemonicVi: 'Hai góc vuông (corner) quay sang trái.', strokeHintVi: '2 nét: ngang gập xuống, ngang đáy.', sampleWord: 'コーヒー', sampleMeaningVi: 'Cà phê' },

  { char: 'サ', romaji: 'sa', row: 'sa', type: 'katakana', group: 'basic', mnemonicVi: 'Cành cây xương rồng (saguaro) hai nhánh.', strokeHintVi: '3 nét: ngang, dọc ngắn trái, dọc dài phải.', sampleWord: 'サラダ', sampleMeaningVi: 'Món salad' },
  { char: 'シ', romaji: 'shi', row: 'sa', type: 'katakana', group: 'basic', mnemonicVi: 'Mặt cười nghiêng, hai chấm nằm ngang và hất từ dưới lên.', strokeHintVi: '3 nét: hai chấm ngang, nét hất từ dưới lên phải.', sampleWord: 'シャツ', sampleMeaningVi: 'Áo sơ mi' },
  { char: 'ス', romaji: 'su', row: 'sa', type: 'katakana', group: 'basic', mnemonicVi: 'Người trượt tuyết (ski/su) xoạc chân.', strokeHintVi: '2 nét: ngang gập phẩy, chân chống phải.', sampleWord: 'スーパー', sampleMeaningVi: 'Siêu thị' },
  { char: 'セ', romaji: 'se', row: 'sa', type: 'katakana', group: 'basic', mnemonicVi: 'Giống せ nhưng góc vuông sắc nét.', strokeHintVi: '2 nét: ngang móc xuống, dọc bẻ góc phải.', sampleWord: 'セーター', sampleMeaningVi: 'Áo len' },
  { char: 'ソ', romaji: 'so', row: 'sa', type: 'katakana', group: 'basic', mnemonicVi: 'Hai nét phẩy dựng đứng rồi đổ xuống (khác ン).', strokeHintVi: '2 nét: chấm phẩy đứng, phẩy dài từ trên xuống trái.', sampleWord: 'ソファ', sampleMeaningVi: 'Ghế sofa' },

  { char: 'タ', romaji: 'ta', row: 'ta', type: 'katakana', group: 'basic', mnemonicVi: 'Giống ク nhưng có thêm gạch ngang ở giữa.', strokeHintVi: '3 nét: phẩy, ngang gập phẩy, chấm cắt giữa.', sampleWord: 'タクシー', sampleMeaningVi: 'Xe taxi' },
  { char: 'チ', romaji: 'chi', row: 'ta', type: 'katakana', group: 'basic', mnemonicVi: 'Người cổ vũ (cheerleader) giơ tay.', strokeHintVi: '3 nét: phẩy đầu, ngang dài, dọc cong trái.', sampleWord: 'チーズ', sampleMeaningVi: 'Phô mai' },
  { char: 'ツ', romaji: 'tsu', row: 'ta', type: 'katakana', group: 'basic', mnemonicVi: 'Hai chấm dựng đứng và phẩy dài từ trên xuống (khác シ).', strokeHintVi: '3 nét: hai chấm dọc, phẩy dài từ trên xuống trái.', sampleWord: 'ツアー', sampleMeaningVi: 'Chuyến du lịch' },
  { char: 'テ', romaji: 'te', row: 'ta', type: 'katakana', group: 'basic', mnemonicVi: 'Cột điện thoại (telephone) với hai dây ngang.', strokeHintVi: '3 nét: ngang ngắn, ngang dài, dọc cong.', sampleWord: 'テレビ', sampleMeaningVi: 'Tivi' },
  { char: 'ト', romaji: 'to', row: 'ta', type: 'katakana', group: 'basic', mnemonicVi: 'Cột totem đứng thẳng với cành chỉ sang phải.', strokeHintVi: '2 nét: dọc thẳng, chấm xiên phải.', sampleWord: 'トマト', sampleMeaningVi: 'Cà chua' },

  { char: 'ナ', romaji: 'na', row: 'na', type: 'katakana', group: 'basic', mnemonicVi: 'Con dao (knife) cắt chữ thập.', strokeHintVi: '2 nét: ngang dài, dọc cong trái.', sampleWord: 'ナイフ', sampleMeaningVi: 'Con dao' },
  { char: 'ニ', romaji: 'ni', row: 'na', type: 'katakana', group: 'basic', mnemonicVi: 'Số hai (ni = 2) gồm hai vạch ngang.', strokeHintVi: '2 nét: ngang ngắn trên, ngang dài dưới.', sampleWord: 'ニュース', sampleMeaningVi: 'Tin tức' },
  { char: 'ヌ', romaji: 'nu', row: 'na', type: 'katakana', group: 'basic', mnemonicVi: 'Đôi đũa gắp mì (noodle).', strokeHintVi: '2 nét: ngang gập phẩy, nét chéo cắt ngang.', sampleWord: 'カヌー', sampleMeaningVi: 'Thuyền ca-nô' },
  { char: 'ネ', romaji: 'ne', row: 'na', type: 'katakana', group: 'basic', mnemonicVi: 'Giá treo lưới (net) có 4 nét gọn gàng.', strokeHintVi: '4 nét: chấm, ngang gập phẩy, dọc, chấm phải.', sampleWord: 'ネクタイ', sampleMeaningVi: 'Cà vạt' },
  { char: 'ノ', romaji: 'no', row: 'na', type: 'katakana', group: 'basic', mnemonicVi: 'Một đường chéo dứt khoát nói "NO".', strokeHintVi: '1 nét: phẩy cong từ phải sang trái.', sampleWord: 'ノート', sampleMeaningVi: 'Quyển vở' },

  { char: 'ハ', romaji: 'ha', row: 'ha', type: 'katakana', group: 'basic', mnemonicVi: 'Hai nét mở rộng như mái nhà (house).', strokeHintVi: '2 nét: phẩy trái, phẩy xiên phải.', sampleWord: 'ハンバーガー', sampleMeaningVi: 'Bánh hamburger' },
  { char: 'ヒ', romaji: 'hi', row: 'ha', type: 'katakana', group: 'basic', mnemonicVi: 'Cười hì hì lệch sang một bên.', strokeHintVi: '2 nét: ngang ngắn, dọc gập ngang đáy.', sampleWord: 'ヒーター', sampleMeaningVi: 'Máy sưởi' },
  { char: 'フ', romaji: 'fu', row: 'ha', type: 'katakana', group: 'basic', mnemonicVi: 'Một góc sườn dốc núi Phú Sĩ.', strokeHintVi: '1 nét: ngang rồi phẩy xiên xuống trái.', sampleWord: 'フォーク', sampleMeaningVi: 'Cái nĩa' },
  { char: 'ヘ', romaji: 'he', row: 'ha', type: 'katakana', group: 'basic', mnemonicVi: 'Giống hệt Hiragana へ!', strokeHintVi: '1 nét: gập nhọn hướng lên.', sampleWord: 'ヘリコプター', sampleMeaningVi: 'Trực thăng' },
  { char: 'ホ', romaji: 'ho', row: 'ha', type: 'katakana', group: 'basic', mnemonicVi: 'Cây thánh giá (holy) có hai chân bên dưới.', strokeHintVi: '4 nét: ngang, dọc móc, hai chấm hai bên.', sampleWord: 'ホテル', sampleMeaningVi: 'Khách sạn' },

  { char: 'マ', romaji: 'ma', row: 'ma', type: 'katakana', group: 'basic', mnemonicVi: 'Góc gấp máy bay giấy.', strokeHintVi: '2 nét: ngang gập phẩy, chấm đáy.', sampleWord: 'マップ', sampleMeaningVi: 'Bản đồ' },
  { char: 'ミ', romaji: 'mi', row: 'ma', type: 'katakana', group: 'basic', mnemonicVi: 'Ba nét gạch song song (mi = 3).', strokeHintVi: '3 nét: ba nét xiên nhẹ từ trên xuống.', sampleWord: 'ミルク', sampleMeaningVi: 'Sữa' },
  { char: 'ム', romaji: 'mu', row: 'ma', type: 'katakana', group: 'basic', mnemonicVi: 'Cánh tay gập cơ bắp (muscle).', strokeHintVi: '2 nét: phẩy gập ngang, chấm khóa góc.', sampleWord: 'ゲーム', sampleMeaningVi: 'Trò chơi' },
  { char: 'メ', romaji: 'me', row: 'ma', type: 'katakana', group: 'basic', mnemonicVi: 'Dấu X đánh dấu chỗ đau mắt.', strokeHintVi: '2 nét: phẩy dài, chấm xiên cắt ngang.', sampleWord: 'メニュー', sampleMeaningVi: 'Thực đơn' },
  { char: 'モ', romaji: 'mo', row: 'ma', type: 'katakana', group: 'basic', mnemonicVi: 'Giống も nhưng góc cạnh hơn.', strokeHintVi: '3 nét: hai nét ngang, nét dọc bẻ góc phải.', sampleWord: 'メモ', sampleMeaningVi: 'Ghi chú' },

  { char: 'ヤ', romaji: 'ya', row: 'ya', type: 'katakana', group: 'basic', mnemonicVi: 'Giống Hiragana や nhưng không có chấm nhỏ.', strokeHintVi: '2 nét: ngang gập, nét dọc xiên cắt qua.', sampleWord: 'タイヤ', sampleMeaningVi: 'Lốp xe' },
  { char: 'ユ', romaji: 'yu', row: 'ya', type: 'katakana', group: 'basic', mnemonicVi: 'Kính tiềm vọng tàu ngầm (U-boat).', strokeHintVi: '2 nét: ngang gập xuống, ngang đáy dài.', sampleWord: 'ユニーク', sampleMeaningVi: 'Độc đáo' },
  { char: 'ヨ', romaji: 'yo', row: 'ya', type: 'katakana', group: 'basic', mnemonicVi: 'Chữ E quay ngược sang trái.', strokeHintVi: '3 nét: ngang gập xuống, ngang giữa, ngang đáy.', sampleWord: 'ヨーグルト', sampleMeaningVi: 'Sữa chua' },

  { char: 'ラ', romaji: 'ra', row: 'ra', type: 'katakana', group: 'basic', mnemonicVi: 'Giống フ có thêm gạch ngang ở trên đầu.', strokeHintVi: '2 nét: ngang trên, ngang gập phẩy.', sampleWord: 'ラジオ', sampleMeaningVi: 'Đài radio' },
  { char: 'リ', romaji: 'ri', row: 'ra', type: 'katakana', group: 'basic', mnemonicVi: 'Giống り nhưng thẳng đứng dứt khoát.', strokeHintVi: '2 nét: dọc ngắn trái, dọc dài cong phải.', sampleWord: 'リスト', sampleMeaningVi: 'Danh sách' },
  { char: 'ル', romaji: 'ru', row: 'ra', type: 'katakana', group: 'basic', mnemonicVi: 'Hai chân đứng vững (root).', strokeHintVi: '2 nét: phẩy trái, dọc hất lên phải.', sampleWord: 'ルール', sampleMeaningVi: 'Quy tắc' },
  { char: 'レ', romaji: 're', row: 'ra', type: 'katakana', group: 'basic', mnemonicVi: 'Một nửa bên phải của ル (dấu tích V).', strokeHintVi: '1 nét: dọc thẳng rồi hất mạnh lên phải.', sampleWord: 'レストラン', sampleMeaningVi: 'Nhà hàng' },
  { char: 'ロ', romaji: 'ro', row: 'ra', type: 'katakana', group: 'basic', mnemonicVi: 'Hình vuông (robot / road sign).', strokeHintVi: '3 nét: dọc trái, ngang gập xuống, ngang đóng.', sampleWord: 'ロボット', sampleMeaningVi: 'Rô-bốt' },

  { char: 'ワ', romaji: 'wa', row: 'wa', type: 'katakana', group: 'basic', mnemonicVi: 'Ly rượu vang (wine) góc cạnh.', strokeHintVi: '2 nét: dọc ngắn trái, ngang gập phẩy.', sampleWord: 'ワイン', sampleMeaningVi: 'Rượu vang' },
  { char: 'ヲ', romaji: 'wo', row: 'wa', type: 'katakana', group: 'basic', mnemonicVi: 'Giống フ có thêm gạch ngang ở giữa.', strokeHintVi: '3 nét: hai nét ngang, phẩy cong trái.', sampleWord: 'テストヲ', sampleMeaningVi: 'Trợ từ ヲ (hiếm gặp)' },
  { char: 'ン', romaji: 'n', row: 'wa', type: 'katakana', group: 'basic', mnemonicVi: 'Một chấm nằm ngang và nét hất từ dưới lên (khác ソ).', strokeHintVi: '2 nét: chấm ngang, nét hất từ dưới lên phải.', sampleWord: 'パン', sampleMeaningVi: 'Bánh mì' },
];

export const KANA_DAKUTEN_SAMPLE: { char: string; romaji: string; base: string; note: string }[] = [
  { char: 'が', romaji: 'ga', base: 'か', note: 'k → g (Dakuten ゛)' },
  { char: 'ぎ', romaji: 'gi', base: 'き', note: 'k → g' },
  { char: 'ぐ', romaji: 'gu', base: 'く', note: 'k → g' },
  { char: 'げ', romaji: 'ge', base: 'け', note: 'k → g' },
  { char: 'ご', romaji: 'go', base: 'こ', note: 'k → g' },
  { char: 'ざ', romaji: 'za', base: 'さ', note: 's → z' },
  { char: 'じ', romaji: 'ji', base: 'し', note: 'shi → ji (Đặc biệt)' },
  { char: 'ず', romaji: 'zu', base: 'す', note: 's → z' },
  { char: 'ぜ', romaji: 'ze', base: 'せ', note: 's → z' },
  { char: 'ぞ', romaji: 'zo', base: 'そ', note: 's → z' },
  { char: 'だ', romaji: 'da', base: 'た', note: 't → d' },
  { char: 'ぢ', romaji: 'ji (di)', base: 'ち', note: 'chi → ji' },
  { char: 'づ', romaji: 'zu (du)', base: 'つ', note: 'tsu → zu' },
  { char: 'で', romaji: 'de', base: 'て', note: 't → d' },
  { char: 'ど', romaji: 'do', base: 'と', note: 't → d' },
  { char: 'ば', romaji: 'ba', base: 'は', note: 'h → b (Dakuten ゛)' },
  { char: 'び', romaji: 'bi', base: 'ひ', note: 'h → b' },
  { char: 'ぶ', romaji: 'bu', base: 'ふ', note: 'f → b' },
  { char: 'べ', romaji: 'be', base: 'へ', note: 'h → b' },
  { char: 'ぼ', romaji: 'bo', base: 'ほ', note: 'h → b' },
  { char: 'ぱ', romaji: 'pa', base: 'は', note: 'h → p (Handakuten ゜)' },
  { char: 'ぴ', romaji: 'pi', base: 'ひ', note: 'h → p' },
  { char: 'ぷ', romaji: 'pu', base: 'ふ', note: 'f → p' },
  { char: 'ぺ', romaji: 'pe', base: 'へ', note: 'h → p' },
  { char: 'ぽ', romaji: 'po', base: 'ほ', note: 'h → p' },
];

export const KANA_YOON_SAMPLE: { char: string; romaji: string; example: string; meaningVi: string }[] = [
  { char: 'きゃ', romaji: 'kya', example: 'きゃく (kyaku)', meaningVi: 'khách hàng' },
  { char: 'きゅ', romaji: 'kyu', example: 'きゅうり (kyuuri)', meaningVi: 'dưa chuột' },
  { char: 'きょ', romaji: 'kyo', example: 'きょう (kyou)', meaningVi: 'hôm nay' },
  { char: 'しゃ', romaji: 'sha', example: 'しゃしん (shashin)', meaningVi: 'ảnh chụp' },
  { char: 'しゅ', romaji: 'shu', example: 'しゅみ (shumi)', meaningVi: 'sở thích' },
  { char: 'しょ', romaji: 'sho', example: 'しょくどう (shokudou)', meaningVi: 'nhà ăn' },
  { char: 'ちゃ', romaji: 'cha', example: 'おちゃ (ocha)', meaningVi: 'trà' },
  { char: 'ちゅ', romaji: 'chu', example: 'ちゅうごく (chuugoku)', meaningVi: 'Trung Quốc' },
  { char: 'ちょ', romaji: 'cho', example: 'ちょっと (chotto)', meaningVi: 'một chút' },
  { char: 'にゃ', romaji: 'nya', example: 'にゃんこ (nyanko)', meaningVi: 'mèo con' },
  { char: 'りゃ', romaji: 'rya', example: 'りゃくご (ryakugo)', meaningVi: 'từ viết tắt' },
  { char: 'りょ', romaji: 'ryo', example: 'りょこう (ryokou)', meaningVi: 'du lịch' },
];
