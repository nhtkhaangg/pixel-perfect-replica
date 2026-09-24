import { CreditCard, FileText, MessageSquareWarning, Plus, UserPlus, Wallet } from "lucide-react";
import { toast } from "sonner";

import { ActivityList, ButtonLink, Grid, NotificationList, OPage, Panel, Stars, TextLink } from "@/components/ops/kit";
import { DataTable, type Column } from "@/components/shared/DataTable";
import { StatCard } from "@/components/shared/StatCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { formatCurrency, formatDate, formatNumber } from "@/lib/format";
import { ARTICLES, GYM_REVIEWS, OPS_PACKAGES, PAYMENTS, STAFF_NOTIFS, TRAINER_REVIEWS, findArticle, findGymReview, findPkg, findTrainerReview, type Article } from "@/lib/mock/ops";
import { useId } from "@/components/trainer/pages-a";
import { ArticleEditor, PackageDetail, PackageTable, PaymentDetail, PaymentTable, ReviewDetail, ReviewTable } from "./shared";

export function StaffDashboard() {
  const today = PAYMENTS.filter((p) => p.time.startsWith("25/09"));
  const unreplied = [...GYM_REVIEWS, ...TRAINER_REVIEWS].filter((r) => !r.reply);
  return (
    <OPage area="staff" title="Tổng quan nhân viên" description="Thứ Sáu, 25/09/2026 · Ca sáng 05:30–13:30">
      <Grid cols={4}>
        <StatCard label="Giao dịch trong ngày" value={String(today.length)} hint={formatCurrency(today.filter((p) => p.status === "paid").reduce((s, p) => s + p.amount, 0)) + " đã thu"} icon={Wallet} />
        <StatCard label="Hội viên mới" value="7" hint="Hôm nay" trend={{ value: "+2 so với hôm qua", direction: "up" }} icon={UserPlus} />
        <StatCard label="Thanh toán đang chờ" value={String(PAYMENTS.filter((p) => p.status === "pending").length)} hint="Cần đối soát" icon={CreditCard} />
        <StatCard label="Đánh giá chưa phản hồi" value={String(unreplied.length)} hint="Phòng gym và HLV" icon={MessageSquareWarning} />
      </Grid>
      <div className="grid gap-6 lg:grid-cols-3">
        <Panel title="Giao dịch trong ngày" className="lg:col-span-2" action={<TextLink to="/staff/payments">Tất cả</TextLink>}>
          <ul className="divide-y divide-border">{today.map((p) => <li key={p.id} className="flex flex-wrap items-center gap-3 py-3 text-sm"><TextLink to="/staff/payments/$id" params={{ id: p.id }}>{p.code}</TextLink><span className="flex-1">{p.customer} · {p.item}</span><span className="font-semibold">{formatCurrency(p.amount)}</span><StatusBadge status={p.status} /></li>)}</ul>
        </Panel>
        <Panel title="Đánh giá chưa phản hồi">
          <ul className="space-y-3">{unreplied.slice(0, 4).map((r) => <li key={r.id} className="rounded-md border border-border p-3 text-sm"><div className="flex justify-between"><span className="font-medium">{r.customer}</span><Stars value={r.rating} size={12} /></div><p className="mt-1 line-clamp-2 text-muted-foreground">{r.content}</p><div className="mt-1"><TextLink to={r.trainer ? "/staff/trainer-reviews/$id" : "/staff/gym-reviews/$id"} params={{ id: r.id }}>Phản hồi</TextLink></div></li>)}</ul>
        </Panel>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Bài viết gần đây" action={<ButtonLink variant="outline" to="/staff/articles/create"><Plus className="size-4" /> Viết bài</ButtonLink>}>
          <ul className="divide-y divide-border">{ARTICLES.map((a) => <li key={a.id} className="flex items-center gap-3 py-3 text-sm"><FileText className="size-4 text-muted-foreground" /><TextLink to="/staff/articles/$id/edit" params={{ id: a.id }}>{a.title}</TextLink><span className="ml-auto"><ArticleStatus s={a.status} /></span></li>)}</ul>
        </Panel>
        <Panel title="Hoạt động gần đây"><ActivityList items={[
          { text: "Lâm Quốc Việt thu 1.600.000 VNĐ từ Nguyễn Thu Hà", time: "08:00" },
          { text: "Hội viên mới Ngô Khánh Vy đăng ký gói 3 tháng", time: "07:42" },
          { text: "Phản hồi đánh giá của Ngô Khánh Vy", time: "Hôm qua" },
          { text: "Lên lịch bài viết “Lịch tập 3 buổi/tuần cho người mới”", time: "24/09" },
          { text: "Giao dịch của Đặng Ngọc Lan thất bại", time: "24/09" },
        ]} /></Panel>
      </div>
    </OPage>
  );
}

const ArticleStatus = ({ s }: { s: Article["status"] }) => <StatusBadge tone={s === "published" ? "success" : s === "scheduled" ? "info" : "neutral"} label={{ published: "Đã đăng", scheduled: "Đã lên lịch", draft: "Bản nháp" }[s]} />;

