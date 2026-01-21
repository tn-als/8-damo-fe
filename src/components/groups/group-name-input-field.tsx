"use client";

import { Control, Controller } from "react-hook-form";
import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import type { GroupCreateFormValues } from "./group-create-container";

interface GroupNameInputFieldProps {
  name: "groupName";
  control: Control<GroupCreateFormValues>;
}

export function GroupNameInputField({
  name,
  control,
}: GroupNameInputFieldProps) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: "그룹명을 입력해주세요",
        minLength: {
          value: 2,
          message: "그룹명은 최소 2자 이상이어야 합니다",
        },
        maxLength: {
          value: 10,
          message: "그룹명은 최대 10자까지 입력 가능합니다",
        },
      }}
      render={({ field, fieldState: { error } }) => (
        <div className="flex flex-col gap-4">
          <Label htmlFor={name}>
            그룹명 <span className="text-destructive">*</span>
          </Label>
          <Input
            {...field}
            id={name}
            type="text"
            placeholder="그룹명을 입력해주세요"
            aria-invalid={!!error}
          />
          {error && (
            <p className="text-sm text-destructive">{error.message}</p>
          )}
        </div>
      )}
    />
  );
}
