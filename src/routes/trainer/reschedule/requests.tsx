import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { TrainerRescheduleRequests } from "@/components/trainer/pages-a";

export const Route = createFileRoute("/trainer/reschedule/requests")({
  head: () => opsMeta("trainer", "Xử lý yêu cầu đổi lịch", "Duyệt hoặc từ chối yêu cầu đổi lịch."),
  component: TrainerRescheduleRequests,
});
