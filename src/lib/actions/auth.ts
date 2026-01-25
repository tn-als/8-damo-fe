"use server";

import { cookies } from "next/headers";

export type OnboardingStep = "BASIC" | "CHARACTERISTIC" | "DONE";

interface KakaoOAuthResponse {
  success: true;
  onboardingStep: OnboardingStep;
}

interface KakaoOAuthError {
  success: false;
  error: string;
}

export type KakaoOAuthResult = KakaoOAuthResponse | KakaoOAuthError;

/**
 * 카카오 OAuth 인가 코드를 백엔드에 전달하여 인증 처리
 * - 백엔드에서 받은 쿠키를 클라이언트에 설정
 * - onboardingStep 반환
 */
export async function processKakaoOAuth(code: string): Promise<KakaoOAuthResult> {
  const API_BASE_URL =
    process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!API_BASE_URL) {
    console.error("[processKakaoOAuth] Missing API base URL env");
    return { success: false, error: "API base URL이 설정되지 않았습니다." };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/oauth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.errorMessage || `인증 실패 (${response.status})`,
      };
    }

    // Set-Cookie 헤더 파싱 및 쿠키 설정
    const setCookieHeader = response.headers.get("set-cookie");
    if (setCookieHeader) {
      const cookieStore = await cookies();

      // 여러 쿠키가 있을 수 있으므로 분리하여 처리
      const cookieStrings = setCookieHeader.split(/,(?=\s*\w+=)/);

      for (const cookieString of cookieStrings) {
        const parsed = parseCookie(cookieString.trim());
        if (parsed) {
          cookieStore.set(parsed.name, parsed.value, parsed.options);
        }
      }
    }

    const data = await response.json();
    const onboardingStep = data?.data?.onboardingStep as OnboardingStep;

    if (!onboardingStep) {
      return { success: false, error: "온보딩 상태를 확인할 수 없습니다." };
    }

    return { success: true, onboardingStep };
  } catch (error) {
    console.error("[processKakaoOAuth] Request failed", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "요청 중 오류가 발생했습니다.",
    };
  }
}

interface ParsedCookie {
  name: string;
  value: string;
  options: {
    path?: string;
    maxAge?: number;
    expires?: Date;
    httpOnly?: boolean;
    secure?: boolean;
    sameSite?: "strict" | "lax" | "none";
  };
}

function parseCookie(cookieString: string): ParsedCookie | null {
  const parts = cookieString.split(";").map((p) => p.trim());
  if (parts.length === 0) return null;

  const [nameValue, ...attributes] = parts;
  const [name, ...valueParts] = nameValue.split("=");
  const value = valueParts.join("="); // value에 = 문자가 포함될 수 있음

  if (!name || value === undefined) return null;

  const options: ParsedCookie["options"] = {};

  for (const attr of attributes) {
    const [attrName, ...attrValueParts] = attr.split("=");
    const attrValue = attrValueParts.join("=");
    const lowerName = attrName.toLowerCase();

    switch (lowerName) {
      case "path":
        options.path = attrValue;
        break;
      case "max-age":
        options.maxAge = parseInt(attrValue, 10);
        break;
      case "expires":
        options.expires = new Date(attrValue);
        break;
      case "httponly":
        options.httpOnly = true;
        break;
      case "secure":
        options.secure = true;
        break;
      case "samesite":
        options.sameSite = attrValue.toLowerCase() as "strict" | "lax" | "none";
        break;
    }
  }

  return { name, value, options };
}
