import { Suspense } from "react";
import { GroupDetailContent } from "@/src/components/groups/group-detail-content";
import { GroupDetailDiningSectionServer } from "@/src/components/groups/group-detail-dining-section-server";
import type { DiningStatus } from "@/src/types/api/dining";

interface PageProps {
  params: Promise<{ groupId: string }>;
  searchParams?: Promise<{ status: string }>;
}

const DINING_STATUS_OPTIONS: DiningStatus[] = [
  "ATTENDANCE_VOTING",
  "RESTAURANT_VOTING",
  "CONFIRMED",
];

const isDiningStatus = (value?: string): value is DiningStatus =>
  !!value && DINING_STATUS_OPTIONS.includes(value as DiningStatus);

function DiningSectionFallback() {
  return (
    <div className="flex flex-1 flex-col bg-[#f2f2f7] px-5 pb-32 pt-4">
      <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
        회식 목록을 불러오는 중입니다...
      </div>
    </div>
  );
}

export default async function Page({ params, searchParams }: PageProps) {
  const { groupId } = await params;
  const resolvedSearchParams = await searchParams;

  const status: DiningStatus = isDiningStatus(resolvedSearchParams?.status)
    ? resolvedSearchParams.status
    : "ATTENDANCE_VOTING";
  
  return (
    <GroupDetailContent
      groupId={groupId}
      diningSection={
        <Suspense fallback={<DiningSectionFallback />}>
          <GroupDetailDiningSectionServer groupId={groupId} status={status} />
        </Suspense>
      }
    />
  );
}
