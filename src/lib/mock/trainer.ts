/** Dữ liệu mẫu cho khu vực huấn luyện viên (HLV Trần Minh Khang). */
export const ME = {
  name: "Trần Minh Khang",
  email: "khang.tran@gymcore.vn",
  phone: "0908 123 456",
  specialization: "Tăng cơ, giảm mỡ, phục hồi chấn thương nhẹ",
  experience: 7,
  rating: 4.8,
  reviewCount: 126,
  bio: "Tốt nghiệp Đại học TDTT TP.HCM, 7 năm huấn luyện cá nhân. Tập trung vào kỹ thuật chuẩn, tiến bộ đo lường được và thói quen dinh dưỡng bền vững cho người đi làm.",
  joined: "2021-03-01",
  hourlyRate: 450000,
};

export type Customer = {
  id: string; name: string; age: number; gender: "Nam" | "Nữ"; goal: string; package: string;
  sessionsDone: number; sessionsTotal: number; weight: number; startWeight: number; bodyFat: number; muscle: number;
  lastSession: string; status: "active" | "warning" | "expired"; phone: string; injuries: string;
};
export const CUSTOMERS: Customer[] = [
  { id: "c1", name: "Nguyễn Thu Hà", age: 29, gender: "Nữ", goal: "Giảm mỡ", package: "PT 24 buổi", sessionsDone: 14, sessionsTotal: 24, weight: 58.4, startWeight: 63.2, bodyFat: 26.1, muscle: 23.8, lastSession: "2026-09-24", status: "active", phone: "0912 345 678", injuries: "Không" },
  { id: "c2", name: "Lê Quốc Bảo", age: 34, gender: "Nam", goal: "Tăng cơ", package: "PT 36 buổi", sessionsDone: 30, sessionsTotal: 36, weight: 74.1, startWeight: 70.5, bodyFat: 16.4, muscle: 35.2, lastSession: "2026-09-23", status: "active", phone: "0903 222 111", injuries: "Đau thắt lưng nhẹ" },
  { id: "c3", name: "Phạm Minh Anh", age: 26, gender: "Nữ", goal: "Săn chắc", package: "PT 12 buổi", sessionsDone: 10, sessionsTotal: 12, weight: 52.0, startWeight: 52.6, bodyFat: 24.0, muscle: 22.1, lastSession: "2026-09-15", status: "warning", phone: "0987 654 321", injuries: "Không" },
  { id: "c4", name: "Võ Thành Đạt", age: 41, gender: "Nam", goal: "Cải thiện sức khoẻ tim mạch", package: "PT 24 buổi", sessionsDone: 6, sessionsTotal: 24, weight: 86.3, startWeight: 88.0, bodyFat: 27.5, muscle: 33.0, lastSession: "2026-09-22", status: "active", phone: "0938 111 999", injuries: "Đầu gối trái" },
  { id: "c5", name: "Đặng Ngọc Lan", age: 31, gender: "Nữ", goal: "Giảm mỡ", package: "PT 12 buổi", sessionsDone: 12, sessionsTotal: 12, weight: 61.0, startWeight: 64.5, bodyFat: 28.3, muscle: 23.0, lastSession: "2026-08-30", status: "expired", phone: "0976 333 444", injuries: "Không" },
  { id: "c6", name: "Huỳnh Gia Huy", age: 22, gender: "Nam", goal: "Tăng cơ", package: "PT 36 buổi", sessionsDone: 18, sessionsTotal: 36, weight: 66.7, startWeight: 66.5, bodyFat: 14.0, muscle: 31.4, lastSession: "2026-09-24", status: "warning", phone: "0909 777 888", injuries: "Không" },
];
export const findCustomer = (id?: string) => CUSTOMERS.find((c) => c.id === id) ?? CUSTOMERS[0]!;

export const METRIC_HISTORY = [
  { date: "01/07", weight: 63.2, bodyFat: 30.0, muscle: 22.6 },
  { date: "15/07", weight: 62.1, bodyFat: 29.1, muscle: 22.9 },
  { date: "01/08", weight: 61.0, bodyFat: 28.2, muscle: 23.1 },
  { date: "15/08", weight: 60.1, bodyFat: 27.4, muscle: 23.3 },
  { date: "01/09", weight: 59.2, bodyFat: 26.8, muscle: 23.6 },
  { date: "15/09", weight: 58.4, bodyFat: 26.1, muscle: 23.8 },
];

