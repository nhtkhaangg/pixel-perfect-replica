import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { TrainerRescheduleCreate } from "@/components/trainer/pages-a";

export const Route = createFileRoute("/trainer/reschedule/create")({
  head: () => opsMeta("trainer", "Gửi yêu cầu đổi lịch", "Đề xuất thời gian mới cho buổi tập."),
  component: TrainerRescheduleCreate,
});
