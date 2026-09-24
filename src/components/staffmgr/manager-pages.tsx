import { useState } from "react";
import { Activity, Award, Dumbbell, Plus, RotateCcw, UserCheck, Users, Wallet, Wrench } from "lucide-react";
import { toast } from "sonner";

import { ActivityList, ApprovalActions, Avatar, ButtonLink, Field, FormDrawer, Grid, InfoList, NotificationList, OPage, Panel, Stars, TextLink, Timeline } from "@/components/ops/kit";
import { SimpleBarChart, SimpleDonutChart, SimpleLineChart } from "@/components/shared/charts";
import { DataTable, type Column } from "@/components/shared/DataTable";
import { StatCard } from "@/components/shared/StatCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency, formatDate, formatNumber } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useId } from "@/components/trainer/pages-a";
import { EXERCISES, findExercise, type Exercise } from "@/lib/mock/trainer";
import {
  CHECKINS_DAILY, CHECKINS_HOURLY, FACILITIES, MANAGER_NOTIFS, OPS_TRAINERS, PAYMENTS, REFUNDS, REVENUE_MONTHLY, STAFF, TRAINER_CERTS,
  findFacility, findRefund, findStaff, findTrainer, type Facility, type OpsTrainer, type Refund, type Staff,
} from "@/lib/mock/ops";

const M = (label: string, to: string) => ({ label, to });
const mil = (n: number) => `${n} triệu`;

function Leaderboard() {
  const top = [...OPS_TRAINERS].filter((t) => t.status === "active").sort((a, b) => b.revenue - a.revenue);
  return (
    <ol className="space-y-2">
      {top.map((t, i) => (
        <li key={t.id} className={cn("flex items-center gap-3 rounded-md border p-3", i === 0 ? "border-primary/40 bg-primary/5" : "border-border")}>
          <span className={cn("grid size-7 place-items-center rounded-full text-sm font-bold", i < 3 ? "bg-primary text-primary-foreground" : "bg-muted")}>{i + 1}</span>
          <Avatar name={t.name} className="size-9" />
          <div className="min-w-0 flex-1"><TextLink to="/manager/trainers/$id" params={{ id: t.id }}>{t.name}</TextLink><p className="text-xs text-muted-foreground">{t.sessionsMonth} buổi · <Stars value={t.rating} size={10} /> {t.rating}</p></div>
          <span className="text-sm font-semibold">{formatCurrency(t.revenue)}</span>
        </li>
      ))}
    </ol>
  );
}

export function ManagerDashboard() {
  return (
    <OPage area="manager" title="Tổng quan quản lý" description="Số liệu tháng 9/2026 tính đến 25/09.">
      <Grid cols={4}>
        <StatCard label="Doanh thu tháng" value="399.000.000 VNĐ" trend={{ value: "+11%", direction: "up" }} icon={Wallet} />
        <StatCard label="Lượt check-in hôm nay" value="318" hint="Tuần này: 2.930" icon={Activity} />
        <StatCard label="Hội viên đang hoạt động" value="1.248" trend={{ value: "+36", direction: "up" }} icon={Users} />
        <StatCard label="HLV đang hoạt động" value={String(OPS_TRAINERS.filter((t) => t.status === "active").length)} icon={Dumbbell} />
      </Grid>
      <Grid cols={2}>
        <Panel title="Yêu cầu hoàn tiền" action={<TextLink to="/manager/refunds">Xem tất cả</TextLink>}>
          <ul className="divide-y divide-border">{REFUNDS.filter((r) => r.status === "pending").map((r) => <li key={r.id} className="flex flex-wrap items-center gap-2 py-3 text-sm"><RotateCcw className="size-4 text-warning" /><TextLink to="/manager/refunds/$id" params={{ id: r.id }}>{r.customer}</TextLink><span className="text-muted-foreground">{r.item}</span><span className="ml-auto font-semibold">{formatCurrency(r.amount)}</span></li>)}</ul>
        </Panel>
        <Panel title="Hồ sơ HLV chờ duyệt">
          {OPS_TRAINERS.filter((t) => t.status === "pending").map((t) => <div key={t.id} className="flex items-center gap-3 rounded-md border border-warning/30 bg-warning/5 p-3"><Avatar name={t.name} /><div className="flex-1 text-sm"><p className="font-medium">{t.name}</p><p className="text-muted-foreground">{t.specialty} · {t.certPending} chứng chỉ</p></div><ButtonLink variant="outline" to="/manager/trainers/$id/review" params={{ id: t.id }}>Xét duyệt</ButtonLink></div>)}
        </Panel>
      </Grid>
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Biểu đồ doanh thu (triệu VNĐ)"><SimpleBarChart data={REVENUE_MONTHLY} xKey="month" series={[{ key: "membership", name: "Gói hội viên" }, { key: "pt", name: "Gói PT", color: "var(--cyan)" }]} /></Panel>
        <Panel title="Biểu đồ check-in 7 ngày"><SimpleLineChart data={CHECKINS_DAILY} xKey="day" series={[{ key: "count", name: "Lượt check-in" }]} /></Panel>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Huấn luyện viên nổi bật" action={<TextLink to="/manager/analytics/trainers">Bảng xếp hạng</TextLink>}><Leaderboard /></Panel>
        <Panel title="Hoạt động gần đây"><ActivityList items={[
          { text: "Đinh Quang Hiếu nộp hồ sơ huấn luyện viên", time: "24/09" },
          { text: "Mai Phương Thảo gửi yêu cầu hoàn tiền 6.400.000 VNĐ", time: "23/09" },
          { text: "Máy kéo cáp đa năng bị khoá do đứt cáp", time: "22/09" },
          { text: "Duyệt hoàn tiền cho Trương Mỹ Linh", time: "12/09" },
          { text: "Thêm nhân viên Cao Thị Mai", time: "10/09" },
        ]} /></Panel>
      </div>
    </OPage>
  );
}

