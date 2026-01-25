"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import { IngredientsField } from "./ingredients-field";
import {
  ingredientsSchema,
  type IngredientsFormValues,
} from "@/src/lib/schema/characteristic";
import { useOnboardingStore } from "@/src/stores/onboarding-store";

export function IngredientsForm() {
  const router = useRouter();
  const { ingredients, setIngredients } = useOnboardingStore();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<IngredientsFormValues>({
    resolver: zodResolver(ingredientsSchema),
    mode: "onChange",
    defaultValues: {
      ingredients,
    },
  });

  const onSubmit = (data: IngredientsFormValues) => {
    setIngredients(data.ingredients);
    router.push("/onboarding/characteristic/additional-notes");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-1 flex-col">
      <Controller
        name="ingredients"
        control={control}
        render={({ field }) => (
          <IngredientsField
            value={field.value}
            onChange={field.onChange}
            showLabel={false}
          />
        )}
      />

      <div className="mt-auto pt-8">
        <Button
          type="submit"
          disabled={!isValid}
          className="h-16 w-full rounded-lg bg-primary text-base font-semibold text-white shadow-md hover:bg-primary/90 disabled:opacity-50"
        >
          다음
        </Button>
      </div>
    </form>
  );
}
