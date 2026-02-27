import type {
  RecommendationStreamMessage,
  RecommendationStreamStatus,
} from "@/src/types/api/dining";

export type RecommendationPendingViewState =
  | {
      type: "idle" | "connecting" | "connected" | "disconnected";
    }
  | {
      type: "streaming";
      messages: RecommendationStreamMessage[];
    }
  | {
      type: "error";
      errorMessage: string | null;
    };

export interface RecommendationPendingStatusUi {
  label: string;
  description: string;
  panelKind: "waiting" | "streaming" | "error";
  tone: "normal" | "error";
}

export type RecommendationPendingStatusUiMap = Record<
  RecommendationStreamStatus,
  RecommendationPendingStatusUi
>;
