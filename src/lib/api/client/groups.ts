import { bffPost, bffGet, type ApiResponse } from "./index";
import type { GroupSummary } from "@/src/types/groups";

export interface CreateGroupRequest {
  name: string;
  introduction: string;
  latitude: number;
  longitude: number;
  imagePath: string;
}

export interface GroupDetailResponse {
  name: string;
  introduction: string;
  participantsCount: number;
  isGroupLeader: boolean;
}

interface MyGroupSummaryResponse {
  groupId: string;
  name: string;
  introduction?: string | null;
  imagePath: string;
}

export async function createGroup(
  data: CreateGroupRequest
): Promise<ApiResponse<number>> {
  return bffPost<number>("/groups", data);
}

export async function getGroupDetail(
  groupId: string
): Promise<ApiResponse<GroupDetailResponse>> {
  return bffGet<GroupDetailResponse>(`/groups/${groupId}`);
}

export async function getMyGroups(): Promise<ApiResponse<MyGroupSummaryResponse[]>> {
  return bffGet<MyGroupSummaryResponse[]>("/users/me/groups");
}

// 클라이언트에서 사용할 매핑 함수
export function mapToGroupSummary(data: MyGroupSummaryResponse[]): GroupSummary[] {
  return data.map((group) => ({
    id: group.groupId,
    name: group.name,
    introduction: group.introduction ?? undefined,
    imagePath: group.imagePath,
  }));
}

export async function joinGroup(
  groupId: string
): Promise<ApiResponse<string>> {
  return bffPost<string>(`/groups/${groupId}/join`);
}
