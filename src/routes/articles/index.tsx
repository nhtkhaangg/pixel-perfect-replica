import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { PublicLayout } from "@/components/layout/PublicLayout";
import { ArticleTile } from "@/components/public/ArticleTile";
import { Container, PublicPageHero } from "@/components/public/blocks";
import { ARTICLES } from "@/lib/mock/public";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/articles/")({
  head: () => ({
    meta: [
      { title: "Kiến thức thể hình — Blog GymCore" },
      { name: "description", content: "Bài viết về tập luyện, dinh dưỡng và phục hồi từ đội ngũ huấn luyện viên GymCore." },
      { property: "og:title", content: "Kiến thức thể hình — GymCore" },
      { property: "og:description", content: "Mẹo tập luyện, dinh dưỡng và phục hồi dễ áp dụng mỗi ngày." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ArticlesPage,
});

function ArticlesPage() {
  const cats = ["Tất cả", ...new Set(ARTICLES.map((a) => a.category))];
  const [cat, setCat] = useState("Tất cả");
  const list = ARTICLES.filter((a) => cat === "Tất cả" || a.category === cat);
  return (
    <PublicLayout>
      <PublicPageHero title="Kiến thức thể hình" description="Chia sẻ thực tế từ huấn luyện viên của phòng tập giúp bạn tập đúng, ăn đủ và phục hồi tốt." crumbs={[{ label: "Kiến thức" }]}>
        <div className="flex flex-wrap gap-2 pt-2">
          {cats.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={cn("cursor-pointer rounded-full border px-4 py-1.5 text-sm", cat === c ? "border-primary bg-primary/15 text-primary" : "border-border text-muted-foreground hover:text-foreground")}>{c}</button>
          ))}
        </div>
      </PublicPageHero>
      <Container className="grid gap-6 py-14 md:grid-cols-2 lg:grid-cols-3">
        {list.map((a, i) => <ArticleTile key={a.id} article={a} index={i} />)}
      </Container>
    </PublicLayout>
  );
}
