"use client";

import { DiningSummaryCard } from "@/src/components/groups/dining-summary-card";
import { RecommendationPendingSection } from "@/src/components/groups/recommendation-pending/recommendation-pending-section";
import { type DiningStatus, type DiningSummary } from "@/src/types/api/dining";
import { SegmentedTabs } from "@/src/components/ui/segmented-tabs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const TAB_OPTIONS: { value: DiningStatus; label: string }[] = [
  { value: "ATTENDANCE_VOTING", label: "참석 투표" },
  { value: "RESTAURANT_VOTING", label: "장소 투표" },
  { value: "CONFIRMED", label: "회식 확정" },
];

interface GroupDetailDiningSectionProps {
  groupId: string;
  dinings: DiningSummary[];
  status: DiningStatus;
}

export function GroupDetailDiningSection({
  groupId,
  dinings,
  status,
}: GroupDetailDiningSectionProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleStatusChange = (nextStatus: DiningStatus) => {
    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.set("status", nextStatus);
    router.push(`${pathname}?${nextParams.toString()}`, { scroll: false });
  };

  const handleDiningClick = (diningId: string) => {
    router.push(`/groups/${groupId}/dining/${diningId}`);
  };

  return (
    <div className="flex flex-1 flex-col bg-[#f2f2f7]">
      <RecommendationPendingSection groupId={groupId} />

      <div className="px-4 py-4 sm:px-5">
        <SegmentedTabs
          tabs={TAB_OPTIONS}
          value={status}
          onChange={(value) => handleStatusChange(value as DiningStatus)}
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 px-4 pb-28 sm:px-5 sm:pb-32">
        {dinings.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 text-sm text-muted-foreground">
            <p>조회된 회식이 없습니다.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {dinings.map((dining) => (
              <DiningSummaryCard
                key={dining.diningId}
                date={dining.diningDate}
                attendeeCount={dining.diningParticipantsCount}
                status={dining.status}
                onClick={() => handleDiningClick(String(dining.diningId))}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
