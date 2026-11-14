# MeowLanguage — Tài liệu Tính năng Nền tảng Học Tiếng Anh (B1→B2) & Tiếng Nhật (0→JLPT N5)

**MeowLanguage** là nền tảng web tự học song ngữ tách luồng hoàn toàn giữa **Tiếng Anh (B1 → B2)** và **Tiếng Nhật (0 → JLPT N5)**, tích hợp hệ thống ôn tập ngắt quãng SRS, phát âm, đọc hiểu dài, viết nét Kana/Kanji, phân tích tiến độ và trợ lý ghi chú AI.

---

## 1. Xác thực & Không gian người dùng (`AuthView`, `AppShell`, `SettingsView`)
- **Trang Đăng nhập / Đăng ký (`AuthView`)**:
  - Hỗ trợ đăng nhập bằng **Email hoặc tên đăng nhập** (có tài khoản tạm `Thảo` / `12345679`) và tạo tài khoản mới lưu tại `localStorage`.
  - Chế độ **Vào học thử không cần tài khoản (Guest)** để trải nghiệm nhanh.
  - Ghi nhớ phiên đăng nhập (`Remember me` qua `localStorage` hoặc `sessionStorage`) và nút **Đăng xuất** trên thanh header.
- **Tách biệt 2 không gian học (`🇬🇧 Tiếng Anh` ⇄ `🇯🇵 Tiếng Nhật`)**:
  - Chuyển đổi nhanh ngay trên thanh điều hướng đen phía trên; toàn bộ lộ trình, thanh bên trái, tìm kiếm `⌘K`, bảng *Hôm nay* và phòng luyện tập đều tự lọc đúng theo ngôn ngữ đang chọn.
- **Thanh điều hướng & Tiện ích giao diện**:
  - **Thanh bên trái có thể mở rộng/thu gọn** và **Bảng "Hôm nay" bên phải có nút `>>` đóng gọn / `<<` mở ra** (lưu trạng thái tự động).
  - **Tooltips tức thì (`HoverTooltip`)** khi di chuột vào mọi icon ở thanh trái, thanh trên, thanh dưới và bảng phải; tự ẩn ngay khi click.
  - **Tìm kiếm nhanh (`⌘K` / Ctrl+K)**: tìm bài học, từ vựng, Kanji N5 và các bài đọc dài trong ngôn ngữ hiện tại.
  - **Avatar mascot mèo cam (`MascotAvatar`)** đồng bộ thương hiệu **MeowLanguage**.
  - **Sao lưu & Khôi phục dữ liệu (`SettingsView`)**: xuất/nhập file JSON (`meowlanguage-backup-YYYY-MM-DD.json`), chỉnh mục tiêu phút/ngày, XP/ngày, tốc độ đọc giọng nói (`0.75x` – `1.2x`) và bật/tắt chế độ xem trước toàn bộ bài học.

---

## 2. Không gian Tiếng Anh (CEFR B1 → B2)
- **Lộ trình 8 Modules — 13 bài học tương tác 5 bước (`RoadmapView`, `LessonPlayer`)**:
  - Củng cố nền tảng B1, Từ vựng B1→B2, Ngữ pháp nâng cao B2 (Mixed Conditionals, Inversion, Cleft Sentences...), Đọc hiểu, Nghe hiểu, Luyện nói phản xạ, Viết B2 và Đánh giá năng lực B2.
  - Mỗi bài học gồm 5 bước: *Lý thuyết & Ví dụ → Hiểu bản chất → Luyện tập đa dạng (MCQ, Điền từ, Sắp xếp câu, Ghép cặp, Nghe) → Vận dụng Viết/Nói → Tổng kết & Nhận XP*.
- **Phòng Phiên âm IPA chuẩn (`EnglishIpaView` — `english_ipa`)**:
  - Đầy đủ **44 âm IPA** (Nguyên âm đơn, Nguyên âm đôi, Phụ âm vô thanh/hữu thanh), hướng dẫn đặt khẩu hình lưỡi/môi, lỗi thường gặp của người Việt, đọc chậm `0.65x`, thu âm Micro kiểm tra phát âm (`en-US`), đánh dấu âm đã thuộc và **8 bài luyện nghe cặp âm tối thiểu (Minimal Pairs)**.
