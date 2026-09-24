import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { AdminMembershipPackageEdit } from "@/components/staffmgr/admin-pages";

export const Route = createFileRoute("/admin/membership-packages/$id/edit")({
  head: () => opsMeta("admin", "Cập nhật gói hội viên", "Chỉnh sửa gói hội viên."),
  component: AdminMembershipPackageEdit,
});
