"use client";
import {
  AttendanceVotingSection,
  ConfirmedSection,
  RecommendationPendingSection,
  RestaurantVotingSection,
} from "@/src/components/dining";
import { DiningCommonSection } from "@/src/components/dining/common";
import { DiningErrorToast } from "@/src/components/dining/dining-error-toast";
import type { DiningCommonResponse } from "@/src/types/api/dining";
import { useDiningCommon } from "@/src/hooks/dining/use-dining-common";
import { useDiningAttendanceVote } from "@/src/hooks/dining/use-dining-attendance-vote";
import { useDiningRestaurantVote } from "@/src/hooks/dining/use-dining-restaurant-vote";
import { useDiningConfirmed } from "@/src/hooks/dining/use-dining-confirmed";

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
  } = useDiningCommon(groupId, diningId, initialDiningCommon);

  const diningState = diningCommon.diningStatus;
  const isAttendanceVoting = diningState === "ATTENDANCE_VOTING";
  const isRecommendationPending = diningState === "RECOMMENDATION_PENDING";
  const isRestaurantVoting = diningState === "RESTAURANT_VOTING";
  const isConfirmed = diningState === "CONFIRMED";

  const { data: attendanceVote } = useDiningAttendanceVote(groupId, diningId, isAttendanceVoting);
  const { data: restaurantVotes } = useDiningRestaurantVote(groupId, diningId, isRestaurantVoting);
  const { data: confirmedRestaurant } = useDiningConfirmed(groupId, diningId, isConfirmed);

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
