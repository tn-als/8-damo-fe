"use server";

import { getAccessToken } from "../cookie";
import type { ApiNestedResponse, ApiResponse } from "@/src/types/api/common";
import type { RestaurantVoteResponse } from "@/src/types/api/dining";

export interface CreateDiningRequest {
  diningDate?: string;
  voteDueDate?: string;
  budget?: number;
}

interface CreateDiningResponse {
  success: boolean;
  diningId?: number;
  error?: string;
}

export async function createDining(
  groupId: string,
  data: CreateDiningRequest
): Promise<CreateDiningResponse> {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!API_BASE_URL) {
    console.error("[createDining] Missing API base URL env");
    return { success: false, error: "API base URL이 설정되지 않았습니다." };
  }

  const accessToken = await getAccessToken();

  if (!accessToken) {
    return { success: false, error: "인증 토큰이 없습니다." };
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/groups/${groupId}/dining`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      }
    );

    const payload = await response.json().catch(() => null);

    if (!response.ok) {
      return {
        success: false,
        error: payload?.errorMessage || `요청 실패 (${response.status})`,
      };
    }

    const diningId = payload?.data;

    if (diningId === null || diningId === undefined) {
      return { success: false, error: "diningId를 확인할 수 없습니다." };
    }

    const parsedDiningId = Number(diningId);

    if (!Number.isFinite(parsedDiningId)) {
      return { success: false, error: "diningId를 확인할 수 없습니다." };
    }

    return { success: true, diningId: parsedDiningId };
  } catch (error) {
    console.error("[createDining] Request failed", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "요청 중 오류가 발생했습니다.",
    };
  }
}


interface VoteRestaurantRequest {
  groupId: string;
  diningId: string;
  recommendRestaurantsId: number;
  restaurantVoteStatus: "LIKE" | "DISLIKE";
}

interface VoteAttendanceRequest {
  groupId: string;
  diningId: string;
  attendanceVoteStatus: "ATTEND" | "NON_ATTEND";
}

interface RefreshRecommendRestaurantsRequest {
  groupId: string;
  diningId: string;
}

type VoteRestaurantData =
  | {
      restaurantVoteStatus?: string;
      likeCount?: number;
      dislikeCount?: number;
    }
  | string;

interface VoteRestaurantResult {
  success: boolean;
  data?: VoteRestaurantData;
  error?: string;
}

interface VoteAttendanceResult {
  success: boolean;
  error?: string;
}

interface RefreshRecommendRestaurantsResult {
  success: boolean;
  data?: RestaurantVoteResponse[];
  error?: string;
}

function isApiResponse<T>(value: unknown): value is ApiResponse<T> {
  return (
    typeof value === "object" &&
    value !== null &&
    "data" in value
  );
}

const extractApiData = <T>(
  payload: ApiResponse<T> | ApiNestedResponse<T> | null
): T | null => {
  if (!payload) {
    return null;
  }

  const data = payload.data;

  if (isApiResponse<T>(data)) {
    return data.data ?? null;
  }

  return data ?? null;
};






export async function voteRestaurant({
  groupId,
  diningId,
  recommendRestaurantsId,
  restaurantVoteStatus,
}: VoteRestaurantRequest): Promise<VoteRestaurantResult> {
  const API_BASE_URL =
    process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!API_BASE_URL) {
    console.error("[voteRestaurant] Missing API base URL env");
    return { success: false, error: "API base URL이 설정되지 않았습니다." };
  }

  const accessToken = await getAccessToken();

  if (!accessToken) {
    return { success: false, error: "인증 토큰이 없습니다." };
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/groups/${groupId}/dining/${diningId}/restaurants-vote/${recommendRestaurantsId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ restaurantVoteStatus }),
      }
    );

    const payload = (await response.json().catch(() => null)) as
      | ApiResponse<VoteRestaurantData>
      | ApiNestedResponse<VoteRestaurantData>
      | null;

    if (!response.ok) {
      return {
        success: false,
        error: payload?.errorMessage || `요청 실패 (${response.status})`,
      };
    }

    const data = extractApiData(payload);

    return { success: true, data: data ?? undefined };
  } catch (error) {
    console.error("[voteRestaurant] Request failed", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "요청 중 오류가 발생했습니다.",
    };
  }
}

export async function voteAttendance({
  groupId,
  diningId,
  attendanceVoteStatus,
}: VoteAttendanceRequest): Promise<VoteAttendanceResult> {
  const API_BASE_URL =
    process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!API_BASE_URL) {
    console.error("[voteAttendance] Missing API base URL env");
    return { success: false, error: "API base URL이 설정되지 않았습니다." };
  }

  const accessToken = await getAccessToken();

  if (!accessToken) {
    return { success: false, error: "인증 토큰이 없습니다." };
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/groups/${groupId}/dining/${diningId}/attendance-vote`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ attendanceVoteStatus }),
      }
    );

    const payload = (await response.json().catch(() => null)) as
      | ApiResponse<unknown>
      | ApiNestedResponse<unknown>
      | null;

    if (!response.ok) {
      return {
        success: false,
        error: payload?.errorMessage || `요청 실패 (${response.status})`,
      };
    }

    return { success: true };
  } catch (error) {
    console.error("[voteAttendance] Request failed", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "요청 중 오류가 발생했습니다.",
    };
  }
}

export async function refreshRecommendRestaurants({
  groupId,
  diningId,
}: RefreshRecommendRestaurantsRequest): Promise<RefreshRecommendRestaurantsResult> {
  const API_BASE_URL =
    process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!API_BASE_URL) {
    console.error("[refreshRecommendRestaurants] Missing API base URL env");
    return { success: false, error: "API base URL이 설정되지 않았습니다." };
  }

  const accessToken = await getAccessToken();

  if (!accessToken) {
    return { success: false, error: "인증 토큰이 없습니다." };
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/groups/${groupId}/dining/${diningId}/recommend-restaurant/refresh`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const payload = (await response.json().catch(() => null)) as
      | ApiResponse<RestaurantVoteResponse[]>
      | ApiNestedResponse<RestaurantVoteResponse[]>
      | null;

    if (!response.ok) {
      return {
        success: false,
        error: payload?.errorMessage || `요청 실패 (${response.status})`,
      };
    }

    const data = extractApiData(payload);

    if (!data) {
      return {
        success: false,
        error: "재추천 결과를 확인할 수 없습니다.",
      };
    }

    return { success: true, data };
  } catch (error) {
    console.error("[refreshRecommendRestaurants] Request failed", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "요청 중 오류가 발생했습니다.",
    };
  }
}
