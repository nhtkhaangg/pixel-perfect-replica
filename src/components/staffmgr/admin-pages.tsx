import { useState, type ReactNode } from "react";
import { Activity, Building2, Database, HardDrive, Lock, Package, Pencil, Plus, Trash2, RotateCcw, Server, ShieldCheck, Unlock, UserCog, Users } from "lucide-react";
import { toast } from "sonner";

import { ActivityList, Avatar, ButtonLink, Field, Grid, InfoList, NotificationList, OPage, Panel, TextLink, Timeline } from "@/components/ops/kit";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { DataTable, type Column } from "@/components/shared/DataTable";
import { StatCard } from "@/components/shared/StatCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency, formatDate } from "@/lib/format";
import { GYM_INFO } from "@/lib/mock/public";
import { OPS_PACKAGES, PAYMENTS, REFUNDS, STAFF, findPkg, findRefund, findStaff, type OpsPackage, type Payment, type Refund, type Staff } from "@/lib/mock/ops";
import { useId } from "@/components/trainer/pages-a";
import { PackageDetail, PackageTable, kindLabel } from "./shared";

const A = "admin" as const;

/** Popup CRUD dùng chung cho khu quản trị. */
function CrudModal({ trigger, title, description, children }: { trigger: ReactNode; title: string; description?: string; children: (close: () => void) => ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description ? <DialogDescription>{description}</DialogDescription> : null}
        </DialogHeader>
        {children(() => setOpen(false))}
      </DialogContent>
    </Dialog>
  );
}
type FormMode = { onDone?: (() => void) | undefined };
function Sec({ modal, title, className, children }: { modal: boolean; title: string; className?: string; children: ReactNode }) {
  if (!modal) return <Panel title={title} {...(className ? { className } : {})}>{children}</Panel>;
  return <section className="space-y-3"><h3 className="text-sm font-semibold text-muted-foreground">{title}</h3>{children}</section>;
}
function FormButtons({ onDone, back, label }: { onDone?: (() => void) | undefined; back: string; label: string }) {
  return (
    <div className="mt-6 flex justify-end gap-2">
      {onDone ? <Button type="button" variant="outline" onClick={onDone}>Huỷ</Button> : <ButtonLink variant="outline" to={back}>Huỷ</ButtonLink>}
      <Button type="submit">{label}</Button>
    </div>
  );
}
const formCls = (onDone?: () => void) => (onDone ? "space-y-6" : "grid gap-6 lg:grid-cols-3");
function DeleteButton({ what, onDone }: { what: string; onDone?: () => void }) {
  return <ConfirmDialog destructive trigger={<Button variant="outline"><Trash2 className="size-4" /> Xoá</Button>} title={`Xoá ${what}?`} description={`“${what}” sẽ bị xoá khỏi hệ thống. Thao tác không thể hoàn tác.`} confirmLabel="Xoá" onConfirm={() => { onDone?.(); toast.success(`Đã xoá ${what}.`); }} />;
}

type AccStatus = "UNVERIFIED" | "ACTIVE" | "LOCKED";
const ACC: Record<AccStatus, { label: string; tone: "warning" | "success" | "danger" }> = {
  UNVERIFIED: { label: "Chưa xác minh", tone: "warning" }, ACTIVE: { label: "Đang hoạt động", tone: "success" }, LOCKED: { label: "Đã khoá", tone: "danger" },
};
const ROLE_VI: Record<string, string> = { CUSTOMER: "Hội viên", TRAINER: "Huấn luyện viên", STAFF: "Nhân viên", MANAGER: "Quản lý", ADMIN: "Quản trị viên" };
type User = { id: string; name: string; email: string; phone: string; role: keyof typeof ROLE_VI; status: AccStatus; created: string; lastLogin: string };
const USERS: User[] = [
  ["Nguyễn Minh Hoàng", "CUSTOMER", "ACTIVE"], ["Nguyễn Thu Hà", "CUSTOMER", "ACTIVE"], ["Bùi Đức Trí", "CUSTOMER", "LOCKED"], ["Ngô Khánh Vy", "CUSTOMER", "UNVERIFIED"],
  ["Trần Minh Khang", "TRAINER", "ACTIVE"], ["Đinh Quang Hiếu", "TRAINER", "UNVERIFIED"], ["Lâm Quốc Việt", "STAFF", "ACTIVE"], ["Hồ Minh Tuấn", "STAFF", "LOCKED"],
  ["Phạm Quốc Bảo", "MANAGER", "ACTIVE"], ["Vũ Thị Ngân", "MANAGER", "ACTIVE"], ["Đặng Trần Minh", "ADMIN", "ACTIVE"], ["Lý Thanh Tâm", "CUSTOMER", "ACTIVE"],
].map(([name, role, status], i) => ({
  id: `u${i + 1}`, name: name!, role: role as User["role"], status: status as AccStatus,
  email: `${name!.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/gi, "d").toLowerCase().split(" ").reverse().join(".")}@gymcore.vn`,
  phone: `09${String(12345678 + i * 1111111).slice(0, 8)}`, created: `2026-0${(i % 8) + 1}-1${i % 9}`, lastLogin: status === "UNVERIFIED" ? "Chưa đăng nhập" : `${24 - (i % 5)}/09/2026 ${8 + i}:15`,
}));

