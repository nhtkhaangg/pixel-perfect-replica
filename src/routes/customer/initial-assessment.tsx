import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { CPage, Field, Panel, ProgressBar, meta } from "@/components/customer/common";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/customer/initial-assessment")({
  head: () => meta("Đánh giá thể trạng ban đầu", "Khai báo sức khoẻ, mục tiêu và kinh nghiệm tập luyện."),
  component: Assessment,
});

const STEPS = ["Chỉ số cơ bản", "Sức khoẻ", "Mục tiêu & kinh nghiệm"];
const CONDITIONS = ["Huyết áp cao", "Bệnh tim mạch", "Tiểu đường", "Đau lưng", "Chấn thương gối", "Hen suyễn", "Đang mang thai"];
const GOALS = ["Giảm mỡ", "Tăng cơ", "Tăng sức bền", "Cải thiện tư thế", "Phục hồi chấn thương", "Giữ dáng"];
const LEVELS = ["Chưa từng tập", "Dưới 6 tháng", "6 – 24 tháng", "Trên 2 năm"];

function Choice({ active, onClick, children }: { active: boolean; onClick: () => void; children: string }) {
  return (
    <button type="button" onClick={onClick} className={cn("cursor-pointer rounded-lg border px-3 py-2 text-sm transition-colors", active ? "border-primary bg-primary/12 text-primary" : "border-border text-muted-foreground hover:text-foreground")}>
      {children}
    </button>
  );
}

function Assessment() {
  const [step, setStep] = useState(0);
  const [conds, setConds] = useState<string[]>(["Chấn thương gối"]);
  const [goals, setGoals] = useState<string[]>(["Tăng cơ", "Giảm mỡ"]);
  const [level, setLevel] = useState(LEVELS[2]!);
  const [done, setDone] = useState(false);
  const toggle = (list: string[], set: (v: string[]) => void, v: string) => set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  if (done)
    return (
      <CPage title="Đánh giá thể trạng ban đầu">
        <Panel className="py-12 text-center">
          <h2 className="font-display text-2xl font-bold">Đã gửi phiếu đánh giá</h2>
          <p className="mt-2 text-muted-foreground">Huấn luyện viên Trần Anh Khoa sẽ xem và hẹn buổi đo InBody trong 48 giờ.</p>
          <Button className="mt-6" variant="outline" onClick={() => { setDone(false); setStep(0); }}>Xem lại phiếu</Button>
        </Panel>
      </CPage>
    );

  return (
    <CPage title="Đánh giá thể trạng ban đầu" description="Thông tin giúp huấn luyện viên thiết kế giáo án an toàn và phù hợp với bạn.">
      <Panel>
        <div className="mb-6 space-y-3">
          <div className="flex justify-between text-sm">
            {STEPS.map((s, i) => <span key={s} className={cn(i <= step ? "text-primary" : "text-muted-foreground")}>{i + 1}. {s}</span>)}
          </div>
          <ProgressBar value={((step + 1) / STEPS.length) * 100} />
        </div>

        {step === 0 ? (
          <div className="grid gap-4 md:grid-cols-3">
            <Field label="Chiều cao (cm)"><Input type="number" defaultValue={172} /></Field>
            <Field label="Cân nặng (kg)"><Input type="number" defaultValue={78.4} /></Field>
            <Field label="Vòng eo (cm)"><Input type="number" defaultValue={89} /></Field>
            <Field label="Nhịp tim khi nghỉ (lần/phút)"><Input type="number" defaultValue={72} /></Field>
            <Field label="Huyết áp"><Input defaultValue="125/82" /></Field>
            <Field label="Số giờ ngủ trung bình"><Input type="number" defaultValue={6.5} /></Field>
          </div>
        ) : null}

        {step === 1 ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Bạn có đang gặp vấn đề sức khoẻ nào sau đây?</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {CONDITIONS.map((c) => (
                <label key={c} className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-border p-3 text-sm">
                  <Checkbox checked={conds.includes(c)} onCheckedChange={() => toggle(conds, setConds, c)} /> {c}
                </label>
              ))}
            </div>
            <Field label="Ghi chú thêm"><Textarea rows={3} defaultValue="Từng bị đau gối trái khi chạy bộ đường dài năm 2024." /></Field>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="space-y-5">
            <Field label="Mục tiêu (chọn nhiều)"><div className="flex flex-wrap gap-2">{GOALS.map((g) => <Choice key={g} active={goals.includes(g)} onClick={() => toggle(goals, setGoals, g)}>{g}</Choice>)}</div></Field>
            <Field label="Kinh nghiệm tập luyện"><div className="flex flex-wrap gap-2">{LEVELS.map((l) => <Choice key={l} active={level === l} onClick={() => setLevel(l)}>{l}</Choice>)}</div></Field>
            <Field label="Số buổi có thể tập mỗi tuần"><Input type="number" defaultValue={4} className="max-w-32" /></Field>
          </div>
        ) : null}

        <div className="mt-8 flex justify-between">
          <Button variant="outline" disabled={step === 0} onClick={() => setStep(step - 1)}>Quay lại</Button>
          {step < STEPS.length - 1 ? (
            <Button onClick={() => setStep(step + 1)}>Tiếp tục</Button>
          ) : (
            <Button variant="hero" onClick={() => { if (!goals.length) { toast.error("Vui lòng chọn ít nhất một mục tiêu."); return; } setDone(true); toast.success("Đã gửi phiếu đánh giá (dữ liệu mẫu)."); }}>Gửi đánh giá</Button>
          )}
        </div>
      </Panel>
    </CPage>
  );
}
