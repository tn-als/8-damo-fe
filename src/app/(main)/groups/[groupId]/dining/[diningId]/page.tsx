"use client";

import { AttendanceVotingSection, ConfirmedSection } from "@/src/components/dining";
import { DiningCommonSection } from "@/src/components/dining/common";
import { DiningErrorToast } from "@/src/components/dining/dining-error-toast";
import { RestaurantVotingSection } from "@/src/components/dining/restaurant-vote";
import {
  useDiningCommon,
  useDiningRestaurantVote,
  useDiningAttendanceVote,
  useDiningConfirmed,
} from "@/src/hooks/use-dining";
import { useParams } from "next/navigation";
import type { DiningStatus } from "@/src/types/api/dining";

export default function DiningDetailPage() {
  const params = useParams<{ groupId: string; diningId: string }>();
  const groupId = params?.groupId ?? "";
  const diningId = params?.diningId ?? "";

  const errorMessages: string[] = [];
  const fallbackErrorMessage = "요청 중 오류가 발생했습니다.";

  const {
    data: diningCommon,
    isLoading: isLoadingCommon,
    error: errorCommon,
  } = useDiningCommon(groupId, diningId);

  if (errorCommon) {
    errorMessages.push(
      errorCommon instanceof Error
        ? errorCommon.message
        : fallbackErrorMessage
    );
  }

  if (isLoadingCommon) {
    return null;
  }

  if (!diningCommon) {
    return (
      <>
        {errorMessages.length > 0 && (
          <DiningErrorToast messages={errorMessages} />
        )}
      </>
    );
  }

  const diningStatus: DiningStatus = diningCommon.diningStatus;

  const {
    data: restaurantVotes,
    error: errorRestaurantVote,
  } = useDiningRestaurantVote(groupId, diningId);

  if (errorRestaurantVote && diningStatus === "RESTAURANT_VOTING") {
    errorMessages.push(
      errorRestaurantVote instanceof Error
        ? errorRestaurantVote.message
        : fallbackErrorMessage
    );
  }

  const {
    data: attendanceVote,
    error: errorAttendanceVote,
  } = useDiningAttendanceVote(groupId, diningId);

  if (errorAttendanceVote && diningStatus === "ATTENDANCE_VOTING") {
    errorMessages.push(
      errorAttendanceVote instanceof Error
        ? errorAttendanceVote.message
        : fallbackErrorMessage
    );
  }

  const {
    data: confirmedRestaurant,
    error: errorConfirmed,
  } = useDiningConfirmed(groupId, diningId);

  if (errorConfirmed && diningStatus === "CONFIRMED") {
    errorMessages.push(
      errorConfirmed instanceof Error
        ? errorConfirmed.message
        : fallbackErrorMessage
    );
  }

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
      {diningStatus === "CONFIRMED" && (
        <ConfirmedSection
          restaurant={confirmedRestaurant}
          fallbackDescription="다시 시도해주세요"
        />
      )}
    </DiningCommonSection>
  );
}
