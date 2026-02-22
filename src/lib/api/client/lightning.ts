import { bffPost, type ApiResponse } from "./index";

export interface CreateLightningRequest {
  restaurantId: string; 
  maxParticipants: number;
  description: string; 
  lightningDate: string;
}

export async function createLightning(
  data: CreateLightningRequest
): Promise<ApiResponse<number>>{
  return bffPost<number>("/lightning", data)
}
