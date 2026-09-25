import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  BookOpen,
  Bot,
  Dumbbell,
  Facebook,
  Home,
  Instagram,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Search,
  ShoppingBag,
  Sparkles,
  User,
  Users,
  Youtube,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";

import { BRAND_NAME } from "@/components/brand/Logo";
import { BookingTrialModal } from "@/components/public/BookingTrialModal";

export function PublicFooter() {
  return (
    <footer id="contact" className="border-t border-[#17223b] bg-[#060913]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-4 md:px-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg overflow-hidden flex items-center justify-center text-zinc-950 shadow-md shadow-emerald-500/25 bg-black border border-emerald-500/30">
              <img src="/logo.png" alt="OmniGym Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-black text-lg text-white tracking-wider">OMNIGYM</span>
          </div>
          <p className="text-sm leading-relaxed text-zinc-400">
            OmniGym Fitness & Yoga Center — Trung tâm thể thao & yoga đẳng cấp 2,500m² tại Cần Thơ. Nâng tầm thể lực, bứt phá mọi giới hạn cùng công nghệ đo InBody y khoa và HLV chuyên nghiệp.
          </p>
          <div className="flex gap-2">
            {[Facebook, Instagram, Youtube].map((Icon, i) => (
              <span
                key={i}
                className="grid size-9 place-items-center rounded-xl border border-[#1a2438] bg-[#0d1527] text-zinc-400 transition-colors hover:border-emerald-500/40 hover:text-emerald-400 cursor-pointer"
              >
                <Icon size={16} />
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold text-white tracking-wide uppercase">Khám phá</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-zinc-400">
            <li>
              <a href="/#top" className="transition-colors hover:text-emerald-400">Trang chủ</a>
            </li>
            <li>
              <a href="/#packages-section" className="transition-colors hover:text-emerald-400">Gói tập & Bảng giá</a>
            </li>
            <li>
              <a href="/#zones-section" className="transition-colors hover:text-emerald-400">Khu vực phòng tập</a>
            </li>
            <li>
              <a href="/#trainers-section" className="transition-colors hover:text-emerald-400">Huấn luyện viên PT</a>
            </li>
            <li>
              <a href="/#articles-section" className="transition-colors hover:text-emerald-400">Kiến thức thể hình</a>
            </li>
            <li>
              <a href="/#reviews-section" className="transition-colors hover:text-emerald-400">Đánh giá hội viên</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold text-white tracking-wide uppercase">Dịch vụ & Tiện ích</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-zinc-400">
            <li>Tập luyện cùng Master PT 1-1</li>
            <li>Lớp Yoga & Pilates Studio</li>
            <li>Xông hơi Đá muối Himalaya & Khô/Ướt</li>
            <li>Máy đo InBody 770 Test y khoa</li>
            <li>Tủ Locker FaceID & Wifi 500Mbps</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold text-white tracking-wide uppercase">Liên hệ OmniGym</h4>
          <ul className="mt-4 space-y-3 text-sm text-zinc-400">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-emerald-400" />
              Số 123 Đường 3/2, P. Xuân Khánh, Q. Ninh Kiều, TP. Cần Thơ
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="shrink-0 text-emerald-400" /> Hotline: <strong className="text-white font-mono">1900 8899</strong>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="shrink-0 text-emerald-400" /> contact@omnigym.vn
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[#17223b] px-4 py-5 text-center text-xs text-zinc-500 md:px-6">
        © {new Date().getFullYear()} {BRAND_NAME} Fitness & Yoga Center. Mọi quyền được bảo lưu.
      </div>
    </footer>
  );
}

export function PublicLayout({
  children,
  onOpenBooking,
}: {
  children: ReactNode;
  onOpenBooking?: () => void;
}) {
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;

  const [internalBookingOpen, setInternalBookingOpen] = useState(false);

  useEffect(() => {
    const handleCustomBooking = () => setInternalBookingOpen(true);
    window.addEventListener("open-omnigym-booking", handleCustomBooking);
    return () => window.removeEventListener("open-omnigym-booking", handleCustomBooking);
  }, []);

  const handleBookingClick = () => {
    if (onOpenBooking) {
      onOpenBooking();
    } else {
      setInternalBookingOpen(true);
    }
  };

  const menuGroups = [
    {
      title: "Học viên (Client)",
      items: [
        { name: "Trang chủ", href: "/#top", icon: <Home className="w-4 h-4" /> },
        {
          name: "Luyện tập",
          href: "/#packages-section",
          targetRoute: "/packages",
          icon: <Dumbbell className="w-4 h-4" />,
        },
        {
          name: "Thông tin phòng tập",
          href: "/#zones-section",
          targetRoute: "/gym-info",
          icon: <MapPin className="w-4 h-4" />,
        },
        {
          name: "Huấn luyện viên",
          href: "/#trainers-section",
          targetRoute: "/trainers",
          icon: <Users className="w-4 h-4" />,
        },
        {
          name: "Cửa hàng",
          href: "/#packages-section",
          targetRoute: "/packages",
          icon: <ShoppingBag className="w-4 h-4" />,
        },
        {
          name: "Kiến thức",
          href: "/#articles-section",
          targetRoute: "/articles",
          icon: <BookOpen className="w-4 h-4" />,
        },
        {
          name: "Omni AI Assistant",
          href: "/#ai-section",
          icon: <Bot className="w-4 h-4" />,
        },
        {
          name: "Trò chuyện HLV",
          href: "/#reviews-section",
          targetRoute: "/reviews",
          icon: <MessageSquare className="w-4 h-4" />,
        },
        {
          name: "Hồ sơ & Cài đặt",
          href: "/customer/dashboard",
          icon: <User className="w-4 h-4" />,
        },
      ],
    },
  ];

  const bottomNavItems = [
    { name: "Trang chủ", href: "/#top", icon: <Home className="w-4.5 h-4.5" /> },
    {
      name: "Luyện tập",
      href: "/#packages-section",
      targetRoute: "/packages",
      icon: <Dumbbell className="w-4.5 h-4.5" />,
    },
    {
      name: "Phòng tập",
      href: "/#zones-section",
      targetRoute: "/gym-info",
      icon: <MapPin className="w-4.5 h-4.5" />,
    },
    {
      name: "Góc AI",
      href: "/#ai-section",
      icon: <Bot className="w-5.5 h-5.5 text-zinc-950" />,
      isSpecial: true,
    },
    {
      name: "HLV",
      href: "/#trainers-section",
      targetRoute: "/trainers",
      icon: <Users className="w-4.5 h-4.5" />,
    },
    {
      name: "Cửa hàng",
      href: "/#packages-section",
      targetRoute: "/packages",
      icon: <ShoppingBag className="w-4.5 h-4.5" />,
    },
    {
      name: "Cá nhân",
      href: "/customer/dashboard",
      icon: <User className="w-4.5 h-4.5" />,
    },
  ];

  const handleNavClick = (
    e: React.MouseEvent,
    href: string,
    _targetRoute?: string
  ) => {
    if (href.startsWith("/#") || href.startsWith("#")) {
      const hashPart = (href.includes("#") ? href.split("#")[1] : href.replace("#", "")) || "";
      if (!hashPart) return;
      if (pathname === "/") {
        e.preventDefault();
        if (hashPart === "top") {
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }
        const elem = document.getElementById(hashPart);
        if (elem) {
          elem.scrollIntoView({ behavior: "smooth" });
          return;
        }
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-[#070b13] text-zinc-100 font-sans transition-colors duration-200">
      {/* Sidebar - Desktop */}
      <aside className="w-64 border-r border-[#17223b]/85 bg-[#060913] hidden lg:flex flex-col z-40 sticky top-0 h-screen shrink-0">
        {/* Brand Header */}
        <div className="h-20 flex items-center px-6 border-b border-[#17223b]/85 gap-3">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg overflow-hidden flex items-center justify-center text-zinc-950 shadow-md shadow-emerald-500/25 bg-black border border-emerald-500/30">
              <img src="/logo.png" alt="OmniGym Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="font-black text-base text-white tracking-wider group-hover:text-emerald-400 transition-colors">
                OMNIGYM
              </h1>
            </div>
          </Link>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
          {menuGroups.map((group, idx) => (
            <div key={idx} className="space-y-1.5">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-3 block mb-2">
                {group.title}
              </span>
              {group.items.map((item) => {
                const isExactActive = pathname === item.href;
                const isRouteActive = Boolean(item.targetRoute && pathname.startsWith(item.targetRoute));
                const isHomeActive = pathname === "/" && item.href === "/#top";
                const isActive = isExactActive || isRouteActive || isHomeActive;

                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href, item.targetRoute)}
                    className={`flex items-center gap-3 px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-200 group relative cursor-pointer ${
                      isActive
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "text-zinc-400 hover:bg-zinc-850/40 hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <span className="absolute left-0 w-1 h-5 rounded-r bg-emerald-500" />
                    )}
                    <span
                      className={`${isActive ? "text-emerald-500" : "text-zinc-500 group-hover:text-zinc-300"}`}
                    >
                      {item.icon}
                    </span>
                    {item.name}
                  </a>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Sidebar Footer User Card / Auth */}
        <div className="p-4 border-t border-[#17223b]/85 flex flex-col gap-2 bg-[#0d1424]/40">
          <Link
            to="/login"
            className="w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl transition-all text-center shadow-sm shadow-emerald-500/20"
          >
            Đăng Nhập
          </Link>
          <Link
            to="/register"
            className="w-full py-1.5 border border-[#1e2d4a] hover:border-emerald-500/40 bg-[#0c1220] hover:bg-[#111a2e] text-zinc-300 hover:text-white font-semibold text-xs rounded-xl transition-all text-center"
          >
            Đăng Ký Hội Viên
          </Link>
        </div>
      </aside>

      {/* Main Content Container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-20 border-b border-[#17223b]/85 bg-[#060913]/95 backdrop-blur-md flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            {/* Mobile Logo */}
            <Link to="/" className="lg:hidden flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center text-zinc-950 shadow-md shadow-emerald-500/25 bg-black border border-emerald-500/30">
                <img src="/logo.png" alt="OmniGym Logo" className="w-full h-full object-cover" />
              </div>
              <span className="font-black text-sm text-white tracking-wider">OMNIGYM</span>
            </Link>

            {/* Desktop Greeting */}
            <div className="hidden lg:block">
              <h2 className="text-sm font-extrabold text-white flex items-center gap-1">
                Chào buổi sáng, Bạn! <span className="text-amber-500">👋</span>
              </h2>
              <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mt-0.5">
                Hôm nay là ngày tập Chân & Mông. Sẵn sàng chưa?
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-4">
            {/* Search Box */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 border border-[#17223b]/85 rounded-lg bg-zinc-900/50 text-xs text-zinc-400 w-48">
              <Search className="w-3.5 h-3.5 text-zinc-500" />
              <span>Tìm kiếm nhanh...</span>
            </div>

            {/* Notification Bell */}
            <button
              onClick={() => toast.info("OmniGym đang mở cửa đón hội viên hôm nay!")}
              className="relative p-2 text-zinc-400 hover:text-zinc-200 bg-[#0e1422] border border-[#17223b]/85 rounded-xl flex items-center justify-center transition-colors cursor-pointer"
              title="Thông báo"
            >
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500" />
              <Bell className="w-4 h-4" />
            </button>

            {/* Set schedule green button */}
            <button
              onClick={handleBookingClick}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
            >
              <span>+</span> <span className="hidden sm:inline">ĐẶT LỊCH TẬP</span><span className="sm:hidden">LỊCH TẬP</span>
            </button>

            {/* Quick Workspace Switcher for Admin */}
            <Link
              to="/admin/dashboard"
              className="hidden xl:flex items-center gap-1.5 px-3 py-2 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-extrabold text-xs rounded-xl hover:bg-emerald-500/25 transition-all shadow-sm"
            >
              🛡️ Trang Admin
            </Link>

            {/* User Profile / Auth buttons */}
            <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-3 border-l border-[#17223b]/85">
              <Link
                to="/login"
                className="px-2.5 sm:px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition-all"
              >
                Đăng nhập
              </Link>
              <Link
                to="/register"
                className="hidden sm:inline-block px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-md transition-all"
              >
                Đăng ký
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden pb-16 lg:pb-0">
          {children}
        </main>

        {/* Footer */}
        <PublicFooter />
      </div>

      {/* Sticky Bottom Tab Bar - Mobile only */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#070b13] border-t border-zinc-800/40 z-40 flex justify-around items-center px-2 pb-safe shadow-lg">
        {bottomNavItems.map((item) => {
          const isActive = pathname === item.href;
          if (item.isSpecial) {
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href, item.targetRoute)}
                className="flex flex-col items-center -translate-y-4 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-600 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-all duration-300">
                  {item.icon}
                </div>
                <span className="text-[10px] font-bold text-emerald-400 mt-1">
                  {item.name}
                </span>
              </a>
            );
          }

          return (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href, item.targetRoute)}
              className={`flex flex-col items-center justify-center flex-1 h-full py-1 text-center transition-all cursor-pointer ${
                isActive
                  ? "text-emerald-500 font-bold"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <span
                className={`${isActive ? "text-emerald-500 scale-110" : "text-zinc-500"} transition-transform`}
              >
                {item.icon}
              </span>
              <span className="text-[10px] mt-1 font-medium tracking-tight">
                {item.name}
              </span>
            </a>
          );
        })}
      </div>

      {/* Interactive Booking Modal directly in Layout */}
      <BookingTrialModal
        isOpen={internalBookingOpen}
        onClose={() => setInternalBookingOpen(false)}
      />
    </div>
  );
}
