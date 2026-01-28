"use client";

import { Button } from "@/src/components/ui/button";
import { Phone, ThumbsDown, ThumbsUp } from "lucide-react";
import { Restaurant, RestaurantVoteSummary } from "@/src/types/api/dining";

type ReviewStatus = "INCOMPLETED" | "COMPLETED";

interface CompleteSectionProps {
  restaurant: Restaurant;
  voteSummary: RestaurantVoteSummary;
  reviewStatus?: ReviewStatus;
  onReview?: () => void;
  isSubmitting?: boolean;
}

export function CompleteSection({
  restaurant,
  voteSummary,
  reviewStatus = "INCOMPLETED",
  onReview,
  isSubmitting = false,
}: CompleteSectionProps) {
  const isCompleted = reviewStatus === "COMPLETED";

  return (
    <section className="flex w-full flex-col items-center gap-4">
      <div className="w-full max-w-[370px] rounded-[8px] border border-[#e2e8f0] bg-white px-4 pb-4 pt-6">
        <div className="relative h-40 w-full overflow-hidden rounded-[12px] bg-[#edf2f7]">
          <span className="absolute left-1/2 top-1/2 h-px w-[140%] -translate-x-1/2 -translate-y-1/2 rotate-[12deg] bg-black/50" />
          <span className="absolute left-1/2 top-1/2 h-px w-[140%] -translate-x-1/2 -translate-y-1/2 rotate-[-12deg] bg-black/50" />
        </div>

        <div className="relative mt-4 flex flex-col gap-1 pr-24">
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
          <span className="absolute right-0 top-2 inline-flex items-center rounded-[27px] border border-[#a09cab] bg-black px-4 py-2 text-[16px] font-medium leading-[22px] text-white">
            장소 확정
          </span>
        </div>

        <div className="mt-4 flex w-full items-center justify-end gap-6 text-black">
          <div className="flex items-center gap-2 text-[16px] font-medium leading-[22px]">
            <ThumbsUp className="size-5" />
            <span>{voteSummary.likeCount}</span>
          </div>
          <div className="flex items-center gap-2 text-[16px] font-medium leading-[22px]">
            <ThumbsDown className="size-5" />
            <span>{voteSummary.dislikeCount}</span>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[370px]">
        <Button
          type="button"
          onClick={onReview}
          disabled={isCompleted || isSubmitting}
          className="h-[50px] w-full rounded-[12px] border border-[#d9d9d9] bg-white text-[16px] font-semibold leading-[22px] tracking-[0.2px] text-[#1c1b1f]"
        >
          {isCompleted ? "리뷰 작성 완료" : "리뷰하기"}
        </Button>
      </div>
    </section>
  );
}
