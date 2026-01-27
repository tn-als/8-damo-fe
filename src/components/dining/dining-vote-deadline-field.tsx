"use client";

import { Control, Controller, useWatch } from "react-hook-form";
import { Label } from "@/src/components/ui/label";
import { DateTimePicker } from "@/src/components/ui/date-time-picker";
import type { DiningCreateFormValues } from "./dining-create-container";

interface DiningVoteDeadlineFieldProps {
  name: "voteDeadline";
  control: Control<DiningCreateFormValues>;
}

export function DiningVoteDeadlineField({
  name,
  control,
}: DiningVoteDeadlineFieldProps) {
  const diningDateTime = useWatch({
    control,
    name: "diningDateTime",
  });

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: "참석 투표 마감 날짜 및 시간을 선택해주세요",
        validate: (value) => {
          if (!value) {
            return "참석 투표 마감 날짜 및 시간을 선택해주세요";
          }

          const now = new Date();
          if (value < now) {
            return "과거 날짜는 선택할 수 없습니다";
          }

          if (diningDateTime && value >= diningDateTime) {
            return "투표 마감 시간은 회식 시간보다 빨라야 합니다";
          }

          return true;
        },
      }}
      render={({ field, fieldState: { error } }) => (
        <div className="flex flex-col gap-3">
          <Label htmlFor={name} className="text-lg font-bold text-[#333]">
            참석 투표 마감 날짜 및 시간 <span className="text-destructive">*</span>
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
