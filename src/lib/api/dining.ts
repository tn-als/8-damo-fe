import axios from "axios";
import type {
  AttendanceVoteResponse,
  ConfirmedRestaurantResponse,
  DiningCommonResponse,
  DiningStatus,
  DiningSummary,
  RestaurantVoteResponse,
} from "@/src/types/api/dining";
import type { ApiNestedResponse, ApiResponse } from "@/src/types/api/common";

const axiosInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

function isApiResponse<T>(value: unknown): value is ApiResponse<T> {
  return typeof value === "object" && value !== null && "data" in value;
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

export const diningApi = {
  getGroupDiningSummaries: async (
    groupId: string,
    status: DiningStatus
  ): Promise<DiningSummary[]> => {
    const response = await axiosInstance.get<
      ApiResponse<DiningSummary[]>
    >(`/groups/${groupId}/dining`, {
      params: { status },
    });

    const data = Array.isArray(response.data?.data)
      ? response.data.data
      : null;

    if (!data) {
      throw new Error("회식 목록을 확인할 수 없습니다.");
    }

    return data;
  },

  getDiningCommon: async (
    groupId: string,
    diningId: string
  ): Promise<DiningCommonResponse> => {
    const response = await axiosInstance.get<
      ApiResponse<DiningCommonResponse> | ApiNestedResponse<DiningCommonResponse>
    >(`/groups/${groupId}/dining/${diningId}`);

    const data = extractApiData(response.data);

    if (!data) {
      throw new Error("회식 정보를 확인할 수 없습니다.");
    }

    return data;
  },

  getDiningRestaurantVote: async (
    groupId: string,
    diningId: string
  ): Promise<RestaurantVoteResponse[]> => {
    const response = await axiosInstance.get<
      | ApiResponse<RestaurantVoteResponse[]>
      | ApiNestedResponse<RestaurantVoteResponse[]>
    >(`/groups/${groupId}/dining/${diningId}/restaurant-vote`);

    const data = extractApiData(response.data);

    if (!data) {
      throw new Error("식당 투표 정보를 확인할 수 없습니다.");
    }

    return data;
  },

  getDiningAttendanceVote: async (
    groupId: string,
    diningId: string
  ): Promise<AttendanceVoteResponse> => {
    const response = await axiosInstance.get<
      | ApiResponse<AttendanceVoteResponse>
      | ApiNestedResponse<AttendanceVoteResponse>
    >(`/groups/${groupId}/dining/${diningId}/attendance-vote`);

    const data = extractApiData(response.data);

    if (!data) {
      throw new Error("참석 투표 정보를 확인할 수 없습니다.");
    }

    return data;
  },

  getDiningConfirmed: async (
    groupId: string,
    diningId: string
  ): Promise<ConfirmedRestaurantResponse> => {
    const response = await axiosInstance.get<
      | ApiResponse<ConfirmedRestaurantResponse>
      | ApiNestedResponse<ConfirmedRestaurantResponse>
    >(`/groups/${groupId}/dining/${diningId}/confirmed`);

    const data = extractApiData(response.data);

    if (!data) {
      throw new Error("확정 식당 정보를 확인할 수 없습니다.");
    }

    return data;
  },
};
