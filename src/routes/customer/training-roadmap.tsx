import { createFileRoute } from "@tanstack/react-router";
import { Check, Circle, Flag } from "lucide-react";

import { CPage, Panel, ProgressBar, meta } from "@/components/customer/common";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ME, ROADMAP } from "@/lib/mock/customer";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/customer/training-roadmap")({
  head: () => meta("Lộ trình tập luyện", "Các giai đoạn tập luyện do huấn luyện viên thiết kế."),
  component: Roadmap,
});

function Roadmap() {
  return (
    <CPage title="Lộ trình tập luyện" description={`Mục tiêu: ${ME.goal} · Thiết kế bởi HLV ${ME.trainerName}`}>
      <Panel>
        <div className="mb-2 flex justify-between text-sm"><span className="text-muted-foreground">Tiến độ tổng thể</span><span>Tuần 12/22</span></div>
        <ProgressBar value={(12 / 22) * 100} />
      </Panel>
      <ol className="relative space-y-6 border-l border-border pl-8">
        {ROADMAP.map((p) => (
          <li key={p.phase} className="relative">
            <span className={cn("absolute -left-[45px] grid size-8 place-items-center rounded-full border", p.status === "completed" ? "border-primary bg-primary text-primary-foreground" : p.status === "active" ? "border-primary bg-background text-primary" : "border-border bg-background text-muted-foreground")}>
              {p.status === "completed" ? <Check size={15} /> : p.status === "active" ? <Flag size={14} /> : <Circle size={10} />}
            </span>
            <div className={cn("card-surface p-5", p.status === "active" && "border-primary/50")}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div><p className="text-xs text-primary">{p.phase} · {p.weeks}</p><h2 className="font-display text-lg font-bold">{p.title}</h2></div>
                <StatusBadge status={p.status === "active" ? "processing" : p.status} {...(p.status === "active" ? { label: "Đang thực hiện" } : {})} />
              </div>
              <ul className="mt-3 grid gap-2 text-sm text-muted-foreground sm:grid-cols-3">
                {p.goals.map((g) => <li key={g} className="rounded-md border border-border p-2.5">{g}</li>)}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </CPage>
  );
}
