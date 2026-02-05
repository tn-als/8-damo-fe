"use client";

import { GroupDetailInformationSection } from "@/src/components/groups/detail/group-detail-information-section";

interface GroupDetailInformationContainerProps {
  description: string;
  memberCount: number;
}

export function GroupDetailInformationContainer({
  description,
  memberCount,
}: GroupDetailInformationContainerProps) {
  return (
    <GroupDetailInformationSection
      description={description}
      memberCount={memberCount}
    />
  );
}
