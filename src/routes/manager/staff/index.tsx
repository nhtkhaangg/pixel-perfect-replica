import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { ManagerStaff } from "@/components/staffmgr/manager-pages";

export const Route = createFileRoute("/manager/staff/")({
  head: () => opsMeta("manager", "Danh sách nhân viên", "Nhân viên của phòng gym."),
  component: ManagerStaff,
});
