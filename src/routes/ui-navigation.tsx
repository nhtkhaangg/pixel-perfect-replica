import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Compass } from "lucide-react";

import { Logo } from "@/components/brand/Logo";
import { AppLink } from "@/components/shared/AppLink";
import { ROLE_AREAS } from "@/components/layout/nav-config";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";

export const Route = createFileRoute("/ui-navigation")({
  head: () => ({
    meta: [
      { title: "Điều hướng kiểm thử giao diện — GymCore" },
      {
        name: "description",
        content: "Danh sách liên kết tới mọi trang giao diện của GymCore để kiểm thử nhanh.",
      },
      { property: "og:title", content: "Điều hướng kiểm thử giao diện — GymCore" },
      {
        property: "og:description",
        content: "Truy cập nhanh mọi trang giao diện theo từng vai trò.",
      },
    ],
  }),
  component: UiNavigationPage,
});

const PUBLIC_LINKS = [
  { label: "Trang giới thiệu phòng tập", to: "/" },
  { label: "Đăng nhập", to: "/login" },
  { label: "Đăng ký", to: "/register" },
];

function LinkRow({ label, to }: { label: string; to: string }) {
  return (
    <AppLink
      to={to}
      className="flex items-center justify-between gap-3 rounded-md border border-border px-4 py-3 text-sm transition-colors hover:border-primary/40 hover:bg-accent/50"
    >
      <span>{label}</span>
      <span className="flex items-center gap-2 text-xs text-muted-foreground">
        {to}
        <ArrowRight size={14} className="text-primary" />
      </span>
    </AppLink>
  );
}

function UiNavigationPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:px-6 md:py-14">
      <Link to="/" className="inline-block">
        <Logo />
      </Link>

      <PageHeader
        className="mt-8"
        title="Điều hướng kiểm thử giao diện"
        description="Trang dành cho quá trình phát triển: mở trực tiếp mọi giao diện theo vai trò, không cần đăng nhập."
        breadcrumbs={[{ label: "Trang chủ", to: "/" }, { label: "Điều hướng kiểm thử" }]}
        actions={<StatusBadge tone="info" label="Chỉ dùng khi phát triển" />}
      />

      <section className="mt-8 space-y-3">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <Compass size={18} className="text-primary" /> Trang công khai
        </h2>
        <div className="grid gap-2 md:grid-cols-2">
          {PUBLIC_LINKS.map((item) => (
            <LinkRow key={item.to} {...item} />
          ))}
        </div>
      </section>

      {Object.values(ROLE_AREAS).map((area) => (
        <section key={area.key} className="mt-10 space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-lg font-semibold">{area.roleLabel}</h2>
            <StatusBadge tone="neutral" label={area.areaLabel} />
          </div>
          {area.groups.map((group) => (
            <div key={group.title} className="space-y-2">
              <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                {group.title}
              </p>
              <div className="grid gap-2 md:grid-cols-2">
                {group.items.map((item) => (
                  <LinkRow key={item.to} label={item.label} to={item.to} />
                ))}
              </div>
            </div>
          ))}
        </section>
      ))}

      <p className="mt-12 text-sm text-muted-foreground">
        Các trang chi tiết theo từng vai trò sẽ được bổ sung ở các bước tiếp theo. Liên kết chưa có
        trang sẽ hiển thị thông báo “Không tìm thấy trang”.
      </p>
    </div>
  );
}
