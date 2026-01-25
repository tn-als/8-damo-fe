import { AllergiesForm } from "@/src/components/onboarding/characteristic/allergies-form";
import { PageHeader } from "@/src/components/ui/page-header";
import { ProgressBar } from "@/src/components/ui/progress-bar";

export default function Page() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col bg-background px-4 sm:px-0">
      <div className="px-5 pt-4">
        <ProgressBar current={2} total={5} />
      </div>
      <PageHeader
        title={<>알레르기가 있나요?</>}
        subtitle={<>해당하는 알레르기가 있다면 선택해 주세요.</>}
        backHref="/onboarding/basic"
      />
      <main className="flex flex-1 flex-col px-5 pb-10 pt-6">
        <AllergiesForm />
      </main>
    </div>
  );
}
