"use client";

import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";

export type AttendanceVoteStatus = "ATTEND" | "NON_ATTEND" | null;

interface AttendanceVotingSectionProps {
  progress: {
    totalCount: number;
    voteCount: number;
  };
  diningDate: string;
  myVoteStatus: AttendanceVoteStatus;
  isSubmitting: boolean;
  onSubmit: (vote: "ATTEND" | "NON_ATTEND") => void;
}

export function AttendanceVotingSection({
  progress,
  diningDate,
  myVoteStatus,
  isSubmitting,
  onSubmit,
}: AttendanceVotingSectionProps) {
  const totalCount = Math.max(progress.totalCount, 0);
  const voteCount = Math.max(Math.min(progress.voteCount, totalCount), 0);
  const progressPercent =
    totalCount === 0 ? 0 : Math.round((voteCount / totalCount) * 100);

  const isDisabled = isSubmitting || myVoteStatus !== null;

  const baseButtonStyles =
    "h-16 flex-1 rounded-lg border-2 border-transparent text-[16px] font-semibold leading-[22px] transition-colors";
  const defaultButtonStyles = "bg-[#f2f2f7] text-[#404040]";
  const selectedButtonStyles =
    "bg-[rgba(255,141,40,0.15)] text-[#ff8d28] border-[rgba(255,141,40,0.5)]";

  return (
    <section className="w-full rounded-[20px] bg-white p-5">
      <p className="sr-only">회식 날짜 {diningDate}</p>
      <div className="flex flex-col items-center gap-[52px]">
        <div className="flex flex-col items-center gap-1.5">
          <p className="text-[14px] font-semibold leading-[18px] text-[#404040]">
            응답 현황
          </p>
          <div className="flex w-full flex-col items-center gap-2.5">
            <p className="text-[14px] font-semibold leading-[18px] text-[#8e8e93]">
              {voteCount}/{totalCount}명 응답 완료
            </p>
            <div className="h-0.5 w-full max-w-[350px] overflow-hidden rounded-full bg-[#e5e5ea]">
              <div
                className="h-full rounded-full bg-[#8e8e93]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col items-center gap-10">
          <p className="text-[20px] font-bold leading-[28px] text-[#333333]">
            회식에 참석하시겠습니까?
          </p>
          <div className="flex w-full gap-2.5">
            <Button
              type="button"
              onClick={() => onSubmit("ATTEND")}
              disabled={isDisabled}
              className={cn(
                baseButtonStyles,
                myVoteStatus === "ATTEND"
                  ? selectedButtonStyles
                  : defaultButtonStyles
              )}
              aria-pressed={myVoteStatus === "ATTEND"}
            >
              참석
            </Button>
            <Button
              type="button"
              onClick={() => onSubmit("NON_ATTEND")}
              disabled={isDisabled}
              className={cn(
                baseButtonStyles,
                myVoteStatus === "NON_ATTEND"
                  ? selectedButtonStyles
                  : defaultButtonStyles
              )}
              aria-pressed={myVoteStatus === "NON_ATTEND"}
            >
              불참석
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
