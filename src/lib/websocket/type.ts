  import type { IMessage, StompSubscription } from "@stomp/stompjs";

  export type SubscriptionKey = "chat-list" | "chat-room";

  export type MessageHandler = (message: IMessage) => void;

  export interface SubscriptionDef {
    destination: string;
    handler: MessageHandler;
    sub?: StompSubscription;
    generation: number;
  }