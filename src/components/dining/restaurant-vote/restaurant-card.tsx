import { RestaurantInfo } from "./restaurant-info";
import { RestaurantAction } from "./restaurant-action";
import { RestaurantPermissionAction } from "./restaurant-permission-action";
import type { RestaurantVoteResponse } from "@/src/types/api/dining";

interface RestaurantCardProps {
  restaurant: RestaurantVoteResponse;
  isGroupLeader: boolean;
  canAdditionalAttend?: boolean;
  onLike: () => void;
  onDislike: () => void;
  onConfirmDining: () => void;
  onRetryRecommendation: () => void;
  onAdditionalAttend: () => void;
}

export function RestaurantCard({
  restaurant,
  isGroupLeader,
  canAdditionalAttend = false,
  onLike,
  onDislike,
  onConfirmDining,
  onRetryRecommendation,
  onAdditionalAttend,
}: RestaurantCardProps) {
  const status = restaurant.restaurantVoteStatus;
  const isLiked = status === "LIKE" || status === "LIKED";
  const isDisliked = status === "DISLIKE" || status === "DISLIKED";

  const location = {
    lat: Number(restaurant.latitude),
    lng: Number(restaurant.longitude),
  };

  return (
    <div className="flex w-[320px] flex-col gap-4 sm:w-[360px] md:w-[375px] lg:w-[390px]">
      <div className="w-full rounded-[20px] border border-[#e2e8f0] bg-white px-4 pb-4 pt-6">
        <RestaurantInfo
          location={location}
          name={restaurant.restaurantsName}
          description={restaurant.reasoningDescription}
          phoneNumber={restaurant.phoneNumber}
        />

        <div className="mt-4 flex w-full items-center justify-end text-black">
          <RestaurantAction
            likeCount={restaurant.likeCount}
            dislikeCount={restaurant.dislikeCount}
            isLiked={isLiked}
            isDisliked={isDisliked}
            onLike={onLike}
            onDislike={onDislike}
          />
        </div>
      </div>

      <RestaurantPermissionAction
        isGroupLeader={isGroupLeader}
        canAdditionalAttend={canAdditionalAttend}
        onConfirmDining={onConfirmDining}
        onRetryRecommendation={onRetryRecommendation}
        onAdditionalAttend={onAdditionalAttend}
      />
    </div>
  );
}
