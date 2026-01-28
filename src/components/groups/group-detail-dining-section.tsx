"use client";

import { DiningSummaryCard } from "@/src/components/groups/dining-summary-card";
import { type DiningStatus, type DiningSummary } from "@/src/types/api/dining";
import { SegmentedTabs } from "@/src/components/ui/segmented-tabs";

const TAB_OPTIONS: { value: DiningStatus; label: string }[] = [
  { value: "ATTENDANCE_VOTING", label: "참석 투표" },
  { value: "RESTAURANT_VOTING", label: "장소 투표" },
  { value: "COMPLETE", label: "회식 완료" },
];

interface GroupDetailDiningSectionProps {
  dinings: DiningSummary[];
  status: DiningStatus;
  onStatusChange: (status: DiningStatus) => void;
  onDiningClick?: (id: string) => void;
}

export function GroupDetailDiningSection({
  dinings,
  status,
  onStatusChange,
  onDiningClick,
}: GroupDetailDiningSectionProps) {
  return (
    <div className="flex flex-1 flex-col bg-[#f2f2f7]">
      <div className="px-5 py-4">
        <SegmentedTabs
          tabs={TAB_OPTIONS}
          value={status}
          onChange={(value) => onStatusChange(value as DiningStatus)}
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
                onClick={() => onDiningClick?.(String(dining.diningId))}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
