import {
  Activity,
  BadgeCheck,
  BarChart3,
  Bell,
  BookOpen,
  CalendarDays,
  ClipboardList,
  CreditCard,
  Dumbbell,
  LayoutDashboard,
  MessageSquare,
  Package,
  Settings,
  ShieldCheck,
  Star,
  Users,
  UserCog,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type NavItem = { label: string; to: string; icon: LucideIcon };
export type NavGroup = { title: string; items: NavItem[] };
export type RoleKey = "customer" | "trainer" | "staff" | "manager" | "admin";

export type RoleArea = {
  key: RoleKey;
  /** Tên vai trò hiển thị cho người dùng. */
  roleLabel: string;
  basePath: string;
  areaLabel: string;
  groups: NavGroup[];
};

export const ROLE_AREAS: Record<RoleKey, RoleArea> = {
  customer: {
    key: "customer",
    roleLabel: "Hội viên",
    basePath: "/customer",
    areaLabel: "Cổng hội viên",
    groups: [
      {
        title: "Tập luyện",
        items: [
          { label: "Tổng quan", to: "/customer", icon: LayoutDashboard },
          { label: "Lịch tập", to: "/customer/schedule", icon: CalendarDays },
          { label: "Bài tập", to: "/customer/exercises", icon: Dumbbell },
          { label: "Tiến độ cơ thể", to: "/customer/progress", icon: Activity },
        ],
      },
      {
        title: "Dịch vụ",
        items: [
          { label: "Gói tập của tôi", to: "/customer/packages", icon: Package },
          { label: "Huấn luyện viên", to: "/customer/trainers", icon: Users },
          { label: "Thanh toán", to: "/customer/payments", icon: CreditCard },
          { label: "Đánh giá của tôi", to: "/customer/reviews", icon: Star },
        ],
      },
    ],
  },
  trainer: {
    key: "trainer",
    roleLabel: "Huấn luyện viên",
    basePath: "/trainer",
    areaLabel: "Khu vực huấn luyện",
    groups: [
      {
        title: "Vận hành",
        items: [
          { label: "Tổng quan", to: "/trainer", icon: LayoutDashboard },
          { label: "Lịch ca dạy", to: "/trainer/schedule", icon: CalendarDays },
          { label: "Học viên", to: "/trainer/clients", icon: Users },
          { label: "Giáo án", to: "/trainer/programs", icon: ClipboardList },
        ],
      },
      {
        title: "Chuyên môn",
        items: [
          { label: "Thư viện bài tập", to: "/trainer/exercises", icon: Dumbbell },
          { label: "Đánh giá từ hội viên", to: "/trainer/reviews", icon: Star },
          { label: "Hoa hồng", to: "/trainer/earnings", icon: Wallet },
        ],
      },
    ],
  },
  staff: {
    key: "staff",
    roleLabel: "Nhân viên",
    basePath: "/staff",
    areaLabel: "Quầy lễ tân",
    groups: [
      {
        title: "Hằng ngày",
        items: [
          { label: "Tổng quan", to: "/staff", icon: LayoutDashboard },
          { label: "Check-in", to: "/staff/check-in", icon: BadgeCheck },
          { label: "Hội viên", to: "/staff/members", icon: Users },
          { label: "Đăng ký gói tập", to: "/staff/registrations", icon: Package },
        ],
      },
      {
        title: "Hỗ trợ",
        items: [
          { label: "Thanh toán", to: "/staff/payments", icon: CreditCard },
          { label: "Lịch phòng tập", to: "/staff/schedule", icon: CalendarDays },
          { label: "Yêu cầu hội viên", to: "/staff/requests", icon: MessageSquare },
        ],
      },
    ],
  },
  manager: {
    key: "manager",
    roleLabel: "Quản lý",
    basePath: "/manager",
    areaLabel: "Quản lý phòng tập",
    groups: [
      {
        title: "Điều hành",
        items: [
          { label: "Tổng quan", to: "/manager", icon: LayoutDashboard },
          { label: "Doanh thu", to: "/manager/revenue", icon: BarChart3 },
          { label: "Hội viên", to: "/manager/members", icon: Users },
          { label: "Huấn luyện viên", to: "/manager/trainers", icon: UserCog },
        ],
      },
      {
        title: "Nội dung & dịch vụ",
        items: [
          { label: "Gói tập", to: "/manager/packages", icon: Package },
          { label: "Lịch & phòng chức năng", to: "/manager/schedule", icon: CalendarDays },
          { label: "Bài viết", to: "/manager/blog", icon: BookOpen },
          { label: "Đánh giá", to: "/manager/reviews", icon: Star },
        ],
      },
    ],
  },
  admin: {
    key: "admin",
    roleLabel: "Quản trị viên",
    basePath: "/admin",
    areaLabel: "Quản trị hệ thống",
    groups: [
      {
        title: "Hệ thống",
        items: [
          { label: "Tổng quan", to: "/admin", icon: LayoutDashboard },
          { label: "Người dùng", to: "/admin/users", icon: Users },
          { label: "Phân quyền", to: "/admin/roles", icon: ShieldCheck },
          { label: "Nhật ký hoạt động", to: "/admin/audit-log", icon: ClipboardList },
        ],
      },
      {
        title: "Cấu hình",
        items: [
          { label: "Thông tin phòng tập", to: "/admin/gym-profile", icon: Dumbbell },
          { label: "Thông báo", to: "/admin/notifications", icon: Bell },
          { label: "Cài đặt hệ thống", to: "/admin/settings", icon: Settings },
        ],
      },
    ],
  },
};

export const PUBLIC_NAV: { label: string; to: string }[] = [
  { label: "Trang chủ", to: "/" },
  { label: "Gói tập", to: "/#packages" },
  { label: "Huấn luyện viên", to: "/#trainers" },
  { label: "Cơ sở vật chất", to: "/#facilities" },
  { label: "Liên hệ", to: "/#contact" },
];
