import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { TrainerProfile } from "@/components/trainer/pages-a";

export const Route = createFileRoute("/trainer/profile/")({
  head: () => opsMeta("trainer", "Hồ sơ huấn luyện viên", "Thông tin, chuyên môn và chứng chỉ của huấn luyện viên."),
  component: TrainerProfile,
});
