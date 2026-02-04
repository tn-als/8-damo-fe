"use client";

import { Control, Controller } from "react-hook-form";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { countGraphemes, limitGraphemes } from "@/src/utils/text";
import type { BasicInfoFormValues } from "./index";

interface NicknameFieldProps {
  name: "nickname";
  control: Control<BasicInfoFormValues>;
}

export function NicknameField({ name, control }: NicknameFieldProps) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: "이름을 입력해주세요.",
        validate: (value) => {
          const length = countGraphemes(value);

          if (length < 1) {
            return "이름을 입력해주세요.";
          }

          if (length > 10) {
            return "이름은 최대 10자까지 입력 가능합니다.";
          }

          return true;
        },
      }}
      render={({ field, fieldState: { error } }) => {
        const currentLength = countGraphemes(field.value ?? "");

        return (
          <div className="flex flex-col gap-3">
            <Label className="text-lg font-bold text-foreground">
              이름<span className="text-destructive"> *</span>
            </Label>
            <Input
              {...field}
              placeholder="이름을 작성해 주세요."
              onChange={(e) => {
                const limitedValue = limitGraphemes(e.target.value, 10);
                field.onChange(limitedValue);
              }}
              className="h-[54px] rounded-lg border-none bg-muted px-4 text-base font-semibold placeholder:text-muted-foreground"
            />
            <div className="flex flex-col gap-1">
              {error && (
                <p className="text-sm text-destructive">{error.message}</p>
              )}
              <p className="text-xs text-muted-foreground">
                {currentLength}/10
              </p>
            </div>
          </div>
        );
      }}
    />
  );
}
