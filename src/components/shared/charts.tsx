import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const CHART_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

const axisProps = {
  stroke: "var(--muted-foreground)",
  fontSize: 12,
  tickLine: false,
  axisLine: false,
} as const;

const tooltipStyle = {
  contentStyle: {
    background: "var(--popover)",
    border: "1px solid var(--border-strong)",
    borderRadius: "10px",
    color: "var(--popover-foreground)",
    fontSize: 12,
  },
  labelStyle: { color: "var(--muted-foreground)" },
} as const;

export function ChartCard({
  title,
  action,
  children,
  className,
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("card-surface p-5", className)}>
      <header className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-semibold">{title}</h3>
        {action}
      </header>
      <div className="h-64 w-full">{children}</div>
    </section>
  );
}

export function SimpleLineChart({
  data,
  xKey,
  series,
}: {
  data: Record<string, string | number>[];
  xKey: string;
  series: { key: string; name: string; color?: string }[];
}) {
  return (
    <div className="h-64 w-full">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis dataKey={xKey} {...axisProps} />
        <YAxis {...axisProps} />
        <Tooltip {...tooltipStyle} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        {series.map((s, i) => (
          <Line
            key={s.key}
            type="monotone"
            dataKey={s.key}
            name={s.name}
            stroke={s.color ?? CHART_COLORS[i % CHART_COLORS.length]}
            strokeWidth={2}
            dot={false}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

export function SimpleBarChart({
  data,
  xKey,
  series,
}: {
  data: Record<string, string | number>[];
  xKey: string;
  series: { key: string; name: string; color?: string }[];
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis dataKey={xKey} {...axisProps} />
        <YAxis {...axisProps} />
        <Tooltip {...tooltipStyle} cursor={{ fill: "var(--accent)" }} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        {series.map((s, i) => (
          <Bar
            key={s.key}
            dataKey={s.key}
            name={s.name}
            radius={[4, 4, 0, 0]}
            fill={s.color ?? CHART_COLORS[i % CHART_COLORS.length]}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

export function SimpleDonutChart({
  data,
  centerLabel,
  centerValue,
}: {
  data: { name: string; value: number }[];
  centerLabel?: string;
  centerValue?: string;
}) {
  return (
    <div className="relative size-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius="58%" outerRadius="82%" paddingAngle={2}>
            {data.map((entry, i) => (
              <Cell key={entry.name} fill={CHART_COLORS[i % CHART_COLORS.length]} stroke="none" />
            ))}
          </Pie>
          <Tooltip {...tooltipStyle} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
        </PieChart>
      </ResponsiveContainer>
      {centerValue ? (
        <div className="pointer-events-none absolute inset-x-0 top-[42%] -translate-y-1/2 text-center">
          <p className="font-display text-xl font-bold">{centerValue}</p>
          {centerLabel ? <p className="text-xs text-muted-foreground">{centerLabel}</p> : null}
        </div>
      ) : null}
    </div>
  );
}
