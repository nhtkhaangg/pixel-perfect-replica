import { Link } from "@tanstack/react-router";
import type { ComponentProps, ComponentType, ReactNode } from "react";

type LooseLinkProps = Omit<ComponentProps<typeof Link>, "to"> & {
  to: string;
  children?: ReactNode;
};

/**
 * Link dùng cho danh sách điều hướng động (cấu hình theo vai trò).
 * Cho phép truyền đường dẫn dạng string; đường dẫn chưa có trang sẽ hiển thị
 * trạng thái "Không tìm thấy trang".
 */
export const AppLink = Link as unknown as ComponentType<LooseLinkProps>;
