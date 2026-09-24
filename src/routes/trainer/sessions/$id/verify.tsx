import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { TrainerSessionVerify } from "@/components/trainer/pages-a";

export const Route = createFileRoute("/trainer/sessions/$id/verify")({
  head: () => opsMeta("trainer", "Xác nhận buổi tập hoàn thành", "Xác nhận buổi tập đã hoàn thành."),
  component: TrainerSessionVerify,
});
