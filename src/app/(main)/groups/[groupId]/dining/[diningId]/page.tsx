import { QueryClient } from "@tanstack/react-query";
import { AttendanceVotingSection } from "@/src/components/dining";
import { DiningCommonSection } from "@/src/components/dining/dining-common";
import { DiningErrorToast } from "@/src/components/dining/dining-error-toast";
import { RestaurantVotingSection } from "@/src/components/dining/restaurant-vote";
import {
  getDiningAttendanceVote,
  getDiningCommon,
  getDiningRestaurantVote,
} from "@/src/lib/actions/dining";
import type {
  AttendanceVoteResponse,
  DiningCommonResponse,
  DiningStatus,
  RestaurantVoteResponse,
} from "@/src/types/api/dining";
import { DINIG_DETAIL_RESTAURANT_VOTING } from "@/src/constants/mock-data/dining-detail";

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
  const queryClient = new QueryClient();

  const errorMessages: string[] = [];
  const fallbackErrorMessage = "요청 중 오류가 발생했습니다.";

  let diningCommon: DiningCommonResponse | null = null;

  try {
    diningCommon = await queryClient.fetchQuery({
      queryKey: ["dining-common", groupId, diningId],
      queryFn: () => getDiningCommon({ groupId, diningId }),
    });
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
      restaurantVotes = await queryClient.fetchQuery({
        queryKey: ["dining-restaurant-vote", groupId, diningId],
        queryFn: () => getDiningRestaurantVote({ groupId, diningId }),
      });
    } catch (error) {
      errorMessages.push(
        error instanceof Error ? error.message : fallbackErrorMessage
      );
    }
  }

  let attendanceVote: AttendanceVoteResponse | null = null;

  if (diningStatus === "ATTENDANCE_VOTING") {
    try {
      attendanceVote = await queryClient.fetchQuery({
        queryKey: ["dining-attendance-vote", groupId, diningId],
        queryFn: () => getDiningAttendanceVote({ groupId, diningId }),
      });
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
    </DiningCommonSection>
  );
}
