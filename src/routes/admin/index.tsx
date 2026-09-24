import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/shared/PageHeader";
import { EmptyState } from "@/components/shared/states";
import { StatusBadge } from "@/components/shared/StatusBadge";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Quản trị hệ thống — GymCore" },
      {
        name: "description",
        content: "Khu vực quản trị viên của hệ thống quản lý phòng tập GymCore.",
      },
      { property: "og:title", content: "Quản trị hệ thống — GymCore" },
      {
        property: "og:description",
        content: "Giao diện dành cho vai trò quản trị viên tại phòng tập GymCore.",
      },
    ],
  }),
  component: AdminOverview,
});

function AdminOverview() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Quản trị hệ thống"
        description="Bố cục và bộ thành phần dùng chung đã sẵn sàng cho vai trò quản trị viên."
        breadcrumbs={[{ label: "Trang chủ", to: "/" }, { label: "Quản trị hệ thống" }]}
        actions={<StatusBadge tone="info" label="Vai trò: Quản trị viên" />}
      />
      <div className="card-surface">
        <EmptyState
          title="Nội dung đang được xây dựng"
          description="Các trang nghiệp vụ của khu vực này sẽ được bổ sung ở bước tiếp theo. Bạn có thể thử menu bên trái, thanh trên và điều hướng di động."
        />
      </div>
    </div>
  );
}
