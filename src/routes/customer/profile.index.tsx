import { Link, createFileRoute } from "@tanstack/react-router";
import { KeyRound, Pencil } from "lucide-react";

import { CPage, Panel, meta } from "@/components/customer/common";
import { InitialsAvatar } from "@/components/public/blocks";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/format";
import { BODY_METRICS, ME, MY_PACKAGES } from "@/lib/mock/customer";

export const Route = createFileRoute("/customer/profile/")({
  head: () => meta("Hồ sơ của tôi", "Thông tin cá nhân và gói tập của hội viên."),
  component: ProfilePage,
});

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 py-3 sm:grid-cols-[180px_1fr]">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="text-sm">{value}</dd>
    </div>
  );
}

function ProfilePage() {
  const active = MY_PACKAGES.filter((p) => p.status === "active");
  const last = BODY_METRICS.at(-1)!;
  return (
    <CPage
      title="Hồ sơ của tôi"
      actions={
        <div className="flex gap-2">
          <Button variant="outline" asChild><Link to="/customer/change-password"><KeyRound size={15} /> Đổi mật khẩu</Link></Button>
          <Button asChild><Link to="/customer/profile/edit"><Pencil size={15} /> Cập nhật hồ sơ</Link></Button>
        </div>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <Panel className="text-center">
          <InitialsAvatar name={ME.fullName} className="mx-auto size-24 text-3xl" />
          <h2 className="mt-4 font-display text-xl font-bold">{ME.fullName}</h2>
          <p className="text-sm text-muted-foreground">Mã hội viên {ME.id}</p>
          <div className="mt-3 flex justify-center"><StatusBadge status="active" /></div>
          <dl className="mt-6 grid grid-cols-3 gap-2 border-t border-border pt-4 text-center">
            <div><dt className="text-xs text-muted-foreground">Chiều cao</dt><dd className="font-semibold">{ME.height} cm</dd></div>
            <div><dt className="text-xs text-muted-foreground">Cân nặng</dt><dd className="font-semibold">{last.weight.toLocaleString("vi-VN")} kg</dd></div>
            <div><dt className="text-xs text-muted-foreground">Tỉ lệ mỡ</dt><dd className="font-semibold">{last.bodyFat.toLocaleString("vi-VN")}%</dd></div>
          </dl>
        </Panel>
        <div className="space-y-6">
          <Panel title="Thông tin cá nhân">
            <dl className="divide-y divide-border">
              <Row label="Họ và tên" value={ME.fullName} />
              <Row label="Email" value={ME.email} />
              <Row label="Số điện thoại" value={ME.phone} />
              <Row label="Giới tính" value={ME.gender} />
              <Row label="Ngày sinh" value={formatDate(ME.birthday)} />
              <Row label="Địa chỉ" value={ME.address} />
              <Row label="Liên hệ khẩn cấp" value={ME.emergencyContact} />
            </dl>
          </Panel>
          <Panel title="Tập luyện">
            <dl className="divide-y divide-border">
              <Row label="Ngày tham gia" value={formatDate(ME.joinedAt)} />
              <Row label="Mục tiêu" value={ME.goal} />
              <Row label="Huấn luyện viên" value={ME.trainerName} />
              <Row label="Gói đang dùng" value={active.map((p) => p.name).join(", ")} />
            </dl>
          </Panel>
        </div>
      </div>
    </CPage>
  );
}
