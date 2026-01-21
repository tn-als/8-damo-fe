"use client";

import { Control, Controller } from "react-hook-form";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
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
      render={({ field, fieldState: { error } }) => (
        <div className="flex flex-col gap-3">
          <Label className="text-lg font-bold text-foreground">이름</Label>
          <Input
            {...field}
            placeholder="이름을 작성해 주세요."
            className="h-[54px] rounded-lg border-none bg-muted px-4 text-base font-semibold placeholder:text-muted-foreground"
          />
          {error && (
            <p className="text-sm text-destructive">{error.message}</p>
          )}
        </div>
      )}
    />
  );
}
