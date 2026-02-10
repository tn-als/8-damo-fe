import "server-only";
import { serverGet } from "./index";
import type { LightningItem } from "@/src/types/lightning";
import { formatLightningDateLabel } from "@/src/lib/utils";

interface MyLightningAvailableResponse {
  lightningId: string;
  restaurantName: string;
  description: string;
  maxParticipants: number;
  participantsCount: number;
  lightningStatus: string;
  lightningData: string;
}

export async function getMyLightnings(): Promise<LightningItem[]> {
  const data = await serverGet<MyLightningAvailableResponse[]>(
    "/api/v1/users/me/lightning/available"
  );

  return data.map((lightning) => ({
    id: lightning.lightningId,
    restaurantName: lightning.restaurantName,
    description: lightning.description,
    maxParticipants: lightning.maxParticipants,
    participantsCount: lightning.participantsCount,
    dateLabel: formatLightningDateLabel(lightning.lightningData),
  }));
}
