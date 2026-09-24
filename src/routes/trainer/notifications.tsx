import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { TrainerNotifications } from "@/components/trainer/pages-c";

export const Route = createFileRoute("/trainer/notifications")({
  head: () => opsMeta("trainer", "Thông báo", "Thông báo của huấn luyện viên."),
  component: TrainerNotifications,
});
