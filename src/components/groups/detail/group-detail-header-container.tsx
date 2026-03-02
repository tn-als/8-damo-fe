"use client";

import { GroupDetailHeader } from "@/src/components/groups/detail/group-detail-header";

interface GroupDetailHeaderContainerProps {
  groupName: string;
  onBack?: () => void;
}

export function GroupDetailHeaderContainer({
  groupName,
  onBack,
}: GroupDetailHeaderContainerProps) {
  return (
    <GroupDetailHeader
      groupName={groupName}
      onBack={onBack}
    />
  );
}
