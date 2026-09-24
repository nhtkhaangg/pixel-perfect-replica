import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { PublicLayout } from "@/components/layout/PublicLayout";
import { Container, InitialsAvatar, PublicPageHero, Stars } from "@/components/public/blocks";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatDate } from "@/lib/format";
import { REVIEWS, avgRating } from "@/lib/mock/public";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Đánh giá của hội viên — GymCore" },
      { name: "description", content: "Hội viên chấm GymCore 4,5/5 về huấn luyện viên, lớp nhóm và cơ sở vật chất." },
      { property: "og:title", content: "Hội viên nói gì về GymCore" },
      { property: "og:description", content: "Đánh giá thật từ hội viên về trải nghiệm tập luyện tại GymCore." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ReviewsPage,
});

function ReviewsPage() {
  const avg = avgRating(REVIEWS);
  const topics = ["Tất cả", ...new Set(REVIEWS.map((r) => r.topic))];
  const [topic, setTopic] = useState("Tất cả");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const list = REVIEWS.filter((r) => topic === "Tất cả" || r.topic === topic);

  return (
    <PublicLayout>
      <PublicPageHero title="Đánh giá phòng gym" description="Những chia sẻ thật từ hội viên đang tập luyện tại GymCore Quận 3." crumbs={[{ label: "Đánh giá" }]} />
      <Container className="grid gap-8 py-12 lg:grid-cols-[1fr_2fr]">
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="card-surface p-6">
            <p className="font-display text-5xl font-extrabold">{avg.toFixed(1).replace(".", ",")}</p>
            <Stars value={avg} size={18} />
            <p className="mt-1 text-sm text-muted-foreground">Dựa trên {REVIEWS.length} đánh giá gần đây</p>
            <div className="mt-5 space-y-2">
              {[5, 4, 3, 2, 1].map((s) => {
                const n = REVIEWS.filter((r) => r.rating === s).length;
                return (
                  <div key={s} className="flex items-center gap-3 text-xs">
                    <span className="w-8">{s} sao</span>
                    <span className="h-2 flex-1 overflow-hidden rounded-full bg-muted"><span className="block h-full bg-primary" style={{ width: `${(n / REVIEWS.length) * 100}%` }} /></span>
                    <span className="w-4 text-muted-foreground">{n}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <form
            className="card-surface space-y-3 p-6"
            onSubmit={(e) => {
              e.preventDefault();
              if (text.trim().length < 10) { toast.error("Nội dung đánh giá cần ít nhất 10 ký tự."); return; }
              setText("");
              toast.success("Cảm ơn bạn! Đánh giá sẽ hiển thị sau khi được duyệt (dữ liệu mẫu).");
            }}
          >
            <h2 className="font-semibold">Viết đánh giá</h2>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <button type="button" key={s} onClick={() => setRating(s)} aria-label={`${s} sao`} className={cn("cursor-pointer text-2xl", s <= rating ? "text-warning" : "text-muted-foreground/40")}>★</button>
              ))}
            </div>
            <Textarea value={text} onChange={(e) => setText(e.target.value)} rows={4} placeholder="Chia sẻ trải nghiệm của bạn…" />
            <Button type="submit" className="w-full">Gửi đánh giá</Button>
          </form>
        </aside>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {topics.map((t) => (
              <button key={t} onClick={() => setTopic(t)} className={cn("cursor-pointer rounded-full border px-4 py-1.5 text-sm", topic === t ? "border-primary bg-primary/15 text-primary" : "border-border text-muted-foreground hover:text-foreground")}>{t}</button>
            ))}
          </div>
          {list.map((r) => (
            <article key={r.id} className="card-surface p-5">
              <div className="flex flex-wrap items-center gap-3">
                <InitialsAvatar name={r.name} className="size-10 text-sm" />
                <div className="flex-1"><p className="font-semibold">{r.name}</p><p className="text-xs text-muted-foreground">{r.memberFor} · {r.topic}</p></div>
                <div className="text-right"><Stars value={r.rating} /><p className="text-xs text-muted-foreground">{formatDate(r.date)}</p></div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{r.content}</p>
            </article>
          ))}
        </div>
      </Container>
    </PublicLayout>
  );
}
