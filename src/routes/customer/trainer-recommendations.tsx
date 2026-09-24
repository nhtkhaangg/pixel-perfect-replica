import { Link, createFileRoute } from "@tanstack/react-router";
import { Lightbulb } from "lucide-react";

import { CPage, Panel, ProgressBar, meta } from "@/components/customer/common";
import { InitialsAvatar, Stars } from "@/components/public/blocks";
import { Button } from "@/components/ui/button";
import { ME } from "@/lib/mock/customer";
import { TRAINERS } from "@/lib/mock/public";

export const Route = createFileRoute("/customer/trainer-recommendations")({
  head: () => meta("Gợi ý huấn luyện viên phù hợp", "Huấn luyện viên phù hợp với mục tiêu, lịch rảnh và thể trạng của bạn."),
  component: Recs,
});

const RECS = [
  { id: "tran-anh-khoa", score: 94, reasons: ["Chuyên tăng cơ, khớp mục tiêu chính của bạn", "Trùng 6/9 khung giờ rảnh (tối T2, T4, T6)", "Đã dạy bạn 29 buổi, đánh giá trung bình 4,9"] },
  { id: "nguyen-minh-duc", score: 88, reasons: ["Có chứng chỉ dinh dưỡng, hỗ trợ giảm mỡ bụng", "Trùng 4/9 khung giờ rảnh", "Hơn 200 hội viên đạt mục tiêu giảm cân"] },
  { id: "dang-hoang-nam", score: 81, reasons: ["Nền tảng vật lý trị liệu, phù hợp tiền sử đau gối", "Trùng 3/9 khung giờ (chủ yếu buổi sáng)", "Chú trọng tư thế và phòng ngừa chấn thương"] },
];

function Recs() {
  return (
    <CPage title="Gợi ý huấn luyện viên phù hợp" description={`Dựa trên mục tiêu “${ME.goal}”, lịch rảnh và phiếu đánh giá thể trạng.`}>
      <div className="grid gap-5 lg:grid-cols-3">
        {RECS.map((r, i) => {
          const t = TRAINERS.find((x) => x.id === r.id)!;
          return (
            <Panel key={r.id} className={i === 0 ? "border-primary/50" : ""}>
              {i === 0 ? <p className="mb-3 text-xs font-semibold tracking-wider text-primary uppercase">Phù hợp nhất</p> : null}
              <div className="flex items-center gap-3">
                <InitialsAvatar name={t.name} className="size-14 text-lg" />
                <div><h2 className="font-semibold">{t.name}</h2><p className="text-sm text-muted-foreground">{t.specialty}</p><p className="flex items-center gap-1 text-xs"><Stars value={t.rating} size={11} /> {t.rating.toLocaleString("vi-VN")} · {t.experienceYears} năm</p></div>
              </div>
              <div className="mt-4"><div className="mb-1.5 flex justify-between text-xs"><span className="text-muted-foreground">Mức độ phù hợp</span><span className="font-semibold">{r.score}%</span></div><ProgressBar value={r.score} /></div>
              <div className="mt-4 rounded-lg border border-border bg-secondary/40 p-3">
                <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold"><Lightbulb size={13} className="text-cyan" /> Vì sao gợi ý?</p>
                <ul className="list-disc space-y-1 pl-4 text-xs text-muted-foreground">{r.reasons.map((x) => <li key={x}>{x}</li>)}</ul>
              </div>
              <div className="mt-4 flex gap-2">
                <Button size="sm" className="flex-1" asChild><Link to="/customer/trainer-packages">Đặt gói PT</Link></Button>
                <Button size="sm" variant="outline" asChild><Link to="/trainers/$id" params={{ id: t.id }}>Hồ sơ</Link></Button>
              </div>
            </Panel>
          );
        })}
      </div>
    </CPage>
  );
}