const staffFields = (s?: Staff) => [
  { name: "name", label: "Họ và tên", defaultValue: s?.name }, { name: "role", label: "Vị trí", defaultValue: s?.role },
  { name: "email", label: "Email", defaultValue: s?.email }, { name: "phone", label: "Số điện thoại", defaultValue: s?.phone },
  { name: "shift", label: "Ca làm việc", defaultValue: s?.shift }, { name: "salary", label: "Lương cơ bản (VNĐ)", type: "number" as const, defaultValue: s ? String(s.salary) : undefined },
];

export function ManagerStaff() {
  const cols: Column<Staff>[] = [
    { key: "n", header: "Nhân viên", sortable: true, value: (s) => s.name, cell: (s) => <span className="flex items-center gap-2"><Avatar name={s.name} className="size-8 text-xs" /><TextLink to="/manager/staff/$id" params={{ id: s.id }}>{s.name}</TextLink></span> },
    { key: "r", header: "Vị trí", sortable: true, value: (s) => s.role },
    { key: "p", header: "Điện thoại", value: (s) => s.phone },
    { key: "sh", header: "Ca", value: (s) => s.shift },
    { key: "j", header: "Ngày vào làm", sortable: true, value: (s) => s.joined, cell: (s) => formatDate(s.joined) },
    { key: "s", header: "Trạng thái", cell: (s) => <StatusBadge status={s.status} /> },
  ];
  return (
    <OPage area="manager" title="Danh sách nhân viên" actions={<div className="flex gap-2"><FormDrawer trigger={<Button variant="outline">Thêm nhanh</Button>} title="Thêm nhân viên nhanh" fields={staffFields()} /><ButtonLink to="/manager/staff/create"><Plus className="size-4" /> Tạo nhân viên</ButtonLink></div>}>
      <DataTable data={STAFF} columns={cols} searchPlaceholder="Tìm nhân viên..." rowActions={[{ label: "Khoá tài khoản", tone: "danger", onSelect: (s) => toast.success(`Đã khoá tài khoản ${s.name}.`) }]}
        filters={[{ key: "r", label: "Vị trí", options: ["Lễ tân", "Kỹ thuật", "Tạp vụ", "Kinh doanh"].map((x) => ({ label: x, value: x })), match: (s, v) => s.role === v }]} />
    </OPage>
  );
}

