import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { AdminStaffDetail } from "@/components/staffmgr/admin-pages";

export const Route = createFileRoute("/admin/staff/$id/")({
  head: () => opsMeta("admin", "Chi tiết nhân viên", "Hồ sơ và hoạt động của nhân viên."),
  component: AdminStaffDetail,
});
