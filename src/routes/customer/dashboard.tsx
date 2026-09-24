import { Link, createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, CalendarClock, CalendarPlus, Clock, Dumbbell, MessageCircle, NotebookPen, QrCode, Scale, TrendingDown } from "lucide-react";

import { CPage, Panel, ProgressBar, TODAY, daysBetween, meta } from "@/components/customer/common";
import { AppLink } from "@/components/shared/AppLink";
import { ChartCard, SimpleBarChart } from "@/components/shared/charts";
import { StatCard } from "@/components/shared/StatCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { formatDate, formatDateTime } from "@/lib/format";
import { BODY_METRICS, ME, MY_PACKAGES, NEXT_SESSION, NOTIFICATIONS, RECENT_ACTIVITY, WEEKLY_WORKOUTS } from "@/lib/mock/customer";

export const Route = createFileRoute("/customer/dashboard")({
  head: () => meta("Tổng quan hội viên", "Tình trạng gói tập, lịch tập sắp tới và tiến độ cơ thể của bạn."),
  component: Dashboard,
});

const QUICK = [
  { label: "Check-in QR", to: "/customer/check-in", icon: QrCode },
  { label: "Ghi nhận buổi tập", to: "/customer/workout-log", icon: NotebookPen },
  { label: "Cập nhật chỉ số", to: "/customer/body-metrics", icon: Scale },
  { label: "Đổi lịch tập", to: "/customer/reschedule/request", icon: CalendarPlus },
  { label: "Nhắn huấn luyện viên", to: "/customer/chat", icon: MessageCircle },
  { label: "Xem bài tập", to: "/customer/exercises", icon: Dumbbell },
];

