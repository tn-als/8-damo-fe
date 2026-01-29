import { cn } from "@/src/lib/utils";
import { Badge } from "@/src/components/ui/badge";
import { Users } from "lucide-react";
import { type DiningStatus } from "@/src/types/api/dining";

interface DiningSummaryCardProps {
  date: string;
  attendeeCount: number;
  status?: DiningStatus;
  className?: string;
  onClick?: () => void;
}

const statusConfig: Record<
  DiningStatus,
  {
    label: string;
    variant:
      | "diningAttendance"
      | "diningRestaurant"
      | "confirmed"
      | "completed"
      | "diningCompleted";
  }
> = {
  ATTENDANCE_VOTING: { label: "참석 투표", variant: "diningAttendance" },
  RECOMMENDATION_PENDING: { label: "추천 대기", variant: "diningRestaurant" },
  RESTAURANT_VOTING: { label: "장소 투표", variant: "diningRestaurant" },
  CONFIRMED: { label: "회식 확정", variant: "confirmed" },
  COMPLETE: { label: "회식 완료", variant: "diningCompleted" },
};

export function DiningSummaryCard({
  date,
  attendeeCount,
  status = "ATTENDANCE_VOTING",
  className,
  onClick,
}: DiningSummaryCardProps) {
  const { label, variant } = statusConfig[status];

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex h-[88px] w-full items-start gap-2 rounded-lg bg-white p-4 text-left transition-colors active:bg-gray-50",
        className
      )}
    >
      <div className="flex flex-1 flex-col gap-3">
        <h4 className="text-xl font-bold leading-7 text-[#333]">{date}</h4>
        <div className="flex items-center gap-1">
          <Users className="size-5 text-[#aeaeb2]" />
          <span className="text-sm font-semibold leading-[18px] text-[#333]">
            {attendeeCount}명 참석 중
          </span>
        </div>
      </div>
      <Badge variant={variant} size="dining">
        {label}
      </Badge>
    </button>
  );
}
