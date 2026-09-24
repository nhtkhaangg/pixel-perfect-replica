export type PackageCategory = "MEMBERSHIP" | "PT";

export const CATEGORY_LABEL: Record<PackageCategory, string> = {
  MEMBERSHIP: "Gói hội viên",
  PT: "Gói tập cùng huấn luyện viên",
};

export type GymPackage = {
  id: string;
  name: string;
  category: PackageCategory;
  price: number;
  durationDays: number;
  durationLabel: string;
  sessions: number | null;
  summary: string;
  benefits: string[];
  terms: string[];
  highlighted?: boolean;
  trainerId?: string;
};

export const PACKAGES: GymPackage[] = [
  {
    id: "membership-1m",
    name: "Hội viên 1 tháng",
    category: "MEMBERSHIP",
    price: 890000,
    durationDays: 30,
    durationLabel: "1 tháng",
    sessions: null,
    summary: "Phù hợp để làm quen với phòng tập và xây dựng thói quen vận động.",
    benefits: [
      "Tự do sử dụng khu tạ và khu cardio",
      "1 buổi đo chỉ số cơ thể InBody",
      "Tủ đồ dùng chung, khăn tập miễn phí",
      "Tham gia 4 lớp nhóm trong tháng",
    ],
    terms: [
      "Kích hoạt trong vòng 7 ngày kể từ ngày thanh toán.",
      "Không hỗ trợ bảo lưu và chuyển nhượng.",
      "Xuất trình mã QR khi check-in tại quầy lễ tân.",
    ],
  },
  {
    id: "membership-6m",
    name: "Hội viên 6 tháng",
    category: "MEMBERSHIP",
    price: 4290000,
    durationDays: 180,
    durationLabel: "6 tháng",
    sessions: null,
    summary: "Lựa chọn được nhiều hội viên yêu thích nhất với chi phí hợp lý.",
    benefits: [
      "Tự do sử dụng toàn bộ khu tập",
      "Lớp nhóm Yoga, HIIT, Kickfit không giới hạn",
      "Đo chỉ số cơ thể hằng tháng",
      "Tủ đồ riêng và phòng xông hơi",
      "Bảo lưu tối đa 30 ngày",
    ],
    terms: [
      "Kích hoạt trong vòng 14 ngày kể từ ngày thanh toán.",
      "Bảo lưu tối đa 30 ngày, báo trước ít nhất 3 ngày.",
      "Chuyển nhượng một lần với phí 200.000 VNĐ.",
    ],
    highlighted: true,
  },
  {
    id: "membership-12m",
    name: "Hội viên 12 tháng",
    category: "MEMBERSHIP",
    price: 7690000,
    durationDays: 365,
    durationLabel: "12 tháng",
    sessions: null,
    summary: "Tiết kiệm nhất cho người tập lâu dài, kèm tư vấn dinh dưỡng.",
    benefits: [
      "Tự do sử dụng toàn bộ khu tập",
      "Lớp nhóm không giới hạn, ưu tiên đặt chỗ",
      "Tư vấn dinh dưỡng hằng tháng",
      "2 buổi tập định hướng cùng huấn luyện viên",
      "Bảo lưu tối đa 60 ngày",
    ],
    terms: [
      "Kích hoạt trong vòng 30 ngày kể từ ngày thanh toán.",
      "Bảo lưu tối đa 60 ngày, chia tối đa 2 lần.",
      "Chuyển nhượng miễn phí một lần.",
    ],
  },
  {
    id: "pt-12",
    name: "PT cơ bản 12 buổi",
    category: "PT",
    price: 5400000,
    durationDays: 45,
    durationLabel: "45 ngày",
    sessions: 12,
    summary: "Làm quen kỹ thuật chuẩn với huấn luyện viên riêng trong 12 buổi.",
    benefits: [
      "Giáo án cá nhân theo mục tiêu",
      "Kiểm tra tư thế và kỹ thuật từng động tác",
      "Theo dõi chỉ số sau mỗi 4 buổi",
      "Đặt lịch linh hoạt qua ứng dụng",
    ],
    terms: [
      "Hoàn thành 12 buổi trong 45 ngày kể từ buổi đầu tiên.",
      "Huỷ lịch trước 6 giờ để không bị trừ buổi.",
      "Yêu cầu có gói hội viên còn hiệu lực.",
    ],
    trainerId: "tran-anh-khoa",
  },
  {
    id: "pt-24",
    name: "PT chuyên sâu 24 buổi",
    category: "PT",
    price: 9800000,
    durationDays: 90,
    durationLabel: "90 ngày",
    sessions: 24,
    summary: "Chương trình thay đổi vóc dáng bài bản trong 3 tháng.",
    benefits: [
      "Giáo án và thực đơn cá nhân hoá",
      "Đo InBody mỗi 2 tuần",
      "Nhắn tin hỗ trợ cùng huấn luyện viên",
      "Tặng 1 buổi massage phục hồi",
    ],
    terms: [
      "Hoàn thành 24 buổi trong 90 ngày.",
      "Huỷ lịch trước 6 giờ để không bị trừ buổi.",
      "Có thể đổi huấn luyện viên một lần.",
    ],
    highlighted: true,
    trainerId: "le-mai-phuong",
  },
  {
    id: "pt-36",
    name: "PT nâng cao 36 buổi",
    category: "PT",
    price: 13500000,
    durationDays: 120,
    durationLabel: "120 ngày",
    sessions: 36,
    summary: "Dành cho mục tiêu thi đấu, tăng sức mạnh hoặc phục hồi thể lực.",
    benefits: [
      "Giáo án chu kỳ hoá theo từng giai đoạn",
      "Tư vấn dinh dưỡng hằng tuần",
      "Đo InBody không giới hạn",
      "Ưu tiên khung giờ cao điểm",
    ],
    terms: [
      "Hoàn thành 36 buổi trong 120 ngày.",
      "Huỷ lịch trước 6 giờ để không bị trừ buổi.",
      "Bảo lưu tối đa 14 ngày.",
    ],
    trainerId: "nguyen-minh-duc",
  },
];

