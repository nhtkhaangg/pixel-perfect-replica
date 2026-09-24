import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { AdminDashboard } from "@/components/staffmgr/admin-pages";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => opsMeta("admin", "Tổng quan quản trị", "Tài khoản, gói dịch vụ, hoàn tiền và hệ thống."),
  component: AdminDashboard,
});
