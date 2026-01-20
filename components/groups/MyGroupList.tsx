import { GroupCard } from "./GroupCard";

interface Group {
  id: string;
  name: string;
  description?: string;
  memberCount: number;
  createdAt: string;
  imageUrl?: string;
  meetingCount?: number;
  status?: string;
}

interface MyGroupListProps {
  groups: Group[];
}

export function MyGroupList({ groups }: MyGroupListProps) {
  if (groups.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-5 py-20">
        <p className="text-muted-foreground">아직 가입한 그룹이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 px-5 pb-24">
      {groups.map((group) => (
        <GroupCard
          key={group.id}
          id={group.id}
          name={group.name}
          description={group.description}
          imageUrl={group.imageUrl}
          meetingCount={group.meetingCount}
          status={group.status}
        />
      ))}
    </div>
  );
}
