import { Link } from "@tanstack/react-router";
import { CalendarDays, Check, Clock, Dumbbell, Star, Users } from "lucide-react";
import type { ReactNode } from "react";

import { StatusBadge, type StatusTone } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/format";
import { cn } from "@/lib/utils";

/* ---------------------------------- Thẻ nội dung chung --------------------------------- */

export function ContentCard({
  title,
  description,
  meta,
  footer,
  badge,
  className,
  children,
}: {
  title: string;
  description?: string;
  meta?: string;
  footer?: ReactNode;
  badge?: ReactNode;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <article className={cn("card-surface flex flex-col p-5", className)}>
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold">{title}</h3>
        {badge}
      </div>
      {meta ? <p className="mt-1 text-xs text-muted-foreground">{meta}</p> : null}
      {description ? (
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
      ) : null}
      {children ? <div className="mt-4">{children}</div> : null}
      {footer ? <div className="mt-auto pt-4">{footer}</div> : null}
    </article>
  );
}

/* --------------------------------- Thẻ huấn luyện viên -------------------------------- */

export function TrainerCard({
  name,
  specialty,
  rating,
  sessions,
  status,
  avatarUrl,
  to,
  className,
}: {
  name: string;
  specialty: string;
  rating: number;
  sessions: number;
  status?: string;
  avatarUrl?: string;
  to?: string;
  className?: string;
}) {
  return (
    <article className={cn("card-surface p-5", className)}>
      <div className="flex items-center gap-4">
        <span className="grid size-14 shrink-0 place-items-center overflow-hidden rounded-xl bg-primary/10 text-primary">
          {avatarUrl ? (
            <img src={avatarUrl} alt={name} className="size-full object-cover" />
          ) : (
            <Dumbbell size={22} />
          )}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-semibold">{name}</h3>
            {status ? <StatusBadge status={status} /> : null}
          </div>
          <p className="truncate text-sm text-muted-foreground">{specialty}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-1.5 text-warning">
          <Star size={14} className="fill-current" /> {rating.toFixed(1)}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Users size={14} /> {sessions} ca dạy
        </span>
      </div>
      {to ? (
        <Button variant="outline" size="sm" className="mt-4 w-full" asChild>
          <Link to={to}>Xem chi tiết</Link>
        </Button>
      ) : null}
    </article>
  );
}

/* ------------------------------------ Thẻ gói tập ----------------------------------- */

export function PackageCard({
  name,
  price,
  duration,
  features,
  highlighted = false,
  onSelect,
  className,
}: {
  name: string;
  price: number;
  duration: string;
  features: string[];
  highlighted?: boolean;
  onSelect?: () => void;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "card-surface flex flex-col p-6",
        highlighted && "border-primary/50 shadow-[var(--shadow-glow)]",
        className,
      )}
    >
      {highlighted ? (
        <StatusBadge tone="success" label="Phổ biến nhất" className="mb-3 self-start" />
      ) : null}
      <h3 className="font-display text-lg font-bold">{name}</h3>
      <p className="mt-2 font-display text-2xl font-extrabold text-primary">
        {formatCurrency(price)}
      </p>
      <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
        <CalendarDays size={14} /> {duration}
      </p>
      <ul className="mt-5 space-y-2.5 text-sm">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2">
            <Check size={16} className="mt-0.5 shrink-0 text-primary" />
            <span className="text-muted-foreground">{feature}</span>
          </li>
        ))}
      </ul>
      <Button
        variant={highlighted ? "hero" : "outline"}
        className="mt-6 w-full"
        onClick={onSelect}
      >
        Chọn gói này
      </Button>
    </article>
  );
}

/* ------------------------------------ Thẻ bài tập ----------------------------------- */

export function ExerciseCard({
  name,
  muscleGroup,
  difficulty,
  duration,
  thumbnailUrl,
  className,
}: {
  name: string;
  muscleGroup: string;
  difficulty: string;
  duration: string;
  thumbnailUrl?: string;
  className?: string;
}) {
  const tone: StatusTone =
    difficulty === "Cơ bản" ? "success" : difficulty === "Trung bình" ? "warning" : "danger";

  return (
    <article className={cn("card-surface overflow-hidden", className)}>
      <div className="grid aspect-video place-items-center bg-muted text-muted-foreground">
        {thumbnailUrl ? (
          <img src={thumbnailUrl} alt={name} className="size-full object-cover" />
        ) : (
          <Dumbbell size={28} />
        )}
      </div>
      <div className="space-y-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold">{name}</h3>
          <StatusBadge tone={tone} label={difficulty} />
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span>{muscleGroup}</span>
          <span className="inline-flex items-center gap-1">
            <Clock size={12} /> {duration}
          </span>
        </div>
      </div>
    </article>
  );
}

/* ----------------------------------- Bảng chi tiết ---------------------------------- */

export function DetailPanel({
  title,
  items,
  actions,
  className,
}: {
  title: string;
  items: { label: string; value: ReactNode }[];
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("card-surface", className)}>
      <header className="flex items-center justify-between gap-3 border-b border-border px-5 py-4">
        <h3 className="font-semibold">{title}</h3>
        {actions}
      </header>
      <dl className="divide-y divide-border/60">
        {items.map((item) => (
          <div key={item.label} className="flex flex-wrap items-center justify-between gap-2 px-5 py-3">
            <dt className="text-sm text-muted-foreground">{item.label}</dt>
            <dd className="text-sm font-medium">{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
