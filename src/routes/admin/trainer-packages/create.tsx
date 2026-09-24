import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { AdminTrainerPackageCreate } from "@/components/staffmgr/admin-pages";

export const Route = createFileRoute("/admin/trainer-packages/create")({
  head: () => opsMeta("admin", "Tạo gói PT", "Tạo gói huấn luyện cá nhân."),
  component: AdminTrainerPackageCreate,
});
