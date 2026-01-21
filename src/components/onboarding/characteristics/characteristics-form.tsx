"use client";

import * as React from "react";
import { Button } from "@/src/components/ui/button";
import { NoPreferencesField } from "./no-preferences-field";
import { AllergiesField } from "./allergies-field";
import { FoodTypesField } from "./food-types-field";
import { IngredientsField } from "./ingredients-field";
import { AdditionalNotesField } from "./additional-notes-field";
import { cn } from "@/src/lib/utils";

interface CharacteristicsFormProps {
  onSubmit?: (data: {
    noPreferences: boolean;
    allergies: string[];
    foodTypes: string[];
    ingredients: string[];
    additionalNotes: string;
  }) => void;
}

export function CharacteristicsForm({
  onSubmit,
}: CharacteristicsFormProps) {
  const [noPreferences, setNoPreferences] = React.useState(false);
  const [allergies, setAllergies] = React.useState<string[]>([]);
  const [foodTypes, setFoodTypes] = React.useState<string[]>([]);
  const [ingredients, setIngredients] = React.useState<string[]>([]);
  const [additionalNotes, setAdditionalNotes] = React.useState("");

  const handleNoPreferencesChange = (value: boolean) => {
    setNoPreferences(value);
    if (value) {
      setAllergies([]);
      setFoodTypes([]);
      setIngredients([]);
      setAdditionalNotes("");
    }
  };

  const handleSubmit = () => {
    onSubmit?.({
      noPreferences,
      allergies,
      foodTypes,
      ingredients,
      additionalNotes,
    });
  };

  return (
    <div className="flex flex-col bg-background pb-8">
      <div className="mt-8">
        <NoPreferencesField
          value={noPreferences}
          onChange={handleNoPreferencesChange}
        />
      </div>

      <div
        className={cn(
          "mt-8 flex flex-col gap-4 transition-opacity",
          noPreferences && "pointer-events-none opacity-50"
        )}
      >
        <AllergiesField
          value={allergies}
          onChange={setAllergies}
          disabled={noPreferences}
        />
        <FoodTypesField
          value={foodTypes}
          onChange={setFoodTypes}
          disabled={noPreferences}
        />
        <IngredientsField
          value={ingredients}
          onChange={setIngredients}
          disabled={noPreferences}
        />
        <AdditionalNotesField
          value={additionalNotes}
          onChange={setAdditionalNotes}
          disabled={noPreferences}
        />
      </div>

      <div className="mt-auto pt-8">
        <Button
          onClick={handleSubmit}
          className="h-16 w-full rounded-lg bg-primary text-base font-semibold text-white shadow-md hover:bg-primary/90"
        >
          완료
        </Button>
      </div>
    </div>
  );
}
