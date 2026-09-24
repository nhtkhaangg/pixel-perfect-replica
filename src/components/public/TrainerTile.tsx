import { Link } from "@tanstack/react-router";

import { InitialsAvatar, Stars } from "@/components/public/blocks";
import type { Trainer } from "@/lib/mock/public";

export function TrainerTile({ trainer }: { trainer: Trainer }) {
  return (
    <Link
      to="/trainers/$id"
      params={{ id: trainer.id }}
      className="card-surface group flex flex-col gap-4 p-5 transition-colors hover:border-primary/40"
    >
      <div className="flex items-center gap-4">
        <InitialsAvatar name={trainer.name} className="size-14 text-lg" />
        <div className="min-w-0">
          <h3 className="font-semibold group-hover:text-primary">{trainer.name}</h3>
          <p className="text-sm text-muted-foreground">{trainer.specialty}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {trainer.tags.map((t) => (
          <span key={t} className="rounded-md border border-border px-2 py-0.5 text-xs text-muted-foreground">{t}</span>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-border pt-4 text-sm">
        <span className="flex items-center gap-2">
          <Stars value={trainer.rating} /> <span className="font-semibold">{trainer.rating.toFixed(1).replace(".", ",")}</span>
          <span className="text-muted-foreground">({trainer.reviewCount})</span>
        </span>
        <span className="text-muted-foreground">{trainer.experienceYears} năm kinh nghiệm</span>
      </div>
    </Link>
  );
}
