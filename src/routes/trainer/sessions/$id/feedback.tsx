import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { TrainerSessionFeedback } from "@/components/trainer/pages-c";

export const Route = createFileRoute("/trainer/sessions/$id/feedback")({
  head: () => opsMeta("trainer", "Phản hồi sau buổi tập", "Nhận xét và điều chỉnh sau buổi tập."),
  component: TrainerSessionFeedback,
});
