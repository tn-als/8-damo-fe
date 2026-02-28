export interface RecommendationStreamMessage {
  eventId: string;
  userId: string;
  nickname: string;
  content: string;
  createdAt: string;
}

export interface RecommendationHistoryResponse {
  messages: RecommendationStreamMessage[];
}

export type RecommendationStreamStatus =
  | "idle"
  | "connecting"
  | "connected"
  | "streaming"
  | "error"
  | "disconnected";
