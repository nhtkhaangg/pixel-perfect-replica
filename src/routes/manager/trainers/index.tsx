import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { ManagerTrainers } from "@/components/staffmgr/manager-pages";

export const Route = createFileRoute("/manager/trainers/")({
  head: () => opsMeta("manager", "Danh sách huấn luyện viên", "Huấn luyện viên của phòng gym."),
  component: ManagerTrainers,
});
