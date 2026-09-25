import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import gymInterior from "@/assets/gym-interior.jpg";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Container, PublicPageHero, SectionHeading } from "@/components/public/blocks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FACILITIES, GYM_INFO } from "@/lib/mock/public";

export const Route = createFileRoute("/gym-info")({
  head: () => ({
    meta: [
      { title: "Thông tin & Liên hệ — OmniGym Cần Thơ" },
      { name: "description", content: `Địa chỉ ${GYM_INFO.address}. Mở cửa ${GYM_INFO.hoursText}, hotline ${GYM_INFO.hotline}.` },
      { property: "og:title", content: "Thông tin phòng tập OmniGym Fitness & Yoga Center" },
      { property: "og:description", content: "Địa chỉ, giờ mở cửa, 6 khu vực chức năng và nội quy phòng tập." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: GymInfoPage,
});

function GymInfoPage() {
  const [sent, setSent] = useState(false);
  const contacts = [
    { icon: MapPin, label: "Địa chỉ", value: GYM_INFO.address },
    { icon: Phone, label: "Điện thoại", value: `${GYM_INFO.phone} · Hotline ${GYM_INFO.hotline}` },
    { icon: Mail, label: "Email", value: GYM_INFO.email },
  ];
  return (
    <PublicLayout>
      <PublicPageHero title="Thông tin phòng gym" description={`${GYM_INFO.name} — ${GYM_INFO.area} không gian tập luyện tiêu chuẩn Olympic tại Cần Thơ.`} crumbs={[{ label: "Thông tin phòng gym" }]} />
      <Container className="grid gap-8 py-12 lg:grid-cols-2">
        <div className="space-y-6">
          <img src={gymInterior} alt="Không gian bên trong phòng tập GymCore" width={1600} height={912} loading="lazy" className="aspect-[16/9] w-full rounded-xl border border-border object-cover" />
          <div className="card-surface divide-y divide-border">
            {contacts.map((c) => (
              <div key={c.label} className="flex gap-4 p-5">
                <c.icon size={18} className="mt-0.5 shrink-0 text-primary" />
                <div><p className="text-xs text-muted-foreground">{c.label}</p><p className="font-medium">{c.value}</p></div>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <div className="card-surface p-6">
            <h2 className="flex items-center gap-2 font-display text-xl font-bold"><Clock size={18} className="text-primary" />Giờ mở cửa</h2>
            <ul className="mt-4 divide-y divide-border text-sm">
              {GYM_INFO.hours.map((h) => <li key={h.day} className="flex justify-between py-3"><span className="text-muted-foreground">{h.day}</span><span className="font-semibold">{h.time}</span></li>)}
            </ul>
          </div>
          <form
            className="card-surface space-y-4 p-6"
            onSubmit={(e) => {
              e.preventDefault();
              const f = new FormData(e.currentTarget);
              if (!String(f.get("name")).trim() || !/^0\d{9}$/.test(String(f.get("phone")))) { toast.error("Vui lòng nhập họ tên và số điện thoại hợp lệ."); return; }
              setSent(true);
              toast.success("Đã gửi yêu cầu. Chúng tôi sẽ gọi lại trong 24 giờ (dữ liệu mẫu).");
            }}
          >
            <h2 className="font-display text-xl font-bold">Đăng ký tư vấn miễn phí</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2"><Label htmlFor="name">Họ và tên</Label><Input id="name" name="name" placeholder="Nguyễn Văn An" /></div>
              <div className="space-y-2"><Label htmlFor="phone">Số điện thoại</Label><Input id="phone" name="phone" placeholder="0901234567" /></div>
            </div>
            <div className="space-y-2"><Label htmlFor="msg">Lời nhắn</Label><Textarea id="msg" name="msg" rows={3} placeholder="Tôi muốn tập thử vào cuối tuần…" /></div>
            <Button type="submit" variant="hero" className="w-full" disabled={sent}>{sent ? "Đã gửi yêu cầu" : "Gửi yêu cầu"}</Button>
          </form>
        </div>
      </Container>
      <Container className="pb-16">
        <SectionHeading title="Cơ sở vật chất" />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {FACILITIES.map((f) => (
            <div key={f.key} className="card-surface p-5">
              <p className="text-xs text-primary">{f.floor}</p>
              <h3 className="mt-1 font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
        <div className="card-surface mt-8 p-6">
          <h2 className="font-display text-xl font-bold">Nội quy phòng tập</h2>
          <ul className="mt-4 grid list-disc gap-2 pl-5 text-sm text-muted-foreground md:grid-cols-2">
            {GYM_INFO.rules.map((r) => <li key={r}>{r}</li>)}
          </ul>
        </div>
      </Container>
    </PublicLayout>
  );
}
