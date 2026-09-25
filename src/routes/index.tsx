import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Activity,
  Award,
  Bell,
  Bot,
  Brain,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Dumbbell,
  Flame,
  HeartPulse,
  Mail,
  MapPin,
  MessageSquare,
  Navigation,
  Phone,
  Search,
  Send,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  TrendingUp,
  Wifi,
  Wind,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

import gymInterior from "@/assets/gym-interior.jpg";
import heroImage from "@/assets/hero-gym.jpg";
import training from "@/assets/training.jpg";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { BookingTrialModal } from "@/components/public/BookingTrialModal";
import { CoachDetailDrawer } from "@/components/public/CoachDetailDrawer";
import { ReviewModal } from "@/components/public/ReviewModal";
import { ZoneDetailDrawer, type ZoneItem } from "@/components/public/ZoneDetailDrawer";
import { Button } from "@/components/ui/button";
import {
  ARTICLES,
  FACILITIES,
  GYM_INFO,
  PACKAGES,
  REVIEWS,
  TRAINERS,
  type Review,
  type Trainer,
} from "@/lib/mock/public";
import { getTrainerAvatar } from "@/lib/trainer-avatars";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "OmniGym Fitness & Yoga Center — Nâng tầm thể lực tại TP. Cần Thơ" },
      {
        name: "description",
        content:
          "Trung tâm thể thao & yoga đẳng cấp 2,500m² tại Cần Thơ. Đội ngũ Master PT, InBody 770 y khoa, xông hơi đá muối Himalaya.",
      },
      { property: "og:title", content: "OmniGym Fitness & Yoga Center" },
      {
        property: "og:description",
        content: "Nâng tầm thể lực - Bứt phá mọi giới hạn. Đăng ký tập thử miễn phí ngay hôm nay!",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

// Mock QR Code SVG Component matching OmniGym exactly with centered lightning brand logo
const MockQRCode = () => (
  <div className="relative inline-block rounded-2xl bg-white p-3 shadow-inner">
    <svg className="h-36 w-36" viewBox="0 0 100 100">
      {/* Outer corner finders */}
      <rect x="2" y="2" width="22" height="22" fill="none" stroke="black" strokeWidth="3" />
      <rect x="6" y="6" width="14" height="14" fill="black" />

      <rect x="76" y="2" width="22" height="22" fill="none" stroke="black" strokeWidth="3" />
      <rect x="80" y="6" width="14" height="14" fill="black" />

      <rect x="2" y="76" width="22" height="22" fill="none" stroke="black" strokeWidth="3" />
      <rect x="6" y="80" width="14" height="14" fill="black" />

      {/* QR code mock pixel layout pattern */}
      <rect x="30" y="2" width="4" height="4" fill="black" />
      <rect x="38" y="2" width="8" height="4" fill="black" />
      <rect x="50" y="6" width="4" height="4" fill="black" />
      <rect x="58" y="2" width="12" height="4" fill="black" />
      <rect x="30" y="10" width="12" height="4" fill="black" />
      <rect x="46" y="14" width="8" height="4" fill="black" />
      <rect x="58" y="10" width="4" height="12" fill="black" />

      <rect x="2" y="30" width="4" height="8" fill="black" />
      <rect x="10" y="38" width="8" height="4" fill="black" />
      <rect x="30" y="30" width="16" height="12" fill="black" />
      <rect x="50" y="30" width="4" height="4" fill="black" />
      <rect x="58" y="30" width="12" height="4" fill="black" />
      <rect x="74" y="30" width="4" height="12" fill="black" />

      <rect x="30" y="50" width="8" height="4" fill="black" />
      <rect x="42" y="58" width="12" height="12" fill="black" />
      <rect x="58" y="50" width="4" height="8" fill="black" />
      <rect x="74" y="50" width="4" height="4" fill="black" />

      <rect x="30" y="76" width="8" height="8" fill="black" />
      <rect x="42" y="76" width="4" height="12" fill="black" />
      <rect x="50" y="84" width="20" height="4" fill="black" />
      <rect x="76" y="76" width="4" height="4" fill="black" />
      <rect x="84" y="80" width="12" height="8" fill="black" />
      <rect x="80" y="92" width="8" height="4" fill="black" />

      {/* Central Brand Badge */}
      <rect x="38" y="38" width="24" height="24" rx="5" fill="white" stroke="#10B981" strokeWidth="2" />
      <path d="M50 42 L43 51 L48 51 L47 58 L57 49 L52 49 Z" fill="#10B981" />
    </svg>
  </div>
);

const DETAILED_ZONES: ZoneItem[] = [
  {
    id: "z1",
    key: "weights",
    name: "Khu tạ tự do (Free Weights Olympic)",
    floor: "Tầng 1",
    area: "800 m²",
    image: heroImage,
    description: "Không gian tạ tự do chuẩn thi đấu với 8 dàn Squat rack Rogue, sàn nâng tạ chuyên dụng chống rung chấn, tạ đơn Dumbbell từ 2.5kg đến 50kg đáp ứng mọi cấp độ.",
    highlights: ["8 giàn Squat Rack & Power Cage Rogue", "Thanh đòn tạ chuẩn Olympic IWF", "Sàn cao su nguyên khối giảm chấn cách âm", "Gương soi toàn thân chiếu sáng góc xiên"],
    equipments: ["Rogue Power Racks", "Olympic Barbells", "Eleiko Bumper Plates", "Dumbbells 2.5kg - 50kg", "Incline / Flat Olympic Benches"],
  },
  {
    id: "z2",
    key: "cardio",
    name: "Cardio View Panorama",
    floor: "Tầng 2",
    area: "600 m²",
    image: gymInterior,
    description: "Hơn 40 máy chạy bộ Technogym Skillrun, máy leo cầu thang StairMaster và xe đạp thông minh đồng bộ màn hình cảm ứng giải trí 4K kết nối tai nghe Bluetooth.",
    highlights: ["Màn hình xem Netflix & YouTube khi tập", "Cảm biến đo nhịp tim quang học chuẩn xác", "Hệ thống lọc khí ion âm cấp ẩm chống khô họng", "View kính panorama ngắm toàn cảnh đại lộ 3/2"],
    equipments: ["Technogym Skillrun Treadmills", "StairMaster 10G Gauntlet", "Concept2 RowErg", "Assault AirBike Pro", "Technogym Ellipticals"],
  },
  {
    id: "z3",
    key: "studio",
    name: "Yoga & Pilates Studio",
    floor: "Tầng 3",
    area: "400 m²",
    image: training,
    description: "Phòng tập yên tĩnh lót sàn gỗ sồi tự nhiên, ánh sáng dịu ấm kết hợp khuếch tán tinh dầu sả chanh nguyên chất giúp thanh lọc tâm trí và tăng độ dẻo dai toàn diện.",
    highlights: ["Thảm tập cao cấp Lululemon & Manduka", "Bóng định hình tư thế & gạch tập yoga xốp EVA", "Khung tập Aerial Yoga bay trên không", "Hệ thống cách âm chuẩn phòng thu âm thanh"],
    equipments: ["Reformer Pilates Machines", "Aerial Hammocks", "Manduka Pro Mats", "Yoga Bolsters & Blocks", "Sound Healing Tibetan Bowls"],
  },
  {
    id: "z4",
    key: "sauna",
    name: "Xông hơi Đá muối Himalaya & Spa",
    floor: "Tầng 1",
    area: "350 m²",
    image: gymInterior,
    description: "Tổ hợp xông hơi khô đá muối khoáng Himalaya nhập khẩu từ Pakistan kết hợp xông ướt thảo dược tự nhiên giúp bài tiết độc tố, giãn nở mạch máu và giảm đau nhức cơ sau tập.",
    highlights: ["Tấm ốp đá muối Himalaya phát xạ ion âm", "Xông hơi thảo dược gừng, sả và bạc hà tươi", "Bể sục ngâm lạnh 12°C phục hồi cơ tức thì", "Tủ locker thông minh khóa FaceID an toàn"],
    equipments: ["Himalayan Salt Sauna Room", "Herbal Steam Generator", "Cold Plunge Tub (12°C)", "Warm Hydrotherapy Jacuzzi", "Smart FaceID Lockers"],
  },
  {
    id: "z5",
    key: "ai-lab",
    name: "InBody 770 & AI Smart Lab",
    floor: "Tầng 1",
    area: "150 m²",
    image: heroImage,
    description: "Khu vực kiểm tra và phân tích thể trạng y khoa hàng đầu với máy đo InBody 770 cao cấp, máy quét tư thế 3D phát hiện lệch vẹo cột sống và trợ lý Omni AI gợi ý giáo án.",
    highlights: ["Đo lượng cơ mỡ từng phân đoạn tay/chân/thân", "Phát hiện mỡ nội tạng và tình trạng giữ nước", "Quét 3D lệch vẹo vai, gù lưng, nghiêng xương chậu", "In kết quả màu chi tiết và lưu trực tiếp lên tài khoản"],
    equipments: ["InBody 770 Medical Body Analyzer", "Posture 3D Body Scanner", "Omni AI Smart Screen", "Digital Grip Dynamometer"],
  },
  {
    id: "z6",
    key: "lounge",
    name: "Omni Lounge & Protein Bar",
    floor: "Tầng 1",
    area: "200 m²",
    image: training,
    description: "Khu vực thư giãn sau buổi tập với quầy pha chế sinh tố Whey Protein, nước ép hoa quả tươi và nước ion kiềm miễn phí. Bàn làm việc kết nối wifi tốc độ cao 500Mbps.",
    highlights: ["Nước lọc ion kiềm tinh khiết miễn phí", "Menu hơn 15 món Whey Protein Shake ngon miệng", "Bàn làm việc yên tĩnh có ổ sạc điện thoại nhanh", "Wifi cáp quang 500Mbps phủ sóng toàn diện"],
    equipments: ["Commercial Blendtec Blenders", "Alkaline Water Dispensers", "Optimum Nutrition Whey Bar", "High-speed Mesh Wifi Hubs"],
  },
];

export function HomePage() {
  const [selectedZone, setSelectedZone] = useState<ZoneItem | null>(null);
  const [selectedCoach, setSelectedCoach] = useState<Trainer | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [bookingCoachName, setBookingCoachName] = useState<string | undefined>(undefined);

  // Filter state for Zones
  const [zoneFilter, setZoneFilter] = useState("all");
  // Filter state for Coaches
  const [coachFilter, setCoachFilter] = useState("all");
  const [coachSearch, setCoachSearch] = useState("");
  // Package toggle (MEMBERSHIP vs PT)
  const [packageType, setPackageType] = useState<"MEMBERSHIP" | "PT">("MEMBERSHIP");

  // Reviews state
  const [reviewsList, setReviewsList] = useState<Review[]>(REVIEWS);

  // AI interactive prompt simulation
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Filtered zones
  const displayedZones = DETAILED_ZONES.filter(
    (z) => zoneFilter === "all" || z.key === zoneFilter
  );

  // Filtered coaches
  const displayedCoaches = TRAINERS.filter((coach) => {
    const matchSearch =
      coach.name.toLowerCase().includes(coachSearch.toLowerCase()) ||
      coach.specialty.toLowerCase().includes(coachSearch.toLowerCase());
    const matchTag =
      coachFilter === "all" ||
      coach.tags.some((t) => t.toLowerCase().includes(coachFilter.toLowerCase()));
    return matchSearch && matchTag;
  });

  const handleOpenBookingWithCoach = (coachName?: string) => {
    setBookingCoachName(coachName);
    setIsBookingOpen(true);
  };

  const handleAddReview = (newRev: {
    name: string;
    rating: number;
    comment: string;
    serviceTag: string;
  }) => {
    const revObj: Review = {
      id: "r-" + Date.now(),
      name: newRev.name,
      memberFor: "Hội viên mới",
      rating: newRev.rating,
      date: new Date().toISOString().split("T")[0] ?? "",
      topic: newRev.serviceTag,
      content: newRev.comment,
    };
    setReviewsList([revObj, ...reviewsList]);
    toast.success("Cảm ơn bạn đã gửi đánh giá cho OmniGym!");
  };

  const handleAskAi = (promptText: string) => {
    setAiPrompt(promptText);
    setIsAiLoading(true);
    setAiAnswer(null);
    setTimeout(() => {
      setIsAiLoading(false);
      if (promptText.includes("tăng cơ")) {
        setAiAnswer(
          "💪 Lịch tập gợi ý 4 buổi/tuần: Buổi 1 (Ngực & Tay sau), Buổi 2 (Lưng & Tay trước), Buổi 3 (Nghỉ/Cardio nhẹ), Buổi 4 (Chân & Mông), Buổi 5 (Vai & Cơ bụng). Hãy đảm bảo nạp từ 1.8g - 2.2g Protein/kg trọng lượng cơ thể mỗi ngày và ngủ đủ 7-8 tiếng để tối ưu tổng hợp cơ bắp."
        );
      } else if (promptText.includes("giảm mỡ") || promptText.includes("calo")) {
        setAiAnswer(
          "🔥 Chiến lược giảm mỡ khoa học: Tạo thâm hụt calo vừa phải (300-500 kcal/ngày). Kết hợp 3 buổi tập tạ kháng lực để giữ khối cơ nạc và 2 buổi HIIT 20 phút. Uống đủ 2.5 - 3 lít nước ion kiềm mỗi ngày để kích thích trao đổi chất."
        );
      } else {
        setAiAnswer(
          "📊 Đánh giá chỉ số InBody: Hãy đặt lịch đo InBody 770 miễn phí tại quầy OmniGym. Đội ngũ Master PT sẽ quét chỉ số tỷ lệ mỡ nội tạng, khối lượng cơ từng phân đoạn và đưa ra phác đồ dinh dưỡng chuẩn Macro cho bạn."
        );
      }
    }, 800);
  };

  return (
    <PublicLayout onOpenBooking={() => handleOpenBookingWithCoach()}>
      {/* 1. HERO BANNER SECTION (Matches GymHeroBanner.tsx exactly) */}
      <section id="top" className="relative overflow-hidden border-b border-[#17223b] bg-gradient-to-b from-[#0e1628] via-[#0b101d] to-[#070b13] px-4 py-8 sm:px-6 lg:py-14">
        {/* Background Ambient Glows */}
        <div className="pointer-events-none absolute -top-20 -right-20 h-96 w-96 rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-3xl space-y-4">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-3 py-1 text-[11px] font-black tracking-wider text-emerald-400 uppercase">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {GYM_INFO.status} • {GYM_INFO.hoursText}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/15 px-3 py-1 text-[11px] font-black tracking-wider text-amber-400 uppercase">
                  <Star className="h-3 w-3 fill-amber-400 stroke-none" /> 4.9 (500+ Đánh giá thực tế)
                </span>
                <span className="rounded-full border border-zinc-700 bg-zinc-800/80 px-3 py-1 text-[11px] font-bold tracking-wider text-zinc-300 uppercase">
                  2,500 m² Olympic Hub
                </span>
              </div>

              {/* Title & Slogan */}
              <div>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl overflow-hidden bg-black shadow-lg shadow-emerald-500/25 border border-emerald-500/40 shrink-0 flex items-center justify-center">
                    <img src="/logo.png" alt="OmniGym Logo" className="w-full h-full object-cover" />
                  </div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                    {GYM_INFO.name}
                  </h1>
                </div>
                <p className="mt-2 text-sm sm:text-base font-bold text-emerald-400 tracking-wide flex items-center gap-1.5">
                  ✦ {GYM_INFO.slogan}
                </p>
              </div>

              {/* Address & Hotline */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-y-2 gap-x-6 text-xs text-zinc-400 pt-1">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                    GYM_INFO.address
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-emerald-400 transition-colors group"
                >
                  <MapPin className="h-4 w-4 text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="underline-offset-2 group-hover:underline">{GYM_INFO.address}</span>
                </a>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>
                    Hotline: <strong className="text-white font-mono">{GYM_INFO.hotline}</strong>
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-3">
                <button
                  onClick={() => handleOpenBookingWithCoach()}
                  className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-black text-xs sm:text-sm tracking-wide shadow-xl shadow-emerald-500/25 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="h-4 w-4" />
                  ĐĂNG KÝ TẬP THỬ MIỄN PHÍ
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById("packages-section");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-5 py-3 rounded-xl border border-zinc-700 bg-[#0d1527] hover:border-emerald-500/40 hover:bg-[#111c34] text-white font-bold text-xs sm:text-sm transition-all cursor-pointer"
                >
                  Xem Bảng Giá Gói Tập
                </button>
                <button
                  onClick={() => setIsReviewOpen(true)}
                  className="px-4 py-3 rounded-xl border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Star className="h-4 w-4 fill-amber-400 stroke-none" />
                  Gửi Đánh Giá
                </button>
              </div>
            </div>

            {/* Right Live Occupancy Card */}
            <div className="w-full lg:w-80 rounded-2xl border border-[#1a2438] bg-[#0d1527]/90 p-5 backdrop-blur-md space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
                <span className="text-[11px] font-black uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                  <Activity className="h-3.5 w-3.5 text-emerald-400" /> Trạng thái phòng tập
                </span>
                <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-black text-emerald-400 uppercase">
                  Trực tiếp
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-400">Mật độ hiện tại:</span>
                  <span className="font-mono font-bold text-emerald-400">86 / 350 người (24%)</span>
                </div>
                {/* Progress bar */}
                <div className="h-2 w-full rounded-full bg-zinc-800 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 w-[24%]" />
                </div>
                <p className="text-[10px] text-zinc-500">Phòng tập thoáng mát, các máy tạ và cardio đều sẵn sàng.</p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-zinc-800/80 text-xs">
                <div className="rounded-xl border border-zinc-800 bg-[#070b13] p-2.5">
                  <span className="text-[10px] text-zinc-500 block">Nhiệt độ sàn:</span>
                  <span className="font-bold text-white flex items-center gap-1 mt-0.5">
                    <Flame className="h-3 w-3 text-cyan-400" /> 22°C Khí tươi
                  </span>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-[#070b13] p-2.5">
                  <span className="text-[10px] text-zinc-500 block">Giờ mở cửa:</span>
                  <span className="font-bold text-emerald-400 flex items-center gap-1 mt-0.5">
                    <Clock className="h-3 w-3" /> 05:30 - 22:00
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DIGITAL PASS / CHECK-IN ID & LIVE CENTER STATS (Exact OmniGym Dashboard Section) */}
      <section className="px-4 py-8 sm:px-6 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: CHECK-IN ID CARD */}
          <div className="relative overflow-hidden rounded-2xl border border-[#1a2438] bg-[#0d1527] p-6 flex flex-col justify-between items-center text-center space-y-4 shadow-xl">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none select-none">
              <Zap className="h-32 w-32 fill-emerald-500 stroke-none" />
            </div>

            <div className="w-full flex justify-between items-center text-zinc-400 text-[11px] font-extrabold uppercase tracking-widest px-2">
              <span className="flex items-center gap-1 text-zinc-300">
                <Smartphone className="h-3.5 w-3.5 text-emerald-400" /> Digital Check-in Pass
              </span>
              <Wifi className="h-4 w-4 text-emerald-400" />
            </div>

            <div className="my-auto py-2">
              <MockQRCode />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-black text-white tracking-widest font-mono">D0492-9182</h3>
              <p className="text-[11px] text-emerald-400 font-semibold tracking-wide">
                Quét mã tại quầy lễ tân để tự động mở cổng Turnstile
              </p>
            </div>
          </div>

          {/* Right Columns: GYM CENTER INFO & AMENITIES OVERVIEW */}
          <div className="lg:col-span-2 rounded-2xl border border-[#1a2438] bg-[#0d1527] p-6 flex flex-col justify-between space-y-5 shadow-xl">
            <div className="flex justify-between items-center border-b border-zinc-800/80 pb-4">
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base text-white tracking-wide uppercase">
                  Trung tâm OmniGym Cần Thơ
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Chuẩn 5 sao
                </span>
              </div>
              <button
                onClick={() => {
                  const el = document.getElementById("zones-section");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500 hover:text-zinc-950 text-emerald-400 border border-emerald-500/20 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
              >
                <span>Khám phá 6 khu vực</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="flex gap-3 items-start">
                  <div className="p-3 rounded-2xl bg-[#070b13] border border-zinc-800 text-emerald-400 shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-black text-base text-white hover:text-emerald-400 transition-colors">
                      {GYM_INFO.name}
                    </h4>
                    <p className="text-xs text-zinc-400 mt-0.5">{GYM_INFO.address}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase border bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                    <Zap className="h-3 w-3 fill-current" /> {GYM_INFO.status}
                  </span>
                  <span className="text-xs font-black text-amber-400 flex items-center gap-1 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                    <Star className="h-3 w-3 fill-amber-400 stroke-none" /> 4.9/5
                  </span>
                </div>
              </div>

              {/* 3 Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 bg-[#070b13] border border-zinc-800 rounded-xl space-y-1">
                  <span className="text-[10px] text-zinc-500 font-bold uppercase">Giờ mở cửa:</span>
                  <p className="font-mono font-bold text-xs text-white flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-emerald-400" /> {GYM_INFO.hoursText}
                  </p>
                </div>

                <div className="p-3.5 bg-[#070b13] border border-zinc-800 rounded-xl space-y-1">
                  <span className="text-[10px] text-zinc-500 font-bold uppercase">Mật độ tập luyện:</span>
                  <p className="font-mono font-bold text-xs text-emerald-400">
                    86 / 350 người (24% công suất)
                  </p>
                </div>

                <div className="p-3.5 bg-[#070b13] border border-zinc-800 rounded-xl space-y-1">
                  <span className="text-[10px] text-zinc-500 font-bold uppercase">Diện tích sàn:</span>
                  <p className="font-bold text-xs text-white">2,500 m² Olympic Hub</p>
                </div>
              </div>
            </div>

            {/* Amenities Chips */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-800/60">
              {[
                "Xông hơi đá muối Himalaya",
                "Khăn tập mềm khử khuẩn miễn phí",
                "Protein Shake Bar",
                "Máy đo InBody 770 Test y khoa",
                "Bãi đỗ ô tô & xe máy 24/7",
                "Wifi tốc độ cao 500Mbps",
                "Tủ Locker thông minh FaceID",
              ].map((item, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-[#070b13] border border-zinc-800 rounded-lg text-[11px] text-zinc-300 flex items-center gap-1.5 font-medium"
                >
                  <Sparkles className="h-3 w-3 text-emerald-400" /> {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. WORKOUT ZONES SECTION (Khu Vực Tập Luyện Chuyên Sâu) */}
      <section id="zones-section" className="border-t border-[#17223b] bg-[#060913]/60 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-emerald-400">
                Cơ sở vật chất 5 sao
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                Khu Vực Tập Luyện Chuyên Sâu
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl">
                Không gian thiết kế theo phân khu chức năng đạt chuẩn Olympic, trang bị 100% máy nhập khẩu chính hãng.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: "all", label: "Tất cả" },
                { id: "weights", label: "Tạ tự do" },
                { id: "cardio", label: "Cardio Panorama" },
                { id: "studio", label: "Yoga & Pilates" },
                { id: "sauna", label: "Xông hơi & Spa" },
                { id: "ai-lab", label: "InBody & AI" },
                { id: "lounge", label: "Lounge Bar" },
              ].map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => setZoneFilter(pill.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    zoneFilter === pill.id
                      ? "bg-emerald-500 text-zinc-950 font-black shadow-md shadow-emerald-500/20"
                      : "bg-[#0d1527] text-zinc-400 hover:text-white border border-[#1a2438]"
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>

          {/* Zones Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedZones.map((zone) => (
              <div
                key={zone.id}
                onClick={() => setSelectedZone(zone)}
                className="group relative rounded-2xl overflow-hidden border border-[#1a2438] bg-[#0d1527] hover:border-emerald-500/40 transition-all duration-300 flex flex-col cursor-pointer shadow-lg hover:shadow-emerald-500/10"
              >
                <div className="relative h-48 overflow-hidden bg-zinc-900">
                  <img
                    src={zone.image}
                    alt={zone.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1527] via-black/30 to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-black/70 backdrop-blur-md text-emerald-400 border border-emerald-500/30">
                    {zone.floor} • {zone.area}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-extrabold text-base text-white group-hover:text-emerald-400 transition-colors">
                      {zone.name}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                      {zone.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                    <span className="text-zinc-500 text-[11px] font-semibold">
                      {zone.equipments?.length || 4}+ thiết bị chính
                    </span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Xem chi tiết <ChevronRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. MEET THE TRAINERS (Gặp Gỡ Huấn Luyện Viên - Matches huan-luyen-vien/page.tsx) */}
      <section id="trainers-section" className="border-t border-[#17223b] px-4 py-16 sm:px-6 mx-auto max-w-7xl">
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-emerald-400">
                Đội ngũ chuyên môn
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                Gặp Gỡ Huấn Luyện Viên (Master PT)
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl">
                Đạt chứng chỉ quốc tế NASM, ACE, IFBB với phương pháp kèm 1-1 tận tâm, theo sát từng bữa ăn và kỹ thuật.
              </p>
            </div>

            {/* Filter and Search */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm tên HLV..."
                  value={coachSearch}
                  onChange={(e) => setCoachSearch(e.target.value)}
                  className="pl-8 pr-3 py-1.5 bg-[#0d1527] border border-[#1a2438] rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 w-44"
                />
                <Search className="h-3.5 w-3.5 text-zinc-400 absolute left-2.5 top-2.5" />
              </div>

              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: "all", label: "Tất cả" },
                  { id: "tăng cơ", label: "Tăng cơ" },
                  { id: "yoga", label: "Yoga" },
                  { id: "giảm mỡ", label: "Giảm mỡ" },
                  { id: "phục hồi", label: "Phục hồi" },
                ].map((pill) => (
                  <button
                    key={pill.id}
                    onClick={() => setCoachFilter(pill.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      coachFilter === pill.id
                        ? "bg-emerald-500 text-zinc-950 font-black shadow-md shadow-emerald-500/20"
                        : "bg-[#0d1527] text-zinc-400 hover:text-white border border-[#1a2438]"
                    }`}
                  >
                    {pill.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Coach Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedCoaches.map((coach) => {
              const avatarImg = getTrainerAvatar(coach.name);
              const initials = coach.avatarInitials || coach.name.slice(0, 2).toUpperCase();

              return (
                <div
                  key={coach.id}
                  className="group relative rounded-2xl overflow-hidden border border-[#1a2438] bg-[#0d1527] hover:border-emerald-500/40 transition-all duration-300 p-5 flex flex-col justify-between shadow-xl"
                >
                  <div className="space-y-4">
                    {/* Avatar Top Banner */}
                    <div className="relative h-44 rounded-xl overflow-hidden bg-gradient-to-tr from-[#070b13] to-[#121c33] flex items-center justify-center border border-zinc-800/40">
                      {avatarImg ? (
                        <img
                          src={avatarImg}
                          alt={coach.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div
                          className={`w-20 h-20 rounded-full bg-gradient-to-tr ${
                            coach.avatarBg || "from-amber-500/20 to-orange-600/30"
                          } flex items-center justify-center text-white text-2xl font-black shadow-lg`}
                        >
                          {initials}
                        </div>
                      )}

                      {/* Rating pill */}
                      <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/70 backdrop-blur-md rounded-full text-[10px] font-black text-amber-400 flex items-center gap-1 border border-zinc-800/60">
                        <Star className="h-3 w-3 fill-amber-400 stroke-none" /> {coach.rating.toFixed(1)} ({coach.reviewCount})
                      </div>

                      {/* Years Exp pill */}
                      <span className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/70 backdrop-blur-md rounded-full text-[10px] font-bold text-zinc-300 border border-zinc-800/60">
                        {coach.experienceYears} năm kinh nghiệm
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <h3 className="font-black text-base text-white group-hover:text-emerald-400 transition-colors">
                          {coach.name}
                        </h3>
                        <span className="text-[10px] font-black text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                          {coach.specialty.split("•")[0]}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">
                        {coach.bio}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {coach.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-[#070b13] border border-zinc-800 text-[10px] font-semibold text-zinc-300 rounded-md"
                        >
                          ✦ {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="pt-4 mt-4 border-t border-zinc-800/80 flex items-center gap-2">
                    <button
                      onClick={() => handleOpenBookingWithCoach(coach.name)}
                      className="flex-1 py-2.5 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-zinc-950 font-bold text-xs rounded-xl border border-emerald-500/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Calendar className="h-3.5 w-3.5" /> Đặt lịch PT
                    </button>
                    <button
                      onClick={() => setSelectedCoach(coach)}
                      className="p-2.5 bg-[#070b13] hover:bg-zinc-800 text-zinc-300 hover:text-white rounded-xl border border-zinc-800 transition-colors cursor-pointer"
                      title="Xem hồ sơ & chứng chỉ"
                    >
                      <Award className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. MEMBERSHIP PACKAGES SECTION (Bảng Giá Thẻ & Gói PT) */}
      <section id="packages-section" className="border-t border-[#17223b] bg-[#060913]/70 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-emerald-400">
                Gói tập linh hoạt
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                Bảng Giá Thẻ Hội Viên & Gói PT
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl">
                Minh bạch không phụ phí ẩn. Tặng kèm buổi đo InBody 770 và định hướng giáo án ban đầu cho mọi gói tập.
              </p>
            </div>

            {/* Toggle Gói Hội Viên vs PT */}
            <div className="inline-flex rounded-2xl border border-[#1a2438] bg-[#0d1527] p-1">
              <button
                onClick={() => setPackageType("MEMBERSHIP")}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  packageType === "MEMBERSHIP"
                    ? "bg-emerald-500 text-zinc-950 shadow-md shadow-emerald-500/20"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Gói Hội Viên Thường
              </button>
              <button
                onClick={() => setPackageType("PT")}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  packageType === "PT"
                    ? "bg-emerald-500 text-zinc-950 shadow-md shadow-emerald-500/20"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Gói Huấn Luyện Viên (PT 1-1)
              </button>
            </div>
          </div>

          {/* Packages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PACKAGES.filter((p) => p.category === packageType).map((pkg) => (
              <div
                key={pkg.id}
                className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-xl ${
                  pkg.highlighted
                    ? "border-2 border-emerald-500/60 bg-gradient-to-b from-[#111f38] via-[#0d1527] to-[#070b13] shadow-emerald-500/15"
                    : "border border-[#1a2438] bg-[#0d1527]"
                }`}
              >
                {pkg.highlighted && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-emerald-500 text-zinc-950 font-black text-[10px] tracking-wider uppercase shadow-md shadow-emerald-500/30">
                    ★ ĐƯỢC CHỌN NHIỀU NHẤT
                  </span>
                )}

                <div className="space-y-4">
                  <div>
                    <h3 className="font-black text-xl text-white">{pkg.name}</h3>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{pkg.summary}</p>
                  </div>

                  <div className="py-2 border-y border-zinc-800/80">
                    <span className="text-3xl font-black text-white font-mono">
                      {pkg.price.toLocaleString("vi-VN")}
                    </span>
                    <span className="text-xs text-zinc-400 ml-1.5">VNĐ / {pkg.durationLabel}</span>
                  </div>

                  <div className="space-y-2.5">
                    <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                      Đặc quyền bao gồm:
                    </span>
                    {pkg.benefits.map((b, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-zinc-200">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-zinc-800/80">
                  <button
                    onClick={() => handleOpenBookingWithCoach()}
                    className={`w-full py-3 rounded-xl font-black text-xs tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      pkg.highlighted
                        ? "bg-emerald-500 hover:bg-emerald-400 text-zinc-950 shadow-lg shadow-emerald-500/25"
                        : "border border-zinc-700 bg-[#070b13] hover:border-emerald-500/50 hover:bg-[#10192e] text-white"
                    }`}
                  >
                    ĐĂNG KÝ GÓI TẬP NÀY
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. OMNI AI ASSISTANT INTERACTIVE PREVIEW (Matches tro-ly-ai) */}
      <section id="ai-section" className="border-t border-[#17223b] px-4 py-16 sm:px-6 mx-auto max-w-7xl">
        <div className="relative rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-[#0d162c] via-[#09101f] to-[#070b13] p-6 sm:p-10 shadow-2xl overflow-hidden">
          <div className="pointer-events-none absolute -right-10 -bottom-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                <Bot className="h-3.5 w-3.5" /> Độc quyền tại OmniGym
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
                Trợ Lý Thông Minh <br />
                <span className="text-emerald-400">Omni AI Assistant</span>
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Tích hợp AI phân tích thể trạng từ dữ liệu InBody 770. Gợi ý giáo án tập luyện chuẩn khoa học, tính lượng calo Macro từng bữa ăn và giải đáp thắc mắc kỹ thuật tức thì.
              </p>

              {/* Sample Prompts */}
              <div className="space-y-2 pt-2">
                <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                  Bấm để thử nghiệm câu hỏi mẫu:
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Gợi ý lịch tập tăng cơ 4 ngày/tuần",
                    "Tính calo cần thiết để giảm mỡ an toàn",
                    "Cách đọc chỉ số phân tích cơ mỡ InBody",
                  ].map((p, i) => (
                    <button
                      key={i}
                      onClick={() => handleAskAi(p)}
                      className="px-3 py-1.5 bg-[#070b13] border border-zinc-750 hover:border-emerald-500/50 hover:text-emerald-400 text-xs text-zinc-300 rounded-xl transition-all cursor-pointer text-left"
                    >
                      💬 {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Interactive Chat Simulator */}
            <div className="rounded-2xl border border-[#1a2438] bg-[#070b13] p-5 space-y-4 shadow-xl">
              <div className="flex items-center gap-3 border-b border-zinc-800 pb-3">
                <div className="h-9 w-9 rounded-xl bg-emerald-500 text-zinc-950 flex items-center justify-center font-black shadow-md shadow-emerald-500/20">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-white">Omni AI Coach</h4>
                  <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Luôn sẵn sàng tư vấn
                  </span>
                </div>
              </div>

              {/* Chat Body */}
              <div className="space-y-3 min-h-[140px] text-xs">
                {aiPrompt && (
                  <div className="flex justify-end">
                    <div className="bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 p-3 rounded-2xl max-w-[85%] font-medium">
                      {aiPrompt}
                    </div>
                  </div>
                )}

                {isAiLoading && (
                  <div className="flex items-center gap-2 text-zinc-400 text-xs italic">
                    <Sparkles className="h-4 w-4 animate-spin text-emerald-400" />
                    Omni AI đang phân tích dữ liệu thể hình...
                  </div>
                )}

                {aiAnswer && (
                  <div className="flex justify-start animate-fade-in">
                    <div className="bg-[#0d1527] border border-[#1a2438] text-zinc-200 p-3.5 rounded-2xl max-w-[95%] leading-relaxed font-normal shadow-sm">
                      {aiAnswer}
                    </div>
                  </div>
                )}

                {!aiPrompt && !isAiLoading && !aiAnswer && (
                  <div className="text-center py-6 text-zinc-500 space-y-1">
                    <Bot className="h-8 w-8 mx-auto text-zinc-600 mb-2" />
                    <p className="font-semibold text-xs text-zinc-400">Chưa có câu hỏi nào được chọn</p>
                    <p className="text-[11px]">Bấm vào một trong các câu hỏi mẫu bên trái để xem câu trả lời tức thì.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. KNOWLEDGE & ARTICLES + NEWSLETTER (Matches kien-thuc & dashboard) */}
      <section id="articles-section" className="border-t border-[#17223b] bg-[#060913]/70 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-emerald-400">
                Góc chuyên gia
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                Kiến Thức & Dinh Dưỡng Mới Nhất
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl">
                Cập nhật bài viết độc quyền từ đội ngũ huấn luyện viên OmniGym về tập luyện, dinh dưỡng và tâm lý thi đấu.
              </p>
            </div>
            <Link
              to="/articles"
              className="text-xs font-bold text-emerald-400 hover:underline flex items-center gap-1"
            >
              Xem tất cả bài viết <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ARTICLES.slice(0, 3).map((art) => (
              <div
                key={art.id}
                className="group rounded-2xl border border-[#1a2438] bg-[#0d1527] p-5 flex flex-col justify-between hover:border-emerald-500/40 transition-all shadow-lg space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[10px] font-extrabold">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
                      {art.category}
                    </span>
                    <span className="text-zinc-500">{art.readMinutes} phút đọc</span>
                  </div>

                  <h3 className="font-extrabold text-sm text-white group-hover:text-emerald-400 transition-colors line-clamp-2 leading-relaxed">
                    {art.title}
                  </h3>

                  <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
                  <span className="font-medium text-zinc-300">Tác giả: {art.author}</span>
                  <Link
                    to="/articles/$id"
                    params={{ id: art.id }}
                    className="text-emerald-400 font-bold hover:underline flex items-center gap-1"
                  >
                    Đọc tiếp <ChevronRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Newsletter Box */}
          <div className="rounded-2xl border border-[#1a2438] bg-[#0d1527] p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-1 text-center md:text-left">
              <h4 className="font-black text-base text-white">Đăng Ký Nhận Bản Tin OmniGym Newsletter</h4>
              <p className="text-xs text-zinc-400">
                Nhận thực đơn dinh dưỡng chuẩn Macro và bí quyết tăng cơ giảm mỡ hàng tuần từ Master PT.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Cảm ơn bạn đã đăng ký nhận bản tin OmniGym!");
              }}
              className="relative w-full md:w-80 flex items-center"
            >
              <input
                type="email"
                required
                placeholder="Nhập địa chỉ email của bạn..."
                className="w-full pl-4 pr-12 py-2.5 bg-[#070b13] border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-emerald-500 hover:bg-emerald-600 text-zinc-950 rounded-lg flex items-center justify-center transition-all cursor-pointer font-bold shadow-md shadow-emerald-500/20"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 8. REVIEWS & TESTIMONIALS (Đánh Giá Hội Viên Thực Tế) */}
      <section id="reviews-section" className="border-t border-[#17223b] px-4 py-16 sm:px-6 mx-auto max-w-7xl">
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-emerald-400">
                Ý kiến hội viên
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                Hội Viên Nói Gì Về OmniGym
              </h2>
              <div className="flex items-center gap-2 mt-1 text-xs text-zinc-400">
                <div className="flex text-amber-400">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="h-3.5 w-3.5 fill-current stroke-none" />
                  ))}
                </div>
                <span>4.9 / 5 từ hơn 500+ lượt đánh giá đã xác thực</span>
              </div>
            </div>

            <button
              onClick={() => setIsReviewOpen(true)}
              className="px-4 py-2.5 rounded-xl border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
            >
              <Star className="h-4 w-4 fill-amber-400 stroke-none" />
              Viết Đánh Giá Của Bạn
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {reviewsList.slice(0, 6).map((rev) => (
              <div
                key={rev.id}
                className="rounded-2xl border border-[#1a2438] bg-[#0d1527] p-5 space-y-3 shadow-lg flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-400">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-current stroke-none" />
                      ))}
                    </div>
                    <span className="px-2 py-0.5 rounded-md bg-[#070b13] border border-zinc-800 text-[10px] font-bold text-emerald-400">
                      {rev.topic}
                    </span>
                  </div>

                  <blockquote className="text-xs text-zinc-300 leading-relaxed italic">
                    “{rev.content}”
                  </blockquote>
                </div>

                <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px]">
                  <div>
                    <span className="font-bold text-white block">{rev.name}</span>
                    <span className="text-zinc-500 text-[10px]">{rev.memberFor}</span>
                  </div>
                  <span className="text-zinc-500 text-[10px]">{rev.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. LOCATION & CONTACT CTA BAR */}
      <section className="border-t border-[#17223b] bg-gradient-to-b from-[#0d162c] to-[#070b13] px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-7xl text-center space-y-6">
          <div className="inline-flex h-14 w-14 rounded-2xl bg-black border border-emerald-500/40 text-emerald-400 items-center justify-center shadow-xl shadow-emerald-500/20 mx-auto">
            <img src="/logo.png" alt="OmniGym" className="h-full w-full object-cover rounded-2xl" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Buổi Tập Đầu Tiên Luôn Hoàn Toàn Miễn Phí
          </h2>
          <p className="mx-auto max-w-xl text-xs sm:text-sm text-zinc-300 leading-relaxed">
            Đăng ký ngay hôm nay để nhận quyền lợi đo InBody 770 y khoa, tham gia 01 buổi tập cùng HLV riêng và trải nghiệm khu xông hơi đá muối đẳng cấp tại OmniGym Cần Thơ.
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              onClick={() => handleOpenBookingWithCoach()}
              className="px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black text-sm tracking-wide shadow-xl shadow-emerald-500/25 transition-all cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="h-4 w-4" />
              ĐĂNG KÝ TRẢI NGHIỆM NGAY
            </button>
            <Link
              to="/tools/fitness-calculator"
              className="px-6 py-3.5 rounded-xl border border-zinc-700 bg-[#0d1527] hover:border-emerald-500/40 text-white font-bold text-sm transition-all"
            >
              Công Cụ Tính Chỉ Số BMI & TDEE
            </Link>
          </div>
        </div>
      </section>

      {/* INTERACTIVE MODALS (Zero API dependency, completely self-contained) */}
      <BookingTrialModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialCoach={bookingCoachName}
      />

      <ReviewModal
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        onSubmitReview={handleAddReview}
      />

      <ZoneDetailDrawer
        zone={selectedZone}
        onClose={() => setSelectedZone(null)}
        onBookZone={() => {
          setSelectedZone(null);
          setIsBookingOpen(true);
        }}
      />

      <CoachDetailDrawer
        coach={selectedCoach}
        onClose={() => setSelectedCoach(null)}
        onBookCoach={(name) => {
          setSelectedCoach(null);
          handleOpenBookingWithCoach(name);
        }}
      />
    </PublicLayout>
  );
}
