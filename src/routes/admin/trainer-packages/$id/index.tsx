import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { AdminTrainerPackageDetail } from "@/components/staffmgr/admin-pages";

export const Route = createFileRoute("/admin/trainer-packages/$id/")({
  head: () => opsMeta("admin", "Chi tiết gói PT", "Chi tiết gói PT."),
  component: AdminTrainerPackageDetail,
});
