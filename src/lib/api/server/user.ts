import "server-only";
import { serverGet } from "./index";
import {
  ALLERGIES,
  FOOD_TYPES,
  INGREDIENTS,
  type Allergy,
  type FoodTypes,
  type Ingredient,
} from "@/src/constants/onboarding-characteristic";

// 한글 label을 영문 value로 변환하는 매핑 생성
const ALLERGY_LABEL_TO_VALUE = Object.fromEntries(
  ALLERGIES.map((item) => [item.label, item.value])
) as Record<string, Allergy>;

const FOOD_TYPE_LABEL_TO_VALUE = Object.fromEntries(
  FOOD_TYPES.map((item) => [item.label, item.value])
) as Record<string, FoodTypes>;

const INGREDIENT_LABEL_TO_VALUE = Object.fromEntries(
  INGREDIENTS.map((item) => [item.label, item.value])
) as Record<string, Ingredient>;

interface CharacteristicItem {
  id: number;
  category: string;
}

interface ProfileDataRaw {
  allergies: CharacteristicItem[];
  likeFoods: CharacteristicItem[];
  likeIngredients: CharacteristicItem[];
  otherCharacteristics: string | null;
}

export interface ProfileData {
  allergies: string[];
  likeFoods: string[];
  likeIngredients: string[];
  otherCharacteristics: string;
}

export async function getMyProfile(): Promise<ProfileData> {
  const data = await serverGet<ProfileDataRaw>("/api/v1/users/me/profile");

  return {
    allergies: data.allergies
      .map((item) => ALLERGY_LABEL_TO_VALUE[item.category])
      .filter((value): value is Allergy => value !== undefined),
    likeFoods: data.likeFoods
      .map((item) => FOOD_TYPE_LABEL_TO_VALUE[item.category])
      .filter((value): value is FoodTypes => value !== undefined),
    likeIngredients: data.likeIngredients
      .map((item) => INGREDIENT_LABEL_TO_VALUE[item.category])
      .filter((value): value is Ingredient => value !== undefined),
    otherCharacteristics: data.otherCharacteristics ?? "",
  };
}
