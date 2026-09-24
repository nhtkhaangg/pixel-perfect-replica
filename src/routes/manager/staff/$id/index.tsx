import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { ManagerStaffDetail } from "@/components/staffmgr/manager-pages";

export const Route = createFileRoute("/manager/staff/$id/")({
  head: () => opsMeta("manager", "Chi tiết nhân viên", "Thông tin nhân viên."),
  component: ManagerStaffDetail,
});
