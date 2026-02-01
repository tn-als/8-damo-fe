import { cookies } from "next/headers";
import GroupPreviewClient from "@/src/components/groups/group-preview-client";

interface GroupPreviewPageProps {
  params: Promise<{ groupId: string }>;
}

export default async function GroupPreviewPage({
  params,
}: GroupPreviewPageProps) {
  const { groupId } = await params;
  const cookieStore = await cookies();
  const isAuthenticated = !!cookieStore.get("refresh_token")?.value;
  return <GroupPreviewClient groupId={groupId} isAuthenticated={isAuthenticated} />;
}
