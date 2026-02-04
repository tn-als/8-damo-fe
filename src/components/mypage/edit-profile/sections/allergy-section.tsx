"use client";

import { Label } from "@/src/components/ui/label";
import { AllergiesField } from "@/src/components/onboarding/characteristic/allergies-field";
import type { Allergy } from "@/src/constants/onboarding-characteristic";

interface AllergySectionProps {
  value: Allergy[];
  onChange: (value: Allergy[]) => void;
  disabled?: boolean;
}

export function AllergySection({ value, onChange, disabled }: AllergySectionProps) {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <Label className="text-lg font-bold text-foreground">알레르기</Label>
        <p className="text-sm text-muted-foreground">
          해당하는 알레르기가 있으면 선택해주세요
        </p>
      </div>
      <AllergiesField
        value={value}
        onChange={onChange}
        disabled={disabled}
        showLabel={false}
      />
    </section>
  );
}
