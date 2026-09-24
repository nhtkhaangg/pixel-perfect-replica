export const ME = {
  id: "HV-02481",
  fullName: "Nguyễn Minh Hoàng",
  email: "hoang.nguyen@gmail.com",
  phone: "0912 345 678",
  gender: "Nam",
  birthday: "1996-03-14",
  address: "45 Trần Quốc Thảo, Phường Võ Thị Sáu, Quận 3, TP. Hồ Chí Minh",
  joinedAt: "2026-01-12",
  goal: "Tăng cơ, giảm mỡ bụng",
  emergencyContact: "Nguyễn Thị Hạnh (mẹ) — 0903 221 456",
  trainerId: "tran-anh-khoa",
  trainerName: "Trần Anh Khoa",
  height: 172,
};

export type MyPackage = {
  id: string;
  name: string;
  type: "MEMBERSHIP" | "PT";
  startDate: string;
  endDate: string;
  totalSessions: number | null;
  usedSessions: number;
  status: "active" | "expired" | "pending";
  price: number;
  trainer?: string;
};

export const MY_PACKAGES: MyPackage[] = [
  { id: "MP-1042", name: "Hội viên 6 tháng", type: "MEMBERSHIP", startDate: "2026-04-10", endDate: "2026-10-07", totalSessions: null, usedSessions: 86, status: "active", price: 4290000 },
  { id: "MP-1087", name: "PT chuyên sâu 24 buổi", type: "PT", startDate: "2026-07-01", endDate: "2026-09-29", totalSessions: 24, usedSessions: 17, status: "active", price: 9800000, trainer: "Trần Anh Khoa" },
  { id: "MP-0931", name: "Hội viên 3 tháng", type: "MEMBERSHIP", startDate: "2026-01-12", endDate: "2026-04-11", totalSessions: null, usedSessions: 48, status: "expired", price: 2390000 },
  { id: "MP-0955", name: "PT cơ bản 12 buổi", type: "PT", startDate: "2026-02-01", endDate: "2026-03-17", totalSessions: 12, usedSessions: 12, status: "expired", price: 5400000, trainer: "Trần Anh Khoa" },
];

export type Transaction = {
  id: string;
  date: string;
  description: string;
  method: string;
  amount: number;
  status: "paid" | "pending" | "refunded" | "failed";
};

export const TRANSACTIONS: Transaction[] = [
  { id: "GD-26091801", date: "2026-09-18T19:42:00", description: "Nước uống điện giải (2 chai)", method: "Ví MoMo", amount: 40000, status: "paid" },
  { id: "GD-26070102", date: "2026-07-01T08:15:00", description: "PT chuyên sâu 24 buổi", method: "Chuyển khoản", amount: 9800000, status: "paid" },
  { id: "GD-26062003", date: "2026-06-20T18:05:00", description: "Thuê tủ đồ riêng 3 tháng", method: "Tiền mặt", amount: 450000, status: "paid" },
  { id: "GD-26041004", date: "2026-04-10T07:30:00", description: "Hội viên 6 tháng", method: "Thẻ Visa", amount: 4290000, status: "paid" },
  { id: "GD-26040905", date: "2026-04-09T21:10:00", description: "Hội viên 6 tháng", method: "Thẻ Visa", amount: 4290000, status: "failed" },
  { id: "GD-26031806", date: "2026-03-18T10:20:00", description: "Hoàn tiền buổi PT bị huỷ", method: "Chuyển khoản", amount: 450000, status: "refunded" },
  { id: "GD-26020107", date: "2026-02-01T09:00:00", description: "PT cơ bản 12 buổi", method: "Chuyển khoản", amount: 5400000, status: "paid" },
  { id: "GD-26011208", date: "2026-01-12T17:45:00", description: "Hội viên 3 tháng", method: "Tiền mặt", amount: 2390000, status: "paid" },
  { id: "GD-26092209", date: "2026-09-22T12:00:00", description: "Gia hạn hội viên 12 tháng", method: "Chuyển khoản", amount: 7690000, status: "pending" },
];

