/** Dữ liệu mẫu cho khu vực nhân viên và quản lý. */
export type PkgKind = "MEMBERSHIP" | "PT";
export type OpsPackage = { id: string; name: string; kind: PkgKind; price: number; months: number; sessions: number | null; sold: number; active: number; status: "active" | "inactive"; benefits: string[]; trainer?: string };
export const OPS_PACKAGES: OpsPackage[] = [
  { id: "m1", name: "Hội viên 1 tháng", kind: "MEMBERSHIP", price: 600000, months: 1, sessions: null, sold: 214, active: 88, status: "active", benefits: ["Tập không giới hạn", "Tủ đồ miễn phí"] },
  { id: "m2", name: "Hội viên 3 tháng", kind: "MEMBERSHIP", price: 1600000, months: 3, sessions: null, sold: 172, active: 121, status: "active", benefits: ["Tập không giới hạn", "1 buổi đánh giá thể trạng", "Tủ đồ miễn phí"] },
  { id: "m3", name: "Hội viên 12 tháng", kind: "MEMBERSHIP", price: 5400000, months: 12, sessions: null, sold: 96, active: 90, status: "active", benefits: ["Tập không giới hạn", "4 buổi đánh giá thể trạng", "Khăn tập", "Bảo lưu 30 ngày"] },
  { id: "m4", name: "Hội viên sinh viên 6 tháng", kind: "MEMBERSHIP", price: 2400000, months: 6, sessions: null, sold: 40, active: 0, status: "inactive", benefits: ["Khung giờ 9:00–16:00"] },
  { id: "t1", name: "PT 12 buổi", kind: "PT", price: 5400000, months: 2, sessions: 12, sold: 63, active: 21, status: "active", benefits: ["Giáo án cá nhân", "Theo dõi chỉ số"] },
  { id: "t2", name: "PT 24 buổi", kind: "PT", price: 9600000, months: 3, sessions: 24, sold: 48, active: 30, status: "active", benefits: ["Giáo án cá nhân", "Kế hoạch dinh dưỡng", "Chat với HLV"] },
  { id: "t3", name: "PT 36 buổi", kind: "PT", price: 13500000, months: 5, sessions: 36, sold: 22, active: 17, status: "active", benefits: ["Giáo án cá nhân", "Dinh dưỡng", "Đo InBody hằng tháng"] },
];
export const findPkg = (id?: string) => OPS_PACKAGES.find((p) => p.id === id) ?? OPS_PACKAGES[0]!;

export type Payment = { id: string; code: string; customer: string; phone: string; item: string; amount: number; method: "Tiền mặt" | "Chuyển khoản" | "VNPay" | "Thẻ"; time: string; status: "paid" | "pending" | "failed" | "refunded"; staff: string };
const names = ["Nguyễn Thu Hà", "Lê Quốc Bảo", "Phạm Minh Anh", "Võ Thành Đạt", "Đặng Ngọc Lan", "Huỳnh Gia Huy", "Trương Mỹ Linh", "Bùi Đức Trí", "Ngô Khánh Vy", "Đỗ Hải Nam", "Lý Thanh Tâm", "Mai Phương Thảo"];
const items = ["Hội viên 3 tháng", "PT 24 buổi", "Hội viên 1 tháng", "Hội viên 12 tháng", "PT 12 buổi", "PT 36 buổi"];
const prices = [1600000, 9600000, 600000, 5400000, 5400000, 13500000];
const methods = ["Chuyển khoản", "VNPay", "Tiền mặt", "Thẻ"] as const;
const st = ["paid", "paid", "pending", "paid", "failed", "paid", "refunded", "paid", "pending", "paid", "paid", "paid"] as const;
export const PAYMENTS: Payment[] = names.map((n, i) => ({
  id: `pay${i + 1}`, code: `GC-2609-${String(1040 + i)}`, customer: n, phone: `09${String(10000000 + i * 734521).slice(0, 8)}`,
  item: items[i % 6]!, amount: prices[i % 6]!, method: methods[i % 4]!, time: `${String(25 - Math.floor(i / 3)).padStart(2, "0")}/09/2026 ${String(8 + (i % 10)).padStart(2, "0")}:${String((i * 17) % 60).padStart(2, "0")}`,
  status: st[i]!, staff: i % 2 ? "Phan Thị Hồng" : "Lâm Quốc Việt",
}));
export const findPayment = (id?: string) => PAYMENTS.find((p) => p.id === id) ?? PAYMENTS[0]!;

