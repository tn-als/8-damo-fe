import { cn } from "@/src/lib/utils";

interface ProfileCardSkeletonProps {
  className?: string;
}

export function ProfileCardSkeleton({ className }: ProfileCardSkeletonProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-2xl border border-border bg-card p-4",
        className
      )}
    >
      {/* Avatar skeleton */}
      <div className="size-16 shrink-0 animate-pulse rounded-full bg-muted sm:size-20" />

      <div className="flex flex-col gap-1.5">
        {/* Nickname skeleton */}
        <div className="h-6 w-24 animate-pulse rounded bg-muted" />

        {/* Badge skeleton */}
        <div className="flex gap-2">
          <div className="h-5 w-12 animate-pulse rounded-full bg-muted" />
          <div className="h-5 w-12 animate-pulse rounded-full bg-muted" />
        </div>
      </div>
    </div>
  );
}
