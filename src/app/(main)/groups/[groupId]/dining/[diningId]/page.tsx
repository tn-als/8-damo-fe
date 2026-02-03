import { DiningDetailClient } from "@/src/components/dining/dining-detail-client";
import { DiningErrorToast } from "@/src/components/dining/dining-error-toast";
import { getDiningCommon } from "@/src/lib/actions/dining";
import type { DiningCommonResponse } from "@/src/types/api/dining";

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

  const errorMessages: string[] = [];
  const fallbackErrorMessage = "요청 중 오류가 발생했습니다.";

  let diningCommon: DiningCommonResponse | null = null;

  try {
    diningCommon = await getDiningCommon({ groupId, diningId });
  } catch (error) {
    errorMessages.push(
      error instanceof Error ? error.message : fallbackErrorMessage
    );
  }

  if (!diningCommon) {
    return (
      <>
        {errorMessages.length > 0 && (
          <DiningErrorToast messages={errorMessages} />
        )}
      </>
    );
  }
 
  return (
    <>
      {errorMessages.length > 0 && (
        <DiningErrorToast messages={errorMessages} />
      )}
      <DiningDetailClient
        groupId={groupId}
        diningId={diningId}
        initialDiningCommon={diningCommon}
      />
    </>
  );
}