- **Phòng Đọc hiểu dài (`EnglishReadingView` — `english_reading`)**:
  - **9 bài đọc dài chuẩn B1+ → B2** chia theo 3 nhóm: *Email & Công sở*, *Sự kiện & Tin tức*, *Chủ đề chuyên sâu*.
  - Có nút nghe cả bài hoặc từng đoạn, chỉnh tốc độ đọc, tăng cỡ chữ, bật/tắt dịch tiếng Việt từng đoạn, **lưu từ mới từ Glossary thẳng vào SRS**, lưu tóm tắt vào Sổ tay và làm câu hỏi đọc hiểu tính XP.
- **Trung tâm Kỹ năng B2 (`EnglishHubView`)**:
  - Tổng quan tiến độ 8 Modules, khu luyện Nghe/Nói (Dictation + Speech Recognition), luyện Viết bài B2 có chấm tự động từ nối/độ dài/từ vựng học thuật, và bài Test chuẩn đầu ra B2.

---

## 3. Không gian Tiếng Nhật (0 → JLPT N5)
- **Lộ trình 8 Modules — 20 bài học tương tác 5 bước (`RoadmapView`, `japaneseCurriculum.ts` + `japaneseCurriculumExtra.ts`)**:
  - **Module 1–2 (Hiragana & Katakana)**: 4 bài học trọn bộ 92 chữ kèm mẹo nhớ, nét viết và phân biệt các cặp chữ dễ nhầm (`シ/ツ`, `ソ/ン`), âm ghép Katakana mở rộng (`ティ・ファ・チェ`) và từ mượn công nghệ.
  - **Module 3 (Phát âm)**: Biến âm (`゛゜`), Âm ghép Yōon (`ゃゅょ`), Trường âm & Âm ngắt (`っ`).
  - **Module 4 (Từ vựng N5)**: Chào hỏi, Số đếm, Thời gian, Gia đình (khiêm nhường/kính trọng), Trường học, Công việc & Địa điểm.
  - **Module 5 (Ngữ pháp cốt lõi N5 — 6 bài)**: `A は B です`, `これ・それ・あれ`, trợ từ `を・に・で・へ・も`, chia thể `ます`, **Tính từ đuôi い / な** (4 dạng hiện tại/quá khứ/phủ định), **Tồn tại `あります・います` & Lượng từ đếm**, **Thể `て` (`て-form`: `〜てください`, `〜ています`, `〜てもいいですか`, `〜てはいけません`)**, **Sở thích/Khả năng/Rủ rê (`好き・上手・たい・ませんか`)**.
  - **Module 6 (Hội thoại thực tế)**: Tự giới thiệu, Gọi món, Mua sắm hỏi giá (`いくらですか`) và Hỏi đường đi tàu điện.
  - **Module 7 (Kanji N5 — 2 bài)**: Bí quyết On'yomi/Kun'yomi theo âm Hán Việt, Số đếm, Thời gian, Con người, Phương hướng & Động từ cốt lõi.
  - **Module 8 (Luyện thi JLPT N5 — 2 bài)**: Tổng ôn toàn diện & thực chiến đọc Email/Thông báo + nghe hội thoại bẫy N5.
- **Phòng Phát âm & Nhịp phách Tiếng Nhật (`JapanesePronunciationView` — `japanese_pronunciation`)**:
  - **16 nhóm âm trọng điểm**: Nguyên âm & âm dễ nhầm cho người Việt (`う`, `つ`, `ふ`, `らりるれろ`, `ん`), Biến âm `゛`/`゜`, Âm ghép Yōon và Quy tắc nhịp phách Mora (Trường âm & Âm ngắt `っ`).
  - Có cặp từ đối chiếu trực tiếp (`おばさん vs おばあさん`, `きて vs きって`), thử nói qua Micro (`ja-JP`), đọc chậm `0.65x`, đánh dấu đã nắm vững và **6 bài luyện nghe phân biệt cặp âm dễ nhầm**.