export const BODY_METRICS = [
  { date: "2026-04-10", weight: 78.4, bodyFat: 24.1, muscle: 33.2, waist: 89 },
  { date: "2026-05-08", weight: 77.1, bodyFat: 23.2, muscle: 33.6, waist: 87.5 },
  { date: "2026-06-05", weight: 75.9, bodyFat: 22.0, muscle: 34.1, waist: 86 },
  { date: "2026-07-03", weight: 75.0, bodyFat: 21.1, muscle: 34.7, waist: 84.5 },
  { date: "2026-07-31", weight: 74.2, bodyFat: 20.3, muscle: 35.0, waist: 83 },
  { date: "2026-08-28", weight: 73.9, bodyFat: 19.9, muscle: 35.2, waist: 82.5 },
  { date: "2026-09-19", weight: 73.8, bodyFat: 19.8, muscle: 35.2, waist: 82.5 },
];

export type Session = {
  id: string;
  date: string;
  start: string;
  end: string;
  title: string;
  trainer: string;
  room: string;
  status: "scheduled" | "completed" | "cancelled" | "pending";
};

export const SESSIONS: Session[] = [
  { id: "S-301", date: "2026-09-22", start: "18:00", end: "19:00", title: "Ngực – Tay sau", trainer: "Trần Anh Khoa", room: "Khu tạ tầng 1", status: "completed" },
  { id: "S-302", date: "2026-09-24", start: "18:00", end: "19:00", title: "Lưng – Tay trước", trainer: "Trần Anh Khoa", room: "Khu tạ tầng 1", status: "completed" },
  { id: "S-303", date: "2026-09-26", start: "07:30", end: "08:30", title: "Chân – Mông", trainer: "Trần Anh Khoa", room: "Khu tạ tầng 1", status: "scheduled" },
  { id: "S-304", date: "2026-09-27", start: "08:00", end: "09:00", title: "Yoga phục hồi (lớp nhóm)", trainer: "Lê Mai Phương", room: "Phòng lớp nhóm tầng 3", status: "scheduled" },
  { id: "S-305", date: "2026-09-29", start: "18:00", end: "19:00", title: "Vai – Core", trainer: "Trần Anh Khoa", room: "Khu tạ tầng 1", status: "scheduled" },
  { id: "S-306", date: "2026-10-01", start: "18:00", end: "19:00", title: "Ngực – Tay sau", trainer: "Trần Anh Khoa", room: "Khu tạ tầng 1", status: "pending" },
  { id: "S-299", date: "2026-09-19", start: "18:00", end: "19:00", title: "Chân – Mông", trainer: "Trần Anh Khoa", room: "Khu tạ tầng 1", status: "cancelled" },
  { id: "S-298", date: "2026-09-17", start: "18:00", end: "19:00", title: "Vai – Core", trainer: "Trần Anh Khoa", room: "Khu tạ tầng 1", status: "completed" },
];

export const NEXT_SESSION = SESSIONS.find((s) => s.status === "scheduled")!;

export const WEEKLY_WORKOUTS = [
  { week: "T1/08", sessions: 3, minutes: 180 },
  { week: "T2/08", sessions: 4, minutes: 245 },
  { week: "T3/08", sessions: 3, minutes: 190 },
  { week: "T4/08", sessions: 4, minutes: 250 },
  { week: "T1/09", sessions: 2, minutes: 120 },
  { week: "T2/09", sessions: 4, minutes: 240 },
  { week: "T3/09", sessions: 3, minutes: 185 },
  { week: "T4/09", sessions: 2, minutes: 125 },
];

