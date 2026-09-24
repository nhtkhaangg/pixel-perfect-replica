import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { ManagerTrainerReview } from "@/components/staffmgr/manager-pages";

export const Route = createFileRoute("/manager/trainers/$id/review")({
  head: () => opsMeta("manager", "Xét duyệt hồ sơ huấn luyện viên", "Duyệt hoặc từ chối hồ sơ HLV."),
  component: ManagerTrainerReview,
});