export type Session = { id: string; customerId: string; date: string; start: string; end: string; focus: string; room: string; status: "scheduled" | "completed" | "pending" | "cancelled" };
export const SESSIONS: Session[] = [
  { id: "s1", customerId: "c1", date: "2026-09-25", start: "06:00", end: "07:00", focus: "Thân dưới + HIIT", room: "Khu tạ tự do", status: "completed" },
  { id: "s2", customerId: "c2", date: "2026-09-25", start: "07:30", end: "08:30", focus: "Ngực – Vai – Tay sau", room: "Khu tạ tự do", status: "scheduled" },
  { id: "s3", customerId: "c4", date: "2026-09-25", start: "17:00", end: "18:00", focus: "Cardio vùng 2 + Core", room: "Khu cardio", status: "scheduled" },
  { id: "s4", customerId: "c6", date: "2026-09-25", start: "18:30", end: "19:30", focus: "Lưng – Tay trước", room: "Khu máy", status: "scheduled" },
  { id: "s5", customerId: "c3", date: "2026-09-26", start: "06:30", end: "07:30", focus: "Toàn thân", room: "Phòng chức năng", status: "scheduled" },
  { id: "s6", customerId: "c1", date: "2026-09-24", start: "06:00", end: "07:00", focus: "Thân trên", room: "Khu tạ tự do", status: "pending" },
  { id: "s7", customerId: "c2", date: "2026-09-23", start: "07:30", end: "08:30", focus: "Chân", room: "Khu tạ tự do", status: "completed" },
];
export const findSession = (id?: string) => SESSIONS.find((s) => s.id === id) ?? SESSIONS[1]!;

export type Certificate = { id: string; name: string; issuer: string; issued: string; expires: string; status: "approved" | "pending" | "rejected" | "expired"; code: string; note?: string };
export const CERTIFICATES: Certificate[] = [
  { id: "cert1", name: "ACE Certified Personal Trainer", issuer: "American Council on Exercise", issued: "2022-05-10", expires: "2026-11-10", status: "approved", code: "ACE-PT-558213" },
  { id: "cert2", name: "Huấn luyện viên thể hình cấp 2", issuer: "Tổng cục TDTT Việt Nam", issued: "2020-08-01", expires: "2027-08-01", status: "approved", code: "TCTDTT-02-1182" },
  { id: "cert3", name: "Dinh dưỡng thể thao cơ bản", issuer: "Precision Nutrition", issued: "2026-09-10", expires: "2029-09-10", status: "pending", code: "PN-L1-99012" },
  { id: "cert4", name: "Sơ cấp cứu & CPR", issuer: "Hội Chữ thập đỏ Việt Nam", issued: "2023-04-01", expires: "2025-04-01", status: "expired", code: "CTD-CPR-3321" },
  { id: "cert5", name: "Phục hồi chức năng vận động", issuer: "Trung tâm PHCN Sài Gòn", issued: "2026-08-20", expires: "2028-08-20", status: "rejected", code: "PHCN-0921", note: "Ảnh chụp mờ, không đọc được mã chứng chỉ. Vui lòng tải lại bản rõ nét." },
];
export const findCert = (id?: string) => CERTIFICATES.find((c) => c.id === id) ?? CERTIFICATES[0]!;

