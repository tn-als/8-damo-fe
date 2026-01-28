import { Button } from "@/src/components/ui/button";

interface RestaurantPermissionActionProps {
  isGroupLeader: boolean;
  canAdditionalAttend: boolean;
  onConfirmDining: () => void;
  onRetryRecommendation: () => void;
  onAdditionalAttend: () => void;
}

export function RestaurantPermissionAction({
  isGroupLeader,
  canAdditionalAttend,
  onConfirmDining,
  onRetryRecommendation,
  onAdditionalAttend,
}: RestaurantPermissionActionProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      {isGroupLeader && (
        <>
          <Button type="button" onClick={onConfirmDining} className="w-full">
            회식 확정하기
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={onRetryRecommendation}
            className="w-full"
          >
            추천 다시 받기
          </Button>
        </>
      )}
      {canAdditionalAttend && (
        <Button
          type="button"
          variant="secondary"
          onClick={onAdditionalAttend}
          className="w-full"
        >
          추가 참석하기
        </Button>
      )}
    </div>
  );
}
