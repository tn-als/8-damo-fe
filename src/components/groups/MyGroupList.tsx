'use client'

import { GroupSummary } from "@/src/types/groups";
import { GroupCard } from "./GroupCard";
import { EmptyState } from "@/src/components/ui/empty-state";
import { Users } from "lucide-react";
import { useRouter } from "next/navigation";

interface MyGroupListProps {
  groupSummaryList?: GroupSummary[];
}

export function MyGroupList({ groupSummaryList = [] }: MyGroupListProps) {
  const router = useRouter();

    if (groupSummaryList.length === 0) {
    return (
      <EmptyState
        icon={Users}
        description="아직 참여하는 그룹이 없습니다."
      />
    );
  }

  return (
    <div className="flex flex-col gap-3 px-4 pb-20 sm:gap-4 sm:px-5 sm:pb-24">
      {groupSummaryList.map((groupSummary) => (
        <GroupCard
          key={groupSummary.id}
          groupSummary={groupSummary}
          onClick={(groupId) => {
            router.push(`/groups/${groupId}`);
          }}
        />
      ))}
    </div>
  );
}
