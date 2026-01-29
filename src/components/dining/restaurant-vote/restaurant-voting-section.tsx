"use client"
import type { RestaurantVoteResponse } from "@/src/types/api/dining";
import { useParams } from "next/navigation";
import { RestaurantCard } from "./restaurant-card";
import { RestaurantVotingCarousel } from "./restaurant-voting-carousel";
import { RestaurantVoteFallback } from "./restaurant-vote-fallback";
import { RestaurantPermissionAction } from "./restaurant-permission-action";
import { toast } from "@/src/components/ui/sonner";
import { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { refreshRecommendRestaurants } from "@/src/lib/actions/dining";

interface RestaurantVotingSectionProps {
  restaurants: RestaurantVoteResponse[];
  isGroupLeader: boolean;
  canAdditionalAttend?: boolean;
  onConfirmDining?: (restaurantId: number) => void;
  onRetryRecommendation?: () => void;
  onAdditionalAttend?: () => void;
}

export function RestaurantVotingSection({
  restaurants,
  isGroupLeader,
  canAdditionalAttend = false,
  onConfirmDining,
  onRetryRecommendation,
  onAdditionalAttend,
}: RestaurantVotingSectionProps) {
  const params = useParams<{ groupId?: string | string[]; diningId?: string | string[] }>();
  const resolveParam = (value?: string | string[]) =>
    Array.isArray(value) ? value[0] : value;
  const groupId = resolveParam(params?.groupId);
  const diningId = resolveParam(params?.diningId);
  const [currentRestaurants, setCurrentRestaurants] =
    useState<RestaurantVoteResponse[]>(restaurants);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRetryingRecommendation, setIsRetryingRecommendation] = useState(false);
  const activeRestaurantId = useMemo(() => {
    if (!currentRestaurants.length) {
      return null;
    }

    const clampedIndex = Math.min(
      Math.max(activeIndex, 0),
      currentRestaurants.length - 1
    );
    return currentRestaurants[clampedIndex].recommendRestaurantsId;
  }, [activeIndex, currentRestaurants]);

  useEffect(() => {
    setCurrentRestaurants(restaurants);
    setActiveIndex(0);
  }, [restaurants]);

  if (!currentRestaurants.length) {
    return <RestaurantVoteFallback />;
  }

  const handleConfirmDining = (restaurantId: number) => {
    onConfirmDining?.(restaurantId);
  };

  const handleRetryRecommendation = async () => {
    if (!isGroupLeader) {
      toast.error("그룹장만 재추천 요청이 가능합니다.");
      return;
    }

    if (!groupId || !diningId) {
      toast.error("경로 정보를 확인할 수 없습니다.");
      return;
    }

    if (isRetryingRecommendation) {
      return;
    }

    setIsRetryingRecommendation(true);

    const result = await refreshRecommendRestaurants({ groupId, diningId });

    setIsRetryingRecommendation(false);

    if (!result.success || !result.data) {
      toast.error(result.error ?? "재추천 요청에 실패했습니다.");
      return;
    }

    if (!result.data.length) {
      toast.error("새 추천 결과가 없습니다.");
      return;
    }

    setCurrentRestaurants(result.data);
    setActiveIndex(0);
    onRetryRecommendation?.();
  };
  
  const handleAdditionalAttend = () => {
    onAdditionalAttend?.();
  };

  const handleConfirmClick = () => {
    setIsDialogOpen(true);
  };

  const handleConfirmSubmit = async () => {
    if (!groupId || !diningId) {
      toast.error("경로 정보를 확인할 수 없습니다.");
      return;
    }

    setIsSubmitting(true);

    const response = await fetch(
      `/api/groups/${groupId}/dining/${diningId}/recommend-restaurants/${activeRestaurantId}/confirmed`,
      {
        method: "PATCH",
      }
    );
    const payload = await response.json().catch(() => null);
    const errorMessage =
      payload?.errorMessage ??
      payload?.data?.errorMessage ??
      "회식 장소 확정에 실패했습니다.";

    setIsSubmitting(false);
    setIsDialogOpen(false);

    if (!response.ok) {
      toast.error(errorMessage);
      return;
    }

    toast.success("회식 장소가 확정되었습니다.");
    if (activeRestaurantId !== null) {
      handleConfirmDining(activeRestaurantId);
    }
  };

  return (
    <section className="flex w-full flex-col items-center gap-4">
      <RestaurantVotingCarousel onIndexChange={setActiveIndex}>
        {currentRestaurants.map((restaurant) => (
          <div
            key={restaurant.recommendRestaurantsId}
            className="flex w-full flex-col items-center gap-4"
          >
            <RestaurantCard restaurant={restaurant} />
          </div>
        ))}
      </RestaurantVotingCarousel>
      <div className="w-full px-5">
        <RestaurantPermissionAction
          isGroupLeader={isGroupLeader}
          canAdditionalAttend={canAdditionalAttend}
          onConfirmDining={handleConfirmClick}
          onRetryRecommendation={handleRetryRecommendation}
          onAdditionalAttend={handleAdditionalAttend}
          isRetryingRecommendation={isRetryingRecommendation}
        />
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>회식 장소를 확정할까요?</DialogTitle>
            <DialogDescription>
              확정 후에는 다른 식당으로 변경할 수 없습니다.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              className="flex-1"
              disabled={isSubmitting}
            >
              취소
            </Button>
            <Button
              type="button"
              onClick={handleConfirmSubmit}
              className="flex-1 bg-[#ff8d28] text-white hover:bg-[#ff8d28]/90"
              disabled={isSubmitting}
            >
              확정
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
