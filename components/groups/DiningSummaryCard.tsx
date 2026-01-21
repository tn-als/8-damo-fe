import { cn } from "@/lib/utils";

interface DiningSummaryCardProps {
  date: string;
  attendeeCount: number;
  className?: string;
  onClick?: () => void;
}

export function DiningSummaryCard({
  date,
  attendeeCount,
  className,
  onClick,
}: DiningSummaryCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full flex-col gap-2 rounded-lg border border-border bg-card p-3 text-left transition-colors hover:bg-muted sm:p-4",
        className
      )}
    >
      <h4 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
        {date}
      </h4>
      <p className="text-sm text-muted-foreground">참석자 수: {attendeeCount}명</p>
    </button>
  );
}
