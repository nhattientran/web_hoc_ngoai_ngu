import { VocabItem } from '../types';
import { ENGLISH_B2_EXTRA_VOCAB } from './englishB2Vocab';
import { JAPANESE_N5_EXTRA_VOCAB } from './japaneseN5Vocab';

const now = Date.now();

const en = (
  id: string,
  word: string,
  reading: string,
  partOfSpeech: string,
  meaningVi: string,
  topic: string,
  levelTag: string,
  example: string,
  exampleVi: string,
  list: string,
  sourceLessonId?: string
): VocabItem => ({
  id,
  language: 'en',
  word,
  reading,
  partOfSpeech,
  meaningVi,
  topic,
  levelTag,
  example,
  exampleVi,
  srsState: 'new',
  easeFactor: 2.5,
  intervalDays: 0,
  repetitions: 0,
  nextReviewAt: now,
  customLists: [list],
  sourceLessonId,
});

const jp = (
  id: string,
  word: string,
  reading: string,
  romaji: string,
  partOfSpeech: string,
  meaningVi: string,
  topic: string,
  example: string,
  exampleVi: string,
  list: string,
  sourceLessonId?: string
): VocabItem => ({
  id,
  language: 'jp',
  word,
  reading,
  romaji,
  partOfSpeech,
  meaningVi,
  topic,
  levelTag: 'N5',
  example,
  exampleVi,
  srsState: 'new',
  easeFactor: 2.5,
  intervalDays: 0,
  repetitions: 0,
  nextReviewAt: now,
  customLists: [list],
  sourceLessonId,
});

