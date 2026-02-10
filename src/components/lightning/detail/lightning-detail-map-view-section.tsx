import { LightningDetail } from "@/src/types/lightning"
import { KakaoMapView } from "../../ui/kakao-map-view"

interface LightningDetailMapViewSectionProps {
  location: LightningDetail["location"];
}

export function LightningDetailMapViewSection({ location }: LightningDetailMapViewSectionProps){
  return <section className="overflow-hidden rounded-2xl border border-[#d1d1d6] bg-white">
    <KakaoMapView location={location} className="h-44 w-full" />
  </section>
}