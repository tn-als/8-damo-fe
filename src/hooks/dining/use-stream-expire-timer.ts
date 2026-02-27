"use client";

import { useCallback, useEffect, useState } from "react";

const DEFAULT_STREAM_MAX_DURATION_MS = 180_000;

interface UseStreamExpireTimerParams {
  enabled: boolean;
  resetKey: string;
  maxDurationMs?: number;
}

interface UseStreamExpireTimerResult {
  isExpired: boolean;
  resetExpireTimer: () => void;
}

export function useStreamExpireTimer({
  enabled,
  resetKey,
  maxDurationMs = DEFAULT_STREAM_MAX_DURATION_MS,
}: UseStreamExpireTimerParams): UseStreamExpireTimerResult {
  const [isExpired, setIsExpired] = useState(false);

  const resetExpireTimer = useCallback(() => {
    setIsExpired(false);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const timer = setTimeout(() => {
      setIsExpired(true);
    }, maxDurationMs);

    return () => {
      clearTimeout(timer);
    };
  }, [enabled, maxDurationMs, resetKey]);

  return {
    isExpired,
    resetExpireTimer,
  };
}

