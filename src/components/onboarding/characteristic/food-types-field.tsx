import { Label } from "@/src/components/ui/label";
import { CharacterGroup } from "@/src/components/ui/character-group";
import { FoodTypes, FOOD_TYPES } from "@/src/constants/onboarding-characteristic";

interface FoodTypesFieldProps {
  value: FoodTypes[];
  onChange: (value: FoodTypes[]) => void;
  disabled?: boolean;
  showLabel?: boolean;
}

export function FoodTypesField({
  value,
  onChange,
  disabled,
  showLabel = true,
}: FoodTypesFieldProps) {
  return (
    <div className="flex flex-col gap-4">
      {showLabel && (
        <Label className="text-lg font-bold text-foreground">
          선호하는 음식 종류가 있나요?
        </Label>
      )}
      <CharacterGroup<FoodTypes>
        columns={3}
        spacing={8}
        size="lg"
        values={value}
        onValueChange={onChange}
        options={FOOD_TYPES}
        disabled={disabled}
      />
    </div>
  );
}
