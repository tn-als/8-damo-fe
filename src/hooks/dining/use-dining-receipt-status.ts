import { useQuery } from "@tanstack/react-query";
import { getDiningReceiptOcrStatus } from "@/src/lib/api/client/receipt";

const RECEIPT_POLLING_INTERVAL_MS = 20_000;

export function useDiningReceiptStatus(
  groupId: string,
  diningId: string,
  enabled: boolean
) {
  return useQuery({
    queryKey: ["dining", "detail", groupId, diningId, "receipt-ocr-status"],
    queryFn: async () => {
      const response = await getDiningReceiptOcrStatus({ groupId, diningId });
      return response.data;
    },
    enabled,
    refetchInterval: (query) => {
      const status = query.state.data?.ocrStatus;
      if (status === "SUCCESS" || status === "FAIL") return false;
      return RECEIPT_POLLING_INTERVAL_MS;
    },
    refetchOnWindowFocus: false,
  });
}
