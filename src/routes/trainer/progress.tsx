import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { TrainerProgress } from "@/components/trainer/pages-c";

export const Route = createFileRoute("/trainer/progress")({
  head: () => opsMeta("trainer", "Tiến độ tập luyện của học viên", "Tổng hợp tiến độ học viên."),
  component: TrainerProgress,
});
