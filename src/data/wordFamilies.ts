import { EXTRA_ENGLISH_WORD_FAMILIES } from './wordFamiliesExtra';

export type PosCategory = 'noun' | 'verb' | 'adjective' | 'adverb' | 'phrase';

export interface WordFamilyForm {
  pos: PosCategory;
  posLabelVi: string;
  word: string;
  reading?: string;
  meaningVi: string;
}

export function normalizePosCategory(rawPos?: string): PosCategory {
  const s = (rawPos || '').toLowerCase();
  if (s.includes('noun') || s.includes('danh từ') || s.includes('đại từ')) return 'noun';
  if (s.includes('adverb') || s.includes('trạng từ')) return 'adverb';
  if (s.includes('adj') || s.includes('tính từ')) return 'adjective';
  if (s.includes('phrasal') || s.includes('collocation') || s.includes('idiom') || s.includes('chào hỏi')) {
    return 'phrase';
  }
  if (s.includes('verb') || s.includes('động từ')) return 'verb';
  return 'phrase';
}

export function getPosLabelVi(rawPos?: string): string {
  const cat = normalizePosCategory(rawPos);
  switch (cat) {
    case 'noun':
      return 'Danh từ';
    case 'verb':
      return rawPos?.toLowerCase().includes('phrasal') ? 'Cụm động từ' : 'Động từ';
    case 'adjective':
      return rawPos?.includes('-い')
        ? 'Tính từ -い'
        : rawPos?.includes('-な')
        ? 'Tính từ -な'
        : 'Tính từ';
    case 'adverb':
      return 'Trạng từ';
    case 'phrase':
    default:
      if (rawPos?.toLowerCase().includes('idiom')) return 'Thành ngữ';
      if (rawPos?.toLowerCase().includes('collocation')) return 'Cụm từ (Collocation)';
      if (rawPos?.toLowerCase().includes('phrasal')) return 'Cụm động từ';
      if (rawPos?.includes('Chào hỏi')) return 'Mẫu câu giao tiếp';
      return rawPos || 'Cụm từ';
  }
}

export const POS_SORT_ORDER: Record<PosCategory, number> = {
  noun: 1,
  verb: 2,
  adjective: 3,
  adverb: 4,
  phrase: 5,
};

export const POS_BADGE_STYLES: Record<PosCategory, string> = {
  noun: 'bg-[#D7ECF9] text-[#1A4F73]',
  verb: 'bg-[#D2EED9] text-[#1B5C32]',
  adjective: 'bg-[#E5D9F7] text-[#4B2C7A]',
  adverb: 'bg-[#F6E9B2] text-[#6B4F0A]',
  phrase: 'bg-[#F7DCE1] text-[#7D233B]',
};