export type Exercise = { id: string; name: string; muscle: string; equipment: string; level: "Cơ bản" | "Trung bình" | "Nâng cao"; custom: boolean; steps: string[]; tips: string };
export const EXERCISES: Exercise[] = [
  { id: "e1", name: "Squat với tạ đòn", muscle: "Đùi trước, mông", equipment: "Tạ đòn", level: "Trung bình", custom: false, steps: ["Đặt tạ trên cầu vai, chân rộng bằng vai", "Hạ hông như ngồi ghế tới khi đùi song song sàn", "Đẩy gót chân đứng lên, giữ lưng thẳng"], tips: "Không để đầu gối đổ vào trong." },
  { id: "e2", name: "Đẩy ngực tạ đòn", muscle: "Ngực, tay sau", equipment: "Tạ đòn, ghế phẳng", level: "Trung bình", custom: false, steps: ["Nằm ghế, bàn chân chạm sàn", "Hạ tạ chạm giữa ngực", "Đẩy lên, khoá khuỷu nhẹ"], tips: "Giữ bả vai ép sát ghế." },
  { id: "e3", name: "Kéo xà đơn", muscle: "Lưng xô, tay trước", equipment: "Xà đơn", level: "Nâng cao", custom: false, steps: ["Treo người, tay rộng hơn vai", "Kéo ngực lên gần xà", "Hạ chậm có kiểm soát"], tips: "Dùng dây kháng lực nếu chưa kéo được." },
  { id: "e4", name: "Plank", muscle: "Cơ bụng, core", equipment: "Không", level: "Cơ bản", custom: false, steps: ["Chống khuỷu tay dưới vai", "Giữ thân thẳng từ đầu tới gót", "Thở đều"], tips: "Không võng lưng." },
  { id: "e5", name: "Romanian Deadlift", muscle: "Đùi sau, mông", equipment: "Tạ đòn", level: "Trung bình", custom: false, steps: ["Cầm tạ trước đùi", "Đẩy hông ra sau, hạ tạ dọc chân", "Siết mông đứng thẳng"], tips: "Giữ tạ sát chân." },
  { id: "e6", name: "Bước lên bục có tạ tay (Khang)", muscle: "Đùi, mông", equipment: "Tạ tay, bục", level: "Cơ bản", custom: true, steps: ["Cầm tạ tay hai bên", "Bước một chân lên bục, đẩy người lên", "Hạ xuống có kiểm soát, đổi chân"], tips: "Phù hợp học viên đau gối nhẹ khi dùng bục thấp." },
  { id: "e7", name: "Chuỗi core chống xoay (Khang)", muscle: "Core", equipment: "Dây cáp", level: "Trung bình", custom: true, steps: ["Đứng nghiêng với máy cáp", "Đẩy tay thẳng ra trước, chống xoay", "Giữ 2 giây, thu về"], tips: "Dùng cho học viên đau lưng." },
];
export const findExercise = (id?: string) => EXERCISES.find((e) => e.id === id) ?? EXERCISES[0]!;

export type PlanDay = { day: string; title: string; items: { exerciseId: string; sets: number; reps: string; rest: string }[] };
export type LessonPlan = { id: string; name: string; customerId: string; goal: string; weeks: number; status: "active" | "draft" | "completed"; version: number; updated: string; days: PlanDay[] };
export const LESSON_PLANS: LessonPlan[] = [
  { id: "p1", name: "Giảm mỡ 12 tuần – Giai đoạn 2", customerId: "c1", goal: "Giảm 5 kg, giữ khối cơ", weeks: 12, status: "active", version: 3, updated: "2026-09-20",
    days: [
      { day: "Thứ 2", title: "Thân dưới + HIIT", items: [{ exerciseId: "e1", sets: 4, reps: "10", rest: "90 giây" }, { exerciseId: "e5", sets: 3, reps: "12", rest: "75 giây" }, { exerciseId: "e4", sets: 3, reps: "45 giây", rest: "30 giây" }] },
      { day: "Thứ 4", title: "Thân trên", items: [{ exerciseId: "e2", sets: 4, reps: "8–10", rest: "90 giây" }, { exerciseId: "e3", sets: 3, reps: "6–8", rest: "120 giây" }] },
      { day: "Thứ 6", title: "Toàn thân chuyển hoá", items: [{ exerciseId: "e6", sets: 3, reps: "12/chân", rest: "60 giây" }, { exerciseId: "e7", sets: 3, reps: "10/bên", rest: "45 giây" }] },
    ] },
  { id: "p2", name: "Tăng cơ thân trên – Khối lượng", customerId: "c2", goal: "Tăng 2 kg cơ nạc", weeks: 8, status: "active", version: 2, updated: "2026-09-12", days: [
      { day: "Thứ 3", title: "Ngực – Vai", items: [{ exerciseId: "e2", sets: 5, reps: "5", rest: "150 giây" }] },
      { day: "Thứ 5", title: "Lưng", items: [{ exerciseId: "e3", sets: 4, reps: "8", rest: "120 giây" }] },
    ] },
  { id: "p3", name: "Tim mạch & phục hồi gối", customerId: "c4", goal: "Giảm đau gối, tăng sức bền", weeks: 10, status: "draft", version: 1, updated: "2026-09-24", days: [
      { day: "Thứ 2", title: "Cardio + core", items: [{ exerciseId: "e6", sets: 3, reps: "10/chân", rest: "60 giây" }, { exerciseId: "e7", sets: 3, reps: "10/bên", rest: "45 giây" }] },
    ] },
  { id: "p4", name: "Săn chắc 6 tuần", customerId: "c3", goal: "Săn chắc bụng, mông", weeks: 6, status: "completed", version: 4, updated: "2026-08-28", days: [
      { day: "Thứ 3", title: "Toàn thân", items: [{ exerciseId: "e4", sets: 3, reps: "40 giây", rest: "30 giây" }] },
    ] },
];
export const findPlan = (id?: string) => LESSON_PLANS.find((p) => p.id === id) ?? LESSON_PLANS[0]!;

