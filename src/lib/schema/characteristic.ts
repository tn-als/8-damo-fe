import { z } from "zod/v4";
import {
  ALLERGY_VALUES,
  FOOD_TYPE_VALUES,
  INGREDIENTS_VALUES } from "@/src/constants/onboarding-characteristic";

// 개별 단계별 스키마
export const allergiesSchema = z.object({
  noAllergy: z.boolean(),
  allergies: z.array(z.enum(ALLERGY_VALUES)),
}).refine(
  (data) => data.noAllergy || data.allergies.length > 0,
  { message: "알레르기가 없으면 '해당사항 없음'을 선택해주세요." }
);

export const foodTypesSchema = z.object({
  foodTypes: z
    .array(z.enum(FOOD_TYPE_VALUES))
    .min(1, { error: "선호하는 음식 종류를 최소 1개 이상 선택해주세요." }),
});

export const ingredientsSchema = z.object({
  ingredients: z
    .array(z.enum(INGREDIENTS_VALUES))
    .min(1, { error: "선호하는 음식 재료를 최소 1개 이상 선택해주세요." }),
});

export const additionalNotesSchema = z.object({
  additionalNotes: z
    .string()
    .max(100, { error: "최대 100자까지 입력 가능합니다." })
    .regex(/^[a-zA-Z가-힣!@#/,.?\s]*$/, { error: "영문, 한글, !@#/,.?만 입력 가능합니다." }),
});

// 전체 스키마 (레거시 호환용)
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

// 타입 exports
export type AllergiesFormValues = z.infer<typeof allergiesSchema>;
export type FoodTypesFormValues = z.infer<typeof foodTypesSchema>;
export type IngredientsFormValues = z.infer<typeof ingredientsSchema>;
export type AdditionalNotesFormValues = z.infer<typeof additionalNotesSchema>;
export type CharacteristicFormValues = z.infer<typeof characteristicSchema>;
