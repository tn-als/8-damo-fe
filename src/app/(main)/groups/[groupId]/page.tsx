import {GroupDetailContent} from "@/src/components/groups/group-detail-content";

interface GroupDetailPageProps {
  params: Promise<{ groupId: string }>;
}

export default async function GroupDetailPage({ params }: GroupDetailPageProps) {
  const { groupId } = await params;
  return <GroupDetailContent groupId={groupId} />;
}
