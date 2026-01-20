import { BasicInfoForm } from "@/components/onboarding/basic/basic-info-form";
import { PageHeader } from "@/components/ui/page-header";

export default function Page(){
    return <div className="mx-auto min-h-screen max-w-[430px] bg-background">
        <PageHeader title='기본 정보 입력'></PageHeader>
        <BasicInfoForm></BasicInfoForm>
    </div>
}