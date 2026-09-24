import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { TrainerMilestones } from "@/components/trainer/pages-c";

export const Route = createFileRoute("/trainer/plans/$id/milestones")({
  head: () => opsMeta("trainer", "Đánh giá cột mốc", "Đánh giá các cột mốc của giáo án."),
  component: TrainerMilestones,
});
