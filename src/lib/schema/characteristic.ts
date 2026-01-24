import { z } from "zod/v4";
import { 
  ALLERGY_VALUES,
  FOOD_TYPE_VALUES,
  INGREDIENTS_VALUES } from "@/src/constants/onboarding-characteristic";

export const characteristicSchema = z.object({
  allergies: z.array(z.enum(ALLERGY_VALUES)),
  foodTypes: z
    .array(z.enum(FOOD_TYPE_VALUES))
    .min(1, { error: "선호하는 음식 종류를 최소 1개 이상 선택해주세요." }),
  ingredients: z
    .array(z.enum(INGREDIENTS_VALUES))
    .min(1, { error: "선호하는 음식 재료를 최소 1개 이상 선택해주세요." }),
  additionalNotes: z
    .string()
    .max(100, { error: "최대 100자까지 입력 가능합니다." })
    .regex(/^[a-zA-Z가-힣!@#/,.?\s]*$/, { error: "영문, 한글, !@#/,.?만 입력 가능합니다." }),
});

export type CharacteristicFormValues = z.infer<typeof characteristicSchema>;
