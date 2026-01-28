import { QueryClient } from "@tanstack/react-query";
import { DiningCommonSection } from "@/src/components/dining/dining-common";
import { RestaurantVotingSection } from "@/src/components/dining/restaurant-vote";
import { getDiningCommon, getDiningRestaurantVote } from "@/src/lib/actions/dining";
import type { DiningStatus } from "@/src/types/api/dining";

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

  const diningCommon = await queryClient.fetchQuery({
    queryKey: ["dining-common", groupId, diningId],
    queryFn: () => getDiningCommon({ groupId, diningId }),
  });

  const diningStatus: DiningStatus = diningCommon.diningStatus;

  const restaurantVotes =
    diningStatus === "RESTAURANT_VOTING"
      ? await queryClient.fetchQuery({
          queryKey: ["dining-restaurant-vote", groupId, diningId],
          queryFn: () => getDiningRestaurantVote({ groupId, diningId }),
        })
      : null;
    
  return (
    <DiningCommonSection
      diningDate={diningCommon.diningDate}
      diningStatus={diningStatus}
      diningParticipants={diningCommon.diningParticipants}
      isGroupLeader={diningCommon.isGroupLeader}
    >
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
