"use client";

import { Control, Controller } from "react-hook-form";
import { DateTimePicker } from "@/src/components/ui/date-time-picker";

export interface LightningCreateFormValues {
  lightningDate: Date;
}

interface LightningDateTimeFieldProps {
  name: "lightningDate";
  control: Control<LightningCreateFormValues>;
}

export function LightningDateTimeField({
  name,
  control,
}: LightningDateTimeFieldProps) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: "번개 모임의 날짜 및 시간을 선택해주세요",
        validate: (value) => {
          if (!value) {
            return "번개 모임의 날짜 및 시간을 선택해주세요";
          }

          const now = new Date();
          if (value < now) {
            return "과거 날짜는 선택할 수 없습니다";
          }

          return true;
        },
      }}
      render={({ field, fieldState: { error } }) => (
        <section className="space-y-2">
          <label className="text-sm font-semibold text-[#444444]">
            날짜 및 시간
          </label>
          <DateTimePicker
            value={field.value}
            onChange={field.onChange}
            placeholder="날짜와 시간을 선택하세요"
            minDate={new Date()}
            buttonClassName="bg-white border border-[#d1d1d6] hover:bg-gray-50"
          />
          {error && (
            <span className="text-sm text-destructive">{error.message}</span>
          )}
        </section>
      )}
    />
  );
}
