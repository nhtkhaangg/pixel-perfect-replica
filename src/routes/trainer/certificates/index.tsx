import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { TrainerCertificates } from "@/components/trainer/pages-a";

export const Route = createFileRoute("/trainer/certificates/")({
  head: () => opsMeta("trainer", "Danh sách chứng chỉ", "Quản lý và tải lên chứng chỉ chuyên môn."),
  component: TrainerCertificates,
});
