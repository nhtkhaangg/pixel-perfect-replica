import { createFileRoute } from "@tanstack/react-router";
import { Clock } from "lucide-react";
import { toast } from "sonner";

import { CPage, Panel, meta } from "@/components/customer/common";
import { Button } from "@/components/ui/button";
import { SAMPLE_WORKOUTS } from "@/lib/mock/customer";

export const Route = createFileRoute("/customer/sample-workouts")({
  head: () => meta("Giáo án tập thử", "Các giáo án mẫu để bạn tự tập khi không có buổi PT."),
  component: Samples,
});

function Samples() {
  return (
    <CPage title="Giáo án tập thử" description="Giáo án mẫu do đội ngũ huấn luyện viên biên soạn, phù hợp để tự tập ngoài buổi PT.">
      <div className="grid gap-5 md:grid-cols-2">
        {SAMPLE_WORKOUTS.map((w) => (
          <Panel key={w.id}>
            <div className="flex items-start justify-between gap-3">
              <div><p className="text-xs text-primary">{w.level} · {w.focus}</p><h2 className="font-display text-lg font-bold">{w.name}</h2></div>
              <span className="flex items-center gap-1 text-sm text-muted-foreground"><Clock size={14} /> {w.duration} phút</span>
            </div>
            <ol className="mt-4 space-y-2 text-sm">
              {w.exercises.map((e, i) => <li key={e} className="flex gap-3 rounded-md border border-border px-3 py-2"><span className="text-muted-foreground">{i + 1}.</span>{e}</li>)}
            </ol>
            <Button className="mt-4 w-full" variant="outline" onClick={() => toast.success(`Đã thêm “${w.name}” vào lịch tập hôm nay (dữ liệu mẫu).`)}>Thêm vào lịch tập</Button>
          </Panel>
        ))}
      </div>
    </CPage>
  );
}
