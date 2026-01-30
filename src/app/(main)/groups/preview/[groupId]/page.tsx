import GroupPreviewClient from "@/src/components/groups/group-preview-client";
interface GroupPreviewPageProps {
  params: Promise<{ groupId: string }>;
}

export default async function GroupPreviewPage({
  params,
}: GroupPreviewPageProps) {
  const { groupId } = await params;

  return <GroupPreviewClient groupId={groupId} />;
}