export type Article = { id: string; title: string; category: string; author: string; date: string; views: number; status: "published" | "draft" | "scheduled"; excerpt: string; body: string };
export const ARTICLES: Article[] = [
  { id: "a1", title: "5 sai lầm khi squat khiến bạn đau gối", category: "Kỹ thuật", author: "Trần Minh Khang", date: "2026-09-22", views: 1840, status: "published", excerpt: "Đầu gối đổ vào trong, nhón gót... và cách khắc phục.", body: "Squat là bài tập nền tảng nhưng cũng dễ sai nhất.\n\n1. Đầu gối đổ vào trong\n2. Nhón gót\n3. Cong lưng dưới\n4. Hạ quá nhanh\n5. Nín thở sai thời điểm" },
  { id: "a2", title: "Ăn gì trước và sau buổi tập buổi sáng?", category: "Dinh dưỡng", author: "Phan Thị Hồng", date: "2026-09-18", views: 2310, status: "published", excerpt: "Gợi ý bữa ăn nhẹ dễ chuẩn bị cho người đi làm.", body: "Trước tập 60 phút: chuối, yến mạch.\nSau tập: đạm và tinh bột." },
  { id: "a3", title: "Lịch tập 3 buổi/tuần cho người mới", category: "Giáo án", author: "Trần Minh Khang", date: "2026-09-30", views: 0, status: "scheduled", excerpt: "Toàn thân, dễ theo, phù hợp người bận rộn.", body: "Buổi A, B, C xen kẽ..." },
  { id: "a4", title: "Giờ vàng tập luyện tại GymCore tháng 10", category: "Tin phòng gym", author: "Lâm Quốc Việt", date: "2026-09-24", views: 0, status: "draft", excerpt: "Khung giờ vắng người để tập thoải mái.", body: "Từ 9:00 đến 11:00 và 14:00 đến 16:00..." },
];
export const findArticle = (id?: string) => ARTICLES.find((a) => a.id === id) ?? ARTICLES[0]!;

export type GymReview = { id: string; customer: string; rating: number; date: string; content: string; topic: string; reply?: string; trainer?: string };
export const GYM_REVIEWS: GymReview[] = [
  { id: "g1", customer: "Trương Mỹ Linh", rating: 5, date: "2026-09-24", topic: "Cơ sở vật chất", content: "Máy móc mới, phòng thay đồ sạch sẽ, có máy sấy tóc." },
  { id: "g2", customer: "Bùi Đức Trí", rating: 3, date: "2026-09-23", topic: "Giờ cao điểm", content: "Khung 18h–20h quá đông, phải chờ máy chạy bộ gần 15 phút." },
  { id: "g3", customer: "Ngô Khánh Vy", rating: 4, date: "2026-09-20", topic: "Lễ tân", content: "Nhân viên thân thiện, check-in QR nhanh.", reply: "Cảm ơn chị Vy đã góp ý! GymCore luôn cố gắng phục vụ tốt nhất." },
  { id: "g4", customer: "Đỗ Hải Nam", rating: 2, date: "2026-09-19", topic: "Điều hoà", content: "Khu tạ tự do buổi trưa khá nóng, điều hoà không đủ mát." },
];
export const TRAINER_REVIEWS: GymReview[] = [
  { id: "tr1", customer: "Nguyễn Thu Hà", trainer: "Trần Minh Khang", rating: 5, date: "2026-09-22", topic: "Kỹ thuật", content: "Chỉnh kỹ thuật squat rất chi tiết." },
  { id: "tr2", customer: "Lý Thanh Tâm", trainer: "Nguyễn Thảo Vy", rating: 4, date: "2026-09-21", topic: "Giáo án", content: "Bài tập đa dạng, nhưng cần nhắc nhở ăn uống nhiều hơn." },
  { id: "tr3", customer: "Mai Phương Thảo", trainer: "Phạm Đức Long", rating: 2, date: "2026-09-17", topic: "Đúng giờ", content: "Hai buổi liên tiếp HLV đến trễ 15 phút." },
  { id: "tr4", customer: "Lê Quốc Bảo", trainer: "Trần Minh Khang", rating: 5, date: "2026-09-18", topic: "Chuyên môn", content: "Luôn điều chỉnh khi lưng mình đau.", reply: "Cảm ơn anh Bảo đã tin tưởng." },
];
export const findGymReview = (id?: string) => GYM_REVIEWS.find((r) => r.id === id) ?? GYM_REVIEWS[0]!;
export const findTrainerReview = (id?: string) => TRAINER_REVIEWS.find((r) => r.id === id) ?? TRAINER_REVIEWS[0]!;

