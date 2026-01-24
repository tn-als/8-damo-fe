"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import { PageHeader } from "@/src/components/ui/page-header";
import { ProgressBar } from "@/src/components/ui/progress-bar";
import { NoPreferencesField } from "@/src/components/onboarding/characteristic/no-preferences-field";
import { AllergiesField } from "@/src/components/onboarding/characteristic/allergies-field";
import { useOnboardingStore } from "@/src/stores/onboarding-store";

export default function AllergiesPage() {
  const router = useRouter();
  const { noPreferences, setNoPreferences, allergies, setAllergies } =
    useOnboardingStore();

  const canProceed = noPreferences || allergies.length > 0;

  const handleNext = () => {
    if (!canProceed) return;
    router.push("/onboarding/characteristic/food-types");
  };

  const handleBack = () => {
    router.push("/onboarding/basic");
  };

  const handleNoPreferencesChange = (value: boolean) => {
    setNoPreferences(value);
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col bg-background px-4 sm:px-0">
      <div className="px-5 pt-4">
        <ProgressBar current={2} total={5} />
      </div>
      <PageHeader
        title={<>알레르기가 있나요?</>}
        subtitle={<>해당하는 알레르기가 있다면 선택해 주세요.</>}
        onBack={handleBack}
      />
      <main className="flex flex-1 flex-col px-5 pb-10 pt-6">
        <div className="flex flex-col gap-8">
          <NoPreferencesField
            value={noPreferences}
            onChange={handleNoPreferencesChange}
          />

          {!noPreferences && (
            <AllergiesField
              value={allergies}
              onChange={setAllergies}
              showLabel={false}
            />
          )}
        </div>

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
