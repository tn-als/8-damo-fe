import { BasicInfoForm } from "@/src/components/onboarding/basic/basic-info-form";
import { PageHeader } from "@/src/components/ui/page-header";

export default function Page(){
    return <div className="mx-auto min-h-screen w-full max-w-[430px] bg-background px-4 sm:px-0">
        <PageHeader title='기본 정보 입력'></PageHeader>
        <main className="flex flex-1 flex-col px-5 pb-10 pt-6">
            <BasicInfoForm></BasicInfoForm>
        </main>
    </div>
}