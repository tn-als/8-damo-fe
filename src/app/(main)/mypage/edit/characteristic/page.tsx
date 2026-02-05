import { Header } from "@/src/components/layout/header";
import { getMyProfile } from "@/src/lib/actions/user-characteristics";
import { EditCharacteristicContainer } from "@/src/components/mypage/edit-profile/edit-characteristic-container";

export default async function EditCharacteristicPage() {
  const result = await getMyProfile();

  const initialData = result.success && result.data
    ? result.data
    : {
        allergies: [],
        likeFoods: [],
        likeIngredients: [],
        otherCharacteristics: "",
      };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header title="개인 특성 수정" />
      <EditCharacteristicContainer initialData={initialData} />
    </div>
  );
}