function StaffForm({ s }: { s?: Staff }) {
  return (
    <form className="grid gap-6 lg:grid-cols-3" onSubmit={(e) => { e.preventDefault(); toast.success(s ? "Đã cập nhật nhân viên." : "Đã tạo nhân viên và gửi email kích hoạt."); }}>
      <Panel title="Thông tin nhân viên" className="lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2">{staffFields(s).map((f) => <Field key={f.name} label={f.label}><Input required name={f.name} type={f.type ?? "text"} defaultValue={f.defaultValue} /></Field>)}</div>
        <div className="mt-4"><Field label="Ghi chú"><Textarea rows={3} /></Field></div>
      </Panel>
      <Panel title="Hợp đồng">
        <div className="space-y-4"><Field label="Ngày bắt đầu"><Input type="date" defaultValue={s?.joined ?? "2026-10-01"} /></Field><Field label="Loại hợp đồng"><select className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm"><option className="bg-card">Toàn thời gian</option><option className="bg-card">Bán thời gian</option></select></Field></div>
        <div className="mt-6 flex gap-2"><ButtonLink variant="outline" to="/manager/staff">Huỷ</ButtonLink><button type="submit" className="hidden" /><Button type="submit">{s ? "Lưu thay đổi" : "Tạo nhân viên"}</Button></div>
      </Panel>
    </form>
  );
}
export function ManagerStaffCreate() { return <OPage area="manager" title="Tạo nhân viên" parent={M("Nhân viên", "/manager/staff")}><StaffForm /></OPage>; }
export function ManagerStaffEdit() { const s = findStaff(useId()); return <OPage area="manager" title="Cập nhật nhân viên" parent={M("Nhân viên", "/manager/staff")} description={s.name}><StaffForm s={s} /></OPage>; }
export function ManagerStaffDetail() {
  const s = findStaff(useId());
  return (
    <OPage area="manager" title={s.name} parent={M("Nhân viên", "/manager/staff")} actions={<ButtonLink to="/manager/staff/$id/edit" params={{ id: s.id }}>Chỉnh sửa</ButtonLink>}>
      <div className="grid gap-6 lg:grid-cols-3">
        <Panel title="Thông tin" className="lg:col-span-2"><InfoList items={[{ label: "Vị trí", value: s.role }, { label: "Email", value: s.email }, { label: "Điện thoại", value: s.phone }, { label: "Ca làm", value: s.shift }, { label: "Ngày vào làm", value: formatDate(s.joined) }, { label: "Lương cơ bản", value: formatCurrency(s.salary) }, { label: "Trạng thái", value: <StatusBadge status={s.status} /> }]} /></Panel>
        <Panel title="Hiệu suất tháng 9"><InfoList items={[{ label: "Giao dịch đã xử lý", value: PAYMENTS.filter((p) => p.staff === s.name).length }, { label: "Số ca đã làm", value: "21/22" }, { label: "Đi trễ", value: "1 lần" }]} /></Panel>
      </div>
    </OPage>
  );
}

export function ManagerTrainers() {
  const cols: Column<OpsTrainer>[] = [
    { key: "n", header: "Huấn luyện viên", sortable: true, value: (t) => t.name, cell: (t) => <span className="flex items-center gap-2"><Avatar name={t.name} className="size-8 text-xs" /><TextLink to="/manager/trainers/$id" params={{ id: t.id }}>{t.name}</TextLink></span> },
    { key: "s", header: "Chuyên môn", value: (t) => t.specialty },
    { key: "e", header: "Kinh nghiệm", sortable: true, value: (t) => t.experience, cell: (t) => `${t.experience} năm` },
    { key: "r", header: "Đánh giá", sortable: true, value: (t) => t.rating, cell: (t) => (t.rating ? <span className="flex items-center gap-1"><Stars value={t.rating} size={12} />{t.rating}</span> : "—") },
    { key: "c", header: "Học viên", sortable: true, value: (t) => t.customers },
    { key: "se", header: "Buổi/tháng", sortable: true, value: (t) => t.sessionsMonth },
    { key: "st", header: "Trạng thái", cell: (t) => <StatusBadge status={t.status} label={t.status === "pending" ? "Chờ duyệt hồ sơ" : undefined} /> },
  ];
  return <OPage area="manager" title="Danh sách huấn luyện viên"><DataTable data={OPS_TRAINERS} columns={cols} searchPlaceholder="Tìm huấn luyện viên..." filters={[{ key: "st", label: "Trạng thái", options: [{ label: "Đang hoạt động", value: "active" }, { label: "Chờ duyệt", value: "pending" }], match: (t, v) => t.status === v }]} /></OPage>;
}

export function ManagerTrainerDetail() {
  const t = findTrainer(useId());
  return (
    <OPage area="manager" title={t.name} parent={M("Huấn luyện viên", "/manager/trainers")}
      actions={<div className="flex flex-wrap gap-2"><ButtonLink variant="outline" to="/manager/trainers/$id/schedule" params={{ id: t.id }}>Lịch</ButtonLink><ButtonLink variant="outline" to="/manager/trainers/$id/certificates" params={{ id: t.id }}>Chứng chỉ</ButtonLink>{t.status === "pending" ? <ButtonLink to="/manager/trainers/$id/review" params={{ id: t.id }}>Xét duyệt</ButtonLink> : null}</div>}>
      <Grid cols={4}>
        <StatCard label="Doanh thu tháng" value={formatCurrency(t.revenue)} /><StatCard label="Buổi dạy tháng" value={String(t.sessionsMonth)} />
        <StatCard label="Học viên" value={String(t.customers)} /><StatCard label="Đánh giá" value={t.rating ? `${t.rating}/5` : "Chưa có"} />
      </Grid>
      <Panel title="Hồ sơ"><InfoList items={[{ label: "Chuyên môn", value: t.specialty }, { label: "Kinh nghiệm", value: `${t.experience} năm` }, { label: "Email", value: t.email }, { label: "Điện thoại", value: t.phone }, { label: "Chứng chỉ chờ duyệt", value: t.certPending }, { label: "Trạng thái", value: <StatusBadge status={t.status} /> }]} /></Panel>
    </OPage>
  );
}

