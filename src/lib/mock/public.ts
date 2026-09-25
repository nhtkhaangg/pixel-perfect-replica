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
    trainerId: "coach-minh-tu",
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
    trainerId: "coach-lan-anh",
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
    trainerId: "coach-quoc-bao",
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
  avatarInitials?: string;
  avatarBg?: string;
  certificates: { name: string; issuer: string; year: number }[];
  schedule: { day: string; slots: string[] }[];
};

export const TRAINERS: Trainer[] = [
  {
    id: "coach-minh-tu",
    name: "Coach Minh Tú",
    specialty: "MASTER PT • TĂNG CƠ",
    tags: ["Tăng cơ", "Phục hồi", "Dinh dưỡng"],
    experienceYears: 8,
    rating: 4.9,
    reviewCount: 120,
    avatarInitials: "MT",
    avatarBg: "from-amber-500/20 to-orange-600/30",
    bio: "Chuyên gia thiết kế giáo án tăng cơ, phục hồi chuyển động khớp và lập chế độ dinh dưỡng thể hình nâng cao. Đã đồng hành giúp hơn 500 học viên thay đổi hình thể ngoạn mục.",
    certificates: [
      { name: "NASM Certified Personal Trainer", issuer: "NASM", year: 2018 },
      { name: "IFBB Bodybuilding Coach", issuer: "IFBB", year: 2021 },
      { name: "Chuyên gia Dinh dưỡng Thể hình", issuer: "ISSN", year: 2023 },
    ],
    schedule: [
      { day: "Thứ 2", slots: ["06:00", "07:30", "18:00"] },
      { day: "Thứ 4", slots: ["06:00", "17:30", "19:00"] },
      { day: "Thứ 6", slots: ["07:30", "18:00"] },
    ],
  },
  {
    id: "coach-lan-anh",
    name: "Coach Lan Anh",
    specialty: "WELLNESS • YOGA & PILATES",
    tags: ["Yoga", "Pilates", "Dẻo dai", "Thiền"],
    experienceYears: 6,
    rating: 5.0,
    reviewCount: 88,
    avatarInitials: "LA",
    avatarBg: "from-pink-500/20 to-rose-600/30",
    bio: "Huấn luyện viên Yoga Hatha & Vinyasa quốc tế. Tập trung cải thiện độ dẻo dai toàn thân, điều hòa hơi thở, giải tỏa stress và phục hồi đau mỏi cổ vai gáy.",
    certificates: [
      { name: "Yoga Alliance RYT-500", issuer: "Yoga Alliance", year: 2019 },
      { name: "Pilates Master Trainer", issuer: "PMA", year: 2022 },
      { name: "Trị liệu tâm lý & vận động", issuer: "ĐH Y Dược", year: 2023 },
    ],
    schedule: [
      { day: "Thứ 3", slots: ["06:30", "09:00", "18:30"] },
      { day: "Thứ 5", slots: ["06:30", "18:30"] },
      { day: "Thứ 7", slots: ["08:00", "10:00"] },
    ],
  },
  {
    id: "coach-quoc-bao",
    name: "Coach Quốc Bảo",
    specialty: "SENIOR • GIẢM MỠ & HIIT",
    tags: ["Giảm mỡ", "HIIT", "Tabata", "Thể lực"],
    experienceYears: 10,
    rating: 4.8,
    reviewCount: 156,
    avatarInitials: "QB",
    avatarBg: "from-blue-500/20 to-cyan-600/30",
    bio: "Chuyên gia giảm béo cấp tốc thông qua các giáo án cường độ cao HIIT/Tabata, cải thiện sức bền tim mạch và thiết kế lối sống khoa học bền vững.",
    certificates: [
      { name: "ACE Certified Health Coach", issuer: "ACE", year: 2017 },
      { name: "HIIT Performance Trainer", issuer: "Les Mills", year: 2020 },
      { name: "Trọng tài Thể hình Quốc gia", issuer: "VBFF", year: 2022 },
    ],
    schedule: [
      { day: "Thứ 2", slots: ["17:00", "19:30"] },
      { day: "Thứ 3", slots: ["06:00", "17:00"] },
      { day: "Chủ nhật", slots: ["08:00", "09:30"] },
    ],
  },
  {
    id: "pt-hoang-nam",
    name: "PT Hoàng Nam",
    specialty: "PHỤC HỒI & TRỊ LIỆU",
    tags: ["Phục hồi", "Trị liệu cột sống", "Tư thế"],
    experienceYears: 9,
    rating: 4.8,
    reviewCount: 87,
    avatarInitials: "HN",
    avatarBg: "from-emerald-500/20 to-teal-600/30",
    bio: "Nền tảng chuyên sâu về Vật lý trị liệu và chỉnh dáng tư thế. Đồng hành cùng hội viên bị đau cột sống thắt lưng, thoái hóa khớp và người muốn vận động an toàn.",
    certificates: [
      { name: "Cử nhân Vật lý trị liệu", issuer: "ĐH Y Dược", year: 2016 },
      { name: "NASM Corrective Exercise Specialist", issuer: "NASM", year: 2021 },
    ],
    schedule: [
      { day: "Thứ 2", slots: ["09:00", "14:00"] },
      { day: "Thứ 4", slots: ["09:00", "14:00"] },
      { day: "Thứ 6", slots: ["09:00", "18:00"] },
    ],
  },
  {
    id: "coach-thu-ha",
    name: "Coach Thu Hà",
    specialty: "THỂ HÌNH NỮ & GLUTE",
    tags: ["Độ dáng", "Glute", "Siết eo", "Nữ giới"],
    experienceYears: 4,
    rating: 4.7,
    reviewCount: 76,
    avatarInitials: "TH",
    avatarBg: "from-purple-500/20 to-indigo-600/30",
    bio: "Chuyên thiết kế giáo án định hình đường cong, phát triển vòng 3 và siết eo cho phái nữ. Hướng dẫn tận tình, phong cách hiện đại và giàu động lực.",
    certificates: [
      { name: "ISSA Certified Personal Trainer", issuer: "ISSA", year: 2021 },
      { name: "Women's Fitness Specialist", issuer: "NASM", year: 2023 },
    ],
    schedule: [
      { day: "Thứ 4", slots: ["07:00", "10:00"] },
      { day: "Thứ 6", slots: ["17:30", "19:00"] },
      { day: "Thứ 7", slots: ["07:00", "09:00"] },
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
    id: "top-5-thuc-pham-giup-phuc-hoi-co-bap-than-toc-sau-tap",
    title: "Top 5 thực phẩm giúp phục hồi cơ bắp thần tốc sau tập",
    category: "Dinh dưỡng",
    excerpt: "Dinh dưỡng sau tập quyết định 70% kết quả tăng cơ giảm mỡ. Khám phá 5 nguồn dinh dưỡng vàng bù đắp glycogen và phục hồi mô cơ.",
    author: "Coach Minh Tú",
    publishedAt: "2026-09-22",
    readMinutes: 8,
    content: [
      { heading: "Tầm quan trọng của dinh dưỡng sau tập", body: "Khi tập luyện nặng, các sợi cơ bị rách siêu vi (micro-tears) và lượng glycogen tích trữ cạn kiệt. Cửa sổ đồng hóa sau tập cần nguồn dinh dưỡng phục hồi kịp thời." },
      { heading: "Whey Protein & Chuối tiêu", body: "Cung cấp chuỗi axit amin chuỗi nhánh (BCAA) hấp thu siêu tốc, kết hợp carbs nhanh từ chuối tiêu giúp kích hoạt cơ chế tổng hợp protein cơ bắp tức thì." },
      { heading: "Ức gà, Trứng gà & Quả mọng", body: "Lòng đỏ trứng giàu Vitamin D, cholesterol tốt hỗ trợ testosterone, trong khi việt quất chống oxy hóa giảm đau nhức cơ sau tập (DOMS)." },
    ],
  },
  {
    id: "lich-tap-push-pull-leg-cho-nguoi-ban-ron",
    title: "Lịch tập Push–Pull–Leg cho người bận rộn",
    category: "Tập luyện",
    excerpt: "Giáo án phân chia nhóm cơ kinh điển được tinh chỉnh cho người đi làm chỉ có 3-4 buổi/tuần.",
    author: "PT Hoàng Nam",
    publishedAt: "2026-09-18",
    readMinutes: 6,
    content: [
      { heading: "Cấu trúc Push - Pull - Legs", body: "Buổi 1 tập cơ đẩy (Ngực, Vai, Tay sau); Buổi 2 tập cơ kéo (Lưng, Xô, Tay trước); Buổi 3 tập Thân dưới (Đùi trước, Đùi sau, Mông, Bắp chân)." },
      { heading: "Tập trung cường độ hơn thể tích", body: "Thực hiện 4-5 bài tập chất lượng mỗi buổi, nghỉ 90-120 giây giữa các hiệp nặng để đảm bảo kích thích cơ bắp tối đa trong 50 phút." },
    ],
  },
  {
    id: "cach-duy-tri-dong-luc-tap-luyen-moi-ngay",
    title: "Cách duy trì động lực tập luyện mỗi ngày",
    category: "Tâm lý & Động lực",
    excerpt: "Bí quyết biến việc tập luyện thành thói quen tự nhiên không cần dựa vào ý chí nhất thời.",
    author: "Coach Lan Anh",
    publishedAt: "2026-09-15",
    readMinutes: 5,
    content: [
      { heading: "Nguyên tắc 2 phút", body: "Chỉ cần xỏ giày và bước đến phòng gym trong 2 phút đầu tiên. Khi đã ở trong không gian tràn đầy năng lượng, cơ thể sẽ tự nhiên hòa nhập." },
      { heading: "Đo lường tiến độ định kỳ", body: "Theo dõi chỉ số InBody và ghi lại hình ảnh cơ thể hàng tháng để thấy sự thay đổi rõ rệt từng ngày." },
    ],
  },
  {
    id: "giam-dau-lung-van-phong",
    title: "5 bài tập giảm đau lưng cho dân văn phòng",
    category: "Phục hồi",
    excerpt: "Chỉ 15 phút mỗi ngày với các bài kéo giãn cơ hông và kích hoạt cơ lõi để giải phóng cột sống.",
    author: "PT Hoàng Nam",
    publishedAt: "2026-09-08",
    readMinutes: 5,
    content: [
      { heading: "Nguyên nhân tư thế ngồi sai", body: "Ngồi làm việc liên tục khiến cơ gấp hông co ngắn, cơ mông bị ức chế dẫn đến áp lực dồn hết lên thắt lưng L4-L5." },
      { heading: "Các bài tập kích hoạt", body: "Thực hiện tư thế Cat-Cow, Glute Bridge, Bird-Dog và World's Greatest Stretch mỗi ngày." },
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
  { id: "r1", name: "Lê Minh Quân", memberFor: "Hội viên 8 tháng", rating: 5, date: "2026-09-20", topic: "Huấn luyện viên", content: "Coach Tú kèm rất sát, sửa tư thế squat rất chi tiết và có tâm. Buổi tập lúc nào cũng tràn đầy năng lượng và hiệu quả." },
  { id: "r2", name: "Bích Phượng", memberFor: "Hội viên 1 năm", rating: 5, date: "2026-09-15", topic: "Lớp nhóm & Yoga", content: "Lớp Yoga của cô Lan Anh nhẹ nhàng, dễ chịu, giải tỏa căng thẳng sau giờ làm việc rất tốt. Phòng tập thơm tinh dầu sả chanh cực thư giãn." },
  { id: "r3", name: "Đức Trung", memberFor: "Hội viên 6 tháng", rating: 5, date: "2026-09-10", topic: "Huấn luyện viên", content: "Giáo án HIIT giảm mỡ của Coach Bảo đốt calo khủng khiếp, mệt nhưng mình đã giảm được 8kg sau 2 tháng mà không bị chùng da." },
  { id: "r4", name: "Hồng Hạnh", memberFor: "Hội viên 12 tháng", rating: 5, date: "2026-09-02", topic: "Cơ sở vật chất", content: "Phòng gym đẹp nhất Cần Thơ, máy móc xịn xò Technogym. Thích nhất là bãi giữ xe rộng rãi và phòng xông hơi đá muối Himalaya sau khi tập." },
  { id: "r5", name: "Nguyễn Thanh Tùng", memberFor: "Hội viên 2 năm", rating: 5, date: "2026-08-27", topic: "Dịch vụ", content: "Check-in QR code trên app siêu mượt. Nhân viên lễ tân và HLV thân thiện, nước uống ion kiềm và khăn tập phát miễn phí mỗi ngày." },
  { id: "r6", name: "Mai Vy", memberFor: "Hội viên 4 tháng", rating: 5, date: "2026-08-19", topic: "Phục hồi", content: "Lớp Pilates sửa dáng của cô Lan Anh siêu thích, mình tập 2 tháng thấy hết hẳn đau thắt lưng dân văn phòng." },
];

export const GYM_INFO = {
  name: "OmniGym Fitness & Yoga Center",
  slogan: "Nâng tầm thể lực - Bứt phá mọi giới hạn",
  established: "2024",
  address: "Số 123 Đường 3/2, Phường Xuân Khánh, Quận Ninh Kiều, TP. Cần Thơ",
  phone: "0292 388 9988",
  hotline: "1900 8899",
  email: "contact@omnigym.vn",
  area: "2.500 m² Olympic Hub",
  occupancy: 86,
  maxCapacity: 350,
  status: "Đang mở cửa",
  hoursText: "05:30 - 22:00 (Hàng ngày)",
  hours: [
    { day: "Thứ 2 – Thứ 6", time: "05:30 – 22:00" },
    { day: "Thứ 7 – Chủ nhật", time: "06:00 – 21:30" },
    { day: "Ngày lễ", time: "07:00 – 20:00" },
  ],
  rules: [
    "Mang giày thể thao sạch và khăn tập cá nhân khi vào khu vực tập luyện.",
    "Trả tạ và phụ kiện về đúng giá đỡ sau khi hoàn thành hiệp tập.",
    "Lau sạch mồ hôi trên ghế đệm thiết bị sau khi sử dụng.",
    "Trẻ em dưới 15 tuổi cần có phụ huynh hoặc HLV giám hộ đi cùng.",
  ],
};

export const FACILITIES = [
  { key: "weights", title: "Khu tạ tự do (Free Weights)", desc: "Dàn Squat rack Rogue, Dumbbell đến 50kg, ghế đẩy tạ tiêu chuẩn Olympic.", floor: "Tầng 1" },
  { key: "cardio", title: "Cardio View Panorama", desc: "Hơn 40 máy chạy bộ Technogym, StairMaster leo cầu thang có màn hình giải trí.", floor: "Tầng 2" },
  { key: "studio", title: "Yoga & Pilates Studio", desc: "Sàn gỗ sồi, ánh sáng tự nhiên điều hòa ion âm, thảm tập và bóng định hình.", floor: "Tầng 3" },
  { key: "sauna", title: "Xông hơi Đá muối Himalaya", desc: "Phòng xông hơi khô đá muối và ướt thảo dược nam/nữ riêng biệt, thư giãn thải độc.", floor: "Tầng 1" },
  { key: "parking", title: "Bãi đỗ ô tô & xe máy 24/7", desc: "Hầm giữ xe thông minh, mái che, camera an ninh và bảo vệ túc trực 24/24.", floor: "Tầng hầm" },
  { key: "lounge", title: "Omni Lounge & InBody Lab", desc: "Máy đo InBody 770 y khoa, quầy Protein Shake bar và wifi tốc độ cao 500Mbps.", floor: "Tầng 1" },
] as const;

export function avgRating(reviews: Review[]) {
  return reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
}

export function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return ((parts.at(-2)?.[0] ?? "") + (parts.at(-1)?.[0] ?? "")).toUpperCase();
}
