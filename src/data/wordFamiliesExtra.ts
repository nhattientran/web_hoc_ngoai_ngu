import { PosCategory, WordFamilyForm } from './wordFamilies';

type CompactForm = [pos: PosCategory, word: string, reading: string, meaningVi: string];
type CompactFamily = [key: string, ...forms: CompactForm[]];

const POS_LABEL_WITH_ABBR: Record<PosCategory, string> = {
  noun: 'Danh từ (n)',
  verb: 'Động từ (v)',
  adjective: 'Tính từ (adj)',
  adverb: 'Trạng từ (adv)',
  phrase: 'Cụm từ',
};

function expandFamilies(entries: CompactFamily[]): Record<string, WordFamilyForm[]> {
  const out: Record<string, WordFamilyForm[]> = {};
  for (const [key, ...forms] of entries) {
    out[key.toLowerCase()] = forms.map(([pos, word, reading, meaningVi]) => ({
      pos,
      posLabelVi: POS_LABEL_WITH_ABBR[pos],
      word,
      reading,
      meaningVi,
    }));
  }
  return out;
}

const COMPACT_B2_FAMILIES: CompactFamily[] = [
  // Academic Writing & Discourse
  [
    'contrast',
    ['noun', 'contrast', '/ˈkɒn.trɑːst/', 'sự tương phản, đối lập'],
    ['verb', 'contrast', '/kənˈtrɑːst/', 'đối chiếu, làm nổi bật sự khác biệt'],
    ['adjective', 'contrasting', '/kənˈtrɑː.stɪŋ/', 'tương phản rõ rệt, trái ngược'],
    ['adjective', 'contrastive', '/kənˈtrɑː.stɪv/', 'mang tính đối chiếu'],
    ['adverb', 'contrastingly', '/kənˈtrɑː.stɪŋ.li/', 'một cách tương phản'],
  ],
  [
    'similarity',
    ['noun', 'similarity', '/ˌsɪm.ɪˈlær.ə.ti/', 'điểm tương đồng'],
    ['adjective', 'similar', '/ˈsɪm.ɪ.lər/', 'tương tự, giống nhau'],
    ['adverb', 'similarly', '/ˈsɪm.ɪ.lə.li/', 'một cách tương tự'],
  ],
  [
    'implication',
    ['noun', 'implication', '/ˌɪm.plɪˈkeɪ.ʃən/', 'hệ lụy, hàm ý sâu xa'],
    ['verb', 'imply', '/ɪmˈplaɪ/', 'ngụ ý, ám chỉ'],
    ['adjective', 'implicit', '/ɪmˈplɪs.ɪt/', 'ngầm định, hàm ẩn'],
    ['adverb', 'implicitly', '/ɪmˈplɪs.ɪt.li/', 'một cách ngầm hiểu'],
  ],
  [
    'perspective',
    ['noun', 'perspective', '/pəˈspek.tɪv/', 'góc nhìn, quan điểm tiếp cận'],
    ['adjective', 'perspectival', '/ˌpɜː.spekˈtaɪ.vəl/', 'thuộc về góc nhìn / phối cảnh'],
  ],
  [
    'criterion',
    ['noun', 'criterion / criteria', '/kraɪˈtɪə.ri.ən/', 'tiêu chí đánh giá (số ít / số nhiều)'],
  ],
  [
    'substantial',
    ['adjective', 'substantial', '/səbˈstæn.ʃəl/', 'đáng kể, lớn về mức độ'],
    ['adverb', 'substantially', '/səbˈstæn.ʃə.li/', 'một cách đáng kể'],
    ['noun', 'substance', '/ˈsʌb.stəns/', 'bản chất, nội dung cốt lõi'],
    ['verb', 'substantiate', '/səbˈstæn.ʃi.eɪt/', 'chứng minh bằng dẫn chứng'],
  ],
  [
    'negligible',
    ['adjective', 'negligible', '/ˈneɡ.lɪ.dʒə.bəl/', 'không đáng kể, có thể bỏ qua'],
    ['verb', 'neglect', '/nɪˈɡlekt/', 'sao nhãng, bỏ mặc'],
    ['noun', 'negligence', '/ˈneɡ.lɪ.dʒəns/', 'sự cẩu thả, lơ là'],
    ['adverb', 'negligibly', '/ˈneɡ.lɪ.dʒə.bli/', 'ở mức không đáng kể'],
  ],
  [
    'inevitable',
    ['adjective', 'inevitable', '/ɪˈnev.ɪ.tə.bəl/', 'tất yếu, không thể tránh khỏi'],
    ['adverb', 'inevitably', '/ɪˈnev.ɪ.tə.bli/', 'một cách tất yếu'],
    ['noun', 'inevitability', '/ɪˌnev.ɪ.təˈbɪl.ə.ti/', 'tính tất yếu'],
  ],
  [
    'paramount',
    ['adjective', 'paramount', '/ˈpær.ə.maʊnt/', 'tối quan trọng, hàng đầu'],
  ],
  [
    'demonstrate',
    ['verb', 'demonstrate', '/ˈdem.ən.streɪt/', 'chứng minh, minh họa rõ ràng'],
    ['noun', 'demonstration', '/ˌdem.ənˈstreɪ.ʃən/', 'sự chứng minh, trình diễn'],
    ['adjective', 'demonstrative', '/dɪˈmɒn.strə.tɪv/', 'bộc lộ rõ ràng; chỉ định'],
    ['adjective', 'demonstrable', '/dɪˈmɒn.strə.bəl/', 'có thể chứng minh được'],
  ],
  [
    'illustrate',
    ['verb', 'illustrate', '/ˈɪl.ə.streɪt/', 'minh họa cụ thể bằng ví dụ'],
    ['noun', 'illustration', '/ˌɪl.əˈstreɪ.ʃən/', 'hình minh họa, ví dụ điển hình'],
    ['adjective', 'illustrative', '/ˈɪl.ə.strə.tɪv/', 'mang tính minh họa'],
  ],
  [
    'emphasize',
    ['verb', 'emphasize', '/ˈem.fə.saɪz/', 'nhấn mạnh tầm quan trọng'],
    ['noun', 'emphasis', '/ˈem.fə.sɪs/', 'sự nhấn mạnh, trọng tâm'],
    ['adjective', 'emphatic', '/ɪmˈfæt.ɪk/', 'dứt khoát, nhấn mạnh'],
    ['adverb', 'emphatically', '/ɪmˈfæt.ɪ.kli/', 'một cách quả quyết'],
  ],
  [
    'attribute',
    ['verb', 'attribute', '/əˈtrɪb.juːt/', 'quy cho nguyên nhân là do'],
    ['noun', 'attribute', '/ˈæt.rɪ.bjuːt/', 'thuộc tính, phẩm chất'],
    ['noun', 'attribution', '/ˌæt.rɪˈbjuː.ʃən/', 'sự quy kết nguyên nhân/tác giả'],
    ['adjective', 'attributable', '/əˈtrɪb.jʊ.tə.bəl/', 'có thể quy cho (do nguyên nhân)'],
  ],
  [
    'significantly',
    ['adverb', 'significantly', '/sɪɡˈnɪf.ɪ.kənt.li/', 'một cách đáng kể, rõ rệt'],
    ['adjective', 'significant', '/sɪɡˈnɪf.ɪ.kənt/', 'đáng kể, có ý nghĩa quan trọng'],
    ['noun', 'significance', '/sɪɡˈnɪf.ɪ.kəns/', 'tầm quan trọng, ý nghĩa'],
    ['verb', 'signify', '/ˈsɪɡ.nɪ.faɪ/', 'biểu thị, có nghĩa là'],
  ],
  [
    'primarily',
    ['adverb', 'primarily', '/praɪˈmer.ə.li/', 'chủ yếu, trước hết là'],
    ['adjective', 'primary', '/ˈpraɪ.mər.i/', 'chính, cơ bản, sơ cấp'],
  ],
  [
    'conversely',
    ['adverb', 'conversely', '/ˈkɒn.vɜːs.li/', 'ngược lại, trái lại'],
    ['adjective', 'converse', '/ˈkɒn.vɜːs/', 'ngược lại, đảo nghịch'],
    ['noun', 'converse', '/ˈkɒn.vɜːs/', 'điều trái ngược'],
  ],

  // Workplace & Management
  [
    'collaborate',
    ['verb', 'collaborate', '/kəˈlæb.ə.reɪt/', 'cộng tác, hợp tác'],
    ['noun', 'collaboration / collaborator', '/kəˌlæb.əˈreɪ.ʃən/', 'sự cộng tác / người cộng tác'],
    ['adjective', 'collaborative', '/kəˈlæb.ə.rə.tɪv/', 'mang tính hợp tác, phối hợp'],
    ['adverb', 'collaboratively', '/kəˈlæb.ə.rə.tɪv.li/', 'một cách hợp tác'],
  ],
  [
    'competent',
    ['adjective', 'competent', '/ˈkɒm.pɪ.tənt/', 'có năng lực, đủ trình độ'],
    ['noun', 'competence / competency', '/ˈkɒm.pɪ.təns/', 'năng lực chuyên môn'],
    ['adverb', 'competently', '/ˈkɒm.pɪ.tənt.li/', 'một cách thành thạo'],
  ],
  [
    'appraise',
    ['verb', 'appraise', '/əˈpreɪz/', 'đánh giá hiệu suất, định giá'],
    ['noun', 'appraisal', '/əˈpreɪ.zəl/', 'bài đánh giá năng lực'],
    ['adjective', 'appraisable', '/əˈpreɪ.zə.bəl/', 'có thể đánh giá được'],
  ],
  [
    'incentive',
    ['noun', 'incentive', '/ɪnˈsen.tɪv/', 'động lực, chính sách khích lệ'],
    ['verb', 'incentivize', '/ɪnˈsen.tɪ.vaɪz/', 'tạo động lực, khuyến khích'],
  ],
  [
    'recruit',
    ['verb', 'recruit', '/rɪˈkruːt/', 'tuyển dụng'],
    ['noun', 'recruitment / recruiter', '/rɪˈkruːt.mənt/', 'việc tuyển dụng / nhà tuyển dụng'],
  ],
  [
    'promotion',
    ['noun', 'promotion', '/prəˈməʊ.ʃən/', 'sự thăng chức; quảng bá'],
    ['verb', 'promote', '/prəˈməʊt/', 'thăng chức; thúc đẩy, quảng bá'],
    ['adjective', 'promotional', '/prəˈməʊ.ʃən.əl/', 'thuộc về quảng bá'],
  ],
  [
    'mentor',
    ['noun', 'mentor / mentorship', '/ˈmen.tɔːr/', 'người cố vấn / sự dìu dắt'],
    ['verb', 'mentor', '/ˈmen.tɔːr/', 'cố vấn, hướng dẫn nghề nghiệp'],
  ],
  [
    'feasible',
    ['adjective', 'feasible', '/ˈfiː.zə.bəl/', 'khả thi, làm được'],
    ['noun', 'feasibility', '/ˌfiː.zəˈbɪl.ə.ti/', 'tính khả thi'],
    ['adverb', 'feasibly', '/ˈfiː.zə.bli/', 'một cách khả thi'],
  ],
  [
    'prioritize',
    ['verb', 'prioritize', '/praɪˈɒr.ɪ.taɪz/', 'ưu tiên xử lý trước'],
    ['noun', 'priority / prioritization', '/praɪˈɒr.ə.ti/', 'sự ưu tiên, đầu việc ưu tiên'],
    ['adjective', 'prior', '/ˈpraɪ.ər/', 'trước đó, ưu tiên trước'],
  ],
  [
    'supervise',
    ['verb', 'supervise', '/ˈsuː.pə.vaɪz/', 'giám sát, quản lý trực tiếp'],
    ['noun', 'supervision / supervisor', '/ˌsuː.pəˈvɪʒ.ən/', 'sự giám sát / người giám sát'],
    ['adjective', 'supervisory', '/ˌsuː.pəˈvaɪ.zər.i/', 'thuộc về giám sát'],
  ],
  [
    'allocate',
    ['verb', 'allocate', '/ˈæl.ə.keɪt/', 'phân bổ (ngân sách, thời gian)'],
    ['noun', 'allocation', '/ˌæl.əˈkeɪ.ʃən/', 'sự phân bổ, khoản phân chia'],
  ],
  [
    'productive',
    ['adjective', 'productive', '/prəˈdʌk.tɪv/', 'năng suất, hiệu quả cao'],
    ['noun', 'productivity / production', '/ˌprɒd.ʌkˈtɪv.ə.ti/', 'năng suất lao động / sản xuất'],
    ['verb', 'produce', '/prəˈdʒuːs/', 'tạo ra, sản xuất'],
    ['adverb', 'productively', '/prəˈdʌk.tɪv.li/', 'một cách năng suất'],
  ],
  [
    'punctual',
    ['adjective', 'punctual', '/ˈpʌŋk.tʃu.əl/', 'đúng giờ'],
    ['noun', 'punctuality', '/ˌpʌŋk.tʃuˈæl.ə.ti/', 'tính đúng giờ'],
    ['adverb', 'punctually', '/ˈpʌŋk.tʃu.ə.li/', 'một cách đúng giờ'],
  ],
  [
    'redundant',
    ['adjective', 'redundant', '/rɪˈdʌn.dənt/', 'dư thừa; bị cho nghỉ vì thừa biên chế'],
    ['noun', 'redundancy', '/rɪˈdʌn.dən.si/', 'sự dư thừa, cắt giảm nhân sự'],
    ['adverb', 'redundantly', '/rɪˈdʌn.dənt.li/', 'một cách dư thừa'],
  ],
  [
    'proficient',
    ['adjective', 'proficient', '/prəˈfɪʃ.ənt/', 'thành thạo, giỏi giang'],
    ['noun', 'proficiency', '/prəˈfɪʃ.ən.si/', 'trình độ thành thạo'],
    ['adverb', 'proficiently', '/prəˈfɪʃ.ənt.li/', 'một cách thành thạo'],
  ],
  [
    'versatile',
    ['adjective', 'versatile', '/ˈvɜː.sə.taɪl/', 'đa năng, linh hoạt nhiều vai trò'],
    ['noun', 'versatility', '/ˌvɜː.səˈtɪl.ə.ti/', 'tính đa năng, linh hoạt'],
  ],
  [
    'amicable',
    ['adjective', 'amicable', '/ˈæm.ɪ.kə.bəl/', 'hòa nhã, thân thiện, êm đẹp'],
    ['adverb', 'amicably', '/ˈæm.ɪ.kə.bli/', 'một cách hòa giải êm đẹp'],
  ],
  [
    'diligently',
    ['adverb', 'diligently', '/ˈdɪl.ɪ.dʒənt.li/', 'một cách chăm chỉ, cần mẫn'],
    ['adjective', 'diligent', '/ˈdɪl.ɪ.dʒənt/', 'siêng năng, tỉ mỉ'],
    ['noun', 'diligence', '/ˈdɪl.ɪ.dʒəns/', 'sự cần cù, chuyên cần'],
  ],
  [
    'efficiently',
    ['adverb', 'efficiently', '/ɪˈfɪʃ.ənt.li/', 'một cách hiệu quả'],
    ['adjective', 'efficient', '/ɪˈfɪʃ.ənt/', 'hiệu quả, ít lãng phí'],
    ['noun', 'efficiency', '/ɪˈfɪʃ.ən.si/', 'hiệu suất, tính hiệu quả'],
  ],

  // Technology & Digital
  [
    'innovate',
    ['verb', 'innovate', '/ˈɪn.ə.veɪt/', 'đổi mới, sáng tạo cái mới'],
    ['noun', 'innovation / innovator', '/ˌɪn.əˈveɪ.ʃən/', 'sự đổi mới / người tiên phong'],
    ['adjective', 'innovative', '/ˈɪn.ə.və.tɪv/', 'mang tính đột phá, sáng tạo'],
    ['adverb', 'innovatively', '/ˈɪn.ə.və.tɪv.li/', 'một cách sáng tạo mới mẻ'],
  ],
  [
    'compatible',
    ['adjective', 'compatible', '/kəmˈpæt.ə.bəl/', 'tương thích, hòa hợp'],
    ['noun', 'compatibility', '/kəmˌpæt.əˈbɪl.ə.ti/', 'tính tương thích'],
  ],
  [
    'encrypt',
    ['verb', 'encrypt', '/ɪnˈkrɪpt/', 'mã hóa dữ liệu'],
    ['noun', 'encryption', '/ɪnˈkrɪp.ʃən/', 'cơ chế mã hóa'],
    ['adjective', 'encrypted', '/ɪnˈkrɪp.tɪd/', 'đã được mã hóa'],
  ],
  [
    'vulnerable',
    ['adjective', 'vulnerable', '/ˈvʌl.nər.ə.bəl/', 'dễ bị tổn thương / tấn công'],
    ['noun', 'vulnerability', '/ˌvʌl.nər.əˈbɪl.ə.ti/', 'lỗ hổng, điểm dễ tổn thương'],
    ['adverb', 'vulnerably', '/ˈvʌl.nər.ə.bli/', 'một cách dễ tổn thương'],
  ],
  [
    'simulate',
    ['verb', 'simulate', '/ˈsɪm.jʊ.leɪt/', 'mô phỏng'],
    ['noun', 'simulation / simulator', '/ˌsɪm.jʊˈleɪ.ʃən/', 'bài mô phỏng / thiết bị mô phỏng'],
    ['adjective', 'simulated', '/ˈsɪm.jʊ.leɪ.tɪd/', 'được giả lập, mô phỏng'],
  ],
  [
    'calibrate',
    ['verb', 'calibrate', '/ˈkæl.ɪ.breɪt/', 'hiệu chỉnh, cân chỉnh chính xác'],
    ['noun', 'calibration', '/ˌkæl.ɪˈbreɪ.ʃən/', 'sự hiệu chỉnh thông số'],
  ],
  [
    'autonomous',
    ['adjective', 'autonomous', '/ɔːˈtɒn.ə.məs/', 'tự hành, tự chủ'],
    ['noun', 'autonomy', '/ɔːˈtɒn.ə.mi/', 'quyền tự chủ, tính tự hành'],
    ['adverb', 'autonomously', '/ɔːˈtɒn.ə.məs.li/', 'một cách tự chủ'],
  ],
  [
    'integrate',
    ['verb', 'integrate', '/ˈɪn.tɪ.ɡreɪt/', 'tích hợp, hội nhập'],
    ['noun', 'integration', '/ˌɪn.tɪˈɡreɪ.ʃən/', 'sự tích hợp, hòa nhập'],
    ['adjective', 'integrated', '/ˈɪn.tɪ.ɡreɪ.tɪd/', 'được tích hợp đồng bộ'],
  ],
  [
    'scalable',
    ['adjective', 'scalable', '/ˈskeɪ.lə.bəl/', 'có khả năng mở rộng quy mô'],
    ['noun', 'scalability', '/ˌskeɪ.ləˈbɪl.ə.ti/', 'khả năng mở rộng quy mô'],
    ['verb', 'scale', '/skeɪl/', 'mở rộng quy mô'],
  ],
  [
    'synchronize',
    ['verb', 'synchronize', '/ˈsɪŋ.krə.naɪz/', 'đồng bộ hóa'],
    ['noun', 'synchronization', '/ˌsɪŋ.krə.naɪˈzeɪ.ʃən/', 'sự đồng bộ hóa'],
    ['adjective', 'synchronous', '/ˈsɪŋ.krə.nəs/', 'đồng bộ, cùng lúc'],
  ],
  [
    'sophisticated',
    ['adjective', 'sophisticated', '/səˈfɪs.tɪ.keɪ.tɪd/', 'tinh vi, phức tạp, sành điệu'],
    ['noun', 'sophistication', '/səˌfɪs.tɪˈkeɪ.ʃən/', 'độ tinh xảo, sự tinh tế'],
  ],
  [
    'disruptive',
    ['adjective', 'disruptive', '/dɪsˈrʌp.tɪv/', 'mang tính đột phá đảo lộn thị trường; gây rối'],
    ['verb', 'disrupt', '/dɪsˈrʌpt/', 'làm gián đoạn, phá vỡ trật tự cũ'],
    ['noun', 'disruption', '/dɪsˈrʌp.ʃən/', 'sự gián đoạn, xáo trộn'],
  ],
  [
    'seamlessly',
    ['adverb', 'seamlessly', '/ˈsiːm.ləs.li/', 'một cách liền mạch, trơn tru'],
    ['adjective', 'seamless', '/ˈsiːm.ləs/', 'liền mạch, không khựng'],
  ],
  [
    'wirelessly',
    ['adverb', 'wirelessly', '/ˈwaɪə.ləs.li/', 'qua kết nối không dây'],
    ['adjective', 'wireless', '/ˈwaɪə.ləs/', 'không dây'],
  ],

  // Education & Learning
  [
    'comprehend',
    ['verb', 'comprehend', '/ˌkɒm.prɪˈhend/', 'hiểu thấu đáo'],
    ['noun', 'comprehension', '/ˌkɒm.prɪˈhen.ʃən/', 'khả năng đọc/nghe hiểu'],
    ['adjective', 'comprehensive', '/ˌkɒm.prɪˈhen.sɪv/', 'toàn diện, bao quát'],
    ['adverb', 'comprehensively', '/ˌkɒm.prɪˈhen.sɪv.li/', 'một cách toàn diện'],
  ],
  [
    'acquire',
    ['verb', 'acquire', '/əˈkwaɪər/', 'tiếp thu, đạt được (kiến thức/kỹ năng)'],
    ['noun', 'acquisition', '/ˌæk.wɪˈzɪʃ.ən/', 'sự tiếp thu, thâu tóm'],
  ],
  [
    'discipline',
    ['noun', 'discipline', '/ˈdɪs.ə.plɪn/', 'tính kỷ luật; ngành học'],
    ['verb', 'discipline', '/ˈdɪs.ə.plɪn/', 'rèn kỷ luật, xử lý kỷ luật'],
    ['adjective', 'disciplined', '/ˈdɪs.ə.plɪnd/', 'có tính kỷ luật cao'],
  ],
  [
    'fluent',
    ['adjective', 'fluent', '/ˈfluː.ənt/', 'trôi chảy, lưu loát'],
    ['noun', 'fluency', '/ˈfluː.ən.si/', 'sự lưu loát'],
    ['adverb', 'fluently', '/ˈfluː.ənt.li/', 'một cách trôi chảy'],
  ],
  [
    'literacy',
    ['noun', 'literacy', '/ˈlɪt.ər.ə.si/', 'năng lực đọc viết / am hiểu lĩnh vực'],
    ['adjective', 'literate', '/ˈlɪt.ər.ət/', 'biết đọc viết, am hiểu'],
  ],
  [
    'memorize',
    ['verb', 'memorize', '/ˈmem.ə.raɪz/', 'ghi nhớ, học thuộc'],
    ['noun', 'memorization / memory', '/ˌmem.ə.raɪˈzeɪ.ʃən/', 'việc ghi nhớ / trí nhớ'],
    ['adjective', 'memorable', '/ˈmem.ər.ə.bəl/', 'đáng nhớ'],
  ],
  [
    'evaluate',
    ['verb', 'evaluate', '/ɪˈvæl.ju.eɪt/', 'đánh giá giá trị, thẩm định'],
    ['noun', 'evaluation', '/ɪˌvæl.juˈeɪ.ʃən/', 'bài/quá trình đánh giá'],
    ['adjective', 'evaluative', '/ɪˈvæl.ju.ə.tɪv/', 'mang tính đánh giá'],
  ],
  [
    'analytical',
    ['adjective', 'analytical', '/ˌæn.əˈlɪt.ɪ.kəl/', 'có tư duy phân tích'],
    ['verb', 'analyze', '/ˈæn.əl.aɪz/', 'phân tích'],
    ['noun', 'analysis / analyst', '/əˈnæl.ə.sɪs/', 'bản phân tích / nhà phân tích'],
    ['adverb', 'analytically', '/ˌæn.əˈlɪt.ɪ.kli/', 'theo hướng phân tích'],
  ],
  [
    'procrastinate',
    ['verb', 'procrastinate', '/prəˈkræs.tɪ.neɪt/', 'trì hoãn, lần lữa'],
    ['noun', 'procrastination', '/prəˌkræs.tɪˈneɪ.ʃən/', 'thói quen trì hoãn'],
  ],
  [
    'attentive',
    ['adjective', 'attentive', '/əˈten.tɪv/', 'chú tâm, chăm chú lắng nghe'],
    ['noun', 'attention', '/əˈten.ʃən/', 'sự chú ý'],
    ['verb', 'attend', '/əˈtend/', 'tham dự; chú tâm vào'],
    ['adverb', 'attentively', '/əˈten.tɪv.li/', 'một cách chăm chú'],
  ],
  [
    'inquisitive',
    ['adjective', 'inquisitive', '/ɪnˈkwɪz.ə.tɪv/', 'ham học hỏi, tò mò khám phá'],
    ['verb', 'inquire', '/ɪnˈkwaɪər/', 'hỏi thăm, điều tra'],
    ['noun', 'inquiry', '/ɪnˈkwaɪə.ri/', 'câu hỏi tìm hiểu, cuộc điều tra'],
  ],
  [
    'synthesize',
    ['verb', 'synthesize', '/ˈsɪn.θə.saɪz/', 'tổng hợp lại nhiều nguồn'],
    ['noun', 'synthesis', '/ˈsɪn.θə.sɪs/', 'sự tổng hợp'],
    ['adjective', 'synthetic', '/sɪnˈθet.ɪk/', 'tổng hợp, nhân tạo'],
  ],
  [
    'clarify',
    ['verb', 'clarify', '/ˈklær.ɪ.faɪ/', 'làm rõ, giải thích sáng tỏ'],
    ['noun', 'clarification / clarity', '/ˌklær.ɪ.fɪˈkeɪ.ʃən/', 'sự làm rõ / độ rõ ràng'],
  ],
  [
    'thoroughly',
    ['adverb', 'thoroughly', '/ˈθʌr.ə.li/', 'một cách kỹ lưỡng, triệt để'],
    ['adjective', 'thorough', '/ˈθʌr.ə/', 'kỹ lưỡng, chu đáo'],
    ['noun', 'thoroughness', '/ˈθʌr.ə.nəs/', 'sự tỉ mỉ, thấu đáo'],
  ],
  [
    'gradually',
    ['adverb', 'gradually', '/ˈɡrædʒ.u.ə.li/', 'dần dần, từng bước'],
    ['adjective', 'gradual', '/ˈɡrædʒ.u.əl/', 'từ từ, dần dần'],
  ],

  // Environment & Sustainability
  [
    'conserve',
    ['verb', 'conserve', '/kənˈsɜːv/', 'bảo tồn, tiết kiệm tài nguyên'],
    ['noun', 'conservation', '/ˌkɒn.səˈveɪ.ʃən/', 'công tác bảo tồn'],
    ['adjective', 'conservative', '/kənˈsɜː.və.tɪv/', 'thận trọng; bảo thủ'],
  ],
  [
    'contaminate',
    ['verb', 'contaminate', '/kənˈtæm.ɪ.neɪt/', 'làm ô nhiễm, nhiễm bẩn'],
    ['noun', 'contamination', '/kənˌtæm.ɪˈneɪ.ʃən/', 'sự ô nhiễm, nhiễm độc'],
    ['adjective', 'contaminated', '/kənˈtæm.ɪ.neɪ.tɪd/', 'bị ô nhiễm'],
  ],
  [
    'deforestation',
    ['noun', 'deforestation', '/diːˌfɒr.ɪˈsteɪ.ʃən/', 'nạn phá rừng'],
    ['verb', 'deforest', '/ˌdiːˈfɒr.ɪst/', 'chặt phá rừng'],
    ['noun', 'forest / forestry', '/ˈfɒr.ɪst/', 'rừng / lâm nghiệp'],
  ],
  [
    'endangered',
    ['adjective', 'endangered', '/ɪnˈdeɪn.dʒəd/', 'có nguy cơ tuyệt chủng'],
    ['verb', 'endanger', '/ɪnˈdeɪn.dʒər/', 'gây nguy hiểm cho'],
    ['noun', 'danger', '/ˈdeɪn.dʒər/', 'mối nguy hiểm'],
  ],
  [
    'extinction',
    ['noun', 'extinction', '/ɪkˈstɪŋk.ʃən/', 'sự tuyệt chủng'],
    ['adjective', 'extinct', '/ɪkˈstɪŋkt/', 'đã tuyệt chủng'],
  ],
  [
    'biodegradable',
    ['adjective', 'biodegradable', '/ˌbaɪ.əʊ.dɪˈɡreɪ.də.bəl/', 'có khả năng phân hủy sinh học'],
    ['verb', 'biodegrade', '/ˌbaɪ.əʊ.dɪˈɡreɪd/', 'phân hủy tự nhiên'],
  ],
  [
    'scarcity',
    ['noun', 'scarcity', '/ˈskeə.sə.ti/', 'sự khan hiếm'],
    ['adjective', 'scarce', '/skeəs/', 'khan hiếm, ít ỏi'],
    ['adverb', 'scarcely', '/ˈskeəs.li/', 'hầu như không'],
  ],
  [
    'preserve',
    ['verb', 'preserve', '/prɪˈzɜːv/', 'gìn giữ, bảo quản'],
    ['noun', 'preservation', '/ˌprez.əˈveɪ.ʃən/', 'sự bảo tồn, gìn giữ'],
    ['adjective', 'preservative', '/prɪˈzɜː.və.tɪv/', 'dùng để bảo quản'],
  ],
  [
    'ecological',
    ['adjective', 'ecological', '/ˌiː.kəˈlɒdʒ.ɪ.kəl/', 'thuộc về sinh thái học'],
    ['noun', 'ecology', '/iˈkɒl.ə.dʒi/', 'hệ sinh thái học'],
    ['adverb', 'ecologically', '/ˌiː.kəˈlɒdʒ.ɪ.kli/', 'về mặt sinh thái'],
  ],
  [
    'reusable',
    ['adjective', 'reusable', '/ˌriːˈjuː.zə.bəl/', 'tái sử dụng được nhiều lần'],
    ['verb', 'reuse', '/ˌriːˈjuːz/', 'tái sử dụng'],
    ['noun', 'reuse', '/ˌriːˈjuːs/', 'việc tái sử dụng'],
  ],
  [
    'hazardous',
    ['adjective', 'hazardous', '/ˈhæz.ə.dəs/', 'nguy hại, độc hại'],
    ['noun', 'hazard', '/ˈhæz.əd/', 'mối nguy hại'],
  ],
  [
    'consume',
    ['verb', 'consume', '/kənˈsjuːm/', 'tiêu thụ, tiêu dùng'],
    ['noun', 'consumption / consumer', '/kənˈsʌmp.ʃən/', 'lượng tiêu thụ / người tiêu dùng'],
  ],
  [
    'disposable',
    ['adjective', 'disposable', '/dɪˈspəʊ.zə.bəl/', 'dùng một lần rồi bỏ; khả dụng'],
    ['verb', 'dispose (of)', '/dɪˈspəʊz/', 'vứt bỏ, xử lý'],
    ['noun', 'disposal', '/dɪˈspəʊ.zəl/', 'sự vứt bỏ, xử lý rác'],
  ],
  [
    'environmentally',
    ['adverb', 'environmentally', '/ɪnˌvaɪ.rənˈmen.təl.i/', 'xét về mặt môi trường'],
    ['adjective', 'environmental', '/ɪnˌvaɪ.rənˈmen.təl/', 'thuộc về môi trường'],
    ['noun', 'environment', '/ɪnˈvaɪ.rən.mənt/', 'môi trường'],
  ],
  [
    'drastically',
    ['adverb', 'drastically', '/ˈdræs.tɪ.kli/', 'một cách quyết liệt, mạnh mẽ'],
    ['adjective', 'drastic', '/ˈdræs.tɪk/', 'mạnh mẽ, triệt để'],
  ],

  // Health & Wellbeing
  [
    'nutritious',
    ['adjective', 'nutritious', '/njuːˈtrɪʃ.əs/', 'giàu dinh dưỡng'],
    ['noun', 'nutrition / nutrient', '/njuːˈtrɪʃ.ən/', 'dinh dưỡng / chất dinh dưỡng'],
    ['adverb', 'nutritiously', '/njuːˈtrɪʃ.əs.li/', 'một cách bổ dưỡng'],
  ],
  [
    'immune',
    ['adjective', 'immune', '/ɪˈmjuːn/', 'miễn dịch; miễn nhiễm'],
    ['noun', 'immunity', '/ɪˈmjuː.nə.ti/', 'khả năng miễn dịch'],
    ['verb', 'immunize', '/ˈɪm.jʊ.naɪz/', 'tiêm chủng gây miễn dịch'],
  ],
  [
    'preventive',
    ['adjective', 'preventive', '/prɪˈven.tɪv/', 'mang tính phòng ngừa'],
    ['verb', 'prevent', '/prɪˈvent/', 'ngăn ngừa, phòng tránh'],
    ['noun', 'prevention', '/prɪˈven.ʃən/', 'sự phòng ngừa'],
  ],
  [
    'hydrate',
    ['verb', 'hydrate', '/haɪˈdreɪt/', 'cấp nước cho cơ thể'],
    ['noun', 'hydration', '/haɪˈdreɪ.ʃən/', 'trạng thái đủ nước'],
    ['adjective', 'hydrated', '/ˈhaɪ.dreɪ.tɪd/', 'được cấp đủ nước'],
  ],
  [
    'therapeutic',
    ['adjective', 'therapeutic', '/ˌθer.əˈpjuː.tɪk/', 'có tác dụng trị liệu, thư giãn'],
    ['noun', 'therapy / therapist', '/ˈθer.ə.pi/', 'liệu pháp / chuyên gia trị liệu'],
  ],
  [
    'moderate',
    ['adjective', 'moderate', '/ˈmɒd.ər.ət/', 'vừa phải, điều độ'],
    ['noun', 'moderation', '/ˌmɒd.əˈreɪ.ʃən/', 'sự điều độ, tiết chế'],
    ['verb', 'moderate', '/ˈmɒd.ə.reɪt/', 'điều phối; giảm bớt mức độ'],
    ['adverb', 'moderately', '/ˈmɒd.ər.ət.li/', 'ở mức độ vừa phải'],
  ],
  [
    'alleviate',
    ['verb', 'alleviate', '/əˈliː.vi.eɪt/', 'làm dịu bớt, giảm nhẹ cơn đau/căng thẳng'],
    ['noun', 'alleviation', '/əˌliː.viˈeɪ.ʃən/', 'sự giảm nhẹ'],
  ],
  [
    'mindfully',
    ['adverb', 'mindfully', '/ˈmaɪnd.fəl.i/', 'một cách chánh niệm, tỉnh thức'],
    ['adjective', 'mindful', '/ˈmaɪnd.fəl/', 'chú tâm, lưu tâm'],
    ['noun', 'mindfulness', '/ˈmaɪnd.fəl.nəs/', 'sự tỉnh thức, chánh niệm'],
  ],
  [
    'consistently',
    ['adverb', 'consistently', '/kənˈsɪs.tənt.li/', 'một cách đều đặn, nhất quán'],
    ['adjective', 'consistent', '/kənˈsɪs.tənt/', 'nhất quán, kiên trì'],
    ['noun', 'consistency', '/kənˈsɪs.tən.si/', 'tính nhất quán, sự đều đặn'],
  ],
  [
    'recover',
    ['verb', 'recover', '/rɪˈkʌv.ər/', 'hồi phục, lấy lại'],
    ['noun', 'recovery', '/rɪˈkʌv.ər.i/', 'sự phục hồi'],
  ],
  [
    'exhaustion',
    ['noun', 'exhaustion', '/ɪɡˈzɔːs.tʃən/', 'sự kiệt sức'],
    ['verb', 'exhaust', '/ɪɡˈzɔːst/', 'làm cạn kiệt sức lực'],
    ['adjective', 'exhausting / exhausted', '/ɪɡˈzɔː.stɪŋ/', 'gây kiệt sức / kiệt quệ'],
  ],
  [
    'overwhelming',
    ['adjective', 'overwhelming', '/ˌəʊ.vəˈwel.mɪŋ/', 'choáng ngợp, quá tải'],
    ['verb', 'overwhelm', '/ˌəʊ.vəˈwelm/', 'áp đảo, làm choáng ngợp'],
    ['adverb', 'overwhelmingly', '/ˌəʊ.vəˈwel.mɪŋ.li/', 'một cách áp đảo'],
  ],
  [
    'refreshing',
    ['adjective', 'refreshing', '/rɪˈfreʃ.ɪŋ/', 'tươi mới, sảng khoái'],
    ['verb', 'refresh', '/rɪˈfreʃ/', 'làm mới lại, giúp tỉnh táo'],
    ['noun', 'refreshment', '/rɪˈfreʃ.mənt/', 'sự nghỉ ngơi hồi sức / đồ ăn nhẹ'],
  ],

  // Culture & Travel
  [
    'tradition',
    ['noun', 'tradition', '/trəˈdɪʃ.ən/', 'truyền thống'],
    ['adjective', 'traditional', '/trəˈdɪʃ.ən.əl/', 'mang tính truyền thống'],
    ['adverb', 'traditionally', '/trəˈdɪʃ.ən.əl.i/', 'theo truyền thống'],
  ],
  [
    'customary',
    ['adjective', 'customary', '/ˈkʌs.tə.mər.i/', 'theo phong tục thông lệ'],
    ['noun', 'custom', '/ˈkʌs.təm/', 'phong tục, tập quán'],
    ['adverb', 'customarily', '/ˈkʌs.tə.mər.əl.i/', 'theo thông lệ thường thấy'],
  ],
  [
    'destination',
    ['noun', 'destination', '/ˌdes.tɪˈneɪ.ʃən/', 'điểm đến'],
    ['adjective', 'destined', '/ˈdes.tɪnd/', 'được định sẵn, hướng tới'],
  ],
  [
    'accommodation',
    ['noun', 'accommodation', '/əˌkɒm.əˈdeɪ.ʃən/', 'chỗ ở, lưu trú'],
    ['verb', 'accommodate', '/əˈkɒm.ə.deɪt/', 'cung cấp chỗ ở; đáp ứng nhu cầu'],
    ['adjective', 'accommodating', '/əˈkɒm.ə.deɪ.tɪŋ/', 'sẵn lòng hỗ trợ, chiều khách'],
  ],
  [
    'scenic',
    ['adjective', 'scenic', '/ˈsiː.nɪk/', 'có phong cảnh đẹp'],
    ['noun', 'scene / scenery', '/siːn/', 'khung cảnh / phong cảnh thiên nhiên'],
  ],
  [
    'tranquil',
    ['adjective', 'tranquil', '/ˈtræŋ.kwɪl/', 'yên bình, tĩnh lặng'],
    ['noun', 'tranquility', '/træŋˈkwɪl.ə.ti/', 'sự yên tĩnh thanh bình'],
    ['adverb', 'tranquilly', '/ˈtræŋ.kwɪl.li/', 'một cách yên bình'],
  ],
  [
    'commemorate',
    ['verb', 'commemorate', '/kəˈmem.ə.reɪt/', 'tưởng nhớ, kỷ niệm'],
    ['noun', 'commemoration', '/kəˌmem.əˈreɪ.ʃən/', 'lễ kỷ niệm'],
    ['adjective', 'commemorative', '/kəˈmem.ər.ə.tɪv/', 'mang tính kỷ niệm'],
  ],
  [
    'navigate',
    ['verb', 'navigate', '/ˈnæv.ɪ.ɡeɪt/', 'định hướng, điều hướng'],
    ['noun', 'navigation', '/ˌnæv.ɪˈɡeɪ.ʃən/', 'sự điều hướng, dẫn đường'],
    ['adjective', 'navigable', '/ˈnæv.ɪ.ɡə.bəl/', 'có thể đi lại/điều hướng qua'],
  ],
  [
    'explore',
    ['verb', 'explore', '/ɪkˈsplɔːr/', 'khám phá, thám hiểm'],
    ['noun', 'exploration / explorer', '/ˌek.spləˈreɪ.ʃən/', 'cuộc thám hiểm / người khám phá'],
    ['adjective', 'exploratory', '/ɪkˈsplɒr.ə.tər.i/', 'mang tính thăm dò, khám phá'],
  ],
  [
    'temporarily',
    ['adverb', 'temporarily', '/ˈtem.pər.ər.əl.i/', 'một cách tạm thời'],
    ['adjective', 'temporary', '/ˈtem.pər.ər.i/', 'tạm thời, nhất thời'],
  ],
  [
    'courteously',
    ['adverb', 'courteously', '/ˈkɜː.ti.əs.li/', 'một cách lịch thiệp, nhã nhặn'],
    ['adjective', 'courteous', '/ˈkɜː.ti.əs/', 'lịch sự, nhã nhặn'],
    ['noun', 'courtesy', '/ˈkɜː.tə.si/', 'phép lịch sự'],
  ],

  // Society & Communication
  [
    'empathy',
    ['noun', 'empathy', '/ˈem.pə.θi/', 'sự thấu cảm'],
    ['adjective', 'empathetic', '/ˌem.pəˈθet.ɪk/', 'biết đồng cảm, thấu hiểu'],
    ['verb', 'empathize', '/ˈem.pə.θaɪz/', 'đồng cảm với'],
  ],
  [
    'debate',
    ['noun', 'debate', '/dɪˈbeɪt/', 'cuộc tranh luận'],
    ['verb', 'debate', '/dɪˈbeɪt/', 'tranh luận, cân nhắc'],
    ['adjective', 'debatable', '/dɪˈbeɪ.tə.bəl/', 'còn gây tranh cãi, chưa ngã ngũ'],
  ],
  [
    'argument',
    ['noun', 'argument', '/ˈɑːɡ.jə.mənt/', 'lập luận; cuộc tranh cãi'],
    ['verb', 'argue', '/ˈɑːɡ.juː/', 'lập luận, tranh luận'],
    ['adjective', 'argumentative', '/ˌɑːɡ.jəˈmen.tə.tɪv/', 'hay tranh cãi; mang tính nghị luận'],
  ],
  [
    'controversial',
    ['adjective', 'controversial', '/ˌkɒn.trəˈvɜː.ʃəl/', 'gây nhiều tranh cãi'],
    ['noun', 'controversy', '/ˈkɒn.trə.vɜː.si/', 'cuộc tranh luận gay gắt'],
    ['adverb', 'controversially', '/ˌkɒn.trəˈvɜː.ʃəl.i/', 'một cách gây tranh cãi'],
  ],
  [
    'diplomatic',
    ['adjective', 'diplomatic', '/ˌdɪp.ləˈmæt.ɪk/', 'khéo léo, thuộc ngoại giao'],
    ['noun', 'diplomacy / diplomat', '/dɪˈpləʊ.mə.si/', 'ngoại giao / nhà ngoại giao'],
    ['adverb', 'diplomatically', '/ˌdɪp.ləˈmæt.ɪ.kli/', 'một cách khéo léo'],
  ],
  [
    'ambiguous',
    ['adjective', 'ambiguous', '/æmˈbɪɡ.ju.əs/', 'mơ hồ, hiểu nhiều nghĩa'],
    ['noun', 'ambiguity', '/ˌæm.bɪˈɡjuː.ə.ti/', 'sự mơ hồ, nước đôi'],
    ['adverb', 'ambiguously', '/æmˈbɪɡ.ju.əs.li/', 'một cách mập mờ'],
  ],
  [
    'coherent',
    ['adjective', 'coherent', '/kəʊˈhɪə.rənt/', 'mạch lạc, logic gắn kết'],
    ['noun', 'coherence', '/kəʊˈhɪə.rəns/', 'tính mạch lạc'],
    ['adverb', 'coherently', '/kəʊˈhɪə.rənt.li/', 'một cách mạch lạc'],
  ],
  [
    'concise',
    ['adjective', 'concise', '/kənˈsaɪs/', 'ngắn gọn, súc tích'],
    ['adverb', 'concisely', '/kənˈsaɪs.li/', 'một cách súc tích'],
    ['noun', 'conciseness', '/kənˈsaɪs.nəs/', 'tính cô đọng súc tích'],
  ],
  [
    'inclusive',
    ['adjective', 'inclusive', '/ɪnˈkluː.sɪv/', 'bao trùm, hòa nhập, không phân biệt'],
    ['verb', 'include', '/ɪnˈkluːd/', 'bao gồm'],
    ['noun', 'inclusion', '/ɪnˈkluː.ʒən/', 'sự hòa nhập, bao gồm'],
  ],
  [
    'volunteer',
    ['noun', 'volunteer', '/ˌvɒl.ənˈtɪər/', 'tình nguyện viên'],
    ['verb', 'volunteer', '/ˌvɒl.ənˈtɪər/', 'tình nguyện làm gì'],
    ['adjective', 'voluntary', '/ˈvɒl.ən.tər.i/', 'tự nguyện'],
    ['adverb', 'voluntarily', '/ˈvɒl.ən.tər.əl.i/', 'một cách tự nguyện'],
  ],
  [
    'mutual',
    ['adjective', 'mutual', '/ˈmjuː.tʃu.əl/', 'lẫn nhau, song phương'],
    ['adverb', 'mutually', '/ˈmjuː.tʃu.ə.li/', 'lẫn nhau, qua lại'],
  ],
  [
    'acknowledge',
    ['verb', 'acknowledge', '/əkˈnɒl.ɪdʒ/', 'công nhận, thừa nhận; xác nhận đã nhận'],
    ['noun', 'acknowledgement', '/əkˈnɒl.ɪdʒ.mənt/', 'sự thừa nhận, lời cảm ơn'],
  ],
  [
    'eloquent',
    ['adjective', 'eloquent', '/ˈel.ə.kwənt/', 'hùng biện, diễn đạt truyền cảm'],
    ['noun', 'eloquence', '/ˈel.ə.kwəns/', 'tài hùng biện'],
    ['adverb', 'eloquently', '/ˈel.ə.kwənt.li/', 'một cách đầy sức thuyết phục'],
  ],
  [
    'frankly',
    ['adverb', 'frankly', '/ˈfræŋ.kli/', 'thẳng thắn mà nói'],
    ['adjective', 'frank', '/fræŋk/', 'thẳng thắn, bộc trực'],
  ],
  [
    'objectively',
    ['adverb', 'objectively', '/əbˈdʒek.tɪv.li/', 'một cách khách quan'],
    ['adjective', 'objective', '/əbˈdʒek.tɪv/', 'khách quan'],
    ['noun', 'objectivity / objective', '/ˌɒb.dʒekˈtɪv.ə.ti/', 'tính khách quan / mục tiêu'],
  ],

  // Business & Economics
  [
    'profitable',
    ['adjective', 'profitable', '/ˈprɒf.ɪ.tə.bəl/', 'sinh lời, có lãi'],
    ['noun', 'profit / profitability', '/ˈprɒf.ɪt/', 'lợi nhuận / khả năng sinh lời'],
    ['verb', 'profit', '/ˈprɒf.ɪt/', 'thu lợi từ'],
    ['adverb', 'profitably', '/ˈprɒf.ɪ.tə.bli/', 'một cách sinh lợi'],
  ],
  [
    'inflation',
    ['noun', 'inflation', '/ɪnˈfleɪ.ʃən/', 'lạm phát'],
    ['verb', 'inflate', '/ɪnˈfleɪt/', 'thổi phồng, làm tăng giá'],
    ['adjective', 'inflationary', '/ɪnˈfleɪ.ʃən.ər.i/', 'gây lạm phát'],
  ],
  [
    'recession',
    ['noun', 'recession', '/rɪˈseʃ.ən/', 'suy thoái kinh tế'],
    ['verb', 'recede', '/rɪˈsiːd/', 'rút lui, suy giảm'],
    ['adjective', 'recessionary', '/rɪˈseʃ.ən.ər.i/', 'thuộc giai đoạn suy thoái'],
  ],
  [
    'entrepreneur',
    ['noun', 'entrepreneur / entrepreneurship', '/ˌɒn.trə.prəˈnɜːr/', 'doanh nhân khởi nghiệp / tinh thần khởi nghiệp'],
    ['adjective', 'entrepreneurial', '/ˌɒn.trə.prəˈnɜː.ri.əl/', 'mang tinh thần khởi nghiệp'],
  ],
  [
    'invest',
    ['verb', 'invest', '/ɪnˈvest/', 'đầu tư'],
    ['noun', 'investment / investor', '/ɪnˈvest.mənt/', 'khoản đầu tư / nhà đầu tư'],
  ],
  [
    'subsidy',
    ['noun', 'subsidy', '/ˈsʌb.sɪ.di/', 'tiền trợ cấp, trợ giá'],
    ['verb', 'subsidize', '/ˈsʌb.sɪ.daɪz/', 'trợ cấp, tài trợ giá'],
  ],
  [
    'competitive',
    ['adjective', 'competitive', '/kəmˈpet.ɪ.tɪv/', 'có sức cạnh tranh cao'],
    ['verb', 'compete', '/kəmˈpiːt/', 'cạnh tranh'],
    ['noun', 'competition / competitiveness', '/ˌkɒm.pəˈtɪʃ.ən/', 'sự cạnh tranh / năng lực cạnh tranh'],
    ['adverb', 'competitively', '/kəmˈpet.ɪ.tɪv.li/', 'một cách cạnh tranh'],
  ],
  [
    'fluctuate',
    ['verb', 'fluctuate', '/ˈflʌk.tʃu.eɪt/', 'biến động lên xuống'],
    ['noun', 'fluctuation', '/ˌflʌk.tʃuˈeɪ.ʃən/', 'sự dao động, biến động'],
  ],
  [
    'transparent',
    ['adjective', 'transparent', '/trænˈspær.ənt/', 'minh bạch; trong suốt'],
    ['noun', 'transparency', '/trænˈspær.ən.si/', 'tính minh bạch'],
    ['adverb', 'transparently', '/trænˈspær.ənt.li/', 'một cách minh bạch'],
  ],
  [
    'economize',
    ['verb', 'economize', '/iˈkɒn.ə.maɪz/', 'tiết kiệm chi tiêu'],
    ['noun', 'economy / economics', '/iˈkɒn.ə.mi/', 'nền kinh tế / kinh tế học'],
    ['adjective', 'economic / economical', '/ˌiː.kəˈnɒm.ɪk/', 'thuộc kinh tế / tiết kiệm'],
    ['adverb', 'economically', '/ˌiː.kəˈnɒm.ɪ.kli/', 'về mặt kinh tế / một cách tiết kiệm'],
  ],

  // Science & Evidence
  [
    'hypothesis',
    ['noun', 'hypothesis', '/haɪˈpɒθ.ə.sɪs/', 'giả thuyết khoa học'],
    ['verb', 'hypothesize', '/haɪˈpɒθ.ə.saɪz/', 'đặt ra giả thuyết'],
    ['adjective', 'hypothetical', '/ˌhaɪ.pəˈθet.ɪ.kəl/', 'mang tính giả định'],
  ],
  [
    'empirical',
    ['adjective', 'empirical', '/ɪmˈpɪr.ɪ.kəl/', 'dựa trên thực nghiệm, quan sát'],
    ['adverb', 'empirically', '/ɪmˈpɪr.ɪ.kli/', 'bằng chứng thực nghiệm'],
  ],
  [
    'evidence',
    ['noun', 'evidence', '/ˈev.ɪ.dəns/', 'bằng chứng, chứng cứ'],
    ['adjective', 'evident', '/ˈev.ɪ.dənt/', 'hiển nhiên, rõ ràng'],
    ['adverb', 'evidently', '/ˈev.ɪ.dənt.li/', 'rõ ràng là'],
  ],
  [
    'verify',
    ['verb', 'verify', '/ˈver.ɪ.faɪ/', 'xác minh, kiểm chứng'],
    ['noun', 'verification', '/ˌver.ɪ.fɪˈkeɪ.ʃən/', 'sự xác minh'],
    ['adjective', 'verifiable', '/ˈver.ɪ.faɪ.ə.bəl/', 'có thể kiểm chứng được'],
  ],
  [
    'replicate',
    ['verb', 'replicate', '/ˈrep.lɪ.keɪt/', 'tái tạo, nhân rộng kết quả'],
    ['noun', 'replication', '/ˌrep.lɪˈkeɪ.ʃən/', 'sự sao chép / lặp lại thí nghiệm'],
    ['adjective', 'replicable', '/ˈrep.lɪ.kə.bəl/', 'có thể lặp lại được'],
  ],
  [
    'detect',
    ['verb', 'detect', '/dɪˈtekt/', 'phát hiện ra'],
    ['noun', 'detection / detector', '/dɪˈtek.ʃən/', 'sự phát hiện / máy dò'],
    ['adjective', 'detectable', '/dɪˈtek.tə.bəl/', 'có thể phát hiện'],
  ],
  [
    'valid',
    ['adjective', 'valid', '/ˈvæl.ɪd/', 'hợp lệ, có giá trị khoa học'],
    ['noun', 'validity', '/vəˈlɪd.ə.ti/', 'tính hợp lệ, độ xác thực'],
    ['verb', 'validate', '/ˈvæl.ɪ.deɪt/', 'xác nhận tính hợp lệ'],
  ],
  [
    'credible',
    ['adjective', 'credible', '/ˈkred.ə.bəl/', 'đáng tin cậy'],
    ['noun', 'credibility', '/ˌkred.əˈbɪl.ə.ti/', 'độ uy tín, đáng tin'],
    ['adverb', 'credibly', '/ˈkred.ə.bli/', 'một cách đáng tin cậy'],
  ],
  [
    'accurate',
    ['adjective', 'accurate', '/ˈæk.jər.ət/', 'chính xác'],
    ['noun', 'accuracy', '/ˈæk.jər.ə.si/', 'độ chính xác'],
    ['adverb', 'accurately', '/ˈæk.jər.ət.li/', 'một cách chính xác'],
  ],
  [
    'investigate',
    ['verb', 'investigate', '/ɪnˈves.tɪ.ɡeɪt/', 'điều tra, khảo sát'],
    ['noun', 'investigation / investigator', '/ɪnˌves.tɪˈɡeɪ.ʃən/', 'cuộc điều tra / điều tra viên'],
    ['adjective', 'investigative', '/ɪnˈves.tɪ.ɡə.tɪv/', 'mang tính điều tra'],
  ],
  [
    'conclusive',
    ['adjective', 'conclusive', '/kənˈkluː.sɪv/', 'mang tính kết luận chắc chắn'],
    ['verb', 'conclude', '/kənˈkluːd/', 'kết luận'],
    ['noun', 'conclusion', '/kənˈkluː.ʒən/', 'kết luận'],
    ['adverb', 'conclusively', '/kənˈkluː.sɪv.li/', 'một cách dứt khoát rõ ràng'],
  ],
  [
    'observe',
    ['verb', 'observe', '/əbˈzɜːv/', 'quan sát; tuân thủ'],
    ['noun', 'observation / observer', '/ˌɒb.zəˈveɪ.ʃən/', 'sự quan sát / người quan sát'],
    ['adjective', 'observant', '/əbˈzɜː.vənt/', 'tinh mắt, hay quan sát'],
  ],

  // Media, Law & Ethics
  [
    'bias',
    ['noun', 'bias', '/ˈbaɪ.əs/', 'thiên kiến, sự thiên vị'],
    ['verb', 'bias', '/ˈbaɪ.əs/', 'làm thiên lệch'],
    ['adjective', 'biased', '/ˈbaɪ.əst/', 'có định kiến, thiên vị'],
  ],
  [
    'endorse',
    ['verb', 'endorse', '/ɪnˈdɔːs/', 'tán thành; quảng bá đại diện thương hiệu'],
    ['noun', 'endorsement', '/ɪnˈdɔːs.mənt/', 'sự ủng hộ, hợp đồng đại diện'],
  ],
  [
    'anonymous',
    ['adjective', 'anonymous', '/əˈnɒn.ɪ.məs/', 'ẩn danh'],
    ['noun', 'anonymity', '/ˌæn.əˈnɪm.ə.ti/', 'tính ẩn danh'],
    ['adverb', 'anonymously', '/əˈnɒn.ɪ.məs.li/', 'một cách ẩn danh'],
  ],
  [
    'manipulate',
    ['verb', 'manipulate', '/məˈnɪp.jʊ.leɪt/', 'thao túng, điều khiển'],
    ['noun', 'manipulation', '/məˌnɪp.jʊˈleɪ.ʃən/', 'sự thao túng'],
    ['adjective', 'manipulative', '/məˈnɪp.jʊ.lə.tɪv/', 'có tính thao túng'],
  ],
  [
    'influential',
    ['adjective', 'influential', '/ˌɪn.fluˈen.ʃəl/', 'có sức ảnh hưởng lớn'],
    ['noun', 'influence', '/ˈɪn.flu.əns/', 'sức ảnh hưởng'],
    ['verb', 'influence', '/ˈɪn.flu.əns/', 'tác động, gây ảnh hưởng'],
  ],
  [
    'regulate',
    ['verb', 'regulate', '/ˈreɡ.jʊ.leɪt/', 'điều tiết, quản lý bằng quy định'],
    ['noun', 'regulation / regulator', '/ˌreɡ.jʊˈleɪ.ʃən/', 'quy định / cơ quan quản lý'],
    ['adjective', 'regulatory', '/ˌreɡ.jʊˈleɪ.tər.i/', 'thuộc về quy định, pháp chế'],
  ],
  [
    'enforce',
    ['verb', 'enforce', '/ɪnˈfɔːs/', 'thực thi, cưỡng chế áp dụng'],
    ['noun', 'enforcement', '/ɪnˈfɔːs.mənt/', 'sự thực thi luật lệ'],
    ['adjective', 'enforceable', '/ɪnˈfɔː.sə.bəl/', 'có thể cưỡng chế thi hành'],
  ],
  [
    'comply',
    ['verb', 'comply', '/kəmˈplaɪ/', 'tuân thủ (with)'],
    ['noun', 'compliance', '/kəmˈplaɪ.əns/', 'sự tuân thủ quy định'],
    ['adjective', 'compliant', '/kəmˈplaɪ.ənt/', 'tuân thủ đúng quy chuẩn'],
  ],
  [
    'violate',
    ['verb', 'violate', '/ˈvaɪ.ə.leɪt/', 'vi phạm'],
    ['noun', 'violation', '/ˌvaɪ.əˈleɪ.ʃən/', 'hành vi vi phạm'],
  ],
  [
    'ethical',
    ['adjective', 'ethical', '/ˈeθ.ɪ.kəl/', 'có đạo đức, hợp chuẩn mực'],
    ['noun', 'ethics', '/ˈeθ.ɪks/', 'đạo đức học / quy tắc đạo đức'],
    ['adverb', 'ethically', '/ˈeθ.ɪ.kəl.i/', 'một cách có đạo đức'],
  ],
  [
    'mandatory',
    ['adjective', 'mandatory', '/ˈmæn.də.tər.i/', 'bắt buộc'],
    ['noun', 'mandate', '/ˈmæn.deɪt/', 'chỉ thị bắt buộc, nhiệm vụ ủy thác'],
    ['verb', 'mandate', '/ˈmæn.deɪt/', 'quy định bắt buộc'],
  ],
  [
    'prohibit',
    ['verb', 'prohibit', '/prəˈhɪb.ɪt/', 'nghiêm cấm'],
    ['noun', 'prohibition', '/ˌprəʊ.hɪˈbɪʃ.ən/', 'lệnh cấm'],
    ['adjective', 'prohibitive', '/prəˈhɪb.ɪ.tɪv/', 'mang tính ngăn cản (chi phí quá cao)'],
  ],
  [
    'justify',
    ['verb', 'justify', '/ˈdʒʌs.tɪ.faɪ/', 'biện minh, chứng minh là chính đáng'],
    ['noun', 'justification', '/ˌdʒʌs.tɪ.fɪˈkeɪ.ʃən/', 'lý do chính đáng'],
    ['adjective', 'justifiable', '/ˌdʒʌs.tɪˈfaɪ.ə.bəl/', 'có thể biện minh được'],
  ],
  [
    'legitimate',
    ['adjective', 'legitimate', '/ləˈdʒɪt.ɪ.mət/', 'hợp pháp, chính đáng'],
    ['noun', 'legitimacy', '/ləˈdʒɪt.ɪ.mə.si/', 'tính hợp pháp, chính danh'],
    ['adverb', 'legitimately', '/ləˈdʒɪt.ɪ.mət.li/', 'một cách hợp pháp'],
  ],
  [
    'confidential',
    ['adjective', 'confidential', '/ˌkɒn.fɪˈden.ʃəl/', 'bảo mật, kín'],
    ['noun', 'confidentiality', '/ˌkɒn.fɪ.den.ʃiˈæl.ə.ti/', 'tính bảo mật thông tin'],
    ['adverb', 'confidentially', '/ˌkɒn.fɪˈden.ʃəl.i/', 'một cách bảo mật'],
  ],

  // Psychology & Urban Life
  [
    'motivate',
    ['verb', 'motivate', '/ˈməʊ.tɪ.veɪt/', 'tạo động lực, thúc đẩy'],
    ['noun', 'motivation', '/ˌməʊ.tɪˈveɪ.ʃən/', 'động lực'],
    ['adjective', 'motivated / motivating', '/ˈməʊ.tɪ.veɪ.tɪd/', 'có động lực / truyền cảm hứng'],
  ],
  [
    'persevere',
    ['verb', 'persevere', '/ˌpɜː.sɪˈvɪər/', 'kiên trì bền bỉ'],
    ['noun', 'perseverance', '/ˌpɜː.sɪˈvɪə.rəns/', 'lòng kiên trì'],
  ],
  [
    'anxiety',
    ['noun', 'anxiety', '/æŋˈzaɪ.ə.ti/', 'sự lo âu, bất an'],
    ['adjective', 'anxious', '/ˈæŋk.ʃəs/', 'lo lắng, bồn chồn'],
    ['adverb', 'anxiously', '/ˈæŋk.ʃəs.li/', 'một cách lo âu'],
  ],
  [
    'perceive',
    ['verb', 'perceive', '/pəˈsiːv/', 'nhận thức, nhìn nhận'],
    ['noun', 'perception', '/pəˈsep.ʃən/', 'nhận thức, cách nhìn nhận'],
    ['adjective', 'perceptive', '/pəˈsep.tɪv/', 'nhạy bén, tinh ý'],
  ],
  [
    'adaptable',
    ['adjective', 'adaptable', '/əˈdæp.tə.bəl/', 'có khả năng thích nghi'],
    ['verb', 'adapt', '/əˈdæpt/', 'thích nghi; điều chỉnh'],
    ['noun', 'adaptability / adaptation', '/əˌdæp.təˈbɪl.ə.ti/', 'khả năng thích ứng / sự thích nghi'],
  ],
  [
    'distraction',
    ['noun', 'distraction', '/dɪˈstræk.ʃən/', 'yếu tố gây xao nhãng'],
    ['verb', 'distract', '/dɪˈstrækt/', 'làm mất tập trung'],
    ['adjective', 'distracting / distracted', '/dɪˈstræk.tɪŋ/', 'gây phân tâm / bị phân tâm'],
  ],
  [
    'enthusiastic',
    ['adjective', 'enthusiastic', '/ɪnˌθjuː.ziˈæs.tɪk/', 'nhiệt huyết, hào hứng'],
    ['noun', 'enthusiasm', '/ɪnˈθjuː.zi.æz.əm/', 'lòng nhiệt tình'],
    ['adverb', 'enthusiastically', '/ɪnˌθjuː.ziˈæs.tɪ.kli/', 'một cách hào hứng'],
  ],
  [
    'frustration',
    ['noun', 'frustration', '/frʌsˈtreɪ.ʃən/', 'sự bực bội, chán nản'],
    ['verb', 'frustrate', '/frʌsˈtreɪt/', 'làm nản lòng, gây ức chế'],
    ['adjective', 'frustrating / frustrated', '/frʌsˈtreɪ.tɪŋ/', 'gây bực mình / cảm thấy bực bội'],
  ],
  [
    'deliberately',
    ['adverb', 'deliberately', '/dɪˈlɪb.ər.ət.li/', 'một cách cố ý, có chủ đích'],
    ['adjective', 'deliberate', '/dɪˈlɪb.ər.ət/', 'có tính toán từ trước, chủ đích'],
    ['verb', 'deliberate', '/dɪˈlɪb.ə.reɪt/', 'cân nhắc kỹ lưỡng'],
  ],
  [
    'commute',
    ['verb', 'commute', '/kəˈmjuːt/', 'đi lại hằng ngày giữa nhà và nơi làm'],
    ['noun', 'commute / commuter', '/kəˈmjuːt/', 'quãng đường đi làm / người đi làm xa'],
  ],
  [
    'affordable',
    ['adjective', 'affordable', '/əˈfɔː.də.bəl/', 'vừa túi tiền, hợp khả năng chi trả'],
    ['verb', 'afford', '/əˈfɔːd/', 'đủ khả năng chi trả'],
    ['noun', 'affordability', '/əˌfɔː.dəˈbɪl.ə.ti/', 'khả năng chi trả được'],
  ],
  [
    'renovate',
    ['verb', 'renovate', '/ˈren.ə.veɪt/', 'cải tạo, nâng cấp nhà cửa'],
    ['noun', 'renovation', '/ˌren.əˈveɪ.ʃən/', 'công việc tu sửa, cải tạo'],
    ['adjective', 'renovated', '/ˈren.ə.veɪ.tɪd/', 'đã được cải tạo mới'],
  ],
  [
    'residential',
    ['adjective', 'residential', '/ˌrez.ɪˈden.ʃəl/', 'thuộc khu dân cư'],
    ['verb', 'reside', '/rɪˈzaɪd/', 'cư trú, sinh sống'],
    ['noun', 'resident / residence', '/ˈrez.ɪ.dənt/', 'cư dân / nơi cư trú'],
  ],
  [
    'accessible',
    ['adjective', 'accessible', '/əkˈses.ə.bəl/', 'dễ tiếp cận, dễ hiểu'],
    ['noun', 'access / accessibility', '/ˈæk.ses/', 'quyền tiếp cận / khả năng tiếp cận'],
    ['verb', 'access', '/ˈæk.ses/', 'truy cập, tiếp cận'],
  ],
  [
    'urbanize',
    ['verb', 'urbanize', '/ˈɜː.bə.naɪz/', 'đô thị hóa'],
    ['noun', 'urbanization', '/ˌɜː.bə.naɪˈzeɪ.ʃən/', 'quá trình đô thị hóa'],
    ['adjective', 'urban', '/ˈɜː.bən/', 'thuộc về đô thị, thành thị'],
  ],
];

export const EXTRA_ENGLISH_WORD_FAMILIES = expandFamilies(COMPACT_B2_FAMILIES);
