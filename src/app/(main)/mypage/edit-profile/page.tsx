import { Header } from "@/src/components/layout/header";
import { getMyProfile } from "@/src/lib/actions/user-characteristics";
import { EditProfileContainer } from "@/src/components/mypage/edit-profile/edit-profile-container";

export default async function EditProfilePage() {
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
      <Header title="음식 취향 수정" />
      <EditProfileContainer initialData={initialData} />
    </div>
  );
}