export const CHECKINS = [
  { id: "CI-8841", time: "2026-09-24T17:52:00", checkout: "2026-09-24T19:18:00", method: "Mã QR", gate: "Cổng chính" },
  { id: "CI-8790", time: "2026-09-22T17:48:00", checkout: "2026-09-22T19:10:00", method: "Mã QR", gate: "Cổng chính" },
  { id: "CI-8702", time: "2026-09-20T07:05:00", checkout: "2026-09-20T08:20:00", method: "Mã QR", gate: "Cổng chính" },
  { id: "CI-8655", time: "2026-09-17T17:55:00", checkout: "2026-09-17T19:25:00", method: "Lễ tân", gate: "Quầy lễ tân" },
  { id: "CI-8601", time: "2026-09-15T18:10:00", checkout: "2026-09-15T19:30:00", method: "Mã QR", gate: "Cổng chính" },
  { id: "CI-8544", time: "2026-09-13T08:02:00", checkout: "2026-09-13T09:15:00", method: "Mã QR", gate: "Cổng phụ" },
  { id: "CI-8490", time: "2026-09-10T18:01:00", checkout: "2026-09-10T19:20:00", method: "Mã QR", gate: "Cổng chính" },
  { id: "CI-8433", time: "2026-09-08T17:58:00", checkout: "2026-09-08T19:05:00", method: "Mã QR", gate: "Cổng chính" },
];

export type Notification = {
  id: string;
  title: string;
  summary: string;
  body: string;
  time: string;
  type: "schedule" | "package" | "system" | "trainer" | "promotion";
  read: boolean;
};

export const NOTIFICATION_TYPE: Record<Notification["type"], string> = {
  schedule: "Lịch tập",
  package: "Gói tập",
  system: "Hệ thống",
  trainer: "Huấn luyện viên",
  promotion: "Ưu đãi",
};

export const NOTIFICATIONS: Notification[] = [
  { id: "n1", type: "package", read: false, time: "2026-09-24T09:00:00", title: "Gói PT sắp hết hạn", summary: "Gói PT chuyên sâu 24 buổi còn 7 buổi và hết hạn ngày 29/09/2026.", body: "Gói PT chuyên sâu 24 buổi của bạn còn 7 buổi chưa sử dụng và sẽ hết hạn vào ngày 29/09/2026. Hãy sắp xếp lịch với huấn luyện viên Trần Anh Khoa hoặc gửi yêu cầu gia hạn tại quầy lễ tân để không bị mất buổi tập." },
  { id: "n2", type: "schedule", read: false, time: "2026-09-24T20:15:00", title: "Nhắc lịch tập sáng mai", summary: "Buổi Chân – Mông lúc 07:30 ngày 26/09/2026 tại khu tạ tầng 1.", body: "Bạn có buổi tập Chân – Mông cùng huấn luyện viên Trần Anh Khoa lúc 07:30 ngày 26/09/2026 tại khu tạ tầng 1. Vui lòng có mặt trước 10 phút để khởi động." },
  { id: "n3", type: "trainer", read: false, time: "2026-09-23T21:30:00", title: "Huấn luyện viên đã cập nhật giáo án", summary: "Anh Khoa đã thêm bài Romanian Deadlift vào tuần 12.", body: "Huấn luyện viên Trần Anh Khoa đã cập nhật giáo án tuần 12: thêm bài Romanian Deadlift 4×8 và giảm khối lượng Leg Press để phù hợp với phản hồi đau gối của bạn." },
  { id: "n4", type: "schedule", read: true, time: "2026-09-20T10:00:00", title: "Yêu cầu đổi lịch đã được duyệt", summary: "Buổi 19/09 đã được chuyển sang 26/09/2026 lúc 07:30.", body: "Yêu cầu đổi lịch buổi tập ngày 19/09/2026 của bạn đã được huấn luyện viên chấp nhận. Buổi tập mới diễn ra lúc 07:30 ngày 26/09/2026." },
  { id: "n5", type: "promotion", read: true, time: "2026-09-18T08:00:00", title: "Ưu đãi gia hạn tháng 10", summary: "Giảm 10% khi gia hạn gói 12 tháng trước 05/10/2026.", body: "Hội viên gia hạn gói 12 tháng trước ngày 05/10/2026 được giảm 10% (còn 6.921.000 VNĐ) và tặng thêm 1 buổi đo InBody." },
  { id: "n6", type: "system", read: true, time: "2026-09-15T23:00:00", title: "Bảo trì hệ thống check-in", summary: "Máy quét QR tạm dừng 23:00 – 23:30 ngày 15/09/2026.", body: "Hệ thống check-in bằng mã QR sẽ tạm dừng để bảo trì từ 23:00 đến 23:30 ngày 15/09/2026. Trong thời gian này, vui lòng check-in tại quầy lễ tân." },
];

