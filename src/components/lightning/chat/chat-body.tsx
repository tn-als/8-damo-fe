"use client";

import { useCallback, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useLightningChatSocket } from "@/src/hooks/lightning/chat/use-lightning-chat-socket";
import { useLightningChatInfinite } from "@/src/hooks/lightning/chat/use-lightning-chat-infinite";
import { useUserStore } from "@/src/stores/user-store";
import { appendChatMessageToCache } from "@/src/lib/lightning/chat/append-chat-message-to-cache";
import { ChatMessageList } from "./chat-message-list";
import { ChatInput } from "./chat-input";

interface Props {
  lightningId: string;
}

export function ChatBody({ lightningId }: Props) {
  const queryClient = useQueryClient();
  const currentUserId = useUserStore((state) => state.user?.userId ?? null);
  const isDevEnv = process.env.NEXT_PUBLIC_APP_ENV === "dev";

  const {
    data,
    isPending,
    messages,
    readBoundary,
    initialScrollMode,
    anchorCursor,
    hasPreviousPage,
    hasNextPage,
    isFetchingPreviousPage,
    isFetchingNextPage,
    fetchPreviousPage,
    fetchNextPage,
    markInitialized,
    recoverMissedMessages,
    error: queryError,
  } = useLightningChatInfinite({ lightningId });

  const hasInitialPage = Boolean(data?.pages?.[0]);
  const initialLastReadMessageId =
    readBoundary?.lastReadMessageId != null
      ? String(readBoundary.lastReadMessageId)
      : null;
  const lastChatMessageId =
    messages.length > 0
      ? String(messages[messages.length - 1].messageId)
      : initialLastReadMessageId;

  const { error: socketError, sendMessage } = useLightningChatSocket({
    lightningId,
    enabled: hasInitialPage,
  });

  useEffect(() => {
    const handleFocus = () => {
      void recoverMissedMessages();
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [recoverMissedMessages]);

  // Scenario 2: 버스트 메시지 (10개 / 1초) 시뮬레이션
  const simulateBurst = useCallback((count = 10) => {
    Array.from({ length: count }).forEach((_, i) => {
      setTimeout(() => {
        const fakeId = `burst-${Date.now()}-${i}`;
        if (process.env.NEXT_PUBLIC_APP_ENV !== "prod") {
          performance.mark(`chat:ws-received:${fakeId}`);
        }
        appendChatMessageToCache(queryClient, lightningId, {
          messageId: fakeId,
          senderId: "9999",
          lightningId,
          chatType: "TEXT",
          content: `[버스트 ${i + 1}/${count}] 성능 테스트 메시지`,
          createdAt: new Date().toISOString(),
          senderNickname: "테스터",
          senderImagePath: null,
          unreadCount: 0,
        });
      }, i * 100);
    });
  }, [queryClient, lightningId]); // perf

  const errorMessage =
    socketError ?? (queryError instanceof Error ? queryError.message : null);

  if (isPending && !data) {
    return (
      <section className="flex-1 bg-card px-4 py-4">
        <div className="space-y-3">
          <div className="h-4 w-24 animate-pulse rounded bg-[#f1e7dc]" />
          <div className="h-10 w-3/4 animate-pulse rounded-2xl bg-[#f1e7dc]" />
          <div className="h-10 w-1/2 animate-pulse rounded-2xl bg-[#f1e7dc]" />
          <div className="h-10 w-4/5 animate-pulse rounded-2xl bg-[#f1e7dc]" />
        </div>
      </section>
    );
  }

  return (
    <>
      <ChatMessageList
        messages={messages}
        currentUserId={currentUserId}
        readBoundary={readBoundary}
        initialScrollMode={initialScrollMode}
        anchorCursor={anchorCursor}
        hasPreviousPage={Boolean(hasPreviousPage)}
        hasNextPage={Boolean(hasNextPage)}
        isFetchingPreviousPage={isFetchingPreviousPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchPreviousPage={fetchPreviousPage}
        fetchNextPage={fetchNextPage}
        markInitialized={markInitialized}
        lastChatMessageId={lastChatMessageId}
      />

      {errorMessage && (
        <p className="px-4 pt-2 text-xs text-destructive">
          {errorMessage}
        </p>
      )}

      {isDevEnv && (
        <button
          onClick={() => simulateBurst(10)}
          className="mx-4 mb-1 rounded bg-yellow-200 px-3 py-1 text-xs text-yellow-900"
        >
          [DEV - perf] 시나리오 2: 버스트 10개 전송
        </button>
      )}

      <ChatInput onSend={sendMessage} />
    </>
  );
}
