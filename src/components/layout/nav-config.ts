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
import { History, MessageCircle, QrCode, Route as RouteIcon, Scale, NotebookPen, UserRound } from "lucide-react";
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
        title: "Tổng quan",
        items: [
          { label: "Tổng quan", to: "/customer/dashboard", icon: LayoutDashboard },
          { label: "Thông báo", to: "/customer/notifications", icon: Bell },
          { label: "Hồ sơ của tôi", to: "/customer/profile", icon: UserRound },
        ],
      },
      {
        title: "Tập luyện",
        items: [
          { label: "Lịch tập", to: "/customer/calendar", icon: CalendarDays },
          { label: "Lộ trình tập luyện", to: "/customer/training-roadmap", icon: RouteIcon },
          { label: "Hướng dẫn bài tập", to: "/customer/exercises", icon: Dumbbell },
          { label: "Ghi nhận buổi tập", to: "/customer/workout-log", icon: NotebookPen },
          { label: "Tiến độ tập luyện", to: "/customer/progress", icon: Activity },
          { label: "Chỉ số cơ thể", to: "/customer/body-metrics", icon: Scale },
          { label: "Trò chuyện với HLV", to: "/customer/chat", icon: MessageCircle },
        ],
      },
      {
        title: "Gói tập & thanh toán",
        items: [
          { label: "Check-in QR", to: "/customer/check-in", icon: QrCode },
          { label: "Gói tập đã mua", to: "/customer/my-packages", icon: Package },
          { label: "Mua gói hội viên", to: "/customer/packages", icon: CreditCard },
          { label: "Đặt gói PT", to: "/customer/trainer-packages", icon: Users },
          { label: "Lịch sử giao dịch", to: "/customer/transactions", icon: Wallet },
          { label: "Lịch sử check-in", to: "/customer/check-in-history", icon: History },
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
  { label: "Gói tập", to: "/packages" },
  { label: "Huấn luyện viên", to: "/trainers" },
  { label: "Kiến thức", to: "/articles" },
  { label: "Công cụ", to: "/tools/fitness-calculator" },
  { label: "Đánh giá", to: "/reviews" },
  { label: "Liên hệ", to: "/gym-info" },
];

/** Toàn bộ trang hội viên, dùng cho trang điều hướng kiểm thử. */
export const CUSTOMER_PAGES: { label: string; to: string }[] = [
  { label: "Tổng quan hội viên", to: "/customer/dashboard" },
  { label: "Xem hồ sơ", to: "/customer/profile" },
  { label: "Cập nhật hồ sơ", to: "/customer/profile/edit" },
  { label: "Đổi mật khẩu", to: "/customer/change-password" },
  { label: "Đánh giá thể trạng ban đầu", to: "/customer/initial-assessment" },
  { label: "Thiết lập lịch rảnh", to: "/customer/availability" },
  { label: "Cập nhật chỉ số cơ thể", to: "/customer/body-metrics" },
  { label: "Biểu đồ tiến trình cơ thể", to: "/customer/body-progress" },
  { label: "Đánh giá phòng gym", to: "/customer/reviews/create" },
  { label: "Mua gói hội viên", to: "/customer/packages" },
  { label: "Đặt gói huấn luyện viên cá nhân", to: "/customer/trainer-packages" },
  { label: "Gói tập đã mua", to: "/customer/my-packages" },
  { label: "Lịch sử giao dịch", to: "/customer/transactions" },
  { label: "Mã QR check-in", to: "/customer/check-in" },
  { label: "Lịch sử check-in", to: "/customer/check-in-history" },
  { label: "Lịch tập", to: "/customer/calendar" },
  { label: "Yêu cầu đổi lịch", to: "/customer/reschedule/request" },
  { label: "Theo dõi yêu cầu đổi lịch", to: "/customer/reschedule/requests" },
  { label: "Lộ trình tập luyện", to: "/customer/training-roadmap" },
  { label: "Hướng dẫn bài tập", to: "/customer/exercises" },
  { label: "Trò chuyện với huấn luyện viên", to: "/customer/chat" },
  { label: "Ghi nhận buổi tập", to: "/customer/workout-log" },
  { label: "Phản hồi buổi tập", to: "/customer/workout-feedback" },
  { label: "Xác nhận hoàn thành buổi tập", to: "/customer/session-verification" },
  { label: "Gợi ý huấn luyện viên phù hợp", to: "/customer/trainer-recommendations" },
  { label: "Tiến độ và chỉ số tập luyện", to: "/customer/progress" },
  { label: "Danh sách thông báo", to: "/customer/notifications" },
  { label: "Chi tiết thông báo", to: "/customer/notifications/n1" },
  { label: "Yêu cầu hoàn tiền", to: "/customer/refunds/create" },
  { label: "Giáo án tập thử", to: "/customer/sample-workouts" },
];
