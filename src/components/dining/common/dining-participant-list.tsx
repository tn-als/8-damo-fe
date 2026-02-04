"use client";

import { Avatar } from "@/src/components/ui/avatar";

export interface Participant {
  userId: number;
  nickname: string;
  imagePath: string;
}

interface DiningParticipantListProps {
  participants: Participant[];
}

const PERSON_FALLBACK_IMAGE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#d1d1d6">
  <circle cx="12" cy="8" r="4" />
  <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
</svg>
`);

export function DiningParticipantList({
  participants,
}: DiningParticipantListProps) {
  return (
    <section className="flex w-full flex-col gap-3 px-4 sm:px-5">
      <h2 className="text-[15px] font-semibold leading-[21px] text-[#333333] sm:text-[16px] sm:leading-[22px]">
        참석 확정 인원
      </h2>
      <div className="flex flex-col">
        {participants.map((participant) => (
          <div
            key={participant.userId}
            className="flex items-center gap-3 py-3"
          >
            <Avatar
              src={`https://${process.env.NEXT_PUBLIC_S3_CDN}/${participant.imagePath}`}
              alt={`${participant.nickname} 프로필`}
              fallbackUrl={PERSON_FALLBACK_IMAGE}
              size="sm"
              showBorder={false}
              className="bg-[#f2f2f7]"
            />
            <span className="text-[15px] font-semibold leading-[21px] text-[#333333] sm:text-[16px] sm:leading-[22px]">
              {participant.nickname}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
