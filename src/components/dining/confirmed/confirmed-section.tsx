"use client";

import { RestaurantCard } from "../restaurant-vote/restaurant-card";
import { ConfirmedFallback } from "./confirmed-fallback";
import type { ConfirmedRestaurantResponse } from "@/src/types/api/dining";

interface ConfirmedSectionProps {
  restaurant: ConfirmedRestaurantResponse | null;
  fallbackDescription: string;
}

export function ConfirmedSection({
  restaurant,
  fallbackDescription,
}: ConfirmedSectionProps) {
  if (!restaurant) {
    return (
      <section className="flex w-full flex-col items-center gap-4">
        <ConfirmedFallback description={fallbackDescription} />
      </section>
    );
  }

  return (
    <section className="flex w-full flex-col items-center gap-4">
      <RestaurantCard
        restaurant={restaurant}
        showActions={false}
        badgeLabel="확정 장소"
      />
    </section>
  );
}
