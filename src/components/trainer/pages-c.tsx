import { useEffect, useState } from "react";
import { Check, Pause, Play, Plus, Sparkles, SquareCheck } from "lucide-react";
import { toast } from "sonner";

import { ProgressBar } from "@/components/customer/common";
import { Avatar, ButtonLink, ChatView, Field, Grid, InfoList, NotificationList, OPage, Panel, TextLink, Timeline } from "@/components/ops/kit";
import { SimpleBarChart, SimpleLineChart } from "@/components/shared/charts";
import { DataTable, type Column } from "@/components/shared/DataTable";
import { StatCard } from "@/components/shared/StatCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatDate, formatNumber } from "@/lib/format";
import { cn } from "@/lib/utils";
import {
  CHAT_CONTACTS, CHAT_THREADS, CUSTOMERS, LESSON_PLANS, METRIC_HISTORY, MILESTONES, NOTIFICATIONS, PLAN_VERSIONS,
  findCustomer, findExercise, findPlan, findSession, type Customer,
} from "@/lib/mock/trainer";
import { useId } from "./pages-a";

const CUS = { label: "Học viên", to: "/trainer/customers" };
const kg = (n: number) => `${n.toFixed(1).replace(".", ",")} kg`;

type SetRow = { reps: number; weight: number; rpe: number; done: boolean };
export function TrainerLiveSession() {
  const s = findSession(useId());
  const c = findCustomer(s.customerId);
  const plan = LESSON_PLANS.find((p) => p.customerId === c.id) ?? LESSON_PLANS[0]!;
  const items = plan.days[0]!.items;
  const [running, setRunning] = useState(false);
  const [sec, setSec] = useState(0);
  const [active, setActive] = useState(0);
  const [sets, setSets] = useState<SetRow[][]>(() => items.map((it) => Array.from({ length: it.sets }, () => ({ reps: parseInt(it.reps) || 10, weight: 20, rpe: 7, done: false }))));
  useEffect(() => { if (!running) return; const t = setInterval(() => setSec((x) => x + 1), 1000); return () => clearInterval(t); }, [running]);
  const mm = String(Math.floor(sec / 60)).padStart(2, "0"), ss = String(sec % 60).padStart(2, "0");
  const doneCount = sets.flat().filter((x) => x.done).length, total = sets.flat().length;
  const volume = sets.flat().filter((x) => x.done).reduce((a, x) => a + x.reps * x.weight, 0);
  const upd = (i: number, j: number, patch: Partial<SetRow>) => setSets((all) => all.map((r, a) => (a === i ? r.map((x, b) => (b === j ? { ...x, ...patch } : x)) : r)));
  return (
    <OPage area="trainer" title="Điều khiển buổi tập trực tiếp" parent={{ label: "Lịch hướng dẫn", to: "/trainer/calendar" }} description={`${c.name} · ${s.focus} · ${s.room}`}>
      <Grid cols={4}>
        <div className="card-surface p-5 sm:col-span-2">
          <p className="text-xs text-muted-foreground">Thời gian buổi tập</p>
          <p className="font-display text-6xl tabular-nums">{mm}:{ss}</p>
          <div className="mt-3 flex gap-2">
            <Button onClick={() => setRunning((r) => !r)}>{running ? <><Pause className="size-4" /> Tạm dừng</> : <><Play className="size-4" /> {sec ? "Tiếp tục" : "Bắt đầu"}</>}</Button>
            <Dialog><DialogTrigger asChild><Button variant="outline"><SquareCheck className="size-4" /> Kết thúc buổi</Button></DialogTrigger>
              <DialogContent><DialogHeader><DialogTitle>Kết thúc buổi tập?</DialogTitle><DialogDescription>Đã hoàn thành {doneCount}/{total} hiệp, tổng khối lượng {formatNumber(volume)} kg.</DialogDescription></DialogHeader>
                <DialogFooter><ButtonLink to="/trainer/sessions/$id/verify" params={{ id: s.id }}>Kết thúc và xác nhận</ButtonLink></DialogFooter></DialogContent></Dialog>
          </div>
        </div>
        <StatCard label="Hiệp đã xong" value={`${doneCount}/${total}`} />
        <StatCard label="Tổng khối lượng" value={`${formatNumber(volume)} kg`} />
      </Grid>
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <Panel title="Danh sách bài tập">
          <ul className="space-y-2">
            {items.map((it, i) => { const e = findExercise(it.exerciseId); const fin = sets[i]!.every((x) => x.done); return (
              <li key={i}><button onClick={() => setActive(i)} className={cn("flex w-full items-center gap-3 rounded-md border p-3 text-left text-sm", i === active ? "border-primary bg-primary/10" : "border-border")}>
                <span className={cn("grid size-6 place-items-center rounded-full text-xs", fin ? "bg-success text-background" : "bg-muted")}>{fin ? <Check className="size-3.5" /> : i + 1}</span>
                <span className="flex-1"><span className="font-medium">{e.name}</span><br /><span className="text-xs text-muted-foreground">{it.sets} × {it.reps} · nghỉ {it.rest}</span></span>
              </button></li>); })}
          </ul>
        </Panel>
        <Panel title={findExercise(items[active]!.exerciseId).name} action={<Button size="sm" variant="outline" onClick={() => setSets((all) => all.map((r, a) => (a === active ? [...r, { reps: 10, weight: 20, rpe: 7, done: false }] : r)))}><Plus className="size-4" /> Thêm hiệp</Button>}>
          <div className="relative overflow-x-auto">
            <table className="w-full min-w-[520px] text-sm">
              <thead><tr className="text-left text-xs text-muted-foreground"><th className="p-2">Hiệp</th><th className="p-2">Lần lặp</th><th className="p-2">Mức tạ (kg)</th><th className="p-2">RPE (1–10)</th><th className="p-2">Xong</th></tr></thead>
              <tbody>
                {sets[active]!.map((x, j) => (
                  <tr key={j} className={cn("border-t border-border", x.done && "bg-success/5")}>
                    <td className="p-2 font-medium">{j + 1}</td>
                    <td className="p-2"><Input type="number" className="w-20" value={x.reps} onChange={(e) => upd(active, j, { reps: Number(e.target.value) })} /></td>
                    <td className="p-2"><Input type="number" step="2.5" className="w-24" value={x.weight} onChange={(e) => upd(active, j, { weight: Number(e.target.value) })} /></td>
                    <td className="p-2"><Input type="number" min={1} max={10} className="w-20" value={x.rpe} onChange={(e) => upd(active, j, { rpe: Number(e.target.value) })} /></td>
                    <td className="p-2"><Checkbox checked={x.done} onCheckedChange={(v) => { upd(active, j, { done: !!v }); if (v) toast.success(`Hiệp ${j + 1} xong — nghỉ ${items[active]!.rest}`); }} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">RPE: mức gắng sức cảm nhận, 10 là không thể thực hiện thêm lần nào.</p>
        </Panel>
      </div>
    </OPage>
  );
}

export function TrainerSessionFeedback() {
  const s = findSession(useId());
  const c = findCustomer(s.customerId);
  return (
    <OPage area="trainer" title="Phản hồi sau buổi tập" parent={{ label: "Lịch hướng dẫn", to: "/trainer/calendar" }} description={`${c.name} · ${formatDate(s.date)} · ${s.focus}`}>
      <form className="grid gap-6 lg:grid-cols-3" onSubmit={(e) => { e.preventDefault(); toast.success("Đã gửi phản hồi tới học viên."); }}>
        <Panel title="Đánh giá buổi tập" className="lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Kỹ thuật (1–10)"><Input type="number" defaultValue={8} /></Field>
            <Field label="Mức độ tập trung (1–10)"><Input type="number" defaultValue={9} /></Field>
            <Field label="Sức bền (1–10)"><Input type="number" defaultValue={7} /></Field>
          </div>
          <div className="mt-4 space-y-4">
            <Field label="Điểm làm tốt"><Textarea rows={3} defaultValue="Giữ lưng thẳng tốt ở bài squat, hoàn thành đủ 4 hiệp." /></Field>
            <Field label="Cần cải thiện"><Textarea rows={3} defaultValue="Hạ tạ chậm hơn ở pha lệch tâm, thở ra khi đẩy." /></Field>
            <Field label="Bài tập về nhà"><Textarea rows={2} defaultValue="Giãn cơ hông 10 phút mỗi tối, đi bộ 7.000 bước/ngày." /></Field>
          </div>
        </Panel>
        <Panel title="Điều chỉnh buổi sau">
          {["Tăng mức tạ squat +2,5 kg", "Giữ nguyên khối lượng", "Thêm bài giãn cơ", "Giảm cường độ HIIT"].map((t, i) => <label key={t} className="mb-3 flex items-center gap-3 text-sm"><Checkbox defaultChecked={i === 0} /> {t}</label>)}
          <Button type="submit" className="mt-4 w-full">Gửi phản hồi</Button>
        </Panel>
      </form>
    </OPage>
  );
}

export function TrainerProgress() {
  return (
    <OPage area="trainer" title="Tiến độ tập luyện của học viên">
      <Grid cols={3}>
        {CUSTOMERS.map((c) => { const diff = c.weight - c.startWeight; const pct = (c.sessionsDone / c.sessionsTotal) * 100; return (
          <div key={c.id} className="card-surface p-5">
            <div className="flex items-center gap-3"><Avatar name={c.name} /><div className="flex-1"><p className="font-medium">{c.name}</p><p className="text-xs text-muted-foreground">{c.goal}</p></div><StatusBadge status={c.status} label={c.status === "warning" ? "Chững tiến độ" : undefined} /></div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
              <div><p className="text-xs text-muted-foreground">Cân nặng</p><p className="font-semibold">{kg(c.weight)}</p></div>
              <div><p className="text-xs text-muted-foreground">Thay đổi</p><p className="font-semibold">{diff > 0 ? "+" : ""}{kg(diff)}</p></div>
              <div><p className="text-xs text-muted-foreground">Mỡ</p><p className="font-semibold">{String(c.bodyFat).replace(".", ",")}%</p></div>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">Buổi tập {c.sessionsDone}/{c.sessionsTotal}</p>
            <ProgressBar value={pct} className="mt-1" />
            <div className="mt-3"><TextLink to="/trainer/customers/$id" params={{ id: c.id }}>Xem chi tiết</TextLink></div>
          </div>); })}
      </Grid>
      <Panel title="Số buổi hoàn thành theo học viên"><SimpleBarChart data={CUSTOMERS.map((c) => ({ name: c.name.split(" ").pop()!, done: c.sessionsDone, left: c.sessionsTotal - c.sessionsDone }))} xKey="name" series={[{ key: "done", name: "Đã tập" }, { key: "left", name: "Còn lại", color: "var(--cyan)" }]} /></Panel>
    </OPage>
  );
}

export function TrainerCustomers() {
  const cols: Column<Customer>[] = [
    { key: "n", header: "Học viên", sortable: true, value: (c) => c.name, cell: (c) => <span className="flex items-center gap-2"><Avatar name={c.name} className="size-8 text-xs" /><TextLink to="/trainer/customers/$id" params={{ id: c.id }}>{c.name}</TextLink></span> },
    { key: "g", header: "Mục tiêu", value: (c) => c.goal },
    { key: "p", header: "Gói", value: (c) => c.package },
    { key: "s", header: "Tiến độ gói", sortable: true, value: (c) => c.sessionsDone / c.sessionsTotal, cell: (c) => <div className="w-32"><p className="text-xs">{c.sessionsDone}/{c.sessionsTotal} buổi</p><ProgressBar value={(c.sessionsDone / c.sessionsTotal) * 100} className="mt-1" /></div> },
    { key: "w", header: "Cân nặng", sortable: true, value: (c) => c.weight, cell: (c) => kg(c.weight) },
    { key: "l", header: "Buổi gần nhất", sortable: true, value: (c) => c.lastSession, cell: (c) => formatDate(c.lastSession) },
    { key: "st", header: "Trạng thái", cell: (c) => <StatusBadge status={c.status} label={c.status === "warning" ? "Chững tiến độ" : c.status === "expired" ? "Hết gói" : undefined} /> },
  ];
  return (
    <OPage area="trainer" title="Danh sách học viên" description={`${CUSTOMERS.length} học viên đang được bạn hướng dẫn.`}>
      <DataTable data={CUSTOMERS} columns={cols} searchPlaceholder="Tìm học viên..."
        filters={[{ key: "st", label: "Trạng thái", options: [{ label: "Đang hoạt động", value: "active" }, { label: "Chững tiến độ", value: "warning" }, { label: "Hết gói", value: "expired" }], match: (c, v) => c.status === v }]} />
    </OPage>
  );
}

export function TrainerCustomerDetail() {
  const c = findCustomer(useId());
  return (
    <OPage area="trainer" title={c.name} parent={CUS}
      actions={<div className="flex flex-wrap gap-2"><ButtonLink variant="outline" to="/trainer/customers/$id/nutrition-plan" params={{ id: c.id }}>Kế hoạch dinh dưỡng</ButtonLink><ButtonLink to="/trainer/customers/$id/ai-plan" params={{ id: c.id }}><Sparkles className="size-4" /> Gợi ý giáo án AI</ButtonLink></div>}>
      <div className="grid gap-6 lg:grid-cols-3">
        <Panel title="Hồ sơ">
          <InfoList items={[{ label: "Tuổi / giới tính", value: `${c.age} · ${c.gender}` }, { label: "Điện thoại", value: c.phone }, { label: "Mục tiêu", value: c.goal }, { label: "Chấn thương", value: c.injuries }, { label: "Gói tập", value: c.package }, { label: "Buổi gần nhất", value: formatDate(c.lastSession) }]} />
        </Panel>
        <div className="space-y-6 lg:col-span-2">
          <Grid cols={4}>
            <StatCard label="Cân nặng" value={kg(c.weight)} trend={{ value: kg(c.weight - c.startWeight), direction: c.weight < c.startWeight ? "down" : "up" }} />
            <StatCard label="Tỷ lệ mỡ" value={`${String(c.bodyFat).replace(".", ",")}%`} />
            <StatCard label="Khối cơ" value={kg(c.muscle)} />
            <StatCard label="Buổi đã tập" value={`${c.sessionsDone}/${c.sessionsTotal}`} />
          </Grid>
          <Panel title="Diễn biến chỉ số"><SimpleLineChart data={METRIC_HISTORY} xKey="date" series={[{ key: "weight", name: "Cân nặng (kg)" }, { key: "bodyFat", name: "Mỡ (%)", color: "var(--cyan)" }, { key: "muscle", name: "Cơ (kg)", color: "var(--warning)" }]} /></Panel>
        </div>
      </div>
      <Panel title="Giáo án của học viên">
        <ul className="divide-y divide-border">{LESSON_PLANS.filter((p) => p.customerId === c.id).map((p) => <li key={p.id} className="flex flex-wrap items-center justify-between gap-2 py-3 text-sm"><TextLink to="/trainer/lesson-plans/$id" params={{ id: p.id }}>{p.name}</TextLink><span className="text-muted-foreground">v{p.version} · {p.weeks} tuần</span><StatusBadge status={p.status} /></li>)}</ul>
        {LESSON_PLANS.every((p) => p.customerId !== c.id) ? <p className="text-sm text-muted-foreground">Chưa có giáo án. <TextLink to="/trainer/lesson-plans/create">Tạo giáo án</TextLink></p> : null}
      </Panel>
    </OPage>
  );
}

export function TrainerAiPlan() {
  const c = findCustomer(useId());
  const [accepted, setAccepted] = useState<number[]>([]);
  const ideas = [
    { title: "Tăng khối lượng thân dưới", detail: "Squat 4 × 8 ở 70% 1RM, thêm Romanian Deadlift 3 × 10.", reason: `Cân nặng ${c.name.split(" ").pop()} giảm chậm 2 tuần gần đây, khối cơ vẫn ổn định.` },
    { title: "Thêm 2 buổi cardio vùng 2", detail: "30 phút đạp xe, nhịp tim 120–135 lần/phút vào thứ 3 và thứ 7.", reason: "Tăng tiêu hao năng lượng mà không ảnh hưởng phục hồi." },
    { title: "Giảm thời gian nghỉ giữa hiệp", detail: "Từ 90 giây xuống 60 giây ở các bài phụ.", reason: "RPE trung bình 6,5 — học viên còn dư sức." },
  ];
  return (
    <OPage area="trainer" title="Giáo án được AI gợi ý" parent={{ label: c.name, to: `/trainer/customers/${c.id}` }}>
      <div className="flex items-start gap-3 rounded-md border border-cyan/30 bg-cyan/5 p-4 text-sm">
        <Sparkles className="mt-0.5 size-5 shrink-0 text-cyan" />
        <p><span className="font-semibold text-cyan">Đây chỉ là gợi ý.</span> Nội dung do AI đề xuất dựa trên chỉ số và lịch sử tập của học viên. Bạn cần xem xét và chỉnh sửa trước khi áp dụng; AI không thay thế đánh giá chuyên môn của huấn luyện viên.</p>
      </div>
      <Grid cols={3}>
        {ideas.map((it, i) => (
          <div key={i} className={cn("card-surface flex flex-col p-5", accepted.includes(i) && "border-primary/50")}>
            <StatusBadge tone="info" label="Gợi ý AI" />
            <h3 className="mt-3 font-semibold">{it.title}</h3>
            <p className="mt-2 text-sm">{it.detail}</p>
            <p className="mt-2 text-xs text-muted-foreground">Lý do: {it.reason}</p>
            <div className="mt-auto flex gap-2 pt-4">
              <Button size="sm" variant={accepted.includes(i) ? "default" : "outline"} onClick={() => setAccepted((a) => (a.includes(i) ? a.filter((x) => x !== i) : [...a, i]))}>{accepted.includes(i) ? "Đã chọn" : "Chọn gợi ý"}</Button>
            </div>
          </div>
        ))}
      </Grid>
      <div className="flex flex-wrap justify-end gap-2">
        <Button variant="outline" onClick={() => toast.info("Đang tạo lại gợi ý mới...")}>Tạo gợi ý khác</Button>
        <Button disabled={!accepted.length} onClick={() => toast.success(`Đã thêm ${accepted.length} gợi ý vào bản nháp giáo án.`)}>Đưa vào bản nháp giáo án</Button>
      </div>
    </OPage>
  );
}

export function TrainerPlanPublish() {
  const p = findPlan(useId());
  const c = findCustomer(p.customerId);
  const [done, setDone] = useState(false);
  const checks = ["Đã kiểm tra bài tập phù hợp chấn thương của học viên", "Khối lượng tập tăng không quá 10% so với phiên bản trước", "Đã ghi chú mục tiêu từng giai đoạn"];
  return (
    <OPage area="trainer" title="Xuất bản giáo án" parent={{ label: p.name, to: `/trainer/lesson-plans/${p.id}` }}>
      <div className="grid gap-6 lg:grid-cols-3">
        <Panel title="Tóm tắt" className="lg:col-span-2">
          <InfoList items={[{ label: "Giáo án", value: p.name }, { label: "Học viên", value: c.name }, { label: "Phiên bản xuất bản", value: `v${p.version + (p.status === "draft" ? 0 : 1)}` }, { label: "Số buổi/tuần", value: p.days.length }, { label: "Tổng bài tập", value: p.days.reduce((s, d) => s + d.items.length, 0) }, { label: "Ngày áp dụng", value: "28/09/2026" }]} />
        </Panel>
        <Panel title="Xác nhận xuất bản">
          {done ? <div className="text-center"><Check className="mx-auto size-10 text-success" /><p className="mt-2 font-medium">Đã xuất bản</p><p className="text-sm text-muted-foreground">{c.name} đã nhận thông báo giáo án mới.</p></div> : (
            <>
              {checks.map((t) => <label key={t} className="mb-3 flex items-start gap-3 text-sm"><Checkbox defaultChecked /> {t}</label>)}
              <Dialog><DialogTrigger asChild><Button className="mt-2 w-full">Xuất bản giáo án</Button></DialogTrigger>
                <DialogContent><DialogHeader><DialogTitle>Xuất bản “{p.name}”?</DialogTitle><DialogDescription>Học viên {c.name} sẽ thấy giáo án này trong lộ trình tập. Phiên bản cũ được lưu vào lịch sử.</DialogDescription></DialogHeader>
                  <DialogFooter><Button onClick={() => { setDone(true); toast.success("Đã xuất bản giáo án."); }}>Xác nhận xuất bản</Button></DialogFooter></DialogContent></Dialog>
            </>
          )}
        </Panel>
      </div>
    </OPage>
  );
}

export function TrainerNutritionPlan() {
  const c = findCustomer(useId());
  const [kcal, setKcal] = useState(1650);
  const [macro, setMacro] = useState({ p: 30, c: 45, f: 25 });
  const grams = { p: Math.round((kcal * macro.p) / 100 / 4), c: Math.round((kcal * macro.c) / 100 / 4), f: Math.round((kcal * macro.f) / 100 / 9) };
  const meals = [["Bữa sáng 07:00", "Yến mạch 50 g, 2 trứng luộc, 1 quả chuối"], ["Bữa trưa 12:00", "Cơm gạo lứt 150 g, ức gà 150 g, rau luộc"], ["Bữa phụ 15:30", "Sữa chua Hy Lạp, 1 nắm hạt"], ["Bữa tối 19:00", "Cá hồi 120 g, khoai lang 150 g, salad"]];
  return (
    <OPage area="trainer" title="Kế hoạch dinh dưỡng" parent={{ label: c.name, to: `/trainer/customers/${c.id}` }}>
      <form className="grid gap-6 lg:grid-cols-3" onSubmit={(e) => { e.preventDefault(); if (macro.p + macro.c + macro.f !== 100) return toast.error("Tổng tỷ lệ đạm, tinh bột, chất béo phải bằng 100%."); toast.success("Đã lưu và gửi kế hoạch dinh dưỡng."); }}>
        <Panel title="Mục tiêu năng lượng">
          <Field label="Calo mỗi ngày (kcal)"><Input type="number" value={kcal} onChange={(e) => setKcal(Number(e.target.value))} /></Field>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {(["p", "c", "f"] as const).map((k) => <Field key={k} label={{ p: "Đạm %", c: "Tinh bột %", f: "Béo %" }[k]}><Input type="number" value={macro[k]} onChange={(e) => setMacro((m) => ({ ...m, [k]: Number(e.target.value) }))} /></Field>)}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
            <div className="rounded-md bg-primary/10 p-3"><p className="font-semibold">{grams.p} g</p><p className="text-xs text-muted-foreground">Đạm</p></div>
            <div className="rounded-md bg-cyan/10 p-3"><p className="font-semibold">{grams.c} g</p><p className="text-xs text-muted-foreground">Tinh bột</p></div>
            <div className="rounded-md bg-warning/10 p-3"><p className="font-semibold">{grams.f} g</p><p className="text-xs text-muted-foreground">Chất béo</p></div>
          </div>
          <Field label="Nước uống (lít/ngày)"><Input type="number" defaultValue={2.5} step={0.5} /></Field>
        </Panel>
        <Panel title="Thực đơn mẫu" className="lg:col-span-2">
          <div className="space-y-3">{meals.map(([t, d]) => <Field key={t} label={t}><Textarea rows={2} defaultValue={d} /></Field>)}</div>
          <Field label="Ghi chú cho học viên"><Textarea rows={2} defaultValue="Hạn chế đồ chiên, nước ngọt. Ăn trước tập 60–90 phút." /></Field>
          <div className="mt-4 flex justify-end"><Button type="submit">Lưu và gửi học viên</Button></div>
        </Panel>
      </form>
    </OPage>
  );
}

export function TrainerMilestones() {
  const p = findPlan(useId());
  const [notes, setNotes] = useState<Record<string, string>>({});
  return (
    <OPage area="trainer" title="Đánh giá cột mốc" parent={{ label: p.name, to: `/trainer/lesson-plans/${p.id}` }}>
      <Panel><p className="text-sm text-muted-foreground">Đã đạt {MILESTONES.filter((m) => m.done).length}/{MILESTONES.length} cột mốc</p><ProgressBar value={(MILESTONES.filter((m) => m.done).length / MILESTONES.length) * 100} className="mt-2" /></Panel>
      <div className="space-y-4">
        {MILESTONES.map((m) => (
          <div key={m.id} className="card-surface grid gap-4 p-5 md:grid-cols-[1fr_1fr_1.4fr]">
            <div><div className="flex items-center gap-2"><StatusBadge status={m.done ? "completed" : "processing"} label={m.done ? "Đã đạt" : "Đang tiến hành"} /></div><p className="mt-2 font-medium">{m.title}</p></div>
            <div className="grid grid-cols-2 gap-2 text-sm"><div><p className="text-xs text-muted-foreground">Mục tiêu</p><p className="font-semibold">{m.target}</p></div><div><p className="text-xs text-muted-foreground">Thực tế</p><p className="font-semibold">{m.actual}</p></div></div>
            <div className="flex gap-2"><Textarea rows={2} placeholder="Nhận xét của HLV..." value={notes[m.id] ?? ""} onChange={(e) => setNotes((n) => ({ ...n, [m.id]: e.target.value }))} /><Button variant="outline" onClick={() => toast.success("Đã lưu nhận xét cột mốc.")}>Lưu</Button></div>
          </div>
        ))}
      </div>
    </OPage>
  );
}

export function TrainerPlanVersions() {
  const p = findPlan(useId());
  return (
    <OPage area="trainer" title="Lịch sử phiên bản giáo án" parent={{ label: p.name, to: `/trainer/lesson-plans/${p.id}` }}>
      <Panel>
        <Timeline items={PLAN_VERSIONS.map((v, i) => ({ title: `Phiên bản ${v.version} — ${v.status}`, time: v.date, tone: i === 0 ? "success" : "neutral", description: `${v.note} (${v.author})` }))} />
        <div className="mt-6 flex gap-2"><Button variant="outline" onClick={() => toast.success("Đã khôi phục v2 thành bản nháp mới.")}>Khôi phục phiên bản 2</Button><ButtonLink to="/trainer/lesson-plans/$id/edit" params={{ id: p.id }}>Tạo phiên bản mới</ButtonLink></div>
      </Panel>
    </OPage>
  );
}

export function TrainerChat() {
  return <OPage area="trainer" title="Trò chuyện với hội viên"><ChatView contacts={CHAT_CONTACTS} threads={CHAT_THREADS} /></OPage>;
}
export function TrainerNotifications() {
  return <OPage area="trainer" title="Thông báo"><NotificationList items={NOTIFICATIONS} /></OPage>;
}
