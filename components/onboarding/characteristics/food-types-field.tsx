import { Label } from "@/components/ui/label";
import { SelectableTag } from "@/components/ui/selectable-tag";

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
}

export function FoodTypesField({
  value,
  onChange,
  disabled,
}: FoodTypesFieldProps) {
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
        선호하는 음식 종류가 있나요?
      </Label>
      <div className="flex flex-col gap-3">
        {chunkArray(FOOD_TYPES, 3).map((row, rowIndex) => (
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
