import { cn } from "@/src/lib/utils";

interface WeeklyPopularRestaurantsSectionProps {
    className?: string;
}

export function WeeklyPopularRestaurantsSection({
    className,
}: WeeklyPopularRestaurantsSectionProps) {
    return (
        <section className={cn("w-full max-w-[430px] flex flex-col gap-4", className)}>
          <h2 className="text-lg font-bold">이번 주 인기 식당</h2>
          
          <div className={cn("mb-8 flex flex-col items-center justify-center bg-muted py-12 text-center")}>
            <p className="animate-float text-lg font-semibold text-muted-foreground">
              이번 주 인기 식당은 곧 공개돼요 🍽️
            </p>
            <p className="text-sm text-muted-foreground">
              회식이 더 쌓이면 이번 주 인기 식당을 추천해드릴게요.
            </p>
          </div>

        </section>

    );
}
