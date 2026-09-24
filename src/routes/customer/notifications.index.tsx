import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { CPage, meta } from "@/components/customer/common";
import { EmptyState } from "@/components/shared/states";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/format";
import { NOTIFICATIONS, NOTIFICATION_TYPE } from "@/lib/mock/customer";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/customer/notifications/")({
  head: () => meta("Thông báo", "Nhắc lịch tập, gói tập và tin từ huấn luyện viên."),
  component: Notifications,
});

function Notifications() {
  const [items, setItems] = useState(NOTIFICATIONS);
  const [tab, setTab] = useState<"all" | "unread">("all");
  const list = items.filter((n) => tab === "all" || !n.read);
  const unread = items.filter((n) => !n.read).length;
  return (
    <CPage title="Thông báo" actions={<Button variant="outline" disabled={!unread} onClick={() => setItems(items.map((n) => ({ ...n, read: true })))}>Đánh dấu tất cả đã đọc</Button>}>
      <div className="flex gap-1 rounded-lg border border-border p-1 sm:w-fit">
        {([["all", `Tất cả (${items.length})`], ["unread", `Chưa đọc (${unread})`]] as const).map(([k, l]) => <button key={k} onClick={() => setTab(k)} className={cn("flex-1 cursor-pointer rounded-md px-4 py-1.5 text-sm", tab === k ? "bg-primary/15 text-primary" : "text-muted-foreground")}>{l}</button>)}
      </div>
      {list.length ? (
        <ul className="card-surface divide-y divide-border">
          {list.map((n) => (
            <li key={n.id}>
              <Link to="/customer/notifications/$id" params={{ id: n.id }} className="flex gap-4 p-4 transition-colors hover:bg-accent/40">
                <span className={cn("mt-2 size-2 shrink-0 rounded-full", n.read ? "bg-transparent" : "bg-primary")} />
                <span className="flex-1">
                  <span className="flex flex-wrap items-center gap-2"><span className={cn("font-medium", !n.read && "text-foreground")}>{n.title}</span><span className="rounded border border-border px-1.5 text-[11px] text-muted-foreground">{NOTIFICATION_TYPE[n.type]}</span></span>
                  <span className="block text-sm text-muted-foreground">{n.summary}</span>
                </span>
                <span className="shrink-0 text-xs text-muted-foreground">{formatDateTime(n.time)}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : <EmptyState title="Không có thông báo chưa đọc" description="Bạn đã xem hết thông báo." />}
    </CPage>
  );
}
