"use client";

import { Control, Controller } from "react-hook-form";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import type { GroupCreateFormValues } from "./group-create-container";

interface GroupIntroductionInputFieldProps {
  name: "introduction";
  control: Control<GroupCreateFormValues>;
}

export function GroupIntroductionInputField({
  name,
  control,
}: GroupIntroductionInputFieldProps) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        maxLength: {
          value: 30,
          message: "그룹 소개는 최대 30자까지 입력 가능합니다",
        },
      }}
      render={({ field, fieldState: { error } }) => (
        <div className="flex flex-col gap-4">
          <Label htmlFor={name}>그룹 소개</Label>
          <Textarea
            {...field}
            id={name}
            placeholder="그룹 소개를 입력해주세요"
            aria-invalid={!!error}
            className="min-h-[120px]"
          />
          {error && (
            <p className="text-sm text-destructive">{error.message}</p>
          )}
        </div>
      )}
    />
  );
}