export function ManagerTrainerReview() {
  const t = findTrainer(useId() ?? "tn5");
  const [status, setStatus] = useState<string>(t.status);
  const checks = [["Thông tin cá nhân đầy đủ", true], ["Kinh nghiệm ≥ 2 năm", t.experience >= 2], ["Có chứng chỉ chuyên môn", true], ["Đã phỏng vấn trực tiếp", true], ["Đã dạy thử 1 buổi", false]] as const;
  return (
    <OPage area="manager" title="Xét duyệt hồ sơ huấn luyện viên" parent={M(t.name, `/manager/trainers/${t.id}`)} actions={<StatusBadge status={status} />}>
      <div className="grid gap-6 lg:grid-cols-3">
        <Panel title="Hồ sơ ứng tuyển" className="lg:col-span-2">
          <div className="mb-4 flex items-center gap-3"><Avatar name={t.name} className="size-14 text-lg" /><div><p className="font-semibold">{t.name}</p><p className="text-sm text-muted-foreground">{t.specialty} · {t.experience} năm</p></div></div>
          <InfoList items={[{ label: "Email", value: t.email }, { label: "Điện thoại", value: t.phone }, { label: "Ngày nộp", value: "24/09/2026" }, { label: "Mong muốn", value: "Toàn thời gian, ca chiều tối" }]} />
          <p className="mt-4 text-sm text-muted-foreground">“6 năm làm kỹ thuật viên phục hồi chức năng tại bệnh viện, muốn hỗ trợ hội viên sau chấn thương quay lại tập luyện an toàn.”</p>
        </Panel>
        <Panel title="Tiêu chí xét duyệt">
          <ul className="space-y-2 text-sm">{checks.map(([l, ok]) => <li key={l} className="flex items-center gap-2"><span className={cn("size-2 rounded-full", ok ? "bg-success" : "bg-warning")} />{l}</li>)}</ul>
          <div className="mt-6">{status === "pending" ? <ApprovalActions subject={`hồ sơ ${t.name}`} onDone={setStatus} /> : <p className="text-sm text-muted-foreground">Đã xử lý hồ sơ.</p>}</div>
        </Panel>
      </div>
    </OPage>
  );
}

export function ManagerTrainerCertificates() {
  const t = findTrainer(useId() ?? "tn5");
  const [sel, setSel] = useState(TRAINER_CERTS[0]!.id);
  const [st, setSt] = useState<Record<string, string>>({});
  const c = TRAINER_CERTS.find((x) => x.id === sel)!;
  return (
    <OPage area="manager" title="Xác minh chứng chỉ" parent={M(t.name, `/manager/trainers/${t.id}`)}>
      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        <Panel title="Chứng chỉ đã nộp">
          <ul className="space-y-2">{TRAINER_CERTS.map((x) => <li key={x.id}><button onClick={() => setSel(x.id)} className={cn("w-full rounded-md border p-3 text-left text-sm", sel === x.id ? "border-primary bg-primary/10" : "border-border")}><p className="font-medium">{x.name}</p><div className="mt-1"><StatusBadge status={st[x.id] ?? x.status} /></div></button></li>)}</ul>
        </Panel>
        <Panel title="Bảng xác minh">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="grid aspect-[4/3] place-items-center rounded-md border border-dashed border-border-strong bg-background/40 text-center text-sm text-muted-foreground"><div><Award className="mx-auto mb-2 size-10 text-primary" />{c.code}.pdf</div></div>
            <div className="space-y-4">
              <InfoList items={[{ label: "Tên", value: c.name }, { label: "Đơn vị cấp", value: c.issuer }, { label: "Mã", value: c.code }, { label: "Ngày cấp", value: formatDate(c.issued) }, { label: "Hết hạn", value: c.expires.includes("-") ? formatDate(c.expires) : c.expires }]} />
              <Field label="Ghi chú xác minh"><Textarea rows={2} placeholder="VD: đã gọi xác minh với đơn vị cấp" /></Field>
              {(st[c.id] ?? c.status) === "pending" ? <ApprovalActions approveLabel="Xác minh hợp lệ" subject={c.name} onDone={(s) => setSt((m) => ({ ...m, [c.id]: s }))} /> : null}
            </div>
          </div>
        </Panel>
      </div>
    </OPage>
  );
}

