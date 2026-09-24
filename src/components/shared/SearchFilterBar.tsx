import { Search, SlidersHorizontal } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export type SelectFilter = {
  key: string;
  label: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
};

export function SearchFilterBar({
  query,
  onQueryChange,
  placeholder = "Tìm kiếm…",
  filters = [],
  onReset,
  extra,
  className,
}: {
  query: string;
  onQueryChange: (value: string) => void;
  placeholder?: string;
  filters?: SelectFilter[];
  onReset?: () => void;
  extra?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("card-surface flex flex-wrap items-center gap-3 p-4", className)}>
      <div className="relative min-w-56 flex-1">
        <Search
          size={15}
          className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder={placeholder}
          className="pl-9"
        />
      </div>
      {filters.map((filter) => (
        <Select key={filter.key} value={filter.value} onValueChange={filter.onChange}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder={filter.label} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{filter.label}: Tất cả</SelectItem>
            {filter.options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ))}
      {extra}
      {onReset ? (
        <Button variant="ghost" onClick={onReset}>
          <SlidersHorizontal size={14} /> Xoá bộ lọc
        </Button>
      ) : null}
    </div>
  );
}
