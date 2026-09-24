import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { AdminNotifications } from "@/components/staffmgr/admin-pages";

export const Route = createFileRoute("/admin/notifications")({
  head: () => opsMeta("admin", "Thông báo", "Thông báo quản trị."),
  component: AdminNotifications,
});
