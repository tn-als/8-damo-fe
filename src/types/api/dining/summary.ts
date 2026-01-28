import { DiningStatus } from "./enums";

export interface DiningSummary {
  diningId: string;
  diningDate: string;
  status: DiningStatus;
  diningParticipantsCount: number;
}
