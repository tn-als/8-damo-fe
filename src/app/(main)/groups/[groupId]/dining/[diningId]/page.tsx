import DiningDetailComponent from "@/src/components/dining/dining-detail-component";

interface DiningDetailPageProps {
  params: Promise<{
    groupId: string;
    diningId: string;
  }>;
}

export default async function DiningDetailPage({
  params,
}: DiningDetailPageProps) {
  const { groupId, diningId } = await params;

  return (
    <DiningDetailComponent
      groupId={groupId}
      diningId={diningId}
    />
  );
}
