import React from "react";
import { Award, X, Star, Calendar, CheckCircle2 } from "lucide-react";
import type { Trainer } from "@/lib/mock/public";
import { getTrainerAvatar } from "@/lib/trainer-avatars";

interface CoachDetailDrawerProps {
  coach: Trainer | null;
  onClose: () => void;
  onBookCoach: (coachName: string) => void;
}

export function CoachDetailDrawer({
  coach,
  onClose,
  onBookCoach,
}: CoachDetailDrawerProps) {
  if (!coach) return null;

  const avatarImg = getTrainerAvatar(coach.name);
  const initials = coach.avatarInitials || coach.name.slice(0, 2).toUpperCase();

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-[#070b13] border-l border-[#1a2438] h-full shadow-2xl flex flex-col justify-between z-10 overflow-y-auto animate-in slide-in-from-right duration-300">
        <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-[#0d1527]">
          <div className="flex items-center gap-3">
            {avatarImg ? (
              <img
                src={avatarImg}
                alt={coach.name}
                className="w-12 h-12 rounded-2xl object-cover border border-white/10 shrink-0 shadow-md"
              />
            ) : (
              <div
                className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${
                  coach.avatarBg || "from-emerald-500/20 to-teal-600/30"
                } flex items-center justify-center text-emerald-400 text-base font-black shadow-md border border-white/10`}
              >
                {initials}
              </div>
            )}
            <div>
              <h2 className="text-base font-black text-white">{coach.name}</h2>
              <p className="text-[10px] text-emerald-400 font-extrabold uppercase mt-0.5">
                {coach.specialty}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-3 bg-[#0d1527] p-4 rounded-xl border border-zinc-800">
            <div className="text-center border-r border-zinc-800">
              <span className="text-[10px] text-zinc-400 font-bold uppercase">Đánh giá</span>
              <p className="text-sm font-black text-amber-400 flex items-center justify-center gap-1 mt-0.5">
                <Star className="w-3.5 h-3.5 fill-amber-400" /> {coach.rating.toFixed(1)} ({coach.reviewCount})
              </p>
            </div>
            <div className="text-center">
              <span className="text-[10px] text-zinc-400 font-bold uppercase">Kinh nghiệm</span>
              <p className="text-sm font-black text-white mt-0.5">{coach.experienceYears} năm</p>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Tiểu sử & Phong cách</h4>
            <p className="text-xs text-zinc-300 leading-relaxed bg-[#0d1527] p-4 rounded-xl border border-zinc-800">
              {coach.bio}
            </p>
          </div>

          {coach.certificates && coach.certificates.length > 0 && (
            <div className="space-y-3 bg-[#0d1527] p-4 rounded-xl border border-zinc-800">
              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Chứng chỉ quốc tế</h4>
              <div className="space-y-2">
                {coach.certificates.map((cert, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-zinc-200">
                    <Award className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>
                      {cert.name} ({cert.issuer} - {cert.year})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {coach.tags && coach.tags.length > 0 && (
            <div className="space-y-3 bg-[#0d1527] p-4 rounded-xl border border-zinc-800">
              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Chuyên môn sâu</h4>
              <div className="flex flex-wrap gap-2">
                {coach.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-[#070b13] border border-zinc-800 text-xs font-bold text-emerald-400 rounded-lg"
                  >
                    ✦ {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {coach.schedule && coach.schedule.length > 0 && (
            <div className="space-y-3 bg-[#0d1527] p-4 rounded-xl border border-zinc-800">
              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Khung giờ nhận dạy</h4>
              <div className="space-y-2">
                {coach.schedule.map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-xs py-1 border-b border-zinc-800/60 last:border-0">
                    <span className="text-zinc-400 font-medium">{item.day}</span>
                    <span className="font-mono text-emerald-400 font-bold">{item.slots.join(", ")}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="p-4 bg-[#0d1527] border-t border-zinc-800">
          <button
            onClick={() => {
              onClose();
              onBookCoach(coach.name);
            }}
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-black text-xs rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            ĐẶT LỊCH TẬP CÙNG {coach.name.toUpperCase()}
          </button>
        </div>
      </div>
    </div>
  );
}
