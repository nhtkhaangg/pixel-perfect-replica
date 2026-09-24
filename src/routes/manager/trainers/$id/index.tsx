import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { ManagerTrainerDetail } from "@/components/staffmgr/manager-pages";

export const Route = createFileRoute("/manager/trainers/$id/")({
  head: () => opsMeta("manager", "Chi tiết huấn luyện viên", "Hồ sơ và hiệu suất HLV."),
  component: ManagerTrainerDetail,
});