type Mgr = { id: string; name: string; email: string; phone: string; scope: string; created: string; status: AccStatus };
const MANAGERS: Mgr[] = [
  { id: "mg1", name: "Phạm Quốc Bảo", email: "bao.pham@gymcore.vn", phone: "0907 111 222", scope: "Vận hành chung, tài chính", created: "2023-01-05", status: "ACTIVE" },
  { id: "mg2", name: "Vũ Thị Ngân", email: "ngan.vu@gymcore.vn", phone: "0907 333 444", scope: "Nhân sự, huấn luyện viên", created: "2024-04-20", status: "ACTIVE" },
  { id: "mg3", name: "Châu Gia Khánh", email: "khanh.chau@gymcore.vn", phone: "0907 555 666", scope: "Cơ sở vật chất", created: "2026-09-20", status: "UNVERIFIED" },
];
const findMgr = (id?: string) => MANAGERS.find((m) => m.id === id) ?? MANAGERS[0]!;

const NOTIFS = [
  { id: "a1", title: "Hoàn tiền đã duyệt chờ chi trả", body: "Quản lý đã duyệt hoàn 5.400.000 VNĐ cho Trương Mỹ Linh.", time: "24/09/2026 16:00", read: false, type: "Hoàn tiền" },
  { id: "a2", title: "Sao lưu dữ liệu thành công", body: "Bản sao lưu 02:00 hoàn tất (1,8 GB).", time: "25/09/2026 02:05", read: false, type: "Hệ thống" },
  { id: "a3", title: "Tài khoản bị khoá tự động", body: "Hồ Minh Tuấn nhập sai mật khẩu 5 lần.", time: "23/09/2026 22:40", read: true, type: "Bảo mật" },
  { id: "a4", title: "Quản lý mới chưa xác minh email", body: "Châu Gia Khánh chưa kích hoạt tài khoản.", time: "20/09/2026 10:00", read: true, type: "Tài khoản" },
];

export function AdminDashboard() {
  const c = (s: AccStatus) => USERS.filter((u) => u.status === s).length;
  const sys = [
    { icon: Server, name: "Máy chủ ứng dụng", value: "Hoạt động ổn định · 99,98%", tone: "success" as const },
    { icon: Database, name: "Cơ sở dữ liệu", value: "Độ trễ 12 ms", tone: "success" as const },
    { icon: HardDrive, name: "Dung lượng lưu trữ", value: "68% đã dùng", tone: "warning" as const },
    { icon: ShieldCheck, name: "Sao lưu gần nhất", value: "25/09/2026 02:00", tone: "success" as const },
  ];
  return (
    <OPage area={A} title="Tổng quan quản trị" description="Tình trạng tài khoản, gói dịch vụ và hệ thống của GymCore.">
      <Grid cols={3}>
        <StatCard label="Tổng số tài khoản" value="1.312" hint={`Mẫu hiển thị: ${USERS.length}`} icon={Users} />
        <StatCard label="Tài khoản đang hoạt động" value="1.268" hint={`${c("UNVERIFIED")} chưa xác minh trong mẫu`} icon={Activity} />
        <StatCard label="Tài khoản bị khoá" value={String(c("LOCKED") + 12)} icon={Lock} />
        <StatCard label="Số quản lý" value={String(MANAGERS.length)} icon={UserCog} />
        <StatCard label="Nhân viên đang làm việc" value={String(STAFF.filter((s) => s.status === "active").length)} hint={`${STAFF.filter((s) => s.status === "inactive").length} đã nghỉ trong mẫu`} icon={UserCog} />
        <StatCard label="Tổng gói dịch vụ" value={String(OPS_PACKAGES.length)} hint={`${OPS_PACKAGES.filter((p) => p.status === "active").length} đang bán`} icon={Package} />
        <StatCard label="Hoàn tiền đang chờ" value={String(REFUNDS.filter((r) => r.status !== "rejected").length - 1)} hint="Đã được quản lý duyệt, chờ chi trả" icon={RotateCcw} />
      </Grid>
      <div className="grid gap-6 lg:grid-cols-3">
        <Panel title="Tình trạng hệ thống" className="lg:col-span-2">
          <div className="grid gap-3 sm:grid-cols-2">{sys.map((s) => <div key={s.name} className="flex items-center gap-3 rounded-md border border-border bg-background/40 p-3"><s.icon className="size-5 text-muted-foreground" /><div className="flex-1"><p className="text-sm font-medium">{s.name}</p><p className="text-xs text-muted-foreground">{s.value}</p></div><StatusBadge tone={s.tone} label={s.tone === "success" ? "Tốt" : "Theo dõi"} /></div>)}</div>
        </Panel>
        <Panel title="Thao tác nhanh">
          <div className="grid gap-2">
            <CrudModal trigger={<Button variant="outline"><Plus className="size-4" /> Tạo tài khoản quản lý</Button>} title="Tạo tài khoản quản lý">{(c) => <MgrForm onDone={c} />}</CrudModal>
            <ButtonLink variant="outline" to="/admin/staff"><UserCog className="size-4" /> Quản lý nhân viên</ButtonLink>
            <CrudModal trigger={<Button variant="outline"><Plus className="size-4" /> Tạo gói hội viên</Button>} title="Tạo gói hội viên">{(c) => <PackageForm kind="MEMBERSHIP" onDone={c} />}</CrudModal>
            <CrudModal trigger={<Button variant="outline"><Plus className="size-4" /> Tạo gói PT</Button>} title="Tạo gói PT">{(c) => <PackageForm kind="PT" onDone={c} />}</CrudModal>
            <ButtonLink variant="outline" to="/admin/refunds"><RotateCcw className="size-4" /> Xử lý hoàn tiền</ButtonLink>
            <CrudModal trigger={<Button variant="outline"><Building2 className="size-4" /> Cập nhật thông tin phòng gym</Button>} title="Cập nhật thông tin phòng gym">{(c) => <GymForm edit onDone={c} />}</CrudModal>
          </div>
        </Panel>
      </div>
      <Panel title="Hoạt động quản trị gần đây"><ActivityList items={[
        { text: "Đặng Trần Minh khoá tài khoản Hồ Minh Tuấn", time: "23/09 22:45" },
        { text: "Tạo tài khoản quản lý Châu Gia Khánh", time: "20/09 10:00" },
        { text: "Ngừng bán gói “Hội viên sinh viên 6 tháng”", time: "15/09" },
        { text: "Chi trả hoàn tiền 5.400.000 VNĐ cho Trương Mỹ Linh", time: "13/09" },
        { text: "Cập nhật giờ mở cửa ngày lễ 2/9", time: "28/08" },
      ]} /></Panel>
    </OPage>
  );
}

