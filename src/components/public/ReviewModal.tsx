import React, { useState } from "react";
import { Star, CheckCircle2, X } from "lucide-react";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (newReview: {
    name: string;
    rating: number;
    comment: string;
    serviceTag: string;
  }) => void;
}

export function ReviewModal({
  isOpen,
  onClose,
  onSubmitReview,
}: ReviewModalProps) {
  const [form, setForm] = useState({
    name: "",
    rating: 5,
    comment: "",
    serviceTag: "Không gian & Thiết bị",
  });
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.comment) return;
    onSubmitReview(form);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
      setForm({ name: "", rating: 5, comment: "", serviceTag: "Không gian & Thiết bị" });
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#0e1628] border border-zinc-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-scale-up text-left text-zinc-100">
        <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-[#070b13]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center font-black">
              <Star className="w-5 h-5 fill-amber-400" />
            </div>
            <div>
              <h3 className="font-black text-base text-white">Viết Đánh Giá Phòng Tập</h3>
              <p className="text-[11px] text-zinc-400">Chia sẻ trải nghiệm thực tế của bạn tại OmniGym</p>
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
              <h4 className="text-base font-black text-white">Cảm Ơn Đánh Giá Của Bạn!</h4>
              <p className="text-xs text-zinc-400">Đánh giá của bạn đã được ghi nhận vào hệ thống OmniGym.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-zinc-400">Họ và tên của bạn</label>
                <input
                  type="text"
                  required
                  placeholder="VD: Hoàng Minh"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-[#070b13] border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-zinc-400">Mức độ hài lòng</label>
                <div className="flex gap-2 p-2 bg-[#070b13] rounded-xl border border-zinc-800">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setForm({ ...form, rating: star })}
                      className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                        form.rating >= star ? "text-amber-400 scale-110" : "text-zinc-600"
                      }`}
                    >
                      <Star className="w-6 h-6 fill-current stroke-none" />
                    </button>
                  ))}
                  <span className="ml-auto my-auto pr-2 text-xs font-bold text-amber-400">
                    {form.rating}/5 sao
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-zinc-400">Dịch vụ đánh giá</label>
                <select
                  value={form.serviceTag}
                  onChange={(e) => setForm({ ...form, serviceTag: e.target.value })}
                  className="w-full bg-[#070b13] border border-zinc-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
                >
                  <option value="Không gian & Thiết bị">Không gian & Thiết bị</option>
                  <option value="Huấn luyện viên (PT)">Huấn luyện viên (PT)</option>
                  <option value="Lớp nhóm & Yoga">Lớp nhóm & Yoga</option>
                  <option value="Dịch vụ & Lễ tân">Dịch vụ & Lễ tân</option>
                  <option value="Xông hơi & Tiện ích">Xông hơi & Tiện ích</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-zinc-400">Nội dung đánh giá</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Chia sẻ nhận xét của bạn về chất lượng máy móc, thái độ nhân viên hoặc hiệu quả luyện tập..."
                  value={form.comment}
                  onChange={(e) => setForm({ ...form, comment: e.target.value })}
                  className="w-full bg-[#070b13] border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500 resize-none leading-relaxed"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-zinc-950 font-black rounded-xl shadow-lg shadow-amber-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Star className="w-4 h-4 fill-zinc-950" />
                  GỬI ĐÁNH GIÁ CỦA BẠN
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
