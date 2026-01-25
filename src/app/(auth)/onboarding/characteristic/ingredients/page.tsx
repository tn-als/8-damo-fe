import { IngredientsForm } from "@/src/components/onboarding/characteristic/ingredients-form";
import { PageHeader } from "@/src/components/ui/page-header";
import { ProgressBar } from "@/src/components/ui/progress-bar";

export default function Page() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col bg-background px-4 sm:px-0">
      <div className="px-5 pt-4">
        <ProgressBar current={4} total={5} />
      </div>
      <PageHeader
        title={<>선호하는 재료가 있나요?</>}
        subtitle={<>좋아하는 음식 재료를 선택해 주세요.</>}
        backHref="/onboarding/characteristic/food-types"
      />
      <main className="flex flex-1 flex-col px-5 pb-10 pt-6">
        <IngredientsForm />
      </main>
    </div>
  );
}