export function AdminGymInfo() {
  return (
    <OPage area={A} title="Thông tin phòng gym" description="Thông tin hiển thị trên trang công khai." actions={<CrudModal trigger={<Button><Pencil className="size-4" /> Cập nhật</Button>} title="Cập nhật thông tin phòng gym">{(c) => <GymForm edit onDone={c} />}</CrudModal>}>
      <div className="grid gap-6 lg:grid-cols-3">
        <Panel title="Thông tin chung" className="lg:col-span-2"><InfoList items={[{ label: "Tên phòng gym", value: GYM_INFO.name }, { label: "Địa chỉ", value: GYM_INFO.address }, { label: "Điện thoại", value: GYM_INFO.phone }, { label: "Hotline", value: GYM_INFO.hotline }, { label: "Email", value: GYM_INFO.email }, { label: "Diện tích", value: GYM_INFO.area }]} /></Panel>
        <Panel title="Giờ mở cửa"><ul className="space-y-2 text-sm">{GYM_INFO.hours.map((h) => <li key={h.day} className="flex justify-between"><span>{h.day}</span><span className="font-medium">{h.time}</span></li>)}</ul></Panel>
      </div>
      <Panel title="Nội quy"><ol className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground">{GYM_INFO.rules.map((r) => <li key={r}>{r}</li>)}</ol></Panel>
      <p className="text-xs text-muted-foreground">Cần thêm mục thông tin mới (VD: bãi giữ xe, tiện ích)? <CrudModal trigger={<button className="font-medium text-primary hover:underline">Thêm thông tin</button>} title="Thêm thông tin phòng gym">{(c) => <GymForm onDone={c} />}</CrudModal></p>
    </OPage>
  );
}

function GymForm({ edit, onDone }: { edit?: boolean } & FormMode) {
  const m = !!onDone;
  return (
    <form className={formCls(onDone)} onSubmit={(e) => { e.preventDefault(); toast.success(edit ? "Đã cập nhật thông tin phòng gym." : "Đã thêm mục thông tin."); onDone?.(); }}>
      <Sec modal={m} title={edit ? "Thông tin chung" : "Mục thông tin mới"} className="lg:col-span-2">
        {edit ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Tên phòng gym"><Input defaultValue={GYM_INFO.name} required /></Field><Field label="Email"><Input defaultValue={GYM_INFO.email} /></Field>
            <Field label="Điện thoại"><Input defaultValue={GYM_INFO.phone} /></Field><Field label="Hotline"><Input defaultValue={GYM_INFO.hotline} /></Field>
            <div className="sm:col-span-2"><Field label="Địa chỉ"><Input defaultValue={GYM_INFO.address} /></Field></div>
            {GYM_INFO.hours.map((h) => <Field key={h.day} label={`Giờ mở cửa: ${h.day}`}><Input defaultValue={h.time} /></Field>)}
            <div className="sm:col-span-2"><Field label="Nội quy (mỗi dòng một điều)"><Textarea rows={4} defaultValue={GYM_INFO.rules.join("\n")} /></Field></div>
          </div>
        ) : (
          <div className="space-y-4"><Field label="Tiêu đề"><Input required placeholder="VD: Bãi giữ xe" /></Field><Field label="Nội dung"><Textarea rows={5} placeholder="VD: Miễn phí giữ xe máy cho hội viên, tầng hầm B1." /></Field></div>
        )}
      </Sec>
      <Sec modal={m} title="Lưu thay đổi"><p className="text-sm text-muted-foreground">Thay đổi hiển thị ngay trên trang “Thông tin phòng gym”.</p><FormButtons onDone={onDone} back="/admin/gym-information" label="Lưu" /></Sec>
    </form>
  );
}
export function AdminGymInfoCreate() { return <OPage area={A} title="Thêm thông tin phòng gym" parent={{ label: "Thông tin phòng gym", to: "/admin/gym-information" }}><GymForm /></OPage>; }
export function AdminGymInfoEdit() { return <OPage area={A} title="Cập nhật thông tin phòng gym" parent={{ label: "Thông tin phòng gym", to: "/admin/gym-information" }}><GymForm edit /></OPage>; }

