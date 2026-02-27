"use client";

import { useCallback, useEffect, useReducer, useState } from "react";
import { connectDiningRecommendationStream } from "@/src/lib/api/client/dining-stream";
import { useStableEvent } from "@/src/hooks/use-stable-event";
import { recommendationStreamReducer } from "./use-dining-recommendation-stream.reducer";
import type {
  RecommendationStreamMessage,
  RecommendationStreamStatus,
} from "@/src/types/api/dining";

const WATCHDOG_TIMEOUT_MS = 15_000;
const WATCHDOG_CHECK_INTERVAL_MS = 3_000;

interface UseRecommendationConnectionParams {
  groupId: string;
  diningId: string;
  enabled: boolean;
  onMessage: (message: RecommendationStreamMessage) => void;
  onDone: () => void;
}

interface UseRecommendationConnectionResult {
  streamStatus: RecommendationStreamStatus;
  errorMessage: string | null;
  retryCount: number;
  reconnectSeed: number;
  reconnect: () => void;
}

export function useRecommendationConnection({
  groupId,
  diningId,
  enabled,
  onMessage,
  onDone,
}: UseRecommendationConnectionParams): UseRecommendationConnectionResult {
  const stableOnMessage = useStableEvent(onMessage);
  const stableOnDone = useStableEvent(onDone);

  const [streamStatus, dispatch] = useReducer(recommendationStreamReducer, "idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [reconnectSeed, setReconnectSeed] = useState(0);

  const reconnect = useCallback(() => {
    setErrorMessage(null);
    setReconnectSeed((previous) => previous + 1);
  }, []);

  useEffect(() => {
    if (!enabled) {
      dispatch({ type: "CLOSE" });
      return;
    }

    let alive = true;
    let done = false;
    let watchdogTimer: ReturnType<typeof setInterval> | null = null;
    let lastActivityAt = 0;
    let closeStream: (() => void) | null = null;

    const clearWatchdogTimer = () => {
      if (!watchdogTimer) return;
      clearInterval(watchdogTimer);
      watchdogTimer = null;
    };

    const markActivity = () => {
      lastActivityAt = Date.now();
    };

    const stopStream = () => {
      if (!closeStream) return;
      closeStream();
      closeStream = null;
    };

    const startWatchdog = () => {
      clearWatchdogTimer();
      watchdogTimer = setInterval(() => {
        if (!alive || done) return;
        if (lastActivityAt === 0) return;
        if (Date.now() - lastActivityAt < WATCHDOG_TIMEOUT_MS) return;

        done = true;
        dispatch({ type: "ERROR" });
        setErrorMessage("스트림 응답이 지연되어 연결을 종료했습니다.");
        clearWatchdogTimer();
        stopStream();
      }, WATCHDOG_CHECK_INTERVAL_MS);
    };

    const start = () => {
      if (!alive || done) return;

      dispatch({ type: "CONNECT" });
      stopStream();
      markActivity();
      startWatchdog();

      closeStream = connectDiningRecommendationStream({
        groupId,
        diningId,
        onOpen: () => {
          if (!alive || done) return;

          setErrorMessage(null);
          markActivity();
          startWatchdog();
          dispatch({ type: "OPEN" });
        },
        onHeartbeat: () => {
          if (!alive || done) return;
          markActivity();
        },
        onMessage: (message) => {
          if (!alive || done) return;

          markActivity();
          stableOnMessage(message);
          dispatch({ type: "MESSAGE" });
        },
        onDone: () => {
          if (!alive || done) return;

          done = true;
          clearWatchdogTimer();
          stopStream();
          dispatch({ type: "CLOSE" });
          stableOnDone();
        },
        onError: (message) => {
          if (!alive || done) return;

          done = true;
          dispatch({ type: "ERROR" });
          setErrorMessage(message);
          clearWatchdogTimer();
          stopStream();
        },
      });
    };

    start();

    return () => {
      alive = false;
      done = true;
      clearWatchdogTimer();
      stopStream();
      dispatch({ type: "CLOSE" });
    };
  }, [enabled, diningId, groupId, reconnectSeed, stableOnDone, stableOnMessage]);

  return {
    streamStatus,
    errorMessage,
    retryCount: 0,
    reconnectSeed,
    reconnect,
  };
}
