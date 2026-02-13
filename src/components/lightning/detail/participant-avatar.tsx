import { Avatar } from "@/src/components/ui/avatar";

interface ParticipantAvatarProps {
  src?: string | null;
  nickname: string;
}

export function ParticipantAvatar({ src, nickname }: ParticipantAvatarProps) {
  return (
    <div className="flex min-h-12 items-center gap-3 rounded-xl border border-[#ececf0] bg-[#fafafc] px-3 py-2.5">
      <Avatar
        src={src}
        alt={nickname}
        fallbackText={nickname}
        size="sm"
        shape="circle"
        showBorder={false}
        className="bg-[#ffe4c7] text-[#9a4c00]"
      />
      <span className="min-w-0 truncate text-sm font-semibold text-[#1f2937]">
        {nickname}
      </span>
    </div>
  );
}
