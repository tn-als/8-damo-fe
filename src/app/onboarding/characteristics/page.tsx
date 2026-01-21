import { CharacteristicsForm } from "@/src/components/onboarding/characteristics";
import { PageHeader } from "@/src/components/ui/page-header";

export default function Page(){
    return <div className="mx-auto min-h-screen w-full max-w-[430px] bg-background px-4 sm:px-0">
        <PageHeader
            title={<>아래 해당하는 상태가 있다면<br />선택해 주세요.</>}
            subtitle={<>알레르기가 있거나 선호하는 음식이 있다면 피해서<br />추천해 드릴게요.</>}
        />
        <main className="flex flex-1 flex-col px-5 pb-10 pt-6">
            <CharacteristicsForm></CharacteristicsForm>
        </main>
    </div>
}