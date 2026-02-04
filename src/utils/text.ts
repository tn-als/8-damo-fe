const segmenter = new Intl.Segmenter("ko", { granularity: "grapheme" });
const emojiRegex = /\p{Extended_Pictographic}|\u200D|\uFE0F/u;

export function segmentGraphemes(value: string): string[] {
  return Array.from(segmenter.segment(value), (s) => s.segment);
}

export function isEmoji(grapheme: string): boolean {
  return emojiRegex.test(grapheme);
}

export function containsEmoji(value: string): boolean {
  const graphemes = segmentGraphemes(value);
  return graphemes.some((g) => isEmoji(g));
}

export function countGraphemes(value: string): number {
  return segmentGraphemes(value).length;
}

export function limitGraphemes(value: string, maxLength: number): string {
  const graphemes = segmentGraphemes(value);

  if (graphemes.length <= maxLength) {
    return value;
  }

  return graphemes.slice(0, maxLength).join("");
}