export function ManagerTrainerSchedule() {
  const t = findTrainer(useId());
  const days = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
  const slots = ["06:00", "07:30", "09:00", "17:00", "18:30", "20:00"];
  const busy = (d: number, s: number) => (d * 7 + s * 3 + t.id.length) % 4 === 0;
  return (
    <OPage area="manager" title="Lịch huấn luyện viên" parent={M(t.name, `/manager/trainers/${t.id}`)} description="Tuần 21/09 – 27/09/2026">
      <div className="card-surface overflow-x-auto">
        <table className="w-full min-w-[720px] text-sm">
          <thead><tr><th className="p-3 text-left text-xs text-muted-foreground">Giờ</th>{days.map((d) => <th key={d} className="p-3 text-left text-xs text-muted-foreground">{d}</th>)}</tr></thead>
          <tbody>{slots.map((s, si) => <tr key={s} className="border-t border-border"><td className="p-3 text-xs text-muted-foreground">{s}</td>{days.map((d, di) => <td key={d} className="p-1.5">{di === 6 ? <div className="rounded-md bg-muted/40 p-2 text-xs text-muted-foreground">Nghỉ</div> : busy(di, si) ? <div className="rounded-md border border-primary/30 bg-primary/10 p-2 text-xs">Buổi PT</div> : <div className="rounded-md border border-dashed border-border p-2 text-xs text-muted-foreground">Trống</div>}</td>)}</tr>)}</tbody>
        </table>
      </div>
    </OPage>
  );
}

const facStatus = (s: Facility["status"]) => ({ active: { status: "active", label: "Hoạt động tốt" }, warning: { status: "warning", label: "Cần bảo trì" }, locked: { status: "locked", label: "Ngừng sử dụng" } }[s]);

export function ManagerFacilities() {
  const [view, setView] = useState<"cards" | "table">("cards");
  const cols: Column<Facility>[] = [
    { key: "n", header: "Thiết bị", sortable: true, value: (f) => f.name, cell: (f) => <TextLink to="/manager/facilities/$id" params={{ id: f.id }}>{f.name}</TextLink> },
    { key: "z", header: "Khu vực", value: (f) => f.zone }, { key: "q", header: "Số lượng", sortable: true, value: (f) => f.qty },
    { key: "m", header: "Bảo trì kế tiếp", sortable: true, value: (f) => f.nextMaint, cell: (f) => formatDate(f.nextMaint) },
    { key: "s", header: "Trạng thái", cell: (f) => <StatusBadge {...facStatus(f.status)} /> },
  ];
  return (
    <OPage area="manager" title="Danh sách cơ sở vật chất" actions={<div className="flex gap-2"><Button variant="outline" onClick={() => setView(view === "cards" ? "table" : "cards")}>{view === "cards" ? "Dạng bảng" : "Dạng thẻ"}</Button><ButtonLink to="/manager/facilities/create"><Plus className="size-4" /> Thêm</ButtonLink></div>}>
      <Grid cols={3}>
        {(["active", "warning", "locked"] as const).map((s) => <div key={s} className="card-surface p-4"><StatusBadge {...facStatus(s)} /><p className="mt-2 font-display text-3xl">{FACILITIES.filter((f) => f.status === s).length}</p></div>)}
      </Grid>
      {view === "table" ? <DataTable data={FACILITIES} columns={cols} searchPlaceholder="Tìm thiết bị..." /> : (
        <Grid cols={3}>{FACILITIES.map((f) => (
          <div key={f.id} className={cn("card-surface flex flex-col p-5", f.status === "locked" && "border-destructive/40", f.status === "warning" && "border-warning/40")}>
            <div className="flex justify-between"><Wrench className="size-5 text-muted-foreground" /><StatusBadge {...facStatus(f.status)} /></div>
            <h3 className="mt-3 font-semibold">{f.name}</h3><p className="text-sm text-muted-foreground">{f.zone} · {f.qty} chiếc</p>
            <p className="mt-2 text-xs text-muted-foreground">Bảo trì kế tiếp: {formatDate(f.nextMaint)}</p>
            {f.note ? <p className="mt-2 text-xs">{f.note}</p> : null}
            <div className="mt-auto pt-4"><TextLink to="/manager/facilities/$id" params={{ id: f.id }}>Chi tiết</TextLink></div>
          </div>))}
        </Grid>
      )}
    </OPage>
  );
}