export type Trainer = {
  id: string;
  name: string;
  specialty: string;
  tags: string[];
  experienceYears: number;
  rating: number;
  reviewCount: number;
  bio: string;
  certificates: { name: string; issuer: string; year: number }[];
  schedule: { day: string; slots: string[] }[];
};

export const TRAINERS: Trainer[] = [
  {
    id: "tran-anh-khoa",
    name: "Trần Anh Khoa",
    specialty: "Tăng cơ & sức mạnh",
    tags: ["Tăng cơ", "Powerlifting", "Kỹ thuật tạ"],
    experienceYears: 7,
    rating: 4.9,
    reviewCount: 124,
    bio: "Anh Khoa từng là vận động viên cử tạ cấp thành phố. Anh chú trọng kỹ thuật chuẩn và tăng tải có kế hoạch để hội viên tiến bộ an toàn, không chấn thương.",
    certificates: [
      { name: "Huấn luyện viên sức mạnh (NSCA-CPT)", issuer: "NSCA", year: 2019 },
      { name: "Sơ cấp cứu và hồi sức tim phổi", issuer: "Hội Chữ thập đỏ Việt Nam", year: 2024 },
    ],
    schedule: [
      { day: "Thứ 2", slots: ["06:00", "07:30", "18:00"] },
      { day: "Thứ 4", slots: ["06:00", "17:30", "19:00"] },
      { day: "Thứ 6", slots: ["07:30", "18:00"] },
    ],
  },
  {
    id: "le-mai-phuong",
    name: "Lê Mai Phương",
    specialty: "Yoga & vận động trị liệu",
    tags: ["Yoga", "Phục hồi", "Linh hoạt"],
    experienceYears: 6,
    rating: 4.8,
    reviewCount: 112,
    bio: "Chị Phương có kinh nghiệm hỗ trợ hội viên dân văn phòng cải thiện đau lưng, cổ vai gáy và tăng độ linh hoạt bằng yoga kết hợp bài tập trị liệu.",
    certificates: [
      { name: "Yoga Alliance RYT-500", issuer: "Yoga Alliance", year: 2020 },
      { name: "Chuyên viên vận động trị liệu", issuer: "Đại học Y Dược TP. HCM", year: 2022 },
    ],
    schedule: [
      { day: "Thứ 3", slots: ["06:30", "09:00", "18:30"] },
      { day: "Thứ 5", slots: ["06:30", "18:30"] },
      { day: "Thứ 7", slots: ["08:00", "10:00"] },
    ],
  },
  {
    id: "nguyen-minh-duc",
    name: "Nguyễn Minh Đức",
    specialty: "Giảm cân & thể lực",
    tags: ["Giảm mỡ", "HIIT", "Dinh dưỡng"],
    experienceYears: 5,
    rating: 4.8,
    reviewCount: 98,
    bio: "Anh Đức xây dựng lộ trình giảm mỡ kết hợp tập luyện cường độ cao và thực đơn dễ áp dụng, giúp hơn 200 hội viên đạt cân nặng mục tiêu.",
    certificates: [
      { name: "ACE Certified Personal Trainer", issuer: "ACE", year: 2021 },
      { name: "Chuyên gia dinh dưỡng thể thao", issuer: "ISSA", year: 2023 },
    ],
    schedule: [
      { day: "Thứ 2", slots: ["17:00", "19:30"] },
      { day: "Thứ 3", slots: ["06:00", "17:00"] },
      { day: "Chủ nhật", slots: ["08:00", "09:30"] },
    ],
  },
  {
    id: "pham-thu-ha",
    name: "Phạm Thu Hà",
    specialty: "Thể hình nữ & săn chắc",
    tags: ["Vóc dáng", "Glute", "Sau sinh"],
    experienceYears: 4,
    rating: 4.7,
    reviewCount: 76,
    bio: "Chị Hà chuyên thiết kế chương trình săn chắc vóc dáng cho nữ, đặc biệt là hội viên sau sinh muốn lấy lại thể lực một cách nhẹ nhàng.",
    certificates: [
      { name: "ISSA Certified Personal Trainer", issuer: "ISSA", year: 2022 },
      { name: "Huấn luyện phụ nữ sau sinh", issuer: "Girls Gone Strong", year: 2023 },
    ],
    schedule: [
      { day: "Thứ 4", slots: ["07:00", "10:00"] },
      { day: "Thứ 6", slots: ["17:30", "19:00"] },
      { day: "Thứ 7", slots: ["07:00", "09:00"] },
    ],
  },
  {
    id: "vo-quoc-bao",
    name: "Võ Quốc Bảo",
    specialty: "Kickfit & thể lực chức năng",
    tags: ["Kickfit", "Functional", "Sức bền"],
    experienceYears: 8,
    rating: 4.9,
    reviewCount: 131,
    bio: "Anh Bảo từng thi đấu kickboxing và hiện hướng dẫn các lớp kickfit, giúp hội viên cải thiện sức bền, phản xạ và giải toả căng thẳng.",
    certificates: [
      { name: "Huấn luyện viên Kickboxing cấp 2", issuer: "Liên đoàn Kickboxing Việt Nam", year: 2018 },
      { name: "Functional Training Specialist", issuer: "ACE", year: 2021 },
    ],
    schedule: [
      { day: "Thứ 3", slots: ["18:00", "19:30"] },
      { day: "Thứ 5", slots: ["18:00", "19:30"] },
      { day: "Thứ 7", slots: ["16:00"] },
    ],
  },
  {
    id: "dang-hoang-nam",
    name: "Đặng Hoàng Nam",
    specialty: "Phục hồi chấn thương",
    tags: ["Phục hồi", "Người lớn tuổi", "Tư thế"],
    experienceYears: 9,
    rating: 4.8,
    reviewCount: 87,
    bio: "Anh Nam có nền tảng vật lý trị liệu, đồng hành cùng hội viên sau chấn thương gối, vai và người trung niên muốn tập luyện an toàn.",
    certificates: [
      { name: "Cử nhân Vật lý trị liệu", issuer: "Đại học Y khoa Phạm Ngọc Thạch", year: 2015 },
      { name: "Corrective Exercise Specialist", issuer: "NASM", year: 2020 },
    ],
    schedule: [
      { day: "Thứ 2", slots: ["09:00", "14:00"] },
      { day: "Thứ 4", slots: ["09:00", "14:00"] },
      { day: "Thứ 6", slots: ["09:00"] },
    ],
  },
];

