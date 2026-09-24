import { createFileRoute } from "@tanstack/react-router";

import { CPage, meta } from "@/components/customer/common";
import { DataTable, type Column } from "@/components/shared/DataTable";
import { StatCard } from "@/components/shared/StatCard";
import { formatDate, formatTime } from "@/lib/format";
import { CHECKINS } from "@/lib/mock/customer";

export const Route = createFileRoute("/customer/check-in-history")({
  head: () => meta("Lịch sử check-in", "Các lượt ra vào phòng tập của bạn."),
  component: History,
});

type Row = (typeof CHECKINS)[number];
const mins = (r: Row) => Math.round((new Date(r.checkout).getTime() - new Date(r.time).getTime()) / 60000);

const columns: Column<Row>[] = [
  { key: "date", header: "Ngày", sortable: true, value: (r) => r.time, cell: (r) => formatDate(r.time) },
  { key: "in", header: "Giờ vào", value: (r) => formatTime(r.time) },
  { key: "out", header: "Giờ ra", value: (r) => formatTime(r.checkout) },
  { key: "dur", header: "Thời gian tập", sortable: true, value: (r) => mins(r), cell: (r) => `${mins(r)} phút` },
  { key: "method", header: "Hình thức", value: (r) => r.method },
  { key: "gate", header: "Vị trí", value: (r) => r.gate },
];

function History() {
  const avg = Math.round(CHECKINS.reduce((s, r) => s + mins(r), 0) / CHECKINS.length);
  return (
    <CPage title="Lịch sử check-in">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Lượt vào tháng 09/2026" value={String(CHECKINS.length)} />
        <StatCard label="Thời gian tập trung bình" value={`${avg} phút`} />
        <StatCard label="Khung giờ thường tập" value="17:30 – 19:30" />
      </div>
      <DataTable data={CHECKINS} columns={columns} searchPlaceholder="Tìm theo hình thức, vị trí…" />
    </CPage>
  );
}
