import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { TrainerProfileEdit } from "@/components/trainer/pages-a";

export const Route = createFileRoute("/trainer/profile/edit")({
  head: () => opsMeta("trainer", "Cập nhật hồ sơ", "Chỉnh sửa thông tin cá nhân và chuyên môn."),
  component: TrainerProfileEdit,
});
