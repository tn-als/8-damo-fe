"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import { PageHeader } from "@/src/components/ui/page-header";
import { ProgressBar } from "@/src/components/ui/progress-bar";
import { IngredientsField } from "@/src/components/onboarding/characteristic/ingredients-field";
import { useOnboardingStore } from "@/src/stores/onboarding-store";

export default function IngredientsPage() {
  const router = useRouter();
  const { ingredients, setIngredients } = useOnboardingStore();

  const canProceed = ingredients.length > 0;

  const handleNext = () => {
    if (!canProceed) return;
    router.push("/onboarding/characteristic/additional-notes");
  };

  const handleBack = () => {
    router.push("/onboarding/characteristic/food-types");
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col bg-background px-4 sm:px-0">
      <div className="px-5 pt-4">
        <ProgressBar current={4} total={5} />
      </div>
      <PageHeader
        title={<>선호하는 재료가 있나요?</>}
        subtitle={<>좋아하는 음식 재료를 선택해 주세요.</>}
        onBack={handleBack}
      />
      <main className="flex flex-1 flex-col px-5 pb-10 pt-6">
        <IngredientsField
          value={ingredients}
          onChange={setIngredients}
          showLabel={false}
        />

        <div className="mt-auto pt-8">
          <Button
            onClick={handleNext}
            disabled={!canProceed}
            className="h-16 w-full rounded-lg bg-primary text-base font-semibold text-white shadow-md hover:bg-primary/90 disabled:opacity-50"
          >
            다음
          </Button>
        </div>
      </main>
    </div>
  );
}
