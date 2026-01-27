import { cn } from "@/src/lib/utils";
import { GroupSummary } from "@/src/types/groups";
import { Avatar } from "@/src/components/ui/avatar";
import { GROUP_FALLBACK_IMAGE } from "@/src/constants/image";

interface GroupCardProps {
  groupSummary: GroupSummary;
  className?: string;
  onClick?: (groupId: number) => void;
}

export function GroupCard({
  groupSummary,
  className,
  onClick,
}: GroupCardProps) {
  const description =
    groupSummary.description?.trim().length ? groupSummary.description : "";

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onClick?.(groupSummary.id)}
      className={cn(
        "flex cursor-pointer items-center gap-2 rounded-lg bg-card p-3 shadow-xs transition-colors active:bg-card-pressed sm:gap-3 sm:p-4",
        className
      )}
    >
      <Avatar
        src={groupSummary.imageUrl}
        alt={`${groupSummary.name} 그룹 이미지`}
        fallbackText={groupSummary.name}
        fallbackUrl={GROUP_FALLBACK_IMAGE}
        size="md"
      />

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <h3 className="truncate text-base font-semibold leading-tight text-foreground sm:text-lg">
          {groupSummary.name}
        </h3>
        <p className="truncate text-xs text-muted-foreground sm:text-sm">
          {description}
        </p>
      </div>
    </div>
  );
}
