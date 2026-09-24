import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { TrainerCalendar } from "@/components/trainer/pages-a";

export const Route = createFileRoute("/trainer/calendar")({
  head: () => opsMeta("trainer", "Lịch hướng dẫn", "Lịch dạy theo tuần và tháng."),
  component: TrainerCalendar,
});
