import { cn } from "@/lib/utils";
import { GroupSummary } from "@/types/groups";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { GROUP_FALLBACK_IMAGE } from "@/constants/image";

interface GroupCardProps {
  groupSummary: GroupSummary;
  className?: string;
}

export function GroupCard({
  groupSummary,
  className,
}: GroupCardProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-2xl border border-border bg-card p-4 sm:gap-5 sm:p-6",
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
        <p className="text-sm text-muted-foreground">{groupSummary.description}</p>
        <Badge variant="secondary" size="sm" className="w-fit mt-1">
          이번 달 회식 {groupSummary.diningCountPerMonth}회
        </Badge>
      </div>
    </div>
  );
}
