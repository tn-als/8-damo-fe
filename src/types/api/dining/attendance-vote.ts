import { AttendanceVoteStatus } from "./enums";

export interface AttendanceVoteResponse {
  attendanceVoteStatus: AttendanceVoteStatus;
  completedVoteCount: number;
  totalGroupMemberCount: number;
}
