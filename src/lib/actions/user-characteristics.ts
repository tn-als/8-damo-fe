"use server";

import { fetchWithAuthRetry } from "../api/fetch-with-auth-retry";
import { getErrorMessage } from "../api/error-handler";
import type { ApiResponse } from "@/src/types/api/common";
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

interface UpdateCharacteristicsRequest {
  allergies: string[];
  likeFoods: string[];
  likeIngredients: string[];
  otherCharacteristics: string;
}

interface UpdateCharacteristicsResponse {
  success: boolean;
  error?: string;
}

interface CharacteristicItem {
  id: number;
  category: string;
}

interface ProfileData {
  allergies: CharacteristicItem[];
  likeFoods: CharacteristicItem[];
  likeIngredients: CharacteristicItem[];
  otherCharacteristics: string | null;
}

export interface GetMyProfileResponse {
  success: boolean;
  data?: {
    allergies: string[];
    likeFoods: string[];
    likeIngredients: string[];
    otherCharacteristics: string;
  };
  error?: string;
}

export async function getMyProfile(): Promise<GetMyProfileResponse> {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  if (!API_BASE_URL) {
    return { success: false, error: "API base URL이 설정되지 않았습니다." };
  }

  try {
    const response = await fetchWithAuthRetry(
      `${API_BASE_URL}/api/v1/users/me/profile`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const payload = (await response.json().catch(() => null)) as
      | ApiResponse<ProfileData>
      | null;

    if (!response.ok || !payload) {
      return {
        success: false,
        error: getErrorMessage(payload, response.status),
      };
    }

    const profileData = payload.data;

    return {
      success: true,
      data: {
        allergies: profileData.allergies
          .map((item) => ALLERGY_LABEL_TO_VALUE[item.category])
          .filter((value): value is Allergy => value !== undefined),
        likeFoods: profileData.likeFoods
          .map((item) => FOOD_TYPE_LABEL_TO_VALUE[item.category])
          .filter((value): value is FoodTypes => value !== undefined),
        likeIngredients: profileData.likeIngredients
          .map((item) => INGREDIENT_LABEL_TO_VALUE[item.category])
          .filter((value): value is Ingredient => value !== undefined),
        otherCharacteristics: profileData.otherCharacteristics ?? "",
      },
    };
  } catch (error) {
    console.error("[getMyProfile] Request failed", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "요청 중 오류가 발생했습니다.",
    };
  }
}

export async function updateCharacteristics(
  data: UpdateCharacteristicsRequest
): Promise<UpdateCharacteristicsResponse> {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  if (!API_BASE_URL) {
    return { success: false, error: "API base URL이 설정되지 않았습니다." };
  }

  try {
    const response = await fetchWithAuthRetry(
      `${API_BASE_URL}/api/v1/users/me/characteristics`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const payload = (await response.json().catch(() => null)) as
      | ApiResponse<unknown>
      | null;

    if (!response.ok) {
      return {
        success: false,
        error: getErrorMessage(payload, response.status),
      };
    }

    return { success: true };
  } catch (error) {
    console.error("[updateCharacteristics] Request failed", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "요청 중 오류가 발생했습니다.",
    };
  }
}

export async function editProfile(
  data: UpdateCharacteristicsRequest
): Promise<UpdateCharacteristicsResponse> {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  if (!API_BASE_URL) {
    return { success: false, error: "API base URL이 설정되지 않았습니다." };
  }

  try {
    const response = await fetchWithAuthRetry(
      `${API_BASE_URL}/api/v1/users/me/characteristics`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const payload = (await response.json().catch(() => null)) as
      | ApiResponse<unknown>
      | null;

    if (!response.ok) {
      return {
        success: false,
        error: getErrorMessage(payload, response.status),
      };
    }

    return { success: true };
  } catch (error) {
    console.error("[updateCharacteristics] Request failed", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "요청 중 오류가 발생했습니다.",
    };
  }
}