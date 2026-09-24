import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { StaffTrainerPackages } from "@/components/staffmgr/staff-pages";

export const Route = createFileRoute("/staff/trainer-packages/")({
  head: () => opsMeta("staff", "Danh sách gói PT", "Các gói huấn luyện cá nhân đang bán."),
  component: StaffTrainerPackages,
});
