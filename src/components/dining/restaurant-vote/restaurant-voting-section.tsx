"use client"
import type { RestaurantVoteResponse } from "@/src/types/api/dining";
import { useParams } from "next/navigation";
import { RestaurantCard } from "./restaurant-card";
import { RestaurantVotingCarousel } from "./restaurant-voting-carousel";
import { RestaurantVoteFallback } from "./restaurant-vote-fallback";
import { RestaurantPermissionAction } from "./restaurant-permission-action";
import { confirmRestaurant } from "@/src/lib/actions/dining";
import { toast } from "@/src/components/ui/sonner";
import { useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";

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
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!restaurants.length) {
    return <RestaurantVoteFallback />;
  }

  const handleConfirmDining = (restaurantId: number) => {
    onConfirmDining?.(restaurantId);
  };
  const handleRetryRecommendation = () => {
    onRetryRecommendation?.();
  };
  const handleAdditionalAttend = () => {
    onAdditionalAttend?.();
  };

  const activeRestaurantId = useMemo(() => {
    const clampedIndex = Math.min(
      Math.max(activeIndex, 0),
      restaurants.length - 1
    );
    return restaurants[clampedIndex].recommendRestaurantsId;
  }, [activeIndex, restaurants]);

  const handleConfirmClick = () => {
    setIsDialogOpen(true);
  };

  const handleConfirmSubmit = async () => {
    if (!groupId || !diningId) {
      toast.error("경로 정보를 확인할 수 없습니다.");
      return;
    }

    setIsSubmitting(true);

    const result = await confirmRestaurant({
      groupId,
      diningId,
      recommendRestaurantsId: activeRestaurantId,
    });

    setIsSubmitting(false);
    setIsDialogOpen(false);

    if (!result.success) {
      toast.error(result.error || "회식 장소 확정에 실패했습니다.");
      return;
    }

    toast.success("회식 장소가 확정되었습니다.");
    handleConfirmDining(activeRestaurantId);
  };

  return (
    <section className="flex w-full flex-col items-center gap-4">
      <RestaurantVotingCarousel onIndexChange={setActiveIndex}>
        {restaurants.map((restaurant) => (
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
