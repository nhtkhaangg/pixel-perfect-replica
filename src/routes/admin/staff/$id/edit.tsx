import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { AdminStaffEdit } from "@/components/staffmgr/admin-pages";

export const Route = createFileRoute("/admin/staff/$id/edit")({
  head: () => opsMeta("admin", "Cập nhật nhân viên", "Chỉnh sửa thông tin nhân viên."),
  component: AdminStaffEdit,
});
