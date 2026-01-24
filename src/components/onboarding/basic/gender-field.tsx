"use client";

import { Control, Controller } from "react-hook-form";
import { Label } from "@/src/components/ui/label";
import { cn } from "@/src/lib/utils";
import type { BasicInfoFormValues } from "./index";

interface GenderFieldProps {
  name: "gender";
  control: Control<BasicInfoFormValues>;
}

export function GenderField({ name, control }: GenderFieldProps) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: "성별을 선택해주세요." }}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <div className="flex flex-col gap-3">
          <Label className="text-lg font-bold text-foreground">
            성별<span className="text-destructive"> *</span>
          </Label>
          <div
            className="grid grid-cols-2 gap-2.5"
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) {
                onBlur();
              }
            }}
          >
            <button
              type="button"
              onClick={() => onChange("FEMALE")}
              className={cn(
                "flex h-[54px] items-center justify-center rounded-lg text-base font-semibold transition-colors",
                value === "FEMALE"
                  ? "border-2 border-primary/50 bg-primary/15 text-primary"
                  : "bg-muted text-foreground"
              )}
            >
              여성
            </button>
            <button
              type="button"
              onClick={() => onChange("MALE")}
              className={cn(
                "flex h-[54px] items-center justify-center rounded-lg text-base font-semibold transition-colors",
                value === "MALE"
                  ? "border-2 border-primary/50 bg-primary/15 text-primary"
                  : "bg-muted text-foreground"
              )}
            >
              남성
            </button>
          </div>
          {error && (
            <p className="text-sm text-destructive">{error.message}</p>
          )}
        </div>
      )}
    />
  );
}
