import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { CPage, Field, Panel, meta } from "@/components/customer/common";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/customer/reviews/create")({
  head: () => meta("Đánh giá phòng gym", "Chia sẻ trải nghiệm tập luyện của bạn tại GymCore."),
  component: CreateReview,
});

const CRITERIA = ["Cơ sở vật chất", "Huấn luyện viên", "Vệ sinh", "Thái độ nhân viên", "Lớp nhóm"];

function StarInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <button key={s} type="button" aria-label={`${s} sao`} onClick={() => onChange(s)} className="cursor-pointer">
          <Star size={22} className={cn(s <= value ? "fill-warning text-warning" : "text-muted-foreground/40")} />
        </button>
      ))}
    </div>
  );
}

function CreateReview() {
  const [overall, setOverall] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({ "Cơ sở vật chất": 5, "Huấn luyện viên": 5, "Vệ sinh": 4, "Thái độ nhân viên": 5, "Lớp nhóm": 4 });
  const [text, setText] = useState("");
  const [anon, setAnon] = useState(false);
  return (
    <CPage title="Đánh giá phòng gym" description="Đánh giá của bạn giúp phòng tập cải thiện dịch vụ mỗi ngày.">
      <Panel>
        <form
          className="max-w-2xl space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            if (!overall) { toast.error("Vui lòng chọn số sao tổng thể."); return; }
            if (text.trim().length < 20) { toast.error("Nội dung cần ít nhất 20 ký tự."); return; }
            toast.success("Cảm ơn bạn! Đánh giá sẽ hiển thị sau khi được duyệt (dữ liệu mẫu).");
            setOverall(0); setText("");
          }}
        >
          <Field label="Đánh giá tổng thể"><StarInput value={overall} onChange={setOverall} /></Field>
          <div className="grid gap-4 sm:grid-cols-2">
            {CRITERIA.map((c) => (
              <div key={c} className="flex items-center justify-between rounded-lg border border-border p-3">
                <span className="text-sm">{c}</span>
                <StarInput value={scores[c] ?? 0} onChange={(v) => setScores({ ...scores, [c]: v })} />
              </div>
            ))}
          </div>
          <Field label="Nhận xét của bạn" hint={`${text.length}/500 ký tự`}>
            <Textarea rows={5} maxLength={500} value={text} onChange={(e) => setText(e.target.value)} placeholder="Điều bạn thích nhất và điều phòng tập nên cải thiện…" />
          </Field>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground"><Checkbox checked={anon} onCheckedChange={(v) => setAnon(v === true)} /> Ẩn tên khi hiển thị công khai</label>
          <Button type="submit" variant="hero">Gửi đánh giá</Button>
        </form>
      </Panel>
    </CPage>
  );
}
