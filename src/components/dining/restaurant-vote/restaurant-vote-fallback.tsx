import { EmptyState } from "@/src/components/ui/empty-state";
import { Utensils } from "lucide-react";

export function RestaurantVoteFallback() {
  return (
    <EmptyState
      icon={Utensils}
      title="추천 식당 준비 중"
      description="식당을 고민하고 있어요."
    />
  );
}
