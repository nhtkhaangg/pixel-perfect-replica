import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { TrainerLessonPlanEdit } from "@/components/trainer/pages-b";

export const Route = createFileRoute("/trainer/lesson-plans/$id/edit")({
  head: () => opsMeta("trainer", "Chỉnh sửa giáo án", "Chỉnh sửa và lưu phiên bản giáo án."),
  component: TrainerLessonPlanEdit,
});
