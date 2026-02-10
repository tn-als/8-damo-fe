"use client";
import Link from "next/link";
import { Plus } from "lucide-react";
import { MOCK_LIGHTNING_ITEMS } from "./mock-lightning-item";
import { LightningCard } from "./lightning-card";
import { useRouter } from "next/navigation";
import { BottomNavigationBar } from "@/src/components/layout";
import { Button } from "@/src/components/ui/button";
import { SegmentedTabs } from "@/src/components/ui/segmented-tabs";
import type { LightningTab } from "@/src/types/lightning";

interface LightningPageContentProps {
  activeTab: LightningTab;
}

const TAB_OPTIONS: { value: LightningTab; label: string }[] = [
  { value: "recruiting", label: "모집 중 번개" },
  { value: "joined", label: "내가 참여한 번개" },
];

export function LightningPageContent({ activeTab }: LightningPageContentProps) {
  const router = useRouter();
  const items =
    activeTab === "joined"
      ? MOCK_LIGHTNING_ITEMS.filter((item) => item.joined)
      : MOCK_LIGHTNING_ITEMS;

  return (
    <>
      <main className="mx-auto flex min-h-dvh w-full min-w-[320px] max-w-[430px] flex-col bg-background px-3 pb-24 pt-4 sm:px-4">
        <h1 className="text-2xl font-bold leading-8 text-[#111111] sm:text-[28px] sm:leading-9">
          번개
        </h1>

        <SegmentedTabs
          tabs={TAB_OPTIONS}
          value={activeTab}
          onChange={(value) =>
            router.push(`/lightning?tab=${value as LightningTab}`)
          }
          className="mt-3 rounded-2xl bg-[#e8e8ed] p-1"
        />

        <section className="mt-4 flex flex-col gap-3">
          {items.map((item) => (
            <LightningCard key={item.id} item={item} />
          ))}
        </section>
      </main>
      <div className="pointer-events-none fixed bottom-20 left-1/2 w-full max-w-[430px] -translate-x-1/2 px-4">
        <div className="flex justify-end">
          <Button
            asChild
            size="icon-lg"
            className="pointer-events-auto size-14 rounded-full bg-[#ff8d28] text-white shadow-lg hover:bg-[#ff8d28]/90"
          >
            <Link href="/lightning/create" aria-label="번개 생성하기">
              <Plus className="size-6" />
            </Link>
          </Button>
        </div>
      </div>
      <BottomNavigationBar />
    </>
  );
}
