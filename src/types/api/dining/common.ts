// types/api/dining/common.ts

import { DiningStatus } from "./enums";

export interface DiningParticipantResponse {
  userId: number;
  nickname: string;
}

export interface DiningCommonResponse {
  isGroupLeader: boolean;
  diningDate: string; // "2024-12-25 18:00"
  diningStatus: DiningStatus;
  diningParticipants: DiningParticipantResponse[];
}