export type Staff = { id: string; name: string; role: string; email: string; phone: string; shift: string; joined: string; status: "active" | "inactive"; salary: number };
export const STAFF: Staff[] = [
  { id: "st1", name: "Lâm Quốc Việt", role: "Lễ tân", email: "viet.lam@gymcore.vn", phone: "0901 234 567", shift: "Ca sáng 05:30–13:30", joined: "2023-02-01", status: "active", salary: 9000000 },
  { id: "st2", name: "Phan Thị Hồng", role: "Lễ tân", email: "hong.phan@gymcore.vn", phone: "0902 345 678", shift: "Ca chiều 13:30–22:00", joined: "2024-06-15", status: "active", salary: 8500000 },
  { id: "st3", name: "Trịnh Văn Lộc", role: "Kỹ thuật", email: "loc.trinh@gymcore.vn", phone: "0903 456 789", shift: "Hành chính 08:00–17:00", joined: "2022-09-01", status: "active", salary: 10000000 },
  { id: "st4", name: "Cao Thị Mai", role: "Tạp vụ", email: "mai.cao@gymcore.vn", phone: "0904 567 890", shift: "Ca sáng 05:30–13:30", joined: "2025-01-10", status: "active", salary: 7000000 },
  { id: "st5", name: "Hồ Minh Tuấn", role: "Kinh doanh", email: "tuan.ho@gymcore.vn", phone: "0905 678 901", shift: "Hành chính 08:00–17:00", joined: "2024-03-01", status: "inactive", salary: 9500000 },
];
export const findStaff = (id?: string) => STAFF.find((s) => s.id === id) ?? STAFF[0]!;

export type OpsTrainer = { id: string; name: string; specialty: string; experience: number; rating: number; customers: number; sessionsMonth: number; revenue: number; status: "active" | "pending" | "inactive"; certPending: number; phone: string; email: string };
export const OPS_TRAINERS: OpsTrainer[] = [
  { id: "tn1", name: "Trần Minh Khang", specialty: "Tăng cơ, giảm mỡ", experience: 7, rating: 4.8, customers: 6, sessionsMonth: 83, revenue: 38400000, status: "active", certPending: 1, phone: "0908 123 456", email: "khang.tran@gymcore.vn" },
  { id: "tn2", name: "Nguyễn Thảo Vy", specialty: "Yoga, pilates", experience: 5, rating: 4.9, customers: 9, sessionsMonth: 96, revenue: 41200000, status: "active", certPending: 0, phone: "0908 222 333", email: "vy.nguyen@gymcore.vn" },
  { id: "tn3", name: "Phạm Đức Long", specialty: "Sức mạnh, powerlifting", experience: 4, rating: 4.3, customers: 5, sessionsMonth: 61, revenue: 25100000, status: "active", certPending: 0, phone: "0908 444 555", email: "long.pham@gymcore.vn" },
  { id: "tn4", name: "Lê Hoàng Yến", specialty: "Giảm cân, cardio", experience: 3, rating: 4.6, customers: 7, sessionsMonth: 72, revenue: 30800000, status: "active", certPending: 0, phone: "0908 666 777", email: "yen.le@gymcore.vn" },
  { id: "tn5", name: "Đinh Quang Hiếu", specialty: "Phục hồi chức năng", experience: 6, rating: 0, customers: 0, sessionsMonth: 0, revenue: 0, status: "pending", certPending: 3, phone: "0908 888 999", email: "hieu.dinh@gmail.com" },
];
export const findTrainer = (id?: string) => OPS_TRAINERS.find((t) => t.id === id) ?? OPS_TRAINERS[0]!;

