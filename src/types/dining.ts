export type AttendanceVoteStatus = "ATTEND" | "NON_ATTEND" | null;

export type DiningEventPhase =
  | "ATTENDANCE_VOTING"
  | "RESTAURANT_VOTING"
  | "RESTAURANT_CONFIRMED"
  | "DINING_COMPLETED";
