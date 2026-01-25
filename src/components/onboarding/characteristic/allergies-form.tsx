"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import { NoPreferencesField } from "./no-preferences-field";
import { AllergiesField } from "./allergies-field";
import {
  allergiesSchema,
  type AllergiesFormValues,
} from "@/src/lib/schema/characteristic";
import { useOnboardingStore } from "@/src/stores/onboarding-store";

export function AllergiesForm() {
  const router = useRouter();
  const { noAllergy, allergies, setNoAllergy, setAllergies } =
    useOnboardingStore();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { isValid },
  } = useForm<AllergiesFormValues>({
    resolver: zodResolver(allergiesSchema),
    mode: "onChange",
    defaultValues: {
      noAllergy,
      allergies,
    },
  });

  const watchNoAllergy = watch("noAllergy");

  const handleNoAllergyChange = (value: boolean) => {
    setValue("noAllergy", value, { shouldValidate: true });
    if (value) {
      setValue("allergies", [], { shouldValidate: true });
    }
  };

  const onSubmit = (data: AllergiesFormValues) => {
    setNoAllergy(data.noAllergy);
    setAllergies(data.allergies);
    router.push("/onboarding/characteristic/food-types");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-1 flex-col">
      <div className="flex flex-col gap-8">
        <Controller
          name="noAllergy"
          control={control}
          render={({ field }) => (
            <NoPreferencesField
              value={field.value}
              onChange={handleNoAllergyChange}
            />
          )}
        />

        {!watchNoAllergy && (
          <Controller
            name="allergies"
            control={control}
            render={({ field }) => (
              <AllergiesField
                value={field.value}
                onChange={field.onChange}
                showLabel={false}
              />
            )}
          />
        )}
      </div>

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
