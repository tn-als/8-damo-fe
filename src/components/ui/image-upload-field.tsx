"use client";

import * as React from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import { Camera, ImageIcon } from "lucide-react";
import { Label } from "@/src/components/ui/label";
import { toast } from "@/src/components/ui/sonner";

interface ImageUploadFieldProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  fallbackUrl?: string;
  label?: string;
  accept?: string;
  allowedExtensions?: string[];
  maxFileSizeBytes?: number;
  invalidTypeMessage?: string;
  invalidSizeMessage?: string;
  onFileChange?: (file: File | null) => void;
}

export function ImageUploadField<TFieldValues extends FieldValues>({
  name,
  control,
  fallbackUrl,
  label = "이미지",
  accept,
  allowedExtensions,
  maxFileSizeBytes,
  invalidTypeMessage = "PNG, JPG, JPEG, WEBP만 업로드할 수 있어요.",
  invalidSizeMessage = "이미지는 5MB 이하만 업로드할 수 있어요.",
  onFileChange,
}: ImageUploadFieldProps<TFieldValues>) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const normalizedExtensions = React.useMemo(() => {
    if (!allowedExtensions || allowedExtensions.length === 0) {
      return null;
    }

    return new Set(
      allowedExtensions.map((extension) => extension.toLowerCase())
    );
  }, [allowedExtensions]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => {
        const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0];
          if (file) {
            if (
              normalizedExtensions &&
              !normalizedExtensions.has(
                file.name.split(".").pop()?.toLowerCase() ?? ""
              )
            ) {
              toast.error(invalidTypeMessage);
              e.target.value = "";
              onFileChange?.(null);
              return;
            }

            if (maxFileSizeBytes && file.size > maxFileSizeBytes) {
              toast.error(invalidSizeMessage);
              e.target.value = "";
              onFileChange?.(null);
              return;
            }

            onFileChange?.(file);
            const reader = new FileReader();
            reader.onloadend = () => {
              onChange(reader.result as string);
            };
            reader.readAsDataURL(file);
          }
        };

        const displayImage = value || fallbackUrl;
        const inputAccept =
          accept ??
          (normalizedExtensions
            ? Array.from(normalizedExtensions)
                .map((extension) => `.${extension}`)
                .join(",")
            : "image/*");

        return (
          <div className="flex flex-col gap-4">
            <Label htmlFor={name}>{label}</Label>
            <div className="flex justify-center">
              <div className="relative">
                <div className="flex size-[120px] items-center justify-center overflow-hidden rounded-full border-2 border-input bg-input">
                  {displayImage ? (
                    <img
                      src={displayImage}
                      alt={label}
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
                  aria-label={`${label} 변경`}
                >
                  <Camera className="size-4 text-white" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={inputAccept}
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </div>
          </div>
        );
      }}
    />
  );
}
