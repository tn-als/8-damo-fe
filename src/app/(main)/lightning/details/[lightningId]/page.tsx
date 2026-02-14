import { LightningDetailClient } from "@/src/components/lightning/detail/lightning-detail-client";

interface Props {
  params: Promise<{
    lightningId: string;
  }>;
}

export default async function LightningDetailPage({ params }: Props) {
  const { lightningId } = await params;

  return <LightningDetailClient lightningId={lightningId} />;
}