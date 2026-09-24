import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { CalendarClock, Check, Dumbbell, FileText, Hash } from "lucide-react";
import { toast } from "sonner";

import { PublicLayout } from "@/components/layout/PublicLayout";
import { PackageTile } from "@/components/public/PackageTile";
import { Container, PublicPageHero, SectionHeading } from "@/components/public/blocks";
import { TrainerTile } from "@/components/public/TrainerTile";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/format";
import { CATEGORY_LABEL, PACKAGES, TRAINERS } from "@/lib/mock/public";

export const Route = createFileRoute("/packages/$id")({
  loader: ({ params }) => {
    const pkg = PACKAGES.find((p) => p.id === params.id);
    if (!pkg) throw notFound();
    return { pkg };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Không tìm thấy gói tập — GymCore" }, { name: "robots", content: "noindex" }] };
    const { pkg } = loaderData;
    const title = `${pkg.name} — ${formatCurrency(pkg.price)} | GymCore`;
    return {
      meta: [
        { title },
        { name: "description", content: pkg.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: pkg.summary },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  notFoundComponent: PackageNotFound,
  component: PackageDetail,
});

function PackageNotFound() {
  return (
    <PublicLayout>
      <Container className="py-24 text-center">
        <h1 className="font-display text-3xl font-bold">Không tìm thấy gói tập</h1>
        <p className="mt-2 text-muted-foreground">Gói tập này không tồn tại hoặc đã ngừng kinh doanh.</p>
        <Button className="mt-6" asChild><Link to="/packages">Xem các gói tập khác</Link></Button>
      </Container>
    </PublicLayout>
  );
}

function PackageDetail() {
  const { pkg } = Route.useLoaderData();
  const trainer = TRAINERS.find((t) => t.id === pkg.trainerId);
  const related = PACKAGES.filter((p) => p.category === pkg.category && p.id !== pkg.id).slice(0, 2);
  const facts = [
    { icon: Dumbbell, label: "Loại gói", value: CATEGORY_LABEL[pkg.category] },
    { icon: CalendarClock, label: "Thời hạn", value: `${pkg.durationLabel} (${pkg.durationDays} ngày)` },
    { icon: Hash, label: "Số buổi", value: pkg.sessions ? `${pkg.sessions} buổi với huấn luyện viên` : "Không giới hạn lượt vào" },
  ];

  return (
    <PublicLayout>
      <PublicPageHero title={pkg.name} description={pkg.summary} crumbs={[{ label: "Gói tập", to: "/packages" }, { label: pkg.name }]} />
      <Container className="grid gap-8 py-12 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            {facts.map((f) => (
              <div key={f.label} className="card-surface p-4">
                <f.icon size={18} className="text-primary" />
                <p className="mt-3 text-xs text-muted-foreground">{f.label}</p>
                <p className="font-semibold">{f.value}</p>
              </div>
            ))}
          </div>
          <section className="card-surface p-6">
            <h2 className="font-display text-xl font-bold">Quyền lợi của gói</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {pkg.benefits.map((b) => (
                <li key={b} className="flex gap-2 text-sm"><Check size={16} className="mt-0.5 shrink-0 text-primary" />{b}</li>
              ))}
            </ul>
          </section>
          <section className="card-surface p-6">
            <h2 className="flex items-center gap-2 font-display text-xl font-bold"><FileText size={18} className="text-primary" />Điều khoản sử dụng</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
              {pkg.terms.map((t) => <li key={t}>{t}</li>)}
            </ol>
          </section>
          {trainer ? (
            <section className="space-y-3">
              <h2 className="font-display text-xl font-bold">Huấn luyện viên đề xuất</h2>
              <TrainerTile trainer={trainer} />
            </section>
          ) : null}
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="card-surface space-y-4 p-6">
            <p className="text-xs font-semibold tracking-wider text-primary uppercase">{CATEGORY_LABEL[pkg.category]}</p>
            <p className="font-display text-4xl font-extrabold">{formatCurrency(pkg.price)}</p>
            <p className="text-sm text-muted-foreground">
              Tương đương {formatCurrency(Math.round(pkg.price / (pkg.sessions ?? pkg.durationDays) / 1000) * 1000)} mỗi {pkg.sessions ? "buổi" : "ngày"}
            </p>
            <Button variant="hero" size="lg" className="w-full" onClick={() => toast.success(`Đã thêm “${pkg.name}” vào giỏ. Vui lòng đăng nhập để thanh toán (dữ liệu mẫu).`)}>
              Mua gói ngay
            </Button>
            <Button variant="outline" className="w-full" asChild><Link to="/gym-info">Liên hệ tư vấn</Link></Button>
            <p className="text-xs text-muted-foreground">Thanh toán tại quầy, chuyển khoản hoặc ví điện tử. Hoàn tiền 100% trong 3 ngày nếu chưa kích hoạt.</p>
          </div>
        </aside>
      </Container>
      {related.length ? (
        <Container className="pb-16">
          <SectionHeading title="Gói tập cùng loại" />
          <div className="mt-8 grid gap-6 md:grid-cols-2">{related.map((p) => <PackageTile key={p.id} pkg={p} />)}</div>
        </Container>
      ) : null}
    </PublicLayout>
  );
}
