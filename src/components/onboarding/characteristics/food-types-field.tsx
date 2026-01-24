import { Label } from "@/src/components/ui/label";
import { CharacterGroup } from "@/src/components/ui/character-group";

const FOOD_TYPES = [
  { value: "korean", label: "한식" },
  { value: "japanese", label: "일식" },
  { value: "western", label: "양식" },
  { value: "chinese", label: "중식" },
  { value: "world", label: "세계 음식" },
];

interface FoodTypesFieldProps {
  value: string[];
  onChange: (value: string[]) => void;
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
      <CharacterGroup
        columns={3}
        spacing={12}
        size="lg"
        values={value}
        onValueChange={onChange}
        options={FOOD_TYPES}
        disabled={disabled}
      />
    </div>
  );
}
