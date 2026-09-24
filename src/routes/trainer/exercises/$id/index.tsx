import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { TrainerExerciseDetail } from "@/components/trainer/pages-b";

export const Route = createFileRoute("/trainer/exercises/$id/")({
  head: () => opsMeta("trainer", "Chi tiết bài tập", "Hướng dẫn kỹ thuật bài tập."),
  component: TrainerExerciseDetail,
});
