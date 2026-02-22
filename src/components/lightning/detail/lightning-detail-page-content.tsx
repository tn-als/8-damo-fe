import { Button } from "@/src/components/ui/button";
import type { LightningDetail } from "@/src/types/lightning";

import { LightningDetailHeader } from "./lightning-detail-header";
import { LightningDetailMapViewSection } from "./lightning-detail-map-view-section";
import { LightningDetailInfoSection } from "./lightning-detail-info-section";
import { LightningDetailDescriptionSection } from "./lightning-detail-description-section";
import { LightningDetailParticipantListSection } from "./lightning-detail-participant-list-section";

interface LightningDetailPageContentProps {
  detail: LightningDetail;
}

export function LightningDetailPageContent({
  detail,
}: LightningDetailPageContentProps) {
  return (
    <div className="mx-auto flex min-h-dvh w-full min-w-[320px] max-w-[430px] flex-col bg-background">
      <LightningDetailHeader/>

      <main className="flex-1 overflow-y-auto px-4 pb-28 pt-4">
        <LightningDetailMapViewSection location={detail.location}/>

        <LightningDetailInfoSection 
          title={detail.title} 
          meetingDate={detail.meetingDate}
          restaurantName={detail.restaurantName}
          currentParticipants={detail.currentParticipants}
          maxParticipants={detail.maxParticipants}
        />

        <LightningDetailDescriptionSection description={detail.description}/>

        <LightningDetailParticipantListSection 
          maxParticipants={detail.maxParticipants}
          currentParticipants={detail.currentParticipants}
          participants={detail.participants}
        />

      </main>

      <div className="sticky bottom-0 bg-background px-4 py-3">
        <Button className="h-12 w-full rounded-xl text-base font-semibold">
          참가하기
        </Button>
      </div>
    </div>
  );
}
