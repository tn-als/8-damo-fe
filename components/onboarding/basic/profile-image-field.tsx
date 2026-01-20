"use client";

import * as React from "react";
import { Control, Controller } from "react-hook-form";
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
          <div className="flex justify-center">
            <div className="relative">
              <div className="flex size-[120px] items-center justify-center overflow-hidden rounded-full border-2 border-muted bg-muted">
                {displayImage ? (
                  <img
                    src={displayImage}
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
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>
        );
      }}
    />
  );
}
