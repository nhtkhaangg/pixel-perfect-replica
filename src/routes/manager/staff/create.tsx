import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { ManagerStaffCreate } from "@/components/staffmgr/manager-pages";

export const Route = createFileRoute("/manager/staff/create")({
  head: () => opsMeta("manager", "Tạo nhân viên", "Thêm nhân viên mới."),
  component: ManagerStaffCreate,
});
