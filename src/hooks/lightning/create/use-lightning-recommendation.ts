import { useMutation } from "@tanstack/react-query";
import { getLightningRecommendation } from "@/src/lib/api/client/lightning";

export function useLightningRecommendation() {
  return useMutation({
    mutationFn: ({
      longitude,
      latitude,
      signal,
    }: {
      longitude: number;
      latitude: number;
      signal?: AbortSignal;
    }) =>
      getLightningRecommendation(String(longitude), String(latitude), {
        signal,
      }),
  });
}