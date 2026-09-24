import { useState } from "react";
import { toast } from "sonner";

import { Field } from "@/components/customer/common";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatDate } from "@/lib/format";
import type { Session } from "@/lib/mock/customer";

export function RescheduleDialog({ session, open, onOpenChange }: { session: Session | null; open: boolean; onOpenChange: (o: boolean) => void }) {
  const [reason, setReason] = useState("");
  if (!session) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Yêu cầu đổi lịch</DialogTitle>
          <DialogDescription>
            {session.title} · {formatDate(session.date)} lúc {session.start} với HLV {session.trainer}
          </DialogDescription>
        </DialogHeader>
        <form
          id="reschedule-form"
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (reason.trim().length < 5) { toast.error("Vui lòng nhập lý do đổi lịch."); return; }
            toast.success("Đã gửi yêu cầu đổi lịch tới huấn luyện viên (dữ liệu mẫu).");
            setReason("");
            onOpenChange(false);
          }}
        >
          <div className="grid grid-cols-2 gap-3">
            <Field label="Ngày mới"><Input type="date" defaultValue={session.date} /></Field>
            <Field label="Giờ mới"><Input type="time" defaultValue="19:00" /></Field>
          </div>
          <Field label="Lý do"><Textarea rows={3} value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Ví dụ: tăng ca đột xuất" /></Field>
          <p className="text-xs text-muted-foreground">Yêu cầu cần gửi trước buổi tập ít nhất 6 giờ để không bị trừ buổi.</p>
        </form>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Huỷ</Button>
          <Button type="submit" form="reschedule-form">Gửi yêu cầu</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
