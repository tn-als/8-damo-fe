import { GroupDetailDiningSection } from "@/src/components/groups/detail/group-detail-dining-section";
import { getGroupDiningSummaries } from "@/src/lib/api/server/dining";
import type { DiningStatus } from "@/src/types/api/dining";

interface GroupDetailDiningSectionServerProps {
  groupId: string;
  status: DiningStatus;
}

export async function GroupDetailDiningSectionServer({
  groupId,
  status,
}: GroupDetailDiningSectionServerProps) {
  try {
    const dinings = await getGroupDiningSummaries(groupId, status);

    return (
      <GroupDetailDiningSection
        groupId={groupId}
        status={status}
        dinings={dinings}
      />
    );
  } catch (error) {
    console.error(
      "[GroupDetailDiningSectionServer] Failed to load dining summaries",
      error
    );
    return (
      <GroupDetailDiningSection groupId={groupId} status={status} dinings={[]} />
    );
  }
}
