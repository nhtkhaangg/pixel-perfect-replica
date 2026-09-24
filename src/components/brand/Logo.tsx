import { Dumbbell } from "lucide-react";

import { cn } from "@/lib/utils";

/** Tên thương hiệu dùng chung toàn hệ thống. */
export const BRAND_NAME = "GymCore";

export function Logo({
  className,
  size = "md",
  showText = true,
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}) {
  const box = size === "sm" ? "size-8" : size === "lg" ? "size-12" : "size-10";
  const icon = size === "sm" ? 16 : size === "lg" ? 26 : 20;
  const text = size === "sm" ? "text-lg" : size === "lg" ? "text-3xl" : "text-xl";

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        className={cn(
          "grid place-items-center rounded-lg bg-gradient-cta text-primary-foreground",
          box,
        )}
      >
        <Dumbbell size={icon} strokeWidth={2.4} />
      </span>
      {showText ? (
        <span className={cn("font-display font-extrabold tracking-tight", text)}>
          Gym<span className="text-primary">Core</span>
        </span>
      ) : null}
    </span>
  );
}