export function StaffTrainerPackages() { return <OPage area="staff" title="Danh sách gói PT"><PackageTable data={OPS_PACKAGES.filter((p) => p.kind === "PT")} base="/staff/trainer-packages" /></OPage>; }
export function StaffTrainerPackageDetail() { return <PackageDetail area="staff" p={findPkg(useId() ?? "t1")} parent={{ label: "Gói PT", to: "/staff/trainer-packages" }} />; }
export function StaffMembershipPackages() { return <OPage area="staff" title="Danh sách gói hội viên"><PackageTable data={OPS_PACKAGES.filter((p) => p.kind === "MEMBERSHIP")} base="/staff/membership-packages" /></OPage>; }
export function StaffMembershipPackageDetail() { return <PackageDetail area="staff" p={findPkg(useId())} parent={{ label: "Gói hội viên", to: "/staff/membership-packages" }} />; }

export function StaffPayments() {
  const paid = PAYMENTS.filter((p) => p.status === "paid");
  return (
    <OPage area="staff" title="Danh sách thanh toán" actions={<ButtonLink variant="outline" to="/staff/dashboard">Về tổng quan</ButtonLink>}>
      <Grid cols={4}>
        <StatCard label="Tổng đã thu" value={formatCurrency(paid.reduce((s, p) => s + p.amount, 0))} />
        <StatCard label="Số giao dịch" value={formatNumber(PAYMENTS.length)} />
        <StatCard label="Đang chờ" value={String(PAYMENTS.filter((p) => p.status === "pending").length)} />
        <StatCard label="Thất bại / hoàn tiền" value={String(PAYMENTS.filter((p) => p.status === "failed" || p.status === "refunded").length)} />
      </Grid>
      <PaymentTable data={PAYMENTS} base="/staff/payments" />
    </OPage>
  );
}
export function StaffPaymentDetail() { return <PaymentDetail id={useId()} />; }

export function StaffArticles() {
  const cols: Column<Article>[] = [
    { key: "t", header: "Tiêu đề", sortable: true, value: (a) => a.title, cell: (a) => <TextLink to="/staff/articles/$id/edit" params={{ id: a.id }}>{a.title}</TextLink> },
    { key: "c", header: "Chuyên mục", value: (a) => a.category },
    { key: "au", header: "Tác giả", value: (a) => a.author },
    { key: "d", header: "Ngày", sortable: true, value: (a) => a.date, cell: (a) => formatDate(a.date) },
    { key: "v", header: "Lượt xem", sortable: true, value: (a) => a.views, cell: (a) => formatNumber(a.views) },
    { key: "s", header: "Trạng thái", cell: (a) => <ArticleStatus s={a.status} /> },
  ];
  return (
    <OPage area="staff" title="Quản lý bài viết" actions={<ButtonLink to="/staff/articles/create"><Plus className="size-4" /> Tạo bài viết</ButtonLink>}>
      <DataTable data={ARTICLES} columns={cols} searchPlaceholder="Tìm bài viết..." rowActions={[{ label: "Xoá bài viết", tone: "danger", onSelect: (a) => toast.success(`Đã xoá “${a.title}”.`) }]}
        filters={[{ key: "s", label: "Trạng thái", options: [{ label: "Đã đăng", value: "published" }, { label: "Đã lên lịch", value: "scheduled" }, { label: "Bản nháp", value: "draft" }], match: (a, v) => a.status === v }]} />
    </OPage>
  );
}
export function StaffArticleCreate() { return <OPage area="staff" title="Tạo bài viết" parent={{ label: "Bài viết", to: "/staff/articles" }}><ArticleEditor /></OPage>; }
export function StaffArticleEdit() { const a = findArticle(useId()); return <OPage area="staff" title="Chỉnh sửa bài viết" parent={{ label: "Bài viết", to: "/staff/articles" }} description={a.title}><ArticleEditor a={a} /></OPage>; }

export function StaffGymReviews() { return <OPage area="staff" title="Đánh giá phòng gym"><ReviewTable data={GYM_REVIEWS} base="/staff/gym-reviews" /></OPage>; }
export function StaffGymReviewDetail() { return <ReviewDetail r={findGymReview(useId())} title="Chi tiết và phản hồi đánh giá" parent={{ label: "Đánh giá phòng gym", to: "/staff/gym-reviews" }} />; }
export function StaffTrainerReviews() { return <OPage area="staff" title="Đánh giá huấn luyện viên"><ReviewTable data={TRAINER_REVIEWS} base="/staff/trainer-reviews" withTrainer /></OPage>; }
export function StaffTrainerReviewDetail() { return <ReviewDetail r={findTrainerReview(useId())} title="Chi tiết đánh giá huấn luyện viên" parent={{ label: "Đánh giá HLV", to: "/staff/trainer-reviews" }} />; }
export function StaffNotifications() { return <OPage area="staff" title="Thông báo"><NotificationList items={STAFF_NOTIFS} /></OPage>; }
