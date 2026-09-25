import { useState } from "react";
import { Bold, Heading2, Image, Italic, Link2, List } from "lucide-react";
import { toast } from "sonner";

import { Avatar, ButtonLink, Field, InfoList, OPage, Panel, ReplyPanel, Stars, TextLink, Timeline, type Area } from "@/components/ops/kit";
import { DataTable, type Column } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency, formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import { findPayment, type Article, type GymReview, type OpsPackage, type Payment } from "@/lib/mock/ops";

export const kindLabel = (k: OpsPackage["kind"]) => (k === "PT" ? "Gói huấn luyện cá nhân" : "Gói hội viên");
export const payStatus = (s: Payment["status"]) => s;

export function PackageTable({ data, base }: { data: OpsPackage[]; base: string }) {
  const cols: Column<OpsPackage>[] = [
    { key: "n", header: "Tên gói", sortable: true, value: (p) => p.name, cell: (p) => <TextLink to={`${base}/$id`} params={{ id: p.id }}>{p.name}</TextLink> },
    { key: "k", header: "Loại", cell: (p) => <StatusBadge tone={p.kind === "PT" ? "info" : "neutral"} label={kindLabel(p.kind)} /> },
    { key: "p", header: "Giá", sortable: true, value: (p) => p.price, cell: (p) => formatCurrency(p.price) },
    { key: "m", header: "Thời hạn", sortable: true, value: (p) => p.months, cell: (p) => `${p.months} tháng` },
    { key: "s", header: "Số buổi", cell: (p) => (p.sessions ? `${p.sessions} buổi` : "Không giới hạn") },
    { key: "sold", header: "Đã bán", sortable: true, value: (p) => p.sold },
    { key: "a", header: "Đang hiệu lực", sortable: true, value: (p) => p.active },
    { key: "st", header: "Trạng thái", cell: (p) => <StatusBadge status={p.status} label={p.status === "active" ? "Đang bán" : "Ngừng bán"} /> },
    { key: "x", header: "", cell: (p) => <TextLink to={`${base}/$id`} params={{ id: p.id }}>Xem chi tiết</TextLink> },
  ];
  return <DataTable data={data} columns={cols} searchPlaceholder="Tìm tên gói..." filters={[{ key: "st", label: "Trạng thái", options: [{ label: "Đang bán", value: "active" }, { label: "Ngừng bán", value: "inactive" }], match: (p, v) => p.status === v }]} />;
}

export function PackageDetail({ area, p, parent }: { area: Area; p: OpsPackage; parent: { label: string; to: string } }) {
  return (
    <OPage area={area} title={p.name} parent={parent} actions={<StatusBadge status={p.status} label={p.status === "active" ? "Đang bán" : "Ngừng bán"} />}>
      <div className="grid gap-6 lg:grid-cols-3">
        <Panel title="Thông tin gói" className="lg:col-span-2">
          <InfoList items={[
            { label: "Loại gói", value: kindLabel(p.kind) }, { label: "Giá bán", value: formatCurrency(p.price) },
            { label: "Thời hạn", value: `${p.months} tháng` }, { label: "Số buổi", value: p.sessions ? `${p.sessions} buổi với HLV` : "Tập không giới hạn" },
            { label: "Đơn giá/buổi", value: p.sessions ? formatCurrency(Math.round(p.price / p.sessions)) : formatCurrency(Math.round(p.price / (p.months * 30))) + "/ngày" },
            { label: "Đã bán / đang hiệu lực", value: `${p.sold} / ${p.active}` },
          ]} />
          <h3 className="mt-6 mb-2 text-sm font-semibold">Quyền lợi</h3>
          <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">{p.benefits.map((b) => <li key={b}>{b}</li>)}</ul>
        </Panel>
        <Panel title="Doanh thu từ gói">
          <p className="font-display text-3xl">{formatCurrency(p.price * p.sold)}</p>
          <p className="text-sm text-muted-foreground">Tổng từ {p.sold} lượt bán</p>
          <div className="mt-6"><ButtonLink to={area === "staff" ? "/staff/payments" : "/manager/analytics/payments"} variant="outline">Xem giao dịch liên quan</ButtonLink></div>
        </Panel>
      </div>
    </OPage>
  );
}

