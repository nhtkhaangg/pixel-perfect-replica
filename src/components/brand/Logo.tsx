import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";

/** Tên thương hiệu dùng chung toàn hệ thống. */
export const BRAND_NAME = "OmniGym";

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
  const icon = size === "sm" ? 16 : size === "lg" ? 24 : 18;
  const text = size === "sm" ? "text-base" : size === "lg" ? "text-2xl" : "text-lg";

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        className={cn(
          "grid place-items-center rounded-xl overflow-hidden bg-black text-emerald-400 border border-emerald-500/30 shadow-md shadow-emerald-500/20 shrink-0",
          box,
        )}
      >
        <img
          src="/logo.png"
          alt="OmniGym Logo"
          className="w-full h-full object-cover"
          onError={(e) => {
            // fallback if image not loaded
            e.currentTarget.style.display = "none";
            const sibling = e.currentTarget.nextElementSibling as HTMLElement;
            if (sibling) sibling.style.display = "flex";
          }}
        />
        <span className="hidden w-full h-full items-center justify-center">
          <Zap size={icon} className="fill-emerald-400 text-emerald-400" />
        </span>
      </span>
      {showText ? (
        <span className={cn("font-black tracking-wider text-white", text)}>
          OMNI<span className="text-emerald-400">GYM</span>
        </span>
      ) : null}
    </span>
  );
}
