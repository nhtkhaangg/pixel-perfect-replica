import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { AdminManagerDetail } from "@/components/staffmgr/admin-pages";

export const Route = createFileRoute("/admin/managers/$id/")({
  head: () => opsMeta("admin", "Chi tiết quản lý", "Thông tin quản lý."),
  component: AdminManagerDetail,
});
