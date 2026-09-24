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
        title: "Tổng quan",
        items: [
          { label: "Tổng quan", to: "/trainer/dashboard", icon: LayoutDashboard },
          { label: "Lịch hướng dẫn", to: "/trainer/calendar", icon: CalendarDays },
          { label: "Thông báo", to: "/trainer/notifications", icon: Bell },
          { label: "Trò chuyện", to: "/trainer/chat", icon: MessageSquare },
        ],
      },
      {
        title: "Học viên & giáo án",
        items: [
          { label: "Học viên", to: "/trainer/customers", icon: Users },
          { label: "Tiến độ học viên", to: "/trainer/progress", icon: Activity },
          { label: "Giáo án", to: "/trainer/lesson-plans", icon: ClipboardList },
          { label: "Bài tập", to: "/trainer/exercises", icon: Dumbbell },
          { label: "Yêu cầu đổi lịch", to: "/trainer/reschedule/requests", icon: History },
          { label: "Ngày nghỉ", to: "/trainer/days-off", icon: CalendarDays },
        ],
      },
      {
        title: "Hồ sơ",
        items: [
          { label: "Hồ sơ của tôi", to: "/trainer/profile", icon: UserRound },
          { label: "Chứng chỉ", to: "/trainer/certificates", icon: BadgeCheck },
          { label: "Đánh giá về tôi", to: "/trainer/reviews", icon: Star },
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
          { label: "Tổng quan", to: "/staff/dashboard", icon: LayoutDashboard },
          { label: "Thanh toán", to: "/staff/payments", icon: CreditCard },
          { label: "Thông báo", to: "/staff/notifications", icon: Bell },
        ],
      },
      {
        title: "Gói tập",
        items: [
          { label: "Gói hội viên", to: "/staff/membership-packages", icon: Package },
          { label: "Gói PT", to: "/staff/trainer-packages", icon: Users },
        ],
      },
      {
        title: "Nội dung & đánh giá",
        items: [
          { label: "Bài viết", to: "/staff/articles", icon: BookOpen },
          { label: "Đánh giá phòng gym", to: "/staff/gym-reviews", icon: Star },
          { label: "Đánh giá HLV", to: "/staff/trainer-reviews", icon: MessageSquare },
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
        title: "Tổng quan",
        items: [
          { label: "Tổng quan", to: "/manager/dashboard", icon: LayoutDashboard },
          { label: "Thông báo", to: "/manager/notifications", icon: Bell },
        ],
      },
      {
        title: "Nhân sự & vận hành",
        items: [
          { label: "Nhân viên", to: "/manager/staff", icon: UserCog },
          { label: "Huấn luyện viên", to: "/manager/trainers", icon: Dumbbell },
          { label: "Cơ sở vật chất", to: "/manager/facilities", icon: Settings },
          { label: "Hoàn tiền", to: "/manager/refunds", icon: Wallet },
          { label: "Bài tập", to: "/manager/exercises", icon: ClipboardList },
        ],
      },
      {
        title: "Thống kê",
        items: [
          { label: "Doanh thu", to: "/manager/analytics/revenue", icon: BarChart3 },
          { label: "Thanh toán", to: "/manager/analytics/payments", icon: CreditCard },
          { label: "Check-in", to: "/manager/analytics/check-ins", icon: Activity },
          { label: "Xếp hạng HLV", to: "/manager/analytics/trainers", icon: Star },
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

/** Toàn bộ trang huấn luyện viên, dùng cho trang điều hướng kiểm thử. */
export const TRAINER_PAGES: { label: string; to: string }[] = [
  { label: "Tổng quan huấn luyện viên", to: "/trainer/dashboard" },
  { label: "Hồ sơ huấn luyện viên", to: "/trainer/profile" },
  { label: "Cập nhật hồ sơ", to: "/trainer/profile/edit" },
  { label: "Danh sách chứng chỉ", to: "/trainer/certificates" },
  { label: "Chi tiết chứng chỉ", to: "/trainer/certificates/cert1" },
  { label: "Lịch hướng dẫn", to: "/trainer/calendar" },
  { label: "Đăng ký ngày nghỉ", to: "/trainer/days-off" },
  { label: "Xác nhận buổi tập hoàn thành", to: "/trainer/sessions/s6/verify" },
  { label: "Phản hồi sau buổi tập", to: "/trainer/sessions/s6/feedback" },
  { label: "Xử lý yêu cầu đổi lịch", to: "/trainer/reschedule/requests" },
  { label: "Gửi yêu cầu đổi lịch", to: "/trainer/reschedule/create" },
  { label: "Danh sách giáo án", to: "/trainer/lesson-plans" },
  { label: "Chi tiết giáo án", to: "/trainer/lesson-plans/p1" },
  { label: "Tạo giáo án", to: "/trainer/lesson-plans/create" },
  { label: "Chỉnh sửa giáo án", to: "/trainer/lesson-plans/p1/edit" },
  { label: "Danh sách bài tập", to: "/trainer/exercises" },
  { label: "Chi tiết bài tập", to: "/trainer/exercises/e6" },
  { label: "Tạo bài tập tùy chỉnh", to: "/trainer/exercises/create" },
  { label: "Cập nhật bài tập tùy chỉnh", to: "/trainer/exercises/e6/edit" },
  { label: "Đánh giá về tôi", to: "/trainer/reviews" },
  { label: "Chi tiết và phản hồi đánh giá", to: "/trainer/reviews/r1" },
  { label: "Điều khiển buổi tập trực tiếp", to: "/trainer/live-sessions/s2" },
  { label: "Tiến độ tập luyện của học viên", to: "/trainer/progress" },
  { label: "Danh sách học viên", to: "/trainer/customers" },
  { label: "Hồ sơ và chỉ số học viên", to: "/trainer/customers/c1" },
  { label: "Giáo án được AI gợi ý", to: "/trainer/customers/c1/ai-plan" },
  { label: "Kế hoạch dinh dưỡng", to: "/trainer/customers/c1/nutrition-plan" },
  { label: "Xuất bản giáo án", to: "/trainer/plans/p1/publish" },
  { label: "Đánh giá cột mốc", to: "/trainer/plans/p1/milestones" },
  { label: "Lịch sử phiên bản giáo án", to: "/trainer/plans/p1/versions" },
  { label: "Trò chuyện với hội viên", to: "/trainer/chat" },
  { label: "Thông báo", to: "/trainer/notifications" },
];

export const STAFF_PAGES: { label: string; to: string }[] = [
  { label: "Tổng quan nhân viên", to: "/staff/dashboard" },
  { label: "Danh sách gói PT", to: "/staff/trainer-packages" },
  { label: "Chi tiết gói PT", to: "/staff/trainer-packages/t1" },
  { label: "Danh sách gói hội viên", to: "/staff/membership-packages" },
  { label: "Chi tiết gói hội viên", to: "/staff/membership-packages/m1" },
  { label: "Danh sách thanh toán", to: "/staff/payments" },
  { label: "Chi tiết thanh toán", to: "/staff/payments/pay3" },
  { label: "Quản lý bài viết", to: "/staff/articles" },
  { label: "Tạo bài viết", to: "/staff/articles/create" },
  { label: "Chỉnh sửa bài viết", to: "/staff/articles/a1/edit" },
  { label: "Đánh giá phòng gym", to: "/staff/gym-reviews" },
  { label: "Chi tiết và phản hồi đánh giá", to: "/staff/gym-reviews/g2" },
  { label: "Đánh giá huấn luyện viên", to: "/staff/trainer-reviews" },
  { label: "Chi tiết đánh giá huấn luyện viên", to: "/staff/trainer-reviews/tr3" },
  { label: "Thông báo", to: "/staff/notifications" },
];

export const MANAGER_PAGES: { label: string; to: string }[] = [
  { label: "Tổng quan quản lý", to: "/manager/dashboard" },
  { label: "Danh sách nhân viên", to: "/manager/staff" },
  { label: "Tạo nhân viên", to: "/manager/staff/create" },
  { label: "Chi tiết nhân viên", to: "/manager/staff/st1" },
  { label: "Cập nhật nhân viên", to: "/manager/staff/st1/edit" },
  { label: "Danh sách huấn luyện viên", to: "/manager/trainers" },
  { label: "Chi tiết huấn luyện viên", to: "/manager/trainers/tn5" },
  { label: "Xét duyệt hồ sơ huấn luyện viên", to: "/manager/trainers/tn5/review" },
  { label: "Xác minh chứng chỉ", to: "/manager/trainers/tn5/certificates" },
  { label: "Lịch huấn luyện viên", to: "/manager/trainers/tn5/schedule" },
  { label: "Danh sách cơ sở vật chất", to: "/manager/facilities" },
  { label: "Thêm cơ sở vật chất", to: "/manager/facilities/create" },
  { label: "Chi tiết cơ sở vật chất", to: "/manager/facilities/f3" },
  { label: "Cập nhật cơ sở vật chất", to: "/manager/facilities/f3/edit" },
  { label: "Thống kê thanh toán", to: "/manager/analytics/payments" },
  { label: "Tổng doanh thu", to: "/manager/analytics/revenue" },
  { label: "Lượt check-in", to: "/manager/analytics/check-ins" },
  { label: "Xếp hạng huấn luyện viên", to: "/manager/analytics/trainers" },
  { label: "Danh sách yêu cầu hoàn tiền", to: "/manager/refunds" },
  { label: "Chi tiết và xét duyệt hoàn tiền", to: "/manager/refunds/rf1" },
  { label: "Danh sách bài tập", to: "/manager/exercises" },
  { label: "Chi tiết bài tập", to: "/manager/exercises/e1" },
  { label: "Thông báo", to: "/manager/notifications" },
];

export const ROLE_PAGES: Partial<Record<RoleKey, { label: string; to: string }[]>> = {
  customer: CUSTOMER_PAGES,
  trainer: TRAINER_PAGES,
  staff: STAFF_PAGES,
  manager: MANAGER_PAGES,
};
