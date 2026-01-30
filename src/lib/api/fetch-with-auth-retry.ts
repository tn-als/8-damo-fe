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
 * @throws 토큰이 없는 경우 Error
 */
export async function fetchWithAuthRetry(
  input: string | URL | Request,
  init?: RequestInit
): Promise<Response> {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    throw new Error("인증 토큰이 없습니다.");
  }

  const makeRequest = async (token: string): Promise<Response> => {
    const headers = new Headers(init?.headers);
    headers.set("Authorization", `Bearer ${token}`);

    return fetch(input, {
      ...init,
      headers,
    });
  };

  // 첫 번째 요청
  const response = await makeRequest(accessToken);

  // 401이 아니면 바로 반환
  if (response.status !== 401) {
    return response;
  }

  // 401인 경우 토큰 재발급 시도
  const reissueSuccess = await reissueAccessToken();

  if (!reissueSuccess) {
    // 재발급 실패 시 원래 401 응답 반환
    return response;
  }

  // 재발급 성공 시 새 토큰으로 재시도
  const newAccessToken = await getAccessToken();

  if (!newAccessToken) {
    // 새 토큰을 가져올 수 없으면 원래 401 응답 반환
    return response;
  }

  // 1회만 재시도
  return makeRequest(newAccessToken);
}
