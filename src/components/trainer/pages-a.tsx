import { useState } from "react";
import { useParams } from "@tanstack/react-router";
import { AlertTriangle, Award, CalendarCheck, CalendarDays, CheckCircle2, ClipboardList, MessageSquare, Plus, Star, Users } from "lucide-react";
import { toast } from "sonner";

import { ProgressBar } from "@/components/customer/common";
import { ActivityList, ApprovalActions, Avatar, ButtonLink, Field, FormDrawer, Grid, InfoList, OPage, Panel, Stars, TextLink, Timeline } from "@/components/ops/kit";
import { SimpleBarChart } from "@/components/shared/charts";
import { DataTable, type Column } from "@/components/shared/DataTable";
import { ScheduleCalendar } from "@/components/shared/ScheduleCalendar";
import { StatCard } from "@/components/shared/StatCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency, formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import {
  ACTIVITY, CERTIFICATES, CUSTOMERS, ME, RESCHEDULES, REVIEWS, SESSIONS, WEEKLY_COMPLETED, findCert, findCustomer, findSession,
  type Certificate, type RescheduleReq,
} from "@/lib/mock/trainer";

const P = { label: "Khu vực huấn luyện", to: "/trainer/dashboard" };
void P;
export const useId = () => (useParams({ strict: false }) as { id?: string }).id;

const CERT_STATUS: Record<Certificate["status"], string> = { approved: "approved", pending: "pending", rejected: "rejected", expired: "expired" };