export type Article = {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  readMinutes: number;
  content: { heading: string; body: string }[];
};

export const ARTICLES: Article[] = [
  {
    id: "lich-tap-3-buoi-moi-tuan",
    title: "Lịch tập 3 buổi mỗi tuần cho người mới bắt đầu",
    category: "Tập luyện",
    excerpt: "Một lịch tập toàn thân đơn giản giúp bạn xây nền tảng sức mạnh trong 8 tuần đầu.",
    author: "Trần Anh Khoa",
    publishedAt: "2026-09-18",
    readMinutes: 6,
    content: [
      { heading: "Vì sao nên tập toàn thân?", body: "Với người mới, tập toàn thân 3 buổi mỗi tuần giúp mỗi nhóm cơ được kích thích nhiều lần mà vẫn đủ thời gian phục hồi. Bạn cũng dễ duy trì thói quen hơn so với lịch tập 5–6 buổi." },
      { heading: "Cấu trúc một buổi tập", body: "Khởi động 10 phút, sau đó thực hiện 5 bài chính: squat, đẩy ngực, kéo lưng, đẩy vai và plank. Mỗi bài 3 hiệp, 8–12 lần lặp, nghỉ 60–90 giây giữa các hiệp." },
      { heading: "Tăng tải hợp lý", body: "Khi hoàn thành trọn 12 lần ở cả 3 hiệp với kỹ thuật chuẩn, hãy tăng 2,5–5% mức tạ. Ghi chép lại mỗi buổi để thấy rõ tiến bộ." },
    ],
  },
  {
    id: "an-gi-truoc-va-sau-tap",
    title: "Ăn gì trước và sau buổi tập để đạt hiệu quả?",
    category: "Dinh dưỡng",
    excerpt: "Gợi ý bữa ăn đơn giản, dễ chuẩn bị giúp bạn đủ năng lượng và phục hồi tốt hơn.",
    author: "Nguyễn Minh Đức",
    publishedAt: "2026-09-12",
    readMinutes: 5,
    content: [
      { heading: "Trước buổi tập 60–90 phút", body: "Ưu tiên tinh bột dễ tiêu và một ít đạm: một chuối kèm sữa chua, bánh mì nguyên cám với trứng, hoặc một chén cơm nhỏ với ức gà." },
      { heading: "Sau buổi tập", body: "Bổ sung 20–40 g đạm và tinh bột trong vòng 2 giờ để phục hồi cơ bắp, ví dụ cơm với cá hồi và rau xanh hoặc sinh tố whey với yến mạch." },
      { heading: "Đừng quên nước", body: "Uống 400–600 ml nước trước buổi tập và bổ sung đều đặn trong khi tập, đặc biệt với thời tiết nóng ẩm tại TP. Hồ Chí Minh." },
    ],
  },
  {
    id: "giam-dau-lung-van-phong",
    title: "5 bài tập giảm đau lưng cho dân văn phòng",
    category: "Phục hồi",
    excerpt: "Chỉ 15 phút mỗi ngày để cải thiện tư thế và giảm căng cứng vùng lưng dưới.",
    author: "Lê Mai Phương",
    publishedAt: "2026-09-05",
    readMinutes: 4,
    content: [
      { heading: "Nguyên nhân thường gặp", body: "Ngồi lâu khiến cơ hông co rút và cơ mông yếu đi, làm lưng dưới phải gánh nhiều áp lực hơn." },
      { heading: "Các bài tập gợi ý", body: "Tư thế con mèo – con bò, cầu mông, bird-dog, kéo giãn cơ hông và tư thế em bé. Thực hiện chậm, kết hợp hít thở sâu." },
      { heading: "Khi nào cần gặp chuyên gia?", body: "Nếu cơn đau lan xuống chân, kèm tê bì hoặc kéo dài quá 2 tuần, bạn nên thăm khám bác sĩ trước khi tiếp tục tập luyện." },
    ],
  },
  {
    id: "hieu-dung-ve-bmi",
    title: "Hiểu đúng về chỉ số BMI và giới hạn của nó",
    category: "Kiến thức",
    excerpt: "BMI là công cụ tham khảo hữu ích nhưng không phản ánh đầy đủ thành phần cơ thể.",
    author: "Đặng Hoàng Nam",
    publishedAt: "2026-08-28",
    readMinutes: 5,
    content: [
      { heading: "BMI được tính thế nào?", body: "BMI bằng cân nặng (kg) chia cho bình phương chiều cao (m). Với người châu Á, mức 18,5–22,9 được xem là bình thường." },
      { heading: "Hạn chế của BMI", body: "BMI không phân biệt cơ và mỡ. Người tập tạ nhiều năm có thể có BMI cao nhưng tỉ lệ mỡ thấp." },
      { heading: "Nên kết hợp với chỉ số nào?", body: "Hãy theo dõi thêm vòng eo, tỉ lệ mỡ cơ thể qua máy InBody và cảm nhận thể lực hằng ngày." },
    ],
  },
  {
    id: "ngu-du-giac-tang-co",
    title: "Giấc ngủ ảnh hưởng thế nào đến việc tăng cơ?",
    category: "Phục hồi",
    excerpt: "Ngủ đủ 7–9 giờ giúp cơ thể tiết hormone tăng trưởng và phục hồi mô cơ.",
    author: "Trần Anh Khoa",
    publishedAt: "2026-08-20",
    readMinutes: 4,
    content: [
      { heading: "Cơ bắp phát triển khi nghỉ ngơi", body: "Buổi tập tạo kích thích, còn quá trình tổng hợp cơ diễn ra mạnh nhất khi bạn ngủ sâu." },
      { heading: "Mẹo ngủ ngon hơn", body: "Hạn chế màn hình 1 giờ trước khi ngủ, giữ phòng mát và tránh caffeine sau 15:00." },
    ],
  },
  {
    id: "hiit-hay-cardio-nhe",
    title: "HIIT hay cardio nhẹ: đâu là lựa chọn để giảm mỡ?",
    category: "Tập luyện",
    excerpt: "So sánh ưu nhược điểm của hai hình thức cardio phổ biến và cách kết hợp hợp lý.",
    author: "Võ Quốc Bảo",
    publishedAt: "2026-08-14",
    readMinutes: 6,
    content: [
      { heading: "HIIT", body: "Tiết kiệm thời gian, đốt nhiều năng lượng nhưng đòi hỏi phục hồi tốt. Chỉ nên thực hiện 2–3 buổi mỗi tuần." },
      { heading: "Cardio cường độ nhẹ", body: "Đi bộ nhanh, đạp xe nhẹ dễ duy trì, ít gây mệt mỏi và phù hợp với mọi thể trạng." },
      { heading: "Kết hợp cả hai", body: "Một tuần lý tưởng có 2 buổi HIIT ngắn và 2–3 buổi cardio nhẹ, kết hợp tập tạ để giữ cơ." },
    ],
  },
];

