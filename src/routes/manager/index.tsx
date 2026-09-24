import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/shared/PageHeader";
import { EmptyState } from "@/components/shared/states";
import { StatusBadge } from "@/components/shared/StatusBadge";

export const Route = createFileRoute("/manager/")({
  head: () => ({
    meta: [
      { title: "Quản lý phòng tập — GymCore" },
      {
        name: "description",
        content: "Khu vực quản lý của hệ thống quản lý phòng tập GymCore.",
      },
      { property: "og:title", content: "Quản lý phòng tập — GymCore" },
      {
        property: "og:description",
        content: "Giao diện dành cho vai trò quản lý tại phòng tập GymCore.",
      },
    ],
  }),
  component: ManagerOverview,
});

function ManagerOverview() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Quản lý phòng tập"
        description="Bố cục và bộ thành phần dùng chung đã sẵn sàng cho vai trò quản lý."
        breadcrumbs={[{ label: "Trang chủ", to: "/" }, { label: "Quản lý phòng tập" }]}
        actions={<StatusBadge tone="info" label="Vai trò: Quản lý" />}
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
