"use client";

import { Phone } from "lucide-react";
import { KakaoMapView } from "@/src/components/ui/kakao-map-view";

interface RestaurantInfoProps {
  location: {
    lat: number;
    lng: number;
  };
  name: string;
  description?: string;
  phoneNumber?: string;
}

export function RestaurantInfo({
  location,
  name,
  description,
  phoneNumber,
}: RestaurantInfoProps) {
  const newLocation = {
    lat: 37.566295,
    lng: 126.991773
  }
  
  return (
    <section className="flex w-full flex-col gap-3">
      <div className="w-full overflow-hidden rounded-[12px]">
        <KakaoMapView location={newLocation} className="h-40 w-full" />
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="text-[17px] font-semibold leading-[24px] text-[#1f2937]">
          {name}
        </h2>
        {description && (
          <p className="text-[15px] leading-[22px] text-[#6b7280]">
            {description}
          </p>
        )}
        {phoneNumber && (
          <a
            href={`tel:${phoneNumber}`}
            className="flex items-center gap-2 text-[15px] font-medium leading-[22px] text-[#2563eb]"
          >
            <Phone className="size-4" />
            <span>{phoneNumber}</span>
          </a>
        )}
      </div>
    </section>
  );
}
