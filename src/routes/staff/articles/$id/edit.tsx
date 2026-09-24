import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { StaffArticleEdit } from "@/components/staffmgr/staff-pages";

export const Route = createFileRoute("/staff/articles/$id/edit")({
  head: () => opsMeta("staff", "Chỉnh sửa bài viết", "Chỉnh sửa bài viết."),
  component: StaffArticleEdit,
});
