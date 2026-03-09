import {
  AttendanceVotingContainer,
  ConfirmedContainer,
  RecommendationPendingSection,
  RestaurantVotingContainer,
} from "@/src/components/dining";
import { ReceiptVerifyingSection } from "@/src/components/dining/receipt-verifying/receipt-verifying-section";
import { ReceiptApprovedSection } from "@/src/components/dining/receipt-approved/receipt-approved-section";
import { ReceiptRejectedSection } from "@/src/components/dining/receipt-rejected/receipt-rejected-section";
import { CompletedSection } from "@/src/components/dining/completed/completed-section";
import { DiningCommonResponse } from "@/src/types/api/dining";

interface DiningStatusRendererProps {
  groupId: string;
  diningId: string;
  diningCommon: DiningCommonResponse;
}

export function DiningStatusRenderer({
  groupId,
  diningId,
  diningCommon,
}: DiningStatusRendererProps) {
  switch (diningCommon.diningStatus) {
    case "ATTENDANCE_VOTING":
      return (
        <AttendanceVotingContainer
          groupId={groupId}
          diningId={diningId}
          diningCommon={diningCommon}
        />
      );

    case "RESTAURANT_VOTING":
      return (
        <RestaurantVotingContainer
          groupId={groupId}
          diningId={diningId}
          diningCommon={diningCommon}
        />
      );

    case "CONFIRMED":
      return (
        <ConfirmedContainer
          groupId={groupId}
          diningId={diningId}
          diningCommon={diningCommon}
        />
      );

    case "RESTAURANT_RECOMMENDATION_PENDING":
      return (
        <RecommendationPendingSection
          groupId={groupId}
          diningId={diningId}
        />
      );

    case "RECEIPT_VERIFYING":
      return <ReceiptVerifyingSection />;

    case "RECEIPT_APPROVED":
      return (
        <ReceiptApprovedSection
          groupId={groupId}
          diningId={diningId}
        />
      );

    case "RECEIPT_REJECTED":
      return <ReceiptRejectedSection />;

    case "COMPLETE":
      return <CompletedSection />;

    default:
      return null;
  }
}
