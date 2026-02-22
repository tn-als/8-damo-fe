"use client";

import { useQuery } from "@tanstack/react-query";
import {
  AttendanceVotingSection,
  ConfirmedSection,
  RecommendationPendingSection,
  RestaurantVotingSection,
} from "@/src/components/dining";
import { DiningCommonSection } from "@/src/components/dining/common";
import { DiningErrorToast } from "@/src/components/dining/dining-error-toast";
import type { DiningCommonResponse } from "@/src/types/api/dining";
import {
  getDiningAttendanceVote,
  getDiningCommon,
  getDiningConfirmed,
  getDiningRestaurantVote,
} from "@/src/lib/api/client/dining";

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
  const {
    data: diningCommon,
    error: diningCommonError,
  } = useQuery({
    queryKey: ["dining", "detail", groupId, diningId, "common"],
    queryFn: async () => {
      const response = await getDiningCommon({ groupId, diningId });
      return response.data;
    },
    initialData: initialDiningCommon,
    refetchInterval: (query) => {
      const status = query.state.data?.diningStatus;
      return status === "CONFIRMED" || status === "COMPLETE"
      ? false
      : POLLING_INTERVAL_MS
    },
    refetchOnWindowFocus: false,
  });

  const diningState = diningCommon.diningStatus;
  const isAttendanceVoting = diningState === "ATTENDANCE_VOTING";
  const isRecommendationPending = diningState === "RECOMMENDATION_PENDING";
  const isRestaurantVoting = diningState === "RESTAURANT_VOTING";
  const isConfirmed = diningState === "CONFIRMED";

  const { data: attendanceVote } = useQuery({
    queryKey: ["dining", "detail", groupId, diningId, "attendance-vote"],
    queryFn: async () => {
      const response = await getDiningAttendanceVote({ groupId, diningId });
      return response.data;
    },
    enabled: isAttendanceVoting,
    refetchInterval: isAttendanceVoting ? POLLING_INTERVAL_MS: false,
    refetchOnWindowFocus: false,
  });

  const { data: restaurantVotes } = useQuery({
    queryKey: ["dining", "detail", groupId, diningId, "restaurant-vote"],
    queryFn: async () => {
      const response = await getDiningRestaurantVote({ groupId, diningId });
      return response.data;
    },
    enabled: isRestaurantVoting,
    refetchInterval: isRestaurantVoting? POLLING_INTERVAL_MS: false,
    refetchOnWindowFocus: false,
  });

  const { data: confirmedRestaurant } = useQuery({
    queryKey: ["dining", "detail", groupId, diningId, "confirmed"],
    queryFn: async () => {
      const response = await getDiningConfirmed({ groupId, diningId });
      return response.data;
    },
    enabled: isConfirmed,
    refetchInterval: isConfirmed ? POLLING_INTERVAL_MS: false,
    refetchOnWindowFocus: false,
  });

  if (!diningCommon) {
    return (
      <>
        {diningCommonError && (
          <DiningErrorToast messages={[diningCommonError.message]} />
        )}
      </>
    );
  }

  return (
    <DiningCommonSection
      diningDate={diningCommon.diningDate}
      diningStatus={diningState}
      diningParticipants={diningCommon.diningParticipants}
      isGroupLeader={diningCommon.isGroupLeader}
    >
      {diningCommonError && (
        <DiningErrorToast messages={[diningCommonError.message]} />
      )}
      {isAttendanceVoting && attendanceVote && (
        <AttendanceVotingSection
          progress={{
            totalCount: attendanceVote.totalGroupMemberCount,
            voteCount: attendanceVote.completedVoteCount,
          }}
          diningDate={diningCommon.diningDate}
          myVoteStatus={attendanceVote.attendanceVoteStatus}
        />
      )}
      {isRestaurantVoting && restaurantVotes && (
        <RestaurantVotingSection
          restaurants={restaurantVotes}
          isGroupLeader={diningCommon.isGroupLeader}
          canAdditionalAttend={false}
        />
      )}
      {isRecommendationPending && (
        <RecommendationPendingSection />
      )}
      {isConfirmed && (
        <ConfirmedSection
          restaurant={confirmedRestaurant ?? null}
          fallbackDescription="다시 시도해주세요"
        />
      )}
    </DiningCommonSection>
  );
}
