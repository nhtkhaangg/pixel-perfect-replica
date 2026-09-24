import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { ManagerExerciseDetail } from "@/components/staffmgr/manager-pages";

export const Route = createFileRoute("/manager/exercises/$id")({
  head: () => opsMeta("manager", "Chi tiết bài tập", "Chi tiết bài tập."),
  component: ManagerExerciseDetail,
});
