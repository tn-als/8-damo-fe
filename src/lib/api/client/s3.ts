import { bffPut, type ApiResponse } from "./index";

export interface PresignedUrlRequest {
  fileName: string;
  contentType: string;
  directory: string;
}

export interface PresignedUrlData {
  presignedUrl: string;
  objectKey: string;
  expiresIn: number;
}

export async function getPresignedUrl(
  data: PresignedUrlRequest
): Promise<ApiResponse<PresignedUrlData>> {
  return bffPut<PresignedUrlData>("/s3/presigned-url", data);
}
