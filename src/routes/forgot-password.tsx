import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, MailCheck } from "lucide-react";
import { useState } from "react";

import { AuthLayout } from "@/components/layout/AuthLayout";
import { FieldError } from "@/components/public/auth-fields";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Quên mật khẩu — GymCore" },
      { name: "description", content: "Nhận liên kết đặt lại mật khẩu tài khoản GymCore qua email." },
      { property: "og:title", content: "Quên mật khẩu — GymCore" },
      { property: "og:description", content: "Khôi phục quyền truy cập tài khoản hội viên GymCore." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [error, setError] = useState<string>();

  return (
    <AuthLayout
      title={sentTo ? "Kiểm tra hộp thư của bạn" : "Quên mật khẩu"}
      description={
        sentTo
          ? "Liên kết đặt lại mật khẩu có hiệu lực trong 30 phút."
          : "Nhập email đã đăng ký, chúng tôi sẽ gửi liên kết đặt lại mật khẩu."
      }
    >
      {sentTo ? (
        <div className="space-y-5">
          <div className="flex gap-3 rounded-lg border border-primary/30 bg-primary/10 p-4 text-sm">
            <MailCheck size={20} className="shrink-0 text-primary" />
            <p>
              Đã gửi hướng dẫn tới <span className="font-semibold">{sentTo}</span>. Nếu không thấy
              email, hãy kiểm tra thư mục Spam.
            </p>
          </div>
          <Button variant="hero" size="lg" className="w-full" asChild>
            <Link to="/reset-password">Mở trang đặt lại mật khẩu (mô phỏng)</Link>
          </Button>
          <Button variant="outline" className="w-full" onClick={() => setSentTo(null)}>
            Gửi lại tới email khác
          </Button>
        </div>
      ) : (
        <form
          className="space-y-5"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            const email = String(new FormData(e.currentTarget).get("email") ?? "").trim();
            if (!/^\S+@\S+\.\S+$/.test(email)) return setError("Vui lòng nhập email hợp lệ.");
            setError(undefined);
            setSentTo(email);
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="hoang@gmail.com" />
            <FieldError msg={error} />
          </div>
          <Button type="submit" variant="hero" size="lg" className="w-full">
            Gửi liên kết đặt lại
          </Button>
        </form>
      )}
      <Link to="/login" className="mt-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft size={14} /> Quay lại đăng nhập
      </Link>
    </AuthLayout>
  );
}
