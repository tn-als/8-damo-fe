"use client";

import { RestaurantCard } from "../restaurant-vote/restaurant-card";
import { ConfirmedFallback } from "./confirmed-fallback";
import type { ConfirmedRestaurantResponse } from "@/src/types/api/dining";

interface ConfirmedSectionProps {
  restaurant: ConfirmedRestaurantResponse | null;
  fallbackDescription: string;
  isGroupLeader: boolean;
  onUploadReceipt: () => void;
}

export function ConfirmedSection({
  restaurant,
  fallbackDescription,
  isGroupLeader,
  onUploadReceipt,
}: ConfirmedSectionProps) {
  if (!restaurant) {
    return (
      <section className="flex w-full flex-col items-center gap-4 px-4 sm:px-5">
        <ConfirmedFallback description={fallbackDescription} />
      </section>
    );
  }

  return (
    <section className="flex w-full flex-col items-center gap-4 px-4 sm:px-5">
      <RestaurantCard
        restaurant={restaurant}
        showActions={false}
        badgeLabel="확정 장소"
      />
      {isGroupLeader && (
        <button
          type="button"
          onClick={onUploadReceipt}
          className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-white"
        >
          영수증 업로드
        </button>
      )}
    </section>
  );
}
