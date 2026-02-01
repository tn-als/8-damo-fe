import Link from "next/link";
import { MapPin } from "lucide-react";
import { cn } from "@/src/lib/utils";
import type { LateDiningSummary } from "@/src/types/home";

interface LateDiningCardProps {
    dining: LateDiningSummary;
    className?: string;
}

export function LateDiningCard({ dining, className }: LateDiningCardProps) {
    return (
        <Link
            href={`/dinings/${dining.id}`}
            className={cn(
                "flex w-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-md",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                className
            )}
        >
            {/* 지도 이미지 영역 */}
            <div className="relative aspect-[4/3] w-full bg-muted">
                {dining.mapImageUrl ? (
                    <img
                        src={dining.mapImageUrl}
                        alt={`${dining.restaurantName} 위치`}
                        className="absolute inset-0 h-full w-full object-cover"
                        loading="lazy"
                        decoding="async"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center">
                        <MapPin className="size-8 text-muted-foreground" aria-hidden="true" />
                    </div>
                )}
            </div>

            {/* 정보 영역 */}
            <div className="flex flex-col gap-1 p-3">
                <h3 className="truncate text-sm font-semibold">
                    {dining.restaurantName}
                </h3>
                <p className="truncate text-xs text-muted-foreground">
                    {dining.restaurantAddress}
                </p>
                {dining.description && (
                    <p className="line-clamp-2 text-xs text-muted-foreground">
                        {dining.description}
                    </p>
                )}
            </div>
        </Link>
    );
}
