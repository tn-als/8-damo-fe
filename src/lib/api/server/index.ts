import "server-only";
import axios, { type AxiosRequestConfig } from "axios";
import { getAccessToken } from "@/src/lib/cookie";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// 백엔드 응답 형식
export interface ApiResponse<T = unknown> {
  httpStatus: string;
  data: T;
  errorMessage: string | null;
}

// 서버 컴포넌트용 axios 인스턴스
export const serverAxios = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 인증 토큰 주입 함수
export async function serverRequest<T>(
  config: AxiosRequestConfig
): Promise<T> {
  const accessToken = await getAccessToken();
  const response = await serverAxios.request<ApiResponse<T>>({
    ...config,
    headers: {
      ...config.headers,
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
  });
  return response.data.data;
}

// GET 헬퍼
export async function serverGet<T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> {
  return serverRequest<T>({ ...config, method: "GET", url });
}

// POST 헬퍼
export async function serverPost<T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<T> {
  return serverRequest<T>({ ...config, method: "POST", url, data });
}
