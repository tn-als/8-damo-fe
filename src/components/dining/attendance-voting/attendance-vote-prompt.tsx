interface AttendanceVotePromptProps {
  diningDate: string;
}

export function AttendanceVotePrompt({
  diningDate,
}: AttendanceVotePromptProps) {
  return (
    <div className="flex w-full flex-col items-center gap-10">
      <p className="sr-only">회식 날짜 {diningDate}</p>
      <p className="text-[20px] font-bold leading-[28px] text-[#333333]">
        회식에 참석하시겠습니까?
      </p>
    </div>
  );
}
