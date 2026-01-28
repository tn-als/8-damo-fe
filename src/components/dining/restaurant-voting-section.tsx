"use client";

import { cn } from "@/src/lib/utils";
import { Restaurant, RestaurantVoteSummary } from "@/src/types/api/dining";
import { type RestaurantVoteOption } from "@/src/types/api/dining/enums";
import { RestaurantAction } from "./restaurant-action";
import { RestaurantInfo } from "./restaurant-info";
import { RestaurantPermissionAction } from "./restaurant-permission-action";

interface RestaurantVotingSectionProps {
  restaurants: Restaurant[];
  voteSummary: RestaurantVoteSummary[];
  activeIndex?: number;
  permissions: {
    canDecideRestaurant: boolean;
    canAttendAdditional: boolean;
  };
  onVote?: (restaurantId: number, action: RestaurantVoteOption) => void;
  onDecideRestaurant?: (restaurantId: number) => void;
  onRerecommendRestaurant?: () => void;
  onAttendAdditional?: () => void;
}

export function RestaurantVotingSection({
  restaurants,
  voteSummary,
  activeIndex = 0,
  permissions,
  onVote,
  onDecideRestaurant,
  onRerecommendRestaurant,
  onAttendAdditional,
}: RestaurantVotingSectionProps) {
  const safeIndex = Math.min(Math.max(activeIndex, 0), restaurants.length - 1);
  const restaurant = restaurants[safeIndex];
  const voteState = voteSummary[safeIndex];
  const location = {
    lat: 30,
    lng: 30
  }

  if (!restaurant || !voteState || !location) {
    return null;
  }

  return (
    <section className="flex w-full flex-col items-center gap-4">
      {restaurants.length > 1 && (
        <div className="flex items-center justify-center gap-2">
          {restaurants.map((item, index) => (
            <span
              key={item.id}
              className={cn(
                "size-2 rounded-full",
                index === safeIndex ? "bg-[#1c1b1f]" : "bg-[#d1d5db]"
              )}
              aria-hidden="true"
            />
          ))}
        </div>
      )}

      <div className="w-full max-w-[390px] rounded-[20px] border border-[#e2e8f0] bg-white px-4 pb-4 pt-6">
        <RestaurantInfo
          location={location}
          name={restaurant.name}
          description={restaurant.description}
          phoneNumber={restaurant.phoneNumber}
        />

        <div className="mt-4 flex w-full items-center justify-end text-black">
          <RestaurantAction
            likeCount={voteState.likeCount}
            dislikeCount={voteState.dislikeCount}
            isLiked={voteState.myVote === "LIKE"}
            isDisliked={voteState.myVote === "DISLIKE"}
            onLike={() => onVote?.(restaurant.id, "LIKE")}
            onDislike={() => onVote?.(restaurant.id, "DISLIKE")}
          />
        </div>
      </div>

      <div className="w-full max-w-[390px]">
        <RestaurantPermissionAction
          isGroupLeader={permissions.canDecideRestaurant}
          canAdditionalAttend={permissions.canAttendAdditional}
          onConfirmDining={() => onDecideRestaurant?.(restaurant.id)}
          onRetryRecommendation={() => onRerecommendRestaurant?.()}
          onAdditionalAttend={() => onAttendAdditional?.()}
        />
      </div>


    </section>
  );
}
