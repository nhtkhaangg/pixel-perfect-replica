import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { TrainerLessonPlanDetail } from "@/components/trainer/pages-b";

export const Route = createFileRoute("/trainer/lesson-plans/$id/")({
  head: () => opsMeta("trainer", "Chi tiết giáo án", "Nội dung từng buổi trong giáo án."),
  component: TrainerLessonPlanDetail,
});
