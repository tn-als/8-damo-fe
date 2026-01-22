import { cn } from "@/src/lib/utils";

interface LateDiningSummarySkeletonProps {
    className?: string;
}

export function LateDiningSummarySkeleton({
    className,
}: LateDiningSummarySkeletonProps) {
    return (
        <section className={cn("flex flex-col gap-4", className)}>
            {/* 제목 스켈레톤 */}
            <div className="h-7 w-24 animate-pulse rounded bg-muted" />

            {/* 카드 스켈레톤 */}
            <div className="flex w-full flex-col overflow-hidden rounded-xl border border-border bg-card">
                {/* 이미지 영역 스켈레톤 */}
                <div className="aspect-[4/3] w-full animate-pulse bg-muted" />

                {/* 정보 영역 스켈레톤 */}
                <div className="flex flex-col gap-2 p-3">
                    <div className="h-5 w-32 animate-pulse rounded bg-muted" />
                    <div className="h-4 w-48 animate-pulse rounded bg-muted" />
                    <div className="h-4 w-40 animate-pulse rounded bg-muted" />
                </div>
            </div>

            {/* 인디케이터 스켈레톤 */}
            <div className="flex justify-center gap-1.5">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div
                        key={i}
                        className="size-2 animate-pulse rounded-full bg-muted"
                    />
                ))}
            </div>
        </section>
    );
}
