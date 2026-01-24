import { Label } from "@/src/components/ui/label";
import { CharacterGroup } from "@/src/components/ui/character-group";
import { ALLERGIES, Allergy } from "@/src/constants/onboarding-characteristic";

interface AllergiesFieldProps {
  value: Allergy[];
  onChange: (value: Allergy[]) => void;
  disabled?: boolean;
  showLabel?: boolean;
}

export function AllergiesField({
  value,
  onChange,
  disabled,
  showLabel = true,
}: AllergiesFieldProps) {
  return (
    <div className="flex flex-col gap-4">
      {showLabel && (
        <Label className="text-lg font-bold text-foreground">
          알레르기가 있나요?
        </Label>
      )}
      <CharacterGroup<Allergy>
        columns={3}
        spacing={8}
        size="lg"
        values={value}
        onValueChange={onChange}
        options={ALLERGIES}
        disabled={disabled}
      />
    </div>
  );
}
