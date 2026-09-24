import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { ManagerDashboard } from "@/components/staffmgr/manager-pages";

export const Route = createFileRoute("/manager/dashboard")({
  head: () => opsMeta("manager", "Tổng quan quản lý", "Doanh thu, check-in, hoàn tiền và HLV nổi bật."),
  component: ManagerDashboard,
});