function PackageForm({ kind, p, onDone }: { kind: OpsPackage["kind"]; p?: OpsPackage } & FormMode) {
  const m = !!onDone;
  const base = kind === "PT" ? "/admin/trainer-packages" : "/admin/membership-packages";
  return (
    <form className={formCls(onDone)} onSubmit={(e) => { e.preventDefault(); const fd = new FormData(e.currentTarget); if (Number(fd.get("price")) <= 0) return void toast.error("Giá bán phải lớn hơn 0."); toast.success(p ? "Đã cập nhật gói." : "Đã tạo gói mới."); onDone?.(); }}>
      <Sec modal={m} title={kindLabel(kind)} className="lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Tên gói"><Input name="name" required defaultValue={p?.name} /></Field>
          <Field label="Giá bán (VNĐ)"><Input name="price" type="number" required defaultValue={p?.price} /></Field>
          <Field label="Thời hạn (tháng)"><Input type="number" required defaultValue={p?.months ?? 1} /></Field>
          {kind === "PT" ? <Field label="Số buổi"><Input type="number" required defaultValue={p?.sessions ?? 12} /></Field> : <Field label="Khung giờ"><Input defaultValue="Cả ngày" /></Field>}
        </div>
        <div className="mt-4 space-y-4">
          <Field label="Quyền lợi (mỗi dòng một ý)"><Textarea rows={4} defaultValue={p?.benefits.join("\n")} /></Field>
          <Field label="Điều khoản"><Textarea rows={3} defaultValue="Không hoàn tiền sau 7 ngày kể từ ngày kích hoạt. Được bảo lưu tối đa 30 ngày." /></Field>
        </div>
      </Sec>
      <Sec modal={m} title="Trạng thái bán">
        <select defaultValue={p?.status ?? "active"} className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm"><option value="active" className="bg-card">Đang bán</option><option value="inactive" className="bg-card">Ngừng bán</option></select>
        <FormButtons onDone={onDone} back={base} label={p ? "Lưu thay đổi" : "Tạo gói"} />
      </Sec>
    </form>
  );
}
const PT = { label: "Gói PT", to: "/admin/trainer-packages" }, MB = { label: "Gói hội viên", to: "/admin/membership-packages" };
export function AdminTrainerPackages() { return <OPage area={A} title="Danh sách gói PT" actions={<CrudModal trigger={<Button><Plus className="size-4" /> Tạo gói PT</Button>} title="Tạo gói PT">{(c) => <PackageForm kind="PT" onDone={c} />}</CrudModal>}><PackageTable data={OPS_PACKAGES.filter((p) => p.kind === "PT")} base="/admin/trainer-packages" /></OPage>; }
export function AdminTrainerPackageCreate() { return <OPage area={A} title="Tạo gói PT" parent={PT}><PackageForm kind="PT" /></OPage>; }
export function AdminTrainerPackageDetail() { const p = findPkg(useId() ?? "t1"); return <><PackageDetail area={A} p={p} parent={PT} /><div className="mx-auto mt-6 max-w-7xl"><div className="flex flex-wrap gap-2"><CrudModal trigger={<Button><Pencil className="size-4" /> Chỉnh sửa gói</Button>} title="Cập nhật gói PT" description={p.name}>{(c) => <PackageForm kind="PT" p={p} onDone={c} />}</CrudModal><DeleteButton what={p.name} /></div></div></>; }
export function AdminTrainerPackageEdit() { const p = findPkg(useId() ?? "t1"); return <OPage area={A} title="Cập nhật gói PT" parent={PT} description={p.name}><PackageForm kind="PT" p={p} /></OPage>; }
export function AdminMembershipPackages() { return <OPage area={A} title="Danh sách gói hội viên" actions={<CrudModal trigger={<Button><Plus className="size-4" /> Tạo gói hội viên</Button>} title="Tạo gói hội viên">{(c) => <PackageForm kind="MEMBERSHIP" onDone={c} />}</CrudModal>}><PackageTable data={OPS_PACKAGES.filter((p) => p.kind === "MEMBERSHIP")} base="/admin/membership-packages" /></OPage>; }
export function AdminMembershipPackageCreate() { return <OPage area={A} title="Tạo gói hội viên" parent={MB}><PackageForm kind="MEMBERSHIP" /></OPage>; }
export function AdminMembershipPackageDetail() { const p = findPkg(useId()); return <><PackageDetail area={A} p={p} parent={MB} /><div className="mx-auto mt-6 max-w-7xl"><div className="flex flex-wrap gap-2"><CrudModal trigger={<Button><Pencil className="size-4" /> Chỉnh sửa gói</Button>} title="Cập nhật gói hội viên" description={p.name}>{(c) => <PackageForm kind="MEMBERSHIP" p={p} onDone={c} />}</CrudModal><DeleteButton what={p.name} /></div></div></>; }
export function AdminMembershipPackageEdit() { const p = findPkg(useId()); return <OPage area={A} title="Cập nhật gói hội viên" parent={MB} description={p.name}><PackageForm kind="MEMBERSHIP" p={p} /></OPage>; }

const refundStage = (r: Refund) => (r.status === "approved" ? { label: "Chờ chi trả", tone: "warning" as const } : r.status === "pending" ? { label: "Chờ quản lý duyệt", tone: "neutral" as const } : { label: "Quản lý từ chối", tone: "danger" as const });
export function AdminRefunds() {
  const cols: Column<Refund>[] = [
    { key: "c", header: "Hội viên", sortable: true, value: (r) => r.customer }, { key: "i", header: "Gói", value: (r) => r.item },
    { key: "a", header: "Số tiền hoàn", sortable: true, value: (r) => r.amount, cell: (r) => formatCurrency(r.amount) },
    { key: "d", header: "Ngày gửi", sortable: true, value: (r) => r.created, cell: (r) => formatDate(r.created) },
    { key: "s", header: "Trạng thái", cell: (r) => <StatusBadge {...refundStage(r)} /> },
    { key: "x", header: "", cell: (r) => (r.status === "approved" ? <TextLink to="/admin/refunds/$id/process" params={{ id: r.id }}>Xử lý chi trả</TextLink> : <TextLink to="/admin/refunds/$id/process" params={{ id: r.id }}>Xem</TextLink>) },
  ];
  return <OPage area={A} title="Danh sách giao dịch hoàn tiền" description="Quản trị viên chi trả các yêu cầu đã được quản lý duyệt."><DataTable data={REFUNDS} columns={cols} searchPlaceholder="Tìm hội viên..." /></OPage>;
}

