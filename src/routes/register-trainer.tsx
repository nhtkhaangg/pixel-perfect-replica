import { createFileRoute } from "@tanstack/react-router";
import { Award, CalendarCheck, Wallet } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { PublicLayout } from "@/components/layout/PublicLayout";
import { Container, PublicPageHero } from "@/components/public/blocks";
import { FieldError } from "@/components/public/auth-fields";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/register-trainer")({
  head: () => ({
    meta: [
      { title: "Đăng ký trở thành huấn luyện viên — GymCore" },
      { name: "description", content: "Gửi hồ sơ ứng tuyển vị trí huấn luyện viên cá nhân tại phòng tập GymCore Quận 3." },
      { property: "og:title", content: "Trở thành huấn luyện viên tại GymCore" },
      { property: "og:description", content: "Thu nhập hấp dẫn, lịch làm việc linh hoạt và môi trường chuyên nghiệp." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: RegisterTrainerPage,
});

const PERKS = [
  { icon: Wallet, title: "Thu nhập minh bạch", desc: "Lương cứng từ 8.000.000 VNĐ cùng hoa hồng 40–55% mỗi gói PT." },
  { icon: CalendarCheck, title: "Lịch làm việc linh hoạt", desc: "Tự đăng ký ca theo tuần, tối thiểu 24 giờ mỗi tuần." },
  { icon: Award, title: "Đào tạo nâng cao", desc: "Hỗ trợ 50% chi phí chứng chỉ quốc tế sau 6 tháng làm việc." },
];

const SPECIALTIES = ["Tăng cơ & sức mạnh", "Giảm cân & thể lực", "Yoga", "Kickfit", "Phục hồi chấn thương", "Thể hình nữ"];

type Errors = Partial<Record<"fullName" | "email" | "phone" | "specialty" | "years" | "agreed", string>>;

function RegisterTrainerPage() {
  const [specialty, setSpecialty] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  return (
    <PublicLayout>
      <PublicPageHero
        title="Trở thành huấn luyện viên GymCore"
        description="Chúng tôi tìm kiếm những huấn luyện viên tận tâm, có chuyên môn vững để đồng hành cùng hơn 1.200 hội viên tại Quận 3."
        crumbs={[{ label: "Đăng ký huấn luyện viên" }]}
      />
      <Container className="grid gap-8 py-12 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-4">
          {PERKS.map((p) => (
            <div key={p.title} className="card-surface flex gap-4 p-5">
              <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/12 text-primary">
                <p.icon size={19} />
              </span>
              <div>
                <h3 className="font-semibold">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
              </div>
            </div>
          ))}
          <div className="card-surface p-5 text-sm text-muted-foreground">
            <h3 className="font-semibold text-foreground">Quy trình tuyển chọn</h3>
            <ol className="mt-3 list-decimal space-y-1.5 pl-5">
              <li>Gửi hồ sơ trực tuyến</li>
              <li>Phỏng vấn cùng quản lý phòng tập (3–5 ngày)</li>
              <li>Buổi dạy thử 60 phút với hội viên mẫu</li>
              <li>Nhận kết quả và ký hợp đồng</li>
            </ol>
          </div>
        </div>

        <div className="card-surface p-6 md:p-8">
          {submitted ? (
            <div className="space-y-3 py-10 text-center">
              <h2 className="font-display text-2xl font-bold">Đã nhận hồ sơ của bạn</h2>
              <p className="text-muted-foreground">Bộ phận nhân sự sẽ liên hệ trong vòng 3 ngày làm việc.</p>
              <Button variant="outline" onClick={() => setSubmitted(false)}>Gửi hồ sơ khác</Button>
            </div>
          ) : (
            <form
              className="space-y-4"
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                const f = new FormData(e.currentTarget);
                const next: Errors = {};
                if (!String(f.get("fullName") ?? "").trim()) next.fullName = "Vui lòng nhập họ và tên.";
                if (!/^\S+@\S+\.\S+$/.test(String(f.get("email") ?? ""))) next.email = "Email không hợp lệ.";
                if (!/^0\d{9}$/.test(String(f.get("phone") ?? ""))) next.phone = "Số điện thoại gồm 10 chữ số.";
                if (!specialty) next.specialty = "Vui lòng chọn chuyên môn.";
                if (!(Number(f.get("years")) >= 1)) next.years = "Cần ít nhất 1 năm kinh nghiệm.";
                if (!agreed) next.agreed = "Bạn cần xác nhận thông tin là chính xác.";
                setErrors(next);
                if (Object.keys(next).length === 0) {
                  setSubmitted(true);
                  toast.success("Gửi hồ sơ thành công (dữ liệu mẫu).");
                }
              }}
            >
              <h2 className="font-display text-2xl font-bold">Hồ sơ ứng tuyển</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="fullName">Họ và tên</Label>
                  <Input id="fullName" name="fullName" placeholder="Nguyễn Văn An" />
                  <FieldError msg={errors.fullName} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="an.nguyen@gmail.com" />
                  <FieldError msg={errors.email} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <Input id="phone" name="phone" placeholder="0901234567" />
                  <FieldError msg={errors.phone} />
                </div>
                <div className="space-y-2">
                  <Label>Chuyên môn chính</Label>
                  <Select value={specialty} onValueChange={setSpecialty}>
                    <SelectTrigger><SelectValue placeholder="Chọn chuyên môn" /></SelectTrigger>
                    <SelectContent>
                      {SPECIALTIES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FieldError msg={errors.specialty} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="years">Số năm kinh nghiệm</Label>
                  <Input id="years" name="years" type="number" min={0} placeholder="3" />
                  <FieldError msg={errors.years} />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="certs">Chứng chỉ chuyên môn</Label>
                  <Input id="certs" name="certs" placeholder="Ví dụ: NASM-CPT (2022), Sơ cấp cứu (2024)" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="intro">Giới thiệu bản thân</Label>
                  <Textarea id="intro" name="intro" rows={4} placeholder="Kinh nghiệm, phương pháp huấn luyện, thành tích nổi bật…" />
                </div>
              </div>
              <label className="flex cursor-pointer items-start gap-2.5 text-sm text-muted-foreground">
                <Checkbox checked={agreed} onCheckedChange={(v) => setAgreed(v === true)} className="mt-0.5" />
                Tôi xác nhận các thông tin trên là chính xác.
              </label>
              <FieldError msg={errors.agreed} />
              <Button type="submit" variant="hero" size="lg" className="w-full">Gửi hồ sơ</Button>
            </form>
          )}
        </div>
      </Container>
    </PublicLayout>
  );
}
