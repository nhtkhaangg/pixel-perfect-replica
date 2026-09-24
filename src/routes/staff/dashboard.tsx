import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { StaffDashboard } from "@/components/staffmgr/staff-pages";

export const Route = createFileRoute("/staff/dashboard")({
  head: () => opsMeta("staff", "Tổng quan nhân viên", "Giao dịch, hội viên mới, thanh toán chờ và đánh giá."),
  component: StaffDashboard,
});
