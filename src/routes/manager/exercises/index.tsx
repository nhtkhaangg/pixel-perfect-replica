import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { ManagerExercises } from "@/components/staffmgr/manager-pages";

export const Route = createFileRoute("/manager/exercises/")({
  head: () => opsMeta("manager", "Danh sách bài tập", "Thư viện bài tập."),
  component: ManagerExercises,
});
