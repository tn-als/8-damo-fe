import {
  AttendanceVotingSection,
  ConfirmedSection,
  RecommendationPendingSection,
} from "@/src/components/dining";
import { DiningCommonSection } from "@/src/components/dining/common";
import { DiningErrorToast } from "@/src/components/dining/dining-error-toast";
import { RestaurantVotingSection } from "@/src/components/dining/restaurant-vote";
import {
  getDiningAttendanceVote,
  getDiningConfirmed,
  getDiningCommon,
  getDiningRestaurantVote,
} from "@/src/lib/actions/dining";
import type {
  AttendanceVoteResponse,
  ConfirmedRestaurantResponse,
  DiningCommonResponse,
  DiningStatus,
  RestaurantVoteResponse,
} from "@/src/types/api/dining";

interface DiningDetailPageProps {
  params: Promise<{
    groupId: string;
    diningId: string;
  }>;
}

export default async function DiningDetailPage({
  params,
}: DiningDetailPageProps) {
  const { groupId, diningId } = await params;

  const errorMessages: string[] = [];
  const fallbackErrorMessage = "요청 중 오류가 발생했습니다.";

  let diningCommon: DiningCommonResponse | null = null;

  try {
    diningCommon = await getDiningCommon({ groupId, diningId });
  } catch (error) {
    errorMessages.push(
      error instanceof Error ? error.message : fallbackErrorMessage
    );
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

  let restaurantVotes: RestaurantVoteResponse[] | null = null;

  if (diningStatus === "RESTAURANT_VOTING") {
    try {
      restaurantVotes = await getDiningRestaurantVote({ groupId, diningId });
    } catch (error) {
      errorMessages.push(
        error instanceof Error ? error.message : fallbackErrorMessage
      );
    }
  }

  let attendanceVote: AttendanceVoteResponse | null = null;

  if (diningStatus === "ATTENDANCE_VOTING") {
    try {
      attendanceVote = await getDiningAttendanceVote({ groupId, diningId });
    } catch (error) {
      errorMessages.push(
        error instanceof Error ? error.message : fallbackErrorMessage
      );
    }
  }

  let confirmedRestaurant: ConfirmedRestaurantResponse | null = null;

  if (diningStatus === "CONFIRMED") {
    try {
      confirmedRestaurant = await getDiningConfirmed({ groupId, diningId });
    } catch (error) {
      errorMessages.push(
        error instanceof Error ? error.message : fallbackErrorMessage
      );
    }
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
