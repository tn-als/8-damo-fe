import { Clock, Users, MapPin } from "lucide-react";
import { cn } from "@/src/lib/utils";
import type { WeeklyDining } from "@/src/types/home";
import { Badge } from "@/src/components/ui/badge";

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
                "relative flex flex-col gap-2 rounded-lg bg-card p-3",
                className
            )}
        >
            <Badge className="absolute right-3 top-3" size="sm">
                예시
            </Badge>
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
