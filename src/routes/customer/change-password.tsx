import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { CPage, Field, Panel, meta } from "@/components/customer/common";
import { FieldError, PasswordInput, StrengthMeter } from "@/components/public/auth-fields";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/customer/change-password")({
  head: () => meta("Đổi mật khẩu", "Thay đổi mật khẩu đăng nhập tài khoản hội viên."),
  component: ChangePassword,
});

function ChangePassword() {
  const [cur, setCur] = useState("");
  const [pw, setPw] = useState("");
  const [cf, setCf] = useState("");
  const [err, setErr] = useState<{ cur?: string; pw?: string; cf?: string }>({});
  return (
    <CPage title="Đổi mật khẩu" parent={{ label: "Hồ sơ của tôi", to: "/customer/profile" }}>
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <Panel>
          <form
            className="max-w-lg space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              const n: typeof err = {};
              if (!cur) n.cur = "Vui lòng nhập mật khẩu hiện tại.";
              if (pw.length < 8) n.pw = "Mật khẩu mới cần ít nhất 8 ký tự.";
              else if (pw === cur) n.pw = "Mật khẩu mới phải khác mật khẩu hiện tại.";
              if (cf !== pw || !cf) n.cf = "Mật khẩu xác nhận không khớp.";
              setErr(n);
              if (Object.keys(n).length) return;
              setCur(""); setPw(""); setCf("");
              toast.success("Đổi mật khẩu thành công (dữ liệu mẫu).");
            }}
          >
            <Field label="Mật khẩu hiện tại"><PasswordInput id="cur" value={cur} onChange={setCur} placeholder="Nhập mật khẩu hiện tại" /><FieldError msg={err.cur} /></Field>
            <Field label="Mật khẩu mới"><PasswordInput id="pw" value={pw} onChange={setPw} placeholder="Tối thiểu 8 ký tự" /><StrengthMeter password={pw} /><FieldError msg={err.pw} /></Field>
            <Field label="Xác nhận mật khẩu mới"><PasswordInput id="cf" value={cf} onChange={setCf} placeholder="Nhập lại mật khẩu mới" /><FieldError msg={err.cf} /></Field>
            <Button type="submit">Cập nhật mật khẩu</Button>
          </form>
        </Panel>
        <Panel title="Mẹo bảo mật">
          <ul className="space-y-3 text-sm text-muted-foreground">
            {["Dùng ít nhất 8 ký tự gồm chữ hoa, chữ thường, số và ký tự đặc biệt.", "Không dùng lại mật khẩu của tài khoản khác.", "Không chia sẻ mật khẩu cho nhân viên hoặc huấn luyện viên."].map((t) => (
              <li key={t} className="flex gap-2"><ShieldCheck size={16} className="mt-0.5 shrink-0 text-primary" />{t}</li>
            ))}
          </ul>
        </Panel>
      </div>
    </CPage>
  );
}
