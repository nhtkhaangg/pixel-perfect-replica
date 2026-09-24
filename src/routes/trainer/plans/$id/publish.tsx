import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { TrainerPlanPublish } from "@/components/trainer/pages-c";

export const Route = createFileRoute("/trainer/plans/$id/publish")({
  head: () => opsMeta("trainer", "Xuất bản giáo án", "Xác nhận xuất bản giáo án cho học viên."),
  component: TrainerPlanPublish,
});
