import {
  type DiningStatus
} from "@/src/types/dining"

export const STATUS_BADGE_CONFIG: Record<
  DiningStatus,
  { label: string; variant: "diningAttendance" | "diningRestaurant" | "diningConfirmed" | "diningCompleted" }
> = {
  ATTENDANCE_VOTING: {
    label: "참석 투표",
    variant: "diningAttendance",
  },
  RESTAURANT_VOTING: {
    label: "장소 투표",
    variant: "diningRestaurant",
  },
  CONFIRMED: {
    label: "회식 확정",
    variant: "diningConfirmed",
  },
  COMPLETED: {
    label: "회식 완료",
    variant: "diningCompleted",
  },
};