import { Outlet, createFileRoute } from "@tanstack/react-router";

import { DashboardLayout } from "@/components/layout/DashboardLayout";

export const Route = createFileRoute("/staff")({
  component: StaffLayout,
});

function StaffLayout() {
  return (
    <DashboardLayout role="staff">
      {/* Required: nested routes render here. */}
      <Outlet />
    </DashboardLayout>
  );
}
