import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { TrainerCustomers } from "@/components/trainer/pages-c";

export const Route = createFileRoute("/trainer/customers/")({
  head: () => opsMeta("trainer", "Danh sách học viên", "Học viên đang được hướng dẫn."),
  component: TrainerCustomers,
});
