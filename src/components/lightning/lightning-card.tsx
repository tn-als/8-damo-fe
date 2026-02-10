import { Button } from "@/src/components/ui/button";
import { Calendar, MapPin, Users } from "lucide-react";
import type { LightningItem } from "@/src/types/lightning";

export function LightningCard({ item }: { item: LightningItem }) {
  return (
    <article className="rounded-2xl border border-[#d1d1d6] bg-white px-4 py-5">
      <div className="text-lg font-bold leading-7 text-[#111111] sm:text-xl sm:leading-8">
        {item.description}
      </div>

      <div className="mt-4 flex flex-col gap-2 text-[#4b5565]">
        <div className="flex items-center gap-2.5">
          <Calendar className="size-4 shrink-0 sm:size-5" />
          <span className="text-sm font-medium leading-6 sm:text-base">
            {item.dateLabel}
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <MapPin className="size-4 shrink-0 sm:size-5" />
          <span className="text-sm font-medium leading-6 sm:text-base">
            {item.restaurantName}
          </span>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-[#334155]">
          <Users className="size-4 shrink-0 sm:size-5" />
          <span className="text-sm font-semibold leading-6 sm:text-base">
            {item.currentParticipants}/{item.maxParticipants}명
          </span>
        </div>
        <Button type="button" className="h-10 min-w-20 rounded-xl px-3 text-sm font-semibold sm:h-11 sm:min-w-24 sm:text-base">
          참가하기
        </Button>
      </div>
    </article>
  );
}