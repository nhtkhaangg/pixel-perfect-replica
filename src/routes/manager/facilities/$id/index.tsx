import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { ManagerFacilityDetail } from "@/components/staffmgr/manager-pages";

export const Route = createFileRoute("/manager/facilities/$id/")({
  head: () => opsMeta("manager", "Chi tiết cơ sở vật chất", "Thông tin và bảo trì thiết bị."),
  component: ManagerFacilityDetail,
});
