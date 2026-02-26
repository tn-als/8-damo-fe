import { bffPost, type ApiResponse } from "./index";

export type OnboardingStep = "BASIC" | "CHARACTERISTIC" | "DONE";

interface OAuthData {
  onboardingStep: OnboardingStep;
}

interface ReissueData {
  accessToken: string;
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

export async function reissueAuthToken(): Promise<ApiResponse<ReissueData>> {
  return bffPost<ReissueData>("/auth/reissue");
}
