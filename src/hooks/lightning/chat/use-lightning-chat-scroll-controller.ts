"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import type { Virtualizer } from "@tanstack/react-virtual";
import type { ChatInitialScrollMode } from "@/src/types/api/lightning/chat";
import type { ChatBroadcastMessage } from "@/src/types/chat";

export function useChatScrollController({
  scrollRoot,
  messagesLength,
  initialScrollMode,
  anchorCursor,
  hasPreviousPage,
  hasNextPage,
  isFetchingPreviousPage,
  isFetchingNextPage,
  fetchPreviousPage,
  fetchNextPage,
  markInitialized,
  topInView,
  bottomInView,
  lastChatMessageId,
  virtualizer,
  messages,
}: {
  scrollRoot: HTMLDivElement | null;
  messagesLength: number;
  initialScrollMode: ChatInitialScrollMode;
  anchorCursor: string | null;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  isFetchingPreviousPage: boolean;
  isFetchingNextPage: boolean;
  fetchPreviousPage: () => Promise<unknown>;
  fetchNextPage: () => Promise<unknown>;
  markInitialized: () => void;
  topInView: boolean;
  bottomInView: boolean;
  lastChatMessageId: string | null;
  virtualizer: Virtualizer<HTMLDivElement, Element> | null;
  messages: ChatBroadcastMessage[];
}) {
  const initialLoadDoneRef = useRef(false);
  const userScrolledRef = useRef(false);
  const topFetchTriggeredRef = useRef(false);
  const centerPreloadRef = useRef(false);
  const handledChatMessageIdRef = useRef<string | null>(null);

  const [isBottomOutOfView, setIsBottomOutOfView] = useState(false);

  useEffect(() => {
    if (!scrollRoot) return;

    const updateAutoFollowState = () => {
      const distanceFromBottom =
        scrollRoot.scrollHeight - scrollRoot.clientHeight - scrollRoot.scrollTop;
      const isNearBottom = distanceFromBottom <= BOTTOM_FOLLOW_THRESHOLD_PX;
      shouldAutoFollowRef.current = isNearBottom;
      setIsBottomOutOfView(!isNearBottom);
    };

    const handleScroll = () => {
      userScrolledRef.current = true;
      updateAutoFollowState();
    };

    scrollRoot.addEventListener("scroll", handleScroll, { passive: true });
    updateAutoFollowState();

    return () => {
      scrollRoot.removeEventListener("scroll", handleScroll);
    };
  }, [scrollRoot]);

  const scrollToBottom = useCallback(() => {
    if (!scrollRoot) return;
    scrollRoot.scrollTo({ top: scrollRoot.scrollHeight });
    setIsBottomOutOfView(false);
  }, [scrollRoot]);

  const scrollToAnchor = useCallback(
    (root: HTMLDivElement): number | null => {
      if (!virtualizer || !anchorCursor) return null;
      const anchorIndex = messages.findIndex(
        (m) => String(m.messageId) === anchorCursor
      );
      if (anchorIndex === -1) return null;

      virtualizer.scrollToIndex(anchorIndex, { align: "start" });

      requestAnimationFrame(() => {
        root.scrollBy({ top: -root.clientHeight * 0.25 });
      });

      return anchorIndex;
    },
    [anchorCursor, messages, virtualizer]
  );

  useEffect(() => {
    if (!scrollRoot || initialLoadDoneRef.current) return;
    if (messagesLength === 0) return;

    initialLoadDoneRef.current = true;

    requestAnimationFrame(() => {
      switch (initialScrollMode) {
        case "TOP":
          scrollRoot.scrollTo({ top: 0 });
          break;

        case "BOTTOM":
          scrollRoot.scrollTo({ top: scrollRoot.scrollHeight });
          break;

        case "CENTER": {
          const result = scrollToAnchor(scrollRoot);
          if (result === null) {
            scrollRoot.scrollTo({ top: 0 });
            centerPreloadRef.current = true;
          }
          break;
        }
      }

      markInitialized();
      setIsBottomOutOfView(!bottomInView);
    });
  }, [
    scrollRoot,
    messagesLength,
    initialScrollMode,
    bottomInView,
    markInitialized,
    scrollToAnchor,
  ]);

  useEffect(() => {
    if (!scrollRoot) return;
    if (!initialLoadDoneRef.current) return;
    if (!userScrolledRef.current && !centerPreloadRef.current) return;

    if (!topInView) return;
    if (!hasPreviousPage) return;
    if (isFetchingPreviousPage) return;
    if (topFetchTriggeredRef.current) return;

    topFetchTriggeredRef.current = true;
    const beforeHeight = scrollRoot.scrollHeight;

    void fetchPreviousPage().then(() => {
      requestAnimationFrame(() => {
        if (centerPreloadRef.current && !userScrolledRef.current) {
          const newTarget = scrollToAnchor(scrollRoot);
          if (newTarget !== null) {
            centerPreloadRef.current = false;
          }
        } else {
          const delta = scrollRoot.scrollHeight - beforeHeight;
          scrollRoot.scrollTo({ top: scrollRoot.scrollTop + delta });
          centerPreloadRef.current = false;
        }

        topFetchTriggeredRef.current = false;
      });
    });
  }, [
    scrollRoot,
    topInView,
    hasPreviousPage,
    isFetchingPreviousPage,
    fetchPreviousPage,
    scrollToAnchor,
  ]);

  useEffect(() => {
    if (!initialLoadDoneRef.current) return;
    if (!userScrolledRef.current) return;

    if (!bottomInView || !hasNextPage) return;
    if (isFetchingNextPage) return;

    void fetchNextPage();
  }, [bottomInView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    if (!initialLoadDoneRef.current) return;

    const frame = requestAnimationFrame(() => {
      setIsBottomOutOfView(!bottomInView);
    });

    return () => cancelAnimationFrame(frame);
  }, [bottomInView]);

  useEffect(() => {
    if (!scrollRoot) return;
    if (!initialLoadDoneRef.current) return;
    if (!lastChatMessageId) return;

    if (handledChatMessageIdRef.current === lastChatMessageId) return;
    handledChatMessageIdRef.current = lastChatMessageId;

    if (!bottomInView) return;

    requestAnimationFrame(() => {
      scrollRoot.scrollTo({ top: scrollRoot.scrollHeight });
    });
  }, [bottomInView, lastChatMessageId, scrollRoot]);

  return {
    isBottomOutOfView,
    scrollToBottom,
  };
}
