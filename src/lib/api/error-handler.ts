export function getErrorMessage(
  payload: { errorMessage?: string | null; httpStatus?: string } | null,
  responseStatus: number
): string {
  if (payload?.errorMessage) return payload.errorMessage;
  if (payload?.httpStatus) return payload.httpStatus;
  return `요청 실패 (${responseStatus})`;
}