// Word-family table keyed by VocabItem.id (and also lookup by lowercase word)
export const WORD_FAMILY_BY_KEY: Record<string, WordFamilyForm[]> = {
  // Work & Career
  resolve: [
    { pos: 'verb', posLabelVi: 'Động từ', word: 'resolve', reading: '/rɪˈzɒlv/', meaningVi: 'giải quyết, quyết tâm' },
    { pos: 'noun', posLabelVi: 'Danh từ', word: 'resolution', reading: '/ˌrezəˈluːʃn/', meaningVi: 'nghị quyết, cách giải quyết, sự quyết tâm' },
    { pos: 'adjective', posLabelVi: 'Tính từ', word: 'resolute', reading: '/ˈrezəluːt/', meaningVi: 'kiên quyết, quả quyết' },
    { pos: 'adverb', posLabelVi: 'Trạng từ', word: 'resolutely', reading: '/ˈrezəluːtli/', meaningVi: 'một cách kiên quyết' },
  ],
  finalize: [
    { pos: 'verb', posLabelVi: 'Động từ', word: 'finalize', reading: '/ˈfaɪnəlaɪz/', meaningVi: 'hoàn tất, chốt lại' },
    { pos: 'noun', posLabelVi: 'Danh từ', word: 'finalization', reading: '/ˌfaɪnəlaɪˈzeɪʃn/', meaningVi: 'sự hoàn tất cuối cùng' },
    { pos: 'adjective', posLabelVi: 'Tính từ', word: 'final', reading: '/ˈfaɪnl/', meaningVi: 'cuối cùng, chung kết' },
    { pos: 'adverb', posLabelVi: 'Trạng từ', word: 'finally', reading: '/ˈfaɪnəli/', meaningVi: 'cuối cùng thì' },
  ],
  negotiate: [
    { pos: 'verb', posLabelVi: 'Động từ', word: 'negotiate', reading: '/nɪˈɡəʊʃieɪt/', meaningVi: 'đàm phán, thương lượng' },
    { pos: 'noun', posLabelVi: 'Danh từ', word: 'negotiation / negotiator', reading: '/nɪˌɡəʊʃiˈeɪʃn/', meaningVi: 'cuộc đàm phán / người đàm phán' },
    { pos: 'adjective', posLabelVi: 'Tính từ', word: 'negotiable', reading: '/nɪˈɡəʊʃəbl/', meaningVi: 'có thể thương lượng được' },
  ],
  delegate: [
    { pos: 'verb', posLabelVi: 'Động từ', word: 'delegate', reading: '/ˈdelɪɡeɪt/', meaningVi: 'ủy quyền, giao việc' },
    { pos: 'noun', posLabelVi: 'Danh từ', word: 'delegation / delegate', reading: '/ˌdelɪˈɡeɪʃn/', meaningVi: 'sự ủy quyền / đại biểu' },
  ],
  consensus: [
    { pos: 'noun', posLabelVi: 'Danh từ', word: 'consensus', reading: '/kənˈsensəs/', meaningVi: 'sự đồng thuận chung' },
    { pos: 'adjective', posLabelVi: 'Tính từ', word: 'consensual', reading: '/kənˈsenʃuəl/', meaningVi: 'dựa trên sự đồng thuận' },
  ],
  accountability: [
    { pos: 'noun', posLabelVi: 'Danh từ', word: 'accountability', reading: '/əˌkaʊntəˈbɪləti/', meaningVi: 'trách nhiệm giải trình' },
    { pos: 'adjective', posLabelVi: 'Tính từ', word: 'accountable', reading: '/əˈkaʊntəbl/', meaningVi: 'chịu trách nhiệm (to someone for something)' },
    { pos: 'verb', posLabelVi: 'Động từ', word: 'account (for)', reading: '/əˈkaʊnt/', meaningVi: 'giải thích cho, chiếm (tỷ lệ)' },
  ],
  upskill: [
    { pos: 'verb', posLabelVi: 'Động từ', word: 'upskill', reading: '/ˈʌpskɪl/', meaningVi: 'nâng cao kỹ năng' },
    { pos: 'noun', posLabelVi: 'Danh từ', word: 'upskilling / skill', reading: '/ˈʌpskɪlɪŋ/', meaningVi: 'quá trình nâng cao tay nghề / kỹ năng' },
    { pos: 'adjective', posLabelVi: 'Tính từ', word: 'skilled / skillful', reading: '/skɪld/', meaningVi: 'lành nghề, khéo léo' },
  ],
  workload: [
    { pos: 'noun', posLabelVi: 'Danh từ', word: 'workload', reading: '/ˈwɜːrkləʊd/', meaningVi: 'khối lượng công việc' },
    { pos: 'verb', posLabelVi: 'Động từ', word: 'overload / load', reading: '/ˌəʊvəˈləʊd/', meaningVi: 'chất quá tải / giao tải' },
    { pos: 'adjective', posLabelVi: 'Tính từ', word: 'overloaded', reading: '/ˌəʊvəˈləʊdɪd/', meaningVi: 'bị quá tải công việc' },
  ],

  // Technology & AI
  streamline: [
    { pos: 'verb', posLabelVi: 'Động từ', word: 'streamline', reading: '/ˈstriːmlaɪn/', meaningVi: 'tinh gọn, hợp lý hóa' },
    { pos: 'adjective', posLabelVi: 'Tính từ', word: 'streamlined', reading: '/ˈstriːmlaɪnd/', meaningVi: 'được tinh giản, gọn nhẹ' },
  ],
  automation: [
    { pos: 'noun', posLabelVi: 'Danh từ', word: 'automation', reading: '/ˌɔːtəˈmeɪʃn/', meaningVi: 'sự tự động hóa' },
    { pos: 'verb', posLabelVi: 'Động từ', word: 'automate', reading: '/ˈɔːtəmeɪt/', meaningVi: 'tự động hóa' },
    { pos: 'adjective', posLabelVi: 'Tính từ', word: 'automated / automatic', reading: '/ˈɔːtəmeɪtɪd/', meaningVi: 'được tự động hóa / tự động' },
    { pos: 'adverb', posLabelVi: 'Trạng từ', word: 'automatically', reading: '/ˌɔːtəˈmætɪkli/', meaningVi: 'một cách tự động' },
  ],
  algorithm: [
    { pos: 'noun', posLabelVi: 'Danh từ', word: 'algorithm', reading: '/ˈælɡərɪðəm/', meaningVi: 'thuật toán' },
    { pos: 'adjective', posLabelVi: 'Tính từ', word: 'algorithmic', reading: '/ˌælɡəˈrɪðmɪk/', meaningVi: 'thuộc về thuật toán' },
  ],
  obsolete: [
    { pos: 'adjective', posLabelVi: 'Tính từ', word: 'obsolete', reading: '/ˌɒbsəˈliːt/', meaningVi: 'lỗi thời, hết hạn dùng' },
    { pos: 'noun', posLabelVi: 'Danh từ', word: 'obsolescence', reading: '/ˌɒbsəˈlesns/', meaningVi: 'tình trạng lỗi thời' },
  ],
  seamless: [
    { pos: 'adjective', posLabelVi: 'Tính từ', word: 'seamless', reading: '/ˈsiːmləs/', meaningVi: 'liền mạch, mượt mà' },
    { pos: 'adverb', posLabelVi: 'Trạng từ', word: 'seamlessly', reading: '/ˈsiːmləsli/', meaningVi: 'một cách mượt mà, không gián đoạn' },
    { pos: 'noun', posLabelVi: 'Danh từ', word: 'seamlessness', reading: '/ˈsiːmləsnəs/', meaningVi: 'tính liền mạch' },
  ],
  leverage: [
    { pos: 'verb', posLabelVi: 'Động từ', word: 'leverage', reading: '/ˈlevərɪdʒ/', meaningVi: 'tận dụng tối đa' },
    { pos: 'noun', posLabelVi: 'Danh từ', word: 'leverage', reading: '/ˈlevərɪdʒ/', meaningVi: 'đòn bẩy, lợi thế đàm phán' },
  ],
  deploy: [
    { pos: 'verb', posLabelVi: 'Động từ', word: 'deploy', reading: '/dɪˈplɔɪ/', meaningVi: 'triển khai' },
    { pos: 'noun', posLabelVi: 'Danh từ', word: 'deployment', reading: '/dɪˈplɔɪmənt/', meaningVi: 'sự triển khai hệ thống' },
  ],
  glitch: [
    { pos: 'noun', posLabelVi: 'Danh từ', word: 'glitch', reading: '/ɡlɪtʃ/', meaningVi: 'lỗi kỹ thuật nhỏ' },
    { pos: 'verb', posLabelVi: 'Động từ', word: 'glitch', reading: '/ɡlɪtʃ/', meaningVi: 'bị trục trặc, giật lag' },
    { pos: 'adjective', posLabelVi: 'Tính từ', word: 'glitchy', reading: '/ˈɡlɪtʃi/', meaningVi: 'hay bị lỗi vặt' },
  ],

  // Education
  retention: [
    { pos: 'noun', posLabelVi: 'Danh từ', word: 'retention', reading: '/rɪˈtenʃn/', meaningVi: 'sự lưu giữ, ghi nhớ' },
    { pos: 'verb', posLabelVi: 'Động từ', word: 'retain', reading: '/rɪˈteɪn/', meaningVi: 'giữ lại, nhớ được' },
    { pos: 'adjective', posLabelVi: 'Tính từ', word: 'retentive', reading: '/rɪˈtentɪv/', meaningVi: 'có khả năng ghi nhớ tốt' },
  ],
  proficiency: [
    { pos: 'noun', posLabelVi: 'Danh từ', word: 'proficiency', reading: '/prəˈfɪʃnsi/', meaningVi: 'sự thành thạo' },
    { pos: 'adjective', posLabelVi: 'Tính từ', word: 'proficient', reading: '/prəˈfɪʃnt/', meaningVi: 'thành thạo (in/at)' },
    { pos: 'adverb', posLabelVi: 'Trạng từ', word: 'proficiently', reading: '/prəˈfɪʃntli/', meaningVi: 'một cách thành thạo' },
  ],
  cognitive: [
    { pos: 'adjective', posLabelVi: 'Tính từ', word: 'cognitive', reading: '/ˈkɒɡnətɪv/', meaningVi: 'thuộc nhận thức' },
    { pos: 'noun', posLabelVi: 'Danh từ', word: 'cognition', reading: '/kɒɡˈnɪʃn/', meaningVi: 'quá trình nhận thức' },
    { pos: 'adverb', posLabelVi: 'Trạng từ', word: 'cognitively', reading: '/ˈkɒɡnətɪvli/', meaningVi: 'về mặt nhận thức' },
  ],

  // Lifestyle & Wellbeing
  resilience: [
    { pos: 'noun', posLabelVi: 'Danh từ', word: 'resilience', reading: '/rɪˈzɪliəns/', meaningVi: 'sức bền, khả năng phục hồi' },
    { pos: 'adjective', posLabelVi: 'Tính từ', word: 'resilient', reading: '/rɪˈzɪliənt/', meaningVi: 'kiên cường, hồi phục nhanh' },
    { pos: 'adverb', posLabelVi: 'Trạng từ', word: 'resiliently', reading: '/rɪˈzɪliəntli/', meaningVi: 'một cách kiên cường' },
  ],
  mindfulness: [
    { pos: 'noun', posLabelVi: 'Danh từ', word: 'mindfulness', reading: '/ˈmaɪndflnəs/', meaningVi: 'sự chánh niệm, tỉnh thức' },
    { pos: 'adjective', posLabelVi: 'Tính từ', word: 'mindful', reading: '/ˈmaɪndfl/', meaningVi: 'lưu tâm, chú ý (of)' },
    { pos: 'adverb', posLabelVi: 'Trạng từ', word: 'mindfully', reading: '/ˈmaɪndfəli/', meaningVi: 'một cách tỉnh thức' },
  ],
  recharge: [
    { pos: 'verb', posLabelVi: 'Động từ', word: 'recharge', reading: '/ˌriːˈtʃɑːrdʒ/', meaningVi: 'nạp lại năng lượng, sạc lại' },
    { pos: 'adjective', posLabelVi: 'Tính từ', word: 'rechargeable', reading: '/ˌriːˈtʃɑːrdʒəbl/', meaningVi: 'có thể sạc lại nhiều lần' },
  ],

  // Environment
  sustainable: [
    { pos: 'adjective', posLabelVi: 'Tính từ', word: 'sustainable', reading: '/səˈsteɪnəbl/', meaningVi: 'bền vững' },
    { pos: 'verb', posLabelVi: 'Động từ', word: 'sustain', reading: '/səˈsteɪn/', meaningVi: 'duy trì, chống đỡ lâu dài' },
    { pos: 'noun', posLabelVi: 'Danh từ', word: 'sustainability', reading: '/səˌsteɪnəˈbɪləti/', meaningVi: 'tính bền vững' },
    { pos: 'adverb', posLabelVi: 'Trạng từ', word: 'sustainably', reading: '/səˈsteɪnəbli/', meaningVi: 'một cách bền vững' },
  ],
  renewable: [
    { pos: 'adjective', posLabelVi: 'Tính từ', word: 'renewable', reading: '/rɪˈnjuːəbl/', meaningVi: 'có thể tái tạo' },
    { pos: 'verb', posLabelVi: 'Động từ', word: 'renew', reading: '/rɪˈnjuː/', meaningVi: 'làm mới, gia hạn, tái tạo' },
    { pos: 'noun', posLabelVi: 'Danh từ', word: 'renewal', reading: '/rɪˈnjuːəl/', meaningVi: 'sự đổi mới, sự gia hạn' },
  ],
  mitigate: [
    { pos: 'verb', posLabelVi: 'Động từ', word: 'mitigate', reading: '/ˈmɪtɪɡeɪt/', meaningVi: 'giảm nhẹ tác động' },
    { pos: 'noun', posLabelVi: 'Danh từ', word: 'mitigation', reading: '/ˌmɪtɪˈɡeɪʃn/', meaningVi: 'biện pháp giảm nhẹ' },
    { pos: 'adjective', posLabelVi: 'Tính từ', word: 'mitigating', reading: '/ˈmɪtɪɡeɪtɪŋ/', meaningVi: 'giảm nhẹ (tình tiết)' },
  ],
  biodiversity: [
    { pos: 'noun', posLabelVi: 'Danh từ', word: 'biodiversity', reading: '/ˌbaɪəʊdaɪˈvɜːrsəti/', meaningVi: 'đa dạng sinh học' },
    { pos: 'adjective', posLabelVi: 'Tính từ', word: 'biodiverse', reading: '/ˌbaɪəʊdaɪˈvɜːrs/', meaningVi: 'đa dạng về sinh học' },
  ],
  deplete: [
    { pos: 'verb', posLabelVi: 'Động từ', word: 'deplete', reading: '/dɪˈpliːt/', meaningVi: 'làm cạn kiệt' },
    { pos: 'noun', posLabelVi: 'Danh từ', word: 'depletion', reading: '/dɪˈpliːʃn/', meaningVi: 'sự cạn kiệt tài nguyên' },
    { pos: 'adjective', posLabelVi: 'Tính từ', word: 'depleted', reading: '/dɪˈpliːtɪd/', meaningVi: 'bị cạn kiệt, suy giảm' },
  ],
  emission: [
    { pos: 'noun', posLabelVi: 'Danh từ', word: 'emission', reading: '/ɪˈmɪʃn/', meaningVi: 'khí thải, sự phát ra' },
    { pos: 'verb', posLabelVi: 'Động từ', word: 'emit', reading: '/iˈmɪt/', meaningVi: 'thải ra, phát ra' },
  ],

  // Travel & Culture
  hospitality: [
    { pos: 'noun', posLabelVi: 'Danh từ', word: 'hospitality', reading: '/ˌhɒspɪˈtæləti/', meaningVi: 'lòng hiếu khách; ngành nhà hàng-khách sạn' },
    { pos: 'adjective', posLabelVi: 'Tính từ', word: 'hospitable', reading: '/hɒˈspɪtəbl/', meaningVi: 'hiếu khách, niềm nở' },
    { pos: 'adverb', posLabelVi: 'Trạng từ', word: 'hospitably', reading: '/hɒˈspɪtəbli/', meaningVi: 'một cách niềm nở' },
  ],
  authentic: [
    { pos: 'adjective', posLabelVi: 'Tính từ', word: 'authentic', reading: '/ɔːˈθentɪk/', meaningVi: 'đích thực, nguyên bản' },
    { pos: 'noun', posLabelVi: 'Danh từ', word: 'authenticity', reading: '/ˌɔːθenˈtɪsəti/', meaningVi: 'tính chân thực, nguyên bản' },
    { pos: 'verb', posLabelVi: 'Động từ', word: 'authenticate', reading: '/ɔːˈθentɪkeɪt/', meaningVi: 'xác thực, chứng thực' },
    { pos: 'adverb', posLabelVi: 'Trạng từ', word: 'authentically', reading: '/ɔːˈθentɪkli/', meaningVi: 'một cách chân thực' },
  ],

  // Society & Discourse
  consequently: [
    { pos: 'adverb', posLabelVi: 'Trạng từ', word: 'consequently', reading: '/ˈkɒnsɪkwəntli/', meaningVi: 'do đó, kết quả là' },
    { pos: 'noun', posLabelVi: 'Danh từ', word: 'consequence', reading: '/ˈkɒnsɪkwəns/', meaningVi: 'hệ quả, hậu quả' },
    { pos: 'adjective', posLabelVi: 'Tính từ', word: 'consequent / consequential', reading: '/ˈkɒnsɪkwənt/', meaningVi: 'kéo theo sau / mang hệ quả lớn' },
  ],
  articulate: [
    { pos: 'verb', posLabelVi: 'Động từ', word: 'articulate', reading: '/ɑːrˈtɪkjəleɪt/', meaningVi: 'diễn đạt rõ ràng' },
    { pos: 'adjective', posLabelVi: 'Tính từ', word: 'articulate', reading: '/ɑːrˈtɪkjələt/', meaningVi: 'ăn nói lưu loát, mạch lạc' },
    { pos: 'noun', posLabelVi: 'Danh từ', word: 'articulation', reading: '/ɑːrˌtɪkjəˈleɪʃn/', meaningVi: 'sự phát âm / diễn đạt rõ ràng' },
    { pos: 'adverb', posLabelVi: 'Trạng từ', word: 'articulately', reading: '/ɑːrˈtɪkjələtli/', meaningVi: 'một cách lưu loát' },
  ],
  persuasive: [
    { pos: 'adjective', posLabelVi: 'Tính từ', word: 'persuasive', reading: '/pərˈsweɪsɪv/', meaningVi: 'có sức thuyết phục' },
    { pos: 'verb', posLabelVi: 'Động từ', word: 'persuade', reading: '/pərˈsweɪd/', meaningVi: 'thuyết phục ai làm gì' },
    { pos: 'noun', posLabelVi: 'Danh từ', word: 'persuasion', reading: '/pərˈsweɪʒn/', meaningVi: 'sự thuyết phục' },
    { pos: 'adverb', posLabelVi: 'Trạng từ', word: 'persuasively', reading: '/pərˈsweɪsɪvli/', meaningVi: 'một cách thuyết phục' },
  ],
  misconception: [
    { pos: 'noun', posLabelVi: 'Danh từ', word: 'misconception', reading: '/ˌmɪskənˈsepʃn/', meaningVi: 'quan niệm sai lầm' },
    { pos: 'verb', posLabelVi: 'Động từ', word: 'misconceive', reading: '/ˌmɪskənˈsiːv/', meaningVi: 'hiểu sai, nhận thức sai' },
    { pos: 'noun', posLabelVi: 'Danh từ gốc', word: 'concept / conception', reading: '/ˈkɒnsept/', meaningVi: 'khái niệm, quan niệm' },
  ],
  indispensable: [
    { pos: 'adjective', posLabelVi: 'Tính từ', word: 'indispensable', reading: '/ˌɪndɪˈspensəbl/', meaningVi: 'không thể thiếu' },
    { pos: 'verb', posLabelVi: 'Động từ', word: 'dispense (with)', reading: '/dɪˈspens/', meaningVi: 'bỏ qua, không cần đến' },
    { pos: 'adverb', posLabelVi: 'Trạng từ', word: 'indispensably', reading: '/ˌɪndɪˈspensəbli/', meaningVi: 'một cách thiết yếu' },
  ],

  // Japanese key word families / conjugations
  '勉強する': [
    { pos: 'noun', posLabelVi: 'Danh từ', word: '勉強', reading: 'べんきょう (benkyou)', meaningVi: 'việc học tập' },
    { pos: 'verb', posLabelVi: 'Động từ nhóm III', word: '勉強する / 勉強します', reading: 'べんきょうする', meaningVi: 'học tập' },
  ],
  '食べる': [
    { pos: 'verb', posLabelVi: 'Động từ nhóm II', word: '食べる (食べます)', reading: 'たべる (たべます)', meaningVi: 'ăn (thể từ điển / lịch sự)' },
    { pos: 'noun', posLabelVi: 'Danh từ ghép', word: '食べ物', reading: 'たべもの (tabemono)', meaningVi: 'đồ ăn, thức ăn' },
  ],
  '飲む': [
    { pos: 'verb', posLabelVi: 'Động từ nhóm I', word: '飲む (飲みます)', reading: 'のむ (のみます)', meaningVi: 'uống (thể từ điển / lịch sự)' },
    { pos: 'noun', posLabelVi: 'Danh từ ghép', word: '飲み物', reading: 'のみもの (nomimono)', meaningVi: 'đồ uống, thức uống' },
  ],
  '読む': [
    { pos: 'verb', posLabelVi: 'Động từ nhóm I', word: '読む (読みます)', reading: 'よむ (よみます)', meaningVi: 'đọc' },
    { pos: 'noun', posLabelVi: 'Danh từ ghép', word: '読み方', reading: 'よみかた (yomikata)', meaningVi: 'cách đọc' },
  ],
  '買う': [
    { pos: 'verb', posLabelVi: 'Động từ nhóm I', word: '買う (買います)', reading: 'かう (かいます)', meaningVi: 'mua' },
    { pos: 'noun', posLabelVi: 'Danh từ ghép', word: '買い物', reading: 'かいもの (kaimono)', meaningVi: 'việc mua sắm' },
  ],
  '新しい': [
    { pos: 'adjective', posLabelVi: 'Tính từ -い', word: '新しい', reading: 'あたらしい (atarashii)', meaningVi: 'mới' },
    { pos: 'adverb', posLabelVi: 'Trạng từ (-く)', word: '新しく', reading: 'あたらしく (atarashiku)', meaningVi: 'một cách mới mẻ' },
    { pos: 'noun', posLabelVi: 'Danh từ (-さ)', word: '新しさ', reading: 'あたらしさ (atarashisa)', meaningVi: 'sự mới mẻ' },
  ],
  'おいしい': [
    { pos: 'adjective', posLabelVi: 'Tính từ -い', word: 'おいしい', reading: 'oishii', meaningVi: 'ngon' },
    { pos: 'adverb', posLabelVi: 'Trạng từ (-く)', word: 'おいしく', reading: 'oishiku', meaningVi: '(ăn/nấu) một cách ngon lành' },
    { pos: 'noun', posLabelVi: 'Danh từ (-さ)', word: 'おいしさ', reading: 'oishisa', meaningVi: 'vị ngon' },
  ],
  '好き': [
    { pos: 'adjective', posLabelVi: 'Tính từ -な', word: '好き (な)', reading: 'すき (suki)', meaningVi: 'thích, ưa thích' },
    { pos: 'noun', posLabelVi: 'Danh từ ghép', word: '大好き', reading: 'だいすき (daisuki)', meaningVi: 'rất thích, yêu thích' },
  ],
};

