"use client";

import { useState } from "react";
import { type AttendanceVoteStatus } from "@/src/types/api/dining";
import { AttendanceVoteProgress } from "./attendance-voting/attendance-vote-progress";
import { AttendanceVotePrompt } from "./attendance-voting/attendance-vote-prompt";
import { AttendanceVoteActions } from "./attendance-voting/attendance-vote-action";

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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (vote: "ATTEND" | "NON_ATTEND") => {
    setIsSubmitting(true);

    // 임시 비동기 처리 
    setTimeout(() => {
      console.log("submitted: ", vote);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section className="w-full rounded-[20px] bg-white p-5">
      <div className="flex flex-col items-center gap-[52px]">
        <AttendanceVoteProgress
          totalCount={progress.totalCount}
          voteCount={progress.voteCount} />

        <AttendanceVotePrompt diningDate={diningDate}/>

        <AttendanceVoteActions 
          myVoteStatus={myVoteStatus}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}/>
      </div>
    </section>
  )
}