export function PaymentTable({ data, base }: { data: Payment[]; base: string }) {
  const cols: Column<Payment>[] = [
    { key: "c", header: "Mã giao dịch", sortable: true, value: (p) => p.code, cell: (p) => <TextLink to={`${base}/$id`} params={{ id: p.id }}>{p.code}</TextLink> },
    { key: "cu", header: "Hội viên", sortable: true, value: (p) => p.customer },
    { key: "i", header: "Nội dung", value: (p) => p.item },
    { key: "a", header: "Số tiền", sortable: true, value: (p) => p.amount, cell: (p) => formatCurrency(p.amount) },
    { key: "m", header: "Phương thức", value: (p) => p.method },
    { key: "t", header: "Thời gian", value: (p) => p.time },
    { key: "s", header: "Trạng thái", cell: (p) => <StatusBadge status={p.status} /> },
  ];
  return <DataTable data={data} columns={cols} pageSize={8} searchPlaceholder="Tìm mã, hội viên..."
    filters={[
      { key: "s", label: "Trạng thái", options: [{ label: "Đã thanh toán", value: "paid" }, { label: "Chờ xử lý", value: "pending" }, { label: "Thất bại", value: "failed" }, { label: "Đã hoàn tiền", value: "refunded" }], match: (p, v) => p.status === v },
      { key: "m", label: "Phương thức", options: ["Tiền mặt", "Chuyển khoản", "VNPay", "Thẻ"].map((x) => ({ label: x, value: x })), match: (p, v) => p.method === v },
    ]} />;
}

export function PaymentDetail({ id }: { id?: string | undefined }) {
  const p = findPayment(id);
  const [status, setStatus] = useState(p.status);
  return (
    <OPage area="staff" title={`Giao dịch ${p.code}`} parent={{ label: "Thanh toán", to: "/staff/payments" }} actions={<StatusBadge status={status} />}>
      <div className="grid gap-6 lg:grid-cols-3">
        <Panel title="Chi tiết" className="lg:col-span-2">
          <InfoList items={[{ label: "Hội viên", value: p.customer }, { label: "Số điện thoại", value: p.phone }, { label: "Nội dung", value: p.item }, { label: "Số tiền", value: formatCurrency(p.amount) }, { label: "Phương thức", value: p.method }, { label: "Thời gian", value: p.time }, { label: "Nhân viên thu", value: p.staff }, { label: "Mã hoá đơn", value: `HD-${p.code.slice(3)}` }]} />
          <div className="mt-6 flex flex-wrap gap-2">
            {status === "pending" ? <><Button onClick={() => { setStatus("paid"); toast.success("Đã xác nhận thanh toán."); }}>Xác nhận đã nhận tiền</Button><Button variant="outline" onClick={() => { setStatus("failed"); toast.success("Đã đánh dấu thất bại."); }}>Đánh dấu thất bại</Button></> : null}
            <Button variant="outline" onClick={() => toast.success("Đang in hoá đơn...")}>In hoá đơn</Button>
          </div>
        </Panel>
        <Panel title="Lịch sử"><Timeline items={[
          { title: "Tạo giao dịch", time: p.time, tone: "info", description: `Bởi ${p.staff}` },
          ...(status === "paid" ? [{ title: "Đã thanh toán", time: p.time, tone: "success" as const }] : []),
          ...(status === "pending" ? [{ title: "Chờ đối soát", time: "—", tone: "warning" as const }] : []),
          ...(status === "failed" ? [{ title: "Thanh toán thất bại", time: p.time, tone: "danger" as const, description: "Ngân hàng từ chối giao dịch." }] : []),
          ...(status === "refunded" ? [{ title: "Đã hoàn tiền", time: "24/09/2026", tone: "neutral" as const }] : []),
        ]} /></Panel>
      </div>
    </OPage>
  );
}

export function ReviewTable({ data, base, withTrainer }: { data: GymReview[]; base: string; withTrainer?: boolean }) {
  const cols: Column<GymReview>[] = [
    { key: "c", header: "Hội viên", sortable: true, value: (r) => r.customer, cell: (r) => <span className="flex items-center gap-2"><Avatar name={r.customer} className="size-8 text-xs" />{r.customer}</span> },
    ...(withTrainer ? [{ key: "t", header: "Huấn luyện viên", sortable: true, value: (r: GymReview) => r.trainer ?? "" }] : []),
    { key: "r", header: "Số sao", sortable: true, value: (r) => r.rating, cell: (r) => <Stars value={r.rating} /> },
    { key: "tp", header: "Chủ đề", value: (r) => r.topic },
    { key: "ct", header: "Nội dung", cell: (r) => <span className="line-clamp-2 max-w-sm">{r.content}</span> },
    { key: "d", header: "Ngày", sortable: true, value: (r) => r.date, cell: (r) => formatDate(r.date) },
    { key: "s", header: "Phản hồi", cell: (r) => <StatusBadge tone={r.reply ? "success" : "warning"} label={r.reply ? "Đã phản hồi" : "Chưa phản hồi"} /> },
    { key: "a", header: "", cell: (r) => <TextLink to={`${base}/$id`} params={{ id: r.id }}>Chi tiết</TextLink> },
  ];
  return <DataTable data={data} columns={cols} searchPlaceholder="Tìm đánh giá..." filters={[
    { key: "rp", label: "Phản hồi", options: [{ label: "Chưa phản hồi", value: "0" }, { label: "Đã phản hồi", value: "1" }], match: (r, v) => String(Number(!!r.reply)) === v },
    { key: "st", label: "Số sao", options: [5, 4, 3, 2, 1].map((n) => ({ label: `${n} sao`, value: String(n) })), match: (r, v) => String(r.rating) === v },
  ]} />;
}

