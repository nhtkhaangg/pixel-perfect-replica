import { Outlet, createFileRoute } from "@tanstack/react-router";

import { DashboardLayout } from "@/components/layout/DashboardLayout";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  return (
    <DashboardLayout role="admin">
      {/* Required: nested routes render here. */}
      <Outlet />
    </DashboardLayout>
  );
}
