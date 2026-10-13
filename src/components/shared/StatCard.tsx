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
    <div className={cn("card-surface p-3.5 sm:p-5 flex flex-col justify-between", className)}>
      <div className="flex items-start justify-between gap-2 sm:gap-3">
        <p className="text-xs sm:text-sm text-muted-foreground">{label}</p>
        {Icon ? (
          <span className="grid size-7 sm:size-8 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">
            <Icon className="size-3.5 sm:size-4" />
          </span>
        ) : (
          badge
        )}
      </div>
      <div className="mt-2.5 sm:mt-3 flex flex-wrap items-baseline gap-1.5 sm:gap-2">
        <p className="font-display text-xl sm:text-2xl font-bold tracking-tight">{value}</p>
        {trend ? (
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] sm:text-xs font-medium",
              trend.direction === "up"
                ? "bg-success/12 text-success"
                : "bg-destructive/12 text-destructive",
            )}
          >
            {trend.direction === "up" ? <ArrowUpRight className="size-3 sm:size-3.5" /> : <ArrowDownRight className="size-3 sm:size-3.5" />}
            {trend.value}
          </span>
        ) : null}
      </div>
      {hint ? <p className="mt-1.5 sm:mt-2 text-[11px] sm:text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}
