import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { StaffArticleCreate } from "@/components/staffmgr/staff-pages";

export const Route = createFileRoute("/staff/articles/create")({
  head: () => opsMeta("staff", "Tạo bài viết", "Soạn bài viết mới."),
  component: StaffArticleCreate,
});