export const INITIAL_VOCAB_ITEMS: VocabItem[] = [
  // ================= ENGLISH B1+ -> B2 (60 ITEMS) =================
  // 1. Work & Career (12)
  en('en-v1', 'resolve', '/rɪˈzɒlv/', 'verb', 'giải quyết dứt điểm (vấn đề, xung đột)', 'Work & Career', 'B2', 'Our support team resolved the billing issue within an hour.', 'Đội hỗ trợ của chúng tôi đã giải quyết vấn đề thanh toán trong một giờ.', 'Công sở B2', 'en-1-1'),
  en('en-v2', 'finalize', '/ˈfaɪnəlaɪz/', 'verb', 'hoàn tất, chốt lại (kế hoạch, hợp đồng)', 'Work & Career', 'B2', 'We need to finalize the presentation before Friday.', 'Chúng ta cần chốt bài thuyết trình trước thứ Sáu.', 'Công sở B2', 'en-1-1'),
  en('en-v3', 'negotiate', '/nɪˈɡəʊʃieɪt/', 'verb', 'đàm phán, thương lượng', 'Work & Career', 'B2', 'She successfully negotiated a flexible hybrid schedule.', 'Cô ấy đã đàm phán thành công lịch làm việc linh hoạt.', 'Công sở B2', 'en-1-2'),
  en('en-v4', 'delegate', '/ˈdelɪɡeɪt/', 'verb', 'ủy quyền, phân công nhiệm vụ', 'Work & Career', 'B2', 'Good managers know when to delegate routine tasks.', 'Người quản lý giỏi biết khi nào nên giao việc thường nhật cho cấp dưới.', 'Công sở B2', 'en-1-2'),
  en('en-v5', 'take the initiative', '/teɪk ði ɪˈnɪʃətɪv/', 'collocation', 'chủ động đi đầu, tự giác khởi xướng', 'Work & Career', 'B2', 'Employers value candidates who take the initiative to solve problems.', 'Nhà tuyển dụng đánh giá cao ứng viên chủ động giải quyết vấn đề.', 'Công sở B2', 'en-2-1'),
  en('en-v6', 'meet a deadline', '/miːt ə ˈdedlaɪn/', 'collocation', 'hoàn thành đúng thời hạn', 'Work & Career', 'B1+', 'Everyone stayed focused to meet the tight project deadline.', 'Mọi người đều tập trung để kịp hạn chót gấp của dự án.', 'Công sở B2', 'en-2-1'),
  en('en-v7', 'consensus', '/kənˈsensəs/', 'noun', 'sự đồng thuận chung', 'Work & Career', 'B2', 'After a long debate, the committee reached a consensus.', 'Sau cuộc tranh luận dài, ủy ban đã đạt được sự đồng thuận.', 'Công sở B2', 'en-2-1'),
  en('en-v8', 'accountability', '/əˌkaʊntəˈbɪləti/', 'noun', 'trách nhiệm giải trình, tinh thần chịu trách nhiệm', 'Work & Career', 'B2', 'Clear roles improve accountability across the department.', 'Vai trò rõ ràng giúp tăng tinh thần chịu trách nhiệm trong phòng ban.', 'Công sở B2'),
  en('en-v9', 'upskill', '/ˈʌpskɪl/', 'verb', 'nâng cao kỹ năng chuyên môn', 'Work & Career', 'B2', 'Workers need to upskill regularly to stay competitive.', 'Người lao động cần nâng cao kỹ năng thường xuyên để duy trì lợi thế cạnh tranh.', 'Công sở B2'),
  en('en-v10', 'constructive feedback', '/kənˈstrʌktɪv ˈfiːdbæk/', 'collocation', 'góp ý mang tính xây dựng', 'Work & Career', 'B2', 'She always gives constructive feedback during code reviews.', 'Cô ấy luôn đưa ra góp ý xây dựng khi rà soát mã nguồn.', 'Công sở B2'),
  en('en-v11', 'workload', '/ˈwɜːrkləʊd/', 'noun', 'khối lượng công việc', 'Work & Career', 'B2', 'Hiring two interns helped reduce our weekly workload.', 'Tuyển thêm hai thực tập sinh đã giúp giảm khối lượng việc hàng tuần.', 'Công sở B2'),
  en('en-v12', 'on the same page', '/ɒn ðə seɪm peɪdʒ/', 'idiom', 'cùng chung cách hiểu, đồng thuận', 'Work & Career', 'B2', 'Let’s hold a quick sync so we are all on the same page.', 'Hãy họp nhanh một chút để tất cả hiểu thống nhất với nhau.', 'Phrasal Verbs & Idioms', 'en-2-3'),

  // 2. Technology & AI (10)
  en('en-v13', 'streamline', '/ˈstriːmlaɪn/', 'verb', 'tinh gọn, hợp lý hóa (quy trình)', 'Technology & AI', 'B2', 'Automation helps streamline repetitive administrative work.', 'Tự động hóa giúp tinh gọn các công việc hành chính lặp đi lặp lại.', 'Tech & AI', 'en-2-2'),
  en('en-v14', 'automation', '/ˌɔːtəˈmeɪʃn/', 'noun', 'sự tự động hóa', 'Technology & AI', 'B2', 'Automation has transformed modern manufacturing and logistics.', 'Tự động hóa đã thay đổi hoàn toàn ngành sản xuất và hậu cần hiện đại.', 'Tech & AI', 'en-2-2'),
  en('en-v15', 'algorithm', '/ˈælɡərɪðəm/', 'noun', 'thuật toán', 'Technology & AI', 'B2', 'Social platforms use algorithms to personalize content feeds.', 'Các nền tảng mạng xã hội dùng thuật toán để cá nhân hóa bảng tin.', 'Tech & AI', 'en-2-2'),
  en('en-v16', 'cutting-edge', '/ˌkʌtɪŋ ˈedʒ/', 'adjective', 'tiên tiến nhất, tối tân', 'Technology & AI', 'B2', 'The lab develops cutting-edge medical diagnostic software.', 'Phòng thí nghiệm phát triển phần mềm chẩn đoán y tế tối tân nhất.', 'Tech & AI'),
  en('en-v17', 'obsolete', '/ˌɒbsəˈliːt/', 'adjective', 'lỗi thời, không còn được dùng nữa', 'Technology & AI', 'B2', 'Cloud storage has made floppy disks completely obsolete.', 'Lưu trữ đám mây đã khiến đĩa mềm trở nên hoàn toàn lỗi thời.', 'Tech & AI'),
  en('en-v18', 'seamless', '/ˈsiːmləs/', 'adjective', 'mượt mà, liền mạch không gián đoạn', 'Technology & AI', 'B2', 'Users expect a seamless experience between desktop and mobile.', 'Người dùng kỳ vọng trải nghiệm liền mạch giữa máy tính và điện thoại.', 'Tech & AI'),
  en('en-v19', 'leverage', '/ˈlevərɪdʒ/', 'verb', 'tận dụng tối đa (lợi thế, công nghệ)', 'Technology & AI', 'B2', 'Small businesses can leverage AI tools to serve clients faster.', 'Doanh nghiệp nhỏ có thể tận dụng công cụ AI để phục vụ khách hàng nhanh hơn.', 'Tech & AI'),
  en('en-v20', 'deploy', '/dɪˈplɔɪ/', 'verb', 'triển khai (hệ thống, phần mềm)', 'Technology & AI', 'B2', 'The engineering team deployed the security patch overnight.', 'Đội kỹ sư đã triển khai bản vá bảo mật qua đêm.', 'Tech & AI'),
  en('en-v21', 'glitch', '/ɡlɪtʃ/', 'noun', 'lỗi trục trặc nhỏ về kỹ thuật', 'Technology & AI', 'B2', 'A minor glitch prevented some users from logging in.', 'Một lỗi kỹ thuật nhỏ đã khiến vài người dùng không thể đăng nhập.', 'Tech & AI'),
  en('en-v22', 'data privacy', '/ˈdeɪtə ˈprɪvəsi/', 'collocation', 'quyền riêng tư dữ liệu', 'Technology & AI', 'B2', 'Strict laws are needed to protect consumer data privacy.', 'Cần luật nghiêm ngặt để bảo vệ quyền riêng tư dữ liệu người dùng.', 'Tech & AI'),

  // 3. Education & Learning (8)
  en('en-v23', 'curriculum', '/kəˈrɪkjələm/', 'noun', 'chương trình giảng dạy', 'Education', 'B2', 'Schools are adding digital literacy to the national curriculum.', 'Các trường đang bổ sung kỹ năng số vào chương trình học quốc gia.', 'IELTS / B2 Core'),
  en('en-v24', 'retention', '/rɪˈtenʃn/', 'noun', 'khả năng ghi nhớ, lưu giữ kiến thức', 'Education', 'B2', 'Spaced repetition dramatically improves long-term vocabulary retention.', 'Lặp lại ngắt quãng cải thiện vượt bậc khả năng nhớ từ lâu dài.', 'IELTS / B2 Core'),
  en('en-v25', 'proficiency', '/prəˈfɪʃnsi/', 'noun', 'sự thành thạo, trình độ thông thạo', 'Education', 'B2', 'Achieving B2 proficiency requires consistent speaking practice.', 'Đạt trình độ thông thạo B2 đòi hỏi luyện nói đều đặn.', 'IELTS / B2 Core'),
  en('en-v26', 'critical thinking', '/ˈkrɪtɪkl ˈθɪŋkɪŋ/', 'collocation', 'tư duy phản biện', 'Education', 'B2', 'Case studies encourage critical thinking rather than rote memorization.', 'Nghiên cứu tình huống khuyến khích tư duy phản biện thay vì học vẹt.', 'IELTS / B2 Core'),
  en('en-v27', 'cognitive', '/ˈkɒɡnətɪv/', 'adjective', 'thuộc về nhận thức, trí tuệ', 'Education', 'B2', 'Learning two languages boosts cognitive flexibility.', 'Học hai ngôn ngữ giúp tăng sự linh hoạt về mặt nhận thức.', 'IELTS / B2 Core'),
  en('en-v28', 'brush up on', '/brʌʃ ʌp ɒn/', 'phrasal verb', 'ôn lại, trau dồi lại kiến thức cũ', 'Education', 'B2', 'I need to brush up on my conditionals before the exam.', 'Tôi cần ôn lại câu điều kiện trước kỳ thi.', 'Phrasal Verbs & Idioms', 'en-2-3'),
  en('en-v29', 'keep up with', '/kiːp ʌp wɪð/', 'phrasal verb', 'theo kịp, bắt kịp tiến độ', 'Education', 'B1+', 'Reading news in English helps me keep up with global trends.', 'Đọc tin tiếng Anh giúp tôi bắt kịp các xu hướng toàn cầu.', 'Phrasal Verbs & Idioms'),
  en('en-v30', 'figure out', '/ˈfɪɡjər aʊt/', 'phrasal verb', 'tìm ra cách giải quyết, hiểu ra', 'Education', 'B1+', 'It took me ten minutes to figure out the grammar pattern.', 'Tôi mất 10 phút để hiểu ra quy luật ngữ pháp đó.', 'Phrasal Verbs & Idioms'),

  // 4. Lifestyle & Wellbeing (8)
  en('en-v31', 'burn out', '/bɜːrn aʊt/', 'phrasal verb', 'kiệt sức vì làm việc/học tập quá độ', 'Lifestyle & Wellbeing', 'B2', 'Without clear boundaries, remote workers can burn out quickly.', 'Nếu không có ranh giới rõ ràng, người làm từ xa rất dễ kiệt sức.', 'Wellbeing', 'en-2-3'),
  en('en-v32', 'resilience', '/rɪˈzɪliəns/', 'noun', 'sự bền bỉ, khả năng phục hồi sau khó khăn', 'Lifestyle & Wellbeing', 'B2', 'Daily habits build emotional resilience under pressure.', 'Thói quen hàng ngày xây dựng sức bền tinh thần dưới áp lực.', 'Wellbeing'),
  en('en-v33', 'sedentary', '/ˈsedntri/', 'adjective', 'ít vận động, ngồi nhiều', 'Lifestyle & Wellbeing', 'B2', 'A sedentary lifestyle increases the risk of back pain.', 'Lối sống ngồi nhiều ít vận động làm tăng nguy cơ đau lưng.', 'Wellbeing'),
  en('en-v34', 'mindfulness', '/ˈmaɪndflnəs/', 'noun', 'sự chánh niệm, tập trung vào hiện tại', 'Lifestyle & Wellbeing', 'B2', 'Ten minutes of mindfulness each morning lowers anxiety.', 'Mười phút chánh niệm mỗi sáng giúp giảm lo âu.', 'Wellbeing'),
  en('en-v35', 'cope with', '/kəʊp wɪð/', 'phrasal verb', 'đối phó, xoay xở vượt qua', 'Lifestyle & Wellbeing', 'B1+', 'Taking short walks helps me cope with heavy stress.', 'Đi bộ ngắn giúp tôi giải tỏa căng thẳng nặng nề.', 'Phrasal Verbs & Idioms'),
  en('en-v36', 'cut down on', '/kʌt daʊn ɒn/', 'phrasal verb', 'cắt giảm bớt', 'Lifestyle & Wellbeing', 'B1+', 'I am trying to cut down on late-night screen time.', 'Tôi đang cố gắng cắt giảm thời gian nhìn màn hình khuya.', 'Phrasal Verbs & Idioms'),
  en('en-v37', 'recharge', '/ˌriːˈtʃɑːrdʒ/', 'verb', 'nạp lại năng lượng, nghỉ ngơi hồi sức', 'Lifestyle & Wellbeing', 'B2', 'Disconnecting on Sunday helps me recharge for the week ahead.', 'Tạm rời mạng xã hội ngày Chủ Nhật giúp tôi nạp lại năng lượng cho tuần mới.', 'Wellbeing'),
  en('en-v38', 'wellbeing', '/ˌwelˈbiːɪŋ/', 'noun', 'trạng thái khỏe mạnh cả thể chất và tinh thần', 'Lifestyle & Wellbeing', 'B2', 'Companies now invest more in employee mental wellbeing.', 'Các công ty nay đầu tư nhiều hơn vào sức khỏe tinh thần nhân viên.', 'Wellbeing'),

  // 5. Environment & Sustainability (8)
  en('en-v39', 'sustainable', '/səˈsteɪnəbl/', 'adjective', 'bền vững, thân thiện dài lâu', 'Environment', 'B2', 'Cities are investing in sustainable public transportation.', 'Các thành phố đang đầu tư vào giao thông công cộng bền vững.', 'IELTS / B2 Core', 'en-2-2'),
  en('en-v40', 'carbon footprint', '/ˌkɑːrbən ˈfʊtprɪnt/', 'collocation', 'lượng khí thải carbon tạo ra', 'Environment', 'B2', 'Cycling to work significantly reduces your carbon footprint.', 'Đạp xe đi làm giúp giảm đáng kể lượng khí thải carbon của bạn.', 'IELTS / B2 Core', 'en-2-2'),
  en('en-v41', 'renewable', '/rɪˈnjuːəbl/', 'adjective', 'có thể tái tạo (năng lượng)', 'Environment', 'B2', 'Solar and wind are the fastest-growing renewable energy sources.', 'Mặt trời và gió là nguồn năng lượng tái tạo tăng nhanh nhất.', 'IELTS / B2 Core'),
  en('en-v42', 'mitigate', '/ˈmɪtɪɡeɪt/', 'verb', 'giảm nhẹ, làm dịu bớt (tác hại)', 'Environment', 'B2', 'Planting urban trees helps mitigate extreme summer heat.', 'Trồng cây đô thị giúp giảm nhẹ cái nóng mùa hè khắc nghiệt.', 'IELTS / B2 Core'),
  en('en-v43', 'biodiversity', '/ˌbaɪəʊdaɪˈvɜːrsəti/', 'noun', 'sự đa dạng sinh học', 'Environment', 'B2', 'Protecting wetlands is crucial for local biodiversity.', 'Bảo vệ vùng đất ngập nước rất quan trọng cho đa dạng sinh học địa phương.', 'IELTS / B2 Core'),
  en('en-v44', 'deplete', '/dɪˈpliːt/', 'verb', 'làm cạn kiệt (tài nguyên)', 'Environment', 'B2', 'Overfishing can rapidly deplete ocean fish populations.', 'Đánh bắt quá mức có thể nhanh chóng làm cạn kiệt nguồn cá biển.', 'IELTS / B2 Core'),
  en('en-v45', 'single-use', '/ˌsɪŋɡl ˈjuːs/', 'adjective', 'dùng một lần rồi bỏ', 'Environment', 'B2', 'Many cafes offer discounts if you skip single-use cups.', 'Nhiều quán cà phê giảm giá nếu bạn không dùng cốc nhựa một lần.', 'IELTS / B2 Core'),
  en('en-v46', 'emission', '/ɪˈmɪʃn/', 'noun', 'khí thải, sự phát thải', 'Environment', 'B2', 'Electric buses help lower greenhouse gas emissions.', 'Xe buýt điện giúp giảm lượng khí thải nhà kính.', 'IELTS / B2 Core'),

  // 6. Travel & Culture (7)
  en('en-v47', 'itinerary', '/aɪˈtɪnəreri/', 'noun', 'lịch trình chuyến đi chi tiết', 'Travel & Culture', 'B2', 'We left one free afternoon in our Kyoto itinerary.', 'Chúng tôi để trống một buổi chiều trong lịch trình đi Kyoto.', 'IELTS / B2 Core', 'en-2-3'),
  en('en-v48', 'immerse oneself in', '/ɪˈmɜːrs/', 'collocation', 'đắm mình hoàn toàn vào (văn hóa, ngôn ngữ)', 'Travel & Culture', 'B2', 'Living with a host family lets you immerse yourself in local culture.', 'Ở cùng gia đình bản xứ giúp bạn đắm mình vào văn hóa địa phương.', 'IELTS / B2 Core', 'en-2-3'),
  en('en-v49', 'off the beaten track', '/ɒf ðə ˈbiːtn træk/', 'idiom', 'nơi ít khách du lịch, hoang sơ yên tĩnh', 'Travel & Culture', 'B2', 'I prefer small villages off the beaten track rather than crowded resorts.', 'Tôi thích những ngôi làng vắng vẻ ít du khách hơn khu nghỉ dưỡng đông đúc.', 'Phrasal Verbs & Idioms', 'en-2-3'),
  en('en-v50', 'broaden one’s horizons', '/ˈbrɔːdn/', 'idiom', 'mở mang tầm mắt, mở rộng hiểu biết', 'Travel & Culture', 'B2', 'Studying abroad truly broadens your cultural horizons.', 'Du học thực sự giúp bạn mở mang tầm mắt về văn hóa.', 'Phrasal Verbs & Idioms'),
  en('en-v51', 'hospitality', '/ˌhɒspɪˈtæləti/', 'noun', 'lòng hiếu khách', 'Travel & Culture', 'B2', 'Visitors often praise the warm hospitality in Japan and Vietnam.', 'Du khách thường khen ngợi lòng hiếu khách ấm áp ở Nhật và Việt Nam.', 'IELTS / B2 Core'),
  en('en-v52', 'authentic', '/ɔːˈθentɪk/', 'adjective', 'đích thực, nguyên bản truyền thống', 'Travel & Culture', 'B2', 'This tiny alley serves authentic handmade soba noodles.', 'Con hẻm nhỏ này phục vụ mì soba thủ công chuẩn vị truyền thống.', 'IELTS / B2 Core'),
  en('en-v53', 'get away from it all', '/ɡet əˈweɪ/', 'idiom', 'tạm rời xa nhịp sống ồn ào để nghỉ ngơi', 'Travel & Culture', 'B2', 'We rented a cabin in Da Lat to get away from it all.', 'Chúng tôi thuê căn nhà gỗ ở Đà Lạt để tạm rời xa ồn ào phố thị.', 'Phrasal Verbs & Idioms'),

  // 7. Society, Communication & B2 Discourse Markers (7)
  en('en-v54', 'consequently', '/ˈkɒnsɪkwəntli/', 'adverb', 'do đó, kết quả là (văn viết B2)', 'Society & Communication', 'B2', 'He practiced daily; consequently, his listening accuracy improved.', 'Anh ấy luyện tập mỗi ngày; kết quả là độ chính xác khi nghe đã tăng lên.', 'Writing Connectors', 'en-3-2'),
  en('en-v55', 'nevertheless', '/ˌnevərðəˈles/', 'adverb', 'tuy nhiên, dẫu vậy', 'Society & Communication', 'B2', 'The exam was challenging; nevertheless, she stayed calm.', 'Bài thi khá thử thách; tuy nhiên cô ấy vẫn giữ bình tĩnh.', 'Writing Connectors', 'en-3-2'),
  en('en-v56', 'bridge the gap', '/brɪdʒ ðə ɡæp/', 'collocation', 'thu hẹp khoảng cách', 'Society & Communication', 'B2', 'Mentorship programs help bridge the gap between school and work.', 'Chương trình cố vấn giúp thu hẹp khoảng cách giữa trường học và công việc.', 'Công sở B2', 'en-2-1'),
  en('en-v57', 'articulate', '/ɑːrˈtɪkjəleɪt/', 'verb / adj', 'diễn đạt rõ ràng, mạch lạc', 'Society & Communication', 'B2', 'She can articulate complex ideas in simple, clear English.', 'Cô ấy có thể diễn đạt ý tưởng phức tạp bằng tiếng Anh đơn giản, rõ ràng.', 'IELTS / B2 Core'),
  en('en-v58', 'persuasive', '/pərˈsweɪsɪv/', 'adjective', 'có sức thuyết phục', 'Society & Communication', 'B2', 'Real examples make an argument far more persuasive.', 'Ví dụ thực tế khiến lập luận thuyết phục hơn nhiều.', 'Writing Connectors'),
  en('en-v59', 'misconception', '/ˌmɪskənˈsepʃn/', 'noun', 'quan niệm sai lầm, hiểu nhầm phổ biến', 'Society & Communication', 'B2', 'It is a common misconception that adults cannot master a new script.', 'Có một hiểu nhầm phổ biến rằng người lớn không thể học thành thạo bảng chữ mới.', 'IELTS / B2 Core'),
  en('en-v60', 'indispensable', '/ˌɪndɪˈspensəbl/', 'adjective', 'không thể thiếu được, tối quan trọng', 'Society & Communication', 'B2', 'Clear communication is an indispensable skill for remote teams.', 'Giao tiếp rõ ràng là kỹ năng không thể thiếu cho nhóm làm việc từ xa.', 'IELTS / B2 Core'),
  ...ENGLISH_B2_EXTRA_VOCAB,

  // ================= JAPANESE N5 (40 ITEMS) =================
  // Greetings & Basics
  jp('jp-v1', 'おはようございます', 'おはようございます', 'ohayou gozaimasu', 'Chào hỏi', 'Chào buổi sáng (lịch sự)', 'Greetings', '先生、おはようございます。', 'Thưa thầy/cô, chào buổi sáng ạ.', 'Giao tiếp N5', 'jp-4-1'),
  jp('jp-v2', 'こんにちは', 'こんにちは', 'konnichiwa', 'Chào hỏi', 'Xin chào (ban ngày)', 'Greetings', '田中さん、こんにちは。', 'Chào anh Tanaka.', 'Giao tiếp N5', 'jp-4-1'),
  jp('jp-v3', 'こんばんは', 'こんばんは', 'konbanwa', 'Chào hỏi', 'Chào buổi tối', 'Greetings', 'みなさん、こんばんは。', 'Chào buổi tối mọi người.', 'Giao tiếp N5', 'jp-4-1'),
  jp('jp-v4', 'ありがとうございます', 'ありがとうございます', 'arigatou gozaimasu', 'Chào hỏi', 'Xin cảm ơn rất nhiều', 'Greetings', '手伝ってくれてありがとうございます。', 'Cảm ơn bạn rất nhiều vì đã giúp đỡ.', 'Giao tiếp N5', 'jp-4-1'),
  jp('jp-v5', 'すみません', 'すみません', 'sumimasen', 'Chào hỏi', 'Xin lỗi / Làm phiền một chút', 'Greetings', 'すみません、駅はどこですか。', 'Xin lỗi, nhà ga ở đâu vậy ạ?', 'Giao tiếp N5', 'jp-6-1'),
  jp('jp-v6', 'よろしくお願いします', 'よろしくおねがいします', 'yoroshiku onegaishimasu', 'Chào hỏi', 'Rất mong được giúp đỡ / hợp tác', 'Greetings', 'はじめまして。よろしくお願いします。', 'Rất vui được gặp. Mong được giúp đỡ ạ.', 'Giao tiếp N5', 'jp-6-1'),

  // Dates & Time
  jp('jp-v7', '朝', 'あさ', 'asa', 'Danh từ', 'buổi sáng', 'Dates & Time', '毎朝、コーヒーを飲みます。', 'Mỗi sáng tôi đều uống cà phê.', 'N5 Thiết yếu', 'jp-1-1'),
  jp('jp-v8', '昼', 'ひる', 'hiru', 'Danh từ', 'buổi trưa', 'Dates & Time', '昼ご飯を食べましたか。', 'Bạn đã ăn cơm trưa chưa?', 'N5 Thiết yếu'),
  jp('jp-v9', '夜', 'よる', 'yoru', 'Danh từ', 'buổi tối, ban đêm', 'Dates & Time', '夜、本を読みます。', 'Buổi tối tôi đọc sách.', 'N5 Thiết yếu'),
  jp('jp-v10', '今日', 'きょう', 'kyou', 'Danh từ', 'hôm nay', 'Dates & Time', '今日はいい天気ですね。', 'Hôm nay thời tiết đẹp nhỉ.', 'N5 Thiết yếu', 'jp-3-1'),
  jp('jp-v11', '明日', 'あした', 'ashita', 'Danh từ', 'ngày mai', 'Dates & Time', '明日、東京へ行きます。', 'Ngày mai tôi đi Tokyo.', 'N5 Thiết yếu', 'jp-1-2'),
  jp('jp-v12', '昨日', 'きのう', 'kinou', 'Danh từ', 'hôm qua', 'Dates & Time', '昨日、日本語を勉強しました。', 'Hôm qua tôi đã học tiếng Nhật.', 'N5 Thiết yếu', 'jp-5-2'),
  jp('jp-v13', '時間', 'じかん', 'jikan', 'Danh từ', 'thời gian, tiếng đồng hồ', 'Dates & Time', '毎日一時間勉強します。', 'Mỗi ngày tôi học một tiếng.', 'N5 Thiết yếu', 'jp-4-1'),
  jp('jp-v14', '週末', 'しゅうまつ', 'shuumatsu', 'Danh từ', 'cuối tuần', 'Dates & Time', '週末に友達と会います。', 'Cuối tuần tôi gặp bạn bè.', 'N5 Thiết yếu'),

  // People & Family
  jp('jp-v15', '私', 'わたし', 'watashi', 'Đại từ', 'tôi', 'People & Family', '私はベトナム人です。', 'Tôi là người Việt Nam.', 'N5 Thiết yếu', 'jp-5-1'),
  jp('jp-v16', '友達', 'ともだち', 'tomodachi', 'Danh từ', 'bạn bè', 'People & Family', '友達と映画を見ます。', 'Tôi xem phim cùng bạn.', 'N5 Thiết yếu'),
  jp('jp-v17', '家族', 'かぞく', 'kazoku', 'Danh từ', 'gia đình', 'People & Family', '家族は四人です。', 'Gia đình tôi có 4 người.', 'N5 Thiết yếu'),
  jp('jp-v18', '先生', 'せんせい', 'sensei', 'Danh từ', 'giáo viên, thầy/cô', 'People & Family', '田中先生はとても親切です。', 'Thầy Tanaka rất tốt bụng.', 'N5 Thiết yếu'),
  jp('jp-v19', '学生', 'がくせい', 'gakusei', 'Danh từ', 'học sinh, sinh viên', 'People & Family', '私は大学生です。', 'Tôi là sinh viên đại học.', 'N5 Thiết yếu', 'jp-5-1'),
  jp('jp-v20', '会社員', 'かいしゃいん', 'kaishain', 'Danh từ', 'nhân viên công ty', 'People & Family', '父は会社員です。', 'Bố tôi là nhân viên công ty.', 'N5 Thiết yếu'),

  // Places & Transport
  jp('jp-v21', '駅', 'えき', 'eki', 'Danh từ', 'nhà ga tàu điện', 'Places & Transport', '駅で友達に会います。', 'Tôi gặp bạn ở nhà ga.', 'N5 Thiết yếu', 'jp-1-1'),
  jp('jp-v22', '電車', 'でんしゃ', 'densha', 'Danh từ', 'tàu điện', 'Places & Transport', '電車で学校へ行きます。', 'Tôi đi học bằng tàu điện.', 'N5 Thiết yếu'),
  jp('jp-v23', '学校', 'がっこう', 'gakkou', 'Danh từ', 'trường học', 'Places & Transport', '学校は八時に始まります。', 'Trường học bắt đầu lúc 8 giờ.', 'N5 Thiết yếu'),
  jp('jp-v24', '図書館', 'としょかん', 'toshokan', 'Danh từ', 'thư viện', 'Places & Transport', '図書館で本を借ります。', 'Tôi mượn sách ở thư viện.', 'N5 Thiết yếu', 'jp-5-2'),
  jp('jp-v25', '部屋', 'へや', 'heya', 'Danh từ', 'căn phòng', 'Places & Transport', '私の部屋はきれいです。', 'Phòng của tôi sạch đẹp.', 'N5 Thiết yếu'),
  jp('jp-v26', '銀行', 'ぎんこう', 'ginkou', 'Danh từ', 'ngân hàng', 'Places & Transport', '駅の前に銀行があります。', 'Trước nhà ga có ngân hàng.', 'N5 Thiết yếu'),

  // Food & Drinks
  jp('jp-v27', '水', 'みず', 'mizu', 'Danh từ', 'nước lọc', 'Food & Drinks', 'すみません、お水をください。', 'Xin lỗi, cho tôi nước lọc ạ.', 'Đồ ăn & Quán xá', 'jp-6-1'),
  jp('jp-v28', 'お茶', 'おちゃ', 'ocha', 'Danh từ', 'trà xanh', 'Food & Drinks', '熱いお茶を飲みます。', 'Tôi uống trà nóng.', 'Đồ ăn & Quán xá'),
  jp('jp-v29', 'コーヒー', 'こーひー', 'koohii', 'Danh từ', 'cà phê', 'Food & Drinks', 'カフェでコーヒーを飲みます。', 'Tôi uống cà phê ở quán.', 'Đồ ăn & Quán xá', 'jp-2-1'),
  jp('jp-v30', 'ご飯', 'ごはん', 'gohan', 'Danh từ', 'cơm / bữa ăn', 'Food & Drinks', '朝ご飯を食べます。', 'Tôi ăn bữa sáng.', 'Đồ ăn & Quán xá'),
  jp('jp-v31', 'りんご', 'りんご', 'ringo', 'Danh từ', 'quả táo', 'Food & Drinks', 'りんごを三つ買いました。', 'Tôi đã mua 3 quả táo.', 'Đồ ăn & Quán xá'),

  // Essential Verbs & Adjectives
  jp('jp-v32', '食べる', 'たべる', 'taberu', 'Động từ', 'ăn', 'Daily Activities', 'すしを食べます。', 'Tôi ăn sushi.', 'Động từ N5', 'jp-5-2'),
  jp('jp-v33', '飲む', 'のむ', 'nomu', 'Động từ', 'uống', 'Daily Activities', 'ジュースを飲みませんか。', 'Bạn uống nước trái cây không?', 'Động từ N5'),
  jp('jp-v34', '行く', 'いく', 'iku', 'Động từ', 'đi', 'Daily Activities', '来月、日本へ行きます。', 'Tháng sau tôi đi Nhật.', 'Động từ N5'),
  jp('jp-v35', '勉強する', 'べんきょうする', 'benkyou suru', 'Động từ', 'học tập', 'School & Work', '毎日日本語を勉強します。', 'Mỗi ngày tôi học tiếng Nhật.', 'Động từ N5'),
  jp('jp-v36', '買う', 'かう', 'kau', 'Động từ', 'mua', 'Shopping', 'デパートでくつを買います。', 'Tôi mua giày ở trung tâm thương mại.', 'Động từ N5'),
  jp('jp-v37', '読む', 'よむ', 'yomu', 'Động từ', 'đọc', 'Daily Activities', '寝る前に本を読みます。', 'Tôi đọc sách trước khi ngủ.', 'Động từ N5'),
  jp('jp-v38', '新しい', 'あたらしい', 'atarashii', 'Tính từ -い', 'mới', 'Shopping', '新しいかばんがほしいです。', 'Tôi muốn một chiếc túi mới.', 'Tính từ N5'),
  jp('jp-v39', 'おいしい', 'おいしい', 'oishii', 'Tính từ -い', 'ngon', 'Food & Drinks', 'このラーメンはおいしいです。', 'Món ramen này ngon.', 'Tính từ N5'),
  jp('jp-v40', '好き', 'すき', 'suki', 'Tính từ -な', 'thích', 'Daily Activities', '私は音楽が好きです。', 'Tôi thích âm nhạc.', 'Tính từ N5'),
  ...JAPANESE_N5_EXTRA_VOCAB,
];
