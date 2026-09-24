import { AlertTriangle, Inbox, RefreshCw } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function EmptyState({
  title = "Chưa có dữ liệu",
  description = "Dữ liệu sẽ xuất hiện tại đây khi có bản ghi mới.",
  icon: Icon = Inbox,
  action,
  className,
}: {
  title?: string;
  description?: string;
  icon?: LucideIcon;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center gap-3 px-6 py-14 text-center", className)}>
      <span className="grid size-12 place-items-center rounded-xl bg-muted text-muted-foreground">
        <Icon size={22} />
      </span>
      <div className="space-y-1">
        <p className="font-semibold">{title}</p>
        <p className="mx-auto max-w-sm text-sm text-muted-foreground">{description}</p>
      </div>
      {action}
    </div>
  );
}

export function LoadingState({ rows = 4, className }: { rows?: number; className?: string }) {
  return (
    <div className={cn("space-y-3 p-5", className)} aria-label="Đang tải dữ liệu">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <Skeleton className="size-10 rounded-lg" />
          <Skeleton className="h-4 flex-1" />
          <Skeleton className="h-4 w-24" />
        </div>
      ))}
      <p className="pt-1 text-center text-xs text-muted-foreground">Đang tải dữ liệu…</p>
    </div>
  );
}

export function ErrorState({
  title = "Không tải được dữ liệu",
  description = "Đã xảy ra lỗi khi tải nội dung. Vui lòng thử lại.",
  onRetry,
  className,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center gap-3 px-6 py-14 text-center", className)}>
      <span className="grid size-12 place-items-center rounded-xl bg-destructive/12 text-destructive">
        <AlertTriangle size={22} />
      </span>
      <div className="space-y-1">
        <p className="font-semibold">{title}</p>
        <p className="mx-auto max-w-sm text-sm text-muted-foreground">{description}</p>
      </div>
      {onRetry ? (
        <Button variant="outline" onClick={onRetry}>
          <RefreshCw size={14} /> Thử lại
        </Button>
      ) : null}
    </div>
  );
}
