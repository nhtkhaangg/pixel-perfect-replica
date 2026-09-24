import { Link, useLocation } from "@tanstack/react-router";
import { Bell, LogOut, Menu, Search, Settings, User } from "lucide-react";
import { useState, type ReactNode } from "react";

import { Logo } from "@/components/brand/Logo";
import { AppLink } from "@/components/shared/AppLink";
import { ROLE_AREAS, type RoleKey } from "@/components/layout/nav-config";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

/** Tên người dùng giả lập theo từng vai trò. */
const MOCK_USERS: Record<RoleKey, string> = {
  customer: "Nguyễn Minh Hoàng",
  trainer: "Trần Minh Khang",
  staff: "Lâm Quốc Việt",
  manager: "Phạm Quốc Bảo",
  admin: "Đặng Trần Minh",
};

function SidebarNav({ role, onNavigate }: { role: RoleKey; onNavigate?: () => void }) {
  const area = ROLE_AREAS[role];
  const { pathname } = useLocation();

  return (
    <nav className="flex flex-col gap-6">
      {area.groups.map((group) => (
        <div key={group.title}>
          <p className="px-3 pb-2 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
            {group.title}
          </p>
          <ul className="space-y-0.5">
            {group.items.map((item) => {
              const active =
                item.to === area.basePath ? pathname === item.to : pathname.startsWith(item.to);
              return (
                <li key={item.to}>
                  <AppLink
                    to={item.to}
                    onClick={onNavigate}
                    className={cn(
                      "relative flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors",
                      active
                        ? "bg-primary/12 font-medium text-primary"
                        : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground",
                    )}
                  >
                    {active ? (
                      <span className="absolute top-1/2 left-0 h-6 w-0.5 -translate-y-1/2 rounded-r bg-primary" />
                    ) : null}
                    <item.icon size={17} />
                    {item.label}
                  </AppLink>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export function DashboardLayout({ role, children }: { role: RoleKey; children: ReactNode }) {
  const area = ROLE_AREAS[role];
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar cố định trên màn hình lớn */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
        <div className="flex h-16 items-center border-b border-sidebar-border px-5">
          <Link to="/">
            <Logo size="sm" />
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto px-3 py-5">
          <SidebarNav role={role} />
        </div>
        <div className="border-t border-sidebar-border p-3">
          <Link
            to="/ui-navigation"
            className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground"
          >
            <Settings size={17} /> Điều hướng kiểm thử
          </Link>
        </div>
      </aside>

      <div className="lg:pl-64">
        {/* Thanh điều hướng trên */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/90 px-4 backdrop-blur md:px-6">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden" aria-label="Mở menu">
                <Menu size={18} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 bg-sidebar p-0">
              <div className="flex h-16 items-center border-b border-sidebar-border px-5">
                <Logo size="sm" />
              </div>
              <div className="overflow-y-auto px-3 py-5">
                <SidebarNav role={role} onNavigate={() => setMobileOpen(false)} />
              </div>
            </SheetContent>
          </Sheet>

          <span className="hidden text-sm font-medium md:inline">{area.areaLabel}</span>

          <div className="relative ml-auto hidden w-full max-w-sm md:block">
            <Search
              size={15}
              className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
            />
            <Input placeholder="Tìm kiếm hội viên, gói tập…" className="pl-9" />
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="relative ml-auto md:ml-0"
            aria-label="Thông báo"
          >
            <Bell size={18} />
            <span className="absolute top-2 right-2 size-2 rounded-full bg-primary" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 transition-colors hover:bg-accent">
                <span className="grid size-8 place-items-center rounded-full bg-primary/15 text-primary">
                  <User size={16} />
                </span>
                <span className="hidden text-left text-sm leading-tight sm:block">
                  <span className="block font-medium">{MOCK_USERS[role]}</span>
                  <span className="block text-xs text-muted-foreground">{area.roleLabel}</span>
                </span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuLabel>{MOCK_USERS[role]}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Thông tin cá nhân</DropdownMenuItem>
              <DropdownMenuItem>Cài đặt</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <LogOut size={14} /> Đăng xuất
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <main className="p-4 pb-20 md:p-6 lg:pb-6">{children}</main>
      </div>

      {/* Điều hướng dưới cho thiết bị di động */}
      <nav className="fixed inset-x-0 bottom-0 z-30 flex border-t border-border bg-sidebar/95 backdrop-blur lg:hidden">
        {area.groups.flatMap((g) => g.items).slice(0, 4).map((item) => (
          <AppLink
            key={item.to}
            to={item.to}
            className="flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] text-muted-foreground transition-colors hover:text-foreground"
            activeProps={{ className: "text-primary" }}
            activeOptions={{ exact: item.to === area.basePath }}
          >
            <item.icon size={18} />
            <span className="max-w-full truncate px-1">{item.label}</span>
          </AppLink>
        ))}
      </nav>
    </div>
  );
}
