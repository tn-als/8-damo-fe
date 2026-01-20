import { GroupSummary } from "@/types/groups";
import { GroupCard } from "./GroupCard";

interface MyGroupListProps {
  groupSummaryList?: GroupSummary[];
}

export function MyGroupList({ groupSummaryList = [] }: MyGroupListProps) {
  if (groupSummaryList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-4 py-16 sm:px-5 sm:py-20">
        <p className="text-muted-foreground">아직 참여하는 그룹이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 px-4 pb-20 sm:gap-4 sm:px-5 sm:pb-24">
      {groupSummaryList.map((groupSummary) => (
        <GroupCard
          key={groupSummary.id}
          groupSummary={groupSummary}
        />
      ))}
    </div>
  );
}
