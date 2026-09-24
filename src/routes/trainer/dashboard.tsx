import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { TrainerDashboard } from "@/components/trainer/pages-a";

export const Route = createFileRoute("/trainer/dashboard")({
  head: () => opsMeta("trainer", "Tổng quan huấn luyện viên", "Lịch dạy hôm nay, học viên, đổi lịch và đánh giá."),
  component: TrainerDashboard,
});
