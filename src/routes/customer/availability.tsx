import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { CPage, Panel, meta } from "@/components/customer/common";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/customer/availability")({
  head: () => meta("Thiết lập lịch rảnh", "Chọn các khung giờ bạn có thể tập trong tuần."),
  component: Availability,
});

const DAYS = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
const SLOTS = ["05:30", "07:00", "08:30", "10:00", "12:00", "14:00", "16:00", "17:30", "19:00", "20:30"];
const INITIAL = new Set(["T2-17:30", "T2-19:00", "T4-17:30", "T4-19:00", "T6-07:00", "T6-17:30", "T7-07:00", "T7-08:30", "CN-08:30"]);

function Availability() {
  const [sel, setSel] = useState(new Set(INITIAL));
  const toggle = (k: string) => { const n = new Set(sel); n.has(k) ? n.delete(k) : n.add(k); setSel(n); };
  return (
    <CPage
      title="Thiết lập lịch rảnh"
      description="Chạm vào ô để bật/tắt. Mỗi ô tương ứng 90 phút. Huấn luyện viên sẽ xếp buổi PT trong các khung giờ này."
      actions={<div className="flex gap-2"><Button variant="outline" onClick={() => setSel(new Set())}>Xoá hết</Button><Button onClick={() => toast.success(`Đã lưu ${sel.size} khung giờ rảnh (dữ liệu mẫu).`)}>Lưu lịch rảnh</Button></div>}
    >
      <Panel>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-separate border-spacing-1 text-sm">
            <thead>
              <tr><th className="w-16" />{DAYS.map((d) => <th key={d} className="py-2 font-medium text-muted-foreground">{d}</th>)}</tr>
            </thead>
            <tbody>
              {SLOTS.map((s) => (
                <tr key={s}>
                  <td className="pr-2 text-right text-xs text-muted-foreground">{s}</td>
                  {DAYS.map((d) => {
                    const k = `${d}-${s}`;
                    const on = sel.has(k);
                    return (
                      <td key={k}>
                        <button type="button" aria-pressed={on} aria-label={`${d} ${s}`} onClick={() => toggle(k)} className={cn("h-9 w-full cursor-pointer rounded-md border transition-colors", on ? "border-primary/60 bg-primary/25" : "border-border bg-secondary/40 hover:bg-accent")} />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-2"><span className="size-3 rounded bg-primary/25 ring-1 ring-primary/60" /> Có thể tập</span>
          <span className="flex items-center gap-2"><span className="size-3 rounded bg-secondary ring-1 ring-border" /> Bận</span>
          <span className="ml-auto">Đã chọn {sel.size} khung giờ · khoảng {(sel.size * 1.5).toLocaleString("vi-VN")} giờ/tuần</span>
        </div>
      </Panel>
    </CPage>
  );
}
