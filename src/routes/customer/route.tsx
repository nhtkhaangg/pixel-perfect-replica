import { Outlet, createFileRoute } from "@tanstack/react-router";

import { DashboardLayout } from "@/components/layout/DashboardLayout";

export const Route = createFileRoute("/customer")({
  component: CustomerLayout,
});

function CustomerLayout() {
  return (
    <DashboardLayout role="customer">
      {/* Required: nested routes render here. */}
      <Outlet />
    </DashboardLayout>
  );
}
