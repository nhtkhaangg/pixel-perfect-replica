import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/shared/PageHeader";
import { EmptyState } from "@/components/shared/states";
import { StatusBadge } from "@/components/shared/StatusBadge";

export const Route = createFileRoute("/customer/")({
  head: () => ({
    meta: [
      { title: "Cổng hội viên — GymCore" },
      {
        name: "description",
        content: "Khu vực hội viên của hệ thống quản lý phòng tập GymCore.",
      },
      { property: "og:title", content: "Cổng hội viên — GymCore" },
      {
        property: "og:description",
        content: "Giao diện dành cho vai trò hội viên tại phòng tập GymCore.",
      },
    ],
  }),
  component: CustomerOverview,
});

function CustomerOverview() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Cổng hội viên"
        description="Bố cục và bộ thành phần dùng chung đã sẵn sàng cho vai trò hội viên."
        breadcrumbs={[{ label: "Trang chủ", to: "/" }, { label: "Cổng hội viên" }]}
        actions={<StatusBadge tone="info" label="Vai trò: Hội viên" />}
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
