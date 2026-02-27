"use client";

import { useCallback, useRef, useState } from "react";
import type { RecommendationStreamMessage } from "@/src/types/api/dining";

interface UseStreamMessagesResult {
  messages: RecommendationStreamMessage[];
  appendMessage: (message: RecommendationStreamMessage) => boolean;
  resetMessages: () => void;
}

export function useStreamMessages(): UseStreamMessagesResult {
  const [messages, setMessages] = useState<RecommendationStreamMessage[]>([]);
  const receivedIdsRef = useRef(new Set<string>());

  const appendMessage = useCallback((message: RecommendationStreamMessage) => {
    if (receivedIdsRef.current.has(message.eventId)) {
      return false;
    }

    receivedIdsRef.current.add(message.eventId);
    setMessages((previous) => [...previous, message]);
    return true;
  }, []);

  const resetMessages = useCallback(() => {
    receivedIdsRef.current.clear();
    setMessages([]);
  }, []);

  return {
    messages,
    appendMessage,
    resetMessages,
  };
}

