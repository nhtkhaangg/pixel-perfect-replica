import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { StaffMembershipPackageDetail } from "@/components/staffmgr/staff-pages";

export const Route = createFileRoute("/staff/membership-packages/$id")({
  head: () => opsMeta("staff", "Chi tiết gói hội viên", "Thông tin gói hội viên."),
  component: StaffMembershipPackageDetail,
});
