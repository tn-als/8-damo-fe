import { useMutation } from "@tanstack/react-query";
import { getLightningRecommendation } from "@/src/lib/api/client/lightning";

export function useLightningRecommendation() {
  return useMutation({
    mutationFn: ({
      longitude,
      latitude,
    }: {
      longitude: number;
      latitude: number;
    }) =>
      getLightningRecommendation(
        String(longitude),
        String(latitude)
      ),
  });
}