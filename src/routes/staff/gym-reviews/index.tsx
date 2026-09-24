import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { StaffGymReviews } from "@/components/staffmgr/staff-pages";

export const Route = createFileRoute("/staff/gym-reviews/")({
  head: () => opsMeta("staff", "Đánh giá phòng gym", "Đánh giá của hội viên về phòng gym."),
  component: StaffGymReviews,
});