export function AdminRefundProcess() {
  const r = findRefund(useId() ?? "rf3");
  const tx = PAYMENTS.find((p) => p.customer === r.customer) ?? PAYMENTS[0]!;
  const [done, setDone] = useState(false);
  const [method, setMethod] = useState("Chuyển khoản ngân hàng");
  const canPay = r.status === "approved" && !done;
  return (
    <OPage area={A} title="Xử lý thanh toán hoàn tiền" parent={{ label: "Hoàn tiền", to: "/admin/refunds" }} actions={<StatusBadge {...(done ? { label: "Đã chi trả", tone: "success" as const } : refundStage(r))} />}>
      <Grid cols={2}>
        <Panel title="1. Yêu cầu của hội viên"><InfoList items={[{ label: "Hội viên", value: r.customer }, { label: "Gói", value: r.item }, { label: "Ngày gửi", value: formatDate(r.created) }, { label: "Buổi đã dùng", value: r.usedSessions }]} /><p className="mt-3 text-sm"><span className="text-muted-foreground">Lý do: </span>{r.reason}</p></Panel>
        <Panel title="2. Giao dịch gốc"><InfoList items={[{ label: "Mã giao dịch", value: tx.code }, { label: "Số tiền đã trả", value: formatCurrency(r.paid) }, { label: "Phương thức", value: tx.method }, { label: "Thời gian", value: tx.time }]} /></Panel>
        <Panel title="3. Quyết định của quản lý"><Timeline items={[{ title: r.status === "approved" ? "Phạm Quốc Bảo đã duyệt" : r.status === "rejected" ? "Phạm Quốc Bảo đã từ chối" : "Đang chờ quản lý duyệt", time: formatDate(r.created), tone: r.status === "approved" ? "success" : r.status === "rejected" ? "danger" : "warning", description: r.status === "approved" ? "Xác minh thanh toán trùng, đồng ý hoàn 100%." : undefined }]} /></Panel>
        <Panel title="4. Số tiền và phương thức hoàn">
          <p className="font-display text-4xl text-primary">{formatCurrency(r.amount)}</p>
          <div className="mt-4 space-y-4">
            <Field label="Phương thức hoàn tiền"><select value={method} onChange={(e) => setMethod(e.target.value)} disabled={!canPay} className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm">{["Chuyển khoản ngân hàng", "Hoàn về VNPay", "Tiền mặt tại quầy"].map((m) => <option key={m} className="bg-card">{m}</option>)}</select></Field>
            {method === "Chuyển khoản ngân hàng" ? <Field label="Số tài khoản nhận"><Input disabled={!canPay} defaultValue="Vietcombank · 0071 0003 12345" /></Field> : null}
          </div>
        </Panel>
      </Grid>
      <Panel title="5. Xác nhận xử lý">
        {done ? <p className="text-sm text-success">Đã ghi nhận chi trả {formatCurrency(r.amount)} qua {method.toLowerCase()}. Hội viên đã được thông báo.</p> : canPay ? (
          <ConfirmDialog trigger={<Button>Xác nhận đã chi trả</Button>} title="Xác nhận chi trả hoàn tiền?" description={`Chi trả ${formatCurrency(r.amount)} cho ${r.customer} qua ${method.toLowerCase()}. Thao tác không thể hoàn tác.`} confirmLabel="Xác nhận chi trả" onConfirm={() => { setDone(true); toast.success("Đã xác nhận chi trả hoàn tiền."); }} />
        ) : <p className="text-sm text-muted-foreground">Chỉ xử lý chi trả khi quản lý đã duyệt yêu cầu.</p>}
      </Panel>
    </OPage>
  );
}

