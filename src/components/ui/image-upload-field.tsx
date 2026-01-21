"use client";

import * as React from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import { Camera, ImageIcon } from "lucide-react";
import { Label } from "@/src/components/ui/label";

interface ImageUploadFieldProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  fallbackUrl?: string;
  label?: string;
}

export function ImageUploadField<TFieldValues extends FieldValues>({
  name,
  control,
  fallbackUrl,
  label = "이미지",
}: ImageUploadFieldProps<TFieldValues>) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => {
        const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
              onChange(reader.result as string);
            };
            reader.readAsDataURL(file);
          }
        };

        const displayImage = value || fallbackUrl;

        return (
          <div className="flex flex-col gap-4">
            <Label htmlFor={name}>{label}</Label>
            <div className="flex justify-center">
              <div className="relative">
                <div className="flex size-[120px] items-center justify-center overflow-hidden rounded-full border-2 border-muted bg-muted">
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
                  accept="image/*"
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
