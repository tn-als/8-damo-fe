"use client";

import { Control, Controller } from "react-hook-form";
import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import { cn } from "@/src/lib/utils";
import type { GroupCreateFormValues } from "./group-create-container";

interface GroupNameInputFieldProps {
  name: "groupName";
  control: Control<GroupCreateFormValues>;
}

const countCodePoints = (value: string) => Array.from(value).length;

const limitCodePoints = (value: string, maxLength: number) => {
  const chars = Array.from(value);
  if (chars.length <= maxLength) {
    return value;
  }

  return chars.slice(0, maxLength).join("");
};

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
        validate: (value) => {
          const length = countCodePoints(value);

          if (length < 2) {
            return "그룹명은 최소 2자 이상이어야 합니다";
          }

          if (length > 10) {
            return "그룹명은 최대 10자까지 입력 가능합니다";
          }

          return true;
        },
      }}
      render={({ field, fieldState: { error } }) => {
        const currentLength = countCodePoints(field.value ?? "");

        return (
          <div className="flex flex-col gap-2">
          <Label htmlFor={name}>
            그룹명 <span className="text-destructive">*</span>
          </Label>
          <Input
            {...field}
            id={name}
            type="text"
            placeholder="그룹명을 입력해주세요"
            aria-invalid={!!error}
            value={field.value ?? ""}
            onChange={(event) => {
              const limitedValue = limitCodePoints(event.target.value, 10);
              field.onChange(limitedValue);
            }}
          />
          <div className="flex items-center gap-2 text-xs">
            <span
              className={cn(
                currentLength >= 10
                  ? "text-destructive"
                  : "text-muted-foreground"
              )}
            >
              {currentLength}/10
            </span>
            {currentLength >= 10 && (
              <span className="text-destructive">
                최대 10자까지 입력 가능합니다.
              </span>
            )}
            {error && (
              <span className="text-destructive">{error.message}</span>
            )}
          </div>
        </div>
        );
      }}
    />
  );
}