const AccBadge = ({ s }: { s: AccStatus }) => <StatusBadge tone={ACC[s].tone} label={ACC[s].label} />;
export function AdminManagers() {
  const cols: Column<Mgr>[] = [
    { key: "n", header: "Quản lý", sortable: true, value: (m) => m.name, cell: (m) => <span className="flex items-center gap-2"><Avatar name={m.name} className="size-8 text-xs" /><TextLink to="/admin/managers/$id" params={{ id: m.id }}>{m.name}</TextLink></span> },
    { key: "e", header: "Email", value: (m) => m.email }, { key: "s", header: "Phạm vi phụ trách", value: (m) => m.scope },
    { key: "c", header: "Ngày tạo", sortable: true, value: (m) => m.created, cell: (m) => formatDate(m.created) }, { key: "st", header: "Trạng thái", cell: (m) => <AccBadge s={m.status} /> },
    { key: "a", header: "", cell: (m) => <CrudModal trigger={<Button size="sm" variant="outline"><Pencil className="size-3.5" /> Sửa</Button>} title="Cập nhật quản lý" description={m.name}>{(c) => <MgrForm m={m} onDone={c} />}</CrudModal> },
  ];
  return <OPage area={A} title="Danh sách quản lý" actions={<CrudModal trigger={<Button><Plus className="size-4" /> Tạo tài khoản quản lý</Button>} title="Tạo tài khoản quản lý">{(c) => <MgrForm onDone={c} />}</CrudModal>}><DataTable data={MANAGERS} columns={cols} searchPlaceholder="Tìm quản lý..." /></OPage>;
}
function MgrForm({ m, onDone }: { m?: Mgr } & FormMode) {
  const md = !!onDone;
  return (
    <form className={formCls(onDone)} onSubmit={(e) => { e.preventDefault(); toast.success(m ? "Đã cập nhật quản lý." : "Đã tạo tài khoản và gửi email xác minh."); onDone?.(); }}>
      <Sec modal={md} title="Thông tin tài khoản" className="lg:col-span-2"><div className="grid gap-4 sm:grid-cols-2">
        <Field label="Họ và tên"><Input required defaultValue={m?.name} /></Field><Field label="Email"><Input type="email" required defaultValue={m?.email} /></Field>
        <Field label="Số điện thoại"><Input defaultValue={m?.phone} /></Field><Field label="Phạm vi phụ trách"><Input defaultValue={m?.scope} placeholder="VD: Nhân sự" /></Field>
      </div>{!m ? <p className="mt-4 text-xs text-muted-foreground">Mật khẩu tạm được gửi qua email. Tài khoản ở trạng thái “Chưa xác minh” cho tới khi quản lý kích hoạt.</p> : null}</Sec>
      <FormButtons onDone={onDone} back="/admin/managers" label={m ? "Lưu thay đổi" : "Tạo tài khoản"} />
    </form>
  );
}
export function AdminManagerCreate() { return <OPage area={A} title="Tạo tài khoản quản lý" parent={{ label: "Quản lý", to: "/admin/managers" }}><MgrForm /></OPage>; }
export function AdminManagerEdit() { const m = findMgr(useId()); return <OPage area={A} title="Cập nhật quản lý" parent={{ label: "Quản lý", to: "/admin/managers" }} description={m.name}><MgrForm m={m} /></OPage>; }
export function AdminManagerDetail() {
  const m = findMgr(useId());
  return (
    <OPage area={A} title={m.name} parent={{ label: "Quản lý", to: "/admin/managers" }} actions={<div className="flex flex-wrap gap-2"><CrudModal trigger={<Button><Pencil className="size-4" /> Chỉnh sửa</Button>} title="Cập nhật quản lý" description={m.name}>{(c) => <MgrForm m={m} onDone={c} />}</CrudModal><DeleteButton what={`tài khoản ${m.name}`} /></div>}>
      <div className="grid gap-6 lg:grid-cols-3">
        <Panel title="Thông tin" className="lg:col-span-2"><InfoList items={[{ label: "Email", value: m.email }, { label: "Điện thoại", value: m.phone }, { label: "Phạm vi", value: m.scope }, { label: "Ngày tạo", value: formatDate(m.created) }, { label: "Trạng thái", value: <AccBadge s={m.status} /> }]} /></Panel>
        <Panel title="Hoạt động gần đây"><ActivityList items={[{ text: "Duyệt hoàn tiền Trương Mỹ Linh", time: "12/09" }, { text: "Thêm nhân viên Cao Thị Mai", time: "10/09" }, { text: "Đăng nhập", time: "25/09 07:30" }]} /></Panel>
      </div>
    </OPage>
  );
}

const STAFF_ROLES = ["Lễ tân", "Kỹ thuật", "Tạp vụ", "Kinh doanh"];
const STAFF_STATUS: Record<Staff["status"], { label: string; tone: "success" | "neutral" }> = {
  active: { label: "Đang làm việc", tone: "success" },
  inactive: { label: "Đã nghỉ", tone: "neutral" },
};
const SP = { label: "Nhân viên", to: "/admin/staff" };
const staffFields = (s?: Staff) => [
  { name: "name", label: "Họ và tên", defaultValue: s?.name },
  { name: "role", label: "Vị trí", defaultValue: s?.role },
  { name: "email", label: "Email", defaultValue: s?.email },
  { name: "phone", label: "Số điện thoại", defaultValue: s?.phone },
  { name: "shift", label: "Ca làm việc", defaultValue: s?.shift },
  { name: "salary", label: "Lương cơ bản (VNĐ)", type: "number" as const, defaultValue: s ? String(s.salary) : undefined },
];
const staffAccess = (s?: Staff) =>
  s?.role === "Kỹ thuật" ? "Cơ sở vật chất, lịch bảo trì" : s?.role === "Kinh doanh" ? "Gói dịch vụ, khách hàng tiềm năng" : s?.role === "Tạp vụ" ? "Khu tập, danh mục thiết bị" : "Thanh toán, check-in, hồ sơ hội viên";

function StaffForm({ s, onDone }: { s?: Staff } & FormMode) {
  const m = !!onDone;
  return (
    <form className={formCls(onDone)} onSubmit={(e) => { e.preventDefault(); toast.success(s ? "Đã cập nhật nhân viên." : "Đã tạo nhân viên và gửi email kích hoạt."); onDone?.(); }}>
      <Sec modal={m} title="Thông tin nhân viên" className="lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2">{staffFields(s).map((f) => <Field key={f.name} label={f.label}><Input required name={f.name} type={f.type ?? "text"} defaultValue={f.defaultValue} /></Field>)}</div>
        <div className="mt-4"><Field label="Ghi chú"><Textarea rows={3} placeholder="VD: Tiếp nhận ca lễ tân cuối tuần." /></Field></div>
      </Sec>
      <Sec modal={m} title="Hợp đồng & quyền truy cập">
        <div className={m ? "grid gap-4 sm:grid-cols-2" : "space-y-4"}>
          <Field label="Ngày bắt đầu"><Input type="date" defaultValue={s?.joined ?? "2026-10-01"} /></Field>
          <Field label="Loại hợp đồng"><select className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm"><option className="bg-card">Toàn thời gian</option><option className="bg-card">Bán thời gian</option></select></Field>
          <Field label="Khu vực làm việc"><Input defaultValue={staffAccess(s)} /></Field>
          <Field label="Trạng thái tài khoản"><select defaultValue={s?.status ?? "active"} className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm"><option value="active" className="bg-card">Đang làm việc</option><option value="inactive" className="bg-card">Đã nghỉ</option></select></Field>
        </div>
        {!s ? <p className="mt-4 text-xs text-muted-foreground">Mật khẩu tạm được gửi qua email. Nhân viên cần đổi mật khẩu ở lần đăng nhập đầu tiên.</p> : null}
        <FormButtons onDone={onDone} back="/admin/staff" label={s ? "Lưu thay đổi" : "Tạo nhân viên"} />
      </Sec>
    </form>
  );
}

