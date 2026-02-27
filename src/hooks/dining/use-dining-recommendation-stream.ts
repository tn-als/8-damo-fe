"use client";

import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRecommendationConnection } from "./use-recommendation-connection";
import { useStreamExpireTimer } from "./use-stream-expire-timer";
import { useStreamMessages } from "./use-stream-messages";
import type {
  RecommendationStreamMessage,
  RecommendationStreamStatus,
} from "@/src/types/api/dining";

interface UseDiningRecommendationStreamParams {
  groupId: string;
  diningId: string;
  enabled: boolean;
}

interface UseDiningRecommendationStreamResult {
  streamStatus: RecommendationStreamStatus;
  messages: RecommendationStreamMessage[];
  errorMessage: string | null;
  retryCount: number;
  isExpired: boolean;
  reconnect: () => void;
}

export function useDiningRecommendationStream({
  groupId,
  diningId,
  enabled,
}: UseDiningRecommendationStreamParams): UseDiningRecommendationStreamResult {
  const queryClient = useQueryClient();

  const { messages, appendMessage, resetMessages } = useStreamMessages();

  const syncDiningQueries = useCallback(async () => {
    await Promise.all([
      queryClient.invalidateQueries({
        queryKey: ["dining", "detail", groupId, diningId, "common"],
      }),
      queryClient.invalidateQueries({
        queryKey: ["dining", "detail", groupId, diningId, "restaurant-vote"],
      }),
    ]);
  }, [diningId, groupId, queryClient]);

  const {
    streamStatus,
    errorMessage,
    retryCount,
    reconnectSeed,
    reconnect: reconnectConnection,
  } = useRecommendationConnection({
    groupId,
    diningId,
    enabled,
    onMessage: appendMessage,
    onDone: () => {
      void syncDiningQueries();
    },
  });

  const { isExpired, resetExpireTimer } = useStreamExpireTimer({
    enabled,
    resetKey: `${groupId}:${diningId}:${reconnectSeed}`,
  });

  const reconnect = useCallback(() => {
    resetMessages();
    resetExpireTimer();
    reconnectConnection();
  }, [reconnectConnection, resetExpireTimer, resetMessages]);

  return {
    streamStatus,
    messages,
    errorMessage,
    retryCount,
    isExpired,
    reconnect,
  };
}
