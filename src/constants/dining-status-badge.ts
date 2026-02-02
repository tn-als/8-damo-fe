import { type DiningStatus } from "@/src/types/api/dining";

export const STATUS_BADGE_CONFIG: Record<
  DiningStatus,
  {
    label: string;
    variant:
      | "diningAttendance"
      | "diningRestaurant"
      | "diningConfirmed"
      | "diningCompleted";
  }
> = {
  ATTENDANCE_VOTING: {
    label: "참석 투표",
    variant: "diningAttendance",
  },
  RECOMMENDATION_PENDING: {
    label: "장소 추천중",
    variant: "diningRestaurant",
  },
  RESTAURANT_VOTING: {
    label: "장소 투표",
    variant: "diningRestaurant",
  },
  CONFIRMED: {
    label: "회식 확정",
    variant: "diningConfirmed",
  },
  COMPLETE: {
    label: "회식 완료",
    variant: "diningCompleted",
  },
};
