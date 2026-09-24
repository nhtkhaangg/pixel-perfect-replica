import { Link, createFileRoute } from "@tanstack/react-router";
import { Bath, Brain, Clock, Dumbbell, HeartPulse, Mail, MapPin, ParkingCircle, Phone, ShieldCheck, TrendingUp, Wifi, Wind, Zap } from "lucide-react";

import gymInterior from "@/assets/gym-interior.jpg";
import heroImage from "@/assets/hero-gym.jpg";
import training from "@/assets/training.jpg";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { ArticleTile } from "@/components/public/ArticleTile";
import { Container, InitialsAvatar, SectionHeading, Stars } from "@/components/public/blocks";
import { PackageTile } from "@/components/public/PackageTile";
import { TrainerTile } from "@/components/public/TrainerTile";
import { StatCard } from "@/components/shared/StatCard";
import { Button } from "@/components/ui/button";
import { ARTICLES, FACILITIES, GYM_INFO, PACKAGES, REVIEWS, TRAINERS } from "@/lib/mock/public";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GymCore — Phòng tập hiện đại tại Quận 3, TP. Hồ Chí Minh" },
      { name: "description", content: "Phòng tập GymCore: gói tập linh hoạt, huấn luyện viên cá nhân và cơ sở vật chất hiện đại tại Quận 3, TP. Hồ Chí Minh." },
      { property: "og:title", content: "GymCore — Phòng tập hiện đại tại Quận 3" },
      { property: "og:description", content: "Gói tập linh hoạt, huấn luyện viên cá nhân và thiết bị hiện đại." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const FACILITY_ICONS = { weights: Dumbbell, cardio: HeartPulse, studio: Wind, sauna: Bath, parking: ParkingCircle, lounge: Wifi } as const;

const BENEFITS = [
  { icon: TrendingUp, title: "Tiến bộ đo được", desc: "Chỉ số InBody được ghi nhận định kỳ để bạn thấy rõ thay đổi." },
  { icon: ShieldCheck, title: "Tập đúng, an toàn", desc: "Huấn luyện viên chỉnh kỹ thuật, hạn chế tối đa chấn thương." },
  { icon: Zap, title: "Tăng năng lượng", desc: "Vận động đều đặn giúp ngủ ngon và tỉnh táo hơn khi làm việc." },
  { icon: Brain, title: "Giảm căng thẳng", desc: "Lớp yoga và kickfit giúp giải toả áp lực sau giờ làm." },
];

function HomePage() {
  const featured = [PACKAGES[0]!, PACKAGES[1]!, PACKAGES[4]!];
  return (
    <PublicLayout>
      <section className="ambient-glow relative overflow-hidden border-b border-border">
        <Container className="grid items-center gap-12 py-16 md:py-24 lg:grid-cols-2">
          <div className="space-y-7">
            <span className="inline-flex rounded-full border border-primary/40 px-4 py-1.5 text-xs font-semibold tracking-wider text-primary uppercase">Phòng tập chất lượng cao tại Quận 3</span>
            <h1 className="font-display text-4xl leading-[1.08] font-extrabold md:text-5xl lg:text-6xl">Tập luyện có kế hoạch,<br />tiến bộ mỗi tuần</h1>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground">GymCore đồng hành cùng bạn từ buổi đo chỉ số đầu tiên đến khi đạt mục tiêu: lịch tập rõ ràng, huấn luyện viên theo sát và tiến độ được ghi nhận sau mỗi buổi.</p>
            <div className="flex flex-wrap gap-3">
              <Button variant="hero" size="lg" asChild><Link to="/register">Đăng ký tập thử miễn phí</Link></Button>
              <Button variant="outline" size="lg" asChild><Link to="/packages">Xem bảng giá</Link></Button>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground"><Stars value={5} /> 4,6/5 từ hơn 800 hội viên</div>
          </div>
          <img src={heroImage} alt="Hội viên tập tạ tại phòng tập GymCore" width={1600} height={1104} className="w-full rounded-xl border border-border object-cover shadow-[var(--shadow-card)]" />
        </Container>
      </section>

      <Container className="grid gap-4 py-12 sm:grid-cols-2 md:grid-cols-4">
        <StatCard label="Hội viên đang hoạt động" value="1.248" hint="Cập nhật hằng ngày" />
        <StatCard label="Huấn luyện viên" value={String(TRAINERS.length)} hint="Có chứng chỉ chuyên môn" />
        <StatCard label="Diện tích tập luyện" value={GYM_INFO.area} hint="3 tầng chức năng" />
        <StatCard label="Giờ mở cửa" value="05:30 – 22:30" hint="Thứ 2 – Thứ 6" />
      </Container>

      <section className="border-y border-border bg-sidebar/40">
        <Container className="py-16 md:py-20">
          <SectionHeading eyebrow="Gói tập" title="Gói tập nổi bật" description="Mọi gói đều bao gồm buổi định hướng tập luyện miễn phí." action={<Button variant="outline" asChild><Link to="/packages">Xem tất cả gói</Link></Button>} />
          <div className="mt-10 grid gap-6 md:grid-cols-3">{featured.map((p) => <PackageTile key={p.id} pkg={p} />)}</div>
        </Container>
      </section>

      <Container className="py-16 md:py-20">
        <SectionHeading eyebrow="Đội ngũ" title="Huấn luyện viên tiêu biểu" description="Được hội viên đánh giá sau từng chu kỳ tập luyện." action={<Button variant="outline" asChild><Link to="/trainers">Xem tất cả</Link></Button>} />
        <div className="mt-10 grid gap-5 md:grid-cols-3">{TRAINERS.slice(0, 3).map((t) => <TrainerTile key={t.id} trainer={t} />)}</div>
      </Container>

      <section className="border-y border-border bg-sidebar/40">
        <Container className="grid items-center gap-10 py-16 md:py-20 lg:grid-cols-[1fr_1.2fr]">
          <img src={gymInterior} alt="Khu tập tạ và cardio của GymCore" width={1600} height={912} loading="lazy" className="w-full rounded-xl border border-border object-cover" />
          <div>
            <SectionHeading eyebrow="Cơ sở vật chất" title="Không gian tập rộng rãi" description="Thiết bị được bảo dưỡng định kỳ hằng tháng." />
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {FACILITIES.map((f) => {
                const Icon = FACILITY_ICONS[f.key];
                return (
                  <div key={f.key} className="card-surface flex gap-3 p-4">
                    <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/12 text-primary"><Icon size={17} /></span>
                    <div><h3 className="text-sm font-semibold">{f.title}</h3><p className="mt-0.5 text-xs text-muted-foreground">{f.desc}</p></div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      <Container className="grid items-center gap-10 py-16 md:py-20 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <SectionHeading eyebrow="Lợi ích" title="Vì sao nên tập luyện đều đặn?" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {BENEFITS.map((b) => (
              <div key={b.title} className="space-y-2">
                <b.icon size={22} className="text-primary" />
                <h3 className="font-semibold">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <img src={training} alt="Hội viên tập kettlebell" width={1200} height={912} loading="lazy" className="w-full rounded-xl border border-border object-cover" />
      </Container>

      <section className="border-y border-border bg-sidebar/40">
        <Container className="py-16 md:py-20">
          <SectionHeading eyebrow="Kiến thức" title="Bài viết mới nhất" action={<Button variant="outline" asChild><Link to="/articles">Xem tất cả bài viết</Link></Button>} />
          <div className="mt-10 grid gap-6 md:grid-cols-3">{ARTICLES.slice(0, 3).map((a, i) => <ArticleTile key={a.id} article={a} index={i} />)}</div>
        </Container>
      </section>

      <Container className="py-16 md:py-20">
        <SectionHeading eyebrow="Đánh giá" title="Hội viên nói gì về chúng tôi" action={<Button variant="outline" asChild><Link to="/reviews">Xem tất cả đánh giá</Link></Button>} />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {REVIEWS.slice(0, 3).map((r) => (
            <figure key={r.id} className="card-surface p-5">
              <Stars value={r.rating} />
              <blockquote className="mt-3 text-sm leading-relaxed text-muted-foreground">“{r.content}”</blockquote>
              <figcaption className="mt-4 flex items-center gap-3"><InitialsAvatar name={r.name} className="size-9 text-xs" /><span><span className="block text-sm font-medium">{r.name}</span><span className="text-xs text-muted-foreground">{r.memberFor}</span></span></figcaption>
            </figure>
          ))}
        </div>
      </Container>

      <section className="border-t border-border bg-sidebar/40">
        <Container className="grid gap-6 py-16 md:grid-cols-3">
          <div className="card-surface p-6"><MapPin className="text-primary" size={20} /><h3 className="mt-3 font-semibold">Địa chỉ</h3><p className="mt-1 text-sm text-muted-foreground">{GYM_INFO.address}</p></div>
          <div className="card-surface p-6"><Clock className="text-primary" size={20} /><h3 className="mt-3 font-semibold">Giờ mở cửa</h3>
            <ul className="mt-1 space-y-0.5 text-sm text-muted-foreground">{GYM_INFO.hours.map((h) => <li key={h.day}>{h.day}: <span className="text-foreground">{h.time}</span></li>)}</ul>
          </div>
          <div className="card-surface p-6"><Phone className="text-primary" size={20} /><h3 className="mt-3 font-semibold">Liên hệ</h3>
            <p className="mt-1 text-sm text-muted-foreground">Hotline {GYM_INFO.hotline}</p>
            <p className="flex items-center gap-1.5 text-sm text-muted-foreground"><Mail size={13} /> {GYM_INFO.email}</p>
            <Link to="/gym-info" className="mt-2 inline-block text-sm text-primary hover:underline">Xem chi tiết</Link>
          </div>
        </Container>
      </section>

      <section className="ambient-glow border-t border-border">
        <Container className="py-20 text-center">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-extrabold md:text-5xl">Buổi tập đầu tiên luôn miễn phí</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Đăng ký ngay để được đo InBody và nhận lộ trình tập gợi ý từ huấn luyện viên.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button variant="hero" size="lg" asChild><Link to="/register">Đăng ký tập thử</Link></Button>
            <Button variant="outline" size="lg" asChild><Link to="/tools/fitness-calculator">Tính chỉ số BMI</Link></Button>
          </div>
        </Container>
      </section>
    </PublicLayout>
  );
}
