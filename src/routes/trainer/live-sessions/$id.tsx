import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { TrainerLiveSession } from "@/components/trainer/pages-c";

export const Route = createFileRoute("/trainer/live-sessions/$id")({
  head: () => opsMeta("trainer", "Điều khiển buổi tập trực tiếp", "Hẹn giờ, bài tập, hiệp, mức tạ và RPE."),
  component: TrainerLiveSession,
});
