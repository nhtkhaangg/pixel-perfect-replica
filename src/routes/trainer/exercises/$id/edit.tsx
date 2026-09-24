import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { TrainerExerciseEdit } from "@/components/trainer/pages-b";

export const Route = createFileRoute("/trainer/exercises/$id/edit")({
  head: () => opsMeta("trainer", "Cập nhật bài tập tùy chỉnh", "Chỉnh sửa bài tập tuỳ chỉnh."),
  component: TrainerExerciseEdit,
});
