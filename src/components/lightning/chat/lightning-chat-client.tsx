"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLightningChatSocket } from "@/src/hooks/use-lightning-chat-socket";
import { useUserStore } from "@/src/stores/user-store";
import { IconButton } from "@/src/components/ui/icon-button";
import { ChatMessageList } from "./chat-message-list";
import { ChatInput } from "./chat-input";

interface Props {
  lightningId: string;
  accessToken: string;
}

export function LightningChatClient({
  lightningId,
  accessToken,
}: Props) {
  const router = useRouter();
  const currentUserId = useUserStore((state) => state.user?.userId ?? null);
  const {
    state,
    error,
    messages,
    sendMessage,
  } = useLightningChatSocket({
    lightningId,
    accessToken,
  });

  return (
    <div className="mx-auto flex h-full w-full min-w-[320px] max-w-[430px] flex-col bg-background">
      <header className="flex h-14 items-center border-b border-border bg-background px-2 sm:h-16 sm:px-3">
        <IconButton
          icon={ArrowLeft}
          aria-label="뒤로 가기"
          onClick={() => router.back()}
          className="text-foreground"
        />
        <h1 className="ml-1 flex-1 text-lg font-semibold leading-7 text-foreground">
          번개 채팅
        </h1>
        <p className="pr-2 text-xs text-muted-foreground">
          {state === "connected" ? "연결됨" : "연결 중"}
        </p>
      </header>

      <ChatMessageList
        messages={messages}
        currentUserId={currentUserId}
      />

      {error && (
        <p className="px-4 pt-2 text-xs text-destructive">
          {error}
        </p>
      )}

      <ChatInput
        onSend={sendMessage}
        disabled={state !== "connected"}
      />
    </div>
  );
}
