import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { TrainerAiPlan } from "@/components/trainer/pages-c";

export const Route = createFileRoute("/trainer/customers/$id/ai-plan")({
  head: () => opsMeta("trainer", "Giáo án được AI gợi ý", "Gợi ý giáo án từ AI để HLV xem xét."),
  component: TrainerAiPlan,
});
