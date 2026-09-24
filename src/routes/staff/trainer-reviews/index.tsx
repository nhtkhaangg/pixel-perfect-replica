import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { StaffTrainerReviews } from "@/components/staffmgr/staff-pages";

export const Route = createFileRoute("/staff/trainer-reviews/")({
  head: () => opsMeta("staff", "Đánh giá huấn luyện viên", "Đánh giá của hội viên về HLV."),
  component: StaffTrainerReviews,
});
