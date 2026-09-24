import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { ManagerTrainerSchedule } from "@/components/staffmgr/manager-pages";

export const Route = createFileRoute("/manager/trainers/$id/schedule")({
  head: () => opsMeta("manager", "Lịch huấn luyện viên", "Lịch dạy trong tuần của HLV."),
  component: ManagerTrainerSchedule,
});
