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
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터: 쿠키 확인
axiosInstance.interceptors.request.use(
  (config) => {
    // 브라우저 쿠키 확인 (디버깅용)
    const cookies = document.cookie;
    console.log("[Axios] Request cookies:", cookies);
    console.log("[Axios] Request URL:", config.url);
    console.log("[Axios] withCredentials:", config.withCredentials);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터: 에러 확인
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("[Axios] Response error:", error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

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
