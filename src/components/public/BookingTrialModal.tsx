import React, { useState } from "react";
import { Sparkles, CheckCircle2, X } from "lucide-react";

interface BookingTrialModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCoach?: string | undefined;
}

export function BookingTrialModal({ isOpen, onClose, initialCoach }: BookingTrialModalProps) {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    coach: initialCoach || "Bất kỳ HLV phù hợp",
    goal: "Tăng cơ & Giảm mỡ",
    preferredTime: "18:00 - 19:30",
    date: new Date().toISOString().split("T")[0] ?? "",
  });
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.phone) return;
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
      setForm({
        fullName: "",
        phone: "",
        coach: "Bất kỳ HLV phù hợp",
        goal: "Tăng cơ & Giảm mỡ",
        preferredTime: "18:00 - 19:30",
        date: new Date().toISOString().split("T")[0] ?? "",
      });
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#0e1628] border border-zinc-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-scale-up text-left text-zinc-100">
        <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-[#070b13]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-black">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-base text-white">Đăng Ký Tập Thử Miễn Phí</h3>
              <p className="text-[11px] text-zinc-400">Trải nghiệm 01 buổi tập chuẩn 5 sao tại OmniGym</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {isSuccess ? (
            <div className="py-8 text-center space-y-3 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-base font-black text-white">Đăng Ký Thành Công!</h4>
              <p className="text-xs text-zinc-400 max-w-xs mx-auto leading-relaxed">
                Chuyên viên tư vấn OmniGym sẽ liên hệ lại qua SĐT <strong className="text-emerald-400">{form.phone}</strong> trong vòng 15 phút để xác nhận lịch tập.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-zinc-400">Họ và tên của bạn</label>
                <input
                  type="text"
                  required
                  placeholder="VD: Nguyễn Văn A"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  className="w-full bg-[#070b13] border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-zinc-400">Số điện thoại liên hệ</label>
                <input
                  type="tel"
                  required
                  placeholder="VD: 0912 345 678"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-[#070b13] border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-bold text-zinc-400">Mục tiêu tập luyện</label>
                  <select
                    value={form.goal}
                    onChange={(e) => setForm({ ...form, goal: e.target.value })}
                    className="w-full bg-[#070b13] border border-zinc-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
                  >
                    <option value="Tăng cơ & Giảm mỡ">Tăng cơ & Giảm mỡ</option>
                    <option value="Giảm béo cấp tốc">Giảm béo cấp tốc</option>
                    <option value="Yoga & Dẻo dai">Yoga & Dẻo dai</option>
                    <option value="Phục hồi chấn thương">Phục hồi chấn thương</option>
                    <option value="Tăng thể lực & Sức bền">Tăng thể lực & Sức bền</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-zinc-400">Khung giờ tập</label>
                  <select
                    value={form.preferredTime}
                    onChange={(e) => setForm({ ...form, preferredTime: e.target.value })}
                    className="w-full bg-[#070b13] border border-zinc-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
                  >
                    <option value="06:00 - 07:30">06:00 - 07:30 (Sáng sớm)</option>
                    <option value="09:00 - 10:30">09:00 - 10:30 (Sáng)</option>
                    <option value="15:00 - 16:30">15:00 - 16:30 (Chiều)</option>
                    <option value="18:00 - 19:30">18:00 - 19:30 (Giờ vàng)</option>
                    <option value="20:00 - 21:30">20:00 - 21:30 (Tối muộn)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-zinc-400">Ngày tập dự kiến</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full bg-[#070b13] border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-black rounded-xl shadow-lg shadow-emerald-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  XÁC NHẬN ĐĂNG KÝ TẬP THỬ
                </button>
                <p className="text-[10px] text-zinc-500 text-center mt-2">
                  * Miễn phí đo chỉ số InBody 770 và nước uống ion kiềm trong buổi tập.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
