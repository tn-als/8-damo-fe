export const EXTENSION_TO_MIME: Record<string, string> = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  webp: "image/webp",
};

export const ALLOWED_IMAGE_CONTENT_TYPES = new Set(
  Object.values(EXTENSION_TO_MIME)
);