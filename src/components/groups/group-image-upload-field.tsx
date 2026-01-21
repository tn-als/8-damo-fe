"use client";

import { Control } from "react-hook-form";
import { ImageUploadField } from "@/src/components/ui/image-upload-field";
import type { GroupCreateFormValues } from "./group-create-container";

interface GroupImageUploadFieldProps {
  name: "groupImage";
  control: Control<GroupCreateFormValues>;
}

export function GroupImageUploadField({
  name,
  control,
}: GroupImageUploadFieldProps) {
  return (
    <ImageUploadField
      name={name}
      control={control}
      label="그룹 이미지"
    />
  );
}
