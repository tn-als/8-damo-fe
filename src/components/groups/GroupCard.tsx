import { cn } from "@/src/lib/utils";
import { GroupSummary } from "@/src/types/groups";
import { Avatar } from "@/src/components/ui/avatar";
import { Badge } from "@/src/components/ui/badge";
import { GROUP_FALLBACK_IMAGE } from "@/constants/image";

interface GroupCardProps {
  groupSummary: GroupSummary;
  className?: string;
  onClick?: (groupId: string) => void;
}

export function GroupCard({
  groupSummary,
  className,
  onClick,
}: GroupCardProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onClick?.(groupSummary.id)}
      className={cn(
        "flex cursor-pointer items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-colors hover:bg-accent sm:gap-5 sm:p-6",
        className
      )}
    >
      <Avatar
        src={groupSummary.imageUrl}
        alt={`${groupSummary.name} 그룹 이미지`}
        fallbackText={groupSummary.name}
        fallbackUrl={GROUP_FALLBACK_IMAGE}
        size="lg"
      />

      <div className="flex flex-1 flex-col gap-1">
        <h3 className="text-lg font-bold leading-tight text-foreground sm:text-xl">
          {groupSummary.name}
        </h3>
        <p className="text-sm text-muted-foreground">
          {groupSummary.description}
        </p>
        <Badge variant="secondary" size="sm" className="mt-1 w-fit">
          이번 달 회식 {groupSummary.diningCountPerMonth}회
        </Badge>
      </div>
    </div>
  );
}
