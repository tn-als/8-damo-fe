import { cn } from "@/src/lib/utils";

interface WeeklyDiningScheduleSkeletonProps {
    className?: string;
}

export function WeeklyDiningScheduleSkeleton({
    className,
}: WeeklyDiningScheduleSkeletonProps) {
    return (
        <section className={cn("flex flex-col gap-4", className)}>
            {/* 제목 스켈레톤 */}
            <div className="h-7 w-28 animate-pulse rounded bg-muted" />

            {/* 캘린더 스켈레톤 */}
            <div className="flex justify-between gap-1">
                {Array.from({ length: 7 }).map((_, i) => (
                    <div
                        key={i}
                        className="flex flex-1 flex-col items-center gap-1 rounded-lg py-2"
                    >
                        <div className="h-4 w-4 animate-pulse rounded bg-muted" />
                        <div className="h-5 w-5 animate-pulse rounded bg-muted" />
                        <div className="size-1.5 animate-pulse rounded-full bg-muted" />
                    </div>
                ))}
            </div>

            {/* 카드 스켈레톤 */}
            <div className="flex flex-col gap-2 rounded-lg border border-border bg-card p-3">
                <div className="h-5 w-16 animate-pulse rounded bg-muted" />
                <div className="h-5 w-24 animate-pulse rounded bg-muted" />
                <div className="h-5 w-32 animate-pulse rounded bg-muted" />
            </div>
        </section>
    );
}
