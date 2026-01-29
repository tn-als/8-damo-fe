import { ThumbsDown, ThumbsUp } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";

interface RestaurantActionProps {
  likeCount: number;
  dislikeCount: number;
  onLike: () => void;
  onDislike: () => void;
  disabled?: boolean;
  isLiked?: boolean;
  isDisliked?: boolean;
}

export function RestaurantAction({
  likeCount,
  dislikeCount,
  onLike,
  onDislike,
  disabled = false,
  isLiked = false,
  isDisliked = false,
}: RestaurantActionProps) {
  return (
    <div className="flex items-center gap-3">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onLike}
        disabled={disabled}
        aria-pressed={isLiked}
        className={cn(
          "flex items-center gap-1.5 px-2 text-[15px] font-medium leading-[22px]",
          isLiked && "bg-primary/10 text-primary"
        )}
      >
        <ThumbsUp
          className={cn("size-4", isLiked && "text-primary")}
          fill={isLiked ? "currentColor" : "none"}
          strokeWidth={isLiked ? 0 : 1.5}
        />
        <span>좋아요 {likeCount}</span>
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onDislike}
        disabled={disabled}
        aria-pressed={isDisliked}
        className={cn(
          "flex items-center gap-1.5 px-2 text-[15px] font-medium leading-[22px]",
          isDisliked && "bg-primary/10 text-primary"
        )}
      >
        <ThumbsDown
          className={cn("size-4", isDisliked && "text-primary")}
          fill={isDisliked ? "currentColor" : "none"}
          strokeWidth={isDisliked ? 0 : 1.5}
        />
        <span>싫어요 {dislikeCount}</span>
      </Button>
    </div>
  );
}
