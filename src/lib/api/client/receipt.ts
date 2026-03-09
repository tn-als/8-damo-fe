import { bffGet, type ApiResponse } from "./index";
import { ReceiptOcrStatusResponse } from "@/src/types/api/dining";

export async function getDiningReceiptOcrStatus(params: {
  groupId: string;
  diningId: string;
}): Promise<ApiResponse<ReceiptOcrStatusResponse>> {
  const { groupId, diningId } = params;
  return bffGet<ReceiptOcrStatusResponse>(
    `/groups/${groupId}/dining/${diningId}/receipt-ocr/status`
  );
}