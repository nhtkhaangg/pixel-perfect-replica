import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { StaffPaymentDetail } from "@/components/staffmgr/staff-pages";

export const Route = createFileRoute("/staff/payments/$id")({
  head: () => opsMeta("staff", "Chi tiết thanh toán", "Chi tiết và xác nhận giao dịch."),
  component: StaffPaymentDetail,
});
