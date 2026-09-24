import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { StaffPayments } from "@/components/staffmgr/staff-pages";

export const Route = createFileRoute("/staff/payments/")({
  head: () => opsMeta("staff", "Danh sách thanh toán", "Tất cả giao dịch thanh toán."),
  component: StaffPayments,
});
