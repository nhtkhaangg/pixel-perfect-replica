import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { CPage, Panel, meta } from "@/components/customer/common";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/format";
import { PACKAGES, type GymPackage } from "@/lib/mock/public";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/customer/packages")({
  head: () => meta("Mua gói hội viên", "Chọn và thanh toán gói hội viên GymCore."),
  component: BuyMembership,
});

const METHODS = ["Chuyển khoản ngân hàng", "Ví MoMo", "Thẻ Visa/Mastercard", "Thanh toán tại quầy"];

function BuyMembership() {
  const list = PACKAGES.filter((p) => p.category === "MEMBERSHIP");
  const [picked, setPicked] = useState<GymPackage>(list[1]!);
  const [method, setMethod] = useState(METHODS[0]!);
  const [open, setOpen] = useState(false);
  return (
    <CPage title="Mua gói hội viên" description="Gói mới sẽ được cộng nối tiếp sau ngày hết hạn gói hiện tại (07/10/2026).">
      <div className="grid gap-5 md:grid-cols-3">
        {list.map((p) => (
          <button key={p.id} type="button" onClick={() => setPicked(p)} className={cn("card-surface cursor-pointer p-5 text-left transition-colors", picked.id === p.id ? "border-primary ring-1 ring-primary/50" : "hover:border-primary/30")}>
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-bold">{p.name}</h3>
              {p.highlighted ? <span className="rounded-full bg-primary/15 px-2 py-0.5 text-xs text-primary">Phổ biến</span> : null}
            </div>
            <p className="mt-3 font-display text-2xl font-extrabold">{formatCurrency(p.price)}</p>
            <p className="text-xs text-muted-foreground">Thời hạn {p.durationLabel}</p>
            <ul className="mt-4 space-y-1.5 text-sm">
              {p.benefits.slice(0, 4).map((b) => <li key={b} className="flex gap-2"><Check size={15} className="mt-0.5 shrink-0 text-primary" />{b}</li>)}
            </ul>
          </button>
        ))}
      </div>
      <Panel title="Thanh toán">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-2">
            {METHODS.map((m) => (
              <label key={m} className={cn("flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-sm", method === m ? "border-primary/60 bg-primary/10" : "border-border")}>
                <input type="radio" name="method" checked={method === m} onChange={() => setMethod(m)} className="accent-[var(--primary)]" /> {m}
              </label>
            ))}
          </div>
          <div className="rounded-lg border border-border p-4 text-sm">
            <div className="flex justify-between py-1.5"><span className="text-muted-foreground">Gói</span><span>{picked.name}</span></div>
            <div className="flex justify-between py-1.5"><span className="text-muted-foreground">Giá gói</span><span>{formatCurrency(picked.price)}</span></div>
            <div className="flex justify-between py-1.5"><span className="text-muted-foreground">Ưu đãi hội viên cũ (5%)</span><span className="text-primary">-{formatCurrency(Math.round(picked.price * 0.05))}</span></div>
            <div className="mt-2 flex justify-between border-t border-border pt-3 font-semibold"><span>Tổng thanh toán</span><span className="font-display text-xl">{formatCurrency(Math.round(picked.price * 0.95))}</span></div>
            <Button variant="hero" className="mt-4 w-full" onClick={() => setOpen(true)}>Thanh toán</Button>
          </div>
        </div>
      </Panel>
      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title="Xác nhận mua gói"
        description={`Thanh toán ${formatCurrency(Math.round(picked.price * 0.95))} cho ${picked.name} bằng ${method}?`}
        confirmLabel="Xác nhận"
        onConfirm={() => toast.success(`Đã tạo đơn mua ${picked.name} (dữ liệu mẫu).`)}
      />
    </CPage>
  );
}
