"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

export function useInvalidateLightning() {
  const queryClient = useQueryClient();

  const invalidateLightningList = useCallback(async () => {
    await queryClient.invalidateQueries({
      queryKey: ["lightning", "list"],
    });
  }, [queryClient]);

  const invalidateLightningDetail = useCallback(
    async (lightningId: string) => {
      await queryClient.invalidateQueries({
        queryKey: ["lightning", "detail", lightningId],
      });
    },
    [queryClient]
  );

  return { invalidateLightningList, invalidateLightningDetail };
}
