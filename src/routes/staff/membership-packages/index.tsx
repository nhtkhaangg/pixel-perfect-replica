import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { StaffMembershipPackages } from "@/components/staffmgr/staff-pages";

export const Route = createFileRoute("/staff/membership-packages/")({
  head: () => opsMeta("staff", "Danh sách gói hội viên", "Các gói hội viên của phòng gym."),
  component: StaffMembershipPackages,
});