export function AdminStaff() {
  const [rows, setRows] = useState(STAFF);
  const [target, setTarget] = useState<Staff | null>(null);
  const toggle = (s: Staff) => {
    setRows((r) => r.map((x) => (x.id === s.id ? { ...x, status: s.status === "active" ? ("inactive" as const) : ("active" as const) } : x)));
    toast.success(s.status === "active" ? `Đã vô hiệu hoá tài khoản ${s.name}.` : `Đã kích hoạt lại tài khoản ${s.name}.`);
  };
  const cols: Column<Staff>[] = [
    { key: "n", header: "Nhân viên", sortable: true, value: (s) => s.name, cell: (s) => <span className="flex items-center gap-2"><Avatar name={s.name} className="size-8 text-xs" /><span className="min-w-0"><TextLink to="/admin/staff/$id" params={{ id: s.id }}>{s.name}</TextLink><span className="block truncate text-xs text-muted-foreground">{s.email}</span></span></span> },
    { key: "r", header: "Vị trí", sortable: true, value: (s) => s.role },
    { key: "p", header: "Điện thoại", value: (s) => s.phone },
    { key: "sh", header: "Ca làm", value: (s) => s.shift },
    { key: "j", header: "Ngày vào làm", sortable: true, value: (s) => s.joined, cell: (s) => formatDate(s.joined) },
    { key: "s", header: "Trạng thái", cell: (s) => <StatusBadge label={STAFF_STATUS[s.status].label} tone={STAFF_STATUS[s.status].tone} /> },
    { key: "a", header: "", cell: (s) => <div className="flex gap-2"><CrudModal trigger={<Button size="sm" variant="outline"><Pencil className="size-3.5" /> Sửa</Button>} title="Cập nhật nhân viên" description={s.name}>{(c) => <StaffForm s={s} onDone={c} />}</CrudModal><Button size="sm" variant="outline" onClick={() => setTarget(s)}>{s.status === "active" ? <><Lock className="size-3.5" /> Vô hiệu hoá</> : <><Unlock className="size-3.5" /> Kích hoạt</>}</Button></div> },
  ];
  return (
    <OPage area={A} title="Danh sách nhân viên" description="Tài khoản làm việc tại quầy, kỹ thuật, tạp vụ và kinh doanh của GymCore."
      actions={<CrudModal trigger={<Button><Plus className="size-4" /> Tạo nhân viên</Button>} title="Tạo nhân viên" description="Mật khẩu tạm được gửi qua email kích hoạt.">{(c) => <StaffForm onDone={c} />}</CrudModal>}>
      <DataTable data={rows} columns={cols} searchPlaceholder="Tìm theo tên, email, số điện thoại..." filters={[
        { key: "r", label: "Vị trí", options: STAFF_ROLES.map((x) => ({ label: x, value: x })), match: (s, v) => s.role === v },
        { key: "s", label: "Trạng thái", options: [{ label: "Đang làm việc", value: "active" }, { label: "Đã nghỉ", value: "inactive" }], match: (s, v) => s.status === v },
      ]} />
      <ConfirmDialog open={!!target} onOpenChange={(o) => !o && setTarget(null)} destructive={target?.status === "active"}
        title={target?.status === "active" ? "Vô hiệu hoá tài khoản nhân viên?" : "Kích hoạt lại tài khoản?"}
        description={target?.status === "active" ? `${target?.name} sẽ không đăng nhập được vào khu nhân viên; lịch làm việc và giao dịch đã ghi nhận vẫn được giữ.` : `${target?.name} sẽ đăng nhập lại được ngay mà không cần tạo tài khoản mới.`}
        confirmLabel={target?.status === "active" ? "Vô hiệu hoá" : "Kích hoạt"} onConfirm={() => { if (target) toggle(target); setTarget(null); }} />
    </OPage>
  );
}

export function AdminStaffCreate() { return <OPage area={A} title="Tạo nhân viên" parent={SP} description="Tài khoản mới ở trạng thái “Chưa xác minh” cho tới khi nhân viên kích hoạt email."><StaffForm /></OPage>; }
export function AdminStaffEdit() { const s = findStaff(useId()); return <OPage area={A} title="Cập nhật nhân viên" parent={SP} description={s.name}><StaffForm s={s} /></OPage>; }

