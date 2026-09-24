import { Outlet, createFileRoute } from "@tanstack/react-router";

import { DashboardLayout } from "@/components/layout/DashboardLayout";

export const Route = createFileRoute("/manager")({
  component: ManagerLayout,
});

function ManagerLayout() {
  return (
    <DashboardLayout role="manager">
      {/* Required: nested routes render here. */}
      <Outlet />
    </DashboardLayout>
  );
}
