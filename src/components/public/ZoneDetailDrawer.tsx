import React from "react";
import { CheckCircle2, X, Dumbbell } from "lucide-react";

export interface ZoneItem {
  id: string;
  key: string;
  name: string;
  title?: string;
  floor: string;
  area?: string;
  image?: string;
  description: string;
  highlights?: string[];
  equipments?: string[];
}

interface ZoneDetailDrawerProps {
  zone: ZoneItem | null;
  onClose: () => void;
  onBookZone: () => void;
}

export function ZoneDetailDrawer({
  zone,
  onClose,
  onBookZone,
}: ZoneDetailDrawerProps) {
  if (!zone) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-[#070b13] border-l border-[#1a2438] h-full shadow-2xl flex flex-col justify-between z-10 overflow-y-auto animate-in slide-in-from-right duration-300">
        <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-[#0d1527]">
          <div>
            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">
              Chi tiết khu vực • {zone.floor}
            </span>
            <h2 className="text-lg font-black text-white mt-0.5">{zone.name || zone.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
          {zone.image && (
            <div className="rounded-2xl overflow-hidden border border-zinc-800 h-56 bg-zinc-900">
              <img
                src={zone.image}
                alt={zone.name || zone.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Mô tả khu vực</h4>
            <p className="text-xs text-zinc-300 leading-relaxed bg-[#0d1527] p-4 rounded-xl border border-zinc-800">
              {zone.description}
            </p>
          </div>

          {zone.highlights && zone.highlights.length > 0 && (
            <div className="space-y-3 bg-[#0d1527] p-4 rounded-xl border border-zinc-800">
              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Đặc quyền & Điểm nổi bật</h4>
              <div className="space-y-2">
                {zone.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-zinc-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {zone.equipments && zone.equipments.length > 0 && (
            <div className="space-y-3 bg-[#0d1527] p-4 rounded-xl border border-zinc-800">
              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Trang thiết bị máy móc</h4>
              <div className="flex flex-wrap gap-2">
                {zone.equipments.map((eq, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 bg-[#070b13] border border-zinc-800 text-xs font-semibold text-zinc-200 rounded-lg flex items-center gap-1.5"
                  >
                    <Dumbbell className="w-3 h-3 text-emerald-400" />
                    {eq}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="p-4 bg-[#0d1527] border-t border-zinc-800">
          <button
            onClick={() => {
              onClose();
              onBookZone();
            }}
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-black text-xs rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            ĐĂNG KÝ TRẢI NGHIỆM KHU VỰC NÀY
          </button>
        </div>
      </div>
    </div>
  );
}
