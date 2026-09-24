import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { TrainerExercises } from "@/components/trainer/pages-b";

export const Route = createFileRoute("/trainer/exercises/")({
  head: () => opsMeta("trainer", "Danh sách bài tập", "Thư viện bài tập và bài tập tuỳ chỉnh."),
  component: TrainerExercises,
});
