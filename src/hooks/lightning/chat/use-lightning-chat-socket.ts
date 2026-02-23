"use client";

import { useCallback, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { ChatMessageRequest } from "@/src/types/chat";
import { useChatRoomSubscription } from "@/src/lib/websocket/use-chat-room-subscription";
import { publishChatMessage } from "@/src/lib/lightning/chat/publish-chat-message";
import { useLightningChatMessageHandler } from "@/src/hooks/lightning/chat/use-lightning-chat-message-handler";

interface UseLightningChatSocketOptions {
  lightningId: string;
}

export function useLightningChatSocket({
  lightningId,
}: UseLightningChatSocketOptions) {
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);

  const onMessage = useLightningChatMessageHandler({
    lightningId,
    queryClient,
    setError,
  });

  useChatRoomSubscription(lightningId, onMessage);

  const sendMessage = useCallback(
    (content: string) => {
      const trimmed = content.trim();
      if (!trimmed) return;

      const body: ChatMessageRequest = {
        chatType: "TEXT",
        content: trimmed,
      };

      try {
        publishChatMessage(lightningId, body);
        setError(null);
      } catch {
        setError("연결 후 다시 시도해주세요.");
      }
    },
    [lightningId]
  );

  return { error, sendMessage };
}
