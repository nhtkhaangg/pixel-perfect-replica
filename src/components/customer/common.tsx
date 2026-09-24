import type { ReactNode } from "react";

import { PageHeader } from "@/components/shared/PageHeader";
import { cn } from "@/lib/utils";

export function CPage({
  title,
  description,
  parent,
  actions,
  children,
}: {
  title: string;
  description?: string;
  parent?: { label: string; to: string };
  actions?: ReactNode;
  children: ReactNode;
}) {
  const crumbs = [
    { label: "Cổng hội viên", to: "/customer/dashboard" },
    ...(parent ? [parent] : []),
    { label: title },
  ];
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader title={title} breadcrumbs={crumbs} {...(description ? { description } : {})} {...(actions ? { actions } : {})} />
      {children}
    </div>
  );
}

export function Panel({
  title,
  action,
  children,
  className,
}: {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("card-surface p-5", className)}>
      {title ? (
        <header className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-semibold">{title}</h2>
          {action}
        </header>
      ) : null}
      {children}
    </section>
  );
}

export function ProgressBar({ value, className }: { value: number; className?: string }) {
  return (
    <div className={cn("h-2 overflow-hidden rounded-full bg-muted", className)}>
      <div className="h-full rounded-full bg-primary" style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  );
}

export function meta(title: string, description: string) {
  return {
    meta: [
      { title: `${title} — Cổng hội viên GymCore` },
      { name: "description", content: description },
      { property: "og:title", content: `${title} — GymCore` },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  };
}

export function daysBetween(a: string | Date, b: string | Date) {
  return Math.ceil((new Date(b).getTime() - new Date(a).getTime()) / 86400000);
}

/** Ngày hiện tại cố định cho dữ liệu mẫu. */
export const TODAY = "2026-09-25";

export function Field({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      {children}
      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}
