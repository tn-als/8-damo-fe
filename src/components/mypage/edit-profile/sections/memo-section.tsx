"use client";

import { Label } from "@/src/components/ui/label";
import { AdditionalNotesField } from "@/src/components/onboarding/characteristic/additional-notes-field";

interface MemoSectionProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function MemoSection({ value, onChange, disabled }: MemoSectionProps) {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <Label className="text-lg font-bold text-foreground">추가 메모</Label>
        <p className="text-sm text-muted-foreground">
          추가적으로 전달하고 싶은 내용을 입력해주세요
        </p>
      </div>
      <AdditionalNotesField
        value={value}
        onChange={onChange}
        disabled={disabled}
        showLabel={false}
      />
    </section>
  );
}
