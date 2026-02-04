import { Button } from "@/src/components/ui/button";

interface RestaurantPermissionActionProps {
  isGroupLeader: boolean;
  canAdditionalAttend: boolean;
  onConfirmDining: () => void;
  onRetryRecommendation: () => void;
  onAdditionalAttend: () => void;
  isRetryingRecommendation?: boolean;
}

export function RestaurantPermissionAction({
  isGroupLeader,
  canAdditionalAttend,
  onConfirmDining,
  onRetryRecommendation,
  onAdditionalAttend,
  isRetryingRecommendation = false,
}: RestaurantPermissionActionProps) {
  return (
    <div className="flex w-full flex-col gap-2.5">
      {isGroupLeader && (
        <>
          <Button type="button" onClick={onConfirmDining} className="h-12 w-full sm:h-14">
            회식 확정하기
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={onRetryRecommendation}
            className="h-12 w-full sm:h-14"
            disabled={isRetryingRecommendation}
          >
            {isRetryingRecommendation ? "추천 다시 받는 중..." : "추천 다시 받기"}
          </Button>
        </>
      )}
      {canAdditionalAttend && (
        <Button
          type="button"
          variant="secondary"
          onClick={onAdditionalAttend}
          className="h-12 w-full sm:h-14"
        >
          추가 참석하기
        </Button>
      )}
    </div>
  );
}
