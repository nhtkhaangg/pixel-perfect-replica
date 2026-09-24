import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { TrainerReviews } from "@/components/trainer/pages-b";

export const Route = createFileRoute("/trainer/reviews/")({
  head: () => opsMeta("trainer", "Đánh giá về tôi", "Đánh giá của học viên."),
  component: TrainerReviews,
});
