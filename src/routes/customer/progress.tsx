import { createFileRoute } from "@tanstack/react-router";

import { CPage, Panel, ProgressBar, meta } from "@/components/customer/common";
import { ChartCard, SimpleBarChart, SimpleLineChart } from "@/components/shared/charts";
import { StatCard } from "@/components/shared/StatCard";
import { STRENGTH_PROGRESS, WEEKLY_WORKOUTS } from "@/lib/mock/customer";

export const Route = createFileRoute("/customer/progress")({
  head: () => meta("Tiến độ và chỉ số tập luyện", "Sức mạnh, tần suất và mục tiêu tập luyện của bạn."),
  component: Progress,
});

const GOALS = [
  { l: "Squat 80 kg", cur: 72.5, target: 80 },
  { l: "Bench Press 65 kg", cur: 60, target: 65 },
  { l: "Tỉ lệ mỡ dưới 18%", cur: 24.1 - 19.8, target: 24.1 - 18 },
  { l: "Tập 4 buổi/tuần trong tháng 9", cur: 11, target: 16 },
];

function Progress() {
  const first = STRENGTH_PROGRESS[0]!, last = STRENGTH_PROGRESS.at(-1)!;
  const total = WEEKLY_WORKOUTS.reduce((s, w) => s + w.sessions, 0);
  return (
    <CPage title="Tiến độ và chỉ số tập luyện">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Squat tối đa" value={`${last.squat.toLocaleString("vi-VN")} kg`} trend={{ value: `+${last.squat - first.squat} kg`, direction: "up" }} />
        <StatCard label="Bench Press tối đa" value={`${last.bench.toLocaleString("vi-VN")} kg`} trend={{ value: `+${last.bench - first.bench} kg`, direction: "up" }} />
        <StatCard label="Deadlift tối đa" value={`${last.deadlift.toLocaleString("vi-VN")} kg`} trend={{ value: `+${(last.deadlift - first.deadlift).toLocaleString("vi-VN")} kg`, direction: "up" }} />
        <StatCard label="Buổi tập 8 tuần qua" value={String(total)} hint={`Trung bình ${(total / 8).toLocaleString("vi-VN")} buổi/tuần`} />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard title="Sức mạnh theo tháng (kg)">
          <SimpleLineChart data={STRENGTH_PROGRESS} xKey="month" series={[{ key: "squat", name: "Squat" }, { key: "bench", name: "Bench Press", color: "var(--cyan)" }, { key: "deadlift", name: "Deadlift", color: "var(--warning)" }]} />
        </ChartCard>
        <ChartCard title="Thời gian tập mỗi tuần (phút)">
          <SimpleBarChart data={WEEKLY_WORKOUTS} xKey="week" series={[{ key: "minutes", name: "Phút" }]} />
        </ChartCard>
      </div>
      <Panel title="Mục tiêu đang theo đuổi">
        <div className="grid gap-5 md:grid-cols-2">
          {GOALS.map((g) => (
            <div key={g.l}><div className="mb-1.5 flex justify-between text-sm"><span>{g.l}</span><span className="text-muted-foreground">{Math.round((g.cur / g.target) * 100)}%</span></div><ProgressBar value={(g.cur / g.target) * 100} /></div>
          ))}
        </div>
      </Panel>
    </CPage>
  );
}
