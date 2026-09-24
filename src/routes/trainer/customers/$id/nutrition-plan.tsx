import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { TrainerNutritionPlan } from "@/components/trainer/pages-c";

export const Route = createFileRoute("/trainer/customers/$id/nutrition-plan")({
  head: () => opsMeta("trainer", "Kế hoạch dinh dưỡng", "Calo, dinh dưỡng đa lượng và thực đơn."),
  component: TrainerNutritionPlan,
});