- **Phòng Đọc hiểu dài N5 → N5+ (`JapaneseReadingView` — `japanese_reading`)**:
  - **8 bài đọc dài** theo 3 nhóm: *Email & Tin nhắn LINE*, *Sự kiện & Thông báo (Lễ hội Hanami, Shinkansen, Siêu thị)*, *Nhật ký & Văn hóa Nhật (Quán Ramen, Đời sống Tokyo)*.
  - Tùy chọn **Bật/tắt cách đọc Kana (Furigana)**, **Bật/tắt Romaji**, **Dịch nghĩa tiếng Việt từng đoạn/cả bài**, nghe đọc `ja-JP` nhiều tốc độ, lưu từ Glossary vào SRS và làm câu hỏi đọc hiểu JLPT N5.
- **Trung tâm Kana, Kanji & JLPT N5 (`JapaneseHubView`)**:
  - Bảng tương tác **92 chữ Kana** + **Khung tập viết nét cảm ứng/chuột (`KanaDrawingCanvas`)**.
  - Thư viện **110 chữ Kanji N5** chia theo nhóm chủ đề kèm âm Hán Việt, On/Kun, số nét, từ ghép & câu ví dụ có phát âm.

---

## 4. Kho Từ vựng Thông minh, Họ từ (Word Family) & SRS (`VocabularyView`)
- **820 từ vựng tích hợp sẵn**:
  - **520 từ Tiếng Anh B1→B2** (phân nhóm theo topic: *Work & Career*, *Technology & AI*, *Environment*, *Education*, *Health*, *Media*, *Society*, *Collocations*, *Phrasal Verbs*...).
  - **300 từ Tiếng Nhật N5** (phân nhóm theo topic & từ loại: *Danh từ*, *Động từ*, *Tính từ -い*, *Tính từ -な*, *Chào hỏi*, *Phó từ*...).
- **Sắp xếp & Phân loại khoa học**: lọc theo Topic, Từ loại (`Noun / Verb / Adj / Adv`...) và cấp độ/trạng thái SRS.
- **Tra cứu Họ từ (Word Family Lookup)** khi nhấn vào từ vựng tiếng Anh (kèm từ điển mở rộng `wordFamilies.ts` + `wordFamiliesExtra.ts` & bộ chuẩn hóa hậu tố để tra được cả từ gốc lẫn biến thể như `contrast` → `contrasting (adj)`, `contrasted (v)`, `contrastingly (adv)`...).
- **Hệ thống Flashcard lặp lại ngắt quãng (SRS)** + 4 chế độ đánh giá (*Quên / Khó / Tốt / Dễ*) tự tính ngày ôn kế tiếp, hỗ trợ tự thêm từ mới và gom theo danh sách tùy chỉnh.

---

## 5. Luyện tập, Phân tích Tiến độ & Trợ lý AI
- **Phòng Luyện tập nhanh (`PracticeHubView`)**: lọc bài tập theo kỹ năng (*Ngữ pháp, Từ vựng, Nghe hiểu, Đọc hiểu, Viết/Dịch, Kana, Kanji*) và lưu kết quả cộng XP.
- **Thống kê & Phân tích (`AnalyticsView`)**: biểu đồ XP & thời gian học 7 ngày, độ chính xác từng kỹ năng, danh sách điểm yếu cần ôn lại (`weaknessTags`) và **8 Huy hiệu thành tích (`badges.ts`)**.
- **Sổ tay Ghi chú & Trợ lý AI (`NotesAndAIView`)**: lưu ghi chú học tập theo từng ngôn ngữ/bài học và hỏi đáp ngữ pháp/từ vựng với AI Tutor (`aiTutor.ts`, hỗ trợ chế độ Demo offline hoặc kết nối API OpenAI-compatible / Gemini).
