import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { TrainerReviewDetail } from "@/components/trainer/pages-b";

export const Route = createFileRoute("/trainer/reviews/$id")({
  head: () => opsMeta("trainer", "Chi tiết và phản hồi đánh giá", "Phản hồi đánh giá của học viên."),
  component: TrainerReviewDetail,
});
