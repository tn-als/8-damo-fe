"use client";

import { useEffect, useRef } from "react";
import { toast } from "@/src/components/ui/sonner";

interface DiningErrorToastProps {
  messages: string[];
}

export function DiningErrorToast({ messages }: DiningErrorToastProps) {
  const shownMessages = useRef(new Set<string>());

  useEffect(() => {
    messages.forEach((message) => {
      if (!message || shownMessages.current.has(message)) {
        return;
      }

      toast.error(message);
      shownMessages.current.add(message);
    });
  }, [messages]);

  return null;
}
