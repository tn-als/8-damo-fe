"use server";

import { fetchWithAuthRetry } from "../api/fetch-with-auth-retry";
import { getErrorMessage } from "../api/error-handler";
import type { ApiResponse } from "@/src/types/api/common";
import type { GroupSummary } from "@/src/types/groups";

interface CreateGroupRequest {
  name: string;
  introduction: string;
  latitude: number;
  longitude: number;
  imagePath: string;
}

interface CreateGroupResponse {
  success: boolean;
  groupId?: number;
  error?: string;
}

interface GroupDetailResponse {
  name: string;
  introduction: string;
  participantsCount: number;
  isGroupLeader: boolean;
}

interface GetGroupDetailResult {
  success: boolean;
  data?: GroupDetailResponse;
  error?: string;
}

interface MyGroupSummaryResponse {
  groupId: string;
  name: string;
  introduction?: string | null;
  imagePath: string;
}

interface GetMyGroupsResult {
  success: boolean;
  data?: GroupSummary[];
  error?: string;
}

interface JoinGroupResult {
  success: boolean;
  data?: string;
  error?: string;
}

export async function createGroup(
  data: CreateGroupRequest
): Promise<CreateGroupResponse> {
  const API_BASE_URL =
    process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!API_BASE_URL) {
    return { success: false, error: "API base URL이 설정되지 않았습니다." };
  }

  try {
    const response = await fetchWithAuthRetry(`${API_BASE_URL}/api/v1/groups`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const payload = (await response.json().catch(() => null)) as
      | ApiResponse<number>
      | null;

    if (!response.ok) {
      return {
        success: false,
        error: getErrorMessage(payload, response.status),
      };
    }

    const groupId = payload?.data;

    if (groupId === null || groupId === undefined) {
      return { success: false, error: "groupId를 확인할 수 없습니다." };
    }

    const parsedGroupId = Number(groupId);

    if (!Number.isFinite(parsedGroupId)) {
      return { success: false, error: "groupId를 확인할 수 없습니다." };
    }

    return { success: true, groupId: parsedGroupId };
  } catch (error) {
    console.error("[createGroup] Request failed", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "요청 중 오류가 발생했습니다.",
    };
  }
}

export async function getGroupDetail(
  groupId: string
): Promise<GetGroupDetailResult> {
  const API_BASE_URL =
    process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!API_BASE_URL) {
    return { success: false, error: "API base URL이 설정되지 않았습니다." };
  }

  try {
    const response = await fetchWithAuthRetry(
      `${API_BASE_URL}/api/v1/groups/${groupId}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const payload = (await response.json().catch(() => null)) as
      | ApiResponse<GroupDetailResponse>
      | null;

    if (!response.ok) {
      return {
        success: false,
        error: getErrorMessage(payload, response.status),
      };
    }

    if (!payload?.data) {
      return {
        success: false,
        error: "그룹 정보를 확인할 수 없습니다.",
      };
    }

    return { success: true, data: payload.data };
  } catch (error) {
    console.error("[getGroupDetail] Request failed", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "요청 중 오류가 발생했습니다.",
    };
  }
}

export async function getMyGroups(): Promise<GetMyGroupsResult> {
  const API_BASE_URL =
    process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!API_BASE_URL) {
    return { success: false, error: "API base URL이 설정되지 않았습니다." };
  }

  try {
    const response = await fetchWithAuthRetry(
      `${API_BASE_URL}/api/v1/users/me/groups`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const payload = (await response.json().catch(() => null)) as
      | ApiResponse<MyGroupSummaryResponse[]>
      | null;

    if (!response.ok) {
      return {
        success: false,
        error: getErrorMessage(payload, response.status),
      };
    }

    const groupList = Array.isArray(payload?.data) ? payload.data : null;

    if (!groupList) {
      return {
        success: false,
        error: "그룹 목록을 확인할 수 없습니다.",
      };
    }

    const mappedGroups: GroupSummary[] = groupList.map((group) => ({
      id: group.groupId,
      name: group.name,
      introduction: group.introduction ?? undefined,
      imagePath: group.imagePath,
    }));

    return { success: true, data: mappedGroups };
  } catch (error) {
    console.error("[getMyGroups] Request failed", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "요청 중 오류가 발생했습니다.",
    };
  }
}

export async function joinGroup(groupId: string): Promise<JoinGroupResult> {
  const API_BASE_URL =
    process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!API_BASE_URL) {
    return { success: false, error: "API base URL이 설정되지 않았습니다." };
  }

  if (!groupId) {
    return { success: false, error: "groupId가 필요합니다." };
  }

  try {
    const response = await fetchWithAuthRetry(
      `${API_BASE_URL}/api/v1/groups/${groupId}/users/me`,
      {
        method: "POST",
      }
    );

    const payload = (await response.json().catch(() => null)) as
      | ApiResponse<string>
      | null;

    if (!response.ok) {
      return {
        success: false,
        error: getErrorMessage(payload, response.status),
      };
    }

    if (!payload?.data) {
      return { success: false, error: "그룹 가입 응답을 확인할 수 없습니다." };
    }

    return { success: true, data: payload.data };
  } catch (error) {
    console.error("[joinGroup] Request failed", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "요청 중 오류가 발생했습니다.",
    };
  }
}
