import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { CPage, Field, Panel, meta } from "@/components/customer/common";
import { FieldError } from "@/components/public/auth-fields";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ME } from "@/lib/mock/customer";

export const Route = createFileRoute("/customer/profile/edit")({
  head: () => meta("Cập nhật hồ sơ", "Chỉnh sửa thông tin cá nhân hội viên."),
  component: EditProfile,
});

function EditProfile() {
  const navigate = useNavigate();
  const [gender, setGender] = useState(ME.gender);
  const [errors, setErrors] = useState<{ fullName?: string; phone?: string; email?: string }>({});
  return (
    <CPage title="Cập nhật hồ sơ" parent={{ label: "Hồ sơ của tôi", to: "/customer/profile" }}>
      <form
        className="space-y-6"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          const f = new FormData(e.currentTarget);
          const next: typeof errors = {};
          if (!String(f.get("fullName")).trim()) next.fullName = "Vui lòng nhập họ và tên.";
          if (!/^0\d{9}$/.test(String(f.get("phone")).replace(/\s/g, ""))) next.phone = "Số điện thoại gồm 10 chữ số.";
          if (!/^\S+@\S+\.\S+$/.test(String(f.get("email")))) next.email = "Email không hợp lệ.";
          setErrors(next);
          if (Object.keys(next).length) return;
          toast.success("Đã lưu thông tin hồ sơ (dữ liệu mẫu).");
          void navigate({ to: "/customer/profile" });
        }}
      >
        <Panel title="Thông tin cá nhân">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Họ và tên"><Input name="fullName" defaultValue={ME.fullName} /><FieldError msg={errors.fullName} /></Field>
            <Field label="Ngày sinh"><Input name="birthday" type="date" defaultValue={ME.birthday} /></Field>
            <Field label="Email"><Input name="email" defaultValue={ME.email} /><FieldError msg={errors.email} /></Field>
            <Field label="Số điện thoại"><Input name="phone" defaultValue={ME.phone} /><FieldError msg={errors.phone} /></Field>
            <Field label="Giới tính">
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{["Nam", "Nữ", "Khác"].map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}</SelectContent>
              </Select>
            </Field>
            <Field label="Liên hệ khẩn cấp"><Input name="emergency" defaultValue={ME.emergencyContact} /></Field>
            <div className="md:col-span-2"><Field label="Địa chỉ"><Input name="address" defaultValue={ME.address} /></Field></div>
          </div>
        </Panel>
        <Panel title="Mục tiêu tập luyện">
          <Field label="Mục tiêu chính" hint="Huấn luyện viên sẽ dựa vào đây để điều chỉnh giáo án.">
            <Textarea name="goal" rows={3} defaultValue={ME.goal} />
          </Field>
        </Panel>
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => void navigate({ to: "/customer/profile" })}>Huỷ</Button>
          <Button type="submit">Lưu thay đổi</Button>
        </div>
      </form>
    </CPage>
  );
}
