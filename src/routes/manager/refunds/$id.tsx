import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { ManagerRefundDetail } from "@/components/staffmgr/manager-pages";

export const Route = createFileRoute("/manager/refunds/$id")({
  head: () => opsMeta("manager", "Chi tiết và xét duyệt hoàn tiền", "Xét duyệt hoàn tiền."),
  component: ManagerRefundDetail,
});
