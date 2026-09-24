import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { PublicLayout } from "@/components/layout/PublicLayout";
import { PackageTile } from "@/components/public/PackageTile";
import { Container, PublicPageHero } from "@/components/public/blocks";
import { CATEGORY_LABEL, PACKAGES, type PackageCategory } from "@/lib/mock/public";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/packages/")({
  head: () => ({
    meta: [
      { title: "Bảng giá gói tập — GymCore Quận 3" },
      { name: "description", content: "Gói hội viên từ 890.000 VNĐ/tháng và gói tập cùng huấn luyện viên cá nhân tại GymCore." },
      { property: "og:title", content: "Bảng giá gói tập — GymCore" },
      { property: "og:description", content: "So sánh gói hội viên và gói PT để chọn lộ trình phù hợp." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PackagesPage,
});

const FILTERS: { key: "ALL" | PackageCategory; label: string }[] = [
  { key: "ALL", label: "Tất cả" },
  { key: "MEMBERSHIP", label: CATEGORY_LABEL.MEMBERSHIP },
  { key: "PT", label: CATEGORY_LABEL.PT },
];

function PackagesPage() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["key"]>("ALL");
  const list = PACKAGES.filter((p) => filter === "ALL" || p.category === filter);

  return (
    <PublicLayout>
      <PublicPageHero
        title="Gói tập phù hợp với mọi mục tiêu"
        description="Gói hội viên cho phép bạn tự do tập luyện, còn gói PT mang đến huấn luyện viên riêng và giáo án cá nhân hoá."
        crumbs={[{ label: "Gói tập" }]}
      >
        <div className="flex flex-wrap gap-2 pt-2">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={cn(
                "cursor-pointer rounded-full border px-4 py-1.5 text-sm transition-colors",
                filter === f.key ? "border-primary bg-primary/15 text-primary" : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </PublicPageHero>
      <Container className="grid gap-6 py-14 md:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => <PackageTile key={p.id} pkg={p} />)}
      </Container>
    </PublicLayout>
  );
}
