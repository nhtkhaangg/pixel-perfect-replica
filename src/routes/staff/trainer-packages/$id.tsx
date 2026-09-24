import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { StaffTrainerPackageDetail } from "@/components/staffmgr/staff-pages";

export const Route = createFileRoute("/staff/trainer-packages/$id")({
  head: () => opsMeta("staff", "Chi tiết gói PT", "Thông tin gói huấn luyện cá nhân."),
  component: StaffTrainerPackageDetail,
});
