import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { CPage, Panel, meta } from "@/components/customer/common";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/format";
import { SESSIONS } from "@/lib/mock/customer";

export const Route = createFileRoute("/customer/session-verification")({
  head: () => meta("Xác nhận hoàn thành buổi tập", "Xác nhận buổi PT đã diễn ra để trừ buổi trong gói."),
  component: Verification,
});

function Verification() {
  const [rows, setRows] = useState(
    SESSIONS.filter((s) => s.status === "completed").map((s, i) => ({ ...s, verify: i < 2 ? ("pending" as string) : "approved", duration: [58, 62, 60][i] ?? 60 })),
  );
  const [dispute, setDispute] = useState<string | null>(null);
  return (
    <CPage title="Xác nhận hoàn thành buổi tập" description="Huấn luyện viên đã đánh dấu các buổi dưới đây là hoàn thành. Vui lòng xác nhận trong vòng 24 giờ.">
      <div className="space-y-4">
        {rows.map((s) => (
          <Panel key={s.id}>
            <div className="flex flex-wrap items-center gap-4">
              <div className="min-w-48 flex-1">
                <p className="text-xs text-muted-foreground">{formatDate(s.date)} · {s.start} – {s.end} · {s.duration} phút</p>
                <h2 className="font-semibold">{s.title}</h2>
                <p className="text-sm text-muted-foreground">HLV {s.trainer} · {s.room}</p>
              </div>
              <StatusBadge status={s.verify} {...(s.verify === "approved" ? { label: "Đã xác nhận" } : s.verify === "pending" ? { label: "Chờ bạn xác nhận" } : { label: "Đang khiếu nại" })} />
              {s.verify === "pending" ? (
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => { setRows(rows.map((r) => (r.id === s.id ? { ...r, verify: "approved" } : r))); toast.success("Đã xác nhận buổi tập. Gói PT được trừ 1 buổi."); }}>Xác nhận</Button>
                  <Button size="sm" variant="outline" onClick={() => setDispute(s.id)}>Không đúng</Button>
                </div>
              ) : null}
            </div>
          </Panel>
        ))}
      </div>
      <ConfirmDialog
        open={!!dispute}
        onOpenChange={(o) => !o && setDispute(null)}
        title="Báo cáo buổi tập không đúng?"
        description="Quản lý phòng tập sẽ kiểm tra lịch sử check-in và liên hệ với bạn trong 24 giờ."
        confirmLabel="Gửi khiếu nại"
        destructive
        onConfirm={() => { setRows(rows.map((r) => (r.id === dispute ? { ...r, verify: "warning" } : r))); toast.success("Đã gửi khiếu nại (dữ liệu mẫu)."); }}
      />
    </CPage>
  );
}
