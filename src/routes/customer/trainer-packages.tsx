import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { CPage, Field, Panel, meta } from "@/components/customer/common";
import { InitialsAvatar, Stars } from "@/components/public/blocks";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/format";
import { PACKAGES, TRAINERS } from "@/lib/mock/public";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/customer/trainer-packages")({
  head: () => meta("Đặt gói huấn luyện viên cá nhân", "Chọn huấn luyện viên và gói PT phù hợp."),
  component: TrainerPackages,
});

function TrainerPackages() {
  const pts = PACKAGES.filter((p) => p.category === "PT");
  const [trainerId, setTrainerId] = useState(TRAINERS[0]!.id);
  const [pkgId, setPkgId] = useState(pts[1]!.id);
  const trainer = TRAINERS.find((t) => t.id === trainerId)!;
  const pkg = pts.find((p) => p.id === pkgId)!;
  return (
    <CPage
      title="Đặt gói huấn luyện viên cá nhân"
      description="Bước 1: chọn huấn luyện viên · Bước 2: chọn gói · Bước 3: gửi yêu cầu"
      actions={<Button variant="outline" asChild><Link to="/customer/trainer-recommendations">Xem gợi ý phù hợp</Link></Button>}
    >
      <Panel title="1. Chọn huấn luyện viên">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {TRAINERS.map((t) => (
            <button key={t.id} type="button" onClick={() => setTrainerId(t.id)} className={cn("flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-left", trainerId === t.id ? "border-primary bg-primary/10" : "border-border hover:border-primary/30")}>
              <InitialsAvatar name={t.name} className="size-11 text-sm" />
              <span className="min-w-0 flex-1">
                <span className="block font-medium">{t.name}</span>
                <span className="block truncate text-xs text-muted-foreground">{t.specialty}</span>
                <span className="mt-1 flex items-center gap-1 text-xs"><Stars value={t.rating} size={11} /> {t.rating.toLocaleString("vi-VN")}</span>
              </span>
            </button>
          ))}
        </div>
      </Panel>
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <Panel title="2. Chọn gói PT">
          <div className="space-y-3">
            {pts.map((p) => (
              <label key={p.id} className={cn("flex cursor-pointer items-center gap-4 rounded-lg border p-4", pkgId === p.id ? "border-primary bg-primary/10" : "border-border")}>
                <input type="radio" checked={pkgId === p.id} onChange={() => setPkgId(p.id)} className="accent-[var(--primary)]" />
                <span className="flex-1"><span className="block font-medium">{p.name}</span><span className="text-xs text-muted-foreground">{p.sessions} buổi · trong {p.durationLabel}</span></span>
                <span className="text-right"><span className="block font-semibold">{formatCurrency(p.price)}</span><span className="text-xs text-muted-foreground">{formatCurrency(Math.round(p.price / (p.sessions ?? 1)))}/buổi</span></span>
              </label>
            ))}
          </div>
          <div className="mt-4"><Field label="Ghi chú cho huấn luyện viên"><Textarea rows={3} placeholder="Ví dụ: ưu tiên buổi tối thứ 2, 4, 6; có tiền sử đau gối." /></Field></div>
        </Panel>
        <Panel title="3. Xác nhận">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Huấn luyện viên</span><span>{trainer.name}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Gói</span><span>{pkg.name}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Số buổi</span><span>{pkg.sessions} buổi</span></div>
            <div className="flex justify-between border-t border-border pt-3 font-semibold"><span>Tổng tiền</span><span className="font-display text-xl">{formatCurrency(pkg.price)}</span></div>
          </div>
          <Button variant="hero" className="mt-5 w-full" onClick={() => toast.success(`Đã gửi yêu cầu đặt ${pkg.name} với ${trainer.name}. Huấn luyện viên sẽ xác nhận trong 24 giờ (dữ liệu mẫu).`)}>Gửi yêu cầu đặt gói</Button>
          <p className="mt-3 text-xs text-muted-foreground">Bạn chỉ thanh toán sau khi huấn luyện viên xác nhận lịch.</p>
        </Panel>
      </div>
    </CPage>
  );
}
