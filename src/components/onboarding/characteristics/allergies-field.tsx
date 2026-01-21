import { Label } from "@/src/components/ui/label";
import { CharacterGroup } from "@/src/components/ui/character-group";

const ALLERGIES = [
  { value: "shellfish", label: "갑각류" },
  { value: "sulfites", label: "아황산류" },
  { value: "nuts", label: "견과류" },
  { value: "eggs", label: "난류" },
  { value: "milk", label: "우유" },
  { value: "wheat", label: "밀" },
  { value: "peanuts", label: "땅콩" },
  { value: "soybeans", label: "대두" },
  { value: "fish", label: "생선" },
];

interface AllergiesFieldProps {
  value: string[];
  onChange: (value: string[]) => void;
  disabled?: boolean;
}

export function AllergiesField({
  value,
  onChange,
  disabled,
}: AllergiesFieldProps) {
  return (
    <div className="flex flex-col gap-4">
      <Label className="text-lg font-bold text-foreground">
        알레르기가 있나요?
      </Label>
      <CharacterGroup
        columns={3}
        spacing={12}
        size="lg"
        values={value}
        onValueChange={onChange}
        options={ALLERGIES}
        disabled={disabled}
      />
    </div>
  );
}
