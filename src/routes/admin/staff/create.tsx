import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { AdminStaffCreate } from "@/components/staffmgr/admin-pages";

export const Route = createFileRoute("/admin/staff/create")({
  head: () => opsMeta("admin", "Tạo nhân viên", "Thêm tài khoản nhân viên mới."),
  component: AdminStaffCreate,
});
