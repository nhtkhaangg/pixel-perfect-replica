import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { StaffNotifications } from "@/components/staffmgr/staff-pages";

export const Route = createFileRoute("/staff/notifications")({
  head: () => opsMeta("staff", "Thông báo", "Thông báo cho nhân viên."),
  component: StaffNotifications,
});
