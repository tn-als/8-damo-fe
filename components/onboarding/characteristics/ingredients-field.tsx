import { Label } from "@/components/ui/label";
import { SelectableTag } from "@/components/ui/selectable-tag";

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
}

export function IngredientsField({
  value,
  onChange,
  disabled,
}: IngredientsFieldProps) {
  const toggleSelection = (itemValue: string) => {
    if (disabled) return;
    if (value.includes(itemValue)) {
      onChange(value.filter((v) => v !== itemValue));
    } else {
      onChange([...value, itemValue]);
    }
  };

  const chunkArray = <T,>(arr: T[], size: number): T[][] => {
    const chunks: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };

  return (
    <div className="flex flex-col gap-4">
      <Label className="text-lg font-bold text-foreground">
        선호하는 음식 재료가 있나요?
      </Label>
      <div className="flex flex-col gap-3">
        {chunkArray(INGREDIENTS, 3).map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-3">
            {row.map((item) => (
              <SelectableTag
                key={item.value}
                label={item.label}
                selected={value.includes(item.value)}
                onClick={() => toggleSelection(item.value)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
