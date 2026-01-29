"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "@/src/components/ui/sonner";
import { voteAttendance } from "@/src/lib/actions/dining";
import { type AttendanceVoteStatus } from "@/src/types/api/dining";
import { AttendanceVoteProgress } from "./attendance-vote-progress";
import { AttendanceVotePrompt } from "./attendance-vote-prompt";
import { AttendanceVoteActions } from "./attendance-vote-action";

interface AttendanceVotingSectionProps {
  progress: {
    totalCount: number;
    voteCount: number;
  };
  diningDate: string;
  myVoteStatus: AttendanceVoteStatus;
}

export function AttendanceVotingSection({
  progress,
  diningDate,
  myVoteStatus,
}: AttendanceVotingSectionProps) {
  const params = useParams<{ groupId: string; diningId: string }>();
  const [currentVoteStatus, setCurrentVoteStatus] =
    useState<AttendanceVoteStatus>(myVoteStatus);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (vote: "ATTEND" | "NON_ATTEND") => {
    if (!params?.groupId || !params?.diningId) {
      toast.error("경로 정보를 확인할 수 없습니다.");
      return;
    }

    setIsSubmitting(true);

    const result = await voteAttendance({
      groupId: params.groupId,
      diningId: params.diningId,
      attendanceVoteStatus: vote,
    });

    if (!result.success) {
      toast.error(result.error || "참석 투표에 실패했습니다.");
      setIsSubmitting(false);
      return;
    }

    setCurrentVoteStatus(vote);
    setIsSubmitting(false);
  };

  return (
    <section className="w-full rounded-[20px] bg-white p-5">
      <div className="flex flex-col items-center gap-[52px]">
        <AttendanceVoteProgress
          totalCount={progress.totalCount}
          voteCount={progress.voteCount} />

        <AttendanceVotePrompt diningDate={diningDate}/>

        <AttendanceVoteActions 
          myVoteStatus={currentVoteStatus}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}/>
      </div>
    </section>
  )
}
