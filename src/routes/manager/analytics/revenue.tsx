import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { ManagerRevenue } from "@/components/staffmgr/manager-pages";

export const Route = createFileRoute("/manager/analytics/revenue")({
  head: () => opsMeta("manager", "Tổng doanh thu", "Doanh thu theo tháng."),
  component: ManagerRevenue,
});
