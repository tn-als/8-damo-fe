"use client";

import { Control } from "react-hook-form";
import { ImageUploadField } from "@/src/components/ui/image-upload-field";
import type { GroupCreateFormValues } from "./group-create-container";

interface GroupImageUploadFieldProps {
  name: "groupImage";
  control: Control<GroupCreateFormValues>;
  onFileChange?: (file: File | null) => void;
}

export function GroupImageUploadField({
  name,
  control,
  onFileChange,
}: GroupImageUploadFieldProps) {
  return (
    <ImageUploadField
      name={name}
      control={control}
      label="그룹 이미지"
      allowedExtensions={["png", "jpg", "jpeg", "webp"]}
      maxFileSizeBytes={5 * 1024 * 1024}
      onFileChange={onFileChange}
    />
  );
}
