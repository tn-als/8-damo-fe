import { type DiningEventPhase } from "@/src/types/dining";

export const STATUS_BADGE_CONFIG: Record<
  DiningEventPhase,
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
  RESTAURANT_CONFIRMED: {
    label: "회식 확정",
    variant: "diningConfirmed",
  },
  DINING_COMPLETED: {
    label: "회식 완료",
    variant: "diningCompleted",
  },
};