function Dashboard() {
  const membership = MY_PACKAGES.find((p) => p.type === "MEMBERSHIP" && p.status === "active")!;
  const pt = MY_PACKAGES.find((p) => p.type === "PT" && p.status === "active")!;
  const remaining = (pt.totalSessions ?? 0) - pt.usedSessions;
  const ptDaysLeft = daysBetween(TODAY, pt.endDate);
  const memDaysLeft = daysBetween(TODAY, membership.endDate);
  const last = BODY_METRICS.at(-1)!;
  const first = BODY_METRICS[0]!;
  const prev = BODY_METRICS.at(-3)!;
  const plateau = Math.abs(last.weight - prev.weight) < 0.5 && Math.abs(last.bodyFat - prev.bodyFat) < 0.5;
  const unread = NOTIFICATIONS.filter((n) => !n.read);

  return (
    <CPage
      title={`Xin chào, ${ME.fullName.split(" ").at(-1)}!`}
      description="Đây là tình hình tập luyện của bạn hôm nay."
      actions={<Button variant="hero" asChild><Link to="/customer/check-in"><QrCode size={16} /> Mở mã check-in</Link></Button>}
    >
      <div className="grid gap-3 lg:grid-cols-2">
        {ptDaysLeft <= 7 || memDaysLeft <= 14 ? (
          <div className="flex items-start gap-3 rounded-lg border border-warning/40 bg-warning/10 p-4 text-sm">
            <AlertTriangle size={18} className="mt-0.5 shrink-0 text-warning" />
            <div className="flex-1">
              <p className="font-semibold">Gói tập sắp hết hạn</p>
              <p className="text-muted-foreground">{pt.name} còn {remaining} buổi, hết hạn sau {ptDaysLeft} ngày ({formatDate(pt.endDate)}). {membership.name} hết hạn ngày {formatDate(membership.endDate)}.</p>
            </div>
            <Button size="sm" variant="outline" asChild><Link to="/customer/packages">Gia hạn</Link></Button>
          </div>
        ) : null}
        {plateau ? (
          <div className="flex items-start gap-3 rounded-lg border border-cyan/40 bg-cyan/10 p-4 text-sm">
            <TrendingDown size={18} className="mt-0.5 shrink-0 text-cyan" />
            <div className="flex-1">
              <p className="font-semibold">Tiến độ đang chững lại</p>
              <p className="text-muted-foreground">Cân nặng và tỉ lệ mỡ gần như không đổi trong 7 tuần. Hãy trao đổi với huấn luyện viên để điều chỉnh giáo án.</p>
            </div>
            <Button size="sm" variant="outline" asChild><Link to="/customer/chat">Trao đổi</Link></Button>
          </div>
        ) : null}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Gói hội viên" value={`${memDaysLeft} ngày`} hint={`${membership.name} · đến ${formatDate(membership.endDate)}`} badge={<StatusBadge status="active" />} />
        <StatCard label="Buổi PT còn lại" value={`${remaining}/${pt.totalSessions}`} hint={`Hết hạn ${formatDate(pt.endDate)}`} badge={<StatusBadge tone="warning" label={`Còn ${ptDaysLeft} ngày`} />} />
        <StatCard label="Cân nặng hiện tại" value={`${last.weight.toLocaleString("vi-VN")} kg`} hint={`Đã giảm ${(first.weight - last.weight).toLocaleString("vi-VN", { maximumFractionDigits: 1 })} kg từ ${formatDate(first.date)}`} trend={{ value: "-5,9%", direction: "down" }} />
        <StatCard label="Tỉ lệ mỡ" value={`${last.bodyFat.toLocaleString("vi-VN")}%`} hint={`Cơ xương ${last.muscle.toLocaleString("vi-VN")} kg`} trend={{ value: "-4,3 điểm", direction: "down" }} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Panel title="Buổi tập tiếp theo" className="lg:col-span-1">
          <p className="font-display text-2xl font-bold">{NEXT_SESSION.title}</p>
          <div className="mt-3 space-y-1.5 text-sm text-muted-foreground">
            <p className="flex items-center gap-2"><CalendarClock size={15} className="text-primary" /> {formatDate(NEXT_SESSION.date)} · {NEXT_SESSION.start} – {NEXT_SESSION.end}</p>
            <p className="flex items-center gap-2"><Dumbbell size={15} className="text-primary" /> HLV {NEXT_SESSION.trainer}</p>
            <p className="flex items-center gap-2"><Clock size={15} className="text-primary" /> {NEXT_SESSION.room}</p>
          </div>
          <div className="mt-5 flex gap-2">
            <Button size="sm" asChild><Link to="/customer/calendar">Xem lịch</Link></Button>
            <Button size="sm" variant="outline" asChild><Link to="/customer/reschedule/request">Đổi lịch</Link></Button>
          </div>
          <div className="mt-6 border-t border-border pt-4">
            <div className="mb-2 flex justify-between text-sm"><span className="text-muted-foreground">Tiến độ gói PT</span><span>{pt.usedSessions}/{pt.totalSessions} buổi</span></div>
            <ProgressBar value={(pt.usedSessions / (pt.totalSessions ?? 1)) * 100} />
          </div>
        </Panel>
        <ChartCard title="Số buổi tập mỗi tuần" className="lg:col-span-2" action={<span className="text-xs text-muted-foreground">Mục tiêu: 4 buổi/tuần</span>}>
          <SimpleBarChart data={WEEKLY_WORKOUTS} xKey="week" series={[{ key: "sessions", name: "Số buổi" }]} />
        </ChartCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Panel title="Thao tác nhanh">
          <div className="grid grid-cols-2 gap-2">
            {QUICK.map((q) => (
              <AppLink key={q.to} to={q.to} className="flex flex-col items-start gap-2 rounded-lg border border-border p-3 text-sm transition-colors hover:border-primary/40 hover:bg-accent/40">
                <q.icon size={18} className="text-primary" /> {q.label}
              </AppLink>
            ))}
          </div>
        </Panel>
        <Panel title="Hoạt động gần đây">
          <ol className="space-y-4">
            {RECENT_ACTIVITY.map((a) => (
              <li key={a.text} className="flex gap-3 text-sm">
                <span className="mt-1.5 size-2 shrink-0 rounded-full bg-primary" />
                <span><span className="block">{a.text}</span><span className="text-xs text-muted-foreground">{formatDateTime(a.time)}</span></span>
              </li>
            ))}
          </ol>
        </Panel>
        <Panel title="Thông báo mới" action={<Link to="/customer/notifications" className="text-xs text-primary hover:underline">Xem tất cả</Link>}>
          <ul className="space-y-3">
            {unread.map((n) => (
              <li key={n.id}>
                <Link to="/customer/notifications/$id" params={{ id: n.id }} className="block rounded-lg border border-border p-3 text-sm hover:border-primary/40">
                  <p className="font-medium">{n.title}</p>
                  <p className="line-clamp-2 text-xs text-muted-foreground">{n.summary}</p>
                </Link>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Panel title="Chỉ số cơ thể gần nhất" action={<Link to="/customer/body-progress" className="text-xs text-primary hover:underline">Xem biểu đồ</Link>}>
        <div className="grid gap-4 sm:grid-cols-4">
          {[
            { l: "Cân nặng", v: `${last.weight.toLocaleString("vi-VN")} kg` },
            { l: "Tỉ lệ mỡ", v: `${last.bodyFat.toLocaleString("vi-VN")}%` },
            { l: "Khối cơ", v: `${last.muscle.toLocaleString("vi-VN")} kg` },
            { l: "Vòng eo", v: `${last.waist.toLocaleString("vi-VN")} cm` },
          ].map((m) => (
            <div key={m.l}><p className="text-xs text-muted-foreground">{m.l}</p><p className="font-display text-xl font-bold">{m.v}</p></div>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">Đo lần cuối ngày {formatDate(last.date)} bằng máy InBody tại quầy lễ tân.</p>
      </Panel>
    </CPage>
  );
}
