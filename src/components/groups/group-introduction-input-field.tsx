"use client";

import { Control, Controller } from "react-hook-form";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import { cn } from "@/src/lib/utils";
import type { GroupCreateFormValues } from "./group-create-container";

interface GroupIntroductionInputFieldProps {
  name: "introduction";
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

export function GroupIntroductionInputField({
  name,
  control,
}: GroupIntroductionInputFieldProps) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        validate: (value) => {
          const length = countCodePoints(value);

          if (length > 30) {
            return "그룹 소개는 최대 30자까지 입력 가능합니다";
          }

          return true;
        },
      }}
      render={({ field, fieldState: { error } }) => {
        const currentLength = countCodePoints(field.value ?? "");

        return (
          <div className="flex flex-col gap-4">
          <Label htmlFor={name}>그룹 소개</Label>
          <Textarea
            {...field}
            id={name}
            placeholder="그룹 소개를 입력해주세요"
            aria-invalid={!!error}
            className="min-h-[60px]"
            value={field.value ?? ""}
            onChange={(event) => {
              const noNewlineValue = event.target.value.replace(/\r?\n/g, "");
              const limitedValue = limitCodePoints(noNewlineValue, 30);
              field.onChange(limitedValue);
            }}
          />
          <div className="flex items-center gap-2 text-xs">
            <span
              className={cn(
                currentLength >= 30
                  ? "text-destructive"
                  : "text-muted-foreground"
              )}
            >
              {currentLength}/30
            </span>
            {currentLength >= 30 && (
              <span className="text-destructive">
                최대 30자까지 입력 가능합니다.
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
