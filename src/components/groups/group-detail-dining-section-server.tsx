"use client";

import { GroupDetailDiningSection } from "@/src/components/groups/group-detail-dining-section";
import { useDiningSummaries } from "@/src/hooks/use-dining";
import type { DiningStatus } from "@/src/types/api/dining";

interface GroupDetailDiningSectionServerProps {
  groupId: string;
  status: DiningStatus;
}

export function GroupDetailDiningSectionServer({
  groupId,
  status,
}: GroupDetailDiningSectionServerProps) {
  const { data: dinings, isLoading, error } = useDiningSummaries(groupId, status);

  if (isLoading) {
    return null;
  }

  if (error) {
    console.error(
      "[GroupDetailDiningSectionServer] Failed to load dining summaries",
      error
    );
    return (
      <GroupDetailDiningSection groupId={groupId} status={status} dinings={[]} />
    );
  }

  return (
    <GroupDetailDiningSection
      groupId={groupId}
      status={status}
      dinings={dinings ?? []}
    />
  );
}
