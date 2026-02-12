"use client";

import { useLightningChatSocket } from "@/src/hooks/use-lightning-chat-socket";
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
    <>
      <div className="border-b p-3 text-sm">
        <p>연결 상태: {state}</p>
        {error && (
          <p className="text-red-500 mt-1">
            {error}
          </p>
        )}
      </div>

      <ChatMessageList messages={messages} />
      <ChatInput onSend={sendMessage} />
    </>
  );
}
