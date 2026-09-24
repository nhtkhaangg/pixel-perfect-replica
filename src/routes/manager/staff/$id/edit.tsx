import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { ManagerStaffEdit } from "@/components/staffmgr/manager-pages";

export const Route = createFileRoute("/manager/staff/$id/edit")({
  head: () => opsMeta("manager", "Cập nhật nhân viên", "Chỉnh sửa nhân viên."),
  component: ManagerStaffEdit,
});
