import { Clock, Users, MapPin } from "lucide-react";
import { cn } from "@/src/lib/utils";
import type { WeeklyDining } from "@/src/types/home";

interface DiningScheduleCardProps {
    dining: WeeklyDining;
    className?: string;
}

export function DiningScheduleCard({
    dining,
    className,
}: DiningScheduleCardProps) {
    return (
        <div
            className={cn(
                "flex flex-col gap-2 rounded-lg border border-border bg-card p-3",
                className
            )}
        >
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="size-4" aria-hidden="true" />
                <span>{dining.time}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
                <Users className="size-4 text-muted-foreground" aria-hidden="true" />
                <span className="font-medium">{dining.groupName}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
                <MapPin className="size-4 text-muted-foreground" aria-hidden="true" />
                <span>{dining.restaurantName}</span>
            </div>
        </div>
    );
}
