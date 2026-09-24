import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { AdminManagerCreate } from "@/components/staffmgr/admin-pages";

export const Route = createFileRoute("/admin/managers/create")({
  head: () => opsMeta("admin", "Tạo tài khoản quản lý", "Tạo tài khoản quản lý."),
  component: AdminManagerCreate,
});
