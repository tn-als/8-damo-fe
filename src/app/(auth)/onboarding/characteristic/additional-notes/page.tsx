"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import { PageHeader } from "@/src/components/ui/page-header";
import { ProgressBar } from "@/src/components/ui/progress-bar";
import { AdditionalNotesField } from "@/src/components/onboarding/characteristic/additional-notes-field";
import { useOnboardingStore } from "@/src/stores/onboarding-store";

export default function AdditionalNotesPage() {
  const router = useRouter();
  const { additionalNotes, setAdditionalNotes, getCharacteristics } =
    useOnboardingStore();

  const handleComplete = () => {
    const characteristics = getCharacteristics();
    console.log("Onboarding completed:", characteristics);
    // TODO: API 호출 후 다음 페이지로 이동
  };

  const handleBack = () => {
    router.push("/onboarding/characteristic/ingredients");
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col bg-background px-4 sm:px-0">
      <div className="px-5 pt-4">
        <ProgressBar current={5} total={5} />
      </div>
      <PageHeader
        title={<>추가로 전달하고 싶은 내용이 있나요?</>}
        subtitle={<>음식 추천에 참고할 내용을 적어주세요.</>}
        onBack={handleBack}
      />
      <main className="flex flex-1 flex-col px-5 pb-10 pt-6">
        <AdditionalNotesField
          value={additionalNotes}
          onChange={setAdditionalNotes}
          showLabel={false}
        />

        <div className="mt-auto pt-8">
          <Button
            onClick={handleComplete}
            className="h-16 w-full rounded-lg bg-primary text-base font-semibold text-white shadow-md hover:bg-primary/90"
          >
            완료
          </Button>
        </div>
      </main>
    </div>
  );
}
