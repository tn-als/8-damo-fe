"use client";

import { Control, Controller } from "react-hook-form";
import { Label } from "@/src/components/ui/label";
import { DateTimePicker } from "@/src/components/ui/date-time-picker";
import type { DiningCreateFormValues } from "./dining-create-container";

interface DiningDateTimeFieldProps {
  name: "diningDate";
  control: Control<DiningCreateFormValues>;
}

export function DiningDateTimeField({
  name,
  control,
}: DiningDateTimeFieldProps) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: "회식 날짜 및 시간을 선택해주세요",
        validate: (value) => {
          if (!value) {
            return "회식 날짜 및 시간을 선택해주세요";
          }

          const now = new Date();
          if (value < now) {
            return "과거 날짜는 선택할 수 없습니다";
          }

          return true;
        },
      }}
      render={({ field, fieldState: { error } }) => (
        <div className="flex flex-col gap-3">
          <Label htmlFor={name} className="text-lg font-bold text-[#333]">
            회식 날짜 및 시간 <span className="text-destructive">*</span>
          </Label>
          <DateTimePicker
            value={field.value}
            onChange={field.onChange}
            placeholder="날짜와 시간을 선택하세요"
            minDate={new Date()}
          />
          {error && (
            <span className="text-sm text-destructive">{error.message}</span>
          )}
        </div>
      )}
    />
  );
}
