import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
const MONTHS = [
  "Tháng 1",
  "Tháng 2",
  "Tháng 3",
  "Tháng 4",
  "Tháng 5",
  "Tháng 6",
  "Tháng 7",
  "Tháng 8",
  "Tháng 9",
  "Tháng 10",
  "Tháng 11",
  "Tháng 12",
];

export type CalendarEvent = {
  /** Ngày trong tháng (1-31). */
  day: number;
  label: string;
  time?: string;
  tone?: "primary" | "cyan" | "warning";
};

/** Lịch tháng dùng cho lịch tập, lịch ca dạy. */
export function ScheduleCalendar({
  events = [],
  initialMonth = new Date(),
  onSelectDay,
  className,
}: {
  events?: CalendarEvent[];
  initialMonth?: Date;
  onSelectDay?: (day: number) => void;
  className?: string;
}) {
  const [cursor, setCursor] = useState(
    new Date(initialMonth.getFullYear(), initialMonth.getMonth(), 1),
  );
  const [selected, setSelected] = useState<number | null>(null);

  const daysInMonth = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate();
  const firstWeekday = (new Date(cursor.getFullYear(), cursor.getMonth(), 1).getDay() + 6) % 7;
  const today = new Date();
  const isCurrentMonth =
    today.getMonth() === cursor.getMonth() && today.getFullYear() === cursor.getFullYear();

  const toneClass = {
    primary: "bg-primary/15 text-primary",
    cyan: "bg-cyan/15 text-cyan",
    warning: "bg-warning/15 text-warning",
  } as const;

  return (
    <section className={cn("card-surface p-5", className)}>
      <header className="mb-4 flex items-center justify-between gap-2">
        <h3 className="font-semibold">
          {MONTHS[cursor.getMonth()]} {cursor.getFullYear()}
        </h3>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            aria-label="Tháng trước"
            onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
          >
            <ChevronLeft size={16} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            aria-label="Tháng sau"
            onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
          >
            <ChevronRight size={16} />
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground">
        {WEEKDAYS.map((d) => (
          <div key={d} className="py-1">
            {d}
          </div>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-1">
        {Array.from({ length: firstWeekday }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const dayEvents = events.filter((e) => e.day === day);
          const isToday = isCurrentMonth && today.getDate() === day;
          return (
            <button
              key={day}
              type="button"
              onClick={() => {
                setSelected(day);
                onSelectDay?.(day);
              }}
              className={cn(
                "min-h-20 cursor-pointer rounded-md border border-border/60 p-1.5 text-left align-top transition-colors hover:border-primary/40 hover:bg-accent/50",
                selected === day && "border-primary bg-primary/10",
              )}
            >
              <span
                className={cn(
                  "inline-grid size-6 place-items-center rounded-md text-xs",
                  isToday ? "bg-primary font-semibold text-primary-foreground" : "text-foreground",
                )}
              >
                {day}
              </span>
              <span className="mt-1 block space-y-1">
                {dayEvents.slice(0, 2).map((event) => (
                  <span
                    key={event.label}
                    className={cn(
                      "block truncate rounded px-1 py-0.5 text-[11px]",
                      toneClass[event.tone ?? "primary"],
                    )}
                  >
                    {event.time ? `${event.time} ` : ""}
                    {event.label}
                  </span>
                ))}
                {dayEvents.length > 2 ? (
                  <span className="block px-1 text-[11px] text-muted-foreground">
                    +{dayEvents.length - 2} ca khác
                  </span>
                ) : null}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