export type Review = {
  id: string;
  name: string;
  memberFor: string;
  rating: number;
  date: string;
  content: string;
  topic: string;
};

export const REVIEWS: Review[] = [
  { id: "r1", name: "Nguyễn Minh Hoàng", memberFor: "Hội viên 8 tháng", rating: 5, date: "2026-09-20", topic: "Huấn luyện viên", content: "Huấn luyện viên theo sát từng động tác nên mình tự tin tập tạ nặng mà không lo chấn thương. Lịch tập được nhắc rất đúng giờ." },
  { id: "r2", name: "Trương Thị Lan", memberFor: "Hội viên 1 năm", rating: 5, date: "2026-09-15", topic: "Lớp nhóm", content: "Lớp yoga buổi sáng của chị Phương rất dễ chịu, phòng sạch và mát. Sau 3 tháng mình hết hẳn đau vai gáy." },
  { id: "r3", name: "Lý Gia Huy", memberFor: "Hội viên 4 tháng", rating: 4, date: "2026-09-10", topic: "Cơ sở vật chất", content: "Máy móc mới, đủ tạ. Giờ cao điểm 18:00–19:30 hơi đông nhưng vẫn không phải chờ máy quá lâu." },
  { id: "r4", name: "Phan Ngọc Ánh", memberFor: "Hội viên 6 tháng", rating: 5, date: "2026-09-02", topic: "Huấn luyện viên", content: "Mình giảm được 7 kg sau gói PT 24 buổi với anh Đức. Thực đơn dễ làm, không phải ăn kiêng khổ sở." },
  { id: "r5", name: "Hồ Thanh Tùng", memberFor: "Hội viên 2 năm", rating: 5, date: "2026-08-27", topic: "Dịch vụ", content: "Nhân viên lễ tân thân thiện, check-in bằng QR rất nhanh. Phòng xông hơi là điểm cộng lớn sau mỗi buổi tập." },
  { id: "r6", name: "Đỗ Khánh Linh", memberFor: "Hội viên 3 tháng", rating: 4, date: "2026-08-19", topic: "Cơ sở vật chất", content: "Khu vực dành cho nữ khá riêng tư. Mong phòng tập có thêm vài máy chạy bộ vào buổi tối." },
  { id: "r7", name: "Bùi Văn Thành", memberFor: "Hội viên 10 tháng", rating: 5, date: "2026-08-11", topic: "Lớp nhóm", content: "Lớp kickfit của anh Bảo cực kỳ vui, đổ mồ hôi nhiều mà không thấy chán. Rất đáng tiền." },
  { id: "r8", name: "Mai Thuỳ Dương", memberFor: "Hội viên 5 tháng", rating: 3, date: "2026-08-03", topic: "Dịch vụ", content: "Tập ổn nhưng bãi giữ xe máy buổi tối hơi chật. Hy vọng phòng tập sớm mở rộng thêm." },
];

