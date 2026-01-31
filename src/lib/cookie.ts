import "server-only";

import { cookies } from "next/headers";

export async function getCookieValue(name: string): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(name)?.value ?? null;
}

export async function getAccessToken(): Promise<string | null> {
  return getCookieValue("access_token");
}

export async function deleteRefreshToken(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("refresh_token");
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

export function parseCookie(cookieString: string): ParsedCookie | null {
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
