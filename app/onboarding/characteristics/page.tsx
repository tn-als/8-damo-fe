import { CharacteristicsForm } from "@/components/onboarding/characteristics";
import { PageHeader } from "@/components/ui/page-header";

export default function Page(){
    return <div className="mx-auto min-h-screen max-w-[430px] bg-background">
          <PageHeader                                                                                                                                   
            title={<>아래 해당하는 상태가 있다면<br />선택해 주세요.</>}                                                                                
            subtitle={<>알레르기가 있거나 선호하지 않는 음식이 있다면 피해서<br />추천해 드릴게요.</>}                                                                                                                                 
        />    
        <CharacteristicsForm></CharacteristicsForm>
    </div>
}