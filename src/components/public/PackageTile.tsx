import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/format";
import { CATEGORY_LABEL, type GymPackage } from "@/lib/mock/public";
import { cn } from "@/lib/utils";

export function PackageTile({ pkg }: { pkg: GymPackage }) {
  return (
    <article
      className={cn(
        "card-surface relative flex flex-col p-6",
        pkg.highlighted && "border-primary/50 shadow-[var(--shadow-card)]",
      )}
    >
      {pkg.highlighted ? (
        <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
          Được chọn nhiều nhất
        </span>
      ) : null}
      <p className="text-xs font-semibold tracking-wider text-primary uppercase">{CATEGORY_LABEL[pkg.category]}</p>
      <h3 className="mt-2 font-display text-xl font-bold">{pkg.name}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{pkg.summary}</p>
      <p className="mt-5 font-display text-3xl font-extrabold">{formatCurrency(pkg.price)}</p>
      <p className="text-sm text-muted-foreground">
        Thời hạn {pkg.durationLabel}
        {pkg.sessions ? ` · ${pkg.sessions} buổi` : " · Không giới hạn lượt vào"}
      </p>
      <ul className="mt-5 flex-1 space-y-2 text-sm">
        {pkg.benefits.slice(0, 4).map((b) => (
          <li key={b} className="flex gap-2">
            <Check size={16} className="mt-0.5 shrink-0 text-primary" /> {b}
          </li>
        ))}
      </ul>
      <Button className="mt-6 w-full" variant={pkg.highlighted ? "default" : "outline"} asChild>
        <Link to="/packages/$id" params={{ id: pkg.id }}>Xem chi tiết</Link>
      </Button>
    </article>
  );
}
