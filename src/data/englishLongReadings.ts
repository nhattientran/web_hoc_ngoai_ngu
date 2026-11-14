import { ExerciseItem } from '../types';

export type LongReadingCategory = 'mail' | 'event' | 'topic';

export interface ReadingParagraph {
  en: string;
  vi: string;
  heading?: string;
}

export interface ReadingGlossaryItem {
  word: string;
  pos: string;
  ipa: string;
  meaningVi: string;
  example: string;
}

export interface LongReadingArticle {
  id: string;
  category: LongReadingCategory;
  categoryLabelVi: string;
  level: 'B1+' | 'B2';
  title: string;
  subtitleVi: string;
  readMinutes: number;
  tags: string[];
  emailMeta?: {
    from: string;
    to: string;
    subject: string;
    date: string;
  };
  paragraphs: ReadingParagraph[];
  glossary: ReadingGlossaryItem[];
  questions: ExerciseItem[];
}

export const LONG_READING_CATEGORIES: {
  id: 'all' | LongReadingCategory;
  label: string;
  description: string;
}[] = [
  { id: 'all', label: 'Tất cả bài đọc', description: 'Toàn bộ bài đọc dài chuẩn B1+ → B2' },
  { id: 'mail', label: 'Email & Công sở', description: 'Thư trao đổi dự án, thư mời hội thảo, phản hồi khách hàng' },
  { id: 'event', label: 'Sự kiện & Tin tức', description: 'Phóng sự triển lãm, hội nghị khu vực, hackathon' },
  { id: 'topic', label: 'Chủ đề chuyên sâu', description: 'Tâm lý học, đô thị xanh, kinh tế tuần hoàn' },
];

