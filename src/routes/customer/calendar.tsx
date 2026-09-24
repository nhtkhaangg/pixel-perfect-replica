import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { CPage, Panel, meta } from "@/components/customer/common";
import { RescheduleDialog } from "@/components/customer/RescheduleDialog";
import { ScheduleCalendar } from "@/components/shared/ScheduleCalendar";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/format";
import { SESSIONS, type Session } from "@/lib/mock/customer";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/customer/calendar")({
  head: () => meta("Lịch tập", "Lịch tập theo tháng và theo tuần của bạn."),
  component: CalendarPage,
});

const WEEK = ["2026-09-21", "2026-09-22", "2026-09-23", "2026-09-24", "2026-09-25", "2026-09-26", "2026-09-27"];
const WD = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"];

function CalendarPage() {
  const [view, setView] = useState<"week" | "month">("week");
  const [target, setTarget] = useState<Session | null>(null);
  const sorted = [...SESSIONS].sort((a, b) => a.date.localeCompare(b.date));
  const events = SESSIONS.filter((s) => s.date.startsWith("2026-09")).map((s) => ({ day: Number(s.date.slice(8)), label: s.title, time: s.start, tone: s.status === "cancelled" ? ("warning" as const) : s.trainer.startsWith("Lê") ? ("cyan" as const) : ("primary" as const) }));
  return (
    <CPage
      title="Lịch tập"
      actions={
        <div className="flex gap-1 rounded-lg border border-border p-1">
          {(["week", "month"] as const).map((v) => <button key={v} onClick={() => setView(v)} className={cn("cursor-pointer rounded-md px-3 py-1.5 text-sm", view === v ? "bg-primary/15 text-primary" : "text-muted-foreground")}>{v === "week" ? "Tuần" : "Tháng"}</button>)}
        </div>
      }
    >
      {view === "month" ? (
        <ScheduleCalendar events={events} initialMonth={new Date(2026, 8, 1)} />
      ) : (
        <Panel title="Tuần 21/09 – 27/09/2026">
          <div className="grid gap-2 md:grid-cols-7">
            {WEEK.map((d, i) => {
              const items = SESSIONS.filter((s) => s.date === d);
              return (
                <div key={d} className={cn("min-h-32 rounded-lg border p-2", d === "2026-09-25" ? "border-primary/50 bg-primary/5" : "border-border")}>
                  <p className="text-xs text-muted-foreground">{WD[i]} · {d.slice(8)}/09</p>
                  <div className="mt-2 space-y-1.5">
                    {items.map((s) => (
                      <button key={s.id} onClick={() => s.status === "scheduled" && setTarget(s)} className={cn("block w-full rounded-md border-l-2 bg-secondary/60 p-1.5 text-left text-xs", s.status === "completed" ? "border-primary" : s.status === "cancelled" ? "border-destructive opacity-60" : "cursor-pointer border-cyan hover:bg-accent")}>
                        <span className="block font-medium">{s.start} {s.title}</span>
                        <span className="text-muted-foreground">{s.trainer}</span>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Panel>
      )}
      <Panel title="Danh sách buổi tập">
        <ul className="divide-y divide-border">
          {sorted.map((s) => (
            <li key={s.id} className="flex flex-wrap items-center gap-3 py-3 text-sm">
              <span className="w-28 text-muted-foreground">{formatDate(s.date)}</span>
              <span className="w-24">{s.start} – {s.end}</span>
              <span className="min-w-40 flex-1"><span className="block font-medium">{s.title}</span><span className="text-xs text-muted-foreground">{s.trainer} · {s.room}</span></span>
              <StatusBadge status={s.status} />
              {s.status === "scheduled" ? <Button size="sm" variant="outline" onClick={() => setTarget(s)}>Đổi lịch</Button> : null}
            </li>
          ))}
        </ul>
      </Panel>
      <RescheduleDialog session={target} open={!!target} onOpenChange={(o) => !o && setTarget(null)} />
    </CPage>
  );
}
