import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { ManagerRefunds } from "@/components/staffmgr/manager-pages";

export const Route = createFileRoute("/manager/refunds/")({
  head: () => opsMeta("manager", "Danh sách yêu cầu hoàn tiền", "Yêu cầu hoàn tiền của hội viên."),
  component: ManagerRefunds,
});
