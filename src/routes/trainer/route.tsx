import { Outlet, createFileRoute } from "@tanstack/react-router";

import { DashboardLayout } from "@/components/layout/DashboardLayout";

export const Route = createFileRoute("/trainer")({
  component: TrainerLayout,
});

function TrainerLayout() {
  return (
    <DashboardLayout role="trainer">
      {/* Required: nested routes render here. */}
      <Outlet />
    </DashboardLayout>
  );
}
