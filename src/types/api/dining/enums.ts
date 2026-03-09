export type AttendanceVoteStatus = "ATTEND" | "NON_ATTEND" | "PENDING";

export type DiningStatus =
  | "ATTENDANCE_VOTING"
  | "RESTAURANT_RECOMMENDATION_PENDING"
  | "RESTAURANT_VOTING"
  | "CONFIRMED"
  | "COMPLETE";
  
export type RestaurantVoteOption = "LIKE" | "DISLIKE";
