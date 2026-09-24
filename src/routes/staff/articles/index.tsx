import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { StaffArticles } from "@/components/staffmgr/staff-pages";

export const Route = createFileRoute("/staff/articles/")({
  head: () => opsMeta("staff", "Quản lý bài viết", "Bài viết kiến thức thể hình."),
  component: StaffArticles,
});
