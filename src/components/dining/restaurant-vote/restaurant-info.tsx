"use client";

import { Check, Phone } from "lucide-react";
import { KakaoMapView } from "@/src/components/ui/kakao-map-view";

interface RestaurantInfoProps {
  location: {
    lat: number;
    lng: number;
  };
  name: string;
  description?: string;
  phoneNumber?: string;
  badgeLabel?: string;
}

export function RestaurantInfo({
  location,
  name,
  description,
  phoneNumber,
  badgeLabel,
}: RestaurantInfoProps) {
  return (
    <section className="flex w-full flex-col gap-3">
      <div className="w-full overflow-hidden rounded-[12px]">
        <KakaoMapView location={location} className="h-40 w-full" />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <h2 className="text-[17px] font-semibold leading-[24px] text-[#1f2937]">
            {name}
          </h2>
          {badgeLabel && (
            <span className="inline-flex items-center gap-1 rounded-full border border-border bg-primary px-2.5 py-1 text-[11px] font-medium leading-[14px] text-primary-foreground">
              <Check className="size-3" />
              {badgeLabel}
            </span>
          )}
        </div>
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
