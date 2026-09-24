import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { AdminManagers } from "@/components/staffmgr/admin-pages";

export const Route = createFileRoute("/admin/managers/")({
  head: () => opsMeta("admin", "Danh sách quản lý", "Tài khoản quản lý."),
  component: AdminManagers,
});
