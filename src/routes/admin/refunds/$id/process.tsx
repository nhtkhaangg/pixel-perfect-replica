import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { AdminRefundProcess } from "@/components/staffmgr/admin-pages";

export const Route = createFileRoute("/admin/refunds/$id/process")({
  head: () => opsMeta("admin", "Xử lý thanh toán hoàn tiền", "Chi trả hoàn tiền đã duyệt."),
  component: AdminRefundProcess,
});
