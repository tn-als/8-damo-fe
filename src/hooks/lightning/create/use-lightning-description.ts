"use client";

import { useCallback, useMemo, useState } from "react";
import {
  countGraphemes,
  isEmoji,
  limitGraphemes,
  segmentGraphemes,
} from "@/src/utils/text";

const MAX_DESCRIPTION_LENGTH = 12;

function normalizeDescription(value: string): string {
  const filtered = segmentGraphemes(value)
    .filter((g) => !isEmoji(g))
    .join("");

  return limitGraphemes(filtered, MAX_DESCRIPTION_LENGTH);
}

interface UseLightningDescriptionResult {
  description: string;
  descriptionCount: number;
  maxLength: number;
  setNormalizedDescription: (value: string) => void;
}

export function useLightningDescription(): UseLightningDescriptionResult {
  const [description, setDescription] = useState("");

  const setNormalizedDescription = useCallback((value: string) => {
    setDescription(normalizeDescription(value));
  }, []);

  const descriptionCount = useMemo(
    () => countGraphemes(description),
    [description]
  );

  return {
    description,
    descriptionCount,
    maxLength: MAX_DESCRIPTION_LENGTH,
    setNormalizedDescription,
  };
}
