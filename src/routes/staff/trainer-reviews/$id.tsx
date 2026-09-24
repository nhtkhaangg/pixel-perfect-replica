import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { StaffTrainerReviewDetail } from "@/components/staffmgr/staff-pages";

export const Route = createFileRoute("/staff/trainer-reviews/$id")({
  head: () => opsMeta("staff", "Chi tiết đánh giá huấn luyện viên", "Chi tiết đánh giá HLV."),
  component: StaffTrainerReviewDetail,
});
