import { Link, createFileRoute } from "@tanstack/react-router";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { CPage, Panel, meta } from "@/components/customer/common";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { formatNumber } from "@/lib/format";
import { NEXT_SESSION, WORKOUT_TEMPLATE } from "@/lib/mock/customer";

export const Route = createFileRoute("/customer/workout-log")({
  head: () => meta("Ghi nhận buổi tập", "Ghi số hiệp, số lần và mức tạ của từng bài tập."),
  component: WorkoutLog,
});

type SetRow = { reps: number; weight: number; done: boolean };

function WorkoutLog() {
  const [data, setData] = useState(WORKOUT_TEMPLATE.map((e) => ({ exercise: e.exercise, sets: e.sets.map((s) => ({ ...s, done: false }) as SetRow) })));
  const update = (ei: number, si: number, patch: Partial<SetRow>) => setData(data.map((e, i) => (i !== ei ? e : { ...e, sets: e.sets.map((s, j) => (j === si ? { ...s, ...patch } : s)) })));
  const volume = data.reduce((t, e) => t + e.sets.filter((s) => s.done).reduce((a, s) => a + s.reps * s.weight, 0), 0);
  const doneSets = data.reduce((t, e) => t + e.sets.filter((s) => s.done).length, 0);
  const totalSets = data.reduce((t, e) => t + e.sets.length, 0);
  return (
    <CPage
      title="Ghi nhận buổi tập"
      description={`${NEXT_SESSION.title} · Giáo án tuần 12`}
      actions={<div className="flex gap-2"><Button variant="outline" asChild><Link to="/customer/workout-feedback">Gửi phản hồi</Link></Button><Button onClick={() => toast.success(`Đã lưu buổi tập: ${doneSets}/${totalSets} hiệp, tổng khối lượng ${formatNumber(volume)} kg (dữ liệu mẫu).`)}>Lưu buổi tập</Button></div>}
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <Panel><p className="text-xs text-muted-foreground">Hiệp hoàn thành</p><p className="font-display text-2xl font-bold">{doneSets}/{totalSets}</p></Panel>
        <Panel><p className="text-xs text-muted-foreground">Tổng khối lượng</p><p className="font-display text-2xl font-bold">{formatNumber(volume)} kg</p></Panel>
        <Panel><p className="text-xs text-muted-foreground">Số bài tập</p><p className="font-display text-2xl font-bold">{data.length}</p></Panel>
      </div>
      {data.map((e, ei) => (
        <Panel key={e.exercise} title={e.exercise} action={<Button size="sm" variant="ghost" onClick={() => setData(data.map((x, i) => (i === ei ? { ...x, sets: [...x.sets, { ...(x.sets.at(-1) ?? { reps: 10, weight: 0 }), done: false }] } : x)))}><Plus size={14} /> Thêm hiệp</Button>}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] text-sm">
              <thead className="text-left text-xs text-muted-foreground"><tr><th className="w-16 py-2">Hiệp</th><th>Số lần</th><th>Mức tạ (kg)</th><th className="w-24 text-center">Hoàn thành</th><th className="w-12" /></tr></thead>
              <tbody className="divide-y divide-border">
                {e.sets.map((s, si) => (
                  <tr key={si} className={s.done ? "bg-primary/5" : ""}>
                    <td className="py-2 font-medium">{si + 1}</td>
                    <td className="pr-3"><Input type="number" value={s.reps} onChange={(ev) => update(ei, si, { reps: Number(ev.target.value) })} className="h-8 w-24" /></td>
                    <td className="pr-3"><Input type="number" step="2.5" value={s.weight} onChange={(ev) => update(ei, si, { weight: Number(ev.target.value) })} className="h-8 w-24" /></td>
                    <td className="text-center"><Checkbox checked={s.done} onCheckedChange={(v) => update(ei, si, { done: v === true })} aria-label={`Hoàn thành hiệp ${si + 1}`} /></td>
                    <td><Button size="icon" variant="ghost" aria-label="Xoá hiệp" onClick={() => setData(data.map((x, i) => (i === ei ? { ...x, sets: x.sets.filter((_, j) => j !== si) } : x)))}><Trash2 size={14} /></Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      ))}
    </CPage>
  );
}
