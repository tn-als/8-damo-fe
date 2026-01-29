import { EXTENSION_TO_MIME, ALLOWED_IMAGE_CONTENT_TYPES } from "./mime";

export function getImageContentType(file: File): string | null {
  const ext = file.name.split(".").pop()?.toLowerCase();
  if (!ext) return null;

  const mime = EXTENSION_TO_MIME[ext];
  if (!mime) return null;

  return ALLOWED_IMAGE_CONTENT_TYPES.has(mime) ? mime : null;
}