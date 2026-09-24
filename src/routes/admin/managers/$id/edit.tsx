import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { AdminManagerEdit } from "@/components/staffmgr/admin-pages";

export const Route = createFileRoute("/admin/managers/$id/edit")({
  head: () => opsMeta("admin", "Cập nhật quản lý", "Chỉnh sửa quản lý."),
  component: AdminManagerEdit,
});
