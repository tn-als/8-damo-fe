import { cn } from "@/lib/utils";
import { GroupSummary } from "@/types/groups";
import Image from "next/image";
import { GROUP_FALLBACK_IMAGE } from "@/constants/image";

interface GroupCardProps {
  groupSummary: GroupSummary;
  className?: string;
}

export function GroupCard({
  groupSummary,
  className,
}: GroupCardProps) {
  const imageSrc = groupSummary.imageUrl ?? GROUP_FALLBACK_IMAGE;

  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-2xl border border-border bg-card p-4 sm:gap-5 sm:p-6",
        className
      )}
    >
      <div className="relative size-16 shrink-0 overflow-hidden rounded-full border-2 border-muted-foreground/30 bg-muted sm:size-20">
        <Image
          src={imageSrc}
          alt={`${groupSummary.name} 그룹 이미지`}
          fill
          className="object-cover text-muted-foreground/50"
        />
      </div>
            

      {/* 그룹 정보 */}
      <div className="flex flex-1 flex-col gap-1">
        <h3 className="text-lg font-bold leading-tight text-foreground sm:text-xl">
          {groupSummary.name}
        </h3>
        <p className="text-sm text-muted-foreground">{groupSummary.description}</p>
        <p className="text-sm text-muted-foreground">
          이번 달 회식 {groupSummary.diningCountPerMonth}회
        </p>
      </div>

    </div>
  );
}
