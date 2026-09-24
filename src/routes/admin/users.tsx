import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { AdminUsers } from "@/components/staffmgr/admin-pages";

export const Route = createFileRoute("/admin/users")({
  head: () => opsMeta("admin", "Quản lý người dùng", "Tìm, lọc, khoá và mở khoá tài khoản."),
  component: AdminUsers,
});
