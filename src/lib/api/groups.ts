"use server";

import axios from "axios";
import type { GroupSummary } from "@/src/types/groups";
import { getAccessToken } from "../cookie";

interface MyGroupSummaryResponse {
  groupId: string;
  name: string;
  introduction?: string | null;
}

interface MyGroupsApiResponse {
  httpStatus?: string;
  data?: MyGroupSummaryResponse[];
  errorMessage?: string | null;
}

interface GetMyGroupsResult {
  success: boolean;
  data?: GroupSummary[];
  error?: string;
}

export async function getMyGroups(): Promise<GetMyGroupsResult> {
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!API_BASE_URL) {
    console.error("[getMyGroups] Missing API base URL env");
    return { success: false, error: "Missing API base URL." };
  }

  const accessToken = await getAccessToken();

  if (!accessToken) {
    return { success: false, error: "Missing access token." };
  }

  try {
    const response = await axios.get<MyGroupsApiResponse>(
      `${API_BASE_URL}/api/v1/users/me/groups`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const payload = response.data;
    const groupList = Array.isArray(payload?.data) ? payload.data : null;

    if (!groupList) {
      return {
        success: false,
        error: payload?.errorMessage ?? "Unable to load group list.",
      };
    }

    const mappedGroups: GroupSummary[] = groupList.map((group) => ({
      id: group.groupId,
      name: group.name,
      description: group.introduction ?? "",
      imageUrl: `${process.env.NEXT_PUBLIC_S3_URL}/groups/profile/${group.groupId}.png`,
    }));

    return { success: true, data: mappedGroups };
  } catch (error) {
    if (axios.isAxiosError<MyGroupsApiResponse>(error)) {
      const status = error.response?.status;
      const message = error.response?.data?.errorMessage;
      return {
        success: false,
        error: message ?? `Request failed (${status ?? "NETWORK"}).`,
      };
    }

    console.error("[getMyGroups] Request failed", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Request failed.",
    };
  }
}
