import { Header } from "@/src/components/layout/header";
import { LightningCreateContainer } from "@/src/components/lightning/create/lightning-create-container";

export default function LightningCreatePage() {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[430px] flex-col bg-background">
      <Header title="번개 만들기" showBackButton={true} />
      <LightningCreateContainer />
    </div>
  );
}