import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { ManagerFacilityEdit } from "@/components/staffmgr/manager-pages";

export const Route = createFileRoute("/manager/facilities/$id/edit")({
  head: () => opsMeta("manager", "Cập nhật cơ sở vật chất", "Chỉnh sửa thiết bị."),
  component: ManagerFacilityEdit,
});
