import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { TrainerCustomerDetail } from "@/components/trainer/pages-c";

export const Route = createFileRoute("/trainer/customers/$id/")({
  head: () => opsMeta("trainer", "Hồ sơ và chỉ số học viên", "Hồ sơ, chỉ số và giáo án học viên."),
  component: TrainerCustomerDetail,
});
