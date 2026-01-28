"use client";

import { DiningSummaryCard } from "@/src/components/groups/dining-summary-card";
import { type DiningStatus, type DiningSummary } from "@/src/types/api/dining";
import { SegmentedTabs } from "@/src/components/ui/segmented-tabs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const TAB_OPTIONS: { value: DiningStatus; label: string }[] = [
  { value: "ATTENDANCE_VOTING", label: "참석 투표" },
  { value: "RESTAURANT_VOTING", label: "장소 투표" },
  { value: "COMPLETE", label: "회식 완료" },
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
      <div className="px-5 py-4">
        <SegmentedTabs
          tabs={TAB_OPTIONS}
          value={status}
          onChange={(value) => handleStatusChange(value as DiningStatus)}
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 px-5 pb-32">
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
