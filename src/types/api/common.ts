// types/api/common.ts

export interface ApiResponse<T> {
  httpStatus: string;
  data: T;
  errorMessage: string | null;
}

export type ApiNestedResponse<T> = ApiResponse<ApiResponse<T>>;
