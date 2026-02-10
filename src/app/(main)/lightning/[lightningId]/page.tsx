import { notFound } from "next/navigation";
import { LightningDetailPageContent } from "@/src/components/lightning/detail/lightning-detail-page-content";
import { getMockLightningDetailById } from "@/src/components/lightning/detail/mock-lightning-detail";

interface LightningDetailPageProps {
  params: Promise<{
    lightningId: string;
  }>;
}

export default async function LightningDetailPage({
  params,
}: LightningDetailPageProps) {
  const { lightningId } = await params;
  const detail = getMockLightningDetailById(lightningId);

  if (!detail) {
    notFound();
  }

  return <LightningDetailPageContent detail={detail} />;
}
