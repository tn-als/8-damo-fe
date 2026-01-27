"use client"
import { useState } from "react";
import { STATUS_BADGE_CONFIG } from "@/src/constants/dining-status-badge";
import { 
  type AttendanceVoteStatus,
} from "@/src/types/dining";
import {
  DINING_DETAIL_MOCK_BY_ID,
  DINING_DETAIL_MOCK_LIST,
} from "@/src/constants/mock-data";
import {
  AttendanceVotingSection,
  CompleteSection,
  ConfirmedSection,
  DiningEventSection,
  DiningParticipantList,
  RestaurantVotingSection,
} from "@/src/components/dining"
import { Button } from "../ui/button";
import Link from "next/link";
import { Badge } from "@/src/components/ui/badge";
import { ChevronLeft } from "lucide-react";

interface DiningDetailComponentProps{
  groupId: string,
  diningId: string
}

export default function DiningDetailComponent({
  groupId,
  diningId
}: DiningDetailComponentProps){

  const [myVoteStatus, setMyVoteStatus] = useState<AttendanceVoteStatus>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  /** 목업 데이터 쓰기 */
  const numGroupId = Number(groupId);
  const numDiningId = Number(diningId);
  const diningById = DINING_DETAIL_MOCK_BY_ID[numDiningId];
  const fallbackDining =
    DINING_DETAIL_MOCK_LIST.find((item) => item.groupId === numGroupId) ??
    DINING_DETAIL_MOCK_LIST[0];

  const dining = fallbackDining;
  const badgeConfig = STATUS_BADGE_CONFIG[dining.phase];

  const handleVoteSubmit = (vote: "ATTEND" | "NON_ATTEND") => {
    if (myVoteStatus || isSubmitting) return;
    setIsSubmitting(true);
    setMyVoteStatus(vote);
    setIsSubmitting(false);
  };

  return (
    <div className="relative mx-auto min-h-screen w-full max-w-[430px] bg-background">
      <div
        className="absolute inset-x-0 top-0 h-[476px] bg-app-background"
        aria-hidden="true"
      />
      <div className="relative z-10 flex flex-col gap-8 pb-12">
        <div className="px-5 pt-8">
          <div className="flex flex-col gap-5">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="size-9 p-0"
            >
              <Link href={`/groups/${groupId}`} aria-label="뒤로 가기">
                <ChevronLeft className="size-6 text-[#8e8e93]" />
              </Link>
            </Button>
            <div className="flex items-center gap-3">
              <p className="text-[24px] font-bold leading-[32px] text-[#333333]">
                {dining.date}
              </p>
              <Badge variant={badgeConfig.variant} size="dining">
                {badgeConfig.label}
              </Badge>
            </div>
          </div>
        </div>

        <div className="px-5">
          <DiningEventSection phase={dining.phase}>
            {dining.phase === "ATTENDANCE_VOTING" && (
              <AttendanceVotingSection
                progress={dining.progress}
                diningDate={dining.date}
                myVoteStatus={myVoteStatus}
                isSubmitting={isSubmitting}
                onSubmit={handleVoteSubmit}
              />
            )}
            {dining.phase === "RESTAURANT_VOTING" && (
              <RestaurantVotingSection
                restaurants={[dining.restaurant]}
                voteStates={dining.restaurantVotes}
                permissions={dining.permissions}
              />
            )}
            {dining.phase === "RESTAURANT_CONFIRMED" && (
              <ConfirmedSection
                restaurant={dining.restaurant}
                voteState={dining.restaurantVotes[0]}
              />
            )}
            {dining.phase === "DINING_COMPLETED" && (
              <CompleteSection
                restaurant={dining.restaurant}
                voteState={dining.restaurantVotes[0]}
                reviewStatus={dining.reviewStatus}
              />
            )}
          </DiningEventSection>
        </div>

        <DiningParticipantList participants={dining.participants} />
      </div>
    </div>
  );
}