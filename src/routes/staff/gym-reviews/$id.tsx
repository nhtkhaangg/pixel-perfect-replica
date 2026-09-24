import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { StaffGymReviewDetail } from "@/components/staffmgr/staff-pages";

export const Route = createFileRoute("/staff/gym-reviews/$id")({
  head: () => opsMeta("staff", "Chi tiết và phản hồi đánh giá", "Phản hồi đánh giá phòng gym."),
  component: StaffGymReviewDetail,
});
