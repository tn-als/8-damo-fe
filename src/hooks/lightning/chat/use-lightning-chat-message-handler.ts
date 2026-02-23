"use client";

import { useCallback } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { IMessage } from "@stomp/stompjs";
import type { QueryClient } from "@tanstack/react-query";
import { appendChatMessageToCache } from "@/src/lib/lightning/chat/append-chat-message-to-cache";
import type {
  ChatBroadcastMessage,
  ChatBroadcastMessagePayload,
  WsEventMessage,
} from "@/src/types/chat";

interface UseLightningChatMessageHandlerOptions {
  lightningId: string;
  queryClient: QueryClient;
  setError: Dispatch<SetStateAction<string | null>>;
}

function normalizeSocketMessage(
  raw: Partial<ChatBroadcastMessagePayload>,
  lightningId: string
): ChatBroadcastMessage {
  const unreadCount = Number(raw.unreadCount);

  return {
    messageId: String(raw.messageId ?? Date.now()),
    senderId: String(raw.senderId ?? ""),
    lightningId: String(raw.lightningId ?? lightningId),
    chatType: raw.chatType ?? "TEXT",
    content: raw.content ?? "",
    createdAt: raw.createdAt ?? new Date().toISOString(),
    senderNickname: raw.senderNickname,
    unreadCount,
  };
}

export function useLightningChatMessageHandler({
  lightningId,
  queryClient,
  setError,
}: UseLightningChatMessageHandlerOptions) {
  return useCallback(
    (payload: IMessage) => {
      try {
        const parsed = JSON.parse(payload.body) as WsEventMessage;

        switch (parsed.type) {
          case "CHAT_MESSAGE": {
            console.log("[WS][CHAT_MESSAGE]", {
              lightningId: parsed.lightningId,
              payload: parsed.payload,
            });

            const incoming = normalizeSocketMessage(parsed.payload, lightningId);
            appendChatMessageToCache(queryClient, lightningId, incoming);
            setError(null);
            return;
          }
          case "UNREAD_UPDATE": {
            console.log("[WS][UNREAD_UPDATE]", {
              lightningId: parsed.lightningId,
              payload: parsed.payload,
            });
            setError(null);
            return;
          }
          default: {
            console.log("[WS][UNKNOWN_EVENT]", parsed);
            setError(null);
          }
        }
      } catch {
        setError("메시지를 읽지 못했습니다.");
      }
    },
    [lightningId, queryClient, setError]
  );
}
