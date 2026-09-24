import { createFileRoute } from "@tanstack/react-router";
import { Play, Search } from "lucide-react";
import { useState } from "react";

import gymInterior from "@/assets/gym-interior.jpg";
import heroImage from "@/assets/hero-gym.jpg";
import training from "@/assets/training.jpg";
import { CPage, meta } from "@/components/customer/common";
import { EmptyState } from "@/components/shared/states";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { EXERCISES } from "@/lib/mock/customer";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/customer/exercises")({
  head: () => meta("Hướng dẫn bài tập", "Thư viện video hướng dẫn kỹ thuật các bài tập trong giáo án."),
  component: Exercises,
});

const IMGS = [heroImage, training, gymInterior];
type Ex = (typeof EXERCISES)[number];

function Exercises() {
  const groups = ["Tất cả", ...new Set(EXERCISES.map((e) => e.group))];
  const [g, setG] = useState("Tất cả");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<Ex | null>(null);
  const list = EXERCISES.filter((e) => (g === "Tất cả" || e.group === g) && e.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <CPage title="Hướng dẫn bài tập" description="Video ngắn do huấn luyện viên GymCore quay tại phòng tập.">
      <div className="flex flex-wrap items-center gap-2">
        {groups.map((x) => <button key={x} onClick={() => setG(x)} className={cn("cursor-pointer rounded-full border px-3.5 py-1.5 text-sm", g === x ? "border-primary bg-primary/15 text-primary" : "border-border text-muted-foreground")}>{x}</button>)}
        <div className="relative ml-auto w-full sm:w-64"><Search size={15} className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground" /><Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Tìm bài tập…" className="pl-9" /></div>
      </div>
      {list.length ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {list.map((e, i) => (
            <button key={e.id} onClick={() => setOpen(e)} className="card-surface group cursor-pointer overflow-hidden text-left">
              <div className="relative">
                <img src={IMGS[i % 3]} alt="" loading="lazy" width={1200} height={912} className="aspect-video w-full object-cover opacity-70 transition-opacity group-hover:opacity-90" />
                <span className="absolute inset-0 grid place-items-center"><span className="grid size-12 place-items-center rounded-full bg-primary text-primary-foreground"><Play size={20} className="ml-0.5 fill-current" /></span></span>
                <span className="absolute right-2 bottom-2 rounded bg-background/80 px-1.5 py-0.5 text-xs">{e.duration}</span>
              </div>
              <div className="p-4">
                <p className="text-xs text-primary">{e.group} · {e.level}</p>
                <h3 className="font-semibold">{e.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">Khuyến nghị: {e.sets}</p>
              </div>
            </button>
          ))}
        </div>
      ) : <EmptyState title="Không tìm thấy bài tập" description="Thử từ khoá hoặc nhóm cơ khác." />}
      <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle>{open?.name}</DialogTitle><DialogDescription>{open?.group} · {open?.level} · {open?.sets}</DialogDescription></DialogHeader>
          <div className="grid aspect-video place-items-center rounded-lg border border-border bg-secondary text-sm text-muted-foreground"><span className="flex items-center gap-2"><Play size={16} /> Video hướng dẫn ({open?.duration})</span></div>
          <p className="text-sm"><span className="font-semibold">Lưu ý kỹ thuật:</span> <span className="text-muted-foreground">{open?.tips}</span></p>
        </DialogContent>
      </Dialog>
    </CPage>
  );
}
