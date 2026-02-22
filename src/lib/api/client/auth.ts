import { bffPost, type ApiResponse } from "./index";

export type OnboardingStep = "BASIC" | "CHARACTERISTIC" | "DONE";

interface OAuthData {
  onboardingStep: OnboardingStep;
}

export async function processKakaoOAuth(
  code: string
): Promise<ApiResponse<OAuthData>> {
  return bffPost<OAuthData>("/auth/oauth", { code });
}

export async function processAuthTest(): Promise<ApiResponse<null>> {
  return bffPost<null>("auth/test");
}

export async function logout(): Promise<ApiResponse<null>> {
  return bffPost<null>("/auth/logout");
}
