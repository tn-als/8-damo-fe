import { Users } from "lucide-react";

interface GroupDetailProps {
  description: string;
  memberCount: number;
}

export function GroupDetailInformationSection({
  description,
  memberCount,
}: GroupDetailProps) {
  return (
    <div className="flex flex-col gap-3 px-5 pb-5">
      <p className="text-base font-semibold leading-[22px] text-[#8e8e93]">
        {description}
      </p>
      <div className="flex items-center gap-1.5">
        <Users className="size-6 text-[#aeaeb2]" />
        <span className="text-base font-semibold leading-[22px] text-[#404040]">
          {memberCount}명 참여 중
        </span>
      </div>
    </div>
  );
}