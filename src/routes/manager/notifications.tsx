import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { ManagerNotifications } from "@/components/staffmgr/manager-pages";

export const Route = createFileRoute("/manager/notifications")({
  head: () => opsMeta("manager", "Thông báo", "Thông báo cho quản lý."),
  component: ManagerNotifications,
});