export type Review = { id: string; customer: string; rating: number; date: string; content: string; reply?: string; session: string };
export const REVIEWS: Review[] = [
  { id: "r1", customer: "Nguyễn Thu Hà", rating: 5, date: "2026-09-22", content: "Anh Khang chỉnh kỹ thuật squat rất chi tiết, sau 2 tháng mình giảm gần 5 kg mà không bị mệt mỏi.", session: "Buổi 13 – Thân dưới" },
  { id: "r2", customer: "Lê Quốc Bảo", rating: 5, date: "2026-09-18", content: "Giáo án rõ ràng, luôn điều chỉnh khi lưng mình đau. Rất yên tâm.", reply: "Cảm ơn anh Bảo! Mình sẽ tiếp tục theo dõi vùng thắt lưng sát sao.", session: "Buổi 28 – Chân" },
  { id: "r3", customer: "Phạm Minh Anh", rating: 4, date: "2026-09-10", content: "Buổi tập hiệu quả nhưng đôi khi bắt đầu trễ 5–10 phút.", session: "Buổi 9 – Toàn thân" },
  { id: "r4", customer: "Võ Thành Đạt", rating: 5, date: "2026-09-05", content: "Tôi 41 tuổi, đau gối nhưng được hướng dẫn bài phù hợp, không còn ngại tập.", session: "Buổi 5 – Cardio" },
  { id: "r5", customer: "Đặng Ngọc Lan", rating: 4, date: "2026-08-30", content: "Nhiệt tình, nhưng mong có thêm thực đơn cụ thể hơn.", session: "Buổi 12 – Tổng kết" },
];
export const findReview = (id?: string) => REVIEWS.find((r) => r.id === id) ?? REVIEWS[0]!;

export type RescheduleReq = { id: string; customerId: string; from: string; to: string; reason: string; status: "pending" | "approved" | "rejected"; createdBy: "customer" | "trainer" };
export const RESCHEDULES: RescheduleReq[] = [
  { id: "rr1", customerId: "c1", from: "27/09/2026 06:00", to: "27/09/2026 18:00", reason: "Có cuộc họp sớm ở công ty.", status: "pending", createdBy: "customer" },
  { id: "rr2", customerId: "c6", from: "26/09/2026 18:30", to: "28/09/2026 18:30", reason: "Thi giữa kỳ.", status: "pending", createdBy: "customer" },
  { id: "rr3", customerId: "c4", from: "24/09/2026 17:00", to: "25/09/2026 17:00", reason: "Công tác Đà Nẵng.", status: "approved", createdBy: "customer" },
  { id: "rr4", customerId: "c2", from: "30/09/2026 07:30", to: "01/10/2026 07:30", reason: "HLV tham gia khoá đào tạo.", status: "pending", createdBy: "trainer" },
];

export const WEEKLY_COMPLETED = [
  { week: "T1/08", sessions: 18 }, { week: "T2/08", sessions: 21 }, { week: "T3/08", sessions: 19 }, { week: "T4/08", sessions: 23 },
  { week: "T1/09", sessions: 22 }, { week: "T2/09", sessions: 24 }, { week: "T3/09", sessions: 20 }, { week: "T4/09", sessions: 17 },
];

