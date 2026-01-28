import { GroupDetailDiningSection } from "@/src/components/groups/group-detail-dining-section";
import { getGroupDiningSummaries } from "@/src/lib/actions/dining";
import type { DiningStatus } from "@/src/types/api/dining";

interface GroupDetailDiningSectionServerProps {
  groupId: string;
  status: DiningStatus;
}

export async function GroupDetailDiningSectionServer({
  groupId,
  status,
}: GroupDetailDiningSectionServerProps) {
  const result = await getGroupDiningSummaries(groupId, status);

  if (!result.success) {
    console.error(
      "[GroupDetailDiningSectionServer] Failed to load dining summaries",
      result.error
    );
    return (
      <GroupDetailDiningSection groupId={groupId} status={status} dinings={[]} />
    );
  }

  return (
    <GroupDetailDiningSection
      groupId={groupId}
      status={status}
      dinings={result.data ?? []}
    />
  );
}
