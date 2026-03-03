import "server-only";
import { serverGet } from "./index";
import type { GroupSummaryPage } from "@/src/types/groups";

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

export async function getMyGroups(params?: MyGroupListParams): Promise<GroupSummaryPage> {
  const size = params?.size ?? 10;
  const query: Record<string, string | number> = { size };
  if (params?.lastGroupId) query.lastGroupId = params.lastGroupId;

  const dto = await serverGet<MyGroupListDto>("/api/v1/users/me/groups", { params: query });

  const items = dto.data.map((group) => ({
    id: group.groupId,
    name: group.name,
    introduction: group.introduction ?? undefined,
    imagePath: group.imagePath,
  }));

  return {
    items,
    nextCursor: dto.hasNext ? dto.nextCursor : null,
  };
}
