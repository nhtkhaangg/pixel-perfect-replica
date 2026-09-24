import { cn } from "@/lib/utils";

export type StatusTone = "success" | "warning" | "danger" | "neutral" | "info";

const toneClass: Record<StatusTone, string> = {
  success: "bg-success/12 text-success border-success/30",
  warning: "bg-warning/12 text-warning border-warning/30",
  danger: "bg-destructive/12 text-destructive border-destructive/30",
  neutral: "bg-muted text-muted-foreground border-border-strong",
  info: "bg-cyan/12 text-cyan border-cyan/30",
};

/** Bản đồ trạng thái nghiệp vụ -> nhãn tiếng Việt + màu. */
export const STATUS_MAP: Record<string, { label: string; tone: StatusTone }> = {
  active: { label: "Đang hoạt động", tone: "success" },
  approved: { label: "Đã duyệt", tone: "success" },
  completed: { label: "Hoàn thành", tone: "success" },
  paid: { label: "Đã thanh toán", tone: "success" },
  pending: { label: "Chờ xử lý", tone: "warning" },
  warning: { label: "Cần chú ý", tone: "warning" },
  processing: { label: "Đang xử lý", tone: "warning" },
  rejected: { label: "Bị từ chối", tone: "danger" },
  failed: { label: "Thất bại", tone: "danger" },
  cancelled: { label: "Đã huỷ", tone: "danger" },
  locked: { label: "Đã khoá", tone: "danger" },
  draft: { label: "Bản nháp", tone: "neutral" },
  inactive: { label: "Không hoạt động", tone: "neutral" },
  expired: { label: "Hết hạn", tone: "neutral" },
  scheduled: { label: "Sắp diễn ra", tone: "info" },
  refunded: { label: "Đã hoàn tiền", tone: "neutral" },
  upcoming: { label: "Sắp tới", tone: "neutral" },
  unread: { label: "Chưa đọc", tone: "info" },
};

export function StatusBadge({
  status,
  label,
  tone,
  className,
}: {
  status?: string;
  label?: string;
  tone?: StatusTone;
  className?: string;
}) {
  const mapped = status ? STATUS_MAP[status] : undefined;
  const finalTone = tone ?? mapped?.tone ?? "neutral";
  const finalLabel = label ?? mapped?.label ?? status ?? "Không rõ";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium",
        toneClass[finalTone],
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {finalLabel}
    </span>
  );
}
