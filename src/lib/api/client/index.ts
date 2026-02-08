import axios, { AxiosError, type AxiosRequestConfig } from "axios";

export interface ApiResponse<T = unknown> {
  httpStatus: string;
  data: T;
  errorMessage: string | null;
}

export const bffClient = axios.create({
  baseURL: "/bff",
  headers: {
    "Content-Type": "application/json",
  },
});

bffClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiResponse>) => {
    return Promise.reject(error);
  }
);

// 타입 안전한 API 호출 헬퍼
export async function bffRequest<T>(
  config: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  const response = await bffClient.request<ApiResponse<T>>(config);
  return response.data;
}

// GET 헬퍼
export async function bffGet<T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  return bffRequest<T>({ ...config, method: "GET", url });
}

// POST 헬퍼
export async function bffPost<T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  return bffRequest<T>({ ...config, method: "POST", url, data });
}

// PATCH 헬퍼
export async function bffPatch<T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  return bffRequest<T>({ ...config, method: "PATCH", url, data });
}

// PUT 헬퍼
export async function bffPut<T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  return bffRequest<T>({ ...config, method: "PUT", url, data });
}

// DELETE 헬퍼
export async function bffDelete<T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  return bffRequest<T>({ ...config, method: "DELETE", url });
}
