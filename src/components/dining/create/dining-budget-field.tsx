"use client";

import { Control, Controller } from "react-hook-form";
import { Label } from "@/src/components/ui/label";
import { NumberInput } from "@/src/components/ui/number-input";
import type { DiningCreateFormValues } from "./dining-create-container";

interface DiningBudgetFieldProps {
  name: "budget";
  control: Control<DiningCreateFormValues>;
}

export function DiningBudgetField({
  name,
  control,
}: DiningBudgetFieldProps) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: "예산을 입력해주세요",
        validate: (value) => {
          if (!value) {
            return "예산을 입력해주세요";
          }

          if (value < 10000) {
            return "예산은 최소 10,000원 이상이어야 합니다.";
          }

          if (value > 100000000) {
            return "예산은 1억원 이하로 입력해주세요";
          }

          return true;
        },
      }}
      render={({ field, fieldState: { error } }) => (
        <div className="flex flex-col gap-3">
          <Label htmlFor={name} className="text-lg font-bold text-[#333]">
            예산 <span className="text-destructive">*</span>
          </Label>
          <div className="relative">
            <NumberInput
              value={field.value}
              onChange={field.onChange}
              placeholder="예산을 입력해 주세요"
              min={0}
              max={100000000}
              allowNegative={false}
              allowDecimal={false}
              formatNumber={true}
              aria-invalid={!!error}
              className="h-[54px] rounded-[8px] bg-[#f2f2f7] px-4 py-4 text-base font-semibold leading-[22px] placeholder:text-[#aeaeb2]"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-base font-semibold text-[#333]">
              원
            </span>
          </div>
          {error && (
            <span className="text-sm text-destructive">{error.message}</span>
          )}
        </div>
      )}
    />
  );
}
