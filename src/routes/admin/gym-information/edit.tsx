import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { AdminGymInfoEdit } from "@/components/staffmgr/admin-pages";

export const Route = createFileRoute("/admin/gym-information/edit")({
  head: () => opsMeta("admin", "Cập nhật thông tin phòng gym", "Chỉnh sửa thông tin phòng gym."),
  component: AdminGymInfoEdit,
});
