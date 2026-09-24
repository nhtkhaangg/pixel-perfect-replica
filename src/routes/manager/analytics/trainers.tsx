import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { ManagerTrainerRanking } from "@/components/staffmgr/manager-pages";

export const Route = createFileRoute("/manager/analytics/trainers")({
  head: () => opsMeta("manager", "Xếp hạng huấn luyện viên", "Bảng xếp hạng HLV."),
  component: ManagerTrainerRanking,
});
