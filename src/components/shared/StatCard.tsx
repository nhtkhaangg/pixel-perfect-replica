import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  hint,
  trend,
  icon: Icon,
  badge,
  className,
}: {
  label: string;
  value: string;
  hint?: string;
  trend?: { value: string; direction: "up" | "down" };
  icon?: LucideIcon;
  badge?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("card-surface p-5", className)}>
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm text-muted-foreground">{label}</p>
        {Icon ? (
          <span className="grid size-8 place-items-center rounded-md bg-primary/10 text-primary">
            <Icon size={16} />
          </span>
        ) : (
          badge
        )}
      </div>
      <div className="mt-3 flex flex-wrap items-baseline gap-2">
        <p className="font-display text-2xl font-bold tracking-tight">{value}</p>
        {trend ? (
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs font-medium",
              trend.direction === "up"
                ? "bg-success/12 text-success"
                : "bg-destructive/12 text-destructive",
            )}
          >
            {trend.direction === "up" ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            {trend.value}
          </span>
        ) : null}
      </div>
      {hint ? <p className="mt-2 text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}
