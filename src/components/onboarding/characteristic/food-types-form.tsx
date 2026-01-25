"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import { FoodTypesField } from "./food-types-field";
import {
  foodTypesSchema,
  type FoodTypesFormValues,
} from "@/src/lib/schema/characteristic";
import { useOnboardingStore } from "@/src/stores/onboarding-store";

export function FoodTypesForm() {
  const router = useRouter();
  const { foodTypes, setFoodTypes } = useOnboardingStore();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<FoodTypesFormValues>({
    resolver: zodResolver(foodTypesSchema),
    mode: "onChange",
    defaultValues: {
      foodTypes,
    },
  });

  const onSubmit = (data: FoodTypesFormValues) => {
    setFoodTypes(data.foodTypes);
    router.push("/onboarding/characteristic/ingredients");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-1 flex-col">
      <Controller
        name="foodTypes"
        control={control}
        render={({ field }) => (
          <FoodTypesField
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
