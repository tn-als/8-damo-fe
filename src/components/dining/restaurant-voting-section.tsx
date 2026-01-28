"use client";

import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";
import { Phone, ThumbsDown, ThumbsUp } from "lucide-react";
import { Restaurant, RestaurantVoteSummary } from "@/src/types/api/dining";
import { type RestaurantVoteOption } from "@/src/types/api/dining/enums";

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

  if (!restaurant || !voteState) {
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
        <div className="relative h-40 w-full overflow-hidden rounded-[12px] bg-[#edf2f7]">
          <span className="absolute left-1/2 top-1/2 h-px w-[140%] -translate-x-1/2 -translate-y-1/2 rotate-[12deg] bg-black/50" />
          <span className="absolute left-1/2 top-1/2 h-px w-[140%] -translate-x-1/2 -translate-y-1/2 rotate-[-12deg] bg-black/50" />
        </div>

        <div className="mt-4 flex flex-col gap-1">
          <p className="text-[17px] font-bold leading-[24px] text-[#4a5568]">
            {restaurant.name}
          </p>
          <div className="flex items-center gap-2 text-[16px] leading-[22px] text-[#718096]">
            <Phone className="size-5 text-[#808080]" />
            <span>{restaurant.phoneNumber}</span>
          </div>
          <p className="text-[16px] leading-[22px] text-[#718096]">
            {restaurant.description}
          </p>
        </div>

        <div className="mt-4 flex w-full items-center justify-end gap-6 text-black">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onVote?.(restaurant.id, "LIKE")}
            className="flex items-center gap-2 px-2 text-base font-medium leading-[22px]"
            aria-pressed={voteState.myVote === "LIKE"}
          >
            <ThumbsUp className="size-5" />
            <span>{voteState.likeCount}</span>
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onVote?.(restaurant.id, "DISLIKE")}
            className="flex items-center gap-2 px-2 text-base font-medium leading-[22px]"
            aria-pressed={voteState.myVote === "DISLIKE"}
          >
            <ThumbsDown className="size-5" />
            <span>{voteState.dislikeCount}</span>
          </Button>
        </div>
      </div>

      {permissions.canDecideRestaurant && (
        <div className="flex w-full max-w-[390px] flex-col gap-2">
          <Button
            type="button"
            variant="ghost"
            onClick={() => onDecideRestaurant?.(restaurant.id)}
            className="w-full rounded-[12px] border border-[#d9d9d9] bg-[#f2f2f7] px-5 py-[14px] text-base font-semibold leading-[22px] tracking-[0.2px] text-[#404040] hover:bg-[#e5e5ea]"
          >
            이 장소 확정하기
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={onRerecommendRestaurant}
            className="w-full rounded-[12px] border border-[#d9d9d9] bg-[#f2f2f7] px-5 py-[14px] text-base font-semibold leading-[22px] tracking-[0.2px] text-[#404040] hover:bg-[#e5e5ea]"
          >
            추천 다시 받기
          </Button>
        </div>
      )}

      {permissions.canAttendAdditional && (
        <div className="w-full max-w-[390px]">
          <Button
            type="button"
            variant="ghost"
            onClick={onAttendAdditional}
            className="w-full rounded-[12px] border border-[#d9d9d9] bg-[#f2f2f7] px-5 py-[14px] text-base font-semibold leading-[22px] tracking-[0.2px] text-[#404040] hover:bg-[#e5e5ea]"
          >
            추가 참석하기
          </Button>
        </div>
      )}
    </section>
  );
}
