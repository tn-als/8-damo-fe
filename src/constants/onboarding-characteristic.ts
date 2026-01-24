export const ALLERGIES = [
  { value: "SHRIMP", label: "새우" },
  { value: "OYSTER", label: "굴" },
  { value: "CRAB", label: "게" },
  { value: "MUSSEL", label: "홍합" },
  { value: "SQUID", label: "오징어" },
  { value: "ABALONE", label: "전복" },
  { value: "MACKEREL", label: "고등어" },
  { value: "SHELLFISH", label: "조개류" },
  { value: "BUCKWHEAT", label: "메밀" },
  { value: "WHEAT", label: "밀" },
  { value: "SOYBEAN", label: "대두" },
  { value: "WALNUT", label: "호두" },
  { value: "PEANUT", label: "땅콩" },
  { value: "PINE_NUT", label: "잣" },
  { value: "EGG", label: "알류(가금류)" },
  { value: "MILK", label: "우유" },
  { value: "BEEF", label: "쇠고기" },
  { value: "PORK", label: "돼지고기" },
  { value: "CHICKEN", label: "닭고기" },
  { value: "PEACH", label: "복숭아" },
  { value: "TOMATO", label: "토마토" },
  { value: "SULFITES", label: "아황산류" },
] as const;

export type Allergy = typeof ALLERGIES[number]["value"];
export const ALLERGY_VALUES = ALLERGIES.map(
  (item) => item.value
) as readonly Allergy[];

export const FOOD_TYPES = [
  { value: "KOREAN", label: "한식" },
  { value: "CHINESE", label: "중식" },
  { value: "JAPANESE", label: "일식" },
  { value: "WESTERN", label: "양식" },
  { value: "INTERNATIONAL", label: "세계 음식" },
] as const;
export type FoodTypes = typeof FOOD_TYPES[number]["value"];
export const FOOD_TYPE_VALUES = FOOD_TYPES.map(
  (item) => item.value
) as readonly FoodTypes[];

export const INGREDIENTS = [
  { value: "MEAT", label: "육류" },
  { value: "POULTRY", label: "가금류" },
  { value: "SEAFOOD", label: "해산물" },
  { value: "VEGETABLE", label: "채소" },
  { value: "GRAIN", label: "곡물/면" },
  { value: "DAIRY", label: "유제품" },
] as const;

export type Ingredient = typeof INGREDIENTS[number]["value"];
export const INGREDIENTS_VALUES = INGREDIENTS.map(
  (item) => item.value
) as readonly Ingredient[];