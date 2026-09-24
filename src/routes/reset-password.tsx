import { Link, createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";

import { AuthLayout } from "@/components/layout/AuthLayout";
import { FieldError, PasswordInput, StrengthMeter } from "@/components/public/auth-fields";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Đặt lại mật khẩu — GymCore" },
      { name: "description", content: "Tạo mật khẩu mới cho tài khoản GymCore của bạn." },
      { property: "og:title", content: "Đặt lại mật khẩu — GymCore" },
      { property: "og:description", content: "Tạo mật khẩu mới an toàn cho tài khoản hội viên." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<{ password?: string; confirm?: string }>({});
  const [done, setDone] = useState(false);

  return (
    <AuthLayout
      title={done ? "Đã đổi mật khẩu" : "Đặt lại mật khẩu"}
      description={done ? "Bạn có thể đăng nhập bằng mật khẩu mới." : "Mật khẩu mới cần khác mật khẩu cũ và có ít nhất 8 ký tự."}
    >
      {done ? (
        <div className="space-y-5">
          <div className="flex items-center gap-3 rounded-lg border border-primary/30 bg-primary/10 p-4 text-sm">
            <CheckCircle2 size={20} className="text-primary" /> Mật khẩu đã được cập nhật lúc{" "}
            {new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit", hour12: false })}.
          </div>
          <Button variant="hero" size="lg" className="w-full" asChild>
            <Link to="/login">Đăng nhập ngay</Link>
          </Button>
        </div>
      ) : (
        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            const next: typeof errors = {};
            if (password.length < 8) next.password = "Mật khẩu cần ít nhất 8 ký tự.";
            if (!confirm || confirm !== password) next.confirm = "Mật khẩu xác nhận không khớp.";
            setErrors(next);
            if (!next.password && !next.confirm) setDone(true);
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="password">Mật khẩu mới</Label>
            <PasswordInput id="password" value={password} onChange={setPassword} placeholder="Tối thiểu 8 ký tự" />
            <StrengthMeter password={password} />
            <FieldError msg={errors.password} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm">Xác nhận mật khẩu mới</Label>
            <PasswordInput id="confirm" value={confirm} onChange={setConfirm} placeholder="Nhập lại mật khẩu mới" />
            <FieldError msg={errors.confirm} />
          </div>
          <Button type="submit" variant="hero" size="lg" className="w-full">
            Cập nhật mật khẩu
          </Button>
        </form>
      )}
    </AuthLayout>
  );
}
