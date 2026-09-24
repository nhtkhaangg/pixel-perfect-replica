import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { TrainerExerciseCreate } from "@/components/trainer/pages-b";

export const Route = createFileRoute("/trainer/exercises/create")({
  head: () => opsMeta("trainer", "Tạo bài tập tùy chỉnh", "Tạo bài tập riêng cho học viên."),
  component: TrainerExerciseCreate,
});
