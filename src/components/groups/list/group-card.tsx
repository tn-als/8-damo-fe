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
    ? `https://${process.env.NEXT_PUBLIC_S3_CDN}/${groupSummary.imagePath}`
    : GROUP_FALLBACK_IMAGE;
  
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onClick?.(groupSummary.id)}
      className={cn(
        "flex flex-col items-center gap-3 rounded-2xl bg-background p-4",
        "border border-border/50 shadow-sm",
        "transition-colors active:bg-card cursor-pointer"
      )}
    >

      <Avatar
        src={imageSrc}
        alt={`${groupSummary.name} 그룹 이미지`}
        fallbackText={groupSummary.name}
        fallbackUrl={GROUP_FALLBACK_IMAGE}
        size="xl"
      />

      <div className="w-full text-center">
        <h3 className="text-sm font-bold text-foreground leading-snug line-clamp-2">
          {groupSummary.name}
        </h3>
        {introduction && (
          <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
            {introduction}
          </p>
        )}
      </div>
    </div>
  );
}
