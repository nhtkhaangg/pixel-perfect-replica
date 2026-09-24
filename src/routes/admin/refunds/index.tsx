import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { AdminRefunds } from "@/components/staffmgr/admin-pages";

export const Route = createFileRoute("/admin/refunds/")({
  head: () => opsMeta("admin", "Danh sách giao dịch hoàn tiền", "Hoàn tiền chờ chi trả."),
  component: AdminRefunds,
});
