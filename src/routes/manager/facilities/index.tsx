import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { ManagerFacilities } from "@/components/staffmgr/manager-pages";

export const Route = createFileRoute("/manager/facilities/")({
  head: () => opsMeta("manager", "Danh sách cơ sở vật chất", "Thiết bị và tình trạng."),
  component: ManagerFacilities,
});
