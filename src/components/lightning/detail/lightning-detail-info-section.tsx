import { DetailInfoRow } from "./detail-row";
import { Calendar, MapPin, Users } from "lucide-react";

interface LightningDetailInfoSectionProps {
  title: string;
  meetingDate: string;
  restaurantName: string;
  currentParticipants: number;
  maxParticipants: number;
}

export function LightningDetailInfoSection({
  title,
  meetingDate,
  restaurantName,
  currentParticipants,
  maxParticipants,
}: LightningDetailInfoSectionProps) {
  return (
    <section className="mt-4">
      <p className="inline-flex items-center rounded-full bg-[#fff1e4] px-2.5 py-1 text-[11px] font-semibold text-[#b45309]">
        번개 모임
      </p>
      <h2 className="mt-2 text-[22px] font-bold leading-8 text-[#111111]">
        {title}
      </h2>

      <div className="mt-3 grid grid-cols-2 gap-2.5">
        <DetailInfoRow
          icon={<Calendar className="size-4" />}
          label="일시"
          value={meetingDate}
        />
        <DetailInfoRow
          icon={<Users className="size-4" />}
          label="참여 인원"
          value={`${currentParticipants}/${maxParticipants}명`}
        />
        <DetailInfoRow
          className="col-span-2 min-h-[72px]"
          icon={<MapPin className="size-4" />}
          label="장소"
          value={restaurantName}
        />
      </div>
    </section>
  );
}
