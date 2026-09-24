import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { CPage, Panel } from "@/components/customer/common";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/format";
import { NOTIFICATIONS, NOTIFICATION_TYPE } from "@/lib/mock/customer";

export const Route = createFileRoute("/customer/notifications/$id")({
  loader: ({ params }) => {
    const n = NOTIFICATIONS.find((x) => x.id === params.id);
    if (!n) throw notFound();
    return { n };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.n.title} — Thông báo GymCore` : "Không tìm thấy thông báo — GymCore" },
      { name: "description", content: loaderData?.n.summary ?? "Thông báo không tồn tại." },
      { property: "og:title", content: loaderData?.n.title ?? "Thông báo" },
      { property: "og:description", content: loaderData?.n.summary ?? "Thông báo không tồn tại." },
      { name: "robots", content: "noindex" },
    ],
  }),
  notFoundComponent: () => (
    <CPage title="Không tìm thấy thông báo" parent={{ label: "Thông báo", to: "/customer/notifications" }}>
      <Button variant="outline" asChild><Link to="/customer/notifications">Quay lại danh sách</Link></Button>
    </CPage>
  ),
  component: Detail,
});

const ACTIONS: Record<string, { label: string; to: string }> = {
  package: { label: "Gia hạn gói", to: "/customer/packages" },
  schedule: { label: "Xem lịch tập", to: "/customer/calendar" },
  trainer: { label: "Xem lộ trình", to: "/customer/training-roadmap" },
  promotion: { label: "Xem ưu đãi", to: "/customer/packages" },
  system: { label: "Mở mã check-in", to: "/customer/check-in" },
};

function Detail() {
  const { n } = Route.useLoaderData();
  const action = ACTIONS[n.type]!;
  return (
    <CPage title={n.title} parent={{ label: "Thông báo", to: "/customer/notifications" }}>
      <Panel className="max-w-3xl">
        <p className="text-xs text-muted-foreground">{NOTIFICATION_TYPE[n.type]} · {formatDateTime(n.time)}</p>
        <p className="mt-4 leading-relaxed">{n.body}</p>
        <div className="mt-6 flex gap-2">
          <Button asChild><Link to={action.to as "/customer/packages"}>{action.label}</Link></Button>
          <Button variant="outline" asChild><Link to="/customer/notifications"><ArrowLeft size={15} /> Tất cả thông báo</Link></Button>
        </div>
      </Panel>
    </CPage>
  );
}
