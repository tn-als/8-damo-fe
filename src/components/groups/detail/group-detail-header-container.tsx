"use client";

import { GroupDetailHeader } from "@/src/components/groups/detail/group-detail-header";

interface GroupDetailHeaderContainerProps {
  groupName: string;
  onBack?: () => void;
  onMoreClick?: () => void;
}

export function GroupDetailHeaderContainer({
  groupName,
  onBack,
  onMoreClick,
}: GroupDetailHeaderContainerProps) {
  return (
    <GroupDetailHeader
      groupName={groupName}
      onBack={onBack}
      onMoreClick={onMoreClick}
    />
  );
}
