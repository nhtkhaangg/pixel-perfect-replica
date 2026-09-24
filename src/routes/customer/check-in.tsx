import { Link, createFileRoute } from "@tanstack/react-router";
import { RefreshCw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { CPage, Panel, meta } from "@/components/customer/common";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/format";
import { CHECKINS, ME, MY_PACKAGES } from "@/lib/mock/customer";

export const Route = createFileRoute("/customer/check-in")({
  head: () => meta("Mã QR check-in", "Đưa mã QR vào máy quét ở cổng để vào phòng tập."),
  component: CheckIn,
});

function QrGrid({ seed }: { seed: number }) {
  const cells = useMemo(() => {
    const n = 25; const out: boolean[] = [];
    let x = seed * 9301 + 49297;
    for (let i = 0; i < n * n; i++) { x = (x * 9301 + 49297) % 233280; out.push(x / 233280 > 0.52); }
    return out;
  }, [seed]);
  const finder = (r: number, c: number) => {
    for (const [fr, fc] of [[0, 0], [0, 18], [18, 0]] as const) {
      if (r >= fr && r < fr + 7 && c >= fc && c < fc + 7) {
        const rr = r - fr, cc = c - fc;
        return rr === 0 || rr === 6 || cc === 0 || cc === 6 || (rr >= 2 && rr <= 4 && cc >= 2 && cc <= 4);
      }
    }
    return null;
  };
  return (
    <svg viewBox="0 0 25 25" className="size-full" shapeRendering="crispEdges" role="img" aria-label="Mã QR check-in">
      {cells.map((on, i) => {
        const r = Math.floor(i / 25), c = i % 25; const f = finder(r, c);
        return (f ?? on) ? <rect key={i} x={c} y={r} width={1} height={1} fill="currentColor" /> : null;
      })}
    </svg>
  );
}

function CheckIn() {
  const [seed, setSeed] = useState(7);
  const [left, setLeft] = useState(60);
  useEffect(() => {
    const t = setInterval(() => setLeft((s) => { if (s <= 1) { setSeed((v) => v + 1); return 60; } return s - 1; }), 1000);
    return () => clearInterval(t);
  }, []);
  const mem = MY_PACKAGES.find((p) => p.type === "MEMBERSHIP" && p.status === "active")!;
  return (
    <CPage title="Mã QR check-in" description="Đưa mã vào máy quét tại cổng chính hoặc cổng phụ. Mã tự làm mới mỗi 60 giây.">
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <section className="card-surface flex flex-col items-center p-6 md:p-10">
          <div className="rounded-2xl bg-foreground p-5 text-background shadow-[var(--shadow-card)]">
            <div className="size-56 md:size-72"><QrGrid seed={seed} /></div>
          </div>
          <p className="mt-6 font-display text-2xl font-bold">{ME.fullName}</p>
          <p className="text-sm text-muted-foreground">Mã hội viên {ME.id} · {mem.name}</p>
          <div className="mt-4 flex items-center gap-3 text-sm">
            <span className="text-muted-foreground">Làm mới sau <span className="font-semibold text-foreground">{left} giây</span></span>
            <Button size="sm" variant="outline" onClick={() => { setSeed(seed + 1); setLeft(60); }}><RefreshCw size={14} /> Làm mới</Button>
          </div>
        </section>
        <div className="space-y-6">
          <Panel title="Trạng thái">
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-muted-foreground">Gói hội viên</dt><dd className="text-primary">Còn hiệu lực</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Hết hạn</dt><dd>{formatDate(mem.endDate)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Lượt vào tháng này</dt><dd>{CHECKINS.length}</dd></div>
            </dl>
          </Panel>
          <Panel title="Lưu ý">
            <ul className="list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
              <li>Tăng độ sáng màn hình để máy quét đọc nhanh hơn.</li>
              <li>Không chụp màn hình chia sẻ mã cho người khác.</li>
              <li>Nếu không quét được, vui lòng check-in tại quầy lễ tân.</li>
            </ul>
            <Link to="/customer/check-in-history" className="mt-4 inline-block text-sm text-primary hover:underline">Xem lịch sử check-in</Link>
          </Panel>
        </div>
      </div>
    </CPage>
  );
}
