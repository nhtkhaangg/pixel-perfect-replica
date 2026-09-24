import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/shared/PageHeader";
import { EmptyState } from "@/components/shared/states";
import { StatusBadge } from "@/components/shared/StatusBadge";

export const Route = createFileRoute("/staff/")({
  head: () => ({
    meta: [
      { title: "Quầy lễ tân — GymCore" },
      {
        name: "description",
        content: "Khu vực nhân viên của hệ thống quản lý phòng tập GymCore.",
      },
      { property: "og:title", content: "Quầy lễ tân — GymCore" },
      {
        property: "og:description",
        content: "Giao diện dành cho vai trò nhân viên tại phòng tập GymCore.",
      },
    ],
  }),
  component: StaffOverview,
});

function StaffOverview() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Quầy lễ tân"
        description="Bố cục và bộ thành phần dùng chung đã sẵn sàng cho vai trò nhân viên."
        breadcrumbs={[{ label: "Trang chủ", to: "/" }, { label: "Quầy lễ tân" }]}
        actions={<StatusBadge tone="info" label="Vai trò: Nhân viên" />}
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