export function AdminStaffDetail() {
  const s = findStaff(useId());
  const handled: Payment[] = PAYMENTS.filter((p) => p.staff === s.name);
  return (
    <OPage area={A} title={s.name} parent={SP} description={`${s.role} · ${s.shift}`}
      actions={<div className="flex flex-wrap gap-2"><CrudModal trigger={<Button variant="outline"><Pencil className="size-4" /> Chỉnh sửa</Button>} title="Cập nhật nhân viên" description={s.name}>{(c) => <StaffForm s={s} onDone={c} />}</CrudModal><ButtonLink to="/admin/users">Tìm trong danh sách người dùng</ButtonLink></div>}>
      <div className="grid gap-6 lg:grid-cols-3">
        <Panel title="Hồ sơ" className="lg:col-span-2"><InfoList items={[
          { label: "Vị trí", value: s.role }, { label: "Email", value: s.email },
          { label: "Điện thoại", value: s.phone }, { label: "Ca làm việc", value: s.shift },
          { label: "Ngày vào làm", value: formatDate(s.joined) }, { label: "Lương cơ bản", value: formatCurrency(s.salary) },
          { label: "Khu vực làm việc", value: staffAccess(s) }, { label: "Trạng thái", value: <StatusBadge label={STAFF_STATUS[s.status].label} tone={STAFF_STATUS[s.status].tone} /> },
        ]} /></Panel>
        <Panel title="Hoạt động hệ thống"><ActivityList items={[
          { text: "Đăng nhập khu nhân viên", time: "25/09 07:12" },
          { text: handled.length ? `Ghi nhận ${handled.length} giao dịch` : "Chưa ghi nhận giao dịch nào", time: "24/09" },
          { text: "Cập nhật mật khẩu", time: "02/09" },
          { text: "Tạo tài khoản bởi Phạm Quốc Bảo", time: formatDate(s.joined) },
        ]} /></Panel>
      </div>
      <Panel title="Giao dịch đã xử lý" action={<TextLink to="/admin/users">Quản lý người dùng</TextLink>}>
        {handled.length ? (
          <ul className="divide-y divide-border">{handled.map((p) => (
            <li key={p.id} className="flex flex-wrap items-center gap-2 py-3 text-sm">
              <span className="font-medium">{p.code}</span>
              <span className="text-muted-foreground">{p.customer} · {p.item}</span>
              <span className="ml-auto font-semibold">{formatCurrency(p.amount)}</span>
              <StatusBadge status={p.status} />
              <span className="w-full text-xs text-muted-foreground sm:w-auto">{p.time}</span>
            </li>
          ))}</ul>
        ) : <p className="text-sm text-muted-foreground">Chưa có giao dịch nào gắn tên nhân viên này trong dữ liệu mẫu.</p>}
      </Panel>
    </OPage>
  );
}

export function AdminUsers() {
  const [rows, setRows] = useState(USERS);
  const [view, setView] = useState<User | null>(null);
  const [target, setTarget] = useState<User | null>(null);
  const toggle = (u: User) => { setRows((r) => r.map((x) => (x.id === u.id ? { ...x, status: u.status === "LOCKED" ? "ACTIVE" : "LOCKED" } : x))); toast.success(u.status === "LOCKED" ? `Đã mở khoá tài khoản ${u.name}.` : `Đã khoá tài khoản ${u.name}.`); };
  const cols: Column<User>[] = [
    { key: "n", header: "Người dùng", sortable: true, value: (u) => u.name, cell: (u) => <span className="flex items-center gap-2"><Avatar name={u.name} className="size-8 text-xs" /><span><span className="block font-medium">{u.name}</span><span className="text-xs text-muted-foreground">{u.email}</span></span></span> },
    { key: "r", header: "Vai trò", sortable: true, value: (u) => ROLE_VI[u.role]! },
    { key: "l", header: "Đăng nhập gần nhất", value: (u) => u.lastLogin },
    { key: "s", header: "Trạng thái", cell: (u) => <AccBadge s={u.status} /> },
    { key: "a", header: "", cell: (u) => <div className="flex gap-1"><Button size="sm" variant="ghost" onClick={() => setView(u)}>Xem</Button>{u.status !== "UNVERIFIED" && u.role !== "ADMIN" ? <Button size="sm" variant="outline" onClick={() => setTarget(u)}>{u.status === "LOCKED" ? <><Unlock className="size-3.5" /> Mở khoá</> : <><Lock className="size-3.5" /> Khoá</>}</Button> : null}</div> },
  ];
  return (
    <OPage area={A} title="Quản lý người dùng">
      <DataTable data={rows} columns={cols} searchPlaceholder="Tìm tên, email..." filters={[
        { key: "r", label: "Vai trò", options: Object.entries(ROLE_VI).map(([v, l]) => ({ label: l, value: v })), match: (u, v) => u.role === v },
        { key: "s", label: "Trạng thái", options: (Object.keys(ACC) as AccStatus[]).map((v) => ({ label: ACC[v].label, value: v })), match: (u, v) => u.status === v },
      ]} />
      <Dialog open={!!view} onOpenChange={(o) => !o && setView(null)}>
        <DialogContent><DialogHeader><DialogTitle>{view?.name}</DialogTitle></DialogHeader>
          {view ? <InfoList items={[{ label: "Email", value: view.email }, { label: "Điện thoại", value: view.phone }, { label: "Vai trò", value: ROLE_VI[view.role] }, { label: "Trạng thái", value: <AccBadge s={view.status} /> }, { label: "Ngày tạo", value: formatDate(view.created) }, { label: "Đăng nhập gần nhất", value: view.lastLogin }]} /> : null}
        </DialogContent>
      </Dialog>
      <ConfirmDialog open={!!target} onOpenChange={(o) => !o && setTarget(null)} destructive={target?.status !== "LOCKED"}
        title={target?.status === "LOCKED" ? "Mở khoá tài khoản?" : "Khoá tài khoản?"}
        description={target?.status === "LOCKED" ? `${target?.name} sẽ đăng nhập lại được ngay.` : `${target?.name} sẽ không thể đăng nhập cho tới khi được mở khoá.`}
        confirmLabel={target?.status === "LOCKED" ? "Mở khoá" : "Khoá tài khoản"} onConfirm={() => { if (target) toggle(target); setTarget(null); }} />
    </OPage>
  );
}

export function AdminNotifications() { return <OPage area={A} title="Thông báo"><NotificationList items={NOTIFS} /></OPage>; }
