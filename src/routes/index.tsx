import { Link, createFileRoute } from "@tanstack/react-router";
import { Bath, Dumbbell, HeartPulse, ParkingCircle, Wifi, Wind } from "lucide-react";
import { toast } from "sonner";

import heroImage from "@/assets/hero-gym.jpg";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { PackageCard, TrainerCard } from "@/components/shared/cards";
import { StatCard } from "@/components/shared/StatCard";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GymCore — Phòng tập hiện đại tại Quận 3, TP. Hồ Chí Minh" },
      {
        name: "description",
        content:
          "Phòng tập GymCore: gói tập linh hoạt, huấn luyện viên cá nhân và cơ sở vật chất hiện đại tại Quận 3, TP. Hồ Chí Minh.",
      },
      { property: "og:title", content: "GymCore — Phòng tập hiện đại tại Quận 3" },
      {
        property: "og:description",
        content: "Gói tập linh hoạt, huấn luyện viên cá nhân và thiết bị hiện đại.",
      },
    ],
  }),
  component: HomePage,
});

const PACKAGES = [
  {
    name: "Gói 1 tháng",
    price: 890000,
    duration: "Thời hạn 1 tháng",
    features: ["Tự do sử dụng phòng tập", "1 buổi đo chỉ số cơ thể", "Tủ đồ dùng chung"],
  },
  {
    name: "Gói 6 tháng",
    price: 4290000,
    duration: "Thời hạn 6 tháng",
    features: [
      "Tự do sử dụng phòng tập",
      "4 buổi tập cùng huấn luyện viên",
      "Tham gia lớp nhóm không giới hạn",
      "Tủ đồ riêng",
    ],
    highlighted: true,
  },
  {
    name: "Gói 12 tháng",
    price: 7690000,
    duration: "Thời hạn 12 tháng",
    features: [
      "Tự do sử dụng phòng tập",
      "10 buổi tập cùng huấn luyện viên",
      "Tư vấn dinh dưỡng hằng tháng",
      "Ưu tiên đặt lớp nhóm",
    ],
  },
];

const TRAINERS = [
  { name: "Trần Anh Khoa", specialty: "Tăng cơ & sức mạnh", rating: 4.9, sessions: 124 },
  { name: "Lê Mai Phương", specialty: "Yoga & vận động trị liệu", rating: 4.8, sessions: 112 },
  { name: "Nguyễn Minh Đức", specialty: "Giảm cân & thể lực", rating: 4.8, sessions: 98 },
];

const FACILITIES = [
  { icon: Dumbbell, title: "Khu tạ tự do", desc: "Hơn 120 thiết bị tạ và máy tập nhập khẩu." },
  { icon: HeartPulse, title: "Khu cardio", desc: "Máy chạy, xe đạp và máy leo cầu thang." },
  { icon: Wind, title: "Phòng lớp nhóm", desc: "Yoga, HIIT và kickfit với điều hoà riêng." },
  { icon: Bath, title: "Phòng tắm & xông hơi", desc: "Nước nóng 24/24 và khu xông hơi khô." },
  { icon: ParkingCircle, title: "Bãi đỗ xe", desc: "Miễn phí cho hội viên, có bảo vệ trực." },
  { icon: Wifi, title: "Wifi & nước uống", desc: "Wifi tốc độ cao, nước uống miễn phí." },
];

function HomePage() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="ambient-glow relative overflow-hidden border-b border-border">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 md:px-6 md:py-24 lg:grid-cols-2">
          <div className="space-y-7">
            <span className="inline-flex rounded-full border border-primary/40 px-4 py-1.5 text-xs font-semibold tracking-wider text-primary uppercase">
              Phòng tập chất lượng cao tại Quận 3
            </span>
            <h1 className="font-display text-4xl leading-[1.08] font-extrabold md:text-5xl lg:text-6xl">
              Tập luyện có kế hoạch,
              <br />
              tiến bộ mỗi tuần
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
              GymCore đồng hành cùng bạn từ buổi đo chỉ số đầu tiên đến khi đạt mục tiêu: lịch tập rõ
              ràng, huấn luyện viên theo sát và tiến độ được ghi nhận sau mỗi buổi.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="hero" size="lg" asChild>
                <Link to="/register">Đăng ký tập thử</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#packages">Xem gói tập</a>
              </Button>
            </div>
          </div>

          <div className="relative">
            <img
              src={heroImage}
              alt="Hội viên tập tạ tại phòng tập GymCore"
              width={1600}
              height={1104}
              className="w-full rounded-xl border border-border object-cover shadow-[var(--shadow-card)]"
            />
          </div>
        </div>
      </section>

      {/* Số liệu */}
      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-12 md:grid-cols-4 md:px-6">
        <StatCard label="Hội viên đang hoạt động" value="1.248" hint="Cập nhật hằng ngày" />
        <StatCard label="Huấn luyện viên" value="18" hint="Có chứng chỉ chuyên môn" />
        <StatCard label="Diện tích tập luyện" value="1.200 m²" hint="3 tầng chức năng" />
        <StatCard label="Giờ mở cửa" value="05:30 – 22:30" hint="Tất cả các ngày trong tuần" />
      </section>

      {/* Gói tập */}
      <section id="packages" className="border-y border-border bg-sidebar/40">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
          <div className="max-w-2xl space-y-3">
            <h2 className="font-display text-3xl font-bold md:text-4xl">Gói tập linh hoạt</h2>
            <p className="text-muted-foreground">
              Chọn thời hạn phù hợp với lịch sinh hoạt của bạn. Mọi gói đều bao gồm buổi định hướng
              tập luyện miễn phí.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {PACKAGES.map((pkg) => (
              <PackageCard
                key={pkg.name}
                {...pkg}
                onSelect={() => toast.success(`Đã chọn ${pkg.name}. Nhân viên sẽ liên hệ với bạn.`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Huấn luyện viên */}
      <section id="trainers" className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
        <div className="max-w-2xl space-y-3">
          <h2 className="font-display text-3xl font-bold md:text-4xl">Đội ngũ huấn luyện viên</h2>
          <p className="text-muted-foreground">
            Mỗi huấn luyện viên đều được đánh giá bởi hội viên sau từng chu kỳ tập luyện.
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {TRAINERS.map((trainer) => (
            <TrainerCard key={trainer.name} {...trainer} status="active" />
          ))}
        </div>
      </section>

      {/* Cơ sở vật chất */}
      <section id="facilities" className="border-t border-border bg-sidebar/40">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
          <div className="max-w-2xl space-y-3">
            <h2 className="font-display text-3xl font-bold md:text-4xl">Cơ sở vật chất</h2>
            <p className="text-muted-foreground">
              Không gian rộng rãi, thiết bị được bảo dưỡng định kỳ hằng tháng.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {FACILITIES.map((item) => (
              <div key={item.title} className="card-surface flex gap-4 p-5">
                <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/12 text-primary">
                  <item.icon size={19} />
                </span>
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
