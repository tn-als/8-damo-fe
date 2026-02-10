export type LightningTab = "recruiting" | "joined";

export interface LightningItem {
  id: number;
  description: string;
  restaurantName: string;
  dateLabel: string;
  currentParticipants: number;
  maxParticipants: number;
  joined: boolean;
}
