import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Send, Star, Upload } from "lucide-react";
import { toast } from "sonner";

import { Field, Panel } from "@/components/customer/common";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge, type StatusTone } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export { Field, Panel };

export type Area = "trainer" | "staff" | "manager";
const AREA_ROOT: Record<Area, { label: string; to: string; suffix: string }> = {
  trainer: { label: "Khu vực huấn luyện", to: "/trainer/dashboard", suffix: "Huấn luyện viên" },
  staff: { label: "Quầy lễ tân", to: "/staff/dashboard", suffix: "Nhân viên" },
  manager: { label: "Quản lý phòng tập", to: "/manager/dashboard", suffix: "Quản lý" },
};

export function opsMeta(area: Area, title: string, description: string) {
  return {
    meta: [
      { title: `${title} — ${AREA_ROOT[area].suffix} GymCore` },
      { name: "description", content: description },
      { property: "og:title", content: `${title} — GymCore` },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  };
}

export function OPage({
  area, title, description, parent, actions, children,
}: {
  area: Area; title: string; description?: string; parent?: { label: string; to: string }; actions?: ReactNode; children: ReactNode;
}) {
  const root = AREA_ROOT[area];
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader
        title={title}
        breadcrumbs={[{ label: root.label, to: root.to }, ...(parent ? [parent] : []), { label: title }]}
        {...(description ? { description } : {})}
        {...(actions ? { actions } : {})}
      />
      {children}
    </div>
  );
}

export function Grid({ cols = 4, children, className }: { cols?: 2 | 3 | 4; children: ReactNode; className?: string }) {
  const c = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[cols];
  return <div className={cn("grid gap-4", c, className)}>{children}</div>;
}

export function Stars({ value, size = 14 }: { value: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-warning" aria-label={`${value} sao`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} style={{ width: size, height: size }} className={i <= Math.round(value) ? "fill-current" : "opacity-30"} />
      ))}
    </span>
  );
}

export function Avatar({ name, className }: { name: string; className?: string }) {
  const initials = name.split(" ").slice(-2).map((w) => w[0]).join("").toUpperCase();
  return (
    <span className={cn("grid size-10 shrink-0 place-items-center rounded-full bg-primary/15 text-sm font-semibold text-primary", className)}>
      {initials}
    </span>
  );
}

export type TimelineItem = { title: string; time: string; description?: string; tone?: StatusTone };
export function Timeline({ items }: { items: TimelineItem[] }) {
  const dot: Record<StatusTone, string> = {
    success: "bg-success", warning: "bg-warning", danger: "bg-destructive", info: "bg-cyan", neutral: "bg-muted-foreground",
  };
  return (
    <ol className="relative space-y-5 border-l border-border pl-5">
      {items.map((it, i) => (
        <li key={i} className="relative">
          <span className={cn("absolute top-1.5 -left-[25px] size-2.5 rounded-full ring-4 ring-card", dot[it.tone ?? "neutral"])} />
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="text-sm font-medium">{it.title}</p>
            <p className="text-xs text-muted-foreground">{it.time}</p>
          </div>
          {it.description ? <p className="mt-1 text-sm text-muted-foreground">{it.description}</p> : null}
        </li>
      ))}
    </ol>
  );
}

export function ActivityList({ items }: { items: { text: string; time: string }[] }) {
  return (
    <ul className="divide-y divide-border">
      {items.map((a, i) => (
        <li key={i} className="flex items-start justify-between gap-3 py-3 text-sm">
          <span>{a.text}</span>
          <span className="shrink-0 text-xs text-muted-foreground">{a.time}</span>
        </li>
      ))}
    </ul>
  );
}

