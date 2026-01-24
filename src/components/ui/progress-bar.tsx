import { cn } from "@/src/lib/utils";

interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
}

export function ProgressBar({ current, total, className }: ProgressBarProps) {
  return (
    <div className={cn("flex w-full gap-1", className)}>
      {Array.from({ length: total }, (_, index) => (
        <div
          key={index}
          className={cn(
            "h-1 flex-1 rounded-full transition-colors",
            index < current ? "bg-primary" : "bg-muted"
          )}
        />
      ))}
    </div>
  );
}
