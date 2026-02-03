"use client";

import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  AttendanceVotingSection,
  ConfirmedSection,
  RecommendationPendingSection,
  RestaurantVotingSection,
} from "@/src/components/dining";
import { DiningCommonSection } from "@/src/components/dining/common";
import { DiningErrorToast } from "@/src/components/dining/dining-error-toast";
import type {
  AttendanceVoteResponse,
  ConfirmedRestaurantResponse,
  DiningCommonResponse,
  DiningStatus,
  RestaurantVoteResponse,
} from "@/src/types/api/dining";

const POLLING_INTERVAL_MS = 5_000;

interface DiningDetailClientProps {
  groupId: string;
  diningId: string;
  initialDiningCommon: DiningCommonResponse;
}

export function DiningDetailClient({
  groupId,
  diningId,
  initialDiningCommon,
}: DiningDetailClientProps) {
  const [attendanceVote, setAttendanceVote] =
    useState<AttendanceVoteResponse | null>(null);
  const [restaurantVotes, setRestaurantVotes] =
    useState<RestaurantVoteResponse[] | null>(null);
  const [confirmedRestaurant, setConfirmedRestaurant] =
    useState<ConfirmedRestaurantResponse | null>(null);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const lastStatusRef = useRef<DiningStatus>(initialDiningCommon.diningStatus);
  const initializedRef = useRef(false);

  const fetchJson = async <T,>(url: string): Promise<T> => {
    const response = await fetch(url, { cache: "no-store" });
    const payload = (await response.json().catch(() => null)) as
      | { data?: T | { data?: T }; errorMessage?: string }
      | T
      | null;

    if (!response.ok) {
      const message =
        payload && typeof payload === "object" && "errorMessage" in payload
          ? payload.errorMessage
          : "요청 중 오류가 발생했습니다.";
      throw new Error(message || "요청 중 오류가 발생했습니다.");
    }

    if (payload && typeof payload === "object" && "data" in payload) {
      if (
        payload.data &&
        typeof payload.data === "object" &&
        "data" in payload.data
      ) {
        return (payload.data.data ?? payload.data) as T;
      }

      return (payload.data ?? payload) as T;
    }

    return payload as T;
  };

  const {
    data: diningCommon,
    error: diningCommonError,
  } = useQuery({
    queryKey: ["dining-common", groupId, diningId],
    queryFn: () =>
      fetchJson<DiningCommonResponse>(
        `/api/groups/${groupId}/dining/${diningId}/common`
      ),
    initialData: initialDiningCommon,
    refetchInterval: (query) =>
      query.state.data?.diningStatus === "CONFIRMED"
        ? false
        : POLLING_INTERVAL_MS,
    refetchOnWindowFocus: false,
  });

  const pushError = (error: unknown) => {
    const message =
      error instanceof Error ? error.message : "요청 중 오류가 발생했습니다.";
    setErrorMessages((prev) => [...prev, message]);
  };

  const resetSectionData = () => {
    setAttendanceVote(null);
    setRestaurantVotes(null);
    setConfirmedRestaurant(null);
  };

  const fetchSectionData = async (status: DiningStatus) => {
    resetSectionData();

    if (status === "RECOMMENDATION_PENDING") {
      return;
    }

    if (status === "ATTENDANCE_VOTING") {
      try {
        const data = await fetchJson<AttendanceVoteResponse>(
          `/api/groups/${groupId}/dining/${diningId}/attendance-vote`
        );
        setAttendanceVote(data);
      } catch (error) {
        pushError(error);
      }
    }

    if (status === "RESTAURANT_VOTING") {
      try {
        const data = await fetchJson<RestaurantVoteResponse[]>(
          `/api/groups/${groupId}/dining/${diningId}/restaurant-vote`
        );
        setRestaurantVotes(data);
      } catch (error) {
        pushError(error);
      }
    }

    if (status === "CONFIRMED") {
      try {
        const data = await fetchJson<ConfirmedRestaurantResponse>(
          `/api/groups/${groupId}/dining/${diningId}/confirmed`
        );
        setConfirmedRestaurant(data);
      } catch (error) {
        pushError(error);
      }
    }
  };

  useEffect(() => {
    if (diningCommonError) {
      pushError(diningCommonError);
    }
  }, [diningCommonError]);

  useEffect(() => {
    if (!diningCommon) return;

    const nextStatus = diningCommon.diningStatus;
    const isInitial = !initializedRef.current;
    const isChanged = nextStatus !== lastStatusRef.current;

    if (isInitial || isChanged) {
      lastStatusRef.current = nextStatus;
      initializedRef.current = true;
      void fetchSectionData(nextStatus);
    }
  }, [diningCommon?.diningStatus]);

  if (!diningCommon) {
    return (
      <>
        {errorMessages.length > 0 && (
          <DiningErrorToast messages={errorMessages} />
        )}
      </>
    );
  }

  const diningStatus = diningCommon.diningStatus;

  return (
    <DiningCommonSection
      diningDate={diningCommon.diningDate}
      diningStatus={diningStatus}
      diningParticipants={diningCommon.diningParticipants}
      isGroupLeader={diningCommon.isGroupLeader}
    >
      {errorMessages.length > 0 && (
        <DiningErrorToast messages={errorMessages} />
      )}
      {diningStatus === "ATTENDANCE_VOTING" && attendanceVote && (
        <AttendanceVotingSection
          progress={{
            totalCount: attendanceVote.totalGroupMemberCount,
            voteCount: attendanceVote.completedVoteCount,
          }}
          diningDate={diningCommon.diningDate}
          myVoteStatus={attendanceVote.attendanceVoteStatus}
        />
      )}
      {diningStatus === "RESTAURANT_VOTING" && restaurantVotes && (
        <RestaurantVotingSection
          restaurants={restaurantVotes}
          isGroupLeader={diningCommon.isGroupLeader}
          canAdditionalAttend={false}
        />
      )}
      {diningStatus === "RECOMMENDATION_PENDING" && (
        <RecommendationPendingSection />
      )}
      {diningStatus === "CONFIRMED" && (
        <ConfirmedSection
          restaurant={confirmedRestaurant}
          fallbackDescription="다시 시도해주세요"
        />
      )}
    </DiningCommonSection>
  );
}
