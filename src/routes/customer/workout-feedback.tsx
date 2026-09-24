import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { CPage, Field, Panel, meta } from "@/components/customer/common";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { formatDate } from "@/lib/format";
import { SESSIONS } from "@/lib/mock/customer";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/customer/workout-feedback")({
  head: () => meta("Phản hồi buổi tập", "Cho huấn luyện viên biết cảm nhận của bạn sau buổi tập."),
  component: Feedback,
});

const MOODS = ["Rất mệt", "Hơi mệt", "Bình thường", "Tốt", "Rất tốt"];
const PAIN = ["Không", "Gối", "Lưng dưới", "Vai", "Cổ tay"];

function Feedback() {
  const done = SESSIONS.filter((s) => s.status === "completed");
  const [sid, setSid] = useState(done[1]!.id);
  const [rpe, setRpe] = useState([7]);
  const [mood, setMood] = useState(3);
  const [pain, setPain] = useState<string[]>(["Không"]);
  const [note, setNote] = useState("");
  return (
    <CPage title="Phản hồi buổi tập">
      <Panel>
        <form className="max-w-2xl space-y-6" onSubmit={(e) => { e.preventDefault(); toast.success("Đã gửi phản hồi tới huấn luyện viên (dữ liệu mẫu)."); setNote(""); }}>
          <Field label="Buổi tập">
            <div className="flex flex-wrap gap-2">
              {done.map((s) => <button type="button" key={s.id} onClick={() => setSid(s.id)} className={cn("cursor-pointer rounded-lg border px-3 py-2 text-left text-sm", sid === s.id ? "border-primary bg-primary/10" : "border-border")}><span className="block font-medium">{s.title}</span><span className="text-xs text-muted-foreground">{formatDate(s.date)} · {s.start}</span></button>)}
            </div>
          </Field>
          <Field label={`Mức độ gắng sức (RPE): ${rpe[0]}/10`} hint="1 = rất nhẹ, 10 = kiệt sức hoàn toàn">
            <Slider value={rpe} onValueChange={setRpe} min={1} max={10} step={1} />
          </Field>
          <Field label="Cảm nhận sau buổi tập">
            <div className="grid grid-cols-5 gap-2">{MOODS.map((m, i) => <button type="button" key={m} onClick={() => setMood(i)} className={cn("cursor-pointer rounded-lg border px-2 py-2 text-xs", mood === i ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground")}>{m}</button>)}</div>
          </Field>
          <Field label="Vị trí đau/khó chịu">
            <div className="flex flex-wrap gap-2">{PAIN.map((p) => <button type="button" key={p} onClick={() => setPain(p === "Không" ? ["Không"] : pain.includes(p) ? pain.filter((x) => x !== p) : [...pain.filter((x) => x !== "Không"), p])} className={cn("cursor-pointer rounded-full border px-3 py-1.5 text-sm", pain.includes(p) ? "border-warning/60 bg-warning/10 text-warning" : "border-border text-muted-foreground")}>{p}</button>)}</div>
          </Field>
          <Field label="Góp ý cho huấn luyện viên"><Textarea rows={4} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Bài nào quá nặng/nhẹ, bạn muốn thay đổi gì…" /></Field>
          <Button type="submit">Gửi phản hồi</Button>
        </form>
      </Panel>
    </CPage>
  );
}