export const ACTIVITY = [
  { text: "Nguyễn Thu Hà hoàn thành buổi “Thân dưới + HIIT”", time: "07:05" },
  { text: "Huỳnh Gia Huy gửi yêu cầu đổi lịch sang 28/09", time: "Hôm qua" },
  { text: "Bạn đã xuất bản giáo án “Giảm mỡ 12 tuần – Giai đoạn 2” (v3)", time: "20/09" },
  { text: "Lê Quốc Bảo để lại đánh giá 5 sao", time: "18/09" },
  { text: "Chứng chỉ “Dinh dưỡng thể thao cơ bản” đang chờ quản lý duyệt", time: "10/09" },
];

export const NOTIFICATIONS = [
  { id: "n1", title: "Yêu cầu đổi lịch mới", body: "Huỳnh Gia Huy muốn dời buổi 26/09 18:30 sang 28/09.", time: "24/09/2026 21:10", read: false, type: "Lịch" },
  { id: "n2", title: "Buổi tập chờ xác nhận", body: "Buổi 24/09 với Nguyễn Thu Hà chưa được xác nhận hoàn thành.", time: "24/09/2026 07:10", read: false, type: "Buổi tập" },
  { id: "n3", title: "Đánh giá mới 5 sao", body: "Nguyễn Thu Hà đã đánh giá buổi tập của bạn.", time: "22/09/2026 20:00", read: false, type: "Đánh giá" },
  { id: "n4", title: "Chứng chỉ sắp hết hạn", body: "ACE Certified Personal Trainer hết hạn ngày 10/11/2026.", time: "20/09/2026 09:00", read: true, type: "Chứng chỉ" },
  { id: "n5", title: "Chứng chỉ bị từ chối", body: "“Phục hồi chức năng vận động” cần tải lại ảnh rõ nét.", time: "22/08/2026 15:30", read: true, type: "Chứng chỉ" },
];

export const CHAT_CONTACTS = CUSTOMERS.slice(0, 5).map((c, i) => ({
  id: c.id, name: c.name, online: i % 2 === 0, unread: i === 0 ? 2 : i === 3 ? 1 : 0,
  last: ["Mai em tập được không anh?", "Ok anh, em ăn đúng thực đơn rồi", "Cảm ơn anh nha", "Gối hôm nay hơi mỏi", "Hẹn anh tháng sau"][i]!,
}));
export const CHAT_THREADS = {
  c1: [
    { from: "them" as const, text: "Anh ơi hôm qua tập xong em đau đùi quá.", time: "20:14" },
    { from: "me" as const, text: "Đau cơ khởi phát muộn là bình thường nhé. Em giãn cơ 10 phút và uống đủ nước.", time: "20:20" },
    { from: "them" as const, text: "Mai em tập được không anh?", time: "21:02" },
  ],
  c2: [{ from: "me" as const, text: "Tuần này tăng 2.5 kg cho bài đẩy ngực nhé.", time: "Hôm qua" }, { from: "them" as const, text: "Ok anh, em ăn đúng thực đơn rồi", time: "Hôm qua" }],
  c3: [{ from: "them" as const, text: "Cảm ơn anh nha", time: "15/09" }],
  c4: [{ from: "them" as const, text: "Gối hôm nay hơi mỏi", time: "08:12" }],
  c5: [{ from: "them" as const, text: "Hẹn anh tháng sau", time: "30/08" }],
};

export const PLAN_VERSIONS = [
  { version: 3, date: "20/09/2026 21:00", author: "Trần Minh Khang", note: "Tăng khối lượng squat từ 3 lên 4 hiệp, thêm HIIT cuối buổi thứ 2.", status: "Đang áp dụng" },
  { version: 2, date: "01/09/2026 19:30", author: "Trần Minh Khang", note: "Thay đẩy vai bằng kéo xà vì học viên đau vai phải.", status: "Đã thay thế" },
  { version: 1, date: "01/07/2026 10:00", author: "Trần Minh Khang", note: "Tạo giáo án ban đầu sau buổi đánh giá thể trạng.", status: "Đã thay thế" },
];

export const MILESTONES = [
  { id: "m1", title: "Tuần 4: giảm 2 kg", target: "61,2 kg", actual: "61,0 kg", done: true },
  { id: "m2", title: "Tuần 8: mỡ cơ thể dưới 27%", target: "27,0%", actual: "26,8%", done: true },
  { id: "m3", title: "Tuần 12: đạt 58 kg, squat 50 kg × 8", target: "58,0 kg / 50 kg", actual: "58,4 kg / 45 kg", done: false },
];
