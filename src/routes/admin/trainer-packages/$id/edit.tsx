import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { AdminTrainerPackageEdit } from "@/components/staffmgr/admin-pages";

export const Route = createFileRoute("/admin/trainer-packages/$id/edit")({
  head: () => opsMeta("admin", "Cập nhật gói PT", "Chỉnh sửa gói PT."),
  component: AdminTrainerPackageEdit,
});
