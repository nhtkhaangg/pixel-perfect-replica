import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MapPin, Menu, Phone, Youtube } from "lucide-react";
import { useState, type ReactNode } from "react";

import { Logo, BRAND_NAME } from "@/components/brand/Logo";
import { PUBLIC_NAV } from "@/components/layout/nav-config";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function PublicHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 md:px-6">
        <Link to="/" aria-label={BRAND_NAME}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 text-sm lg:flex">
          {PUBLIC_NAV.map((item) => (
            <a
              key={item.to}
              href={item.to}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" asChild>
            <Link to="/login">Đăng nhập</Link>
          </Button>
          <Button variant="hero" asChild>
            <Link to="/register">Đăng ký tập thử</Link>
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden" aria-label="Mở menu">
              <Menu size={18} />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 bg-sidebar">
            <div className="mt-2 flex flex-col gap-1">
              {PUBLIC_NAV.map((item) => (
                <a
                  key={item.to}
                  href={item.to}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  {item.label}
                </a>
              ))}
              <div className="mt-4 flex flex-col gap-2">
                <Button variant="outline" asChild>
                  <Link to="/login">Đăng nhập</Link>
                </Button>
                <Button variant="hero" asChild>
                  <Link to="/register">Đăng ký tập thử</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export function PublicFooter() {
  return (
    <footer id="contact" className="border-t border-border bg-sidebar">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-4 md:px-6">
        <div className="space-y-4">
          <Logo />
          <p className="text-sm leading-relaxed text-muted-foreground">
            Phòng tập hiện đại tại TP. Hồ Chí Minh với đội ngũ huấn luyện viên tận tâm và hệ thống
            theo dõi tiến độ tập luyện.
          </p>
          <div className="flex gap-2">
            {[Facebook, Instagram, Youtube].map((Icon, i) => (
              <span
                key={i}
                className="grid size-9 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                <Icon size={16} />
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Khám phá</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            {PUBLIC_NAV.map((item) => (
              <li key={item.to}>
                <a href={item.to} className="transition-colors hover:text-foreground">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Dịch vụ</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li>Tập luyện cùng huấn luyện viên</li>
            <li>Lớp nhóm Yoga & Cardio</li>
            <li>Tư vấn dinh dưỡng</li>
            <li>Đo chỉ số cơ thể</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Liên hệ</h4>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <MapPin size={15} className="mt-0.5 shrink-0 text-primary" />
              128 Nguyễn Thị Minh Khai, Quận 3, TP. Hồ Chí Minh
            </li>
            <li className="flex items-center gap-2">
              <Phone size={15} className="shrink-0 text-primary" /> 028 3925 1188
            </li>
            <li className="flex items-center gap-2">
              <Mail size={15} className="shrink-0 text-primary" /> lienhe@gymcore.vn
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border px-4 py-5 text-center text-xs text-muted-foreground md:px-6">
        © {new Date().getFullYear()} {BRAND_NAME}. Mọi quyền được bảo lưu.
      </div>
    </footer>
  );
}

export function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader />
      <main className="flex-1">{children}</main>
      <PublicFooter />
    </div>
  );
}
