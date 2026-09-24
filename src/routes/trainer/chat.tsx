import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { TrainerChat } from "@/components/trainer/pages-c";

export const Route = createFileRoute("/trainer/chat")({
  head: () => opsMeta("trainer", "Trò chuyện với hội viên", "Nhắn tin với học viên."),
  component: TrainerChat,
});
