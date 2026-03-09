"use client"
import { useRouter } from "next/navigation";
import { useDiningConfirmed } from "@/src/hooks/dining/use-dining-confirmed";
import { ConfirmedSection } from "./confirmed-section";
import type { DiningCommonResponse } from "@/src/types/api/dining";

interface ConfirmedContainerProps {
  groupId: string;
  diningId: string;
  diningCommon: DiningCommonResponse;
}

export function ConfirmedContainer({
  groupId,
  diningId,
  diningCommon,
}: ConfirmedContainerProps) {
  const router = useRouter();
  const { data } = useDiningConfirmed(groupId, diningId, true);

  return (
    <ConfirmedSection
      restaurant={data ?? null}
      fallbackDescription="다시 시도해주세요"
      isGroupLeader={diningCommon.isGroupLeader}
      onUploadReceipt={() =>
        router.push(`/groups/${groupId}/dining/${diningId}/receipt`)
      }
    />
  );
}
