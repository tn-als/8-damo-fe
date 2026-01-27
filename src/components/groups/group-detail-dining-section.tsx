"use client";

import {
  DiningSummaryCard,
} from "@/src/components/groups/dining-summary-card";
import { type DiningStatus } from "@/src/types/api/dining";
import { SegmentedTabs } from "@/src/components/ui/segmented-tabs";
import { useState } from "react";

type DiningTab =
  | "ATTENDANCE_VOTING"
  | "RESTAURANT_VOTING"
  | "CONFIRMED"
  | "COMPLETE";

const TAB_OPTIONS: { value: DiningTab; label: string }[] = [
  { value: "ATTENDANCE_VOTING", label: "참석 투표" },
  { value: "RESTAURANT_VOTING", label: "장소 투표" },
  { value: "COMPLETE", label: "회식 완료" },
];

interface DiningSummaryProps {
  id: string;
  date: string;
  attendeeCount: number;
  status: DiningStatus;
}

interface GroupDetailDiningSectionProps {
  dinings: DiningSummaryProps[];
  onDiningClick?: (id: string) => void;
}

export function GroupDetailDiningSection({
  dinings,
  onDiningClick,
}: GroupDetailDiningSectionProps) {
  const [activeTab, setActiveTab] = useState<DiningTab>("ATTENDANCE_VOTING");

  const filteredDinings = dinings.filter(
    (dining) => dining.status === activeTab
  );

  return (
    <div className="flex flex-1 flex-col bg-[#f2f2f7]">
      <div className="px-5 py-4">
        <SegmentedTabs
          tabs={TAB_OPTIONS}
          value={activeTab}
          onChange={(value) => setActiveTab(value as DiningTab)}
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 px-5 pb-32">
        {filteredDinings.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 text-sm text-muted-foreground">
            <p>조회된 회식이 없습니다.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
          {filteredDinings.map((dining) => (
            <DiningSummaryCard
              key={dining.id}
              date={dining.date}
              attendeeCount={dining.attendeeCount}
              status={dining.status}
              onClick={() => onDiningClick?.(dining.id)}
            />
          ))}
        </div>
        )}
      </div>
    </div>
  );
}