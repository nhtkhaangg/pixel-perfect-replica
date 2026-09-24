import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { ManagerPaymentAnalytics } from "@/components/staffmgr/manager-pages";

export const Route = createFileRoute("/manager/analytics/payments")({
  head: () => opsMeta("manager", "Thống kê thanh toán", "Thống kê giao dịch."),
  component: ManagerPaymentAnalytics,
});