export function InfoList({ items }: { items: { label: string; value: ReactNode }[] }) {
  return (
    <dl className="grid gap-3 sm:grid-cols-2">
      {items.map((it) => (
        <div key={it.label} className="rounded-md border border-border bg-background/40 p-3">
          <dt className="text-xs text-muted-foreground">{it.label}</dt>
          <dd className="mt-1 text-sm font-medium">{it.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Khung phản hồi đánh giá. */
export function ReplyPanel({ existing, placeholder = "Viết phản hồi lịch sự, cảm ơn và nêu hướng khắc phục nếu có..." }: { existing?: string; placeholder?: string }) {
  const [text, setText] = useState("");
  const [reply, setReply] = useState(existing);
  return (
    <Panel title="Phản hồi">
      {reply ? (
        <div className="mb-4 rounded-md border border-primary/30 bg-primary/5 p-3 text-sm">
          <p className="mb-1 text-xs font-medium text-primary">Phản hồi đã gửi</p>
          {reply}
        </div>
      ) : null}
      <Textarea rows={4} value={text} onChange={(e) => setText(e.target.value)} placeholder={placeholder} />
      <div className="mt-3 flex flex-wrap gap-2">
        {["Cảm ơn bạn đã tin tưởng!", "Chúng tôi sẽ cải thiện ngay.", "Hẹn gặp bạn ở buổi tập tới."].map((s) => (
          <Button key={s} size="sm" variant="outline" onClick={() => setText((t) => (t ? `${t} ${s}` : s))}>{s}</Button>
        ))}
      </div>
      <div className="mt-4 flex justify-end">
        <Button
          onClick={() => {
            if (text.trim().length < 10) return toast.error("Phản hồi cần tối thiểu 10 ký tự.");
            setReply(text); setText(""); toast.success("Đã gửi phản hồi.");
          }}
        >
          <Send className="size-4" /> Gửi phản hồi
        </Button>
      </div>
    </Panel>
  );
}

/** Nút duyệt / từ chối kèm hộp thoại lý do. */
export function ApprovalActions({
  approveLabel = "Phê duyệt", rejectLabel = "Từ chối", subject, onDone,
}: { approveLabel?: string; rejectLabel?: string; subject: string; onDone?: (s: "approved" | "rejected") => void }) {
  const [reason, setReason] = useState("");
  const [open, setOpen] = useState<"approve" | "reject" | null>(null);
  return (
    <div className="flex flex-wrap gap-2">
      <Dialog open={open === "reject"} onOpenChange={(o) => setOpen(o ? "reject" : null)}>
        <DialogTrigger asChild><Button variant="outline">{rejectLabel}</Button></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{rejectLabel}</DialogTitle>
            <DialogDescription>Nêu rõ lý do để người liên quan biết cần bổ sung gì cho “{subject}”.</DialogDescription>
          </DialogHeader>
          <Textarea rows={4} value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Lý do từ chối..." />
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(null)}>Huỷ</Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (reason.trim().length < 5) return toast.error("Vui lòng nhập lý do từ chối.");
                setOpen(null); onDone?.("rejected"); toast.success("Đã từ chối và gửi lý do.");
              }}
            >Xác nhận từ chối</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={open === "approve"} onOpenChange={(o) => setOpen(o ? "approve" : null)}>
        <DialogTrigger asChild><Button>{approveLabel}</Button></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{approveLabel}</DialogTitle>
            <DialogDescription>Bạn xác nhận {approveLabel.toLowerCase()} “{subject}”? Thao tác sẽ được ghi vào lịch sử.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(null)}>Huỷ</Button>
            <Button onClick={() => { setOpen(null); onDone?.("approved"); toast.success("Đã phê duyệt."); }}>Xác nhận</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export type DrawerField = { name: string; label: string; type?: "text" | "number" | "date" | "textarea" | "file"; placeholder?: string; defaultValue?: string };
/** Ngăn kéo tạo / chỉnh sửa nhanh. */
export function FormDrawer({
  trigger, title, description, fields, submitLabel = "Lưu",
}: { trigger: ReactNode; title: string; description?: string; fields: DrawerField[]; submitLabel?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent className="w-full overflow-y-auto sm:max-w-md">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          {description ? <SheetDescription>{description}</SheetDescription> : null}
        </SheetHeader>
        <form
          className="space-y-4 px-4"
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            const missing = fields.find((f) => f.type !== "file" && !String(fd.get(f.name) ?? "").trim());
            if (missing) return toast.error(`Vui lòng nhập “${missing.label}”.`);
            setOpen(false); toast.success("Đã lưu thông tin.");
          }}
        >
          {fields.map((f) => (
            <Field key={f.name} label={f.label}>
              {f.type === "textarea" ? (
                <Textarea name={f.name} rows={4} defaultValue={f.defaultValue} placeholder={f.placeholder} />
              ) : f.type === "file" ? (
                <label className="flex cursor-pointer flex-col items-center gap-2 rounded-md border border-dashed border-border-strong p-6 text-center text-sm text-muted-foreground hover:border-primary">
                  <Upload className="size-5" />
                  Kéo thả hoặc bấm để chọn tệp (PDF, JPG, PNG, tối đa 5 MB)
                  <input type="file" name={f.name} className="sr-only" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => e.target.files?.[0] && toast.success(`Đã chọn: ${e.target.files[0].name}`)} />
                </label>
              ) : (
                <Input name={f.name} type={f.type ?? "text"} defaultValue={f.defaultValue} placeholder={f.placeholder} />
              )}
            </Field>
          ))}
          <SheetFooter className="px-0">
            <Button type="submit" className="w-full">{submitLabel}</Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}

export type ChatContact = { id: string; name: string; last: string; unread?: number; online?: boolean };
export type ChatMsg = { from: "me" | "them"; text: string; time: string };
export function ChatView({ contacts, threads }: { contacts: ChatContact[]; threads: Record<string, ChatMsg[]> }) {
  const [active, setActive] = useState(contacts[0]?.id ?? "");
  const [all, setAll] = useState(threads);
  const [text, setText] = useState("");
  const current = contacts.find((c) => c.id === active);
  const send = () => {
    if (!text.trim()) return;
    setAll((t) => ({ ...t, [active]: [...(t[active] ?? []), { from: "me", text, time: "Vừa xong" }] }));
    setText("");
  };
  return (
    <div className="card-surface grid min-h-[560px] overflow-hidden md:grid-cols-[280px_1fr]">
      <aside className="border-b border-border md:border-r md:border-b-0">
        <ul className="max-h-60 overflow-y-auto md:max-h-none">
          {contacts.map((c) => (
            <li key={c.id}>
              <button
                onClick={() => setActive(c.id)}
                className={cn("flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-muted/50", c.id === active && "bg-primary/10")}
              >
                <Avatar name={c.name} />
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2 text-sm font-medium">
                    {c.name}
                    {c.online ? <span className="size-2 rounded-full bg-success" /> : null}
                  </span>
                  <span className="block truncate text-xs text-muted-foreground">{c.last}</span>
                </span>
                {c.unread ? <span className="rounded-full bg-primary px-1.5 text-xs text-primary-foreground">{c.unread}</span> : null}
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <section className="flex flex-col">
        <header className="border-b border-border px-5 py-3">
          <p className="font-medium">{current?.name}</p>
          <p className="text-xs text-muted-foreground">{current?.online ? "Đang trực tuyến" : "Ngoại tuyến"}</p>
        </header>
        <div className="flex-1 space-y-3 overflow-y-auto p-5">
          {(all[active] ?? []).map((m, i) => (
            <div key={i} className={cn("flex", m.from === "me" ? "justify-end" : "justify-start")}>
              <div className={cn("max-w-[80%] rounded-lg px-3 py-2 text-sm", m.from === "me" ? "bg-primary text-primary-foreground" : "bg-muted")}>
                {m.text}
                <p className="mt-1 text-[10px] opacity-70">{m.time}</p>
              </div>
            </div>
          ))}
        </div>
        <form className="flex gap-2 border-t border-border p-3" onSubmit={(e) => { e.preventDefault(); send(); }}>
          <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Nhập tin nhắn..." />
          <Button type="submit" size="icon" aria-label="Gửi"><Send className="size-4" /></Button>
        </form>
      </section>
    </div>
  );
}

export type NoticeItem = { id: string; title: string; body: string; time: string; read: boolean; type: string };
export function NotificationList({ items }: { items: NoticeItem[] }) {
  const [list, setList] = useState(items);
  const [tab, setTab] = useState<"all" | "unread">("all");
  const shown = tab === "all" ? list : list.filter((n) => !n.read);
  return (
    <Panel
      title={`Thông báo (${list.filter((n) => !n.read).length} chưa đọc)`}
      action={
        <div className="flex gap-2">
          <Button size="sm" variant={tab === "all" ? "default" : "outline"} onClick={() => setTab("all")}>Tất cả</Button>
          <Button size="sm" variant={tab === "unread" ? "default" : "outline"} onClick={() => setTab("unread")}>Chưa đọc</Button>
          <Button size="sm" variant="ghost" onClick={() => { setList((l) => l.map((n) => ({ ...n, read: true }))); toast.success("Đã đánh dấu tất cả là đã đọc."); }}>Đánh dấu đã đọc</Button>
        </div>
      }
    >
      <ul className="divide-y divide-border">
        {shown.map((n) => (
          <li key={n.id} className="flex gap-3 py-4">
            <span className={cn("mt-1.5 size-2 shrink-0 rounded-full", n.read ? "bg-transparent" : "bg-primary")} />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-medium">{n.title}</p>
                <StatusBadge tone="neutral" label={n.type} />
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{n.body}</p>
              <p className="mt-1 text-xs text-muted-foreground">{n.time}</p>
            </div>
          </li>
        ))}
        {shown.length === 0 ? <li className="py-8 text-center text-sm text-muted-foreground">Không có thông báo chưa đọc.</li> : null}
      </ul>
    </Panel>
  );
}

export function TextLink({ to, params, children }: { to: string; params?: Record<string, string>; children: ReactNode }) {
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Link to={to as any} params={params as any} className="font-medium text-primary hover:underline">{children}</Link>
  );
}

export function ButtonLink({ to, params, children, variant = "default" }: { to: string; params?: Record<string, string>; children: ReactNode; variant?: "default" | "outline" | "ghost" }) {
  return (
    <Button asChild variant={variant}>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <Link to={to as any} params={params as any}>{children}</Link>
    </Button>
  );
}
