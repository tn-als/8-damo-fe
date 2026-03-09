import type { DiningStatus } from "@/src/types/api/dining";

export type DiningState =
  | {
      type: "attendance-voting";
    }
  | {
      type: "recommendation-pending";
    }
  | {
      type: "restaurant-voting";
    }
  | {
      type: "confirmed";
    }
  | {
      type: "receipt-verifying";
    }
  | {
      type: "receipt-approved";
    }
  | {
      type: "receipt-rejected";
    }
  | {
      type: "completed";
    };

export type DiningAction =
  | {
      type: "ATTENDANCE_VOTING_COMPLETED";
    }
  | {
      type: "RECOMMENDATION_READY";
    }
  | {
      type: "CONFIRM_RESTAURANT";
    }
  | {
      type: "RETRY_RECOMMENDATION";
    }
  | {
      type: "RECEIPT_UPLOAD_CONFIRMED";
    }
  | {
      type: "RECEIPT_APPROVED";
    }
  | {
      type: "RECEIPT_REJECTED";
    }
  | {
      type: "BACK_TO_CONFIRMED";
    }
  | {
      type: "DINING_COMPLETED";
    }

function assertNever(value: never): never {
  throw new Error(`Unhandled case: ${String(value)}`);
}

export function mapDiningStatusToState(diningStatus: DiningStatus): DiningState {
  switch (diningStatus) {
    case "ATTENDANCE_VOTING":
      return { type: "attendance-voting" };
    case "RESTAURANT_RECOMMENDATION_PENDING":
      return { type: "recommendation-pending" };
    case "RESTAURANT_VOTING":
      return { type: "restaurant-voting" };
    case "CONFIRMED":
      return { type: "confirmed" };
    case "RECEIPT_VERIFYING":
      return { type: "receipt-verifying" };
    case "RECEIPT_APPROVED":
      return { type: "receipt-approved" };
    case "RECEIPT_REJECTED":
      return { type: "receipt-rejected" };
    case "COMPLETE":
      return { type: "completed" };
    default:
      return assertNever(diningStatus);
  }
}

export function getDiningStateStep(state: DiningState): number {
  switch (state.type) {
    case "attendance-voting":
      return 0;
    case "recommendation-pending":
      return 1;
    case "restaurant-voting":
      return 2;
    case "confirmed":
      return 3;
    case "receipt-verifying":
      return 4;
    case "receipt-approved":
      return 5;
    case "receipt-rejected":
      return 5;
    case "completed":
      return 6;
    default:
      return assertNever(state);
  }
}

export function diningDetailReducer(
  state: DiningState,
  action: DiningAction
): DiningState {
  switch (state.type) {
    case "attendance-voting": {
      if (action.type === "ATTENDANCE_VOTING_COMPLETED") {
        return { type: "recommendation-pending" };
      }
      return state;
    }

    case "recommendation-pending": {
      if (action.type === "RECOMMENDATION_READY") {
        return { type: "restaurant-voting" };
      }
      return state;
    }

    case "restaurant-voting": {
      if (action.type === "CONFIRM_RESTAURANT") {
        return { type: "confirmed" };
      }

      if (action.type === "RETRY_RECOMMENDATION") {
        return { type: "recommendation-pending" };
      }

      return state;
    }

    case "confirmed": {
      if (action.type === "RECEIPT_UPLOAD_CONFIRMED") {
        return { type: "receipt-verifying" };
      }
      return state;
    }

    case "receipt-verifying": {
      if (action.type === "RECEIPT_APPROVED") {
        return { type: "receipt-approved" };
      }
      if (action.type === "RECEIPT_REJECTED") {
        return { type: "receipt-rejected" };
      }
      return state;
    }

    case "receipt-approved": {
      if (action.type === "DINING_COMPLETED") {
        return { type: "completed" };
      }
      return state;
    }

    case "receipt-rejected": {
      if (action.type === "BACK_TO_CONFIRMED") {
        return { type: "confirmed" };
      }
      return state;
    }

    case "completed": {
      return state;
    }

    default:
      return assertNever(state);
  }
}
