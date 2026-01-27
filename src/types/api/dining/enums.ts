// types/api/dining/enums.ts

// 참석 투표 상태
export type AttendanceVoteStatus = "ATTEND" | "NON_ATTEND" | "PENDING";

// 회식 전체 상태
export type DiningStatus =
  | "ATTENDANCE_VOTING"
  | "RECOMMENDATION_PENDING"
  | "RESTAURANT_VOTING"
  | "CONFIRMED"
  | "COMPLETE";

// 식당 투표 상태
export type RestaurantVoteStatus = "LIKE" | "DISLIKE" | "NONE";