function FacilityForm({ f }: { f?: Facility }) {
  return (
    <form className="grid gap-6 lg:grid-cols-3" onSubmit={(e) => { e.preventDefault(); toast.success(f ? "Đã cập nhật thiết bị." : "Đã thêm thiết bị."); }}>
      <Panel title="Thông tin thiết bị" className="lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Tên thiết bị"><Input required defaultValue={f?.name} /></Field><Field label="Khu vực"><Input required defaultValue={f?.zone} /></Field>
          <Field label="Số lượng"><Input type="number" defaultValue={f?.qty ?? 1} /></Field><Field label="Thương hiệu"><Input defaultValue={f?.brand} /></Field>
          <Field label="Ngày mua"><Input type="date" defaultValue={f?.bought} /></Field><Field label="Bảo trì kế tiếp"><Input type="date" defaultValue={f?.nextMaint} /></Field>
        </div>
        <div className="mt-4"><Field label="Ghi chú tình trạng"><Textarea rows={3} defaultValue={f?.note} /></Field></div>
      </Panel>
      <Panel title="Trạng thái">
        <select defaultValue={f?.status ?? "active"} className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm"><option value="active" className="bg-card">Hoạt động tốt</option><option value="warning" className="bg-card">Cần bảo trì</option><option value="locked" className="bg-card">Ngừng sử dụng</option></select>
        <div className="mt-6 flex gap-2"><ButtonLink variant="outline" to="/manager/facilities">Huỷ</ButtonLink><Button type="submit">Lưu</Button></div>
      </Panel>
    </form>
  );
}
export function ManagerFacilityCreate() { return <OPage area="manager" title="Thêm cơ sở vật chất" parent={M("Cơ sở vật chất", "/manager/facilities")}><FacilityForm /></OPage>; }
export function ManagerFacilityEdit() { const f = findFacility(useId()); return <OPage area="manager" title="Cập nhật cơ sở vật chất" parent={M("Cơ sở vật chất", "/manager/facilities")} description={f.name}><FacilityForm f={f} /></OPage>; }
export function ManagerFacilityDetail() {
  const f = findFacility(useId());
  return (
    <OPage area="manager" title={f.name} parent={M("Cơ sở vật chất", "/manager/facilities")} actions={<ButtonLink to="/manager/facilities/$id/edit" params={{ id: f.id }}>Chỉnh sửa</ButtonLink>}>
      <div className="grid gap-6 lg:grid-cols-3">
        <Panel title="Thông tin" className="lg:col-span-2"><InfoList items={[{ label: "Khu vực", value: f.zone }, { label: "Số lượng", value: f.qty }, { label: "Thương hiệu", value: f.brand }, { label: "Ngày mua", value: formatDate(f.bought) }, { label: "Bảo trì gần nhất", value: formatDate(f.lastMaint) }, { label: "Bảo trì kế tiếp", value: formatDate(f.nextMaint) }, { label: "Trạng thái", value: <StatusBadge {...facStatus(f.status)} /> }, { label: "Ghi chú", value: f.note || "Không có" }]} /></Panel>
        <Panel title="Lịch sử bảo trì" action={<FormDrawer trigger={<Button size="sm" variant="outline">Ghi nhận</Button>} title="Ghi nhận bảo trì" fields={[{ name: "date", label: "Ngày", type: "date" }, { name: "by", label: "Người thực hiện" }, { name: "note", label: "Nội dung", type: "textarea" }]} />}>
          <Timeline items={[{ title: "Bảo trì định kỳ", time: formatDate(f.lastMaint), tone: "success", description: "Trịnh Văn Lộc · vệ sinh, tra dầu" }, { title: "Thay linh kiện", time: "10/03/2026", tone: "info", description: "Đơn vị bảo hành chính hãng" }, { title: "Lắp đặt", time: formatDate(f.bought), tone: "neutral" }]} />
        </Panel>
      </div>
    </OPage>
  );
}

