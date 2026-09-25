import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { Award, Briefcase, CalendarDays, Star } from "lucide-react";
import { toast } from "sonner";

import { PublicLayout } from "@/components/layout/PublicLayout";
import { Container, InitialsAvatar, Stars } from "@/components/public/blocks";
import { Breadcrumbs } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/format";
import { PACKAGES, REVIEWS, TRAINERS } from "@/lib/mock/public";

export const Route = createFileRoute("/trainers/$id")({
  loader: ({ params }) => {
    const trainer = TRAINERS.find((t) => t.id === params.id);
    if (!trainer) throw notFound();
    return { trainer };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Không tìm thấy huấn luyện viên — OmniGym" }, { name: "robots", content: "noindex" }] };
    const { trainer } = loaderData;
    const title = `${trainer.name} — Huấn luyện viên ${trainer.specialty} | OmniGym`;
    return {
      meta: [
        { title },
        { name: "description", content: trainer.bio },
        { property: "og:title", content: title },
        { property: "og:description", content: trainer.bio },
        { property: "og:type", content: "profile" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  notFoundComponent: TrainerNotFound,
  component: TrainerProfile,
});

function TrainerNotFound() {
  return (
    <PublicLayout>
      <Container className="py-24 text-center">
        <h1 className="font-display text-3xl font-bold">Không tìm thấy huấn luyện viên</h1>
        <Button className="mt-6" asChild><Link to="/trainers">Xem đội ngũ huấn luyện viên</Link></Button>
      </Container>
    </PublicLayout>
  );
}

function TrainerProfile() {
  const { trainer } = Route.useLoaderData();
  const ptPackages = PACKAGES.filter((p) => p.category === "PT");
  const reviews = REVIEWS.filter((r) => r.topic === "Huấn luyện viên").slice(0, 2);

  return (
    <PublicLayout>
      <section className="ambient-glow border-b border-border">
        <Container className="space-y-6 py-12">
          <Breadcrumbs items={[{ label: "Trang chủ", to: "/" }, { label: "Huấn luyện viên", to: "/trainers" }, { label: trainer.name }]} />
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <InitialsAvatar name={trainer.name} className="size-28 text-4xl" />
            <div className="flex-1 space-y-2">
              <h1 className="font-display text-4xl font-extrabold md:text-5xl">{trainer.name}</h1>
              <p className="text-lg text-primary">{trainer.specialty}</p>
              <div className="flex flex-wrap gap-5 text-sm text-muted-foreground">
                <span className="flex items-center gap-2"><Stars value={trainer.rating} /> <b className="text-foreground">{trainer.rating.toFixed(1).replace(".", ",")}</b> / 5 ({trainer.reviewCount} đánh giá)</span>
                <span className="flex items-center gap-1.5"><Briefcase size={15} /> {trainer.experienceYears} năm kinh nghiệm</span>
              </div>
            </div>
            <Button variant="hero" size="lg" asChild>
              <Link to="/packages" >Đặt gói PT</Link>
            </Button>
          </div>
        </Container>
      </section>

      <Container className="grid gap-8 py-12 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6">
          <section className="card-surface p-6">
            <h2 className="font-display text-xl font-bold">Giới thiệu</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{trainer.bio}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {trainer.tags.map((t) => <span key={t} className="rounded-md border border-border px-2.5 py-1 text-xs">{t}</span>)}
            </div>
          </section>
          <section className="card-surface p-6">
            <h2 className="flex items-center gap-2 font-display text-xl font-bold"><Award size={18} className="text-primary" />Chứng chỉ</h2>
            <ul className="mt-4 divide-y divide-border">
              {trainer.certificates.map((c) => (
                <li key={c.name} className="flex flex-wrap items-center justify-between gap-2 py-3 text-sm">
                  <span><span className="block font-medium">{c.name}</span><span className="text-muted-foreground">{c.issuer}</span></span>
                  <span className="text-muted-foreground">Năm {c.year}</span>
                </li>
              ))}
            </ul>
          </section>
          <section className="card-surface p-6">
            <h2 className="flex items-center gap-2 font-display text-xl font-bold"><Star size={18} className="text-primary" />Hội viên nhận xét</h2>
            <div className="mt-4 space-y-4">
              {reviews.map((r) => (
                <blockquote key={r.id} className="rounded-lg border border-border p-4 text-sm">
                  <Stars value={r.rating} /><p className="mt-2 text-muted-foreground">“{r.content}”</p>
                  <footer className="mt-2 font-medium">{r.name}</footer>
                </blockquote>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="card-surface p-6">
            <h2 className="flex items-center gap-2 font-display text-xl font-bold"><CalendarDays size={18} className="text-primary" />Lịch trống tuần này</h2>
            <div className="mt-4 space-y-3">
              {trainer.schedule.map((d) => (
                <div key={d.day} className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="w-20 text-muted-foreground">{d.day}</span>
                  {d.slots.map((s) => (
                    <button key={s} onClick={() => toast.success(`Đã giữ chỗ ${s} ${d.day}. Đăng nhập để xác nhận (dữ liệu mẫu).`)} className="cursor-pointer rounded-md border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs text-primary hover:bg-primary/20">{s}</button>
                  ))}
                </div>
              ))}
            </div>
          </section>
          <section className="card-surface p-6">
            <h2 className="font-display text-xl font-bold">Gói PT</h2>
            <ul className="mt-4 space-y-2">
              {ptPackages.map((p) => (
                <li key={p.id}>
                  <Link to="/packages/$id" params={{ id: p.id }} className="flex items-center justify-between rounded-lg border border-border p-3 text-sm hover:border-primary/40">
                    <span>{p.name}</span><span className="font-semibold">{formatCurrency(p.price)}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Button variant="hero" className="mt-4 w-full" onClick={() => toast.success(`Đã gửi yêu cầu đặt gói PT với ${trainer.name} (dữ liệu mẫu).`)}>
              Đặt gói PT với {trainer.name.split(" ").at(-1)}
            </Button>
          </section>
        </aside>
      </Container>
    </PublicLayout>
  );
}
