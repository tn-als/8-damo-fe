import type { DiningParticipantResponse, DiningStatus } from "@/src/types/api/dining";
import { DiningHeader } from "./dining-header";
import { DiningParticipantList } from "../dining-participant-list";

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
      className="mx-auto min-h-screen w-full max-w-[430px] bg-background"
      data-is-group-leader={isGroupLeader}
    >
      <DiningHeader diningDate={diningDate} diningStatus={diningStatus} />
      <main className="flex flex-col gap-8 px-5 pb-12 pt-16">
        {children}
        <DiningParticipantList participants={diningParticipants} />
      </main>
    </div>
  );
}
