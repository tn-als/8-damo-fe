"use client";

import { useEffect, useRef, useState } from "react";
import { DiningSummaryCard } from "@/src/components/groups/dining-summary-card";
import { getGroupDiningSummaries } from "@/src/lib/actions/dining";
import type { DiningSummary } from "@/src/types/api/dining";

const POLLING_INTERVAL_MS = 3_000;
const POLLING_MAX_DURATION_MS = 180_000;

interface RecommendationPendingSectionProps {
  groupId: string;
}

export function RecommendationPendingSection({
  groupId,
}: RecommendationPendingSectionProps) {
  const [pendingDinings, setPendingDinings] = useState<DiningSummary[]>([]);
  const [isExpired, setIsExpired] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let isActive = true;

    const stopPolling = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    const clearExpiryTimer = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };

    const handleStop = () => {
      stopPolling();
      clearExpiryTimer();
    };

    const fetchPendingDinings = async (): Promise<boolean> => {
      const result = await getGroupDiningSummaries(
        groupId,
        "RECOMMENDATION_PENDING"
      );

      if (!isActive) return false;

      if (!result.success) {
        console.error(
          "[RecommendationPendingSection] Failed to load pending dinings",
          result.error
        );
        return false;
      }

      const nextDinings = result.data ?? [];

      if (nextDinings.length === 0) {
        setPendingDinings([]);
        handleStop();
        return false;
      }

      const hasNonPending = nextDinings.some(
        (dining) => dining.status !== "RECOMMENDATION_PENDING"
      );

      if (hasNonPending) {
        setPendingDinings([]);
        handleStop();
        return false;
      }

      setPendingDinings(nextDinings);
      return true;
    };

    const startPolling = () => {
      intervalRef.current = setInterval(fetchPendingDinings, POLLING_INTERVAL_MS);
      timeoutRef.current = setTimeout(() => {
        if (!isActive) return;
        setIsExpired(true);
        stopPolling();
      }, POLLING_MAX_DURATION_MS);
    };

    const init = async () => {
      const hasPending = await fetchPendingDinings();

      if (!isActive) return false;

      if (hasPending) {
        startPolling();
      }
    };

    init();

    return () => {
      isActive = false;
      stopPolling();
      clearExpiryTimer();
    };
  }, [groupId]);

  useEffect(() => {
    if (pendingDinings.length === 0) {
      setIsExpired(false);
    }
  }, [pendingDinings.length]);

  if (pendingDinings.length === 0) {
    return null;
  }

  return (
    <section className="flex flex-col gap-4 px-5 pt-4">
      <div className="rounded-xl bg-white px-4 py-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#333]">
          <span>식당을 추천하고 있습니다.</span>
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[#b88100] animate-pulse" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#b88100] animate-pulse [animation-delay:200ms]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#b88100] animate-pulse [animation-delay:400ms]" />
          </span>
        </div>
        <p className="mt-1 text-xs text-[#8e8e93]">
          {isExpired
            ? "추천이 예상보다 오래 걸리고 있습니다. 잠시 후 다시 시도해주세요."
            : "잠시만 기다려주세요."}
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {pendingDinings.map((dining) => (
          <DiningSummaryCard
            key={dining.diningId}
            date={dining.diningDate}
            attendeeCount={dining.diningParticipantsCount}
            status={dining.status}
            disabled
          />
        ))}
      </div>
    </section>
  );
}
