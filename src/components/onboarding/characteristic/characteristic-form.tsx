"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/src/components/ui/button";
import { AllergiesField } from "./allergies-field";
import { FoodTypesField } from "./food-types-field";
import { IngredientsField } from "./ingredients-field";
import { AdditionalNotesField } from "./additional-notes-field";
import {
  characteristicSchema,
  type CharacteristicFormValues,
} from "@/src/lib/schema/characteristic";
import { updateCharacteristics } from "@/src/lib/actions/user-characteristics";

export function CharacteristicsForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CharacteristicFormValues>({
    resolver: zodResolver(characteristicSchema),
    defaultValues: {
      allergies: [],
      foodTypes: [],
      ingredients: [],
      additionalNotes: '',
    },
  });

  const foodTypes = watch("foodTypes");
  const ingredients = watch("ingredients");

  const onSubmit = async (data: CharacteristicFormValues) => {
    setIsSubmitting(true);

    try {
      const result = await updateCharacteristics({
        allergyTypes: data.allergies,
        likedFoodTypes: data.foodTypes,
        likedIngredientTypes: data.ingredients,
        otherCharacteristics: data.additionalNotes,
      });

      if (result.success) {
        router.push("/");
      } else {
        toast.error(result.error || "재접속을 시도해주세요.");
      }
    } catch (error) {
      console.error("[CharacteristicsForm] Submit error:", error);
      toast.error("재접속을 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = foodTypes.length > 0 && ingredients.length > 0;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col bg-background pb-8">
      <div className="mt-8 flex flex-col gap-8">
        <Controller
          name="allergies"
          control={control}
          render={({ field }) => (
            <AllergiesField
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />

        <Controller
          name="foodTypes"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <FoodTypesField
                value={field.value}
                onChange={field.onChange}
              />
              {errors.foodTypes && (
                <p className="text-sm text-destructive">{errors.foodTypes.message}</p>
              )}
            </div>
          )}
        />

        <Controller
          name="ingredients"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <IngredientsField
                value={field.value}
                onChange={field.onChange}
              />
              {errors.ingredients && (
                <p className="text-sm text-destructive">{errors.ingredients.message}</p>
              )}
            </div>
          )}
        />

        <Controller
          name="additionalNotes"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <AdditionalNotesField
                value={field.value}
                onChange={field.onChange}
              />
              {errors.additionalNotes && (
                <p className="text-sm text-destructive">{errors.additionalNotes.message}</p>
              )}
            </div>
          )}
        />
      </div>

      <div className="mt-auto pt-8">
        <Button
          type="submit"
          disabled={isSubmitting || !isFormValid}
          className="h-16 w-full rounded-lg bg-primary text-base font-semibold text-white shadow-md hover:bg-primary/90 disabled:opacity-50"
        >
          {isSubmitting ? "처리중..." : "완료"}
        </Button>
      </div>
    </form>
  );
}
