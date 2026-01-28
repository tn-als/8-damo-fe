import GroupDetailPageClient from "@/src/components/groups/group-detail-page-client";

interface PageProps {
  params: Promise <{ groupId: string }>;
}

export default async function Page({ params }: PageProps) {
  const {groupId} = await params;
  return <GroupDetailPageClient groupId={groupId} />;
}