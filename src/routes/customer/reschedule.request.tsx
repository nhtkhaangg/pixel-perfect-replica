import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { CPage, Panel, meta } from "@/components/customer/common";
import { RescheduleDialog } from "@/components/customer/RescheduleDialog";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/format";
import { SESSIONS, type Session } from "@/lib/mock/customer";

export const Route = createFileRoute("/customer/reschedule/request")({
  head: () => meta("Yêu cầu đổi lịch", "Chọn buổi tập cần đổi và đề xuất thời gian mới."),
  component: RescheduleRequest,
});

function RescheduleRequest() {
  const [target, setTarget] = useState<Session | null>(null);
  const upcoming = SESSIONS.filter((s) => s.status === "scheduled");
  return (
    <CPage title="Yêu cầu đổi lịch" description="Chọn buổi tập sắp tới bạn muốn đổi. Huấn luyện viên sẽ phản hồi trong vòng 12 giờ." actions={<Button variant="outline" asChild><Link to="/customer/reschedule/requests">Theo dõi yêu cầu</Link></Button>}>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {upcoming.map((s) => (
          <Panel key={s.id}>
            <p className="text-xs text-primary">{formatDate(s.date)} · {s.start} – {s.end}</p>
            <h2 className="mt-1 font-display text-lg font-bold">{s.title}</h2>
            <p className="text-sm text-muted-foreground">HLV {s.trainer} · {s.room}</p>
            <Button className="mt-4 w-full" onClick={() => setTarget(s)}>Đổi lịch buổi này</Button>
          </Panel>
        ))}
      </div>
      <Panel title="Quy định đổi lịch">
        <ul className="list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
          <li>Gửi yêu cầu trước giờ tập tối thiểu 6 giờ.</li>
          <li>Mỗi gói PT được đổi lịch tối đa 6 lần.</li>
          <li>Buổi vắng mặt không báo trước sẽ bị tính là đã sử dụng.</li>
        </ul>
      </Panel>
      <RescheduleDialog session={target} open={!!target} onOpenChange={(o) => !o && setTarget(null)} />
    </CPage>
  );
}
