import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function GoogleButton({ label }: { label: string }) {
  return (
    <Button
      type="button"
      variant="outline"
      className="w-full gap-2.5"
      onClick={() => toast.info("Chức năng Google sẽ được kết nối ở giai đoạn sau (dữ liệu mẫu).")}
    >
      <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
        <path fill="currentColor" d="M21.35 11.1H12v2.98h5.35c-.23 1.4-1.66 4.1-5.35 4.1-3.22 0-5.85-2.67-5.85-5.96S8.78 6.26 12 6.26c1.83 0 3.06.78 3.76 1.45l2.56-2.47C16.68 3.7 14.54 2.75 12 2.75 6.9 2.75 2.75 6.9 2.75 12S6.9 21.25 12 21.25c5.34 0 8.88-3.75 8.88-9.04 0-.6-.07-1.07-.16-1.53z" />
      </svg>
      {label}
    </Button>
  );
}

export function OrDivider() {
  return (
    <div className="flex items-center gap-3 text-xs text-muted-foreground">
      <span className="h-px flex-1 bg-border" />
      HOẶC
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}

export function PasswordInput({
  id,
  value,
  onChange,
  placeholder,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <Input
        id={id}
        name={id}
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pr-10"
      />
      <button
        type="button"
        onClick={() => setShow((v) => !v)}
        aria-label={show ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
        className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-muted-foreground hover:text-foreground"
      >
        {show ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  );
}

export function passwordStrength(value: string) {
  let level = 0;
  if (value.length >= 8) level++;
  if (/[A-Z]/.test(value) && /[a-z]/.test(value)) level++;
  if (/\d/.test(value)) level++;
  if (/[^\w\s]/.test(value)) level++;
  const labels = ["Rất yếu", "Yếu", "Trung bình", "Khá", "Mạnh"];
  return { level, label: labels[level] ?? "Rất yếu" };
}

export function StrengthMeter({ password }: { password: string }) {
  if (!password) return null;
  const s = passwordStrength(password);
  const color = s.level <= 1 ? "bg-destructive" : s.level <= 2 ? "bg-warning" : "bg-primary";
  return (
    <div className="space-y-1.5">
      <div className="flex gap-1.5">
        {[1, 2, 3, 4].map((i) => (
          <span key={i} className={cn("h-1 flex-1 rounded-full", s.level >= i ? color : "bg-muted")} />
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        Độ mạnh mật khẩu: <span className="text-foreground">{s.label}</span> · Nên có chữ hoa, chữ
        thường, số và ký tự đặc biệt.
      </p>
    </div>
  );
}

export function FieldError({ msg }: { msg?: string | undefined }) {
  return msg ? <p className="text-xs text-destructive">{msg}</p> : null;
}
