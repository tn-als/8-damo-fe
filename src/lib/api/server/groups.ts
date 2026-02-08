import "server-only";
import { serverGet } from "./index";
import type { GroupSummary } from "@/src/types/groups";

interface MyGroupSummaryResponse {
  groupId: string;
  name: string;
  introduction?: string | null;
  imagePath: string;
}

export async function getMyGroups(): Promise<GroupSummary[]> {
  const data = await serverGet<MyGroupSummaryResponse[]>("/api/v1/users/me/groups");

  return data.map((group) => ({
    id: group.groupId,
    name: group.name,
    introduction: group.introduction ?? undefined,
    imagePath: group.imagePath,
  }));
}
