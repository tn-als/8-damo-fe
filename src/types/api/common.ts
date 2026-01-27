// types/api/common.ts

export interface ApiResponse<T> {
  httpStatus: string;
  data: T;
  errorMessage: string | null;
}
