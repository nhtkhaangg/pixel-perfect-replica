import { createFileRoute } from "@tanstack/react-router";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { AuthLayout } from "@/components/layout/AuthLayout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Đăng ký hội viên — GymCore" },
      {
        name: "description",
        content: "Tạo tài khoản GymCore để nhận ưu đãi tập thử và theo dõi tiến độ tập luyện.",
      },
      { property: "og:title", content: "Đăng ký hội viên — GymCore" },
      { property: "og:description", content: "Tạo tài khoản và nhận ưu đãi buổi tập thử." },
    ],
  }),
  component: RegisterPage,
});

function passwordStrength(value: string): { level: number; label: string } {
  let level = 0;
  if (value.length >= 8) level++;
  if (/[A-Z]/.test(value) && /[a-z]/.test(value)) level++;
  if (/\d/.test(value) || /[^\w\s]/.test(value)) level++;
  const labels = ["Rất yếu", "Yếu", "Trung bình", "Mạnh"];
  return { level, label: labels[level] };
}

function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const strength = passwordStrength(password);

  return (
    <AuthLayout
      title="Tạo tài khoản mới"
      description="Đăng ký ngay để nhận ưu đãi buổi tập thử."
      activeTab="register"
    >
      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          const form = new FormData(e.currentTarget);
          const next: Record<string, string> = {};
          if (!String(form.get("fullName") ?? "").trim()) next.fullName = "Vui lòng nhập họ và tên.";
          if (!String(form.get("contact") ?? "").trim())
            next.contact = "Vui lòng nhập số điện thoại hoặc email.";
          if (password.length < 8) next.password = "Mật khẩu cần ít nhất 8 ký tự.";
          if (confirm !== password) next.confirm = "Mật khẩu xác nhận không khớp.";
          if (!agreed) next.agreed = "Bạn cần đồng ý với điều khoản sử dụng.";
          setErrors(next);
          if (Object.keys(next).length === 0) {
            toast.success("Tạo tài khoản thành công (dữ liệu mẫu).");
          }
        }}
      >
        <div className="space-y-2">
          <Label htmlFor="fullName">Họ và tên</Label>
          <Input id="fullName" name="fullName" placeholder="Nguyễn Minh Hoàng" />
          {errors.fullName ? <p className="text-xs text-destructive">{errors.fullName}</p> : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact">Số điện thoại hoặc email</Label>
          <Input id="contact" name="contact" placeholder="0912345678" />
          {errors.contact ? <p className="text-xs text-destructive">{errors.contact}</p> : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Mật khẩu</Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Tối thiểu 8 ký tự"
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
              className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {password ? (
            <div className="space-y-1.5">
              <div className="flex gap-1.5">
                {[1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className={cn(
                      "h-1 flex-1 rounded-full",
                      strength.level >= i ? "bg-primary" : "bg-muted",
                    )}
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground">Độ bảo mật: {strength.label}</p>
            </div>
          ) : null}
          {errors.password ? <p className="text-xs text-destructive">{errors.password}</p> : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirm">Xác nhận mật khẩu</Label>
          <Input
            id="confirm"
            name="confirm"
            type={showPassword ? "text" : "password"}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Nhập lại mật khẩu"
          />
          {errors.confirm ? <p className="text-xs text-destructive">{errors.confirm}</p> : null}
        </div>

        <div className="space-y-1.5">
          <label className="flex cursor-pointer items-start gap-2.5 text-sm text-muted-foreground">
            <Checkbox
              id="agreed"
              checked={agreed}
              onCheckedChange={(value) => setAgreed(value === true)}
              className="mt-0.5"
            />
            <span>
              Tôi đồng ý với <span className="text-primary">Điều khoản sử dụng</span> và{" "}
              <span className="text-primary">Chính sách bảo mật</span> của GymCore.
            </span>
          </label>
          {errors.agreed ? <p className="text-xs text-destructive">{errors.agreed}</p> : null}
        </div>

        <Button type="submit" variant="hero" size="lg" className="w-full">
          Tạo tài khoản
        </Button>
      </form>
    </AuthLayout>
  );
}
