"use client";

import { useEffect, useRef } from "react";
import { ChatBroadcastMessage } from "@/src/types/chat";

interface Props {
  messages: ChatBroadcastMessage[];
  currentUserId: string | null;
}

const avatarDemo = "🤍";

function getSenderLabel(message: ChatBroadcastMessage, isMine: boolean): string {
  if (isMine) return "나";
  const { senderId } = message;
  return `사용자 ${senderId}`;
}

function formatChatTime(createdAt: string): string {
  const parsed = new Date(createdAt);
  if (Number.isNaN(parsed.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("ko-KR", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(parsed);
}

export function ChatMessageList({ messages, currentUserId }: Props) {
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages.length]);

  return (
    <section className="flex-1 overflow-y-auto bg-card px-4 py-4">
      {messages.length === 0 && (
        <div className="flex h-full items-center justify-center">
          <p className="text-sm text-muted-foreground">
            첫 메시지를 보내보세요
          </p>
        </div>
      )}

      {messages.length > 0 && (
        <ul className="space-y-4">
          {messages.map((message) => {
            const isMine = message.senderId === currentUserId;
            const timeText = formatChatTime(message.createdAt);
            const senderLabel = getSenderLabel(message, isMine);

            return (
              <li
                key={message.messageId}
                className={isMine ? "flex justify-end" : "flex items-start gap-2"}
              >
                {!isMine && (
                  <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-primary to-[#ff6b28] text-sm text-primary-foreground">
                    {avatarDemo}
                  </div>
                )}

                <div className="max-w-[78%] space-y-1">
                  {!isMine && (
                    <p className="px-1 text-xs text-muted-foreground">
                      {senderLabel}
                    </p>
                  )}

                  <p
                    className={
                      isMine
                        ? "break-words rounded-2xl rounded-br-md bg-primary px-4 py-2.5 text-base leading-6 text-primary-foreground"
                        : "break-words rounded-2xl rounded-bl-md bg-background px-4 py-2.5 text-base leading-6 text-foreground shadow-xs"
                    }
                  >
                    {message.content}
                  </p>

                  {timeText && (
                    <p
                      className={
                        isMine
                          ? "px-1 text-right text-xs text-muted-foreground"
                          : "px-1 text-xs text-muted-foreground"
                      }
                    >
                      {timeText}
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <div ref={endRef} />
    </section>
  );
}
