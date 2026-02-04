"use client";

import type {
  DiningParticipantResponse,
  DiningStatus,
} from "@/src/types/api/dining";
import { DiningHeaderContainer } from "./dining-header-container";
import { DiningParticipantList } from "./dining-participant-list";

interface DiningCommonSectionProps {
  diningDate: string;
  diningStatus: DiningStatus;
  diningParticipants: DiningParticipantResponse[];
  isGroupLeader: boolean;
  children?: React.ReactNode;
}

export function DiningCommonSection({
  diningDate,
  diningStatus,
  diningParticipants,
  isGroupLeader,
  children,
}: DiningCommonSectionProps) {
  return (
    <div
      className="mx-auto flex min-h-dvh w-full max-w-[430px] flex-col bg-background"
      data-is-group-leader={isGroupLeader}
    >
      <DiningHeaderContainer diningDate={diningDate} diningStatus={diningStatus} />
      
      <div className="flex flex-col gap-6 px-4 pb-10 sm:gap-8 sm:px-5">
        {children}
        <DiningParticipantList participants={diningParticipants} />
      </div>

    </div>
  );
}
