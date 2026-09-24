import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { AdminTrainerPackages } from "@/components/staffmgr/admin-pages";

export const Route = createFileRoute("/admin/trainer-packages/")({
  head: () => opsMeta("admin", "Danh sách gói PT", "Quản lý gói huấn luyện cá nhân."),
  component: AdminTrainerPackages,
});
