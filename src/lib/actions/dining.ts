"use server";

import { getAccessToken } from "../cookie";
import type { ApiNestedResponse, ApiResponse } from "@/src/types/api/common";
import type {
  AttendanceVoteResponse,
  DiningCommonResponse,
  DiningStatus,
  DiningSummary,
  RestaurantVoteResponse,
} from "@/src/types/api/dining";

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

interface GetGroupDiningSummariesResult {
  success: boolean;
  data?: DiningSummary[];
  error?: string;
}

export async function createDining(
  groupId: string,
  data: CreateDiningRequest
): Promise<CreateDiningResponse> {
  const API_BASE_URL =
    process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL;

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

export async function getGroupDiningSummaries(
  groupId: string,
  status: DiningStatus
): Promise<GetGroupDiningSummariesResult> {
  const API_BASE_URL =
    process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!API_BASE_URL) {
    console.error("[getGroupDiningSummaries] Missing API base URL env");
    return { success: false, error: "API base URL이 설정되지 않았습니다." };
  }

  const accessToken = await getAccessToken();

  if (!accessToken) {
    return { success: false, error: "인증 토큰이 없습니다." };
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/groups/${groupId}/dining?status=${encodeURIComponent(
        status
      )}`,
      {
        method: "GET",
        cache: "force-cache",
        next: { revalidate: 300 },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const payload = (await response.json().catch(() => null)) as
      | ApiResponse<DiningSummary[]>
      | null;

    if (!response.ok) {
      return {
        success: false,
        error: payload?.errorMessage || `요청 실패 (${response.status})`,
      };
    }

    const dinings = Array.isArray(payload?.data) ? payload.data : null;

    if (!dinings) {
      return {
        success: false,
        error: "회식 목록을 확인할 수 없습니다.",
      };
    }

    return { success: true, data: dinings };
  } catch (error) {
    console.error("[getGroupDiningSummaries] Request failed", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "요청 중 오류가 발생했습니다.",
    };
  }
}

interface GetDiningCommonRequest {
  groupId: string;
  diningId: string;
}

interface GetDiningRestaurantVoteRequest {
  groupId: string;
  diningId: string;
}

interface GetDiningAttendanceVoteRequest {
  groupId: string;
  diningId: string;
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


export async function getDiningCommon({
  groupId,
  diningId,
}: GetDiningCommonRequest): Promise<DiningCommonResponse> {
  const API_BASE_URL =
    process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!API_BASE_URL) {
    throw new Error("API base URL이 설정되지 않았습니다.");
  }

  const accessToken = await getAccessToken();

  if (!accessToken) {
    throw new Error("인증 토큰이 없습니다.");
  }

  const response = await fetch(
    `${API_BASE_URL}/api/v1/groups/${groupId}/dining/${diningId}`,
    {
      method: "GET",
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const payload = (await response.json().catch(() => null)) as
    | ApiResponse<DiningCommonResponse>
    | ApiNestedResponse<DiningCommonResponse>
    | null;

  if (!response.ok) {
    throw new Error(payload?.errorMessage || `요청 실패 (${response.status})`);
  }

  const data = extractApiData(payload);

  if (!data) {
    throw new Error("회식 정보를 확인할 수 없습니다.");
  }

  return data;
}

export async function getDiningRestaurantVote({
  groupId,
  diningId,
}: GetDiningRestaurantVoteRequest): Promise<RestaurantVoteResponse[]> {
  const API_BASE_URL =
    process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!API_BASE_URL) {
    throw new Error("API base URL이 설정되지 않았습니다.");
  }

  const accessToken = await getAccessToken();

  if (!accessToken) {
    throw new Error("인증 토큰이 없습니다.");
  }

  const response = await fetch(
    `${API_BASE_URL}/api/v1/groups/${groupId}/dining/${diningId}/restaurant-vote`,
    {
      method: "GET",
      cache: "no-store",
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
    throw new Error(payload?.errorMessage || `요청 실패 (${response.status})`);
  }

  const data = extractApiData(payload);

  if (!data) {
    throw new Error("식당 투표 정보를 확인할 수 없습니다.");
  }

  return data;
}

export async function getDiningAttendanceVote({
  groupId,
  diningId,
}: GetDiningAttendanceVoteRequest): Promise<AttendanceVoteResponse> {
  const API_BASE_URL =
    process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!API_BASE_URL) {
    throw new Error("API base URL이 설정되지 않았습니다.");
  }

  const accessToken = await getAccessToken();

  if (!accessToken) {
    throw new Error("인증 토큰이 없습니다.");
  }

  const response = await fetch(
    `${API_BASE_URL}/api/v1/groups/${groupId}/dining/${diningId}/attendance-vote`,
    {
      method: "GET",
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const payload = (await response.json().catch(() => null)) as
    | ApiResponse<AttendanceVoteResponse>
    | ApiNestedResponse<AttendanceVoteResponse>
    | null;

  if (!response.ok) {
    throw new Error(payload?.errorMessage || `요청 실패 (${response.status})`);
  }

  const data = extractApiData(payload);

  if (!data) {
    throw new Error("참석 투표 정보를 확인할 수 없습니다.");
  }

  return data;
}

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
