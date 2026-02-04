"use client";

import { Label } from "@/src/components/ui/label";
import { FoodTypesField } from "@/src/components/onboarding/characteristic/food-types-field";
import type { FoodTypes } from "@/src/constants/onboarding-characteristic";

interface FoodTypeSectionProps {
  value: FoodTypes[];
  onChange: (value: FoodTypes[]) => void;
  disabled?: boolean;
}

export function FoodTypeSection({ value, onChange, disabled }: FoodTypeSectionProps) {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <Label className="text-lg font-bold text-foreground">선호 음식</Label>
        <p className="text-sm text-muted-foreground">
          선호하는 음식 종류를 선택해주세요
        </p>
      </div>
      <FoodTypesField
        value={value}
        onChange={onChange}
        disabled={disabled}
        showLabel={false}
      />
    </section>
  );
}
