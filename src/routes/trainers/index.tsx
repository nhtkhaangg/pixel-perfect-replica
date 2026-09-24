import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useState } from "react";

import { PublicLayout } from "@/components/layout/PublicLayout";
import { Container, PublicPageHero } from "@/components/public/blocks";
import { TrainerTile } from "@/components/public/TrainerTile";
import { EmptyState } from "@/components/shared/states";
import { Input } from "@/components/ui/input";
import { TRAINERS } from "@/lib/mock/public";

export const Route = createFileRoute("/trainers/")({
  head: () => ({
    meta: [
      { title: "Đội ngũ huấn luyện viên — GymCore" },
      { name: "description", content: "Gặp gỡ 6 huấn luyện viên cá nhân có chứng chỉ quốc tế tại GymCore Quận 3." },
      { property: "og:title", content: "Đội ngũ huấn luyện viên — GymCore" },
      { property: "og:description", content: "Chọn huấn luyện viên phù hợp với mục tiêu tăng cơ, giảm mỡ, yoga hay phục hồi." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: TrainersPage,
});

function TrainersPage() {
  const [q, setQ] = useState("");
  const list = TRAINERS.filter((t) =>
    `${t.name} ${t.specialty} ${t.tags.join(" ")}`.toLowerCase().includes(q.trim().toLowerCase()),
  );
  return (
    <PublicLayout>
      <PublicPageHero
        title="Đội ngũ huấn luyện viên"
        description="Mỗi huấn luyện viên đều có chứng chỉ chuyên môn và được hội viên đánh giá sau từng chu kỳ tập luyện."
        crumbs={[{ label: "Huấn luyện viên" }]}
      >
        <div className="relative max-w-md pt-2">
          <Search size={16} className="absolute top-1/2 left-3 mt-1 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Tìm theo tên hoặc chuyên môn…" className="pl-9" />
        </div>
      </PublicPageHero>
      <Container className="py-14">
        {list.length ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{list.map((t) => <TrainerTile key={t.id} trainer={t} />)}</div>
        ) : (
          <EmptyState title="Không tìm thấy huấn luyện viên" description="Thử tìm với từ khoá khác, ví dụ “Yoga” hoặc “Giảm mỡ”." />
        )}
      </Container>
    </PublicLayout>
  );
}
