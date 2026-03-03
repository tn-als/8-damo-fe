import { bffPost, bffGet, type ApiResponse } from "./index";
import type { GroupSummary, GroupSummaryPage } from "@/src/types/groups";

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

interface MyGroupListDto {
  data: MyGroupSummaryResponse[];
  nextCursor: string | null;
  hasNext: boolean;
}

interface MyGroupListParams {
  lastGroupId?: string;
  size?: number;
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

export async function getMyGroups(
  params?: MyGroupListParams
): Promise<ApiResponse<GroupSummaryPage>> {
  const size = params?.size ?? 10;
  const query: Record<string, string | number> = { size };
  if (params?.lastGroupId) query.lastGroupId = params.lastGroupId;

  const response = await bffGet<MyGroupListDto>("/users/me/groups", { params: query });
  const items: GroupSummary[] = response.data.data.map((group) => ({
    id: group.groupId,
    name: group.name,
    introduction: group.introduction ?? undefined,
    imagePath: group.imagePath,
  }));

  return {
    ...response,
    data: {
      items,
      nextCursor: response.data.hasNext ? response.data.nextCursor : null,
    },
  };
}

export async function joinGroup(
  groupId: string
): Promise<ApiResponse<string>> {
  return bffPost<string>(`/groups/${groupId}/join`);
}