export function TrainerDashboard() {
  const today = SESSIONS.filter((s) => s.date === "2026-09-25");
  const stalled = CUSTOMERS.filter((c) => c.status === "warning");
  return (
    <OPage area="trainer" title="Tổng quan huấn luyện viên" description={`Chào ${ME.name}, hôm nay thứ Sáu 25/09/2026 bạn có ${today.length} buổi hướng dẫn.`}
      actions={<ButtonLink to="/trainer/calendar"><CalendarDays className="size-4" /> Xem lịch</ButtonLink>}>
      <Grid cols={4}>
        <StatCard label="Tổng số học viên" value={String(CUSTOMERS.length)} hint="5 đang hoạt động" icon={Users} />
        <StatCard label="Buổi đã hoàn thành" value="164" hint="Tháng 9: 83 buổi" trend={{ value: "+8%", direction: "up" }} icon={CheckCircle2} />
        <StatCard label="Yêu cầu đổi lịch chờ" value={String(RESCHEDULES.filter((r) => r.status === "pending").length)} hint="Cần phản hồi trong 24 giờ" icon={CalendarCheck} />
        <StatCard label="Đánh giá trung bình" value={`${ME.rating}/5`} hint={`${ME.reviewCount} lượt đánh giá`} icon={Star} />
      </Grid>
      <div className="grid gap-6 lg:grid-cols-3">
        <Panel title="Lịch hướng dẫn hôm nay" className="lg:col-span-2" action={<TextLink to="/trainer/calendar">Toàn bộ lịch</TextLink>}>
          <ul className="divide-y divide-border">
            {today.map((s) => {
              const c = findCustomer(s.customerId);
              return (
                <li key={s.id} className="flex flex-wrap items-center gap-3 py-3">
                  <div className="w-24 text-sm font-semibold text-primary">{s.start}–{s.end}</div>
                  <Avatar name={c.name} />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{s.focus} · {s.room}</p>
                  </div>
                  <StatusBadge status={s.status} />
                  {s.status === "scheduled" ? <ButtonLink variant="outline" to="/trainer/live-sessions/$id" params={{ id: s.id }}>Bắt đầu</ButtonLink> : null}
                </li>
              );
            })}
          </ul>
        </Panel>
        <Panel title="Chứng chỉ đang chờ duyệt">
          {CERTIFICATES.filter((c) => c.status === "pending").map((c) => (
            <div key={c.id} className="rounded-md border border-warning/30 bg-warning/5 p-3">
              <p className="font-medium">{c.name}</p>
              <p className="text-xs text-muted-foreground">Gửi ngày {formatDate(c.issued)} · {c.issuer}</p>
              <div className="mt-2"><TextLink to="/trainer/certificates/$id" params={{ id: c.id }}>Xem chi tiết</TextLink></div>
            </div>
          ))}
          <p className="mt-3 text-xs text-muted-foreground">1 chứng chỉ hết hạn, 1 bị từ chối cần tải lại.</p>
        </Panel>
      </div>
      <Panel title="Cảnh báo chững tiến độ">
        <div className="grid gap-3 md:grid-cols-2">
          {stalled.map((c) => (
            <div key={c.id} className="flex gap-3 rounded-md border border-warning/30 bg-warning/5 p-3">
              <AlertTriangle className="mt-0.5 size-5 shrink-0 text-warning" />
              <div className="flex-1 text-sm">
                <p className="font-medium">{c.name}</p>
                <p className="text-muted-foreground">Cân nặng chỉ thay đổi {Math.abs(c.weight - c.startWeight).toFixed(1).replace(".", ",")} kg sau {c.sessionsDone} buổi. Mục tiêu: {c.goal.toLowerCase()}.</p>
                <div className="mt-2 flex gap-3"><TextLink to="/trainer/customers/$id" params={{ id: c.id }}>Xem chỉ số</TextLink><TextLink to="/trainer/customers/$id/ai-plan" params={{ id: c.id }}>Gợi ý điều chỉnh</TextLink></div>
              </div>
            </div>
          ))}
        </div>
      </Panel>
      <div className="grid gap-6 lg:grid-cols-3">
        <Panel title="Buổi hoàn thành theo tuần" className="lg:col-span-2">
          <SimpleBarChart data={WEEKLY_COMPLETED} xKey="week" series={[{ key: "sessions", name: "Buổi tập" }]} />
        </Panel>
        <Panel title="Thao tác nhanh">
          <div className="grid gap-2">
            <ButtonLink variant="outline" to="/trainer/lesson-plans/create"><ClipboardList className="size-4" /> Tạo giáo án</ButtonLink>
            <ButtonLink variant="outline" to="/trainer/reschedule/requests"><CalendarCheck className="size-4" /> Xử lý đổi lịch</ButtonLink>
            <ButtonLink variant="outline" to="/trainer/days-off"><CalendarDays className="size-4" /> Đăng ký ngày nghỉ</ButtonLink>
            <ButtonLink variant="outline" to="/trainer/certificates"><Award className="size-4" /> Tải chứng chỉ</ButtonLink>
            <ButtonLink variant="outline" to="/trainer/chat"><MessageSquare className="size-4" /> Nhắn học viên</ButtonLink>
          </div>
        </Panel>
      </div>
      <Panel title="Hoạt động gần đây"><ActivityList items={ACTIVITY} /></Panel>
    </OPage>
  );
}

export function TrainerProfile() {
  return (
    <OPage area="trainer" title="Hồ sơ huấn luyện viên" actions={<ButtonLink to="/trainer/profile/edit">Cập nhật hồ sơ</ButtonLink>}>
      <div className="grid gap-6 lg:grid-cols-3">
        <Panel>
          <div className="flex flex-col items-center text-center">
            <Avatar name={ME.name} className="size-24 text-2xl" />
            <h2 className="mt-4 font-display text-2xl">{ME.name}</h2>
            <p className="text-sm text-muted-foreground">{ME.specialization}</p>
            <div className="mt-3 flex items-center gap-2"><Stars value={ME.rating} /> <span className="text-sm">{ME.rating} ({ME.reviewCount})</span></div>
            <StatusBadge status="active" className="mt-3" />
          </div>
        </Panel>
        <div className="space-y-6 lg:col-span-2">
          <Panel title="Thông tin chung">
            <InfoList items={[
              { label: "Email", value: ME.email }, { label: "Số điện thoại", value: ME.phone },
              { label: "Kinh nghiệm", value: `${ME.experience} năm` }, { label: "Ngày gia nhập", value: formatDate(ME.joined) },
              { label: "Đơn giá tham khảo", value: `${formatCurrency(ME.hourlyRate)}/buổi` }, { label: "Học viên hiện tại", value: `${CUSTOMERS.length} người` },
            ]} />
          </Panel>
          <Panel title="Giới thiệu"><p className="text-sm leading-relaxed text-muted-foreground">{ME.bio}</p></Panel>
          <Panel title="Chứng chỉ đã duyệt" action={<TextLink to="/trainer/certificates">Quản lý</TextLink>}>
            <ul className="space-y-2">{CERTIFICATES.filter((c) => c.status === "approved").map((c) => <li key={c.id} className="flex justify-between text-sm"><span>{c.name}</span><span className="text-muted-foreground">{c.issuer}</span></li>)}</ul>
          </Panel>
        </div>
      </div>
    </OPage>
  );
}

