import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { AdminStaff } from "@/components/staffmgr/admin-pages";

export const Route = createFileRoute("/admin/staff/")({
  head: () => opsMeta("admin", "Danh sách nhân viên", "Tài khoản nhân viên của phòng gym."),
  component: AdminStaff,
});
