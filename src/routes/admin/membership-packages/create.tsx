import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { AdminMembershipPackageCreate } from "@/components/staffmgr/admin-pages";

export const Route = createFileRoute("/admin/membership-packages/create")({
  head: () => opsMeta("admin", "Tạo gói hội viên", "Tạo gói hội viên."),
  component: AdminMembershipPackageCreate,
});
