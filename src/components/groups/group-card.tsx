import { cn } from "@/src/lib/utils";
import { GroupSummary } from "@/src/types/groups";
import { Avatar } from "@/src/components/ui/avatar";
import { GROUP_FALLBACK_IMAGE } from "@/src/constants/image";

interface GroupCardProps {
  groupSummary: GroupSummary;
  className?: string;
  onClick?: (groupId: string) => void;
}

export function GroupCard({
  groupSummary,
  onClick,
}: GroupCardProps) {
  const introduction =
    groupSummary.introduction?.trim().length ? groupSummary.introduction : "";
  
  const imageSrc = 
    groupSummary.imagePath?.trim()
    ? `${process.env.NEXT_PUBLIC_S3_CDN}/groups/profile/${groupSummary.imagePath}`
    : GROUP_FALLBACK_IMAGE

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onClick?.(groupSummary.id)}
      className={cn(
        "flex cursor-pointer items-center gap-2 rounded-lg bg-card p-3 shadow-xs transition-colors active:bg-card-pressed sm:gap-3 sm:p-4"
      )}
    >


      <Avatar
        src={imageSrc}
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
          {introduction}
        </p>
      </div>
    </div>
  );
}
