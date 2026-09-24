import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { AdminGymInfoCreate } from "@/components/staffmgr/admin-pages";

export const Route = createFileRoute("/admin/gym-information/create")({
  head: () => opsMeta("admin", "Thêm thông tin phòng gym", "Thêm mục thông tin phòng gym."),
  component: AdminGymInfoCreate,
});
