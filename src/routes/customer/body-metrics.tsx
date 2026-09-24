import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { CPage, Field, Panel, meta } from "@/components/customer/common";
import { ChartCard, SimpleLineChart } from "@/components/shared/charts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatDate } from "@/lib/format";
import { BODY_METRICS, ME } from "@/lib/mock/customer";

export const Route = createFileRoute("/customer/body-metrics")({
  head: () => meta("Cập nhật chỉ số cơ thể", "Nhập cân nặng, tỉ lệ mỡ, khối cơ và vòng eo."),
  component: BodyMetrics,
});

function BodyMetrics() {
  const [rows, setRows] = useState(BODY_METRICS);
  const last = rows.at(-1)!;
  return (
    <CPage title="Cập nhật chỉ số cơ thể" actions={<Button variant="outline" asChild><Link to="/customer/body-progress">Xem biểu đồ tiến trình</Link></Button>}>
      <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
        <Panel title="Lần đo mới">
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              const f = new FormData(e.currentTarget);
              const weight = Number(f.get("weight")), bodyFat = Number(f.get("bodyFat")), muscle = Number(f.get("muscle")), waist = Number(f.get("waist"));
              if (!(weight > 30 && weight < 250) || !(bodyFat > 2 && bodyFat < 60)) { toast.error("Cân nặng hoặc tỉ lệ mỡ không hợp lệ."); return; }
              setRows([...rows, { date: String(f.get("date")), weight, bodyFat, muscle, waist }]);
              toast.success("Đã lưu chỉ số mới (dữ liệu mẫu).");
            }}
          >
            <Field label="Ngày đo"><Input name="date" type="date" defaultValue="2026-09-25" /></Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Cân nặng (kg)"><Input name="weight" type="number" step="0.1" defaultValue={last.weight} /></Field>
              <Field label="Tỉ lệ mỡ (%)"><Input name="bodyFat" type="number" step="0.1" defaultValue={last.bodyFat} /></Field>
              <Field label="Khối cơ (kg)"><Input name="muscle" type="number" step="0.1" defaultValue={last.muscle} /></Field>
              <Field label="Vòng eo (cm)"><Input name="waist" type="number" step="0.5" defaultValue={last.waist} /></Field>
            </div>
            <p className="text-xs text-muted-foreground">BMI hiện tại: {(last.weight / (ME.height / 100) ** 2).toLocaleString("vi-VN", { maximumFractionDigits: 1 })}</p>
            <Button type="submit" className="w-full">Lưu chỉ số</Button>
          </form>
        </Panel>
        <div className="space-y-6">
          <ChartCard title="Lịch sử cân nặng (kg)">
            <SimpleLineChart data={rows.map((r) => ({ ...r, label: formatDate(r.date).slice(0, 5) }))} xKey="label" series={[{ key: "weight", name: "Cân nặng" }]} />
          </ChartCard>
          <Panel title="Lịch sử đo">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-xs text-muted-foreground"><tr><th className="py-2">Ngày đo</th><th>Cân nặng</th><th>Tỉ lệ mỡ</th><th>Khối cơ</th><th>Vòng eo</th></tr></thead>
                <tbody className="divide-y divide-border">
                  {[...rows].reverse().map((r) => (
                    <tr key={r.date}><td className="py-2.5">{formatDate(r.date)}</td><td>{r.weight.toLocaleString("vi-VN")} kg</td><td>{r.bodyFat.toLocaleString("vi-VN")}%</td><td>{r.muscle.toLocaleString("vi-VN")} kg</td><td>{r.waist.toLocaleString("vi-VN")} cm</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        </div>
      </div>
    </CPage>
  );
}