export function ManagerPaymentAnalytics() {
  const byMethod = ["Chuyển khoản", "VNPay", "Tiền mặt", "Thẻ"].map((m) => ({ name: m, value: PAYMENTS.filter((p) => p.method === m).reduce((s, p) => s + p.amount, 0) / 1e6 }));
  const cols: Column<(typeof PAYMENTS)[number]>[] = [
    { key: "c", header: "Mã", value: (p) => p.code }, { key: "cu", header: "Hội viên", sortable: true, value: (p) => p.customer },
    { key: "a", header: "Số tiền", sortable: true, value: (p) => p.amount, cell: (p) => formatCurrency(p.amount) }, { key: "m", header: "Phương thức", value: (p) => p.method },
    { key: "s", header: "Trạng thái", cell: (p) => <StatusBadge status={p.status} /> },
  ];
  return (
    <OPage area="manager" title="Thống kê thanh toán">
      <Grid cols={4}>
        <StatCard label="Thành công" value={String(PAYMENTS.filter((p) => p.status === "paid").length)} /><StatCard label="Đang chờ" value={String(PAYMENTS.filter((p) => p.status === "pending").length)} />
        <StatCard label="Thất bại" value={String(PAYMENTS.filter((p) => p.status === "failed").length)} /><StatCard label="Tỷ lệ thành công" value="75%" />
      </Grid>
      <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
        <Panel title="Theo phương thức (triệu VNĐ)"><SimpleDonutChart data={byMethod} centerLabel="Tổng" centerValue={mil(Math.round(byMethod.reduce((s, x) => s + x.value, 0)))} /></Panel>
        <DataTable data={PAYMENTS} columns={cols} pageSize={6} searchPlaceholder="Tìm giao dịch..." />
      </div>
    </OPage>
  );
}
export function ManagerRevenue() {
  const total = REVENUE_MONTHLY.reduce((s, m) => s + m.membership + m.pt, 0);
  return (
    <OPage area="manager" title="Tổng doanh thu" description="6 tháng gần nhất, đơn vị triệu VNĐ.">
      <Grid cols={3}><StatCard label="Tổng 6 tháng" value={formatCurrency(total * 1e6)} /><StatCard label="Tháng 9" value="399.000.000 VNĐ" trend={{ value: "+11%", direction: "up" }} /><StatCard label="Tỷ trọng PT" value="40%" /></Grid>
      <Panel title="Doanh thu theo tháng"><SimpleBarChart data={REVENUE_MONTHLY} xKey="month" series={[{ key: "membership", name: "Gói hội viên" }, { key: "pt", name: "Gói PT", color: "var(--cyan)" }]} /></Panel>
      <Panel title="Xu hướng"><SimpleLineChart data={REVENUE_MONTHLY.map((m) => ({ month: m.month, total: m.membership + m.pt }))} xKey="month" series={[{ key: "total", name: "Tổng doanh thu" }]} /></Panel>
    </OPage>
  );
}
export function ManagerCheckins() {
  return (
    <OPage area="manager" title="Lượt check-in">
      <Grid cols={3}><StatCard label="Hôm nay" value="318" /><StatCard label="Trung bình/ngày" value={formatNumber(419)} /><StatCard label="Giờ cao điểm" value="18:00–19:00" /></Grid>
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Theo ngày"><SimpleLineChart data={CHECKINS_DAILY} xKey="day" series={[{ key: "count", name: "Lượt" }]} /></Panel>
        <Panel title="Theo khung giờ (hôm qua)"><SimpleBarChart data={CHECKINS_HOURLY} xKey="hour" series={[{ key: "count", name: "Lượt", color: "var(--cyan)" }]} /></Panel>
      </div>
    </OPage>
  );
}
export function ManagerTrainerRanking() {
  const data = OPS_TRAINERS.filter((t) => t.status === "active").map((t) => ({ name: t.name.split(" ").pop()!, sessions: t.sessionsMonth }));
  return (
    <OPage area="manager" title="Xếp hạng huấn luyện viên" description="Theo doanh thu tháng 9/2026.">
      <div className="grid gap-6 lg:grid-cols-2"><Panel title="Bảng xếp hạng"><Leaderboard /></Panel><Panel title="Số buổi dạy"><SimpleBarChart data={data} xKey="name" series={[{ key: "sessions", name: "Buổi" }]} /></Panel></div>
    </OPage>
  );
}

