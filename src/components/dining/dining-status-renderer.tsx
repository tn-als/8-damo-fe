import type { Dispatch } from "react";
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
import type { DiningAction, DiningState } from "./dining-detail.reducer";

interface DiningStatusRendererProps {
  groupId: string;
  diningId: string;
  diningCommon: DiningCommonResponse;
  diningState: DiningState;
  dispatch: Dispatch<DiningAction>;
}

export function DiningStatusRenderer({
  groupId,
  diningId,
  diningCommon,
  diningState,
  dispatch,
}: DiningStatusRendererProps) {
  switch (diningState.type) {
    case "attendance-voting":
      return (
        <AttendanceVotingContainer
          groupId={groupId}
          diningId={diningId}
          diningCommon={diningCommon}
          onVotingCompleted={() =>
            dispatch({ type: "ATTENDANCE_VOTING_COMPLETED" })
          }
        />
      );

    case "recommendation-pending":
      return (
        <RecommendationPendingSection
          groupId={groupId}
          diningId={diningId}
          onRecommendationReady={() =>
            dispatch({ type: "RECOMMENDATION_READY" })
          }
        />
      );

    case "restaurant-voting":
      return (
        <RestaurantVotingContainer
          groupId={groupId}
          diningId={diningId}
          diningCommon={diningCommon}
          onConfirmDining={() => dispatch({ type: "CONFIRM_RESTAURANT" })}
          onRetryRecommendation={() =>
            dispatch({ type: "RETRY_RECOMMENDATION" })
          }
        />
      );

    case "confirmed":
      return (
        <ConfirmedContainer
          groupId={groupId}
          diningId={diningId}
          diningCommon={diningCommon}
          onUploadReceipt={() =>
            dispatch({ type: "RECEIPT_UPLOAD_CONFIRMED" })
          }
        />
      );

    case "receipt-verifying":
      return (
        <ReceiptVerifyingSection
          groupId={groupId}
          diningId={diningId}
          diningStatus="RECEIPT_VERIFYING"
          onApproved={() => dispatch({ type: "RECEIPT_APPROVED" })}
          onRejected={() => dispatch({ type: "RECEIPT_REJECTED" })}
        />
      );

    case "receipt-approved":
      return (
        <ReceiptApprovedSection
          groupId={groupId}
          diningId={diningId}
        />
      );

    case "receipt-rejected":
      return <ReceiptRejectedSection />;

    case "completed":
      return <CompletedSection />;

    default:
      return null;
  }
}