export const GYM_INFO = {
  name: "GymCore",
  address: "128 Nguyễn Thị Minh Khai, Phường Võ Thị Sáu, Quận 3, TP. Hồ Chí Minh",
  phone: "028 3925 1188",
  hotline: "0909 128 128",
  email: "lienhe@gymcore.vn",
  area: "1.200 m²",
  hours: [
    { day: "Thứ 2 – Thứ 6", time: "05:30 – 22:30" },
    { day: "Thứ 7", time: "06:00 – 22:00" },
    { day: "Chủ nhật & ngày lễ", time: "07:00 – 20:00" },
  ],
  rules: [
    "Mang giày thể thao và khăn tập cá nhân khi vào khu tập.",
    "Trả tạ về đúng vị trí sau khi sử dụng.",
    "Không mang thức ăn vào khu vực tập luyện.",
    "Trẻ em dưới 15 tuổi cần có người giám hộ đi cùng.",
  ],
};

export const FACILITIES = [
  { key: "weights", title: "Khu tạ tự do", desc: "Hơn 120 thiết bị tạ và máy tập nhập khẩu, được bảo dưỡng hằng tháng.", floor: "Tầng 1" },
  { key: "cardio", title: "Khu cardio", desc: "40 máy chạy, xe đạp và máy leo cầu thang có màn hình theo dõi nhịp tim.", floor: "Tầng 2" },
  { key: "studio", title: "Phòng lớp nhóm", desc: "Yoga, HIIT và kickfit trong phòng cách âm, điều hoà riêng.", floor: "Tầng 3" },
  { key: "sauna", title: "Phòng tắm & xông hơi", desc: "Nước nóng 24/24, khu xông hơi khô riêng cho nam và nữ.", floor: "Tầng 1" },
  { key: "parking", title: "Bãi đỗ xe", desc: "Miễn phí cho hội viên, có bảo vệ trực suốt giờ mở cửa.", floor: "Tầng hầm" },
  { key: "lounge", title: "Quầy nước & wifi", desc: "Nước uống miễn phí, wifi tốc độ cao và khu nghỉ chờ.", floor: "Tầng 1" },
] as const;

export function avgRating(reviews: Review[]) {
  return reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
}

export function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return ((parts.at(-2)?.[0] ?? "") + (parts.at(-1)?.[0] ?? "")).toUpperCase();
}