export const TRAINER_CERTS = [
  { id: "vc1", name: "Cử nhân Giáo dục thể chất", issuer: "ĐH Sư phạm TDTT TP.HCM", code: "SPTDTT-2019-0412", issued: "2019-07-01", expires: "Vô thời hạn", status: "pending" },
  { id: "vc2", name: "Chứng chỉ Phục hồi chức năng vận động", issuer: "Trung tâm PHCN Sài Gòn", code: "PHCN-0921", issued: "2024-03-15", expires: "2027-03-15", status: "pending" },
  { id: "vc3", name: "Sơ cấp cứu & CPR", issuer: "Hội Chữ thập đỏ Việt Nam", code: "CTD-CPR-7781", issued: "2026-01-10", expires: "2028-01-10", status: "pending" },
];

export type Facility = { id: string; name: string; zone: string; qty: number; brand: string; bought: string; lastMaint: string; nextMaint: string; status: "active" | "warning" | "locked"; note: string };
export const FACILITIES: Facility[] = [
  { id: "f1", name: "Máy chạy bộ Technogym Run 700", zone: "Khu cardio", qty: 12, brand: "Technogym", bought: "2024-05-01", lastMaint: "2026-09-01", nextMaint: "2026-12-01", status: "active", note: "2 máy vừa thay băng tải." },
  { id: "f2", name: "Xe đạp tập Matrix IC7", zone: "Phòng đạp xe", qty: 20, brand: "Matrix", bought: "2023-11-10", lastMaint: "2026-08-15", nextMaint: "2026-11-15", status: "active", note: "" },
  { id: "f3", name: "Giàn squat Rogue", zone: "Khu tạ tự do", qty: 6, brand: "Rogue", bought: "2022-08-20", lastMaint: "2026-07-10", nextMaint: "2026-10-10", status: "warning", note: "1 giàn lỏng chốt an toàn, cần kiểm tra." },
  { id: "f4", name: "Máy kéo cáp đa năng", zone: "Khu máy", qty: 4, brand: "Life Fitness", bought: "2023-03-01", lastMaint: "2026-06-30", nextMaint: "2026-09-30", status: "locked", note: "Đứt dây cáp số 2, đang chờ linh kiện." },
  { id: "f5", name: "Điều hoà trung tâm Daikin", zone: "Toàn phòng tập", qty: 8, brand: "Daikin", bought: "2022-01-15", lastMaint: "2026-05-20", nextMaint: "2026-09-20", status: "warning", note: "Khu tạ tự do chưa đủ mát buổi trưa." },
  { id: "f6", name: "Phòng xông hơi", zone: "Phòng thay đồ", qty: 2, brand: "Harvia", bought: "2023-06-01", lastMaint: "2026-09-10", nextMaint: "2026-12-10", status: "active", note: "" },
];
export const findFacility = (id?: string) => FACILITIES.find((f) => f.id === id) ?? FACILITIES[0]!;

