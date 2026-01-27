import { GroupQrShareContent } from "@/src/components/groups/group-qr-share-content";
import { GROUP_DETAIL_MOCK_BY_ID } from "@/src/constants/mock-data";

interface QrSharePageProps {
  params: Promise<{ groupId: string }>;
}

export default async function QrSharePage({ params }: QrSharePageProps) {
  const { groupId } = await params;
  const numericGroupId = Number(groupId);
  const group = GROUP_DETAIL_MOCK_BY_ID[numericGroupId] ?? GROUP_DETAIL_MOCK_BY_ID[1];

  return <GroupQrShareContent groupId={groupId} groupName={group.name} />;
}
