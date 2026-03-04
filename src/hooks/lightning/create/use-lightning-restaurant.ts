"use client";

import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useGeolocation } from "./use-geo-location";
import { useLightningRecommendation } from "./use-lightning-recommendation";
import type { Restaurant } from "@/src/types/lightning";

export function useLightningRestaurant() {
  const { permission, requestLocation } = useGeolocation();
  const recommendation = useLightningRecommendation();

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);

  const requestRestaurant = useCallback(async () => {
    try {
      const location = await requestLocation();

      const res = await recommendation.mutateAsync({
        longitude: location.longitude,
        latitude: location.latitude,
      });

      setRestaurant(res.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(
          err.response?.data?.errorMessage ??
            "식당 정보를 불러오지 못했습니다."
        );
      }
    }
  }, [requestLocation, recommendation]);

  return {
    permission,
    restaurant,
    isLoadingRestaurant: recommendation.isPending,
    requestRestaurant,
  };
}