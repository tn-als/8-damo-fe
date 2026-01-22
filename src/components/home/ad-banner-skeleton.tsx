import { cn } from "@/src/lib/utils";

interface AdBannerSkeletonProps {
    className?: string;
}

export function AdBannerSkeleton({ className }: AdBannerSkeletonProps) {
    return (
        <div
            className={cn(
                "aspect-[16/5] w-full animate-pulse rounded-xl bg-muted",
                className
            )}
        />
    );
}
