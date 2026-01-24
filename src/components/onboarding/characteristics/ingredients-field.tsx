import { Label } from "@/src/components/ui/label";
import { CharacterGroup } from "@/src/components/ui/character-group";

const INGREDIENTS = [
  { value: "meat", label: "육류" },
  { value: "poultry", label: "가금류" },
  { value: "seafood", label: "해산물" },
  { value: "vegetables", label: "채소" },
  { value: "grains", label: "곡물/면" },
  { value: "dairy", label: "유제품" },
];

interface IngredientsFieldProps {
  value: string[];
  onChange: (value: string[]) => void;
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
      <CharacterGroup
        columns={3}
        spacing={12}
        size="lg"
        values={value}
        onValueChange={onChange}
        options={INGREDIENTS}
        disabled={disabled}
      />
    </div>
  );
}
