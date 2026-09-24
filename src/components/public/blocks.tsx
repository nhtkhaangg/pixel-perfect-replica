import { Star } from "lucide-react";
import type { ReactNode } from "react";

import { Breadcrumbs } from "@/components/shared/PageHeader";
import { initials } from "@/lib/mock/public";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-2xl space-y-3">
        {eyebrow ? (
          <p className="text-xs font-semibold tracking-wider text-primary uppercase">{eyebrow}</p>
        ) : null}
        <h2 className="font-display text-3xl font-bold md:text-4xl">{title}</h2>
        {description ? <p className="text-muted-foreground">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function PublicPageHero({
  title,
  description,
  crumbs,
  children,
}: {
  title: string;
  description: string;
  crumbs: { label: string; to?: string }[];
  children?: ReactNode;
}) {
  return (
    <section className="ambient-glow border-b border-border">
      <div className="mx-auto max-w-7xl space-y-4 px-4 py-12 md:px-6 md:py-16">
        <Breadcrumbs items={[{ label: "Trang chủ", to: "/" }, ...crumbs]} />
        <h1 className="font-display text-4xl leading-tight font-extrabold md:text-5xl">{title}</h1>
        <p className="max-w-2xl text-muted-foreground">{description}</p>
        {children}
      </div>
    </section>
  );
}

export function Stars({ value, size = 14 }: { value: number; size?: number }) {
  return (
    <span className="inline-flex gap-0.5 text-warning" aria-label={`${value} trên 5 sao`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={cn(i < Math.round(value) ? "fill-current" : "text-muted-foreground/40")}
        />
      ))}
    </span>
  );
}

export function InitialsAvatar({ name, className }: { name: string; className?: string }) {
  return (
    <span
      className={cn(
        "grid size-12 shrink-0 place-items-center rounded-full border border-primary/30 bg-primary/12 font-display font-bold text-primary",
        className,
      )}
    >
      {initials(name)}
    </span>
  );
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto max-w-7xl px-4 md:px-6", className)}>{children}</div>;
}
