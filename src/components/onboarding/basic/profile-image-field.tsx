"use client";

import * as React from "react";
import { Control, useController } from "react-hook-form";
import { Camera, ImageIcon } from "lucide-react";
import type { BasicInfoFormValues } from "./index";

interface ProfileImageFieldProps {
  name: "profileImage";
  control: Control<BasicInfoFormValues>;
  fallbackUrl?: string;
}

export function ProfileImageField({
  name,
  control,
  fallbackUrl,
}: ProfileImageFieldProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { field } = useController({ name, control });
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (field.value instanceof File) {
      const objectUrl = URL.createObjectURL(field.value);
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }

    setPreviewUrl(null);
    return undefined;
  }, [field.value]);

  return (
    <div className="flex justify-center">
      <div className="relative">
        <div className="flex size-[120px] items-center justify-center overflow-hidden rounded-full border-2 border-muted bg-muted">
          {previewUrl || fallbackUrl ? (
            <img
              src={previewUrl || fallbackUrl}
              alt="프로필 이미지"
              className="size-full object-cover"
            />
          ) : (
            <ImageIcon className="size-12 text-muted-foreground/50" />
          )}
        </div>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="absolute bottom-0 right-0 flex size-8 items-center justify-center rounded-full bg-muted-foreground"
          aria-label="프로필 사진 변경"
        >
          <Camera className="size-4 text-white" />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => field.onChange(e.target.files?.[0] ?? null)}
          className="hidden"
        />
      </div>
    </div>
  );
}
