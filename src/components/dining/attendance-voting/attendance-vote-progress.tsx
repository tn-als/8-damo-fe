interface AttendanceVoteProgressProps {
  totalCount: number;
  voteCount: number;
}

export function AttendanceVoteProgress({
  totalCount,
  voteCount,
}: AttendanceVoteProgressProps) {
  const safeTotal = Math.max(totalCount, 0);
  const safeVoteCount = Math.max(Math.min(voteCount, safeTotal), 0);
  const progressPercent =
    safeTotal === 0 ? 0 : Math.round((safeVoteCount / safeTotal) * 100);

  return (
    <div className="flex flex-col items-center gap-1.5">
      <p className="text-[14px] font-semibold leading-[18px] text-[#404040]">
        응답 현황
      </p>
      <div className="flex w-full flex-col items-center gap-2.5">
        <p className="text-[14px] font-semibold leading-[18px] text-[#8e8e93]">
          {safeVoteCount}/{safeTotal}명 응답 완료
        </p>
        <div className="h-0.5 w-full max-w-[350px] overflow-hidden rounded-full bg-[#e5e5ea]">
          <div
            className="h-full rounded-full bg-[#8e8e93]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
