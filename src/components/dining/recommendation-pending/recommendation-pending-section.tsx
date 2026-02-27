"use client";

import { useDiningRecommendationStream } from "@/src/hooks/dining/use-dining-recommendation-stream";
import type { RecommendationStreamStatus } from "@/src/types/api/dining";
import { RecommendationPendingView } from "./recommendation-pending-view";
import type { RecommendationPendingViewState } from "./recommendation-pending-view.types";

interface RecommendationPendingSectionProps {
  groupId: string;
  diningId: string;
}

interface RecommendationPendingViewStateInput {
  streamStatus: RecommendationStreamStatus;
  messages: ReturnType<typeof useDiningRecommendationStream>["messages"];
  errorMessage: string | null;
}

interface NormalizedRecommendationState {
  normalizedStatus: RecommendationStreamStatus;
  normalizedErrorMessage: string | null;
}

function assertNever(value: never): never {
  throw new Error(`Unhandled stream status: ${String(value)}`);
}

function dedupeMessages(
  messages: RecommendationPendingViewStateInput["messages"]
): RecommendationPendingViewStateInput["messages"] {
  const seenIds = new Set<string>();

  return messages.filter((message) => {
    if (seenIds.has(message.eventId)) return false;
    seenIds.add(message.eventId);
    return true;
  });
}

function normalizeRecommendationState({
  streamStatus,
  messages,
  errorMessage,
}: RecommendationPendingViewStateInput): NormalizedRecommendationState {
  const hasMessages = messages.length > 0;
  const hasError = Boolean(errorMessage);

  if (streamStatus === "error") {
    return {
      normalizedStatus: "error",
      normalizedErrorMessage: errorMessage,
    };
  }

  if (streamStatus === "streaming") {
    return {
      normalizedStatus: "streaming",
      normalizedErrorMessage: null,
    };
  }

  if (streamStatus === "disconnected") {
    if (hasMessages && !hasError) {
      return {
        normalizedStatus: "streaming",
        normalizedErrorMessage: null,
      };
    }

    return {
      normalizedStatus: "connecting",
      normalizedErrorMessage: null,
    };
  }

  if (streamStatus === "connected" && hasMessages) {
    return {
      normalizedStatus: "streaming",
      normalizedErrorMessage: null,
    };
  }

  switch (streamStatus) {
    case "idle":
    case "connecting":
    case "connected":
      return {
        normalizedStatus: streamStatus,
        normalizedErrorMessage: null,
      };

    default:
      return assertNever(streamStatus);
  }
}

function toRecommendationPendingViewState({
  streamStatus,
  messages,
  errorMessage,
}: RecommendationPendingViewStateInput): RecommendationPendingViewState {
  const dedupedMessages = dedupeMessages(messages);
  const {
    normalizedStatus,
    normalizedErrorMessage,
  } = normalizeRecommendationState({
    streamStatus,
    messages: dedupedMessages,
    errorMessage,
  });

  switch (normalizedStatus) {
    case "idle":
    case "connecting":
    case "connected":
    case "disconnected":
      return {
        type: normalizedStatus,
      };

    case "streaming":
      return {
        type: "streaming",
        messages: dedupedMessages,
      };

    case "error":
      return {
        type: "error",
        errorMessage: normalizedErrorMessage,
      };

    default:
      return assertNever(normalizedStatus);
  }
}

export function RecommendationPendingSection({
  groupId,
  diningId,
}: RecommendationPendingSectionProps) {
  const { streamStatus, messages, errorMessage } = useDiningRecommendationStream({
    groupId,
    diningId,
    enabled: Boolean(groupId && diningId),
  });

  const viewState = toRecommendationPendingViewState({
    streamStatus,
    messages,
    errorMessage,
  });

  return <RecommendationPendingView viewState={viewState} />;
}
