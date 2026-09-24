import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { TrainerCertificateDetail } from "@/components/trainer/pages-a";

export const Route = createFileRoute("/trainer/certificates/$id")({
  head: () => opsMeta("trainer", "Chi tiết chứng chỉ", "Thông tin và trạng thái xác minh chứng chỉ."),
  component: TrainerCertificateDetail,
});
