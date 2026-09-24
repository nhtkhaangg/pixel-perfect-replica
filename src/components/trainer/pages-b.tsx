import { useState } from "react";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { ButtonLink, Field, Grid, InfoList, OPage, Panel, ReplyPanel, Stars, TextLink } from "@/components/ops/kit";
import { DataTable, type Column } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import { CUSTOMERS, EXERCISES, LESSON_PLANS, REVIEWS, findCustomer, findExercise, findPlan, findReview, type Exercise, type LessonPlan, type PlanDay, type Review } from "@/lib/mock/trainer";
import { useId } from "./pages-a";

const PLANS = { label: "Giáo án", to: "/trainer/lesson-plans" };
const EX = { label: "Bài tập", to: "/trainer/exercises" };

export function TrainerLessonPlans() {
  const cols: Column<LessonPlan>[] = [
    { key: "name", header: "Tên giáo án", sortable: true, value: (p) => p.name, cell: (p) => <TextLink to="/trainer/lesson-plans/$id" params={{ id: p.id }}>{p.name}</TextLink> },
    { key: "c", header: "Học viên", sortable: true, value: (p) => findCustomer(p.customerId).name },
    { key: "goal", header: "Mục tiêu", value: (p) => p.goal },
    { key: "w", header: "Thời lượng", sortable: true, value: (p) => p.weeks, cell: (p) => `${p.weeks} tuần` },
    { key: "v", header: "Phiên bản", cell: (p) => `v${p.version}` },
    { key: "u", header: "Cập nhật", sortable: true, value: (p) => p.updated, cell: (p) => formatDate(p.updated) },
    { key: "s", header: "Trạng thái", cell: (p) => <StatusBadge status={p.status === "active" ? "active" : p.status} label={p.status === "active" ? "Đang áp dụng" : undefined} /> },
  ];
  return (
    <OPage area="trainer" title="Danh sách giáo án" actions={<ButtonLink to="/trainer/lesson-plans/create"><Plus className="size-4" /> Tạo giáo án</ButtonLink>}>
      <DataTable data={LESSON_PLANS} columns={cols} searchPlaceholder="Tìm giáo án, học viên..."
        filters={[{ key: "s", label: "Trạng thái", options: [{ label: "Đang áp dụng", value: "active" }, { label: "Bản nháp", value: "draft" }, { label: "Hoàn thành", value: "completed" }], match: (p, v) => p.status === v }]} />
    </OPage>
  );
}

export function TrainerLessonPlanDetail() {
  const p = findPlan(useId());
  const c = findCustomer(p.customerId);
  return (
    <OPage area="trainer" title={p.name} parent={PLANS}
      actions={<div className="flex flex-wrap gap-2">
        <ButtonLink variant="outline" to="/trainer/plans/$id/versions" params={{ id: p.id }}>Lịch sử phiên bản</ButtonLink>
        <ButtonLink variant="outline" to="/trainer/plans/$id/milestones" params={{ id: p.id }}>Cột mốc</ButtonLink>
        <ButtonLink variant="outline" to="/trainer/lesson-plans/$id/edit" params={{ id: p.id }}>Chỉnh sửa</ButtonLink>
        <ButtonLink to="/trainer/plans/$id/publish" params={{ id: p.id }}>Xuất bản</ButtonLink>
      </div>}>
      <Panel><InfoList items={[{ label: "Học viên", value: <TextLink to="/trainer/customers/$id" params={{ id: c.id }}>{c.name}</TextLink> }, { label: "Mục tiêu", value: p.goal }, { label: "Thời lượng", value: `${p.weeks} tuần · ${p.days.length} buổi/tuần` }, { label: "Phiên bản", value: `v${p.version} · cập nhật ${formatDate(p.updated)}` }]} /></Panel>
      <Grid cols={3}>
        {p.days.map((d) => (
          <Panel key={d.day} title={`${d.day} — ${d.title}`}>
            <ol className="space-y-3">
              {d.items.map((it, i) => { const e = findExercise(it.exerciseId); return (
                <li key={i} className="rounded-md border border-border p-3 text-sm">
                  <TextLink to="/trainer/exercises/$id" params={{ id: e.id }}>{i + 1}. {e.name}</TextLink>
                  <p className="mt-1 text-muted-foreground">{it.sets} hiệp × {it.reps} · nghỉ {it.rest}</p>
                </li>); })}
            </ol>
          </Panel>
        ))}
      </Grid>
    </OPage>
  );
}

