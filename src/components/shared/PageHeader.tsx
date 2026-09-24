import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export type Crumb = { label: string; to?: string };

export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Đường dẫn" className={cn("flex items-center gap-1 text-sm", className)}>
      {items.map((item, i) => (
        <span key={`${item.label}-${i}`} className="flex items-center gap-1">
          {i > 0 ? <ChevronRight size={14} className="text-muted-foreground/60" /> : null}
          {item.to && i < items.length - 1 ? (
            <Link to={item.to} className="text-muted-foreground transition-colors hover:text-foreground">
              {item.label}
            </Link>
          ) : (
            <span className={i === items.length - 1 ? "text-foreground" : "text-muted-foreground"}>
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function PageHeader({
  title,
  description,
  breadcrumbs,
  actions,
  className,
}: {
  title: string;
  description?: string;
  breadcrumbs?: Crumb[];
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {breadcrumbs?.length ? <Breadcrumbs items={breadcrumbs} /> : null}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h1>
          {description ? (
            <p className="max-w-2xl text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
        {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
      </div>
    </div>
  );
}
