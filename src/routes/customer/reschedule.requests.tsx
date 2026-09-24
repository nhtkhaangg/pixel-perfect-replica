import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { CPage, Panel, meta } from "@/components/customer/common";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/format";
import { RESCHEDULE_REQUESTS } from "@/lib/mock/customer";

export const Route = createFileRoute("/customer/reschedule/requests")({
  head: () => meta("Theo dõi yêu cầu đổi lịch", "Yêu cầu bạn gửi và yêu cầu từ huấn luyện viên cần bạn phản hồi."),
  component: Requests,
});

type Status = "pending" | "approved" | "rejected" | "cancelled";

function Requests() {
  const [rows, setRows] = useState(RESCHEDULE_REQUESTS.map((r) => ({ ...r, status: r.status as Status })));
  const set = (id: string, status: Status, msg: string) => { setRows(rows.map((r) => (r.id === id ? { ...r, status } : r))); toast.success(msg); };
  return (
    <CPage title="Theo dõi yêu cầu đổi lịch" actions={<Button asChild><Link to="/customer/reschedule/request">Tạo yêu cầu mới</Link></Button>}>
      <div className="space-y-4">
        {rows.map((r) => {
          const fromTrainer = r.createdBy !== "Tôi";
          return (
            <Panel key={r.id}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs text-muted-foreground">{r.id} · {fromTrainer ? `Đề xuất từ HLV ${r.createdBy}` : "Bạn gửi"}</p>
                  <h2 className="font-semibold">{r.sessionTitle}</h2>
                </div>
                <StatusBadge status={r.status} />
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
                <span className="rounded-md border border-border px-2.5 py-1 text-muted-foreground line-through">{formatDateTime(r.from)}</span>
                <ArrowRight size={15} className="text-primary" />
                <span className="rounded-md border border-primary/40 bg-primary/10 px-2.5 py-1">{formatDateTime(r.to)}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">Lý do: {r.reason}</p>
              {r.status === "pending" ? (
                <div className="mt-4 flex gap-2">
                  {fromTrainer ? (
                    <>
                      <Button size="sm" onClick={() => set(r.id, "approved", "Đã chấp nhận lịch mới.")}>Chấp nhận</Button>
                      <Button size="sm" variant="outline" onClick={() => set(r.id, "rejected", "Đã từ chối đề xuất.")}>Từ chối</Button>
                    </>
                  ) : (
                    <Button size="sm" variant="outline" onClick={() => set(r.id, "cancelled", "Đã huỷ yêu cầu.")}>Huỷ yêu cầu</Button>
                  )}
                </div>
              ) : null}
            </Panel>
          );
        })}
      </div>
    </CPage>
  );
}
