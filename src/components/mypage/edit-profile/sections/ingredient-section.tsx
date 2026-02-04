"use client";

import { Label } from "@/src/components/ui/label";
import { IngredientsField } from "@/src/components/onboarding/characteristic/ingredients-field";
import type { Ingredient } from "@/src/constants/onboarding-characteristic";

interface IngredientSectionProps {
  value: Ingredient[];
  onChange: (value: Ingredient[]) => void;
  disabled?: boolean;
}

export function IngredientSection({ value, onChange, disabled }: IngredientSectionProps) {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <Label className="text-lg font-bold text-foreground">선호 재료</Label>
        <p className="text-sm text-muted-foreground">
          선호하는 음식 재료를 선택해주세요
        </p>
      </div>
      <IngredientsField
        value={value}
        onChange={onChange}
        disabled={disabled}
        showLabel={false}
      />
    </section>
  );
}
