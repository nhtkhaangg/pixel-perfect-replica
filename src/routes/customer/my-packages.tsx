import { Link, createFileRoute } from "@tanstack/react-router";

import { CPage, ProgressBar, TODAY, daysBetween, meta } from "@/components/customer/common";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDate } from "@/lib/format";
import { MY_PACKAGES } from "@/lib/mock/customer";
import { CATEGORY_LABEL } from "@/lib/mock/public";

export const Route = createFileRoute("/customer/my-packages")({
  head: () => meta("Gói tập đã mua", "Danh sách gói hội viên và gói PT bạn đã mua."),
  component: MyPackages,
});

function MyPackages() {
  return (
    <CPage title="Gói tập đã mua" actions={<Button asChild><Link to="/customer/packages">Mua thêm gói</Link></Button>}>
      <div className="grid gap-5 md:grid-cols-2">
        {MY_PACKAGES.map((p) => {
          const total = daysBetween(p.startDate, p.endDate);
          const left = Math.max(0, daysBetween(TODAY, p.endDate));
          const pct = p.totalSessions ? (p.usedSessions / p.totalSessions) * 100 : ((total - left) / total) * 100;
          return (
            <article key={p.id} className="card-surface p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs text-primary">{CATEGORY_LABEL[p.type]}</p>
                  <h2 className="font-display text-lg font-bold">{p.name}</h2>
                  <p className="text-xs text-muted-foreground">Mã {p.id}{p.trainer ? ` · HLV ${p.trainer}` : ""}</p>
                </div>
                <StatusBadge status={p.status} />
              </div>
              <dl className="mt-4 grid grid-cols-3 gap-2 text-sm">
                <div><dt className="text-xs text-muted-foreground">Bắt đầu</dt><dd>{formatDate(p.startDate)}</dd></div>
                <div><dt className="text-xs text-muted-foreground">Hết hạn</dt><dd>{formatDate(p.endDate)}</dd></div>
                <div><dt className="text-xs text-muted-foreground">Giá</dt><dd>{formatCurrency(p.price)}</dd></div>
              </dl>
              <div className="mt-4">
                <div className="mb-1.5 flex justify-between text-xs text-muted-foreground">
                  <span>{p.totalSessions ? `Đã dùng ${p.usedSessions}/${p.totalSessions} buổi` : `${p.usedSessions} lượt check-in`}</span>
                  <span>{p.status === "active" ? `Còn ${left} ngày` : "Đã kết thúc"}</span>
                </div>
                <ProgressBar value={pct} />
              </div>
              {p.status === "active" ? (
                <div className="mt-4 flex gap-2">
                  <Button size="sm" variant="outline" asChild><Link to="/customer/packages">Gia hạn</Link></Button>
                  <Button size="sm" variant="ghost" asChild><Link to="/customer/refunds/create">Yêu cầu hoàn tiền</Link></Button>
                </div>
              ) : null}
            </article>
          );
        })}
      </div>
    </CPage>
  );
}
