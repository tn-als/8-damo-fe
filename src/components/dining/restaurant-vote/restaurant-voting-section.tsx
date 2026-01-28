"use client"
import type { RestaurantVoteResponse } from "@/src/types/api/dining";
import { RestaurantCard } from "./restaurant-card";
import { RestaurantVotingCarousel } from "./restaurant-voting-carousel";

interface RestaurantVotingSectionProps {
  restaurants: RestaurantVoteResponse[];
  isGroupLeader: boolean;
  canAdditionalAttend?: boolean;
  onLike?: (restaurantId: number) => void;
  onDislike?: (restaurantId: number) => void;
  onConfirmDining?: (restaurantId: number) => void;
  onRetryRecommendation?: () => void;
  onAdditionalAttend?: () => void;
}

export function RestaurantVotingSection({
  restaurants,
  isGroupLeader,
  canAdditionalAttend = false,
  onLike,
  onDislike,
  onConfirmDining,
  onRetryRecommendation,
  onAdditionalAttend,
}: RestaurantVotingSectionProps) {
  if (!restaurants.length) {
    return null;
  }

  const handleLike = (restaurantId: number) => {
    onLike?.(restaurantId);
  };
  const handleDislike = (restaurantId: number) => {
    onDislike?.(restaurantId);
  };
  const handleConfirmDining = (restaurantId: number) => {
    onConfirmDining?.(restaurantId);
  };
  const handleRetryRecommendation = () => {
    onRetryRecommendation?.();
  };
  const handleAdditionalAttend = () => {
    onAdditionalAttend?.();
  };

  return (
    <section className="flex w-full flex-col items-center gap-4">
      <RestaurantVotingCarousel>
        {restaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.recommendRestaurantsId}
            restaurant={restaurant}
            isGroupLeader={isGroupLeader}
            canAdditionalAttend={canAdditionalAttend}
            onLike={() => handleLike(restaurant.recommendRestaurantsId)}
            onDislike={() => handleDislike(restaurant.recommendRestaurantsId)}
            onConfirmDining={() =>
              handleConfirmDining(restaurant.recommendRestaurantsId)
            }
            onRetryRecommendation={handleRetryRecommendation}
            onAdditionalAttend={handleAdditionalAttend}
          />
        ))}
      </RestaurantVotingCarousel>
    </section>
  );
}
