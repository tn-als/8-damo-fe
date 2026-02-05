import { cn } from "@/src/lib/utils";

interface ProfileCardSkeletonProps {
  className?: string;
}

export function ProfileCardSkeleton({ className }: ProfileCardSkeletonProps) {
  return (
    <div
      className={cn(
        "relative flex items-center gap-4 px-5 py-6",
        className
      )}
    >
      {/* Avatar skeleton (xl size) */}
      <div className="size-20 shrink-0 animate-pulse rounded-full bg-muted sm:size-24" />

      <div className="flex flex-col gap-2">
        {/* Nickname skeleton */}
        <div className="h-8 w-32 animate-pulse rounded bg-muted sm:h-9 md:h-10" />

        {/* Badge skeleton */}
        <div className="flex gap-2">
          <div className="h-5 w-12 animate-pulse rounded-full bg-muted sm:h-6" />
          <div className="h-5 w-12 animate-pulse rounded-full bg-muted sm:h-6" />
        </div>
      </div>
    </div>
  );
}
