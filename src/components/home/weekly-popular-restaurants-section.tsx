import { cn } from "@/src/lib/utils";

interface WeeklyPopularRestaurantsSectionProps {
    className?: string;
}

export function WeeklyPopularRestaurantsSection({
    className,
}: WeeklyPopularRestaurantsSectionProps) {
    return (
        <section
            className={cn(
                "flex flex-col items-center justify-center rounded-xl bg-muted py-16",
                className
            )}
        >
            <p className="animate-float text-lg font-semibold text-muted-foreground">
                이번 주 인기 식당은 곧 공개돼요 🍽️
            </p>
            <p className="text-sm text-muted-foreground">
                회식이 더 쌓이면 이번 주 인기 식당을 추천해드릴게요.
            </p>
        </section>
    );
}
