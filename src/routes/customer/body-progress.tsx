import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { CPage, Panel, meta } from "@/components/customer/common";
import { ChartCard, SimpleLineChart } from "@/components/shared/charts";
import { StatCard } from "@/components/shared/StatCard";
import { formatDate } from "@/lib/format";
import { BODY_METRICS } from "@/lib/mock/customer";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/customer/body-progress")({
  head: () => meta("Biểu đồ tiến trình cơ thể", "Theo dõi cân nặng, tỉ lệ mỡ và khối cơ theo thời gian."),
  component: BodyProgress,
});

const RANGES = [{ k: 3, l: "3 lần đo" }, { k: 5, l: "5 lần đo" }, { k: 99, l: "Tất cả" }];

function BodyProgress() {
  const [range, setRange] = useState(99);
  const data = BODY_METRICS.slice(-range).map((r) => ({ ...r, label: formatDate(r.date).slice(0, 5) }));
  const a = data[0]!, b = data.at(-1)!;
  const d = (x: number) => `${x > 0 ? "+" : ""}${x.toLocaleString("vi-VN", { maximumFractionDigits: 1 })}`;
  return (
    <CPage
      title="Biểu đồ tiến trình cơ thể"
      description={`Từ ${formatDate(a.date)} đến ${formatDate(b.date)}`}
      actions={
        <div className="flex gap-1 rounded-lg border border-border p-1">
          {RANGES.map((r) => <button key={r.k} onClick={() => setRange(r.k)} className={cn("cursor-pointer rounded-md px-3 py-1.5 text-xs", range === r.k ? "bg-primary/15 text-primary" : "text-muted-foreground")}>{r.l}</button>)}
        </div>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Cân nặng" value={`${b.weight.toLocaleString("vi-VN")} kg`} hint={`${d(b.weight - a.weight)} kg`} />
        <StatCard label="Tỉ lệ mỡ" value={`${b.bodyFat.toLocaleString("vi-VN")}%`} hint={`${d(b.bodyFat - a.bodyFat)} điểm %`} />
        <StatCard label="Khối cơ" value={`${b.muscle.toLocaleString("vi-VN")} kg`} hint={`${d(b.muscle - a.muscle)} kg`} />
        <StatCard label="Vòng eo" value={`${b.waist.toLocaleString("vi-VN")} cm`} hint={`${d(b.waist - a.waist)} cm`} />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard title="Cân nặng & khối cơ (kg)">
          <SimpleLineChart data={data} xKey="label" series={[{ key: "weight", name: "Cân nặng" }, { key: "muscle", name: "Khối cơ", color: "var(--cyan)" }]} />
        </ChartCard>
        <ChartCard title="Tỉ lệ mỡ (%) & vòng eo (cm)">
          <SimpleLineChart data={data} xKey="label" series={[{ key: "bodyFat", name: "Tỉ lệ mỡ" }, { key: "waist", name: "Vòng eo", color: "var(--warning)" }]} />
        </ChartCard>
      </div>
      <Panel title="Nhận xét">
        <p className="text-sm leading-relaxed text-muted-foreground">
          Bạn đã giảm {(a.weight - b.weight).toLocaleString("vi-VN", { maximumFractionDigits: 1 })} kg trong khi khối cơ tăng {(b.muscle - a.muscle).toLocaleString("vi-VN", { maximumFractionDigits: 1 })} kg — dấu hiệu giảm mỡ giữ cơ tốt. Hai lần đo gần nhất gần như không đổi, nên cân nhắc điều chỉnh khẩu phần hoặc tăng khối lượng tập.
        </p>
      </Panel>
    </CPage>
  );
}