export const ENGLISH_LONG_READINGS: LongReadingArticle[] = [
  // =========================================================
  // 1. EMAIL: Q4 PRODUCT LAUNCH
  // =========================================================
  {
    id: 'read-mail-1',
    category: 'mail',
    categoryLabelVi: 'Email Công sở',
    level: 'B2',
    title: 'Re: Q4 Product Launch Timeline & Resource Reallocation',
    subtitleVi: 'Chuỗi email nội bộ bàn về việc dời lịch ra mắt sản phẩm do kiểm thử bảo mật và đề xuất phương án xử lý.',
    readMinutes: 5,
    tags: ['Workplace', 'Project Management', 'Negotiation'],
    emailMeta: {
      from: 'Minh Tran <minh.tran@novatech.io>',
      to: 'Sarah Jenkins <s.jenkins@novatech.io>, Product Core Team',
      subject: 'Re: Q4 Product Launch Timeline & Resource Reallocation',
      date: 'Mon, 10 Nov • 09:42 AM',
    },
    paragraphs: [
      {
        heading: 'Background & Current Bottleneck',
        en: 'Hi Sarah and team, thank you for sharing the updated marketing calendar yesterday. After reviewing our current sprint velocity alongside yesterday’s security audit, I believe we need to reconsider our target release date of November 28. Although the core user interface and billing modules are virtually complete, the third-party payment integration still exhibits intermittent latency under peak traffic simulations.',
        vi: 'Chào Sarah và cả nhóm, cảm ơn mọi người đã chia sẻ lịch marketing cập nhật hôm qua. Sau khi rà soát tốc độ hoàn thành sprint hiện tại cùng báo cáo kiểm toán bảo mật hôm qua, tôi cho rằng chúng ta cần cân nhắc lại mốc phát hành ngày 28/11. Dù giao diện người dùng cốt lõi và phân hệ thanh toán nội bộ gần như đã hoàn tất, phần tích hợp cổng thanh toán bên thứ ba vẫn xuất hiện độ trễ ngắt quãng khi mô phỏng tải cao.',
      },
      {
        en: 'Were we to push this build to production without addressing those edge cases, customer support could face a surge of failed-transaction tickets during our busiest promotional weekend. More importantly, our external compliance reviewer has requested five additional business days to verify the revised encryption flow before issuing formal sign-off.',
        vi: 'Nếu chúng ta vẫn đẩy bản dựng này lên môi trường thật mà chưa xử lý các tình huống biên đó, bộ phận chăm sóc khách hàng có thể phải đối mặt với làn sóng yêu cầu hỗ trợ giao dịch lỗi ngay trong dịp khuyến mãi cao điểm nhất. Quan trọng hơn, đơn vị đánh giá tuân thủ bên ngoài đã yêu cầu thêm năm ngày làm việc để xác minh quy trình mã hóa mới trước khi ký duyệt chính thức.',
      },
      {
        heading: 'Proposed Two-Week Buffer',
        en: 'Rather than rushing through quality assurance, I propose shifting the public launch to December 12 while keeping our private beta open for twenty invited enterprise clients. This phased rollout would allow engineering to resolve the latency bottleneck thoroughly, while giving marketing extra breathing room to collect real testimonials from early adopters.',
        vi: 'Thay vì đốt cháy giai đoạn kiểm thử chất lượng, tôi đề xuất dời lịch ra mắt đại chúng sang ngày 12/12, đồng thời vẫn mở bản thử nghiệm giới hạn cho hai mươi khách hàng doanh nghiệp được mời. Việc triển khai theo từng giai đoạn như vậy sẽ giúp đội kỹ thuật xử lý triệt để điểm nghẽn độ trễ, đồng thời mang lại cho bộ phận marketing thêm thời gian thu thập nhận xét thực tế từ nhóm dùng thử sớm.',
      },
      {
        en: 'To prevent further delays, we have temporarily reassigned two senior backend engineers from the internal analytics dashboard to focus exclusively on automated stress testing. Could your team confirm by Wednesday afternoon whether the revised December 12 window aligns with your paid campaign commitments? Let us schedule a brief 20-minute sync tomorrow morning to finalize dependencies.',
        vi: 'Để tránh chậm trễ thêm, chúng tôi đã tạm thời điều chuyển hai kỹ sư backend cấp cao từ mảng dashboard phân tích nội bộ sang tập trung hoàn toàn vào kiểm thử chịu tải tự động. Đội của bạn có thể xác nhận trước chiều thứ Tư xem khung thời gian 12/12 có khớp với các cam kết chiến dịch trả phí không? Chúng ta hãy đặt một buổi họp ngắn 20 phút sáng mai để chốt các đầu việc phụ thuộc.',
      },
      {
        heading: 'Communication & Partner Coordination',
        en: 'From a customer-communication standpoint, our success managers have already drafted a polite, reassuring update for invited beta partners so nobody assumes the core platform is unstable. Instead of framing the shift as an unexpected setback, the draft highlights our commitment to delivering spotless checkout reliability ahead of year-end volume spikes.',
        vi: 'Về phương diện truyền thông khách hàng, các quản lý thành công khách hàng đã soạn sẵn thư cập nhật lịch sự và trấn an gửi nhóm đối tác thử nghiệm được mời để không ai hiểu lầm rằng nền tảng cốt lõi thiếu ổn định. Thay vì diễn đạt việc dời lịch như một bước lùi bất ngờ, bản nháp nhấn mạnh cam kết mang lại độ tin cậy thanh toán hoàn hảo trước làn sóng đơn hàng cuối năm.',
      },
      {
        en: 'Finally, I have attached a revised risk matrix outlining clear go/no-go checkpoints every forty-eight hours between now and December 5. If any unforeseen blocker emerges during load testing, we will escalate immediately rather than waiting until the final week. Thank you in advance for your flexibility—I truly appreciate how closely our teams have collaborated under tight deadlines.',
        vi: 'Cuối cùng, tôi đã đính kèm ma trận rủi ro cập nhật nêu rõ các mốc kiểm tra đạt/không đạt cách mỗi 48 giờ từ nay đến ngày 5/12. Nếu xuất hiện bất kỳ trở ngại ngoài dự kiến nào khi kiểm thử tải, chúng tôi sẽ báo cáo khẩn ngay lập tức thay vì đợi đến tuần cuối. Cảm ơn trước vì sự linh hoạt của đội bạn—tôi thực sự trân trọng tinh thần phối hợp chặt chẽ giữa hai nhóm trong giai đoạn gấp rút vừa qua.',
      },
    ],
    glossary: [
      { word: 'reallocation', pos: 'Danh từ', ipa: '/ˌriː.æl.əˈkeɪ.ʃən/', meaningVi: 'sự phân bổ lại (nguồn lực)', example: 'Resource reallocation helped the team meet the revised deadline.' },
      { word: 'intermittent', pos: 'Tính từ', ipa: '/ˌɪn.təˈmɪt.ənt/', meaningVi: 'ngắt quãng, lúc có lúc không', example: 'Users reported intermittent connection drops during the storm.' },
      { word: 'compliance', pos: 'Danh từ', ipa: '/kəmˈplaɪ.əns/', meaningVi: 'sự tuân thủ quy định/tiêu chuẩn', example: 'Financial apps must pass strict security compliance checks.' },
      { word: 'phased rollout', pos: 'Cụm danh từ', ipa: '/feɪzd ˈrəʊl.aʊt/', meaningVi: 'triển khai theo từng giai đoạn', example: 'A phased rollout reduces risk when launching major software updates.' },
      { word: 'bottleneck', pos: 'Danh từ', ipa: '/ˈbɒt.əl.nek/', meaningVi: 'nút thắt cổ chai, điểm nghẽn', example: 'Manual approval became the main bottleneck in the workflow.' },
      { word: 'exclusively', pos: 'Trạng từ', ipa: '/ɪkˈskluː.sɪv.li/', meaningVi: 'chỉ dành riêng cho, độc quyền', example: 'This room is reserved exclusively for conference speakers.' },
    ],
    questions: [
      {
        id: 'rm1-q1',
        type: 'mcq',
        skill: 'reading',
        prompt: 'What is the main purpose of Minh Tran’s email?',
        options: [
          'To cancel the Q4 product completely due to budget cuts',
          'To propose delaying the public launch by two weeks while running a limited beta',
          'To ask marketing to fire the third-party payment provider',
          'To announce that the security audit was already signed off',
        ],
        correctAnswer: 'To propose delaying the public launch by two weeks while running a limited beta',
        explanationVi: 'Đoạn 3 nêu rõ: đề xuất dời ngày ra mắt đại chúng sang 12/12 trong khi vẫn chạy private beta cho 20 khách hàng doanh nghiệp.',
        weaknessTag: 'reading_main_idea',
      },
      {
        id: 'rm1-q2',
        type: 'mcq',
        skill: 'reading',
        prompt: 'Why cannot the team easily launch on November 28 even if they accept minor latency?',
        options: [
          'The core user interface has not been designed yet.',
          'The external compliance reviewer needs five extra business days to approve the encryption flow.',
          'Twenty enterprise clients refused to join the beta program.',
          'All backend engineers are currently on annual leave.',
        ],
        correctAnswer: 'The external compliance reviewer needs five extra business days to approve the encryption flow.',
        explanationVi: 'Đoạn 2: đơn vị kiểm duyệt tuân thủ bên ngoài yêu cầu thêm 5 ngày làm việc để xác minh quy trình mã hóa trước khi ký duyệt chính thức.',
        weaknessTag: 'reading_detail',
      },
      {
        id: 'rm1-q3',
        type: 'mcq',
        skill: 'reading',
        prompt: 'In paragraph 3, what does the phrase "extra breathing room" most closely mean?',
        options: [
          'A larger physical office for the marketing team',
          'Additional time and flexibility without urgent pressure',
          'Higher server bandwidth for video streaming',
          'Permission to skip automated stress testing',
        ],
        correctAnswer: 'Additional time and flexibility without urgent pressure',
        explanationVi: '"Breathing room" là thành ngữ B2 chỉ khoảng thời gian/không gian dư dả để thở, giảm áp lực gấp gáp.',
        weaknessTag: 'reading_vocab_context',
      },
      {
        id: 'rm1-q4',
        type: 'true_false',
        skill: 'reading',
        prompt: 'True or False: Two senior backend engineers were moved away from the payment integration project to build an internal analytics dashboard.',
        options: ['True', 'False'],
        correctAnswer: 'False',
        explanationVi: 'Ngược lại: hai kỹ sư được điều chuyển TỪ dashboard phân tích nội bộ SANG tập trung kiểm thử chịu tải tự động cho đợt phát hành.',
        weaknessTag: 'reading_detail',
      },
    ],
  },

  // =========================================================
  // 2. EMAIL: GREEN CITIES FORUM INVITATION
  // =========================================================
  {
    id: 'read-mail-2',
    category: 'mail',
    categoryLabelVi: 'Email Sự kiện',
    level: 'B1+',
    title: 'Official Invitation: Asia-Pacific Green Cities Forum & Speaker Guidelines',
    subtitleVi: 'Thư mời diễn giả tham dự diễn đàn Đô thị Xanh kèm hướng dẫn chuẩn bị slide, lịch trình và quyền lợi di chuyển.',
    readMinutes: 4,
    tags: ['Events', 'Formal Email', 'Sustainability'],
    emailMeta: {
      from: 'Program Committee <speakers@apgreencities.org>',
      to: 'Dr. Lan Pham <lan.pham@urbanlab.vn>',
      subject: 'Invitation & Logistics: Asia-Pacific Green Cities Forum 2026',
      date: 'Thu, 12 Nov • 14:15 PM',
    },
    paragraphs: [
      {
        heading: 'Formal Invitation',
        en: 'Dear Dr. Pham, on behalf of the Asia-Pacific Green Cities Organizing Committee, we are delighted to invite you to speak at our annual forum taking place in Singapore from December 4 to December 6. Following the strong reception of your recent research on sponge-city drainage systems, our program board would love to feature your insights during the opening afternoon panel titled "Designing Resilient Neighborhoods".',
        vi: 'Kính gửi Tiến sĩ Phạm, thay mặt Ban Tổ chức Diễn đàn Đô thị Xanh Châu Á - Thái Bình Dương, chúng tôi hân hạnh mời bà tham gia phát biểu tại diễn đàn thường niên diễn ra ở Singapore từ ngày 4 đến 6/12. Sau phản hồi tích cực từ nghiên cứu gần đây của bà về hệ thống thoát nước đô thị thấm hút, hội đồng chương trình rất mong được lắng nghe chia sẻ của bà trong phiên thảo luận chiều khai mạc mang tên "Thiết kế khu dân cư chống chịu biến đổi".',
      },
      {
        heading: 'Session Format & Audience',
        en: 'The panel brings together municipal planners, civil engineers, and community advocates from twelve countries. Each speaker will deliver a concise ten-minute visual briefing before joining a forty-minute moderated Q&A with roughly four hundred attendees. Because the audience includes both technical specialists and non-expert policymakers, we encourage minimizing dense jargon in favor of practical case studies and measurable outcomes.',
        vi: 'Phiên thảo luận quy tụ các nhà quy hoạch đô thị, kỹ sư xây dựng và đại diện cộng đồng từ mười hai quốc gia. Mỗi diễn giả sẽ trình bày phần tóm tắt trực quan súc tích trong mười phút trước khi bước vào phần hỏi đáp có điều phối dài bốn mươi phút cùng khoảng bốn trăm khách tham dự. Do khán giả gồm cả chuyên gia kỹ thuật lẫn các nhà hoạch định chính sách không chuyên sâu, chúng tôi khuyến khích hạn chế thuật ngữ quá nặng và ưu tiên các tình huống thực tế cùng số liệu đo lường cụ thể.',
      },
      {
        heading: 'Travel Support & Deadlines',
        en: 'As an invited panelist, your round-trip economy airfare, three nights of accommodation at the Marina Convention Hotel, and conference pass will be fully covered by our foundation. Should you choose to extend your stay over the weekend for personal sightseeing, our travel desk can adjust your return ticket accordingly at your own expense.',
        vi: 'Với tư cách diễn giả khách mời, vé máy bay khứ hồi hạng phổ thông, ba đêm lưu trú tại khách sạn Marina Convention và thẻ tham dự hội nghị sẽ được quỹ của chúng tôi tài trợ toàn bộ. Nếu bà muốn gia hạn lưu trú qua cuối tuần để tham quan cá nhân, bộ phận lữ hành có thể điều chỉnh vé về theo nhu cầu với chi phí chênh lệch tự túc.',
      },
      {
        en: 'To ensure smooth technical rehearsals, please confirm your participation by November 18 and upload your draft presentation slides to the speaker portal no later than November 27. Do not hesitate to reach out if you require an official invitation letter for visa processing or institutional approval.',
        vi: 'Để đảm bảo buổi tổng duyệt kỹ thuật diễn ra suôn sẻ, xin vui lòng xác nhận tham dự trước ngày 18/11 và tải bản nháp slide thuyết trình lên cổng diễn giả chậm nhất vào ngày 27/11. Xin đừng ngần ngại liên hệ nếu bà cần thư mời chính thức để làm thủ tục thị thực hoặc xin phép cơ quan công tác.',
      },
      {
        heading: 'Networking & Media Coverage',
        en: 'Beyond the formal stage sessions, you are warmly invited to join an evening roundtable dinner hosted at the Botanical Conservatory on December 5. This smaller gathering gives visiting researchers and city mayors a relaxed setting to exchange pilot-project proposals and explore cross-border funding grants for 2027.',
        vi: 'Ngoài các phiên hội trường chính thức, bà còn được trân trọng mời tham dự bữa tối bàn tròn giao lưu tổ chức tại Nhà kính Thực vật vào tối 5/12. Buổi gặp gỡ quy mô nhỏ này tạo không gian cởi mở để các nhà nghiên cứu khách mời và thị trưởng các thành phố trao đổi đề xuất dự án thí điểm cũng như tìm kiếm nguồn tài trợ xuyên biên giới cho năm 2027.',
      },
      {
        en: 'Please also note that our communications team records all main-stage panels for educational archiving and post-event summaries. If there are specific unpublished slides or proprietary city datasets you prefer not to have broadcast publicly, simply flag them inside the speaker portal when uploading your final deck. We look forward very much to welcoming you in Singapore.',
        vi: 'Xin lưu ý thêm rằng đội truyền thông của chúng tôi sẽ ghi hình toàn bộ phiên hội trường chính để lưu trữ học thuật và tóm tắt sau sự kiện. Nếu có slide chưa công bố hoặc bộ dữ liệu đô thị riêng tư nào bà muốn giữ kín không phát sóng công khai, xin chỉ cần đánh dấu trực tiếp trên cổng diễn giả khi nộp bản trình chiếu hoàn chỉnh. Chúng tôi rất mong được đón tiếp bà tại Singapore.',
      },
    ],
    glossary: [
      { word: 'resilient', pos: 'Tính từ', ipa: '/rɪˈzɪl.i.ənt/', meaningVi: 'có khả năng phục hồi, chống chịu tốt', example: 'Coastal cities need resilient infrastructure against flooding.' },
      { word: 'municipal', pos: 'Tính từ', ipa: '/mjuːˈnɪs.ɪ.pəl/', meaningVi: 'thuộc về thành phố / chính quyền đô thị', example: 'The municipal council approved three new bike lanes.' },
      { word: 'moderated', pos: 'Tính từ', ipa: '/ˈmɒd.ə.reɪtɪd/', meaningVi: 'có người điều phối dẫn dắt', example: 'A moderated discussion keeps speakers focused on the agenda.' },
      { word: 'dense jargon', pos: 'Cụm danh từ', ipa: '/dens ˈdʒɑː.ɡən/', meaningVi: 'thuật ngữ chuyên ngành dày đặc, khó hiểu', example: 'Avoid dense jargon when writing reports for general readers.' },
      { word: 'accommodation', pos: 'Danh từ', ipa: '/əˌkɒm.əˈdeɪ.ʃən/', meaningVi: 'chỗ ở, lưu trú', example: 'Hotel accommodation near the venue is included in the package.' },
      { word: 'rehearsal', pos: 'Danh từ', ipa: '/rɪˈhɜː.səl/', meaningVi: 'buổi diễn tập, tổng duyệt', example: 'We scheduled a microphone rehearsal thirty minutes before opening.' },
    ],
    questions: [
      {
        id: 'rm2-q1',
        type: 'mcq',
        skill: 'reading',
        prompt: 'Why did the organizers advise Dr. Pham to minimize dense jargon?',
        options: [
          'The session lasts only five minutes in total.',
          'The audience includes policymakers who may not have deep technical backgrounds.',
          'Simultaneous translators are unavailable for technical terms.',
          'Visual slides are not allowed during the opening panel.',
        ],
        correctAnswer: 'The audience includes policymakers who may not have deep technical backgrounds.',
        explanationVi: 'Đoạn 2: khán giả gồm cả chuyên gia kỹ thuật lẫn các nhà hoạch định chính sách không chuyên sâu ("non-expert policymakers").',
        weaknessTag: 'reading_detail',
      },
      {
        id: 'rm2-q2',
        type: 'mcq',
        skill: 'reading',
        prompt: 'Which expense is NOT covered by the foundation according to the email?',
        options: [
          'Round-trip economy flights for the conference dates',
          'Three hotel nights at Marina Convention Hotel',
          'Extra hotel nights if Dr. Pham extends her trip for weekend sightseeing',
          'Official conference admission pass',
        ],
        correctAnswer: 'Extra hotel nights if Dr. Pham extends her trip for weekend sightseeing',
        explanationVi: 'Đoạn 3: nếu gia hạn ở lại cuối tuần tham quan cá nhân, chi phí phát sinh do diễn giả tự túc ("at your own expense").',
        weaknessTag: 'reading_detail',
      },
      {
        id: 'rm2-q3',
        type: 'mcq',
        skill: 'reading',
        prompt: 'By which date must Dr. Pham submit her draft presentation slides?',
        options: ['November 18', 'November 27', 'December 4', 'December 6'],
        correctAnswer: 'November 27',
        explanationVi: '18/11 là hạn xác nhận tham dự; 27/11 ("no later than November 27") là hạn tải bản nháp slide.',
        weaknessTag: 'reading_scanning',
      },
      {
        id: 'rm2-q4',
        type: 'true_false',
        skill: 'reading',
        prompt: 'True or False: Each panelist will spend 40 minutes giving an individual solo presentation.',
        options: ['True', 'False'],
        correctAnswer: 'False',
        explanationVi: 'Mỗi diễn giả chỉ trình bày 10 phút; 40 phút là phần hỏi đáp (Q&A) chung có điều phối với khán giả.',
        weaknessTag: 'reading_detail',
      },
    ],
  },

  // =========================================================
  // 3. EMAIL: CLIENT SERVICE RECOVERY
  // =========================================================
  {
    id: 'read-mail-3',
    category: 'mail',
    categoryLabelVi: 'Email Khách hàng',
    level: 'B2',
    title: 'Follow-up: Onboarding Feedback & 30-Day Service Recovery Plan',
    subtitleVi: 'Thư xin lỗi và kế hoạch khắc phục 30 ngày gửi khách hàng doanh nghiệp sau sự cố đồng bộ dữ liệu ban đầu.',
    readMinutes: 5,
    tags: ['Customer Success', 'Formal Tone', 'Problem Solving'],
    emailMeta: {
      from: 'Elena Morales <elena@cloudbridge.com>',
      to: 'David Chen, Operations Director at Horizon Retail',
      subject: 'Action Plan Following Yesterday’s Onboarding Review',
      date: 'Tue, 11 Nov • 16:05 PM',
    },
    paragraphs: [
      {
        en: 'Dear David, thank you for speaking candidly with our leadership team yesterday afternoon regarding the delays Horizon Retail experienced during week two of deployment. We recognize that inconsistent inventory synchronization forced your warehouse staff to cross-check spreadsheets manually—precisely the burden our software was meant to eliminate.',
        vi: 'Chào David, cảm ơn ông đã trao đổi thẳng thắn với ban lãnh đạo của chúng tôi chiều qua về những chậm trễ mà Horizon Retail gặp phải trong tuần thứ hai triển khai. Chúng tôi nhận thức rằng việc đồng bộ tồn kho thiếu ổn định đã buộc nhân viên kho của ông phải đối chiếu thủ công trên bảng tính—chính xác là gánh nặng mà phần mềm của chúng tôi lẽ ra phải loại bỏ.',
      },
      {
        heading: 'Root Cause Identified',
        en: 'Following our engineering post-mortem, we traced the disruption to an outdated webhook configuration that throttled bulk updates whenever more than ten thousand stock-keeping units changed simultaneously. While a hotfix was deployed late last night to lift that ceiling, we understand that restoring your confidence requires transparent accountability rather than quick patches alone.',
        vi: 'Sau buổi phân tích nguyên nhân gốc rễ từ đội kỹ thuật, chúng tôi xác định sự cố bắt nguồn từ một cấu hình webhook cũ khiến hệ thống bóp băng thông các lượt cập nhật hàng loạt mỗi khi có trên mười nghìn mã hàng thay đổi cùng lúc. Dù bản vá khẩn cấp đã được triển khai tối qua để gỡ bỏ giới hạn đó, chúng tôi hiểu rằng để lấy lại niềm tin của ông cần sự cam kết minh bạch lâu dài chứ không chỉ những bản vá nhanh.',
      },
      {
        heading: '30-Day Commitments',
        en: 'Effective immediately, we are assigning a dedicated technical account manager to oversee your upcoming holiday-season traffic at no extra charge. In addition, we have credited your November subscription invoice by thirty percent in recognition of the operational inconvenience caused to your team.',
        vi: 'Có hiệu lực ngay lập tức, chúng tôi bố trí một quản lý tài khoản kỹ thuật chuyên trách theo sát lưu lượng mùa mua sắm lễ hội sắp tới của quý công ty hoàn toàn miễn phí. Ngoài ra, chúng tôi đã khấu trừ giảm ba mươi phần trăm hóa đơn thuê bao tháng 11 nhằm ghi nhận sự bất tiện vận hành đã gây ra cho đội ngũ của ông.',
      },
      {
        en: 'Going forward, you will receive automated daily reconciliation summaries at 8:00 AM so your supervisors can verify stock accuracy in under two minutes. Please let me know if your IT lead would like to review our updated Service-Level Agreement addendum during Friday’s check-in call.',
        vi: 'Từ nay về sau, quý công ty sẽ nhận báo cáo đối soát tự động mỗi ngày lúc 8 giờ sáng để các giám sát viên kiểm tra độ chính xác tồn kho trong chưa đầy hai phút. Xin cho tôi biết nếu trưởng nhóm IT của ông muốn xem qua phụ lục Cam kết Chất lượng Dịch vụ (SLA) cập nhật trong cuộc gọi trao đổi thứ Sáu tới.',
      },
      {
        heading: 'Staff Training & Escalation Channel',
        en: 'To ensure your store managers feel completely comfortable with the updated error-alert dashboard, we would also be happy to run two live forty-minute refresher workshops tailored to your regional shifts. Recording links and step-by-step troubleshooting checklists will be shared immediately afterward so newly hired warehouse coordinators can catch up at their own pace.',
        vi: 'Để các quản lý cửa hàng của ông hoàn toàn yên tâm khi thao tác trên bảng cảnh báo lỗi mới, chúng tôi cũng sẵn lòng tổ chức thêm hai buổi hướng dẫn ôn lại trực tiếp dài bốn mươi phút điều chỉnh theo ca làm việc từng khu vực. Liên kết video ghi hình cùng bảng kiểm xử lý sự cố từng bước sẽ được gửi ngay sau đó để nhân sự điều phối kho mới nhận việc có thể tự nắm bắt theo nhịp độ riêng.',
      },
      {
        en: 'Should any discrepancy ever reappear during high-volume flash sales, your supervisors can trigger our priority hotline directly inside the admin console, guaranteeing an engineer response within fifteen minutes. Once again, thank you for giving us the opportunity to make this right and build a far more dependable partnership ahead.',
        vi: 'Nếu bất kỳ sai lệch nào tái diễn trong các đợt giảm giá lưu lượng lớn, giám sát viên của quý công ty có thể kích hoạt đường dây nóng ưu tiên ngay trong bảng điều khiển quản trị, đảm bảo kỹ sư phản hồi trong vòng mười lăm phút. Một lần nữa, xin cảm ơn ông đã trao cho chúng tôi cơ hội khắc phục và xây dựng mối quan hệ hợp tác đáng tin cậy hơn nữa sắp tới.',
      },
    ],
    glossary: [
      { word: 'candidly', pos: 'Trạng từ', ipa: '/ˈkæn.dɪd.li/', meaningVi: 'một cách thẳng thắn, bộc trực', example: 'Stakeholders spoke candidly about what went wrong in Q1.' },
      { word: 'synchronization', pos: 'Danh từ', ipa: '/ˌsɪŋ.krə.naɪˈzeɪ.ʃən/', meaningVi: 'sự đồng bộ hóa', example: 'Real-time synchronization prevents double-booking errors.' },
      { word: 'post-mortem', pos: 'Danh từ', ipa: '/ˌpəʊstˈmɔː.təm/', meaningVi: 'buổi mổ xẻ rút kinh nghiệm sau sự cố', example: 'Every outage is followed by a blameless engineering post-mortem.' },
      { word: 'accountability', pos: 'Danh từ', ipa: '/əˌkaʊn.təˈbɪl.ə.ti/', meaningVi: 'tinh thần chịu trách nhiệm giải trình', example: 'Clear accountability builds long-term client trust.' },
      { word: 'reconciliation', pos: 'Danh từ', ipa: '/ˌrek.ənˌsɪl.iˈeɪ.ʃən/', meaningVi: 'sự đối chiếu, khớp số liệu', example: 'Automated billing reconciliation saves hours every Friday.' },
      { word: 'addendum', pos: 'Danh từ', ipa: '/əˈden.dəm/', meaningVi: 'phụ lục bổ sung (vào hợp đồng)', example: 'Both parties signed an addendum covering extended support hours.' },
    ],
    questions: [
      {
        id: 'rm3-q1',
        type: 'mcq',
        skill: 'reading',
        prompt: 'What originally triggered the inventory synchronization failure?',
        options: [
          'Horizon Retail’s warehouse staff accidentally deleted spreadsheets.',
          'An outdated webhook configuration restricted updates exceeding 10,000 SKUs at once.',
          'Holiday traffic crashed the client’s physical servers.',
          'The IT lead forgot to sign the Service-Level Agreement.',
        ],
        correctAnswer: 'An outdated webhook configuration restricted updates exceeding 10,000 SKUs at once.',
        explanationVi: 'Đoạn 2: cấu hình webhook cũ đã giới hạn ("throttled") lượt cập nhật khi hơn 10.000 mã hàng thay đổi đồng thời.',
        weaknessTag: 'reading_detail',
      },
      {
        id: 'rm3-q2',
        type: 'mcq',
        skill: 'reading',
        prompt: 'Which two goodwill measures did CloudBridge offer immediately?',
        options: [
          'Full contract cancellation and a new warehouse scanner',
          'A free dedicated technical account manager and a 30% credit on November’s invoice',
          'Two months of free service and three extra backend engineers on-site',
          'A refund for all annual licenses and custom dashboard branding',
        ],
        correctAnswer: 'A free dedicated technical account manager and a 30% credit on November’s invoice',
        explanationVi: 'Đoạn 3: cử technical account manager chuyên trách miễn phí + giảm trừ 30% hóa đơn tháng 11.',
        weaknessTag: 'reading_detail',
      },
      {
        id: 'rm3-q3',
        type: 'mcq',
        skill: 'reading',
        prompt: 'How would you best describe the tone of Elena’s email?',
        options: [
          'Defensive and eager to blame the client’s staff',
          'Accountable, empathetic, and solution-oriented',
          'Casual and overly humorous despite a serious issue',
          'Vague and hesitant to share technical details',
        ],
        correctAnswer: 'Accountable, empathetic, and solution-oriented',
        explanationVi: 'Tác giả thẳng thắn nhận lỗi, chia sẻ nguyên nhân gốc rễ, đưa ra bồi thường và giải pháp phòng ngừa cụ thể.',
        weaknessTag: 'reading_tone',
      },
      {
        id: 'rm3-q4',
        type: 'true_false',
        skill: 'reading',
        prompt: 'True or False: CloudBridge plans to send daily reconciliation summaries at 8:00 AM starting from now on.',
        options: ['True', 'False'],
        correctAnswer: 'True',
        explanationVi: 'Đoạn 4 xác nhận: "Going forward, you will receive automated daily reconciliation summaries at 8:00 AM".',
        weaknessTag: 'reading_scanning',
      },
    ],
  },

  // =========================================================
  // 4. EVENT: SMART MOBILITY EXPO
  // =========================================================
  {
    id: 'read-event-1',
    category: 'event',
    categoryLabelVi: 'Phóng sự Sự kiện',
    level: 'B1+',
    title: 'Smart Mobility Expo 2026: How Mid-Sized Cities Are Redesigning Commutes',
    subtitleVi: 'Tường thuật triển lãm giao thông thông minh: bài học chuyển đổi từ xe cá nhân sang xe buýt điện và vé liên thông.',
    readMinutes: 5,
    tags: ['Urban Transit', 'Expo Report', 'Technology'],
    paragraphs: [
      {
        heading: 'Shifting Focus from Mega-Projects to Everyday Streets',
        en: 'Over twenty thousand urban planners, transit operators, and technology founders gathered in Bangkok last week for the annual Smart Mobility Expo. Unlike earlier editions dominated by futuristic flying-taxi prototypes, this year’s exhibition floor focused heavily on affordable, practical upgrades that mid-sized cities can deploy within twelve months.',
        vi: 'Hơn hai mươi nghìn nhà quy hoạch đô thị, đơn vị vận hành giao thông công cộng và nhà sáng lập công nghệ đã quy tụ tại Bangkok tuần trước trong khuôn khổ Triển lãm Di chuyển Thông minh thường niên. Khác với những kỳ trước vốn tràn ngập các mẫu taxi bay viễn tưởng, khu trưng bày năm nay tập trung mạnh vào những nâng cấp thiết thực, chi phí hợp lý mà các đô thị quy mô vừa có thể triển khai trong vòng mười hai tháng.',
      },
      {
        heading: 'The "First-and-Last-Mile" Breakthrough',
        en: 'One clear consensus emerged across keynote panels: commuters rarely abandon private motorbikes or cars simply because a single metro line opens. Instead, adoption surges when cities solve the "first-and-last-mile" puzzle—making the walk or shuttle ride between home and the nearest station safe, shaded, and predictable.',
        vi: 'Một sự đồng thuận rõ rệt đã hình thành xuyên suốt các phiên tọa đàm chính: người đi làm hiếm khi từ bỏ xe máy hay ô tô cá nhân chỉ vì một tuyến tàu điện mới khai trương. Thay vào đó, tỷ lệ chuyển sang phương tiện công cộng tăng vọt khi thành phố giải được bài toán "dặm đầu và dặm cuối"—biến quãng đường đi bộ hoặc xe trung chuyển từ nhà ra trạm trở nên an toàn, có bóng mát và đúng giờ.',
      },
      {
        en: 'Several municipalities showcased unified fare cards that let passengers tap once across electric feeder buses, river ferries, and shared bicycles without paying duplicate base fares. In a pilot district presented by Chiang Mai’s transit authority, combining shaded bus shelters with real-time arrival screens boosted daily ridership by thirty-four percent in just two quarters.',
        vi: 'Nhiều địa phương đã giới thiệu thẻ vé hợp nhất cho phép hành khách chạm một lần để đi liên thông xe buýt điện gom khách, phà sông và xe đạp công cộng mà không phải trả phí mở cửa nhiều lần. Tại một quận thí điểm do cơ quan giao thông Chiang Mai trình bày, việc kết hợp nhà chờ xe buýt có mái che với bảng hiển thị giờ xe đến theo thời gian thực đã tăng lượng khách hằng ngày thêm 34% chỉ sau hai quý.',
      },
      {
        heading: 'Looking Ahead',
        en: 'Of course, hardware alone cannot transform commuter habits overnight. Speakers emphasized that transparent bus-lane enforcement and employer transit subsidies remain equally critical if regional cities hope to cut congestion while lowering carbon emissions.',
        vi: 'Dĩ nhiên, chỉ riêng phần cứng không thể thay đổi thói quen đi lại trong một sớm một chiều. Các diễn giả nhấn mạnh rằng việc thực thi nghiêm làn xe buýt chuyên biệt và chính sách trợ cấp đi lại từ phía doanh nghiệp vẫn giữ vai trò quan trọng không kém nếu các đô thị trong khu vực muốn vừa giảm ùn tắc vừa cắt giảm phát thải carbon.',
      },
      {
        en: 'Another standout theme was data sharing between municipal agencies and private ride-hailing platforms. When anonymized origin-destination maps are analyzed alongside weather forecasts, dispatchers can pre-position extra electric vans outside university campuses and industrial parks just before evening rainstorms hit.',
        vi: 'Một chủ đề nổi bật khác là việc chia sẻ dữ liệu giữa cơ quan giao thông đô thị và các nền tảng đặt xe tư nhân. Khi bản đồ điểm đi-đến đã ẩn danh được phân tích kết hợp dự báo thời tiết, bộ phận điều phối có thể bố trí sẵn thêm xe điện trung chuyển bên ngoài khuôn viên đại học và khu công nghiệp ngay trước khi cơn mưa chiều ập tới.',
      },
      {
        en: 'By the closing ceremony, delegates from nine neighboring provinces signed a joint memorandum pledging open technical standards for digital transit passes by late next year. For ordinary commuters tired of juggling three different apps and paper tickets, that quiet agreement may turn out to be the Expo’s most consequential achievement.',
        vi: 'Đến lễ bế mạc, đại biểu từ chín tỉnh lân cận đã ký bản ghi nhớ chung cam kết áp dụng chuẩn kỹ thuật mở cho thẻ giao thông số vào cuối năm sau. Với những người đi làm bình thường vốn mệt mỏi vì phải xoay xở ba ứng dụng khác nhau cùng vé giấy, thỏa thuận thầm lặng đó có thể chính là thành tựu có sức ảnh hưởng lớn nhất của triển lãm.',
      },
    ],
    glossary: [
      { word: 'consensus', pos: 'Danh từ', ipa: '/kənˈsen.səs/', meaningVi: 'sự đồng thuận chung', example: 'The panel reached a consensus on prioritizing pedestrian safety.' },
      { word: 'commuter', pos: 'Danh từ', ipa: '/kəˈmjuː.tər/', meaningVi: 'người đi làm/đi học hằng ngày giữa nhà và nơi làm việc', example: 'Morning commuters welcomed the expanded express bus route.' },
      { word: 'unified', pos: 'Tính từ', ipa: '/ˈjuː.nɪ.faɪd/', meaningVi: 'được thống nhất, hợp nhất', example: 'A unified ticketing app simplifies transfers across different lines.' },
      { word: 'ridership', pos: 'Danh từ', ipa: '/ˈraɪ.də.ʃɪp/', meaningVi: 'lượng hành khách sử dụng dịch vụ vận tải', example: 'Weekend ridership doubled after night trains were introduced.' },
      { word: 'enforcement', pos: 'Danh từ', ipa: '/ɪnˈfɔːs.mənt/', meaningVi: 'sự thực thi nghiêm (luật/quy định)', example: 'Without camera enforcement, private cars keep blocking bus lanes.' },
      { word: 'subsidy', pos: 'Danh từ', ipa: '/ˈsʌb.sɪ.di/', meaningVi: 'khoản trợ cấp, hỗ trợ tài chính', example: 'Many companies offer monthly transit subsidies to staff.' },
    ],
    questions: [
      {
        id: 're1-q1',
        type: 'mcq',
        skill: 'reading',
        prompt: 'How did this year’s Smart Mobility Expo differ from earlier editions?',
        options: [
          'It banned all electric vehicles from the exhibition floor.',
          'It shifted focus away from futuristic prototypes toward practical solutions deployable within a year.',
          'Only flying-taxi startups were invited to speak.',
          'Attendance dropped sharply because it moved outside Asia.',
        ],
        correctAnswer: 'It shifted focus away from futuristic prototypes toward practical solutions deployable within a year.',
        explanationVi: 'Đoạn 1: thay vì các mẫu taxi bay viễn tưởng như trước, triển lãm năm nay tập trung vào nâng cấp thiết thực có thể triển khai trong 12 tháng.',
        weaknessTag: 'reading_main_idea',
      },
      {
        id: 're1-q2',
        type: 'mcq',
        skill: 'reading',
        prompt: 'What helped Chiang Mai’s pilot district increase daily ridership by 34%?',
        options: [
          'Removing all traffic lights on main highways',
          'Offering free private cars to office workers',
          'Combining shaded bus shelters with real-time arrival displays',
          'Banning shared bicycles near river ferries',
        ],
        correctAnswer: 'Combining shaded bus shelters with real-time arrival displays',
        explanationVi: 'Đoạn 3 nêu rõ: nhà chờ có mái che + màn hình giờ xe đến theo thời gian thực giúp tăng 34% lượng khách sau 2 quý.',
        weaknessTag: 'reading_detail',
      },
      {
        id: 're1-q3',
        type: 'mcq',
        skill: 'reading',
        prompt: 'What does the author imply in the final paragraph?',
        options: [
          'Technology and infrastructure work best when paired with traffic enforcement and supportive policies.',
          'Installing digital screens alone is enough to eliminate traffic congestion.',
          'Employers should discourage workers from taking public buses.',
          'Carbon emissions cannot be reduced in mid-sized cities.',
        ],
        correctAnswer: 'Technology and infrastructure work best when paired with traffic enforcement and supportive policies.',
        explanationVi: 'Đoạn 4: "hardware alone cannot transform commuter habits... enforcement and employer transit subsidies remain equally critical".',
        weaknessTag: 'reading_inference',
      },
      {
        id: 're1-q4',
        type: 'true_false',
        skill: 'reading',
        prompt: 'True or False: Unified fare cards require passengers to pay a fresh base fare every time they transfer between bus and ferry.',
        options: ['True', 'False'],
        correctAnswer: 'False',
        explanationVi: 'Đoạn 3: "...without paying duplicate base fares" (không phải trả phí mở cửa trùng lặp).',
        weaknessTag: 'reading_detail',
      },
    ],
  },

  // =========================================================
  // 5. EVENT: CLEAN-TECH HACKATHON
  // =========================================================
  {
    id: 'read-event-2',
    category: 'event',
    categoryLabelVi: 'Tin tức Sự kiện',
    level: 'B1+',
    title: '48 Hours at the Regional Clean-Tech Hackathon: Solving Urban Water Waste',
    subtitleVi: 'Câu chuyện 48 giờ căng thẳng tại cuộc thi công nghệ sạch, nơi sinh viên và kỹ sư trẻ tạo nguyên mẫu giảm lãng phí nước.',
    readMinutes: 4,
    tags: ['Hackathon', 'Innovation', 'Environment'],
    paragraphs: [
      {
        heading: 'From Blank Whiteboards to Working Prototypes',
        en: 'By Friday evening at 7:00 PM, the atrium of the National Innovation Center buzzed with more than three hundred university students, environmental scientists, and software developers. Their challenge for the weekend was deceptively simple: design a low-cost solution to detect hidden water leaks or recycle greywater across dense apartment complexes within forty-eight hours.',
        vi: 'Vào tối thứ Sáu lúc 19 giờ, sảnh lớn Trung tâm Đổi mới Sáng tạo Quốc gia rộn ràng với hơn ba trăm sinh viên đại học, nhà khoa học môi trường và lập trình viên. Thử thách cuối tuần của họ nghe qua tưởng chừng đơn giản: trong vòng 48 giờ, thiết kế một giải pháp chi phí thấp để phát hiện rò rỉ nước ngầm hoặc tái sử dụng nước xám trong các khu chung cư đông đúc.',
      },
      {
        en: 'For Team AquaPulse—four undergraduates who had never worked together prior to opening night—the hardest hurdle was not coding, but narrowing down their ambition. During Saturday morning mentorship rounds, a municipal water engineer warned them that building a whole-city sensor grid would be unrealistic within a single weekend. Acting on that feedback, the quartet pivoted to acoustic clip-on sensors designed specifically for residential pipes.',
        vi: 'Với nhóm AquaPulse—bốn sinh viên chưa từng làm việc cùng nhau trước đêm khai mạc—rào cản lớn nhất không phải viết mã mà là thu hẹp tham vọng ban đầu. Trong vòng cố vấn sáng thứ Bảy, một kỹ sư cấp nước đô thị cảnh báo rằng việc làm mạng cảm biến toàn thành phố trong một cuối tuần là bất khả thi. Lắng nghe góp ý đó, cả nhóm nhanh chóng chuyển hướng sang thiết bị cảm biến âm thanh kẹp trực tiếp lên đường ống dân dụng.',
      },
      {
        heading: 'Late-Night Calibration & Judging',
        en: 'Armed with inexpensive microphones, plastic pipe fittings, and an open-source anomaly-detection model, AquaPulse spent Saturday night calibrating their device against running taps, flushing toilets, and simulated pinhole leaks. By Sunday morning’s pitch deadline, their prototype could distinguish normal household water flow from a slow continuous drip with eighty-nine percent accuracy.',
        vi: 'Với những chiếc micro giá rẻ, ống nhựa thử nghiệm và mô hình phát hiện bất thường mã nguồn mở, AquaPulse thức trắng đêm thứ Bảy để hiệu chỉnh thiết bị phân biệt tiếng xả vòi, xả bồn cầu và vết rò rỉ nhỏ mô phỏng. Trước hạn chót thuyết trình sáng Chủ nhật, nguyên mẫu của họ đã phân biệt được dòng chảy sinh hoạt bình thường với rò rỉ nhỏ liên tục với độ chính xác 89%.',
      },
      {
        en: 'Although first prize ultimately went to a team building modular rooftop filtration units for older dormitories, AquaPulse walked away with the Best Field-Ready Prototype award and an invitation to pilot their sensor in two local housing blocks next spring.',
        vi: 'Dù giải nhất chung cuộc thuộc về một đội phát triển hệ thống lọc nước lắp ghép trên mái cho ký túc xá cũ, AquaPulse vẫn giành giải Nguyên mẫu Sẵn sàng Thực địa Tốt nhất cùng lời mời thử nghiệm cảm biến tại hai tòa nhà dân cư địa phương vào mùa xuân tới.',
      },
      {
        heading: 'Lessons Beyond Competition',
        en: 'What impressed judges most across all sixty competing groups was not flashy slide animations, but how willing young engineers were to interview building maintenance workers by phone before writing a single line of code. Several finalists discovered that complex cloud dashboards fail in real basements simply because Wi-Fi signals rarely penetrate thick concrete utility shafts.',
        vi: 'Điều khiến ban giám khảo ấn tượng nhất ở tất cả sáu mươi đội thi không phải hiệu ứng slide bóng bẩy, mà là sự chủ động của các kỹ sư trẻ khi gọi điện phỏng vấn nhân viên bảo trì tòa nhà trước cả lúc viết dòng mã đầu tiên. Nhiều đội vào chung kết nhận ra các bảng điều khiển đám mây phức tạp dễ thất bại ở tầng hầm thực tế chỉ vì sóng Wi-Fi hiếm khi xuyên qua được hộp kỹ thuật bê tông dày.',
      },
      {
        en: 'For AquaPulse, storing lightweight diagnostic alerts locally via low-power Bluetooth solved that connectivity gap while keeping component costs below eighteen dollars per unit. As university organizers prepare next year’s edition, they plan to expand the real-world testing window so promising weekend inventions can transition smoothly into neighborhood infrastructure.',
        vi: 'Với AquaPulse, việc lưu cảnh báo chẩn đoán gọn nhẹ tại chỗ qua Bluetooth tiết kiệm năng lượng đã giải quyết trọn vẹn khoảng trống kết nối đó, đồng thời giữ chi phí linh kiện dưới mười tám đô la mỗi thiết bị. Khi ban tổ chức đại học chuẩn bị cho mùa giải năm sau, họ dự kiến mở rộng thời gian thử nghiệm thực tế để những phát minh cuối tuần giàu tiềm năng có thể chuyển tiếp mượt mà vào hạ tầng khu dân cư.',
      },
    ],
    glossary: [
      { word: 'deceptively', pos: 'Trạng từ', ipa: '/dɪˈsep.tɪv.li/', meaningVi: 'tưởng chừng như (nhưng thực chất phức tạp hơn)', example: 'The exam looked deceptively easy at first glance.' },
      { word: 'greywater', pos: 'Danh từ', ipa: '/ˈɡreɪˌwɔː.tər/', meaningVi: 'nước thải sinh hoạt nhẹ (từ bồn rửa, tắm giặt, chưa nhiễm bẩn nặng)', example: 'Filtered greywater can safely irrigate apartment gardens.' },
      { word: 'pivot', pos: 'Động từ', ipa: '/ˈpɪv.ət/', meaningVi: 'chuyển hướng chiến lược nhanh chóng', example: 'The startup had to pivot toward B2B software to survive.' },
      { word: 'calibrate', pos: 'Động từ', ipa: '/ˈkæl.ɪ.breɪt/', meaningVi: 'hiệu chỉnh, cân chỉnh độ chính xác', example: 'Technicians calibrated the air-quality monitors before testing.' },
      { word: 'anomaly', pos: 'Danh từ', ipa: '/əˈnɒm.ə.li/', meaningVi: 'điểm bất thường, sai lệch so với quy chuẩn', example: 'The dashboard flags any sudden anomaly in energy consumption.' },
      { word: 'modular', pos: 'Tính từ', ipa: '/ˈmɒdʒ.ʊ.lər/', meaningVi: 'dạng mô-đun lắp ghép linh hoạt', example: 'Modular classrooms can be expanded as enrollment grows.' },
    ],
    questions: [
      {
        id: 're2-q1',
        type: 'mcq',
        skill: 'reading',
        prompt: 'Why did Team AquaPulse change their original project idea on Saturday morning?',
        options: [
          'Their laptops failed to run the simulation software.',
          'A mentor pointed out that a city-wide sensor network was too ambitious for 48 hours.',
          'Another team had already patented the exact same sensor.',
          'Organizers changed the competition topic overnight.',
        ],
        correctAnswer: 'A mentor pointed out that a city-wide sensor network was too ambitious for 48 hours.',
        explanationVi: 'Đoạn 2: kỹ sư cấp nước cảnh báo mạng cảm biến toàn thành phố là không thực tế trong 1 cuối tuần nên nhóm thu hẹp lại.',
        weaknessTag: 'reading_detail',
      },
      {
        id: 're2-q2',
        type: 'mcq',
        skill: 'reading',
        prompt: 'What could AquaPulse’s Sunday prototype successfully do?',
        options: [
          'Filter rooftop rainwater for an entire dormitory',
          'Detect slow leaks versus normal tap usage with 89% accuracy',
          'Automatically shut off city water mains remotely',
          'Predict annual rainfall patterns across the region',
        ],
        correctAnswer: 'Detect slow leaks versus normal tap usage with 89% accuracy',
        explanationVi: 'Đoạn 3: phân biệt dòng chảy sinh hoạt bình thường với rò rỉ nhỏ liên tục đạt độ chính xác 89%.',
        weaknessTag: 'reading_scanning',
      },
      {
        id: 're2-q3',
        type: 'mcq',
        skill: 'reading',
        prompt: 'What happened to Team AquaPulse at the end of the hackathon?',
        options: [
          'They won overall first prize and $50,000 in cash.',
          'They went home empty-handed despite strong accuracy.',
          'They received a field-ready prototype award and a spring pilot opportunity.',
          'They merged with the rooftop filtration team.',
        ],
        correctAnswer: 'They received a field-ready prototype award and a spring pilot opportunity.',
        explanationVi: 'Đoạn 4: giành giải Best Field-Ready Prototype và được mời thử nghiệm tại 2 tòa nhà vào mùa xuân tới.',
        weaknessTag: 'reading_detail',
      },
      {
        id: 're2-q4',
        type: 'true_false',
        skill: 'reading',
        prompt: 'True or False: The four members of Team AquaPulse had collaborated on several hardware projects before the hackathon.',
        options: ['True', 'False'],
        correctAnswer: 'False',
        explanationVi: 'Đoạn 2 nói rõ: "four undergraduates who had never worked together prior to opening night".',
        weaknessTag: 'reading_detail',
      },
    ],
  },

  // =========================================================
  // 6. EVENT: REMOTE WORK SUMMIT
  // =========================================================
  {
    id: 'read-event-3',
    category: 'event',
    categoryLabelVi: 'Hội nghị Kinh tế',
    level: 'B2',
    title: 'Southeast Asia Remote Work Summit: Rethinking Productivity Beyond Hours',
    subtitleVi: 'Tổng kết hội nghị khu vực về làm việc linh hoạt: vì sao họp trực tuyến tràn lan lại làm giảm hiệu suất thực sự.',
    readMinutes: 5,
    tags: ['Remote Work', 'Leadership', 'Summit'],
    paragraphs: [
      {
        heading: 'The Paradox of Flexible Schedules',
        en: 'When distributed teams became mainstream several years ago, advocates predicted happier employees and lower office overhead. Yet according to survey data unveiled at this month’s Southeast Asia Remote Work Summit, nearly sixty percent of hybrid professionals report feeling more exhausted today than they did under traditional office routines.',
        vi: 'Khi mô hình làm việc phân tán trở nên phổ biến vài năm trước, những người ủng hộ từng dự đoán nhân viên sẽ hạnh phúc hơn còn chi phí văn phòng giảm xuống. Tuy nhiên, theo số liệu khảo sát được công bố tại Hội nghị Làm việc Từ xa Đông Nam Á tháng này, gần 60% nhân sự làm việc kết hợp (hybrid) cho biết họ cảm thấy kiệt sức hơn trước đây khi làm việc tại văn phòng truyền thống.',
      },
      {
        en: 'Keynote speaker Dr. Harish Nair explained that the culprit is rarely flexibility itself; rather, it is "performative availability"—the unwritten pressure to reply to chat messages instantaneously and keep calendars packed with back-to-back video calls to prove one is actually working.',
        vi: 'Diễn giả chính Tiến sĩ Harish Nair lý giải rằng thủ phạm hiếm khi nằm ở bản thân sự linh hoạt; thay vào đó, vấn đề là "sự hiện diện trình diễn"—áp lực ngầm buộc phải trả lời tin nhắn ngay lập tức và lấp kín lịch bằng các cuộc gọi video nối tiếp nhau để chứng minh mình đang thực sự làm việc.',
      },
      {
        heading: 'Asynchronous Practices That Actually Scale',
        en: 'Rather than issuing blanket return-to-office mandates, several regional tech employers presented concrete experiments in asynchronous collaboration. One Kuala Lumpur fintech firm replaced four recurring weekly status meetings with concise written memos posted every Monday afternoon, freeing up roughly six hours of uninterrupted focus time per engineer.',
        vi: 'Thay vì ban hành lệnh bắt buộc quay lại văn phòng đồng loạt, nhiều doanh nghiệp công nghệ trong khu vực đã chia sẻ những thử nghiệm cụ thể về cộng tác bất đồng bộ. Một công ty fintech tại Kuala Lumpur đã thay thế bốn cuộc họp cập nhật định kỳ hằng tuần bằng các bản ghi nhớ súc tích đăng vào chiều thứ Hai, qua đó giải phóng khoảng sáu giờ tập trung không bị gián đoạn cho mỗi kỹ sư.',
      },
      {
        en: 'Panelists nevertheless cautioned against swinging too far toward isolation. Early-career hires, in particular, still benefit enormously from structured in-person mentoring days twice a week, where informal questions can be answered in minutes instead of lingering in lengthy message threads.',
        vi: 'Tuy vậy, các diễn giả cũng cảnh báo không nên cực đoan hóa theo hướng cô lập hoàn toàn. Đặc biệt là nhân sự mới vào nghề vẫn hưởng lợi rất lớn từ hai ngày hướng dẫn trực tiếp có cấu trúc mỗi tuần, nơi những thắc mắc nhỏ có thể được giải đáp trong vài phút thay vì kéo dài qua hàng loạt chuỗi tin nhắn.',
      },
      {
        heading: 'Redefining Performance Metrics',
        en: 'Underlying these scheduling tweaks is a deeper shift in how managers measure contribution. When outcomes—such as customer resolution times, shipped code quality, or clear research briefs—replace "hours visibly active online" as the primary yardstick, anxiety drops across distributed teams.',
        vi: 'Ẩn sau những điều chỉnh lịch trình này là sự chuyển dịch sâu sắc hơn trong cách quản lý đo lường đóng góp. Khi kết quả thực tế—như thời gian xử lý yêu cầu khách hàng, chất lượng mã nguồn hoàn thiện hay báo cáo nghiên cứu rõ ràng—thay thế "số giờ sáng đèn trực tuyến" làm thước đo chính, mức độ căng thẳng trong các nhóm làm việc phân tán giảm xuống rõ rệt.',
      },
      {
        en: 'Looking toward 2027, several summit sponsors unveiled a regional benchmark toolkit helping mid-sized companies audit meeting clutter every quarter. The takeaway echoed across closing remarks was straightforward: sustainable flexibility succeeds not when employees work from everywhere at all hours, but when teams protect deliberate boundaries around both collaboration and rest.',
        vi: 'Hướng tới năm 2027, nhiều đơn vị tài trợ hội nghị đã công bố bộ công cụ đánh giá chuẩn khu vực giúp doanh nghiệp vừa kiểm toán tình trạng dư thừa cuộc họp hằng quý. Thông điệp đọng lại xuyên suốt phần bế mạc rất rõ ràng: sự linh hoạt bền vững chỉ thành công không phải khi nhân viên làm việc mọi lúc mọi nơi, mà khi tập thể biết bảo vệ ranh giới chủ động cho cả giờ cộng tác lẫn giờ nghỉ ngơi.',
      },
    ],
    glossary: [
      { word: 'overhead', pos: 'Danh từ', ipa: '/ˈəʊ.və.hed/', meaningVi: 'chi phí vận hành cố định (mặt bằng, điện nước...)', example: 'Sharing coworking spaces cuts fixed office overhead.' },
      { word: 'culprit', pos: 'Danh từ', ipa: '/ˈkʌl.prɪt/', meaningVi: 'thủ phạm, nguyên nhân cốt lõi', example: 'Poor sleep is often the main culprit behind afternoon fatigue.' },
      { word: 'performative', pos: 'Tính từ', ipa: '/pəˈfɔː.mə.tɪv/', meaningVi: 'mang tính trình diễn, làm màu cho người khác thấy', example: 'Staying online past midnight became performative busywork.' },
      { word: 'asynchronous', pos: 'Tính từ', ipa: '/eɪˈsɪŋ.krə.nəs/', meaningVi: 'bất đồng bộ (không cần online phản hồi cùng lúc)', example: 'Asynchronous updates work well across different time zones.' },
      { word: 'mandate', pos: 'Danh từ', ipa: '/ˈmæn.deɪt/', meaningVi: 'chỉ thị, quy định bắt buộc', example: 'Strict return-to-office mandates triggered staff pushback.' },
      { word: 'linger', pos: 'Động từ', ipa: '/ˈlɪŋ.ɡər/', meaningVi: 'kéo dài dai dẳng, nấn ná', example: 'Unanswered questions tend to linger in group chats.' },
    ],
    questions: [
      {
        id: 're3-q1',
        type: 'mcq',
        skill: 'reading',
        prompt: 'According to Dr. Harish Nair, why are many hybrid employees more exhausted today?',
        options: [
          'They spend too many hours commuting in heavy traffic.',
          'They feel pressured to stay constantly responsive on chat and attend endless video calls.',
          'Their home internet speeds are too slow for spreadsheets.',
          'Employers reduced annual vacation days for remote staff.',
        ],
        correctAnswer: 'They feel pressured to stay constantly responsive on chat and attend endless video calls.',
        explanationVi: 'Đoạn 2: "performative availability"—áp lực ngầm phải trả lời chat ngay lập tức và họp video liên miên để chứng tỏ mình đang làm việc.',
        weaknessTag: 'reading_detail',
      },
      {
        id: 're3-q2',
        type: 'mcq',
        skill: 'reading',
        prompt: 'What concrete result did the Kuala Lumpur fintech firm achieve?',
        options: [
          'It saved about six hours of focus time per engineer weekly by replacing status calls with memos.',
          'It doubled sales revenue after mandating five office days.',
          'It eliminated all written documentation in favor of voice notes.',
          'It hired twice as many junior engineers.',
        ],
        correctAnswer: 'It saved about six hours of focus time per engineer weekly by replacing status calls with memos.',
        explanationVi: 'Đoạn 3: thay 4 cuộc họp định kỳ bằng memo viết gọn giúp mỗi kỹ sư tiết kiệm ~6 giờ tập trung liên tục.',
        weaknessTag: 'reading_detail',
      },
      {
        id: 're3-q3',
        type: 'mcq',
        skill: 'reading',
        prompt: 'Why did panelists warn against going 100% remote with zero in-person contact?',
        options: [
          'Senior executives dislike writing Monday memos.',
          'Junior employees learn much faster through structured in-person mentoring days.',
          'Office buildings cannot be sold in Southeast Asia.',
          'Video-conferencing licenses are more expensive than office rent.',
        ],
        correctAnswer: 'Junior employees learn much faster through structured in-person mentoring days.',
        explanationVi: 'Đoạn 4: nhân sự mới vào nghề ("Early-career hires") hưởng lợi rất lớn từ 2 ngày hướng dẫn trực tiếp mỗi tuần.',
        weaknessTag: 'reading_inference',
      },
      {
        id: 're3-q4',
        type: 'true_false',
        skill: 'reading',
        prompt: 'True or False: The survey presented at the summit found that nearly 60% of hybrid workers feel less tired than in traditional offices.',
        options: ['True', 'False'],
        correctAnswer: 'False',
        explanationVi: 'Ngược lại: gần 60% cảm thấy kiệt sức HƠN ("more exhausted today") so với thói quen văn phòng truyền thống.',
        weaknessTag: 'reading_detail',
      },
    ],
  },

  // =========================================================
  // 7. TOPIC: DEEP WORK & ATTENTION
  // =========================================================
  {
    id: 'read-topic-1',
    category: 'topic',
    categoryLabelVi: 'Chủ đề Tâm lý & Học tập',
    level: 'B2',
    title: 'The Psychology of Deep Work in an Era of Micro-Notifications',
    subtitleVi: 'Phân tích hiện tượng "dư âm chú ý" khiến não bộ mất hơn 20 phút để lấy lại phong độ sau mỗi lần liếc thông báo.',
    readMinutes: 5,
    tags: ['Psychology', 'Productivity', 'Cognition'],
    paragraphs: [
      {
        heading: 'The Myth of Seamless Multitasking',
        en: 'Most knowledge workers glance at messaging apps or phone alerts dozens of times an hour, convinced that a quick five-second check barely interrupts their workflow. Yet cognitive psychology research tells a remarkably different story: what feels like seamless multitasking is actually rapid task-switching, a process that taxes working memory every single time attention shifts.',
        vi: 'Phần lớn lao động tri thức liếc nhìn ứng dụng nhắn tin hoặc thông báo điện thoại hàng chục lần mỗi giờ, tin rằng việc kiểm tra chớp nhoáng năm giây chẳng làm gián đoạn công việc bao nhiêu. Tuy nhiên, nghiên cứu tâm lý học nhận thức lại kể một câu chuyện hoàn toàn khác: thứ có vẻ như đa nhiệm mượt mà thực chất là chuyển đổi tác vụ liên tục, một quá trình bào mòn trí nhớ làm việc mỗi khi sự chú ý dịch chuyển.',
      },
      {
        en: 'Professor Sophie Leroy famously coined the term "attention residue" to describe what lingers in our minds after switching from Task A to Task B. Even when you close a chat window and return immediately to writing a report or reading complex English prose, part of your cognitive bandwidth stays stuck thinking about the unresolved message you just saw.',
        vi: 'Giáo sư Sophie Leroy đã đặt ra thuật ngữ nổi tiếng "dư âm chú ý" (attention residue) để mô tả phần suy nghĩ còn vương lại trong đầu khi ta chuyển từ Việc A sang Việc B. Ngay cả khi bạn tắt cửa sổ chat và quay lại viết báo cáo hay đọc văn bản tiếng Anh phức tạp ngay lập tức, một phần băng thông nhận thức vẫn bị kẹt lại ở tin nhắn chưa xử lý bạn vừa thấy.',
      },
      {
        heading: 'Designing Low-Friction Focus Habits',
        en: 'Fortunately, rebuilding the capacity for deep concentration does not require throwing away your smartphone or retreating to a remote cabin. Behavioral scientists suggest "batching" shallow tasks—checking emails and chat channels at three predetermined windows per day—while placing your phone in another room during ninety-minute study blocks.',
        vi: 'May mắn thay, việc khôi phục năng lực tập trung sâu không đòi hỏi bạn phải vứt bỏ điện thoại hay ẩn cư nơi hẻo lánh. Các nhà khoa học hành vi gợi ý phương pháp "gom nhóm" tác vụ nông—kiểm tra email và kênh chat vào ba khung giờ cố định mỗi ngày—đồng thời đặt điện thoại sang phòng khác trong suốt các phiên học tập dài chín mươi phút.',
      },
      {
        en: 'Equally helpful is ending each work session by jotting down the exact next concrete step on paper. Because the brain stops worrying about forgetting unfinished threads, it lets go of leftover tension far more effortlessly, leaving mental clarity intact for tomorrow’s deep work.',
        vi: 'Một thói quen hữu ích không kém là kết thúc mỗi phiên làm việc bằng việc ghi ra giấy bước cụ thể tiếp theo cần làm. Khi não bộ ngừng lo lắng về việc quên mất đầu việc dang dở, nó giải tỏa căng thẳng tồn đọng nhẹ nhàng hơn hẳn, giữ sự minh mẫn trọn vẹn cho phiên làm việc sâu ngày hôm sau.',
      },
      {
        heading: 'Why Long-Form Reading Trains Focus Muscles',
        en: 'Interestingly, reading unedited long-form essays and books serves both as a beneficiary and a training ground for deep attention. Skimming ten fragmented social-media posts trains the mind to expect rapid novelty every six seconds, whereas staying with one structured English article for fifteen minutes strengthens sustained comprehension and tolerance for complex syntax.',
        vi: 'Điều thú vị là việc đọc các bài tiểu luận và sách dài hoàn chỉnh vừa là kết quả được hưởng lợi, vừa là phòng tập trực tiếp cho cơ bắp chú ý sâu. Việc lướt mười bài đăng mạng xã hội vụn vặt rèn cho não thói quen đòi hỏi sự mới mẻ chớp nhoáng mỗi sáu giây, trong khi kiên nhẫn theo đuổi một bài viết tiếng Anh có cấu trúc suốt mười lăm phút sẽ củng cố khả năng đọc hiểu bền bỉ và sức chịu đựng với cấu trúc câu phức.',
      },
      {
        en: 'Over just a few weeks of deliberate practice, learners typically notice a quiet transformation: paragraphs that once felt intimidatingly dense begin to unfold with logical rhythm, and fewer rereads are required to grasp nuanced arguments. Deep work, in that sense, is less an innate personality trait than a craft anyone can cultivate deliberately.',
        vi: 'Chỉ sau vài tuần luyện tập có chủ đích, người học thường nhận thấy một sự chuyển biến âm thầm: những đoạn văn từng tạo cảm giác dày đặc đáng ngại bắt đầu mở ra theo nhịp điệu logic rõ ràng, và họ cần ít lần đọc lại hơn để nắm bắt lập luận tinh tế. Theo nghĩa đó, làm việc sâu ít mang tính thiên bẩm mà giống một kỹ năng nghề ai cũng có thể rèn giũa.',
      },
    ],
    glossary: [
      { word: 'seamless', pos: 'Tính từ', ipa: '/ˈsiːm.ləs/', meaningVi: 'liền mạch, trơn tru không khựng', example: 'Good UX creates a seamless transition between lessons and quizzes.' },
      { word: 'residue', pos: 'Danh từ', ipa: '/ˈrez.ɪ.dʒuː/', meaningVi: 'phần tồn dư, dư lượng còn sót lại', example: 'Attention residue lowers comprehension speed after distractions.' },
      { word: 'bandwidth', pos: 'Danh từ', ipa: '/ˈbænd.wɪdθ/', meaningVi: 'băng thông (ẩn dụ: sức chứa trí óc/thời gian)', example: 'I do not have the mental bandwidth for another project this week.' },
      { word: 'predetermined', pos: 'Tính từ', ipa: '/ˌpriː.dɪˈtɜː.mɪnd/', meaningVi: 'được ấn định, xác định từ trước', example: 'Check notifications only at predetermined intervals.' },
      { word: 'jot down', pos: 'Cụm động từ', ipa: '/dʒɒt daʊn/', meaningVi: 'ghi chú nhanh ngắn gọn', example: 'Jot down unfamiliar words while reading long articles.' },
      { word: 'intact', pos: 'Tính từ', ipa: '/ɪnˈtækt/', meaningVi: 'nguyên vẹn, không bị tổn hại', example: 'Keep your core study routine intact even during busy weeks.' },
    ],
    questions: [
      {
        id: 'rt1-q1',
        type: 'mcq',
        skill: 'reading',
        prompt: 'What does "attention residue" refer to in paragraph 2?',
        options: [
          'Eye strain caused by bright smartphone screens at night',
          'Lingering thoughts about a previous task that reduce focus on the current one',
          'A technique for memorizing 50 vocabulary words in five minutes',
          'Hardware memory leaks in messaging applications',
        ],
        correctAnswer: 'Lingering thoughts about a previous task that reduce focus on the current one',
        explanationVi: 'Đoạn 2: một phần nhận thức vẫn bị kẹt lại suy nghĩ về tác vụ vừa xem, làm giảm tập trung cho tác vụ hiện tại.',
        weaknessTag: 'reading_vocab_context',
      },
      {
        id: 'rt1-q2',
        type: 'mcq',
        skill: 'reading',
        prompt: 'What is "batching" as recommended by behavioral scientists?',
        options: [
          'Answering every incoming message within five seconds',
          'Grouping shallow tasks like email checks into a few scheduled time windows',
          'Studying five different subjects simultaneously',
          'Moving permanently to an offline mountain cabin',
        ],
        correctAnswer: 'Grouping shallow tasks like email checks into a few scheduled time windows',
        explanationVi: 'Đoạn 3: "batching shallow tasks—checking emails and chat channels at three predetermined windows per day".',
        weaknessTag: 'reading_detail',
      },
      {
        id: 'rt1-q3',
        type: 'mcq',
        skill: 'reading',
        prompt: 'Why should you write down the next concrete step before ending a session?',
        options: [
          'So your manager can track your typing speed',
          'Because it relieves the brain from worrying about forgetting unfinished threads',
          'To permanently delete old chat notifications',
          'Because paper notes automatically double your reading speed',
        ],
        correctAnswer: 'Because it relieves the brain from worrying about forgetting unfinished threads',
        explanationVi: 'Đoạn 4: não bộ ngừng lo lắng việc quên đầu việc dang dở ("stops worrying about forgetting unfinished threads").',
        weaknessTag: 'reading_detail',
      },
      {
        id: 'rt1-q4',
        type: 'true_false',
        skill: 'reading',
        prompt: 'True or False: Cognitive research supports the idea that checking your phone for five seconds causes virtually zero disruption.',
        options: ['True', 'False'],
        correctAnswer: 'False',
        explanationVi: 'Đoạn 1: đây là suy nghĩ sai lầm; thực chất nó buộc não phải task-switching và làm hao tổn trí nhớ làm việc.',
        weaknessTag: 'reading_inference',
      },
    ],
  },

  // =========================================================
  // 8. TOPIC: URBAN HEAT ISLANDS
  // =========================================================
  {
    id: 'read-topic-2',
    category: 'topic',
    categoryLabelVi: 'Môi trường & Đô thị',
    level: 'B1+',
    title: 'Urban Heat Islands: Why Street Trees Outperform Glass Towers',
    subtitleVi: 'Vì sao hàng cây xanh dọc vỉa hè lại có hiệu quả hạ nhiệt đô thị vượt trội hơn nhiều giải pháp kiến trúc hiện đại.',
    readMinutes: 5,
    tags: ['Environment', 'Architecture', 'Science'],
    paragraphs: [
      {
        heading: 'Trapped Heat Between Concrete and Asphalt',
        en: 'On a July afternoon, step off a shaded park path onto a wide asphalt avenue and the air temperature can feel noticeably harsher within seconds. Scientists call this phenomenon the "urban heat island" effect: densely built city centers routinely record daytime surface temperatures four to seven degrees Celsius higher than surrounding rural farmland.',
        vi: 'Vào một buổi chiều tháng Bảy, chỉ cần bước từ lối đi rợp bóng cây trong công viên ra đại lộ trải nhựa rộng lớn, bạn có thể cảm nhận không khí nóng gắt hơn hẳn chỉ trong vài giây. Giới khoa học gọi hiện tượng này là hiệu ứng "đảo nhiệt đô thị": các khu trung tâm xây dựng dày đặc thường ghi nhận nhiệt độ bề mặt ban ngày cao hơn từ 4 đến 7 độ C so với vùng nông thôn lân cận.',
      },
      {
        en: 'Dark rooftops, concrete facades, and multi-lane roads absorb solar radiation throughout the day and release it slowly well into the night. Unfortunately, relying exclusively on indoor air conditioning creates a vicious cycle: cooling units pump even more waste heat into narrow streets, driving electricity demand up while leaving pedestrians and outdoor workers exposed.',
        vi: 'Mái nhà tối màu, mặt dựng bê tông và đường nhiều làn xe hấp thụ bức xạ mặt trời suốt ban ngày rồi tỏa nhiệt ngược ra chậm rãi cho đến tận đêm khuya. Đáng tiếc, việc phụ thuộc hoàn toàn vào máy điều hòa trong nhà lại tạo ra một vòng luẩn quẩn: cục nóng điều hòa thổi thêm lượng nhiệt thải khổng lồ ra các con phố hẹp, đẩy nhu cầu điện tăng vọt trong khi người đi bộ và lao động ngoài trời vẫn phải hứng chịu cái nóng.',
      },
      {
        heading: 'The Double Cooling Mechanism of Mature Trees',
        en: 'When municipal planners compare cooling interventions, mature street trees consistently outperform synthetic shade canopies. Beyond physically blocking sunlight from baking pavements, trees cool surrounding air through evapotranspiration—the natural process of drawing groundwater through roots and releasing moisture through leaves.',
        vi: 'Khi các nhà quy hoạch đô thị so sánh nhiều biện pháp làm mát, những hàng cây trưởng thành trên phố luôn vượt trội so với mái che nhân tạo. Ngoài việc trực tiếp che chắn ánh nắng khỏi nung nóng mặt đường, cây xanh còn làm mát không khí xung quanh nhờ quá trình thoát hơi nước qua lá (evapotranspiration)—hút nước ngầm qua rễ và tỏa hơi ẩm ra môi trường.',
      },
      {
        en: 'Cities like Medellín and Singapore have demonstrated that linking tree-lined "green corridors" along bus routes and rivers can lower neighborhood temperatures by up to two degrees Celsius while reducing stormwater runoff. Investing in healthy soil pits and diverse native species may lack the glamour of futuristic glass skyscrapers, yet it remains one of the smartest climate defenses a city can build.',
        vi: 'Những thành phố như Medellín và Singapore đã chứng minh rằng việc kết nối các "hành lang xanh" rợp bóng cây dọc tuyến xe buýt và bờ sông có thể hạ nhiệt khu dân cư tới 2 độ C, đồng thời giảm ngập úng do nước mưa chảy tràn. Đầu tư vào hố đất khỏe mạnh cho rễ cây và trồng đa dạng loài bản địa tuy thiếu vẻ hào nhoáng như những tòa tháp kính tương lai, nhưng vẫn là một trong những lá chắn khí hậu thông minh nhất mà đô thị có thể xây dựng.',
      },
      {
        heading: 'Equity & Neighborhood Cooling Maps',
        en: 'Equally compelling is the social-equity dimension highlighted by thermal satellite mapping. Across dozens of rapidly expanding cities, lower-income industrial districts consistently exhibit thinner tree canopies and significantly hotter nighttime temperatures than affluent leafy suburbs, turning urban greenery into an urgent public-health issue rather than mere street decoration.',
        vi: 'Không kém phần thuyết phục là khía cạnh công bằng xã hội được bộc lộ qua bản đồ nhiệt vệ tinh. Tại hàng chục đô thị mở rộng nhanh chóng, các khu công nghiệp và dân cư thu nhập thấp thường có mật độ tán cây thưa hơn và nền nhiệt ban đêm cao hơn rõ rệt so với vùng ngoại ô nhiều cây xanh giàu có, biến mảng xanh đô thị thành vấn đề y tế công cộng cấp bách chứ không chỉ là trang trí đường phố.',
      },
      {
        en: 'Forward-thinking councils now pair street-tree planting targets with permeable sidewalk bricks and reflective light-colored roof coatings on public schools. Together, these layered measures prove that cooling an overheating metropolis requires neither miraculous gadgets nor prohibitive budgets—just steady ecological design applied block by block.',
        vi: 'Nhiều hội đồng thành phố có tầm nhìn hiện nay kết hợp chỉ tiêu trồng cây vỉa hè với gạch lát thấm nước và sơn mái phản xạ nhiệt sáng màu cho các trường công lập. Khi đi cùng nhau, những giải pháp đa tầng này chứng minh rằng việc hạ nhiệt một siêu đô thị đang nóng lên không đòi hỏi thiết bị kỳ diệu hay ngân sách khổng lồ—mà chỉ cần thiết kế sinh thái bền bỉ áp dụng qua từng dãy phố.',
      },
    ],
    glossary: [
      { word: 'phenomenon', pos: 'Danh từ', ipa: '/fəˈnɒm.ɪ.nən/', meaningVi: 'hiện tượng', example: 'Urban heat islands are a well-documented climate phenomenon.' },
      { word: 'vicious cycle', pos: 'Cụm danh từ', ipa: '/ˌvɪʃ.əs ˈsaɪ.kəl/', meaningVi: 'vòng luẩn quẩn tiêu cực', example: 'Overusing AC indoors traps cities in a vicious cycle of street heat.' },
      { word: 'intervention', pos: 'Danh từ', ipa: '/ˌɪn.təˈven.ʃən/', meaningVi: 'biện pháp can thiệp', example: 'Early design interventions are cheaper than retrofitting buildings.' },
      { word: 'evapotranspiration', pos: 'Danh từ', ipa: '/ɪˌvæp.əʊ.træn.spɪˈreɪ.ʃən/', meaningVi: 'quá trình bốc thoát hơi nước (từ đất & cây)', example: 'Trees lower street humidity and temperature via evapotranspiration.' },
      { word: 'runoff', pos: 'Danh từ', ipa: '/ˈrʌn.ɒf/', meaningVi: 'lượng nước chảy tràn trên bề mặt', example: 'Tree roots absorb rainwater and reduce dangerous stormwater runoff.' },
      { word: 'glamour', pos: 'Danh từ', ipa: '/ˈɡlæm.ər/', meaningVi: 'vẻ hào nhoáng, bóng bẩy', example: 'Public maintenance rarely gets the glamour of mega-bridge openings.' },
    ],
    questions: [
      {
        id: 'rt2-q1',
        type: 'mcq',
        skill: 'reading',
        prompt: 'Why does heavy use of air conditioning worsen outdoor street heat?',
        options: [
          'AC units consume groundwater meant for park trees.',
          'Cooling units expel waste heat directly back into the streets while raising energy demand.',
          'Air conditioners darken surrounding concrete walls.',
          'They stop breezes from reaching rural farmland.',
        ],
        correctAnswer: 'Cooling units expel waste heat directly back into the streets while raising energy demand.',
        explanationVi: 'Đoạn 2: cục nóng điều hòa thổi thêm nhiệt thải ra phố ("pump even more waste heat into narrow streets").',
        weaknessTag: 'reading_detail',
      },
      {
        id: 'rt2-q2',
        type: 'mcq',
        skill: 'reading',
        prompt: 'What advantage do live street trees have over artificial shade canopies?',
        options: [
          'Artificial canopies absorb zero sunlight during daytime.',
          'Live trees both block sunlight and cool the air through moisture released by leaves.',
          'Trees require no soil or maintenance once planted.',
          'Canopies increase stormwater flooding by 50%.',
        ],
        correctAnswer: 'Live trees both block sunlight and cool the air through moisture released by leaves.',
        explanationVi: 'Đoạn 3: ngoài chắn nắng, cây xanh còn làm mát nhờ quá trình evapotranspiration (thoát hơi ẩm qua lá).',
        weaknessTag: 'reading_detail',
      },
      {
        id: 'rt2-q3',
        type: 'mcq',
        skill: 'reading',
        prompt: 'What is the author’s main message in the concluding paragraph?',
        options: [
          'Glass skyscrapers should be banned across all continents.',
          'Practical urban greenery delivers greater climate resilience than flashy architecture.',
          'Only coastal cities like Singapore can afford green corridors.',
          'Soil quality plays no role in how well city trees survive.',
        ],
        correctAnswer: 'Practical urban greenery delivers greater climate resilience than flashy architecture.',
        explanationVi: 'Đoạn 4 đối chiếu vẻ hào nhoáng của tháp kính tương lai với hiệu quả khí hậu thiết thực của hành lang cây xanh.',
        weaknessTag: 'reading_main_idea',
      },
      {
        id: 'rt2-q4',
        type: 'true_false',
        skill: 'reading',
        prompt: 'True or False: Green corridors in cities like Medellín and Singapore helped reduce neighborhood temperatures by up to 2°C.',
        options: ['True', 'False'],
        correctAnswer: 'True',
        explanationVi: 'Đoạn 4: "...can lower neighborhood temperatures by up to two degrees Celsius".',
        weaknessTag: 'reading_scanning',
      },
    ],
  },

  // =========================================================
  // 9. TOPIC: CIRCULAR FASHION
  // =========================================================
  {
    id: 'read-topic-3',
    category: 'topic',
    categoryLabelVi: 'Kinh tế & Bền vững',
    level: 'B2',
    title: 'Circular Fashion: Can Repair Culture Outpace Fast-Trend Consumption?',
    subtitleVi: 'Phân tích xu hướng thời trang tuần hoàn: từ sửa chữa, cho thuê đồ đến rào cản giá thành và tẩy xanh.',
    readMinutes: 5,
    tags: ['Economics', 'Lifestyle', 'Sustainability'],
    paragraphs: [
      {
        heading: 'Beyond "Eco" Labels on Fast Fashion Racks',
        en: 'Every spring, major clothing retailers roll out capsule collections stamped with words like "conscious" or "earth-friendly." Yet textile researchers point out an uncomfortable contradiction: global garment production has roughly doubled over the past twenty years, while the average number of times a shopper wears a new item before discarding it has steadily declined.',
        vi: 'Mỗi mùa xuân, các hãng bán lẻ thời trang lớn đều tung ra những bộ sưu tập giới hạn gắn nhãn "có ý thức" hay "thân thiện với trái đất". Tuy nhiên, các nhà nghiên cứu dệt may chỉ ra một mâu thuẫn đáng suy ngẫm: sản lượng may mặc toàn cầu đã tăng gần gấp đôi trong hai mươi năm qua, trong khi số lần trung bình một người mặc món đồ mới trước khi vứt bỏ lại giảm dần đều.',
      },
      {
        en: 'True circular fashion seeks to break that linear "make, wear briefly, and discard" model. Instead of merely swapping synthetic polyester for organic cotton while maintaining fifty-two micro-seasons a year, circular initiatives focus on extending a garment’s active lifespan through durable stitching, standardized repair services, peer-to-peer resale, and fiber-to-fiber recycling.',
        vi: 'Thời trang tuần hoàn thực chất hướng tới phá vỡ mô hình tuyến tính "sản xuất, mặc vài lần rồi bỏ". Thay vì chỉ đổi vải polyester tổng hợp sang cotton hữu cơ trong khi vẫn duy trì năm mươi hai mùa mốt siêu ngắn mỗi năm, các sáng kiến tuần hoàn tập trung kéo dài vòng đời sử dụng của trang phục qua đường may bền chắc, dịch vụ sửa chữa chuẩn hóa, bán lại giữa người dùng và tái chế sợi sang sợi.',
      },
      {
        heading: 'Economic Hurdles & Changing Habits',
        en: 'Still, scaling repair culture faces genuine economic hurdles. When a brand-new jacket costs less than replacing a broken zipper at a neighborhood tailor, consumers face an obvious financial disincentive to fix what they already own. Several European countries have begun countering this imbalance with repair vouchers—small government subsidies that lower the out-of-pocket cost of mending shoes and clothing.',
        vi: 'Dẫu vậy, nhân rộng văn hóa sửa chữa vẫn đối mặt nhiều rào cản kinh tế thực tế. Khi một chiếc áo khoác mới tinh có giá rẻ hơn cả tiền thay dây kéo hỏng tại tiệm may đầu ngõ, người tiêu dùng vấp phải sự thiếu khuyến khích tài chính rõ rệt khi cân nhắc sửa đồ cũ. Một số quốc gia châu Âu đã bắt đầu cân bằng lại điều này bằng phiếu hỗ trợ sửa chữa—khoản trợ cấp nhỏ giúp giảm chi phí bỏ túi khi vá giày dép và quần áo.',
      },
      {
        en: 'Ultimately, industry analysts argue that legislation—such as holding brands financially responsible for post-consumer textile waste—must complement individual consumer choices. Mindful shopping matters, yet genuine circularity requires redesigning clothes from day one so they are built to be repaired rather than rushed to clearance bins.',
        vi: 'Cuối cùng, giới phân tích ngành cho rằng quy định pháp lý—chẳng hạn buộc thương hiệu chịu trách nhiệm tài chính đối với rác thải dệt may sau tiêu dùng—cần song hành cùng lựa chọn của từng cá nhân. Mua sắm có ý thức rất quan trọng, nhưng tính tuần hoàn thực sự đòi hỏi thiết kế trang phục ngay từ ngày đầu sao cho dễ sửa chữa chứ không phải vội vàng trôi ra sọt hàng giảm giá.',
      },
      {
        heading: 'Digital Passports & Transparent Supply Chains',
        en: 'One promising policy tool emerging in trade discussions is the "digital product passport"—a scannable woven tag detailing exact fiber blends, dye origins, and recommended repair instructions. Today, automated sorting plants often struggle to recycle blended fabrics because mixed polyester-cotton labels fade after a dozen washes.',
        vi: 'Một công cụ chính sách đầy hứa hẹn đang xuất hiện trong các cuộc thảo luận thương mại là "hộ chiếu sản phẩm số"—một nhãn dệt có thể quét mã ghi rõ tỷ lệ pha sợi, nguồn gốc thuốc nhuộm và hướng dẫn sửa chữa khuyến nghị. Hiện nay, các nhà máy phân loại tự động thường chật vật khi tái chế vải pha vì nhãn mác cotton-polyester hay bị phai chữ sau khoảng một chục lần giặt.',
      },
      {
        en: 'If manufacturers embed durable fiber data alongside modular buttons and replaceable cuffs, secondhand platforms and community mending cafés could thrive on a far larger scale. Changing how the world dresses will not happen in a single season, yet every extra year we keep an existing coat in circulation noticeably lightens the burden on landfills and rivers.',
        vi: 'Nếu nhà sản xuất tích hợp dữ liệu sợi bền vững cùng khuy áo dễ thay và cổ tay áo có thể tháo rời, các sàn đồ cũ và tiệm cà phê sửa chữa cộng đồng có thể phát triển ở quy mô lớn hơn nhiều. Thay đổi cách thế giới ăn mặc sẽ không diễn ra chỉ trong một mùa mốt, nhưng mỗi năm ta giữ thêm một chiếc áo khoác tiếp tục vòng đời sử dụng đều góp phần giảm nhẹ gánh nặng cho bãi rác và dòng sông.',
      },
    ],
    glossary: [
      { word: 'contradiction', pos: 'Danh từ', ipa: '/ˌkɒn.trəˈdɪk.ʃən/', meaningVi: 'sự mâu thuẫn, nghịch lý', example: 'Buying disposable outfits while claiming sustainability is a contradiction.' },
      { word: 'lifespan', pos: 'Danh từ', ipa: '/ˈlaɪf.spæn/', meaningVi: 'vòng đời, tuổi thọ sử dụng', example: 'Doubling a coat’s lifespan dramatically cuts its carbon footprint.' },
      { word: 'disincentive', pos: 'Danh từ', ipa: '/ˌdɪs.ɪnˈsen.tɪv/', meaningVi: 'yếu tố làm nản lòng / cản trở động lực', example: 'High repair fees act as a disincentive against fixing old electronics.' },
      { word: 'out-of-pocket', pos: 'Tính từ', ipa: '/ˌaʊt.əvˈpɒk.ɪt/', meaningVi: 'tiền tự bỏ túi ra chi trả trực tiếp', example: 'Vouchers reduced out-of-pocket mending expenses by half.' },
      { word: 'legislation', pos: 'Danh từ', ipa: '/ˌledʒ.ɪˈsleɪ.ʃən/', meaningVi: 'hệ thống luật pháp, quy định pháp lý', example: 'New packaging legislation takes effect next January.' },
      { word: 'complement', pos: 'Động từ', ipa: '/ˈkɒm.plɪ.ment/', meaningVi: 'bổ trợ, kết hợp hài hòa với', example: 'Long-form reading should complement spaced-repetition vocabulary review.' },
    ],
    questions: [
      {
        id: 'rt3-q1',
        type: 'mcq',
        skill: 'reading',
        prompt: 'What contradiction does the author highlight in paragraph 1?',
        options: [
          'Clothing prices tripled even though textile factories closed.',
          'Brands market "eco-friendly" lines while global output doubled and clothes are worn fewer times.',
          'Organic cotton is more harmful than plastic packaging.',
          'Shoppers refuse to buy anything during spring sales.',
        ],
        correctAnswer: 'Brands market "eco-friendly" lines while global output doubled and clothes are worn fewer times.',
        explanationVi: 'Đoạn 1: nhãn hàng quảng bá bộ sưu tập xanh trong khi sản lượng toàn cầu tăng gấp đôi và số lần mặc trung bình lại giảm.',
        weaknessTag: 'reading_detail',
      },
      {
        id: 'rt3-q2',
        type: 'mcq',
        skill: 'reading',
        prompt: 'Why do many consumers avoid repairing damaged clothes today?',
        options: [
          'Tailors no longer know how to sew zippers.',
          'Repairing an item can cost more than purchasing a cheap brand-new replacement.',
          'Repaired garments are banned from peer-to-peer resale platforms.',
          'Government repair vouchers make new jackets free.',
        ],
        correctAnswer: 'Repairing an item can cost more than purchasing a cheap brand-new replacement.',
        explanationVi: 'Đoạn 3: khi áo mới rẻ hơn tiền thay khóa kéo ở tiệm may, người dùng không có động lực tài chính để sửa đồ.',
        weaknessTag: 'reading_detail',
      },
      {
        id: 'rt3-q3',
        type: 'mcq',
        skill: 'reading',
        prompt: 'What are European "repair vouchers" designed to do?',
        options: [
          'Encourage brands to release 52 micro-seasons annually',
          'Lower the personal cost for citizens who mend shoes or garments',
          'Replace organic cotton with polyester fibers',
          'Tax secondhand clothing shops',
        ],
        correctAnswer: 'Lower the personal cost for citizens who mend shoes or garments',
        explanationVi: 'Đoạn 3: "small government subsidies that lower the out-of-pocket cost of mending shoes and clothing".',
        weaknessTag: 'reading_vocab_context',
      },
      {
        id: 'rt3-q4',
        type: 'true_false',
        skill: 'reading',
        prompt: 'True or False: Analysts believe individual shopping habits alone are enough without industry legislation.',
        options: ['True', 'False'],
        correctAnswer: 'False',
        explanationVi: 'Đoạn 4 khẳng định luật pháp buộc thương hiệu chịu trách nhiệm rác thải dệt may phải song hành ("must complement") lựa chọn cá nhân.',
        weaknessTag: 'reading_inference',
      },
    ],
  },
];
