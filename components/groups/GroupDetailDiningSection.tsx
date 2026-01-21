"use client";

import { DiningSummaryCard } from "@/components/groups/DiningSummaryCard";
import { SegmentedTabs } from "@/components/ui/segmented-tabs";
import { useState } from "react";

const TAB_OPTIONS = [
  { value: "ATTENDANCE_VOTING", label: "참석 투표" },
  { value: "RESTAURANT_VOTING", label: "장소 투표" },
  { value: "DINING_COMPLETED", label: "회식 완료" },
];

type DiningTab = (typeof TAB_OPTIONS)[number]["value"];

interface DiningSummaryProps {
  id: string;
  date: string;
  attendeeCount: number;
  status: DiningTab;
}

interface GroupDetailDiningSectionProps {
    dinings: DiningSummaryProps[];
    onDiningClick?: (id:string) => void; 
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
    <>
      <div className="px-4 py-4 sm:px-5">
        <SegmentedTabs
          tabs={TAB_OPTIONS}
          value={activeTab}
          onChange={(value) => setActiveTab(value)}
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 px-4 pb-24 sm:px-5">
        {filteredDinings.map((dining) => (
          <DiningSummaryCard
            key={dining.id}
            date={dining.date}
            attendeeCount={dining.attendeeCount}
            onClick={() => onDiningClick?.(dining.id)}
          />
        ))}
      </div>
    </>
  );
}