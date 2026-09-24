import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/shared/PageHeader";
import { EmptyState } from "@/components/shared/states";
import { StatusBadge } from "@/components/shared/StatusBadge";

export const Route = createFileRoute("/trainer/")({
  head: () => ({
    meta: [
      { title: "Khu vực huấn luyện — GymCore" },
      {
        name: "description",
        content: "Khu vực huấn luyện viên của hệ thống quản lý phòng tập GymCore.",
      },
      { property: "og:title", content: "Khu vực huấn luyện — GymCore" },
      {
        property: "og:description",
        content: "Giao diện dành cho vai trò huấn luyện viên tại phòng tập GymCore.",
      },
    ],
  }),
  component: TrainerOverview,
});

function TrainerOverview() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Khu vực huấn luyện"
        description="Bố cục và bộ thành phần dùng chung đã sẵn sàng cho vai trò huấn luyện viên."
        breadcrumbs={[{ label: "Trang chủ", to: "/" }, { label: "Khu vực huấn luyện" }]}
        actions={<StatusBadge tone="info" label="Vai trò: Huấn luyện viên" />}
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