export function ReviewDetail({ r, parent, title }: { r: GymReview; parent: { label: string; to: string }; title: string }) {
  return (
    <OPage area="staff" title={title} parent={parent}>
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title={r.customer} action={<Stars value={r.rating} />}>
          <p className="text-sm leading-relaxed">“{r.content}”</p>
          <InfoList items={[{ label: "Ngày", value: formatDate(r.date) }, { label: "Chủ đề", value: r.topic }, ...(r.trainer ? [{ label: "Huấn luyện viên", value: r.trainer }] : [])]} />
          {r.rating <= 2 ? <div className="mt-4 rounded-md border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">Đánh giá thấp — nên phản hồi trong 24 giờ và chuyển cho quản lý nếu cần.</div> : null}
          <div className="mt-4"><Button variant="outline" size="sm" onClick={() => toast.success("Đã chuyển đánh giá tới quản lý.")}>Chuyển cho quản lý</Button></div>
        </Panel>
        <ReplyPanel existing={r.reply} />
      </div>
    </OPage>
  );
}

/** Giao diện soạn bài viết. */
export function ArticleEditor({ a }: { a?: Article }) {
  const [title, setTitle] = useState(a?.title ?? "");
  const [body, setBody] = useState(a?.body ?? "");
  const [preview, setPreview] = useState(false);
  const wrap = (pre: string, post = pre) => setBody((b) => `${b}${pre}văn bản${post}`);
  return (
    <form className="grid gap-6 lg:grid-cols-[1fr_320px]" onSubmit={(e) => { e.preventDefault(); if (title.trim().length < 10) return void toast.error("Tiêu đề cần tối thiểu 10 ký tự."); toast.success("Đã lưu bài viết."); }}>
      <Panel>
        <Input className="h-12 text-lg font-semibold" placeholder="Tiêu đề bài viết" value={title} onChange={(e) => setTitle(e.target.value)} />
        <div className="mt-4 flex flex-wrap items-center gap-1 rounded-t-md border border-border bg-muted/40 p-1.5">
          {[[Bold, "**"], [Italic, "_"], [Heading2, "\n## ", ""], [List, "\n- ", ""], [Link2, "[", "](https://)"], [Image, "![ảnh](", ")"]].map(([Icon, pre, post], i) => {
            const I = Icon as typeof Bold;
            return <Button key={i} type="button" size="icon" variant="ghost" aria-label="Định dạng" onClick={() => wrap(pre as string, post as string | undefined)}><I className="size-4" /></Button>;
          })}
          <div className="ml-auto flex gap-1"><Button type="button" size="sm" variant={preview ? "outline" : "default"} onClick={() => setPreview(false)}>Soạn thảo</Button><Button type="button" size="sm" variant={preview ? "default" : "outline"} onClick={() => setPreview(true)}>Xem trước</Button></div>
        </div>
        {preview ? (
          <div className="min-h-[360px] rounded-b-md border border-t-0 border-border p-4 text-sm leading-relaxed whitespace-pre-wrap"><h2 className="mb-3 font-display text-2xl">{title || "Chưa có tiêu đề"}</h2>{body}</div>
        ) : (
          <Textarea className="min-h-[360px] rounded-t-none border-t-0" value={body} onChange={(e) => setBody(e.target.value)} placeholder="Nội dung bài viết..." />
        )}
        <p className="mt-2 text-xs text-muted-foreground">{body.trim().split(/\s+/).filter(Boolean).length} từ · khoảng {Math.max(1, Math.round(body.split(/\s+/).length / 200))} phút đọc</p>
      </Panel>
      <div className="space-y-6">
        <Panel title="Xuất bản">
          <div className="space-y-4">
            <Field label="Chuyên mục"><select defaultValue={a?.category} className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm">{["Kỹ thuật", "Dinh dưỡng", "Giáo án", "Tin phòng gym"].map((c) => <option key={c} className="bg-card">{c}</option>)}</select></Field>
            <Field label="Mô tả ngắn"><Textarea rows={3} defaultValue={a?.excerpt} /></Field>
            <Field label="Lên lịch đăng"><Input type="datetime-local" defaultValue="2026-09-30T08:00" /></Field>
            <label className={cn("flex cursor-pointer flex-col items-center gap-2 rounded-md border border-dashed border-border-strong p-5 text-center text-xs text-muted-foreground")}>
              <Image className="size-5" /> Ảnh bìa (tỷ lệ 16:9)
              <input type="file" accept="image/*" className="sr-only" onChange={(e) => e.target.files?.[0] && toast.success(`Đã chọn ảnh: ${e.target.files[0].name}`)} />
            </label>
          </div>
          <div className="mt-6 grid gap-2">
            <Button type="submit">Lưu bản nháp</Button>
            <Button type="button" variant="outline" onClick={() => toast.success("Đã đăng bài viết lên trang công khai.")}>Đăng ngay</Button>
          </div>
        </Panel>
      </div>
    </form>
  );
}
