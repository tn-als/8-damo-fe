import "server-only";

import { cookies } from "next/headers";

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
  const value = valueParts.join("=");

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

/**
 * 서버 액션에서 access token 재발급 수행 (Server Action 전용)
 * - 현재 쿠키의 refresh_token을 백엔드로 전달
 * - 성공 시 새 access_token, refresh_token을 쿠키에 설정
 * @returns 성공 여부
 */
export async function reissueAccessToken(): Promise<boolean> {
  const API_BASE_URL =
    process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!API_BASE_URL) {
    console.error("[reissueAccessToken] Missing API base URL env");
    return false;
  }

  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  const cookieHeader = allCookies
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/reissue`, {
      method: "POST",
      headers: {
        Cookie: cookieHeader,
      },
    });

    if (!response.ok) {
      console.error(
        "[reissueAccessToken] Failed with status:",
        response.status
      );
      return false;
    }

    // Set-Cookie 헤더 파싱 및 쿠키 설정
    const setCookieHeader = response.headers.get("set-cookie");
    if (setCookieHeader) {
      // 여러 쿠키가 있을 수 있으므로 분리하여 처리
      const cookieStrings = setCookieHeader.split(/,(?=\s*\w+=)/);

      for (const cookieString of cookieStrings) {
        const parsed = parseCookie(cookieString.trim());
        if (parsed) {
          cookieStore.set(parsed.name, parsed.value, parsed.options);
        }
      }
    }

    return true;
  } catch (error) {
    console.error("[reissueAccessToken] Request failed", error);
    return false;
  }
}
