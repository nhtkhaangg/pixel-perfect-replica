import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { TrainerDaysOff } from "@/components/trainer/pages-a";

export const Route = createFileRoute("/trainer/days-off")({
  head: () => opsMeta("trainer", "Đăng ký ngày nghỉ", "Đăng ký ngày nghỉ cố định và đơn nghỉ."),
  component: TrainerDaysOff,
});
