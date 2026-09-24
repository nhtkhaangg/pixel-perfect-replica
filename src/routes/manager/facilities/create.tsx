import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { ManagerFacilityCreate } from "@/components/staffmgr/manager-pages";

export const Route = createFileRoute("/manager/facilities/create")({
  head: () => opsMeta("manager", "Thêm cơ sở vật chất", "Thêm thiết bị mới."),
  component: ManagerFacilityCreate,
});
