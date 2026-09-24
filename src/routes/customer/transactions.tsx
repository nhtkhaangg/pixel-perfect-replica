import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

import { CPage, meta } from "@/components/customer/common";
import { DataTable, type Column } from "@/components/shared/DataTable";
import { StatCard } from "@/components/shared/StatCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { formatCurrency, formatDateTime } from "@/lib/format";
import { TRANSACTIONS, type Transaction } from "@/lib/mock/customer";

export const Route = createFileRoute("/customer/transactions")({
  head: () => meta("Lịch sử giao dịch", "Các khoản thanh toán, hoàn tiền của bạn tại GymCore."),
  component: Transactions,
});

const columns: Column<Transaction>[] = [
  { key: "id", header: "Mã giao dịch", sortable: true, value: (r) => r.id },
  { key: "date", header: "Thời gian", sortable: true, value: (r) => r.date, cell: (r) => formatDateTime(r.date) },
  { key: "description", header: "Nội dung", value: (r) => r.description },
  { key: "method", header: "Phương thức", value: (r) => r.method },
  { key: "amount", header: "Số tiền", sortable: true, className: "text-right", value: (r) => r.amount, cell: (r) => <span className={r.status === "refunded" ? "text-primary" : ""}>{r.status === "refunded" ? "+" : ""}{formatCurrency(r.amount)}</span> },
  { key: "status", header: "Trạng thái", value: (r) => r.status, cell: (r) => <StatusBadge status={r.status} /> },
];

function Transactions() {
  const paid = TRANSACTIONS.filter((t) => t.status === "paid").reduce((s, t) => s + t.amount, 0);
  return (
    <CPage title="Lịch sử giao dịch">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Tổng đã thanh toán" value={formatCurrency(paid)} hint="Từ 12/01/2026" />
        <StatCard label="Đang chờ xử lý" value={String(TRANSACTIONS.filter((t) => t.status === "pending").length)} hint="Giao dịch chờ xác nhận" />
        <StatCard label="Đã hoàn tiền" value={formatCurrency(TRANSACTIONS.filter((t) => t.status === "refunded").reduce((s, t) => s + t.amount, 0))} />
      </div>
      <DataTable
        data={TRANSACTIONS}
        columns={columns}
        searchPlaceholder="Tìm mã hoặc nội dung giao dịch…"
        filters={[{ key: "status", label: "Trạng thái", options: [{ label: "Đã thanh toán", value: "paid" }, { label: "Chờ xử lý", value: "pending" }, { label: "Đã hoàn tiền", value: "refunded" }, { label: "Thất bại", value: "failed" }], match: (r, v) => r.status === v }]}
        rowActions={[{ label: "Tải hoá đơn", onSelect: (r) => toast.success(`Đang tải hoá đơn ${r.id} (dữ liệu mẫu).`) }]}
      />
    </CPage>
  );
}
