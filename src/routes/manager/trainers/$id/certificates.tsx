import { createFileRoute } from "@tanstack/react-router";

import { opsMeta } from "@/components/ops/kit";
import { ManagerTrainerCertificates } from "@/components/staffmgr/manager-pages";

export const Route = createFileRoute("/manager/trainers/$id/certificates")({
  head: () => opsMeta("manager", "Xác minh chứng chỉ", "Xác minh chứng chỉ HLV."),
  component: ManagerTrainerCertificates,
});
