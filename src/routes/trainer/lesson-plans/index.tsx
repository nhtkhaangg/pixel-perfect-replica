import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { TrainerLessonPlans } from "@/components/trainer/pages-b";

export const Route = createFileRoute("/trainer/lesson-plans/")({
  head: () => opsMeta("trainer", "Danh sách giáo án", "Giáo án của các học viên."),
  component: TrainerLessonPlans,
});
