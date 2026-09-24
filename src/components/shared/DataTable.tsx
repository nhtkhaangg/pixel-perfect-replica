import { ArrowDown, ArrowUp, ChevronsUpDown, MoreHorizontal, Search } from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EmptyState, LoadingState } from "@/components/shared/states";
import { cn } from "@/lib/utils";

export type Column<T> = {
  key: string;
  header: string;
  className?: string;
  sortable?: boolean;
  /** Giá trị dùng để sắp xếp/tìm kiếm. */
  value?: (row: T) => string | number;
  cell?: (row: T) => ReactNode;
};

export type RowAction<T> = {
  label: string;
  onSelect: (row: T) => void;
  tone?: "default" | "danger";
};

export type FilterConfig<T> = {
  key: string;
  label: string;
  options: { label: string; value: string }[];
  match: (row: T, value: string) => boolean;
};

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  rowActions,
  filters,
  searchPlaceholder = "Tìm kiếm…",
  pageSize = 8,
  loading = false,
  emptyTitle,
  emptyDescription,
  toolbarExtra,
  className,
}: {
  data: T[];
  columns: Column<T>[];
  rowActions?: RowAction<T>[];
  filters?: FilterConfig<T>[];
  searchPlaceholder?: string;
  pageSize?: number;
  loading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  toolbarExtra?: ReactNode;
  className?: string;
}) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<{ key: string; dir: "asc" | "desc" } | null>(null);
  const [page, setPage] = useState(1);
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});

  const rows = useMemo(() => {
    let result = [...data];

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      result = result.filter((row) =>
        columns.some((col) => String(col.value?.(row) ?? "").toLowerCase().includes(q)),
      );
    }

    for (const filter of filters ?? []) {
      const value = filterValues[filter.key];
      if (value && value !== "all") {
        result = result.filter((row) => filter.match(row, value));
      }
    }

    if (sort) {
      const col = columns.find((c) => c.key === sort.key);
      if (col?.value) {
        result.sort((a, b) => {
          const av = col.value!(a);
          const bv = col.value!(b);
          const cmp =
            typeof av === "number" && typeof bv === "number"
              ? av - bv
              : String(av).localeCompare(String(bv), "vi");
          return sort.dir === "asc" ? cmp : -cmp;
        });
      }
    }

    return result;
  }, [data, columns, filters, filterValues, query, sort]);

  const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageRows = rows.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  function toggleSort(key: string) {
    setSort((prev) =>
      prev?.key === key
        ? { key, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "asc" },
    );
  }

  return (
    <div className={cn("card-surface overflow-hidden", className)}>
      <div className="flex flex-wrap items-center gap-3 border-b border-border p-4">
        <div className="relative min-w-56 flex-1">
          <Search
            size={15}
            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder={searchPlaceholder}
            className="pl-9"
          />
        </div>
        {(filters ?? []).map((filter) => (
          <Select
            key={filter.key}
            value={filterValues[filter.key] ?? "all"}
            onValueChange={(value) => {
              setFilterValues((prev) => ({ ...prev, [filter.key]: value }));
              setPage(1);
            }}
          >
            <SelectTrigger className="w-44">
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
        {toolbarExtra}
      </div>

      {loading ? (
        <LoadingState />
      ) : pageRows.length === 0 ? (
        <EmptyState
          title={emptyTitle ?? "Không tìm thấy kết quả"}
          {...(emptyDescription ? { description: emptyDescription } : {})}
        />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={cn("px-4 py-3 text-xs font-medium text-muted-foreground", col.className)}
                  >
                    {col.sortable ? (
                      <button
                        type="button"
                        onClick={() => toggleSort(col.key)}
                        className="inline-flex cursor-pointer items-center gap-1 transition-colors hover:text-foreground"
                      >
                        {col.header}
                        {sort?.key === col.key ? (
                          sort.dir === "asc" ? (
                            <ArrowUp size={12} />
                          ) : (
                            <ArrowDown size={12} />
                          )
                        ) : (
                          <ChevronsUpDown size={12} className="opacity-50" />
                        )}
                      </button>
                    ) : (
                      col.header
                    )}
                  </th>
                ))}
                {rowActions?.length ? (
                  <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">
                    Hành động
                  </th>
                ) : null}
              </tr>
            </thead>
            <tbody>
              {pageRows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-border/60 transition-colors last:border-0 hover:bg-accent/40"
                >
                  {columns.map((col) => (
                    <td key={col.key} className={cn("px-4 py-3 align-middle", col.className)}>
                      {col.cell ? col.cell(row) : String(col.value?.(row) ?? "")}
                    </td>
                  ))}
                  {rowActions?.length ? (
                    <td className="px-4 py-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" aria-label="Mở menu hành động">
                            <MoreHorizontal size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {rowActions.map((action) => (
                            <DropdownMenuItem
                              key={action.label}
                              onSelect={() => action.onSelect(row)}
                              className={action.tone === "danger" ? "text-destructive" : undefined}
                            >
                              {action.label}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  ) : null}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border p-4 text-sm text-muted-foreground">
        <p>
          Hiển thị {pageRows.length} / {rows.length} bản ghi
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage <= 1}
            onClick={() => setPage(currentPage - 1)}
          >
            Trước
          </Button>
          <span className="px-1">
            Trang {currentPage} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage >= totalPages}
            onClick={() => setPage(currentPage + 1)}
          >
            Sau
          </Button>
        </div>
      </div>
    </div>
  );
}
