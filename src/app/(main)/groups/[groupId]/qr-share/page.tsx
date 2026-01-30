import { GroupQrShareContent } from "@/src/components/groups/group-qr-share-content";

interface QrSharePageProps {
  params: Promise<{ groupId: string }>;
  searchParams?: Promise<{ groupName?: string }>;
}

export default async function QrSharePage({
  params,
  searchParams,
}: QrSharePageProps) {
  const { groupId } = await params;
  const resolvedSearchParams = await searchParams;
  const groupName = resolvedSearchParams?.groupName ?? "";

  return <GroupQrShareContent groupId={groupId} groupName={groupName} />;
}
