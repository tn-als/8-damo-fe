import { NextResponse } from "next/server";

export interface ApiResponse<T = unknown> {
  httpStatus: string;
  data: T;
  errorMessage: string | null;
}

export function passthroughResponse<T>(payload: ApiResponse<T>, status: number) {
  if (status === 204) {
    return new NextResponse(null, { status });
  }
  return NextResponse.json(payload, { status });
}

export function errorResponse(message: string, status: number) {
  return NextResponse.json(
    { httpStatus: `${status}`, data: null, errorMessage: message },
    { status }
  );
}