/** Trình dựng giáo án kèm bộ chọn bài tập. */
function PlanBuilder({ initial, mode }: { initial?: LessonPlan; mode: "create" | "edit" }) {
  const [days, setDays] = useState<PlanDay[]>(initial?.days ?? [{ day: "Thứ 2", title: "Buổi 1", items: [] }]);
  const [active, setActive] = useState(0);
  const [q, setQ] = useState("");
  const update = (fn: (d: PlanDay) => PlanDay) => setDays((ds) => ds.map((d, i) => (i === active ? fn(d) : d)));
  const day = days[active]!;
  const move = (i: number, dir: -1 | 1) => update((d) => { const items = [...d.items]; const j = i + dir; if (j < 0 || j >= items.length) return d; [items[i], items[j]] = [items[j]!, items[i]!]; return { ...d, items }; });
  return (
    <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); if (!days.some((d) => d.items.length)) return toast.error("Giáo án cần ít nhất một bài tập."); toast.success(mode === "create" ? "Đã lưu bản nháp giáo án." : "Đã lưu thành phiên bản mới."); }}>
      <Panel title="Thông tin chung">
        <div className="grid gap-4 md:grid-cols-4">
          <Field label="Tên giáo án"><Input defaultValue={initial?.name} placeholder="VD: Giảm mỡ 8 tuần" required /></Field>
          <Field label="Học viên">
            <select defaultValue={initial?.customerId} className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm">{CUSTOMERS.map((c) => <option key={c.id} value={c.id} className="bg-card">{c.name}</option>)}</select>
          </Field>
          <Field label="Mục tiêu"><Input defaultValue={initial?.goal} placeholder="VD: giảm 4 kg" /></Field>
          <Field label="Số tuần"><Input type="number" defaultValue={initial?.weeks ?? 8} /></Field>
        </div>
      </Panel>
      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <Panel title="Các buổi trong tuần" action={<Button type="button" size="sm" variant="outline" onClick={() => { setDays((d) => [...d, { day: `Buổi ${d.length + 1}`, title: "Buổi mới", items: [] }]); setActive(days.length); }}><Plus className="size-4" /> Thêm buổi</Button>}>
          <div className="mb-4 flex flex-wrap gap-2">
            {days.map((d, i) => <button type="button" key={i} onClick={() => setActive(i)} className={cn("rounded-md border px-3 py-1.5 text-sm", i === active ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground")}>{d.day}</button>)}
          </div>
          <div className="mb-4 grid gap-3 sm:grid-cols-2">
            <Field label="Ngày"><Input value={day.day} onChange={(e) => update((d) => ({ ...d, day: e.target.value }))} /></Field>
            <Field label="Chủ đề buổi"><Input value={day.title} onChange={(e) => update((d) => ({ ...d, title: e.target.value }))} /></Field>
          </div>
          {day.items.length === 0 ? <p className="rounded-md border border-dashed border-border p-6 text-center text-sm text-muted-foreground">Chưa có bài tập. Chọn từ thư viện bên phải.</p> : (
            <ul className="space-y-2">
              {day.items.map((it, i) => (
                <li key={i} className="grid grid-cols-2 items-end gap-2 rounded-md border border-border p-3 sm:grid-cols-[1fr_70px_90px_100px_auto]">
                  <p className="col-span-2 text-sm font-medium sm:col-span-1">{findExercise(it.exerciseId).name}</p>
                  <Field label="Hiệp"><Input type="number" value={it.sets} onChange={(e) => update((d) => ({ ...d, items: d.items.map((x, j) => (j === i ? { ...x, sets: Number(e.target.value) } : x)) }))} /></Field>
                  <Field label="Lần lặp"><Input value={it.reps} onChange={(e) => update((d) => ({ ...d, items: d.items.map((x, j) => (j === i ? { ...x, reps: e.target.value } : x)) }))} /></Field>
                  <Field label="Nghỉ"><Input value={it.rest} onChange={(e) => update((d) => ({ ...d, items: d.items.map((x, j) => (j === i ? { ...x, rest: e.target.value } : x)) }))} /></Field>
                  <div className="flex gap-1">
                    <Button type="button" size="icon" variant="ghost" aria-label="Lên" onClick={() => move(i, -1)}><ArrowUp className="size-4" /></Button>
                    <Button type="button" size="icon" variant="ghost" aria-label="Xuống" onClick={() => move(i, 1)}><ArrowDown className="size-4" /></Button>
                    <Button type="button" size="icon" variant="ghost" aria-label="Xoá" onClick={() => update((d) => ({ ...d, items: d.items.filter((_, j) => j !== i) }))}><Trash2 className="size-4 text-destructive" /></Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Panel>
        <Panel title="Bộ chọn bài tập">
          <Input placeholder="Tìm bài tập, nhóm cơ..." value={q} onChange={(e) => setQ(e.target.value)} />
          <ul className="mt-3 max-h-[420px] space-y-2 overflow-y-auto">
            {EXERCISES.filter((e) => (e.name + e.muscle).toLowerCase().includes(q.toLowerCase())).map((e) => (
              <li key={e.id} className="flex items-center justify-between gap-2 rounded-md border border-border p-2.5">
                <div className="min-w-0"><p className="truncate text-sm font-medium">{e.name}</p><p className="text-xs text-muted-foreground">{e.muscle}</p></div>
                <Button type="button" size="sm" variant="outline" onClick={() => update((d) => ({ ...d, items: [...d.items, { exerciseId: e.id, sets: 3, reps: "10", rest: "60 giây" }] }))}><Plus className="size-4" /></Button>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
      <div className="flex justify-end gap-2"><ButtonLink variant="outline" to="/trainer/lesson-plans">Huỷ</ButtonLink><Button type="submit">{mode === "create" ? "Lưu bản nháp" : "Lưu phiên bản mới"}</Button></div>
    </form>
  );
}

export function TrainerLessonPlanCreate() {
  return <OPage area="trainer" title="Tạo giáo án" parent={PLANS} description="Xây dựng giáo án theo từng buổi, chọn bài tập từ thư viện."><PlanBuilder mode="create" /></OPage>;
}
export function TrainerLessonPlanEdit() {
  const p = findPlan(useId());
  return <OPage area="trainer" title="Chỉnh sửa giáo án" parent={PLANS} description={`${p.name} · đang ở v${p.version}. Lưu sẽ tạo v${p.version + 1}.`}><PlanBuilder mode="edit" initial={p} /></OPage>;
}

export function TrainerExercises() {
  const cols: Column<Exercise>[] = [
    { key: "n", header: "Tên bài tập", sortable: true, value: (e) => e.name, cell: (e) => <TextLink to="/trainer/exercises/$id" params={{ id: e.id }}>{e.name}</TextLink> },
    { key: "m", header: "Nhóm cơ", value: (e) => e.muscle },
    { key: "eq", header: "Dụng cụ", value: (e) => e.equipment },
    { key: "l", header: "Mức độ", sortable: true, value: (e) => e.level },
    { key: "c", header: "Nguồn", cell: (e) => <StatusBadge tone={e.custom ? "info" : "neutral"} label={e.custom ? "Tuỳ chỉnh" : "Thư viện phòng gym"} /> },
    { key: "a", header: "", cell: (e) => (e.custom ? <TextLink to="/trainer/exercises/$id/edit" params={{ id: e.id }}>Sửa</TextLink> : null) },
  ];
  return (
    <OPage area="trainer" title="Danh sách bài tập" actions={<ButtonLink to="/trainer/exercises/create"><Plus className="size-4" /> Tạo bài tập tùy chỉnh</ButtonLink>}>
      <DataTable data={EXERCISES} columns={cols} searchPlaceholder="Tìm bài tập..."
        filters={[
          { key: "l", label: "Mức độ", options: ["Cơ bản", "Trung bình", "Nâng cao"].map((x) => ({ label: x, value: x })), match: (e, v) => e.level === v },
          { key: "c", label: "Nguồn", options: [{ label: "Tuỳ chỉnh", value: "1" }, { label: "Thư viện", value: "0" }], match: (e, v) => String(Number(e.custom)) === v },
        ]} />
    </OPage>
  );
}

export function TrainerExerciseDetail() {
  const e = findExercise(useId());
  return (
    <OPage area="trainer" title={e.name} parent={EX} actions={e.custom ? <ButtonLink to="/trainer/exercises/$id/edit" params={{ id: e.id }}>Chỉnh sửa</ButtonLink> : undefined}>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card-surface grid aspect-video place-items-center text-sm text-muted-foreground lg:col-span-2">Video hướng dẫn kỹ thuật “{e.name}”</div>
        <Panel title="Thông tin"><InfoList items={[{ label: "Nhóm cơ", value: e.muscle }, { label: "Dụng cụ", value: e.equipment }, { label: "Mức độ", value: e.level }, { label: "Nguồn", value: e.custom ? "Bài tập tuỳ chỉnh của bạn" : "Thư viện phòng gym" }]} /></Panel>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Các bước thực hiện"><ol className="list-decimal space-y-2 pl-5 text-sm">{e.steps.map((s) => <li key={s}>{s}</li>)}</ol></Panel>
        <Panel title="Lưu ý an toàn"><p className="text-sm text-muted-foreground">{e.tips}</p></Panel>
      </div>
    </OPage>
  );
}

function ExerciseForm({ e }: { e?: Exercise }) {
  return (
    <form className="grid gap-6 lg:grid-cols-3" onSubmit={(ev) => { ev.preventDefault(); toast.success(e ? "Đã cập nhật bài tập." : "Đã tạo bài tập tuỳ chỉnh."); }}>
      <Panel title="Thông tin bài tập" className="lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Tên bài tập"><Input required defaultValue={e?.name} placeholder="VD: Hip thrust với ghế" /></Field>
          <Field label="Nhóm cơ chính"><Input defaultValue={e?.muscle} placeholder="VD: Mông, đùi sau" /></Field>
          <Field label="Dụng cụ"><Input defaultValue={e?.equipment} /></Field>
          <Field label="Mức độ"><select defaultValue={e?.level} className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm">{["Cơ bản", "Trung bình", "Nâng cao"].map((l) => <option key={l} className="bg-card">{l}</option>)}</select></Field>
        </div>
        <div className="mt-4 space-y-4">
          <Field label="Các bước thực hiện" hint="Mỗi dòng là một bước."><Textarea rows={5} defaultValue={e?.steps.join("\n")} /></Field>
          <Field label="Lưu ý an toàn"><Textarea rows={3} defaultValue={e?.tips} /></Field>
        </div>
      </Panel>
      <Panel title="Video minh hoạ">
        <Field label="Đường dẫn video"><Input placeholder="https://..." /></Field>
        <p className="mt-3 text-xs text-muted-foreground">Bài tập tuỳ chỉnh chỉ hiển thị cho học viên của bạn.</p>
        <div className="mt-6 flex gap-2"><ButtonLink variant="outline" to="/trainer/exercises">Huỷ</ButtonLink><Button type="submit">Lưu bài tập</Button></div>
      </Panel>
    </form>
  );
}
export function TrainerExerciseCreate() { return <OPage area="trainer" title="Tạo bài tập tùy chỉnh" parent={EX}><ExerciseForm /></OPage>; }
export function TrainerExerciseEdit() { const e = findExercise(useId() ?? "e6"); return <OPage area="trainer" title="Cập nhật bài tập tùy chỉnh" parent={EX} description={e.name}><ExerciseForm e={e} /></OPage>; }

export function TrainerReviews() {
  const avg = REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length;
  const cols: Column<Review>[] = [
    { key: "c", header: "Học viên", sortable: true, value: (r) => r.customer },
    { key: "r", header: "Số sao", sortable: true, value: (r) => r.rating, cell: (r) => <Stars value={r.rating} /> },
    { key: "t", header: "Nội dung", cell: (r) => <span className="line-clamp-2 max-w-md">{r.content}</span> },
    { key: "d", header: "Ngày", sortable: true, value: (r) => r.date, cell: (r) => formatDate(r.date) },
    { key: "s", header: "Phản hồi", cell: (r) => <StatusBadge tone={r.reply ? "success" : "warning"} label={r.reply ? "Đã phản hồi" : "Chưa phản hồi"} /> },
    { key: "a", header: "", cell: (r) => <TextLink to="/trainer/reviews/$id" params={{ id: r.id }}>Chi tiết</TextLink> },
  ];
  return (
    <OPage area="trainer" title="Đánh giá về tôi">
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <Panel>
          <p className="font-display text-5xl">{avg.toFixed(1).replace(".", ",")}</p><Stars value={avg} size={18} />
          <p className="mt-1 text-sm text-muted-foreground">{REVIEWS.length} đánh giá gần đây</p>
          <div className="mt-4 space-y-1.5">{[5, 4, 3, 2, 1].map((s) => { const n = REVIEWS.filter((r) => r.rating === s).length; return <div key={s} className="flex items-center gap-2 text-xs"><span className="w-4">{s}</span><div className="h-2 flex-1 rounded-full bg-muted"><div className="h-2 rounded-full bg-warning" style={{ width: `${(n / REVIEWS.length) * 100}%` }} /></div><span className="w-4 text-right">{n}</span></div>; })}</div>
        </Panel>
        <DataTable data={REVIEWS} columns={cols} searchPlaceholder="Tìm theo học viên, nội dung..." filters={[{ key: "rp", label: "Phản hồi", options: [{ label: "Chưa phản hồi", value: "0" }, { label: "Đã phản hồi", value: "1" }], match: (r, v) => String(Number(!!r.reply)) === v }]} />
      </div>
    </OPage>
  );
}

export function TrainerReviewDetail() {
  const r = findReview(useId());
  return (
    <OPage area="trainer" title="Chi tiết và phản hồi đánh giá" parent={{ label: "Đánh giá", to: "/trainer/reviews" }}>
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title={r.customer} action={<Stars value={r.rating} />}>
          <p className="text-sm leading-relaxed">“{r.content}”</p>
          <p className="mt-3 text-xs text-muted-foreground">{formatDate(r.date)} · {r.session}</p>
          <Dialog><DialogTrigger asChild><Button variant="ghost" size="sm" className="mt-3">Báo cáo đánh giá không phù hợp</Button></DialogTrigger>
            <DialogContent><DialogHeader><DialogTitle>Báo cáo đánh giá</DialogTitle></DialogHeader><Textarea placeholder="Lý do báo cáo..." /><Button onClick={() => toast.success("Đã gửi báo cáo tới quản lý.")}>Gửi báo cáo</Button></DialogContent></Dialog>
        </Panel>
        <ReplyPanel existing={r.reply} />
      </div>
    </OPage>
  );
}
