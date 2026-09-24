import { Link } from "@tanstack/react-router";
import { Bot, QrCode, ScanFace, Star } from "lucide-react";
import type { ReactNode } from "react";

import { Logo } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";

const HIGHLIGHTS = [
  {
    icon: QrCode,
    title: "Check-in bằng mã QR",
    description: "Quét mã một lần để vào phòng tập và mở tủ đồ cá nhân.",
  },
  {
    icon: ScanFace,
    title: "Theo dõi chỉ số cơ thể",
    description: "Cập nhật cân nặng, tỉ lệ cơ và mỡ sau mỗi buổi đo định kỳ.",
  },
  {
    icon: Bot,
    title: "Gợi ý thực đơn cá nhân hoá",
    description: "Đề xuất dinh dưỡng theo mục tiêu tăng cơ hoặc giảm cân.",
  },
];

export function AuthLayout({
  title,
  description,
  activeTab,
  children,
}: {
  title: string;
  description: string;
  activeTab?: "login" | "register";
  children: ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Cột giới thiệu */}
      <section className="ambient-glow relative hidden flex-col justify-between border-r border-border bg-sidebar p-10 lg:flex xl:p-14">
        <Link to="/">
          <Logo size="lg" />
        </Link>

        <div className="space-y-8">
          <span className="inline-flex rounded-full border border-primary/40 px-4 py-1.5 text-xs font-semibold tracking-wider text-primary uppercase">
            Phòng tập chất lượng cao tại Quận 3
          </span>
          <h1 className="max-w-lg font-display text-4xl leading-[1.1] font-extrabold xl:text-5xl">
            Một phòng tập, trọn vẹn hành trình của bạn
          </h1>
          <ul className="space-y-5">
            {HIGHLIGHTS.map((item) => (
              <li key={item.title} className="flex gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/12 text-primary">
                  <item.icon size={19} />
                </span>
                <span>
                  <span className="block font-semibold">{item.title}</span>
                  <span className="block text-sm text-muted-foreground">{item.description}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <figure className="card-surface p-5">
          <div className="flex gap-1 text-warning">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={15} className="fill-current" />
            ))}
          </div>
          <blockquote className="mt-3 text-sm leading-relaxed text-muted-foreground italic">
            “Huấn luyện viên theo sát từng động tác nên mình tự tin tập tạ nặng mà không lo chấn
            thương. Lịch tập được nhắc rất đúng giờ.”
          </blockquote>
          <figcaption className="mt-4 text-sm">
            <span className="block font-medium">Nguyễn Minh Hoàng</span>
            <span className="block text-xs text-muted-foreground">Hội viên 8 tháng</span>
          </figcaption>
        </figure>
      </section>

      {/* Cột biểu mẫu */}
      <section className="flex items-center justify-center p-5 md:p-10">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <div className="card-surface p-6 md:p-8">
            <h2 className="font-display text-2xl font-bold">{title}</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>

            {activeTab ? (<div className="mt-6 grid grid-cols-2 gap-1 rounded-lg border border-border bg-secondary/60 p-1">
              <Link
                to="/login"
                className={cn(
                  "rounded-md py-2 text-center text-sm font-medium transition-colors",
                  activeTab === "login"
                    ? "bg-card text-primary shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                Đăng nhập
              </Link>
              <Link
                to="/register"
                className={cn(
                  "rounded-md py-2 text-center text-sm font-medium transition-colors",
                  activeTab === "register"
                    ? "bg-card text-primary shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                Đăng ký
              </Link>
            </div>) : null}

            <div className="mt-6">{children}</div>
          </div>
        </div>
      </section>
    </div>
  );
}
