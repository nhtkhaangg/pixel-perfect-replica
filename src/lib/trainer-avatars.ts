import dangHoangNam from "@/assets/trainers/dang-hoang-nam.jpg";
import dinhQuangHieu from "@/assets/trainers/dinh-quang-hieu.jpg";
import leHoangYen from "@/assets/trainers/le-hoang-yen.jpg";
import leMaiPhuong from "@/assets/trainers/le-mai-phuong.jpg";
import nguyenMinhDuc from "@/assets/trainers/nguyen-minh-duc.jpg";
import nguyenThaoVy from "@/assets/trainers/nguyen-thao-vy.jpg";
import phamDucLong from "@/assets/trainers/pham-duc-long.jpg";
import phamThuHa from "@/assets/trainers/pham-thu-ha.jpg";
import tranAnhKhoa from "@/assets/trainers/tran-anh-khoa.jpg";
import tranMinhKhang from "@/assets/trainers/tran-minh-khang.jpg";
import voQuocBao from "@/assets/trainers/vo-quoc-bao.jpg";

const TRAINER_AVATARS: Record<string, string> = {
  "Trần Anh Khoa": tranAnhKhoa,
  "Lê Mai Phương": leMaiPhuong,
  "Nguyễn Minh Đức": nguyenMinhDuc,
  "Phạm Thu Hà": phamThuHa,
  "Võ Quốc Bảo": voQuocBao,
  "Đặng Hoàng Nam": dangHoangNam,
  "Trần Minh Khang": tranMinhKhang,
  "Nguyễn Thảo Vy": nguyenThaoVy,
  "Phạm Đức Long": phamDucLong,
  "Lê Hoàng Yến": leHoangYen,
  "Đinh Quang Hiếu": dinhQuangHieu,
};

export function getTrainerAvatar(name: string) {
  return TRAINER_AVATARS[name];
}