export function TrainerProfileEdit() {
  const [specs, setSpecs] = useState(["Tăng cơ", "Giảm mỡ", "Phục hồi chấn thương nhẹ"]);
  const all = ["Tăng cơ", "Giảm mỡ", "Phục hồi chấn thương nhẹ", "Cardio", "Yoga", "Người cao tuổi", "Sức mạnh"];
  return (
    <OPage area="trainer" title="Cập nhật hồ sơ" parent={{ label: "Hồ sơ", to: "/trainer/profile" }}>
      <form className="grid gap-6 lg:grid-cols-3" onSubmit={(e) => { e.preventDefault(); toast.success("Đã lưu hồ sơ. Thay đổi chuyên môn sẽ được quản lý xem xét."); }}>
        <Panel title="Thông tin cá nhân" className="lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Họ và tên"><Input defaultValue={ME.name} /></Field>
            <Field label="Số điện thoại"><Input defaultValue={ME.phone} /></Field>
            <Field label="Email"><Input type="email" defaultValue={ME.email} /></Field>
            <Field label="Số năm kinh nghiệm"><Input type="number" defaultValue={ME.experience} /></Field>
          </div>
          <div className="mt-4"><Field label="Giới thiệu bản thân" hint="Tối đa 500 ký tự, hiển thị trên trang công khai."><Textarea rows={5} defaultValue={ME.bio} /></Field></div>
        </Panel>
        <Panel title="Chuyên môn">
          <div className="flex flex-wrap gap-2">
            {all.map((s) => (
              <button type="button" key={s} onClick={() => setSpecs((x) => (x.includes(s) ? x.filter((y) => y !== s) : [...x, s]))}
                className={cn("rounded-md border px-3 py-1.5 text-sm", specs.includes(s) ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground")}>{s}</button>
            ))}
          </div>
          <div className="mt-6 flex gap-2"><ButtonLink variant="outline" to="/trainer/profile">Huỷ</ButtonLink><Button type="submit">Lưu thay đổi</Button></div>
        </Panel>
      </form>
    </OPage>
  );
}

const certFields = [
  { name: "name", label: "Tên chứng chỉ", placeholder: "VD: NASM Certified Personal Trainer" },
  { name: "issuer", label: "Đơn vị cấp" }, { name: "code", label: "Mã chứng chỉ" },
  { name: "issued", label: "Ngày cấp", type: "date" as const }, { name: "expires", label: "Ngày hết hạn", type: "date" as const },
  { name: "file", label: "Tệp chứng chỉ", type: "file" as const },
];

export function TrainerCertificates() {
  const counts = { approved: 0, pending: 0, rejected: 0, expired: 0 } as Record<Certificate["status"], number>;
  CERTIFICATES.forEach((c) => counts[c.status]++);
  return (
    <OPage area="trainer" title="Danh sách chứng chỉ" description="Chứng chỉ được quản lý xác minh trước khi hiển thị trên hồ sơ công khai."
      actions={<FormDrawer trigger={<Button><Plus className="size-4" /> Tải chứng chỉ</Button>} title="Tải chứng chỉ mới" description="Chứng chỉ sẽ ở trạng thái chờ duyệt trong 1–3 ngày làm việc." fields={certFields} submitLabel="Gửi duyệt" />}>
      <Grid cols={4}>
        {(["approved", "pending", "rejected", "expired"] as const).map((s) => (
          <div key={s} className="card-surface p-4"><StatusBadge status={s} /><p className="mt-3 font-display text-3xl">{counts[s]}</p></div>
        ))}
      </Grid>
      <Grid cols={3}>
        {CERTIFICATES.map((c) => (
          <div key={c.id} className={cn("card-surface flex flex-col p-5", c.status === "rejected" && "border-destructive/40")}>
            <div className="flex items-start justify-between gap-2"><Award className="size-6 text-primary" /><StatusBadge status={CERT_STATUS[c.status]} /></div>
            <h3 className="mt-3 font-semibold">{c.name}</h3>
            <p className="text-sm text-muted-foreground">{c.issuer}</p>
            <p className="mt-2 text-xs text-muted-foreground">Cấp {formatDate(c.issued)} · Hết hạn {formatDate(c.expires)}</p>
            {c.note ? <p className="mt-2 text-xs text-destructive">{c.note}</p> : null}
            <div className="mt-auto pt-4"><TextLink to="/trainer/certificates/$id" params={{ id: c.id }}>Xem chi tiết</TextLink></div>
          </div>
        ))}
      </Grid>
    </OPage>
  );
}

export function TrainerCertificateDetail() {
  const c = findCert(useId());
  const steps = [
    { title: "Đã tải lên", time: formatDate(c.issued), tone: "info" as const, description: "Tệp chứng chỉ-" + c.code + ".pdf (1,2 MB)" },
    ...(c.status === "pending" ? [{ title: "Đang chờ quản lý xác minh", time: "Dự kiến 1–3 ngày", tone: "warning" as const }] : []),
    ...(c.status === "approved" || c.status === "expired" ? [{ title: "Quản lý Nguyễn Hoàng Nam đã duyệt", time: formatDate(c.issued), tone: "success" as const }] : []),
    ...(c.status === "rejected" ? [{ title: "Bị từ chối", time: "22/08/2026", tone: "danger" as const, description: c.note }] : []),
    ...(c.status === "expired" ? [{ title: "Đã hết hạn", time: formatDate(c.expires), tone: "neutral" as const }] : []),
  ];
  return (
    <OPage area="trainer" title={c.name} parent={{ label: "Chứng chỉ", to: "/trainer/certificates" }} actions={<StatusBadge status={c.status} />}>
      <div className="grid gap-6 lg:grid-cols-3">
        <Panel title="Thông tin chứng chỉ" className="lg:col-span-2">
          <InfoList items={[
            { label: "Đơn vị cấp", value: c.issuer }, { label: "Mã chứng chỉ", value: c.code },
            { label: "Ngày cấp", value: formatDate(c.issued) }, { label: "Ngày hết hạn", value: formatDate(c.expires) },
          ]} />
          <div className="mt-4 grid aspect-[16/9] place-items-center rounded-md border border-dashed border-border-strong bg-background/40 text-sm text-muted-foreground">
            <div className="text-center"><Award className="mx-auto mb-2 size-10 text-primary" />Bản xem trước chứng chỉ-{c.code}.pdf</div>
          </div>
          {(c.status === "rejected" || c.status === "expired") ? (
            <div className="mt-4"><FormDrawer trigger={<Button>Tải lại chứng chỉ</Button>} title="Tải lại chứng chỉ" fields={certFields.map((f) => ({ ...f, defaultValue: f.name === "name" ? c.name : f.name === "issuer" ? c.issuer : f.name === "code" ? c.code : undefined }))} submitLabel="Gửi duyệt lại" /></div>
          ) : null}
        </Panel>
        <Panel title="Trạng thái xác minh"><Timeline items={steps} /></Panel>
      </div>
    </OPage>
  );
}

export function TrainerCalendar() {
  const [view, setView] = useState<"week" | "month">("week");
  const days = ["T2 21/09", "T3 22/09", "T4 23/09", "T5 24/09", "T6 25/09", "T7 26/09", "CN 27/09"];
  const dates = ["2026-09-21", "2026-09-22", "2026-09-23", "2026-09-24", "2026-09-25", "2026-09-26", "2026-09-27"];
  const hours = ["06:00", "06:30", "07:30", "17:00", "18:30"];
  return (
    <OPage area="trainer" title="Lịch hướng dẫn" description="Lịch dạy theo tuần hoặc tháng. Bấm vào buổi để xem chi tiết."
      actions={<div className="flex gap-2"><Button variant={view === "week" ? "default" : "outline"} onClick={() => setView("week")}>Tuần</Button><Button variant={view === "month" ? "default" : "outline"} onClick={() => setView("month")}>Tháng</Button></div>}>
      {view === "month" ? (
        <ScheduleCalendar initialMonth={new Date(2026, 8, 1)} events={SESSIONS.map((s) => ({ id: s.id, day: Number(s.date.slice(8)), label: findCustomer(s.customerId).name, time: s.start, tone: s.status === "completed" ? "cyan" : "primary" }))} />
      ) : (
        <div className="card-surface overflow-x-auto">
          <table className="w-full min-w-[820px] text-sm">
            <thead><tr><th className="w-20 p-3 text-left text-xs text-muted-foreground">Giờ</th>{days.map((d, i) => <th key={d} className={cn("p-3 text-left text-xs", dates[i] === "2026-09-25" ? "text-primary" : "text-muted-foreground")}>{d}</th>)}</tr></thead>
            <tbody>
              {hours.map((h) => (
                <tr key={h} className="border-t border-border">
                  <td className="p-3 text-xs text-muted-foreground">{h}</td>
                  {dates.map((d) => {
                    const s = SESSIONS.find((x) => x.date === d && x.start === h);
                    return (
                      <td key={d} className="h-20 p-1.5 align-top">
                        {s ? (
                          <div className={cn("rounded-md border p-2 text-xs", s.status === "completed" ? "border-cyan/30 bg-cyan/10" : s.status === "pending" ? "border-warning/30 bg-warning/10" : "border-primary/30 bg-primary/10")}>
                            <p className="font-medium">{findCustomer(s.customerId).name}</p>
                            <p className="text-muted-foreground">{s.focus}</p>
                            <div className="mt-1"><TextLink to={s.status === "pending" ? "/trainer/sessions/$id/verify" : "/trainer/live-sessions/$id"} params={{ id: s.id }}>{s.status === "pending" ? "Xác nhận" : "Mở"}</TextLink></div>
                          </div>
                        ) : d === "2026-09-27" ? <div className="h-full rounded-md bg-muted/40 p-2 text-xs text-muted-foreground">Nghỉ</div> : null}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-2"><span className="size-3 rounded bg-primary/40" /> Sắp diễn ra</span>
        <span className="flex items-center gap-2"><span className="size-3 rounded bg-cyan/40" /> Đã hoàn thành</span>
        <span className="flex items-center gap-2"><span className="size-3 rounded bg-warning/40" /> Chờ xác nhận</span>
      </div>
    </OPage>
  );
}

export function TrainerDaysOff() {
  const week = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"];
  const [off, setOff] = useState<string[]>(["Chủ nhật"]);
  const history = [
    { date: "02/10/2026", reason: "Tham gia khoá đào tạo dinh dưỡng", status: "pending" },
    { date: "15/08/2026", reason: "Việc gia đình", status: "approved" },
    { date: "01/07/2026", reason: "Khám sức khoẻ định kỳ", status: "approved" },
  ];
  return (
    <OPage area="trainer" title="Đăng ký ngày nghỉ" description="Chọn ngày nghỉ cố định hằng tuần hoặc gửi đơn nghỉ theo ngày cụ thể.">
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Ngày nghỉ cố định trong tuần">
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
            {week.map((d) => (
              <button key={d} onClick={() => setOff((x) => (x.includes(d) ? x.filter((y) => y !== d) : [...x, d]))}
                className={cn("rounded-md border px-2 py-4 text-sm font-medium", off.includes(d) ? "border-primary bg-primary/15 text-primary" : "border-border text-muted-foreground hover:border-border-strong")}>{d}</button>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">Đã chọn: {off.join(", ") || "Không có"}. Học viên sẽ không đặt được lịch vào các ngày này.</p>
          <Button className="mt-4" onClick={() => toast.success("Đã lưu ngày nghỉ cố định.")}>Lưu lịch nghỉ tuần</Button>
        </Panel>
        <Panel title="Gửi đơn nghỉ theo ngày">
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); toast.success("Đã gửi đơn nghỉ. Các buổi bị ảnh hưởng sẽ được đề xuất đổi lịch."); }}>
            <div className="grid gap-4 sm:grid-cols-2"><Field label="Từ ngày"><Input type="date" defaultValue="2026-10-02" /></Field><Field label="Đến ngày"><Input type="date" defaultValue="2026-10-02" /></Field></div>
            <Field label="Lý do"><Textarea rows={3} placeholder="VD: tham gia khoá đào tạo" /></Field>
            <div className="rounded-md border border-warning/30 bg-warning/5 p-3 text-sm text-warning">Ngày 02/10 có 3 buổi đã đặt, hệ thống sẽ gửi yêu cầu đổi lịch cho học viên.</div>
            <Button type="submit">Gửi đơn</Button>
          </form>
        </Panel>
      </div>
      <Panel title="Lịch sử đơn nghỉ">
        <ul className="divide-y divide-border">{history.map((h) => <li key={h.date} className="flex flex-wrap items-center justify-between gap-2 py-3 text-sm"><span className="font-medium">{h.date}</span><span className="flex-1 text-muted-foreground sm:px-4">{h.reason}</span><StatusBadge status={h.status} /></li>)}</ul>
      </Panel>
    </OPage>
  );
}

export function TrainerSessionVerify() {
  const s = findSession(useId() ?? "s6");
  const c = findCustomer(s.customerId);
  const [done, setDone] = useState(false);
  const checks = ["Học viên có mặt đúng giờ", "Hoàn thành toàn bộ bài tập theo giáo án", "Đã ghi nhận hiệp, lần lặp và mức tạ", "Không phát sinh chấn thương"];
  return (
    <OPage area="trainer" title="Xác nhận buổi tập hoàn thành" parent={{ label: "Lịch hướng dẫn", to: "/trainer/calendar" }}>
      <div className="grid gap-6 lg:grid-cols-3">
        <Panel title="Thông tin buổi tập">
          <div className="flex items-center gap-3"><Avatar name={c.name} /><div><p className="font-medium">{c.name}</p><p className="text-xs text-muted-foreground">{c.package}</p></div></div>
          <div className="mt-4"><InfoList items={[{ label: "Ngày", value: formatDate(s.date) }, { label: "Giờ", value: `${s.start}–${s.end}` }, { label: "Nội dung", value: s.focus }, { label: "Khu vực", value: s.room }]} /></div>
          <p className="mt-4 text-sm text-muted-foreground">Buổi thứ {c.sessionsDone + 1}/{c.sessionsTotal}</p>
          <ProgressBar value={((c.sessionsDone + 1) / c.sessionsTotal) * 100} className="mt-2" />
        </Panel>
        <Panel title="Danh sách kiểm tra" className="lg:col-span-2">
          {done ? (
            <div className="py-10 text-center"><CheckCircle2 className="mx-auto size-12 text-success" /><p className="mt-3 font-semibold">Đã xác nhận buổi tập</p><p className="text-sm text-muted-foreground">Học viên sẽ nhận thông báo để xác nhận từ phía họ. 1 buổi đã được trừ khỏi gói.</p><div className="mt-4"><ButtonLink to="/trainer/sessions/$id/feedback" params={{ id: s.id }}>Viết phản hồi sau buổi tập</ButtonLink></div></div>
          ) : (
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setDone(true); toast.success("Đã xác nhận hoàn thành buổi tập."); }}>
              {checks.map((t) => <label key={t} className="flex items-center gap-3 text-sm"><Checkbox defaultChecked /> {t}</label>)}
              <Field label="Thời lượng thực tế (phút)"><Input type="number" defaultValue={60} /></Field>
              <Field label="Ghi chú"><Textarea rows={3} placeholder="Ghi chú cho buổi tập (không bắt buộc)" /></Field>
              <div className="flex gap-2"><ButtonLink variant="outline" to="/trainer/calendar">Để sau</ButtonLink><Button type="submit">Xác nhận hoàn thành</Button></div>
            </form>
          )}
        </Panel>
      </div>
    </OPage>
  );
}

export function TrainerRescheduleRequests() {
  const [rows, setRows] = useState(RESCHEDULES);
  const setStatus = (id: string, status: RescheduleReq["status"]) => setRows((r) => r.map((x) => (x.id === id ? { ...x, status } : x)));
  const cols: Column<RescheduleReq>[] = [
    { key: "c", header: "Học viên", value: (r) => findCustomer(r.customerId).name, sortable: true },
    { key: "from", header: "Lịch hiện tại", value: (r) => r.from },
    { key: "to", header: "Lịch đề xuất", value: (r) => r.to },
    { key: "reason", header: "Lý do", value: (r) => r.reason },
    { key: "by", header: "Người gửi", cell: (r) => (r.createdBy === "trainer" ? "Bạn" : "Học viên") },
    { key: "status", header: "Trạng thái", cell: (r) => <StatusBadge status={r.status} /> },
    { key: "a", header: "Xử lý", cell: (r) => r.status === "pending" && r.createdBy === "customer" ? <ApprovalActions approveLabel="Chấp nhận" subject={`đổi lịch của ${findCustomer(r.customerId).name}`} onDone={(s) => setStatus(r.id, s)} /> : <span className="text-xs text-muted-foreground">—</span> },
  ];
  return (
    <OPage area="trainer" title="Xử lý yêu cầu đổi lịch" actions={<ButtonLink to="/trainer/reschedule/create"><Plus className="size-4" /> Gửi yêu cầu đổi lịch</ButtonLink>}>
      <DataTable data={rows} columns={cols} searchPlaceholder="Tìm theo học viên..."
        filters={[{ key: "st", label: "Trạng thái", options: [{ label: "Chờ xử lý", value: "pending" }, { label: "Đã duyệt", value: "approved" }, { label: "Bị từ chối", value: "rejected" }], match: (r, v) => r.status === v }]} />
    </OPage>
  );
}

export function TrainerRescheduleCreate() {
  const upcoming = SESSIONS.filter((s) => s.status === "scheduled");
  const [sel, setSel] = useState(upcoming[0]!.id);
  return (
    <OPage area="trainer" title="Gửi yêu cầu đổi lịch" parent={{ label: "Yêu cầu đổi lịch", to: "/trainer/reschedule/requests" }}>
      <form className="grid gap-6 lg:grid-cols-3" onSubmit={(e) => { e.preventDefault(); toast.success("Đã gửi yêu cầu. Học viên sẽ nhận thông báo để đồng ý."); }}>
        <Panel title="Chọn buổi cần đổi" className="lg:col-span-2">
          <div className="space-y-2">
            {upcoming.map((s) => (
              <label key={s.id} className={cn("flex cursor-pointer items-center gap-3 rounded-md border p-3", sel === s.id ? "border-primary bg-primary/5" : "border-border")}>
                <input type="radio" name="s" checked={sel === s.id} onChange={() => setSel(s.id)} className="accent-[var(--primary)]" />
                <span className="flex-1 text-sm"><span className="font-medium">{findCustomer(s.customerId).name}</span> · {formatDate(s.date)} {s.start}–{s.end}<br /><span className="text-muted-foreground">{s.focus}</span></span>
              </label>
            ))}
          </div>
        </Panel>
        <Panel title="Thời gian đề xuất">
          <div className="space-y-4">
            <Field label="Ngày mới"><Input type="date" defaultValue="2026-09-28" /></Field>
            <Field label="Giờ bắt đầu"><Input type="time" defaultValue="18:00" /></Field>
            <Field label="Lý do"><Textarea rows={3} defaultValue="HLV tham gia khoá đào tạo nội bộ." /></Field>
            <Button type="submit" className="w-full">Gửi yêu cầu</Button>
          </div>
        </Panel>
      </form>
    </OPage>
  );
}

export { REVIEWS };
