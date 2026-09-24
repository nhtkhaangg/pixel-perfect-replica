import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { AdminMembershipPackages } from "@/components/staffmgr/admin-pages";

export const Route = createFileRoute("/admin/membership-packages/")({
  head: () => opsMeta("admin", "Danh sách gói hội viên", "Quản lý gói hội viên."),
  component: AdminMembershipPackages,
});
