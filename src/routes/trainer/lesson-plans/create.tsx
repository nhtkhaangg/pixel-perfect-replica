import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { TrainerLessonPlanCreate } from "@/components/trainer/pages-b";

export const Route = createFileRoute("/trainer/lesson-plans/create")({
  head: () => opsMeta("trainer", "Tạo giáo án", "Xây dựng giáo án mới."),
  component: TrainerLessonPlanCreate,
});
