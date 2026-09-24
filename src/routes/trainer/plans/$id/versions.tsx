import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { TrainerPlanVersions } from "@/components/trainer/pages-c";

export const Route = createFileRoute("/trainer/plans/$id/versions")({
  head: () => opsMeta("trainer", "Lịch sử phiên bản giáo án", "Các phiên bản của giáo án."),
  component: TrainerPlanVersions,
});