export type Refund = { id: string; customer: string; item: string; paid: number; amount: number; reason: string; created: string; status: "pending" | "approved" | "rejected"; usedSessions: number };
export const REFUNDS: Refund[] = [
  { id: "rf1", customer: "Mai Phương Thảo", item: "PT 24 buổi", paid: 9600000, amount: 6400000, reason: "Chuyển công tác ra Hà Nội, không thể tiếp tục tập.", created: "2026-09-23", status: "pending", usedSessions: 8 },
  { id: "rf2", customer: "Đỗ Hải Nam", item: "Hội viên 12 tháng", paid: 5400000, amount: 2700000, reason: "Chấn thương cột sống, bác sĩ yêu cầu ngừng tập.", created: "2026-09-20", status: "pending", usedSessions: 0 },
  { id: "rf3", customer: "Trương Mỹ Linh", item: "PT 12 buổi", paid: 5400000, amount: 5400000, reason: "Thanh toán trùng 2 lần.", created: "2026-09-12", status: "approved", usedSessions: 0 },
  { id: "rf4", customer: "Bùi Đức Trí", item: "Hội viên 3 tháng", paid: 1600000, amount: 800000, reason: "Không hài lòng giờ cao điểm.", created: "2026-09-05", status: "rejected", usedSessions: 0 },
];
export const findRefund = (id?: string) => REFUNDS.find((r) => r.id === id) ?? REFUNDS[0]!;

export const REVENUE_MONTHLY = [
  { month: "T4", membership: 182, pt: 96 }, { month: "T5", membership: 195, pt: 110 }, { month: "T6", membership: 210, pt: 124 },
  { month: "T7", membership: 228, pt: 131 }, { month: "T8", membership: 219, pt: 142 }, { month: "T9", membership: 241, pt: 158 },
];
export const CHECKINS_DAILY = [
  { day: "19/09", count: 412 }, { day: "20/09", count: 468 }, { day: "21/09", count: 355 }, { day: "22/09", count: 437 },
  { day: "23/09", count: 451 }, { day: "24/09", count: 489 }, { day: "25/09", count: 318 },
];
export const CHECKINS_HOURLY = [
  { hour: "05h", count: 38 }, { hour: "06h", count: 72 }, { hour: "07h", count: 55 }, { hour: "09h", count: 21 }, { hour: "11h", count: 26 },
  { hour: "12h", count: 34 }, { hour: "15h", count: 29 }, { hour: "17h", count: 68 }, { hour: "18h", count: 94 }, { hour: "19h", count: 81 }, { hour: "20h", count: 47 }, { hour: "21h", count: 19 },
];

export const STAFF_NOTIFS = [
  { id: "sn1", title: "Thanh toán chờ xác nhận", body: "Phạm Minh Anh chuyển khoản 600.000 VNĐ, cần đối soát.", time: "25/09/2026 09:12", read: false, type: "Thanh toán" },
  { id: "sn2", title: "Đánh giá 2 sao mới", body: "Đỗ Hải Nam phản ánh điều hoà khu tạ tự do.", time: "19/09/2026 13:40", read: false, type: "Đánh giá" },
  { id: "sn3", title: "Bài viết đã lên lịch", body: "“Lịch tập 3 buổi/tuần cho người mới” sẽ đăng ngày 30/09.", time: "24/09/2026 16:00", read: true, type: "Bài viết" },
  { id: "sn4", title: "Giao dịch thất bại", body: "Thẻ của Đặng Ngọc Lan bị từ chối.", time: "24/09/2026 18:22", read: true, type: "Thanh toán" },
];
export const MANAGER_NOTIFS = [
  { id: "mn1", title: "Hồ sơ HLV mới chờ duyệt", body: "Đinh Quang Hiếu đăng ký trở thành huấn luyện viên kèm 3 chứng chỉ.", time: "24/09/2026 10:05", read: false, type: "Huấn luyện viên" },
  { id: "mn2", title: "Yêu cầu hoàn tiền mới", body: "Mai Phương Thảo yêu cầu hoàn 6.400.000 VNĐ.", time: "23/09/2026 15:30", read: false, type: "Hoàn tiền" },
  { id: "mn3", title: "Thiết bị bị khoá", body: "Máy kéo cáp đa năng đứt dây cáp số 2.", time: "22/09/2026 08:10", read: false, type: "Cơ sở vật chất" },
  { id: "mn4", title: "Doanh thu tháng 9 vượt mục tiêu", body: "Đạt 399 triệu VNĐ, vượt 6% so với mục tiêu.", time: "21/09/2026 20:00", read: true, type: "Báo cáo" },
];