export function ManagerRefunds() {
  const cols: Column<Refund>[] = [
    { key: "c", header: "Hội viên", sortable: true, value: (r) => r.customer, cell: (r) => <TextLink to="/manager/refunds/$id" params={{ id: r.id }}>{r.customer}</TextLink> },
    { key: "i", header: "Gói", value: (r) => r.item }, { key: "p", header: "Đã trả", sortable: true, value: (r) => r.paid, cell: (r) => formatCurrency(r.paid) },
    { key: "a", header: "Đề nghị hoàn", sortable: true, value: (r) => r.amount, cell: (r) => formatCurrency(r.amount) },
    { key: "d", header: "Ngày gửi", sortable: true, value: (r) => r.created, cell: (r) => formatDate(r.created) },
    { key: "s", header: "Trạng thái", cell: (r) => <StatusBadge status={r.status} /> },
  ];
  return <OPage area="manager" title="Danh sách yêu cầu hoàn tiền"><DataTable data={REFUNDS} columns={cols} searchPlaceholder="Tìm hội viên..." filters={[{ key: "s", label: "Trạng thái", options: [{ label: "Chờ xử lý", value: "pending" }, { label: "Đã duyệt", value: "approved" }, { label: "Bị từ chối", value: "rejected" }], match: (r, v) => r.status === v }]} /></OPage>;
}
export function ManagerRefundDetail() {
  const r = findRefund(useId());
  const [status, setStatus] = useState<string>(r.status);
  return (
    <OPage area="manager" title="Chi tiết và xét duyệt hoàn tiền" parent={M("Hoàn tiền", "/manager/refunds")} actions={<StatusBadge status={status} />}>
      <div className="grid gap-6 lg:grid-cols-3">
        <Panel title={r.customer} className="lg:col-span-2">
          <InfoList items={[{ label: "Gói", value: r.item }, { label: "Số tiền đã trả", value: formatCurrency(r.paid) }, { label: "Đã sử dụng", value: `${r.usedSessions} buổi` }, { label: "Đề nghị hoàn", value: formatCurrency(r.amount) }, { label: "Ngày gửi", value: formatDate(r.created) }, { label: "Phí xử lý (5%)", value: formatCurrency(r.amount * 0.05) }]} />
          <p className="mt-4 text-sm"><span className="text-muted-foreground">Lý do: </span>{r.reason}</p>
          <div className="mt-6">{status === "pending" ? <ApprovalActions approveLabel="Duyệt hoàn tiền" subject={`hoàn ${formatCurrency(r.amount)} cho ${r.customer}`} onDone={setStatus} /> : null}</div>
        </Panel>
        <Panel title="Tiến trình xử lý"><Timeline items={[
          { title: "Hội viên gửi yêu cầu", time: formatDate(r.created), tone: "info" },
          { title: "Lễ tân xác minh giao dịch", time: formatDate(r.created), tone: "success", description: "Phan Thị Hồng" },
          status === "pending" ? { title: "Chờ quản lý duyệt", time: "—", tone: "warning" } : status === "approved" ? { title: "Quản lý đã duyệt", time: "Hôm nay", tone: "success" } : { title: "Quản lý từ chối", time: "Hôm nay", tone: "danger" },
          ...(status === "approved" ? [{ title: "Chuyển khoản hoàn tiền", time: "Dự kiến 3–5 ngày làm việc", tone: "neutral" as const }] : []),
        ]} /></Panel>
      </div>
    </OPage>
  );
}

export function ManagerExercises() {
  const cols: Column<Exercise>[] = [
    { key: "n", header: "Bài tập", sortable: true, value: (e) => e.name, cell: (e) => <TextLink to="/manager/exercises/$id" params={{ id: e.id }}>{e.name}</TextLink> },
    { key: "m", header: "Nhóm cơ", value: (e) => e.muscle }, { key: "eq", header: "Dụng cụ", value: (e) => e.equipment }, { key: "l", header: "Mức độ", sortable: true, value: (e) => e.level },
    { key: "c", header: "Nguồn", cell: (e) => <StatusBadge tone={e.custom ? "info" : "neutral"} label={e.custom ? "HLV tạo" : "Thư viện"} /> },
  ];
  return <OPage area="manager" title="Danh sách bài tập" actions={<FormDrawer trigger={<Button><Plus className="size-4" /> Thêm bài tập</Button>} title="Thêm bài tập vào thư viện" fields={[{ name: "n", label: "Tên bài tập" }, { name: "m", label: "Nhóm cơ" }, { name: "e", label: "Dụng cụ" }, { name: "s", label: "Các bước", type: "textarea" }]} />}><DataTable data={EXERCISES} columns={cols} searchPlaceholder="Tìm bài tập..." /></OPage>;
}
export function ManagerExerciseDetail() {
  const e = findExercise(useId());
  return (
    <OPage area="manager" title={e.name} parent={M("Bài tập", "/manager/exercises")}>
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Thông tin"><InfoList items={[{ label: "Nhóm cơ", value: e.muscle }, { label: "Dụng cụ", value: e.equipment }, { label: "Mức độ", value: e.level }, { label: "Nguồn", value: e.custom ? "HLV Trần Minh Khang tạo" : "Thư viện phòng gym" }]} />{e.custom ? <div className="mt-4"><ApprovalActions approveLabel="Đưa vào thư viện chung" rejectLabel="Giữ riêng" subject={e.name} /></div> : null}</Panel>
        <Panel title="Các bước"><ol className="list-decimal space-y-2 pl-5 text-sm">{e.steps.map((s) => <li key={s}>{s}</li>)}</ol><p className="mt-4 text-sm text-muted-foreground">Lưu ý: {e.tips}</p></Panel>
      </div>
    </OPage>
  );
}
export function ManagerNotifications() { return <OPage area="manager" title="Thông báo"><NotificationList items={MANAGER_NOTIFS} /></OPage>; }
void UserCheck;
