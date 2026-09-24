import { Link, createFileRoute } from "@tanstack/react-router";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { GoogleButton, OrDivider } from "@/components/public/auth-fields";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Đăng nhập — GymCore" },
      {
        name: "description",
        content: "Đăng nhập vào hệ thống GymCore để quản lý lịch tập, gói tập và hội viên.",
      },
      { property: "og:title", content: "Đăng nhập — GymCore" },
      { property: "og:description", content: "Truy cập tài khoản hội viên GymCore." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <AuthLayout
      title="Bắt đầu tập luyện"
      description="Đăng nhập để xem lịch tập và tiến độ của bạn."
      activeTab="login"
    >
      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          const form = new FormData(e.currentTarget);
          if (!String(form.get("identifier") ?? "").trim()) {
            setError("Vui lòng nhập email hoặc số điện thoại.");
            return;
          }
          setError(null);
          toast.success("Đăng nhập thành công (dữ liệu mẫu).");
        }}
      >
        <GoogleButton label="Đăng nhập bằng Google" />
        <OrDivider />

        <div className="space-y-2">
          <Label htmlFor="identifier">Email hoặc số điện thoại</Label>
          <Input id="identifier" name="identifier" placeholder="hoang.minh@gymcore.vn" />
          {error ? <p className="text-xs text-destructive">{error}</p> : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Mật khẩu</Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Nhập mật khẩu"
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
        </div>

        <div className="flex items-center justify-between gap-3">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
            <Checkbox id="remember" /> Ghi nhớ đăng nhập
          </label>
          <Link to="/forgot-password" className="text-sm text-primary hover:underline">
            Quên mật khẩu?
          </Link>
        </div>

        <Button type="submit" variant="hero" size="lg" className="w-full">
          Đăng nhập
        </Button>
      </form>
    </AuthLayout>
  );
}
