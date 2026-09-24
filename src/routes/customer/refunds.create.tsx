import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { CPage, Field, Panel, meta } from "@/components/customer/common";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/format";
import { MY_PACKAGES } from "@/lib/mock/customer";

export const Route = createFileRoute("/customer/refunds/create")({
  head: () => meta("Yêu cầu hoàn tiền", "Gửi yêu cầu hoàn tiền cho gói tập đang sử dụng."),
  component: Refund,
});

const REASONS = ["Chuyển nơi ở/công tác", "Vấn đề sức khoẻ", "Không hài lòng với dịch vụ", "Thanh toán trùng", "Khác"];

function Refund() {
  const active = MY_PACKAGES.filter((p) => p.status === "active");
  const [pkgId, setPkgId] = useState(active[1]!.id);
  const [reason, setReason] = useState("");
  const [agree, setAgree] = useState(false);
  const pkg = active.find((p) => p.id === pkgId)!;
  const estimate = pkg.totalSessions ? Math.round((pkg.price / pkg.totalSessions) * (pkg.totalSessions - pkg.usedSessions) * 0.8) : Math.round(pkg.price * 0.1 * 0.8);
  return (
    <CPage title="Yêu cầu hoàn tiền" parent={{ label: "Gói tập đã mua", to: "/customer/my-packages" }}>
      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <Panel>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (!reason) { toast.error("Vui lòng chọn lý do hoàn tiền."); return; }
              if (!agree) { toast.error("Bạn cần đồng ý với chính sách hoàn tiền."); return; }
              toast.success("Đã gửi yêu cầu hoàn tiền. Quản lý sẽ phản hồi trong 3 ngày làm việc (dữ liệu mẫu).");
            }}
          >
            <Field label="Gói cần hoàn tiền">
              <Select value={pkgId} onValueChange={setPkgId}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{active.map((p) => <SelectItem key={p.id} value={p.id}>{p.name} ({p.id})</SelectItem>)}</SelectContent>
              </Select>
            </Field>
            <Field label="Lý do">
              <Select value={reason} onValueChange={setReason}>
                <SelectTrigger><SelectValue placeholder="Chọn lý do" /></SelectTrigger>
                <SelectContent>{REASONS.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
              </Select>
            </Field>
            <Field label="Mô tả chi tiết"><Textarea rows={4} placeholder="Trình bày ngắn gọn hoàn cảnh của bạn…" /></Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Ngân hàng nhận tiền"><Input defaultValue="Vietcombank" /></Field>
              <Field label="Số tài khoản"><Input defaultValue="0071 0003 12345" /></Field>
            </div>
            <label className="flex cursor-pointer items-start gap-2 text-sm text-muted-foreground"><Checkbox checked={agree} onCheckedChange={(v) => setAgree(v === true)} className="mt-0.5" /> Tôi đã đọc và đồng ý với chính sách hoàn tiền: hoàn 80% giá trị buổi chưa sử dụng, phí xử lý 20%.</label>
            <Button type="submit">Gửi yêu cầu</Button>
          </form>
        </Panel>
        <Panel title="Ước tính hoàn tiền">
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">Giá gói</dt><dd>{formatCurrency(pkg.price)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Đã sử dụng</dt><dd>{pkg.totalSessions ? `${pkg.usedSessions}/${pkg.totalSessions} buổi` : "Gần 90% thời hạn"}</dd></div>
            <div className="flex justify-between border-t border-border pt-3 font-semibold"><dt>Dự kiến nhận</dt><dd className="font-display text-xl text-primary">{formatCurrency(estimate)}</dd></div>
          </dl>
          <p className="mt-3 text-xs text-muted-foreground">Số tiền chính xác do quản lý phòng tập xác nhận.</p>
        </Panel>
      </div>
    </CPage>
  );
}
