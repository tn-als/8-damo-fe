import { Label } from "@/src/components/ui/label";
import { CharacterGroup } from "@/src/components/ui/character-group";
import { INGREDIENTS, Ingredient } from "@/src/constants/onboarding-characteristic";

interface IngredientsFieldProps {
  value: Ingredient[];
  onChange: (value: Ingredient[]) => void;
  disabled?: boolean;
  showLabel?: boolean;
}

export function IngredientsField({
  value,
  onChange,
  disabled,
  showLabel = true,
}: IngredientsFieldProps) {
  return (
    <div className="flex flex-col gap-4">
      {showLabel && (
        <Label className="text-lg font-bold text-foreground">
          선호하는 음식 재료가 있나요?
        </Label>
      )}
      <CharacterGroup<Ingredient>
        columns={3}
        spacing={8}
        size="lg"
        values={value}
        onValueChange={onChange}
        options={INGREDIENTS}
        disabled={disabled}
      />
    </div>
  );
}
