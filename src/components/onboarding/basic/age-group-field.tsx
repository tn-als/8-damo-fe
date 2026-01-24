"use client";

import { Control, Controller } from "react-hook-form";
import { ChevronDown } from "lucide-react";
import { Label } from "@/src/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { cn } from "@/src/lib/utils";
import type { BasicInfoFormValues } from "./index";

const AGE_GROUPS = [
  { value: "TWENTIES", label: "20대" },
  { value: "THIRTIES", label: "30대" },
  { value: "FORTIES", label: "40대" },
  { value: "FIFTIES_PLUS", label: "50대 이상" },
] as const;

interface AgeGroupFieldProps {
  name: "ageGroup";
  control: Control<BasicInfoFormValues>;
}

export function AgeGroupField({ name, control }: AgeGroupFieldProps) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: "연령대를 선택해주세요." }}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <div className="flex flex-col gap-3">
          <Label className="text-lg font-bold text-foreground">
            연령대<span className="text-destructive"> *</span>
          </Label>
          <DropdownMenu onOpenChange={(open) => !open && onBlur()}>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="flex h-[54px] w-full items-center justify-between rounded-lg bg-muted px-4"
              >
                <span
                  className={cn(
                    "text-base font-semibold",
                    value ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {AGE_GROUPS.find((ag) => ag.value === value)?.label ||
                    "연령대를 선택해 주세요."}
                </span>
                <ChevronDown className="size-5 text-muted-foreground/50" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-[--radix-dropdown-menu-trigger-width]"
            >
              {AGE_GROUPS.map((ag) => (
                <DropdownMenuItem
                  key={ag.value}
                  onClick={() => onChange(ag.value)}
                  className={cn(
                    "cursor-pointer py-3 text-base font-semibold",
                    value === ag.value && "bg-primary/10 text-primary"
                  )}
                >
                  {ag.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {error && (
            <p className="text-sm text-destructive">{error.message}</p>
          )}
        </div>
      )}
    />
  );
}
