const segmenter = new Intl.Segmenter("ko", { granularity: "grapheme" });
const emojiRegex = /\p{Extended_Pictographic}|\u200D|\uFE0F/u;

export function segmentGraphemes(value: string): string[] {
  return Array.from(segmenter.segment(value), (s) => s.segment);
}

export function isEmoji(grapheme: string): boolean {
  return emojiRegex.test(grapheme);
}

export function removeEmojis(value: string): string {
  const graphemes = segmentGraphemes(value);
  return graphemes.filter((g) => !isEmoji(g)).join("");
}

export function countGraphemes(value: string): number {
  const cleaned = removeEmojis(value);
  return segmentGraphemes(cleaned).length;
}

export function limitGraphemes(value: string, maxLength: number): string {
  const cleaned = removeEmojis(value);
  const graphemes = segmentGraphemes(cleaned);

  if (graphemes.length <= maxLength) {
    return cleaned;
  }

  return graphemes.slice(0, maxLength).join("");
}

export function containsEmoji(value: string): boolean {
  const graphemes = segmentGraphemes(value);
  return graphemes.some((g) => isEmoji(g));
}
