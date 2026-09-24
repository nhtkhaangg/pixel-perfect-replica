import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { AdminGymInfo } from "@/components/staffmgr/admin-pages";

export const Route = createFileRoute("/admin/gym-information/")({
  head: () => opsMeta("admin", "Thông tin phòng gym", "Thông tin công khai của phòng gym."),
  component: AdminGymInfo,
});
