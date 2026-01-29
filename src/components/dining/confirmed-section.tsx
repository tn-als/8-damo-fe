import { RestaurantCard } from "./restaurant-vote/restaurant-card";
import type { ConfirmedRestaurantResponse } from "@/src/types/api/dining";

interface ConfirmedSectionProps {
  restaurant: ConfirmedRestaurantResponse;
}

export function ConfirmedSection({
  restaurant,
}: ConfirmedSectionProps) {
  return (
    <section className="flex w-full flex-col items-center gap-4">
      <RestaurantCard
        restaurant={restaurant}
        showActions={false}
        showPermissionActions={false}
        badgeLabel="확정 장소"
      />
    </section>
  );
}
