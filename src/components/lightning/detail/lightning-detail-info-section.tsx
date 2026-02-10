import { DetailInfoRow } from "./detail-row";
import { Calendar, MapPin, Users } from "lucide-react";

interface LightningDetailInfoSectionProps{
  title: string;
  meetingDate: string;
  restaurantName: string;
  currentParticipants: number;
  maxParticipants: number;
}

export function LightningDetailInfoSection({title, meetingDate, restaurantName, currentParticipants, maxParticipants}: LightningDetailInfoSectionProps){
  return <section className="mt-4 space-y-2.5">
    <h2 className="text-lg font-bold leading-7 text-[#111111]">
      {title}
    </h2>

    <DetailInfoRow
      icon={<Calendar className="size-4" />}
      label="일시"
      value={meetingDate}
    />
    <DetailInfoRow
      icon={<MapPin className="size-4" />}
      label="장소"
      value={restaurantName}
    />
    <DetailInfoRow
      icon={<Users className="size-4" />}
      label="참여 인원"
      value={`${currentParticipants}/${maxParticipants}명`}
    />
    </section>
}