const MERGED_WORD_FAMILIES: Record<string, WordFamilyForm[]> = {
  ...WORD_FAMILY_BY_KEY,
  ...EXTRA_ENGLISH_WORD_FAMILIES,
};

const REVERSE_FAMILY_INDEX: Record<string, WordFamilyForm[]> = (() => {
  const index: Record<string, WordFamilyForm[]> = {};
  for (const [key, forms] of Object.entries(MERGED_WORD_FAMILIES)) {
    index[key.toLowerCase()] = forms;
    for (const form of forms) {
      const tokens = form.word
        .split('/')
        .map((part) => part.replace(/\([^)]*\)/g, '').trim().toLowerCase())
        .filter(Boolean);
      for (const tok of tokens) {
        if (!index[tok]) {
          index[tok] = forms;
        }
      }
    }
  }
  return index;
})();

const POS_SHORT_MAP: Record<PosCategory, string> = {
  noun: 'Danh từ (n)',
  verb: 'Động từ (v)',
  adjective: 'Tính từ (adj)',
  adverb: 'Trạng từ (adv)',
  phrase: 'Cụm từ',
};

function deriveEnglishFallbackForms(
  word: string,
  rawPos?: string,
  reading?: string,
  meaningVi?: string
): WordFamilyForm[] {
  const clean = word.trim();
  const lower = clean.toLowerCase();
  if (!clean || !/^[a-z-]+$/.test(lower)) return [];

  const mainCat = normalizePosCategory(rawPos);
  if (mainCat === 'phrase') return [];

  const forms: WordFamilyForm[] = [
    {
      pos: mainCat,
      posLabelVi: POS_SHORT_MAP[mainCat],
      word: clean,
      reading,
      meaningVi: meaningVi || 'từ gốc',
    },
  ];

  // Safe morphological cues for English single words
  if (mainCat === 'adjective') {
    if (!lower.endsWith('ly')) {
      const adv = lower.endsWith('ic')
        ? `${lower}ally`
        : lower.endsWith('le')
        ? `${lower.slice(0, -1)}y`
        : lower.endsWith('y') && lower.length > 3
        ? `${lower.slice(0, -1)}ily`
        : `${lower}ly`;
      forms.push({
        pos: 'adverb',
        posLabelVi: POS_SHORT_MAP.adverb,
        word: adv,
        meaningVi: `một cách (${meaningVi || clean})`,
      });
    }
    if (lower.endsWith('able') || lower.endsWith('ible')) {
      forms.push({
        pos: 'noun',
        posLabelVi: POS_SHORT_MAP.noun,
        word: `${lower.slice(0, -2)}ility`,
        meaningVi: `tính chất / khả năng (${meaningVi || clean})`,
      });
    } else if (lower.endsWith('ive') || lower.endsWith('ous') || lower.endsWith('ful')) {
      forms.push({
        pos: 'noun',
        posLabelVi: POS_SHORT_MAP.noun,
        word: `${lower}ness`,
        meaningVi: `tính / trạng thái (${meaningVi || clean})`,
      });
    }
  } else if (mainCat === 'verb') {
    if (lower.endsWith('ize') || lower.endsWith('ate')) {
      const stem = lower.endsWith('ize') ? `${lower.slice(0, -1)}ation` : `${lower.slice(0, -1)}ion`;
      forms.push({
        pos: 'noun',
        posLabelVi: POS_SHORT_MAP.noun,
        word: stem,
        meaningVi: `sự / quá trình (${meaningVi || clean})`,
      });
    }
    if (!lower.includes('-')) {
      const adjIng = lower.endsWith('e') && !lower.endsWith('ee') ? `${lower.slice(0, -1)}ing` : `${lower}ing`;
      forms.push({
        pos: 'adjective',
        posLabelVi: POS_SHORT_MAP.adjective,
        word: adjIng,
        meaningVi: `mang tính / đang (${meaningVi || clean})`,
      });
    }
  } else if (mainCat === 'noun') {
    if (lower.endsWith('ity') && lower.length > 5) {
      const adj = `${lower.slice(0, -3)}e`;
      if (adj.endsWith('able') || adj.endsWith('ible')) {
        forms.push({
          pos: 'adjective',
          posLabelVi: POS_SHORT_MAP.adjective,
          word: adj,
          meaningVi: `có tính (${meaningVi || clean})`,
        });
      }
    }
  } else if (mainCat === 'adverb' && lower.endsWith('ly') && lower.length > 4) {
    const base = lower.endsWith('ally') ? lower.slice(0, -4) + 'al' : lower.slice(0, -2);
    forms.push({
      pos: 'adjective',
      posLabelVi: POS_SHORT_MAP.adjective,
      word: base,
      meaningVi: `tính từ gốc của "${clean}"`,
    });
  }

  return forms.length > 1 ? forms : [];
}

export function getWordFamilyFor(
  word: string,
  rawPos?: string,
  reading?: string,
  meaningVi?: string
): WordFamilyForm[] {
  const direct =
    MERGED_WORD_FAMILIES[word] ||
    MERGED_WORD_FAMILIES[word.toLowerCase()] ||
    REVERSE_FAMILY_INDEX[word.toLowerCase()];
  if (direct && direct.length > 0) return direct;
  return deriveEnglishFallbackForms(word, rawPos, reading, meaningVi);
}
