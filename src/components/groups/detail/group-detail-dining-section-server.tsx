import { GroupDetailDiningSection } from "@/src/components/groups/detail/group-detail-dining-section";
import { getGroupDiningSummaries } from "@/src/lib/api/server/dining";
import type { DiningStatus, DiningSummary } from "@/src/types/api/dining";

interface GroupDetailDiningSectionServerProps {
  groupId: string;
  status: DiningStatus;
}

export async function GroupDetailDiningSectionServer({
  groupId,
  status,
}: GroupDetailDiningSectionServerProps) {
  let dinings: DiningSummary[] = [];

  try {
    dinings = await getGroupDiningSummaries(groupId, status);
  } catch (error) {
    console.error(
      "[GroupDetailDiningSectionServer] Failed to load dining summaries",
      error
    );
  }

  return (
    <GroupDetailDiningSection
      groupId={groupId}
      status={status}
      dinings={dinings}
    />
  );
}
