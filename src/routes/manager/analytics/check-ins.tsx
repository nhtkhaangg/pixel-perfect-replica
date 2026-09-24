import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { ManagerCheckins } from "@/components/staffmgr/manager-pages";

export const Route = createFileRoute("/manager/analytics/check-ins")({
  head: () => opsMeta("manager", "Lượt check-in", "Lượt check-in theo ngày và giờ."),
  component: ManagerCheckins,
});