export const RESCHEDULE_REQUESTS = [
  { id: "RQ-118", sessionTitle: "Vai – Core", from: "2026-09-29T18:00:00", to: "2026-09-30T18:00:00", reason: "Họp muộn tại công ty", createdBy: "Tôi", status: "pending" as const },
  { id: "RQ-117", sessionTitle: "Ngực – Tay sau", from: "2026-10-01T18:00:00", to: "2026-10-01T19:30:00", reason: "Huấn luyện viên có lịch dạy lớp nhóm", createdBy: "Trần Anh Khoa", status: "pending" as const },
  { id: "RQ-109", sessionTitle: "Chân – Mông", from: "2026-09-19T18:00:00", to: "2026-09-26T07:30:00", reason: "Đi công tác Đà Nẵng", createdBy: "Tôi", status: "approved" as const },
  { id: "RQ-098", sessionTitle: "Lưng – Tay trước", from: "2026-09-05T18:00:00", to: "2026-09-06T08:00:00", reason: "Bị cảm", createdBy: "Tôi", status: "rejected" as const },
];

export const ROADMAP = [
  { phase: "Giai đoạn 1", title: "Làm quen & kỹ thuật nền", weeks: "Tuần 1–4", status: "completed" as const, goals: ["Học kỹ thuật squat, deadlift, bench press", "Tập toàn thân 3 buổi/tuần", "Đo InBody đầu vào"] },
  { phase: "Giai đoạn 2", title: "Tăng sức mạnh cơ bản", weeks: "Tuần 5–10", status: "completed" as const, goals: ["Chia lịch trên – dưới 4 buổi/tuần", "Tăng tải 2,5 kg mỗi 2 tuần", "Giảm 3 kg mỡ"] },
  { phase: "Giai đoạn 3", title: "Phì đại cơ", weeks: "Tuần 11–16", status: "active" as const, goals: ["Tăng khối lượng tập 15%", "Bổ sung 1,8 g đạm/kg", "Giữ tỉ lệ mỡ dưới 20%"] },
  { phase: "Giai đoạn 4", title: "Siết cơ & duy trì", weeks: "Tuần 17–22", status: "upcoming" as const, goals: ["Thâm hụt 300 kcal/ngày", "Cardio 2 buổi/tuần", "Mục tiêu tỉ lệ mỡ 16%"] },
];

export const EXERCISES = [
  { id: "e1", name: "Barbell Back Squat", group: "Chân", level: "Trung bình", duration: "04:12", sets: "4 × 8", tips: "Giữ lưng thẳng, gối hướng theo mũi chân, xuống ngang song song." },
  { id: "e2", name: "Romanian Deadlift", group: "Chân", level: "Trung bình", duration: "03:40", sets: "4 × 8", tips: "Đẩy hông ra sau, giữ thanh tạ sát chân, cảm nhận căng đùi sau." },
  { id: "e3", name: "Bench Press", group: "Ngực", level: "Trung bình", duration: "05:05", sets: "4 × 6–8", tips: "Siết bả vai, hạ tạ chạm giữa ngực, đẩy lên theo đường cong nhẹ." },
  { id: "e4", name: "Incline Dumbbell Press", group: "Ngực", level: "Cơ bản", duration: "03:15", sets: "3 × 10", tips: "Ghế nghiêng 30°, khuỷu tay mở khoảng 45°." },
  { id: "e5", name: "Lat Pulldown", group: "Lưng", level: "Cơ bản", duration: "02:58", sets: "3 × 12", tips: "Kéo thanh về ngực trên, không ngả người quá nhiều." },
  { id: "e6", name: "Seated Cable Row", group: "Lưng", level: "Cơ bản", duration: "03:02", sets: "3 × 12", tips: "Ưỡn ngực, kéo khuỷu tay ra sau, dừng 1 giây." },
  { id: "e7", name: "Overhead Press", group: "Vai", level: "Trung bình", duration: "03:48", sets: "4 × 8", tips: "Siết mông và bụng, đẩy tạ thẳng qua đầu." },
  { id: "e8", name: "Plank", group: "Core", level: "Cơ bản", duration: "02:10", sets: "3 × 45 giây", tips: "Cơ thể thành một đường thẳng, không võng lưng." },
  { id: "e9", name: "Hanging Leg Raise", group: "Core", level: "Nâng cao", duration: "02:35", sets: "3 × 12", tips: "Hạn chế đung đưa, nâng chân bằng cơ bụng." },
];

