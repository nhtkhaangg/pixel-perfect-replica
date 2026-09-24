import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { AdminMembershipPackageDetail } from "@/components/staffmgr/admin-pages";

export const Route = createFileRoute("/admin/membership-packages/$id/")({
  head: () => opsMeta("admin", "Chi tiết gói hội viên", "Chi tiết gói hội viên."),
  component: AdminMembershipPackageDetail,
});
