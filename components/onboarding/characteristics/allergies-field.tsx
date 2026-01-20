import { Label } from "@/components/ui/label";
import { SelectableTag } from "@/components/ui/selectable-tag";

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
        알레르기가 있나요?
      </Label>
      <div className="flex flex-col gap-3">
        {chunkArray(ALLERGIES, 3).map((row, rowIndex) => (
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