export const CHAT_MESSAGES = [
  { from: "trainer", text: "Chào Hoàng, buổi thứ 4 vừa rồi em thấy gối còn đau không?", time: "2026-09-24T20:05:00" },
  { from: "me", text: "Dạ đỡ nhiều rồi anh, chỉ hơi mỏi khi xuống sâu thôi.", time: "2026-09-24T20:12:00" },
  { from: "trainer", text: "Ok, thứ 6 mình giảm độ sâu squat một chút và thêm Romanian Deadlift nhé. Nhớ ngủ đủ giấc.", time: "2026-09-24T20:15:00" },
  { from: "me", text: "Dạ em cảm ơn anh. Thứ 6 em có mặt lúc 07:20 ạ.", time: "2026-09-24T20:18:00" },
] as const;

export const WORKOUT_TEMPLATE = [
  { exercise: "Barbell Back Squat", sets: [{ reps: 8, weight: 70 }, { reps: 8, weight: 70 }, { reps: 8, weight: 72.5 }, { reps: 6, weight: 72.5 }] },
  { exercise: "Romanian Deadlift", sets: [{ reps: 8, weight: 60 }, { reps: 8, weight: 60 }, { reps: 8, weight: 60 }] },
  { exercise: "Leg Press", sets: [{ reps: 12, weight: 140 }, { reps: 12, weight: 140 }, { reps: 10, weight: 150 }] },
  { exercise: "Walking Lunge", sets: [{ reps: 12, weight: 16 }, { reps: 12, weight: 16 }] },
];

export const STRENGTH_PROGRESS = [
  { month: "04/2026", squat: 50, bench: 45, deadlift: 70 },
  { month: "05/2026", squat: 57.5, bench: 50, deadlift: 80 },
  { month: "06/2026", squat: 62.5, bench: 52.5, deadlift: 90 },
  { month: "07/2026", squat: 67.5, bench: 57.5, deadlift: 97.5 },
  { month: "08/2026", squat: 72.5, bench: 60, deadlift: 102.5 },
  { month: "09/2026", squat: 72.5, bench: 60, deadlift: 102.5 },
];

export const SAMPLE_WORKOUTS = [
  { id: "sw1", name: "Toàn thân cho người mới", level: "Cơ bản", duration: 45, focus: "Làm quen máy tập", exercises: ["Goblet Squat 3×12", "Chest Press máy 3×12", "Lat Pulldown 3×12", "Plank 3×30 giây"] },
  { id: "sw2", name: "Đốt mỡ HIIT 30 phút", level: "Trung bình", duration: 30, focus: "Tim mạch & sức bền", exercises: ["Burpee 40 giây", "Jump Squat 40 giây", "Mountain Climber 40 giây", "Nghỉ 20 giây × 5 vòng"] },
  { id: "sw3", name: "Thân trên sức mạnh", level: "Trung bình", duration: 60, focus: "Ngực, lưng, vai", exercises: ["Bench Press 4×8", "Barbell Row 4×8", "Overhead Press 3×10", "Face Pull 3×15"] },
  { id: "sw4", name: "Yoga phục hồi", level: "Cơ bản", duration: 40, focus: "Linh hoạt & thư giãn", exercises: ["Chào mặt trời 5 vòng", "Tư thế chiến binh", "Kéo giãn hông", "Thiền thở 5 phút"] },
];

export const RECENT_ACTIVITY = [
  { text: "Hoàn thành buổi Lưng – Tay trước", time: "2026-09-24T19:05:00" },
  { text: "Check-in tại cổng chính", time: "2026-09-24T17:52:00" },
  { text: "Cập nhật chỉ số cơ thể: 73,8 kg", time: "2026-09-19T08:30:00" },
  { text: "Gửi yêu cầu đổi lịch RQ-118", time: "2026-09-23T12:10:00" },
];
