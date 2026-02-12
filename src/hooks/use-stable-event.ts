"use client"

import { useCallback, useEffect, useRef } from "react";

export function useStableEvent<T extends(...args: T[]) => T>(
  handler?: T
): T {
  const handlerRef = useRef<T | undefined>(handler);

  useEffect(() => {
    if (!handlerRef.current) {
      throw new Error("Handler is not defined");
    }

    handlerRef.current = handler;
  }, [handler]);

  return useCallback(((...args: T[]) => {
    return handlerRef.current?.(...args);
  }) as T, []);
}