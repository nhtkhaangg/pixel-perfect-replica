import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { AuthLayout } from "@/components/layout/AuthLayout";
import {
  FieldError,
  GoogleButton,
  OrDivider,
  PasswordInput,
  StrengthMeter,
} from "@/components/public/auth-fields";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Đăng ký tài khoản — GymCore" },
      { name: "description", content: "Tạo tài khoản GymCore để nhận ưu đãi tập thử và theo dõi tiến độ tập luyện." },
      { property: "og:title", content: "Đăng ký tài khoản — GymCore" },
      { property: "og:description", content: "Tạo tài khoản và nhận ưu đãi buổi tập thử." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: RegisterPage,
});

type Errors = Partial<Record<"fullName" | "email" | "phone" | "password" | "confirm" | "agreed", string>>;

function RegisterPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  return (
    <AuthLayout title="Tạo tài khoản mới" description="Đăng ký ngay để nhận một buổi tập thử miễn phí." activeTab="register">
      <form
        className="space-y-4"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          const f = new FormData(e.currentTarget);
          const email = String(f.get("email") ?? "").trim();
          const phone = String(f.get("phone") ?? "").trim();
          const next: Errors = {};
          if (!String(f.get("fullName") ?? "").trim()) next.fullName = "Vui lòng nhập họ và tên.";
          if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Email không hợp lệ.";
          if (!/^0\d{9}$/.test(phone)) next.phone = "Số điện thoại gồm 10 chữ số, bắt đầu bằng 0.";
          if (password.length < 8) next.password = "Mật khẩu cần ít nhất 8 ký tự.";
          if (!confirm || confirm !== password) next.confirm = "Mật khẩu xác nhận không khớp.";
          if (!agreed) next.agreed = "Bạn cần đồng ý với điều khoản sử dụng.";
          setErrors(next);
          if (Object.keys(next).length === 0) toast.success("Tạo tài khoản thành công (dữ liệu mẫu).");
        }}
      >
        <GoogleButton label="Đăng ký bằng Google" />
        <OrDivider />

        <div className="space-y-2">
          <Label htmlFor="fullName">Họ và tên</Label>
          <Input id="fullName" name="fullName" placeholder="Nguyễn Minh Hoàng" />
          <FieldError msg={errors.fullName} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="hoang@gmail.com" />
            <FieldError msg={errors.email} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Số điện thoại</Label>
            <Input id="phone" name="phone" inputMode="tel" placeholder="0912345678" />
            <FieldError msg={errors.phone} />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Mật khẩu</Label>
          <PasswordInput id="password" value={password} onChange={setPassword} placeholder="Tối thiểu 8 ký tự" />
          <StrengthMeter password={password} />
          <FieldError msg={errors.password} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm">Xác nhận mật khẩu</Label>
          <PasswordInput id="confirm" value={confirm} onChange={setConfirm} placeholder="Nhập lại mật khẩu" />
          <FieldError msg={errors.confirm} />
        </div>
        <div className="space-y-1.5">
          <label className="flex cursor-pointer items-start gap-2.5 text-sm text-muted-foreground">
            <Checkbox checked={agreed} onCheckedChange={(v) => setAgreed(v === true)} className="mt-0.5" />
            <span>
              Tôi đồng ý với <span className="text-primary">Điều khoản sử dụng</span> và{" "}
              <span className="text-primary">Chính sách bảo mật</span> của GymCore.
            </span>
          </label>
          <FieldError msg={errors.agreed} />
        </div>
        <Button type="submit" variant="hero" size="lg" className="w-full">
          Tạo tài khoản
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          Bạn là huấn luyện viên?{" "}
          <Link to="/register-trainer" className="text-primary hover:underline">
            Gửi hồ sơ ứng tuyển
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
