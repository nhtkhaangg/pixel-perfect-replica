import { createFileRoute } from "@tanstack/react-router";
import { Activity, Flame, Scale } from "lucide-react";
import { useMemo, useState } from "react";

import { PublicLayout } from "@/components/layout/PublicLayout";
import { Container, PublicPageHero } from "@/components/public/blocks";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatNumber } from "@/lib/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/tools/fitness-calculator")({
  head: () => ({
    meta: [
      { title: "Tính BMI, BMR và TDEE — Công cụ GymCore" },
      { name: "description", content: "Tính chỉ số BMI, lượng calo cơ bản BMR và tổng năng lượng tiêu hao TDEE miễn phí." },
      { property: "og:title", content: "Công cụ tính chỉ số thể chất — GymCore" },
      { property: "og:description", content: "Biết BMI, BMR và TDEE để lên kế hoạch ăn uống, tập luyện chính xác hơn." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CalculatorPage,
});

const ACTIVITY = [
  { value: "1.2", label: "Ít vận động (làm văn phòng)" },
  { value: "1.375", label: "Nhẹ (1–3 buổi/tuần)" },
  { value: "1.55", label: "Vừa phải (3–5 buổi/tuần)" },
  { value: "1.725", label: "Nhiều (6–7 buổi/tuần)" },
  { value: "1.9", label: "Rất nhiều (vận động viên)" },
];

function bmiInfo(bmi: number) {
  if (bmi < 18.5) return { label: "Thiếu cân", tone: "text-warning" };
  if (bmi < 23) return { label: "Bình thường", tone: "text-primary" };
  if (bmi < 25) return { label: "Thừa cân", tone: "text-warning" };
  return { label: "Béo phì", tone: "text-destructive" };
}

const fmt1 = (n: number) => n.toLocaleString("vi-VN", { maximumFractionDigits: 1, minimumFractionDigits: 1 });

function CalculatorPage() {
  const [sex, setSex] = useState<"male" | "female">("male");
  const [age, setAge] = useState("28");
  const [height, setHeight] = useState("170");
  const [weight, setWeight] = useState("65");
  const [activity, setActivity] = useState("1.55");

  const r = useMemo(() => {
    const a = Number(age), h = Number(height), w = Number(weight);
    if (!(a >= 10 && a <= 100 && h >= 100 && h <= 230 && w >= 25 && w <= 300)) return null;
    const bmi = w / (h / 100) ** 2;
    const bmr = 10 * w + 6.25 * h - 5 * a + (sex === "male" ? 5 : -161);
    const tdee = bmr * Number(activity);
    return { bmi, bmr, tdee };
  }, [sex, age, height, weight, activity]);

  const info = r ? bmiInfo(r.bmi) : null;

  return (
    <PublicLayout>
      <PublicPageHero
        title="Công cụ tính chỉ số thể chất"
        description="Nhập thông tin cơ bản để biết chỉ số khối cơ thể (BMI), năng lượng cơ bản (BMR) và tổng năng lượng tiêu hao mỗi ngày (TDEE)."
        crumbs={[{ label: "Công cụ" }, { label: "Tính chỉ số thể chất" }]}
      />
      <Container className="grid gap-8 py-12 lg:grid-cols-[1fr_1.4fr]">
        <form className="card-surface space-y-4 self-start p-6" onSubmit={(e) => e.preventDefault()}>
          <h2 className="font-display text-xl font-bold">Thông tin của bạn</h2>
          <div className="grid grid-cols-2 gap-1 rounded-lg border border-border bg-secondary/60 p-1">
            {(["male", "female"] as const).map((s) => (
              <button type="button" key={s} onClick={() => setSex(s)} className={cn("cursor-pointer rounded-md py-2 text-sm", sex === s ? "bg-card text-primary" : "text-muted-foreground")}>
                {s === "male" ? "Nam" : "Nữ"}
              </button>
            ))}
          </div>
          {[
            { id: "age", label: "Tuổi", v: age, set: setAge, unit: "tuổi" },
            { id: "height", label: "Chiều cao", v: height, set: setHeight, unit: "cm" },
            { id: "weight", label: "Cân nặng", v: weight, set: setWeight, unit: "kg" },
          ].map((f) => (
            <div key={f.id} className="space-y-2">
              <Label htmlFor={f.id}>{f.label}</Label>
              <div className="relative">
                <Input id={f.id} type="number" inputMode="decimal" value={f.v} onChange={(e) => f.set(e.target.value)} className="pr-14" />
                <span className="absolute top-1/2 right-3 -translate-y-1/2 text-xs text-muted-foreground">{f.unit}</span>
              </div>
            </div>
          ))}
          <div className="space-y-2">
            <Label>Mức độ vận động</Label>
            <Select value={activity} onValueChange={setActivity}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{ACTIVITY.map((a) => <SelectItem key={a.value} value={a.value}>{a.label}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          {!r ? <p className="text-xs text-destructive">Vui lòng nhập tuổi 10–100, chiều cao 100–230 cm và cân nặng 25–300 kg.</p> : null}
        </form>

        <div className="space-y-5">
          <ResultCard icon={Scale} title="BMI — Chỉ số khối cơ thể" value={r ? fmt1(r.bmi) : "—"} badge={info ? <span className={info.tone}>{info.label}</span> : null}>
            BMI = cân nặng (kg) ÷ chiều cao² (m). Theo chuẩn cho người châu Á, mức 18,5–22,9 là bình thường. BMI không phân biệt cơ và mỡ nên chỉ mang tính tham khảo.
            <div className="mt-4 grid grid-cols-4 gap-1 text-center text-[11px]">
              {["< 18,5 Thiếu cân", "18,5–22,9 Bình thường", "23–24,9 Thừa cân", "≥ 25 Béo phì"].map((t, i) => (
                <span key={t} className={cn("rounded-md border border-border px-1 py-1.5", info && ["Thiếu cân", "Bình thường", "Thừa cân", "Béo phì"][i] === info.label && "border-primary/60 bg-primary/10 text-foreground")}>{t}</span>
              ))}
            </div>
          </ResultCard>
          <ResultCard icon={Flame} title="BMR — Năng lượng trao đổi cơ bản" value={r ? `${formatNumber(Math.round(r.bmr))} kcal` : "—"}>
            Lượng calo cơ thể cần để duy trì các chức năng sống khi nghỉ ngơi hoàn toàn, tính theo công thức Mifflin-St Jeor.
          </ResultCard>
          <ResultCard icon={Activity} title="TDEE — Tổng năng lượng tiêu hao mỗi ngày" value={r ? `${formatNumber(Math.round(r.tdee))} kcal` : "—"}>
            TDEE = BMR × hệ số vận động. Đây là mức calo để giữ cân nặng hiện tại.
            {r ? (
              <div className="mt-4 grid gap-2 sm:grid-cols-3">
                {[
                  { l: "Giảm mỡ", v: r.tdee - 500 },
                  { l: "Giữ cân", v: r.tdee },
                  { l: "Tăng cơ", v: r.tdee + 300 },
                ].map((g) => (
                  <div key={g.l} className="rounded-lg border border-border p-3">
                    <p className="text-xs">{g.l}</p>
                    <p className="font-semibold text-foreground">{formatNumber(Math.round(g.v))} kcal/ngày</p>
                  </div>
                ))}
              </div>
            ) : null}
          </ResultCard>
          <p className="text-xs text-muted-foreground">Kết quả chỉ mang tính tham khảo, không thay thế tư vấn của bác sĩ hoặc chuyên gia dinh dưỡng.</p>
        </div>
      </Container>
    </PublicLayout>
  );
}

function ResultCard({ icon: Icon, title, value, badge, children }: { icon: typeof Scale; title: string; value: string; badge?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="card-surface p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-lg bg-primary/12 text-primary"><Icon size={19} /></span>
          <h3 className="font-semibold">{title}</h3>
        </div>
        <div className="text-right">
          <p className="font-display text-3xl font-extrabold">{value}</p>
          {badge ? <p className="text-sm font-semibold">{badge}</p> : null}
        </div>
      </div>
      <div className="mt-3 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}
