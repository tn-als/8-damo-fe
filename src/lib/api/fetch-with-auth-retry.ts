import "server-only";

import { getAccessToken } from "../cookie";
import { reissueAccessToken } from "../auth/reissue";

/**
 * 인증이 필요한 API 요청을 수행하는 fetch wrapper
 * - 자동으로 Authorization 헤더 추가
 * - 401 응답 시 토큰 재발급 후 1회 재시도
 *
 * @param input - fetch URL 또는 Request
 * @param init - fetch 옵션 (method, headers, body 등)
 * @returns Response 객체
 */
export async function fetchWithAuthRetry(
  input: string | URL | Request,
  init?: RequestInit
): Promise<Response> {
  const accessToken = await getAccessToken();

  const makeRequest = async (token?: string | null): Promise<Response> => {
    const headers = new Headers(init?.headers);
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return fetch(input, {
      ...init,
      headers,
    });
  };

  const response = await makeRequest(accessToken);

  if (response.status !== 401) {
    return response;
  }

  const reissueSuccess = await reissueAccessToken();

  if (!reissueSuccess) {
    return response;
  }

  const newAccessToken = await getAccessToken();

  if (!newAccessToken) {
    return response;
  }

  return makeRequest(newAccessToken);
}
